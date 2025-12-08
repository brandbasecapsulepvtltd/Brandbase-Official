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
    <section className="py-10 md:py-15 w-full">
      <div className="w-full px-0">
        {/* HEADER */}
        <div className="text-center mb-10 md:mb-16 px-4 mt-10">
          <motion.h2
            className="text-3xl sm:text-4xl md:text-6xl font-bold text-black mb-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            {data.heading}
          </motion.h2>

          <motion.p
            className="text-lg sm:text-xl md:text-2xl text-gray-900 max-w-3xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            custom={2}
          >
            {data.subheading}
          </motion.p>
        </div>

        {/* DESKTOP TABLE VIEW */}
        <div className="px-4 md:px-10 bg-gray-50 max-w-full mx-auto">
          <div className="hidden md:block shadow-lg rounded-xl overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-4 bg-orange-100 text-black text-lg font-semibold">
              {data.columns.map((col, i) => (
                <div
                  key={i}
                  className={`p-4 ${i === 0 ? "text-left border-r border-orange-700" : "text-center border-r border-orange-700"}`}
                >
                  {col}
                </div>
              ))}
            </div>

            {/* Table Rows */}
            {data.rows.map((row, index) => (
              <div
                key={index}
                className={`grid grid-cols-4 text-base border-t border-gray-200 transition duration-200 ${
                  hoveredRow === index ? "bg-orange-100/50" : "bg-white"
                }`}
                onMouseEnter={() => setHoveredRow(index)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                <div className="p-4 border border-gray-100 font-medium text-orange-600 text-left">
                  {row.feature}
                </div>

                {row.values.map((value, i) => (
                  <div
                    key={i}
                    className="p-4 border-r border-gray-100 flex items-center justify-center text-gray-800 gap-2 text-center"
                  >
                    <span>{value}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* MOBILE CARD VIEW */}
          <div className="md:hidden pt-4 space-y-4">
            {data.rows.map((row, index) => (
              <motion.div
                key={index}
                className="bg-white p-4 rounded-xl shadow-md border border-gray-200"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                custom={index * 0.5 + 1}
              >
                <h4 className="text-xl font-bold text-orange-600 mb-3 border-b pb-2">
                  {row.feature}
                </h4>

                {row.values.map((value, i) => (
                  <div
                    key={i}
                    className={`p-3 ${i % 2 === 0 ? "bg-gray-50" : ""} rounded-lg mb-2`}
                  >
                    <p className="text-base text-gray-800 flex items-center gap-2">
                      {value}
                    </p>
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;