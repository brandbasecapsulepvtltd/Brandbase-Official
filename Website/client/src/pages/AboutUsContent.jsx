'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Timeline from '@/components/About/Timeline';
import Tag from '@/components/Tag';
import DemoOne from '@/components/About/AboutSec/demo';
import DoAndDont from '@/components/About/Do&Dont';
// Import the API client
import { api } from '@/lib/api';

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.8,
      ease: 'easeOut'
    }
  })
};

const AboutUsContent = () => {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch About page data once
  useEffect(() => {
    fetchAboutPageData();
  }, []);

  const fetchAboutPageData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Use the API client to fetch About section data
      const response = await api.getAboutSection();

      // Check the response structure
      if (response.success && response.data) {
        setPageData(response.data);
      } else if (response.data) {
        // If the response is the data directly
        setPageData(response.data);
      } else {
        throw new Error('Invalid data format received from server');
      }
    } catch (err) {
      console.error('Error fetching about page data:', err);

      // Handle different types of errors
      if (err.name === 'TypeError' && err.message.includes('fetch')) {
        setError('Unable to connect to server. Please make sure the backend is running.');
      } else if (err.message?.includes('401') || err.message?.includes('403')) {
        setError('Authentication failed. Please check your API key configuration.');
      } else if (err.message?.includes('404')) {
        setError('About page data not found. Please seed the database first.');
      } else if (err.message?.includes('500')) {
        setError('Server error. Please try again later.');
      } else {
        setError(err.message || 'An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  // Render loading state
  if (loading) {
    return (
      <main
        className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-950"
        aria-label="Loading page content"
      >
        <div className="text-center">
          <div
            className="animate-spin rounded-full h-16 w-16 border-4 border-[#FF6600] border-t-transparent mx-auto mb-4"
            aria-label="Loading indicator"
            role="status"
          ></div>
          <h1 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">Loading About Us</h1>
          <p className="text-gray-500 dark:text-gray-400">Fetching the latest content...</p>
        </div>
      </main>
    );
  }

  // Render error state
  if (error) {
    return (
      <main
        className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-950"
        aria-label="Error page"
      >
        <article className="max-w-md mx-auto text-center p-8 bg-white dark:bg-zinc-900 rounded-lg shadow-lg">
          <div
            className="text-6xl mb-6"
            aria-hidden="true"
          >🚧</div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Content Unavailable</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
          <div className="space-y-3">
            <button
              onClick={fetchAboutPageData}
              className="w-full bg-[#FF6600] text-white py-3 px-6 rounded-lg hover:bg-[#E55A00] transition-colors font-medium"
              aria-label="Retry loading page content"
            >
              Retry Loading
            </button>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <h2 className="font-medium mb-2">Troubleshooting:</h2>
              <ul className="list-disc list-inside mt-2 text-left" role="list">
                <li role="listitem">Backend server is running on port 5000</li>
                <li role="listitem">API key is properly set in .env.local</li>
                <li role="listitem">Database is properly seeded</li>
              </ul>
            </div>
          </div>
        </article>
      </main>
    );
  }

  // Check if we have the minimum required data
  if (!pageData) {
    return (
      <main
        className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-950"
        aria-label="No data available"
      >
        <div className="text-center">
          <div
            className="text-6xl mb-4"
            aria-hidden="true"
          >❓</div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">No Data Available</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Please check your .env.local file contains:<br />
            NEXT_PUBLIC_API_KEY=your_api_key_here
          </p>
        </div>
      </main>
    );
  }

  // Destructure data for easier access
  const { hero, mission, vision, impact, timeline, principles, aboutSection } = pageData;

  return (
    <div className="bg-white dark:bg-zinc-950">
      {/* Hero Section  <HumanoidSection/>*/}
      <section className="relative overflow-hidden pt-24 pb-20 bg-white dark:bg-zinc-950">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#FF6600]/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-gray-200/20 rounded-full"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
          <div className="text-center">
            {/* Main Title with sophisticated animation */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="mb-12"
            >
              <div className="relative inline-block">
                <motion.h1
                  className="text-5xl md:text-7xl font-bold mb-6 text-gray-900 dark:text-white tracking-tight"
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.8,
                        ease: [0.6, 0.05, 0.01, 0.9]
                      }
                    }
                  }}
                >
                  Redefining{' '}
                  <span className="relative">
                    <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[#FF6600] to-orange-500">
                      Brand Excellence
                    </span>
                    <motion.div
                      className="absolute -bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-[#FF6600]/20 to-orange-500/20 -skew-y-1"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.8 }}
                    />
                  </span>
                </motion.h1>
              </div>

              {/* Subheading with elegant underline */}
              <motion.h2
                className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-10 max-w-4xl mx-auto leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Where strategic vision meets{' '}
                <span className="relative">
                  <span className="text-[#FF6600] font-bold">transformative execution</span>
                  <svg
                    className="absolute -bottom-2 left-0 w-full h-3"
                    viewBox="0 0 200 12"
                  >
                    <motion.path
                      d="M0,6 C40,2 80,10 120,4 C160,-2 200,8 200,4"
                      stroke="#FF6600"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{
                        duration: 1.5,
                        delay: 1,
                        ease: "easeInOut"
                      }}
                    />
                  </svg>
                </span>
              </motion.h2>
            </motion.div>

            {/* Professional Description with grid layout */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="max-w-5xl mx-auto"
            >
              <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                <div className="space-y-4">
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    At Brandbase Capsule, we architect brand narratives that resonate across markets.
                    Our methodology blends deep market intelligence with creative precision to deliver
                    measurable impact.
                  </p>
                  <div className="flex items-center gap-3 pt-4">
                    <div className="w-1 h-8 bg-gradient-to-b from-[#FF6600] to-orange-400 rounded-full"></div>
                    <p className="text-gray-600 dark:text-gray-400 italic">
                      "Excellence is not an act, but a habit of strategic innovation"
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    Through integrated solutions spanning digital transformation, experiential marketing,
                    and brand strategy, we empower organizations to achieve sustainable growth in an
                    evolving commercial landscape.
                  </p>
                </div>
              </div>

              {/* Stats Bar - Professional Metrics */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="mt-16 pt-8"
              >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                  {[
                    { value: "95%", label: "Client Retention", sublabel: "Long-term partnerships" },
                    { value: "350+", label: "Projects Delivered", sublabel: "Global reach" },
                    { value: "₹15Cr+", label: "Revenue Generated", sublabel: "For clients" },
                    { value: "24/7", label: "Strategic Support", sublabel: "Dedicated teams" },
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                      className="text-center group"
                    >
                      <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-[#FF6600] transition-colors duration-300">
                        {stat.value}
                      </div>
                      <div className="text-sm font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">
                        {stat.label}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {stat.sublabel}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* DemoOne Component */}
      <DemoOne content={aboutSection} />


      {/* Mission Section */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-6 md:space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-3 h-8 bg-[#FF6600] rounded-full"></div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">{mission?.title || 'Our Mission'}</span>
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                  {mission?.subheading || 'Delivering Exceptional Value Through Strategic Solutions'}
                </h2>
                <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                  {mission?.description || 'We are committed to providing innovative marketing, event management, and digital solutions that drive measurable results and foster sustainable growth for our clients.'}
                </p>
                {mission?.highlight && (
                  <div className="flex items-center gap-3 pt-2">
                    <div className="w-1 h-8 bg-gradient-to-b from-[#FF6600] to-orange-400 rounded-full"></div>
                    <p className="text-gray-600 dark:text-gray-400 italic font-medium">
                      {mission.highlight}
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-4 md:space-y-6">
                {mission?.points?.map((point, index) => (
                  <div key={index} className="p-4 md:p-6 bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-[#FF6600]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-[#FF6600] font-bold">{String(index + 1).padStart(2, '0')}</span>
                      </div>
                      <div>
                        <p className="text-gray-700 dark:text-gray-300">{point}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative mt-8 lg:mt-0">
              <div className="overflow-hidden rounded-2xl lg:rounded-3xl shadow-xl">
                <img
                  src={mission?.image?.url || 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}
                  alt={mission?.image?.alt || 'Team collaboration in modern office'}
                  className="w-full h-[300px] md:h-[400px] lg:h-[500px] object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 md:p-8">
                  <h3 className="text-white text-xl md:text-2xl font-bold mb-2">{mission?.image?.captionTitle || 'Innovation in Action'}</h3>
                  <p className="text-white/90 text-sm md:text-base">{mission?.image?.captionText || 'Our team delivers cutting-edge solutions that transform business objectives into tangible results.'}</p>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="hidden lg:block absolute -bottom-4 -right-4 w-24 h-24 bg-[#FF6600]/10 rounded-full -z-10"></div>
              <div className="hidden lg:block absolute -top-4 -left-4 w-16 h-16 bg-gray-200 rounded-full -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-12 md:py-20 bg-white dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="relative order-2 lg:order-1 mt-8 lg:mt-0">
              <div className="overflow-hidden rounded-2xl lg:rounded-3xl shadow-xl">
                <img
                  src={vision?.image?.url || 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}
                  alt={vision?.image?.alt || 'Strategic planning and vision'}
                  className="w-full h-[300px] md:h-[400px] lg:h-[500px] object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 md:p-8">
                  <h3 className="text-white text-xl md:text-2xl font-bold mb-2">{vision?.image?.captionTitle || 'Future-Forward Thinking'}</h3>
                  <p className="text-white/90 text-sm md:text-base">{vision?.image?.captionText || "Shaping tomorrow's marketing landscape through innovation and strategic foresight."}</p>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="hidden lg:block absolute -bottom-4 -left-4 w-24 h-24 bg-[#FF6600]/10 rounded-full -z-10"></div>
              <div className="hidden lg:block absolute -top-4 -right-4 w-16 h-16 bg-gray-200 rounded-full -z-10"></div>
            </div>

            <div className="space-y-6 md:space-y-8 order-1 lg:order-2">
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-3 h-8 bg-[#FF6600] rounded-full"></div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">{vision?.title || 'Our Vision'}</span>
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                  {vision?.subheading || 'Leading the Future of Marketing Excellence'}
                </h2>
                <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                  {vision?.description || 'To become the premier global partner for brands seeking transformative marketing, event, and digital solutions that drive sustainable growth.'}
                </p>
              </div>

              <div className="space-y-4 md:space-y-6">
                {vision?.points?.map((point, index) => {
                  // Icon options for vision points
                  const icons = [
                    <path key="globe" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />,
                    <path key="lightning" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />,
                    <path key="users" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />,
                    <path key="star" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  ];

                  return (
                    <div key={index} className="flex items-start gap-4 p-4 md:p-6 bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800">
                      <div className="w-12 h-12 bg-gray-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-[#FF6600]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          {icons[index % icons.length]}
                        </svg>
                      </div>
                      <div>
                        <p className="text-lg text-gray-700 dark:text-gray-300">{point}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Timeline content={timeline} />

      {/* Impact Section */}
      <section className="py-20">
        <motion.div
          className="max-w-7xl mx-auto px-4"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Header Section */}
          <div className="text-center mb-16">
            <motion.div
              className="inline-block mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Tag>Our Impact</Tag>
            </motion.div>

            <motion.h2
              className="text-6xl font-bold text-[#FF6600] mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
            >
              {impact.title}
            </motion.h2>

            <motion.p
              className="text-xl text-gray-700 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
            >
              {impact.description}
            </motion.p>
          </div>

          {/* Main Content */}
          <div className="bg-orange-100 dark:bg-zinc-900/50 rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden">

            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 25% 25%, #FF6600 2px, transparent 2px),
                                 radial-gradient(circle at 75% 75%, #FF6600 2px, transparent 2px)`,
                backgroundSize: '50px 50px',
                backgroundPosition: '0 0, 25px 25px'
              }} />
            </div>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10">
              {/* Left Content */}
              <motion.div
                className="space-y-8"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div>
                  <h3 className="text-3xl font-bold text-black dark:text-white mb-6">
                    {impact.subheading}
                  </h3>
                  <p className="text-gray-900 dark:text-gray-200 text-lg leading-relaxed">
                    {impact.body}
                  </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {impact.stats.map((stat, i) => (
                    <motion.div
                      key={i}
                      className="bg-white/5 backdrop-blur-sm border border-orange-500 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      viewport={{ once: true }}
                    >
                      <div className="text-black dark:text-white font-semibold text-lg">
                        {stat}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Right Content - Image */}
              <motion.div
                className="text-center"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex flex-col items-center space-y-6">
                  {/* Image Container */}
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-3xl overflow-hidden shadow-2xl">
                      <img
                        src="https://ik.imagekit.io/vinayak06/businesst.jpg"
                        alt="Brandbase Business Impact and Success"
                        className="w-full h-80 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent" />
                    </div>
                  </motion.div>

                  {/* CTA Button */}
                  <motion.a
                    href={impact?.impactButtonLink || "#"}
                    className="bg-[#FF6600] hover:bg-[#E55A00] text-white font-semibold py-4 px-10 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#FF6600]/25 inline-block"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {impact?.impactButtonText || "Start Your Project"}
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      <DoAndDont content={principles} />
      {/* CTA Section */}
      <section className="py-20 px-4">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <div className="mb-4 text-3xl font-bold uppercase tracking-wide text-[#FF6600]">
            {aboutSection?.cta?.title || "Your Growth. Our Mission."}
          </div>
          <h2 className="text-6xl font-bold mb-6 text-gray-900 dark:text-white">
            {aboutSection?.cta?.subtitle || "Let’s Create Something That Stands Out."}
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            {aboutSection?.cta?.text || "Whether it's a new build or an upgrade, we help brands scale with modern, efficient digital solutions.Your next big step starts with one conversation."}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.a
              href={aboutSection?.cta?.buttonLink || "#"}
              className="relative overflow-hidden group px-8 py-4 rounded-lg font-semibold text-xl transition-colors duration-300 text-[#FF6600] bg-white dark:bg-zinc-900 border border-[#FF6600] shadow-lg hover:text-white inline-block cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">{aboutSection?.cta?.buttonText || "Schedule a Call"}</span>
              <span className="absolute inset-0 bg-[#FF6600] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out z-0"></span>
            </motion.a>
            <motion.a
              href="#"
              className="px-8 py-4 rounded-lg font-semibold text-xl transition-colors duration-300 text-white bg-[#FF6600] border border-[#FF6600] shadow-lg hover:bg-[#E55A00] inline-block cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Our Work
            </motion.a>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default AboutUsContent;
