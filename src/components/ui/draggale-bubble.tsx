'use client'
import React, { useRef, useState, useEffect } from 'react'

interface DraggableBubbleProps {
  size?: number
  color?: string
  initialX?: number
  initialY?: number
  constrainToWindow?: boolean
  children?: React.ReactNode
}

export default function DraggableBubble({
  size = 64,
  color = 'bg-indigo-500',
  initialX = 20,
  initialY = 20,
  constrainToWindow = true,
  children
}: DraggableBubbleProps) {
  const boxRef = useRef<HTMLDivElement | null>(null)
  const draggingRef = useRef(false)
  const offsetRef = useRef({ x: 0, y: 0 })
  const [pos, setPos] = useState({ x: initialX, y: initialY })

  useEffect(() => {
    function onPointerMove(e: PointerEvent) {
      if (!draggingRef.current) return
      const clientX = e.clientX
      const clientY = e.clientY

      let nextX = clientX - offsetRef.current.x
      let nextY = clientY - offsetRef.current.y

      if (constrainToWindow && boxRef.current) {
        const { offsetWidth: w, offsetHeight: h } = boxRef.current
        const maxX = window.innerWidth - w
        const maxY = window.innerHeight - h
        if (nextX < 0) nextX = 0
        if (nextY < 0) nextY = 0
        if (nextX > maxX) nextX = maxX
        if (nextY > maxY) nextY = maxY
      }

      setPos({ x: nextX, y: nextY })
    }

    function onPointerUp() {
      draggingRef.current = false
      document.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('pointerup', onPointerUp)
    }

    document.addEventListener('pointermove', onPointerMove)
    document.addEventListener('pointerup', onPointerUp)

    return () => {
      document.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('pointerup', onPointerUp)
    }
  }, [constrainToWindow])

  function onPointerDown(e: React.PointerEvent) {
    const target = boxRef.current
    if (!target) return

    draggingRef.current = true
    const rect = target.getBoundingClientRect()
    offsetRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    // capture pointer so moves outside the bubble still track
    ;(e.target as Element).setPointerCapture(e.pointerId)
  }

  function onKeyDown(e: React.KeyboardEvent) {
    const step = 8
    if (e.key === 'ArrowUp') setPos(p => ({ x: p.x, y: Math.max(0, p.y - step) }))
    if (e.key === 'ArrowDown') setPos(p => ({ x: p.x, y: Math.min(window.innerHeight - size, p.y + step) }))
    if (e.key === 'ArrowLeft') setPos(p => ({ x: Math.max(0, p.x - step), y: p.y }))
    if (e.key === 'ArrowRight') setPos(p => ({ x: Math.min(window.innerWidth - size, p.x + step), y: p.y }))
  }

  return (
    <div
      ref={boxRef}
      onPointerDown={onPointerDown}
      onKeyDown={onKeyDown}
      tabIndex={0}
      role="button"
      aria-label="draggable bubble"
      style={{
        width: size,
        height: size,
        transform: `translate(${pos.x}px, ${pos.y}px)`
      }}
      className={`fixed ${color} rounded-full shadow-lg flex items-center justify-center cursor-grab active:cursor-grabbing select-none touch-none`}>
      <div className="pointer-events-none">
        {children || null}
      </div>
    </div>
  )
}

/*
Usage example

import DraggableBubble from './DraggableBubble'

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50">
      <DraggableBubble size={72} color="bg-emerald-500" initialX={100} initialY={120}>
        <span className="text-white font-medium">Hi</span>
      </DraggableBubble>
    </div>
  )
}
*/
