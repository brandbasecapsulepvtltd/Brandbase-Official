import React from 'react';
import ServiceCard from './ServiceCard';
import {FaBuilding, FaImage, FaBullseye, FaEdit, FaShoppingCart, FaCogs} from "react-icons/fa";

const services = [
  {
    title: "Business Website",
    description: "Professional corporate websites designed to establish brand credibility, showcase services, and generate leads with conversion-focused layouts.",
    link: "/service/website-design/business-website",
    icon: FaBuilding
  },
  {
    title: "Portfolio Website",
    description: "Creative, visually-focused websites to display your work, highlight achievements, and attract clients with elegant galleries and case studies.",
    link: "/service/website-design/portfolio-website",
    icon: FaImage
  },
  {
    title: "Landing Page Development",
    description: "High-converting single-page websites optimized for marketing campaigns, product launches, and lead generation with compelling CTAs.",
    link: "/service/website-design/landing-page-development",
    icon: FaBullseye
  },
  {
    title: "CMS Website",
    description: "Content management systems with easy-to-use interfaces for seamless content updates, blogging, and website maintenance.",
    link: "/service/website-design/cms-website",
    icon: FaEdit
  },
  {
    title: "E-Commerce Websites",
    description: "Online stores with product catalogs, shopping carts, and payment gateways to sell products and services directly to customers.",
    link: "/service/website-design/ecommerce-websites",
    icon: FaShoppingCart
  },
  {
    title: "Full E-Commerce Setup",
    description: "Complete online store solutions including inventory management, shipping integration, analytics, and multi-channel sales capabilities.",
    link: "/service/website-design/full-ecommerce-setup",
    icon: FaCogs
  }
];

const ServicesGrid = () => {
  return (
    <section className="py-20 px-6 bg-white mt-10">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold  mb-4">
            Our Website Development Services
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Comprehensive web development solutions tailored to meet your specific business requirements and goals.
          </p>
        </div>

        {/* Service Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, index) => (
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
      </div>
    </section>
  );
};

export default ServicesGrid;
