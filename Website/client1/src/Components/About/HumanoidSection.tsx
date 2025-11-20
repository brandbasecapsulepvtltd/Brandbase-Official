import React, { useEffect, useRef, useState } from "react";

const HumanoidSection = () => {
  const sectionRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ticking = useRef(false);
  const lastScrollY = useRef(0);

  // More responsive timing function with shorter duration - reduced height for mobile
  const cardStyle = {
    height: '50vh',
    maxHeight: '500px',
    borderRadius: '25px',
    transition: 'transform 0.5s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.5s cubic-bezier(0.19, 1, 0.22, 1)',
    willChange: 'transform, opacity'
  };

  // Desktop card style
  const desktopCardStyle = {
    ...cardStyle,
    height: '60vh',
    maxHeight: '600px'
  };

  useEffect(() => {
    // Create intersection observer to detect when section is in view
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    // Optimized scroll handler using requestAnimationFrame
    const handleScroll = () => {
      if (!ticking.current) {
        lastScrollY.current = window.scrollY;
        
        window.requestAnimationFrame(() => {
          if (!sectionRef.current) return;
          
          const sectionRect = sectionRef.current.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          const totalScrollDistance = viewportHeight * 2;
          
          // Calculate the scroll progress
          let progress = 0;
          if (sectionRect.top <= 0) {
            progress = Math.min(1, Math.max(0, Math.abs(sectionRect.top) / totalScrollDistance));
          }
          
          // Determine which card should be visible based on progress
          if (progress >= 0.66) {
            setActiveCardIndex(2);
          } else if (progress >= 0.33) {
            setActiveCardIndex(1);
          } else {
            setActiveCardIndex(0);
          }
          
          ticking.current = false;
        });
        
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Card visibility based on active index instead of direct scroll progress
  const isFirstCardVisible = isIntersecting;
  const isSecondCardVisible = activeCardIndex >= 1;
  const isThirdCardVisible = activeCardIndex >= 2;

  // Floating particles component
  const FloatingParticles = ({ count = 6, color = "rgba(255,102,0,0.1)" }) => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full opacity-60"
          style={{
            width: Math.random() * 8 + 4 + 'px',
            height: Math.random() * 8 + 4 + 'px',
            background: color,
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
            animationDelay: Math.random() * 2 + 's',
          }}
        />
      ))}
    </div>
  );

  // Animated grid pattern
  const GridPattern = ({ opacity = 0.1 }) => (
    <div 
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `
          linear-gradient(rgba(255,102,0,${opacity}) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,102,0,${opacity}) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
        animation: 'gridMove 20s linear infinite'
      }}
    />
  );

  // Geometric shapes
  const GeometricShapes = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-1/4 right-1/4 w-20 h-20 border border-[#FF6600]/20 rotate-45 animate-spin-slow" />
      <div className="absolute bottom-1/3 left-1/4 w-16 h-16 rounded-full border-2 border-[#FF6600]/15 animate-pulse" />
      <div className="absolute top-1/2 left-1/2 w-12 h-12 bg-gradient-to-r from-[#FF6600]/10 to-transparent rotate-45 animate-float" />
    </div>
  );

  return (
    <div 
      ref={sectionRef} 
      className="relative" 
      style={{ height: '300vh' }}
    >
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(40px, 40px); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-card-enter {
          animation: cardEnter 0.8s cubic-bezier(0.19, 1, 0.22, 1) forwards;
        }
        @keyframes cardEnter {
          from {
            opacity: 0;
            transform: translateY(60px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>

      <section className="w-full h-screen py-10 md:py-16 sticky top-0 overflow-hidden bg-white" id="why-brandbase">
        <div className="container mx-auto h-full flex flex-col">
          <div className="mb-2 md:mb-3">
            <div className="flex items-center gap-4 mb-2 md:mb-2 pt-8 sm:pt-6 md:pt-4">
              <div className="pulse-chip opacity-0 animate-fade-in" style={{
                animationDelay: "0.1s"
              }}>
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#FF6600] text-white mr-2">02</span>
                <span className="text-gray-700">Brandbase Capsule</span>
              </div>
            </div>
            
            <h2 className="section-title text-3xl sm:text-4xl md:text-5xl font-bold mb-1 md:mb-2 text-cente text-[#ff6600] py-2 translate-x-10">
              Why Choose Brandbase
            </h2>
          </div>
          
          <div ref={cardsContainerRef} className="relative flex-1 mt-5">
            {/* First Card - Digital Strategy */}
            <div 
              className={`absolute inset-0 overflow-hidden shadow-xl ${isFirstCardVisible ? 'animate-card-enter' : ''}`} 
              style={{
                ...cardStyle,
                ...(window.innerWidth >= 768 ? desktopCardStyle : {}),
                zIndex: 10,
                transform: `translateY(${isFirstCardVisible ? '90px' : '200px'}) scale(0.9)`,
                opacity: isFirstCardVisible ? 0.9 : 0
              }}
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 z-0"
                style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              
              {/* Light overlay for better text visibility */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-black/30 z-5" />
              
              {/* Grid pattern */}
              <GridPattern opacity={0.08} />
              
              {/* Floating particles */}
              <FloatingParticles count={8} color="rgba(255,102,0,0.2)" />
              
              {/* Geometric shapes */}
              <GeometricShapes />
              
              {/* Glow effects */}
              <div className="absolute top-0 left-1/4 w-32 h-32 bg-[#FF6600]/20 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-1/4 right-1/3 w-24 h-24 bg-orange-400/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
              
              <div className="absolute top-4 right-4 z-20">
                <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white border border-white/20">
                  <span className="text-sm font-medium">360° Strategy</span>
                </div>
              </div>
              
              <div className="relative z-10 p-5 sm:p-6 md:p-8 h-full flex items-center">
                <div className="max-w-lg">
                  <div className="mb-4 flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#FF6600] rounded-full animate-pulse" />
                    <span className="text-white text-sm uppercase tracking-wider font-semibold">Step 01</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
                    Comprehensive Digital Solutions
                  </h3>
                  <p className="text-white/90 text-lg leading-relaxed">
                    From web development to exhibition stall design - we provide end-to-end digital marketing services that drive real business growth and measurable results.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Second Card - Creative Excellence */}
            <div 
              className={`absolute inset-0 overflow-hidden shadow-xl ${isSecondCardVisible ? 'animate-card-enter' : ''}`} 
              style={{
                ...cardStyle,
                ...(window.innerWidth >= 768 ? desktopCardStyle : {}),
                zIndex: 20,
                transform: `translateY(${isSecondCardVisible ? activeCardIndex === 1 ? '55px' : '45px' : '200px'}) scale(0.95)`,
                opacity: isSecondCardVisible ? 1 : 0,
                pointerEvents: isSecondCardVisible ? 'auto' : 'none'
              }}
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 z-0"
                style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              
              {/* Light overlay for better text visibility */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/45 to-black/35 z-5" />
              
              {/* Grid pattern */}
              <GridPattern opacity={0.12} />
              
              {/* Floating particles */}
              <FloatingParticles count={10} color="rgba(255,102,0,0.25)" />
              
              {/* Circuit-like lines */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#FF6600]/30 to-transparent" />
                <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-400/25 to-transparent" />
                <div className="absolute left-1/4 top-0 w-px h-full bg-gradient-to-b from-transparent via-[#FF6600]/25 to-transparent" />
              </div>
              
              {/* Glow effects */}
              <div className="absolute top-1/3 left-1/4 w-40 h-40 bg-[#FF6600]/15 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-1/3 right-1/4 w-32 h-32 bg-orange-400/12 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
              
              <div className="absolute top-4 right-4 z-20">
                <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white border border-white/20">
                  <span className="text-sm font-medium">Creative Innovation</span>
                </div>
              </div>
              
              <div className="relative z-10 p-5 sm:p-6 md:p-8 h-full flex items-center">
                <div className="max-w-lg">
                  <div className="mb-4 flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#FF6600] rounded-full animate-pulse" />
                    <span className="text-white text-sm uppercase tracking-wider font-semibold">Step 02</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
                    Award-Winning Creative Team
                  </h3>
                  <p className="text-white/90 text-lg leading-relaxed">
                    Our creative experts blend cutting-edge design with strategic thinking to deliver stunning visuals that capture attention and convert audiences.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Third Card - Results Driven */}
            <div 
              className={`absolute inset-0 overflow-hidden shadow-xl ${isThirdCardVisible ? 'animate-card-enter' : ''}`} 
              style={{
                ...cardStyle,
                ...(window.innerWidth >= 768 ? desktopCardStyle : {}),
                zIndex: 30,
                transform: `translateY(${isThirdCardVisible ? activeCardIndex === 2 ? '15px' : '0' : '200px'}) scale(1)`,
                opacity: isThirdCardVisible ? 1 : 0,
                pointerEvents: isThirdCardVisible ? 'auto' : 'none'
              }}
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 z-0"
                style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              
              {/* Light overlay for better text visibility */}
              <div className="absolute inset-0 bg-gradient-to-tl from-black/50 to-black/40 z-5" />
              
              {/* Grid pattern */}
              <GridPattern opacity={0.15} />
              
              {/* Floating particles */}
              <FloatingParticles count={12} color="rgba(255,102,0,0.3)" />
              
              {/* Hexagonal pattern */}
              <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className="absolute top-1/4 left-1/3 w-16 h-16 border-2 border-[#FF6600]/30" style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)' }} />
                <div className="absolute bottom-1/3 right-1/4 w-12 h-12 border-2 border-orange-400/30" style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)' }} />
              </div>
              
              {/* Neural network lines */}
              <div className="absolute inset-0 pointer-events-none">
                <svg className="w-full h-full opacity-20" viewBox="0 0 400 600">
                  <defs>
                    <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgba(255,102,0,0.3)" />
                      <stop offset="100%" stopColor="rgba(255,165,0,0.3)" />
                    </linearGradient>
                  </defs>
                  <path d="M 50 100 Q 200 150 350 200 Q 200 250 50 300 Q 200 350 350 400" 
                        stroke="url(#neuralGradient)" strokeWidth="2" fill="none" />
                  <circle cx="50" cy="100" r="4" fill="rgba(255,102,0,0.4)" />
                  <circle cx="350" cy="200" r="4" fill="rgba(255,102,0,0.4)" />
                  <circle cx="50" cy="300" r="4" fill="rgba(255,102,0,0.4)" />
                  <circle cx="350" cy="400" r="4" fill="rgba(255,102,0,0.4)" />
                </svg>
              </div>
              
              {/* Glow effects */}
              <div className="absolute top-1/4 right-1/4 w-36 h-36 bg-[#FF6600]/15 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-1/4 left-1/3 w-28 h-28 bg-orange-400/12 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
              
              <div className="absolute top-4 right-4 z-20">
                <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white border border-white/20">
                  <span className="text-sm font-medium">Proven Results</span>
                </div>
              </div>
              
              <div className="relative z-10 p-5 sm:p-6 md:p-8 h-full flex items-center">
                <div className="max-w-lg">
                  <div className="mb-4 flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#FF6600] rounded-full animate-pulse" />
                    <span className="text-white text-sm uppercase tracking-wider font-semibold">Step 03</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
                    Data-Driven <span className="text-orange-500">Growth Strategies</span>
                  </h3>
                  <p className="text-white/90 text-lg leading-relaxed">
                    We combine analytics with creativity to deliver campaigns that not only look great but drive measurable business outcomes and ROI for your brand.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HumanoidSection;