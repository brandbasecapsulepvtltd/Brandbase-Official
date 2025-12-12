"use client";

import { useState } from "react";

const images = [
  "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&h=600&fit=crop", // Commercial production - film set
  "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=600&fit=crop", // Corporate video - meeting
  "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&h=600&fit=crop", // Motion graphics - animation
  "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=800&h=600&fit=crop", // Live action - cinematic
  "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&h=600&fit=crop", // Product video - camera on products
  "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?w=800&h=600&fit=crop", // Documentary - interview setup
  "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&h=600&fit=crop", // Drone cinematography - aerial shot
  "https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=800&h=600&fit=crop", // Video editing - post production
  "https://th.bing.com/th/id/R.46da0b410a747ee5ef25217c72a7f5b9?rik=UzhiGPWPsk9DDg&riu=http%3a%2f%2fwww.proalley.com%2fblog%2fcontent%2fimages%2f2023%2f09%2fColor-Grading-vs-Color-Correction-Which-One-Do-You-Need-for-Your-Video.jpg&ehk=uskuap%2btpMLhB0Xf0QAekvhwikCF%2fr8QK5PuSj8oMcw%3d&risl=&pid=ImgRaw&r=0", // Color grading - color panels
];

const titles = [
  "Commercial Production",
  "Corporate Videos",
  "Motion Graphics",
  "Live Action",
  "Product Videos",
  "Documentary",
  "Drone Cinematography",
  "Video Editing",
  "Color Grading",
];

const ExpandOnHover = () => {
  const [expandedImage, setExpandedImage] = useState(3);

  const getImageWidth = (index: number) =>
    index === expandedImage ? "24rem" : "5rem";

  return (
    <div className="w-full h-screen bg-white">
      <div className="relative grid min-h-screen grid-cols-1 items-center justify-center p-2 transition-all duration-300 ease-in-out lg:flex w-full">
        <div className="w-full h-full overflow-hidden rounded-3xl">
          <div className="flex h-full w-full items-center justify-center overflow-hidden bg-white">
            <div className="relative w-full max-w-6xl px-5">
              <div className="flex w-full items-center justify-center gap-1">
                {images.map((src, idx) => (
                  <div
                    key={idx}
                    className="relative cursor-pointer overflow-hidden rounded-3xl transition-all duration-500 ease-in-out group"
                    style={{
                      width: getImageWidth(idx + 1),
                      height: "24rem",
                    }}
                    onMouseEnter={() => setExpandedImage(idx + 1)}
                  >
                    <img
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      src={src}
                      alt={titles[idx]}
                    />
                    
                    {/* Title Overlay - Only shows on expanded card */}
                    {idx + 1 === expandedImage && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent">
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <h3 className="text-white text-2xl font-bold opacity-0 translate-y-4 animate-[fadeUp_0.5s_ease-out_0.2s_forwards]">
                            {titles[idx]}
                          </h3>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpandOnHover;