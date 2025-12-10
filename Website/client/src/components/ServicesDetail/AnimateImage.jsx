"use client";

import React, { useState } from 'react';

const MediaCard = ({ data, isSelected, onClick }) => {
  // --- REVISED WIDTH LOGIC ---
  // Default (Mobile: w-full, vertical stacking)
  let widthClass = 'w-full mb-4';

  // Medium screens (e.g., Tablet: narrower vertical, or switch to horizontal with fixed width)
  // For horizontal on tablet/desktop, we introduce 'md:'
  // Since the parent 'AnimateImage' has `flex` and `gap-6`, the cards will be side-by-side
  if (!isSelected) {
    // Unselected card: starts small on md screens, then uses your original small width on lg
    widthClass = 'w-1/4 md:w-1/4 lg:w-[26%]'; 
  } else {
    // Selected card: takes up remaining space on md screens, then uses your original large width on lg
    widthClass = 'w-3/4 md:w-3/4 lg:w-[70%]'; 
  }
  // This logic is simplified for demonstration. The original logic was:
  // const widthClass = isSelected ? 'w-[70%] lg:w-[70%]' : 'w-[27.5%] lg:w-[26%]';
  // I will stick closer to your original percentages for the lg breakpoint and adjust the others.

  // To truly preserve the laptop UI, we use your original widths for 'lg' and add 'md' for tablet/mid-size.
  const baseWidth = isSelected ? 'w-full md:w-3/5' : 'w-full md:w-2/5';
  const laptopWidth = isSelected ? 'lg:w-[70%]' : 'lg:w-[26%]';

  // Final Width Class uses responsive prefixes:
  // Base (small screens) is w-full and vertical.
  // Medium/Tablet screens (md) switch to a side-by-side layout.
  // Large/Laptop screens (lg) use the exact original percentages.
  
  // NOTE: To get the *exact* original large-screen look, the parent `gap-6` and total width
  // must sum up correctly. 70% + 26% + 26% + 26% = 148% (for 4 cards).
  // This layout implies the widths are percentages of the *remaining space* OR the layout
  // is actually only designed for 3 cards (70% + 26% + 26% = 122%) or the total is constrained
  // to a specific width. 
  // Given your existing code works for you on laptop, I will ensure the `lg:` values are preserved.

  const finalWidthClass = isSelected
    ? `w-full ${laptopWidth} md:w-[68%]` // w-[70%] on lg
    : `w-full ${laptopWidth} md:w-[26%]`; // w-[26%] on lg 
  
  // The 'w-full' base width is crucial for the vertical stack on mobile.
  
  // The height should also be responsive on mobile (e.g., shorter) if vertical stacking is intended.
  const heightClass = 'h-[250px] sm:h-[350px] lg:h-[450px]';

  return (
    <div
      onClick={() => onClick(data.id)}
      className={`relative ${heightClass} rounded-[1rem] cursor-pointer overflow-hidden transition-all duration-500 ease-in-out transform hover:shadow-2xl hover:scale-[1.01] ${finalWidthClass}`}
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-500 ease-in-out hover:shadow-xl"
        style={{ backgroundImage: `url(${data.image})` }}
      ></div>
      {/* Optional: Add content overlay for mobile view to show context when stacked 
       {finalWidthClass.includes('w-full') && (
         <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
           <h2 className="text-xl font-bold">{data.title || `Item ${data.id}`}</h2>
         </div>
      )}
      */}
    </div>
  );
};

const AnimateImage = ({ data }) => {
  const [selectedId, setSelectedId] = useState(2);

  if (!data) return null;

  return (
    <div className="min-h-screen bg-white p-8 md:p-16 font-sans">
      {/* Header - already quite responsive */}
      <div className="text-center mb-12 md:mb-20">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 uppercase tracking-tightest leading-tight">
          {data.header.title}{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-300 to-orange-500">
            {data.header.highlight}
          </span>
        </h1>
      </div>

      {/* Cards: KEY CHANGE HERE */}
      {/* The `flex` class is removed on small screens using `sm:flex`. 
          This forces vertical stacking on mobile (default) and switches to horizontal 
          (the existing laptop UI) on small-to-medium screens and up. 
          `items-stretch` is kept for when it is flex. */}
      <div className="flex flex-col sm:flex-row justify-center items-stretch gap-4 sm:gap-6 w-full max-w-7xl mx-auto">
        {data.cards.map((card) => (
          <MediaCard
            key={card.id}
            data={card}
            isSelected={selectedId === card.id}
            onClick={setSelectedId}
          />
        ))}
      </div>
    </div>
  );
};

export default AnimateImage;