import React, { useEffect, useRef, useState } from "react";

const CursorFollower = () => {
  const [scale, setScale] = useState(1);
  const [opacity, setOpacity] = useState(1);
  const [color, setColor] = useState("#f97316"); // orange-500
  const [isHidden, setIsHidden] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [trail, setTrail] = useState([]);

  const baseSize = 16;
  const trailLength = 6;

  const targetPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const dotRef = useRef(null);
  const trailRef = useRef([]);

  // Orange color palette
const orangeColors = {
  default: "#fb923c",   // Tailwind orange-400 (still light but richer)
  hover: "#fca66a",     // slightly darker hover
  click: "#f88c3a",     // mild click shade, not too dark
  text: "#f6934c",      // readable warm orange
  light: "#fecba7",     // soft background tone
  pale: "#ffe0c7"       // very light but a bit richer than before
};


  // Hide cursor when leaving window
  useEffect(() => {
    const handleMouseLeave = () => setIsHidden(true);
    const handleMouseEnter = () => setIsHidden(false);
    
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    
    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  // Update actual cursor position on mouse move
  useEffect(() => {
    const handleMouseMove = (e) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
      
      // Add to trail
      trailRef.current = [
        { x: e.clientX, y: e.clientY, time: Date.now() },
        ...trailRef.current.slice(0, trailLength - 1)
      ];
      setTrail(trailRef.current);
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Animate follower with smoothing
  useEffect(() => {
    const lerp = (start, end, factor) => start + (end - start) * factor;

    const animate = () => {
      currentPos.current.x = lerp(currentPos.current.x, targetPos.current.x, 0.15);
      currentPos.current.y = lerp(currentPos.current.y, targetPos.current.y, 0.15);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${currentPos.current.x}px, ${currentPos.current.y}px)`;
      }

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  // Click effects
  useEffect(() => {
    const handleClick = (e) => {
      // Main cursor click effect
      setScale(1.8);
      setColor(orangeColors.click);
      
      // Create ripple effect
      createRipple(e.clientX, e.clientY);
      
      setTimeout(() => {
        setScale(isPointer ? 1.5 : 1);
        setColor(isPointer ? orangeColors.hover : orangeColors.default);
      }, 150);
    };

    const createRipple = (x, y) => {
      const ripple = document.createElement("div");
      ripple.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: ${baseSize * 4}px;
        height: ${baseSize * 4}px;
        border: 2px solid ${orangeColors.default};
        border-radius: 50%;
        transform: translate(${x - baseSize * 2}px, ${y - baseSize * 2}px);
        pointer-events: none;
        z-index: 9998;
        animation: ripple 0.6s ease-out forwards;
      `;
      
      const style = document.createElement("style");
      style.textContent = `
        @keyframes ripple {
          0% {
            transform: translate(${x - baseSize * 2}px, ${y - baseSize * 2}px) scale(0.3);
            opacity: 1;
          }
          100% {
            transform: translate(${x - baseSize * 2}px, ${y - baseSize * 2}px) scale(2);
            opacity: 0;
          }
        }
      `;
      
      document.head.appendChild(style);
      document.body.appendChild(ripple);
      
      setTimeout(() => {
        document.body.removeChild(ripple);
        document.head.removeChild(style);
      }, 600);
    };

    window.addEventListener("click", handleClick);
    window.addEventListener("dblclick", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
      window.removeEventListener("dblclick", handleClick);
    };
  }, [isPointer]);

  // Detect hover on interactive elements
  useEffect(() => {
    const clickableSelectors = [
      "a",
      "button",
      "input",
      "select",
      "textarea",
      "[role='button']",
      "[tabindex]:not([tabindex='-1'])",
      "[onclick]",
      ".clickable",
      ".cursor-pointer"
    ];

    const textSelectors = [
      "p",
      "h1", "h2", "h3", "h4", "h5", "h6",
      "span",
      "li",
      "label",
      "[contenteditable='true']"
    ];

    const onMouseOver = (e) => {
      const target = e.target;
      
      // Check for clickable elements
      if (clickableSelectors.some(sel => target.closest(sel))) {
        setScale(2);
        setOpacity(0.9);
        setIsPointer(true);
        setColor(orangeColors.hover);
      }
      // Check for text elements
      else if (textSelectors.some(sel => target.closest(sel))) {
        setScale(1.3);
        setColor(orangeColors.text);
      }
    };

    const onMouseOut = (e) => {
      const target = e.target;
      
      if (clickableSelectors.some(sel => target.closest(sel)) || 
          textSelectors.some(sel => target.closest(sel))) {
        setScale(1);
        setOpacity(1);
        setIsPointer(false);
        setColor(orangeColors.default);
      }
    };

    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);

    return () => {
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, []);

  // Keyboard shortcuts for color cycling through orange shades
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === "c") {
        // Cycle through orange shades only
        const orangeShades = [
          "#f97316", // orange-500
          "#ea580c", // orange-600  
          "#c2410c", // orange-700
          "#9a3412", // orange-800
          "#7c2d12", // orange-900
          "#fdba74", // orange-300
        ];
        const currentIndex = orangeShades.indexOf(color);
        const nextColor = orangeShades[(currentIndex + 1) % orangeShades.length];
        setColor(nextColor);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [color]);

  return (
    <>
      {/* Trail dots - using lighter orange shades */}
      {trail.map((pos, index) => (
        <div
          key={index}
          className="fixed top-0 left-0 z-[9997] pointer-events-none rounded-full"
          style={{
            width: `${baseSize * (1 - index / trailLength)}px`,
            height: `${baseSize * (1 - index / trailLength)}px`,
            backgroundColor: orangeColors.pale,
            transform: `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`,
            opacity: (1 - index / trailLength) * 0.4,
            transition: "all 0.1s ease",
          }}
        />
      ))}
      
      {/* Main cursor */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{
          transition: "transform 0.08s ease-out",
          opacity: isHidden ? 0 : 1,
        }}
      >
        <div
          className="rounded-full"
          style={{
            width: `${baseSize}px`,
            height: `${baseSize}px`,
            backgroundColor: color,
            transform: `translate(-50%, -50%) scale(${scale})`,
            transformOrigin: "center center",
            opacity: opacity,
            transition: "all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            boxShadow: `0 0 8px ${color}40`,
            mixBlendMode: "difference",
          }}
        />
        
        {/* Outer ring for pointer state */}
        {isPointer && (
          <div
            className="absolute top-1/2 left-1/2 rounded-full border-2 pointer-events-none"
            style={{
              width: `${baseSize * 2.5}px`,
              height: `${baseSize * 2.5}px`,
              borderColor: color,
              transform: "translate(-50%, -50%)",
              animation: "pulse 2s infinite",
            }}
          />
        )}
      </div>

      {/* Add CSS for pulse animation */}
      <style jsx>{`
        @keyframes pulse {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          70% {
            transform: translate(-50%, -50%) scale(1.5);
            opacity: 0;
          }
          100% {
            transform: translate(-50%, -50%) scale(1.5);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
};

export default CursorFollower;
