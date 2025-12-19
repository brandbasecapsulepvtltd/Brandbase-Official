"use client";
import React from 'react';

const VideoProductionHero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center mt-6">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source 
          src="https://ik.imagekit.io/vinayak06/Mavnox/BrandBase/homepage-banner.mp4" 
          type="video/mp4" 
        />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay to match image depth */}
      <div className="absolute inset-0 bg-white/10"></div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 mt-15">
        <div className="max-w-4xl">
          
          {/* Badge Tag */}
          <div className="inline-block bg-[#0A1D37] px-4 py-1 mb-8 mt-5">
            <span className="text-white text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase">
              We are Brandbase Capsule video Production Agency
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6 tracking-tight">
            India's Leading <span className="text-[#FF8A00]">Ad Film Production</span> <br className="hidden md:block" />
            <span className="text-[#FF8A00]">Agency</span> for Bold Brands
          </h1>

          {/* Subheading */}
          <p className="bg-orange-200/50 text-black/90 text-base md:text-lg lg:text-xl max-w-2xl mb-10 leading-relaxed font-semibold py-3 px-4 rounded-lg">
            We’re an ad production agency helping businesses and brands turn their vision 
            into reality through dynamic video content.
          </p>

          {/* Gradient CTA Button */}
          <button className="bg-gradient-to-r from-[#D84315] to-[#FF8A00] hover:brightness-110 transition-all duration-300 text-white font-bold py-4 px-10 rounded-2xl md:rounded-full text-sm md:text-base tracking-wider shadow-lg">
            ENQUIRE NOW
          </button>
        </div>
      </div>
    </section>
  );
};

export default VideoProductionHero;