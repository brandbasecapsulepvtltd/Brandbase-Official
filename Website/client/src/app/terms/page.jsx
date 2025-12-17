// app/terms/page.jsx

import TermsAndConditions from "@/pages/TermsAndConditions";

// -------------------------------------------
// 🔵 FULL NEXT.JS SEO METADATA FOR TERMS & CONDITIONS PAGE
// -------------------------------------------
export const metadata = {
  // 🌐 Basic SEO
  title: "Terms & Conditions | BrandBase Capsule - Legal Agreement",
  description: 
    "Read our Terms & Conditions governing the use of BrandBase Capsule services. Legal agreement covering user rights, responsibilities, and service terms.",
  
  keywords: [
    "terms and conditions",
    "legal agreement",
    "terms of service",
    "user agreement",
    "brandbase capsule terms",
    "digital agency terms",
    "website terms",
    "service agreement",
    "legal terms",
    "Mumbai agency terms",
  ],

  // 👤 Authorship
  authors: [{ name: "BrandBase Capsule Legal Department" }],
  generator: "Next.js",
  applicationName: "BrandBase Capsule",
  publisher: "BrandBase Capsule Pvt. Ltd.",

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
    canonical: "https://www.brandbasecapsule.com/terms",
  },

  // 🖼️ Social Sharing (Open Graph)
  openGraph: {
    title: "Terms & Conditions | BrandBase Capsule - Legal Terms of Service",
    description: 
      "Legal terms governing your use of BrandBase Capsule services. Read our comprehensive Terms & Conditions agreement.",
    url: "https://www.brandbasecapsule.com/terms",
    siteName: "BrandBase Capsule",
    locale: "en_IN",
    type: "article",
    publishedTime: "2025-12-17T00:00:00.000Z",
    modifiedTime: "2025-12-17T00:00:00.000Z",
    authors: ["BrandBase Capsule Legal Team"],
    tags: ["Terms and Conditions", "Legal Agreement", "Terms of Service", "User Agreement"],
    images: [
      {
        url: "https://www.brandbasecapsule.com/og-terms.jpg",
        width: 1200,
        height: 630,
        alt: "BrandBase Capsule Terms & Conditions - Legal Agreement",
      },
    ],
  },

  // 🐦 Twitter SEO
  twitter: {
    card: "summary_large_image",
    title: "Terms & Conditions | BrandBase Capsule",
    description: 
      "Legal terms governing the use of our services. Read our comprehensive Terms & Conditions agreement.",
    images: ["https://www.brandbasecapsule.com/og-terms.jpg"],
    creator: "@brandbasecapsule",
  },

  // 📱 Additional Meta Tags
  other: {
    // Legal Specific
    "terms-of-service": "https://www.brandbasecapsule.com/terms",
    "user-agreement": "https://www.brandbasecapsule.com/terms",
    "legal:document": "Terms and Conditions",
    "legal:version": "2.0",
    "legal:effective-date": "2025-12-17",
    "legal:jurisdiction": "India",
    
    // Company Info
    "company:legal-name": "BrandBase Capsule Pvt. Ltd.",
    "company:registration": "U72900MH2020PTC345678",
    
    // Age Restriction
    "age-restriction": "18+",
    "min-age": "18",
    
    // Related Documents
    "related:privacy-policy": "https://www.brandbasecapsule.com/privacy-policy",
    "related:refund-policy": "https://www.brandbasecapsule.com/refund-policy",
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
  category: "Legal Documents",
};

