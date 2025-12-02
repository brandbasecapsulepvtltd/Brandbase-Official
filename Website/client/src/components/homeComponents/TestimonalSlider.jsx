import React, { useState } from 'react';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import Tag from "../Tag";

const TestimonialSlider = ({ data }) => {
  const [index, setIndex] = useState(0);

  const prev = () => {
    setIndex((prevIndex) => (prevIndex === 0 ? data.testimonials.length - 1 : prevIndex - 1));
  };

  const next = () => {
    setIndex((prevIndex) => (prevIndex + 1) % data.testimonials.length);
  };

  const { logo, text, name, role, avatar } = data.testimonials[index];

  return (
    <div className="bg-white text-black min-h-screen px-15 py-20 font-sans">
      <div className="max-w-7xl space-y-5">
        <Tag>Testimonals</Tag>
        {/* Heading */}
        <h1 className="text-4xl lg:text-6xl font-medium leading-none">
          THEIR WORDS,<br />NOT <span className='text-[#FF6600]'>OURS</span>
        </h1>

        {/* Testimonial */}
        <div className="mt-16">
          <img src={logo} alt="Client Logo" className="h-17 w-auto mb-6" />

          <p className="text-xl md:text-xl leading-relaxed max-w-6xl">"{text}"</p>

          {/* Avatar and Info */}
          <div className="flex items-center gap-4 mt-8">
            <img src={avatar} alt={name} className="w-12 h-12 rounded-full object-cover" />
            <div>
              <p className="font-bold uppercase text-sm text-[#FF6600]">{name}</p>
              <p className="text-xs text-gray-700">{role}</p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-end gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 bg-[#FF6600] text-white rounded-full flex items-center justify-center hover:opacity-80"
            >
              <FaArrowLeft size={14} />
            </button>
            <button
              onClick={next}
              className="w-10 h-10 bg-[#FF6600] text-white rounded-full flex items-center justify-center hover:opacity-80"
            >
              <FaArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSlider;