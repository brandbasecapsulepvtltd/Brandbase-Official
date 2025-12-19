// app/contact/page.jsx

import AVProduction from "@/pages/AVProduction";
// -------------------------------------------
// 🔵 FULL NEXT.JS SEO METADATA FOR CONTACT PAGE
// -------------------------------------------
export const metadata = {
  // 🌐 Basic SEO
  title: "Contact BrandBase Capsule | Get in Touch - Mumbai Digital Agency",
  description: 
    "Contact BrandBase Capsule for web development, digital marketing, branding & app development services. 📞 +91-XXXXXXXXXX | 📍 Mumbai-based agency",
  
  keywords: [
    "contact digital agency Mumbai",
    "web development company contact",
    "brandbase capsule contact",
    "get quote for website",
    "digital marketing agency contact Mumbai",
    "app development company India",
    "branding services contact",
  ],

  // 👤 Authorship
  authors: [{ name: "BrandBase Capsule Team" }],
  generator: "Next.js",
  applicationName: "BrandBase Capsule",
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
    },
  },

  // 🌍 Canonical URL
  metadataBase: new URL("https://www.brandbasecapsule.com"),
  alternates: {
    canonical: "https://www.brandbasecapsule.com/contact",
  },

  // 🖼️ Social Sharing (Open Graph) - WhatsApp Friendly
  openGraph: {
    title: "📞 Contact BrandBase Capsule | Mumbai Digital Agency",
    description: 
      "Get expert digital solutions! Web development • App development • Branding • Digital marketing. WhatsApp: +91-XXXXXXXXXX | Mumbai-based agency",
    url: "https://www.brandbasecapsule.com/contact",
    siteName: "BrandBase Capsule",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.brandbasecapsule.com/og-contact.jpg",
        width: 1200,
        height: 630,
        alt: "Contact BrandBase Capsule - Mumbai Digital Agency",
      },
    ],
    emails: ["contact@brandbasecapsule.com", "hello@brandbasecapsule.com"],
    phoneNumbers: ["+91-XXXXXXXXXX"],
    contactInfo: {
      streetAddress: "Mumbai, Maharashtra",
      addressLocality: "Mumbai",
      addressRegion: "Maharashtra",
      postalCode: "400000",
      addressCountry: "IN"
    }
  },

  // 🐦 Twitter SEO
  twitter: {
    card: "summary_large_image",
    title: "Contact BrandBase Capsule | Mumbai Digital Agency",
    description: 
      "📱 Get in touch for web/app development, branding & digital marketing services. WhatsApp: +91-XXXXXXXXXX",
    images: ["https://www.brandbasecapsule.com/og-contact.jpg"],
    creator: "@brandbasecapsule",
    contact: {
      phone: "+91-XXXXXXXXXX",
      email: "contact@brandbasecapsule.com"
    }
  },

  // 📱 WhatsApp/Telegram Specific Meta Tags
  other: {
    // WhatsApp Link Preview
    "og:phone_number": "+91-XXXXXXXXXX",
    "og:email": "contact@brandbasecapsule.com",
    "og:latitude": "19.0760", // Mumbai coordinates
    "og:longitude": "72.8777",
    "og:street-address": "Mumbai, Maharashtra",
    "og:locality": "Mumbai",
    "og:region": "Maharashtra",
    "og:country-name": "India",
    
    // Telegram Specific
    "telegram:channel": "@brandbasecapsule",
    
    // Additional SEO
    "contact:phone": "+91-XXXXXXXXXX",
    "contact:email": "contact@brandbasecapsule.com",
    "contact:website": "https://www.brandbasecapsule.com",
    "business:hours": "Mon-Fri 9:00-18:00, Sat 10:00-14:00",
    "business:timezone": "IST (GMT+5:30)",
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
  category: "Business Services",
};