// -------------------------------------------
// 🔵 JSON-LD STRUCTURED DATA FOR TERMS & CONDITIONS
// -------------------------------------------
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://www.brandbasecapsule.com/terms/#webpage",
      "url": "https://www.brandbasecapsule.com/terms",
      "name": "Terms & Conditions | BrandBase Capsule",
      "description": "Legal Terms and Conditions governing the use of BrandBase Capsule services and website",
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
            "name": "Terms & Conditions"
          }
        ]
      },
      "datePublished": "2025-12-17T00:00:00+05:30",
      "dateModified": "2025-12-17T00:00:00+05:30",
      "lastReviewed": "2025-12-17T00:00:00+05:30",
      "mainEntity": {
        "@type": "Article",
        "headline": "Terms & Conditions",
        "description": "Official Terms and Conditions of BrandBase Capsule Pvt. Ltd.",
        "author": {
          "@type": "Organization",
          "name": "BrandBase Capsule Legal Department"
        },
        "publisher": {
          "@type": "Organization",
          "name": "BrandBase Capsule",
          "logo": {
            "@type": "ImageObject",
            "url": "https://www.brandbasecapsule.com/logo.png"
          }
        },
        "datePublished": "2025-12-17T00:00:00+05:30",
        "dateModified": "2025-12-17T00:00:00+05:30",
        "articleBody": "These Terms and Conditions constitute a legally binding agreement between you and BrandBase Capsule Pvt. Ltd. governing your access to and use of our website and services."
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
        "https://twitter.com/brandbasecapsule"
      ],

      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+91-9892211456",
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
          "telephone": "+91-9892211456",
          "contactType": "legal inquiries",
          "contactOption": "Email",
          "areaServed": "IN",
          "availableLanguage": ["English"]
        }
      ],

      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Office #204, 2nd Floor, Near Bus Depot Pimpleshwar Temple, Gulmohar Complex",
        "addressLocality": "Goregaon East",
        "addressRegion": "Maharashtra",
        "postalCode": "400063",
        "addressCountry": "IN"
      },

      "foundingDate": "2020",
      "founder": {
        "@type": "Person",
        "name": "Founder Name"
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
    // Terms of Service Schema
    {
      "@type": "TermsOfService",
      "name": "BrandBase Capsule Terms and Conditions",
      "url": "https://www.brandbasecapsule.com/terms",
      "datePublished": "2025-12-17",
      "dateModified": "2025-12-17",
      "publisher": {
        "@id": "https://www.brandbasecapsule.com/#organization"
      },
      "mainEntityOfPage": {
        "@id": "https://www.brandbasecapsule.com/terms/#webpage"
      },
      "about": {
        "@type": "Thing",
        "name": "Legal Agreement"
      },
      "audience": {
        "@type": "Audience",
        "audienceType": "General Public"
      },
      "usageInfo": {
        "@type": "HowTo",
        "name": "How to accept terms",
        "description": "By accessing or using our website, you agree to be bound by these Terms and Conditions.",
        "step": [
          {
            "@type": "HowToStep",
            "text": "Read the Terms and Conditions carefully"
          },
          {
            "@type": "HowToStep",
            "text": "Continue to use our website or services"
          },
          {
            "@type": "HowToStep",
            "text": "Your continued use constitutes acceptance of terms"
          }
        ]
      }
    },
    // FAQ Schema for Terms & Conditions
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What do these Terms and Conditions cover?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "These Terms govern your access to and use of BrandBase Capsule's website, services, content, and products. They constitute a legally binding agreement between you and our company."
          }
        },
        {
          "@type": "Question",
          "name": "Who can use BrandBase Capsule services?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You must be at least 18 years old to use our services. By accessing our website, you represent that you are of legal age to form a binding contract."
          }
        },
        {
          "@type": "Question",
          "name": "Can BrandBase Capsule terminate my access?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, we reserve the right to terminate or suspend your access immediately, without prior notice, if you violate these Terms and Conditions."
          }
        },
        {
          "@type": "Question",
          "name": "What laws govern these Terms?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "These Terms are governed by and construed in accordance with the laws of India, without regard to its conflict of law principles."
          }
        },
        {
          "@type": "Question",
          "name": "Can these Terms be modified?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, we reserve the right to modify or replace these Terms at any time. The most current version will be posted on our website, and continued use constitutes acceptance of changes."
          }
        },
        {
          "@type": "Question",
          "name": "How are disputes resolved?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You agree to first try to resolve disputes informally by contacting us. If unresolved, disputes will be subject to the exclusive jurisdiction of courts in Mumbai, India."
          }
        }
      ]
    },
    // Legal Document Schema
    {
      "@type": "LegalDocument",
      "name": "Terms and Conditions",
      "dateCreated": "2025-12-17",
      "dateModified": "2025-12-17",
      "version": "2.0",
      "jurisdiction": "India",
      "legislation": [
        "Information Technology Act, 2000",
        "Indian Contract Act, 1872",
        "Consumer Protection Act, 2019"
      ],
      "publisher": {
        "@id": "https://www.brandbasecapsule.com/#organization"
      },
      "url": "https://www.brandbasecapsule.com/terms",
      "license": "All rights reserved",
      "copyrightHolder": {
        "@id": "https://www.brandbasecapsule.com/#organization"
      },
      "accessMode": ["textual"],
      "accessModeSufficient": ["textual"],
      "accessibilityFeature": ["structuralNavigation", "tableOfContents"]
    },
    // Service Schema
    {
      "@type": "Service",
      "name": "Digital Agency Services",
      "serviceType": "Web Development, App Development, Branding, Digital Marketing",
      "provider": {
        "@id": "https://www.brandbasecapsule.com/#organization"
      },
      "termsOfService": "https://www.brandbasecapsule.com/terms",
      "areaServed": {
        "@type": "Country",
        "name": "India"
      }
    }
  ]
};

