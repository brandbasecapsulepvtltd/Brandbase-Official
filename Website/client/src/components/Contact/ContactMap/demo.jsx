"use client";

import { WorldMap } from "./map";

export default function MapDemo() {
  return (
    <section className="py-16 md:py-24 bg-white dark:bg-zinc-950 w-full border-t border-gray-100 dark:border-zinc-800" aria-labelledby="world-map-heading">
      <div className="max-w-7xl mx-auto px-4 text-center mb-10">
        <h2 id="world-map-heading" className="font-bold text-2xl md:text-4xl text-gray-900 dark:text-white mb-4">
          Worldwide <span className="text-[#FF6600]">Presence</span>
        </h2>
        <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Delivering our services across the globe with consistency, creativity, and precision.
          No matter where you are, we bring world-class solutions right to your doorstep.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <WorldMap
          lineColor="#FF6600"
          dots={[
            {
              start: { lat: 40.7128, lng: -74.006, label: 'USA' },
              end: { lat: 51.5074, lng: -0.1278, label: 'UK' },
            },
            {
              start: { lat: 51.5074, lng: -0.1278, label: 'UK' },
              end: { lat: 50.1109, lng: 8.6821, label: 'Europe' },
            },
            {
              start: { lat: 50.1109, lng: 8.6821, label: 'Europe' },
              end: { lat: 24.7136, lng: 46.6753, label: 'Saudi Arabia' },
            },
            {
              start: { lat: 24.7136, lng: 46.6753, label: 'Saudi Arabia' },
              end: { lat: 19.076, lng: 72.8777, label: 'India' },
            },
            {
              start: { lat: 19.076, lng: 72.8777, label: 'India' },
              end: { lat: 1.3521, lng: 103.8198, label: 'Singapore' },
            },
            {
              start: { lat: 1.3521, lng: 103.8198, label: 'Singapore' },
              end: { lat: 40.7128, lng: -74.006, label: 'USA' },
            },
          ]}
        />
      </div>
    </section>
  );
}
