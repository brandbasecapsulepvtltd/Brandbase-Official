'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ClientPortfolioSection = ({ clientsData }) => {
  const [currentIndex, setCurrentIndex] = useState(clientsData.map(() => 0));

  const nextMedia = (clientIndex) => {
    setCurrentIndex(prev => {
      const newIndices = [...prev];
      newIndices[clientIndex] = (newIndices[clientIndex] + 1) % clientsData[clientIndex].mediaItems.length;
      return newIndices;
    });
  };

  const prevMedia = (clientIndex) => {
    setCurrentIndex(prev => {
      const newIndices = [...prev];
      newIndices[clientIndex] = newIndices[clientIndex] === 0
        ? clientsData[clientIndex].mediaItems.length - 1
        : newIndices[clientIndex] - 1;
      return newIndices;
    });
  };

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } }
  };

  const textVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const mediaVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.2 } }
  };

  return (
    <div className="w-full bg-white dark:bg-black overflow-hidden">
      {clientsData.map((client, clientIndex) => {
        const currentMedia = client.mediaItems[currentIndex[clientIndex]];
        const isRightAligned = client.imagePosition === 'right';

        return (
          <motion.div
            key={client.id}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className={`flex flex-col ${isRightAligned ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } items-center gap-8 lg:gap-12 px-4 sm:px-6 lg:px-16 py-8 sm:py-12 lg:py-20 bg-white dark:bg-black`}
          >
            {/* Text Content */}
            <motion.div
              variants={isRightAligned ? textVariants : mediaVariants}
              className="w-full lg:w-1/2 flex flex-col justify-center"
            >
              {/* Client Logo and Name */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white dark:bg-zinc-800 rounded-xl shadow-md p-2 sm:p-3 flex items-center justify-center border border-gray-100 dark:border-zinc-700">
                  <img
                    src={client.logo}
                    alt={client.companyName}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{client.companyName}</h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">{client.industry}</p>
                </div>
              </div>

              {/* Project Title */}
              <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {client.projectTitle}
              </h2>

              {/* Project Description */}
              <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                {client.projectDescription}
              </p>

              {/* Services Provided */}
              <div className="mb-8">
                <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3">Services Provided:</h4>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {client.servicesProvided.map((service, i) => (
                    <span
                      key={i}
                      className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#FF6600]/10 text-[#FF6600] rounded-full text-xs sm:text-sm font-medium"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              {/* Results Achieved */}
              <div className="bg-gradient-to-r from-gray-50 to-white dark:from-zinc-800/50 dark:to-zinc-900/50 p-4 sm:p-6 rounded-xl border border-gray-200 dark:border-zinc-800">
                <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3">Results Achieved:</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                  {client.results.map((result, i) => (
                    <div key={i} className="text-center">
                      <div className="text-xl sm:text-2xl font-bold text-[#FF6600]">{result.value}</div>
                      <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-1">{result.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Client Testimonial */}
              <div className="mt-8 p-4 sm:p-6 bg-white dark:bg-zinc-800/50 rounded-xl border border-gray-200 dark:border-zinc-800 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-[#FF6600]"></div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden flex-shrink-0">
                    <img
                      src={client.testimonial.clientImage}
                      alt={client.testimonial.clientName}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base truncate">
                      {client.testimonial.clientName}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 truncate">
                      {client.testimonial.position}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 italic text-sm sm:text-base">
                  "{client.testimonial.quote}"
                </p>
              </div>
            </motion.div>

            {/* Media Carousel */}
            <motion.div
              variants={isRightAligned ? mediaVariants : textVariants}
              className="w-full lg:w-1/2"
            >
              {/* Carousel content remains the same but uses client data */}
              <div className="relative w-full h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-xl bg-gray-900">
                {/* Media Type Indicator */}
                <div className="absolute top-4 left-4 z-20">
                  <span className={`px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-md ${currentMedia.type === 'video' ? 'bg-blue-600/90 text-white' : 'bg-black/50 text-white'}`}>
                    {currentMedia.type === 'video' ? 'VIDEO' : 'IMAGE'}
                  </span>
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={() => prevMedia(clientIndex)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 bg-white dark:bg-zinc-800/90 hover:bg-white dark:bg-zinc-800 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 group border border-gray-100 dark:border-zinc-700"
                  aria-label="Previous media"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800 dark:text-white group-hover:text-[#FF6600] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <button
                  onClick={() => nextMedia(clientIndex)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 bg-white dark:bg-zinc-800/90 hover:bg-white dark:bg-zinc-800 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 group border border-gray-100 dark:border-zinc-700"
                  aria-label="Next media"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800 dark:text-white group-hover:text-[#FF6600] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Media Display */}
                <div className="w-full h-full relative">
                  {currentMedia.type === 'image' ? (
                    <motion.img
                      key={`img-${currentIndex[clientIndex]}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      src={currentMedia.url}
                      alt={currentMedia.alt}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <motion.video
                      key={currentMedia.url}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      src={currentMedia.url}
                      className="object-cover w-full h-full"
                      controls
                      autoPlay
                      muted
                      loop
                      playsInline
                      poster={currentMedia.thumbnail}
                    >
                      Your browser does not support the video tag.
                    </motion.video>
                  )}
                </div>

                {/* Media Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 sm:p-6 z-10">
                  <p className="text-white text-sm sm:text-base font-medium">{currentMedia.title}</p>
                  <p className="text-white/80 text-xs sm:text-sm mt-1">{currentMedia.alt}</p>
                </div>

                {/* Media Counter */}
                <div className="absolute bottom-4 right-4 z-20">
                  <div className="px-3 py-1.5 bg-black/60 backdrop-blur-sm rounded-full border border-white/10">
                    <span className="text-white text-xs sm:text-sm font-medium">
                      {currentIndex[clientIndex] + 1} / {client.mediaItems.length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Media Indicator Dots */}
              <div className="flex justify-center gap-2 mt-6">
                {client.mediaItems.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      const newIndices = [...currentIndex];
                      newIndices[clientIndex] = index;
                      setCurrentIndex(newIndices);
                    }}
                    className={`h-1.5 rounded-full transition-all duration-300 ${currentIndex[clientIndex] === index
                      ? 'bg-[#FF6600] w-8'
                      : 'bg-gray-300 w-2 hover:bg-gray-400'
                      }`}
                    aria-label={`Go to media ${index + 1}`}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default ClientPortfolioSection;
