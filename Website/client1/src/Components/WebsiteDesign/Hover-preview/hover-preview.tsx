"use client"

import type React from "react"
import { useState, useCallback, useRef, useEffect } from "react"

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
}

const HoverLink = ({
  previewKey,
  children,
  onHoverStart,
  onHoverMove,
  onHoverEnd,
}: {
  previewKey: string
  children: React.ReactNode
  onHoverStart: (key: string, e: React.MouseEvent) => void
  onHoverMove: (e: React.MouseEvent) => void
  onHoverEnd: () => void
}) => {
  return (
    <span
      className="relative inline-block cursor-pointer font-bold font-syne text-gray-900 transition-colors duration-300 hover:text-blue-600"
      onMouseEnter={(e) => onHoverStart(previewKey, e)}
      onMouseMove={onHoverMove}
      onMouseLeave={onHoverEnd}
    >
      {children}
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 transition-all duration-400 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:w-full" />
    </span>
  )
}

const PreviewCard = ({
  data,
  position,
  isVisible,
  cardRef,
}: {
  data: (typeof previewData)[keyof typeof previewData] | null
  position: { x: number; y: number }
  isVisible: boolean
  cardRef: React.RefObject<HTMLDivElement | null>
}) => {
  if (!data) return null

  return (
    <div
      ref={cardRef}
      className={`fixed pointer-events-none z-50 opacity-0 scale-95 transition-all duration-250 ease-[cubic-bezier(0.34,1.56,0.64,1)] will-change-transform,opacity ${
        isVisible ? "opacity-100 scale-100" : ""
      }`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <div className="bg-white rounded-2xl p-2 shadow-2xl shadow-blue-500/10 overflow-hidden backdrop-blur-xl border border-gray-200">
        <img
          src={data.image || "/placeholder.svg"}
          alt={data.title || ""}
          className="w-[280px] h-auto rounded-lg block"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <div className="px-2 pt-3 pb-2">
          <div className="text-sm font-semibold font-syne text-gray-900">{data.title}</div>
          <div className="text-xs text-gray-600 mt-1">{data.subtitle}</div>
        </div>
      </div>
    </div>
  )
}

export function HoverPreview() {
  const [activePreview, setActivePreview] = useState<(typeof previewData)[keyof typeof previewData] | null>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  // Preload all images on mount
  useEffect(() => {
    Object.entries(previewData).forEach(([, data]) => {
      const img = new Image()
      img.crossOrigin = "anonymous"
      img.src = data.image
    })
  }, [])

  const updatePosition = useCallback((e: React.MouseEvent | MouseEvent) => {
    const cardWidth = 300
    const cardHeight = 250 // Approximate card height
    const offsetX = 15
    const offsetY = 20 // Gap between cursor and card bottom

    // Position card so its bottom-left is above the cursor
    let x = e.clientX - cardWidth / 2 // Center horizontally on cursor
    let y = e.clientY - cardHeight - offsetY // Position above cursor

    // Boundary checks - keep card on screen
    if (x + cardWidth > window.innerWidth - 20) {
      x = window.innerWidth - cardWidth - 20
    }
    if (x < 20) {
      x = 20
    }

    // If card would go above viewport, position below cursor instead
    if (y < 20) {
      y = e.clientY + offsetY
    }

    setPosition({ x, y })
  }, [])

  const handleHoverStart = useCallback(
    (key: string, e: React.MouseEvent) => {
      setActivePreview(previewData[key as keyof typeof previewData])
      setIsVisible(true)
      updatePosition(e)
    },
    [updatePosition],
  )

  const handleHoverMove = useCallback(
    (e: React.MouseEvent) => {
      if (isVisible) {
        updatePosition(e)
      }
    },
    [isVisible, updatePosition],
  )

  const handleHoverEnd = useCallback(() => {
    setIsVisible(false)
  }, [])

  return (
    <div className="relative min-h-screen bg-white flex items-center justify-center p-10 overflow-x-hidden">
      {/* Noise overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-40 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Ambient glow */}
      <div className="fixed w-[600px] h-[600px] rounded-full bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-transparent pointer-events-none -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse-slow" />

      <div className="max-w-6xl w-full">
        <div className="text-block">
          <p className="text-2xl md:text-3xl lg:text-4xl text-gray-800 font-space-grotesk leading-relaxed mb-8 opacity-0 animate-fade-up [animation-delay:200ms] [animation-fill-mode:forwards]">
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

          <p className="text-2xl md:text-3xl lg:text-4xl text-gray-800 font-space-grotesk leading-relaxed mb-8 opacity-0 animate-fade-up [animation-delay:400ms] [animation-fill-mode:forwards]">
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

          <p className="text-2xl md:text-3xl lg:text-4xl text-gray-800 font-space-grotesk leading-relaxed opacity-0 animate-fade-up [animation-delay:600ms] [animation-fill-mode:forwards]">
            From concept to final delivery, we craft visual stories that 
            engage audiences and achieve business objectives.
          </p>
        </div>
      </div>

      <PreviewCard data={activePreview} position={position} isVisible={isVisible} cardRef={cardRef} />
      
      {/* Add custom animations to tailwind.config.js or use CSS */}
      <style>{`
        @keyframes fade-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.3;
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            opacity: 0.5;
            transform: translate(-50%, -50%) scale(1.1);
          }
        }
        .animate-fade-up {
          animation: fade-up 0.8s ease forwards;
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}