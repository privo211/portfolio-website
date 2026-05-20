'use client'

import { SectionHeading } from '@/components/ui/section-heading'
import { FadeIn } from '@/components/animations/fade-in'
import { education } from '@/data/education'
import { honors } from '@/data/honors'
import { GraduationCap, Award, BookOpen } from 'lucide-react'

export function Education() {
  return (
    <section id="education" className="relative py-20 md:py-28 lg:py-32 section-padding">
      <div className="relative z-10 mx-auto max-w-4xl">
        <SectionHeading title="Education" subtitle="My education" />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-8">
          <FadeIn>
            <div className="bg-[var(--theme-bg-elevated)] border border-[var(--theme-border)] rounded-[1.5rem] p-8 sm:p-10 h-full">
              <div className="flex flex-col sm:flex-row sm:items-start gap-6">
                <div className="shrink-0 w-14 h-14 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
                  <GraduationCap size={28} className="text-violet-400" />
                </div>
                <div className="w-full">
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-[var(--theme-text)] mb-1">
                    {education.school}
                  </h3>
                  <p className="text-[var(--theme-text-muted)] text-base sm:text-lg font-medium mb-1">
                    {education.degree}
                  </p>
                  <p className="text-[var(--theme-text-muted)] opacity-60 text-sm mb-6">
                    {education.location} <span className="mx-2 opacity-30">·</span> {education.period}
                  </p>

                  <div className="flex flex-wrap gap-2.5 mb-8">
                    {education.honors.map((honor) => (
                      <span
                        key={honor}
                        className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/8 border border-amber-400/20 px-3.5 py-1.5 text-xs font-medium text-amber-600 dark:text-amber-300/80"
                      >
                        <Award size={12} />
                        {honor}
                      </span>
                    ))}
                    {honors.map((honor) => (
                      <span
                        key={honor.id}
                        className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/8 border border-amber-400/20 px-3.5 py-1.5 text-xs font-medium text-amber-600 dark:text-amber-300/80"
                      >
                        <Award size={12} />
                        {honor.title}
                      </span>
                    ))}
                  </div>

                  <div className="pt-6 border-t border-[var(--theme-border)]">
                    <h4 className="flex items-center gap-2 font-mono text-[0.65rem] text-violet-400/70 uppercase tracking-[0.12em] mb-4">
                      <BookOpen size={14} />
                      Relevant Coursework
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {education.coursework.map((course) => (
                        <span
                          key={course}
                          className="inline-flex rounded-full bg-[var(--theme-bg-subtle)] border border-[var(--theme-border)] px-3.5 py-1 text-xs text-[var(--theme-text-muted)] hover:border-violet-500/30 transition-all duration-300 cursor-default"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="bg-[var(--theme-bg-subtle)] border border-[var(--theme-border)] rounded-xl p-8 h-full flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-violet-500/10 border-2 border-violet-500/25 flex items-center justify-center mb-5">
                <span className="font-display text-xl font-bold text-violet-400">GPA</span>
              </div>
              <span className="font-display text-5xl sm:text-6xl font-extrabold text-[var(--theme-text)]">
                3.7
              </span>
              <span className="text-xs text-[var(--theme-text-muted)] opacity-50 mt-1">out of 4.0</span>
              <div className="mt-4 pt-4 border-t border-[var(--theme-border)] w-full">
                <p className="text-sm text-[var(--theme-text-muted)]">First-Class Standing</p>
                <p className="text-sm text-[var(--theme-text-muted)]">Dean's Honour List</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
