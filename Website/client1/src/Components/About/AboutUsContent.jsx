'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Timeline from './Timeline';
import HumanoidSection from './HumanoidSection';
import Tag from '../Tag';

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

// Dummy data matching the structure
const dummyData = {
  hero: {
    title: "Brandbase Capsule",
    heading: "Pioneering Digital Excellence",
    highlighted: "Since 2018",
    description: "We are a passionate team of innovators, designers, and developers committed to transforming businesses through cutting-edge digital solutions. Our journey began with a simple vision: to bridge the gap between technology and business success."
  },
  mission: {
    title: "Our Mission",
    subheading: "Driving Digital Transformation",
    description: "We empower businesses to thrive in the digital age by delivering exceptional web and mobile solutions that drive growth, enhance user experiences, and create lasting impact.",
    highlight: "Building what's next, today.",
    points: [
      "Deliver exceptional digital experiences that exceed client expectations",
      "Foster innovation through continuous learning and adaptation",
      "Build long-term partnerships based on trust and mutual success",
      "Push the boundaries of what's possible in web and mobile technology"
    ],
    image: {
      url: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      alt: "Our team collaborating in modern office space",
      captionTitle: "Innovation in Action",
      captionText: "Our team working together to create exceptional digital solutions"
    }
  },
  vision: {
    title: "Our Vision",
    subheading: "Shaping the Future of Digital",
    description: "To be the leading digital partner for businesses worldwide, recognized for our innovation, technical excellence, and unwavering commitment to client success.",
    points: [
      "Lead the industry in digital innovation and best practices",
      "Expand our global footprint while maintaining quality standards",
      "Create solutions that positively impact businesses and communities",
      "Build a legacy of excellence that inspires future generations"
    ],
    image: {
      url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      alt: "Visionary team planning future projects",
      captionTitle: "Future Forward",
      captionText: "Planning the next generation of digital innovations"
    }
  },
  impact: {
    title: "Our Impact",
    description: "We measure our success by the success of our clients and the positive change we create in the digital landscape.",
    subheading: "Transforming Businesses Worldwide",
    body: "Through our innovative solutions and dedicated approach, we've helped hundreds of businesses achieve their digital goals and unlock new growth opportunities.",
    stats: [
      "200+ Projects Completed",
      "98% Client Satisfaction",
      "50+ Team Members",
      "15 Countries Served"
    ],
    tagline: "Building What's Next."
  }
};

const AboutUsContent = () => {
  const { hero, mission, vision, impact } = dummyData;

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 py-10 lg:mt-15">
          <motion.div
            className="text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <Tag>Our Story</Tag>
            <motion.h1
              className="text-6xl font-bold mb-6 text-[#FF6600] mt-5"
              whileHover={{ scale: 1.05 }}
            >
              {hero.title}
            </motion.h1>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              {hero.heading}{' '}
              <span className="text-[#FF6600] relative inline-block font-extrabold">
                {hero.highlighted}
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#FF6600]" viewBox="0 0 100 10">
                  <motion.path
                    d="M0,8 Q25,2 50,6 Q75,10 100,4"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 0.5 }}
                  />
                </svg>
              </span>
            </h2>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto">{hero.description}</p>
          </motion.div>
        </div>
      </section>

      <HumanoidSection/>

      {/* Mission Section */}
      <section className="py-20 mt-10">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <div>
              <h2 className="text-6xl font-bold text-[#FF6600] mb-4">{mission.title}</h2>
              <p className="text-3xl font-bold text-gray-900 mb-4">{mission.subheading}</p>
              <p className="text-xl text-gray-700 mb-6">{mission.description}</p>
              <h3 className="text-xl text-[#FF6600] font-bold mb-6">{mission.highlight}</h3>
            </div>
            <div className="space-y-4">
              {mission.points.map((point, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-orange-50 transition-colors"
                  custom={i + 2}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <div className="w-6 h-6 bg-[#FF6600] rounded-full flex items-center justify-center mt-1">
                    <ArrowRight className="w-3 h-3 text-white" />
                  </div>
                  <p className="text-gray-700 text-lg">{point}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="relative"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <div className="overflow-hidden rounded-3xl shadow-2xl relative">
              <img
                src={mission.image.url}
                alt={mission.image.alt}
                width={800}
                height={384}
                className="w-full h-96 object-cover"
                priority
                fetchPriority="high"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 w-full text-white bg-black/50 py-4 text-center">
                <h3 className="text-2xl font-bold mb-2">{mission.image.captionTitle}</h3>
                <p className="text-lg">{mission.image.captionText}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 mt-10">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="relative"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <div className="overflow-hidden rounded-3xl shadow-2xl relative">
              <img
                src={vision.image.url}
                alt={vision.image.alt}
                width={800}
                height={384}
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 w-full text-white bg-black/50 py-4 text-center">
                <h3 className="text-2xl font-bold mb-2">{vision.image.captionTitle}</h3>
                <p className="text-lg">{vision.image.captionText}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <div>
              <h2 className="text-6xl font-bold text-[#FF6600] mb-4">{vision.title}</h2>
              <p className="text-3xl font-bold text-gray-900 mb-4">{vision.subheading}</p>
              <p className="text-xl text-gray-700 mb-6">{vision.description}</p>
            </div>
            <div className="space-y-4">
              {vision.points.map((point, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-4 p-4 bg-white rounded-xl hover:bg-orange-50 transition-colors shadow-sm"
                  custom={i + 2}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <div className="w-6 h-6 bg-[#FF6600] rounded-full flex items-center justify-center mt-1">
                    <ArrowRight className="w-3 h-3 text-white" />
                  </div>
                  <p className="text-gray-700 text-lg">{point}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Timeline/>

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
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden">
            
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
                  <h3 className="text-3xl font-bold text-white mb-6">
                    {impact.subheading}
                  </h3>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {impact.body}
                  </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {impact.stats.map((stat, i) => (
                    <motion.div
                      key={i}
                      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      viewport={{ once: true }}
                    >
                      <div className="text-white font-semibold text-lg">
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
                  <motion.button
                    className="bg-[#FF6600] hover:bg-[#E55A00] text-white font-semibold py-4 px-10 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#FF6600]/25"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Start Your Project
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <div className="mb-4 text-3xl font-extrabold uppercase tracking-wide text-[#FF6600]">
            Your Growth. Our Mission.
          </div>
          <h2 className="text-6xl font-bold mb-6 text-gray-900">
            Let’s Create Something {' '}
            <span className="text-[#FF6600] font-extrabold">That Stands Out.</span>
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Whether it's a new build or an upgrade, we help brands scale with modern, efficient digital solutions.Your next big step starts with one conversation.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="relative overflow-hidden group px-8 py-4 rounded-lg font-semibold text-xl transition-colors duration-300 text-[#FF6600] bg-white border border-[#FF6600] shadow-lg hover:text-white">
              <span className="relative z-10">Schedule a Call</span>
              <span className="absolute inset-0 bg-[#FF6600] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out z-0"></span>
            </button>
            <button className="px-8 py-4 rounded-lg font-semibold text-xl transition-colors duration-300 text-white bg-[#FF6600] border border-[#FF6600] shadow-lg hover:bg-[#E55A00]">
              View Our Work
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default AboutUsContent;