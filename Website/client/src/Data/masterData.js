// Data/masterData.js

// All services data organized by category and slug
export const servicesData = [
  {
    id: 1,
    category: "website-development",
    slug: "dynamic-static",
    data: {
      // WebHeroSection Data
      hero: {
        headline: "Build Stunning Static & Dynamic Websites",
        subHeadline: "High-performance custom websites built for speed, SEO, conversions, and business growth.",
        ctaText: "Get Your Website Now",
        trustNote1: "Fast delivery",
        trustNote2: "Trusted by clients",
        features: [
          { name: "Custom Web Development", icon: "Code" },
          { name: "Static & Dynamic Websites", icon: "Globe" },
          { name: "Fully Responsive Design", icon: "MonitorSmartphone" },
          { name: "SEO & Speed Optimization", icon: "BarChart3" },
          { name: "High-Conversion Layouts", icon: "Rocket" },
          { name: "Clean & Modern UI/UX", icon: "Layers" },
          { name: "Secure & Scalable Build", icon: "ShieldCheck" },
        ]
      },

      // AnimateImage Data
      animateImage: {
        header: {
          title: "Designed to Convert,",
          highlight: "Built to Perform"
        },
        cards: [
          {
            id: 1,
            image: "https://ik.imagekit.io/vinayak06/Mavnox/1st_animateimage",
          },
          {
            id: 2,
            image: "https://ik.imagekit.io/vinayak06/Mavnox/2animatewebsite.png",
          },
          {
            id: 3,
            image: "https://ik.imagekit.io/vinayak06/Mavnox/3animateimage.png",
          }
        ]
      },

      // ComparisonSection Data
      comparison: {
        heading: "Static vs WordPress vs Dynamic",
        subheading: "Compare the three approaches to find what's right for your project",
        columns: ["Feature", "Static", "WordPress", "Dynamic"],
        rows: [
          {
            feature: "Speed",
            values: [
              "Ultra-fast (served from CDN)",
              "Moderate (depends on plugins/themes)",
              "Fast, but logic-heavy"
            ]
          },
          {
            feature: "Hosting Cost",
            values: [
              "💸 Minimal (Netlify / GitHub Pages)",
              "🔁 Recurring (Hosting + DB)",
              "💰 Moderate to High (Node/VPS)"
            ]
          },
          {
            feature: "Maintenance",
            values: [
              "🛠️ Zero (no plugins or updates)",
              "🔁 Frequent plugin/theme updates",
              "💼 Requires backend upkeep"
            ]
          },
          {
            feature: "Security",
            values: [
              "🔒 Extremely secure (no backend)",
              "⚠️ Target for bots & spam",
              "🧑‍💻 High security with role-based access"
            ]
          },
          {
            feature: "Content Updates",
            values: [
              "👨‍💻 Requires developer or Git access",
              "📝 Easy with Visual Editor",
              "📊 Admin panel available"
            ]
          },
          {
            feature: "Ideal Use Case",
            values: [
              "📄 Landing pages, portfolios",
              "📰 Blogs, business websites",
              "🧩 CRMs, web apps, portals"
            ]
          },
          {
            feature: "SEO Friendly",
            values: [
              "✅ Yes, if structured well",
              "📈 Yes, with optimization",
              "🔍 Yes, with SSR or pre-rendering"
            ]
          },
          {
            feature: "User Interaction",
            values: [
              "🙅‍♂️ Limited",
              "🔌 Plugins give some interactivity",
              "🎯 Fully dynamic + role-based"
            ]
          },
          {
            feature: "Scalability",
            values: [
              "📉 Limited for complex systems",
              "📊 Medium",
              "🚀 Highly scalable"
            ]
          },
          {
            feature: "Build Time",
            values: [
              "⏱️ Fastest (2–5 days)",
              "⏳ Moderate",
              "🧱 Longer development cycle"
            ]
          }
        ]
      },

      // FeatureSection Data
      features: [
        {
          id: 1,
          title: "Custom Websites Built for Your Business",
          description: "At Brandbase Capsule, every website is crafted from scratch — no templates, no generic layouts. We create fully custom static and dynamic websites designed around your brand, business goals, and audience. Whether you need a clean portfolio, a powerful business site, or a fast landing page, we build it with precision and performance in mind.",
          image: 'https://cdn-site-assets.veed.io/cdn-cgi/image/width=1536,quality=75,format=auto/Use_VEED_s_stock_videos_and_personalize_them_17d7272a71/Use_VEED_s_stock_videos_and_personalize_them_17d7272a71.png',
          imagePosition: 'right',
        },
        {
          id: 2,
          title: "Optimized for Speed, SEO & Conversions",
          description: "A beautiful website is useless if it's slow or unoptimized. That's why we ensure every site we build is fast, responsive, SEO-ready, and tailored to convert visitors into customers. From clean code and lightweight pages to professional animations and interactive elements — we deliver websites that look great and perform even better.",
          image: 'https://cdn-site-assets.veed.io/cdn-cgi/image/width=1536,quality=75,format=auto/Add_audio_sound_effects_and_more_128d3eb591/Add_audio_sound_effects_and_more_128d3eb591.png',
          imagePosition: 'left',
        },
        {
          id: 3,
          title: "Easy to Maintain & Ready to Scale",
          description: "We build websites that are simple to edit, update, and scale as your business grows. Whether it's adding new pages, updating content, connecting third-party tools, or expanding into dynamic features — your website will stay future-proof. Plus, we provide ongoing support so your digital presence always stays sharp and up to date.",
          image: 'https://cdn-site-assets.veed.io/cdn-cgi/image/width=1536,quality=75,format=auto/Easily_download_and_share_9dbd80903f/Easily_download_and_share_9dbd80903f.png',
          imagePosition: 'right',
        },
      ],

      // ServicePackages Data
      packages: {
        header: {
          titleLine1: "Smart Web Solutions for",
          highlighted: "every business",
          subtitle: "Static or dynamic — we build SEO & AEO-optimized websites that load faster, rank higher, and help you grow."
        },
        packages: {
          essential: {
            id: "essential",
            title: "Static Website Essentials",
            price: "₹4,999",
            icon: "layers",
            image: "https://www.honestwebs.com/wp-content/uploads/2023/12/mysterious_disappearance_of_jack.jpg",
            features: [
              "Fast-loading, SEO-friendly static pages",
              "Pixel-perfect responsive design",
              "AEO-ready structure for Google AI Overviews",
              "Lightweight & zero-maintenance",
              "Best for landing pages & portfolios"
            ]
          },
          signature: {
            id: "signature",
            title: "Dynamic Website Pro",
            price: "₹14,999",
            icon: "server",
            image: "https://img.freepik.com/premium-photo/3d-render-laptop-with-binary-code-symbol-laptop-screen-3d-render-laptop-with-binary_912214-97809.jpg",
            features: [
              "Admin dashboard for easy updates",
              "Live database-based content",
              "SEO-optimized dynamic routing",
              "Modern interactive UI/UX",
              "Great for blogs & service websites"
            ]
          },
          royal: {
            id: "royal",
            title: "Dynamic + Automation Suite",
            price: "₹29,999",
            icon: "cpu",
            image: "https://res.cloudinary.com/upwork-cloud/image/upload/c_scale,w_1000/v1690916243/catalog/1670904632652881920/pjuxlnbtugb5olybfta2.jpg",
            features: [
              "Full dynamic system with custom CMS",
              "Booking, payments & workflow automation",
              "AI-enhanced SEO + AEO content structure",
              "Enterprise-level performance & security",
              "Best for SaaS, e-commerce & ERPs"
            ]
          }
        }
      },

      // VideoMakerSection Data
      videoMaker: {
        heading: "More Than Just a Website Service",
        imageUrl: "https://ik.imagekit.io/vinayak06/Mavnox/websiteimage",
        paragraphs: [
          "At Brandbase Capsule, we don't just 'make websites' — we create fast, modern, and conversion-focused digital experiences. Our static and dynamic websites are built for performance, SEO, and long-term scalability, helping your brand stand out and stay relevant in today's competitive online world.",
          "Whether you need a clean static website, a feature-rich dynamic platform, or a custom solution tailored to your business, we build everything from scratch with precision. No templates, no shortcuts — just professional, high-quality development that works smoothly on every device."
        ]
      }
    }
  },
  {
    id: 2,
    category: "website-development",
    slug: "business-website",
    data: {
      hero: {
        headline: "Elevate Your Brand with a Powerful Business Website",
        subHeadline: "Establish authority, attract high-value clients, and automate your growth with a digital headquarters built for success.",
        ctaText: "Launch Your Business Online",
        trustNote1: "Market-ready in days",
        trustNote2: "Zero technical debt",
        features: [
          { name: "Brand-First Design", icon: "PenTool" },
          { name: "Lead Generation Optimized", icon: "Magnet" },
          { name: "Lightning Fast Speed", icon: "Zap" },
          { name: "SEO Architecture", icon: "Search" },
          { name: "Mobile Responsive", icon: "Smartphone" },
          { name: "Contact Automation", icon: "Mail" },
          { name: "Trust Signals & Social Proof", icon: "Award" }
        ]
      },

      animateImage: {
        header: {
          title: "Your 24/7 Sales",
          highlight: "Representative"
        },
        cards: [
          {
            id: 1,
            image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
          },
          {
            id: 2,
            image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2664&auto=format&fit=crop"
          },
          {
            id: 3,
            image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"
          }
        ]
      },

      comparison: {
        heading: "DIY vs. Templates vs. Custom Build",
        subheading: "Why a custom business site is the only asset that truly scales with you.",
        columns: ["Feature", "DIY Builders", "Generic Templates", "Custom Business Site"],
        rows: [
          {
            feature: "First Impression",
            values: [
              "🧩 Generic & Common",
              "😐 Decent but repetitive",
              "🤩 Unique Brand Identity"
            ]
          },
          {
            feature: "Page Speed (Core Web Vitals)",
            values: [
              "🐢 Slow (bloated code)",
              "⚠️ Inconsistent",
              "⚡ 90+ Score Guaranteed"
            ]
          },
          {
            feature: "SEO Capability",
            values: [
              "📉 Very Basic",
              "🛑 Limited by theme",
              "🚀 Advanced Schema & Tech SEO"
            ]
          },
          {
            feature: "Scalability",
            values: [
              "🧱 Hard to move away",
              "🛠️ Breaks with plugins",
              "📈 Infinite scalability"
            ]
          },
          {
            feature: "Security",
            values: [
              "🛡️ Shared environment",
              "🔓 Vulnerable to exploits",
              "🔒 Enterprise-grade logic"
            ]
          },
          {
            feature: "Ownership",
            values: [
              "🚫 You rent the platform",
              "📄 License based",
              "✅ 100% You own the code"
            ]
          },
          {
            feature: "Conversion Focus",
            values: [
              "❌ Hard to optimize",
              "📉 Form over function",
              "🎯 Strategic UX Funnels"
            ]
          },
          {
            feature: "Integration",
            values: [
              "🔗 Limited options",
              "🧩 Plugin dependency",
              "🤖 API & CRM ready"
            ]
          },
          {
            feature: "Maintenance",
            values: [
              "🔧 Constant tweaking",
              "🔄 Frequent updates needed",
              "🧘 Managed & Stable"
            ]
          },
          {
            feature: "Cost Long-term",
            values: [
              "💸 High monthly fees",
              "💵 Hidden plugin costs",
              "💎 High ROI Investment"
            ]
          }
        ]
      },

      features: [
        {
          id: 1,
          title: "Digital Credibility That Sticks",
          description: "In the B2B and B2C world, your website is your handshake. We build platforms that instantly establish trust using psychology-backed layouts, social proof integration, and a seamless user journey. Stop losing clients to competitors who simply 'look' better.",
          image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop",
          imagePosition: "right"
        },
        {
          id: 2,
          title: "Lead-Gen Engines, Not Just Brochures",
          description: "Pretty pictures don't pay the bills. We engineer your business site with conversion in mind. From strategically placed Call-to-Actions (CTAs) to frictionless contact forms and WhatsApp integrations, we turn passive visitors into active leads.",
          image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
          imagePosition: "left"
        },
        {
          id: 3,
          title: "Future-Proof Tech Stack",
          description: "Don't let technical debt slow you down. We utilize modern technologies (React, Next.js, or lightweight CMS) to ensure your site remains fast, secure, and compatible with the latest marketing tools. As your business grows, your site grows with you effortlessly.",
          image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
          imagePosition: "right"
        }
      ],

      packages: {
        header: {
          titleLine1: "Growth Packages for",
          highlighted: "Serious Businesses",
          subtitle: "From startups to established enterprises, pick the plan that matches your ambition."
        },
        packages: {
          essential: {
            id: "essential",
            title: "Startup Presence",
            price: "₹12,999",
            icon: "briefcase",
            image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2072&auto=format&fit=crop",
            features: [
              "5-Page Professional Website",
              "Mobile-Responsive Layout",
              "Basic SEO Setup (Meta tags)",
              "Contact Form Integration",
              "Social Media Linking",
              "1 Month Free Support"
            ]
          },
          signature: {
            id: "signature",
            title: "Growth Accelerator",
            price: "₹24,999",
            icon: "trending-up",
            image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2071&auto=format&fit=crop",
            features: [
              "Up to 10 Pages + Blog Section",
              "CMS for Easy Editing",
              "Advanced SEO & Speed Opt.",
              "WhatsApp Chat Integration",
              "Google Analytics Setup",
              "Newsletter Signup Form"
            ]
          },
          royal: {
            id: "royal",
            title: "Market Dominator",
            price: "₹49,999",
            icon: "crown",
            image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=2574&auto=format&fit=crop",
            features: [
              "Unlimited Pages & Custom Features",
              "CRM & Payment Gateway Integration",
              "Automated Email Sequences",
              "A/B Testing Ready",
              "Priority Support & Maintenance",
              "Competitor Analysis Report"
            ]
          }
        }
      },

      videoMaker: {
        heading: "Your Office Online, Open 24/7",
        imageUrl: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop",
        paragraphs: [
          "A business website isn't an expense; it's your highest ROI employee. At Brandbase Capsule, we understand that your digital presence needs to communicate authority the moment a page loads. We move beyond generic templates to deliver a custom-coded experience that tells your story and sells your services while you sleep.",
          "We combine aesthetic brilliance with technical rigor. Whether you are a law firm, a consultancy, a manufacturer, or a service provider, we build the infrastructure you need to compete at the highest level. Secure, scalable, and stunning—this is business done right."
        ]
      }
    }
  },
  {
  id: 3,
  category: "website-development",
  slug: "portfolio-website",
  data: {
    hero: {
      headline: "Showcase Your Talent with a Stunning Portfolio Website",
      subHeadline: "Transform your work into an unforgettable digital experience that attracts clients, impresses employers, and lands dream opportunities.",
      ctaText: "Launch Your Portfolio",
      trustNote1: "Creative-focused design",
      trustNote2: "Client-winning layouts",
      features: [
        { name: "Visual Storytelling", icon: "Palette" },
        { name: "Project Showcase", icon: "Briefcase" },
        { name: "Interactive Galleries", icon: "Image" },
        { name: "Case Studies", icon: "FileText" },
        { name: "Resume Integration", icon: "User" },
        { name: "Contact Forms", icon: "MessageSquare" },
        { name: "Social Media Links", icon: "Share2" }
      ]
    },

    animateImage: {
      header: {
        title: "Your Digital",
        highlight: "Showcase"
      },
      cards: [
        {
          id: 1,
          image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"
        },
        {
          id: 2,
          image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1974&auto=format&fit=crop"
        },
        {
          id: 3,
          image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=2070&auto=format&fit=crop"
        }
      ]
    },

    comparison: {
      heading: "Portfolio Website Options Compared",
      subheading: "Choose the right portfolio platform to showcase your work effectively",
      columns: ["Feature", "Social Media Profiles", "Template Builders", "Custom Portfolio Website"],
      rows: [
        {
          feature: "First Impression",
          values: [
            "📱 Generic & Crowded",
            "🎨 Decent but Limited",
            "✨ Wow Factor Guaranteed"
          ]
        },
        {
          feature: "Customization",
          values: [
            "🚫 Platform Restrictions",
            "⚙️ Limited Options",
            "🎯 Complete Creative Freedom"
          ]
        },
        {
          feature: "Project Presentation",
          values: [
            "📸 Basic Image Uploads",
            "🖼️ Standard Galleries",
            "🎬 Interactive Case Studies"
          ]
        },
        {
          feature: "Brand Identity",
          values: [
            "👥 Mixed with Others",
            "🏷️ Template-based",
            "🎨 Fully Personalized"
          ]
        },
        {
          feature: "Loading Speed",
          values: [
            "🐌 Social Platform Dependent",
            "⚡ Decent",
            "🚀 Optimized for Creatives"
          ]
        },
        {
          feature: "Mobile Experience",
          values: [
            "📱 App Dependent",
            "📲 Responsive",
            "📱 Mobile-First Design"
          ]
        },
        {
          feature: "SEO Visibility",
          values: [
            "🔍 Limited Control",
            "📊 Basic",
            "🌟 Portfolio-Optimized SEO"
          ]
        },
        {
          feature: "Contact Options",
          values: [
            "💬 DM Only",
            "📧 Basic Form",
            "🤝 Multi-channel Integration"
          ]
        },
        {
          feature: "Ownership",
          values: [
            "🚫 Platform Owns It",
            "📄 License Restrictions",
            "✅ 100% Yours Forever"
          ]
        },
        {
          feature: "Professionalism",
          values: [
            "🎭 Casual",
            "👔 Semi-Professional",
            "💼 Agency-Level Quality"
          ]
        }
      ]
    },

    features: [
      {
        id: 1,
        title: "Visual Storytelling That Captivates Clients",
        description: "Your portfolio is more than a collection of work—it's your career narrative. We design portfolio websites that tell compelling visual stories, guiding visitors through your creative journey with intentional layouts, engaging animations, and strategic content hierarchy. From photographers to designers, developers to artists, we craft digital experiences that make your talent impossible to ignore.",
        image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=2070&auto=format&fit=crop",
        imagePosition: "right"
      },
      {
        id: 2,
        title: "Project Galleries That Showcase Your Process",
        description: "Great portfolios don't just show final products—they reveal your creative process. We build interactive galleries with before/after comparisons, project breakdowns, and behind-the-scenes insights. Whether you need image sliders, video showcases, or 3D model viewers, we implement the perfect presentation format that highlights your skills and demonstrates your approach to problem-solving.",
        image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=2069&auto=format&fit=crop",
        imagePosition: "left"
      },
      {
        id: 3,
        title: "Client-Focused Design That Converts Browsers into Opportunities",
        description: "A beautiful portfolio is useless if it doesn't lead to work. We optimize every element for conversion—clear call-to-action buttons, easy-to-find contact information, downloadable resumes, and project-specific inquiry forms. Your portfolio becomes a 24/7 lead generation machine that attracts ideal clients and makes it effortless for them to start conversations about collaborations.",
        image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=2069&auto=format&fit=crop",
        imagePosition: "right"
      }
    ],

    packages: {
      header: {
        titleLine1: "Portfolio Packages for",
        highlighted: "Every Creative Professional",
        subtitle: "From emerging artists to established professionals—showcase your work with impact."
      },
      packages: {
        essential: {
          id: "essential",
          title: "Starter Portfolio",
          price: "₹8,999",
          icon: "palette",
          image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=2070&auto=format&fit=crop",
          features: [
            "3-5 Page Portfolio Website",
            "Responsive Mobile Design",
            "Project Gallery with Filters",
            "About & Contact Pages",
            "Basic SEO Setup",
            "Social Media Integration",
            "1 Month Free Support"
          ]
        },
        signature: {
          id: "signature",
          title: "Professional Showcase",
          price: "₹16,999",
          icon: "award",
          image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1974&auto=format&fit=crop",
          features: [
            "5-8 Page Advanced Portfolio",
            "Interactive Project Galleries",
            "Case Study Templates",
            "Resume/ CV Integration",
            "Advanced SEO Optimization",
            "Blog/ Journal Section",
            "Newsletter Signup",
            "Analytics Dashboard"
          ]
        },
        royal: {
          id: "royal",
          title: "Premium Creative Hub",
          price: "₹29,999",
          icon: "sparkles",
          image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=2069&auto=format&fit=crop",
          features: [
            "8-12+ Page Premium Portfolio",
            "Custom Interactive Elements",
            "Video Backgrounds & Animations",
            "E-commerce for Digital Products",
            "Client Portal for Collaborations",
            "Custom CMS for Easy Updates",
            "Priority Design Revisions",
            "Ongoing Maintenance Package"
          ]
        }
      }
    },

    videoMaker: {
      heading: "More Than a Portfolio—Your Digital Creative Identity",
      imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2053&auto=format&fit=crop",
      paragraphs: [
        "Your portfolio website is the digital front door to your creative career. At Brandbase Capsule, we understand that showcasing your work isn't about cramming everything onto a page—it's about curating an experience that reflects your unique style, demonstrates your expertise, and makes potential clients excited to work with you.",
        "Whether you're a graphic designer needing pixel-perfect layouts, a photographer requiring stunning image optimization, a developer showcasing interactive projects, or an artist seeking gallery-like presentations—we build portfolio websites that don't just display your work, but amplify your professional presence. Every portfolio is crafted with attention to detail, ensuring your creative vision shines through while maintaining the technical excellence that keeps visitors engaged."
      ]
    }
  }
},
{
  id: 4,
  category: "website-development",
  slug: "landing-page-development",
  data: {
    hero: {
      headline: "High-Converting Landing Pages That Drive Results",
      subHeadline: "Stop wasting ad spend. Get laser-focused landing pages designed to capture leads, boost sales, and maximize your marketing ROI.",
      ctaText: "Get Your Landing Page",
      trustNote1: "Conversion-optimized",
      trustNote2: "ROI-focused design",
      features: [
        { name: "Conversion-First Design", icon: "Target" },
        { name: "A/B Testing Ready", icon: "TestTube" },
        { name: "Lightning Fast Loading", icon: "Zap" },
        { name: "Lead Capture Forms", icon: "ClipboardList" },
        { name: "Mobile-First Approach", icon: "Smartphone" },
        { name: "Analytics Integration", icon: "BarChart3" },
        { name: "Funnel Optimization", icon: "TrendingUp" }
      ]
    },

    animateImage: {
      header: {
        title: "Your Digital",
        highlight: "Sales Funnel"
      },
      cards: [
        {
          id: 1,
          image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"
        },
        {
          id: 2,
          image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop"
        },
        {
          id: 3,
          image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=2025&auto=format&fit=crop"
        }
      ]
    },

    comparison: {
      heading: "Landing Page Effectiveness Compared",
      subheading: "Why generic pages fail and conversion-optimized pages succeed",
      columns: ["Feature", "Generic Website Page", "Template Landing Page", "Custom Conversion Page"],
      rows: [
        {
          feature: "Conversion Rate",
          values: [
            "📉 1-2% Average",
            "📊 3-5% Typical",
            "🚀 8-15%+ Optimized"
          ]
        },
        {
          feature: "Loading Speed",
          values: [
            "🐌 Multiple seconds",
            "⚡ 2-3 seconds",
            "💨 <1.5 seconds"
          ]
        },
        {
          feature: "Mobile Optimization",
          values: [
            "📱 Basic responsive",
            "📲 Mobile-friendly",
            "📱 Mobile-first design"
          ]
        },
        {
          feature: "A/B Testing",
          values: [
            "❌ Not built for tests",
            "⚙️ Limited options",
            "🔬 Built-in test framework"
          ]
        },
        {
          feature: "Lead Quality",
          values: [
            "🎣 Random inquiries",
            "📝 Basic information",
            "🎯 Qualified leads"
          ]
        },
        {
          feature: "SEO Performance",
          values: [
            "🔍 Basic indexing",
            "📊 Standard SEO",
            "🌟 Landing page SEO"
          ]
        },
        {
          feature: "Analytics",
          values: [
            "📈 Basic page views",
            "📊 Standard tracking",
            "🎯 Conversion tracking"
          ]
        },
        {
          feature: "User Psychology",
          values: [
            "🤔 No strategy",
            "🧠 Basic principles",
            "🎯 Conversion psychology"
          ]
        },
        {
          feature: "Cost Per Lead",
          values: [
            "💸 High (inefficient)",
            "💰 Moderate",
            "📉 Low (optimized)"
          ]
        },
        {
          feature: "ROI Tracking",
          values: [
            "📉 Difficult to measure",
            "📊 Basic tracking",
            "📈 Full attribution"
          ]
        }
      ]
    },

    features: [
      {
        id: 1,
        title: "Psychology-Driven Design That Converts Visitors",
        description: "Great landing pages aren't just beautiful—they're engineered for conversion. We apply proven psychological principles (scarcity, social proof, urgency, authority) to every element. From headline hierarchy to button placement, color psychology to trust signals, we design pages that guide visitors seamlessly through your sales funnel and eliminate decision paralysis.",
        image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop",
        imagePosition: "right"
      },
      {
        id: 2,
        title: "Lightning-Fast Performance That Keeps Users Engaged",
        description: "Every second of load time can cost you conversions. We build landing pages with performance as priority—optimized images, minimal code, strategic lazy loading, and CDN integration. Our pages consistently achieve 90+ Google PageSpeed scores, ensuring your visitors never bounce due to slow loading, especially on mobile devices where speed matters most.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
        imagePosition: "left"
      },
      {
        id: 3,
        title: "Data-Backed Optimization That Improves Over Time",
        description: "Your landing page isn't a one-time project—it's a living asset that gets smarter with data. We integrate comprehensive analytics, heatmaps, and A/B testing frameworks from day one. Track micro-conversions, user behavior, and drop-off points to continuously optimize performance. Turn insights into improvements that steadily increase your conversion rates month after month.",
        image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=2025&auto=format&fit=crop",
        imagePosition: "right"
      }
    ],

    packages: {
      header: {
        titleLine1: "Conversion-Focused Packages for",
        highlighted: "Every Campaign Need",
        subtitle: "From product launches to lead magnets—get landing pages that actually convert."
      },
      packages: {
        essential: {
          id: "essential",
          title: "Lead Capture Page",
          price: "₹6,999",
          icon: "target",
          image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1974&auto=format&fit=crop",
          features: [
            "Single Conversion-Focused Page",
            "Mobile-Optimized Design",
            "Contact/Lead Form Integration",
            "Basic Analytics Setup",
            "Social Proof Elements",
            "CTA Optimization",
            "1 Week Launch Support"
          ]
        },
        signature: {
          id: "signature",
          title: "Product Launch Page",
          price: "₹14,999",
          icon: "rocket",
          image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
          features: [
            "Multi-section Landing Page",
            "A/B Testing Framework",
            "Countdown Timers",
            "Video Integration",
            "Advanced Form Fields",
            "CRM Integration Ready",
            "Heatmap Analytics",
            "30-Day Optimization"
          ]
        },
        royal: {
          id: "royal",
          title: "Campaign Suite",
          price: "₹24,999",
          icon: "trending-up",
          image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=2025&auto=format&fit=crop",
          features: [
            "3 Connected Landing Pages",
            "Full Conversion Funnel",
            "Payment Gateway Integration",
            "Advanced Analytics Dashboard",
            "Automated Email Sequences",
            "Retargeting Pixel Setup",
            "Monthly Performance Reports",
            "Quarterly A/B Testing"
          ]
        }
      }
    },

    videoMaker: {
      heading: "Your Ads Deserve Better Landing Pages",
      imageUrl: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop",
      paragraphs: [
        "You're spending thousands on ads, but where do those clicks actually go? To a generic website page that wasn't designed to convert. At Brandbase Capsule, we build landing pages that complete what your ads start—turning clicks into customers with surgical precision.",
        "Every element of our landing pages is engineered for one purpose: conversion. We don't just design pretty pages; we architect digital sales funnels that guide visitors toward action, remove friction points, and deliver measurable ROI. Whether you're launching a new product, capturing leads for a webinar, or driving e-commerce sales, we create landing experiences that make every marketing dollar work harder."
      ]
    }
  }
},
{
  id: 5,
  category: "website-development",
  slug: "cms-website",
  data: {
    hero: {
      headline: "Powerful CMS Websites That You Control",
      subHeadline: "Take full control of your content with intuitive admin panels, flexible workflows, and publishing tools that grow with your business.",
      ctaText: "Build Your CMS Site",
      trustNote1: "Easy content management",
      trustNote2: "Future-proof technology",
      features: [
        { name: "Custom Admin Dashboard", icon: "LayoutDashboard" },
        { name: "Drag & Drop Editor", icon: "MousePointerClick" },
        { name: "Multi-User Roles", icon: "Users" },
        { name: "Media Library", icon: "Image" },
        { name: "SEO Management", icon: "Search" },
        { name: "Content Workflows", icon: "Workflow" },
        { name: "Version Control", icon: "GitBranch" }
      ]
    },

    animateImage: {
      header: {
        title: "Content Control,",
        highlight: "Simplified"
      },
      cards: [
        {
          id: 1,
          image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2074&auto=format&fit=crop"
        },
        {
          id: 2,
          image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"
        },
        {
          id: 3,
          image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop"
        }
      ]
    },

    comparison: {
      heading: "CMS Platform Options Compared",
      subheading: "Choose the right content management solution for your team's needs",
      columns: ["Feature", "WordPress/Generic CMS", "Website Builders", "Custom CMS Solution"],
      rows: [
        {
          feature: "Customization",
          values: [
            "🔌 Plugin Dependent",
            "🚫 Very Limited",
            "🎯 Tailored to Your Needs"
          ]
        },
        {
          feature: "Performance",
          values: [
            "🐌 Plugin Bloat Slows It",
            "⚡ Good but Limited",
            "🚀 Optimized for Speed"
          ]
        },
        {
          feature: "Security",
          values: [
            "⚠️ Frequent Updates Needed",
            "🔒 Platform Managed",
            "🛡️ Enterprise-Grade Security"
          ]
        },
        {
          feature: "Content Workflow",
          values: [
            "📝 Basic Editor",
            "✏️ Visual Editor",
            "🔧 Custom Publishing Flow"
          ]
        },
        {
          feature: "Team Collaboration",
          values: [
            "👥 Limited Roles",
            "🙅‍♂️ Single User Focused",
            "👨‍💻 Role-Based Access Control"
          ]
        },
        {
          feature: "Media Management",
          values: [
            "📁 Basic Uploader",
            "🖼️ Simple Gallery",
            "📚 Advanced Media Library"
          ]
        },
        {
          feature: "SEO Capabilities",
          values: [
            "🔍 Plugin Dependent",
            "📊 Basic",
            "🌟 Advanced SEO Tools"
          ]
        },
        {
          feature: "Scalability",
          values: [
            "📈 Limited by Hosting",
            "🧱 Hard to Scale",
            "🚀 Built to Grow"
          ]
        },
        {
          feature: "Maintenance",
          values: [
            "🔧 Constant Updates",
            "🔄 Platform Handles",
            "⚙️ Minimal & Managed"
          ]
        },
        {
          feature: "Total Cost of Ownership",
          values: [
            "💸 Hidden Plugin Costs",
            "💰 Monthly Fees Add Up",
            "💎 Predictable & Transparent"
          ]
        }
      ]
    },

    features: [
      {
        id: 1,
        title: "Intuitive Content Management That Your Team Will Love",
        description: "Stop wrestling with complicated dashboards. We build custom CMS interfaces that match your team's workflow, not the other way around. Whether you need simple blog publishing, complex product catalogs, or multi-language content management, we create admin panels that are powerful yet intuitive—so your team can focus on creating great content instead of learning complicated systems.",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2074&auto=format&fit=crop",
        imagePosition: "right"
      },
      {
        id: 2,
        title: "Flexible Architecture That Adapts to Your Business",
        description: "Your content needs evolve—your CMS should too. We build modular CMS solutions with flexible content models that can grow with your business. Add new content types, custom fields, or entire sections without rebuilding from scratch. From news portals with advanced categorization to educational platforms with course management—we create systems that adapt rather than restrict.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
        imagePosition: "left"
      },
      {
        id: 3,
        title: "Multi-User Collaboration That Streamlines Publishing",
        description: "Great content often requires teamwork. Our CMS solutions include sophisticated user management with role-based permissions, editorial workflows, approval processes, and version control. Writers can draft, editors can review, and administrators can publish—all within a seamless collaborative environment that ensures brand consistency while empowering your entire team.",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
        imagePosition: "right"
      }
    ],

    packages: {
      header: {
        titleLine1: "Content Management Solutions for",
        highlighted: "Every Publishing Need",
        subtitle: "From simple blogs to complex content hubs—manage your digital content with ease."
      },
      packages: {
        essential: {
          id: "essential",
          title: "Basic CMS Website",
          price: "₹18,999",
          icon: "file-text",
          image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2074&auto=format&fit=crop",
          features: [
            "Custom Admin Dashboard",
            "Blog/News Management",
            "Basic Page Builder",
            "Image Gallery",
            "SEO Metadata Control",
            "Contact Form Integration",
            "1 Admin User Included"
          ]
        },
        signature: {
          id: "signature",
          title: "Advanced CMS Platform",
          price: "₹32,999",
          icon: "layers",
          image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
          features: [
            "Multi-User Role System",
            "Custom Content Types",
            "Advanced Media Library",
            "Content Versioning",
            "Scheduled Publishing",
            "API Integration Ready",
            "Analytics Dashboard",
            "3 Admin Users Included"
          ]
        },
        royal: {
          id: "royal",
          title: "Enterprise Content Hub",
          price: "₹54,999",
          icon: "server",
          image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
          features: [
            "Custom Workflow Engine",
            "Multi-language Support",
            "Advanced Search Functionality",
            "Content Analytics",
            "Automated Backup System",
            "Custom API Development",
            "Training & Documentation",
            "Unlimited Admin Users",
            "Priority Support"
          ]
        }
      }
    },

    videoMaker: {
      heading: "Take Control of Your Digital Content",
      imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2074&auto=format&fit=crop",
      paragraphs: [
        "Your website's content shouldn't be locked behind developer gates or complicated interfaces. At Brandbase Capsule, we build CMS solutions that put you in the driver's seat—giving your team the tools to create, manage, and publish content without technical barriers.",
        "We understand that every organization has unique content needs. Whether you're running a media publication with multiple editors, an educational institution with complex course materials, or a corporate site with regular updates—we design CMS systems that fit your workflow perfectly. No more adapting your process to a rigid platform; we build the platform that adapts to you."
      ]
    }
  }
},
{
  id: 6,
  category: "website-development",
  slug: "ecommerce-websites",
  data: {
    hero: {
      headline: "High-Converting E-Commerce Stores That Sell 24/7",
      subHeadline: "Launch a fully-featured online store with secure payments, inventory management, and marketing tools that drive consistent sales.",
      ctaText: "Start Selling Online",
      trustNote1: "Payment-ready",
      trustNote2: "Mobile-optimized",
      features: [
        { name: "Secure Payment Gateway", icon: "CreditCard" },
        { name: "Product Management", icon: "Package" },
        { name: "Shopping Cart", icon: "ShoppingCart" },
        { name: "Inventory Tracking", icon: "PackageCheck" },
        { name: "Order Management", icon: "ClipboardList" },
        { name: "Customer Accounts", icon: "User" },
        { name: "Analytics Dashboard", icon: "BarChart3" }
      ]
    },

    animateImage: {
      header: {
        title: "Your Digital",
        highlight: "Storefront"
      },
      cards: [
        {
          id: 1,
          image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop"
        },
        {
          id: 2,
          image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop"
        },
        {
          id: 3,
          image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop"
        }
      ]
    },

    comparison: {
      heading: "E-Commerce Platform Options Compared",
      subheading: "Choose the right e-commerce solution for your business scale and needs",
      columns: ["Feature", "Marketplace Platforms", "Template Store Builders", "Custom E-Commerce Store"],
      rows: [
        {
          feature: "Transaction Fees",
          values: [
            "💸 5-15% per sale",
            "💰 2-3% + monthly fees",
            "✅ 0% (Only payment processor)"
          ]
        },
        {
          feature: "Brand Control",
          values: [
            "🚫 Platform's rules",
            "🏷️ Limited customization",
            "🎯 Complete brand freedom"
          ]
        },
        {
          feature: "Checkout Experience",
          values: [
            "🛒 Platform's checkout",
            "📱 Standard checkout",
            "✨ Custom optimized flow"
          ]
        },
        {
          feature: "Inventory Management",
          values: [
            "📦 Basic listing tools",
            "📊 Moderate features",
            "📈 Advanced inventory system"
          ]
        },
        {
          feature: "Customer Data",
          values: [
            "🔒 Platform owns data",
            "📝 Limited access",
            "🗂️ You own all data"
          ]
        },
        {
          feature: "Payment Options",
          values: [
            "💳 Platform's gateways",
            "🏦 Selected providers",
            "🔗 Multiple integrations"
          ]
        },
        {
          feature: "SEO Capability",
          values: [
            "🔍 Very limited",
            "📊 Standard",
            "🌟 Advanced e-commerce SEO"
          ]
        },
        {
          feature: "Mobile Experience",
          values: [
            "📱 App focused",
            "📲 Mobile responsive",
            "📱 Mobile-first PWA"
          ]
        },
        {
          feature: "Scalability",
          values: [
            "📉 Platform limits",
            "📈 Moderate growth",
            "🚀 Enterprise scalable"
          ]
        },
        {
          feature: "Total Cost (3 years)",
          values: [
            "💸 High (fees add up)",
            "💰 Moderate (fees + subscriptions)",
            "💎 Best long-term value"
          ]
        }
      ]
    },

    features: [
      {
        id: 1,
        title: "Seamless Shopping Experience That Converts Browsers into Buyers",
        description: "We design e-commerce stores that make shopping effortless. From intuitive navigation and smart product filtering to one-click add-to-cart and streamlined checkout—every element is optimized to reduce friction and increase conversions. Whether you're selling physical products, digital downloads, or subscription services, we create shopping experiences that feel natural and encourage purchases.",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop",
        imagePosition: "right"
      },
      {
        id: 2,
        title: "Complete Business Management That Simplifies Operations",
        description: "Running an online store shouldn't mean drowning in admin work. We build comprehensive backend systems with inventory management, order processing, customer relationship tools, and analytics dashboards. Track stock levels automatically, manage shipping across multiple carriers, handle returns effortlessly, and gain insights into what's selling—all from one intuitive control panel.",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop",
        imagePosition: "left"
      },
      {
        id: 3,
        title: "Marketing-Ready Features That Drive Repeat Business",
        description: "Your store should work as your best marketing employee. We integrate built-in promotional tools, email marketing automation, abandoned cart recovery, customer loyalty programs, and social commerce features. Launch flash sales, create discount codes, recommend related products, and build customer relationships that keep shoppers coming back for more.",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop",
        imagePosition: "right"
      }
    ],

    packages: {
      header: {
        titleLine1: "E-Commerce Solutions for",
        highlighted: "Every Business Stage",
        subtitle: "From starting your first store to scaling an enterprise—sell online with confidence."
      },
      packages: {
        essential: {
          id: "essential",
          title: "Starter Store",
          price: "₹24,999",
          icon: "shopping-bag",
          image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop",
          features: [
            "Up to 50 Products",
            "Secure Payment Gateway",
            "Shopping Cart & Checkout",
            "Basic Inventory Management",
            "Order Tracking",
            "Mobile-Optimized Design",
            "Basic SEO Setup"
          ]
        },
        signature: {
          id: "signature",
          title: "Growth Store",
          price: "₹44,999",
          icon: "trending-up",
          image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop",
          features: [
            "Unlimited Products",
            "Multiple Payment Gateways",
            "Advanced Inventory System",
            "Customer Accounts & Profiles",
            "Product Reviews & Ratings",
            "Email Marketing Integration",
            "Analytics Dashboard",
            "Abandoned Cart Recovery"
          ]
        },
        royal: {
          id: "royal",
          title: "Enterprise Marketplace",
          price: "₹79,999",
          icon: "store",
          image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop",
          features: [
            "Multi-vendor Marketplace",
            "Subscription Management",
            "Advanced Shipping Rules",
            "Custom Checkout Flow",
            "Loyalty Program System",
            "API Integration Ready",
            "Advanced Security Features",
          ]
        }
      }
    },

    videoMaker: {
      heading: "Your Business, Open 24/7 to the World",
      imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop",
      paragraphs: [
        "An e-commerce store isn't just a website—it's your digital sales team, inventory manager, and customer service department all in one. At Brandbase Capsule, we build online stores that don't just look great, but work hard to grow your business around the clock.",
        "We understand that every product category has unique needs. Whether you're selling handmade crafts, digital products, subscription boxes, or industrial equipment—we create tailored e-commerce solutions that showcase your products perfectly while handling the complex logistics of online sales. From secure payment processing to automated inventory updates, we handle the technical challenges so you can focus on what you do best: running your business."
      ]
    }
  }
}
];

