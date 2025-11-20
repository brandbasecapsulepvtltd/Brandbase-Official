import { motion } from "framer-motion";

const ServiceCard = ({ title, description, link, Icon, className = '' }) => {
  return (
    <motion.div
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true }}
      className={`group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-orange-100 ${className}`}
    >
      {/* Icon */}
      <div className="mb-4 text-[#FF6600] group-hover:text-orange-600 transition-colors">
        <Icon className="text-5xl mx-auto" />
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-gray-900 text-center mb-2 group-hover:text-[#FF6600] transition-colors">
        {title}
      </h3>

      {/* Description */}
      <p className="text-gray-700 text-center mb-4">
        {description}
      </p>

      {/* Button */}
      <a
        href={link}
        className="block w-full mt-auto px-4 py-3 text-sm font-medium bg-[#FF6600] text-white rounded-lg hover:bg-orange-600 transition-all duration-300 text-center hover:shadow-lg"
      >
        Learn More
      </a>
    </motion.div>
  );
};

export default ServiceCard;