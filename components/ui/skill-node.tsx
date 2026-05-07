'use client'

import { cn } from '@/lib/utils'
import type { SkillItem } from '@/data/skills'

interface SkillNodeProps {
  skill: SkillItem
  className?: string
}

const levelStyles: Record<SkillItem['level'], string> = {
  expert:
    'bg-violet-500/15 border-violet-500/40 text-violet-200 shadow-[0_0_15px_rgba(139,92,246,0.1)]',
  proficient:
    'bg-cyan-500/10 border-cyan-500/25 text-cyan-200 hover:border-cyan-400/50',
  familiar:
    'bg-white/[0.03] border-white/[0.08] text-white/50 hover:border-white/20 hover:text-white/70',
}

const levelLabels: Record<SkillItem['level'], string> = {
  expert: 'E',
  proficient: 'P',
  familiar: 'F',
}

export function SkillNode({ skill, className }: SkillNodeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium tracking-wide transition-all duration-300 cursor-default whitespace-nowrap',
        levelStyles[skill.level],
        'hover:scale-105',
        className
      )}
    >
      {skill.name}
      <span
        className={cn(
          'flex items-center justify-center w-4 h-4 rounded-full text-[10px] font-bold',
          skill.level === 'expert' && 'bg-violet-500/30 text-violet-300',
          skill.level === 'proficient' && 'bg-cyan-500/20 text-cyan-300',
          skill.level === 'familiar' && 'bg-white/10 text-white/40'
        )}
      >
        {levelLabels[skill.level]}
      </span>
    </span>
  )
}
