// Data/masterData.js

// All services data organized by category and slug
export const servicesData = [

//website
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
},

//mobile
{
  id: 7,
  category: "mobile-app-development",
  slug: "android-app-development",
  data: {
    hero: {
      headline: "Native Android Apps That Dominate the Play Store",
      subHeadline: "Build powerful, high-performance Android applications that engage users, solve real problems, and scale to millions of downloads.",
      ctaText: "Build Your Android App",
      trustNote1: "Play Store ready",
      trustNote2: "Performance optimized",
      features: [
        { name: "Native Android Development", icon: "Smartphone" },
        { name: "Material Design UI/UX", icon: "Palette" },
        { name: "Play Store Optimization", icon: "TrendingUp" },
        { name: "Offline Functionality", icon: "WifiOff" },
        { name: "Push Notifications", icon: "Bell" },
        { name: "API Integration", icon: "Cpu" },
        { name: "Performance Analytics", icon: "BarChart3" }
      ]
    },

    animateImage: {
      header: {
        title: "Android Apps That",
        highlight: "Perform & Engage"
      },
      cards: [
        {
          id: 1,
          image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop"
        },
        {
          id: 2,
          image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1974&auto=format&fit=crop"
        },
        {
          id: 3,
          image: "https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=2080&auto=format&fit=crop"
        }
      ]
    },

    comparison: {
      heading: "Android App Development Approaches",
      subheading: "Choose the right technology stack for your app's performance and scalability needs",
      columns: ["Feature", "Cross-Platform Hybrid", "Cross-Platform Native", "Pure Native Android"],
      rows: [
        {
          feature: "Performance",
          values: [
            "🐢 Slowest (WebView based)",
            "⚡ Good but limited",
            "🚀 Native speed & optimization"
          ]
        },
        {
          feature: "Native Features",
          values: [
            "🔌 Plugin dependent",
            "📱 Most features available",
            "🌟 All features immediately"
          ]
        },
        {
          feature: "UI/UX Quality",
          values: [
            "📱 Generic look & feel",
            "🎨 Good, but not perfect",
            "✨ Pixel-perfect Material Design"
          ]
        },
        {
          feature: "Development Speed",
          values: [
            "⚡ Fastest to build",
            "🏃 Fast",
            "🏗️ Takes time but worth it"
          ]
        },
        {
          feature: "Maintenance",
          values: [
            "🔧 Complex (multiple layers)",
            "🛠️ Moderate",
            "⚙️ Clean & manageable"
          ]
        },
        {
          feature: "Play Store Approval",
          values: [
            "⚠️ May face restrictions",
            "✅ Usually smooth",
            "🎯 Preferred by Google"
          ]
        },
        {
          feature: "Battery Efficiency",
          values: [
            "🔋 High consumption",
            "⚡ Moderate",
            "💚 Optimized for Android"
          ]
        },
        {
          feature: "Offline Capabilities",
          values: [
            "📴 Limited",
            "🔄 Good",
            "🌟 Advanced offline features"
          ]
        },
        {
          feature: "Long-term Scalability",
          values: [
            "📉 Difficult to scale",
            "📈 Can scale",
            "🚀 Built for millions"
          ]
        },
        {
          feature: "Ideal Use Case",
          values: [
            "📄 Simple content apps",
            "🛠️ Business apps",
            "🎯 Performance-critical apps"
          ]
        }
      ]
    },

    features: [
      {
        id: 1,
        title: "Native Performance That Feels Like Magic",
        description: "We build Android apps using Kotlin and Jetpack Compose—Google's modern toolkit for native UI. This means buttery-smooth animations, instant response times, and optimal battery usage. Your app will feel like an integral part of the Android ecosystem, not a sluggish web page in disguise. From complex calculations to real-time updates, we ensure every interaction feels instant and effortless.",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop",
        imagePosition: "right"
      },
      {
        id: 2,
        title: "Material Design That Delights Users",
        description: "Great Android apps follow Google's Material Design principles while adding unique brand personality. We create interfaces that are intuitive, accessible, and beautiful—with proper navigation patterns, meaningful animations, and adaptive layouts that work perfectly across phones, tablets, and foldables. Every screen is designed to guide users naturally toward their goals while maintaining your brand identity.",
        image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1974&auto=format&fit=crop",
        imagePosition: "left"
      },
      {
        id: 3,
        title: "Play Store Optimization That Drives Downloads",
        description: "Building the app is only half the battle. We optimize every aspect for the Play Store—from compelling screenshots and engaging preview videos to strategic keyword placement and localized descriptions. We implement app store analytics, user review management, and update strategies that keep your app visible and growing. Turn your great app into a successful business with download-focused optimization.",
        image: "https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=2080&auto=format&fit=crop",
        imagePosition: "right"
      }
    ],

    packages: {
      header: {
        titleLine1: "Android Development Packages for",
        highlighted: "Every App Vision",
        subtitle: "From MVP launches to enterprise solutions—build Android apps that users love."
      },
      packages: {
        essential: {
          id: "essential",
          title: "MVP Launch",
          price: "₹49,999",
          icon: "rocket",
          image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop",
          features: [
            "Up to 10 Screens",
            "Basic UI/UX Design",
            "Core Features Only",
            "Play Store Submission",
            "Basic Analytics",
            "3 Months Bug Support",
            "Source Code Ownership"
          ]
        },
        signature: {
          id: "signature",
          title: "Full Featured App",
          price: "₹89,999",
          icon: "star",
          image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1974&auto=format&fit=crop",
          features: [
            "15-25 Screens",
            "Advanced UI/UX Design",
            "API Integration",
            "Push Notifications",
            "Offline Capabilities",
            "Advanced Analytics",
            "Play Store Optimization",
            "6 Months Support"
          ]
        },
        royal: {
          id: "royal",
          title: "Enterprise Solution",
          price: "₹1,49,999",
          icon: "crown",
          image: "https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=2080&auto=format&fit=crop",
          features: [
            "Unlimited Screens & Features",
            "Custom Architecture",
            "Real-time Features",
            "Advanced Security",
            "Multi-language Support",
            "Admin Dashboard",
            "Monthly Performance Reports",
            "1 Year Priority Support",
            "Scalable Infrastructure"
          ]
        }
      }
    },

    videoMaker: {
      heading: "Your Idea, Optimized for 3 Billion Android Devices",
      imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop",
      paragraphs: [
        "Android isn't just an operating system—it's the world's most popular mobile platform with 3 billion active devices. Your app deserves to run natively on this massive ecosystem, not as a compromised cross-platform version. At Brandbase Capsule, we build Android apps that leverage the full power of the platform while maintaining the flexibility to reach your specific audience.",
        "We stay at the forefront of Android development, working with the latest tools like Kotlin, Jetpack Compose, and Android Studio. Whether you're building a consumer-facing social app, a business productivity tool, an e-commerce platform, or a specialized utility—we create experiences that feel perfectly at home on Android while delivering your unique value proposition flawlessly."
      ]
    }
  }
},
{
  id: 8,
  category: "mobile-app-development",
  slug: "ios-app-development",
  data: {
    hero: {
      headline: "Premium iOS Apps That Shine on the App Store",
      subHeadline: "Craft elegant, high-performance iOS applications that deliver flawless experiences on iPhone, iPad, and Apple ecosystem.",
      ctaText: "Develop Your iOS App",
      trustNote1: "App Store ready",
      trustNote2: "Apple design certified",
      features: [
        { name: "Native iOS Development", icon: "Smartphone" },
        { name: "Swift & SwiftUI", icon: "Code" },
        { name: "Human Interface Guidelines", icon: "Palette" },
        { name: "App Store Optimization", icon: "TrendingUp" },
        { name: "Offline First", icon: "WifiOff" },
        { name: "Apple Pay Integration", icon: "CreditCard" },
        { name: "Performance Analytics", icon: "BarChart3" }
      ]
    },

    animateImage: {
      header: {
        title: "iOS Excellence,",
        highlight: "Crafted with Precision"
      },
      cards: [
        {
          id: 1,
          image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop"
        },
        {
          id: 2,
          image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop"
        },
        {
          id: 3,
          image: "https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=2080&auto=format&fit=crop"
        }
      ]
    },

    comparison: {
      heading: "iOS Development Approaches Compared",
      subheading: "Choose the right strategy for premium performance and Apple ecosystem integration",
      columns: ["Feature", "Cross-Platform Hybrid", "Cross-Platform Native", "Pure Native iOS"],
      rows: [
        {
          feature: "Performance",
          values: [
            "🐌 WebView limitations",
            "⚡ Good performance",
            "🚀 Native Swift optimization"
          ]
        },
        {
          feature: "Apple Ecosystem",
          values: [
            "🔌 Limited integration",
            "📱 Basic integration",
            "🍎 Full ecosystem access"
          ]
        },
        {
          feature: "UI/UX Quality",
          values: [
            "📱 Generic appearance",
            "🎨 Decent but compromised",
            "✨ Apple Design Award level"
          ]
        },
        {
          feature: "App Store Approval",
          values: [
            "⚠️ Higher rejection risk",
            "✅ Usually accepted",
            "🎯 Preferred by Apple"
          ]
        },
        {
          feature: "Battery Efficiency",
          values: [
            "🔋 Higher consumption",
            "⚡ Moderate efficiency",
            "💚 Apple-optimized"
          ]
        },
        {
          feature: "Security",
          values: [
            "🛡️ Web security model",
            "🔒 Good security",
            "🔐 Enterprise-grade security"
          ]
        },
        {
          feature: "Feature Updates",
          values: [
            "⏳ Delayed access",
            "🔄 Moderate access",
            "⚡ Immediate iOS updates"
          ]
        },
        {
          feature: "Offline Capabilities",
          values: [
            "📴 Basic offline",
            "🔄 Good offline",
            "🌟 Advanced offline-first"
          ]
        },
        {
          feature: "Development Cost",
          values: [
            "💰 Lower initial cost",
            "💵 Moderate cost",
            "💎 Higher but better ROI"
          ]
        },
        {
          feature: "Target Audience",
          values: [
            "🌍 Mass market focus",
            "📱 General users",
            "🎯 Premium iOS users"
          ]
        }
      ]
    },

    features: [
      {
        id: 1,
        title: "Swift-Powered Performance That Feels Effortless",
        description: "We build iOS apps using Swift and SwiftUI—Apple's modern, safe, and fast programming languages. This means your app runs with native speed, uses memory efficiently, and feels perfectly integrated with iOS. From complex animations to real-time data processing, we ensure every interaction is smooth, responsive, and delightful—exactly what premium iOS users expect.",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop",
        imagePosition: "right"
      },
      {
        id: 2,
        title: "Human Interface Design That Feels Intuitive",
        description: "Great iOS apps follow Apple's Human Interface Guidelines while expressing your unique brand. We create interfaces that are intuitive, accessible, and beautiful—with proper navigation patterns, meaningful haptics, and adaptive layouts for all screen sizes. Every interaction is designed to feel natural, with attention to detail that makes users feel your app was made specifically for their device.",
        image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop",
        imagePosition: "left"
      },
      {
        id: 3,
        title: "App Store Strategy That Maximizes Visibility",
        description: "Building a great app is only the beginning. We optimize every aspect for the App Store—from compelling screenshots and app previews to strategic keyword optimization and localized metadata. We implement App Store Connect analytics, review management strategies, and update schedules that maximize visibility and downloads. Turn your quality app into a commercial success with data-driven store optimization.",
        image: "https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=2080&auto=format&fit=crop",
        imagePosition: "right"
      }
    ],

    packages: {
      header: {
        titleLine1: "iOS Development Packages for",
        highlighted: "Premium Mobile Experiences",
        subtitle: "From innovative startups to established brands—create iOS apps that users love."
      },
      packages: {
        essential: {
          id: "essential",
          title: "MVP Launch",
          price: "₹59,999",
          icon: "rocket",
          image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop",
          features: [
            "Up to 10 Screens",
            "Basic UI/UX Design",
            "Core Features Implementation",
            "App Store Submission",
            "Basic Analytics",
            "3 Months Bug Support",
            "Source Code Ownership"
          ]
        },
        signature: {
          id: "signature",
          title: "Premium App",
          price: "₹1,09,999",
          icon: "star",
          image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop",
          features: [
            "15-25 Screens",
            "Premium UI/UX Design",
            "API Integration",
            "Push Notifications",
            "Offline-first Architecture",
            "Advanced Analytics",
            "App Store Optimization",
            "6 Months Priority Support"
          ]
        },
        royal: {
          id: "royal",
          title: "Enterprise Solution",
          price: "₹1,79,999",
          icon: "crown",
          image: "https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=2080&auto=format&fit=crop",
          features: [
            "Unlimited Screens & Features",
            "Custom Architecture Design",
            "Real-time Features",
            "Enterprise Security",
            "Multi-language Support",
            "Admin Dashboard",
            "Monthly Performance Reports",
            "1 Year Premium Support",
            "Scalable Cloud Infrastructure"
          ]
        }
      }
    },

    videoMaker: {
      heading: "Crafting Digital Excellence for the Apple Ecosystem",
      imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop",
      paragraphs: [
        "iOS users expect perfection—and that's exactly what we deliver. With over 1.8 billion active Apple devices worldwide, your app needs to meet the highest standards of quality, performance, and design. At Brandbase Capsule, we build iOS apps that not only function flawlessly but also feel like they were made by Apple themselves.",
        "We specialize in native iOS development using the latest Apple technologies—Swift, SwiftUI, Combine, and Core frameworks. Whether you're targeting iPhone, iPad, or creating a universal app, we ensure your application leverages the full potential of Apple's hardware and software. From health and fitness apps using HealthKit to commerce apps with Apple Pay, we build experiences that feel perfectly at home in the Apple ecosystem."
      ]
    }
  }
},
{
  id: 9,
  category: "mobile-app-development",
  slug: "ui-ux-design",
  data: {
    hero: {
      headline: "Stunning UI/UX That Makes Users Fall in Love with Your App",
      subHeadline: "Transform user interactions into delightful experiences with intuitive interfaces, meaningful animations, and conversion-focused design.",
      ctaText: "Design Your App Experience",
      trustNote1: "User-tested designs",
      trustNote2: "Conversion optimized",
      features: [
        { name: "User Research & Analysis", icon: "Search" },
        { name: "Wireframing & Prototyping", icon: "Layout" },
        { name: "Interactive Design Systems", icon: "Palette" },
        { name: "Usability Testing", icon: "TestTube" },
        { name: "Motion Design", icon: "Zap" },
        { name: "Design Handoff", icon: "Code" },
        { name: "Design System Creation", icon: "Layers" }
      ]
    },

    animateImage: {
      header: {
        title: "Design That",
        highlight: "Connects & Converts"
      },
      cards: [
        {
          id: 1,
          image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2064&auto=format&fit=crop"
        },
        {
          id: 2,
          image: "https://images.unsplash.com/photo-1558655146-364adaf1fcc9?q=80&w=2070&auto=format&fit=crop"
        },
        {
          id: 3,
          image: "https://tse3.mm.bing.net/th/id/OIP.CeaJnzsD_F5_Q7XZbmfcKQHaFj?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3"
        }
      ]
    },

    comparison: {
      heading: "UI/UX Design Approaches Compared",
      subheading: "Choose the right design strategy for user engagement and business results",
      columns: ["Feature", "Visual Design Only", "Basic UI/UX", "Strategic UX + UI"],
      rows: [
        {
          feature: "User Research",
          values: [
            "❌ No research",
            "📊 Basic assumptions",
            "🔬 In-depth user studies"
          ]
        },
        {
          feature: "Design Process",
          values: [
            "🎨 Straight to visuals",
            "📝 Wireframes then design",
            "🔄 Full UX lifecycle"
          ]
        },
        {
          feature: "User Testing",
          values: [
            "🙅‍♂️ No testing",
            "👥 Basic feedback",
            "🧪 Iterative usability tests"
          ]
        },
        {
          feature: "Conversion Focus",
          values: [
            "🎯 Visual appeal only",
            "📈 Some conversion elements",
            "🚀 Data-driven optimization"
          ]
        },
        {
          feature: "Design System",
          values: [
            "🚫 One-off designs",
            "📦 Basic component library",
            "🏗️ Complete design system"
          ]
        },
        {
          feature: "Animation & Interaction",
          values: [
            "🔄 Basic transitions",
            "✨ Some micro-interactions",
            "🎬 Purposeful motion design"
          ]
        },
        {
          feature: "Accessibility",
          values: [
            "♿ Not considered",
            "👁️ Basic compliance",
            "🌈 WCAG 2.1 AA standard"
          ]
        },
        {
          feature: "Handoff to Development",
          values: [
            "📧 PDF/Image files",
            "🔗 Basic design files",
            "🤝 Complete developer handoff"
          ]
        },
        {
          feature: "Long-term Value",
          values: [
            "📉 Quick revisions needed",
            "📊 Moderate longevity",
            "📈 Scalable & maintainable"
          ]
        },
        {
          feature: "ROI on Design",
          values: [
            "💰 Aesthetic only",
            "💵 Some business impact",
            "💎 High conversion impact"
          ]
        }
      ]
    },

    features: [
      {
        id: 1,
        title: "User-Centered Design That Solves Real Problems",
        description: "Great design starts with understanding users, not just making things look pretty. We conduct in-depth user research, create detailed personas, map user journeys, and identify pain points before we ever open a design tool. This ensures every screen we design solves a real user problem and contributes to your business goals—creating experiences that feel intuitive because they're built around real human behavior.",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2064&auto=format&fit=crop",
        imagePosition: "right"
      },
      {
        id: 2,
        title: "Visual Design That Builds Trust & Delights Users",
        description: "We create interfaces that are not just beautiful, but functional and brand-appropriate. Every color choice, typography decision, spacing calculation, and icon selection is intentional. We design with accessibility in mind, ensure readability across devices, and create visual hierarchies that guide users naturally through your app. The result is an interface that builds trust, reinforces your brand, and makes using your app a pleasure.",
        image: "https://images.unsplash.com/photo-1558655146-364adaf1fcc9?q=80&w=2070&auto=format&fit=crop",
        imagePosition: "left"
      },
      {
        id: 3,
        title: "Interactive Prototypes That Feel Like the Real App",
        description: "Static mockups can't reveal how an app really feels. We build high-fidelity interactive prototypes with realistic animations, transitions, and micro-interactions. Test user flows, validate assumptions, and experience your app before a single line of code is written. This reduces development risks, ensures alignment across teams, and gives stakeholders confidence in the final product.",
        image: "https://tse3.mm.bing.net/th/id/OIP.CeaJnzsD_F5_Q7XZbmfcKQHaFj?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
        imagePosition: "right"
      }
    ],

    packages: {
      header: {
        titleLine1: "UI/UX Design Packages for",
        highlighted: "Every Stage of App Development",
        subtitle: "From initial concept to polished product—create app experiences that users love."
      },
      packages: {
        essential: {
          id: "essential",
          title: "Basic UI Design",
          price: "₹24,999",
          icon: "palette",
          image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2064&auto=format&fit=crop",
          features: [
            "Up to 10 Screen Designs",
            "Basic User Flow",
            "Visual Design Only",
            "Color & Typography Guide",
            "Basic Prototype",
            "Design Files Delivery",
            "2 Revisions Included"
          ]
        },
        signature: {
          id: "signature",
          title: "Complete UX + UI",
          price: "₹49,999",
          icon: "layers",
          image: "https://images.unsplash.com/photo-1558655146-364adaf1fcc9?q=80&w=2070&auto=format&fit=crop",
          features: [
            "User Research & Personas",
            "Information Architecture",
            "Wireframing & Prototyping",
            "Complete Visual Design",
            "Interactive Prototype",
            "Usability Testing",
            "Design System Setup",
            "Developer Handoff"
          ]
        },
        royal: {
          id: "royal",
          title: "Enterprise Design System",
          price: "₹89,999",
          icon: "crown",
          image: "https://tse3.mm.bing.net/th/id/OIP.CeaJnzsD_F5_Q7XZbmfcKQHaFj?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
          features: [
            "Comprehensive User Research",
            "Complete Design System",
            "Advanced Motion Design",
            "Accessibility Audit",
            "Design Token Management",
            "Component Documentation",
            "Team Training",
          ]
        }
      }
    },

    videoMaker: {
      heading: "Where Psychology Meets Pixels",
      imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2064&auto=format&fit=crop",
      paragraphs: [
        "Great UI/UX design isn't about making things look pretty—it's about creating experiences that feel intuitive, solve real problems, and drive business results. At Brandbase Capsule, we approach app design as a strategic business investment, not just a creative exercise.",
        "We blend user psychology with visual design principles to create interfaces that don't just look good—they work brilliantly. From reducing cognitive load and eliminating friction points to creating emotional connections through micro-interactions, we design every element with purpose. Whether you're building a consumer app that needs to go viral or an enterprise tool that needs to boost productivity, we create designs that users love and businesses profit from."
      ]
    }
  }
},
{
  id: 10,
  category: "mobile-app-development",
  slug: "cross-platform-app-development",
  data: {
    hero: {
      headline: "Build for iOS & Android with One Powerful Codebase",
      subHeadline: "Launch faster, save costs, and maintain consistency across platforms with React Native and Flutter development.",
      ctaText: "Start Cross-Platform",
      trustNote1: "80% code reuse",
      trustNote2: "Native-like performance",
      features: [
        { name: "React Native Development", icon: "Code" },
        { name: "Flutter Development", icon: "Smartphone" },
        { name: "Single Codebase", icon: "Cpu" },
        { name: "Native Performance", icon: "Zap" },
        { name: "Hot Reload", icon: "RefreshCw" },
        { name: "App Store Deployment", icon: "TrendingUp" },
        { name: "Cost Efficiency", icon: "IndianRupee" }
      ]
    },

    animateImage: {
      header: {
        title: "One Codebase,",
        highlight: "Multiple Platforms"
      },
      cards: [
        {
          id: 1,
          image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1974&auto=format&fit=crop"
        },
        {
          id: 2,
          image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop"
        },
        {
          id: 3,
          image: "https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=2080&auto=format&fit=crop"
        }
      ]
    },

    comparison: {
      heading: "Cross-Platform vs Native Development",
      subheading: "Choose the right approach for your timeline, budget, and performance needs",
      columns: ["Feature", "Native iOS + Android", "React Native", "Flutter"],
      rows: [
        {
          feature: "Development Time",
          values: [
            "⏰ 8-12 months",
            "⚡ 3-5 months",
            "🚀 3-5 months"
          ]
        },
        {
          feature: "Development Cost",
          values: [
            "💸 2x Teams, 2x Cost",
            "💰 ~40% savings",
            "💵 ~40% savings"
          ]
        },
        {
          feature: "Code Reuse",
          values: [
            "🙅‍♂️ 0% (Separate code)",
            "✅ 80-90%",
            "✅ 80-90%"
          ]
        },
        {
          feature: "Performance",
          values: [
            "🚀 Best possible",
            "⚡ Near-native",
            "⚡ Near-native"
          ]
        },
        {
          feature: "UI Consistency",
          values: [
            "🎨 Platform-specific",
            "🔄 Consistent across",
            "✨ Perfectly consistent"
          ]
        },
        {
          feature: "Hot Reload",
          values: [
            "❌ Not available",
            "✅ Available",
            "✅ Available"
          ]
        },
        {
          feature: "App Store Approval",
          values: [
            "🎯 Preferred",
            "✅ Generally smooth",
            "✅ Generally smooth"
          ]
        },
        {
          feature: "Native Features",
          values: [
            "🌟 Full access",
            "📱 Most via libraries",
            "📱 Most via packages"
          ]
        },
        {
          feature: "Community & Support",
          values: [
            "🏢 Apple/Google",
            "👨‍💻 Large (Meta)",
            "👨‍💻 Large (Google)"
          ]
        },
        {
          feature: "Ideal For",
          values: [
            "🎯 Performance-critical apps",
            "🛠️ Most business apps",
            "🎨 Design-heavy apps"
          ]
        }
      ]
    },

    features: [
      {
        id: 1,
        title: "React Native: Facebook's Powerhouse for Rapid Development",
        description: "We build with React Native—Meta's framework that combines React's declarative UI with native performance. Write JavaScript/TypeScript once, and run it on both iOS and Android while maintaining access to native APIs. Perfect for apps that need frequent updates, have complex business logic, or require integration with web technologies. Hot reload lets you see changes instantly, dramatically speeding up development cycles.",
        image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1974&auto=format&fit=crop",
        imagePosition: "right"
      },
      {
        id: 2,
        title: "Flutter: Google's Beautiful, Consistent UI Framework",
        description: "For pixel-perfect, consistent designs across platforms, we use Google's Flutter. With its own rendering engine and rich widget library, Flutter delivers buttery-smooth animations and perfectly identical UI on both iOS and Android. Dart language offers strong typing and great tooling. Ideal for startups, MVPs, and apps where design consistency and rapid iteration are top priorities.",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop",
        imagePosition: "left"
      },
      {
        id: 3,
        title: "Strategic Platform Selection Based on Your Needs",
        description: "Not sure whether React Native or Flutter is right for you? We analyze your specific requirements—performance needs, team skills, timeline, design complexity, and long-term maintenance—to recommend the optimal framework. We have deep expertise in both ecosystems and can guide you to the right choice that balances development speed, cost efficiency, and end-user experience.",
        image: "https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=2080&auto=format&fit=crop",
        imagePosition: "right"
      }
    ],

    packages: {
      header: {
        titleLine1: "Cross-Platform Solutions for",
        highlighted: "Smart Business Decisions",
        subtitle: "From startups to enterprises—launch on both platforms faster and smarter."
      },
      packages: {
        essential: {
          id: "essential",
          title: "MVP Cross-Platform",
          price: "₹64,999",
          icon: "rocket",
          image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1974&auto=format&fit=crop",
          features: [
            "Single Codebase (React Native/Flutter)",
            "iOS & Android Deployment",
            "Basic App Features",
            "App Store Submission",
            "Basic Analytics",
            "3 Months Bug Support",
            "Source Code Ownership"
          ]
        },
        signature: {
          id: "signature",
          title: "Full Featured App",
          price: "₹1,19,999",
          icon: "star",
          image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop",
          features: [
            "Advanced Cross-Platform Features",
            "Native Module Integration",
            "Push Notifications",
            "Offline Capabilities",
            "API Integration",
            "App Store Optimization",
            "6 Months Support",
            "Performance Monitoring"
          ]
        },
        royal: {
          id: "royal",
          title: "Enterprise Platform",
          price: "₹1,99,999",
          icon: "crown",
          image: "https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=2080&auto=format&fit=crop",
          features: [
            "Custom Architecture Design",
            "Real-time Features",
            "Advanced Security",
            "Multi-language Support",
            "Admin Dashboard",
            "Monthly Performance Reports",
            "1 Year Priority Support",
            "Scalable Infrastructure",
            "Team Training"
          ]
        }
      }
    },

    videoMaker: {
      heading: "Why Choose One Platform When You Can Have Both?",
      imageUrl: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1974&auto=format&fit=crop",
      paragraphs: [
        "Cross-platform development isn't about compromise—it's about smart strategy. Why maintain two separate codebases, two development teams, and double the testing when modern frameworks like React Native and Flutter deliver 80-90% code reuse with near-native performance? The days of choosing between iOS and Android are over.",
        "At Brandbase Capsule, we specialize in both React Native and Flutter development, choosing the right tool for your specific needs. Whether you're a startup needing to validate your idea quickly, a business expanding to new platforms, or an enterprise maintaining multiple apps—cross-platform development offers the efficiency, consistency, and speed-to-market that today's competitive landscape demands."
      ]
    }
  }
},
{
  id: 11,
  category: "mobile-app-development",
  slug: "app-maintenance-support",
  data: {
    hero: {
      headline: "Keep Your App Thriving with Expert Maintenance & Support",
      subHeadline: "Ensure peak performance, security, and user satisfaction with proactive app maintenance, updates, and 24/7 monitoring.",
      ctaText: "Secure Your App's Future",
      trustNote1: "24/7 monitoring",
      trustNote2: "Proactive updates",
      features: [
        { name: "Bug Fixing & Updates", icon: "Bug" },
        { name: "Performance Monitoring", icon: "Activity" },
        { name: "Security Patches", icon: "Shield" },
        { name: "OS Compatibility", icon: "Smartphone" },
        { name: "Analytics & Reports", icon: "BarChart3" },
        { name: "Emergency Support", icon: "PhoneCall" },
        { name: "Backup & Recovery", icon: "DatabaseBackup" }
      ]
    },

    animateImage: {
      header: {
        title: "Your App's",
        highlight: "Health & Performance"
      },
      cards: [
        {
          id: 1,
          image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
        },
        {
          id: 2,
          image: "https://mobisoftinfotech.com/resources/wp-content/uploads/2017/11/mobile-app-maintenance-services-banner.png"
        },
        {
          id: 3,
          image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1974&auto=format&fit=crop"
        }
      ]
    },

    comparison: {
      heading: "App Maintenance Approaches Compared",
      subheading: "How different support strategies impact your app's longevity and user satisfaction",
      columns: ["Metric", "No Maintenance", "Reactive Support", "Proactive Maintenance"],
      rows: [
        {
          feature: "App Store Ratings",
          values: [
            "⭐ Rapid decline",
            "📊 Fluctuates",
            "🌟 Consistently high"
          ]
        },
        {
          feature: "User Retention",
          values: [
            "📉 30-50% annual churn",
            "📊 20-30% annual churn",
            "📈 85%+ retention"
          ]
        },
        {
          feature: "Security Risk",
          values: [
            "🔴 High vulnerability",
            "🟡 Moderate risk",
            "🟢 Protected & updated"
          ]
        },
        {
          feature: "OS Compatibility",
          values: [
            "❌ Breaks with updates",
            "⚠️ Manual updates",
            "✅ Automatic compatibility"
          ]
        },
        {
          feature: "Performance",
          values: [
            "🐌 Gradual slowdown",
            "⚡ Maintained when fixed",
            "🚀 Optimized regularly"
          ]
        },
        {
          feature: "Downtime",
          values: [
            "⏱️ Frequent & long",
            "🕒 Occasional",
            "⏰ Near-zero"
          ]
        },
        {
          feature: "Cost Over 2 Years",
          values: [
            "💸 High (rebuild needed)",
            "💰 Moderate (emergency fixes)",
            "💎 Predictable & optimal"
          ]
        },
        {
          feature: "User Feedback",
          values: [
            "😠 Negative reviews",
            "😐 Mixed feedback",
            "😄 Positive engagement"
          ]
        },
        {
          feature: "Business Impact",
          values: [
            "📉 Lost revenue & users",
            "📊 Unpredictable",
            "📈 Stable growth"
          ]
        },
        {
          feature: "Peace of Mind",
          values: [
            "😰 Constant worry",
            "😐 Somewhat managed",
            "😌 Complete confidence"
          ]
        }
      ]
    },

    features: [
      {
        id: 1,
        title: "Proactive Monitoring That Prevents Problems Before They Happen",
        description: "We don't wait for users to report issues—we actively monitor your app's performance 24/7. Using advanced monitoring tools, we track crash rates, response times, API performance, and user behavior patterns. Get alerted about anomalies before they impact users, and receive monthly performance reports with actionable insights to continuously improve your app's health and user experience.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
        imagePosition: "right"
      },
      {
        id: 2,
        title: "Security & Compliance That Protects Your Users & Business",
        description: "Mobile security threats evolve constantly. We keep your app protected with regular security audits, vulnerability assessments, and timely patching. We ensure compliance with data protection regulations (GDPR, CCPA), implement secure authentication, encrypt sensitive data, and maintain security certificates. Your users' data stays safe, and your business stays protected from legal and reputational risks.",
        image: "https://mobisoftinfotech.com/resources/wp-content/uploads/2017/11/mobile-app-maintenance-services-banner.png",
        imagePosition: "left"
      },
      {
        id: 3,
        title: "OS & Device Compatibility That Ensures Universal Access",
        description: "New iOS and Android versions release every year, and new devices launch constantly. We test and update your app for compatibility with the latest operating systems, screen sizes, and hardware features. From foldable phones to new iPad models, from iOS updates to Android version changes—we ensure your app works flawlessly across the entire mobile ecosystem your users inhabit.",
        image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1974&auto=format&fit=crop",
        imagePosition: "right"
      }
    ],

    packages: {
      header: {
        titleLine1: "Maintenance Plans for",
        highlighted: "Every App Stage",
        subtitle: "From newly launched apps to established platforms—keep your digital asset healthy and growing."
      },
      packages: {
        essential: {
          id: "essential",
          title: "Basic Care Plan",
          price: "₹9,999/month",
          icon: "shield",
          image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
          features: [
            "Bug Fixes & Critical Updates",
            "App Store Compliance",
            "Basic Performance Monitoring",
            "Security Patch Updates",
            "Monthly Health Report",
            "Email Support (Business Hours)",
            "Backup & Recovery"
          ]
        },
        signature: {
          id: "signature",
          title: "Growth Care Plan",
          price: "₹19,999/month",
          icon: "trending-up",
          image: "https://mobisoftinfotech.com/resources/wp-content/uploads/2017/11/mobile-app-maintenance-services-banner.png",
          features: [
            "Proactive Performance Monitoring",
            "Advanced Analytics & Reporting",
            "Regular Feature Updates",
            "OS Compatibility Updates",
            "User Feedback Analysis",
            "Priority Email & Chat Support",
            "Quarterly Security Audits",
            "App Store Rating Management"
          ]
        },
        royal: {
          id: "royal",
          title: "Enterprise Care Plan",
          price: "₹39,999/month",
          icon: "crown",
          image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1974&auto=format&fit=crop",
          features: [
            "24/7 Monitoring & Alerting",
            "Emergency Support Response",
            "Custom Feature Development",
            "Performance Optimization",
            "Competitor Analysis",
            "Dedicated Support Manager",
            "Monthly Strategy Meetings",
            "Compliance & Security Certifications",
            "Team Training Sessions"
          ]
        }
      }
    },

    videoMaker: {
      heading: "Your App is a Living Asset—Not a One-Time Project",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
      paragraphs: [
        "Building an app is just the beginning. The real work—and real value—comes from keeping it healthy, secure, and relevant over time. Apps aren't static products; they're living assets that require care, feeding, and evolution to survive in the competitive mobile ecosystem.",
        "At Brandbase Capsule, we treat app maintenance as strategic partnership, not just technical support. We become an extension of your team, proactively managing everything from crash prevention and security updates to performance optimization and user satisfaction. While you focus on growing your business, we ensure your app remains a reliable, high-performing asset that supports—rather than hinders—your success."
      ]
    }
  }
},

