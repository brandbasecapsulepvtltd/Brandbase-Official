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
  
  // Duplicate for infinite loop
  const loopFeatures = [...data.features, ...data.features];

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col items-center justify-center mt-10">
      <main className="w-full max-w-6xl px-4 py-16 md:py-24 flex flex-col items-center text-center">
        {/* Headline */}
        <h1 className="text-5xl lg:text-6xl leading-[0.95] font-black tracking-tight text-slate-900 uppercase mb-6 max-w-5xl">
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
        <div className="w-full overflow-hidden py-4">
          <div className="flex items-center gap-6 animate-scroll whitespace-nowrap">
            {loopFeatures.map((feature, index) => {
              const IconComponent = iconMap[feature.icon];
              return (
                <div
                  key={index}
                  className="flex items-center gap-2 px-5 py-2.5 bg-white border rounded-xl shadow-sm"
                >
                  <div className="p-2 bg-slate-200 rounded-md">
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
    </div>
  );
};

export default WebHeroSection;