import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const TestimonialCard = ({ name, role, company, content, image }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-lg dark:shadow-none border border-gray-100 dark:border-zinc-800 flex flex-col h-full transition-colors duration-300"
    >
        <div className="text-orange-500 mb-6">
            <Quote size={40} className="fill-current opacity-20" />
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow italic leading-relaxed">"{content}"</p>
        <div className="flex items-center mt-auto pt-6 border-t border-gray-100 dark:border-zinc-800">
            <img src={image} alt={name} className="w-12 h-12 rounded-full object-cover mr-4" />
            <div>
                <h4 className="font-bold text-gray-900 dark:text-white">{name}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">{role}, {company}</p>
            </div>
        </div>
    </motion.div>
);

const SeoTestimonials = ({ title, subtitle, testimonials }) => {
    return (
        <section className="py-24 bg-gray-50 dark:bg-black transition-colors duration-300">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16 max-w-3xl mx-auto">
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((t, index) => (
                        <TestimonialCard key={index} {...t} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SeoTestimonials;
