'use client'

import { useRef } from 'react'
import { gsap } from '@/lib/gsap-config'
import { useGSAP } from '@gsap/react'
import { SectionHeading } from '@/components/ui/section-heading'
import { FadeIn } from '@/components/animations/fade-in'
import { experiences } from '@/data/experience'
import { Briefcase } from 'lucide-react'

export function Experience() {
  const timelineRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!lineRef.current || !timelineRef.current) return
    gsap.fromTo(
      lineRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 70%',
          end: 'bottom 40%',
          scrub: 1,
        },
      }
    )
  }, { scope: timelineRef })

  const workExperiences = experiences.filter((e) => e.type === 'work')

  return (
    <section id="experience" className="relative py-20 md:py-28 lg:py-32 section-padding">
      <div className="relative z-10 mx-auto max-w-3xl">
        <SectionHeading title="Experience" subtitle="Where I've worked" />

        <p className="text-sm text-[var(--theme-text-muted)] max-w-xl mb-8">
          2.5 years of progressive experience across enterprise, government, and startup environments.
        </p>

        <div ref={timelineRef} className="relative mt-14">
          <div className="section-divider mb-14" />

          <div className="relative border-l border-[var(--theme-border)] ml-2 sm:ml-4">
            <div
              ref={lineRef}
              className="absolute left-[-1px] top-0 bottom-0 w-[1px] bg-gradient-to-b from-violet-500 via-violet-400/80 to-cyan-400/60 origin-top"
            />

            <div className="space-y-16 sm:space-y-20 pb-4">
              {workExperiences.map((exp, i) => (
                <FadeIn key={exp.id} delay={i * 0.12}>
                  <div className="relative pl-10 sm:pl-14">
                    <div className="absolute -left-[7px] top-1.5 timeline-dot" />

                    <div className="flex flex-wrap items-center gap-3 mb-5">
                      <div className="p-2 rounded-lg bg-violet-500/10 border border-violet-500/20">
                        <Briefcase size={18} className="text-violet-400" />
                      </div>
                      <span className="font-mono text-xs text-[var(--theme-accent)] tracking-[0.06em] font-medium uppercase">
                        {exp.period}
                      </span>
                    </div>

                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-[var(--theme-text)] mb-2 leading-tight">
                      {exp.role}
                    </h3>
                    <p className="text-[var(--theme-text-muted)] text-sm sm:text-base mb-6">
                      {exp.company} <span className="mx-2 opacity-30">·</span> {exp.location}
                    </p>

                    <ul className="space-y-3.5">
                      {exp.description.map((item, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--theme-accent)] opacity-60" />
                          <span className="text-[var(--theme-text-muted)] text-sm sm:text-base leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>

                    {exp.technologies.length > 0 && (
                      <div className="mt-8 flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="pill text-[0.7rem] border-[var(--theme-border)] text-[var(--theme-text-muted)] bg-[var(--theme-bg-subtle)]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
