'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ArrowLeft, ArrowRight, ArrowRight as ArrowIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

function normalizeServiceSlides(slides = []) {
  return slides.map((slide, index) => {
    const textParts = Array.isArray(slide.text)
      ? slide.text
      : slide.text
        ? [slide.text]
        : [];

    return {
      id: slide.id || index,
      title: textParts[0] || slide.title || 'Our Services',
      subtext:
        textParts[1] ||
        slide.subtitle ||
        slide.description ||
        'Strategic solutions designed to elevate your brand and deliver measurable results.',
      image: slide.img || slide.image || '/placeholder-hero.jpg',
      link: slide.link || '/contact',
      linkText: slide.buttonText || 'Explore',
    };
  });
}

const ServiceHeroSlider = ({ slides: rawSlides = [] }) => {
  const slides = useMemo(() => normalizeServiceSlides(rawSlides), [rawSlides]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLargeScreen, setIsLargeScreen] = useState(true);

  const totalSlides = slides.length;

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  useEffect(() => {
    if (totalSlides <= 1) return;
    const interval = setInterval(goToNext, 6000);
    return () => clearInterval(interval);
  }, [goToNext, totalSlides]);

  useEffect(() => {
    const handleResize = () => setIsLargeScreen(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!slides.length) return null;

  const currentSlide = slides[currentIndex];
  const containerClipX = 15;
  const imageClipX = 20;

  const HeroCTAs = ({ slide, compact = false }) => (
    <div className={`flex flex-col sm:flex-row flex-wrap gap-3 ${compact ? 'mt-4' : 'mt-6'}`}>
      {slide.link && (
        <Link
          href={slide.link}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#FF6600] hover:bg-[#E55A00] text-white font-semibold rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-[#FF6600]/25 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6600] focus-visible:ring-offset-2"
        >
          {slide.linkText}
          <ArrowIcon className="w-4 h-4" aria-hidden="true" />
        </Link>
      )}
      <Link
        href="/contact#contact-form"
        className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-[#FF6600] text-[#FF6600] hover:bg-[#FF6600] hover:text-white font-semibold rounded-xl transition-all duration-300 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6600] focus-visible:ring-offset-2"
      >
        Get a Free Quote
      </Link>
    </div>
  );

  const NavArrows = ({ onPrev, onNext, className, iconColor = 'text-gray-800 dark:text-white' }) => (
    <div className={`flex items-center space-x-3 ${className}`}>
      <button
        type="button"
        onClick={onPrev}
        aria-label="Previous slide"
        className={`p-3 rounded-full bg-white/80 dark:bg-zinc-900/80 shadow-md hover:bg-white dark:hover:bg-zinc-800 transition-all hover:scale-105 ${iconColor}`}
      >
        <ArrowLeft className="w-5 h-5" />
      </button>
      <button
        type="button"
        onClick={onNext}
        aria-label="Next slide"
        className={`p-3 rounded-full bg-white/80 dark:bg-zinc-900/80 shadow-md hover:bg-white dark:hover:bg-zinc-800 transition-all hover:scale-105 ${iconColor}`}
      >
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );

  const SlideDots = ({ className = '' }) =>
    totalSlides > 1 ? (
      <div className={`flex space-x-2 ${className}`}>
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-[#FF6600] w-8'
                : 'bg-gray-300 dark:bg-zinc-600 w-2 hover:bg-gray-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentIndex ? 'true' : undefined}
          />
        ))}
      </div>
    ) : null;

  return (
    <section
      className="relative w-full bg-white dark:bg-black font-sans overflow-hidden"
      role="region"
      aria-label="Service hero slider"
      aria-live="polite"
    >
      {/* Mobile */}
      {!isLargeScreen && (
        <div className="w-full flex flex-col">
          <div className="relative w-full h-[50vh] min-h-[320px]">
            <Image
              key={`mobile-${currentIndex}`}
              src={currentSlide.image}
              alt={currentSlide.title}
              fill
              className="object-cover animate-slide-in-right"
              priority
              sizes="100vw"
            />
            {totalSlides > 1 && (
              <NavArrows
                onPrev={goToPrev}
                onNext={goToNext}
                className="absolute bottom-4 left-6 z-10"
                iconColor="text-white"
              />
            )}
          </div>

          <div className="w-full px-6 py-8 flex flex-col gap-4">
            <div key={`mobile-content-${currentIndex}`} className="animate-fade-in">
              <h1 className="text-3xl font-bold leading-snug text-black dark:text-white">
                {currentSlide.title}
              </h1>
              <div className="w-16 h-1 bg-[#FF6600] my-4" />
              <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                {currentSlide.subtext}
              </p>
              <HeroCTAs slide={currentSlide} compact />
            </div>
          </div>

          <SlideDots className="justify-center px-6 pb-6" />
        </div>
      )}

      {/* Desktop — diagonal split (matches home hero) */}
      {isLargeScreen && (
        <div className="relative w-full h-[88vh] min-h-[560px] max-h-[900px]">
          {/* Right image with diagonal clip */}
          <div
            className="absolute top-0 right-0 h-full z-0"
            style={{ width: '58%' }}
          >
            <div
              className="w-full h-full relative overflow-hidden"
              style={{
                clipPath: `polygon(${containerClipX}% 0, 100% 0, 100% 100%, 0% 100%)`,
              }}
            >
              <Image
                key={`desktop-${currentIndex}`}
                src={currentSlide.image}
                alt={currentSlide.title}
                fill
                className="object-cover animate-slide-in-right"
                priority
                sizes="58vw"
                style={{
                  clipPath: `polygon(${imageClipX}% 0, 100% 0, 100% 100%, 0% 100%)`,
                }}
              />
            </div>
          </div>

          {/* Left content */}
          <div className="relative z-10 w-[50%] h-full flex flex-col justify-center px-12 xl:px-20">
            <div key={`desktop-content-${currentIndex}`} className="max-w-xl animate-fade-in">
              <h1 className="text-4xl xl:text-[3.25rem] font-bold text-black dark:text-white leading-[1.15] mb-6">
                {currentSlide.title}
              </h1>
              <div className="w-24 h-1 bg-[#FF6600] mb-6" />
              <p className="text-gray-700 dark:text-gray-200 text-lg leading-relaxed mb-2">
                {currentSlide.subtext}
              </p>
              <HeroCTAs slide={currentSlide} />
            </div>
          </div>

          {totalSlides > 1 && (
            <>
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
                <NavArrows onPrev={goToPrev} onNext={goToNext} />
              </div>
              <SlideDots className="absolute bottom-10 right-12 z-20" />
            </>
          )}
        </div>
      )}
    </section>
  );
};

export default ServiceHeroSlider;
