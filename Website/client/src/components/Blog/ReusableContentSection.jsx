// ReusableContentSection.jsx
'use client';
import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import SafeImage from '@/components/General/SafeImage';

const ArticleCard = ({ blog }) => (
  <Link href={`/blogs/${blog.metadata.category}/${blog.metadata.slug}`} className="group block h-full flex-shrink-0 w-[280px] sm:w-[300px] lg:w-[340px]">
    <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden mb-4 bg-gray-100 dark:bg-zinc-800">
      <SafeImage
        src={blog.metadata.featuredImage}
        alt={blog.metadata.title}
        fallbackKey="blog"
        className="object-cover w-full h-full"
        loading="lazy"
      />
    </div>
    <div className="pt-2">
      <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">ARTICLE</p>
      <h3 className="text-base font-bold mb-1 leading-snug text-gray-900 dark:text-white group-hover:text-[#FF6600] transition">
        {blog.metadata.title}
      </h3>
      <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
        {blog.metadata.description}
      </p>
    </div>
  </Link>
);

// Category section with horizontal scroll and navigation arrows
const CategorySection = ({ category, blogs, isLast }) => {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScrollability = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 10
      );
    }
  };

  useEffect(() => {
    checkScrollability();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollability);
      window.addEventListener('resize', checkScrollability);
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', checkScrollability);
      }
      window.removeEventListener('resize', checkScrollability);
    };
  }, [blogs]);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 360; // Card width + gap
      const newScrollPosition = container.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      container.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      });
    }
  };

  const showArrows = blogs.length > 3;

  return (
    <div className={`${!isLast ? 'mb-12 md:mb-20' : ''}`}>
      {/* Section Header */}
      <div className="flex justify-between items-center mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </h2>
        <div className="flex items-center gap-3">
          {/* Navigation Arrows */}
          {showArrows && (
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                className={`p-2 rounded-full border transition-all duration-200 ${canScrollLeft
                    ? 'border-gray-300 dark:border-zinc-600 hover:bg-orange-50 dark:hover:bg-orange-500/10 hover:border-orange-300 dark:hover:border-orange-500 text-gray-700 dark:text-gray-300 hover:text-orange-600'
                    : 'border-gray-200 dark:border-zinc-700 text-gray-300 dark:text-zinc-600 cursor-not-allowed'
                  }`}
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                className={`p-2 rounded-full border transition-all duration-200 ${canScrollRight
                    ? 'border-gray-300 dark:border-zinc-600 hover:bg-orange-50 dark:hover:bg-orange-500/10 hover:border-orange-300 dark:hover:border-orange-500 text-gray-700 dark:text-gray-300 hover:text-orange-600'
                    : 'border-gray-200 dark:border-zinc-700 text-gray-300 dark:text-zinc-600 cursor-not-allowed'
                  }`}
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
          <a href={`/blogs/${category}`} className="text-sm font-semibold text-orange-600 hover:text-orange-800 transition">
            View all
          </a>
        </div>
      </div>

      {/* Scrollable Articles Container */}
      <div className="relative">
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {blogs.map((blog, index) => (
            <ArticleCard key={index} blog={blog} />
          ))}
        </div>
      </div>

      {/* Separator */}
      {!isLast && (
        <hr className="mt-12 md:mt-16 border-gray-200 dark:border-zinc-800" />
      )}
    </div>
  );
};

// Main component to render the entire section
const ReusableContentSection = ({ allBlogs = [] }) => {
  // Group blogs by category
  const groupedByCategory = allBlogs.reduce((acc, blog) => {
    const category = blog.metadata.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(blog);
    return acc;
  }, {});

  // Convert to array for rendering
  const categories = Object.keys(groupedByCategory);

  if (categories.length === 0) {
    return (
      <div className="bg-white dark:bg-black py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-600 dark:text-gray-300">No articles found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-black py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {categories.map((category, index) => (
          <CategorySection
            key={category}
            category={category}
            blogs={groupedByCategory[category]}
            isLast={index === categories.length - 1}
          />
        ))}
      </div>

      {/* Hide scrollbar CSS */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default ReusableContentSection;
