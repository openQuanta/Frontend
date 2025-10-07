'use client'

import React, { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface ScrollSection {
    id: string
    label: string
    number: string
}

interface ScrollIndicatorProps {
    sections: ScrollSection[]
    className?: string
}

export function ScrollIndicator({ sections, className }: ScrollIndicatorProps) {
    const [activeSection, setActiveSection] = useState(0)
    const [scrollProgress, setScrollProgress] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + window.innerHeight / 2

            let current = 0
            sections.forEach((section, i) => {
                const el = document.getElementById(section.id)
                if (el) {
                    const top = el.offsetTop
                    if (scrollPosition >= top) current = i
                }
            })

            setActiveSection(current)

            const curEl = document.getElementById(sections[current].id)
            const nextEl = current < sections.length - 1 ? document.getElementById(sections[current + 1].id) : null

            if (curEl) {
                const curTop = curEl.offsetTop
                const nextTop = nextEl ? nextEl.offsetTop : document.body.scrollHeight
                const sectionHeight = nextTop - curTop
                const progressInSection = (scrollPosition - curTop) / sectionHeight
                setScrollProgress(current + Math.min(Math.max(progressInSection, 0), 1))
            }
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        handleScroll()
        return () => window.removeEventListener('scroll', handleScroll)
    }, [sections])

    const scrollToSection = (id: string) => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }

    return (
        <div className={cn('sticky top-1/2 -translate-y-1/2 z-30', className)}>
            <span className=''>Summary</span>
            <div className="relative w-11">
                {/* base line */}
                <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-zinc-800" />

                {/* progress line */}
                <div
                    className="absolute left-1/2 -translate-x-1/2 top-0 w-[1px] bg-gradient-to-b from-blue-500 via-blue-600 to-transparent transition-all duration-500 ease-out"
                    style={{ height: `calc(${(scrollProgress / sections.length) * 100}%)` }}
                />

                {/* handle */}
                <div
                    className="absolute left-1/2 -translate-x-1/2 w-7 h-7 border border-white bg-transparent rounded-full transition-all duration-500 ease-out"
                    style={{ top: `calc(${(scrollProgress / sections.length) * 100}% - 13px)` }}
                >
                    <div className="w-full h-full bg-white/10 rounded-full" />
                </div>

                {/* labels */}
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
                                        'text-lg font-light transition-all duration-500 ease-out whitespace-nowrap',
                                        index === activeSection ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-400',
                                    )}
                                >
                                    {section.label}
                                </span>
                                <span
                                    className={cn(
                                        'text-sm font-light transition-all duration-500 ease-out',
                                        index === activeSection ? 'text-zinc-400' : 'text-zinc-600',
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
    )
}
