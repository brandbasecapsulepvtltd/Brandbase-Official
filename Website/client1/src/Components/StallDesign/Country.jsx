import React from 'react'
import { motion } from 'framer-motion'

const Country = () => {
  const countries = [
    { name: "India", flag: "https://ik.imagekit.io/vinayak06/india%20(1).png" },
    { name: "Germany", flag: "https://ik.imagekit.io/vinayak06/europe%20(1).png" },
    { name: "Singapore", flag: "https://ik.imagekit.io/vinayak06/singapore%20(1).png" },
    { name: "United Arab Emirates", flag: "https://ik.imagekit.io/vinayak06/UAE%20(1).png" },
    { name: "United Kingdom", flag: "https://ik.imagekit.io/vinayak06/UK%20(1).png" },
    { name: "United States", flag: "https://ik.imagekit.io/vinayak06/USA%20(1).png" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-serif">
            Crafting Our Innovative <span className="text-[#FF6600]">Exhibitions</span> Worldwide
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            With expert exhibition booth designers across the globe, we bring your vision to life in every major market
          </p>
        </motion.div>

        {/* Countries Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {countries.map((country, index) => (
            <motion.div
              key={country.name}
              className="flex flex-col items-center group cursor-pointer"
              variants={itemVariants}
            >
              {/* Flag Container */}
              <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-orange-100 mb-4 group-hover:border-[#FF6600] group-hover:shadow-lg transition-all duration-300">
                <img 
                  src={country.flag} 
                  alt={country.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              
              {/* Country Name */}
              <span className="text-gray-700 font-medium text-lg group-hover:text-[#FF6600] transition-colors duration-300">
                {country.name}
              </span>
              
              {/* Hover Indicator */}
              <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-6 h-1 bg-[#FF6600] rounded-full"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Country