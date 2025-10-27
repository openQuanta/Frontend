'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import LayeredCard from './cards-component'

interface ScrollSection {
    id: string
    label: string
    number: string
}

interface FlippingStackProps {
    sections: ScrollSection[]
}

const cardTextStates: Record<string, string[][]> = {
    'upload-research': [
        ['Start uploading', 'Begin submission', 'Upload files'],
        ['Verify research', 'Check authenticity'],
        ['Get visibility', 'Showcase work']
    ],
    'peer-review-nft': [
        ['Get your NFT', 'Claim your NFT'],
        ['Mint your NFT', 'Create NFT'],
        ['Sell your NFT', 'Trade NFT']
    ],
    'reputation-layer': [
        ['Build your reputation', 'Earn reputation'],
        ['Earn badges', 'Unlock badges'],
        ['Level up', 'Advance rank']
    ],
    'authorship-nft': [
        ['Claim authorship', 'Secure authorship'],
        ['Secure your work', 'Protect your work'],
        ['Share with peers', 'Distribute work']
    ],
    'open-access-tool': [
        ['Open tools', 'Access tools'],
        ['Collaborate', 'Work together'],
        ['Publish freely', 'Release publicly']
    ],
    'auction-bids': [
        ['Create auction', 'Start auction'],
        ['Place bids', 'Bid items'],
        ['Close deals', 'Finalize deals']
    ]
}

export default function FlippingStack({ sections }: FlippingStackProps) {
    const [activeSection, setActiveSection] = useState(sections[0].id)
    const [flipIndex, setFlipIndex] = useState(0)
    console.log('Active Section:', sections)
    // Detect active section on scroll and on initial mount
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + window.innerHeight / 2
            let currentSection = sections[0].id

            sections.forEach(section => {
                const element = document.getElementById(section.id)
                if (element && scrollPosition >= element.offsetTop) {
                    currentSection = section.id
                }
            })

            setActiveSection(currentSection)
            setFlipIndex(0)
        }

        // Run once on mount
        handleScroll()

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [sections])

    // Flip cards every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setFlipIndex(prev => (prev === 0 ? 1 : 0))
        }, 3000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="relative w-[861px] h-[332px] flex flex-col gap-4 perspective-1000">
            {cardTextStates[activeSection].map((states, index) => {
                console.log('Rendering card with states:', states)
                return (
                    <motion.div
                        key={index}
                        animate={{ rotateX: flipIndex ? 180 : 0, opacity: 1 }}
                        initial={{ opacity: 0 }}
                        transition={{
                            type: 'spring',
                            stiffness: 300,
                            damping: 20,
                            mass: 1,
                            delay: index * 0.3
                        }}
                        className="absolute top-0 left-0 w-full"
                        style={{ zIndex: 3 - index, transformStyle: 'preserve-3d' }}
                    >
                        <div className="absolute w-full h-full backface-hidden">
                            <LayeredCard title={states[0]} />
                        </div>
                        <div className="absolute w-full h-full rotate-x-180 backface-hidden">
                            <LayeredCard title={states[1]} />
                        </div>
                        <div className="absolute w-full h-full rotate-x-360 backface-hidden">
                            <LayeredCard title={states[2]} />
                        </div>
                    </motion.div>
                )
            })}
        </div>
    )
}
