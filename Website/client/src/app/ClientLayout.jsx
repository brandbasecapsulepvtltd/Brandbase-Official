'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/General/Navbar';
import CursorFollower from '@/components/General/CursorFollower';
import FloatingWhatsApp from '@/components/General/FloatingWhatsApp';
import Footer from '@/components/General/Footer';
import ChatbaseWidget from '@/components/General/ChatbaseWidget';
import FloatingLatest from '@/components/General/FloatingLatest';

export default function ClientLayout({ children }) {
  const pathname = usePathname();

  // ❌ List of paths where no UI elements should be shown
  const excludedPaths = ['/signin', '/signup', '/service/film-making'];
  const hideAllUI = excludedPaths.includes(pathname);

  if (hideAllUI) {
    return <>{children}</>; // Show only the page content
  }

  return (
    <>
      <Navbar />
      <FloatingWhatsApp />
      <FloatingLatest/>
      <ChatbaseWidget/>
      <CursorFollower />

      {/* ✅ Page content */}
      {children}

      {/* ✅ Footer will always be last */}
      <Footer />
    </>
  );
}
