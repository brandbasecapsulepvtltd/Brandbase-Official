import React from 'react';

const VeedLearnSection = () => {
  const rightColumnProjects = [
    {
      title: "20x20 Exhibition Stall – Minimal Luxury Theme",
      subtitle: "Auto Expo 2025 · Delhi",
      image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1600&auto=format&fit=crop",
      tags: [
        { label: "STALL DESIGN", type: "primary" },
        { label: "FABRICATION", type: "secondary" },
        { label: "3D MODELING", type: "secondary" },
      ]
    },
    {
      title: "Modular Stall Setup with LED Backlit Panels",
      subtitle: "Tech Summit · Bangalore",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1600&auto=format&fit=crop",
      tags: [
        { label: "MODULAR", type: "primary" },
        { label: "GRAPHICS", type: "secondary" },
      ]
    },
    {
      title: "Double-Decker Stall – Premium Brand Experience",
      subtitle: "Trade Expo · Mumbai",
      image: "https://images.unsplash.com/photo-1577412647305-991150c7d163?q=80&w=1600&auto=format&fit=crop",
      tags: [
        { label: "DOUBLE DECKER", type: "primary" },
        { label: "EVENT SETUP", type: "secondary" },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-[5rem] leading-none font-black tracking-tighter mb-4">
            <span className="text-orange-500">BCPL</span>{" "}
            <span className="text-[#1A1A1A]">PROJECTS</span>
          </h1>
          <p className="text-gray-600 text-lg font-medium">
            A showcase of our exhibition and event stall designs.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Left Featured Project */}
          <div className="bg-white rounded-3xl p-5 hover:shadow-lg transition-shadow duration-300 cursor-pointer flex flex-col h-full">
            <div className="w-full aspect-[4/3] lg:h-[400px] overflow-hidden rounded-2xl mb-6">
              <img 
                src="https://images.unsplash.com/photo-1489515217757-5fd1be406fef?q=80&w=1600&auto=format&fit=crop" 
                alt="Featured Project" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="flex flex-col flex-grow px-2 pb-2">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] leading-tight">
                Futuristic 30x20 Exhibition Stall
              </h2>
              <p className="text-gray-500 mt-2 mb-5 text-sm">
                Design & Fabrication · Chennai Trade Fair
              </p>

              <div className="flex flex-wrap gap-2">
                <Tag label="PREMIUM STALL" type="primary" />
                <Tag label="LED WALL" type="secondary" />
              </div>
            </div>
          </div>

          {/* Right Projects List */}
          <div className="flex flex-col gap-6">
            {rightColumnProjects.map((project, index) => (
              <div 
                key={index} 
                className="bg-white rounded-3xl p-4 flex flex-col sm:flex-row gap-5 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              >
                {/* Image */}
                <div className="w-full sm:w-48 aspect-video sm:aspect-square flex-shrink-0">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>
                
                {/* Content */}
                <div className="flex flex-col justify-center">
                  <h3 className="text-xl font-bold text-[#1A1A1A] leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1 mb-3">
                    {project.subtitle}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map((tag, idx) => (
                      <Tag key={idx} label={tag.label} type={tag.type} />
                    ))}
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

// Tags
const Tag = ({ label, type }) => {
  const baseStyles =
    "px-2.5 py-1 rounded-md text-[10px] sm:text-[11px] font-bold uppercase tracking-wide";

  const typeStyles =
    type === "primary"
      ? "bg-[#CCF368] text-black"
      : "bg-[#F4F4F5] text-gray-500";

  return <span className={`${baseStyles} ${typeStyles}`}>{label}</span>;
};

export default VeedLearnSection;
