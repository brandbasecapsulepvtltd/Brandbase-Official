import { motion } from "framer-motion";

// Function to highlight text
const highlightText = (text, highlights) => {
  if (!highlights || highlights.length === 0) return text;

  const sortedHighlights = [...highlights].sort((a, b) => b.length - a.length);
  const regex = new RegExp(`(${sortedHighlights.join('|')})`, 'gi');
  const parts = text.split(regex);

  return parts.map((part, index) => {
    const isHighlight = sortedHighlights.some(highlight =>
      part.toLowerCase() === highlight.toLowerCase()
    );

    if (isHighlight) {
      return (
        <span key={index} className="text-[#FF6600] font-semibold">
          {part}
        </span>
      );
    }
    return part;
  });
};

const CategoryHero = ({ data }) => {
  return (
    <section className="py-16 md:py-15 lg:py-15 px-4 sm:px-6 lg:px-10 bg-white dark:bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-6 md:space-y-8">
            <div className="space-y-4 md:space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
                {data.title}
              </h1>
              <div className="space-y-3">
                <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                  {highlightText(data.subtitle, data.highlightedText)}
                </p>
                <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-lg leading-relaxed">
                  {data.description}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.a
                href={data.cta.primaryLink || "#"}
                className="relative overflow-hidden group px-8 py-4 rounded-xl font-semibold text-base transition-all duration-300 text-white bg-[#FF6600] border border-[#FF6600] shadow-md hover:shadow-lg inline-block text-center cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">{data.cta.primary}</span>
                <span className="absolute inset-0 bg-[#E55A00] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out z-0"></span>
              </motion.a>

              <motion.a
                href={data.cta.secondaryLink || "#"}
                className="px-8 py-4 rounded-xl font-semibold text-base transition-all duration-300 text-[#FF6600] bg-transparent border-2 border-[#FF6600] hover:bg-orange-50 dark:hover:bg-orange-950/20 inline-block text-center cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                {data.cta.secondary}
              </motion.a>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10 rounded-2xl overflow-hidden">
              <img
                src={data.imgUrl}
                alt="Professional website design illustration"
                className="w-full h-auto transform hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryHero;
