"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { AnimatedMarqueeHero } from "./hero-3";

const AnimatedHeroDemo = ({ heroData, categoryLabel }) => {
  const triggerRef = useRef(null);
  const isInView = useInView(triggerRef, { once: true, amount: 0.5 });

  if (!heroData) return null;

  const videoVariants = {
    initial: { width: "90%" },
    animate: { width: isInView ? "100%" : "90%" },
  };

  return (
    <>
      <AnimatedMarqueeHero
        tagline={heroData.tagline || categoryLabel}
        title={heroData.title}
        description={heroData.description}
        ctaText={heroData.ctaText || "Book a Consultation"}
        images={heroData.images || []}
        className="-mt-8 h-[85vh] min-h-[560px]"
      />

      {heroData.videoUrl && (
        <div
          ref={triggerRef}
          className="relative w-full h-[280px] sm:h-[560px] md:h-[640px] flex justify-center px-4 md:px-8 -mt-4"
        >
          <motion.video
            initial="initial"
            animate="animate"
            variants={videoVariants}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="h-full w-full max-w-6xl object-cover rounded-2xl shadow-2xl"
            src={heroData.videoUrl}
            autoPlay
            loop
            muted
            playsInline
          />
        </div>
      )}
    </>
  );
};

export default AnimatedHeroDemo;
