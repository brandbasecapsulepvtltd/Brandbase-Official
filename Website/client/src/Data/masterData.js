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
  
  // Add more services here following the same structure
  {
    id: 2,
    category: "website-development",
    slug: "ecommerce-development",
    data: {
      hero: {
        headline: "E-commerce Development Solutions",
        subHeadline: "Build powerful online stores that drive sales and enhance customer experience.",
        ctaText: "Start Your E-commerce Store",
        trustNote1: "Secure payments",
        trustNote2: "Mobile-optimized",
        features: [
          { name: "Shopping Cart Integration", icon: "ShoppingCart" },
          { name: "Payment Gateway Setup", icon: "CreditCard" },
          { name: "Product Management", icon: "Package" },
          { name: "Inventory Management", icon: "Database" },
          { name: "Order Tracking", icon: "Truck" },
          { name: "Customer Reviews", icon: "Star" },
          { name: "Sales Analytics", icon: "PieChart" },
        ]
      },
      // ... other sections would follow the same pattern
    }
  }
];

// Helper function to find service by category and slug
export function getServiceData(category, slug) {
  const service = servicesData.find(
    service => service.category === category && service.slug === slug
  );
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
export const DynamicStatic = servicesData.find(
  s => s.category === "website-development" && s.slug === "dynamic-static"
)?.data;