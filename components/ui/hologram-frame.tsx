'use client'

import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface HologramFrameProps {
  children: ReactNode
  className?: string
  variant?: 'panel' | 'card' | 'terminal'
  glowColor?: 'violet' | 'cyan'
}

export function HologramFrame({
  children,
  className,
  variant = 'card',
  glowColor = 'violet',
}: HologramFrameProps) {
  const glowClasses = {
    violet: 'hover:border-violet-500/30 hover:shadow-[0_0_30px_rgba(139,92,246,0.1)]',
    cyan: 'hover:border-cyan-400/30 hover:shadow-[0_0_30px_rgba(34,211,238,0.1)]',
  }

  const variantClasses = {
    panel:
      'rounded-2xl border border-white/[0.06] bg-[#0D0D14]/80 backdrop-blur-md p-8 md:p-10',
    card: 'rounded-2xl border border-white/[0.05] bg-[#0D0D14]/80 backdrop-blur-sm p-6 md:p-8',
    terminal:
      'rounded-xl border border-white/[0.08] bg-[#0A0A0F]/90 backdrop-blur-md p-6 font-mono text-sm',
  }

  return (
    <div
      className={cn(
        'relative overflow-hidden transition-all duration-500 group',
        variantClasses[variant],
        glowClasses[glowColor],
        'holo-shimmer',
        className
      )}
    >
      <div className="scan-lines opacity-[0.03]" />
      <div className="relative z-10">{children}</div>
    </div>
  )
}
