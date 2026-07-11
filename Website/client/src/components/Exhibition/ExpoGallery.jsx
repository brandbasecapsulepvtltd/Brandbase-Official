'use client';

import React from 'react';
import { motion } from 'framer-motion';
import SafeImage from '@/components/General/SafeImage';

const ExpoGallery = ({ galleryData }) => {
  if (!galleryData || galleryData.length === 0) return null;

  return (
    <section className="py-4">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Exhibition Work Gallery
      </h2>
      <div className="columns-1 sm:columns-2 gap-4 space-y-4">
        {galleryData.map((item, index) => (
          <motion.div
            key={item.url || index}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="break-inside-avoid rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 group"
          >
            {item.type === 'video' ? (
              <video
                src={item.url}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-auto object-cover"
              />
            ) : (
              <SafeImage
                src={item.url}
                alt={item.caption || 'Exhibition stall project'}
                fallbackKey="exhibition"
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
              />
            )}
            {item.caption && (
              <div className="p-4 bg-white/90 dark:bg-zinc-900/90">
                <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{item.caption}</p>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ExpoGallery;
