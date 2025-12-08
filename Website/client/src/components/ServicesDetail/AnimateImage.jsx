"use client";

import React, { useState } from 'react';

const MediaCard = ({ data, isSelected, onClick }) => {
  const widthClass = isSelected ? 'w-[70%] lg:w-[70%]' : 'w-[27.5%] lg:w-[26%]';

  return (
    <div
      onClick={() => onClick(data.id)}
      className={`relative h-[450px] md:h-[450px] rounded-[1rem] cursor-pointer overflow-hidden transition-all duration-500 ease-in-out transform hover:shadow-2xl hover:scale-[1.01] ${widthClass}`}
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-500 ease-in-out hover:shadow-xl"
        style={{ backgroundImage: `url(${data.image})` }}
      ></div>
    </div>
  );
};

const AnimateImage = ({ data }) => {
  const [selectedId, setSelectedId] = useState(2);

  if (!data) return null;

  return (
    <div className="min-h-screen bg-white p-8 md:p-16 font-sans">
      {/* Header */}
      <div className="text-center mb-12 md:mb-20">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 uppercase tracking-tightest leading-tight">
          {data.header.title}{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-300 to-orange-500">
            {data.header.highlight}
          </span>
        </h1>
      </div>

      {/* Cards */}
      <div className="flex justify-center items-stretch gap-6 w-full max-w-7xl mx-auto">
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