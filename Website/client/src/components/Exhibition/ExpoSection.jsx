'use client';

import React from 'react';
import SafeImage from '@/components/General/SafeImage';

const ExpoSection = ({ section }) => {
  if (!section) return null;

  return (
    <section className="mb-12">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
        {section.title}
      </h2>

      {section.media?.length > 0 && (
        <div className="mb-8 rounded-2xl overflow-hidden shadow-xl border border-gray-100 dark:border-zinc-800">
          {section.media[0].type === 'video' ? (
            <video src={section.media[0].url} controls className="w-full h-auto" />
          ) : (
            <SafeImage
              src={section.media[0].url}
              alt={section.media[0].caption || section.title}
              fallbackKey="exhibition"
              className="w-full h-auto object-cover"
            />
          )}
          {section.media[0].caption && (
            <div className="p-3 bg-gray-50 dark:bg-zinc-800/50 text-center text-sm text-gray-500 border-t border-gray-100 dark:border-zinc-800">
              {section.media[0].caption}
            </div>
          )}
        </div>
      )}

      <div className="space-y-4">
        {section.content?.map((paragraph, idx) => (
          <p key={idx} className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
            {paragraph}
          </p>
        ))}
      </div>

      {section.listItems?.length > 0 && (
        <ul className="mt-6 space-y-3 list-disc list-inside text-gray-700 dark:text-gray-300 text-lg">
          {section.listItems.map((item, idx) => (
            <li key={idx} className="marker:text-[#FF6600] font-medium">
              {item}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default ExpoSection;
