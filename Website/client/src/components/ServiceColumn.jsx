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
      aria-label="Animated service cards column"
    >
      {Array.from({ length: 2 }).map((_, i) => (
        <Fragment key={i}>
          {services.map((service) => (
            <article
              className={`bg-gradient-to-b from-orange-100 via-orange-200 to-orange-400 border border-white/20 rounded-3xl p-6 ${className || ""}`}
              key={service.name}
              aria-label={`${service.name} service card`}
            >
              <div className="flex justify-center">
                <img
                  src={service.icon}
                  className="w-24 h-24"
                  alt={`${service.name} service icon`}
                  title={`${service.name} Service`}
                  loading="lazy"
                  width={96}
                  height={96}
                />
              </div>
              <h2 className="text-3xl text-center mt-6">{service.name}</h2>
              <p className="text-gray-900 text-center mt-2">
                {service.description}
              </p>
              <div className="flex justify-center mt-4">
                <button 
                  className="text-white hover:text-gray-200 font-semibold text-sm flex items-center gap-1 transition-all duration-300"
                  aria-label={`Learn more about ${service.name}`}
                >
                  Learn More
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            </article>
          ))}
        </Fragment>
      ))}
    </motion.div>
  );
}