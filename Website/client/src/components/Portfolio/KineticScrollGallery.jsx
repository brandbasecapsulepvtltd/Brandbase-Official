"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const KineticGridItem = ({ image, scrollVelocity, index, onClick }) => {
    const smoothedVelocity = useSpring(scrollVelocity, {
        mass: 0.1,
        stiffness: 80,
        damping: 40,
    });

    const skew = useTransform(smoothedVelocity, [-1500, 0, 1500], [-15, 0, 15]);

    return (
        <motion.div
            className="w-full h-80 relative overflow-hidden rounded-xl shadow-lg cursor-pointer"
            style={{ skewX: skew }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: index * 0.05
            }}
            whileHover={{ scale: 1.02, rotate: 0.5, zIndex: 10 }}
            onClick={onClick}
        >
            <motion.img
                src={image}
                alt={`Exhibition gallery image ${index + 1}`}
                className="absolute inset-0 h-full w-full object-cover transition-all duration-500"
                style={{
                    transform: "scale(1.15)"
                }}
                whileHover={{ scale: 1.25 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
        </motion.div>
    );
};

// Lightbox Component
const Lightbox = ({ images, currentIndex, onClose, onNext, onPrev }) => {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight') onNext();
            if (e.key === 'ArrowLeft') onPrev();
        };

        document.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [onClose, onNext, onPrev]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={onClose}
        >
            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Close lightbox"
            >
                <X className="w-6 h-6 text-white" />
            </button>

            {/* Previous Button */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onPrev();
                }}
                className="absolute left-4 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Previous image"
            >
                <ChevronLeft className="w-8 h-8 text-white" />
            </button>

            {/* Next Button */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onNext();
                }}
                className="absolute right-4 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Next image"
            >
                <ChevronRight className="w-8 h-8 text-white" />
            </button>

            {/* Image */}
            <motion.img
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                src={images[currentIndex]}
                alt={`Exhibition image ${currentIndex + 1}`}
                className="max-w-[90vw] max-h-[90vh] object-contain"
                onClick={(e) => e.stopPropagation()}
            />

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <p className="text-white text-sm font-medium">
                    {currentIndex + 1} / {images.length}
                </p>
            </div>
        </motion.div>
    );
};

export default function KineticScrollGallery({ images = [] }) {
    const [lightboxIndex, setLightboxIndex] = useState(null);
    const [mobileIndex, setMobileIndex] = useState(0);
    const { scrollYProgress } = useScroll();

    const scrollYVelocity = useTransform(
        scrollYProgress,
        [0, 1],
        [0, 1000],
        { clamp: false }
    );

    const handleNext = () => {
        setLightboxIndex((prev) => (prev + 1) % images.length);
    };

    const handlePrev = () => {
        setLightboxIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const handleMobileNext = () => {
        setMobileIndex((prev) => (prev + 1) % images.length);
    };

    const handleMobilePrev = () => {
        setMobileIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    // Don't render if no images
    if (!images || images.length === 0) {
        return null;
    }

    return (
        <>
            <div className="bg-white text-neutral-900 dark:bg-zinc-950 dark:text-white py-16 sm:py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl mb-4"
                        >
                            Our Exhibition Gallery
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-lg text-neutral-600 dark:text-gray-400 max-w-2xl mx-auto"
                        >
                            Explore our collection of immersive stall designs and experiences.
                        </motion.p>
                    </div>

                    {/* Mobile Carousel View */}
                    <div className="block sm:hidden mb-8">
                        <div className="relative">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={mobileIndex}
                                    initial={{ opacity: 0, x: 100 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -100 }}
                                    transition={{ duration: 0.3 }}
                                    className="relative h-96 rounded-xl overflow-hidden shadow-xl cursor-pointer"
                                    onClick={() => setLightboxIndex(mobileIndex)}
                                >
                                    <img
                                        src={images[mobileIndex]}
                                        alt={`Exhibition image ${mobileIndex + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </motion.div>
                            </AnimatePresence>

                            {/* Mobile Navigation Buttons */}
                            <button
                                onClick={handleMobilePrev}
                                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white shadow-lg transition-colors"
                                aria-label="Previous image"
                            >
                                <ChevronLeft className="w-6 h-6 text-neutral-900" />
                            </button>
                            <button
                                onClick={handleMobileNext}
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white shadow-lg transition-colors"
                                aria-label="Next image"
                            >
                                <ChevronRight className="w-6 h-6 text-neutral-900" />
                            </button>

                            {/* Mobile Counter */}
                            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 backdrop-blur-sm px-4 py-2 rounded-full">
                                <p className="text-white text-sm font-medium">
                                    {mobileIndex + 1} / {images.length}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Desktop Grid View */}
                    <div className="hidden sm:grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {images.map((img, index) => (
                            <KineticGridItem
                                key={index}
                                index={index}
                                image={img}
                                scrollVelocity={scrollYVelocity}
                                onClick={() => setLightboxIndex(index)}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {lightboxIndex !== null && (
                    <Lightbox
                        images={images}
                        currentIndex={lightboxIndex}
                        onClose={() => setLightboxIndex(null)}
                        onNext={handleNext}
                        onPrev={handlePrev}
                    />
                )}
            </AnimatePresence>
        </>
    );
};
