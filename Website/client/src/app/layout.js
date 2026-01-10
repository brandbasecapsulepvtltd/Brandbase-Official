// src/app/layout.jsx
import { Outfit } from "next/font/google";
import "./globals.css";
import ClientLayout from "./ClientLayout";
import { Providers } from "./Providers";
import { api } from "@/lib/api";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-outfit",
});

export default async function RootLayout({ children }) {
  // Fetch general component data with 10s revalidation
  let generalData = {
    topBar: null,
    navbar: null,
    footer: null,
    floatingLatest: null
  };

  try {
    const [topBarRes, navbarRes, footerRes, floatingLatestRes] = await Promise.all([
      api.getTopBar(10),
      api.getNavbar(10),
      api.getFooter(10),
      api.getFloatingLatest(10)
    ]);

    generalData = {
      topBar: topBarRes.success ? topBarRes.data : null,
      navbar: navbarRes.success ? navbarRes.data : null,
      footer: footerRes.success ? footerRes.data : null,
      floatingLatest: floatingLatestRes.success ? floatingLatestRes.data : null
    };
  } catch (error) {
    console.error("Error fetching general component data in RootLayout:", error);
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Analytics */}
      </head>
      <body className={`${outfit.variable} font-sans antialiased`}>
        <Providers>
          <ClientLayout generalData={generalData}>{children}</ClientLayout>
        </Providers>
      </body>
    </html>
  );
}