// Additional Schema for Site Navigation
const breadcrumbSchema = {
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
      "name": "Terms & Conditions",
      "item": "https://www.brandbasecapsule.com/terms"
    }
  ]
};

// Legal Entity Schema
const legalEntitySchema = {
  "@context": "https://schema.org",
  "@type": "Corporation",
  "name": "BrandBase Capsule Pvt. Ltd.",
  "alternateName": "BrandBase Capsule",
  "url": "https://www.brandbasecapsule.com",
  "logo": "https://www.brandbasecapsule.com/logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "legal department",
    "email": "legal@brandbasecapsule.com",
    "availableLanguage": "English"
  },
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "IN",
    "addressRegion": "Maharashtra",
    "addressLocality": "Mumbai"
  }
};

// HowTo Schema for Accepting Terms
const howToAcceptSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Accept Terms and Conditions",
  "description": "Step-by-step guide to accepting BrandBase Capsule's Terms and Conditions",
  "image": {
    "@type": "ImageObject",
    "url": "https://www.brandbasecapsule.com/how-to-accept-terms.jpg"
  },
  "estimatedCost": {
    "@type": "MonetaryAmount",
    "currency": "INR",
    "value": "0"
  },
  "totalTime": "PT5M",
  "step": [
    {
      "@type": "HowToStep",
      "name": "Access our website",
      "text": "Visit https://www.brandbasecapsule.com",
      "image": "https://www.brandbasecapsule.com/step1.jpg"
    },
    {
      "@type": "HowToStep",
      "name": "Read the Terms",
      "text": "Navigate to the Terms & Conditions page and read all clauses carefully",
      "image": "https://www.brandbasecapsule.com/step2.jpg"
    },
    {
      "@type": "HowToStep",
      "name": "Continue using our services",
      "text": "By continuing to use our website or services, you agree to be bound by these Terms",
      "image": "https://www.brandbasecapsule.com/step3.jpg"
    },
    {
      "@type": "HowToStep",
      "name": "Contact for questions",
      "text": "If you have questions, contact our legal team before proceeding",
      "image": "https://www.brandbasecapsule.com/step4.jpg"
    }
  ]
};

// -------------------------------------------
// 🔵 PAGE COMPONENT
// -------------------------------------------
export default function TermsAndConditionsPage() {
  return (
    <>
      {/* Inject Main JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        key="main-schema"
      />
      
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        key="breadcrumb-schema"
      />
      
      {/* Legal Entity Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(legalEntitySchema) }}
        key="legal-entity-schema"
      />
      
      {/* HowTo Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToAcceptSchema) }}
        key="howto-schema"
      />
      
      {/* Render Terms & Conditions Component */}
      <TermsAndConditions />
    </>
  );
}