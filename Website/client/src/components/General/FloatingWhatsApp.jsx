'use client';

import React, { useState, useRef } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { QRCodeCanvas } from 'qrcode.react';
import { CONTACT } from '@/lib/contactConstants';

const FloatingWhatsApp = () => {
  const [showQR, setShowQR] = useState(false);
  const timerRef = useRef(null);

  const message = encodeURIComponent("Hi Brandbase Capsule! I'm interested in your services");
  const waLink = `${CONTACT.whatsappUrl}?text=${message}`;
  const isMobile =
    typeof navigator !== 'undefined' &&
    /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const handleClick = () => {
    if (isMobile) {
      window.open(waLink, '_blank');
    } else {
      // Toggle QR visibility
      const nextShowQR = !showQR;
      setShowQR(nextShowQR);

      // Clear any existing timers
      clearTimeout(timerRef.current);

      // If QR is shown, set auto-hide
      if (nextShowQR) {
        timerRef.current = setTimeout(() => {
          setShowQR(false);
        }, 5000);
      }
    }
  };

  const handleChatClick = () => {
    window.open(waLink, '_blank');
  };

  return (
    <>
      {/* WhatsApp Floating Icon */}
      <button
        type="button"
        onClick={handleClick}
        className="fixed bottom-20 right-4 z-50 w-15 h-15 bg-orange-600 rounded-full shadow-lg flex items-center justify-center hover:bg-orange-700 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6600] focus-visible:ring-offset-2"
        aria-label="WhatsApp Chat"
        aria-expanded={!isMobile && showQR}
        aria-haspopup={!isMobile ? 'dialog' : undefined}
      >
        <FaWhatsapp className="text-white text-2xl bg-orange-600" aria-hidden="true" />
      </button>

      {/* QR Code Box */}
      {showQR && !isMobile && (
        <div 
          role="dialog"
          aria-labelledby="whatsapp-qr-title"
          className="fixed bottom-30 right-6 z-50 w-64 p-4 bg-white dark:bg-zinc-900 dark:bg-black rounded-2xl shadow-2xl border border-gray-200"
        >
          <h4
            id="whatsapp-qr-title"
            className="text-lg font-semibold mb-3 text-center text-gray-800 dark:text-gray-200 dark:text-gray-200"
          >
            Scan to Chat
          </h4>
          <div className="flex justify-center mb-4">
            <QRCodeCanvas value={waLink} size={128} aria-hidden="true" />
          </div>
          <button
            type="button"
            onClick={handleChatClick}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6600] focus-visible:ring-offset-2"
          >
            Chat on WhatsApp
          </button>
        </div>
      )}
    </>
  );
};

export default FloatingWhatsApp;
