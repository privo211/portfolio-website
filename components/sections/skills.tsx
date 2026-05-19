'use client'

import { SectionHeading } from '@/components/ui/section-heading'
import { FadeIn } from '@/components/animations/fade-in'
import { StaggerReveal, StaggerItem } from '@/components/animations/stagger-reveal'
import { skillCategories } from '@/data/skills'

export function Skills() {
  return (
    <section id="skills" className="relative py-28 md:py-36 lg:py-44 section-padding">
      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionHeading title="Tech Stack" subtitle="Technologies I use" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 sm:gap-16">
          {skillCategories.map((category, ci) => (
            <FadeIn key={category.name} delay={ci * 0.08}>
              <div className="space-y-5">
                <h3 className="font-mono text-[0.7rem] text-violet-400 uppercase tracking-[0.12em] font-medium flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-violet-500" />
                  {category.name}
                </h3>
                <StaggerReveal className="flex flex-wrap gap-2" stagger={0.03}>
                  {category.skills.map((skill) => {
                    const isPrimary = skill.level === 'expert'
                    return (
                      <StaggerItem key={skill.name}>
                        <span
                          className={`inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-300 cursor-default whitespace-nowrap hover:scale-105 ${
                            isPrimary
                              ? 'bg-[var(--theme-accent-glow)] border-[var(--theme-accent)]/30 text-[var(--theme-accent)]'
                              : 'bg-[var(--theme-bg-subtle)] border-[var(--theme-border)] text-[var(--theme-text-muted)]'
                          }`}
                        >
                          {skill.name}
                        </span>
                      </StaggerItem>
                    )
                  })}
                </StaggerReveal>
              </div>
            </FadeIn>
          ))}
        </div>

        <div className="mt-16 flex items-center justify-center gap-6">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--theme-accent)]/30 border border-[var(--theme-accent)]/40" />
            <span className="font-mono text-[0.7rem] text-[var(--theme-text-muted)] uppercase tracking-[0.08em]">Core</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--theme-bg-subtle)] border border-[var(--theme-border)]" />
            <span className="font-mono text-[0.7rem] text-[var(--theme-text-muted)] uppercase tracking-[0.08em]">Proficient</span>
          </div>
        </div>
      </div>
    </section>
  )
}
