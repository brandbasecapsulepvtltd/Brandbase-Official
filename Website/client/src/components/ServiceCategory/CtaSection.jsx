import React from 'react';

const CtaSection = ({ data }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center p-2">
      <div className="max-w-3xl mx-auto text-center">

        {/* Main Heading */}
        <h1 className="text-3xl lg:text-5xl font-bold text-black dark:text-white leading-tight mb-8">
          {data.title}
        </h1>

        {/* Subheading */}
        <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-12">
          {data.subheading}
        </p>

        {/* Hardcoded Buttons Container */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">

          {/* Contact Sales Button (Outlined) - Hardcoded */}
          <button className="
            w-full sm:w-auto
            px-8 py-4
            text-lg font-semibold
            border border-orange-500
            text-gray-900 dark:text-gray-100
            rounded-lg
            hover:bg-orange-500 hover:text-white
            transition-all duration-300
            focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2
          ">
            Contact Sales
          </button>

          {/* Get Started Button (Filled) - Hardcoded */}
          <button className="
            w-full sm:w-auto
            px-8 py-4
            text-lg font-semibold
            bg-orange-500
            text-white
            rounded-lg
            hover:bg-orange-600
            transition-all duration-300
            focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2
            flex items-center justify-center gap-2
          ">
            Get Started
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </button>

        </div>

      </div>
    </div>
  );
};

export default CtaSection;
