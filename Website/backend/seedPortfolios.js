const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Portfolio = require('./models/Portfolio'); // Adjust path as needed

// Load env vars
dotenv.config();

const portfolioData = {
    exhibitionStalls: {
        slug: "exhibition-stalls",
        category: "exhibition-stalls", // Added manually
        hero: {
            tagline: "Join over 500+ satisfied exhibition stall clients",
            title: "Transform Your Brand Presence with Stunning Exhibition Stalls",
            description: "Boost Your Exhibition Impact with Custom-Designed Stalls from our expert designers and fabricators. Our team is ready to create unforgettable brand experiences.",
            ctaText: "Get Free Consultation",
            videoUrl: "https://www.pexels.com/download/video/4916733/",
            images: [
                "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
                "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
                "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&auto=format&fit=crop&q=60",
                "https://images.unsplash.com/photo-1598301257981-3d5c89f6f0a5?w=900&auto=format&fit=crop&q=60",
                "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?w=900&auto=format&fit=crop&q=60",
                "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=900&auto=format&fit=crop&q=60",
                "https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&auto=format&fit=crop&q=60",
                "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=900&auto=format&fit=crop&q=60",
            ]
        },

        bento: {
            mainHeading: "Your Brand. Center Stage.",
            cards: {
                conceptToReality: {
                    title: "From Concept to Reality",
                    imageAlt: "Workshop Fabrication",
                    imageUrl: "https://i.pinimg.com/originals/f3/4f/fd/f34ffd1723486bee75756a94d6c4b16b.jpg"
                },
                projectsDelivered: {
                    count: "450+",
                    label: "Stalls Delivered"
                },
                amazingWork: {
                    title: "We don't just build stalls. We build experiences.",
                    structureImage: "https://ik.imagekit.io/vinayak06/stalla.jpg?updatedAt=1765951854257",
                    structureAlt: "Structure 3D"
                },
                showcaseStall: {
                    imageUrl: "https://exhibitionstalldesign.in/images/portfolio/Gayatri/Exhibition-Development-Comp.jpg",
                    alt: "Exhibition Stall Showcase",
                    location: "Auto Expo 2024"
                },
                citiesReach: {
                    count: "15+",
                    label: "Global Cities"
                }
            },
            services: [
                "3D Concept Design",
                "Custom Fabrication",
                "Modular Systems",
                "Interactive Tech",
                "Lighting & Audio Visual",
                "On-site Management",
                "Global Logistics",
                "Large Format Graphics"
            ]
        },

        clientPortfolio: [
            {
                id: 1,
                imagePosition: "right",
                logo: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=200&h=100&fit=crop",
                companyName: "TechNova Solutions",
                industry: "Software & Technology",
                projectTitle: "Complete Digital Transformation & Brand Strategy",
                projectDescription: "Led a comprehensive digital transformation including website redesign, digital marketing strategy, and brand positioning that resulted in significant market growth and enhanced online presence.",
                servicesProvided: [
                    "Digital Marketing",
                    "Website Development",
                    "Brand Strategy",
                    "Social Media Management"
                ],
                results: [
                    { value: "300%", label: "Lead Increase" },
                    { value: "65%", label: "Engagement Growth" },
                    { value: "2.8X", label: "ROI" },
                    { value: "40%", label: "Cost Reduction" }
                ],
                mediaItems: [
                    {
                        type: "image",
                        url: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=500&fit=crop",
                        alt: "Digital Transformation Dashboard",
                        title: "Project Dashboard"
                    },
                    {
                        type: "video",
                        url: "https://www.pexels.com/download/video/5699612/",
                        alt: "Marketing Analytics Video",
                        title: "Analytics Dashboard",
                        thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop"
                    },
                    {
                        type: "image",
                        url: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=500&fit=crop",
                        alt: "Website Design Mockup",
                        title: "Website Design"
                    }
                ],
                testimonial: {
                    clientImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face",
                    clientName: "Alex Johnson",
                    position: "CEO, TechNova Solutions",
                    quote: "Brandbase Capsule transformed our digital presence completely. Their strategic approach and execution excellence delivered results beyond our expectations. The ROI was exceptional."
                }
            },
            {
                id: 2,
                imagePosition: "left",
                logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=100&fit=crop",
                companyName: "Retail Innovations",
                industry: "E-commerce Retail",
                projectTitle: "E-commerce Growth & Event Launch Campaign",
                projectDescription: "Developed and executed a multi-channel marketing campaign for product launch event, combined with comprehensive e-commerce strategy that significantly increased sales and brand awareness.",
                servicesProvided: [
                    "Event Management",
                    "E-commerce Strategy",
                    "Digital Campaign",
                    "Content Marketing"
                ],
                results: [
                    { value: "450%", label: "Sales Growth" },
                    { value: "2,500+", label: "Event Attendees" },
                    { value: "80%", label: "Brand Recall" },
                    { value: "3.5X", label: "Social Reach" }
                ],
                mediaItems: [
                    {
                        type: "image",
                        url: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=500&fit=crop",
                        alt: "E-commerce Platform",
                        title: "Online Store"
                    },
                    {
                        type: "video",
                        url: "https://www.pexels.com/download/video/9991286/",
                        alt: "Product Launch Event Video",
                        title: "Launch Event",
                        thumbnail: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=500&fit=crop"
                    },
                    {
                        type: "image",
                        url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=500&fit=crop",
                        alt: "Campaign Analytics",
                        title: "Marketing Analytics"
                    }
                ],
                testimonial: {
                    clientImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
                    clientName: "Michael Rodriguez",
                    position: "Marketing Director, Retail Innovations",
                    quote: "The event management was flawless and the digital campaign drove unprecedented results. Brandbase Capsule's integrated approach to marketing is truly exceptional."
                }
            }
        ],

        testimonials: {
            sectionTitle: "What Our Exhibition Clients Say",
            sectionDescription: "See what our exhibition stall clients have to say about our design and fabrication services.",
            testimonials: [
                {
                    text: "Their exhibition stall design for Auto Expo 2023 was absolutely stunning! The attention to detail and craftsmanship was exceptional.",
                    image: "https://randomuser.me/api/portraits/women/1.jpg",
                    name: "Briana Patton",
                    role: "Marketing Director, AutoTech Corp"
                },
                {
                    text: "The modular stall system they created for us is reusable and saved us 40% on our next exhibition. Brilliant design and execution!",
                    image: "https://randomuser.me/api/portraits/men/2.jpg",
                    name: "Bilal Ahmed",
                    role: "Events Manager, Global Pharma"
                },
                {
                    text: "From 3D design to final installation, their team was professional and delivered beyond expectations. Our stall was the talk of the exhibition.",
                    image: "https://randomuser.me/api/portraits/women/3.jpg",
                    name: "Saman Malik",
                    role: "Brand Manager, Luxury Fashion House"
                },
                {
                    text: "The interactive technology integrated into our stall increased engagement by 300%. A game-changer for our exhibition presence.",
                    image: "https://randomuser.me/api/portraits/men/4.jpg",
                    name: "Omar Raza",
                    role: "CEO, Tech Innovations Ltd"
                },
                {
                    text: "Their on-site management team handled everything seamlessly. We could focus on networking while they managed the stall perfectly.",
                    image: "https://randomuser.me/api/portraits/women/5.jpg",
                    name: "Zainab Hussain",
                    role: "Operations Director, Renewable Energy Co"
                },
                {
                    text: "The custom fabrication quality is outstanding. Our stall stood out among 200+ exhibitors at the international trade fair.",
                    image: "https://randomuser.me/api/portraits/women/6.jpg",
                    name: "Aliza Khan",
                    role: "International Marketing Head"
                },
                {
                    text: "Their exhibition stall design for Auto Expo 2023 was absolutely stunning! The attention to detail and craftsmanship was exceptional.",
                    image: "https://randomuser.me/api/portraits/women/1.jpg",
                    name: "Briana Patton",
                    role: "Marketing Director, AutoTech Corp"
                },
                {
                    text: "The modular stall system they created for us is reusable and saved us 40% on our next exhibition. Brilliant design and execution!",
                    image: "https://randomuser.me/api/portraits/men/2.jpg",
                    name: "Bilal Ahmed",
                    role: "Events Manager, Global Pharma"
                },
                {
                    text: "From 3D design to final installation, their team was professional and delivered beyond expectations. Our stall was the talk of the exhibition.",
                    image: "https://randomuser.me/api/portraits/women/3.jpg",
                    name: "Saman Malik",
                    role: "Brand Manager, Luxury Fashion House"
                },
                {
                    text: "The interactive technology integrated into our stall increased engagement by 300%. A game-changer for our exhibition presence.",
                    image: "https://randomuser.me/api/portraits/men/4.jpg",
                    name: "Omar Raza",
                    role: "CEO, Tech Innovations Ltd"
                },
                {
                    text: "Their on-site management team handled everything seamlessly. We could focus on networking while they managed the stall perfectly.",
                    image: "https://randomuser.me/api/portraits/women/5.jpg",
                    name: "Zainab Hussain",
                    role: "Operations Director, Renewable Energy Co"
                },
                {
                    text: "The custom fabrication quality is outstanding. Our stall stood out among 200+ exhibitors at the international trade fair.",
                    image: "https://randomuser.me/api/portraits/women/6.jpg",
                    name: "Aliza Khan",
                    role: "International Marketing Head"
                }
            ]
        },

        faqs: {
            sectionTitle: "Frequently Asked Questions About Exhibition Stalls",
            faqs: [
                {
                    question: "How long does it take to design and fabricate an exhibition stall?",
                    answer: "Typically, the process takes 4-6 weeks from initial concept to final installation. This includes 1 week for design, 2-3 weeks for fabrication, and 1 week for logistics and installation. Rush projects can be accommodated with additional charges."
                },
                {
                    question: "What materials do you use for stall fabrication?",
                    answer: "We use a variety of materials including custom woodwork, metal structures, acrylic panels, aluminum systems, LED integrated panels, durable laminates, and sustainable materials. Material selection depends on your budget, design requirements, and exhibition venue specifications."
                },
                {
                    question: "Do you handle logistics and on-site installation?",
                    answer: "Yes, we provide end-to-end services including design, fabrication, transportation logistics, on-site installation, dismantling, and storage. Our experienced installation teams work across India and internationally to ensure seamless execution."
                },
                {
                    question: "Can you work with our existing stall design or modify previous stalls?",
                    answer: "Absolutely! We specialize in both creating new designs and modifying/upgrading existing stalls. We can refurbish, resize, or completely redesign your current stall to give it a fresh look while optimizing your investment."
                },
                {
                    question: "What is included in your exhibition stall pricing?",
                    answer: "Our pricing includes 3D design concepts, structural engineering, material procurement, fabrication, graphics production, basic lighting, transportation to venue, on-site installation, and basic dismantling. Additional services like AV equipment, interactive technology, furniture, and storage are available as add-ons."
                }
            ]
        },

        gallery: [
            "https://ik.imagekit.io/vinayak06/stalls/Indian%20Exhibition/5.JPG",
            "https://ik.imagekit.io/vinayak06/stalls/Indian%20Exhibition/6.JPG",
            "https://ik.imagekit.io/vinayak06/stalls/Indian%20Exhibition/1.jpg",
            "https://ik.imagekit.io/vinayak06/stalls/Indian%20Exhibition/8.jpg",
            "https://ik.imagekit.io/vinayak06/stalls/Indian%20Exhibition/9.jpg",
            "https://ik.imagekit.io/vinayak06/stalls/Indian%20Exhibition/10.jpg",
            "https://ik.imagekit.io/vinayak06/stalls/Indian%20Exhibition/11.jpg",
            "https://ik.imagekit.io/vinayak06/stalls/Indian%20Exhibition/12.jpg",
            "https://ik.imagekit.io/vinayak06/stalls/Indian%20Exhibition/13.jpg",
            "https://ik.imagekit.io/vinayak06/stalls/Indian%20Exhibition/14.jpg",
            "https://ik.imagekit.io/vinayak06/stalls/Indian%20Exhibition/15.jpg",
            "https://ik.imagekit.io/vinayak06/stalls/Indian%20Exhibition/16.jpg",
            "https://ik.imagekit.io/vinayak06/stalls/Indian%20Exhibition/2.JPG",
            "https://ik.imagekit.io/vinayak06/stalls/Indian%20Exhibition/3.JPG",
            "https://ik.imagekit.io/vinayak06/stalls/Indian%20Exhibition/4.JPG"
        ],

        metadata: {
            title: "Exhibition Stall Design & Fabrication | Custom Booth Manufacturing",
            description: "Professional exhibition stall design and fabrication services. Custom booth manufacturing, 3D design concepts, and turnkey solutions for trade shows.",
            keywords: ["exhibition stall design", "trade show booth", "custom stall fabrication", "exhibition booth manufacturer"]
        }
    },

    videoProduction: {
        slug: "video-production",
        category: "video-production",
        hero: {
            tagline: "Crafted 80+ cinematic masterpieces for global brands",
            title: "Turn Your Vision into Cinematic Reality",
            description: "From viral social content to blockbuster commercials, we create video magic that doesn't just tell stories—it makes audiences feel them. Hollywood-grade production meets marketing genius.",
            ctaText: "Start Your Production",
            videoUrl: "https://www.pexels.com/download/video/30285002/",
            images: [
                "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?w=900&auto=format&fit=crop&q=60",
                "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=900&auto=format&fit=crop&q=60",
                "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?w=900&auto=format&fit=crop&q=60",
                "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=900&auto=format&fit=crop&q=60",
                "https://images.unsplash.com/photo-1492693429561-1c91eb9a1c2f?w=900&auto=format&fit=crop&q=60",
                "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=900&auto=format&fit=crop&q=60",
                "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&auto=format&fit=crop&q=60",
                "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=900&auto=format&fit=crop&q=60"
            ]
        },

        bento: {
            mainHeading: "Cinematic Storytelling That Drives Action",
            cards: {
                conceptToReality: {
                    title: "Script to Screen",
                    imageAlt: "Video Production Studio",
                    imageUrl: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=800&auto=format&fit=crop&q=80"
                },
                projectsDelivered: {
                    count: "800+",
                    label: "Video Projects"
                },
                amazingWork: {
                    title: "We don't just make videos. We create visual experiences that convert.",
                    structureImage: "https://images.unsplash.com/photo-1492693429561-1c91eb9a1c2f?w=800&auto=format&fit=crop&q=80",
                    structureAlt: "Drone Cinematography"
                },
                showcaseStall: {
                    imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80",
                    alt: "Commercial Video Shoot",
                    location: "Luxury Brand Campaign 2024"
                },
                citiesReach: {
                    count: "25+",
                    label: "Countries Filmed"
                }
            },
            services: [
                "Commercial Films",
                "Corporate Videos",
                "Social Media Content",
                "Drone Cinematography",
                "Animation & Motion Graphics",
                "Documentary Production",
                "Event Coverage",
                "Live Streaming"
            ]
        },

        clientPortfolio: [
            {
                id: 1,
                imagePosition: "left",
                logo: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=200&h=100&fit=crop",
                companyName: "Luxury Auto Group",
                industry: "Automotive Luxury",
                projectTitle: "Global Launch Campaign Film Series",
                projectDescription: "Produced a breathtaking 5-film series for the worldwide launch of their flagship electric vehicle, combining cinematic storytelling with technical precision that went viral across 30 countries.",
                servicesProvided: [
                    "Concept Development",
                    "Drone Cinematography",
                    "Post-Production VFX",
                    "Multi-Language Adaptation"
                ],
                results: [
                    { value: "15M+", label: "Total Views" },
                    { value: "320%", label: "Website Traffic" },
                    { value: "2,800+", label: "Pre-orders" },
                    { value: "95%", label: "Positive Sentiment" }
                ],
                mediaItems: [
                    {
                        type: "video",
                        url: "https://www.pexels.com/download/video/3129984/",
                        alt: "Luxury Car Cinematic",
                        title: "Main Campaign Film",
                        thumbnail: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800&h=500&fit=crop"
                    },
                    {
                        type: "image",
                        url: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&h=500&fit=crop",
                        alt: "Drone Shot Behind Scenes",
                        title: "Production BTS"
                    },
                    {
                        type: "video",
                        url: "https://www.pexels.com/download/video/3121459/",
                        alt: "Social Media Cuts",
                        title: "Social Media Campaign",
                        thumbnail: "https://images.unsplash.com/photo-1555212697-194d092e3b8f?w=800&h=500&fit=crop"
                    }
                ],
                testimonial: {
                    clientImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
                    clientName: "Charlotte Dubois",
                    position: "Global Marketing Director, Luxury Auto Group",
                    quote: "The cinematic quality was indistinguishable from Hollywood blockbusters. The films didn't just showcase our car—they created an emotional connection that translated directly into sales."
                }
            }
        ],

        testimonials: {
            sectionTitle: "What Our Video Production Clients Say",
            sectionDescription: "Hear from brands that transformed their messaging with our cinematic expertise.",
            testimonials: [
                {
                    text: "The commercial they produced outperformed all our previous campaigns combined. Cinematic quality that actually converts!",
                    image: "https://randomuser.me/api/portraits/men/32.jpg",
                    name: "Marcus Thorne",
                    role: "Brand Director, Fashion Empire"
                },
                {
                    text: "Their drone cinematography for our travel series captured perspectives we didn't know were possible. Absolutely breathtaking!",
                    image: "https://randomuser.me/api/portraits/women/44.jpg",
                    name: "Isabella Rossi",
                    role: "Creative Head, Travel Network"
                },
                {
                    text: "The commercial they produced outperformed all our previous campaigns combined. Cinematic quality that actually converts!",
                    image: "https://randomuser.me/api/portraits/men/32.jpg",
                    name: "Marcus Thorne",
                    role: "Brand Director, Fashion Empire"
                },
                {
                    text: "Their drone cinematography for our travel series captured perspectives we didn't know were possible. Absolutely breathtaking!",
                    image: "https://randomuser.me/api/portraits/women/44.jpg",
                    name: "Isabella Rossi",
                    role: "Creative Head, Travel Network"
                },
                {
                    text: "The commercial they produced outperformed all our previous campaigns combined. Cinematic quality that actually converts!",
                    image: "https://randomuser.me/api/portraits/men/32.jpg",
                    name: "Marcus Thorne",
                    role: "Brand Director, Fashion Empire"
                },
                {
                    text: "Their drone cinematography for our travel series captured perspectives we didn't know were possible. Absolutely breathtaking!",
                    image: "https://randomuser.me/api/portraits/women/44.jpg",
                    name: "Isabella Rossi",
                    role: "Creative Head, Travel Network"
                },
                {
                    text: "The commercial they produced outperformed all our previous campaigns combined. Cinematic quality that actually converts!",
                    image: "https://randomuser.me/api/portraits/men/32.jpg",
                    name: "Marcus Thorne",
                    role: "Brand Director, Fashion Empire"
                },
                {
                    text: "Their drone cinematography for our travel series captured perspectives we didn't know were possible. Absolutely breathtaking!",
                    image: "https://randomuser.me/api/portraits/women/44.jpg",
                    name: "Isabella Rossi",
                    role: "Creative Head, Travel Network"
                }
            ]
        },

        faqs: {
            sectionTitle: "Video Production Questions Answered",
            faqs: [
                {
                    question: "What's your typical video production timeline?",
                    answer: "Standard projects take 4-8 weeks: 1-2 weeks pre-production (concept, script, planning), 1-3 weeks production (shooting), 2-3 weeks post-production (editing, color grading, sound design). Expedited timelines available for urgent projects."
                }
            ]
        },

        metadata: {
            title: "Professional Video Production Services | Corporate & Commercial Videos",
            description: "High-quality video production for commercials, corporate videos, social media content, and documentaries. Professional videography and editing services.",
            keywords: ["video production", "corporate video", "commercial film production", "video editing services"]
        }
    },

    webDevelopment: {
        slug: "web-development",
        category: "web-development",
        hero: {
            tagline: "Built 600+ high-performance digital experiences",
            title: "Craft Lightning-Fast Websites That Don't Just Look Good—They Perform",
            description: "We build web experiences that load at warp speed, convert like crazy, and scale effortlessly. From sleek startups to enterprise giants, we code the digital foundations that drive real business growth.",
            ctaText: "Audit Your Website",
            videoUrl: "https://www.pexels.com/download/video/5473294/",
            images: [
                "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=900&auto=format&fit=crop&q=60",
                "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&auto=format&fit=crop&q=60",
                "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=900&auto=format&fit=crop&q=60",
                "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&auto=format&fit=crop&q=60",
                "https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=900&auto=format&fit=crop&q=60",
                "https://images.unsplash.com/photo-1547658719-da2b51169166?w=900&auto=format&fit=crop&q=60",
                "https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&auto=format&fit=crop&q=60",
                "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&auto=format&fit=crop&q=60"
            ]
        },

        bento: {
            mainHeading: "Code That Converts & Scales",
            cards: {
                conceptToReality: {
                    title: "Wireframe to Wow",
                    imageAlt: "Web Development Process",
                    imageUrl: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=800&auto=format&fit=crop&q=80"
                },
                projectsDelivered: {
                    count: "600+",
                    label: "Websites Built"
                },
                amazingWork: {
                    title: "We don't just build websites. We engineer digital growth machines.",
                    structureImage: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&auto=format&fit=crop&q=80",
                    structureAlt: "Code Architecture"
                },
                showcaseStall: {
                    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
                    alt: "E-commerce Dashboard",
                    location: "Enterprise Platform Launch"
                },
                citiesReach: {
                    count: "40+",
                    label: "Global Clients"
                }
            },
            services: [
                "Custom Web Development",
                "E-commerce Solutions",
                "Progressive Web Apps",
                "Headless CMS",
                "API Integration",
                "Performance Optimization",
                "Web3 Development",
                "Maintenance & Support"
            ]
        },

        clientPortfolio: [
            {
                id: 1,
                imagePosition: "right",
                logo: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=200&h=100&fit=crop",
                companyName: "FinTech Global",
                industry: "Financial Technology",
                projectTitle: "Enterprise Banking Platform Redesign",
                projectDescription: "Architected and built a completely new digital banking platform serving 500,000+ users, featuring real-time transaction processing, advanced security protocols, and seamless mobile experience.",
                servicesProvided: [
                    "Full-Stack Development",
                    "Payment Gateway Integration",
                    "Advanced Security Implementation",
                    "Mobile Responsive Design"
                ],
                results: [
                    { value: "0.8s", label: "Page Load Time" },
                    { value: "300%", label: "Mobile Conversion" },
                    { value: "99.9%", label: "Uptime" },
                    { value: "45%", label: "Reduced Bounce Rate" }
                ],
                mediaItems: [
                    {
                        type: "image",
                        url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",
                        alt: "Banking Dashboard Interface",
                        title: "User Dashboard"
                    },
                    {
                        type: "video",
                        url: "https://www.pexels.com/download/video/5473294/",
                        alt: "Mobile App Demo",
                        title: "Mobile Experience",
                        thumbnail: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=500&fit=crop"
                    }
                ],
                testimonial: {
                    clientImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
                    clientName: "James Wilson",
                    position: "CTO, FinTech Global",
                    quote: "The platform they built handles millions in daily transactions flawlessly. The performance optimization alone increased our customer satisfaction by 60%. Engineering excellence at its finest."
                }
            }
        ],

        testimonials: {
            sectionTitle: "What Our Web Development Clients Say",
            sectionDescription: "See how our code transformed digital presence for businesses worldwide.",
            testimonials: [
                {
                    text: "The website loads so fast it feels like magic. Our bounce rate dropped from 65% to 18% instantly.",
                    image: "https://randomuser.me/api/portraits/women/22.jpg",
                    name: "Maya Rodriguez",
                    role: "Digital Director, Fashion Retail"
                },
                {
                    text: "The website loads so fast it feels like magic. Our bounce rate dropped from 65% to 18% instantly.",
                    image: "https://randomuser.me/api/portraits/women/22.jpg",
                    name: "Maya Rodriguez",
                    role: "Digital Director, Fashion Retail"
                }
            ]
        },

        faqs: {
            sectionTitle: "Web Development Questions Demystified",
            faqs: [
                {
                    question: "What's your tech stack for web development?",
                    answer: "We use modern, battle-tested technologies: React/Next.js, Vue/Nuxt.js for frontend; Node.js, Python/Django, Laravel for backend; Headless CMS (Sanity, Contentful); Shopify Plus for e-commerce; AWS/Google Cloud for hosting; and custom APIs for integrations."
                }
            ]
        },

        metadata: {
            title: "Custom Web Development Services | Website Design & Development",
            description: "Professional web development services creating responsive, high-performance websites and web applications. Custom solutions for businesses of all sizes.",
            keywords: ["web development", "website development", "custom web design", "responsive website"]
        }
    },

    contentWriting: {
        slug: "content-writing",
        category: "content-writing",
        hero: {
            tagline: "Crafted 10,000+ pieces of compelling content",
            title: "Words That Don't Just Sound Good—They Sell & Stick",
            description: "We engineer content that captures attention, builds authority, and drives action. From viral blog posts to conversion-optimized copy, we turn words into your most powerful business asset.",
            ctaText: "Get Content Audit",
            videoUrl: "https://www.pexels.com/download/video/3151915/",
            images: [
                "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=900&auto=format&fit=crop&q=60",
                "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop&q=60",
                "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=900&auto=format&fit=crop&q=60",
                "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop&q=60",
                "https://images.unsplash.com/photo-1545235617-9465d2a55698?w=900&auto=format&fit=crop&q=60",
                "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=900&auto=format&fit=crop&q=60",
                "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&auto=format&fit=crop&q=60",
                "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=900&auto=format&fit=crop&q=60"
            ]
        },

        bento: {
            mainHeading: "Content That Converts & Captivates",
            cards: {
                conceptToReality: {
                    title: "Strategy to Story",
                    imageAlt: "Content Creation Process",
                    imageUrl: "https://images.unsplash.com/photo-1545235617-9465d2a55698?w=800&auto=format&fit=crop&q=80"
                },
                projectsDelivered: {
                    count: "10K+",
                    label: "Content Pieces"
                },
                amazingWork: {
                    title: "We don't just write content. We engineer conversations that convert.",
                    structureImage: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&auto=format&fit=crop&q=80",
                    structureAlt: "Content Strategy"
                },
                showcaseStall: {
                    imageUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&auto=format&fit=crop&q=80",
                    alt: "Blog Content Strategy",
                    location: "Viral Campaign 2024"
                },
                citiesReach: {
                    count: "30+",
                    label: "Industries Covered"
                }
            },
            services: [
                "SEO-Optimized Blog Writing",
                "Conversion Copywriting",
                "Technical Documentation",
                "Email Marketing Sequences",
                "Whitepapers & Case Studies",
                "Social Media Content",
                "Script Writing",
                "Brand Voice Development"
            ]
        },

        clientPortfolio: [
            {
                id: 1,
                imagePosition: "left",
                logo: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=200&h=100&fit=crop",
                companyName: "SaaS Enterprise",
                industry: "B2B Software",
                projectTitle: "Complete Content Marketing Overhaul",
                projectDescription: "Developed and executed a comprehensive content strategy producing 200+ pieces of high-value content that positioned the company as industry thought leaders and generated millions in qualified leads.",
                servicesProvided: [
                    "Content Strategy",
                    "SEO Blog Writing",
                    "Whitepaper Creation",
                    "Email Nurture Sequences"
                ],
                results: [
                    { value: "850%", label: "Organic Traffic" },
                    { value: "3,200+", label: "Qualified Leads" },
                    { value: "15", label: "Front-page Keywords" },
                    { value: "45%", label: "Conversion Rate" }
                ],
                mediaItems: [
                    {
                        type: "image",
                        url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",
                        alt: "Blog Content Dashboard",
                        title: "Content Performance"
                    },
                    {
                        type: "image",
                        url: "https://images.unsplash.com/photo-1545235617-9465d2a55698?w=800&h=500&fit=crop",
                        alt: "Whitepaper Design",
                        title: "Industry Whitepaper"
                    }
                ],
                testimonial: {
                    clientImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face",
                    clientName: "Robert Kim",
                    position: "CMO, SaaS Enterprise",
                    quote: "Their content didn't just rank—it actually solved customer problems and drove pipeline. The ROI from content went from questionable to our highest-performing channel. Words that work."
                }
            }
        ],

        testimonials: {
            sectionTitle: "What Our Content Writing Clients Say",
            sectionDescription: "Discover how our words transformed brand communication and drove results.",
            testimonials: [
                {
                    text: "Their SEO articles consistently rank #1. We've dominated our niche keywords completely.",
                    image: "https://randomuser.me/api/portraits/men/28.jpg",
                    name: "Kenji Tanaka",
                    role: "SEO Director, Tech Startup"
                }
            ]
        },

        faqs: {
            sectionTitle: "Content Writing Questions Unpacked",
            faqs: [
                {
                    question: "What's your content creation process?",
                    answer: "4-phase process: 1) Discovery & Strategy (audience research, keyword analysis, content mapping), 2) Creation (writing, editing, optimization), 3) Enhancement (SEO optimization, visual integration, CTAs), 4) Distribution & Analysis (publishing, promotion, performance tracking)."
                }
            ]
        },

        gallery: [
            "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1545235617-9465d2a55698?w=800&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&auto=format&fit=crop&q=60"
        ],

        metadata: {
            title: "Professional Content Writing Services | SEO Content & Copywriting",
            description: "Expert content writing services including SEO articles, blog posts, website copy, and marketing content. Professional writers for all industries.",
            keywords: ["content writing", "SEO content", "copywriting services", "content marketing"]
        }
    },

    eventManagement: {
        slug: "event-management",
        category: "event-management",
        hero: {
            tagline: "Orchestrated 200+ unforgettable experiences",
            title: "Events That Don't Just Happen—They Trend",
            description: "From intimate gatherings to massive festivals, we create experiences that attendees remember and talk about for years. Every detail meticulously planned, every moment Instagram-worthy.",
            ctaText: "Plan Your Event",
            videoUrl: "https://www.pexels.com/download/video/2495382/",
            images: [
                "/images/portfolio/event-management-trilegal-stage.png",
                "https://images.unsplash.com/photo-1511578314322-379afb476865?w=900&auto=format&fit=crop&q=60",
                "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=900&auto=format&fit=crop&q=60",
                "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=900&auto=format&fit=crop&q=60",
                "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=900&auto=format&fit=crop&q=60",
                "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=900&auto=format&fit=crop&q=60",
                "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&auto=format&fit=crop&q=60"
            ]
        },

        bento: {
            mainHeading: "Experiences Worth Remembering",
            cards: {
                conceptToReality: {
                    title: "Concept to Celebration",
                    imageAlt: "Event Planning Process",
                    imageUrl: "https://images.unsplash.com/photo-1511578194003-00c80e42dc9b?w=800&auto=format&fit=crop&q=80"
                },
                projectsDelivered: {
                    count: "200+",
                    label: "Events Delivered"
                },
                amazingWork: {
                    title: "We don't just plan events. We create viral moments.",
                    structureImage: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=80",
                    structureAlt: "Event Setup"
                },
                showcaseStall: {
                    imageUrl: "/images/portfolio/event-management-trilegal-stage.png",
                    alt: "Outdoor corporate event stage production",
                    location: "Annual Summit 2024"
                },
                citiesReach: {
                    count: "20+",
                    label: "Cities Covered"
                }
            },
            services: [
                "Corporate Events",
                "Product Launches",
                "Conferences & Summits",
                "Brand Activations",
                "Wedding Planning",
                "Festival Management",
                "Virtual & Hybrid Events",
                "Entertainment Booking"
            ]
        },

        clientPortfolio: [
            {
                id: 1,
                imagePosition: "right",
                logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop",
                companyName: "Fortune Tech Corp",
                industry: "Technology",
                projectTitle: "Annual Tech Summit 2024",
                projectDescription: "Orchestrated a 3-day tech conference with 2,000+ attendees, featuring keynote speakers, breakout sessions, and interactive exhibitions that received overwhelming positive feedback.",
                servicesProvided: [
                    "Venue Management",
                    "Speaker Coordination",
                    "AV Production",
                    "Attendee Registration"
                ],
                results: [
                    { value: "2,000+", label: "Attendees" },
                    { value: "98%", label: "Satisfaction Rate" },
                    { value: "50+", label: "Industry Speakers" },
                    { value: "5M+", label: "Social Reach" }
                ],
                mediaItems: [
                    {
                        type: "image",
                        url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=500&fit=crop",
                        alt: "Conference Stage",
                        title: "Main Stage Setup"
                    },
                    {
                        type: "video",
                        url: "https://www.pexels.com/download/video/2495382/",
                        alt: "Event Highlights",
                        title: "Summit Highlights",
                        thumbnail: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=500&fit=crop"
                    },
                    {
                        type: "image",
                        url: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=500&fit=crop",
                        alt: "Networking Area",
                        title: "Networking Lounge"
                    }
                ],
                testimonial: {
                    clientImage: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&crop=face",
                    clientName: "Sarah Mitchell",
                    position: "Events Director, Fortune Tech Corp",
                    quote: "The summit exceeded all expectations. The attention to detail and seamless execution made it our most successful event to date. Attendees are still talking about it!"
                }
            }
        ],

        testimonials: {
            sectionTitle: "What Our Event Clients Say",
            sectionDescription: "Hear from brands that trusted us with their most important moments.",
            testimonials: [
                {
                    text: "The product launch event they organized went viral on social media. Flawless execution from start to finish!",
                    image: "https://randomuser.me/api/portraits/women/65.jpg",
                    name: "Emily Roberts",
                    role: "Marketing Head, Consumer Brand"
                },
                {
                    text: "Our corporate gala was the talk of the industry. They turned our vision into an unforgettable reality.",
                    image: "https://randomuser.me/api/portraits/men/45.jpg",
                    name: "David Chen",
                    role: "CEO, Financial Services"
                },
                {
                    text: "The product launch event they organized went viral on social media. Flawless execution from start to finish!",
                    image: "https://randomuser.me/api/portraits/women/65.jpg",
                    name: "Emily Roberts",
                    role: "Marketing Head, Consumer Brand"
                },
                {
                    text: "Our corporate gala was the talk of the industry. They turned our vision into an unforgettable reality.",
                    image: "https://randomuser.me/api/portraits/men/45.jpg",
                    name: "David Chen",
                    role: "CEO, Financial Services"
                }
            ]
        },

        faqs: {
            sectionTitle: "Event Management Questions Answered",
            faqs: [
                {
                    question: "What types of events do you manage?",
                    answer: "We manage all types of events including corporate conferences, product launches, brand activations, weddings, festivals, virtual events, and hybrid experiences. From intimate gatherings of 20 to large-scale events with 10,000+ attendees."
                },
                {
                    question: "How far in advance should we book?",
                    answer: "For major events, we recommend booking 3-6 months in advance. However, we've successfully executed events with 2-week notice for urgent requirements. Early booking ensures better vendor availability and venue options."
                },
                {
                    question: "Do you handle virtual and hybrid events?",
                    answer: "Yes! We specialize in virtual and hybrid events with professional streaming, interactive platforms, virtual booths, and engagement tools that create seamless experiences for both in-person and remote participants."
                }
            ]
        },

        gallery: [
            "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1519167758481-83f29da8fd88?w=800&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&auto=format&fit=crop&q=60"
        ],

        metadata: {
            title: "Professional Event Management Services | Corporate & Social Events",
            description: "Expert event management and planning services for corporate events, conferences, product launches, and social gatherings. Full-service event coordination.",
            keywords: ["event management", "corporate events", "event planning", "conference management"]
        }
    }
};

const seed = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB Connected');

        // Clear existing
        await Portfolio.deleteMany({});
        console.log('Cleared existing portfolios');

        const portfolios = Object.values(portfolioData);

        await Portfolio.insertMany(portfolios);
        console.log('Seeded ' + portfolios.length + ' portfolios');

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

seed();
