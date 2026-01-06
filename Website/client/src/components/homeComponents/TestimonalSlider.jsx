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
    <section 
      aria-labelledby="testimonials-heading"
      className="bg-white dark:bg-zinc-900 dark:bg-black text-black dark:text-white min-h-screen px-15 py-20 font-sans"
    >
      <div className="max-w-7xl space-y-5">
        <Tag>Testimonials</Tag>
        {/* Heading */}
        <h1 
          id="testimonials-heading"
          className="text-4xl lg:text-6xl font-medium leading-none"
        >
          THEIR WORDS,<br />NOT <span className='text-[#FF6600]'>OURS</span>
        </h1>

        {/* Testimonial */}
        <article className="mt-16">
          <img 
            src={logo} 
            alt={`${name} company logo`}
            className="h-17 w-auto mb-6"
            loading="lazy"
            width={200}
            height={68}
          />

          <blockquote className="text-xl md:text-xl leading-relaxed max-w-6xl">
            "{text}"
          </blockquote>

          {/* Avatar and Info */}
          <div className="flex items-center gap-4 mt-8">
            <img 
              src={avatar} 
              alt={`${name}, ${role}`} 
              className="w-12 h-12 rounded-full object-cover"
              loading="lazy"
              width={48}
              height={48}
            />
            <div>
              <p className="font-bold uppercase text-sm text-[#FF6600]">{name}</p>
              <p className="text-xs text-gray-700 dark:text-gray-300">{role}</p>
            </div>
          </div>

          {/* Navigation */}
          <nav 
            className="flex justify-end gap-4 mt-8"
            aria-label="Testimonial navigation"
          >
            <button
              onClick={prev}
              className="w-10 h-10 bg-[#FF6600] text-white rounded-full flex items-center justify-center hover:opacity-80"
              aria-label="Previous testimonial"
            >
              <FaArrowLeft size={14} aria-hidden="true" />
            </button>
            <button
              onClick={next}
              className="w-10 h-10 bg-[#FF6600] text-white rounded-full flex items-center justify-center hover:opacity-80"
              aria-label="Next testimonial"
            >
              <FaArrowRight size={14} aria-hidden="true" />
            </button>
          </nav>
        </article>

        {/* Hidden status for screen readers */}
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          {`Showing testimonial ${index + 1} of ${data.testimonials.length} from ${name}`}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;
