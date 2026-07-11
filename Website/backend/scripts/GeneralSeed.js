const mongoose = require('mongoose');
const dotenv = require('dotenv');
const TopBar = require('../models/TopBar');
const Navbar = require('../models/Navbar');
const Footer = require('../models/Footer');
const FloatingLatest = require('../models/FloatingLatest');

dotenv.config();

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Clear existing data
        await TopBar.deleteMany({});
        await Navbar.deleteMany({});
        await Footer.deleteMany({});
        await FloatingLatest.deleteMany({});

        // Seed TopBar
        await TopBar.create({
            offers: [
                "🚀 Get 20% OFF on your first Digital Marketing package!",
                "🎨 Free Logo Design with any Website Development package!",
                "📱 15% OFF on Mobile App Maintenance for the first year!",
                "✨ Special discount on Stall Design for upcoming Exhibitions!"
            ],
            email: "info@brandbasecapsule.com",
            locations: "Serving: India, Europe, Saudi Arabia, Singapore, UK, USA"
        });

        // Seed Navbar
        await Navbar.create({
            logoLight: "https://ik.imagekit.io/vinayak06/brandbasewhite-removebg-preview.png",
            logoDark: "https://ik.imagekit.io/vinayak06/brandbaseNew1-removebg-preview.png?updatedAt=1764581531819",
            services: [
                {
                    category: "Event & Exhibition",
                    categoryLink: "/services/exhibition-management",
                    items: [
                        { name: "Stall & Booth Design", link: "/services/events-exhibition/stall-design" },
                        { name: "Event Planning & Management", link: "/services/events-exhibition/event-planning-management" },
                        { name: "Exhibition Booth Fabrication", link: "/services/events-exhibition/stall-design" },
                        { name: "On-site Event Coordination", link: "/services/events-exhibition/onsite-event-coordination" },
                    ]
                },
                {
                    category: "Digital Marketing",
                    categoryLink: "/services/digital-marketing",
                    items: [
                        { name: "SEO Optimization", link: "/services/digital-marketing/seo-optimization" },
                        { name: "Social Media Marketing", link: "/services/digital-marketing/social-media-marketing" },
                        { name: "Online Ads Campaigns", link: "/services/digital-marketing/online-ads-campaigns" },
                        { name: "Content Writing", link: "/services/digital-marketing/content-writing" },
                    ]
                },
                {
                    category: "Website Development",
                    categoryLink: "/services/website-development",
                    items: [
                        { name: "Business Website", link: "/services/website-development/business-website" },
                        { name: "E-Commerce Websites", link: "/services/website-development/ecommerce-websites" },
                        { name: "Landing Page Development", link: "/services/website-development/landing-page-development" },
                        { name: "CMS Website", link: "/services/website-development/cms-website" },
                    ]
                },
                {
                    category: "Audio & Video Production",
                    categoryLink: "/services/av-production",
                    items: [
                        { name: "Corporate Films", link: "/services/av-production" },
                        { name: "Commercial & Ad Films", link: "/services/av-production" },
                        { name: "Event Coverage", link: "/services/av-production" },
                        { name: "Social & Reels Production", link: "/services/av-production" },
                    ]
                },
                {
                    category: "Branding & Creative Design",
                    categoryLink: "/services/branding-design",
                    items: [
                        { name: "Brand Identity Design", link: "/services/branding-design" },
                        { name: "Logo & Visual Systems", link: "/services/branding-design" },
                        { name: "Marketing Collateral", link: "/services/branding-design" },
                        { name: "Event Branding", link: "/services/events-exhibition/event-branding" },
                    ]
                }
            ],
            directLinkServices: [],
            mainLinks: [
                { label: "Home", path: "/" },
                { label: "About", path: "/about" },
                { label: "Portfolio", path: "/portfolio" },
                { label: "Blogs", path: "/blogs" },
                { label: "Contact Us", path: "/contact" }
            ]
        });

        // Seed Footer
        await Footer.create({
            description: "Helping startups transform ideas into reality with cutting-edge technology solutions.",
            socialLinks: [
                { platform: "Facebook", url: "#", icon: "Facebook" },
                { platform: "Twitter", url: "#", icon: "Twitter" },
                { platform: "Linkedin", url: "#", icon: "Linkedin" },
                { platform: "Github", url: "#", icon: "Github" },
                { platform: "Instagram", url: "#", icon: "Instagram" }
            ],
            columns: [
                {
                    title: "Services",
                    links: [
                        { label: "Digital Marketing Solutions", href: "#" },
                        { label: "Website Development", href: "#" },
                        { label: "Event & Exhibition Management", href: "#" },
                        { label: "Audio & Video Production", href: "#" },
                        { label: "Branding & Creative Design", href: "#" }
                    ]
                },
                {
                    title: "Company",
                    links: [
                        { label: "About Us", href: "#" },
                        { label: "Team", href: "#" },
                        { label: "Services", href: "#" },
                        { label: "Blogs", href: "/blogs" },
                        { label: "Careers", href: "#" },
                        { label: "Contact Us", href: "#" }
                    ]
                }
            ],
            contactInfo: {
                address: "Brandbase Capsule Pvt. Ltd, R-34A, Office No. 34, NESCO IT Park, Goregaon East, Mumbai, Maharashtra 400063",
                email: "info@brandbasecapsule.com",
                phone: "+91 7045390416"
            },
            legalLinks: [
                { label: "Terms & Conditions", href: "/terms" },
                { label: "Privacy Policy", href: "/privacy-policy" }
            ],
            copyright: "2025 BrandBase Capsule. All rights reserved.",
            gstin: "27AAFCB8754H1Z7"
        });

        // Seed FloatingLatest
        await FloatingLatest.create({
            cards: [
                {
                    title: "Website Development",
                    description: "Need a website that actually converts? Explore how we design fast, scalable, high-impact websites for modern brands.",
                    image: "https://images.unsplash.com/photo-1522199710521-72d69614c702",
                    link: "https://brandbase-nu.vercel.app/services/website-development"
                },
                {
                    title: "Productivity Playbook",
                    description: "Struggling to stay productive? Check out our latest blog packed with powerful productivity hacks for creative freelancers.",
                    image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe",
                    link: "https://brandbase-nu.vercel.app/blogs/productivity/best-productivity-hacks-for-creative-freelancers-today"
                },
                {
                    title: "Book an Appointment",
                    description: "Got a project in mind? Let’s talk strategy, design, and growth. Book a quick call with our experts today.",
                    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
                    link: "https://brandbase-nu.vercel.app/appointment"
                },
                {
                    title: "About BrandBase",
                    description: "We’re not just another agency. Discover who we are, how we think, and why brands trust us to build digital success.",
                    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
                    link: "https://brandbase-nu.vercel.app/about"
                }
            ]
        });

        console.log('General data seeded successfully');
        process.exit();
    } catch (error) {
        console.error('Error seeding general data:', error);
        process.exit(1);
    }
};

seedData();