//digital Marketing
{
  id: 12,
  category: "digital-marketing",
  slug: "seo-optimization",
  data: {
    hero: {
      headline: "Dominate Search Results with Data-Driven SEO",
      subHeadline: "Get found by customers actively searching for what you offer. Drive consistent, high-quality traffic that converts into revenue.",
      ctaText: "Boost Your Rankings",
      trustNote1: "Google-first approach",
      trustNote2: "Sustainable results",
      features: [
        { name: "Technical SEO Audit", icon: "Search" },
        { name: "Keyword Strategy", icon: "Target" },
        { name: "Content Optimization", icon: "FileText" },
        { name: "Link Building", icon: "Link" },
        { name: "Local SEO", icon: "MapPin" },
        { name: "Analytics & Reporting", icon: "BarChart3" },
        { name: "Core Web Vitals", icon: "Zap" }
      ]
    },

    animateImage: {
      header: {
        title: "Your Website,",
        highlight: "Google's Favorite"
      },
      cards: [
        {
          id: 1,
          image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"
        },
        {
          id: 2,
          image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
        },
        {
          id: 3,
          image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1974&auto=format&fit=crop"
        }
      ]
    },

    comparison: {
      heading: "SEO Approaches That Actually Work",
      subheading: "Why quick fixes fail and strategic SEO delivers sustainable growth",
      columns: ["Factor", "DIY/Surface SEO", "Agency Templates", "Strategic SEO"],
      rows: [
        {
          feature: "Time to Results",
          values: [
            "⏳ 6-12 months (maybe)",
            "📅 3-6 months",
            "🚀 30-90 days (initial)"
          ]
        },
        {
          feature: "Traffic Quality",
          values: [
            "🎣 Random visitors",
            "📊 Some qualified",
            "🎯 High-intent buyers"
          ]
        },
        {
          feature: "Algorithm Updates",
          values: [
            "📉 Wipes out rankings",
            "📊 Some recovery needed",
            "📈 Gains market share"
          ]
        },
        {
          feature: "Technical Foundation",
          values: [
            "🛠️ Basic fixes only",
            "⚙️ Standard setup",
            "🏗️ Custom architecture"
          ]
        },
        {
          feature: "Content Strategy",
          values: [
            "📝 Keyword stuffing",
            "📄 Generic content",
            "🎯 User-first, search-smart"
          ]
        },
        {
          feature: "Link Building",
          values: [
            "🔗 Spammy links",
            "📎 Directory submissions",
            "🤝 Authority partnerships"
          ]
        },
        {
          feature: "Local SEO",
          values: [
            "📍 Basic listing",
            "🗺️ Standard optimization",
            "🌟 Dominant local presence"
          ]
        },
        {
          feature: "Reporting & Insights",
          values: [
            "📈 Basic rankings",
            "📊 Standard metrics",
            "📱 Business impact tracking"
          ]
        },
        {
          feature: "ROI Measurement",
          values: [
            "❌ Hard to measure",
            "📊 Some tracking",
            "💰 Full revenue attribution"
          ]
        },
        {
          feature: "Long-term Value",
          values: [
            "📉 Declines quickly",
            "📊 Maintains position",
            "📈 Compounding growth"
          ]
        }
      ]
    },

    features: [
      {
        id: 1,
        title: "Technical SEO That Makes Google Love Your Site",
        description: "Before we write a single word of content, we make Google's job easy. We conduct deep technical audits—fixing crawl errors, optimizing site speed (90+ Core Web Vitals), implementing proper schema markup, and ensuring mobile-first indexing. We structure your site like a library Google can navigate effortlessly, making every page discoverable and indexable for maximum visibility.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
        imagePosition: "right"
      },
      {
        id: 2,
        title: "Content That Ranks & Converts—Not Just Fills Pages",
        description: "We create content that answers real user questions while strategically targeting commercial keywords. Our content follows Google's E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) guidelines, establishing your brand as an industry authority. Every piece serves dual purpose: ranking for valuable search terms while guiding visitors toward conversion—no empty content, only strategic assets.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
        imagePosition: "left"
      },
      {
        id: 3,
        title: "Authority Building That Signals Trust to Search Engines",
        description: "Google rewards websites that other websites trust. We build genuine authority through strategic link acquisition, digital PR, and relationship building. No spammy directories—we earn links from reputable industry publications, create shareable research, and position your brand as a thought leader. This authority signals to Google that your site deserves top rankings for competitive terms.",
        image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1974&auto=format&fit=crop",
        imagePosition: "right"
      }
    ],

    packages: {
      header: {
        titleLine1: "SEO Strategy for",
        highlighted: "Every Business Goal",
        subtitle: "From local dominance to national authority—get found by customers ready to buy."
      },
      packages: {
        essential: {
          id: "essential",
          title: "Local Dominance",
          price: "₹14,999/month",
          icon: "map-pin",
          image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
          features: [
            "Local SEO Optimization",
            "Google Business Profile",
            "Citation Building",
            "Local Keyword Research",
            "Monthly Ranking Reports",
            "Review Management",
            "Basic Technical Audit"
          ]
        },
        signature: {
          id: "signature",
          title: "National Authority",
          price: "₹29,999/month",
          icon: "trending-up",
          image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
          features: [
            "Comprehensive Technical SEO",
            "Advanced Keyword Strategy",
            "Content Creation & Optimization",
            "Authority Link Building",
            "Competitor Analysis",
            "Monthly Strategy Calls",
            "Conversion Tracking",
            "E-E-A-T Optimization"
          ]
        },
        royal: {
          id: "royal",
          title: "Enterprise Growth",
          price: "₹59,999/month",
          icon: "crown",
          image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1974&auto=format&fit=crop",
          features: [
            "International SEO",
            "Custom SEO Technology Stack",
            "AI-Powered Content Strategy",
            "Digital PR Campaigns",
            "Advanced Analytics Setup",
            "Dedicated SEO Manager",
            "Weekly Performance Reviews",
          ]
        }
      }
    },

    videoMaker: {
      heading: "SEO Isn't Magic—It's Applied Psychology & Technology",
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
      paragraphs: [
        "SEO isn't about tricking Google—it's about understanding how people search and what Google values. At Brandbase Capsule, we combine technical excellence with human psychology to create SEO strategies that deliver sustainable growth, not temporary spikes.",
        "We approach SEO as a business investment, not a marketing expense. Every optimization serves two masters: Google's algorithms and your potential customers. From the milliseconds shaved off page load times to the strategic placement of conversion elements within content—we engineer visibility that translates directly to revenue. In a world where 93% of online experiences begin with search, being invisible isn't an option."
      ]
    }
  }
},
{
  id: 13,
  category: "digital-marketing",
  slug: "online-ads-campaigns",
  data: {
    hero: {
      headline: "Paid Ads That Print Money, Not Just Impressions",
      subHeadline: "Turn ad spend into revenue with laser-targeted campaigns on Google, Meta, LinkedIn, and TikTok that deliver measurable ROI.",
      ctaText: "Launch Profitable Ads",
      trustNote1: "ROI-focused",
      trustNote2: "Data-driven",
      features: [
        { name: "Google Ads Mastery", icon: "Search" },
        { name: "Meta Ads Expertise", icon: "ThumbsUp" },
        { name: "LinkedIn B2B Campaigns", icon: "Briefcase" },
        { name: "TikTok/Instagram Reels", icon: "Video" },
        { name: "Conversion Tracking", icon: "Target" },
        { name: "A/B Testing", icon: "TestTube" },
        { name: "ROI Optimization", icon: "TrendingUp" }
      ]
    },

    animateImage: {
      header: {
        title: "Your Ad Spend,",
        highlight: "Our Revenue Machine"
      },
      cards: [
        {
          id: 1,
          image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"
        },
        {
          id: 2,
          image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
        },
        {
          id: 3,
          image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1974&auto=format&fit=crop"
        }
      ]
    },

    comparison: {
      heading: "Paid Advertising Approaches That Deliver Results",
      subheading: "Why most ads waste money and performance campaigns generate profits",
      columns: ["Metric", "DIY Campaigns", "Basic Agency Management", "Performance Marketing"],
      rows: [
        {
          feature: "Cost Per Acquisition",
          values: [
            "💸 2-3x industry average",
            "💰 Near industry average",
            "📉 30-50% below average"
          ]
        },
        {
          feature: "Return on Ad Spend",
          values: [
            "📉 1:1 or negative",
            "📊 2:1 to 3:1",
            "🚀 4:1 to 10:1+"
          ]
        },
        {
          feature: "Audience Targeting",
          values: [
            "🎯 Basic demographics",
            "👥 Interest-based",
            "🧠 Psychographic + intent"
          ]
        },
        {
          feature: "Ad Creative",
          values: [
            "📱 Generic templates",
            "🎨 Professionally designed",
            "🧪 Data-optimized variations"
          ]
        },
        {
          feature: "Bid Strategy",
          values: [
            "⚖️ Manual guessing",
            "🤖 Platform automation",
            "🎯 Custom algorithms"
          ]
        },
        {
          feature: "Testing Velocity",
          values: [
            "🐌 1-2 tests monthly",
            "📊 Weekly optimizations",
            "🚀 Daily optimizations"
          ]
        },
        {
          feature: "Attribution",
          values: [
            "❌ Last-click only",
            "📊 Basic multi-touch",
            "🎯 Full-funnel tracking"
          ]
        },
        {
          feature: "Reporting Depth",
          values: [
            "📈 Basic platform metrics",
            "📊 Standard reports",
            "📱 Business impact analysis"
          ]
        },
        {
          feature: "Creative Burnout",
          values: [
            "🔥 Quick (2-3 weeks)",
            "⏳ Moderate (4-6 weeks)",
            "🔄 Proactively refreshed"
          ]
        },
        {
          feature: "Scalability",
          values: [
            "📉 Costs rise quickly",
            "📊 Linear scaling",
            "📈 Efficient scaling"
          ]
        }
      ]
    },

    features: [
      {
        id: 1,
        title: "Platform-Specific Mastery That Maximizes Every Dollar",
        description: "We don't treat all platforms equally. Google Search gets intent-based keyword sculpting. Meta gets emotional storytelling and lookalike expansion. LinkedIn gets thought leadership and account-based targeting. TikTok gets viral-first creative strategies. Each platform speaks a different language to different audiences—we become fluent in all of them, ensuring your message resonates perfectly wherever your customers are.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
        imagePosition: "right"
      },
      {
        id: 2,
        title: "Creative That Doesn't Just Get Seen—It Gets Remembered & Acted On",
        description: "In the scroll wars, attention is currency. We create ads that stop thumbs and start conversations. Using psychological triggers, platform-native formats, and conversion-focused design, we turn impressions into actions. Every element—from headline psychology to CTA placement—is tested and optimized based on performance data, not creative opinions. We build ad libraries that work harder, longer.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
        imagePosition: "left"
      },
      {
        id: 3,
        title: "Data Flywheel That Gets Smarter With Every Click",
        description: "Our campaigns improve exponentially over time. We implement advanced tracking that connects ad clicks to revenue, build custom audiences from converter behaviors, and use machine learning to find high-value prospects competitors miss. Every conversion teaches our algorithms who to target next, creating a self-improving system that reduces CPA while increasing LTV—turning data into your unfair advantage.",
        image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1974&auto=format&fit=crop",
        imagePosition: "right"
      }
    ],

    packages: {
      header: {
        titleLine1: "Performance Marketing for",
        highlighted: "Every Budget & Goal",
        subtitle: "From testing new markets to scaling proven winners—spend smarter, earn more."
      },
      packages: {
        essential: {
          id: "essential",
          title: "Starter Campaigns",
          price: "₹19,999/month",
          icon: "rocket",
          image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
          features: [
            "1 Platform Focus (Google or Meta)",
            "Basic Campaign Setup",
            "Standard Ad Creative",
            "Monthly Optimization",
            "Conversion Tracking",
            "Weekly Performance Reports",
            "Budget: ₹50k-₹1L/month"
          ]
        },
        signature: {
          id: "signature",
          title: "Growth Accelerator",
          price: "₹39,999/month",
          icon: "trending-up",
          image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
          features: [
            "2-3 Platform Strategy",
            "Advanced Audience Building",
            "Custom Ad Creative",
            "Weekly A/B Testing",
            "ROI Optimization",
            "Bi-weekly Strategy Calls",
            "Competitor Analysis",
            "Budget: ₹1L-₹3L/month"
          ]
        },
        royal: {
          id: "royal",
          title: "Enterprise Dominance",
          price: "₹79,999/month",
          icon: "crown",
          image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1974&auto=format&fit=crop",
          features: [
            "Full Multi-channel Strategy",
            "Custom Attribution Modeling",
            "AI-Powered Bidding",
            "Creative Production Team",
            "Market Expansion Planning",
            "Dedicated Account Manager",
            "Real-time Dashboard Access",
            "Monthly Growth Strategy",
            "Budget: ₹3L+/month"
          ]
        }
      }
    },

    videoMaker: {
      heading: "Stop Spending on Ads—Start Investing in Customers",
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
      paragraphs: [
        "Most businesses treat advertising as an expense—we treat it as customer acquisition infrastructure. Every rupee spent should return more than it cost, and then some. At Brandbase Capsule, we build paid media machines that don't just generate leads, but profitable customers who stick around.",
        "We combine platform expertise with business acumen. We don't just optimize for clicks or impressions—we optimize for lifetime value, customer acquisition cost, and profitability. From the initial audience hypothesis to the post-conversion nurture sequence, we engineer campaigns that work as business systems, not just marketing activities. In a world where attention is scarce and competition is fierce, ordinary ads fail—performance campaigns thrive."
      ]
    }
  }
},
{
  id: 14,
  category: "digital-marketing",
  slug: "social-media-marketing",
  data: {
    hero: {
      headline: "Make Your Brand Impossible to Ignore on Social",
      subHeadline: "Stop posting into the void. Create content that stops scrolls, starts conversations, and turns followers into fanatics.",
      ctaText: "Go Viral or Go Home",
      trustNote1: "Algorithm-hacking",
      trustNote2: "Community-building",
      features: [
        { name: "TikTok Domination", icon: "Zap" },
        { name: "Instagram Reels Mastery", icon: "Video" },
        { name: "LinkedIn Authority", icon: "Briefcase" },
        { name: "Twitter/X Engagement", icon: "MessageCircle" },
        { name: "Community Management", icon: "Users" },
        { name: "Content Virality", icon: "TrendingUp" },
        { name: "Influencer Collabs", icon: "Star" }
      ]
    },

    animateImage: {
      header: {
        title: "Your Content,",
        highlight: "Their Addiction"
      },
      cards: [
        {
          id: 1,
          image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=2069&auto=format&fit=crop"
        },
        {
          id: 2,
          image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop"
        },
        {
          id: 3,
          image: "https://images.unsplash.com/photo-1611605698335-8b1569810432?q=80&w=1974&auto=format&fit=crop"
        }
      ]
    },

    comparison: {
      heading: "Social Media Strategies That Actually Break Through",
      subheading: "Why posting schedules fail and cultural moments win",
      columns: ["Approach", "Corporate Broadcasting", "Scheduled Content", "Cultural Hacking"],
      rows: [
        {
          feature: "Audience Growth",
          values: [
            "🐌 1-2% monthly",
            "📈 5-10% monthly",
            "🚀 20-50% monthly"
          ]
        },
        {
          feature: "Engagement Rate",
          values: [
            "📉 0.5-1% (pathetic)",
            "📊 2-3% (decent)",
            "🔥 5-15% (viral-ready)"
          ]
        },
        {
          feature: "Content Style",
          values: [
            "📄 Company updates",
            "🎨 Branded content",
            "🎬 Platform-native storytelling"
          ]
        },
        {
          feature: "Algorithm Relationship",
          values: [
            "🤖 Fighting the algorithm",
            "🔄 Working with algorithm",
            "🎯 Becoming the algorithm's favorite"
          ]
        },
        {
          feature: "Community Building",
          values: [
            "👥 Passive audience",
            "💬 Some interaction",
            "🤝 Cult-like following"
          ]
        },
        {
          feature: "Trend Participation",
          values: [
            "🙅‍♂️ Always late",
            "📅 Scheduled",
            "⚡ Real-time relevance"
          ]
        },
        {
          feature: "Brand Voice",
          values: [
            "🏢 Corporate robot",
            "👔 Professional brand",
            "🎭 Human personality"
          ]
        },
        {
          feature: "ROI Measurement",
          values: [
            "❌ Vanity metrics",
            "📊 Basic conversions",
            "💰 Full-funnel attribution"
          ]
        },
        {
          feature: "Content Velocity",
          values: [
            "🐢 3-4 posts/week",
            "📅 Daily posting",
            "⚡ Multiple times/day + stories"
          ]
        },
        {
          feature: "Cultural Impact",
          values: [
            "📰 Company mentions",
            "📱 Brand awareness",
            "🌟 Industry trendsetter"
          ]
        }
      ]
    },

    features: [
      {
        id: 1,
        title: "Algorithm Whispering That Makes Platforms Work for You",
        description: "We don't just post content—we hack platform algorithms. TikTok? We create irresistible hooks in the first 0.8 seconds. Instagram? We engineer reels that the Explore page can't resist. LinkedIn? We craft posts that trigger 'see more' clicks and flood your notifications. We understand each platform's secret sauce and use it to catapult your content from obscurity to omnipresence. Your posts don't just get seen—they get amplified.",
        image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=2069&auto=format&fit=crop",
        imagePosition: "right"
      },
      {
        id: 2,
        title: "Content That Feels Like Entertainment, Not Advertising",
        description: "People don't open social media to be sold to—they open it to be entertained, informed, or inspired. We create content that feels native to each platform: TikTok trends with a twist, Instagram reels that teach while they entertain, LinkedIn carousels that establish thought leadership, Twitter threads that spark industry conversations. We turn your brand into content people actually want to consume, share, and anticipate.",
        image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop",
        imagePosition: "left"
      },
      {
        id: 3,
        title: "Community Cultivation That Turns Followers into Evangelists",
        description: "Follower count is vanity—community engagement is sanity. We build tribes, not just audiences. We create inside jokes, community rituals, and exclusive access that makes followers feel like insiders. We respond to every comment, turn critics into champions, and transform customers into co-creators. Your social presence becomes a living, breathing community that defends your brand and amplifies your message organically.",
        image: "https://images.unsplash.com/photo-1611605698335-8b1569810432?q=80&w=1974&auto=format&fit=crop",
        imagePosition: "right"
      }
    ],

    packages: {
      header: {
        titleLine1: "Social Media That",
        highlighted: "Breaks the Internet",
        subtitle: "From building communities to creating cultural moments—make noise that matters."
      },
      packages: {
        essential: {
          id: "essential",
          title: "Platform Launchpad",
          price: "₹24,999/month",
          icon: "zap",
          image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=2069&auto=format&fit=crop",
          features: [
            "2 Platform Focus",
            "Daily Content Creation",
            "Basic Community Management",
            "Trend Participation",
            "Weekly Analytics Report",
            "Content Calendar",
            "Hashtag Strategy"
          ]
        },
        signature: {
          id: "signature",
          title: "Viral Engine",
          price: "₹49,999/month",
          icon: "trending-up",
          image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop",
          features: [
            "3-4 Platform Strategy",
            "Premium Video Content",
            "Real-time Trend Jumping",
            "Influencer Outreach",
            "Competitor Analysis",
            "Community Building",
            "Bi-weekly Strategy Sessions",
            "Crisis Management"
          ]
        },
        royal: {
          id: "royal",
          title: "Cultural Takeover",
          price: "₹99,999/month",
          icon: "crown",
          image: "https://images.unsplash.com/photo-1611605698335-8b1569810432?q=80&w=1974&auto=format&fit=crop",
          features: [
            "Full Multi-platform Dominance",
            "Dedicated Content Team",
            "Branded Hashtag Campaigns",
            "Creator Partnerships",
            "Social Listening Suite",
            "Live Streaming Strategy",
            "Crisis-to-Opportunity Pivots",
            "Monthly Cultural Analysis",
            "24/7 Community Management"
          ]
        }
      }
    },

    videoMaker: {
      heading: "Social Media Isn't a Channel—It's the Main Stage",
      imageUrl: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=2069&auto=format&fit=crop",
      paragraphs: [
        "Forget everything you know about corporate social media. The game has changed. Social isn't about polished perfection—it's about raw authenticity, speed, and cultural relevance. At Brandbase Capsule, we don't manage social media accounts; we create cultural moments that make your brand the topic of conversation.",
        "We treat every platform like its own ecosystem with unique rules, languages, and behaviors. We move at internet speed, turning trends into traffic, conversations into conversions, and followers into fanatics. While your competitors are scheduling next week's posts, we're already riding today's viral wave. In the attention economy, being boring is the only real crime—and we're here to make sure you're anything but."
      ]
    }
  }
},
{
  id: 15,
  category: "digital-marketing",
  slug: "content-writing",
  data: {
    hero: {
      headline: "Words That Don't Just Get Read—They Get Results",
      subHeadline: "Transform visitors into customers with strategic content that persuades, educates, and converts at every touchpoint.",
      ctaText: "Get Converting Content",
      trustNote1: "SEO-optimized",
      trustNote2: "Conversion-focused",
      features: [
        { name: "Website Copywriting", icon: "FileText" },
        { name: "Blog & Article Writing", icon: "Edit" },
        { name: "SEO Content Strategy", icon: "Search" },
        { name: "Email Marketing Copy", icon: "Mail" },
        { name: "Social Media Content", icon: "MessageCircle" },
        { name: "Whitepapers & Ebooks", icon: "BookOpen" },
        { name: "Case Studies", icon: "ClipboardCheck" }
      ]
    },

    animateImage: {
      header: {
        title: "Words That",
        highlight: "Sell & Educate"
      },
      cards: [
        {
          id: 1,
          image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2072&auto=format&fit=crop"
        },
        {
          id: 2,
          image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop"
        },
        {
          id: 3,
          image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=2073&auto=format&fit=crop"
        }
      ]
    },

    comparison: {
      heading: "Content Quality That Actually Converts",
      subheading: "Why generic content fails and strategic writing delivers measurable business outcomes",
      columns: ["Aspect", "AI-Generated Content", "Generic Writers", "Strategic Content Writers"],
      rows: [
        {
          feature: "SEO Performance",
          values: [
            "📊 Basic keyword stuffing",
            "📈 Some optimization",
            "🚀 Semantic search mastery"
          ]
        },
        {
          feature: "Conversion Rate",
          values: [
            "📉 Generic CTAs",
            "📊 Decent conversion",
            "🔥 Psychology-driven CTAs"
          ]
        },
        {
          feature: "Brand Voice",
          values: [
            "🤖 Robotic & generic",
            "👔 Some consistency",
            "🎭 Distinct personality"
          ]
        },
        {
          feature: "Research Depth",
          values: [
            "🔍 Surface-level",
            "📚 Basic research",
            "🎯 Industry expertise"
          ]
        },
        {
          feature: "Reader Engagement",
          values: [
            "📖 30-40% read rate",
            "📚 50-60% read rate",
            "🔥 70-90% read rate"
          ]
        },
        {
          feature: "Content Strategy",
          values: [
            "🎯 Keyword lists only",
            "📅 Basic calendar",
            "🗺️ Full-funnel mapping"
          ]
        },
        {
          feature: "Editing Quality",
          values: [
            "✏️ Basic grammar check",
            "📝 Decent editing",
            "🔍 Strategic refinement"
          ]
        },
        {
          feature: "Topic Authority",
          values: [
            "📰 Generic information",
            "📊 Good information",
            "🎓 Thought leadership"
          ]
        },
        {
          feature: "Long-term Value",
          values: [
            "📉 Quick obsolescence",
            "📊 Moderate lifespan",
            "📈 Evergreen & updatable"
          ]
        },
        {
          feature: "ROI Measurement",
          values: [
            "❌ Vanity metrics",
            "📊 Some attribution",
            "💰 Direct revenue impact"
          ]
        }
      ]
    },

    features: [
      {
        id: 1,
        title: "Strategic Content That Drives Business Objectives",
        description: "We don't write articles—we create business assets. Every piece of content serves a strategic purpose: top-of-funnel blog posts attract search traffic, middle-funnel guides nurture leads, bottom-funnel case studies close sales. We map content to your customer journey, ensuring each word moves prospects closer to conversion while establishing your brand as the undisputed industry authority.",
        image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2072&auto=format&fit=crop",
        imagePosition: "right"
      },
      {
        id: 2,
        title: "SEO-Optimized Writing That Ranks & Converts",
        description: "Our content ranks first and converts best. We master semantic SEO—understanding search intent, creating comprehensive coverage, and structuring content for both Google's algorithms and human readers. We optimize for featured snippets, answer common questions before competitors, and create pillar-cluster architectures that dominate entire topic areas. Your content becomes a traffic magnet that also turns visitors into customers.",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop",
        imagePosition: "left"
      },
      {
        id: 3,
        title: "Brand Voice Development That Builds Recognition & Trust",
        description: "Consistency builds trust. We develop and maintain a distinctive brand voice across all content—whether it's a technical whitepaper, a casual social post, or a persuasive sales page. Your audience learns to recognize your unique tone, creating familiarity and credibility. We ensure your messaging resonates with your target audience while differentiating you from competitors who sound like everyone else.",
        image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=2073&auto=format&fit=crop",
        imagePosition: "right"
      }
    ],

    packages: {
      header: {
        titleLine1: "Content Solutions for",
        highlighted: "Every Business Need",
        subtitle: "From blog posts to complete content ecosystems—communicate with clarity and impact."
      },
      packages: {
        essential: {
          id: "essential",
          title: "Content Foundation",
          price: "₹9,999/month",
          icon: "file-text",
          image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2072&auto=format&fit=crop",
          features: [
            "4 Blog Posts (1000 words each)",
            "Basic SEO Optimization",
            "Social Media Snippets",
            "Monthly Content Calendar",
            "Basic Keyword Research",
            "Email Newsletter Copy",
            "1 Revision per piece"
          ]
        },
        signature: {
          id: "signature",
          title: "Content Growth",
          price: "₹24,999/month",
          icon: "trending-up",
          image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop",
          features: [
            "8 Content Pieces Monthly",
            "Advanced SEO Strategy",
            "Content Cluster Development",
            "Competitor Analysis",
            "Brand Voice Guide",
            "Performance Analytics",
            "Case Study Creation",
            "2 Revisions per piece"
          ]
        },
        royal: {
          id: "royal",
          title: "Content Authority",
          price: "₹49,999/month",
          icon: "crown",
          image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=2073&auto=format&fit=crop",
          features: [
            "Unlimited Content Creation",
            "Complete Content Strategy",
            "Whitepapers & Ebooks",
            "Thought Leadership Pieces",
            "Content Repurposing",
            "Dedicated Content Manager",
            "Monthly Strategy Sessions",
            "Performance Optimization",
            "Team Training"
          ]
        }
      }
    },

    videoMaker: {
      heading: "Where Clarity Meets Conversion",
      imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2072&auto=format&fit=crop",
      paragraphs: [
        "In a world drowning in content, standing out requires more than just good writing—it requires strategic communication that understands both human psychology and business objectives. At Brandbase Capsule, we create content that doesn't just fill pages, but fulfills purposes.",
        "We treat every word as a strategic asset. From the headline that stops the scroll to the call-to-action that converts the click, every element is engineered for impact. Whether educating potential customers, nurturing leads, or closing sales, our content works relentlessly to move your business forward. In the battle for attention, quality content isn't just nice to have—it's your most powerful weapon."
      ]
    }
  }
},
{
  id: 16,
  category: "digital-marketing",
  slug: "social-media-page-setup",
  data: {
    hero: {
      headline: "First Impressions That Convert Scrollers into Followers",
      subHeadline: "Launch social media profiles that look professional, communicate value instantly, and attract your ideal audience from day one.",
      ctaText: "Setup Your Social Presence",
      trustNote1: "Platform-optimized",
      trustNote2: "Brand-consistent",
      features: [
        { name: "Profile Optimization", icon: "User" },
        { name: "Cover & Banner Design", icon: "Image" },
        { name: "Bio & Description Writing", icon: "Edit" },
        { name: "Link in Bio Setup", icon: "Link" },
        { name: "Content Strategy", icon: "Calendar" },
        { name: "Hashtag Research", icon: "Hash" },
        { name: "Launch Content Package", icon: "Rocket" }
      ]
    },

    animateImage: {
      header: {
        title: "Profiles That",
        highlight: "Sell at First Sight"
      },
      cards: [
        {
          id: 1,
          image: "https://images.unsplash.com/photo-1611605698323-b1e99cfd37ea?q=80&w=1974&auto=format&fit=crop"
        },
        {
          id: 2,
          image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop"
        },
        {
          id: 3,
          image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=2069&auto=format&fit=crop"
        }
      ]
    },

    comparison: {
      heading: "Social Media Profile Quality Compared",
      subheading: "Why most profiles get ignored and optimized profiles attract followers",
      columns: ["Element", "Basic Setup", "Standard Setup", "Premium Optimized Setup"],
      rows: [
        {
          feature: "Profile Picture",
          values: [
            "📷 Logo or random image",
            "🎨 Branded logo",
            "✨ Professionally designed avatar"
          ]
        },
        {
          feature: "Cover/Banner",
          values: [
            "🖼️ Stock image or blank",
            "📱 Brand colors",
            "🎯 Value proposition graphics"
          ]
        },
        {
          feature: "Bio/Description",
          values: [
            "📝 Generic description",
            "✏️ Clear description",
            "🔥 Benefit-focused storytelling"
          ]
        },
        {
          feature: "Link in Bio",
          values: [
            "🔗 Direct website link",
            "📎 Multiple links",
            "🚀 Interactive link hub"
          ]
        },
        {
          feature: "Content Strategy",
          values: [
            "❌ No plan",
            "📅 Basic content ideas",
            "🗺️ 30-day launch calendar"
          ]
        },
        {
          feature: "Hashtag Strategy",
          values: [
            "🏷️ Random hashtags",
            "# Relevant hashtags",
            "🎯 Strategic hashtag clusters"
          ]
        },
        {
          feature: "Visual Consistency",
          values: [
            "🎨 Random colors",
            "🌈 Brand colors",
            "🎭 Complete visual identity"
          ]
        },
        {
          feature: "First Impression",
          values: [
            "😐 Forgettable",
            "😊 Professional",
            "🤩 Memorable & compelling"
          ]
        },
        {
          feature: "Follower Conversion",
          values: [
            "📉 1-2% of visitors",
            "📊 5-10% of visitors",
            "🚀 15-25% of visitors"
          ]
        },
        {
          feature: "Setup Time",
          values: [
            "⏱️ 30 minutes",
            "🕐 2-3 hours",
            "⚡ Complete day with strategy"
          ]
        }
      ]
    },

    features: [
      {
        id: 1,
        title: "Platform-Specific Optimization That Maximizes Impact",
        description: "Each social platform has different psychology and best practices. Instagram needs visual storytelling in the profile. LinkedIn requires professional credibility. Twitter/X demands concise value propositions. TikTok thrives on personality and entertainment. We optimize every element for each platform's unique audience and algorithm, ensuring your profile communicates the right message in the right way to the right people.",
        image: "https://images.unsplash.com/photo-1611605698323-b1e99cfd37ea?q=80&w=1974&auto=format&fit=crop",
        imagePosition: "right"
      },
      {
        id: 2,
        title: "Visual Identity That Stops the Scroll & Starts the Follow",
        description: "In 3 seconds, visitors decide whether to follow or scroll past. We create stunning profile aesthetics that communicate your brand personality instantly. Custom cover graphics that tell your story, profile pictures that build recognition, highlight covers that guide exploration, and visual themes that create consistency across all platforms. Your social presence looks professional, cohesive, and impossible to ignore.",
        image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop",
        imagePosition: "left"
      },
      {
        id: 3,
        title: "Strategic Content Foundation That Drives Growth",
        description: "A beautiful profile is useless without great content. We don't just set up your pages—we create a complete launch package: 30 days of content ideas tailored to your audience, optimized posting schedules, hashtag strategies for maximum reach, and engagement tactics to build community from day one. We give you everything needed to maintain momentum and grow your following organically.",
        image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=2069&auto=format&fit=crop",
        imagePosition: "right"
      }
    ],

    packages: {
      header: {
        titleLine1: "Social Media Launch for",
        highlighted: "Every Brand Size",
        subtitle: "From starting fresh to rebranding existing profiles—make the right first impression."
      },
      packages: {
        essential: {
          id: "essential",
          title: "Starter Setup",
          price: "₹4,999",
          icon: "rocket",
          image: "https://images.unsplash.com/photo-1611605698323-b1e99cfd37ea?q=80&w=1974&auto=format&fit=crop",
          features: [
            "2 Platform Setup (Choose any 2)",
            "Profile Optimization",
            "Cover/Banner Design",
            "Bio Writing",
            "Basic Hashtag Research",
            "Setup Guide Document",
            "7 Days WhatsApp Support"
          ]
        },
        signature: {
          id: "signature",
          title: "Professional Launch",
          price: "₹9,999",
          icon: "star",
          image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop",
          features: [
            "4 Platform Setup",
            "Complete Visual Identity",
            "Strategic Bio Writing",
            "Link in Bio Hub Setup",
            "Hashtag Strategy",
            "Content Calendar (15 posts)",
            "Engagement Guidelines",
            "14 Days Support"
          ]
        },
        royal: {
          id: "royal",
          title: "Enterprise Presence",
          price: "₹19,999",
          icon: "crown",
          image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=2069&auto=format&fit=crop",
          features: [
            "All Major Platforms (6+)",
            "Complete Brand Kit Integration",
            "Custom Graphics Package",
            "30-Day Content Strategy",
            "Competitor Analysis",
            "Team Training Session",
            "Performance Tracking Setup",
            "30 Days Post-launch Support",
            "Rebranding Available"
          ]
        }
      }
    },

    videoMaker: {
      heading: "Your Digital Handshake on Every Platform",
      imageUrl: "https://images.unsplash.com/photo-1611605698323-b1e99cfd37ea?q=80&w=1974&auto=format&fit=crop",
      paragraphs: [
        "Your social media profiles are often the first interaction potential customers have with your brand. In those crucial first seconds, they're deciding: Is this brand professional? Trustworthy? Relevant to me? We ensure the answer is always yes.",
        "At Brandbase Capsule, we treat social media setup as strategic brand positioning, not just technical configuration. Every element—from the profile picture that builds recognition to the bio that communicates value—is optimized to attract your ideal audience and convert visitors into followers. We don't just create profiles; we create digital storefronts that work 24/7 to build your brand and grow your community."
      ]
    }
  }
},
{
  id: 17,
  category: "digital-marketing",
  slug: "social-media-content-design",
  data: {
    hero: {
      headline: "Visual Content That Commands Attention in the Scroll",
      subHeadline: "Stop blending in. Create stunning, scroll-stopping graphics, videos, and carousels that make your brand impossible to ignore.",
      ctaText: "Design Viral Content",
      trustNote1: "Platform-native",
      trustNote2: "Conversion-optimized",
      features: [
        { name: "Instagram Reels Design", icon: "Video" },
        { name: "Story Graphics & Templates", icon: "Image" },
        { name: "Carousel Posts", icon: "Layers" },
        { name: "TikTok Video Editing", icon: "Film" },
        { name: "LinkedIn Visual Content", icon: "Briefcase" },
        { name: "Brand Kit Development", icon: "Palette" },
        { name: "Motion Graphics", icon: "Zap" }
      ]
    },

    animateImage: {
      header: {
        title: "Design That",
        highlight: "Stops the Scroll"
      },
      cards: [
        {
          id: 1,
          image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop"
        },
        {
          id: 2,
          image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=2069&auto=format&fit=crop"
        },
        {
          id: 3,
          image: "https://images.unsplash.com/photo-1611605698335-8b1569810432?q=80&w=1974&auto=format&fit=crop"
        }
      ]
    },

    comparison: {
      heading: "Social Media Design Quality Compared",
      subheading: "Why amateur designs get skipped and professional designs get saved & shared",
      columns: ["Design Aspect", "Basic Templates", "Good Design", "Viral-Ready Design"],
      rows: [
        {
          feature: "Visual Impact",
          values: [
            "🎨 Generic & forgettable",
            "✨ Looks professional",
            "🔥 Stops scrolling instantly"
          ]
        },
        {
          feature: "Brand Consistency",
          values: [
            "🌈 Random colors/fonts",
            "🎭 Consistent branding",
            "🏢 Complete visual system"
          ]
        },
        {
          feature: "Platform Optimization",
          values: [
            "📱 One-size-fits-all",
            "📲 Platform-aware",
            "🎯 Native to each platform"
          ]
        },
        {
          feature: "Engagement Rate",
          values: [
            "📉 0.5-1% engagement",
            "📊 2-3% engagement",
            "🚀 5-10%+ engagement"
          ]
        },
        {
          feature: "Shareability",
          values: [
            "🙅‍♂️ Rarely shared",
            "📤 Sometimes shared",
            "🔥 Designed to be shared"
          ]
        },
        {
          feature: "Content Types",
          values: [
            "🖼️ Static images only",
            "🎬 Some video content",
            "✨ Mixed media mastery"
          ]
        },
        {
          feature: "Design Speed",
          values: [
            "🐌 Days for simple posts",
            "⏱️ Hours per post",
            "⚡ Rapid production system"
          ]
        },
        {
          feature: "Trend Integration",
          values: [
            "📅 Always behind trends",
            "🔄 Follows trends",
            "⚡ Sets visual trends"
          ]
        },
        {
          feature: "Conversion Elements",
          values: [
            "❌ No clear CTAs",
            "📝 Basic CTAs",
            "🎯 Strategic CTA placement"
          ]
        },
        {
          feature: "Cost Efficiency",
          values: [
            "💸 High cost per post",
            "💰 Reasonable cost",
            "💎 High ROI per design"
          ]
        }
      ]
    },

    features: [
      {
        id: 1,
        title: "Platform-Native Design That Feels Right at Home",
        description: "Instagram demands vertical videos with text overlays. LinkedIn thrives on professional infographics. TikTok wants raw, authentic motion. Twitter/X prefers punchy visuals with minimal text. We design content that feels native to each platform—not just resized versions of the same graphic. Our designs work with platform algorithms, not against them, maximizing reach and engagement while maintaining consistent brand identity.",
        image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop",
        imagePosition: "right"
      },
      {
        id: 2,
        title: "Scroll-Stopping Visuals That Command Attention",
        description: "We create content that breaks through the noise. Using psychological principles of visual hierarchy, color theory, and motion design, we make graphics that stop thumbs mid-scroll. Animated text that pops, gradient overlays that draw the eye, strategic whitespace that focuses attention—every element is designed to capture and hold attention in an ocean of competing content. Your brand becomes the visual oasis in the social media desert.",
        image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=2069&auto=format&fit=crop",
        imagePosition: "left"
      },
      {
        id: 3,
        title: "Design Systems That Scale & Stay Consistent",
        description: "One great post isn't enough—you need a system. We create comprehensive design systems with templates, color palettes, typography hierarchies, and component libraries that ensure consistency across all platforms. This allows for rapid content production while maintaining professional quality. Your social feed becomes a cohesive visual narrative that builds brand recognition and trust over time.",
        image: "https://images.unsplash.com/photo-1611605698335-8b1569810432?q=80&w=1974&auto=format&fit=crop",
        imagePosition: "right"
      }
    ],

    packages: {
      header: {
        titleLine1: "Visual Content for",
        highlighted: "Every Social Platform",
        subtitle: "From daily posts to complete visual systems—design content that gets seen and shared."
      },
      packages: {
        essential: {
          id: "essential",
          title: "Content Creator Pack",
          price: "₹12,999/month",
          icon: "palette",
          image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop",
          features: [
            "15 Social Graphics Monthly",
            "5 Instagram Stories",
            "2 Carousel Posts",
            "Basic Animation",
            "Brand Color Application",
            "Monthly Content Calendar",
            "Basic Template Creation"
          ]
        },
        signature: {
          id: "signature",
          title: "Viral Visual Engine",
          price: "₹24,999/month",
          icon: "trending-up",
          image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=2069&auto=format&fit=crop",
          features: [
            "30 Social Graphics Monthly",
            "10 Instagram Reels/TikToks",
            "5 Carousel Posts",
            "Advanced Motion Graphics",
            "Complete Design System",
            "Competitor Visual Analysis",
            "Performance Analytics",
            "Weekly Design Reviews"
          ]
        },
        royal: {
          id: "royal",
          title: "Premium Content Studio",
          price: "₹49,999/month",
          icon: "crown",
          image: "https://images.unsplash.com/photo-1611605698335-8b1569810432?q=80&w=1974&auto=format&fit=crop",
          features: [
            "Unlimited Design Requests",
            "Video Production & Editing",
            "Interactive Content Design",
            "Custom Illustration",
            "3D Animation",
            "Dedicated Design Team",
            "Real-time Trend Adaptation",
            "Brand Evolution Strategy",
            "Team Training & Assets"
          ]
        }
      }
    },

    videoMaker: {
      heading: "Where Art Meets Algorithm",
      imageUrl: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop",
      paragraphs: [
        "Social media is a visual battlefield, and generic design is surrender. To win attention, you need content that doesn't just look good—it needs to feel right, move right, and speak the visual language of each platform. At Brandbase Capsule, we create social media design that's equal parts art and science.",
        "We understand that great social design isn't about pretty pictures—it's about visual communication optimized for attention spans measured in milliseconds. Every gradient, every animation, every layout choice serves a strategic purpose: to stop the scroll, communicate value, and drive action. In a world where users scroll the length of the Eiffel Tower daily, being visually mediocre isn't an option—being visually exceptional is the only way to be seen."
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