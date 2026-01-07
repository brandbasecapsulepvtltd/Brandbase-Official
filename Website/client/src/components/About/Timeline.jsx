import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";



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

function Timeline({ content }) {
  const { milestones, title, subtitle, description } = content || {};
  const years = milestones ? Object.keys(milestones).map(Number) : [];

  const [activeYear, setActiveYear] = useState(years[0] || 2018);
  const [direction, setDirection] = useState("up");
  const [imageLoaded, setImageLoaded] = useState(false);
  const [currentImage, setCurrentImage] = useState(milestones ? milestones[years[0] || 2018].img : "");

  const handleYearClick = (year) => {
    if (year === activeYear) return;

    setDirection(year > activeYear ? "up" : "down");
    setActiveYear(year);
    setImageLoaded(false);
    setCurrentImage(milestones[year].img);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageLoaded(true);
  };

  // Calculate the progress line width based on active year
  const getProgressWidth = () => {
    const activeIndex = years.indexOf(activeYear);
    if (activeIndex === 0) return "0%";

    // Calculate percentage based on number of segments completed
    const segmentPercentage = (activeIndex / (years.length - 1)) * 100;
    return `${segmentPercentage}%`;
  };

  return (
    <div className="w-full min-h-screen bg-white dark:bg-zinc-950 text-black dark:text-white flex flex-col items-center py-10 lg:py-20 px-4">

      {/* Section Header */}
      <motion.div
        className="text-center mb-12 lg:mb-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <div className="mb-4 text-3xl font-bold uppercase tracking-wide text-[#FF6600]">
          {subtitle}
        </div>
        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          {title}
        </h2>
        <p className="text-lg lg:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
          {description}
        </p>
      </motion.div>

      {/* CONTENT + ANIMATION */}
      <div className="max-w-6xl w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeYear}
            initial={{ opacity: 0, y: direction === "up" ? 60 : -60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: direction === "up" ? -60 : 60 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full flex flex-col lg:flex-row items-center gap-8 lg:gap-12"
          >
            {/* IMAGE CONTAINER */}
            <div className="w-full lg:w-1/2 order-2 lg:order-1">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                {/* Loading Skeleton */}
                {!imageLoaded && (
                  <div className="w-full h-64 lg:h-80 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse rounded-2xl flex items-center justify-center">
                    <div className="text-gray-500 dark:text-gray-400">Loading...</div>
                  </div>
                )}

                {/* Actual Image */}
                <motion.img
                  src={currentImage}
                  className={`
                    w-full h-64 lg:h-80 object-cover rounded-2xl transition-all duration-500
                    ${!imageLoaded ? 'opacity-0 absolute inset-0' : 'opacity-100'}
                    hover:scale-105
                  `}
                  alt={`Visual representation for ${milestones ? milestones[activeYear].title : ''}`}
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                  loading="lazy"
                />

                {/* Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
              </div>
            </div>

            {/* TEXT CONTENT */}
            <div className="w-full lg:w-1/2 order-1 lg:order-2">
              <motion.h1
                className="text-6xl lg:text-[140px] font-bold text-[#FF6600] leading-none mb-4 lg:mb-6"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {milestones ? milestones[activeYear].title : ''}
              </motion.h1>
              <motion.p
                className="text-lg lg:text-xl text-gray-700 dark:text-gray-300 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {milestones ? milestones[activeYear].text : ''}
              </motion.p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* TIMELINE WITH PROGRESSIVE LINE */}
      <motion.div
        className="relative w-full max-w-4xl mt-12 lg:mt-24 px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        {/* Background Line (Gray) */}
        <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-300 dark:bg-zinc-700 z-0"></div>

        {/* Progress Line (Orange) */}
        <motion.div
          className="absolute top-4 left-0 h-0.5 bg-[#FF6600] z-0"
          initial={{ width: "0%" }}
          animate={{ width: getProgressWidth() }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />

        {/* Timeline Dots Container */}
        <div className="relative flex justify-between items-center w-full">
          {years.map((year, index) => {
            const isCompleted = index <= years.indexOf(activeYear);

            return (
              <motion.div
                key={year}
                className="flex flex-col items-center cursor-pointer select-none relative z-10"
                onClick={() => handleYearClick(year)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Dot */}
                <div className={`
                  w-6 h-6 rounded-full transition-all duration-300 relative z-10
                  ${isCompleted ? "bg-[#FF6600] scale-125" : "bg-gray-400 dark:bg-zinc-600"}
                  ${activeYear === year ? "ring-4 ring-[#FF6600]/30" : ""}
                  flex items-center justify-center
                `}>
                  {isCompleted && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-[#FF6600]"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}

                  {/* Inner white dot for better visibility */}
                  <div className="w-1.5 h-1.5 bg-white dark:bg-zinc-950 rounded-full"></div>
                </div>

                {/* Year Label */}
                <p className={`
                  mt-3 text-sm lg:text-base font-medium transition-all duration-300 whitespace-nowrap
                  ${isCompleted ? "text-[#FF6600] font-bold" : "text-gray-600 dark:text-gray-300"}
                `}>
                  {year}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Progress Indicator */}
      <motion.div
        className="mt-8 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {years.indexOf(activeYear) + 1} of {years.length} milestones
        </div>
      </motion.div>
    </div>
  );
}

export default Timeline;
