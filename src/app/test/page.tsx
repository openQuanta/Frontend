"use client";

import React, { useRef } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import clsx from "clsx";

const cards = [
  { id: 1, title: "Introduction", color: "#ef4444" },
  { id: 2, title: "Features", color: "#3b82f6" },
  { id: 3, title: "Pricing", color: "#22c55e" },
  { id: 4, title: "Contact", color: "#f59e0b" },
];

export default function ScrollWithIndicator() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 120px", "end end"],
  });

  // Smoothly interpolate the circle position between titles
  const circleY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, (cards.length - 1) * 48] // 48px gap between each title (adjust if you changed `space-y-4`)
  );

  // Map color interpolation too
  const circleColor = useTransform(
    scrollYProgress,
    [0, 0.33, 0.66, 1],
    cards.map((c) => c.color)
  );

  // Track current section index
  const [activeIndex, setActiveIndex] = React.useState(0);
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const index = Math.round(latest * (cards.length - 1));
    setActiveIndex(index);
  });

  return (
    <div ref={containerRef} className="flex min-h-[300vh]">
      {/* Left Panel */}
      <div className="sticky top-0 h-screen w-1/4 flex items-center justify-center space-x-6">
        <div className="relative flex gap-8 items-start">
          {/* Scroll Bar */}
          <div className="relative h-[200px] w-1 bg-gray-200 rounded-full">
            <motion.div
              style={{
                translateY: circleY,
                backgroundColor: "#ffffff",
              }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="absolute left-1/2 -translate-x-1/2 h-4 w-4 rounded-full"
            />
          </div>

          {/* Titles */}
          <ul className="flex flex-col space-y-4">
            {cards.map((card, i) => (
              <motion.li
                key={card.id}
                animate={{
                  color: i === activeIndex ? card.color : "#9ca3af",
                  scale: i === activeIndex ? 1.1 : 1,
                }}
                transition={{ duration: 0.3 }}
                className={clsx(
                  "font-semibold text-lg cursor-pointer select-none"
                )}
              >
                {card.title}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right Panel (cards) */}
      <div className="w-3/4 space-y-[100vh] p-20">
        {cards.map((card, i) => (
          <div
            key={card.id}
            data-index={i}
            className="h-[80vh] rounded-2xl shadow-lg flex items-center justify-center text-4xl font-bold"
            style={{ backgroundColor: card.color + "22" }}
          >
            {card.title}
          </div>
        ))}
      </div>
    </div>
  );
}
