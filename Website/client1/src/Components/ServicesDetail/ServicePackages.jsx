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
    <section className="w-full bg-white py-20 px-6 md:px-12 font-sans">
      <div className="max-w-7xl mx-auto overflow-hidden">
        {/* HEADER */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-6xl text-gray-800 leading-tight">
            <span className="block font-bold">{data.header.titleLine1}</span>
            <span className="block font-normal">
              {" "}
              <span className="italic font-medium text-orange-600">
                {data.header.highlighted}
              </span>
            </span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-lg leading-relaxed">
            {data.header.subtitle}
          </p>
        </div>

        {/* TABS */}
        <div className="flex justify-center mb-12">
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
        <div className="relative h-[600px] overflow-hidden">
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
              className="absolute top-0 left-0 w-full h-full"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start h-full">
                {/* IMAGE */}
                <div className="relative h-[500px] w-full rounded-[2.5rem] overflow-hidden bg-gray-100 shadow-sm">
                  <img
                    src={activePackage.image}
                    alt={activePackage.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* TEXT CONTENT */}
                <div className="pt-4 space-y-8">
                  <div className="inline-block px-4 py-2 bg-gray-50 rounded-xl">
                    <span className="font-semibold text-lg text-orange-600">
                      {activePackage.price}
                    </span>
                  </div>

                  <h3 className="text-4xl font-normal text-gray-900">
                    {activePackage.title}
                  </h3>

                  <ul className="space-y-4">
                    {activePackage.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-gray-500 text-lg"
                      >
                        <Star className="w-6 h-6 text-gray-400" strokeWidth={1.5} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button className="mt-4 flex items-center gap-2 text-white px-8 py-3.5 rounded-lg font-medium hover:opacity-90 bg-orange-600">
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