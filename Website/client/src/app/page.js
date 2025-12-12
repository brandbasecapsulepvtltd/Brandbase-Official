// app/page.jsx

import HomePage from "@/pages/HomePage";

// -------------------------------------------
// 🔵 FULL NEXT.JS SEO METADATA FOR HOMEPAGE
// -------------------------------------------
export const metadata = {
  // 🌐 Basic SEO
  title: "BrandBase Capsule | Creative Digital Agency in Mumbai",
  description:
    "BrandBase Capsule is a leading creative digital agency based in Mumbai offering web design, app development, branding, and digital marketing services.",
  keywords: [
    "digital marketing agency Mumbai",
    "web design company Mumbai",
    "brandbase capsule",
    "creative agency mumbai",
    "web development company india",
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
    canonical: "https://www.brandbasecapsule.com",
  },

  // 🖼️ Social Sharing (Open Graph)
  openGraph: {
    title: "BrandBase Capsule | Creative Digital Agency in Mumbai",
    description:
      "BrandBase Capsule is a Mumbai-based digital agency offering website development, branding, marketing solutions, and creative services.",
    url: "https://www.brandbasecapsule.com",
    siteName: "BrandBase Capsule",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://ik.imagekit.io/vinayak06/Screenshot%202025-12-12%20185904.png",
        width: 1200,
        height: 630,
        alt: "BrandBase Capsule Homepage",
      },
    ],
  },

  // 🐦 Twitter SEO
  twitter: {
    card: "summary_large_image",
    title: "BrandBase Capsule | Creative Digital Agency",
    description:
      "BrandBase Capsule is a digital services company based in Mumbai specializing in web development, branding, and digital marketing.",
    images: ["https://ik.imagekit.io/vinayak06/Screenshot%202025-12-12%20185904.png"],
    creator: "@brandbasecapsule",
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
  category: "Business",
};

// -------------------------------------------
// 🔵 JSON-LD STRUCTURED DATA (AEO Optimized)
// -------------------------------------------
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",

  name: "BrandBase Capsule",
  legalName: "BrandBase Capsule Pvt. Ltd.",
  url: "https://www.brandbasecapsule.com",
  logo: "https://ik.imagekit.io/vinayak06/Screenshot%202025-12-12%20185904.png",
  description:
    "BrandBase Capsule is a creative digital agency based in Mumbai specializing in web development, branding, and marketing solutions.",

  sameAs: [
    "https://www.instagram.com/brandbasecapsule",
    "https://www.facebook.com/brandbasecapsule",
    "https://www.linkedin.com/company/brandbasecapsule",
    "https://twitter.com/brandbasecapsule",
  ],

  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-XXXXXXXXXX",
    contactType: "customer service",
    availableLanguage: ["English", "Hindi", "Marathi"],
    areaServed: "IN",
  },

  address: {
    "@type": "PostalAddress",
    streetAddress: "Mumbai",
    addressLocality: "Mumbai",
    addressRegion: "Maharashtra",
    postalCode: "400000",
    addressCountry: "IN",
  },

  makesOffer: [
    { "@type": "Offer", name: "Website Development" },
    { "@type": "Offer", name: "App Development" },
    { "@type": "Offer", name: "Branding Services" },
    { "@type": "Offer", name: "Digital Marketing" },
  ],

  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    ratingCount: "150",
  },
};

// -------------------------------------------
// 🔵 PAGE COMPONENT
// -------------------------------------------
export default function Home() {
  return (
    <>
      {/* Inject JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomePage />
    </>
  );
}
