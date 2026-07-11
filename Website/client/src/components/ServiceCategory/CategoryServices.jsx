import React from 'react';
import Link from 'next/link';
import SafeImage from '@/components/General/SafeImage';

const CategoryServices = ({ data }) => {
  if (!data?.services?.length) return null;

  return (
    <section className="bg-white dark:bg-black py-20 px-4 md:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wide leading-tight">
            {data.title}
          </h2>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold uppercase tracking-widest text-[#FF6600]">
            {data.subtitle}
          </h3>
          <p className="mt-8 text-gray-600 dark:text-gray-400 text-lg md:text-xl max-w-3xl mx-auto font-normal leading-relaxed">
            {data.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.services.map((service, index) => (
            <div
              key={index}
              className="group bg-orange-50/50 dark:bg-zinc-900/50 rounded-[40px] p-10 flex flex-col items-center text-center transition-all duration-500 h-full border border-orange-100/50 dark:border-zinc-800 hover:border-[#FF6600]/30 dark:hover:border-[#FF6600]/30 hover:shadow-2xl hover:shadow-[#FF6600]/10 relative overflow-hidden"
            >
              <div className="mb-8 w-full h-64 flex items-center justify-center overflow-hidden rounded-2xl bg-white/50 dark:bg-black/20 p-4">
                <SafeImage
                  src={service.image}
                  alt={service.title}
                  fallbackKey="feature"
                  className="h-full object-contain drop-shadow-lg transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4 tracking-wide group-hover:text-[#FF6600] transition-colors duration-300">
                {service.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-400 text-lg leading-loose mb-8 font-normal">
                {service.description}
              </p>

              <div className="mt-auto">
                <Link
                  href={service.link || '#'}
                  className="text-[#FF6600] font-bold text-lg hover:text-[#E55A00] transition-all duration-300 uppercase tracking-widest border-b border-transparent hover:border-[#FF6600] pb-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6600] rounded"
                >
                  Learn More
                </Link>
              </div>

              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-orange-50/30 dark:to-orange-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryServices;
