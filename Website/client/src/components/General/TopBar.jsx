'use client';

import React, { useState, useEffect } from 'react';
import { Mail, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const defaultOffers = [
    "🚀 Get 20% OFF on your first Digital Marketing package!",
    "✨ Special discount on Stall Design for upcoming Exhibitions!"
];

{/*
    "🎨 Free Logo Design with any Website Development package!",
    "📱 15% OFF on Mobile App Maintenance for the first year!",    
*/}

const defaultLocations = [
    { name: "India", code: "in" },
    { name: "USA", code: "us" },
    { name: "UK", code: "gb" },
    { name: "Saudi Arabia", code: "sa" },
    { name: "Singapore", code: "sg" },
    { name: "Europe", code: "eu" },
];

/** India first, remaining regions A–Z */
function sortLocations(locations) {
    const indiaFirst = locations.filter((loc) =>
        loc.name?.toLowerCase() === 'india' || loc.code === 'in'
    );
    const rest = locations
        .filter((loc) => loc.name?.toLowerCase() !== 'india' && loc.code !== 'in')
        .sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }));
    return [...indiaFirst, ...rest];
}

const TopBar = ({ data }) => {
    const [currentOffer, setCurrentOffer] = useState(0);
    const offers = data?.offers && data.offers.length > 0 ? data.offers : defaultOffers;
    const email = data?.email || "info@brandbasecapsule.com";
    const locationsList = sortLocations(defaultLocations);

    useEffect(() => {
        if (offers.length <= 1) return;
        const timer = setInterval(() => {
            setCurrentOffer((prev) => (prev + 1) % offers.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [offers.length]);

    return (
        <div className="w-full bg-[#FF6600] text-white text-xs sm:text-sm font-medium h-10 sm:h-12 flex items-center relative overflow-hidden z-50 shadow-lg">
            <div className="max-w-8xl mx-auto w-full px-4 sm:px-8 md:px-12 lg:px-16 flex justify-between items-center h-full relative z-20">

                {/* Left: Email */}
                <div className="flex items-center gap-2 min-w-fit opacity-90 hover:opacity-100 transition-opacity text-[18px]">
                    <Mail size={16} className="text-white shrink-0" />
                    <a href={`mailto:${email}`} className="hover:underline hidden md:block font-medium tracking-wide text-sm">
                        {email}
                    </a>
                </div>

                {/* Right: Locations - PREMIUM REVAMP */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="hidden lg:flex items-center gap-4 px-5 py-1.5 rounded-full relative overflow-hidden group cursor-pointer"
                    style={{
                        background: "rgba(255, 255, 255, 0.12)",
                        backdropFilter: "blur(8px)",
                        boxShadow: "0 0 15px rgba(255, 255, 255, 0.1), inset 0 0 10px rgba(255, 255, 255, 0.05)",
                        border: "1px solid rgba(255, 255, 255, 0.3)"
                    }}
                    whileHover={{
                        scale: 1.01,
                        background: "rgba(255, 255, 255, 0.2)",
                        borderColor: "rgba(255, 255, 255, 0.5)"
                    }}
                >
                    {/* Sweeping Shine Effect */}
                    <motion.div
                        className="absolute top-0 bottom-0 w-12 bg-gradient-to-r from-transparent via-white/30 to-transparent z-0"
                        animate={{ x: [-150, 450] }}
                        transition={{
                            repeat: Infinity,
                            duration: 4,
                            ease: "easeInOut",
                            repeatDelay: 3
                        }}
                        style={{ skewX: -25 }}
                    />

                    {/*
                                        <div className="flex items-center gap-1.5 mr-1 relative z-10">
                        <MapPin size={14} className="text-white/90" />
                        <span className="text-[11px] font-bold uppercase tracking-tighter opacity-80">Global Presence:</span>
                    </div>*/}

                    <div className="flex items-center gap-5 relative z-10">
                        {locationsList.map((loc, idx) => (
                            <div key={idx} className="flex items-center gap-3 relative">
                                <div className="flex items-center gap-2 group/item">
                                    <div className="w-8 h-6 relative overflow-hidden rounded-[2px] shadow-sm ring-1 ring-white/20 group-hover/item:scale-110 transition-transform duration-300">
                                        <img
                                            src={`https://flagcdn.com/w40/${loc.code}.png`}
                                            alt={loc.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <span className="text-white/90 font-semibold tracking-wide text-[15px] uppercase group-hover/item:text-white transition-colors">
                                        {loc.name}
                                    </span>
                                </div>

                                {/* Attractive Separator Line */}
                                {idx !== locationsList.length - 1 && (
                                    <div className="h-5 w-[2px] bg-white mx-1" />
                                )}
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Decorative background element - Lowered Z-index */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-[#FF6600] to-orange-500 opacity-80 z-0 pointer-events-none"></div>

            {/* Subtle Texture Overlay */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 z-0 pointer-events-none mix-blend-overlay"></div>
        </div>
    );
};

export default TopBar;