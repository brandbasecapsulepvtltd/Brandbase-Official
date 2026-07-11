import React from 'react';
import { motion } from 'framer-motion';

const SeoContentBlock = ({ title, content, image, imageAlt, reverse = false }) => {
    return (
        <section className="py-24 bg-white dark:bg-zinc-950 overflow-hidden transition-colors duration-300">
            <div className="container mx-auto px-4">
                <div className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-16`}>

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: reverse ? 50 : -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="w-full lg:w-1/2"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold mb-8 text-gray-900 dark:text-white heading-font leading-tight">
                            {title}
                        </h2>
                        <div className="prose prose-lg text-gray-600 dark:text-gray-300 space-y-6">
                            {content.map((paragraph, index) => (
                                <p key={index} className="leading-relaxed">
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    </motion.div>

                    {/* Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="w-full lg:w-1/2"
                    >
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-video lg:aspect-square group">
                            <div className="absolute inset-0 bg-black/10 dark:bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                            <img
                                src={image}
                                alt={imageAlt}
                                className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-1000"
                            />
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default SeoContentBlock;
