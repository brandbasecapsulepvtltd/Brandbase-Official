import React, { useState, useEffect, useRef } from "react";

export default function StallDesignHero() {
  const [videoScale, setVideoScale] = useState(0);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [isHovered, setIsHovered] = useState(false);
  const animationRef = useRef(null);
  const scopeRef = useRef(null);
  const contentWidthRef = useRef(0);
  const isMobile = screenWidth < 768;

  // Carousel content
  const carouselContent = [
    "🏆 Award-Winning Stall Designs",
    "🎯 85B+ Views Across Platforms", 
    "🚀 Iconic Brand Campaigns",
    "💫 Culture-Defining Digital Shows",
    "🤝 Impossible Collabs Made Possible",
    "⭐ Trusted by Top Global Brands",
    "🎨 Creative Excellence Since Inception"
  ];

  // Carousel animation setup
  useEffect(() => {
    const element = scopeRef.current;
    if (!element) return;

    const updateContentWidth = () => {
      contentWidthRef.current = element.scrollWidth / 2;
    };

    updateContentWidth();
    window.addEventListener("resize", updateContentWidth);

    let animationId = null;
    let position = 0;
    const baseSpeed = 1.5;
    let currentSpeed = baseSpeed;

    const animate = () => {
      position -= currentSpeed;
      if (Math.abs(position) >= contentWidthRef.current) {
        position = 0;
      }
      element.style.transform = `translateX(${position}px)`;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    animationRef.current = {
      setSpeed: (speed) => {
        currentSpeed = speed;
      },
      stop: () => {
        if (animationId) cancelAnimationFrame(animationId);
      },
    };

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      window.removeEventListener("resize", updateContentWidth);
    };
  }, []);

  // Carousel hover effect
  useEffect(() => {
    if (animationRef.current) {
      const targetSpeed = isHovered ? 0.3 : 2.0;
      animationRef.current.setSpeed(targetSpeed);
    }
  }, [isHovered]);

  // Render carousel content
  const renderCarouselContent = carouselContent.map((text, i) => (
    <div className="flex items-center gap-8" key={i}>
      <span className="text-white text-xl md:text-5xl font-semibold transition-all duration-300 group-hover:text-yellow-400 group-hover:scale-105">
        {text}
      </span>
    </div>
  ));

  // Resize handler
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Scroll effect (only for desktop)
  useEffect(() => {
    if (isMobile) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = window.innerHeight * 0.8;
      const progress = Math.min(scrollY / maxScroll, 1);
      setVideoScale(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  /* ---------------------------
       DYNAMIC WIDTH (Desktop only)
  ----------------------------*/
  const baseWidth = 260;
  const maxWidth = screenWidth * 0.9;
  const currentWidth = isMobile ? screenWidth * 0.85 : baseWidth + videoScale * (maxWidth - baseWidth);

  /* ---------------------------
      POSITION ADJUSTMENTS
  ----------------------------*/
  const startRightOffset = 15;
  const endRightOffset = 50;
  const currentRight = isMobile ? 50 : startRightOffset + videoScale * (endRightOffset - startRightOffset);

  const startTopOffset = 30;
  const endTopOffset = 60;
  const currentTop = isMobile ? 50 : startTopOffset - videoScale * (startTopOffset - endTopOffset);

  return (
    <div className={`relative w-full ${isMobile ? 'min-h-screen' : 'min-h-[1500px]'} bg-black overflow-hidden`}>

      {/* GOLD GRADIENT */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at top right, rgba(255,215,0,0.55), transparent 60%)",
        }}
      />

      {/* MAIN TEXT */}
      <div className={`relative z-[5] max-w-[1400px] mx-auto px-4 sm:px-6 ${isMobile ? 'pt-8 pb-8' : 'pt-24 sm:pt-32 pb-20 sm:pb-32'}`}>

        <h1
          className="text-white font-bold leading-[0.9]"
          style={{
            fontSize: isMobile ? "clamp(32px, 10vw, 48px)" : "clamp(42px, 8vw, 120px)",
            letterSpacing: "-1px",
          }}
        >
          India's Largest <br /> Creator Business
        </h1>

        <p className={`text-gray-300 ${isMobile ? 'text-sm mt-4' : 'text-base sm:text-lg md:text-xl mt-6 sm:mt-10'} max-w-[650px]`}>
          85B+ views, iconic campaigns, impossible collabs, and culture-defining
          digital shows with top global brands.
        </p>

        <h2 className={`text-white ${isMobile ? 'text-base mt-6' : 'text-lg sm:text-xl md:text-2xl mt-8 sm:mt-12'} flex items-center gap-2`}>
          The Proof is in the Work 👀
        </h2>

        {/* Brand Slider */}
        <div className={`w-full overflow-hidden ${isMobile ? 'mt-8' : 'mt-20 sm:mt-20'}`}>
          <div className="flex gap-10 sm:gap-20 animate-scroll whitespace-nowrap opacity-60">
            {["boAt", "Flipkart", "Sprite", "Nykaa", "Licious", "Vivo"].map(
              (brand, index) => (
                <span
                  key={index}
                  className={`text-gray-400 ${isMobile ? 'text-2xl' : 'text-3xl sm:text-5xl md:text-6xl'} font-semibold`}
                >
                  {brand}
                </span>
              )
            )}
          </div>
        </div>
      </div>

      {/* RESPONSIVE VIDEO BOX */}
      <div
        className={`${isMobile ? 'relative' : 'absolute'} z-[10] transition-all duration-[600ms] ease-out ${isMobile ? 'mx-auto my-8' : ''}`}
        style={isMobile ? {
          width: `${currentWidth}px`,
          maxWidth: "90vw",
        } : {
          top: `${currentTop}%`,
          right: `${currentRight}%`,
          transform: "translateY(-50%) translateX(50%)",
          width: `${currentWidth}px`,
          maxWidth: "100vw",
        }}
      >
        <div className="bg-black/40 backdrop-blur-md rounded-xl shadow-xl p-2">
          <video
            className="rounded-lg w-full object-cover"
            src="https://res.cloudinary.com/dkoqcp1g9/video/upload/Vasant_Creative_Exhibition_Stall_Designer_for_MATECIA_Award-Winning_Stall_Design_Company_qwnwdx.mp4"
            autoPlay
            muted
            loop
            playsInline
          />
        </div>
      </div>

      {/* CAROUSEL SECTION */}
      <section className={`${isMobile ? 'relative mt-8' : 'absolute bottom-20'} left-0 right-0 py-10 bg-transparent overflow-hidden z-[5]`}>
        {/* Gradient fade for pro look */}
        <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-black to-transparent z-10"></div>
        <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-black to-transparent z-10"></div>

        <div className="overflow-x-clip p-4 flex">
          <div
            ref={scopeRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="flex flex-none gap-16 pr-16 group cursor-pointer transition-all duration-500"
            style={{ willChange: "transform" }}
          >
            {/* Duplicated content for smooth infinite scroll */}
            {renderCarouselContent}
            {renderCarouselContent}
          </div>
        </div>
      </section>
    </div>
  );
}