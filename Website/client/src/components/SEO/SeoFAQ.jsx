import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const FaqItem = ({ question, answer, isOpen, toggle }) => (
    <div className="border-b border-gray-200 dark:border-zinc-800">
        <button
            onClick={toggle}
            className="w-full flex items-center justify-between py-6 text-left focus:outline-none group"
        >
            <span className="text-lg font-medium text-gray-900 dark:text-white pr-8 group-hover:text-orange-500 transition-colors">{question}</span>
            <span className={`p-2 rounded-full transition-colors ${isOpen ? 'bg-orange-500 text-white' : 'bg-gray-100 dark:bg-zinc-800 text-gray-500 dark:text-gray-400'}`}>
                {isOpen ? <Minus size={20} /> : <Plus size={20} />}
            </span>
        </button>
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                >
                    <div className="pb-6 text-gray-600 dark:text-gray-400 leading-relaxed">
                        {answer}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
);

const SeoFAQ = ({ title, subtitle, faqs }) => {
    const [openIndex, setOpenIndex] = useState(0);

    return (
        <section className="py-24 bg-white dark:bg-zinc-950 transition-colors duration-300">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold mb-6 heading-font text-gray-900 dark:text-white"
                    >
                        {title}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-gray-600 dark:text-gray-400"
                    >
                        {subtitle}
                    </motion.p>
                </div>

                <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800 p-8 md:p-12 transition-colors duration-300">
                    {faqs.map((faq, index) => (
                        <FaqItem
                            key={index}
                            {...faq}
                            isOpen={openIndex === index}
                            toggle={() => setOpenIndex(openIndex === index ? null : index)}
                        />
                    ))}
                </div>

                {/* Schema.org FAQ Data */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'FAQPage',
                            mainEntity: faqs.map(faq => ({
                                '@type': 'Question',
                                name: faq.question,
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: faq.answer
                                }
                            }))
                        })
                    }}
                />
            </div>
        </section>
    );
};

export default SeoFAQ;
