"use client";

import React from 'react';

const FeatureSection = ({ data }) => {
  if (!data) return null;

  return (
    <div className="w-full bg-white dark:bg-black">
      {data.map((feature, index) => (
        <div
          key={feature.id}
          className={`flex flex-col ${feature.imagePosition === 'right' ? 'lg:flex-row' : 'lg:flex-row-reverse'
            } items-center gap-8 lg:gap-12 px-6 sm:px-8 lg:px-16 py-12 lg:py-20`}
        >
          {/* Text Content */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              {feature.title}
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              {feature.description}
            </p>
          </div>

          {/* Image Content */}
          <div className="w-full lg:w-1/2 flex justify-center items-center">
            <div className="relative w-full max-w-md h-80 sm:h-96 lg:h-full lg:max-w-none">
              <img
                src={feature.image}
                alt={feature.title}
                className="object-contain w-full h-full"
                priority={index === 0}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeatureSection;
