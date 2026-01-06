// app/portfolio/page.jsx

import PortfolioContent from "@/components/Portfolio/PortfolioMain/PortfolioContent";

// -------------------------------------------
// 🔵 FULL NEXT.JS SEO METADATA FOR PORTFOLIO PAGE
// -------------------------------------------
export const metadata = {
  // 🌐 Basic SEO
  title: "Portfolio | BrandBase Capsule - Web Development & Design Case Studies",
  description: 
    "Explore BrandBase Capsule's portfolio showcasing 100+ successful web development, app development, branding & digital marketing projects. Mumbai-based digital agency",
  
  keywords: [
    "web development portfolio Mumbai",
    "digital agency case studies",
    "website design examples",
    "app development projects",
    "branding portfolio India",
    "e-commerce website projects",
    "responsive design case studies",
    "UI/UX design portfolio",
    "digital marketing success stories",
    "Mumbai web developers portfolio"
  ],

  // 👤 Authorship
  authors: [{ name: "BrandBase Capsule Team" }],
  generator: "Next.js",
  applicationName: "BrandBase Capsule Portfolio",
  publisher: "BrandBase Capsule",

  // 🤖 Robots & SEO Controls
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "imageindex": "allow",
    },
  },

  // 🌍 Canonical URL
  metadataBase: new URL("https://www.brandbasecapsule.com"),
  alternates: {
    canonical: "https://www.brandbasecapsule.com/portfolio",
    languages: {
      'en-IN': 'https://www.brandbasecapsule.com/portfolio',
    },
  },

  // 🖼️ Social Sharing (Open Graph) - Visual Portfolio Focus
  openGraph: {
    title: "🎨 Portfolio | BrandBase Capsule - Digital Agency Case Studies",
    description: 
      "View our portfolio of successful digital projects: Web Development • App Development • Branding • Digital Marketing • UI/UX Design",
    url: "https://www.brandbasecapsule.com/portfolio",
    siteName: "BrandBase Capsule Portfolio",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.brandbasecapsule.com/og-portfolio-showcase.jpg",
        width: 1200,
        height: 630,
        alt: "BrandBase Capsule Portfolio - Digital Projects Showcase",
        type: "image/jpeg",
      },
      {
        url: "https://www.brandbasecapsule.com/portfolio-cover.jpg",
        width: 1600,
        height: 900,
        alt: "Our Digital Agency Portfolio - Web & App Development Projects",
        type: "image/jpeg",
      }
    ],
    videos: [
      {
        url: "https://www.brandbasecapsule.com/portfolio-showcase-video.mp4",
        width: 1920,
        height: 1080,
        type: "video/mp4",
      }
    ],
    emails: ["portfolio@brandbasecapsule.com"],
    phoneNumbers: ["+91-XXXXXXXXXX"],
  },

  // 🐦 Twitter SEO
  twitter: {
    card: "summary_large_image",
    title: "Portfolio | BrandBase Capsule - Digital Projects",
    description: 
      "🚀 Explore 100+ successful digital projects: Web Dev • Apps • Branding • Marketing • UI/UX Design",
    images: [
      "https://www.brandbasecapsule.com/twitter-portfolio.jpg",
      "https://www.brandbasecapsule.com/portfolio-preview-2.jpg"
    ],
    creator: "@brandbasecapsule",
    site: "@brandbasecapsule",
  },

  // 📱 Additional Meta Tags for Portfolio
  other: {
    // Portfolio Specific
    "portfolio:project-count": "100+",
    "portfolio:industry": "Digital Agency, Web Development, Design",
    "portfolio:client-types": "Startups, SMEs, Enterprises, E-commerce",
    
    // Structured Data Hints
    "og:see_also": [
      "https://www.brandbasecapsule.com/case-studies",
      "https://www.brandbasecapsule.com/testimonials",
      "https://www.brandbasecapsule.com/services"
    ],
    
    // Technical Portfolio Info
    "portfolio:technologies": "React, Next.js, Node.js, Flutter, Shopify, WordPress, Figma, Adobe Creative Suite",
    "portfolio:services": "Web Development, App Development, UI/UX Design, Branding, Digital Marketing",
    "portfolio:year-started": "2020",
    
    // Location & Contact
    "business:location": "Mumbai, Maharashtra, India",
    "contact:portfolio": "portfolio@brandbasecapsule.com",
    "portfolio:booking": "https://www.brandbasecapsule.com/contact",
  },

  // 🌐 Browser Settings
  referrer: "origin-when-cross-origin",
  viewport: 
    "width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover",

  // 📌 Icons
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },

  // 🏷️ Category
  category: "Portfolio & Case Studies",
  classification: "Digital Agency Portfolio, Web Development Projects",
};

