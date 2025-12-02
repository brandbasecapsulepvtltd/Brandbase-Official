import React from 'react';
import { Plus } from 'lucide-react'; // You may need to install lucide-react or use a standard SVG

const CareerBento = () => {
  // Data for the departments list
  const departments = [
    "Engineering",
    "Community Support",
    "Account Management",
    "Product",
    "Operations",
    "Design",
    "Finance",
    "Legal"
  ];

  return (
    <div className="bg-white min-h-screen p-8 flex flex-col items-center font-sans py-20">
      
      {/* Main Heading */}
      <h2 className="text-4xl md:text-6xl font-extrabold text-[#303236] leading-tight mb-6">
        Open the door to your next role
      </h2>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl w-full">
        
        {/* --- Column 1 --- */}
        <div className="flex flex-col gap-6">
          {/* Card 1: Live and Work Anywhere */}
          <div className="bg-white border border-gray-100 rounded-3xl p-6 flex flex-col justify-between h-64 shadow-sm hover:shadow-md transition-shadow relative group">
            <h2 className="text-2xl font-medium text-gray-900 leading-tight w-3/4">
              Live and Work Anywhere
            </h2>
            <button className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white mt-auto group-hover:scale-110 transition-transform">
              <Plus size={20} />
            </button>
          </div>

          {/* Card 2: Image (People) */}
          <div className="rounded-3xl overflow-hidden h-64 relative">
             <img 
               src="https://careers.airbnb.com/wp-content/uploads/sites/7/2024/03/live-and-work-2_74bcec.jpg?fit=308%2C221" 
               alt="Colleagues talking" 
               className="w-full h-full object-cover"
             />
          </div>
        </div>

        {/* --- Column 2 --- */}
        <div className="flex flex-col gap-6">
          {/* Card 3: Open Positions */}
          <div className="bg-[#222222] rounded-3xl p-6 flex flex-col justify-between h-64 relative group">
            <div>
              <span className="text-white text-3xl font-bold block mb-1">164</span>
              <span className="text-white text-xl font-medium">Open Positions</span>
            </div>
            <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black mt-auto group-hover:scale-110 transition-transform">
              <Plus size={20} />
            </button>
          </div>

          {/* Card 4: Amazing Work (House Icon) */}
          <div className="bg-white border border-gray-100 rounded-3xl p-6 flex flex-col justify-between h-64 shadow-sm relative overflow-hidden">
            <h2 className="text-2xl font-medium text-gray-900 leading-tight z-10">
              Do the most amazing work of your career
            </h2>
            {/* Isometric House Placeholder */}
            <div className="absolute bottom-4 right-4 w-32 h-32">
                <img 
                    src="https://ik.imagekit.io/vinayak06/corporate-removebg-preview%20(1).png" 
                    alt="House 3D" 
                    className="w-full h-full object-contain opacity-90"
                />
            </div>
          </div>
        </div>

        {/* --- Column 3 --- */}
        <div className="h-full">
           {/* Card 5: Tall Image */}
           <div className="rounded-3xl overflow-hidden h-full min-h-[536px] relative">
             <img 
               src="https://careers.airbnb.com/wp-content/uploads/sites/7/2024/03/departments_f410e4.jpg?fit=289%2C515" 
               alt="Office Interior" 
               className="w-full h-full object-cover"
             />
           </div>
        </div>

        {/* --- Column 4 --- */}
        <div className="flex flex-col gap-6">
           {/* Card 6: Departments Count */}
           <div className="bg-[#222222] rounded-3xl p-6 flex flex-col justify-center h-64 relative">
             <div className="mt-4">
              <span className="text-white text-3xl font-bold block mb-1">23</span>
              <span className="text-white text-xl font-medium">Departments</span>
            </div>
          </div>

          {/* Card 7: Scrollable List */}
          <div className="bg-white border border-gray-100 rounded-3xl p-6 h-64 shadow-sm flex flex-col">
            <ul className="overflow-y-auto pr-2 custom-scrollbar space-y-4 h-full">
                {departments.map((dept, index) => (
                    <li key={index} className="text-gray-800 font-medium text-sm pb-3 border-b border-gray-100 last:border-0 hover:text-gray-500 cursor-pointer transition-colors">
                        {dept}
                    </li>
                ))}
            </ul>
          </div>
        </div>

      </div>
      
      {/* Inline styles for the specific custom scrollbar look seen in the image */}
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

export default CareerBento;