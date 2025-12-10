// app/about/page.jsx
import AboutUsContent from "@/pages/AboutUsContent";

// -------------------------------------------
// 🔵 FULL NEXT.JS SEO METADATA FOR ABOUT PAGE
// -------------------------------------------
export const metadata = {
  // 🌐 Basic SEO
  title: "About BrandBase Capsule | Our Story & Digital Expertise",
  description:
    "Learn about BrandBase Capsule - a Mumbai-based digital agency with 8+ years of expertise in web development, branding, and digital marketing solutions. Meet our creative team.",
  keywords: [
    "about brandbase capsule",
    "digital agency team Mumbai",
    "web development company about us",
    "creative agency Mumbai story",
    "our mission vision values",
    "agency leadership team",
    "digital transformation experts",
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
    canonical: "https://www.brandbasecapsule.com/about",
    languages: {
      "en-IN": "https://www.brandbasecapsule.com/about",
    },
  },

  // 🖼️ Social Sharing (Open Graph)
  openGraph: {
    title: "About BrandBase Capsule | Our Creative Journey",
    description:
      "Discover the story behind BrandBase Capsule - our mission, vision, values, and the talented team driving digital innovation from Mumbai.",
    url: "https://www.brandbasecapsule.com/about",
    siteName: "BrandBase Capsule",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.brandbasecapsule.com/about-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "BrandBase Capsule Team - About Us",
      },
    ],
  },

  // 🐦 Twitter SEO
  twitter: {
    card: "summary_large_image",
    title: "About Our Digital Agency | BrandBase Capsule",
    description:
      "Get to know BrandBase Capsule - our expertise in web development, branding, and digital marketing. Meet our Mumbai-based creative team.",
    images: ["https://www.brandbasecapsule.com/about-og-image.jpg"],
    creator: "@brandbasecapsule",
  },

  // 🌐 Browser Settings
  referrer: "origin-when-cross-origin",
  viewport:
    "width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover",

  // 📌 Icons (inherited from layout)
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },

  // 🏷️ Category
  category: "Business",
};

