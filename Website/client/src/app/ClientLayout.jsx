'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import Navbar from '@/components/General/Navbar';
import CursorFollower from '@/components/General/CursorFollower';
import FloatingWhatsApp from '@/components/General/FloatingWhatsApp';
import Footer from '@/components/General/Footer';
import ChatbaseWidget from '@/components/General/ChatbaseWidget';
import FloatingLatest from '@/components/General/FloatingLatest';
// import EventPopup from '@/components/General/EventPopup';
import WelcomePopup from '@/components/WelcomePopup';
import ScrollProgress from '@/components/General/ScrollProgress';
import BackToTop from '@/components/General/BackToTop';

export default function ClientLayout({ children, generalData }) {
  const pathname = usePathname();
  const [showPopup, setShowPopup] = useState(false);

  // ❌ Paths where UI should be hidden
  const excludedPaths = ['/signin', '/signup', '/service/film-making'];
  const hideAllUI = excludedPaths.includes(pathname);

  // useEffect(() => {
  //   const popupShown = sessionStorage.getItem('eventPopupShown');

  //   if (!popupShown) {
  //     setShowPopup(true);
  //     sessionStorage.setItem('eventPopupShown', 'true');
  //   }
  // }, []);

  if (hideAllUI) {
    return <>{children}</>;
  }

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[10000] focus:px-4 focus:py-2 focus:bg-[#FF6600] focus:text-white focus:rounded-md focus:outline-none focus:ring-2 focus:ring-white"
      >
        Skip to main content
      </a>

      <ScrollProgress />
      <Navbar data={generalData.navbar} topBarData={generalData.topBar} />

      <WelcomePopup />

      <FloatingWhatsApp />
      <FloatingLatest data={generalData.floatingLatest} />
      <ChatbaseWidget />
      <CursorFollower />

      <main id="main-content" className="mt-5" tabIndex={-1}>
        {children}
      </main>

      <Footer data={generalData.footer} />
      <BackToTop />
    </>
  );
}
