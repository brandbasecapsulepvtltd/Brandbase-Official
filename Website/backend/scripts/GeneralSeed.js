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
            locations: "Serving: USA, UK, Europe, Saudi, India, SG"
        });

        // Seed Navbar
        await Navbar.create({
            logoLight: "https://ik.imagekit.io/vinayak06/brandbasewhite-removebg-preview.png",
            logoDark: "https://ik.imagekit.io/vinayak06/brandbaseNew1-removebg-preview.png?updatedAt=1764581531819",
            services: [
                {
                    category: "Digital Marketing Solutions",
                    categoryLink: "/services/digital-marketing",
                    items: [
                        { name: "SEO Optimization", link: "/services/digital-marketing/seo-optimization" },
                        { name: "Online Ads Campaigns", link: "/services/digital-marketing/online-ads-campaigns" },
                        { name: "Social Media Marketing", link: "/services/digital-marketing/social-media-marketing" },
                        { name: "Social Media Page Setup", link: "/services/digital-marketing/social-media-page-setup" },
                        { name: "Social Media Content Design", link: "/services/digital-marketing/social-media-content-design" },
                        { name: "Professional Content Writing", link: "/services/digital-marketing/content-writing" },
                    ]
                },
                {
                    category: "Website Development",
                    categoryLink: "/services/website-development",
                    items: [
                        { name: "Business Website", link: "/services/website-development/business-website" },
                        { name: "Portfolio Website", link: "/services/website-development/portfolio-website" },
                        { name: "Landing Page Development", link: "/services/website-development/landing-page-development" },
                        { name: "CMS Website", link: "/services/website-development/cms-website" },
                        { name: "E-Commerce Websites", link: "/services/website-development/ecommerce-websites" },
                        { name: "Dynamic and Static ", link: "/services/website-development/dynamic-static" }
                    ]
                },
                {
                    category: "Mobile App Development",
                    categoryLink: "/services/mobile-app-development",
                    items: [
                        { name: "Android App Development", link: "/services/mobile-app-development/android-app-development" },
                        { name: "iOS App Development", link: "/services/mobile-app-development/ios-app-development" },
                        { name: "UI/UX for Apps", link: "/services/mobile-app-development/ui-ux-design" },
                        { name: "Cross-platform App", link: "/services/mobile-app-development/cross-platform-app-development" },
                        { name: "app maintenance support", link: "/services/mobile-app-development/app-maintenance-support" }
                    ]
                },
                {
                    category: "Event & Exhibition Management",
                    categoryLink: "/services/events-exhibition",
                    items: [
                        { name: "Stall & Booth Design", link: "/services/events-exhibition/stall-design" },
                        { name: "Event Planning & Management", link: "/services/events-exhibition/event-planning-management" },
                        { name: "Wedding Service", link: "/services/events-exhibition/wedding-service" },
                        { name: "Event Branding", link: "/services/events-exhibition/event-branding" },
                        { name: "On-site Event Coordination", link: "/services/events-exhibition/onsite-event-coordination" }
                    ]
                }
            ],
            directLinkServices: [
                { category: "Branding & Creative Design", link: "/services/branding-design" },
                { category: "Audio & Video Production", link: "/services/av-production" }
            ],
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
                        { label: "App Development", href: "#" },
                        { label: "Event & Exhibition Management", href: "#" },
                        { label: "Data Engineering", href: "#" },
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
                        { label: "Blog", href: "#" },
                        { label: "Careers", href: "#" },
                        { label: "Contact Us", href: "#" }
                    ]
                }
            ],
            contactInfo: {
                address: "Brandbase Capsule Pvt. Ltd Office #204 2nd Floor, Near Bus Depot Pimpleshwar Temple, Gulmohar Complex, Goregaon Railway Station, Goregaon East.",
                email: "info@brandbasecapsule.com",
                phone: "+91-9892211456"
            },
            legalLinks: [
                { label: "Terms & Conditions", href: "/terms" },
                { label: "Privacy Policy", href: "/privacy-policy" }
            ],
            copyright: "2025 Brandbase Capsule. All rights reserved.",
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
