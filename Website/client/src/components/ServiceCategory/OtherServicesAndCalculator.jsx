'use client'; // This is already correctly set at the top

import React, { useState } from 'react';
import { FiExternalLink, FiArrowRight } from 'react-icons/fi';
import { MdCalculate, MdWeb, MdOutlineStackedBarChart } from 'react-icons/md';
import { FaMobileAlt, FaShoppingCart, FaBullhorn, FaVideo, FaCalendarAlt } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

// ❌ OLD: import { useNavigate } from 'react-router-dom';
import { useRouter } from 'next/navigation'; // ✅ NEW: Import useRouter from Next.js

const services = [
  {
    title: 'Website Design',
    description: 'Craft stunning and responsive designs that captivate your audience.',
    link: '/services/website-design', // Corrected path to match your folder structure
    icon: MdWeb,
  },
  {
    title: 'Web and Mobile App Development',
    description: 'Build high-performing mobile apps for Android and iOS platforms.',
    link: '/services/mobile-app-development', // Corrected path to match your folder structure
    icon: FaMobileAlt,
  },
  {
    title: 'E-commerce Deployment',
    description: 'Launch and scale your online store with our expert deployment services.',
    link: '/service/e-commerce-deployment',
    icon: FaShoppingCart,
  },
  {
    title: 'Digital Marketing',
    description: 'Boost your brand visibility with SEO, social media, and PPC strategies.',
    link: '/service/digital-marketing',
    icon: FaBullhorn,
  },
  {
    title: 'Film Production',
    description: 'High-quality promotional videos and storytelling for your brand.',
    link: '/service/film-making',
    icon: FaVideo,
  },
  {
    title: 'Event and Exhibition Management',
    description: 'Comprehensive planning, coordination, and execution services for conferences, trade shows, and corporate events with seamless logistics.',
    link: '/service/event-exhibition-management',
    icon: FaCalendarAlt,
  }
];

const OtherServicesAndCalculator = () => {
  const [showServices, setShowServices] = useState(false);
  
  // ❌ OLD: const navigate = useNavigate();
  const router = useRouter(); // ✅ NEW: Initialize Next.js Router

  return (
    <div className="max-w-6xl mx-auto space-y-8 px-4 md:px-0 py-10">
      {/* Services Dropdown */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-gray-800">
            <FiExternalLink className="h-10 w-10 text-orange-600" />
            <div>
              <h3 className="text-2xl font-bold mb-1">
                Explore our complete range of digital solutions and services
              </h3>
            </div>
          </div>
          <button
            onClick={() => setShowServices(!showServices)}
            className="flex items-center bg-orange-600 text-white px-5 py-2 rounded hover:bg-orange-700 transition transform hover:scale-105"
          >
            {showServices ? 'Hide Services' : 'View All Services'}
            <FiArrowRight className="ml-2 h-4 w-4" />
          </button>
        </div>

        <AnimatePresence>
          {showServices && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.03 }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="cursor-pointer group border border-gray-100 hover:border-orange-600 bg-gray-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-all"
                  // ❌ OLD: onClick={() => navigate(service.link)}
                  onClick={() => router.push(service.link)} // ✅ NEW: Use router.push()
                >
                  <div className="flex items-center gap-4 mb-3 text-orange-600">
                    <service.icon className="text-3xl group-hover:text-orange-700 transition" />
                    <h4 className="text-lg font-semibold text-gray-800 group-hover:text-orange-600 transition">
                      {service.title}
                    </h4>
                  </div>
                  <p className="text-sm text-gray-700">{service.description}</p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default OtherServicesAndCalculator;
