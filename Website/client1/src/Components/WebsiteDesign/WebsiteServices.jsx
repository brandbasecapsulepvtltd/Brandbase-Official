import React from 'react';

const WebsiteServices = () => {
  const services = [
    {
      title: "Business Website",
      description: "Professional corporate websites designed to establish brand credibility, showcase services, and generate leads with conversion-focused layouts.",
      image: "https://ik.imagekit.io/vinayak06/Mavnox/BrandBase/Business-removebg-preview.png",
      link: "#"
    },
    {
      title: "Portfolio Website",
      description: "Creative, visually-focused websites to display your work, highlight achievements, and attract clients with elegant galleries and case studies.",
      image: "https://ik.imagekit.io/vinayak06/Mavnox/BrandBase/portfolioWeb-removebg-preview.png",
      link: "#"
    },
    {
      title: "Landing Page Development",
      description: "High-converting single-page websites optimized for marketing campaigns, product launches, and lead generation with compelling CTAs.",
      image: "https://ik.imagekit.io/vinayak06/Mavnox/BrandBase/LandingPage-removebg-preview.png",
      link: "#"
    },
    {
      title: "CMS Website",
      description: "Content management systems with easy-to-use interfaces for seamless content updates, blogging, and website maintenance.",
      image: "https://ik.imagekit.io/vinayak06/Mavnox/BrandBase/CMS-removebg-preview.png",
      link: "#"
    },
    {
      title: "E-Commerce Websites",
      description: "Online stores with product catalogs, shopping carts, and payment gateways to sell products and services directly to customers.",
      image: "https://ik.imagekit.io/vinayak06/Mavnox/BrandBase/E-commerce-removebg-preview.png",
      link: "#"
    },
    {
      title: "Full E-Commerce Setup",
      description: "Complete online store solutions including inventory management, shipping integration, analytics, and multi-channel sales capabilities.",
      image: "https://ik.imagekit.io/vinayak06/Mavnox/BrandBase/Dynamic-removebg-preview.png",
      link: "#"
    }
  ];

  return (
    <section className="bg-white py-20 px-4 md:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-800 uppercase tracking-tighter leading-none mb-2">
            Our Website Development
          </h2>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-none text-orange-600">
            Services
          </h2>
          <p className="mt-6 text-gray-600 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            Comprehensive web development solutions tailored to meet your specific business requirements and goals.
          </p>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="group bg-orange-100 rounded-[32px] p-8 flex flex-col items-center text-center transition-all duration-300 h-full border border-gray-200 hover:shadow-lg hover:shadow-orange-100 relative overflow-hidden"
            >
              {/* Image Container with Zoom Effect */}
              <div className="mb-6 w-full h-55 flex items-center justify-center overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="h-full object-contain drop-shadow-xl transition-transform duration-500 ease-out group-hover:scale-110"
                />
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-gray-800 mb-4 tracking-tight group-hover:text-[25px] transition-all duration-300">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-[17px] leading-relaxed mb-6 font-medium">
                {service.description}
              </p>

              {/* Learn More Link - Hidden by default, appears on hover */}
              <div className="mt-auto">
                <a 
                  href={service.link} 
                  className="text-orange-600 font-bold text-lg hover:text-orange-700 transition-all duration-500 uppercase tracking-wide opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 inline-block"
                >
                  Learn More →
                </a>
              </div>

              {/* Optional: Add a subtle background effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-indigo-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[32px] pointer-events-none"></div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WebsiteServices;