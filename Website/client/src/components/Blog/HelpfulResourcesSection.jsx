// HelpfulResourcesSection.jsx
import React from 'react';

const HelpfulResourcesSection = ({ helpfulResources = [] }) => {
  // If no helpful resources, return null
  if (helpfulResources.length === 0) {
    return null;
  }

  // Take first 4 helpful resources
  const resources = helpfulResources.slice(0, 4);

  const ResourceCard = ({ resource }) => (
    <a href={`/blogs/${resource.metadata.category}/${resource.metadata.slug}`} className="group block w-full bg-white dark:bg-zinc-900 dark:bg-black transition duration-300">
      <div className="p-0">
        {/* Category and Title */}
        <div className="mb-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 dark:text-gray-100 leading-tight group-hover:text-indigo-600 transition">
            {resource.metadata.category.charAt(0).toUpperCase() + resource.metadata.category.slice(1)}
          </h3>
          <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
            {resource.metadata.description}
          </p>
        </div>

        {/* Image Container */}
        <div className="relative w-full aspect-[4/3] sm:aspect-video rounded-xl overflow-hidden mt-6">
          <img
            src={resource.metadata.featuredImage}
            alt={resource.metadata.title}
            className="object-cover w-full h-full transform transition duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />
        </div>
      </div>
    </a>
  );

  return (
    <section className="bg-white dark:bg-zinc-900 dark:bg-black py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <h2 className="text-4xl font-semibold mb-10 text-gray-900 dark:text-gray-100 dark:text-gray-100">
          Helpful resources
        </h2>

        {/* 2x2 Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-x-12 md:gap-y-16">
          {resources.map((resource, index) => (
            <ResourceCard key={index} resource={resource} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HelpfulResourcesSection;
