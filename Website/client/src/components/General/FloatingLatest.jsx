'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Card Data ---
const cardData = {
  1: {
    title: "SHADWAY",
    description: "SHADCN WEBSITE COLLECTION",
    image: "https://shadway.online/og-image.png",
  },
  2: {
    title: "Rizz Ai",
    description: "Dating Ai wingmen",
    image: "https://wrizzai.online/og.png",
  },
  3: {
    title: "21st.dev",
    description: "Vibe Crafting Platform",
    image: "https://21st.dev/opengraph-image.png",
  },
};

const initialCards = [
  { id: 1, contentType: 1 },
  { id: 2, contentType: 2 },
  { id: 3, contentType: 3 },
];

const positionStyles = [
  { scale: 1, y: 0 },
  { scale: 0.95, y: -20 },
  { scale: 0.9, y: -40 },
];

// --- Sub-components ---

function CardContent({ contentType }) {
  const data = cardData[contentType];
  return (
    <div className="flex h-full w-full flex-col gap-3">
      <div className="flex h-[140px] w-full items-center justify-center overflow-hidden rounded-xl outline outline-black/10 dark:outline-white/10">
        <img
          src={data.image || "/placeholder.svg"}
          alt={data.title}
          className="h-full w-full select-none object-cover"
        />
      </div>
      <div className="flex w-full items-center justify-between gap-2 px-2 pb-2">
        <div className="flex min-w-0 flex-1 flex-col">
          <span className="truncate text-sm font-semibold text-gray-900 dark:text-white">{data.title}</span>
          <span className="truncate text-xs text-gray-500">{data.description}</span>
        </div>
        <button className="flex h-8 shrink-0 items-center gap-1 rounded-full bg-black px-3 text-xs font-medium text-white dark:bg-white dark:text-black">
          Read
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="M9.5 18L15.5 12L9.5 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}

const FloatingLatest = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cards, setCards] = useState(initialCards);
  const [nextId, setNextId] = useState(4);

  const toggleOpen = () => setIsOpen(!isOpen);

  const handleAnimate = (e) => {
    e.stopPropagation(); // Prevent closing the popup
    const nextContentType = ((cards[2].contentType % 3) + 1);
    setCards([...cards.slice(1), { id: nextId, contentType: nextContentType }]);
    setNextId((prev) => prev + 1);
  };

  return (
    <div className="fixed bottom-5 left-5 z-50 flex flex-col items-start">
      
      {/* Card Stack Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20, originX: 0, originY: 1 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="relative mb-6 flex flex-col items-center"
          >
            {/* The Stack Container */}
            <div className="relative h-[260px] w-[300px] sm:w-[350px]">
              <AnimatePresence initial={false}>
                {cards.slice(0, 3).map((card, index) => {
                  const { scale, y } = positionStyles[index] ?? positionStyles[2];
                  return (
                    <motion.div
                      key={card.id}
                      initial={index === 2 ? { y: -20, scale: 0.9, opacity: 0 } : false}
                      animate={{ y, scale, opacity: 1 }}
                      exit={{ y: 200, scale: 1, opacity: 0, zIndex: 10 }}
                      transition={{ type: "spring", duration: 0.6, bounce: 0.2 }}
                      style={{ zIndex: 3 - index }}
                      className="absolute bottom-0 left-0 right-0 flex h-[220px] flex-col items-center justify-center overflow-hidden rounded-2xl border border-gray-200 bg-white p-2 shadow-2xl dark:border-gray-800 dark:bg-zinc-900"
                    >
                      <CardContent contentType={card.contentType} />
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Action Button for the Stack */}
            <div className="z-20 -mt-4">
              <button
                onClick={handleAnimate}
                className="rounded-full border border-gray-200 bg-white px-4 py-1.5 text-xs font-bold shadow-sm transition-transform hover:scale-105 active:scale-95 dark:border-gray-700 dark:bg-zinc-800 dark:text-white"
              >
                Next Resource
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Globe Icon Button */}
      <button
        onClick={toggleOpen}
        className={`group relative flex h-17 w-17 items-center justify-center rounded-full bg-white shadow-xl transition-all duration-300 hover:scale-110 active:scale-90 dark:bg-zinc-900 ${
          isOpen ? 'ring-2 ring-orange-500' : ''
        }`}
        aria-label="Latest Resources"
      >
        <img
          src="https://ik.imagekit.io/vinayak06/Mavnox/BrandBase/globe-removebg-preview%20(1).png"
          alt="Resources Globe"
          className={`h-full w-full object-contain transition-transform duration-500 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
        />
        
        {/* Decorative Ring */}
        <span className="absolute inset-0 rounded-full border-2 border-orange-500/20 group-hover:border-orange-500/50"></span>
      </button>
    </div>
  );
};

export default FloatingLatest;