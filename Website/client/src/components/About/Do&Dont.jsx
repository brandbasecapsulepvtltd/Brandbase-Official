"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import ReactLenis from "lenis/react"



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

const DoAndDont = ({ content }) => {
  const { title, subtitle, items } = content || {};
  const container = useRef(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  })

  return (
    <ReactLenis root>
      <section ref={container} className="relative bg-white dark:bg-zinc-950">

        {/* --- STICKY HEADER --- */}
        <div className="sticky top-0 z-[60] bg-white dark:bg-zinc-950/90 backdrop-blur-md border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 py-8 text-center">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-gray-900 dark:text-white mb-6">
              {subtitle} <span className="text-[#FF6600]">{title}</span>
            </h2>

            <div className="grid grid-cols-2 gap-10 relative">
              <h3 className="text-sm md:text-2xl font-bold uppercase text-[#FF6600]">What We Do</h3>
              <h3 className="text-sm md:text-2xl font-bold uppercase text-gray-900 dark:text-white">What We Don't</h3>

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
          {items && items.map((item, i) => {
            // Updated Scale Logic: 
            // This ensures each card only shrinks slightly (to 0.95 or 0.9) 
            // instead of becoming tiny based on total item count.
            const targetScale = 1 - ((items.length - i) * 0.02);

            return (
              <StickyCard
                key={item.id}
                i={i}
                item={item}
                progress={scrollYProgress}
                // Each card animates scale based on its position in the array
                range={[i * (1 / items.length), 1]}
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
