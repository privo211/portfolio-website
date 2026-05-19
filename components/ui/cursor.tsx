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
      <div
        ref={cursorRef}
        aria-hidden="true"
        className="custom-cursor-dot fixed top-0 left-0 pointer-events-none z-[150] -translate-x-1/2 -translate-y-1/2 hidden md:block transition-all duration-300"
        style={{
          width: isHovering ? '4px' : '0px',
          height: isHovering ? '4px' : '0px',
          borderRadius: '50%',
          background: 'var(--theme-accent)',
          boxShadow: isHovering ? '0 0 12px var(--theme-accent-glow-strong)' : 'none',
          willChange: 'transform',
        }}
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        className="custom-cursor-ring fixed top-0 left-0 pointer-events-none z-[149] -translate-x-1/2 -translate-y-1/2 hidden md:block transition-all duration-300"
        style={{
          width: isHovering ? '28px' : '20px',
          height: isHovering ? '28px' : '20px',
          borderRadius: '50%',
          border: `1px solid ${isHovering ? 'var(--theme-accent)' : 'var(--theme-accent-glow)'}`,
          willChange: 'transform',
        }}
      />
    </>
  )
}
