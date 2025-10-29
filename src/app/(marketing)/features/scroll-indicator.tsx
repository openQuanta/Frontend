"use client";
import React, { useEffect, useState, RefObject } from "react";
import { cn } from "@/lib/utils";

interface ScrollSection {
  id: string;
  label: string;
  number: string;
}

interface ScrollIndicatorProps {
  sections?: ScrollSection[]; // made optional to avoid undefined issues
  className?: string;
  scrollContainerRef?: RefObject<HTMLDivElement | null>;
}

export function ScrollIndicator({
  sections = [],
  className,
  scrollContainerRef,
}: ScrollIndicatorProps) {
  const [activeSection, setActiveSection] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    if (!sections || sections.length === 0) return;

    // Get the container that holds all the scrollable sections (from Page.tsx)
    const sectionWrapper = scrollContainerRef?.current;

    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const scrollCenter = scrollTop + windowHeight / 2;
      const documentScrollHeight = document.documentElement.scrollHeight;

      // Find current section
      let current = 0;
      sections.forEach((section, i) => {
        const el = document.getElementById(section.id);
        if (!el) return;

        const elTopRelative = el.offsetTop;
        const elBottomRelative = elTopRelative + el.offsetHeight;

        if (scrollCenter >= elTopRelative && scrollCenter < elBottomRelative) {
          current = i;
        }
      });

      setActiveSection(current);

      // Compute fractional progress inside current section
      const curEl = document.getElementById(sections[current].id);
      if (curEl) {
        const curTop = curEl.offsetTop;
        const nextEl =
          current < sections.length - 1
            ? document.getElementById(sections[current + 1].id)
            : null;

        const lastSectionEnd = sectionWrapper
          ? sectionWrapper.offsetTop + sectionWrapper.offsetHeight
          : documentScrollHeight;

        const nextTop = nextEl ? nextEl.offsetTop : lastSectionEnd;
        const sectionHeight = Math.max(nextTop - curTop, 1);
        const progressInSection = (scrollCenter - curTop) / sectionHeight;
        const clamped = Math.min(Math.max(progressInSection, 0), 1);

        setScrollProgress(current + clamped);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll(); // Initial run

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [sections, scrollContainerRef]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    const scrollOffset =
      el.offsetTop - window.innerHeight / 2 + el.offsetHeight / 2;
    window.scrollTo({ top: scrollOffset, behavior: "smooth" });
  };

  // ✅ Safe scroll progress calculation
  const totalSections = sections?.length ?? 0;
  const normalizedPercent =
    totalSections > 0
      ? Math.min(Math.max((scrollProgress / totalSections) * 100, 0), 100)
      : 0;

  // ✅ Avoid rendering until data is ready
  if (!sections || sections.length === 0) return null;

  return (
    <div
      className={cn("w-full sticky top-0", className)}
      style={{ minHeight: "calc(100vh - 150px)" }}
    >
      <span className="text-lg font-light text-white">Summary</span>
      <div className="relative w-11 mt-[62px]">
        {/* Background line */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-zinc-800" />

        {/* Progress line */}
        <div
          className="absolute left-1/2 -translate-x-1/2 top-0 w-[1px] bg-white transition-all duration-200 ease-out"
          style={{ height: `${normalizedPercent}%` }}
        />

        {/* Moving indicator */}
        <div
          className="absolute left-1/2 -translate-x-1/2 w-[35px] h-[24px] border border-white transition-all duration-200 ease-out flex justify-center items-center bg-black
            before:content-[''] before:absolute before:left-0 before:top-1/2 before:w-[10px] before:flex before:items-center before:justify-center before:h-[25px] before:bg-black before:-translate-x-[-12px] before:-translate-y-1/2"
          style={{ top: `calc(${normalizedPercent}% - 13px)` }}
        >
          <div className="w-[5px] h-[5px] bg-white rounded-[1px] absolute" />
        </div>

        {/* Section labels */}
        <div className="relative mt-6 space-y-12 pl-6">
          {sections.map((section, index) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className="flex items-center gap-6 group cursor-pointer w-full text-left"
              aria-label={`Go to ${section.label}`}
            >
              <div className="w-7 h-7" />
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    "text-lg font-light transition-all duration-200 ease-out whitespace-nowrap",
                    index === activeSection
                      ? "text-white"
                      : "text-zinc-500 group-hover:text-zinc-400"
                  )}
                >
                  {section.label}
                </span>
                <span
                  className={cn(
                    "text-sm font-light transition-all duration-200 ease-out",
                    index === activeSection ? "text-zinc-400" : "text-zinc-600"
                  )}
                >
                  {section.number}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
