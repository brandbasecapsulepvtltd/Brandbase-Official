import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { api } from '@/lib/api'; // Assuming you have this API client

const HeroSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLargeScreen, setIsLargeScreen] = useState(true);
  const [slides, setSlides] = useState([]);
  const [videoUrl, setVideoUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const totalSlides = slides.length;

  // Fetch hero section data
  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        setLoading(true);
        const response = await api.getHomepage();
        
        // Extract hero section data from the response
        const heroData = response.data?.heroSection || response.heroSection;
        
        if (heroData) {
          // Set slides (with fallback to empty array)
          setSlides(heroData.slides || []);
          
          // Set video URL (with fallback to empty string)
          setVideoUrl(heroData.video?.url || '');
        } else {
          // Use default slide if no data
          setSlides([{
            id: 1,
            title: 'Welcome to BrandBase',
            subtext: 'Elevating brands through strategic design and innovative solutions.',
            image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3',
            link: '/services',
            linkText: 'Explore More'
          }]);
        }
      } catch (err) {
        console.error('Error fetching hero section data:', err);
        setError('Failed to load hero content');
        
        // Fallback data
        setSlides([{
          id: 1,
          title: 'Welcome to BrandBase',
          subtext: 'Elevating brands through strategic design and innovative solutions.',
          image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3',
          link: '/services',
          linkText: 'Explore More'
        }]);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroData();
  }, []);

  // --- New Navigation Logic ---
  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);
  // ---------------------------

  // Auto Slide (only if we have slides)
  useEffect(() => {
    if (slides.length <= 1) return; // Don't auto-slide if only one slide
    
    const interval = setInterval(() => {
      goToNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [goToNext, slides.length]);

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

  // Show loading state
  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading hero section...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error && slides.length === 0) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Unable to Load Content</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // If no slides, show empty state
  if (slides.length === 0) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">📷</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No Hero Content</h2>
          <p className="text-gray-600">Please add slides from the admin panel.</p>
        </div>
      </div>
    );
  }

  const currentSlide = slides[currentIndex];

  // Desktop scroll effects
  const rightSectionWidth = isLargeScreen ? 50 + (50 * scrollProgress) : 100;
  const containerClipX = isLargeScreen ? 15 - (15 * scrollProgress) : 0;
  const imageClipX = isLargeScreen ? 20 - (20 * scrollProgress) : 0;
  const outerHeightClass = isLargeScreen ? "h-[200vh]" : "h-auto min-h-screen";

  // Background video if available
  const renderBackgroundVideo = () => {
    if (!videoUrl) return null;
    
    return (
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover opacity-20"
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  };

  // Component for Navigation Arrows
  const NavArrows = ({ onPrev, onNext, className, iconColor = 'text-white' }) => (
    <div className={`flex items-center space-x-4 ${className}`}>
      <button 
        onClick={onPrev} 
        aria-label="Previous slide"
        className={`p-3 rounded-full bg-black/30 hover:bg-black/50 transition-colors ${iconColor}`}
      >
        <ArrowLeft className="w-5 h-5" />
      </button>
      <button 
        onClick={onNext} 
        aria-label="Next slide"
        className={`p-3 rounded-full bg-black/30 hover:bg-black/50 transition-colors ${iconColor}`}
      >
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );

  return (
    <div className={`relative w-full ${outerHeightClass} bg-white font-sans`}>
      {/* Background Video */}

      {/*
      {renderBackgroundVideo()}
      */}

      {/* Mobile Layout — Image first, then Content */}
      {!isLargeScreen && (
        <div className="w-full flex flex-col pb-10 relative z-10">
          {/* Mobile Image */}
          <div className="relative w-full h-[55vh]">
            <img
              src={currentSlide.image || '/placeholder-hero.jpg'}
              alt="Hero Slide"
              className="w-full h-full object-cover animate-fade-in rounded-none"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3';
              }}
            />
            {/* Mobile Navigation Arrows */}
            {slides.length > 1 && (
              <NavArrows
                onPrev={goToPrev}
                onNext={goToNext}
                className="absolute bottom-4 left-6 z-10"
                iconColor="text-white"
              />
            )}
          </div>

          {/* Mobile Content */}
          <div className="w-full px-6 py-8 flex flex-col gap-4">
            <h1 className="text-3xl font-bold leading-snug text-black">
              {currentSlide.title}
            </h1>

            <p className="text-gray-600 text-base leading-relaxed">
              {currentSlide.subtext}
            </p>

            {currentSlide.link && (
              <a
                href={currentSlide.link}
                className="mt-4 text-sm font-bold tracking-widest text-orange-500 uppercase hover:text-orange-600 transition-colors inline-block"
              >
                {currentSlide.linkText || 'EXPLORE MORE'}
              </a>
            )}
          </div>

          {/* Slide Indicators for Mobile */}
          {slides.length > 1 && (
            <div className="flex justify-center space-x-2 px-6 pb-4">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex 
                      ? 'bg-orange-500 w-6' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Desktop Layout */}
      {isLargeScreen && (
        <div className="w-full h-screen overflow-hidden flex flex-col justify-between sticky top-0 mt-1 relative z-10">
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
                key={currentSlide.id || currentIndex}
                src={currentSlide.image || '/placeholder-hero.jpg'}
                alt="Hero Slide"
                className="w-full h-full object-cover animate-slide-in-right"
                style={{
                  clipPath: `polygon(${imageClipX}% 0, 100% 0, 100% 100%, 0% 100%)`,
                  transition: "clip-path 0.1s linear",
                }}
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3';
                }}
              />
            </div>
          </div>

          {/* Left Content */}
          <div
            className="relative z-10 w-full lg:w-[50%] h-full flex flex-col justify-center px-16 py-12 transition-opacity duration-300"
            style={{ opacity: 1 - scrollProgress }}
          >
            <div key={currentSlide.id || currentIndex} className="my-auto max-w-lg animate-fade-in">
              <h1 className="text-[60px] font-bold text-black leading-tight mb-6 mt-8">
                {currentSlide.title}
              </h1>

              <div className="w-25 h-1 bg-orange-600 mb-6"></div>

              <p className="text-gray-800 text-lg leading-relaxed mb-10">
                {currentSlide.subtext}
              </p>

              {currentSlide.link && (
                <a
                  href={currentSlide.link}
                  className="text-md font-bold tracking-widest text-orange-500 uppercase hover:text-orange-600 transition-colors inline-block"
                >
                  {currentSlide.linkText || 'EXPLORE MORE'}
                </a>
              )}
            </div>
          </div>

          {/* Desktop Navigation Arrows */}
          {slides.length > 1 && (
            <>
              <div className='absolute bottom-5 right-1/2 z-20'>
                <NavArrows
                  onPrev={goToPrev}
                  onNext={goToNext}
                  className=""
                  iconColor="text-black"
                />
              </div>
              
              {/* Slide Indicators for Desktop */}
              <div className="absolute bottom-10 right-16 z-20 flex space-x-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentIndex 
                        ? 'bg-orange-500 w-6' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
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
