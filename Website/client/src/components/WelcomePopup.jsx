import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Presentation, Video, TrendingUp, Globe, Palette, ChevronRight, Sparkles } from 'lucide-react';

const WelcomePopup = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Check session storage for per-tab visibility
        const hasSeenInTab = sessionStorage.getItem('brandbase_welcome_popup_seen');
        if (!hasSeenInTab) {
            const timer = setTimeout(() => {
                setIsOpen(true);
            }, 800);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        sessionStorage.setItem('brandbase_welcome_popup_seen', 'true');
    };

    const handleServiceClick = () => {
        setIsOpen(false);
        sessionStorage.setItem('brandbase_welcome_popup_seen', 'true');
    };

    const services = [
        { title: "Event Management", href: "/services/event-management", icon: Calendar },
        { title: "Exhibition Management", href: "/services/exhibition-management", icon: Presentation },
        { title: "Video Production", href: "/services/av-production", icon: Video },
        { title: "Digital Marketing", href: "/services/digital-marketing", icon: TrendingUp },
        { title: "Web Development", href: "/services/website-development", icon: Globe },
        { title: "Branding", href: "/services/branding-design", icon: Palette }
    ];

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[99999] flex items-center justify-center px-4">
                        {/* Backdrop with extreme blur for premium feel */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={handleClose}
                            className="absolute inset-0 bg-black/80 backdrop-blur-xl cursor-pointer"
                        />

                        {/* Modal Container */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 30 }}
                            transition={{ type: "spring", stiffness: 200, damping: 25 }}
                            className="relative w-full max-w-2xl h-[550px] max-h-[92vh] bg-zinc-950/90 rounded-[2.5rem] shadow-[0_0_50px_-12px_rgba(251,146,60,0.3)] border border-white/10 overflow-y-auto md:overflow-hidden scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10 hover:scrollbar-thumb-orange-500/20"
                        >
                            {/* Animated Inner Glow */}
                            <motion.div
                                animate={{ opacity: [0.1, 0.2, 0.1] }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent"
                            />

                            {/* Luxury Background Accents */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 blur-[100px] pointer-events-none" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 blur-[100px] pointer-events-none" />

                            {/* Close Button */}
                            <button
                                onClick={handleClose}
                                className="absolute top-6 right-6 z-50 p-2.5 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-all group scale-90 hover:scale-100"
                            >
                                <X className="w-5 h-5 text-gray-400 group-hover:text-white" />
                            </button>

                            <div className="relative z-10 p-8 md:p-14">
                                {/* Header Section */}
                                <div className="text-center mb-12">
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold tracking-widest uppercase mb-4"
                                    >
                                        <Sparkles className="w-3 h-3" />
                                        Exquisite Experiences
                                    </motion.div>

                                    <h2 className="text-2xl md:text-4xl font-medium text-white mb-2">
                                        <span className="font-cursive text-3xl md:text-4xl text-orange-400 block mb-1">Welcome to</span>
                                        <span className="tracking-tight font-light">Brandbase Capsule</span>
                                    </h2>

                                    <p className="text-gray-400 font-light text-sm tracking-wide italic">
                                        "Crafting Your Vision Into Reality"
                                    </p>

                                    <div className="mt-8 h-px w-24 bg-gradient-to-r from-transparent via-orange-500/50 to-transparent mx-auto" />
                                </div>

                                {/* Services Luxury Grid */}
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                                    {services.map((service, index) => {
                                        const Icon = service.icon;
                                        return (
                                            <motion.a
                                                key={index}
                                                href={service.href}
                                                onClick={handleServiceClick}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.3 + (index * 0.05) }}
                                                className="group relative flex flex-col items-center justify-center p-3 rounded-3xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-orange-500/40 transition-all duration-500"
                                            >
                                                {/* Card Background Glow */}
                                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-radial-gradient from-orange-500/10 to-transparent pointer-events-none rounded-3xl" />

                                                <div className="mb-4 relative">
                                                    <div className="absolute inset-0 bg-orange-500/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                                                    <Icon className="w-8 h-8 text-gray-400 group-hover:text-orange-400 transition-all duration-300 transform group-hover:scale-110 relative z-10" />
                                                </div>

                                                <h3 className="text-xs md:text-xs font-medium tracking-wider text-gray-300 group-hover:text-white text-center uppercase transition-colors">
                                                    {service.title}
                                                </h3>

                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    whileHover={{ width: '40%' }}
                                                    className="h-px bg-orange-500/50 mt-2"
                                                />
                                            </motion.a>
                                        );
                                    })}

                                    {/* Minimal Footer CTA or Link inside modal */}
                                    <motion.a
                                        href="/contact"
                                        onClick={handleClose}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.8 }}
                                        className="col-span-2 lg:col-span-1 flex items-center justify-center p-6 rounded-3xl border border-dashed border-white/10 hover:border-white/30 transition-all text-gray-500 hover:text-white group"
                                    >
                                        <div className="text-center">
                                            <p className="text-[10px] font-bold tracking-widest uppercase mb-1">Not seeing it?</p>
                                            <p className="text-md font-cursive text-orange-400 group-hover:underline">Contact Us</p>
                                        </div>
                                    </motion.a>
                                </div>
                            </div>

                            {/* Subtle Brand Watermark */}
                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-[0.03] select-none pointer-events-none">
                                <span className="text-8xl font-bold italic tracking-tighter text-white">BCPL</span>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

export default WelcomePopup;
