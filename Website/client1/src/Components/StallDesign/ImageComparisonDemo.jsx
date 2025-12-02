import { ImageComparison } from "./image-comparison-slider";
import { motion } from "framer-motion";

export default function ImageComparisonDemo() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-16 md:py-30 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          
          {/* Left Side - Image Comparison */}
          <motion.div 
            className="flex flex-col items-center order-2 lg:order-1"
            variants={itemVariants}
          >
            {/* Image Comparison Slider */}
            <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
              <ImageComparison
                beforeImage="https://ik.imagekit.io/vinayak06/stallblueprint.jpg"
                afterImage="https://ik.imagekit.io/vinayak06/stall.jpg"
                altBefore="Blueprint of stall design"
                altAfter="Completed stall design"
              />
            </div>
            
            {/* Stats Section */}
            <motion.div 
              className="grid grid-cols-3 gap-4 sm:gap-6 mt-8 w-full max-w-md sm:max-w-lg"
              variants={itemVariants}
            >
              {[
                { number: "500+", label: "Projects Completed" },
                { number: "50+", label: "Cities Covered" },
                { number: "98%", label: "Client Satisfaction" }
              ].map((stat, index) => (
                <div key={stat.label} className="text-center group cursor-pointer">
                  <div className="text-xl sm:text-2xl font-bold text-[#FF6600] group-hover:scale-110 transition-transform duration-300">
                    {stat.number}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 group-hover:text-gray-900 transition-colors duration-300">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side - Text Content */}
          <motion.div 
            className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left order-1 lg:order-2"
            variants={itemVariants}
          >
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6 font-serif"
              variants={itemVariants}
            >
              Transform Vision
              <span className="text-[#FF6600] block mt-2">Into Reality</span>
            </motion.h1>
            
            <motion.p 
              className="text-gray-600 text-lg md:text-xl mb-8 max-w-xl leading-relaxed"
              variants={itemVariants}
            >
              We specialize in creating stunning exhibition stalls that captivate audiences and drive business growth. 
              Our designs blend innovation with functionality to make your brand stand out in any event.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
              variants={itemVariants}
            >
              <motion.button 
                className="bg-[#FF6600] hover:bg-orange-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-base w-full sm:w-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Free Consultation
              </motion.button>
              <motion.button 
                className="border-2 border-gray-800 hover:bg-[#FF6600] hover:border-[#FF6600] hover:text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 text-base w-full sm:w-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Our Portfolio
              </motion.button>
            </motion.div>
            
            {/* Ratings */}
            <motion.div 
              className="flex flex-col sm:flex-row items-center gap-3 mt-8 text-gray-600 w-full justify-center lg:justify-start"
              variants={itemVariants}
            >
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-600">
                Trusted by 500+ brands worldwide
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}