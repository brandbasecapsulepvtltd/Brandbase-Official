// src/app/page.jsx (home page)

import HomePage from "@/pages/HomePage";
// Default metadata
const defaultMetadata = { 
  title: "Website Designing Company in India | Best Web Design Services in USA & Dubai",
  description: "Mavenox is a trusted website designing company in India...",
  // ... other fields
};

// ✅ Dynamic SEO metadata (server-side)

export default function Home() {
  return <HomePage />;
}
