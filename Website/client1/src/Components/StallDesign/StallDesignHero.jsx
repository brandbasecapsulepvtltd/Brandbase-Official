import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SkeletonHero = () => (
  <section
    aria-label="Loading Hero section"
    className="relative h-[500px] sm:h-[600px] md:h-[700px] bg-gray-100"
  >
    <div className="absolute inset-0 bg-gray-300" />
    <div className="container mx-auto px-4 sm:px-6 md:px-8 h-full flex flex-col-reverse lg:flex-row items-center justify-center gap-8 sm:gap-12 relative z-10">
      {/* Text Section */}
      <div className="w-full lg:w-1/2 space-y-2 max-w-xl">
        <div className="h-10 w-3/4 bg-gray-400 rounded" />
        <div className="h-6 w-full bg-gray-300 rounded" />
        <div className="h-6 w-2/3 bg-gray-300 rounded" />
        <div className="h-12 w-32 bg-gray-400 rounded-lg" />
      </div>

      {/* Image Section */}
      <div className="w-full lg:w-1/2 flex justify-center">
        <div className="w-[200px] sm:w-[250px] md:w-[300px] h-[300px] sm:h-[350px] md:h-[400px] bg-gray-400 rounded-2xl" />
      </div>
    </div>
  </section>
);

const StallDesignHero = () => {
  const [slides, setSlides] = useState([]);
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(true);

  // Updated with concise, professional text
  const sliderData = [
    {
      id: 1,
      title: "World-Class Exhibition Booth Design",
      subtext: "Transform your brand presence with innovative stall designs that captivate audiences and drive engagement at every trade show.",
      image: "https://www.brandbasecapsule.com/assets/img/Exhibition%20Management/Indian%20Exhibition/13.jpg",
      alt: "Modern exhibition stall design with branding elements",
      link: "#contact"
    },
    {
      id: 2,
      title: "Innovative Exhibition Solutions",
      subtext: "Strategic stall designs that communicate your brand story effectively while maximizing visibility and visitor interaction.",
      image: "https://www.brandbasecapsule.com/assets/img/Exhibition%20Management/Indian%20Exhibition/18.jpg",
      alt: "Futuristic exhibition stall design with digital displays",
      link: "#contact"
    },
    {
      id: 3,
      title: "Elevate Your Event Presence",
      subtext: "Make a lasting impression with custom booth designs that reflect your brand excellence and deliver measurable results.",
      image: "https://www.brandbasecapsule.com/assets/img/Exhibition%20Management/Indian%20Exhibition/15.jpg",
      alt: "Professional exhibition booth with modern seating",
      link: "#contact"
    }
  ];

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setSlides(sliderData);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!slides.length) return;
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides]);

  const nextSlide = () => setActive((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setActive((prev) => (prev - 1 + slides.length) % slides.length);

  if (loading) return <SkeletonHero />;
  if (!slides.length) {
    return (
      <section aria-label="Hero section missing" className="h-[600px] flex items-center justify-center bg-white">
        <p className="text-lg text-gray-500">Hero section content is missing.</p>
      </section>
    );
  }

  const activeSlide = slides[active];

  return (
    <section
      className="relative w-full min-h-[600px] sm:min-h-[700px] lg:min-h-[500px] overflow-hidden bg-white mt-25"
      aria-label="Hero Section"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center py-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
          {/* Text Side */}
          <div className="text-center lg:text-left space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="space-y-4"
              >
                <motion.h1
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-gray-900 leading-tight"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  {activeSlide.title}
                </motion.h1>

                <motion.p
                  className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {activeSlide.subtext}
                </motion.p>

                <motion.div
                  className="pt-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <a href={activeSlide.link || "#"}>
                    <button
                      aria-label="Get Free Design & Quote"
                      className="px-6 py-3 sm:px-8 sm:py-4 bg-[#FF6600] text-white font-semibold rounded-lg hover:bg-orange-600 transition-all duration-300 shadow hover:shadow-lg text-sm sm:text-base"
                    >
                      Get Free Design & Quote
                    </button>
                  </a>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Slide Controls */}
            <div className="flex items-center justify-center lg:justify-start gap-4 pt-4">
              <div className="flex gap-2">
                <button
                  onClick={prevSlide}
                  aria-label="Previous Slide"
                  className="p-2 rounded-full bg-white shadow hover:shadow-md text-gray-600 hover:text-[#FF6600] transition-all duration-300"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button
                  onClick={nextSlide}
                  aria-label="Next Slide"
                  className="p-2 rounded-full bg-white shadow hover:shadow-md text-gray-600 hover:text-[#FF6600] transition-all duration-300"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
              <div className="flex gap-2" role="tablist" aria-label="Slide indicators">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    aria-current={i === active ? "true" : undefined}
                    className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                      i === active ? "bg-[#FF6600] scale-110" : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Image Side */}
          <div className="flex justify-center lg:justify-end">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full max-w-[300px] sm:max-w-[400px] lg:max-w-[500px]"
              >
                <div className="rounded-xl overflow-hidden">
                  <img
                    src={activeSlide.image}
                    alt={activeSlide.alt}
                    className="w-full h-[250px] sm:h-[350px] lg:h-[400px] object-cover"
                    loading="lazy"
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StallDesignHero;