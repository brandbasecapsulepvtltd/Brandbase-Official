"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import ReactLenis from "lenis/react"

const contrastItems = [
  {
    id: 1,
    do: {
      title: "Strategy First",
      text: "Every move has a purpose",
      src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
    },
    dont: {
      title: "Random Campaigns",
      text: "No guesswork marketing",
      src: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe"
    }
  },
  {
    id: 2,
    do: {
      title: "Brand-Led Growth",
      text: "We build brands, not noise",
      src: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6"
    },
    dont: {
      title: "One-Size Solutions",
      text: "Every brand is unique",
      src: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70"
    }
  },
  {
    id: 3,
    do: {
      title: "Data + Creativity",
      text: "Ideas backed by insights",
      src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71"
    },
    dont: {
      title: "Vanity Metrics",
      text: "Likes don’t equal growth",
      src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"
    }
  },
  {
    id: 4,
    do: {
      title: "Long-Term Impact",
      text: "Built to last, not fade",
      src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
    },
    dont: {
      title: "Shortcuts",
      text: "No quick wins or hacks",
      src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
    }
  },
  {
    id: 5,
    do: {
      title: "Clear Communication",
      text: "Simple, honest updates",
      src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c"
    },
    dont: {
      title: "Overcomplicate Work",
      text: "No unnecessary jargon",
      src: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b"
    }
  },
];

{/*
  {
    id: 6,
    do: {
      title: "Scalable Solutions",
      text: "Built to grow with you",
      src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40"
    },
    dont: {
      title: "Copy Competitors",
      text: "Originality over imitation",
      src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c"
    }
  },
  {
    id: 7,
    do: {
      title: "Honest Marketing",
      text: "Clear, ethical, transparent",
      src: "https://images.unsplash.com/photo-1523958203904-cdcb402031fd"
    },
    dont: {
      title: "Empty Promises",
      text: "No fake numbers or hype",
      src: "https://images.unsplash.com/photo-1492724441997-5dc865305da7"
    }
  },
  {
    id: 8,
    do: {
      title: "Client Partnership",
      text: "We grow with our clients",
      src: "https://images.unsplash.com/photo-1552664730-d307ca884978"
    },
    dont: {
      title: "Vendor Mindset",
      text: "We don’t just execute",
      src: "https://images.unsplash.com/photo-1521791136064-7986c2920216"
    }
  },
  {
    id: 9,
    do: {
      title: "Brand Consistency",
      text: "One voice everywhere",
      src: "https://images.unsplash.com/photo-1523289333742-be1143f6b766"
    },
    dont: {
      title: "Trend Chasing",
      text: "Relevance over virality",
      src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
    }
  },
  {
    id: 10,
    do: {
      title: "Measurable Results",
      text: "Track what matters",
      src: "https://images.unsplash.com/photo-1556155092-8707de31f9c4"
    },
    dont: {
      title: "Poor Follow-Through",
      text: "We finish what we start",
      src: "https://images.unsplash.com/photo-1507209696997-3c532be9b2b5"
    }
  }  
*/}

const StickyCard = ({ i, item, progress, range, targetScale }) => {
  // Animating the scale: it starts at 1 and slowly scales to targetScale as we scroll past it
  const scale = useTransform(progress, range, [1, targetScale])

  return (
    <div className="sticky top-10 h-screen flex items-center justify-center w-full px-4">
      <motion.div
        style={{ 
          scale,
          top: `calc(10% + ${i * 25}px)` // Optional: adds a slight offset to the top of the stack
        }}
        className="relative grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 w-full max-w-7xl h-[60vh] md:h-[70vh] origin-top"
      >
        {/* LEFT CARD (DO) */}
        <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-gray-100 h-full border border-gray-200">
          <img src={item.do.src} className="absolute inset-0 w-full h-full object-cover" alt="do" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white pb-12 px-6">
            <h4 className="text-3xl md:text-5xl font-bold mb-4 uppercase tracking-tighter">{item.do.title}</h4>
            <p className="text-sm md:text-lg opacity-90 max-w-md">{item.do.text}</p>
          </div>
        </div>

        {/* RIGHT CARD (DONT) */}
        <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-gray-100 h-full border border-gray-200">
          <img src={item.dont.src} className="absolute inset-0 w-full h-full object-cover grayscale contrast-125" alt="dont" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white pb-12 px-6">
            <h4 className="text-3xl md:text-5xl font-bold mb-4 uppercase tracking-tighter">{item.dont.title}</h4>
            <p className="text-sm md:text-lg opacity-90 italic max-w-md">“{item.dont.text}”</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

const DoAndDont = () => {
  const container = useRef(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  })

  return (
    <ReactLenis root>
      <section ref={container} className="relative bg-white dark:bg-zinc-900 dark:bg-black">
        
        {/* --- STICKY HEADER --- */}
        <div className="sticky top-0 z-[60] bg-white dark:bg-zinc-900 dark:bg-black/90 backdrop-blur-md border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 py-8 text-center">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-gray-900 dark:text-gray-100 dark:text-gray-100 mb-6">
              OUR <span className="text-[#FF6600]">PRINCIPLES</span>
            </h2>
            
            <div className="grid grid-cols-2 gap-10 relative">
              <h3 className="text-sm md:text-2xl font-bold uppercase text-[#FF6600]">What We Do</h3>
              <h3 className="text-sm md:text-2xl font-bold uppercase text-gray-900 dark:text-gray-100 dark:text-gray-100">What We Don't</h3>
              
              {/* Progress Bar Underneath Labels */}
              <div className="absolute -bottom-4 left-0 w-full h-[3px] bg-gray-100">
                <motion.div 
                  style={{ scaleX: scrollYProgress }} 
                  className="absolute inset-0 bg-orange-100 origin-left" 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Vertical Center Line */}
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-px h-full bg-orange-100 hidden md:block z-10" />

        {/* --- STACKING CARDS --- */}
        <div className="relative">
          {contrastItems.map((item, i) => {
            // Updated Scale Logic: 
            // This ensures each card only shrinks slightly (to 0.95 or 0.9) 
            // instead of becoming tiny based on total item count.
            const targetScale = 1 - ( (contrastItems.length - i) * 0.02 ); 
            
            return (
              <StickyCard
                key={item.id}
                i={i}
                item={item}
                progress={scrollYProgress}
                // Each card animates scale based on its position in the array
                range={[i * (1 / contrastItems.length), 1]}
                targetScale={targetScale}
              />
            )
          })}
        </div>
        
        {/* Spacer for the last card to feel finished */}
        <div className="h-[30vh]" />
      </section>
    </ReactLenis>
  )
}

export default DoAndDont;
