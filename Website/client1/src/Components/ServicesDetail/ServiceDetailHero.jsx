import React from 'react';
import { Camera } from 'lucide-react';

const ServiceDetailHero = () => {
  // Custom color matching the specific olive green in the image
  const themeColor = "#566452"; 

  return (
    <section className="w-full bg-white py-16 lg:py-24 font-sans">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
          
          {/* Left Column: Text Content */}
          <div className="w-full lg:w-1/2 space-y-8">
            <h1 className="text-5xl md:text-6xl lg:text-[5.5rem] leading-[1.05] tracking-tight text-gray-800">
              <span className="block font-normal">Treat your pet</span>
              <span className="block font-normal">to a luxurious</span>
              <span style={{ color: themeColor }} className="block font-medium">
                grooming
              </span>
              <span className="block font-normal">experience</span>
            </h1>

            <p className="text-gray-500 text-lg md:text-xl max-w-md leading-relaxed">
              Luxury pet grooming tailored to pamper your furry companion with care, style, and comfort.
            </p>

            <button 
              style={{ backgroundColor: themeColor }}
              className="text-white px-8 py-4 rounded-lg text-lg font-medium hover:opacity-90 transition-opacity duration-300 shadow-sm"
            >
              Book Appointment
            </button>
          </div>

          {/* Right Column: Image & Overlays */}
          <div className="w-full lg:w-1/2 relative">
            {/* Main Image Container */}
            <div className="relative rounded-[2.5rem] overflow-hidden bg-gray-100 aspect-[4/5] shadow-sm">
              <img 
                src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=1000&auto=format&fit=crop" 
                alt="Styled Poodle" 
                className="w-full h-full object-cover object-center"
              />
              
              {/* Overlay: Instagram Icon (Top Right) */}
              <div 
                style={{ backgroundColor: themeColor }}
                className="absolute top-6 right-6 p-3 rounded-full text-white shadow-lg cursor-pointer hover:scale-105 transition-transform"
              >
                <Camera size={24} />
              </div>

              {/* Overlay: Happy Pets (Bottom Left) */}
              <div className="absolute bottom-8 left-8 flex flex-col gap-2">
                <div className="flex items-center -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <img 
                      key={i}
                      src={`https://i.pravatar.cc/100?img=${i + 10}`} 
                      alt="User avatar" 
                      className="w-10 h-10 rounded-full border-2 border-white object-cover"
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-gray-700 ml-1">
                  +456 Happy Pets
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ServiceDetailHero;