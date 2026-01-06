import { useState, useEffect } from "react";

const HeroSection = ({ data }) => {
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Initialize with data from props
  useEffect(() => {
    if (data && data.slides) {
      setSlides(data.slides);
    }
  }, [data]);

  // Auto slide change every 4s
  useEffect(() => {
    if (!slides.length) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slides]);

  if (!slides.length) {
    return (
      <section 
        aria-label="Hero section loading" 
        className="relative w-full h-[85vh] sm:h-[80vh] md:h-[100vh] flex items-center justify-center bg-gray-100 text-gray-600 dark:text-gray-300 overflow-hidden"
      >
        <p>Loading Hero Section...</p>
      </section>
    );
  }

  const currentSlideData = slides[currentSlide];

  return (
    <section 
      aria-label="Hero carousel" 
      className="relative w-full min-h-[95vh] sm:min-h-[90vh] md:min-h-[100vh] overflow-hidden flex items-center justify-center"
      role="region"
    >
      {/* Background Image */}
      <div
        key={currentSlideData.id || currentSlide}
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out"
        style={{
          backgroundImage: `url(${currentSlideData.image})`,
        }}
        aria-hidden="true"
      />

      {/* Video Overlay (shade) */}
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-30"
        src={data.video.url}
        autoPlay
        loop
        muted
        playsInline
        aria-label="Background video overlay"
        title="Brand showcase background video"
      />

      {/* Overlay gradient */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" 
        aria-hidden="true"
      />

      {/* Main Content */}
      <div className="relative flex flex-col items-center text-center px-4 sm:px-6 md:px-8 w-full max-w-7xl mx-auto mt-15">
        <div className="w-full transform translate-y-0 sm:translate-y-0 md:-translate-y-12 lg:-translate-y-20">
          <h1
            key={currentSlideData.id || currentSlide}
            className="text-white text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold max-w-4xl lg:max-w-5xl mx-auto leading-snug sm:leading-tight md:leading-tight drop-shadow-lg transition-opacity duration-1000 ease-in-out px-4 sm:px-2"
          >
            {currentSlideData.title}
          </h1>

          <p className="text-sm xs:text-base sm:text-lg md:text-xl text-gray-200 mb-6 md:mb-8 max-w-xs xs:max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto mt-3 sm:mt-4 md:mt-5 font-medium drop-shadow-md px-4 sm:px-2 leading-relaxed sm:leading-relaxed">
            {currentSlideData.subtext}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mt-4 sm:mt-6 px-4 sm:px-0">
            <button 
              className="w-full sm:w-auto bg-transparent border-2 border-white text-white hover:bg-white dark:bg-zinc-900 dark:bg-black hover:text-black dark:text-white transition-all duration-300 px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 text-sm sm:text-base font-semibold tracking-wide uppercase shadow-lg min-w-[140px]"
              aria-label="Get started with our services"
            >
              Get Started
            </button>
            <button 
              className="w-full sm:w-auto bg-white dark:bg-zinc-900 dark:bg-black/20 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white dark:bg-zinc-900 dark:bg-black hover:text-black dark:text-white transition-all duration-300 px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 text-sm sm:text-base font-semibold tracking-wide uppercase shadow-lg min-w-[140px]"
              aria-label="Learn more about our services"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation - Hidden on mobile, visible on tablet and desktop */}
      {!isMobile && (
        <nav 
          className="absolute bottom-4 sm:bottom-6 md:bottom-10 left-1/2 transform -translate-x-1/2 w-full px-4 sm:px-6 md:px-8 lg:px-20 max-w-7xl mx-auto"
          aria-label="Slide navigation"
        >
          <div className="w-full">
            {/* Dynamic Preview Items */}
            <div className="w-full">
              <div 
                className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4 lg:gap-6 w-full"
                role="list"
                aria-label="Slide list"
              >
                {slides.map((item, index) => {
                  const isActive = index === currentSlide;
                  return (
                    <button
                      key={item.id || index}
                      className="group cursor-pointer w-full text-left"
                      onClick={() => setCurrentSlide(index)}
                      aria-label={`Go to slide ${index + 1}: ${item.title}`}
                      aria-current={isActive ? 'true' : 'false'}
                      role="listitem"
                    >
                      <div className="flex items-start space-x-2 md:space-x-3 w-full">
                        <span
                          className={`text-base sm:text-lg md:text-xl font-bold transition-colors duration-300 flex-shrink-0 ${
                            isActive ? "text-orange-600" : "text-gray-400"
                          }`}
                          aria-hidden="true"
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <p
                          className={`text-xs sm:text-sm max-w-[120px] md:max-w-[140px] lg:max-w-[160px] line-clamp-2 transition-colors duration-300 flex-grow ${
                            isActive
                              ? "text-white font-semibold"
                              : "text-gray-300 group-hover:text-orange-600"
                          }`}
                        >
                          {item.title}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </nav>
      )}

      {/* Mobile Navigation Dots - Only show on mobile */}
      {isMobile && (
        <nav 
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2"
          aria-label="Slide navigation dots"
        >
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-orange-600 scale-125' : 'bg-white dark:bg-zinc-900 dark:bg-black/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === currentSlide ? 'true' : 'false'}
            />
          ))}
        </nav>
      )}

      {/* Progress Bar */}
      <div 
        className="absolute bottom-0 left-0 w-full h-0.5 sm:h-1 bg-white dark:bg-zinc-900 dark:bg-black/20"
        aria-hidden="true"
      >
        <div
          key={currentSlideData.id || currentSlide}
          className="h-full bg-orange-600 transition-all duration-[4000ms] ease-linear"
          style={{
            width: `${((currentSlide + 1) / slides.length) * 100}%`,
          }}
        />
      </div>

      {/* Navigation Arrows for Desktop */}
      {!isMobile && (
        <>
          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
            className="absolute left-2 md:left-4 lg:left-8 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 md:p-3 rounded-full transition-all duration-300 backdrop-blur-sm z-10"
            aria-label="Previous slide"
          >
            <svg 
              className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
            className="absolute right-2 md:right-4 lg:right-8 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 md:p-3 rounded-full transition-all duration-300 backdrop-blur-sm z-10"
            aria-label="Next slide"
          >
            <svg 
              className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Hidden status for screen readers */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {`Slide ${currentSlide + 1} of ${slides.length}: ${currentSlideData.title}`}
      </div>
    </section>
  );
};

export default HeroSection;
