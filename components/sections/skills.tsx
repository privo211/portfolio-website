'use client'

import { SectionHeading } from '@/components/ui/section-heading'
import { Marquee } from '@/components/ui/marquee'
import { FadeIn } from '@/components/animations/fade-in'
import { StaggerReveal, StaggerItem } from '@/components/animations/stagger-reveal'
import { skillCategories, allSkills } from '@/data/skills'

const levelBadge: Record<string, string> = {
  expert: 'bg-violet-500/15 border-violet-500/30 text-violet-300 shadow-[0_0_10px_rgba(124,58,237,0.1)]',
  proficient: 'bg-cyan-400/8 border-cyan-400/20 text-cyan-300',
  familiar: 'bg-white/[0.02] border-white/[0.06] text-white/35',
}

const levelLabel: Record<string, string> = { expert: 'E', proficient: 'P', familiar: 'F' }

export function Skills() {
  return (
    <section id="skills" className="relative py-28 md:py-36 lg:py-44 section-padding">
      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionHeading title="Tech Stack" subtitle="engineering bay" />

        <FadeIn className="mb-20 -mx-6 md:-mx-10 lg:-mx-16">
          <Marquee
            items={allSkills}
            className="text-5xl md:text-7xl font-bold text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.05)] uppercase tracking-[0.08em] select-none"
            speed={50}
          />
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 sm:gap-16">
          {skillCategories.map((category, ci) => (
            <FadeIn key={category.name} delay={ci * 0.08}>
              <div className="space-y-5">
                <h3 className="font-mono text-[0.7rem] text-violet-400 uppercase tracking-[0.12em] font-medium flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-violet-500" />
                  {category.name}
                </h3>
                <StaggerReveal className="flex flex-wrap gap-2" stagger={0.03}>
                  {category.skills.map((skill) => (
                    <StaggerItem key={skill.name}>
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-300 cursor-default whitespace-nowrap hover:scale-105 ${levelBadge[skill.level]}`}
                      >
                        {skill.name}
                        <span className="flex items-center justify-center w-3.5 h-3.5 rounded-full text-[0.5rem] font-bold bg-inherit opacity-50">
                          {levelLabel[skill.level]}
                        </span>
                      </span>
                    </StaggerItem>
                  ))}
                </StaggerReveal>
              </div>
            </FadeIn>
          ))}
        </div>

        <div className="mt-16 flex items-center justify-center gap-6">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-violet-500/30 border border-violet-500/40" />
            <span className="font-mono text-[0.6rem] text-white/25 uppercase tracking-[0.08em]">Expert</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400/20 border border-cyan-400/25" />
            <span className="font-mono text-[0.6rem] text-white/25 uppercase tracking-[0.08em]">Proficient</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-white/8 border border-white/[0.08]" />
            <span className="font-mono text-[0.6rem] text-white/25 uppercase tracking-[0.08em]">Familiar</span>
          </div>
        </div>
      </div>
    </section>
  )
}
