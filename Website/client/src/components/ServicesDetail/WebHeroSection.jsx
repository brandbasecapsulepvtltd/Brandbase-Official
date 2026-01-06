"use client";

import React from "react";
import { 
  Code, Globe, MonitorSmartphone, BarChart3, Rocket, Layers, ShieldCheck 
} from "lucide-react";

// Icon mapping
const iconMap = {
  Code, Globe, MonitorSmartphone, BarChart3, Rocket, Layers, ShieldCheck
};

const WebHeroSection = ({ data }) => {
  if (!data) return null;
  
  // Duplicate for infinite loop - increase copies for smoother loop
  const loopFeatures = [...data.features, ...data.features, ...data.features];

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col items-center justify-center mt-10">
      <main className="w-full max-w-6xl px-4 py-16 md:py-24 flex flex-col items-center text-center">
        {/* Headline */}
        <h1 className="text-5xl lg:text-6xl leading-[0.95] font-bold tracking-tight text-slate-900 uppercase mb-6 max-w-5xl">
          {data.headline}
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-slate-600 font-medium mb-10 max-w-2xl">
          {data.subHeadline}
        </p>

        {/* CTA */}
        <div className="flex flex-col items-center gap-4 mb-20">
          <button className="group bg-orange-400 hover:bg-orange-500 text-white text-lg md:text-xl font-bold py-4 px-10 rounded-full transition-all duration-300 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 flex items-center gap-2">
            {data.ctaText}
          </button>

          <div className="flex items-center gap-3 text-sm font-medium text-slate-400">
            <span>* {data.trustNote1}</span>
            <span className="h-4 w-px bg-orange-300"></span>
            <span>{data.trustNote2}</span>
          </div>
        </div>

        {/* Infinite Icon Loop */}
        <div className="w-full overflow-hidden py-4 relative">
          {/* Gradient fade effects */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10"></div>
          
          <div className="flex animate-scroll whitespace-nowrap">
            {loopFeatures.map((feature, index) => {
              const IconComponent = iconMap[feature.icon];
              return (
                <div
                  key={index}
                  className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-xl shadow-sm mx-2"
                >
                  <div className="p-2 bg-slate-100 rounded-md">
                    {IconComponent && <IconComponent className="w-5 h-5 text-slate-700" />}
                  </div>
                  <span className="text-slate-700 font-semibold text-sm md:text-base">
                    {feature.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Add CSS for animation */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 30s linear infinite;
          display: flex;
          width: max-content;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
        
        /* For better performance */
        .animate-scroll {
          will-change: transform;
        }
      `}</style>
    </div>
  );
};

export default WebHeroSection;
