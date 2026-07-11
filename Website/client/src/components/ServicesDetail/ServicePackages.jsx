"use client";

import React, { useState } from 'react';
import { Layers, Server, Cpu, CornerDownRight, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeImage from '@/components/General/SafeImage';

// ICON MAPPER
const iconMap = {
  layers: <Layers size={18} />,
  server: <Server size={18} />,
  cpu: <Cpu size={18} />
};

const ServicePackages = ({ data }) => {
  const packageKeys = data?.packages ? Object.keys(data.packages) : [];
  const [activeTab, setActiveTab] = useState(() => packageKeys[0] || 'signature');
  const [direction, setDirection] = useState(0);

  if (!data) return null;

  const packages = data.packages;
  const activePackage = packages[activeTab] || packages[packageKeys[0]];

  if (!activePackage) return null;

  const handleTabChange = (newTabId) => {
    const currentIndex = packageKeys.indexOf(activeTab);
    const newIndex = packageKeys.indexOf(newTabId);
    setDirection(newIndex > currentIndex ? 1 : -1);
    setActiveTab(newTabId);
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
    <section className="w-full bg-white dark:bg-black py-20 px-4 sm:px-6 md:px-12 font-sans">
      <div className="max-w-7xl mx-auto overflow-hidden">

        {/* HEADER */}
        <div className="text-center mb-12 md:mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl md:text-6xl text-gray-800 dark:text-gray-200 leading-tight">
            <span className="block font-bold">{data.header.titleLine1}</span>
            <span className="block font-normal">
              <span className="italic font-medium text-orange-600">
                {data.header.highlighted}
              </span>
            </span>
          </h2>

          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-base sm:text-lg leading-relaxed">
            {data.header.subtitle}
          </p>
        </div>

        {/* TABS */}
        <div className="flex justify-center mb-10 md:mb-12">
          <div className="bg-gray-50 dark:bg-zinc-800/50 p-1.5 rounded-full inline-flex w-full max-w-full sm:max-w-4xl overflow-x-auto whitespace-nowrap scrollbar-hide">
            {Object.values(packages).map((pkg) => {
              const active = activeTab === pkg.id;
              return (
                <button
                  key={pkg.id}
                  onClick={() => handleTabChange(pkg.id)}
                  className={`flex-1 min-w-max sm:min-w-0 flex items-center justify-center gap-2 px-4 py-3 rounded-full text-sm sm:text-base transition-all duration-300 ${active
                    ? "bg-white dark:bg-zinc-900 shadow-sm text-gray-800 dark:text-gray-200 font-medium"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:text-gray-300"
                    }`}
                >
                  <span className={active ? "text-gray-800 dark:text-gray-200" : "text-gray-400"}>
                    {iconMap[pkg.icon]}
                  </span>
                  {pkg.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* SLIDING CONTENT */}
        <div className="relative h-auto overflow-visible md:h-[600px] overflow-hidden">
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
              className="relative w-full h-auto md:absolute md:top-0 md:left-0 md:h-full"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 items-start h-full">

                {/* IMAGE */}
                <div className="relative h-[280px] sm:h-[350px] md:h-[450px] lg:h-[500px] w-full rounded-[2rem] overflow-hidden bg-gray-100 dark:bg-zinc-800 shadow-sm">
                  <SafeImage
                    src={activePackage.image}
                    alt={activePackage.title}
                    fallbackKey={activePackage.id || activeTab}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* TEXT CONTENT */}
                <div className="pt-2 sm:pt-4 space-y-6 sm:space-y-8">
                  <h3 className="text-3xl sm:text-4xl font-normal text-gray-900 dark:text-gray-100">
                    {activePackage.title}
                  </h3>

                  <ul className="space-y-3 sm:space-y-4">
                    {activePackage.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-gray-600 dark:text-gray-300 text-base sm:text-lg"
                      >
                        <Star className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" strokeWidth={1.5} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={activePackage.link || "#"}
                    className="mt-3 sm:mt-4 flex items-center gap-2 text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg font-medium hover:opacity-90 bg-orange-600 inline-flex"
                  >
                    <CornerDownRight size={18} />
                    Get This Plan
                  </a>
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
