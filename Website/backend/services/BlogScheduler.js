const Event = require('../models/Event');
const Blog = require('../models/Blog');
const GeminiService = require('./GeminiService');
const { DEFAULT_EXHIBITION_FEATURED_IMAGE } = require('../scripts/assignBlogFeaturedImages');

class BlogScheduler {
    /**
     * Run the scheduler to find events that need blogs and generate them.
     * This should be called periodically (e.g., daily).
     */
    static async run() {
        console.log('--- BlogScheduler Cycle Start ---');
        const today = new Date();

        const enabledEvents = await Event.find({
            'blogConfiguration.enabled': true
        });

        console.log(`Found ${enabledEvents.length} enabled events in database.`);

        for (const event of enabledEvents) {
            const config = event.blogConfiguration;

            // If the user has specifically scheduled blogs, we should process them 
            // regardless of the generationStartDate/EndDate (which were for the old frequency system)
            // But we'll still respect EndDate if it's explicitly set to stop all generation.

            const endDate = config.generationEndDate ? new Date(config.generationEndDate) : new Date(event.endDate);

            if (endDate < today) {
                console.log(`Skipping Event: "${event.name}" - Generation window closed (Ended: ${endDate.toLocaleDateString()})`);
                continue;
            }

            console.log(`Processing Event: "${event.name}"`);
            await this.processEvent(event);
        }
        console.log('--- BlogScheduler Cycle End ---');
    }

    /**
     * Process a single event to determine if any scheduled blogs should be generated.
     * @param {Object} event 
     */
    static async processEvent(event) {
        const today = new Date();
        const config = event.blogConfiguration;

        if (!config.scheduledBlogs || config.scheduledBlogs.length === 0) {
            console.log(`Skipping ${event.name}: No scheduled blogs defined.`);
            return;
        }

        console.log(`Processing ${event.name}: Checking ${config.scheduledBlogs.length} scheduled blogs.`);

        for (let i = 0; i < config.scheduledBlogs.length; i++) {
            const scheduledBlog = config.scheduledBlogs[i];
            const publishDate = new Date(scheduledBlog.publishDate);
            const isDue = publishDate <= today;

            console.log(`  - Checking Blog: ${scheduledBlog.category} | Due: ${publishDate.toLocaleDateString()} | Status: ${scheduledBlog.isGenerated ? 'Done' : 'Pending'} | IsDue Now: ${isDue}`);

            if (!scheduledBlog.isGenerated && isDue) {
                console.log(`Generating scheduled blog (${scheduledBlog.category}) for event: ${event.name}`);
                try {
                    const blog = await this.generateAndPublishBlog(event, scheduledBlog.category);

                    // Update the specific scheduled blog entry
                    config.scheduledBlogs[i].isGenerated = true;
                    config.scheduledBlogs[i].blogId = blog._id;

                    // Update general stats
                    config.lastGeneratedDate = new Date();
                    config.generatedBlogCount += 1;

                    await event.save();
                    console.log(`Successfully generated and linked blog for ${event.name} category: ${scheduledBlog.category}`);

                } catch (error) {
                    console.error(`Failed to generate scheduled blog for ${event.name} (${scheduledBlog.category}):`, error);
                }
            }
        }
    }

    /**
     * Generate content using Gemini and save a new Blog.
     * @param {Object} event 
     * @param {string} category
     */
    static async generateAndPublishBlog(event, category) {
        // 1. Generate Content using category-specific prompt
        const blogData = await GeminiService.generateBlogContent(category, event);

        // 2. Create Blog Document
        const newBlog = new Blog({
            metadata: {
                title: blogData.title,
                slug: this.generateSlug(blogData.title),
                description: blogData.description,
                category: 'exhibition',
                author: {
                    name: 'Brandbase AI',
                    role: 'Content Assistant',
                    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995',
                },
                readTime: '5 min read',
                featuredImage: DEFAULT_EXHIBITION_FEATURED_IMAGE,
                publishDate: new Date(),
                seo: {
                    metaTitle: blogData.title,
                    metaDescription: blogData.description,
                    keywords: blogData.tags || []
                },
                isAI: true,
                eventId: event.id
            },
            sections: blogData.contentSections.map((section, index) => ({
                id: `section-${index}`,
                title: section.title,
                content: [section.content]
            }))
        });

        await newBlog.save();
        console.log(`Blog published: ${newBlog.metadata.title}`);
        return newBlog;
    }

    static generateSlug(title) {
        return title
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }
}

module.exports = BlogScheduler;
