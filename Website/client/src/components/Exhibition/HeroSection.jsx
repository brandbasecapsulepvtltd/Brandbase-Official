"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3,
        },
    },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: "easeInOut",
        },
    },
};

const HeroSection = React.forwardRef(
    (
        {
            className,
            title,
            subtitle,
            primaryButtonText,
            primaryButtonHref,
            secondaryButtonText,
            secondaryButtonHref,
            imageUrl,
            ...props
        },
        ref
    ) => {
        return (
            <section
                ref={ref}
                className={cn(
                    "relative flex h-[80vh] min-h-[600px] w-full items-center justify-center overflow-hidden",
                    className
                )}
                {...props}
            >
                {/* Background Image */}
                <div
                    className="absolute inset-0 z-[-1] bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${imageUrl})` }}
                    aria-hidden="true"
                />

                {/* Optional: Add a subtle overlay for better text readability */}
                <div className="absolute inset-0 z-0 bg-black/40" aria-hidden="true" />

                {/* Content Container */}
                <motion.div
                    className="z-10 flex max-w-4xl flex-col items-center justify-center text-center text-white px-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Animated Title */}
                    <motion.h1
                        className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl drop-shadow-lg"
                        variants={itemVariants}
                    >
                        {title}
                    </motion.h1>

                    {/* Animated Subtitle */}
                    <motion.p
                        className="mt-6 max-w-2xl text-lg leading-8 md:text-xl text-gray-200"
                        variants={itemVariants}
                    >
                        {subtitle}
                    </motion.p>

                    {/* Animated Button Group */}
                    <motion.div className="mt-10 flex flex-wrap items-center justify-center gap-4" variants={itemVariants}>
                        <Button asChild size="lg" className="bg-[#FF6600] hover:bg-orange-600 text-white border-none">
                            <Link href={primaryButtonHref}>{primaryButtonText}</Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-black bg-transparent">
                            <Link href={secondaryButtonHref}>{secondaryButtonText}</Link>
                        </Button>
                    </motion.div>
                </motion.div>
            </section>
        );
    }
);

HeroSection.displayName = "HeroSection";

export { HeroSection };
