'use client';

import React, { useState, useEffect, useRef } from 'react';
import SafeImage from '@/components/General/SafeImage';

const useCenterProximity = (ref) => {
  const [scale, setScale] = useState(0.98);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = viewportHeight / 2;
      const distance = Math.abs(viewportCenter - elementCenter);
      const influenceZone = 500;
      const normalizedDistance = Math.min(distance, influenceZone) / influenceZone;
      const newScale = 1.0 - normalizedDistance * 0.05;
      setScale(newScale);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [ref]);

  return scale;
};

const VisionBanner = ({ data }) => {
  const bannerRef = useRef(null);
  const scale = useCenterProximity(bannerRef);

  if (!data?.imageUrl) return null;

  return (
    <div className="px-4 sm:px-6 lg:px-10 py-8 md:py-12">
      <div
        ref={bannerRef}
        className="relative w-full overflow-hidden rounded-2xl min-h-[280px] md:min-h-[360px] flex items-center justify-center transition-transform duration-100 ease-out mx-auto max-w-7xl"
        style={{ transform: `scale(${scale})` }}
      >
        <SafeImage
          src={data.imageUrl}
          alt={data.heading || 'Brand vision'}
          fallbackKey="feature"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/65" />
        <div className="relative z-10 text-center px-6 py-12 md:px-16">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-snug max-w-4xl mx-auto">
            {data.heading}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default VisionBanner;
