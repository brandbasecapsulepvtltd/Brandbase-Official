import React from 'react';

const CtaSection = ({ data }) => {
  if (!data) return null;

  return (
    <section className="py-16 md:py-24 px-4 bg-gray-50 dark:bg-zinc-950 border-t border-gray-100 dark:border-zinc-800">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
          {data.title}
        </h2>

        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed">
          {data.subheading}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href={data.primaryLink || '/contact'}
            className="w-full sm:w-auto px-8 py-4 text-lg font-semibold border-2 border-[#FF6600] text-[#FF6600] rounded-xl hover:bg-[#FF6600] hover:text-white transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6600] focus-visible:ring-offset-2"
          >
            {data.primaryText || 'Contact Us'}
          </a>

          <a
            href={data.secondaryLink || '/appointment'}
            className="w-full sm:w-auto px-8 py-4 text-lg font-semibold bg-[#FF6600] text-white rounded-xl hover:bg-[#E55A00] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6600] focus-visible:ring-offset-2 inline-flex items-center justify-center gap-2"
          >
            {data.secondaryText || 'Book a Call'}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
