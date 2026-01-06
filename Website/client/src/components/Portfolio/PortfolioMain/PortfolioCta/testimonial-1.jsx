"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { ArrowUp, TrendingUp, Target, BarChart3 } from "lucide-react";
import { useState } from "react";

export default function PortfolioResults() {
  const [hoveredImage, setHoveredImage] = useState(null);
  
  const results = [
    {
      percentage: "45%",
      label: "Increase in Lead Generation",
      isIncrease: true,
      icon: <TrendingUp className="w-5 h-5 text-green-500" />,
      description: "For e-commerce client campaigns",
    },
    {
      percentage: "60%",
      label: "Higher Engagement Rates",
      isIncrease: true,
      icon: <BarChart3 className="w-5 h-5 text-blue-500" />,
      description: "Across social media campaigns",
    },
    {
      percentage: "80%",
      label: "Client Retention Rate",
      isIncrease: true,
      icon: <Target className="w-5 h-5 text-[#FF6600]" />,
      description: "Long-term partnerships",
    },
    {
      percentage: "3.2X",
      label: "ROI Improvement",
      isIncrease: true,
      icon: <ArrowUp className="w-5 h-5 text-purple-500" />,
      description: "Average across all campaigns",
    },
  ];
  
  return (
    <div className="bg-white dark:bg-zinc-900 dark:bg-black min-h-screen w-full grid place-content-center py-16 px-4 md:px-8 lg:px-16 relative">
      <div className="max-w-6xl mx-auto">
        {/* Portfolio Results Badge */}
        <div className="flex justify-center mb-8">
          <div className="bg-[#FF6600]/10 text-[#FF6600] px-6 py-2 rounded-full text-sm uppercase tracking-wider font-semibold">
            Proven Results
          </div>
        </div>

        {/* Main Heading with Images */}
        <div className="text-center max-w-screen-xl mx-auto relative text-neutral-900 mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">
            Driving Tangible Results for
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="inline-block mx-3 align-middle relative group">
                    <div className="relative overflow-hidden w-14 h-14 md:w-16 md:h-16 rounded-full border-2 border-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <img
                        src={`https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face`}
                        alt="Marketing Director"
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white dark:bg-zinc-900 dark:bg-black px-3 py-1 rounded-full shadow-md text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Marketing Director
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="max-w-xs bg-white dark:bg-zinc-900 dark:bg-black text-black dark:text-white p-4 rounded-lg shadow-xl border border-gray-200"
                >
                  <p className="mb-2 text-sm text-gray-600 dark:text-gray-300">
                    "Brandbase Capsule transformed our digital presence, delivering a 300% increase in qualified leads within 6 months."
                  </p>
                  <p className="font-semibold text-sm text-gray-900 dark:text-gray-100 dark:text-gray-100">Sarah Chen</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Marketing Director, TechCorp</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            Global Brands
          </h1>

          <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-700 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Our strategic approach delivers measurable impact across
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="inline-block mx-3 align-middle relative group">
                    <div className="relative overflow-hidden w-14 h-14 md:w-16 md:h-16 rounded-full border-2 border-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <img
                        src={`https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face`}
                        alt="Business Owner"
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white dark:bg-zinc-900 dark:bg-black px-3 py-1 rounded-full shadow-md text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Business Owner
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="max-w-xs bg-white dark:bg-zinc-900 dark:bg-black text-black dark:text-white p-4 rounded-lg shadow-xl border border-gray-200"
                >
                  <p className="mb-2 text-sm text-gray-600 dark:text-gray-300">
                    "From concept to execution, their event management team created an unforgettable experience that exceeded all expectations."
                  </p>
                  <p className="font-semibold text-sm text-gray-900 dark:text-gray-100 dark:text-gray-100">Michael Rodriguez</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">CEO, Retail Innovations</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            digital marketing and event experiences
          </h2>
        </div>

        {/* Results Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {results.map((result, index) => (
            <div
              key={result.label}
              className="relative group"
            >
              <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl border border-gray-200 hover:border-[#FF6600] hover:shadow-lg transition-all duration-300 h-full">
                {/* Icon */}
                <div className="mb-4 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-[#FF6600]/10 transition-colors duration-300">
                    {result.icon}
                  </div>
                </div>
                
                {/* Percentage with Arrow */}
                <div className="flex items-center justify-center gap-2 mb-3">
                  <span className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 dark:text-gray-100">
                    {result.percentage}
                  </span>
                  {result.isIncrease && (
                    <ArrowUp className="w-6 h-6 text-green-500" />
                  )}
                </div>
                
                {/* Label */}
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 dark:text-gray-200 text-center mb-2">
                  {result.label}
                </h3>
                
                {/* Description */}
                <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
                  {result.description}
                </p>
                
                {/* Hover Effect Line */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 group-hover:w-16 h-0.5 bg-[#FF6600] transition-all duration-300"></div>
              </div>
              
              {/* Decorative Number */}
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                0{index + 1}
              </div>
            </div>
          ))}
        </div>

        {/* Portfolio Case Studies Preview */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 dark:text-gray-100 mb-4">
              Featured Portfolio Success Stories
            </h3>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Explore how we've helped businesses achieve their marketing and digital goals
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                category: "Digital Marketing",
                title: "E-commerce Growth Strategy",
                result: "450% Revenue Increase",
                color: "bg-blue-50 border-blue-100"
              },
              {
                category: "Event Management",
                title: "International Product Launch",
                result: "2,500+ Attendees",
                color: "bg-green-50 border-green-100"
              },
              {
                category: "Web Development",
                title: "Corporate Website Redesign",
                result: "75% Faster Load Times",
                color: "bg-orange-50 border-orange-100"
              }
            ].map((project, index) => (
              <div key={index} className={`${project.color} p-6 rounded-xl border`}>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">{project.category}</div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 dark:text-gray-100 mb-3">{project.title}</h4>
                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 dark:text-gray-100">{project.result}</div>
                <button className="mt-4 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-[#FF6600] transition-colors flex items-center gap-1">
                  View Case Study →
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
