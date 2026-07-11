"use client";

import * as React from "react";
import Link from "next/link";
import { cva } from "class-variance-authority";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";

const cardVariants = cva(
  "relative flex flex-col w-full overflow-hidden rounded-2xl transition-all duration-300 group min-h-[260px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6600] focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-white dark:bg-zinc-900 text-gray-900 dark:text-white border border-gray-200/80 dark:border-zinc-800 shadow-sm hover:shadow-lg hover:border-[#FF6600]/25",
        red: "bg-gradient-to-br from-rose-600 to-rose-800 text-white shadow-md hover:shadow-xl",
        blue: "bg-gradient-to-br from-slate-700 to-slate-900 text-white shadow-md hover:shadow-xl",
        orange: "bg-gradient-to-br from-[#FF6600] to-[#D95400] text-white shadow-md hover:shadow-xl",
        teal: "bg-gradient-to-br from-teal-600 to-teal-800 text-white shadow-md hover:shadow-xl",
        indigo: "bg-gradient-to-br from-indigo-700 to-indigo-950 text-white shadow-md hover:shadow-xl",
        gray: "bg-gray-50 dark:bg-zinc-800/80 text-gray-900 dark:text-white border border-gray-200 dark:border-zinc-700 hover:shadow-md hover:border-[#FF6600]/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const ctaVariants = cva(
  "inline-flex items-center gap-1.5 text-sm font-semibold tracking-wide transition-colors mt-5 w-fit",
  {
    variants: {
      variant: {
        default: "text-[#FF6600] group-hover:text-[#E55A00]",
        red: "text-white/90 group-hover:text-white",
        blue: "text-white/90 group-hover:text-white",
        orange: "text-white/90 group-hover:text-white",
        teal: "text-white/90 group-hover:text-white",
        indigo: "text-white/90 group-hover:text-white",
        gray: "text-[#FF6600] group-hover:text-[#E55A00]",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

const ServiceCard = React.forwardRef(
  ({ className, variant, title, description, href, imgSrc, imgAlt, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="h-full"
        {...props}
      >
        <Link
          href={href}
          className={cn(cardVariants({ variant, className }), "h-full p-6 md:p-7")}
          aria-label={description ? `${title}. ${description}` : title}
        >
          {description ? <span className="sr-only">{description}</span> : null}

          {/* Text — full width, never overlapped by image */}
          <div className="relative z-10 flex flex-col flex-1">
            <h3 className="text-lg sm:text-xl font-bold tracking-tight leading-snug pr-1">
              {title}
            </h3>
            <span className={cn(ctaVariants({ variant }))}>
              Explore
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </span>
          </div>

          {/* Image — dedicated strip below text */}
          {imgSrc && (
            <div className="relative z-0 mt-4 h-24 sm:h-28 flex items-end justify-end shrink-0">
              <img
                src={imgSrc}
                alt=""
                role="presentation"
                className="max-h-full max-w-[70%] sm:max-w-[65%] object-contain object-bottom-right opacity-95 group-hover:opacity-100 group-hover:scale-[1.03] transition-transform duration-500 pointer-events-none select-none"
                loading="lazy"
              />
            </div>
          )}
        </Link>
      </motion.div>
    );
  }
);
ServiceCard.displayName = "ServiceCard";

export { ServiceCard };
