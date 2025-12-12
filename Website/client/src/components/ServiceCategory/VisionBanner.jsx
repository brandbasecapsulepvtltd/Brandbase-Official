import React, { useState, useEffect, useRef } from 'react';

const useCenterProximity = (ref) => {
  const [scale, setScale] = useState(0.9);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      const element = ref.current;
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = viewportHeight / 2;
      const distance = Math.abs(viewportCenter - elementCenter);
      const influenceZone = 500;
      let normalizedDistance = Math.min(distance, influenceZone) / influenceZone;
      const newScale = 1.0 - (normalizedDistance * 0.1);

      setScale(newScale);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [ref]);

  return scale;
};

const VisionBanner = ({ data }) => {
  const bannerRef = useRef(null);
  const scale = useCenterProximity(bannerRef);

  return (
    <div className="p-4 mx-auto my-12 overflow-hidden">
      <div 
        ref={bannerRef}
        className="relative w-full overflow-hidden rounded-xl min-h-[300px] flex items-center justify-center transition-transform duration-100 ease-out mx-auto max-w-7xl"
        style={{ transform: `scale(${scale})` }}
      >
        <img
          src={data.imageUrl}
          alt="Web design background"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center px-6 py-12 md:px-24">
          <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight tracking-tight max-w-full mx-auto">
            {data.heading}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default VisionBanner;