import React, { useState } from 'react';
import { X } from 'lucide-react'; // Ensure lucide-react is installed or use a standard SVG

const EventPopup = () => {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      {/* Main Container */}
      <div className="relative flex flex-col md:flex-row w-full max-w-4xl bg-white dark:bg-black rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
        
        {/* Close Button */}
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 p-1 rounded-full bg-gray-100 text-gray-500 hover:bg-orange-100 hover:text-orange-500 transition-colors z-10"
        >
          <X size={20} />
        </button>

        {/* Left Side: Image */}
        <div className="w-full md:w-1/2 h-64 md:h-auto overflow-hidden">
          <img 
            src="https://ik.imagekit.io/vinayak06/callendarimg.png" 
            alt="Exhibition Events" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side: Content */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white dark:bg-black">
          <span className="text-orange-500 font-bold tracking-widest text-sm uppercase mb-2">
            Exhibition Season 2024-25
          </span>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 leading-tight mb-4">
            Transform Your <span className="text-orange-500">Stall</span> into a Masterpiece.
          </h2>
          
          <p className="text-gray-600 mb-8 leading-relaxed">
            Don't just exhibit—dominate the floor. View our upcoming exhibition calendar and book a free consultation with our award-winning design team today.
          </p>

          <div className="flex flex-col gap-4">
            <a 
              href="https://brandbase-nu.vercel.app/event-calendar"
              className="inline-block text-center bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-lg shadow-lg shadow-orange-200 transition-all transform hover:-translate-y-1 active:scale-95"
            >
              Explore Event Calendar
            </a>
            
            <p className="text-xs text-gray-400 text-center">
              *Limited slots available for design consultations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPopup;
