// BlogHero.jsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import SafeImage from '@/components/General/SafeImage';

const BlogHero = ({ sliderBlogs = [] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (sliderBlogs.length === 0) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderBlogs.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [sliderBlogs.length]);

  const goToSlide = (index) => setCurrentSlide(index);
  const current = sliderBlogs[currentSlide];

  if (sliderBlogs.length === 0) {
    return (
      <section className="pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center py-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
            The <span className="text-[#FF6600]">Brandbase Capsule</span> Blog
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-4">Featured articles coming soon.</p>
        </div>
      </section>
    );
  }

  const blogHref = `/blogs/${current.metadata.category}/${current.metadata.slug}`;

  return (
    <section className="pb-8 px-4 sm:px-6 lg:px-8" aria-label="Featured articles">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#FF6600] mb-2">Insights & Updates</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
            The <span className="text-[#FF6600]">Brandbase Capsule</span> Blog
          </h1>
        </div>

        <div className="relative rounded-2xl overflow-hidden border border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            <Link href={blogHref} className="relative block h-[260px] sm:h-[320px] lg:h-[420px] overflow-hidden group bg-gray-100 dark:bg-zinc-800">
              <SafeImage
                src={current.metadata.featuredImage}
                alt={current.metadata.title}
                fallbackKey="blog"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>

            <div className="p-6 md:p-10 flex flex-col justify-center">
              <span className="text-xs uppercase tracking-widest text-[#FF6600] font-semibold mb-3">
                Featured · {current.metadata.readTime}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold leading-tight mb-4 text-gray-900 dark:text-white">
                <Link href={blogHref} className="hover:text-[#FF6600] transition-colors">
                  {current.metadata.title}
                </Link>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-3">
                {current.metadata.description}
              </p>
              <div className="flex items-center justify-between gap-4 mt-auto">
                <div className="flex items-center gap-3">
                  <SafeImage
                    src={current.metadata.author.image}
                    alt={current.metadata.author.name}
                    fallbackKey="default"
                    className="w-10 h-10 rounded-full object-cover border-2 border-gray-200 dark:border-zinc-700"
                  />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">{current.metadata.author.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{current.metadata.author.role}</p>
                  </div>
                </div>
                <Link
                  href={blogHref}
                  className="hidden sm:inline-flex items-center px-5 py-2.5 bg-[#FF6600] hover:bg-[#E55A00] text-white text-sm font-semibold rounded-lg transition-colors"
                >
                  Read Article
                </Link>
              </div>
            </div>
          </div>

          {sliderBlogs.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => goToSlide((currentSlide - 1 + sliderBlogs.length) % sliderBlogs.length)}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 dark:bg-zinc-900/90 shadow-md hover:bg-white transition-colors hidden md:flex"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => goToSlide((currentSlide + 1) % sliderBlogs.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 dark:bg-zinc-900/90 shadow-md hover:bg-white transition-colors hidden md:flex"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <div className="flex justify-center gap-2 py-4 border-t border-gray-100 dark:border-zinc-800">
                {sliderBlogs.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    aria-label={`Go to slide ${index + 1}`}
                    className={`w-2.5 h-2.5 rounded-full transition-colors ${
                      currentSlide === index ? 'bg-[#FF6600]' : 'bg-gray-300 dark:bg-zinc-600 hover:bg-gray-400'
                    }`}
                    onClick={() => goToSlide(index)}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default BlogHero;
