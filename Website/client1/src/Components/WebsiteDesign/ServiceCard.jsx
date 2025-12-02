import { motion } from "framer-motion";

const ServiceCard = ({ title, description, link, Icon, className = '' }) => {
  return (
    <motion.div
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true }}
      className={`group border-1 border-orange-900 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${className}`}
    >
      {/* Icon */}
      <div className="mb-4 text-orange-500 group-hover:text-orange-600 transition-colors">
        <Icon className="text-5xl mx-auto" />
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-orange-600 text-center mb-2 group-hover:text-orange-500 transition-colors">
        {title}
      </h3>

      {/* Description */}
      <p className="text-gray-800 text-center mb-4">
        {description}
      </p>

      {/* Button */}
      <a href={link}>
        <button className="block w-full mt-auto px-4 py-2 text-sm font-medium bg-orange-600 text-white rounded hover:bg-orange-500 transition">
          Learn More
        </button>
      </a>
    </motion.div>
  );
};

export default ServiceCard;
