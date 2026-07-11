import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const SeoCTA = ({ title, subtitle, buttonText = "Get Started", onButtonClick }) => {
    return (
        <section className="py-24 bg-neutral-950 text-white overflow-hidden relative">
            {/* Abstract Background Design */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-orange-500/10 transform skew-x-12 translate-x-32" />
            <div className="absolute bottom-0 left-0 w-1/3 h-full bg-orange-500/5 transform -skew-x-12 -translate-x-20" />

            <div className="container mx-auto px-4 relative z-10 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-6xl font-bold mb-8 heading-font leading-tight"
                >
                    {title}
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto"
                >
                    {subtitle}
                </motion.p>

                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onButtonClick}
                    className="px-10 py-5 bg-orange-500 text-white font-bold rounded-full text-lg shadow-2xl hover:bg-orange-600 transition-colors inline-flex items-center gap-2 group"
                >
                    {buttonText}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
            </div>
        </section>
    );
};

export default SeoCTA;
