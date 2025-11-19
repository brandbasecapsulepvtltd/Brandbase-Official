"use client";

import Tag from "../Components/Tag";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

const faqs = [
  {
    question: "How is BrandBase different from other digital marketing agencies?",
    answer:
      "Unlike traditional agencies, BrandBase offers 360° marketing solutions with a focus on data-driven results. We combine creative strategy with advanced analytics to deliver measurable ROI.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    hasImage: true
  },
  {
    question: "What's your typical project timeline?",
    answer:
      "Most projects are delivered within 4-8 weeks, depending on scope. Website development takes 3-6 weeks, while comprehensive marketing campaigns typically run for 3+ months.",
    hasImage: false
  },
  {
    question: "Do you work with startups and small businesses?",
    answer:
      "Absolutely! We offer scalable solutions for businesses of all sizes. Our startup packages are designed to deliver maximum impact with budget-friendly pricing.",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    hasImage: true
  },
  {
    question: "What industries do you specialize in?",
    answer:
      "We have extensive experience across e-commerce, SaaS, healthcare, real estate, and manufacturing. Our adaptable strategies work for any industry looking to grow their digital presence.",
    hasImage: false
  },
  {
    question: "How do you measure campaign success?",
    answer:
      "We track KPIs like conversion rates, ROI, engagement metrics, and customer acquisition costs. You'll receive detailed monthly reports through our client dashboard.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    hasImage: true
  },
  {
    question: "Do you provide ongoing support?",
    answer:
      "Yes, we offer comprehensive support and maintenance packages. From website updates to continuous campaign optimization, we're here to ensure your long-term success.",
    hasImage: false
  }
];

export default function Faqs() {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleQuestionClick = (index) => {
    setSelectedIndex(selectedIndex === index ? null : index);
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <Tag>FAQ</Tag>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about our services and process. 
            Can't find what you're looking for?{" "}
            <a href="/contact" className="text-[#FF6600] font-semibold hover:underline">
              Contact us directly.
            </a>
          </p>
        </div>

        {/* FAQ Items - Centered */}
        <div className="space-y-4">
          {faqs.map((faq, faqIndex) => (
            <div
              key={faqIndex}
              className={twMerge(
                "bg-white rounded-2xl border border-gray-200 p-6 transition-all duration-300 cursor-pointer hover:border-[#FF6600]/50 hover:shadow-lg",
                selectedIndex === faqIndex && "border-[#FF6600] shadow-xl"
              )}
              onClick={() => handleQuestionClick(faqIndex)}
            >
              {/* Question Header */}
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-900 text-lg lg:text-xl pr-8">
                  {faq.question}
                </h3>
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
                >
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </div>
              
              {/* Answer with Image */}
              <AnimatePresence>
                {selectedIndex === faqIndex && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="overflow-hidden"
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
                            <div className="mt-4 p-4 bg-[#FF6600]/5 rounded-xl border border-[#FF6600]/20">
                              <h4 className="text-[#FF6600] font-semibold text-sm mb-1">
                                Quick Tip
                              </h4>
                              <p className="text-gray-700 text-sm">
                                {faqIndex === 0 && "Our data-driven approach ensures every marketing dollar is well spent."}
                                {faqIndex === 2 && "Start with our growth audit to identify your biggest opportunities."}
                                {faqIndex === 4 && "Transparent reporting means you always know where your investment is going."}
                              </p>
                            </div>
                          )}
                          
                          {/* CTA Links */}
                          <div className="mt-6 flex flex-wrap gap-3">
                            {faqIndex === 0 && (
                              <a
                                href="/case-studies"
                                className="px-4 py-2 bg-[#FF6600] text-white text-sm font-medium rounded-lg hover:bg-[#E55A00] transition-colors"
                              >
                                View Case Studies
                              </a>
                            )}
                            {faqIndex === 1 && (
                              <a
                                href="/process"
                                className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:border-[#FF6600] hover:text-[#FF6600] transition-colors"
                              >
                                Learn About Our Process
                              </a>
                            )}
                            {faqIndex === 2 && (
                              <a
                                href="/pricing"
                                className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:border-[#FF6600] hover:text-[#FF6600] transition-colors"
                              >
                                View Pricing
                              </a>
                            )}
                          </div>
                        </div>
                        
                        {/* Image - Only for specific FAQs */}
                        {faq.hasImage && selectedIndex === faqIndex && (
                          <div className="flex-1">
                            <div className="rounded-xl overflow-hidden border border-gray-200">
                              <img
                                src={faq.image}
                                alt={faq.question}
                                className="w-full h-48 lg:h-64 object-cover"
                              />
                            </div>
                            <p className="text-gray-500 text-sm mt-2 text-center">
                              {faqIndex === 0 && "Our team analyzing campaign performance data"}
                              {faqIndex === 2 && "Startup growth strategy session"}
                              {faqIndex === 4 && "Real-time analytics dashboard"}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-[#FF6600]/5 to-[#FF6600]/10 rounded-2xl border border-[#FF6600]/20 p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Still have questions?
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Our team is here to help you find the perfect solution for your business growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="px-8 py-3 bg-[#FF6600] hover:bg-[#E55A00] text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-[#FF6600]/25"
              >
                Contact Our Team
              </a>
              <a
                href="/schedule-demo"
                className="px-8 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl transition-all duration-300 hover:border-[#FF6600] hover:text-[#FF6600] hover:shadow-lg"
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