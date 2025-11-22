'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const Hero = () => {
  const triggerRef = useRef(null);
  const [windowHeight, setWindowHeight] = useState(1000);

  // Dummy data
  const heroData = {
    mainVideoUrl: "https://player.vimeo.com/external/2512877.sd.mp4?s=48b6c8d1c0c3b0e7b8b5c5c5c5c5c5c5c5c5c5c5&profile_id=164&oauth2_token_id=57447761",
    aboutTitle: "PURE CINEMA\nREDEFINING VISUAL STORYTELLING"
  };

  // Set window height
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowHeight(window.innerHeight);
    }
  }, []);

  const { scrollY } = useScroll();
  const width = useTransform(scrollY, [0, 300], [1000, 150]);
  const y = useTransform(scrollY, [0, 300], [0, -windowHeight / 2 + 75]);
  const smoothWidth = useSpring(width, { stiffness: 100, damping: 20 });
  const smoothY = useSpring(y, { stiffness: 100, damping: 20 });

  return (
    <motion.div className="relative overflow-hidden">
      {/* Background Video */}
      <div className="fixed inset-0 -z-10">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          src="https://player.vimeo.com/external/2512877.sd.mp4?s=48b6c8d1c0c3b0e7b8b5c5c5c5c5c5c5c5c5c5c5&profile_id=164&oauth2_token_id=57447761"
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      {/* === Animated Logo for Desktop/Laptop Only === */}
      <motion.div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 40,
          width: smoothWidth,
          y: smoothY,
        }}
        className="hidden sm:flex mx-auto h-screen items-center justify-center"
      >
        <img
          src="https://ik.imagekit.io/vinayak06/brandbaselogo.png"
          alt="Brandbase Logo"
          className="w-full h-auto max-w-md"
        />
      </motion.div>

      {/* === Static Centered Logo for Mobile Only === */}
      <div className="flex sm:hidden flex-col items-center justify-center h-screen text-center px-4 relative z-10">
        <img
          src="https://ik.imagekit.io/vinayak06/brandbaselogo-removebg-preview%20(1).png"
          alt="Brandbase Logo"
          className="w-3/4 max-w-xs h-auto mb-6"
        />
        <p className="text-xl md:text-2xl font-semibold text-white px-4 mt-10">
          Showing your world better
        </p>
      </div>

      {/* === Subtitle for Desktop === */}
      <div className="hidden sm:flex w-full justify-center -mt-55 mb-20 px-4 relative z-10">
        <p className="text-3xl md:text-5xl text-center text-white font-semibold mt-10">
          Showing your world better
        </p>
      </div>

      {/* === Main Content === */}
      <div className="pt-10 md:pt-20 px-4 md:px-6 pb-10 relative z-10">
        {/* Dynamic + Reel Section */}
        <div className="flex items-center justify-center mt-10 md:mt-20">
          <div className="text-center space-y-4 md:space-y-6">
            <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4">
              <h1 className="text-4xl md:text-6xl lg:text-8xl xl:text-9xl font-anton text-white">
                DYNAMIC
              </h1>
              <div className="mt-2 md:mt-7 relative w-20 h-12 md:w-28 md:h-18 border border-white">
                <video
                  src={heroData.mainVideoUrl}
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
                <p className="absolute bottom-0 left-0 text-[10px] md:text-[12px] px-1 text-yellow-500 bg-black bg-opacity-70">
                  BCPL-REEL
                </p>
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-8xl xl:text-9xl font-anton text-white">PRODUCTION</h1>
            <h1 className="text-4xl md:text-6xl lg:text-8xl xl:text-9xl font-anton text-yellow-500">POWERHOUSE</h1>
          </div>
        </div>

        {/* Scroll-aware Expanding Video */}
        <div
          ref={triggerRef}
          className="mt-20 md:mt-40 relative w-full h-[200px] sm:h-[400px] md:h-[600px] lg:h-[700px] flex justify-center"
        >
          <motion.video
            initial={{ width: '90%' }}
            whileInView={{ width: '100%' }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="h-full object-cover rounded-lg md:rounded-xl shadow-xl md:shadow-2xl"
            src={heroData.mainVideoUrl}
            autoPlay
            loop
            muted
            playsInline
          />
        </div>

        {/* Pure Cinema Section */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: false, amount: 0.3 }}
          className="min-h-[50vh] md:min-h-[100vh] flex flex-col justify-center items-start px-4 md:px-8 lg:px-20 py-10 md:py-0"
        >
          <h1 className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-anton leading-tight text-white max-w-6xl whitespace-pre-line">
            {heroData.aboutTitle}
          </h1>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Hero;