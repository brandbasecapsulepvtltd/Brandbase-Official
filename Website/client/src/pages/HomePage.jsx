'use client';

import React, { useLayoutEffect } from 'react';
import AboutUs from '@/components/homeComponents/AboutUs';
import BrandElevation from '@/components/homeComponents/BrandElevation';
import RecentWork from '@/components/homeComponents/RecentWork';
import Clients from '@/components/homeComponents/Clients';
import Faqs from '@/components/homeComponents/Faqs';
import CTASection from '@/components/homeComponents/CTASection';
import TestimonialSlider from '@/components/homeComponents/TestimonalSlider';
import ServiceSlider from '@/components/ServiceSlider';
import HeroSlider from '@/components/homeComponents/HeroSlider';
import InteractiveImageBentoGalleryDemo from '@/components/homeComponents/BentoGallery/demo';

const HomePage = ({ initialData, sliderBlogs }) => {
  // Use data passed from server directly
  const homePageData = initialData;
  // We no longer need loading/error states for the main content as it's fetched server-side
  // or handled by the parent error boundary/catch block

  // Fix: Scroll to top on page load/reload
  useLayoutEffect(() => {
    // Reset scroll position immediately when component mounts
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });

    // Disable browser's automatic scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  // Check if we have the minimum required data
  if (!homePageData) {
    return (
      <div
        className="min-h-screen flex items-center justify-center bg-gray-50"
        role="status"
        aria-label="No data available"
      >
        <div className="text-center">
          <div
            className="text-6xl mb-4"
            aria-hidden="true"
          >❓</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">No Data Available</h1>
          <p className="text-gray-600">
            Please check your .env.local file contains:<br />
            NEXT_PUBLIC_API_KEY=your_api_key_here
          </p>
        </div>
      </div>
    );
  }

  // Destructure data for easier access
  const {
    heroSection,
    brandElevation,
    recentWork,
    clients,
    testimonials,
    faqs,
    ctaSection,
    caseStudiesSection
  } = homePageData;

  // Render the complete page with fetched data
  return (
    <div className="home-page bg-white dark:bg-black">
      {/* Hero Section - Now fetches its own data */}
      <HeroSlider data={heroSection} blogs={sliderBlogs} />

      {/* About Us Section */}
      <AboutUs />

      {/* Brand Elevation Section */}
      {brandElevation && <BrandElevation data={brandElevation} />}

      {/* Recent Work Section */}
      {recentWork && <RecentWork data={recentWork} />}

      {/* Service Slider Section */}
      <ServiceSlider />

      {/* Clients Section */}
      {clients && <Clients data={clients} />}


      {/**/}
      <InteractiveImageBentoGalleryDemo data={caseStudiesSection} />

      {/* Testimonials Section */}
      {testimonials && <TestimonialSlider data={testimonials} />}

      {/* FAQs Section */}
      {faqs && <Faqs data={faqs} />}

      {/* CTA Section */}
      <CTASection data={ctaSection} />
    </div>
  );
};

export default HomePage;
