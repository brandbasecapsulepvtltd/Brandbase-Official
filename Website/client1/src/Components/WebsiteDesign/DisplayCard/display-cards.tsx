"use client";

import { cn } from "../../../lib/utils";
import { Sparkles } from "lucide-react";

interface DisplayCardProps {
  className?: string;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  date?: string;
  iconClassName?: string;
  titleClassName?: string;
}

function DisplayCard({
  className,
  icon = <Sparkles className="size-4 text-blue-300" />,
  title = "Featured",
  description = "Discover amazing content",
  date = "Just now",
  iconClassName = "text-blue-500",
  titleClassName = "text-blue-500",
}: DisplayCardProps) {
  return (
    <div
      className={cn(
        // Base Layout & Sizing (Responsive)
        "relative flex h-36 w-full max-w-[22rem] -skew-y-[8deg] select-none flex-col justify-between rounded-xl border-2 bg-muted/70 backdrop-blur-sm px-4 py-3 transition-all duration-700",
        // Desktop Sizing
        "md:w-[22rem]",
        // Hover & After Effects
        "after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[20rem] after:bg-gradient-to-l after:from-background after:to-transparent after:content-[''] hover:border-white/20 hover:bg-muted [&>*]:flex [&>*]:items-center [&>*]:gap-2",
        className
      )}
    >
      <div>
        <span className="relative inline-block rounded-full bg-blue-800 p-1">
          {icon}
        </span>
        <p className={cn("text-lg font-medium", titleClassName)}>{title}</p>
      </div>
      <p className="whitespace-nowrap text-lg">{description}</p>
      <p className="text-muted-foreground">{date}</p>
    </div>
  );
}

interface DisplayCardsProps {
  cards?: DisplayCardProps[];
}

export default function DisplayCards({ cards }: DisplayCardsProps) {
  const defaultCards = [
    {
      // Card 1
      className: cn(
        "[grid-area:stack]", // Layout
        "hover:-translate-y-10", // Animation
        "before:absolute before:h-[100%] before:w-[100%] before:rounded-xl before:bg-background/50 before:bg-blend-overlay before:content-[''] before:outline-1 before:outline-border", // Overlay
        "grayscale-[100%] hover:grayscale-0 hover:before:opacity-0 before:transition-opacity before:duration-700", // Effects
        // Positioning
        "before:left-0 before:top-0"
      ),
    },
    {
      // Card 2
      className: cn(
        "[grid-area:stack]",
        "translate-x-0 translate-y-0", // Mobile Reset
        "md:translate-x-16 md:translate-y-10", // Desktop Position
        "hover:-translate-y-1",
        "before:absolute before:h-[100%] before:w-[100%] before:rounded-xl before:bg-background/50 before:bg-blend-overlay before:content-[''] before:outline-1 before:outline-border",
        "grayscale-[100%] hover:grayscale-0 hover:before:opacity-0 before:transition-opacity before:duration-700",
        "before:left-0 before:top-0"
      ),
    },
    {
      // Card 3
      className: cn(
        "[grid-area:stack]",
        "translate-x-0 translate-y-0", // Mobile Reset
        "md:translate-x-32 md:translate-y-20", // Desktop Position
        "hover:translate-y-10"
      ),
    },
  ];

  const displayCards = cards || defaultCards;

  return (
    <div className="flex flex-col items-center gap-6 py-10 md:grid md:place-items-center md:gap-0 md:[grid-template-areas:'stack']">
      {displayCards.map((cardProps, index) => (
        <DisplayCard key={index} {...cardProps} />
      ))}
    </div>
  );
}