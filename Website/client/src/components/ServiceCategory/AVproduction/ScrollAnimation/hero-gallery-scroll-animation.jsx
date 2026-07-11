"use client"

import * as React from "react"
import { cva } from "class-variance-authority"
import {
    motion,
    useScroll,
    useTransform,
} from "motion/react"

import { cn } from "@/lib/utils"

const bentoGridVariants = cva(
    "relative grid gap-4 p-4",
    {
        variants: {
            variant: {
                default: "grid-cols-1 md:grid-cols-3 lg:grid-cols-4 auto-rows-[200px] md:auto-rows-[300px]",
                threeCells: "grid-cols-2 grid-rows-2 [&>*:first-child]:col-span-2",
                fourCells: "grid-cols-3 grid-rows-2 [&>*:first-child]:col-span-1 [&>*:nth-child(2)]:col-span-2 [&>*:nth-child(3)]:col-span-2",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

const ContainerScrollContext = React.createContext(undefined)

function useContainerScrollContext() {
    const context = React.useContext(ContainerScrollContext)
    if (!context) {
        throw new Error(
            "useContainerScrollContext must be used within a ContainerScroll Component"
        )
    }
    return context
}

const ContainerScroll = ({ children, className, ...props }) => {
    const scrollRef = React.useRef(null)
    const { scrollYProgress } = useScroll({
        target: scrollRef,
        offset: ["start start", "end end"],
    })

    return (
        <ContainerScrollContext.Provider value={{ scrollYProgress }}>
            <div
                ref={scrollRef}
                className={cn("relative h-[200vh] w-full", className)} // Reduced height from 350vh
                {...props}
            >
                <div className="sticky top-0 h-screen w-full overflow-hidden">
                    {children}
                </div>
            </div>
        </ContainerScrollContext.Provider>
    )
}

const BentoGrid = React.forwardRef(({ variant, className, ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={cn(
                "absolute inset-0 flex items-center justify-center", // Center grid in the sticky container
                className
            )}
            {...props}
        >
            <div className={cn("w-full max-w-7xl", bentoGridVariants({ variant }))}>
                {props.children}
            </div>
        </div>
    )
})
BentoGrid.displayName = "BentoGrid"

const BentoCell = React.forwardRef(({ className, style, index, ...props }, ref) => {
    const { scrollYProgress } = useContainerScrollContext()

    // Staggered parallax effect based on index if provided, otherwise uniform
    const translateY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"])
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9])
    const opacity = useTransform(scrollYProgress, [0.6, 1], [1, 0])


    return (
        <motion.div
            ref={ref}
            className={cn("overflow-hidden rounded-xl shadow-sm", className)} // Refined styles
            style={{ y: translateY, scale, opacity, ...style }}
            {...props}
        />
    )
})
BentoCell.displayName = "BentoCell"

const ContainerScale = React.forwardRef(({ className, style, ...props }, ref) => {
    const { scrollYProgress } = useContainerScrollContext()
    const scale = useTransform(scrollYProgress, [0, 0.4], [0.8, 1])
    const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])
    const y = useTransform(scrollYProgress, [0, 0.4], ["100%", "0%"])

    return (
        <motion.div
            ref={ref}
            className={cn("absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none", className)} // Centered overlay
            style={{
                scale,
                opacity,
                y,
                ...style,
            }}
        >
            <div className="pointer-events-auto text-center px-4">
                {props.children}
            </div>
        </motion.div>
    )
})
ContainerScale.displayName = "ContainerScale"

export { ContainerScroll, BentoGrid, BentoCell, ContainerScale }