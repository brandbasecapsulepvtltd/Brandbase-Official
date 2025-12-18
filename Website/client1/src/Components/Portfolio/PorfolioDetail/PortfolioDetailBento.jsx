import React from 'react';
import { Plus } from 'lucide-react';

const PortfolioDetailBento = () => {
  // Updated data for Services/Capabilities
  const services = [
    "3D Concept Design",
    "Custom Fabrication",
    "Modular Systems",
    "Interactive Tech",
    "Lighting & Audio Visual",
    "On-site Management",
    "Global Logistics",
    "Large Format Graphics"
  ];

  return (
    <div className="bg-white min-h-screen p-8 flex flex-col items-center font-sans py-20">
      
      {/* Main Heading */}
      <h2 className="text-4xl md:text-6xl font-extrabold text-[#303236] leading-tight mb-6 text-center">
        Your Brand. Center Stage.
      </h2>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl w-full">
        
        {/* --- Column 1 --- */}
        <div className="flex flex-col gap-6">
          {/* Card 1: Concept to Reality */}
          <div className="bg-white border border-gray-100 rounded-3xl p-6 flex flex-col justify-between h-64 shadow-sm hover:shadow-md transition-shadow relative group">
            <h2 className="text-2xl font-medium text-gray-900 leading-tight w-3/4">
              From Concept to Reality
            </h2>
            <button className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white mt-auto group-hover:scale-110 transition-transform">
              <Plus size={20} />
            </button>
          </div>

          {/* Card 2: Image (Fabrication/Workshop) */}
          <div className="rounded-3xl overflow-hidden h-64 relative">
             <img 
               src="https://i.pinimg.com/originals/f3/4f/fd/f34ffd1723486bee75756a94d6c4b16b.jpg" 
               alt="Workshop Fabrication" 
               className="w-full h-full object-cover"
             />
             <div className="absolute inset-0 bg-black/10"></div>
          </div>
        </div>

        {/* --- Column 2 --- */}
        <div className="flex flex-col gap-6">
          {/* Card 3: Projects Delivered */}
          <div className="bg-[#222222] rounded-3xl p-6 flex flex-col justify-between h-64 relative group">
            <div>
              <span className="text-white text-3xl font-bold block mb-1">450+</span>
              <span className="text-white text-xl font-medium">Stalls Delivered</span>
            </div>
            <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black mt-auto group-hover:scale-110 transition-transform">
              <Plus size={20} />
            </button>
          </div>

          {/* Card 4: Amazing Work (Experience) */}
          <div className="bg-white border border-gray-100 rounded-3xl p-6 flex flex-col justify-between h-64 shadow-sm relative overflow-hidden">
            <h2 className="text-2xl font-medium text-gray-900 leading-tight z-10 w-3/4">
              We don't just build stalls. We build experiences.
            </h2>
            {/* Isometric Structure/Tool Image */}
            <div className="absolute bottom-1 right-1 w-35 h-35">
                <img 
                    src="https://ik.imagekit.io/vinayak06/stalla.jpg?updatedAt=1765951854257" 
                    alt="Structure 3D" 
                    className="w-full h-full object-contain opacity-90"
                />
            </div>
          </div>
        </div>

        {/* --- Column 3 --- */}
        <div className="h-full">
           {/* Card 5: Tall Image (Showcase Stall) */}
           <div className="rounded-3xl overflow-hidden h-full min-h-[536px] relative group">
             <img 
               src="https://exhibitionstalldesign.in/images/portfolio/Gayatri/Exhibition-Development-Comp.jpg" 
               alt="Exhibition Stall Showcase" 
               className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
             />
             <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
                <p className="text-white font-medium">Auto Expo 2024</p>
             </div>
           </div>
        </div>

        {/* --- Column 4 --- */}
        <div className="flex flex-col gap-6">
           {/* Card 6: Cities/Reach */}
           <div className="bg-[#222222] rounded-3xl p-6 flex flex-col justify-center h-64 relative">
             <div className="mt-4">
              <span className="text-white text-3xl font-bold block mb-1">15+</span>
              <span className="text-white text-xl font-medium">Global Cities</span>
            </div>
          </div>

          {/* Card 7: Capabilities List */}
          <div className="bg-white border border-gray-100 rounded-3xl p-6 h-64 shadow-sm flex flex-col">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Our Expertise</h3>
            <ul className="overflow-y-auto pr-2 custom-scrollbar space-y-4 h-full">
                {services.map((service, index) => (
                    <li key={index} className="text-gray-800 font-medium text-sm pb-3 border-b border-gray-100 last:border-0 hover:text-[#222] cursor-pointer transition-colors flex items-center justify-between">
                        {service}
                    </li>
                ))}
            </ul>
          </div>
        </div>

      </div>
      
      {/* Inline styles for the specific custom scrollbar */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #d1d5db;
          border-radius: 20px;
        }
      `}</style>
    </div>
  );
};

export default PortfolioDetailBento;