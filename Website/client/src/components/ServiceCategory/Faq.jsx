import React, { useState, useRef, useEffect } from "react";


export default function Faq({ data }) {
  const [openIndex, setOpenIndex] = useState(1);

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className="w-full max-w-5xl mx-auto py-16 px-4">
      <div className="text-center mb-10">
        <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 tracking-wide">
          FAQ
        </p>
        <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 dark:text-gray-100 mt-3">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mt-3 text-lg">
          Clear answers about our web design process, pricing, and timeline help
          you make informed decisions and streamline project planning.
        </p>
      </div>

      <div className="space-y-3">
        {data.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={index}
              className="bg-orange-100 dark:bg-zinc-800/50 rounded-xl border border-gray-200 dark:border-zinc-800 shadow-sm"
            >
              {/* Header */}
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center p-5 text-left"
              >
                <span className="text-lg font-medium text-gray-800 dark:text-gray-200">
                  {item.question}
                </span>
                <svg
                  className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                    }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Smooth Animated Content */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                  }`}
              >
                <div className="px-5 pb-5 text-gray-800 dark:text-gray-200 text-[17px] leading-relaxed">
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