// -------------------------------------------
// 🔵 JSON-LD STRUCTURED DATA (AEO Optimized)
// -------------------------------------------
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    // Organization Schema
    {
      "@type": "Organization",
      "@id": "https://www.brandbasecapsule.com/#organization",
      name: "BrandBase Capsule",
      legalName: "BrandBase Capsule Private Limited",
      url: "https://www.brandbasecapsule.com",
      logo: "https://www.brandbasecapsule.com/logo.png",
      description: "Creative Digital Agency based in Mumbai, India",
      foundingDate: "2016",
      foundingLocation: "Mumbai, Maharashtra",
      numberOfEmployees: {
        "@type": "QuantitativeValue",
        minValue: "15",
        maxValue: "50",
      },
      sameAs: [
        "https://www.instagram.com/brandbasecapsule",
        "https://www.facebook.com/brandbasecapsule",
        "https://www.linkedin.com/company/brandbasecapsule",
        "https://twitter.com/brandbasecapsule",
        "https://www.behance.net/brandbasecapsule",
      ],
      address: {
        "@type": "PostalAddress",
        streetAddress: "Office No. 304, Business Plaza",
        addressLocality: "Andheri West",
        addressRegion: "Maharashtra",
        postalCode: "400053",
        addressCountry: "IN",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+91-22-XXXX-XXXX",
        contactType: "customer service",
        email: "hello@brandbasecapsule.com",
        availableLanguage: ["English", "Hindi", "Marathi"],
        areaServed: ["IN", "US", "UK", "UAE", "AU"],
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        ratingCount: "150",
        bestRating: "5",
        worstRating: "1",
      },
    },

    // WebPage Schema
    {
      "@type": "WebPage",
      "@id": "https://www.brandbasecapsule.com/about/#webpage",
      url: "https://www.brandbasecapsule.com/about",
      name: "About BrandBase Capsule | Our Story & Digital Expertise",
      description: "Learn about our agency's journey, team, and expertise",
      isPartOf: {
        "@id": "https://www.brandbasecapsule.com/#website",
      },
      about: {
        "@id": "https://www.brandbasecapsule.com/#organization",
      },
      publisher: {
        "@id": "https://www.brandbasecapsule.com/#organization",
      },
      inLanguage: "en-IN",
      datePublished: "2016-08-15",
      dateModified: new Date().toISOString().split("T")[0],
    },

    // Breadcrumb Schema
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.brandbasecapsule.com/about/#breadcrumb",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://www.brandbasecapsule.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "About Us",
          item: "https://www.brandbasecapsule.com/about",
        },
      ],
    },

    // FAQ Schema (AEO Optimization)
    {
      "@type": "FAQPage",
      "@id": "https://www.brandbasecapsule.com/about/#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "When was BrandBase Capsule founded?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "BrandBase Capsule was founded in 2016 in Mumbai, Maharashtra. We have been serving clients globally for over 8 years with digital solutions.",
          },
        },
        {
          "@type": "Question",
          name: "What services does BrandBase Capsule offer?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We offer comprehensive digital services including Website Development, Mobile App Development, UI/UX Design, Brand Identity Design, Digital Marketing, SEO, Content Strategy, and E-commerce Solutions.",
          },
        },
        {
          "@type": "Question",
          name: "Where is BrandBase Capsule located?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Our main office is located in Andheri West, Mumbai, Maharashtra. We serve clients across India and internationally including the US, UK, UAE, and Australia.",
          },
        },
        {
          "@type": "Question",
          name: "What industries do you specialize in?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We have expertise across multiple industries including E-commerce, Healthcare, Education, FinTech, Real Estate, Hospitality, SaaS, and Startup Ecosystems.",
          },
        },
        {
          "@type": "Question",
          name: "What is your team size and expertise?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Our team comprises 15-50 experienced professionals including Developers, Designers, Digital Marketers, Content Strategists, and Project Managers with diverse technical expertise.",
          },
        },
      ],
    },

    // Team Members Schema (AEO for People Also Ask)
    {
      "@type": "ItemList",
      name: "Our Leadership Team",
      description: "Meet the leadership team at BrandBase Capsule",
      itemListElement: [
        {
          "@type": "Person",
          name: "Rajesh Sharma",
          jobTitle: "Founder & CEO",
          description:
            "Digital strategist with 12+ years experience in web technologies",
          memberOf: {
            "@id": "https://www.brandbasecapsule.com/#organization",
          },
          knowsAbout: [
            "Web Development",
            "Business Strategy",
            "Digital Transformation",
          ],
          sameAs: [
            "https://www.linkedin.com/in/rajesh-sharma-brandbase",
          ],
        },
        {
          "@type": "Person",
          name: "Priya Patel",
          jobTitle: "Creative Director",
          description:
            "Award-winning designer with expertise in UI/UX and branding",
          memberOf: {
            "@id": "https://www.brandbasecapsule.com/#organization",
          },
          knowsAbout: ["UI/UX Design", "Brand Identity", "Visual Design"],
          sameAs: [
            "https://www.linkedin.com/in/priya-patel-design",
          ],
        },
        {
          "@type": "Person",
          name: "Amit Kumar",
          jobTitle: "Head of Technology",
          description:
            "Full-stack developer specializing in modern web technologies",
          memberOf: {
            "@id": "https://www.brandbasecapsule.com/#organization",
          },
          knowsAbout: [
            "Next.js",
            "React",
            "Node.js",
            "Cloud Architecture",
          ],
          sameAs: [
            "https://www.linkedin.com/in/amit-kumar-tech",
          ],
        },
      ],
    },

    // Service Offerings Schema
    {
      "@type": "ItemList",
      name: "Our Core Services",
      description: "Primary services offered by BrandBase Capsule",
      itemListElement: [
        {
          "@type": "Service",
          name: "Website Development",
          description:
            "Custom website development using modern technologies",
          provider: {
            "@id": "https://www.brandbasecapsule.com/#organization",
          },
          areaServed: "Global",
        },
        {
          "@type": "Service",
          name: "Mobile App Development",
          description: "iOS & Android app development",
          provider: {
            "@id": "https://www.brandbasecapsule.com/#organization",
          },
        },
        {
          "@type": "Service",
          name: "UI/UX Design",
          description: "User-centered interface and experience design",
          provider: {
            "@id": "https://www.brandbasecapsule.com/#organization",
          },
        },
        {
          "@type": "Service",
          name: "Digital Marketing",
          description: "Comprehensive digital marketing solutions",
          provider: {
            "@id": "https://www.brandbasecapsule.com/#organization",
          },
        },
        {
          "@type": "Service",
          name: "Brand Identity",
          description: "Complete branding and identity design",
          provider: {
            "@id": "https://www.brandbasecapsule.com/#organization",
          },
        },
      ],
    },
  ],
};

// -------------------------------------------
// 🔵 LOCAL BUSINESS SCHEMA (Additional for AEO)
// -------------------------------------------

{/*
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://www.brandbasecapsule.com/#localbusiness",
  name: "BrandBase Capsule",
  image: "https://www.brandbasecapsule.com/office-image.jpg",
  "@id": "https://www.brandbasecapsule.com",
  url: "https://www.brandbasecapsule.com",
  telephone: "+91-22-XXXX-XXXX",
  priceRange: "₹₹₹",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Office No. 304, Business Plaza",
    addressLocality: "Andheri West",
    addressRegion: "Maharashtra",
    postalCode: "400053",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "19.1364",
    longitude: "72.8296",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
    ],
    opens: "09:30",
    closes: "18:30",
  },
  sameAs: [
    "https://www.instagram.com/brandbasecapsule",
    "https://www.facebook.com/brandbasecapsule",
    "https://www.linkedin.com/company/brandbasecapsule",
  ],
};  
  
*/}


// -------------------------------------------
// 🔵 PAGE COMPONENT
// -------------------------------------------
export default function About() {
  return (
    <>
      {/* Inject Primary JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Inject Local Business Schema 
            <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      */}
      
      <AboutUsContent />
    </>
  );
}