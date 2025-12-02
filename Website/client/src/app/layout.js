// src/app/layout.jsx
import "./globals.css";
import ClientLayout from "./ClientLayout";

export const metadata = {
  title: "Mavenox | Best Digital Marketing & Web Design Company",
  description:
    "Boost your online presence with Mavenox – your partner for SEO, digital marketing, and stunning websites.",
  keywords: [
    "digital marketing agency India",
    "SEO services",
    "web design company",
    "website development",
    "eCommerce solutions",
    "social media marketing",
    "branding agency",
    "UI/UX design",
    "content marketing",
  ],
  authors: [{ name: "Mavenox Team", url: "https://www.mavenox.com" }],
  creator: "Mavenox",
  publisher: "Mavenox",
  robots: "index, follow",
  openGraph: {
    title: "Mavenox | Best Digital Marketing & Web Design Company",
    description:
      "Boost your online presence with Mavenox – your partner for SEO, digital marketing, and stunning websites.",
    url: "https://www.mavenox.com",
    siteName: "Mavenox",
    images: [
      {
        url: "https://www.mavenox.com/og-default.jpg", // replace with actual
        width: 1200,
        height: 630,
        alt: "Mavenox - Digital Marketing & Web Design",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mavenox | Best Digital Marketing & Web Design Company",
    description:
      "Boost your online presence with Mavenox – your partner for SEO, digital marketing, and stunning websites.",
    images: ["https://www.mavenox.com/og-default.jpg"], // replace with actual
  },
  metadataBase: new URL("https://www.mavenox.com"),
  alternates: {
    canonical: "https://www.mavenox.com",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
