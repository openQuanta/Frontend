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
            <div className="absolute bg-[#FF4C0C]/7 rounded-lg w-[780px] h-[330px] bottom-0"></div>

            {/* Card 2 - Middle layer */}
            <div className="absolute bg-[#FF4C0C]/4 rounded-lg w-[800px] h-[318px] bottom-0"></div>

            {/* Card 1 - Top layer */}
            <div className="absolute bg-[#331B12]/50 rounded-lg w-[830px] h-[300px] bottom-0">
                <div className="p-6">
                    <h3 className="text-lg font-semibold mb-2">{title}</h3>
                    {description && <p>{description}</p>}
                </div>
            </div>
        </div>
    )
}
