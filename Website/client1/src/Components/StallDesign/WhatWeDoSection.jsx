import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.1,
      ease: "easeOut",
    },
  }),
};

const skeletons = Array.from({ length: 8 });

export default function WhatWeDoSection() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Dummy data for stall design services
  const stallDesignServices = [
    {
      id: 1,
      title: "Custom Stall Design",
      description: "Bespoke exhibition stall designs tailored to your brand identity and space requirements.",
      icon: "🎨",
      link: "/services/custom-stall-design"
    },
    {
      id: 2,
      title: "Modular Stall Systems",
      description: "Flexible modular stall solutions that can be reconfigured for different events.",
      icon: "🧩",
      link: "/services/modular-stalls"
    },
    {
      id: 3,
      title: "3D Visualization",
      description: "Photorealistic 3D renders of your stall design before production begins.",
      icon: "🖥️",
      link: "/services/3d-visualization"
    },
    {
      id: 4,
      title: "Fabrication & Production",
      description: "High-quality fabrication using premium materials and expert craftsmanship.",
      icon: "🔨",
      link: "/services/fabrication"
    },
    {
      id: 5,
      title: "Installation & Setup",
      description: "Professional on-site installation and setup at exhibition venues.",
      icon: "🏗️",
      link: "/services/installation"
    },
    {
      id: 6,
      title: "Lighting Solutions",
      description: "Strategic lighting design to highlight your products and create ambiance.",
      icon: "💡",
      link: "/services/lighting"
    },
    {
      id: 7,
      title: "Graphics & Branding",
      description: "Eye-catching graphics and branding elements for maximum visibility.",
      icon: "📊",
      link: "/services/graphics"
    },
    {
      id: 8,
      title: "Event Management",
      description: "End-to-end event management services for seamless exhibition experience.",
      icon: "📅",
      link: "/services/event-management"
    }
  ];

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setServices(stallDesignServices);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="px-6 lg:px-20 py-16 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-serif">
            Our Stall Design <span className="text-orange-600">Services</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive exhibition stall solutions that transform your brand presence and drive engagement
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading
            ? skeletons.map((_, i) => (
                <div
                  key={i}
                  className="bg-white border border-orange-100 p-6 rounded-2xl shadow-sm"
                >
                  <div className="h-12 w-12 mx-auto bg-gray-200 rounded-full mb-4 flex items-center justify-center">
                    <div className="h-6 w-6 bg-gray-300 rounded"></div>
                  </div>
                  <div className="h-4 bg-gray-200 rounded mb-3 w-3/4 mx-auto" />
                  <div className="h-3 bg-gray-200 rounded w-full mb-2" />
                  <div className="h-3 bg-gray-200 rounded w-5/6 mx-auto" />
                </div>
              ))
            : services.map((service, i) => (
                <motion.a
                  key={service.id}
                  href={service.link}
                  className="block bg-white border border-orange-100 p-6 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-center group cursor-pointer"
                  variants={cardVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.4 }}
                  custom={i}
                >
                  {/* Icon */}
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-[#FF6600] transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {service.description}
                  </p>
                  
                  {/* Hover Indicator */}
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-8 h-1 bg-[#FF6600] rounded-full mx-auto"></div>
                  </div>
                </motion.a>
              ))}
        </div>
      </div>
    </section>
  );
}