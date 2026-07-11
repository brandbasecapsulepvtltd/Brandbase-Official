"use client";

import { TestimonialsColumn } from "./testimonials-columns-1";
import { motion } from "framer-motion";

const TestimonalsOne = ({ testimonialsData }) => {
  const { sectionTitle, sectionDescription, testimonials } = testimonialsData;

  // Split testimonials into columns
  const firstColumn = testimonials.slice(0, 3);
  const secondColumn = testimonials.slice(3, 6);
  const thirdColumn = testimonials.slice(6, 9);

  return (
    <section className="bg-white dark:bg-black my-20 relative">
      <div className="container z-10 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto"
        >
          <div className="flex justify-center">
            <div className="border border-gray-200 dark:border-zinc-800 py-1 px-4 rounded-lg bg-gray-50 dark:bg-zinc-800/50 text-gray-600 dark:text-gray-400 text-sm font-medium">Testimonials</div>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter mt-5 text-gray-900 dark:text-white text-center">
            {sectionTitle}
          </h2>
          <p className="text-center mt-5 text-gray-600 dark:text-gray-400">
            {sectionDescription}
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  );
};

export default TestimonalsOne;
