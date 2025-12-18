// This file assumes the utility function cn from your lib/utils file is available
// and the motion/react library is installed and configured.

"use client";

import * as React from "react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "motion/react"; // Note: I'm importing all necessary types/values directly.

import { cn } from "../../../../lib/utils";


// --- Configuration and Types ---

/**
 * Type for the animation direction.
 * Represents the starting direction of the element before animating to its visible state.
 */
// @ts-ignore
// Note: Types are usually done in TypeScript, but keeping them as comments for context in JSX
// type AnimateT = "left" | "right" | "top" | "bottom" | "z" | "blur" | undefined;
const SPRING_CONFIG = {
  type: "spring",
  stiffness: 100,
  damping: 16,
  mass: 0.75,
  restDelta: 0.005,
  duration: 0.3,
};

// --- Hooks ---

/**
 * Generates Framer Motion variants for common entrance animations.
 * @param {string} animate - The direction/type of the entrance animation.
 */
const useAnimationVariants = (animate) =>
  React.useMemo(
    () => ({
      hidden: {
        x: animate === "left" ? "-100%" : animate === "right" ? "100%" : 0,
        y: animate === "top" ? "-100%" : animate === "bottom" ? "100%" : 0,
        scale: animate === "z" ? 0 : 1,
        filter: animate === "blur" ? "blur(10px)" : "blur(0px)",
        opacity: 0,
      },
      visible: {
        x: 0,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        opacity: 1,
      },
    }),
    [animate]
  );

// --- Context for Scroll Progress ---

const ContainerScrollContext = React.createContext(undefined);

function useContainerScrollContext() {
  const context = React.useContext(ContainerScrollContext);
  if (!context) {
    throw new Error(
      "useContainerScrollContext must be used within <ContainerScroll> component"
    );
  }
  return context;
}

// --- Components ---

/**
 * A container that orchestrates entrance animations for its children (staggering).
 * Uses `whileInView` to trigger the animation when the container enters the viewport.
 */
const ContainerStagger = React.forwardRef(({ children, className, ...props }, ref) => {
  return (
    <motion.div
      className={cn("relative", className)}
      ref={ref}
      initial="hidden"
      whileInView={"visible"}
      viewport={{ once: true || props.viewport?.once, ...props.viewport }}
      transition={{
        staggerChildren: props.transition?.staggerChildren || 0.2,
        ...props.transition,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
});
ContainerStagger.displayName = "ContainerStagger";


/**
 * A container that sets up a scroll target and provides the scroll progress
 * to children via context.
 */
const ContainerScroll = ({
  children,
  className,
  ...props
}) => {
  const scrollRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
  });

  // The min-height defines the duration of the scroll animation.
  // The 'h-[350vh]' in your original usage overrode the default 'min-h-[120vh]'.
  return (
    <ContainerScrollContext.Provider value={{ scrollYProgress }}>
      <section
        className={cn(
          "relative min-h-[120vh] w-full pb-[30%] pt-8 ",
          className
        )}
        {...props}
        ref={scrollRef}
      >
        {children}
      </section>
    </ContainerScrollContext.Provider>
  );
};
ContainerScroll.displayName = "ContainerScroll";

/**
 * A wrapper component that applies a specific entrance animation (left, right, top, bottom, etc.)
 * based on the `animation` prop. It's intended to be a child of `ContainerStagger`.
 */
const ContainerAnimated = React.forwardRef(
  ({ animation, children, className, ...props }, ref) => {
    const variants = useAnimationVariants(animation);

    return (
      <motion.div
        transition={SPRING_CONFIG || props.transition}
        ref={ref}
        variants={variants}
        className={className}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
ContainerAnimated.displayName = "ContainerAnimated";

/**
 * A component that uses the scroll progress from `ContainerScroll`
 * to animate the element's position (Y), inset (clip-path), and border radius.
 * This creates a shrinking/perspective effect as the user scrolls.
 */
const ContainerInset = React.forwardRef(
  (
    {
      translateYRange = ["-20%", "50%"],
      insetYRange = [20, 0],
      insetXRange = [42, 0],
      roundednessRange = [1000, 10],
      children,
      className,
      ...props
    },
    ref
  ) => {
    const { scrollYProgress } = useContainerScrollContext();
    
    // Animate vertical position
    const y = useTransform(scrollYProgress, [0, 1], translateYRange);

    // Animate CSS inset values for clip-path
    const insetY = useTransform(scrollYProgress, [0, 1], insetYRange);
    const insetX = useTransform(scrollYProgress, [0, 1], insetXRange);
    
    // Animate border-radius for the rounding effect
    const roundedness = useTransform(scrollYProgress, [0, 1], roundednessRange);

    // Combine insets and radius into a single motion value for clip-path
    const clipPath = useMotionTemplate`inset(${insetY}% ${insetX}% ${insetY}% ${insetX}% round ${roundedness}px)`;

    const style = React.useMemo(
      () => ({ y, clipPath, ...props.style }),
      [y, clipPath, props.style]
    );
    
    return (
      <motion.div
        transition={SPRING_CONFIG || props.transition}
        ref={ref}
        className={cn("origin-top overflow-hidden", className)}
        style={style}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
ContainerInset.displayName = "ContainerInset";

// --- Exports ---

export { ContainerAnimated, ContainerStagger, ContainerScroll, ContainerInset };