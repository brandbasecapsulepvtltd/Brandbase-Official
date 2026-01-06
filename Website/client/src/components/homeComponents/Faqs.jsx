"use client";

import Tag from "../Tag";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

export default function Faqs({ data }) {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleQuestionClick = (index) => {
    setSelectedIndex(selectedIndex === index ? null : index);
  };

  return (
    <section 
      aria-labelledby="faqs-heading"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-white"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <Tag>FAQ</Tag>
          </div>
          <h1 
            id="faqs-heading"
            className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
          >
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about our services and process. 
            Can't find what you're looking for?{" "}
            <a 
              href="/contact" 
              className="text-[#FF6600] font-semibold hover:underline"
              aria-label="Contact us directly for more information"
            >
              Contact us directly.
            </a>
          </p>
        </header>

        {/* FAQ Items - Centered */}
        <div 
          className="space-y-4"
          role="list"
          aria-label="Frequently asked questions list"
        >
          {data.faqs.map((faq, faqIndex) => (
            <article
              key={faqIndex}
              className={twMerge(
                "bg-white rounded-2xl border border-gray-200 p-6 transition-all duration-300 cursor-pointer hover:border-[#FF6600]/50 hover:shadow-lg",
                selectedIndex === faqIndex && "border-[#FF6600] shadow-xl"
              )}
              onClick={() => handleQuestionClick(faqIndex)}
              onKeyDown={(e) => e.key === 'Enter' && handleQuestionClick(faqIndex)}
              role="article"
              tabIndex={0}
              aria-expanded={selectedIndex === faqIndex}
              aria-controls={`faq-answer-${faqIndex}`}
            >
              {/* Question Header */}
              <div className="flex justify-between items-center">
                <h2 className="font-semibold text-gray-900 text-lg lg:text-xl pr-8">
                  {faq.question}
                </h2>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={twMerge(
                    "text-[#FF6600] flex-shrink-0 transition duration-300",
                    selectedIndex === faqIndex && "rotate-45"
                  )}
                  aria-hidden="true"
                >
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </div>
              
              {/* Answer with Image */}
              <AnimatePresence>
                {selectedIndex === faqIndex && (
                  <motion.div
                    id={`faq-answer-${faqIndex}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="overflow-hidden"
                    role="region"
                  >
                    <div className="pt-6 border-t border-gray-100 mt-4">
                      {/* Content Layout */}
                      <div className={twMerge(
                        "flex flex-col gap-6",
                        faq.hasImage && "lg:flex-row lg:items-start"
                      )}>
                        {/* Text Content */}
                        <div className={twMerge(
                          "flex-1",
                          faq.hasImage && "lg:flex-1"
                        )}>
                          <p className="text-gray-600 leading-relaxed text-base lg:text-lg">
                            {faq.answer}
                          </p>
                          
                          {/* Quick Tip for specific FAQs */}
                          {(faqIndex === 0 || faqIndex === 2 || faqIndex === 4) && (
                            <aside className="mt-4 p-4 bg-[#FF6600]/5 rounded-xl border border-[#FF6600]/20">
                              <h3 className="text-[#FF6600] font-semibold text-sm mb-1">
                                Quick Tip
                              </h3>
                              <p className="text-gray-700 text-sm">
                                {faqIndex === 0 && "Our data-driven approach ensures every marketing dollar is well spent."}
                                {faqIndex === 2 && "Start with our growth audit to identify your biggest opportunities."}
                                {faqIndex === 4 && "Transparent reporting means you always know where your investment is going."}
                              </p>
                            </aside>
                          )}
                          
                          {/* CTA Links */}
                          <div className="mt-6 flex flex-wrap gap-3">
                            {faqIndex === 0 && (
                              <a
                                href="/case-studies"
                                className="px-4 py-2 bg-[#FF6600] text-white text-sm font-medium rounded-lg hover:bg-[#E55A00] transition-colors"
                                aria-label="View our case studies"
                              >
                                View Case Studies
                              </a>
                            )}
                            {faqIndex === 1 && (
                              <a
                                href="/process"
                                className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:border-[#FF6600] hover:text-[#FF6600] transition-colors"
                                aria-label="Learn about our process"
                              >
                                Learn About Our Process
                              </a>
                            )}
                            {faqIndex === 2 && (
                              <a
                                href="/pricing"
                                className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:border-[#FF6600] hover:text-[#FF6600] transition-colors"
                                aria-label="View our pricing plans"
                              >
                                View Pricing
                              </a>
                            )}
                          </div>
                        </div>
                        
                        {/* Image - Only for specific FAQs */}
                        {faq.hasImage && selectedIndex === faqIndex && (
                          <figure className="flex-1">
                            <div className="rounded-xl overflow-hidden border border-gray-200">
                              <img
                                src={faq.image}
                                alt={`Visual representation for: ${faq.question}`}
                                className="w-full h-48 lg:h-64 object-cover"
                                loading="lazy"
                                width={400}
                                height={256}
                              />
                            </div>
                            <figcaption className="text-gray-500 text-sm mt-2 text-center">
                              {faqIndex === 0 && "Our team analyzing campaign performance data"}
                              {faqIndex === 2 && "Startup growth strategy session"}
                              {faqIndex === 4 && "Real-time analytics dashboard"}
                            </figcaption>
                          </figure>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </article>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-[#FF6600]/5 to-[#FF6600]/10 rounded-2xl border border-[#FF6600]/20 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Still have questions?
            </h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Our team is here to help you find the perfect solution for your business growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="px-8 py-3 bg-[#FF6600] hover:bg-[#E55A00] text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-[#FF6600]/25"
                aria-label="Contact our team for assistance"
              >
                Contact Our Team
              </a>
              <a
                href="/schedule-demo"
                className="px-8 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl transition-all duration-300 hover:border-[#FF6600] hover:text-[#FF6600] hover:shadow-lg"
                aria-label="Schedule a free consultation"
              >
                Schedule Free Consultation
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
