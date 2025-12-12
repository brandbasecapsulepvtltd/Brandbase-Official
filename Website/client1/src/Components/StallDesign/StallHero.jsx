import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger)

const StallHero = () => {

  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const headingRef = useRef(null)
  const paragraphRef = useRef(null)
  const heroBtn = useRef(null)

  useEffect(() => {

    const splitHeading = new SplitText(headingRef.current, { types: 'chars' })
    const splitParagraph = new SplitText(paragraphRef.current, { types: 'chars' })

    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    const frames = {
      currentFrame: 0,
      maxFrames: 160,
    }

    const images = []
    let loadedImages = 0


    // FRAME LOADER
for (let i = 1; i <= frames.maxFrames; i++) {
  const img = new Image();
  img.src = `/media/hero-canvas/${i.toString().padStart(3, '0')}-hero.webp`;
  img.onerror = () => console.error(`Failed to load: ${img.src}`);
  img.onload = () => {
    loadedImages++;
    if (loadedImages === frames.maxFrames) drawFrame(frames.currentFrame);
  };
  images.push(img);
}




    const drawFrame = (index) => {
      const img = images[index]
      if (!img || !img.complete || img.naturalWidth === 0) return

      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      const canvasRatio = canvas.width / canvas.height
      const imageRatio = img.naturalWidth / img.naturalHeight

      let drawWidth, drawHeight

      if (canvasRatio > imageRatio) {
        drawWidth = canvas.width
        drawHeight = canvas.width / imageRatio
      } else {
        drawHeight = canvas.height
        drawWidth = canvas.height * imageRatio
      }

      const offsetX = (canvas.width - drawWidth) / 2
      const offsetY = (canvas.height - drawHeight) / 2

      context.clearRect(0, 0, canvas.width, canvas.height)
      context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight)

      context.imageSmoothingEnabled = true
      context.imageSmoothingQuality = 'high'
    }

    const updateFrames = (newFrame) => ({
      currentFrame: newFrame,
      onUpdate: () => drawFrame(Math.floor(frames.currentFrame)),
    })

    // SCROLL ANIMATION TIMELINE
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 5,
      },
    })

    tl.to(frames, updateFrames(40), 'a')
    tl.to(splitHeading.chars, {
      opacity: 0,
      duration: 0.01,
      stagger: 0.01
    }, 'a')

    tl.to(heroBtn.current, { opacity: 0 }, 'a')

    tl.to(frames, updateFrames(90), 'b')
    tl.to(splitParagraph.chars, {
      opacity: 0,
      duration: 0.01,
      stagger: 0.01
    }, 'b')

    tl.to(frames, updateFrames(130))
    tl.to(frames, updateFrames(160), 'c')

    tl.to(canvasRef.current, { scale: 0.7 }, 'c')

    const handleResize = () => drawFrame(Math.floor(frames.currentFrame))
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }

  }, [])

  return (
    <div ref={containerRef} className="w-full h-[350vh] lg:overflow-x-clip relative">
      <div className="w-full h-screen sticky top-0">
        <canvas ref={canvasRef} className="w-full h-full" />

        {/* -------------------------------
            LEFT SIDE TITLE + DESCRIPTION
        -------------------------------- */}
        <div className="hero-content absolute top-0 left-0 w-full h-screen 
          flex flex-col items-start justify-center px-6 md:px-16">

          <div className="w-full flex flex-col items-start justify-center gap-[25px]">
            <h1
              ref={headingRef}
              className="text-white md:text-[65px] text-[32px] leading-none text-left font-bold"
            >
              Welcome to <span className='text-orange-600'>Brandbase Capsule</span>
            </h1>

            <p
              ref={paragraphRef}
              className="roobert-r text-orange-600 text-2xl text-left lg:w-1/2 md:w-[70%] w-[90%] font-semibold"
            >
              The Everlasting Creative Experience Agency
            </p>
          </div>
        </div>

        {/* -------------------------------
            RIGHT SIDE SCROLL INDICATOR
        -------------------------------- */}
        <div className="absolute right-4 bottom-[10%] flex justify-end">
          <a
            ref={heroBtn}
            href="#"
            className="fairy-cursor-overlay flex flex-col items-center gap-[60px]"
          >
            <span
              className="roobert-b rotate-[-90deg] text-orange-600 
                lg:text-[15px] md:text-[13px] text-[12px] leading-none"
            >
              Scroll to Discover
            </span>

            <svg
              width="12"
              height="54"
              viewBox="0 0 12 54"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mx-1.5 transition-transform duration-500"
            >
              <path
                d="M6 1L6 53 M1 48L6 53L11 48"
                stroke="#ff6f00ff"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>

      </div>
    </div>
  )
}

export default StallHero

