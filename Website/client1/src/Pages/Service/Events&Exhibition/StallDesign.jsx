import React from 'react'
import { motion } from 'framer-motion'
import StallDesignStats from '../../../Components/StallDesign/StallDesignStats'
import StallDesignHero from '../../../Components/StallDesign/StallDesignHero'
import Features from '../../../Components/StallDesign/Features'
import WhatWeDoSection from '../../../Components/StallDesign/WhatWeDoSection'
import Country from '../../../Components/StallDesign/Country'
import AboutSection from '../../../Components/StallDesign/AboutSection'

const StallDesign = () => {
  return (
  <>
  <StallDesignHero/>
     
      {/* CTA Section
               <WhatWeDoSection/>
         <Country/>
      <Features/>
      <StallDesignStats/>
      */}
      <AboutSection/>
      <section
        className="relative py-20 px-6 lg:px-20 bg-gray-900 text-white mt-20 overflow-hidden"
        role="region"
        aria-labelledby="cta-heading"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 bg-[#FF6600] rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-[#FF6600] rounded-full blur-3xl"></div>
        </div>

        <motion.div
          className="relative z-10 flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-16 max-w-7xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            <h2
              id="cta-heading"
              className="text-3xl md:text-5xl font-bold mb-4 leading-tight text-white font-serif"
            >
              You Found Us. <br />
              <span className="text-[#FF6600]">Let's Make Sure They Find You.</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-300 mb-6 max-w-xl mx-auto lg:mx-0">
              Ready to scale with an actual digital strategy? Not some cookie-cutter plan?
            </p>

            <motion.a
              href="/contactus"
              className="relative inline-block overflow-hidden group px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 text-white bg-[#FF6600] border border-[#FF6600] shadow-lg hover:bg-orange-600 hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300"
              aria-label="Book a Free Growth Audit"
            >
              <span className="relative z-10">Book a Free Growth Audit</span>
            </motion.a>
          </div>

          {/* Image */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <div className="w-full max-w-md">
              <img
                src="https://ik.imagekit.io/vinayak06/pexels-photo-6476260.webp?updatedAt=1754542635531"
                alt="Marketing strategy team meeting"
                className="w-full rounded-2xl shadow-lg object-cover h-[300px] md:h-[400px]"
                loading="lazy"
              />
            </div>
          </div>
        </motion.div>
      </section>
    </>
  )
}

export default StallDesign