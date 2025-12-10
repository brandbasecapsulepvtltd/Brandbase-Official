"use client";

import React, { useState } from 'react';
import { Layers, Server, Cpu, CornerDownRight, Star, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ICON MAPPER
const iconMap = {
  layers: <Layers size={18} />,
  server: <Server size={18} />,
  cpu: <Cpu size={18} />
};

const ServicePackages = ({ data }) => {
  const [activeTab, setActiveTab] = useState("signature");
  const [direction, setDirection] = useState(0);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  if (!data) return null;

  const packages = data.packages;
  const packageKeys = Object.keys(packages);
  const activePackage = packages[activeTab];

  const handleTabChange = (newTabId) => {
    const currentIndex = packageKeys.indexOf(activeTab);
    const newIndex = packageKeys.indexOf(newTabId);
    setDirection(newIndex > currentIndex ? 1 : -1);
    setActiveTab(newTabId);
    setShowMobileMenu(false);
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: { x: 0, opacity: 1, zIndex: 1 },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      zIndex: 0
    })
  };

  return (
    <section className="w-full bg-white py-10 md:py-20 px-4 sm:px-6 md:px-12 font-sans">
      <div className="max-w-7xl mx-auto overflow-hidden">
        {/* HEADER */}
        <div className="text-center mb-10 md:mb-16 space-y-3 md:space-y-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl text-gray-800 leading-snug md:leading-tight">
            <span className="block font-bold">{data.header.titleLine1}</span>
            <span className="block font-normal">
              {" "}
              <span className="italic font-medium text-orange-600">
                {data.header.highlighted}
              </span>
            </span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed px-4 sm:px-0">
            {data.header.subtitle}
          </p>
        </div>

        {/* MOBILE TABS DROPDOWN */}
        <div className="md:hidden mb-6 relative">
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="w-full flex items-center justify-between bg-gray-50/80 p-4 rounded-xl"
          >
            <div className="flex items-center gap-3">
              <span className={activeTab ? "text-gray-800" : "text-gray-400"}>
                {iconMap[activePackage.icon]}
              </span>
              <span className="font-medium text-gray-800">{activePackage.title}</span>
            </div>
            {showMobileMenu ? <X size={20} /> : <Menu size={20} />}
          </button>
          
          <AnimatePresence>
            {showMobileMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg z-50"
              >
                {Object.values(packages).map((pkg) => {
                  if (pkg.id === activeTab) return null;
                  return (
                    <button
                      key={pkg.id}
                      onClick={() => handleTabChange(pkg.id)}
                      className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors text-left border-b last:border-b-0"
                    >
                      <span className="text-gray-400">
                        {iconMap[pkg.icon]}
                      </span>
                      <span className="text-gray-700">{pkg.title}</span>
                    </button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* DESKTOP TABS */}
        <div className="hidden md:flex justify-center mb-12">
          <div className="bg-gray-50/80 p-1.5 rounded-full inline-flex w-full max-w-4xl">
            {Object.values(packages).map((pkg) => {
              const active = activeTab === pkg.id;
              return (
                <button
                  key={pkg.id}
                  onClick={() => handleTabChange(pkg.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-full text-base transition-all duration-300 ${
                    active
                      ? "bg-white shadow-sm text-gray-800 font-medium"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <span className={active ? "text-gray-800" : "text-gray-400"}>
                    {iconMap[pkg.icon]}
                  </span>
                  {pkg.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* SLIDING CONTENT */}
        <div className="relative h-auto md:h-[600px] overflow-hidden">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={activePackage.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="absolute md:relative top-0 left-0 w-full h-full"
            >
              <div className="flex flex-col lg:grid lg:grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start h-full">
                {/* IMAGE - Mobile: Full width, Desktop: Left column */}
                <div className="relative h-[300px] sm:h-[350px] md:h-[500px] w-full rounded-2xl md:rounded-[2.5rem] overflow-hidden bg-gray-100 shadow-sm order-1 lg:order-1">
                  <img
                    src={activePackage.image}
                    alt={activePackage.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* TEXT CONTENT - Mobile: Below image, Desktop: Right column */}
                <div className="pt-2 md:pt-4 space-y-6 md:space-y-8 order-2 lg:order-2">
                  <div className="inline-block px-3 py-1.5 md:px-4 md:py-2 bg-gray-50 rounded-lg md:rounded-xl">
                    <span className="font-semibold text-base md:text-lg text-orange-600">
                      {activePackage.price}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-normal text-gray-900">
                    {activePackage.title}
                  </h3>

                  <ul className="space-y-3 md:space-y-4">
                    {activePackage.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-gray-500 text-base md:text-lg"
                      >
                        <Star className="w-5 h-5 md:w-6 md:h-6 text-gray-400 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                        <span className="leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button className="mt-2 md:mt-4 flex items-center justify-center md:justify-start gap-2 text-white px-6 py-3 md:px-8 md:py-3.5 rounded-lg font-medium hover:opacity-90 bg-orange-600 w-full md:w-auto">
                    <CornerDownRight size={18} />
                    Get This Plan
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ServicePackages;