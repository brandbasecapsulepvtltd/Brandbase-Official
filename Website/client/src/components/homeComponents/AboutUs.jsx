"use client";
import Tag from "../Tag";
import { motion } from "framer-motion";

function AboutUs() {
  return (
    <section 
      aria-labelledby="about-bcpl-heading"
      className="py-12 md:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-black"
      itemScope
      itemType="https://schema.org/Organization"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12 md:mb-16 lg:mb-20">
          <div className="flex justify-center mb-4 md:mb-6">
            <Tag>About BCPL</Tag>
          </div>
          <h1 
            id="about-bcpl-heading"
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4 md:mb-6 px-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            itemProp="name"
          >
            Elevating Brands Through{" "}
            <span className="text-[#FF6600]" itemProp="slogan">Innovation</span> &{" "}
            <span className="text-[#FF6600]">Excellence</span>
          </h1>
          <p 
            className="text-base sm:text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed px-4 sm:px-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            itemProp="description"
          >
            BCPL is a premier global event management and marketing solutions provider specializing in 
            customized strategies for businesses worldwide. Since 2010, we've delivered over 1000 successful 
            projects across 50+ countries with unparalleled professionalism and creativity.
          </p>
        </header>

        {/* Main Content with Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center mb-16 md:mb-20">
          {/* Text Content */}
          <div className="space-y-4 md:space-y-6 order-2 lg:order-1" itemProp="makesOffer" itemScope itemType="https://schema.org/Offer">
            <div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="px-2 sm:px-0"
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3 md:mb-4">
                Your Trusted Partner in Event & Marketing Excellence
              </h2>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-4 md:mb-6" itemProp="description">
                BCPL specializes in comprehensive event management, strategic marketing solutions, and 
                exhibition services. We create memorable brand experiences and deliver measurable results 
                for clients globally through data-driven approaches.
              </p>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                Our expertise spans corporate events, international exhibitions, product launches, and 
                integrated marketing campaigns. Each project receives personalized attention to ensure 
                your brand stands out and achieves its strategic objectives.
              </p>
            </div>

            {/* Stats */}
            <div 
              className="grid grid-cols-2 gap-4 md:gap-6 pt-4 md:pt-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="text-center p-4 bg-gray-50 rounded-xl border border-gray-100" itemProp="areaServed" itemScope itemType="https://schema.org/Country">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#FF6600] mb-1 md:mb-2">50+</div>
                <div className="text-sm sm:text-base text-gray-600 font-medium">Countries Served</div>
                <meta itemProp="name" content="Global" />
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#FF6600] mb-1 md:mb-2">1000+</div>
                <div className="text-sm sm:text-base text-gray-600 font-medium">Projects Completed</div>
              </div>
            </div>
          </div>

          {/* Image */}
          <figure
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative order-1 lg:order-2"
            itemProp="image"
            itemScope
            itemType="https://schema.org/ImageObject"
          >
            <div className="rounded-2xl md:rounded-3xl overflow-hidden border border-gray-200 shadow-lg md:shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="BCPL Event Management Team coordinating a successful corporate conference with detailed planning"
                title="BCPL Professional Event Management Services"
                className="w-full h-64 sm:h-80 md:h-96 lg:h-[500px] object-cover"
                loading="lazy"
                width={1000}
                height={500}
                itemProp="url"
              />
              <meta itemProp="description" content="BCPL event management professionals organizing a corporate conference" />
            </div>
            {/* Floating Badge */}
            <div 
              className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-2 bg-[#FF6600] text-white px-4 py-3 sm:px-6 sm:py-4 rounded-xl md:rounded-2xl shadow-lg md:shadow-2xl"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              itemProp="foundingDate"
              content="2010"
            >
              <div className="text-xs sm:text-sm font-semibold">Since 2010</div>
              <div className="text-sm sm:text-lg font-bold">Trusted Worldwide</div>
            </div>
          </figure>
        </div>

        {/* Key Services Section */}
        <div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-12 md:mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          itemProp="serviceType"
        >
          <article className="text-center p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="w-12 h-12 bg-[#FF6600] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg 
                className="w-6 h-6 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <title>Innovation Icon</title>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">Innovation Driven</h3>
            <p className="text-gray-600 text-sm">Cutting-edge event technology and creative marketing solutions tailored to your business goals</p>
          </article>

          <article className="text-center p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="w-12 h-12 bg-[#FF6600] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg 
                className="w-6 h-6 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <title>Global Network Icon</title>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">Global Network</h3>
            <p className="text-gray-600 text-sm">International event execution across 50+ countries with local expertise</p>
          </article>

          <article className="text-center p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="w-12 h-12 bg-[#FF6600] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg 
                className="w-6 h-6 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <title>Excellence Icon</title>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">Proven Excellence</h3>
            <p className="text-gray-600 text-sm">1000+ successful event and marketing projects with measurable ROI</p>
          </article>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
