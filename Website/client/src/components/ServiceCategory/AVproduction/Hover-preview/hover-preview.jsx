"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";

const previewData = {
  commercial: {
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=560&h=320&fit=crop&auto=format",
    title: "Commercial Production",
    subtitle: "High-impact ads for TV, web, and social media",
  },
  corporate: {
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=560&h=320&fit=crop&auto=format",
    title: "Corporate Videos",
    subtitle: "Brand storytelling and company presentations",
  },
  animation: {
    image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=560&h=320&fit=crop&auto=format",
    title: "Motion Graphics",
    subtitle: "2D/3D animation and visual effects",
  },
};

const styles = `


  .hover-preview-container {
    min-height: 100vh;
    background: #ffffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px;

    overflow-x: hidden;
    position: relative;
  }

  .hover-preview-container::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    opacity: 0.02;
    pointer-events: none;
    z-index: 9999;
  }

  .ambient-glow {
    position: fixed;
    width: 600px;
    height: 600px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(59, 130, 246, 0.05) 0%, transparent 70%);
    pointer-events: none;
    z-index: -1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: pulse 8s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
    50% { opacity: 0.5; transform: translate(-50%, -50%) scale(1.1); }
  }

  .content-container {
    max-width: 900px;
    width: 100%;
  }

  .text-block {
    font-size: clamp(1.5rem, 4vw, 2.5rem);
    line-height: 1.6;
    color: #333;
    font-weight: 400;
    letter-spacing: -0.02em;
  }

  .text-block p {
    margin-bottom: 1.5em;
    opacity: 0;
    animation: fadeUp 0.8s ease forwards;
  }

  .text-block p:nth-child(1) { animation-delay: 0.2s; }
  .text-block p:nth-child(2) { animation-delay: 0.4s; }
  .text-block p:nth-child(3) { animation-delay: 0.6s; }

  @keyframes fadeUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .hover-link {
    color: #1a1a1a;
    font-weight: 700;

    cursor: pointer;
    position: relative;
    display: inline-block;
    transition: color 0.3s ease;
  }

  .hover-link::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #3b82f6, #8b5cf6, #10b981);
    transition: width 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .hover-link:hover::after {
    width: 100%;
  }

  .preview-card {
    position: fixed;
    pointer-events: none;
    z-index: 1000;
    opacity: 0;
    transform: translateY(10px) scale(0.95);
    transition: opacity 0.25s ease, transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
    will-change: transform, opacity;
  }

  .preview-card.visible {
    opacity: 1;
    transform: translateY(0) scale(1);
  }

  .preview-card-inner {
    background: #ffffff;
    border-radius: 16px;
    padding: 8px;
    box-shadow: 
      0 25px 50px -12px rgba(0, 0, 0, 0.15),
      0 0 0 1px rgba(0, 0, 0, 0.05),
      0 0 60px rgba(59, 130, 246, 0.08);
    overflow: hidden;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(0, 0, 0, 0.1);
  }

  .preview-card img {
    width: 280px;
    height: auto;
    border-radius: 10px;
    display: block;
  }

  .preview-card-title {
    padding: 12px 8px 8px;
    font-size: 0.85rem;
    color: #1a1a1a;
    font-weight: 600;

  }

  .preview-card-subtitle {
    padding: 0 8px 8px;
    font-size: 0.75rem;
    color: #666;
  }
`;

const HoverLink = ({
  previewKey,
  children,
  onHoverStart,
  onHoverMove,
  onHoverEnd,
}) => {
  return (
    <span
      className="hover-link"
      onMouseEnter={(e) => onHoverStart(previewKey, e)}
      onMouseMove={onHoverMove}
      onMouseLeave={onHoverEnd}
    >
      {children}
    </span>
  );
};

const PreviewCard = ({ data, position, isVisible, cardRef }) => {
  if (!data) return null;

  return (
    <div
      ref={cardRef}
      className={`preview-card ${isVisible ? "visible" : ""}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <div className="preview-card-inner">
        <img
          src={data.image || "/placeholder.svg"}
          alt={data.title || ""}
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <div className="preview-card-title">{data.title}</div>
        <div className="preview-card-subtitle">{data.subtitle}</div>
      </div>
    </div>
  );
};

export function HoverPreview() {
  const [activePreview, setActivePreview] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  // Preload all images on mount
  useEffect(() => {
    Object.values(previewData).forEach((data) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = data.image;
    });
  }, []);

  const updatePosition = useCallback((e) => {
    const cardWidth = 300;
    const cardHeight = 250; // Approximate card height
    const offsetY = 20; // Gap between cursor and card bottom

    // Position card so its bottom-left is above the cursor
    let x = e.clientX - cardWidth / 2; // Center horizontally on cursor
    let y = e.clientY - cardHeight - offsetY; // Position above cursor

    // Boundary checks - keep card on screen
    if (x + cardWidth > window.innerWidth - 20) {
      x = window.innerWidth - cardWidth - 20;
    }
    if (x < 20) {
      x = 20;
    }

    // If card would go above viewport, position below cursor instead
    if (y < 20) {
      y = e.clientY + offsetY;
    }

    setPosition({ x, y });
  }, []);

  const handleHoverStart = useCallback(
    (key, e) => {
      setActivePreview(previewData[key]);
      setIsVisible(true);
      updatePosition(e);
    },
    [updatePosition]
  );

  const handleHoverMove = useCallback(
    (e) => {
      if (isVisible) {
        updatePosition(e);
      }
    },
    [isVisible, updatePosition]
  );

  const handleHoverEnd = useCallback(() => {
    setIsVisible(false);
  }, []);

  return (
    <>
      <style>{styles}</style>
      <div className="hover-preview-container">
        <div className="ambient-glow" />

        <div className="content-container">
          <div className="text-block">
            <p>
              We specialize in{" "}
              <HoverLink
                previewKey="commercial"
                onHoverStart={handleHoverStart}
                onHoverMove={handleHoverMove}
                onHoverEnd={handleHoverEnd}
              >
                commercial video production
              </HoverLink>{" "}
              that captures attention and drives results.
            </p>

            <p>
              Elevate your brand with our{" "}
              <HoverLink
                previewKey="corporate"
                onHoverStart={handleHoverStart}
                onHoverMove={handleHoverMove}
                onHoverEnd={handleHoverEnd}
              >
                corporate video services
              </HoverLink>{" "}
              or bring ideas to life through our{" "}
              <HoverLink
                previewKey="animation"
                onHoverStart={handleHoverStart}
                onHoverMove={handleHoverMove}
                onHoverEnd={handleHoverEnd}
              >
                motion graphics
              </HoverLink>{" "}
              and animation.
            </p>

            <p>
              From concept to final delivery, we craft visual stories that
              engage audiences and achieve business objectives.
            </p>
          </div>
        </div>

        <PreviewCard
          data={activePreview}
          position={position}
          isVisible={isVisible}
          cardRef={cardRef}
        />
      </div>
    </>
  );
}
