'use client';

import React from 'react';
import Link from 'next/link';
import { Calendar, MessageSquare, ArrowRight } from 'lucide-react';

export default function ExpoSidebar({ eventLink = '/event-calendar' }) {
  return (
    <aside className="sticky top-28 space-y-8 h-fit">
      <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-zinc-800">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">About BrandBase</h3>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          BrandBase Capsule is a Mumbai-based exhibition stall design agency. We create high-impact
          brand spaces with 3D design, precision fabrication, and on-site support across India.
        </p>
      </div>

      <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 dark:from-orange-950/30 dark:to-zinc-900 p-8 rounded-3xl border border-orange-200/50 dark:border-orange-900/30 relative overflow-hidden group">
        <div className="relative z-10">
          <Calendar className="text-[#FF6600] mb-4" size={32} aria-hidden="true" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Exhibition Calendar</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 font-medium">
            Browse upcoming trade shows and plan your stall with us.
          </p>
          <Link
            href={eventLink}
            className="inline-flex items-center gap-2 font-bold text-[#FF6600] hover:gap-3 transition-all"
          >
            View Calendar <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </div>

      <div className="bg-zinc-900 dark:bg-zinc-800 p-8 rounded-3xl shadow-2xl">
        <MessageSquare className="text-[#FF6600] mb-4" size={32} aria-hidden="true" />
        <h3 className="text-xl font-bold text-white mb-2">Ready to Stand Out?</h3>
        <p className="text-gray-400 mb-6 font-medium">
          Book a free consultation with our exhibition design team.
        </p>
        <Link
          href="/appointment"
          className="inline-flex items-center justify-center w-full py-4 px-6 bg-[#FF6600] hover:bg-orange-600 text-white font-bold rounded-2xl transition-colors gap-2"
        >
          Book Appointment <ArrowRight size={18} aria-hidden="true" />
        </Link>
      </div>
    </aside>
  );
}
