'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const ExpoFAQ = ({ faqs }) => {
    const [activeIndex, setActiveIndex] = useState(null);

    if (!faqs || faqs.length === 0) return null;

    return (
        <section className="py-12 px-4 md:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8">Frequently Asked Questions</h2>
            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className="rounded-2xl border border-gray-100 dark:border-zinc-800 overflow-hidden"
                    >
                        <button
                            type="button"
                            onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                            className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6600] focus-visible:ring-inset"
                            aria-expanded={activeIndex === index}
                        >
                            <span className="text-lg font-bold text-gray-900 dark:text-white pr-4">{faq.question}</span>
                            {activeIndex === index ? (
                                <Minus size={20} className="text-[#FF6600] shrink-0" aria-hidden="true" />
                            ) : (
                                <Plus size={20} className="text-[#FF6600] shrink-0" aria-hidden="true" />
                            )}
                        </button>
                        <AnimatePresence>
                            {activeIndex === index && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="p-6 pt-0 text-gray-600 dark:text-gray-400 leading-relaxed text-lg border-t border-gray-50 dark:border-zinc-800">
                                        {faq.answer}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ExpoFAQ;
