'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { OFFICE_LIST } from '@/lib/officeLocations';
import { CONTACT_FORM_PROMPT, SHOW_PUBLIC_ADDRESS } from '@/lib/contactConstants';

const OfficeWorldMap = dynamic(() => import('./OfficeWorldMap'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-slate-100 dark:bg-slate-900 animate-pulse" aria-hidden="true" />
  ),
});

export default function GlobalPresence() {
  const [activeId, setActiveId] = useState('india-mumbai');
  const activeOffice = OFFICE_LIST.find((o) => o.id === activeId) || OFFICE_LIST[0];

  return (
    <section
      className="py-14 md:py-16 px-4 md:px-8 bg-white dark:bg-zinc-950 border-t border-gray-100 dark:border-zinc-800"
      aria-labelledby="global-presence-heading"
    >
      <div className="max-w-6xl mx-auto">
        <h2
          id="global-presence-heading"
          className="text-center text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-8"
        >
          Worldwide <span className="text-[#FF6600]">Presence</span>
        </h2>

        <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-zinc-700 shadow-md bg-slate-50 dark:bg-slate-900">
          <div className="relative w-full aspect-[2/1] min-h-[260px] sm:min-h-[320px] md:min-h-[400px]">
            <OfficeWorldMap
              offices={OFFICE_LIST}
              activeId={activeId}
              onSelect={setActiveId}
            />
          </div>

          <div className="px-5 py-4 border-t border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <p className="text-sm md:text-base font-semibold text-gray-900 dark:text-white shrink-0">
              {activeOffice.city}, {activeOffice.country}
              {activeOffice.isHQ && (
                <span className="ml-2 text-[10px] font-bold uppercase tracking-widest text-[#FF6600] bg-[#FF6600]/10 px-2 py-0.5 rounded-full">
                  Headquarters
                </span>
              )}
            </p>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 sm:text-right sm:max-w-[55%] leading-relaxed">
              {SHOW_PUBLIC_ADDRESS ? (
                activeOffice.address
              ) : (
                <Link href="/contact" className="text-[#FF6600] hover:underline">
                  {CONTACT_FORM_PROMPT}
                </Link>
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
