'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Breadcrumbs from '@/components/General/Breadcrumbs';
import ScrollSequence from '@/components/Exhibition/ScrollSequence';
import { HeroSection } from '@/components/Exhibition/HeroSection';
import ExpoGallery from '@/components/Exhibition/ExpoGallery';
import ComparisonTable from '@/components/Exhibition/ComparisonTable';
import ExpoSection from '@/components/Exhibition/ExpoSection';
import ExpoFAQ from '@/components/Exhibition/ExpoFAQ';
import ExpoSidebar from '@/components/Exhibition/ExpoSidebar';
import { EXPO_GENERAL_PAGE } from '@/lib/expoPageData';

export default function ExhibitionContent({ pageData = EXPO_GENERAL_PAGE }) {
  const { hero, gallery, sections, faqs, breadcrumbLabel, sidebarEventLink } = pageData;

  return (
    <div className="bg-white dark:bg-black min-h-screen">
      <div className="container mx-auto px-4 max-w-7xl pt-28 md:pt-32">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Services', href: '/services' },
            { label: breadcrumbLabel, href: pageData.seo?.canonicalPath || '/expo' },
          ]}
        />
      </div>

      <HeroSection
        title={hero.title}
        subtitle={hero.subtitle}
        primaryButtonText={hero.primaryButtonText}
        primaryButtonHref={hero.primaryButtonHref}
        secondaryButtonText={hero.secondaryButtonText}
        secondaryButtonHref={hero.secondaryButtonHref}
        imageUrl={hero.imageUrl}
      />

      <div className="relative w-full">
        <ScrollSequence />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          <div className="lg:col-span-2 space-y-20">
            <div id="gallery">
              <ExpoGallery galleryData={gallery} />
            </div>

            <ComparisonTable />

            {sections.map((section) => (
              <ExpoSection key={section.id} section={section} />
            ))}

            <ExpoFAQ faqs={faqs} />
          </div>

          <div className="hidden lg:block">
            <ExpoSidebar eventLink={sidebarEventLink} />
          </div>

          <div className="lg:hidden mt-20">
            <hr className="border-gray-200 dark:border-zinc-800 mb-20" />
            <ExpoSidebar eventLink={sidebarEventLink} />
          </div>
        </div>
      </div>

      <section className="bg-gradient-to-br from-[#FF6600] to-orange-600 py-16 px-4">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to dominate your next exhibition?</h2>
          <p className="text-orange-50 mb-8 leading-relaxed">
            Book a free consultation — we&apos;ll scope your stall, timeline, and budget in one call.
          </p>
          <Link
            href="/appointment"
            className="inline-flex items-center gap-2 rounded-full bg-white text-[#FF6600] px-8 py-3.5 font-bold hover:bg-orange-50 transition-colors"
          >
            Book Free Consultation
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
