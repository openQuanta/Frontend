'use client'
import React, { useEffect, useState, RefObject } from 'react';
import { cn } from '@/lib/utils';

interface ScrollSection {
  id: string;
  label: string;
  number: string;
}

interface ScrollIndicatorProps {
  sections: ScrollSection[];
  className?: string;
  scrollContainerRef?: RefObject<HTMLDivElement | null>;
}

export function ScrollIndicator({ sections, className, scrollContainerRef }: ScrollIndicatorProps) {
  const [activeSection, setActiveSection] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    const container = scrollContainerRef?.current;
    if (!container) return;

    const handleScroll = () => {
      // center point inside the scroll container, in scroll coordinates
      const containerRect = container.getBoundingClientRect();
      const containerTop = containerRect.top;
      const containerScrollTop = container.scrollTop;
      const containerCenter = containerScrollTop + container.clientHeight / 2;

      // find current section by comparing containerCenter to each section bounds
      let current = 0;
      sections.forEach((section, i) => {
        const el = document.getElementById(section.id);
        if (!el) return;
        const elRect = el.getBoundingClientRect();
        const elTopRelative = elRect.top - containerTop + containerScrollTop;
        const elBottomRelative = elTopRelative + el.offsetHeight;
        if (containerCenter >= elTopRelative && containerCenter < elBottomRelative) {
          current = i;
        }
      });

      setActiveSection(current);

      // compute fractional progress inside current section
      const curEl = document.getElementById(sections[current].id);
      const nextEl = current < sections.length - 1 ? document.getElementById(sections[current + 1].id) : null;

      if (curEl) {
        const curTop = curEl.getBoundingClientRect().top - containerTop + containerScrollTop;
        const nextTop = nextEl ? (nextEl.getBoundingClientRect().top - containerTop + containerScrollTop) : container.scrollHeight;
        const sectionHeight = Math.max(nextTop - curTop, 1);
        const progressInSection = (containerCenter - curTop) / sectionHeight;
        const clamped = Math.min(Math.max(progressInSection, 0), 1);
        setScrollProgress(current + clamped);
      }
    };

    // initial calc
    handleScroll();

    container.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [sections, scrollContainerRef]);

  const scrollToSection = (id: string) => {
    const container = scrollContainerRef?.current;
    const el = document.getElementById(id);
    if (!container || !el) return;
    const containerTop = container.getBoundingClientRect().top;
    const elTop = el.getBoundingClientRect().top;
    const offset = elTop - containerTop + container.scrollTop;
    container.scrollTo({ top: offset, behavior: 'smooth' });
  };

  const normalizedPercent = Math.min(Math.max((scrollProgress / sections.length) * 100, 0), 100);

  return (
    <div className={cn('sticky top-1/2 -translate-y-1/2 z-30', className)}>
      <span>Summary</span>
      <div className="relative w-11 mt-[62px]">
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-zinc-800" />

        <div
          className="absolute left-1/2 -translate-x-1/2 top-0 w-[1px] bg-gradient-to-b from-blue-500 via-blue-600 to-transparent transition-all duration-200 ease-out"
          style={{ height: `${normalizedPercent}%` }}
        />

        <div
          className="absolute left-1/2 -translate-x-1/2 w-7 h-7 border border-white bg-transparent rounded-full transition-all duration-200 ease-out"
          style={{ top: `calc(${normalizedPercent}% - 13px)` }}
        >
          <div className="w-full h-full bg-white/10 rounded-full" />
        </div>

        <div className="relative mt-6 space-y-12">
          {sections.map((section, index) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className="flex items-center gap-6 group cursor-pointer"
              aria-label={`Go to ${section.label}`}
            >
              <div className="w-7 h-7" />
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    'text-lg font-light transition-all duration-200 ease-out whitespace-nowrap',
                    index === activeSection ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-400'
                  )}
                >
                  {section.label}
                </span>
                <span
                  className={cn(
                    'text-sm font-light transition-all duration-200 ease-out',
                    index === activeSection ? 'text-zinc-400' : 'text-zinc-600'
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
