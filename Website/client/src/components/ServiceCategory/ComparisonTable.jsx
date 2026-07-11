import React from 'react';
import { motion } from 'framer-motion';

const ComparisonTable = ({ data }) => {
  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="bg-slate-50 dark:bg-zinc-950 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-orange-600 mb-3">
            The Competitive Edge
          </h2>
          <h1 className="text-4xl md:text-6xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Why Choose <span className="text-orange-600">Brandbase Capsule</span>
          </h1>
          <p className="mt-4 text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto text-lg">
            See how our tailored approach to {data.category} stacks up against the industry standard.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch"
        >
          {/* Main Brand Card - The "Powerful" One */}
          <motion.div
            variants={itemVariants}
            className="relative z-10 order-1 md:order-2 group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-amber-400 rounded-[2rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative h-full bg-white dark:bg-zinc-900 rounded-[2rem] p-8 md:p-10 shadow-2xl border border-orange-100 dark:border-orange-900/30 transform md:scale-105">
              <div className="flex items-center justify-between mb-10">
                <img
                  src={data.brand.logoUrl}
                  alt="BrandBase"
                  className="h-8 w-auto object-contain"
                />
                <span className="bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Recommended
                </span>
              </div>

              <ul className="space-y-6">
                {data.brand.features.map((feature, index) => (
                  <li key={index} className="flex items-start group/item">
                    <div className="mr-4 mt-1">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/40">
                        <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <span className="text-zinc-800 dark:text-zinc-200 font-semibold text-base leading-snug">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Competitor Cards */}
          {data.others.map((column, colIndex) => (
            <motion.div
              key={colIndex}
              variants={itemVariants}
              className={`order-2 ${colIndex === 0 ? 'md:order-1' : 'md:order-3'}`}
            >
              <div className="h-full bg-zinc-100/50 dark:bg-zinc-900/40 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 rounded-[2rem] p-8 transition-all duration-300 hover:bg-white dark:hover:bg-zinc-900 shadow-sm">
                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-10 pb-4 border-b border-zinc-200 dark:border-zinc-800">
                  {column.title}
                </h3>

                <ul className="space-y-6">
                  {column.points.map((point, pointIndex) => (
                    <li key={pointIndex} className="flex items-start opacity-80">
                      <div className="mr-4 mt-1">
                        <div className="w-5 h-5 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center">
                          <svg className="w-3 h-3 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </div>
                      </div>
                      <span className="text-zinc-600 dark:text-zinc-400 text-sm font-medium leading-relaxed">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ComparisonTable;