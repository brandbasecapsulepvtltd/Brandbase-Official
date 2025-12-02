import React, { useState, useEffect, useRef } from 'react';

// Custom Hook to calculate the element's position relative to the viewport center
const useCenterProximity = (ref) => {
  const [scale, setScale] = useState(0.9); // Initial scale (90%)

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      const element = ref.current;
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calculate the center of the element relative to the viewport top
      const elementCenter = rect.top + rect.height / 2;
      
      // Calculate the center of the viewport
      const viewportCenter = viewportHeight / 2;
      
      // Calculate the absolute distance from the center
      const distance = Math.abs(viewportCenter - elementCenter);
      
      // Define a influence zone (e.g., 500px around the center)
      const influenceZone = 500; 
      
      // Normalize the distance (0 when at center, 1 when outside influenceZone)
      let normalizedDistance = Math.min(distance, influenceZone) / influenceZone;
      
      // Map normalized distance (0 to 1) to a scale factor (1.0 to 0.9)
      // When normalizedDistance is 0 (center), scale is 1.0 (full width)
      // When normalizedDistance is 1 (outside), scale is 0.9 (reduced width)
      const newScale = 1.0 - (normalizedDistance * 0.1); 

      setScale(newScale);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [ref]);

  return scale;
};


const VisionBanner = () => {
  const bannerRef = useRef(null);
  const scale = useCenterProximity(bannerRef);

  const data = {
    heading:
      "Your website is like a pizza – if it’s not delivered fresh and loaded with the right ingredients, it’s just not satisfying. Let's make it delicious together.",
    imageUrl:
      "https://png.pngtree.com/thumb_back/fh260/background/20231004/pngtree-a-conceptual-illustration-of-web-design-development-and-seo-optimization-in-image_13584944.png",
  };

  return (
    // Outer container ensures the full viewport width is available for the scaling element
    <div className="p-4 mx-auto my-12 overflow-hidden">
      
      {/* Component Reference and Dynamic Scaling */}
      <div 
        ref={bannerRef}
        className="relative w-full overflow-hidden rounded-xl min-h-[300px] flex items-center justify-center transition-transform duration-100 ease-out mx-auto max-w-7xl"
        style={{ transform: `scale(${scale})` }}
      >

        {/* Background Image */}
        <img
          src={data.imageUrl}
          alt="Web design background"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content */}
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