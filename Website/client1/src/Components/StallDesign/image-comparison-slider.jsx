import React, { useState, useRef, useCallback, useEffect } from 'react';

export const ImageComparison = ({ beforeImage, afterImage, altBefore = 'Before', altAfter = 'After' }) => {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef(null);

    const handleMove = useCallback((clientX) => {
        if (!isDragging || !containerRef.current) return;
        
        const rect = containerRef.current.getBoundingClientRect();
        let newPosition = ((clientX - rect.left) / rect.width) * 100;
        newPosition = Math.max(0, Math.min(100, newPosition));
        setSliderPosition(newPosition);
    }, [isDragging]);

    const handleMouseDown = () => setIsDragging(true);
    const handleMouseUp = () => setIsDragging(false);
    const handleMouseMove = (e) => handleMove(e.clientX);
    
    const handleTouchStart = () => setIsDragging(true);
    const handleTouchEnd = () => setIsDragging(false);
    const handleTouchMove = (e) => handleMove(e.touches[0].clientX);

    useEffect(() => {
        window.addEventListener('mouseup', handleMouseUp);
        return () => {
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [handleMouseUp]);

    return (
        <div 
            ref={containerRef}
            className="relative w-full max-w-4xl mx-auto select-none rounded-xl overflow-hidden"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseUp}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {/* After Image (Top Layer) */}
            <div
                className="absolute top-0 left-0 h-full w-full overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
                <img
                    src={afterImage}
                    alt={altAfter}
                    className="h-full w-full object-cover object-left"
                    draggable="false"
                />
            </div>

            {/* Before Image (Bottom Layer) */}
            <img
                src={beforeImage}
                alt={altBefore}
                className="block h-full w-full object-cover object-left"
                draggable="false"
            />

            {/* Slider Handle */}
            <div
                className="absolute top-0 bottom-0 w-1.5 bg-orange-600/80 cursor-ew-resize flex items-center justify-center"
                style={{ left: `calc(${sliderPosition}% - 0.375rem)` }}
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
            >
                <div className={`bg-orange-600 rounded-full h-8 w-8 md:h-12 md:w-12 flex items-center justify-center shadow-md transition-all duration-200 ease-in-out ${isDragging ? 'scale-110 shadow-xl' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" md:width="24" md:height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <line x1="15" y1="18" x2="9" y2="12"></line>
                        <line x1="9" y1="6" x2="15" y2="12"></line>
                    </svg>
                </div>
            </div>

            {/* Labels 
                        <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium">
                Before
            </div>
            <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium">
                After
            </div>
            */}
        </div>
    );
};