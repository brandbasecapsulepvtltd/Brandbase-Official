import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link"; // Next.js App Router import

// Utility for merging class names
const cn = (...classes) => classes.filter(Boolean).join(' ');

// Array of portfolio services with links
const services = [
  {
    name: "WEB DEVELOPMENT",
    role: "Modern Web Applications",
    description: "Scalable solutions with cutting-edge tech",
    imageSrc: "https://ik.imagekit.io/vinayak06/website_dev-removebg-preview.png",
    themeColor: "bg-gradient-to-br from-blue-50 to-white",
    borderColor: "border-blue-200",
    link: "portfolio/web-development", // Make sure this is a string
    linkText: "Explore Web Development"
  },
  {
    name: "STALL DESIGN",
    role: "Exhibition & Booth Design",
    description: "Custom exhibition stall solutions",
    imageSrc: "https://ik.imagekit.io/vinayak06/stallde-removebg-preview.png",
    themeColor: "bg-gradient-to-br from-orange-50 to-white",
    borderColor: "border-orange-200",
    link: "portfolio/exhibition-stalls", // Make sure this is a string
    linkText: "View Stall Designs"
  },
  {
    name: "VIDEO PRODUCTION",
    role: "Professional Media Content",
    description: "Engaging video and visual content",
    imageSrc: "https://ik.imagekit.io/vinayak06/video-prod-removebg-preview.png",
    themeColor: "bg-gradient-to-br from-purple-50 to-white",
    borderColor: "border-purple-200",
    link: "portfolio/video-production", // Make sure this is a string
    linkText: "See Our Videos"
  },
  {
    name: "CONTENT WRITING",
    role: "Strategic Content Creation",
    description: "Compelling brand storytelling",
    imageSrc: "https://ik.imagekit.io/vinayak06/content_writing-removebg-preview.png",
    themeColor: "bg-gradient-to-br from-green-50 to-white",
    borderColor: "border-green-200",
    link: "portfolio/content-writing", // Make sure this is a string
    linkText: "Read Our Content"
  }
];

const ServicesShowcase = ({ 
  title = "OUR EXPERTISE AREAS",
  description = "Comprehensive digital solutions designed to drive business growth. From strategic web development to impactful marketing campaigns, we deliver measurable results through innovative approaches and technical excellence.",
  buttonText = "EXPLORE OUR WORK"
}) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
      },
    },
  };

  return (
    <section className="w-full bg-white text-black py-16 md:py-24 lg:py-32 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16 md:mb-20 lg:mb-24">
          <div className="inline-block bg-[#FFF5E6] text-[#FF6600] px-6 py-2 rounded-full text-sm uppercase tracking-wider font-bold mb-6 border border-orange-100">
            Our Services
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight mb-6">
            <span className="text-gray-900">Transformative </span>
            <span className="text-[#FF6600]">Digital Solutions</span>
          </h1>
          
          <p className="text-lg md:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-10">
            {description}
          </p>
          
          <Link href="/our-work">
            <button className="rounded-lg bg-[#FF6600] text-white hover:bg-[#E55A00] px-10 py-4 text-lg font-bold transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1">
              {buttonText}
            </button>
          </Link>
        </div>

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <AnimatePresence>
            {services.map((service, index) => (
              <motion.div
                key={service.name}
                className="relative group"
                variants={cardVariants}
                whileHover={{ 
                  y: -20,
                  transition: { type: "spring", stiffness: 300, damping: 20 }
                }}
              >
                {/* Link wrapper for the entire card */}
                <Link 
                  href={service.link || "#"} // Fallback to "#" if undefined
                  className="block"
                  aria-label={`Learn more about ${service.name}`}
                >
                  <div className={cn(
                    "relative pt-10 pb-6 px-6 rounded-2xl h-[420px] md:h-[440px] flex flex-col items-center justify-between text-center overflow-hidden border-2 cursor-pointer",
                    service.themeColor,
                    service.borderColor,
                    "shadow-lg hover:shadow-2xl transition-all duration-300"
                  )}>
                    {/* Service Badge */}
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-white text-gray-900 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                        Service {index + 1}
                      </div>
                    </div>

                    {/* Service Content */}
                    <div className="text-center z-10 mt-6">
                      <h3 className="font-black text-xl lg:text-2xl text-gray-900 mb-2 tracking-tight">
                        {service.name}
                      </h3>
                      <p className="text-[#FF6600] font-semibold text-sm md:text-base mb-3">
                        {service.role}
                      </p>
                      <p className="text-gray-600 text-sm md:text-base mb-6">
                        {service.description}
                      </p>
                    </div>

                    {/* Service Image */}
                    <div className="relative w-full h-[180px] md:h-[200px] flex items-center justify-center">
                      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-50"></div>
                      <img
                        src={service.imageSrc}
                        alt={service.name}
                        className="h-full w-auto object-contain object-bottom transform group-hover:scale-110 transition-transform duration-500"
                        style={{ 
                          maxWidth: '90%',
                          maxHeight: '90%',
                        }}
                      />
                    </div>
                    {/* Hover Effect Indicator */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-2 h-2 bg-[#FF6600] rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA Section */}
        <div className="text-center mt-16 md:mt-20">
          <p className="text-gray-700 text-lg md:text-xl mb-8">
            Ready to transform your digital presence?
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <Link href="/contact">
              <button
                className="rounded-lg bg-[#FF6600] text-white hover:bg-[#E55A00] px-10 py-4 text-lg font-bold transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1"
              >
                Start Your Project
              </button>
            </Link>
            <Link href="/case-studies">
              <button
                className="rounded-lg border-2 border-gray-300 text-gray-700 hover:border-[#FF6600] hover:text-[#FF6600] px-10 py-4 text-lg font-bold transition-all duration-300 bg-transparent hover:bg-white"
              >
                View Case Studies
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

ServicesShowcase.displayName = "ServicesShowcase";

export { ServicesShowcase };