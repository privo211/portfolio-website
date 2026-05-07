'use client'

import { SectionHeading } from '@/components/ui/section-heading'
import { FadeIn } from '@/components/animations/fade-in'
import { education } from '@/data/education'
import { GraduationCap, Award, BookOpen } from 'lucide-react'

export function Education() {
  return (
    <section id="education" className="relative py-28 md:py-36 lg:py-44 section-padding">
      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionHeading title="Education" subtitle="academic foundation" />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">
          <FadeIn>
            <div className="glass-panel p-8 sm:p-10 h-full">
              <div className="flex flex-col sm:flex-row sm:items-start gap-6">
                <div className="shrink-0 w-14 h-14 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
                  <GraduationCap size={28} className="text-violet-400" />
                </div>
                <div>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-1">
                    {education.school}
                  </h3>
                  <p className="text-white/70 text-base sm:text-lg font-medium mb-1">
                    {education.degree}
                  </p>
                  <p className="text-white/35 text-sm mb-4">
                    {education.location} <span className="mx-2 opacity-30">·</span> {education.period}
                  </p>

                  <div className="flex flex-wrap gap-2.5 mb-8">
                    {education.honors.map((honor) => (
                      <span
                        key={honor}
                        className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/8 border border-amber-400/20 px-3.5 py-1.5 text-xs font-medium text-amber-300/80"
                      >
                        <Award size={12} />
                        {honor}
                      </span>
                    ))}
                  </div>

                  <div className="pt-6 border-t border-white/[0.05]">
                    <h4 className="flex items-center gap-2 font-mono text-[0.65rem] text-violet-400/70 uppercase tracking-[0.12em] mb-4">
                      <BookOpen size={14} />
                      Relevant Coursework
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {education.coursework.map((course) => (
                        <span
                          key={course}
                          className="inline-flex rounded-full bg-white/[0.03] border border-white/[0.06] px-3.5 py-1 text-xs text-white/40 hover:border-violet-500/30 hover:text-white/60 transition-all duration-300 cursor-default"
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
            <div className="glass-card p-8 h-full flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-violet-500/10 border-2 border-violet-500/25 flex items-center justify-center mb-5">
                <span className="font-display text-xl font-bold text-violet-300">GPA</span>
              </div>
              <span className="font-display text-5xl sm:text-6xl font-extrabold text-white">
                3.7
              </span>
              <span className="text-xs text-white/30 mt-1">out of 4.0</span>
              <div className="mt-4 pt-4 border-t border-white/[0.06] w-full">
                <p className="text-sm text-white/50">First-Class Standing</p>
                <p className="text-sm text-white/50">Dean&apos;s Honour List Awardee</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
