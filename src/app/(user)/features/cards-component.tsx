'use client'

import React from 'react'

type LayeredCardProps = {
    title: string
    description?: string
    width?: string
    height?: string
    className?: string
}

export default function LayeredCard({
    title,
    description,
    width = 'w-[861px]',
    height = 'h-[332px]',
    className = ''
}: LayeredCardProps) {
    return (
        <div className={`bg-background flex justify-center text-white ${width} ${height} mt-0 relative ${className}`}>
            {/* Card 3 - Bottom layer */}
            <div className="absolute bg-muted rounded-lg shadow-lg border border-border w-[780px] h-[330px] bottom-0"></div>

            {/* Card 2 - Middle layer */}
            <div className="absolute bg-card rounded-lg shadow-xl border border-border w-[800px] h-[318px] bottom-0"></div>

            {/* Card 1 - Top layer */}
            <div className="absolute bg-primary rounded-lg shadow-2xl border border-border w-[830px] h-[300px] bottom-0">
                <div className="p-6">
                    <h3 className="text-lg font-semibold mb-2">{title}</h3>
                    {description && <p>{description}</p>}
                </div>
            </div>
        </div>
    )
}
