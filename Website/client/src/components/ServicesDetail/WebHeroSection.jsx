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
    <div className="min-h-screen bg-white dark:bg-black font-sans flex flex-col items-center justify-center mt-15">
      <main className="w-full max-w-6xl px-4 pt-32 pb-16 md:pt-40 md:pb-24 flex flex-col items-center text-center">
        {/* Headline */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl leading-tight md:leading-snug font-bold tracking-normal text-slate-900 dark:text-white uppercase mb-8 max-w-5xl drop-shadow-sm">
          {data.headline}
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 font-medium leading-relaxed mb-12 max-w-3xl mx-auto">
          {data.subHeadline}
        </p>

        {/* CTA */}
        <div className="flex flex-col items-center gap-4 mb-20">
          <a
            href={data.ctaLink || "#"}
            className="group bg-[#FF6600] hover:bg-orange-600 text-white text-lg md:text-xl font-bold py-4 px-10 rounded-full transition-all duration-300 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 flex items-center gap-2"
          >
            {data.ctaText}
          </a>

          <div className="flex items-center gap-3 text-sm font-medium text-slate-400">
            <span>* {data.trustNote1}</span>
            <span className="h-4 w-px bg-orange-300"></span>
            <span>{data.trustNote2}</span>
          </div>
        </div>

        {/* Infinite Icon Loop */}
        <div className="w-full overflow-hidden py-4 relative">
          {/* Gradient fade effects */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white dark:from-black to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white dark:from-black to-transparent z-10"></div>

          <div className="flex animate-scroll hero-feature-scroll whitespace-nowrap">
            {loopFeatures.map((feature, index) => {
              const IconComponent = iconMap[feature.icon];
              return (
                <div
                  key={index}
                  className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-800 rounded-xl shadow-sm mx-2"
                >
                  <div className="p-2 bg-slate-100 dark:bg-zinc-800 rounded-md">
                    {IconComponent && <IconComponent className="w-5 h-5 text-slate-700 dark:text-slate-300" />}
                  </div>
                  <span className="text-slate-700 dark:text-slate-200 font-semibold text-sm md:text-base">
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
