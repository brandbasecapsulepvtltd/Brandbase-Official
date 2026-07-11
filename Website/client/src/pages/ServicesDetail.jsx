import React from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/General/Breadcrumbs';
import { formatBlogCategoryLabel } from '@/lib/corePagesSeo';
import ComparisonSection from '@/components/ServicesDetail/ComparisonSection';
import FeatureSection from '@/components/ServicesDetail/FeatureSection';
import VideoMakerSection from '@/components/ServicesDetail/VideoMakerSection';
import AnimateImage from '@/components/ServicesDetail/AnimateImage';
import WebHeroSection from '@/components/ServicesDetail/WebHeroSection';
import ServicePackages from '@/components/ServicesDetail/ServicePackages';

const ServicesDetail = ({ data, category, slug }) => {
  if (!data) {
    return null;
  }

  const categoryLabel = category ? formatBlogCategoryLabel(category) : 'Services';
  const serviceName = data.hero?.headline || 'Service';

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-28 md:pt-32">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Services', href: '/services' },
            { label: categoryLabel, href: `/services/${category}` },
            { label: serviceName, href: `/services/${category}/${slug}` },
          ]}
        />
      </div>

      <WebHeroSection data={data.hero} />
      <AnimateImage data={data.animateImage} />
      <ComparisonSection data={data.comparison} />
      <FeatureSection data={data.features} />
      <ServicePackages data={data.packages} />
      <VideoMakerSection data={data.videoMaker} />

      <section className="py-16 px-4 bg-gradient-to-br from-[#FF6600] to-orange-600">
        <div className="max-w-3xl mx-auto text-center text-white space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold">Ready to get started?</h2>
          <p className="text-orange-50">Book a free consultation — we&apos;ll scope your project in one call.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/appointment"
              className="inline-flex justify-center px-8 py-3.5 bg-white text-[#FF6600] font-semibold rounded-xl hover:bg-orange-50 transition-colors"
            >
              Book Consultation
            </Link>
            <Link
              href="/contact"
              className="inline-flex justify-center px-8 py-3.5 border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicesDetail;
