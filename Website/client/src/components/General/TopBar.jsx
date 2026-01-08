'use client';

import React, { useState, useEffect } from 'react';
import { Mail, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const offers = [
    "🚀 Get 20% OFF on your first Digital Marketing package!",
    "🎨 Free Logo Design with any Website Development package!",
    "📱 15% OFF on Mobile App Maintenance for the first year!",
    "✨ Special discount on Stall Design for upcoming Exhibitions!"
];

const TopBar = () => {
    const [currentOffer, setCurrentOffer] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentOffer((prev) => (prev + 1) % offers.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="w-full bg-[#FF6600] text-white text-xs sm:text-sm font-medium h-10 sm:h-12 flex items-center relative overflow-hidden z-50">
            <div className="max-w-8xl mx-auto w-full px-4 sm:px-8 md:px-12 lg:px-16 flex justify-between items-center h-full relative z-20">

                {/* Left: Email */}
                <div className="flex items-center gap-2 min-w-fit">
                    <Mail size={16} className="text-white shrink-0" />
                    <a href="mailto:info@brandbasecapsule.com" className="hover:underline hidden md:block">
                        info@brandbasecapsule.com
                    </a>
                </div>

                {/* Middle: Offers Carousel */}
                <div className="flex-1 flex justify-center items-center px-4 min-w-0 h-full relative z-30">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentOffer}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="text-center flex items-center gap-2"
                        >
                            <span className="bg-white text-[#FF6600] px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-bold shrink-0">
                                NEWS
                            </span>
                            <span className="font-bold text-white tracking-wide truncate max-w-[200px] sm:max-w-none">
                                {offers[currentOffer]}
                            </span>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Right: Locations */}
                <div className="hidden lg:flex items-center gap-2 min-w-fit">
                    <MapPin size={16} className="text-white shrink-0" />
                    <span className="text-right text-md">
                        Serving: USA, UK, Europe, Saudi, India, SG
                    </span>
                </div>
            </div>

            {/* Decorative background element - Lowered Z-index */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-500 opacity-50 z-0 pointer-events-none"></div>
        </div>
    );
};

export default TopBar;