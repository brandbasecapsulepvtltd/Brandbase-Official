"use client";

import React, { useState } from 'react';
import { Layers, Server, Cpu, CornerDownRight, Star } from 'lucide-react';
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

  if (!data) return null;

  const packages = data.packages;
  const packageKeys = Object.keys(packages);
  const activePackage = packages[activeTab];

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
    <section className="w-full bg-white py-12 md:py-20 px-4 sm:px-6 md:px-12 font-sans"> {/* Adjusted section padding */}
      <div className="max-w-7xl mx-auto overflow-hidden">
        {/* HEADER */}
        <div className="text-center mb-10 md:mb-16 space-y-2 md:space-y-4"> {/* Adjusted header spacing */}
          <h2 className="text-3xl sm:text-4xl md:text-6xl text-gray-800 leading-tight"> {/* Adjusted font size for smaller screens */}
            <span className="block font-bold">{data.header.titleLine1}</span>
            <span className="block font-normal">
              {" "}
              <span className="italic font-medium text-orange-600">
                {data.header.highlighted}
              </span>
            </span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base sm:text-lg leading-relaxed"> {/* Adjusted font size for smaller screens */}
            {data.header.subtitle}
          </p>
        </div>

        {/* TABS */}
        <div className="flex justify-center mb-8 md:mb-12"> {/* Adjusted margin */}
          <div className="bg-gray-50/80 p-1.5 rounded-full inline-flex w-full max-w-lg md:max-w-4xl"> {/* Adjusted max-width for mobile */}
            {Object.values(packages).map((pkg) => {
              const active = activeTab === pkg.id;
              return (
                <button
                  key={pkg.id}
                  onClick={() => handleTabChange(pkg.id)}
                  className={`flex-1 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 py-2 sm:py-4 rounded-full text-sm sm:text-base transition-all duration-300 text-center ${ // Adjusted padding and text size
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

        {/* SLIDING CONTENT: KEY CHANGE HERE */}
        <div className="relative min-h-[850px] lg:h-[600px] overflow-hidden"> {/* Changed fixed h-[600px] to min-h for mobile stack and fixed h-[600px] for lg */}
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
              className="absolute top-0 left-0 w-full" // Removed h-full to let content determine height on mobile
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start"> {/* Adjusted gap */}
                {/* IMAGE */}
                <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] w-full rounded-[1.5rem] lg:rounded-[2.5rem] overflow-hidden bg-gray-100 shadow-sm"> {/* Adjusted height and border-radius for mobile */}
                  <img
                    src={activePackage.image}
                    alt={activePackage.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* TEXT CONTENT */}
                <div className="pt-0 lg:pt-4 space-y-6 sm:space-y-8"> {/* Adjusted top padding and spacing */}
                  <div className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-50 rounded-xl"> {/* Adjusted padding */}
                    <span className="font-semibold text-base sm:text-lg text-orange-600"> {/* Adjusted font size */}
                      {activePackage.price}
                    </span>
                  </div>

                  <h3 className="text-3xl sm:text-4xl font-normal text-gray-900"> {/* Adjusted font size */}
                    {activePackage.title}
                  </h3>

                  <ul className="space-y-3 sm:space-y-4"> {/* Adjusted spacing */}
                    {activePackage.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-gray-500 text-base sm:text-lg" // Adjusted font size
                      >
                        <Star className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 mt-0.5 sm:mt-0" strokeWidth={1.5} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button className="mt-4 flex items-center gap-2 text-white px-6 py-3 sm:px-8 sm:py-3.5 rounded-lg font-medium text-base hover:opacity-90 bg-orange-600"> {/* Adjusted padding and font size */}
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