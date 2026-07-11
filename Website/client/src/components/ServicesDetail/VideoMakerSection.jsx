"use client";

import React from 'react';
import SafeImage from '@/components/General/SafeImage';

const VideoMakerSection = ({ data }) => {
  if (!data) return null;

  return (
    <section className="bg-white dark:bg-black py-16 md:py-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto font-sans">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-center text-gray-900 dark:text-gray-100 mb-12 md:mb-16 uppercase tracking-tight leading-tight">
          {data.heading}
        </h2>

        {/* Paragraphs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 mb-16 max-w-5xl mx-auto text-gray-700 dark:text-gray-300 text-lg lg:text-[1.125rem] leading-relaxed">
          {data.paragraphs.map((text, i) => (
            <p key={i}>{text}</p>
          ))}
        </div>

        {/* Image */}
        <div className="flex justify-center">
          <SafeImage
            src={data.imageUrl}
            alt={data.heading || 'Brandbase Capsule service showcase'}
            fallbackKey="video"
            className="w-full max-w-6xl h-auto object-contain drop-shadow-sm"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export default VideoMakerSection;
