"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import ReactLenis from "lenis/react"

const contrastItems = [
  { id: 1, do: { title: "World-class digital", text: "We build long-term roadmaps.", src: "https://img.freepik.com/premium-photo/abstract-digital-world-map-global-network-connectivity-concept_774065-1116.jpg" }, dont: { title: "sacrifice quality for profit", text: "We don't believe in burnout culture.", src: "https://images.hindustantimes.com/img/2022/09/17/550x309/5d939434-36b7-11ed-8444-8bd3a43ea4de_1663439709640.jpg" } },
  { id: 2, do: { title: "Celebrate Success", text: "We value milestones and rest.", src: "https://img.freepik.com/premium-photo/group-employees-celebrating-their-business-success_681354-2335.jpg" }, dont: { title: "Work on Weekends", text: "We don't believe in burnout culture.", src: "https://www.basharibrahim.com.au/wp-content/uploads/2020/07/Man-stressed-at-work.jpg" } },
  { id: 3, do: { title: "Data-Driven Decisions", text: "We rely on market intelligence.", src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80" }, dont: { title: "Blind Guesswork", text: "We don't gamble with your budget.", src: "https://www.psychologs.com/wp-content/uploads/2024/01/How-Does-Ego-Impact-Our-Mental-Health-960x520.jpg" } },
  { id: 4, do: { title: "Transparent Process", text: "You always know where we stand.", src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80" }, dont: { title: "EGOs", text: "We hate nasty surprises too.", src: "https://www.psychologs.com/wp-content/uploads/2024/01/How-Does-Ego-Impact-Our-Mental-Health-960x520.jpg" } },
  { id: 5, do: { title: "Party", text: "You always know where we stand.", src: "https://plus.unsplash.com/premium_photo-1683129651802-1c7ba429a137?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHBhcnR5fGVufDB8fDB8fHww" }, dont: { title: "Lose at Mario Kart", text: "We hate nasty surprises too.", src: "https://wallpaperaccess.com/full/1402239.jpg" } },
  { id: 6, do: { title: "Outstanding work", text: "Precision in every pixel.", src: "https://media.istockphoto.com/id/1364226181/vector/hand-holding-a-winning-trophy-while-people-clap-and-cheer.jpg?s=612x612&w=0&k=20&c=az6ck3Tjd-o5mX7zEnKjfUlz864q35ZZX7zSwrzmL6s=" }, dont: { title: "Over Promise", text: "Integrity over everything.", src: "https://substackcdn.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https://bucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com/public/images/9c323e94-3eef-4568-90bb-3f72847376be_1456x1048.png" } },
  // ... more items can be added here
]

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
            <h4 className="text-3xl md:text-5xl font-black mb-4 uppercase tracking-tighter">{item.do.title}</h4>
            <p className="text-sm md:text-lg opacity-90 max-w-md">{item.do.text}</p>
          </div>
        </div>

        {/* RIGHT CARD (DONT) */}
        <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-gray-100 h-full border border-gray-200">
          <img src={item.dont.src} className="absolute inset-0 w-full h-full object-cover grayscale contrast-125" alt="dont" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          <div className="absolute inset-0 flex flex-col items-center justify-end text-center text-white pb-12 px-6">
            <h4 className="text-3xl md:text-5xl font-black mb-4 uppercase tracking-tighter">{item.dont.title}</h4>
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
      <section ref={container} className="relative bg-white">
        
        {/* --- STICKY HEADER --- */}
        <div className="sticky top-0 z-[60] bg-white/90 backdrop-blur-md border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 py-8 text-center">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-gray-900 mb-6">
              OUR <span className="text-[#FF6600]">PRINCIPLES</span>
            </h2>
            
            <div className="grid grid-cols-2 gap-10 relative">
              <h3 className="text-sm md:text-2xl font-black uppercase text-[#FF6600]">What We Do</h3>
              <h3 className="text-sm md:text-2xl font-black uppercase text-gray-400">What We Don't</h3>
              
              {/* Progress Bar Underneath Labels */}
              <div className="absolute -bottom-4 left-0 w-full h-[3px] bg-gray-100">
                <motion.div 
                  style={{ scaleX: scrollYProgress }} 
                  className="absolute inset-0 bg-[#FF6600] origin-left" 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Vertical Center Line */}
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-px h-full bg-gray-200 hidden md:block z-10" />

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