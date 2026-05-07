'use client'

import { SplitText } from './split-text'

interface SectionHeadingProps {
  title: string
  subtitle?: string
  eyebrow?: string
}

export function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <div className="mb-16 md:mb-20">
      {subtitle && (
        <span className="inline-flex items-center gap-2 font-mono text-[0.7rem] text-violet-400/60 uppercase tracking-[0.15em] font-medium mb-5">
          <span className="text-cyan-400/60">&gt;</span>
          {subtitle}
        </span>
      )}
      <SplitText
        as="h2"
        type="words"
        className="font-display text-[clamp(2rem,6vw,5rem)] font-bold leading-[1.05] tracking-[-0.02em] text-white"
      >
        {title}
      </SplitText>
    </div>
  )
}
