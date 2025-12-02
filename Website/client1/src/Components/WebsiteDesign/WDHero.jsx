import { motion } from "framer-motion";

const WDHero = () => {
  return (
    <section className="py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text content */}
          <motion.div 
            className="space-y-6 md:space-y-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-4 md:space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Website Design & Development
              </h1>
              <div className="space-y-3">
                <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
                  From static pages to dynamic platforms,{" "}
                  <span className="text-[#FF6600] font-semibold">we cover it all</span>.
                </p>
                <p className="text-base sm:text-lg text-gray-600 max-w-lg leading-relaxed">
                  Professional web design services that transform your vision into
                  stunning, functional websites that drive results and engage your audience.
                </p>
              </div>
            </div>

            {/* Call to Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button 
                className="relative overflow-hidden group px-8 py-4 rounded-xl font-semibold text-base transition-all duration-300 text-white bg-[#FF6600] border border-[#FF6600] shadow-md hover:shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">Get Started Today</span>
                <span className="absolute inset-0 bg-[#E55A00] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out z-0"></span>
              </motion.button>
              
              <motion.button 
                className="px-8 py-4 rounded-xl font-semibold text-base transition-all duration-300 text-[#FF6600] bg-transparent border-2 border-[#FF6600] hover:bg-[#FFF5EE]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                View Our Portfolio
              </motion.button>
            </div>
          </motion.div>

          {/* Hero image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 rounded-2xl overflow-hidden">
              <img
                src="https://ik.imagekit.io/vinayak06/10780377_19198999-removebg-preview.png"
                alt="Professional website design illustration"
                className="w-full h-auto transform hover:scale-105 transition-transform duration-500"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WDHero;