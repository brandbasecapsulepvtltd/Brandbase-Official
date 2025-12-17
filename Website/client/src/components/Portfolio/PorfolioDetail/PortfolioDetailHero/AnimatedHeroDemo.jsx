"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion"; 
import { AnimatedMarqueeHero } from "./hero-3";

const AnimatedHeroDemo = ({ heroData }) => {
  const triggerRef = useRef(null);
  const isInView = useInView(triggerRef, { once: true, amount: 0.5 });

  const videoVariants = {
    initial: { width: '90%' },
    animate: { width: isInView ? '100%' : '90%' },
  };

  return (
    <>
      {/* Hero Component */}
      <AnimatedMarqueeHero
        tagline={heroData.tagline}
        title={
          <>
            {heroData.title.split('with')[0]}
          </>
        }
        description={heroData.description}
        ctaText={heroData.ctaText}
        images={heroData.images}
      />

      {/* Video Scroll Animation */}
      <div
        ref={triggerRef}
        className="relative w-full h-[300px] sm:h-[700px] flex justify-center"
      >
        <motion.video
          initial="initial"
          animate="animate"
          variants={videoVariants}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="h-full object-cover rounded-xl shadow-2xl"
          src={heroData.videoUrl}
          autoPlay
          loop
          muted
          playsInline
        />
      </div>
    </>
  );
};  

export default AnimatedHeroDemo;