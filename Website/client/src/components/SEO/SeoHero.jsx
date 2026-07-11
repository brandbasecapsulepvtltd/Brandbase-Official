import React from 'react';
import { motion } from 'framer-motion';

const SeoHero = ({ title, subtitle, backgroundImage, ctaText = "Get a Quote", onCtaClick }) => {
    return (
        <div className="relative h-[90vh] min-h-[700px] w-full flex items-center justify-center overflow-hidden">
            {/* Background with Overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${backgroundImage})` }}
            >
                <div className="absolute inset-0 bg-black/40 z-10" />
            </div>

            {/* Content */}
            <div className="relative z-20 container mx-auto px-4 text-center text-white">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 heading-font"
                >
                    {title}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-lg md:text-3xl text-gray-200 mb-8 max-w-3xl mx-auto font-light"
                >
                    {subtitle}
                </motion.p>

                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onCtaClick}
                    className="px-8 py-4 bg-orange-500 text-white font-bold rounded-full text-lg hover:bg-orange-600 transition-colors shadow-lg border-2 border-transparent hover:border-orange-400"
                >
                    {ctaText}
                </motion.button>
            </div>
        </div>
    );
};

export default SeoHero;
