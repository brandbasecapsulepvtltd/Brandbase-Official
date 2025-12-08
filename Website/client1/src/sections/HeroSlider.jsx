import React, { useState, useEffect } from 'react';

const HeroSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLargeScreen, setIsLargeScreen] = useState(true);

  const slides = [
    {
      id: 1,
      title: "Create Experiences That Stand Out",
      subtext: "From exhibitions to large-scale events, we craft immersive experiences that leave a lasting impact on your audience.",
      image: "https://www.dubaiceberg.com/assets/images/bg/dubaiceberg-digital-production.jpg",
    },
    {
      id: 2,
      title: "Web & App Development Solutions",
      subtext: "Get world-class website development, app creation, and modern interfaces designed to drive growth and engagement.",
      image: "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg",
    },
    {
      id: 3,
      title: "Build a Brand That Truly Stands Out",
      subtext: "We craft powerful brand identities with strategic design, strong messaging, and visuals that resonate with your market.",
      image: "https://images.pexels.com/photos/27100681/pexels-photo-27100681.jpeg",
    },
    {
      id: 4,
      title: "Grow Faster in the Digital World",
      subtext: "We handle everything—from SEO and social ads to social media setup, content creation, and performance tracking.",
      image: "https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg",
    },
    {
      id: 5,
      title: "Create Stories That Captivate",
      subtext: "High-quality audio and video production services that bring your brand stories to life with cinematic excellence.",
      image: "https://images.pexels.com/photos/8412361/pexels-photo-8412361.jpeg",
    }
  ];

  // Auto Slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  // Screen Size + Scroll Logic
  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    const handleScroll = () => {
      if (!isLargeScreen) return;
      const scrolled = window.scrollY;
      const vh = window.innerHeight;
      let p = scrolled / vh;
      p = Math.min(Math.max(p, 0), 1);
      setScrollProgress(p);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLargeScreen]);

  const currentSlide = slides[currentIndex];

  // Desktop scroll effects (unchanged)
  const rightSectionWidth = isLargeScreen ? 50 + (50 * scrollProgress) : 100;
  const containerClipX = isLargeScreen ? 15 - (15 * scrollProgress) : 0;
  const imageClipX = isLargeScreen ? 20 - (20 * scrollProgress) : 0;
  const outerHeightClass = isLargeScreen ? "h-[200vh]" : "h-auto min-h-screen";

  return (
    <div className={`relative w-full ${outerHeightClass} bg-white font-sans`}>

      {/* Mobile Layout — Image first, then Content */}
      {!isLargeScreen && (
        <div className="w-full flex flex-col pb-10">
          {/* Mobile Image */}
          <div className="w-full h-[55vh]">
            <img
              src={currentSlide.image}
              alt="Hero Slide"
              className="w-full h-full object-cover animate-fade-in rounded-none"
            />
          </div>

          {/* Mobile Content */}
          <div className="w-full px-6 py-8 flex flex-col gap-4">
            <h1 className="text-3xl font-extrabold leading-snug">
              {currentSlide.title}
            </h1>

            <p className="text-gray-600 text-base leading-relaxed">
              {currentSlide.subtext}
            </p>

            <button className="mt-4 text-sm font-bold tracking-widest text-black uppercase hover:text-gray-600 transition-colors">
              JOIN US TO EXPLORE
            </button>
          </div>
        </div>
      )}

      {/* Desktop Layout (unchanged) */}
      {isLargeScreen && (
        <div className="w-full h-screen overflow-hidden flex flex-col justify-between sticky top-0 mt-5">

          {/* Right Image Section */}
          <div
            className="absolute top-0 right-0 h-full z-0 pointer-events-none lg:pointer-events-auto"
            style={{ width: `${rightSectionWidth}%` }}
          >
            <div
              className="w-full h-full relative"
              style={{
                clipPath: `polygon(${containerClipX}% 0, 100% 0, 100% 100%, 0% 100%)`,
                transition: "clip-path 0.1s linear",
              }}
            >
              <img
                key={currentSlide.id}
                src={currentSlide.image}
                alt="Hero Slide"
                className="w-full h-full object-cover animate-slide-in-right"
                style={{
                  clipPath: `polygon(${imageClipX}% 0, 100% 0, 100% 100%, 0% 100%)`,
                  transition: "clip-path 0.1s linear",
                }}
              />
            </div>
          </div>

          {/* Left Content */}
          <div
            className="relative z-10 w-full lg:w-[50%] h-full flex flex-col justify-center px-16 py-12 transition-opacity duration-300"
            style={{ opacity: 1 - scrollProgress }}
          >
            <div key={currentSlide.id} className="my-auto max-w-lg animate-fade-in">
              <h1 className="text-[60px] font-extrabold text-black leading-tight mb-6 mt-8">
                {currentSlide.title}
              </h1>

              <div className="w-25 h-1 bg-orange-600 mb-6"></div>

              <p className="text-gray-800 text-lg leading-relaxed mb-10">
                {currentSlide.subtext}
              </p>

              <button className="text-md font-bold tracking-widest text-orange-500 uppercase hover:text-orange-600 transition-colors">
                EXPLORE MORE
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInRight {
          from { transform: translateX(50%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-fade-in { animation: fadeIn 0.8s ease-out forwards; }
        .animate-slide-in-right { animation: slideInRight 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
};

export default HeroSlider;