// -------------------------------------------
// 🔵 JSON-LD STRUCTURED DATA FOR PORTFOLIO (AEO Optimized)
// -------------------------------------------
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": "https://www.brandbasecapsule.com/portfolio/#portfoliopage",
      "url": "https://www.brandbasecapsule.com/portfolio",
      "name": "BrandBase Capsule Portfolio",
      "headline": "Digital Agency Portfolio - 100+ Successful Projects",
      "description": "Showcase of web development, app development, branding, and digital marketing projects completed by BrandBase Capsule",
      "isPartOf": {
        "@id": "https://www.brandbasecapsule.com/#website"
      },
      "inLanguage": "en-IN",
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.brandbasecapsule.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Portfolio",
            "item": "https://www.brandbasecapsule.com/portfolio"
          }
        ]
      },
      "mainEntity": {
        "@type": "ItemList",
        "numberOfItems": "100+",
        "itemListOrder": "https://schema.org/ItemListOrderDescending",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Web Development Projects",
            "description": "Custom website development and responsive web design projects",
            "url": "https://www.brandbasecapsule.com/portfolio/web-development"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "App Development Projects",
            "description": "Mobile and web application development case studies",
            "url": "https://www.brandbasecapsule.com/portfolio/app-development"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Branding Projects",
            "description": "Complete branding and identity design projects",
            "url": "https://www.brandbasecapsule.com/portfolio/branding"
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "E-commerce Projects",
            "description": "Online store and e-commerce platform developments",
            "url": "https://www.brandbasecapsule.com/portfolio/ecommerce"
          },
          {
            "@type": "ListItem",
            "position": 5,
            "name": "Digital Marketing Campaigns",
            "description": "Successful digital marketing and SEO campaigns",
            "url": "https://www.brandbasecapsule.com/portfolio/digital-marketing"
          }
        ]
      }
    },
    {
      "@type": "CreativeWork",
      "@id": "https://www.brandbasecapsule.com/#creativework",
      "name": "BrandBase Capsule Digital Portfolio",
      "description": "Collection of digital projects and case studies",
      "creator": {
        "@id": "https://www.brandbasecapsule.com/#organization"
      },
      "datePublished": "2020-01-01",
      "dateModified": new Date().toISOString().split('T')[0],
      "inLanguage": "en-IN",
      "keywords": "web development, app development, branding, digital marketing, UI/UX design",
      "license": "https://creativecommons.org/licenses/by-nc-nd/4.0/",
      "publisher": {
        "@id": "https://www.brandbasecapsule.com/#organization"
      }
    },
    {
      "@type": "Organization",
      "@id": "https://www.brandbasecapsule.com/#organization",
      "name": "BrandBase Capsule",
      "legalName": "BrandBase Capsule Pvt. Ltd.",
      "url": "https://www.brandbasecapsule.com",
      "logo": "https://www.brandbasecapsule.com/logo.png",
      "description": "Creative digital agency based in Mumbai specializing in web development, branding, and marketing solutions.",
      
      "sameAs": [
        "https://www.instagram.com/brandbasecapsule",
        "https://www.facebook.com/brandbasecapsule",
        "https://www.linkedin.com/company/brandbasecapsule",
        "https://twitter.com/brandbasecapsule",
        "https://www.behance.net/brandbasecapsule",
        "https://dribbble.com/brandbasecapsule",
        "https://github.com/brandbasecapsule"
      ],

      "knowsAbout": [
        "Web Development",
        "Mobile App Development",
        "UI/UX Design",
        "Brand Identity Design",
        "Digital Marketing",
        "E-commerce Solutions",
        "Search Engine Optimization",
        "Content Strategy"
      ],

      "hasCredential": [
        "Google Partner",
        "Meta Business Partner",
        "Shopify Expert",
        "Adobe Creative Cloud Certified"
      ],

      "makesOffer": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Website Development",
            "description": "Custom website design and development services",
            "url": "https://www.brandbasecapsule.com/services/web-development"
          },
          "areaServed": ["IN", "US", "UK", "AU", "AE", "SG"]
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "App Development",
            "description": "Mobile application development for iOS and Android",
            "url": "https://www.brandbasecapsule.com/services/app-development"
          },
          "areaServed": "Global"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Branding Services",
            "description": "Complete branding and identity design solutions",
            "url": "https://www.brandbasecapsule.com/services/branding"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Digital Marketing",
            "description": "SEO, social media marketing, and digital advertising",
            "url": "https://www.brandbasecapsule.com/services/digital-marketing"
          }
        }
      ],

      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "ratingCount": "150",
        "bestRating": "5",
        "worstRating": "1",
        "reviewCount": "127"
      },

      "award": [
        "Best Web Development Agency 2023 - Mumbai",
        "Top Digital Agency Award 2022",
        "Excellence in UI/UX Design 2021"
      ],

      "memberOf": [
        "Indian Web Developers Association",
        "Mumbai Digital Marketing Association",
        "National Association of Software and Service Companies"
      ],

      "numberOfEmployees": {
        "@type": "QuantitativeValue",
        "value": "25",
        "unitText": "persons"
      },

      "foundingDate": "2020-01-15",
      "founders": [
        {
          "@type": "Person",
          "name": "Founder Name",
          "jobTitle": "CEO & Creative Director",
          "sameAs": "https://www.linkedin.com/in/founder-profile"
        }
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://www.brandbasecapsule.com/#website",
      "url": "https://www.brandbasecapsule.com",
      "name": "BrandBase Capsule - Digital Agency",
      "description": "Creative Digital Agency in Mumbai specializing in web development, app development, branding and digital marketing",
      "publisher": {
        "@id": "https://www.brandbasecapsule.com/#organization"
      },
      "inLanguage": "en-IN",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://www.brandbasecapsule.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    // FAQ Schema for AEO - Portfolio Specific
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What types of projects are included in your portfolio?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our portfolio includes 100+ projects across web development (50+), mobile app development (30+), branding & identity design (15+), e-commerce solutions (25+), and digital marketing campaigns (20+). We serve startups, SMEs, and enterprise clients."
          }
        },
        {
          "@type": "Question",
          "name": "Can I see live demos of your portfolio projects?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, most of our web development projects have live demos available. Click on any project to view detailed case studies, screenshots, and live website links where available. Some client projects are under NDA and show limited previews."
          }
        },
        {
          "@type": "Question",
          "name": "What technologies do you specialize in for web development?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We specialize in modern technologies including React.js, Next.js, Node.js, Vue.js, WordPress, Shopify, Magento, Flutter, React Native, and various databases and cloud platforms."
          }
        },
        {
          "@type": "Question",
          "name": "Do you work with international clients?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Absolutely! 40% of our portfolio consists of international clients from the USA, UK, Australia, UAE, Singapore, and Europe. We're experienced in remote collaboration across different time zones."
          }
        },
        {
          "@type": "Question",
          "name": "How long does a typical web development project take?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Project timelines vary: Simple websites (2-4 weeks), Custom web applications (4-12 weeks), E-commerce platforms (6-16 weeks), Mobile apps (8-20 weeks). We provide detailed timelines during project planning."
          }
        },
        {
          "@type": "Question",
          "name": "Can you recreate a similar project from your portfolio for my business?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "While we can create similar solutions, each project is customized to your specific business needs. We analyze your requirements and create tailored solutions rather than copying existing projects."
          }
        }
      ]
    },
    // Portfolio Item Examples (Shows Google what to expect)
    {
      "@type": "ItemList",
      "name": "Featured Portfolio Projects",
      "description": "Highlighted projects from our portfolio",
      "numberOfItems": 5,
      "itemListOrder": "https://schema.org/ItemListOrderDescending",
      "itemListElement": [
        {
          "@type": "CreativeWork",
          "position": 1,
          "name": "E-commerce Platform - Fashion Brand",
          "description": "Custom Shopify Plus development with advanced inventory management",
          "url": "https://www.brandbasecapsule.com/portfolio/fashion-ecommerce",
          "image": "https://www.brandbasecapsule.com/portfolio/project1.jpg",
          "datePublished": "2023-06-15",
          "keywords": "Shopify, E-commerce, React, Responsive Design"
        },
        {
          "@type": "CreativeWork",
          "position": 2,
          "name": "Healthcare Mobile App",
          "description": "Flutter-based healthcare application with telemedicine features",
          "url": "https://www.brandbasecapsule.com/portfolio/healthcare-app",
          "image": "https://www.brandbasecapsule.com/portfolio/project2.jpg",
          "datePublished": "2023-03-22",
          "keywords": "Flutter, Mobile App, Healthcare, Telemedicine"
        },
        {
          "@type": "CreativeWork",
          "position": 3,
          "name": "Corporate Branding Package",
          "description": "Complete brand identity for FinTech startup",
          "url": "https://www.brandbasecapsule.com/portfolio/fintech-branding",
          "image": "https://www.brandbasecapsule.com/portfolio/project3.jpg",
          "datePublished": "2023-01-10",
          "keywords": "Branding, Logo Design, Brand Identity, FinTech"
        },
        {
          "@type": "CreativeWork",
          "position": 4,
          "name": "Real Estate Web Portal",
          "description": "Next.js real estate platform with virtual property tours",
          "url": "https://www.brandbasecapsule.com/portfolio/real-estate-portal",
          "image": "https://www.brandbasecapsule.com/portfolio/project4.jpg",
          "datePublished": "2022-11-05",
          "keywords": "Next.js, Real Estate, Web Portal, 3D Tours"
        },
        {
          "@type": "CreativeWork",
          "position": 5,
          "name": "Digital Marketing Campaign",
          "description": "Integrated digital marketing campaign for SaaS product launch",
          "url": "https://www.brandbasecapsule.com/portfolio/saas-marketing",
          "image": "https://www.brandbasecapsule.com/portfolio/project5.jpg",
          "datePublished": "2022-08-30",
          "keywords": "Digital Marketing, SEO, PPC, Content Marketing"
        }
      ]
    },
    // Local Business Schema for Local SEO
    {
      "@type": "LocalBusiness",
      "@id": "https://www.brandbasecapsule.com/#localbusiness",
      "name": "BrandBase Capsule - Digital Agency",
      "image": [
        "https://www.brandbasecapsule.com/office-exterior.jpg",
        "https://www.brandbasecapsule.com/team-photo.jpg"
      ],
      "url": "https://www.brandbasecapsule.com",
      "telephone": "+91-XXXXXXXXXX",
      "email": "hello@brandbasecapsule.com",
      "priceRange": "₹₹₹₹",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Business District",
        "addressLocality": "Mumbai",
        "addressRegion": "Maharashtra",
        "postalCode": "400000",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "19.0760",
        "longitude": "72.8777"
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "09:00",
          "closes": "18:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": "Saturday",
          "opens": "10:00",
          "closes": "14:00"
        }
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Digital Services Portfolio",
        "itemListElement": [
          {
            "@type": "OfferCatalog",
            "name": "Web Development",
            "itemListElement": ["Corporate Websites", "E-commerce", "Web Applications"]
          },
          {
            "@type": "OfferCatalog",
            "name": "App Development",
            "itemListElement": ["iOS Apps", "Android Apps", "Cross-platform Apps"]
          },
          {
            "@type": "OfferCatalog",
            "name": "Design Services",
            "itemListElement": ["UI/UX Design", "Brand Identity", "Graphic Design"]
          }
        ]
      }
    }
  ]
};

// -------------------------------------------
// 🔵 PAGE COMPONENT
// -------------------------------------------
export default function Portfolio() {
  return (
    <>
      {/* Primary JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Additional Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://www.brandbasecapsule.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Portfolio",
                "item": "https://www.brandbasecapsule.com/portfolio"
              }
            ]
          })
        }}
      />
      
      {/* Site Navigation Schema for better crawlability */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SiteNavigationElement",
            "name": "Portfolio Page Navigation",
            "url": "https://www.brandbasecapsule.com/portfolio",
            "potentialAction": {
              "@type": "Action",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://www.brandbasecapsule.com/portfolio/{category}",
                "actionPlatform": [
                  "http://schema.org/DesktopWebPlatform",
                  "http://schema.org/MobileWebPlatform"
                ]
              },
              "query-input": "required name=category"
            }
          })
        }}
      />
      
      <PortfolioContent />
    </>
  );
}
