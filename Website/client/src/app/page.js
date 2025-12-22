import HomePage from "@/pages/HomePage";

// ⏱️ REVALIDATE: This forces the page to refresh its data every 10 seconds
export const revalidate = 10;

/** * 🔵 DYNAMIC SEO METADATA 
 * Next.js calls this function on every request (or every 10s) to generate tags.
 */
export async function generateMetadata() {
  let data = {};
  
  try {
    // Replace this with your actual Admin Dashboard API URL
    const res = await fetch("https://your-admin-api.com/api/seo-settings", {
      next: { revalidate: 10 },
    });
    data = await res.json();
  } catch (error) {
    console.error("Metadata fetch failed, using defaults", error);
  }

  return {
    // 🌐 Basic SEO (Dynamic)
    title: data.title || "BrandBase Capsule | Creative Digital Agency in Mumbai",
    description: data.description || "BrandBase Capsule is a leading creative digital agency based in Mumbai offering web design, app development, branding, and digital marketing services.",
    keywords: data.keywords || ["digital marketing agency Mumbai", "web design company Mumbai", "brandbase capsule"],

    // 👤 Authorship & System
    authors: [{ name: "BrandBase Capsule Team" }],
    generator: "Next.js",
    applicationName: "BrandBase Capsule",
    publisher: "BrandBase Capsule",

    // 🤖 Robots
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
      canonical: "/",
    },

    // 🖼️ Social Sharing (Open Graph)
    openGraph: {
      title: data.ogTitle || data.title || "BrandBase Capsule | Creative Digital Agency",
      description: data.ogDescription || data.description,
      url: "https://www.brandbasecapsule.com",
      siteName: "BrandBase Capsule",
      locale: "en_IN",
      type: "website",
      images: [
        {
          url: data.mainImage || "https://ik.imagekit.io/vinayak06/Home.png",
          width: 1200,
          height: 630,
          alt: "BrandBase Capsule Homepage",
        },
      ],
    },

    // 🐦 Twitter SEO
    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: data.description,
      images: [data.mainImage || "https://ik.imagekit.io/vinayak06/Home.png"],
      creator: "@brandbasecapsule",
    },

    // 📌 Icons
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.png",
      apple: "/apple-touch-icon.png",
    },

    // 🏷️ Category
    category: "Business",
  };
}

/** * 🔵 MAIN PAGE COMPONENT
 */
export default async function Home() {
  let dbData = {};

  try {
    // Fetch organization & schema data from your dashboard
    const res = await fetch("https://your-admin-api.com/api/organization-settings", {
      next: { revalidate: 10 },
    });
    dbData = await res.json();
  } catch (error) {
    dbData = {}; // Fallback to empty to allow hardcoded defaults below
  }

  // 🔵 JSON-LD STRUCTURED DATA (Dynamic)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: dbData.name || "BrandBase Capsule",
    legalName: dbData.legalName || "BrandBase Capsule Pvt. Ltd.",
    url: "https://www.brandbasecapsule.com",
    logo: dbData.logo || "https://ik.imagekit.io/vinayak06/Screenshot%202025-12-12%20185904.png",
    description: dbData.description || "BrandBase Capsule is a creative digital agency based in Mumbai.",

    sameAs: dbData.socialLinks || [
      "https://www.instagram.com/brandbasecapsule",
      "https://www.facebook.com/brandbasecapsule",
      "https://www.linkedin.com/company/brandbasecapsule",
      "https://twitter.com/brandbasecapsule",
    ],

    contactPoint: {
      "@type": "ContactPoint",
      telephone: dbData.phone || "+91-XXXXXXXXXX",
      contactType: "customer service",
      availableLanguage: ["English", "Hindi", "Marathi"],
      areaServed: "IN",
    },

    address: {
      "@type": "PostalAddress",
      streetAddress: dbData.address || "Mumbai",
      addressLocality: "Mumbai",
      addressRegion: "Maharashtra",
      postalCode: dbData.zip || "400000",
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
      ratingValue: dbData.rating || "4.9",
      ratingCount: dbData.reviewCount || "150",
    },
  };

  return (
    <>
      {/* 1. Inject Dynamic JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* 2. Google Verification (Static) */}
      <meta name="google-site-verification" content="FPOO4DhO411nxsu-z3MXNumhevuBGMhbv0mfKdj9y2Q" />
      
      {/* 3. Render the Homepage Content */}
      {/* We pass the data to HomePage so the UI also updates every 10s */}
      <HomePage initialData={dbData} />
    </>
  );
}