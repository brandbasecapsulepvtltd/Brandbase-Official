"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut"
    }
  })
};

const ComparisonSection = ({ data }) => {
  const [hoveredRow, setHoveredRow] = useState(null);

  if (!data) return null;

  return (
    <section className="py-10 md:py-15 w-full bg-white dark:bg-black">
      <div className="w-full px-0">
        {/* HEADER */}
        <div className="text-center mb-10 md:mb-16 px-4 mt-10">
          <motion.h2
            className="text-3xl sm:text-4xl md:text-6xl font-bold text-black dark:text-white mb-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            {data.heading}
          </motion.h2>

          <motion.p
            className="text-lg sm:text-xl md:text-2xl text-gray-900 dark:text-gray-100 max-w-3xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            custom={2}
          >
            {data.subheading}
          </motion.p>
        </div>

        {/* RESPONSIVE TABLE - Works on both mobile and desktop */}
        <div className="px-4 sm:px-6 lg:px-8 max-w-full mx-auto overflow-x-auto">
          <div className="inline-block min-w-full align-middle bg-gray-50 dark:bg-zinc-900 rounded-xl shadow-lg">
            {/* Table Container with horizontal scroll on very small screens */}
            <div className="overflow-x-auto rounded-xl">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-zinc-800">
                {/* Table Header */}
                <thead>
                  <tr className="bg-orange-100 dark:bg-orange-900/30 text-black dark:text-white">
                    {data.columns.map((col, i) => (
                      <th
                        key={i}
                        scope="col"
                        className={`px-4 py-3.5 text-left text-sm font-semibold ${i === 0 ? "sticky left-0 z-10 bg-orange-100 dark:bg-orange-950/50" : ""}`}
                      >
                        <div className={`${i === 0 ? "" : "flex justify-center"}`}>
                          {col}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody className="divide-y divide-gray-200 dark:divide-zinc-800 bg-white dark:bg-black">
                  {data.rows.map((row, index) => (
                    <tr
                      key={index}
                      className={`transition-colors duration-200 ${hoveredRow === index ? "bg-orange-50 dark:bg-orange-950/20" : ""
                        }`}
                      onMouseEnter={() => setHoveredRow(index)}
                      onMouseLeave={() => setHoveredRow(null)}
                    >
                      {/* Feature Column */}
                      <td className="whitespace-nowrap px-4 py-4 text-sm sticky left-0 z-10 bg-white dark:bg-zinc-900">
                        <div className="font-medium text-orange-600">
                          {row.feature}
                        </div>
                      </td>

                      {/* Value Columns */}
                      {row.values.map((value, i) => (
                        <td key={i} className="whitespace-nowrap px-4 py-4 text-sm">
                          <div className="text-gray-800 dark:text-gray-200 flex justify-center">
                            {value}
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ALTERNATIVE MOBILE-FRIENDLY DESIGN (Optional) */}
        {/* Uncomment below if you want a more mobile-optimized view */}
        {/*
        <div className="md:hidden mt-6">
          <div className="text-center mb-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">Tap columns to highlight</p>
          </div>
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <div className="inline-flex min-w-full">
              <div className="flex flex-col">
                <div className="sticky left-0 z-10 bg-orange-100 p-3 min-w-[150px] border-b border-gray-200">
                  <div className="text-sm font-semibold text-black dark:text-white">Features</div>
                </div>
                {data.rows.map((row, index) => (
                  <div key={index} className="sticky left-0 z-10 bg-white dark:bg-zinc-900 dark:bg-black p-3 min-w-[150px] border-b border-gray-200">
                    <div className="text-sm font-medium text-orange-600">{row.feature}</div>
                  </div>
                ))}
              </div>
              
              {data.columns.slice(1).map((col, colIndex) => (
                <div key={colIndex} className="flex flex-col">
                  <div className="bg-orange-100 p-3 min-w-[120px] border-l border-b border-gray-200">
                    <div className="text-sm font-semibold text-black dark:text-white text-center">{col}</div>
                  </div>
                  {data.rows.map((row, rowIndex) => (
                    <div key={rowIndex} className="bg-white dark:bg-zinc-900 dark:bg-black p-3 min-w-[120px] border-l border-b border-gray-200">
                      <div className="text-sm text-gray-800 dark:text-gray-200 dark:text-gray-200 text-center">{row.values[colIndex]}</div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
        */}
      </div>

      {/* Responsive styles */}
      <style jsx>{`
        @media (max-width: 640px) {
          /* Ensure table cells have minimum width */
          th, td {
            min-width: 120px;
          }
          /* First column stays fixed */
          th:first-child,
          td:first-child {
            min-width: 150px;
            position: sticky;
            left: 0;
            z-index: 10;
            box-shadow: 2px 0 5px rgba(0,0,0,0.1);
          }
        }
        
        /* Smooth scrolling for mobile */
        .overflow-x-auto {
          -webkit-overflow-scrolling: touch;
        }
      `}</style>
    </section>
  );
};

export default ComparisonSection;
