"use client";
import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function AVHero() {
  const leaders = [
    { id: 1, initials: 'JD', color: 'bg-gray-700' },
    { id: 2, initials: 'SM', color: 'bg-blue-500' },
    { id: 3, initials: 'AR', color: 'bg-green-500' },
    { id: 4, initials: 'LP', color: 'bg-yellow-500' },
    { id: 5, initials: 'MK', color: 'bg-orange-500' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-8">
      <div className="max-w-4xl w-full">
        {/* Booking Status Badge */}
        <div className="flex justify-center mb-12">
          <div className="bg-white dark:bg-zinc-900 dark:bg-black rounded-full px-6 py-3 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-gray-800 dark:text-gray-200 dark:text-gray-200 font-medium">Booking Open — 2 Spots Left</span>
            </div>
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center mb-12">
          <h1 className="text-7xl font-bold mb-8 tracking-tight">
            <span className="text-black dark:text-white">Unlimited</span>
            <span className="mx-6 inline-block relative">
              {/* Icon placeholders - replace with actual images */}
              <div className="inline-flex gap-3 items-center">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-600 via-blue-500 to-cyan-500 rounded-xl shadow-lg transform -rotate-6"></div>
                <div className="w-20 h-20 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg transform rotate-6"></div>
              </div>
            </span>
            <span className="text-gray-400">Design</span>
          </h1>

          <h2 className="text-6xl font-bold text-gray-800 dark:text-gray-200 dark:text-gray-200 mb-8">
            for <span className="text-black dark:text-white">Solid Startups</span>
          </h2>

          {/* Description */}
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed">
            We help startups and brands create beautiful, functional products — fast and hassle-free.
          </p>

          {/* CTA Section */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <button className="bg-black text-white rounded-full px-8 py-4 font-bold text-lg hover:bg-gray-900 transition-colors flex items-center gap-2 group">
              Choose your plan
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Trusted by Leaders */}
            <div className="flex flex-col items-center gap-3">
              <div className="flex -space-x-4">
                {leaders.map((leader) => (
                  <div
                    key={leader.id}
                    className={`w-12 h-12 ${leader.color} rounded-full border-4 border-white flex items-center justify-center text-white font-bold text-sm shadow-md`}
                  >
                    {leader.initials}
                  </div>
                ))}
              </div>
              <span className="text-gray-700 dark:text-gray-300 font-medium">Trusted by Leaders</span>
            </div>
          </div>
        </div>
      </div>

      {/* Background Video Elements */}

    </div>
  );
}