// Helper function to find service by category and slug
export function getServiceData(category, slug) {
  const service = servicesData.find(
    service => service.category === category && service.slug === slug
  );
  console.log("Looking for service:", { category, slug, found: !!service }); // Add this for debugging
  return service ? service.data : null;
}

// Helper function to get all services by category
export function getServicesByCategory(category) {
  return servicesData.filter(service => service.category === category);
}

// Helper function to get all unique categories
export function getAllCategories() {
  return [...new Set(servicesData.map(service => service.category))];
}

// Get service metadata (without the full data)
export function getServiceMetadata(category, slug) {
  const service = servicesData.find(
    s => s.category === category && s.slug === slug
  );
  
  if (!service) return null;
  
  return {
    id: service.id,
    category: service.category,
    slug: service.slug,
    heroHeadline: service.data.hero.headline,
    heroSubHeadline: service.data.hero.subHeadline,
  };
}

// Get all services metadata for listings
export function getAllServicesMetadata() {
  return servicesData.map(service => ({
    id: service.id,
    category: service.category,
    slug: service.slug,
    heroHeadline: service.data.hero.headline,
    heroSubHeadline: service.data.hero.subHeadline,
    features: service.data.hero.features,
  }));
}

// For backward compatibility - export individual service if needed


{/*
export const DynamicStatic = servicesData.find(
  s => s.category === "website-development" && s.slug === "dynamic-static"
)?.data;

export const BusinessWebsite = servicesData.find(
  s => s.category === "website-development" && s.slug === "business-website"
)?.data;  
*/}