"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function BrandElevation({ data }) {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section
      aria-labelledby="brand-elevation-heading"
      className="py-24 bg-white dark:bg-black overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-16">
          <h1
            id="brand-elevation-heading"
            className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Beyond Websites – A Full{" "}
            <span className="text-[#FF6600]">360°</span>
            Approach to Brand Elevation
          </h1>
          <p className="text-xl text-gray-800 dark:text-gray-200 max-w-4xl mx-auto leading-relaxed">
            Your website is just one piece of the puzzle. We take a holistic approach to brand
            elevation & convenience-focused growth. Our suite of creative services from Design
            to branding and marketing, Video & more, ensure your brand connects with your
            audience across every touchpoint.
          </p>
        </header>

        {/* Continuous Carousel */}
        <div className="relative">
          <div
            className="flex overflow-hidden gap-6"
            role="region"
            aria-label="Our Services Carousel"
          >
            {/* First Set */}
            <motion.div
              className="flex gap-6 flex-none"
              animate={{
                x: isPaused ? "0%" : ["0%", "-100%"],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 40,
                  ease: "linear",
                },
              }}
              aria-hidden="false"
            >
              {(data?.services || []).map((service, index) => (
                <ServiceCard
                  key={`first-${index}`}
                  service={service}
                  onHover={() => setIsPaused(true)}
                  onLeave={() => setIsPaused(false)}
                />
              ))}
            </motion.div>

            {/* Second Set for seamless loop */}
            <motion.div
              className="flex gap-6 flex-none"
              animate={{
                x: isPaused ? "0%" : ["0%", "-100%"],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 40,
                  ease: "linear",
                },
              }}
              aria-hidden="true"
            >
              {(data?.services || []).map((service, index) => (
                <ServiceCard
                  key={`second-${index}`}
                  service={service}
                  onHover={() => setIsPaused(true)}
                  onLeave={() => setIsPaused(false)}
                />
              ))}
            </motion.div>
          </div>

          {/* Gradient Overlays */}
          <div
            className="absolute left-0 top-0 w-10 h-full bg-gradient-to-r from-white dark:from-black to-transparent z-10"
            aria-hidden="true"
          ></div>
          <div
            className="absolute right-0 top-0 w-10 h-full bg-gradient-to-l from-white dark:from-black to-transparent z-10"
            aria-hidden="true"
          ></div>
        </div>
      </div>
    </section>
  );
}

// Service Card Component
function ServiceCard({ service, onHover, onLeave }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleHoverStart = () => {
    setIsHovered(true);
    onHover();
  };

  const handleHoverEnd = () => {
    setIsHovered(false);
    onLeave();
  };

  return (
    <article
      className="flex-shrink-0 w-80 bg-white dark:bg-zinc-800/50 rounded-3xl border border-gray-200 dark:border-zinc-700 overflow-hidden hover:shadow-2xl transition-all duration-300 group cursor-pointer relative h-100"
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
      onFocus={handleHoverStart}
      onBlur={handleHoverEnd}
      role="article"
      aria-label={`${service.category} services`}
      tabIndex={0}
    >
      {/* Card Image */}
      <figure className="h-full bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden m-0">
        {/* Actual image from Unsplash */}
        <motion.img
          src={service.image}
          alt={`${service.category} - Professional creative services including ${service.items.slice(0, 2).join(', ')} and more`}
          title={`${service.category} Services`}
          className="w-full h-full object-cover"
          animate={{
            scale: isHovered ? 1.1 : 1
          }}
          transition={{
            duration: 0.3
          }}
          loading="lazy"
          width={320}
          height={400}
        />

        {/* Service Name Overlay */}
        <figcaption className="absolute inset-0 bg-black/40 flex justify-center">
          <h2 className="text-2xl mt-5 font-bold text-white text-center px-4">
            {service.category}
          </h2>
        </figcaption>
      </figure>

      {/* Services List - Animated from bottom on hover */}
      <motion.div
        className="p-6 absolute inset-0 dark:!bg-black/70"
        initial={false}
        animate={{
          y: isHovered ? 0 : "100%",
          opacity: isHovered ? 1 : 0
        }}
        transition={{
          duration: 0.4,
          ease: "easeOut"
        }}
        style={{
          backdropFilter: 'blur(5px)',
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          paddingBottom: '1.5rem'
        }}
        role="complementary"
        aria-label={`${service.category} service details`}
      >
        <div className="flex-1 flex flex-col justify-center">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">
            Our Services
          </h3>

          <ul className="space-y-3 mb-4">
            {service.items.map((item, itemIndex) => (
              <li
                key={itemIndex}
                className="flex items-center gap-3 text-gray-700 dark:text-gray-300 text-sm"
              >
                <div
                  className="w-1.5 h-1.5 bg-[#FF6600] rounded-full flex-shrink-0"
                  aria-hidden="true"
                ></div>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Button */}
        <motion.button
          className="w-full py-3 bg-[#FF6600] hover:bg-[#E55A00] text-white font-semibold rounded-xl transition-colors duration-300"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          aria-label={`Learn more about our ${service.category} services`}
          onClick={() => {
            if (service.link) {
              window.location.href = service.link;
            }
          }}
        >
          Learn More
        </motion.button>
      </motion.div>
    </article>
  );
}
