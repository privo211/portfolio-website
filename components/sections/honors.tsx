'use client'

import { SectionHeading } from '@/components/ui/section-heading'
import { FadeIn } from '@/components/animations/fade-in'
import { honors } from '@/data/honors'
import { Trophy, Star, Medal } from 'lucide-react'

const tierConfig = {
  platinum: {
    icon: Trophy,
    border: 'border-amber-400/30',
    bg: 'bg-amber-400/5',
    iconColor: 'text-amber-300',
    glow: 'hover:shadow-[0_0_40px_rgba(251,191,36,0.1)]',
    badge: 'bg-amber-400/10 border-amber-400/25 text-amber-300/80',
  },
  gold: {
    icon: Medal,
    border: 'border-amber-500/25',
    bg: 'bg-amber-500/4',
    iconColor: 'text-amber-400/80',
    glow: 'hover:shadow-[0_0_30px_rgba(245,158,11,0.08)]',
    badge: 'bg-amber-500/8 border-amber-500/20 text-amber-400/70',
  },
  silver: {
    icon: Star,
    border: 'border-zinc-500/20',
    bg: 'bg-zinc-500/3',
    iconColor: 'text-zinc-400',
    glow: 'hover:shadow-[0_0_20px_rgba(161,161,170,0.06)]',
    badge: 'bg-zinc-500/8 border-zinc-500/20 text-zinc-400/70',
  },
} as const

export function Honors() {
  return (
    <section id="honors" className="relative py-28 md:py-36 lg:py-44 section-padding">
      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionHeading title="Honors & Awards" subtitle="recognition" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {honors.map((honor, i) => {
            const config = tierConfig[honor.tier]
            const Icon = config.icon

            return (
              <FadeIn key={honor.id} delay={i * 0.1}>
                <div className={`glass-card p-7 h-full flex flex-col ${config.glow}`}>
                  <div className={`w-10 h-10 rounded-lg ${config.bg} border ${config.border} flex items-center justify-center mb-5`}>
                    <Icon size={20} className={config.iconColor} />
                  </div>

                  <h3 className="font-display text-lg font-bold text-white mb-2">
                    {honor.title}
                  </h3>
                  <p className="font-mono text-xs text-violet-400/70 mb-3 uppercase tracking-[0.06em]">
                    {honor.issuer}
                  </p>
                  <p className="text-sm text-white/40 leading-relaxed flex-1 mb-5">
                    {honor.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-white/[0.05]">
                    <span className={`inline-flex items-center gap-1.5 rounded-full ${config.badge} px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.08em]`}>
                      {honor.tier}
                    </span>
                    <span className="font-mono text-[0.6rem] text-white/25 tracking-[0.06em]">
                      {honor.date}
                    </span>
                  </div>
                </div>
              </FadeIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}
