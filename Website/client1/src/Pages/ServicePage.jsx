import React from 'react';
import ServiceCard from '../Components/Service/ServiceCard';
import { FaChartLine, FaPalette, FaVideo, FaGlobe, FaMobile } from "react-icons/fa";

const serviceCategories = [
  {
    title: "Digital Marketing",
    description: "Comprehensive digital marketing strategies including SEO optimization, social media marketing, content creation, and online advertising campaigns to boost your online visibility.",
    link: "/services/digital-marketing",
    icon: FaChartLine
  },
  {
    title: "Branding & Creative Design",
    description: "Complete branding solutions from logo design to comprehensive brand guidelines, including corporate identity, print design, and creative visual assets.",
    link: "/services/branding-design",
    icon: FaPalette
  },
  {
    title: "Audio & Video Production",
    description: "Professional audio-visual production services for corporate films, promotional videos, event coverage, and engaging digital content creation.",
    link: "/services/audio-video-production",
    icon: FaVideo
  },
  {
    title: "Website Development",
    description: "Custom website development including business websites, e-commerce platforms, portfolio sites, and content management systems.",
    link: "/services/website-development",
    icon: FaGlobe
  },
  {
    title: "Mobile App Development",
    description: "Native and hybrid mobile application development for iOS and Android platforms with seamless user experience and robust backend integration.",
    link: "/services/mobile-app-development",
    icon: FaMobile
  }
];

const ServicePage = () => {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16 mt-15">
          <h2 className="text-4xl font-bold text-[#ff6600] mb-4 font-serif">
            Our Service Categories
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Comprehensive digital solutions across multiple domains to transform your business and drive measurable growth
          </p>
        </div>

        {/* Service Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceCategories.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              link={service.link}
              Icon={service.icon}
              className="h-full"
            />
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-orange-100 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 font-serif">
              Ready to Transform Your Business?
            </h3>
            <p className="text-gray-700 mb-6 text-lg">
              Let's discuss how our comprehensive service categories can help you achieve your business objectives across all digital platforms.
            </p>
            <a
              href="/contact"
              className="inline-block bg-[#FF6600] text-white font-medium py-3 px-8 rounded-lg hover:bg-orange-600 transition-all duration-300 hover:shadow-lg text-lg"
            >
              Get Started Today
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicePage;