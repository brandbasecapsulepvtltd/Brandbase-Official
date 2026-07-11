'use client';

import React, { useState } from 'react';

export default function Faq({ data = [], intro }) {
  const [openIndex, setOpenIndex] = useState(null);

  if (!data.length) return null;

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className="w-full max-w-5xl mx-auto py-16 px-4 sm:px-6">
      <div className="text-center mb-10">
        <p className="text-sm font-semibold text-[#FF6600] uppercase tracking-widest">
          FAQ
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mt-3">
          Frequently Asked Questions
        </h2>
        {intro && (
          <p className="text-gray-500 dark:text-gray-400 mt-3 text-base md:text-lg max-w-2xl mx-auto">
            {intro}
          </p>
        )}
      </div>

      <div className="space-y-3">
        {data.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={item.question || index}
              className="bg-orange-50/80 dark:bg-zinc-900/50 rounded-xl border border-orange-100 dark:border-zinc-800"
            >
              <button
                type="button"
                onClick={() => toggle(index)}
                aria-expanded={isOpen}
                className="w-full flex justify-between items-center gap-4 p-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6600] rounded-xl"
              >
                <span className="text-base md:text-lg font-medium text-gray-800 dark:text-gray-200">
                  {item.question}
                </span>
                <svg
                  className={`w-5 h-5 shrink-0 text-[#FF6600] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="px-5 pb-5 text-gray-700 dark:text-gray-300 text-base leading-relaxed">
                  {item.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
