// BlogHero.jsx
import React, { useState, useEffect } from "react";

const BlogHero = ({ sliderBlogs = [] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (sliderBlogs.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderBlogs.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [sliderBlogs.length]);

  const goToSlide = (index) => setCurrentSlide(index);

  // If no slider blogs, show empty state
  if (sliderBlogs.length === 0) {
    return (
      <div className="mt-20 bg-white min-h-[600px] font-sans text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-5">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-[#303236] leading-tight">
            The <span className="text-orange-600">Brandbase Capsule</span> Blog
          </h1>
        </div>
        <div className="text-center py-20">
          <p className="text-gray-600">No featured articles available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-20 bg-white min-h-[600px] font-sans text-white relative overflow-hidden">
      {/* HEADER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-5">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-[#303236] leading-tight">
          The <span className="text-orange-600">Brandbase Capsule</span> Blog
        </h1>
      </div>

      {/* SLIDER */}
      <div className="relative w-full overflow-hidden py-5">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {sliderBlogs.map((blog, index) => (
            <div key={index} className="min-w-full flex justify-center px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8 items-center rounded-2xl p-3 lg:p-0">
                {/* Image */}
                <div className="rounded-xl overflow-hidden h-[250px] sm:h-[320px] lg:h-[450px]">
                  <img
                    src={blog.metadata.featuredImage}
                    alt={blog.metadata.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Text Content */}
                <div className="lg:pr-8 py-2 flex flex-col justify-center">
                  <span className="text-xs sm:text-sm uppercase tracking-wide text-gray-900 mb-2">
                    ARTICLE – {blog.metadata.readTime}
                  </span>

                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mb-4 text-black">
                    {blog.metadata.title}
                  </h2>

                  <p className="text-gray-700 mb-6">
                    {blog.metadata.description}
                  </p>

                  <div className="flex items-center space-x-4 mt-2">
                    <img
                      src={blog.metadata.author.image}
                      alt={blog.metadata.author.name}
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-gray-400"
                    />
                    <div>
                      <p className="font-semibold text-gray-900">{blog.metadata.author.name}</p>
                      <p className="text-xs sm:text-sm text-gray-700">{blog.metadata.author.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* DOTS */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex space-x-2 translate-y-5">
          {sliderBlogs.map((_, index) => (
            <button
              key={index}
              className={`w-2.5 h-2.5 rounded-full transition duration-300 ${
                currentSlide === index ? "bg-gray-900" : "bg-gray-500 hover:bg-gray-300"
              }`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogHero;
