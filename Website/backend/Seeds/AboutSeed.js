const mongoose = require('mongoose');
const AboutContent = require('../models/AboutSection');

const aboutData = {
    identifier: 'about-content',
    hero: {
        title: "Brandbase Capsule",
        heading: "Pioneering Digital Excellence",
        highlighted: "Since 2018",
        description: "We are a passionate team of innovators, designers, and developers committed to transforming businesses through cutting-edge digital solutions. Our journey began with a simple vision: to bridge the gap between technology and business success."
    },
    aboutSection: {
        socials: {
            facebook: "https://www.facebook.com/",
            instagram: "https://www.instagram.com/",
            linkedin: "https://www.linkedin.com/",
            youtube: "https://www.youtube.com/"
        },
        image: "https://img.freepik.com/premium-photo/interior-modern-office-with-glass-walls-tiled-floor-rows-orange-armchairs-3d-rendering_979520-62343.jpg",
        stats: {
            years: "10+",
            projectsDelivered: "1000+",
            projects: "500+",
            satisfaction: "98%"
        },
        title: "Elevating Brands Through Innovation & Excellence",
        description1: "At BCPL, we are dedicated to excellence and innovation, offering customized solutions to meet each client's specific needs. With our worldwide reach, BCPL stands prepared to assist your event and marketing objectives with unparalleled professionalism and creativity.",
        description2: "As a top provider of event management, digital marketing, website development, and exhibition services, we excel in crafting memorable experiences and achieving outstanding outcomes for clients globally.",
        cta: {
            title: "BRANDBASE CAPSULE",
            subtitle: "Your Trusted Partner in Marketing & Digital Excellence",
            text: "At BCPL, we are committed to delivering excellence in every project. Whether it's event management, digital marketing, website development, or international exhibitions, we ensure your brand stands out and achieves its objectives.",
            buttonText: "LET'S COLLABORATE"
        }
    },
    mission: {
        title: "Our Mission",
        subheading: "Driving Digital Transformation",
        description: "We empower businesses to thrive in the digital age by delivering exceptional web and mobile solutions that drive growth, enhance user experiences, and create lasting impact.",
        highlight: "Building what's next, today.",
        points: [
            "Deliver exceptional digital experiences that exceed client expectations",
            "Foster innovation through continuous learning and adaptation",
            "Build long-term partnerships based on trust and mutual success",
            "Push the boundaries of what's possible in web and mobile technology"
        ],
        image: {
            url: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            alt: "Our team collaborating in modern office space",
            captionTitle: "Innovation in Action",
            captionText: "Our team working together to create exceptional digital solutions"
        }
    },
    vision: {
        title: "Our Vision",
        subheading: "Shaping the Future of Digital",
        description: "To be the leading digital partner for businesses worldwide, recognized for our innovation, technical excellence, and unwavering commitment to client success.",
        points: [
            "Lead the industry in digital innovation and best practices",
            "Expand our global footprint while maintaining quality standards",
            "Create solutions that positively impact businesses and communities",
            "Build a legacy of excellence that inspires future generations"
        ],
        image: {
            url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            alt: "Visionary team planning future projects",
            captionTitle: "Future Forward",
            captionText: "Planning the next generation of digital innovations"
        }
    },
    timeline: {
        title: "Timeline of Excellence",
        subtitle: "Our Journey",
        description: "From humble beginnings to industry leadership - follow our growth story year by year",
        milestones: {
            2018: {
                title: "2018",
                text: "Brandbase was born with a vision to deliver end-to-end 360° marketing solutions. We kicked off with our first major stall design project at OTM, complemented by complete digital branding for the client.",
                img: "https://images.pexels.com/photos/6774432/pexels-photo-6774432.jpeg"
            },
            2019: {
                title: "2019",
                text: "Expanded our service portfolio to include web development, social media marketing, and comprehensive branding. Executed 20+ integrated campaigns combining physical stall designs with digital presence.",
                img: "https://images.pexels.com/photos/5332243/pexels-photo-5332243.jpeg"
            },
            2020: {
                title: "2020",
                text: "Strengthened our digital offerings with e-commerce solutions and virtual event platforms. Delivered seamless omnichannel experiences blending stunning stall designs with robust online presence.",
                img: "https://images.pexels.com/photos/7947670/pexels-photo-7947670.jpeg"
            },
            2021: {
                title: "2021",
                text: "Launched our in-house creative studio for video production and motion graphics. Became a one-stop solution offering everything from exhibition stall design to complete digital transformation.",
                img: "https://images.pexels.com/photos/66134/pexels-photo-66134.jpeg"
            },
            2022: {
                title: "2022",
                text: "Perfected our 360° approach by integrating AR/VR experiences into physical stall designs. Became the preferred partner for brands seeking comprehensive marketing solutions across all touchpoints.",
                img: "https://images.pexels.com/photos/7688174/pexels-photo-7688174.jpeg"
            }
        }
    },
    impact: {
        title: "Our Impact",
        description: "We measure our success by the success of our clients and the positive change we create in the digital landscape.",
        subheading: "Transforming Businesses Worldwide",
        body: "Through our innovative solutions and dedicated approach, we've helped hundreds of businesses achieve their digital goals and unlock new growth opportunities.",
        stats: [
            "200+ Projects Completed",
            "98% Client Satisfaction",
            "50+ Team Members",
            "15 Countries Served"
        ],
        tagline: "Building What's Next."
    },
    principles: {
        title: "PRINCIPLES",
        subtitle: "OUR",
        items: [
            {
                id: 1,
                do: {
                    title: "Strategy First",
                    text: "Every move has a purpose",
                    src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
                },
                dont: {
                    title: "Random Campaigns",
                    text: "No guesswork marketing",
                    src: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe"
                }
            },
            {
                id: 2,
                do: {
                    title: "Brand-Led Growth",
                    text: "We build brands, not noise",
                    src: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6"
                },
                dont: {
                    title: "One-Size Solutions",
                    text: "Every brand is unique",
                    src: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70"
                }
            },
            {
                id: 3,
                do: {
                    title: "Data + Creativity",
                    text: "Ideas backed by insights",
                    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71"
                },
                dont: {
                    title: "Vanity Metrics",
                    text: "Likes don't equal growth",
                    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"
                }
            },
            {
                id: 4,
                do: {
                    title: "Long-Term Impact",
                    text: "Built to last, not fade",
                    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
                },
                dont: {
                    title: "Shortcuts",
                    text: "No quick wins or hacks",
                    src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
                }
            },
            {
                id: 5,
                do: {
                    title: "Clear Communication",
                    text: "Simple, honest updates",
                    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c"
                },
                dont: {
                    title: "Overcomplicate Work",
                    text: "No unnecessary jargon",
                    src: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b"
                }
            }
        ]
    }
};

const seedDatabase = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect("mongodb+srv://vinayakandhere4:niUjtjP7piNusVwA@cluster0.vtovevf.mongodb.net/brandbase?retryWrites=true&w=majority&appName=Cluster0", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('Connected to MongoDB');

        // Clear existing data (both old Section model and new AboutContent)
        await mongoose.connection.db.collection('sections').drop().catch(() => {
            console.log('No existing sections collection to drop');
        });

        await AboutContent.deleteMany({});
        console.log('Cleared existing about content');

        // Create single document with all content
        const content = await AboutContent.create(aboutData);
        console.log('About content seeded successfully');
        console.log('Document ID:', content._id);

        // Close connection
        await mongoose.connection.close();
        console.log('Database connection closed');
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();