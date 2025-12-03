'use client';

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

const WhyBuildWithBcpl = ({ data }) => {
  return (
    <section
      className="py-20 px-6 lg:px-16 bg-white"
      aria-labelledby="why-bcpl-title"
      role="region"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <h2
            id="why-mavenox-title"
            className="text-4xl md:text-5xl font-extrabold text-black leading-tight"
          >
            <span id="why-bcpl-title" className="text-orange-600">{data.title}</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-900 mt-4 max-w-2xl mx-auto">
            {data.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {data.reasons.map((item, index) => (
            <motion.div
              key={item.id}
              className="relative bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 group hover:scale-[1.02]"
              initial="hidden"
              whileInView="visible"
              custom={index}
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <div className="absolute -top-4 left-6 w-9 h-9 rounded-full bg-orange-500 shadow-lg flex items-center justify-center text-white font-semibold text-sm ring-2 ring-white group-hover:scale-110 transition-transform duration-300">
                {index + 1}
              </div>

              <p className="text-gray-800 text-xl leading-relaxed relative transition-colors group-hover:text-orange-600">
                {item.reason}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyBuildWithBcpl;