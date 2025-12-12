import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";

const slides = [
  {
    id: 1,
    imageUrl:
      "https://ramp.com/_next/image?url=%2Fassets%2Fimages%2Fresources%2Fevergreen-office-colleagues.webp&w=3840&q=75",
    altText: "Two men from the Jolt team",
    readTime: "3 MIN READ",
    title: "Scaling Ramp's AI platform with the Jolt team",
    author: "Karim Atiyeh",
    authorTitle: "Co-Founder & CTO, Ramp",
    avatarUrl: "https://i.pravatar.cc/150?img=4",
  },
  {
    id: 2,
    imageUrl:
      "https://ramp.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F6jz6vxxd%2Fproduction%2F6d3c4809dcfbf061fa4b8edd5954aa869935fb13-2400x1200.png%3Ffit%3Dmax%26auto%3Dformat&w=3840&q=75",
    altText: "Team working collaboratively",
    readTime: "7 MIN READY",
    title: "How AI is Revolutionizing Expense Management",
    author: "Elena Petrova",
    authorTitle: "Senior AI Engineer, Ramp",
    avatarUrl: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: 3,
    imageUrl:
      "https://ramp.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F6jz6vxxd%2Fproduction%2F5fb6d584999c4f9852a55b0fdaa98e4f27cdcea4-1457x728.png%3Ffit%3Dmax%26auto%3Dformat&w=3840&q=75",
    altText: "Charts and data on a laptop",
    readTime: "5 MIN READ",
    title: "Decoding Corporate Spending Patterns",
    author: "Alex Rodriguez",
    authorTitle: "Lead Data Scientist, Ramp",
    avatarUrl: "https://i.pravatar.cc/150?img=6",
  },
];

const BlogHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => setCurrentSlide(index);

  return (
    <div className="mt-20 bg-white min-h-[600px] font-sans text-white relative overflow-hidden">

      {/* HEADER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-5">
        
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-[#303236] leading-tight">
          The <span className="text-orange-600">Brandbase Capsule</span> Blog
        </h1>
      </div>

      {/* SLIDER */}
      <div className="relative w-full overflow-hidden py-5">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide) => (
            <div key={slide.id} className="min-w-full flex justify-center px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8 items-center rounded-2xl p-3 lg:p-0">

                {/* Image */}
                <div className="rounded-xl overflow-hidden h-[250px] sm:h-[320px] lg:h-[450px]">
                  <img
                    src={slide.imageUrl}
                    alt={slide.altText}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Text Content */}
                <div className="lg:pr-8 py-2 flex flex-col justify-center">
                  <span className="text-xs sm:text-sm uppercase tracking-wide text-gray-900 mb-2">
                    ARTICLE – {slide.readTime}
                  </span>

                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight mb-4 text-black">
                    {slide.title}
                  </h2>

                  <div className="flex items-center space-x-4 mt-2">
                    <img
                      src={slide.avatarUrl}
                      alt={slide.author}
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-gray-400"
                    />
                    <div>
                      <p className="font-semibold text-gray-900">{slide.author}</p>
                      <p className="text-xs sm:text-sm text-gray-700">{slide.authorTitle}</p>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>

        {/* DOTS */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex space-x-2 translate-y-5">
          {slides.map((_, index) => (
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
