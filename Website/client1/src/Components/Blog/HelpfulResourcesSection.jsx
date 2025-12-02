import React from 'react';

const imageLinks = {
  alternatives: "https://ramp.com/_next/image?url=%2Fassets%2Fimages%2Fresources%2Fevergreen-office-mobile.webp&w=3840&q=75",
  compareCards: "https://ramp.com/_next/image?url=%2Fassets%2Fimages%2Fresources%2Fpeople-card.webp&w=3840&q=75",
  accountant: "https://ramp.com/_next/image?url=%2Fassets%2Fimages%2Fresources%2Fevergreen-office-colleagues.webp&w=3840&q=75",
  product: "https://ramp.com/_next/image?url=%2Fassets%2Fimages%2Fresources%2Fcard-multi-device-black.webp&w=3840&q=75",
};

const ResourceCard = ({ title, description, imageUrl, category }) => (
  <a href="#" className="group block w-full bg-white transition duration-300">
    <div className="p-0">
      {/* Category and Title */}
      <div className="mb-4">
        <h3 className="text-lg font-bold text-gray-900 leading-tight group-hover:text-indigo-600 transition">
          {category}
        </h3>
        <p className="text-sm text-gray-700 mt-1">
          {description}
        </p>
      </div>

      {/* Image Container */}
      <div className="relative w-full aspect-[4/3] sm:aspect-video rounded-xl overflow-hidden mt-6">
        <img
          src={imageUrl}
          alt={`${category} resource image`}
          className="object-cover w-full h-full transform transition duration-500 group-hover:scale-[1.03]"
          loading="lazy"
        />
      </div>
    </div>
  </a>
);

const HelpfulResourcesSection = () => {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <h2 className="text-4xl font-semibold mb-10 text-gray-900">
          Helpful resources
        </h2>

        {/* 2x2 Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-x-12 md:gap-y-16">
          
          {/* Card 1: Alternatives */}
          <ResourceCard
            category="Alternatives"
            description="Compare leading finance platforms in head-to-head breakdowns and see how each one stacks up against pricing, features, scalability, and more."
            imageUrl={imageLinks.alternatives}
          />
          
          {/* Card 2: Compare Business Credit Cards */}
          <ResourceCard
            category="Compare Business Credit Cards"
            description="Explore business credit card options by rewards, fees, credit requirements, and benefits to find the best fit for your company’s financial needs."
            imageUrl={imageLinks.compareCards}
          />
          
          {/* Card 3: Accountant directory */}
          <ResourceCard
            category="Accountant directory"
            description="Discover experienced accountants and bookkeepers. Find trusted professionals to handle your financial matters with expertise and precision."
            imageUrl={imageLinks.accountant}
          />
          
          {/* Card 4: Product releases */}
          <ResourceCard
            category="Product releases"
            description="The Ramp team releases updates every week. See the latest innovations designed to help your business save time and money."
            imageUrl={imageLinks.product}
          />
        </div>
      </div>
    </section>
  );
};

export default HelpfulResourcesSection;