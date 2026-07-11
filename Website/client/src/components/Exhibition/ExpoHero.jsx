'use client';

import React from 'react';
import { motion } from 'framer-motion';

const ExpoHero = ({ title, description }) => {
    return (
        <section className="pt-24 pb-12 px-4 md:px-8 max-w-4xl">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                    {title || "Exhibition Stall Design & Fabrication"}
                </h1>
                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                    {description || "Elevate your exhibition presence with our premium, end-to-end stall design and fabrication services. We create immersive brand experiences that capture attention and drive results."}
                </p>
            </motion.div>
        </section>
    );
};

export default ExpoHero;
