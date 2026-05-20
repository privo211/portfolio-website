'use client'

import { SplitText } from './split-text'

interface SectionHeadingProps {
  title: string
  subtitle?: string
  eyebrow?: string
}

export function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <div className="mb-14 md:mb-16">
      {subtitle && (
        <span className="inline-flex items-center gap-2 font-mono text-[0.7rem] text-[var(--theme-accent)] uppercase tracking-[0.15em] font-medium mb-4">
          {subtitle}
        </span>
      )}
      <SplitText
        as="h2"
        type="words"
        className="font-display text-[clamp(1.75rem,4vw,3.25rem)] font-bold leading-[1.1] tracking-[-0.02em] text-[var(--theme-text)]"
      >
        {title}
      </SplitText>
    </div>
  )
}
