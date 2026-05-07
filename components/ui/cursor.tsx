'use client'

import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap-config'
import { useCursor } from '@/components/providers/cursor-provider'

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const { isHovering } = useCursor()

  useEffect(() => {
    const cursor = cursorRef.current
    const ring = ringRef.current
    if (!cursor || !ring) return

    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.12, ease: 'power2.out' })
      gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.3, ease: 'power2.out' })
    }

    window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [])

  return (
    <>
      {/* Inner dot — visible on hover */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[150] -translate-x-1/2 -translate-y-1/2 hidden md:block transition-all duration-300"
        style={{
          width: isHovering ? '6px' : '0px',
          height: isHovering ? '6px' : '0px',
          borderRadius: '50%',
          background: '#A78BFA',
          boxShadow: isHovering ? '0 0 16px rgba(139,92,246,0.8)' : 'none',
        }}
      />
      {/* Outer ring — always visible */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[149] -translate-x-1/2 -translate-y-1/2 hidden md:block transition-all duration-300"
        style={{
          width: isHovering ? '40px' : '28px',
          height: isHovering ? '40px' : '28px',
          borderRadius: '50%',
          border: `1px solid ${isHovering ? 'rgba(34,211,238,0.5)' : 'rgba(139,92,246,0.25)'}`,
        }}
      />
    </>
  )
}