// -------------------------------------------
// 🔵 JSON-LD STRUCTURED DATA (AEO Optimized)
// -------------------------------------------
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "@id": "https://www.brandbasecapsule.com/contact/#contactpage",
      "url": "https://www.brandbasecapsule.com/contact",
      "name": "Contact BrandBase Capsule",
      "description": "Contact page for BrandBase Capsule - Mumbai-based digital agency",
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
            "name": "Contact Us"
          }
        ]
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
        "https://wa.me/91XXXXXXXXXX"
      ],

      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+91-XXXXXXXXXX",
          "contactType": "customer service",
          "contactOption": "TollFree",
          "areaServed": ["IN", "US", "UK", "AU", "AE"],
          "availableLanguage": ["English", "Hindi", "Marathi"],
          "hoursAvailable": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday"
            ],
            "opens": "09:00",
            "closes": "18:00"
          }
        },
        {
          "@type": "ContactPoint",
          "telephone": "+91-XXXXXXXXXX",
          "contactType": "sales",
          "contactOption": "WhatsApp",
          "areaServed": "IN",
          "availableLanguage": ["English", "Hindi", "Marathi"]
        }
      ],

      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Office Address, Business District",
        "addressLocality": "Mumbai",
        "addressRegion": "Maharashtra",
        "postalCode": "400000",
        "addressCountry": "IN"
      },

      "makesOffer": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Website Development",
            "description": "Custom website design and development services"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "App Development",
            "description": "Mobile application development for iOS and Android"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Branding Services",
            "description": "Complete branding and identity design solutions"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Digital Marketing",
            "description": "SEO, social media marketing, and digital advertising"
          }
        }
      ],

      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "ratingCount": "150",
        "bestRating": "5",
        "worstRating": "1"
      },

      "priceRange": "₹₹₹₹",
      "founder": {
        "@type": "Person",
        "name": "Founder Name"
      },
      "foundingDate": "2020",
      "numberOfEmployees": {
        "@type": "QuantitativeValue",
        "value": "20-50"
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://www.brandbasecapsule.com/#website",
      "url": "https://www.brandbasecapsule.com",
      "name": "BrandBase Capsule",
      "description": "Creative Digital Agency in Mumbai",
      "publisher": {
        "@id": "https://www.brandbasecapsule.com/#organization"
      },
      "inLanguage": "en-IN"
    },
    // FAQ Schema for AEO
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How can I contact BrandBase Capsule?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You can contact us via phone at +91-XXXXXXXXXX, email at contact@brandbasecapsule.com, WhatsApp at +91-XXXXXXXXXX, or fill our contact form. We're available Monday to Friday, 9 AM to 6 PM IST."
          }
        },
        {
          "@type": "Question",
          "name": "What are your working hours?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our standard working hours are Monday to Friday, 9:00 AM to 6:00 PM IST. Emergency support available via WhatsApp for existing clients."
          }
        },
        {
          "@type": "Question",
          "name": "Where is BrandBase Capsule located?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We are based in Mumbai, Maharashtra, serving clients globally with our digital agency services including web development, app development, branding, and digital marketing."
          }
        },
        {
          "@type": "Question",
          "name": "Do you offer free consultations?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, we offer a free 30-minute initial consultation to understand your project requirements and provide tailored solutions. Book your slot through our contact form."
          }
        }
      ]
    },
    // Local Business Schema
    {
      "@type": "LocalBusiness",
      "@id": "https://www.brandbasecapsule.com/#localbusiness",
      "name": "BrandBase Capsule",
      "image": "https://www.brandbasecapsule.com/og-image.jpg",
      "url": "https://www.brandbasecapsule.com",
      "telephone": "+91-XXXXXXXXXX",
      "email": "contact@brandbasecapsule.com",
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
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday"
          ],
          "opens": "09:00",
          "closes": "18:00"
        }
      ],
      "sameAs": [
        "https://www.instagram.com/brandbasecapsule",
        "https://www.facebook.com/brandbasecapsule"
      ]
    }
  ]
};

// -------------------------------------------
// 🔵 PAGE COMPONENT
// -------------------------------------------
export default function AVProductionPage() {
  return (
    <>
      {/* Inject JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AVProduction />
      
      {/* Additional Schema for Rich Snippets */}
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
                "name": "Contact Us",
                "item": "https://www.brandbasecapsule.com/contact"
              }
            ]
          })
        }}
      />
    </>
  );
}