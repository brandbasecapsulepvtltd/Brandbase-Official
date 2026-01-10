'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import Navbar from '@/components/General/Navbar';
import CursorFollower from '@/components/General/CursorFollower';
import FloatingWhatsApp from '@/components/General/FloatingWhatsApp';
import Footer from '@/components/General/Footer';
import ChatbaseWidget from '@/components/General/ChatbaseWidget';
import FloatingLatest from '@/components/General/FloatingLatest';
import EventPopup from '@/components/General/EventPopup';

export default function ClientLayout({ children, generalData }) {
  const pathname = usePathname();
  const [showPopup, setShowPopup] = useState(false);

  // ❌ Paths where UI should be hidden
  const excludedPaths = ['/signin', '/signup', '/service/film-making'];
  const hideAllUI = excludedPaths.includes(pathname);

  useEffect(() => {
    const popupShown = sessionStorage.getItem('eventPopupShown');

    if (!popupShown) {
      setShowPopup(true);
      sessionStorage.setItem('eventPopupShown', 'true');
    }
  }, []);

  if (hideAllUI) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar data={generalData.navbar} topBarData={generalData.topBar} />

      {/* ✅ Show popup only first time */}
      {showPopup && <EventPopup />}

      <FloatingWhatsApp />
      <FloatingLatest data={generalData.floatingLatest} />
      <ChatbaseWidget />
      <CursorFollower />

      <main className="mt-5">
        {children}
      </main>

      <Footer data={generalData.footer} />
    </>
  );
}
