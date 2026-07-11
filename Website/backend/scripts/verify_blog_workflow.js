const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

const connectDB = require('../config/database');
const Event = require('../models/Event');
const Blog = require('../models/Blog');
const BlogScheduler = require('../services/BlogScheduler');

async function verifyWorkflow() {
    try {
        await connectDB();
        console.log('Connected to DB');

        // 1. Create a test event
        const testEventId = 'test-event-' + Date.now();
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);

        const testEvent = new Event({
            id: testEventId,
            name: 'ACREX India 2026 Test',
            startDate: new Date('2026-02-15'),
            endDate: new Date('2026-02-20'),
            venue: 'BIEC',
            city: 'Bangalore',
            organizer: 'IEEMA',
            organizerWebsite: 'https://acrex.in',
            industry: 'manufacturing',
            isIndoor: true,
            expectedFootfall: 50000,
            stallSizes: ['9x9', '12x12'],
            description: 'Test event for ACREX India 2026',
            whyParticipate: 'Networking and exposure',
            slug: 'test-event-' + Date.now(),
            blogConfiguration: {
                enabled: true,
                scheduledBlogs: [
                    {
                        category: 'guide',
                        publishDate: yesterday,
                        isGenerated: false
                    }
                ]
            }
        });

        await testEvent.save();
        console.log(`Created test event with ID: ${testEventId}`);

        // 2. Run the scheduler
        console.log('Running BlogScheduler...');
        await BlogScheduler.run();

        // 3. Verify the changes
        const updatedEvent = await Event.findOne({ id: testEventId });
        const scheduledBlog = updatedEvent.blogConfiguration.scheduledBlogs[0];

        if (scheduledBlog.isGenerated && scheduledBlog.blogId) {
            console.log('✅ Blog generation successful!');
            console.log('Blog ID:', scheduledBlog.blogId);

            const blog = await Blog.findById(scheduledBlog.blogId);
            if (blog) {
                console.log('✅ Blog document found in database');
                console.log('Title:', blog.metadata.title);
                console.log('Sections count:', blog.sections.length);
                if (blog.sections.length >= 10) {
                    console.log('✅ Blog has 10+ sections as requested');
                } else {
                    console.warn('⚠️ Blog has less than 10 sections:', blog.sections.length);
                }
            } else {
                console.error('❌ Blog document not found!');
            }
        } else {
            console.error('❌ Blog was not generated!');
        }

        // Cleanup
        // await Event.deleteOne({ id: testEventId });
        // if (scheduledBlog.blogId) await Blog.deleteOne({ _id: scheduledBlog.blogId });
        // console.log('Cleanup complete');

        process.exit(0);
    } catch (error) {
        console.error('Verification failed:', error);
        process.exit(1);
    }
}

verifyWorkflow();
