"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const services = [
  {
    category: "Web Design",
    items: [
      "Website Design & Development",
      "WordPress Development",
      "E-commerce Development",
      "Website Maintenance & Hosting",
      "Landing Page Design",
      "Shopify Development"
    ],
    icon: "💻",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
  },
  {
    category: "Graphic Design",
    items: [
      "Brand Identity Design",
      "Logo & Visual Systems",
      "Marketing Collateral",
      "Packaging Design",
      "Print & Digital Assets"
    ],
    icon: "🎨",
    image: "https://cdn.wallpapersafari.com/42/65/YlVLzy.jpg"
  },
  {
    category: "Digital Marketing",
    items: [
      "Social Media Marketing",
      "SEO Optimization",
      "Content Strategy",
      "PPC Advertising",
      "Email Marketing"
    ],
    icon: "📱",
    image: "https://tse2.mm.bing.net/th/id/OIP.4haPry3S_usS7LZ_KdjIhgHaE8?pid=ImgDet&w=474&h=316&rs=1&o=7&rm=3"
  },
  {
    category: "Web Development",
    items: [
      "Custom Website Design",
      "E-commerce Solutions",
      "Web Applications",
      "Mobile Responsive",
      "Performance Optimization"
    ],
    icon: "🔧",
    image: "https://tse2.mm.bing.net/th/id/OIP.FC4TBhC6mLp8WOfZex3IrgHaHa?w=1024&h=1024&rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    category: "Video Production",
    items: [
      "Brand Videos",
      "Social Media Content",
      "Product Demos",
      "Animation & Motion",
      "Video Advertising"
    ],
    icon: "🎥",
    image: "https://tse4.mm.bing.net/th/id/OIP.CcA6fg-ieoi3-WzmDltB7AHaEJ?rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    category: "Brand Strategy",
    items: [
      "Market Research",
      "Brand Positioning",
      "Competitive Analysis",
      "Audience Personas",
      "Growth Strategy"
    ],
    icon: "🚀",
    image: "https://www.ey.com/content/dam/ey-unified-site/ey-com/en-gl/campaigns/transformation-realized/images/ey-transformations-film-billboards-still-3840px-v2.jpg"
  }
];

export default function BrandElevation() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Beyond Websites – A Full{" "}
            <span className="text-[#FF6600]">360°</span>
            Approach to Brand Elevation
          </h1>
          <p className="text-xl text-gray-800 max-w-4xl mx-auto leading-relaxed">
            Your website is just one piece of the puzzle. We take a holistic approach to brand 
            elevation & convenience-focused growth. Our suite of creative services from Design 
            to branding and marketing, Video & more, ensure your brand connects with your 
            audience across every touchpoint.
          </p>
        </div>

        {/* Continuous Carousel */}
        <div className="relative">
          <div className="flex overflow-hidden gap-6">
            {/* First Set */}
            <motion.div
              className="flex gap-6 flex-none"
              animate={{
                x: isPaused ? "0%" : ["0%", "-100%"],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 40,
                  ease: "linear",
                },
              }}
            >
              {services.map((service, index) => (
                <ServiceCard 
                  key={`first-${index}`} 
                  service={service} 
                  onHover={() => setIsPaused(true)}
                  onLeave={() => setIsPaused(false)}
                />
              ))}
            </motion.div>

            {/* Second Set for seamless loop */}
            <motion.div
              className="flex gap-6 flex-none"
              animate={{
                x: isPaused ? "0%" : ["0%", "-100%"],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 40,
                  ease: "linear",
                },
              }}
            >
              {services.map((service, index) => (
                <ServiceCard 
                  key={`second-${index}`} 
                  service={service} 
                  onHover={() => setIsPaused(true)}
                  onLeave={() => setIsPaused(false)}
                />
              ))}
            </motion.div>
          </div>

          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 w-10 h-full bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute right-0 top-0 w-10 h-full bg-gradient-to-l from-white to-transparent z-10"></div>
        </div>
      </div>
    </section>
  );
}

// Service Card Component
function ServiceCard({ service, onHover, onLeave }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleHoverStart = () => {
    setIsHovered(true);
    onHover();
  };

  const handleHoverEnd = () => {
    setIsHovered(false);
    onLeave();
  };

  return (
    <div 
      className="flex-shrink-0 w-80 bg-white rounded-3xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300 group cursor-pointer relative h-100"
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
    >
      {/* Card Image */}
      <div className="h-full bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
        {/* Actual image from Unsplash */}
        <motion.img 
          src={service.image} 
          alt={service.category}
          className="w-full h-full object-cover"
          animate={{
            scale: isHovered ? 1.1 : 1
          }}
          transition={{
            duration: 0.3
          }}
        />
        
        {/* Service Name Overlay */}
        <div className="absolute inset-0 bg-black/40 flex justify-center">
          <h3 className="text-2xl mt-5 font-bold text-white text-center px-4">
            {service.category}
          </h3>
        </div>
      </div>

      {/* Services List - Animated from bottom on hover */}
      <motion.div 
        className="p-6 absolute inset-0"
        initial={false}
        animate={{
          y: isHovered ? 0 : "100%",
          opacity: isHovered ? 1 : 0
        }}
        transition={{
          duration: 0.4,
          ease: "easeOut"
        }}
        style={{
          backdropFilter: 'blur(5px)',
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          paddingBottom: '1.5rem'
        }}
      >
        <div className="flex-1 flex flex-col justify-center">
          <h4 className="text-lg font-semibold text-gray-900 mb-4 text-center">
            Our Services
          </h4>
          
          <ul className="space-y-3 mb-4">
            {service.items.map((item, itemIndex) => (
              <li 
                key={itemIndex} 
                className="flex items-center gap-3 text-gray-700 text-sm"
              >
                <div className="w-1.5 h-1.5 bg-[#FF6600] rounded-full flex-shrink-0"></div>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Button */}
        <motion.button 
          className="w-full py-3 bg-[#FF6600] hover:bg-[#E55A00] text-white font-semibold rounded-xl transition-colors duration-300"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Learn More
        </motion.button>
      </motion.div>
    </div>
  );
}