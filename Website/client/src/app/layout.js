// src/app/layout.jsx
import { Outfit } from "next/font/google";
import "./globals.css";
import ClientLayout from "./ClientLayout";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-outfit",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
      </head>
      <body className={`${outfit.variable} font-sans antialiased`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
