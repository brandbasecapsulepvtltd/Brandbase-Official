import { useState, useEffect } from "react";

const HeroSection = () => {
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Dummy data
  const dummySlides = [
    {
      id: 1,
      title: "Create Experiences That Stand Out",
      subtext: "From exhibitions to large-scale events, we craft immersive experiences that leave a lasting impact on your audience.",
      image: "https://ik.imagekit.io/vinayak06/11.jpg?updatedAt=1763372433537"
    },
    {
      id: 2,
      title: "Expert Web & App Development Solutions",
      subtext: "Get world-class website development, app creation, and modern interface design tailored to your business goals.",
      image: "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg"
    },
    {
      id: 3,
      title: "Build a Brand That Truly Stands Out",
      subtext: "We craft powerful brand identities with strategic design, strong messaging, and visuals that leave a lasting impression.",
      image: "https://images.squarespace-cdn.com/content/v1/522ea6f5e4b074ba686e497c/1625541238887-BISTJ5IEUBKLV409GM31/Crowdstrike+_+NYCD-100+_+06-29-21+_+-20.jpg?format=1500w"
    },
    {
      id: 4,
      title: "Grow Faster in the Digital World",
      subtext: "We handle everything—from SEO and social ads to social media setup, content design, and content marketing—to elevate your brand online.",
      image: "https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg"
    },
    {
      id: 5,
      title: "Create Stories That Captivate",
      subtext: "High-quality audio and video production services that bring your brand's vision to life with cinematic visuals and crystal-clear sound.",
      image: "https://images.pexels.com/photos/8412361/pexels-photo-8412361.jpeg"
    }
  ];

  const dummyVideo = {
    url: "https://res.cloudinary.com/dkoqcp1g9/video/upload/Untitled_video_-_Made_with_Clipchamp_61_ib2uys_d2e8e7.mp4"
  };

  // Check mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Initialize with dummy data
  useEffect(() => {
    setSlides(dummySlides);
  }, []);

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
      <div className="relative w-full h-[85vh] sm:h-[80vh] md:h-[100vh] flex items-center justify-center bg-gray-100 text-gray-600 overflow-hidden">
        Loading Hero Section...
      </div>
    );
  }

  const currentSlideData = slides[currentSlide];

  return (
    <div className="relative w-full min-h-[95vh] sm:min-h-[90vh] md:min-h-[100vh] overflow-hidden flex items-center justify-center">
      {/* Background Image */}
      <div
        key={currentSlideData.id || currentSlide}
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out"
        style={{
          backgroundImage: `url(${currentSlideData.image})`,
        }}
      />

      {/* Video Overlay (shade) */}
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-10 md:opacity-20"
        src={dummyVideo.url}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />

      {/* Main Content */}
      <div className="relative flex flex-col items-center text-center px-4 sm:px-6 md:px-8 w-full max-w-7xl mx-auto mt-10">
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
            <button className="w-full sm:w-auto bg-transparent border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-300 px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 text-sm sm:text-base font-semibold tracking-wide uppercase shadow-lg min-w-[140px]">
              Get Started
            </button>
            <button className="w-full sm:w-auto bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white hover:text-black transition-all duration-300 px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 text-sm sm:text-base font-semibold tracking-wide uppercase shadow-lg min-w-[140px]">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation - Hidden on mobile, visible on tablet and desktop */}
      {!isMobile && (
        <div className="absolute bottom-4 sm:bottom-6 md:bottom-10 left-1/2 transform -translate-x-1/2 w-full px-4 sm:px-6 md:px-8 lg:px-20 max-w-7xl mx-auto">
          <div className="w-full">
            {/* Dynamic Preview Items */}
            <div className="w-full">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4 lg:gap-6 w-full">
                {slides.map((item, index) => {
                  const isActive = index === currentSlide;
                  return (
                    <div
                      key={item.id || index}
                      className="group cursor-pointer w-full"
                      onClick={() => setCurrentSlide(index)}
                    >
                      <div className="flex items-start space-x-2 md:space-x-3 w-full">
                        <span
                          className={`text-base sm:text-lg md:text-xl font-extrabold transition-colors duration-300 flex-shrink-0 ${
                            isActive ? "text-orange-600" : "text-gray-400"
                          }`}
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
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Navigation Dots - Only show on mobile */}
      {isMobile && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-orange-600 scale-125' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      )}

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 sm:h-1 bg-white/20">
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
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
            className="absolute right-2 md:right-4 lg:right-8 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 md:p-3 rounded-full transition-all duration-300 backdrop-blur-sm z-10"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}
    </div>
  );
};

export default HeroSection;