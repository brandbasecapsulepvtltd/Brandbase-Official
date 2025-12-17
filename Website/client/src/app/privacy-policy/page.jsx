// app/privacy-policy/page.jsx

import PrivacyPolicy from "@/pages/PrivacyPolicy";

// -------------------------------------------
// 🔵 FULL NEXT.JS SEO METADATA FOR PRIVACY POLICY PAGE
// -------------------------------------------
export const metadata = {
  // 🌐 Basic SEO
  title: "Privacy Policy | BrandBase Capsule - Data Protection & Security",
  description: 
    "Read our comprehensive Privacy Policy. Learn how BrandBase Capsule protects your data, handles personal information, and ensures GDPR compliance.",
  
  keywords: [
    "privacy policy",
    "data protection",
    "GDPR compliance",
    "data security",
    "personal information",
    "cookie policy",
    "brandbase capsule privacy",
    "digital agency privacy policy",
    "Mumbai agency data protection",
  ],

  // 👤 Authorship
  authors: [{ name: "BrandBase Capsule Legal Team" }],
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
    canonical: "https://www.brandbasecapsule.com/privacy-policy",
  },

  // 🖼️ Social Sharing (Open Graph)
  openGraph: {
    title: "Privacy Policy | BrandBase Capsule - Data Protection Commitment",
    description: 
      "Our commitment to protecting your privacy. Learn about our data handling practices, security measures, and your rights.",
    url: "https://www.brandbasecapsule.com/privacy-policy",
    siteName: "BrandBase Capsule",
    locale: "en_IN",
    type: "article",
    publishedTime: "2025-12-17T00:00:00.000Z",
    modifiedTime: "2025-12-17T00:00:00.000Z",
    authors: ["BrandBase Capsule Legal Team"],
    tags: ["Privacy Policy", "Data Protection", "GDPR", "Security", "Legal"],
    images: [
      {
        url: "https://www.brandbasecapsule.com/og-privacy.jpg",
        width: 1200,
        height: 630,
        alt: "BrandBase Capsule Privacy Policy - Data Protection",
      },
    ],
  },

  // 🐦 Twitter SEO
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | BrandBase Capsule",
    description: 
      "Transparent data protection practices. Learn how we safeguard your information.",
    images: ["https://www.brandbasecapsule.com/og-privacy.jpg"],
    creator: "@brandbasecapsule",
  },

  // 📱 Additional Meta Tags
  other: {
    // Privacy Specific
    "privacy-policy": "https://www.brandbasecapsule.com/privacy-policy",
    "data-protection": "compliant",
    "gdpr-compliant": "true",
    
    // Legal Information
    "legal:document": "Privacy Policy",
    "legal:version": "2.0",
    "legal:effective-date": "2025-12-17",
    "legal:jurisdiction": "India",
    
    // Security
    "security:encryption": "enabled",
    "security:certification": "SSL/TLS",
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
// 🔵 JSON-LD STRUCTURED DATA FOR PRIVACY POLICY
// -------------------------------------------
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://www.brandbasecapsule.com/privacy-policy/#webpage",
      "url": "https://www.brandbasecapsule.com/privacy-policy",
      "name": "Privacy Policy | BrandBase Capsule",
      "description": "Comprehensive Privacy Policy detailing data protection practices and user rights",
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
            "name": "Privacy Policy"
          }
        ]
      },
      "datePublished": "2025-12-17T00:00:00+05:30",
      "dateModified": "2025-12-17T00:00:00+05:30",
      "lastReviewed": "2025-12-17T00:00:00+05:30",
      "mainEntity": {
        "@type": "Article",
        "headline": "Privacy Policy",
        "description": "Official Privacy Policy of BrandBase Capsule Pvt. Ltd.",
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
        "articleBody": "This Privacy Policy outlines how BrandBase Capsule collects, uses, stores, and protects your personal information when you use our services. We are committed to protecting your privacy and ensuring the security of your data."
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
          "contactType": "privacy inquiries",
          "contactOption": "WhatsApp",
          "areaServed": "IN",
          "availableLanguage": ["English", "Hindi"]
        }
      ],

      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Office #204, 2nd Floor, Near Bus Depot Pimpleshwar Temple, Gulmohar Complex",
        "addressLocality": "Goregaon East",
        "addressRegion": "Maharashtra",
        "postalCode": "400063",
        "addressCountry": "IN"
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
    // Privacy Policy Schema
    {
      "@type": "PrivacyPolicy",
      "name": "BrandBase Capsule Privacy Policy",
      "url": "https://www.brandbasecapsule.com/privacy-policy",
      "datePublished": "2025-12-17",
      "dateModified": "2025-12-17",
      "publisher": {
        "@id": "https://www.brandbasecapsule.com/#organization"
      },
      "mainEntityOfPage": {
        "@id": "https://www.brandbasecapsule.com/privacy-policy/#webpage"
      },
      "about": {
        "@type": "Thing",
        "name": "Data Protection"
      },
      "audience": {
        "@type": "Audience",
        "audienceType": "General Public"
      }
    },
    // FAQ Schema for Privacy Policy
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What information does BrandBase Capsule collect?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We collect information you provide directly (name, email, phone, company details) and automatically through analytics (IP address, browser type, device information). We do not collect sensitive financial data without explicit consent."
          }
        },
        {
          "@type": "Question",
          "name": "How is my data protected?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We implement industry-standard security measures including encryption, secure servers, access controls, and regular security audits to protect your data from unauthorized access."
          }
        },
        {
          "@type": "Question",
          "name": "Do you share my data with third parties?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We only share data with trusted third-party service providers essential for our operations (analytics, email services). We never sell your personal data to third parties."
          }
        },
        {
          "@type": "Question",
          "name": "What are my data protection rights?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You have the right to access, correct, delete, or restrict processing of your personal data. You can also object to processing and exercise your right to data portability."
          }
        },
        {
          "@type": "Question",
          "name": "How can I exercise my privacy rights?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Contact our Data Protection Officer at privacy@brandbasecapsule.com with your request. We will respond within 30 days as required by law."
          }
        },
        {
          "@type": "Question",
          "name": "Is BrandBase Capsule GDPR compliant?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, we comply with GDPR requirements for data protection and user privacy rights, even though we are based in India, to ensure international standards are met."
          }
        }
      ]
    },
    // Legal Document Schema
    {
      "@type": "LegalDocument",
      "name": "Privacy Policy",
      "dateCreated": "2025-12-17",
      "dateModified": "2025-12-17",
      "version": "2.0",
      "jurisdiction": "India",
      "legislation": [
        "Information Technology Act, 2000",
        "Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011"
      ],
      "publisher": {
        "@id": "https://www.brandbasecapsule.com/#organization"
      },
      "url": "https://www.brandbasecapsule.com/privacy-policy",
      "license": "All rights reserved",
      "copyrightHolder": {
        "@id": "https://www.brandbasecapsule.com/#organization"
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
      "name": "Privacy Policy",
      "item": "https://www.brandbasecapsule.com/privacy-policy"
    }
  ]
};

// Schema for Security Standards
const securitySchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Security Standards",
  "description": "Data protection and security measures implemented by BrandBase Capsule",
  "securityConsiderations": [
    "SSL/TLS Encryption",
    "Regular Security Audits",
    "Access Control Systems",
    "Data Encryption at Rest",
    "Secure Data Transmission",
    "GDPR Compliance",
    "Privacy by Design"
  ]
};

// -------------------------------------------
// 🔵 PAGE COMPONENT
// -------------------------------------------
export default function PrivacyPolicyPage() {
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
      
      {/* Security Standards Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(securitySchema) }}
        key="security-schema"
      />
      
      {/* Render Privacy Policy Component */}
      <PrivacyPolicy />
    </>
  );
}