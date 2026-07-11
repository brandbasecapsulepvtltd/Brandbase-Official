// src/app/layout.jsx
import { Outfit, Playfair_Display, Great_Vibes } from "next/font/google";
import "./globals.css";
import ClientLayout from "./ClientLayout";
import { Providers } from "./Providers";
import { api } from "@/lib/api";

/* ---------------- SEO & SITE METADATA (GLOBAL) ---------------- */
export const metadata = {
  metadataBase: new URL("https://www.brandbasecapsule.com"),

  verification: {
    google: "xeEJncvNlZJzQ7c68dNW2Niz2ReIzzdWwwurvThLoTU",
  },
};

/* ---------------- FONT SETUP ---------------- */
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-outfit",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-playfair",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-great-vibes",
});

/* ---------------- ROOT LAYOUT ---------------- */
export default async function RootLayout({ children }) {
  // Fetch general component data with 10s revalidation
  let generalData = {
    topBar: null,
    navbar: null,
    footer: null,
    floatingLatest: null,
  };

  try {
    const [
      topBarRes,
      navbarRes,
      footerRes,
      floatingLatestRes,
    ] = await Promise.all([
      api.getTopBar(10),
      api.getNavbar(10),
      api.getFooter(10),
      api.getFloatingLatest(10),
    ]);

    generalData = {
      topBar: topBarRes.success ? topBarRes.data : null,
      navbar: navbarRes.success ? navbarRes.data : null,
      footer: footerRes.success ? footerRes.data : null,
      floatingLatest: floatingLatestRes.success
        ? floatingLatestRes.data
        : null,
    };
  } catch (error) {
    console.error(
      "Error fetching general component data in RootLayout:",
      error
    );
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.variable} ${playfair.variable} ${greatVibes.variable} font-sans antialiased`}>
        <Providers>
          <ClientLayout generalData={generalData}>
            {children}
          </ClientLayout>
        </Providers>
      </body>
    </html>
  );
}
