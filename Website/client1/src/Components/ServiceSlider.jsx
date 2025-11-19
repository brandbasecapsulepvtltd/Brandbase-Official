import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function ServiceSlider() {
  const [isHovered, setIsHovered] = useState(false);
  const animation = useRef();
  const scope = useRef();

  const services = [
    "Digital Marketing",
    "Branding & Creative Design", 
    "Audio & Video Production",
    "Website Development",
    "Mobile App Development"
  ];

  useEffect(() => {
    if (scope.current) {
      animation.current = {
        speed: 1,
        pause: () => {},
        play: () => {}
      };
      
      // Simple animation implementation
      const animateSlider = () => {
        if (scope.current && !isHovered) {
          const currentX = parseFloat(scope.current.style.transform.replace('translateX(', '').replace('px)', '')) || 0;
          scope.current.style.transform = `translateX(${currentX - 1}px)`;
        }
      };
      
      const interval = setInterval(animateSlider, 16); // ~60fps
      return () => clearInterval(interval);
    }
  }, []);

  useEffect(() => {
    if (animation.current) {
      if (isHovered) {
        animation.current.speed = 0.5;
      } else {
        animation.current.speed = 1;
      }
    }
  }, [isHovered]);

  return (
    <section className="">
      <div className="overflow-x-clip p-4 flex border-t-2 border-b-2 border-[#FF6600]">
        <motion.div
          ref={scope}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="flex flex-none gap-16 pr-16 text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-medium group cursor-pointer"
          animate={{
            x: ["0%", "-50%"]
          }}
          transition={{
            duration: 30,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop"
          }}
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <div className="flex items-center gap-8 md:gap-12 lg:gap-16" key={i}>
              <span className="text-[#FF6600] text-4xl md:text-6xl lg:text-7xl">&#10038;</span>
              <span className="group-hover:text-[#FF6600] transition-colors duration-300 whitespace-nowrap">
                {services[i % services.length]}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}