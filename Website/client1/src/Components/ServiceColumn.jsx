import { motion } from "framer-motion";
import { Fragment } from "react";

export default function ServiceColumn(props) {
  const { services, className, reverse } = props;
  return (
    <motion.div
      initial={{ y: reverse ? "-50%" : 0 }}
      animate={{ y: reverse ? 0 : "-50%" }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "linear",
      }}
      className={`flex flex-col gap-4 pb-4 ${className || ""}`}
    >
      {Array.from({ length: 2 }).map((_, i) => (
        <Fragment key={i}>
          {services.map((service) => (
            <div
              className={`bg-gradient-to-b from-orange-400 via-orange-500 to-orange-600 border border-white/20 rounded-3xl p-6 ${className || ""}`}
              key={service.name}
            >
              <div className="flex justify-center">
                <img
                  src={service.icon}
                  className="w-24 h-24"
                  alt={`${service.name} icon`}
                />
              </div>
              <h3 className="text-3xl text-center mt-6">{service.name}</h3>
              <p className="text-white/80 text-center mt-2">
                {service.description}
              </p>
              <div className="flex justify-center mt-4">
                <button className="text-white hover:text-gray-200 font-semibold text-sm flex items-center gap-1 transition-all duration-300">
                  Learn More
                  <span>→</span>
                </button>
              </div>
            </div>
          ))}
        </Fragment>
      ))}
    </motion.div>
  );
}