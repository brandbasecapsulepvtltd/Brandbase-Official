"use client";
import { WorldMap } from "./map"; // Adjust this import if your path is different
import { motion } from "framer-motion";

export default function MapDemo() {
  return (
    <div className="py-40 bg-white w-full">
      <div className="max-w-7xl mx-auto text-center">
        <p className="font-bold text-xl md:text-4xl text-black">
          Global Network
        </p>
        <p className="text-sm md:text-lg text-gray-900 max-w-2xl mx-auto py-4">
          Connect with teams and clients worldwide. Our platform enables seamless 
          collaboration across continents, bringing the world to your workspace.
        </p>
      </div>
      <WorldMap
dots={[
  {
    start: {
      lat: 40.7128,
      lng: -74.006,
      label: "USA", // New York
    },
    end: {
      lat: 57.5074,
      lng: -0.1278,
      label: "UK", // London
    },
  },
  {
    start: {
      lat: 57.5074,
      lng: -0.1278,
      label: "UK",
    },
    end: {
      lat: 57.52,
      lng: 13.405,
      label: "Europe", // Berlin
    },
  },
  {
    start: {
      lat: 57.52,
      lng: 13.405,
      label: "Europe",
    },
    end: {
      lat: 24.7136,
      lng: 46.6753,
      label: "Saudi Arabia", // Riyadh
    },
  },
  {
    // Connection from Saudi Arabia to India
    start: {
      lat: 24.7136,
      lng: 46.6753,
      label: "Saudi Arabia",
    },
    end: {
      lat: 8.076,
      lng: 75.8777,
      label: "India", // Mumbai
    },
  },
  {
    // Connection from India to Singapore
    start: {
      lat: 8.076,
      lng: 75.8777,
      label: "India",
    },
    end: {
      lat: 1.3521,
      lng: 103.8198,
      label: "Singapore",
    },
  },
  {
    start: {
      lat: 1.3521,
      lng: 103.8198,
      label: "Singapore",
    },
    end: {
      lat: 40.7128,
      lng: -74.006,
      label: "USA", // New York
    },
  },
]}
      />
    </div>
  );
}