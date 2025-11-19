import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Trophy, Star, Target, Globe, TrendingUp, Zap } from "lucide-react";

const awardsData = [
  {
    id: 1,
    title: "HIGH-GROWTH COMPANIES",
    subtitle: "APRIL 7/6/2022 - 2023",
    year: "2023",
    organization: "Industry of the Year",
    bgColor: "bg-gradient-to-br from-orange-50 to-orange-100",
    icon: TrendingUp
  },
  {
    id: 2,
    title: "TITLE STRESS AWARDS",
    subtitle: "EXCELLENCE IN INNOVATION",
    year: "2023",
    organization: "The Evence Truth",
    bgColor: "bg-gradient-to-br from-blue-50 to-blue-100",
    icon: Zap
  },
  {
    id: 3,
    title: "BUDGET GROWTH CHAMPIONS",
    subtitle: "OUTSTANDING PERFORMANCE",
    year: "2023",
    organization: "Stated",
    bgColor: "bg-gradient-to-br from-green-50 to-green-100",
    icon: Trophy
  },
  {
    id: 4,
    title: "APP DEVELOPMENT COMPANY",
    subtitle: "TECHNOLOGY EXCELLENCE",
    year: "2020",
    organization: "Entrepreneur",
    bgColor: "bg-gradient-to-br from-purple-50 to-purple-100",
    icon: Target
  },
  {
    id: 5,
    title: "GLOBAL LEADERS",
    subtitle: "INTERNATIONAL RECOGNITION",
    year: "2019",
    organization: "Clutch",
    bgColor: "bg-gradient-to-br from-red-50 to-red-100",
    icon: Globe
  },
  {
    id: 6,
    title: "INDIA'S GROWTH CHAMPIONS",
    subtitle: "STATISTA RECOGNITION",
    year: "2023",
    organization: "National Awards",
    bgColor: "bg-gradient-to-br from-yellow-50 to-yellow-100",
    icon: Star
  },
  {
    id: 7,
    title: "BEST DIGITAL AGENCY",
    subtitle: "CREATIVE EXCELLENCE",
    year: "2022",
    organization: "Design Awards",
    bgColor: "bg-gradient-to-br from-cyan-50 to-cyan-100",
    icon: Award
  }
];

const AwardsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [screenSize, setScreenSize] = useState('desktop');
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) setScreenSize('mobile');
      else if (width < 1024) setScreenSize('tablet');
      else setScreenSize('desktop');
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % awardsData.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + awardsData.length) % awardsData.length);
  };

  const getVisibleCards = () => {
    const total = awardsData.length;
    const cards = [];
    
    let range = 0;
    if (screenSize === 'mobile') range = 0;
    else if (screenSize === 'tablet') range = 1;
    else range = 2;

    for (let i = -range; i <= range; i++) {
      const index = (currentIndex + i + total) % total;
      cards.push({
        ...awardsData[index],
        position: i,
        isActive: i === 0,
      });
    }

    return cards;
  };

  const getCardStyles = (pos) => {
    const isCenter = pos === 0;
    const isAdjacent = pos === -1 || pos === 1;
    const isFar = pos === -2 || pos === 2;

    let styles = "cursor-pointer transition-all duration-500 ";

    if (isCenter) {
      styles += "scale-100 opacity-100 z-30 ";
    } else if (isAdjacent) {
      styles += "scale-90 opacity-75 z-20 ";
    } else if (isFar) {
      styles += "scale-75 opacity-50 z-10 ";
    }

    if (isCenter) {
      styles += "w-72 h-96 sm:w-80 sm:h-[26rem] lg:w-96 lg:h-[28rem]";
    } else if (isAdjacent) {
      styles += "w-64 h-80 sm:w-72 sm:h-96 lg:w-80 lg:h-96";
    } else if (isFar) {
      styles += "hidden lg:block w-64 h-80";
    }

    return styles;
  };

  const getSlideVariants = (position) => {
    return {
      enter: (direction) => ({
        x: direction > 0 ? 300 : -300,
        opacity: 0,
        scale: position === 0 ? 0.8 : position === -1 || position === 1 ? 0.7 : 0.6,
      }),
      center: {
        x: 0,
        opacity: position === 0 ? 1 : position === -1 || position === 1 ? 0.75 : 0.5,
        scale: position === 0 ? 1 : position === -1 || position === 1 ? 0.9 : 0.75,
      },
      exit: (direction) => ({
        x: direction < 0 ? 300 : -300,
        opacity: 0,
        scale: position === 0 ? 0.8 : position === -1 || position === 1 ? 0.7 : 0.6,
      })
    };
  };

  return (
    <div className="w-full bg-white py-8 sm:py-12 lg:py-16 px-4">
      
      {/* Header */}
      <motion.div
        className="text-center mb-8 sm:mb-12 lg:mb-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-[#FF6600] text-xl sm:text-2xl font-extrabold uppercase tracking-wide mb-2">
          Awards & Recognition
        </h2>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-3">
          Celebrating Excellence
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base lg:text-lg px-4">
          Our journey of innovation has been recognized by industry leaders worldwide.
        </p>
      </motion.div>

      {/* Carousel Container */}
      <div className="relative max-w-7xl mx-auto overflow-hidden">
        
        <div className="flex items-center justify-center min-h-[400px] sm:min-h-[440px] lg:min-h-[480px] py-4">
          <div className="flex items-center justify-center gap-4 lg:gap-6 xl:gap-8 relative">
            <AnimatePresence mode="popLayout" custom={direction}>
              {getVisibleCards().map((card) => {
                const IconComponent = card.icon;
                return (
                  <motion.div
                    key={`${card.id}-${currentIndex}`}
                    layout
                    custom={direction}
                    variants={getSlideVariants(card.position)}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.4 },
                      scale: { duration: 0.4 },
                      layout: { duration: 0.5 }
                    }}
                    onClick={() => {
                      if (card.position !== 0) {
                        const newDirection = card.position > 0 ? 1 : -1;
                        setDirection(newDirection);
                        setCurrentIndex((currentIndex + card.position + awardsData.length) % awardsData.length);
                      }
                    }}
                    className={getCardStyles(card.position)}
                  >
                    <motion.div 
                      className={`rounded-2xl shadow-xl border border-gray-200 p-4 sm:p-6 h-full flex flex-col ${card.bgColor} hover:shadow-2xl transition-all duration-300`}
                      whileHover={{ 
                        scale: card.position === 0 ? 1.02 : 1.05,
                        transition: { duration: 0.2 }
                      }}
                    >
                      
                      {/* Top: Year Badge */}
                      <motion.div 
                        className="flex justify-end mb-3"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <span className="inline-block bg-white/90 backdrop-blur-sm px-3 py-1 text-xs sm:text-sm rounded-full font-bold border border-gray-300 shadow-sm">
                          {card.year}
                        </span>
                      </motion.div>

                      {/* Icon/Image */}
                      <motion.div 
                        className="flex justify-center mb-4"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md">
                          <IconComponent className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-[#FF6600]" strokeWidth={1.5} />
                        </div>
                      </motion.div>

                      {/* Content */}
                      <motion.div 
                        className="text-center flex-1 flex flex-col justify-center px-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        <h3 className="text-gray-900 font-bold mb-2 text-sm sm:text-base lg:text-lg leading-tight">
                          {card.title}
                        </h3>
                        <p className="text-gray-600 text-xs sm:text-sm mb-3 leading-relaxed">
                          {card.subtitle}
                        </p>
                        <p className="text-[#FF6600] font-semibold text-sm sm:text-base">
                          {card.organization}
                        </p>
                      </motion.div>

                      {/* Bottom Line */}
                      <motion.div 
                        className="flex justify-center mt-4"
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        transition={{ delay: 0.5 }}
                      >
                        <div className="w-12 sm:w-16 h-1 bg-[#FF6600] rounded-full"></div>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-center items-center gap-4 sm:gap-6 mt-6 lg:mt-8">
          <motion.button
            onClick={prevSlide}
            className="bg-white border-2 border-gray-300 rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center shadow-md hover:shadow-lg hover:scale-110 hover:border-[#FF6600] hover:text-[#FF6600] transition-all active:scale-95"
            aria-label="Previous award"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>

          <motion.div 
            className="text-gray-700 font-semibold text-sm sm:text-base min-w-[60px] text-center"
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {currentIndex + 1} / {awardsData.length}
          </motion.div>

          <motion.button
            onClick={nextSlide}
            className="bg-white border-2 border-gray-300 rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center shadow-md hover:shadow-lg hover:scale-110 hover:border-[#FF6600] hover:text-[#FF6600] transition-all active:scale-95"
            aria-label="Next award"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>

      </div>
    </div>
  );
};

export default AwardsCarousel;