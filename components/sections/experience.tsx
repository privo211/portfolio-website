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
    <section id="experience" className="relative py-28 md:py-36 lg:py-44 section-padding">
      <div className="relative z-10 mx-auto max-w-3xl">
        <SectionHeading title="Experience" subtitle="ship's log" />

        <div ref={timelineRef} className="relative mt-14">
          <div className="section-divider mb-14" />

          <div className="relative border-l border-white/[0.06] ml-2 sm:ml-4">
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
                      <span className="font-mono text-xs text-violet-400/80 tracking-[0.06em] font-medium uppercase">
                        {exp.period}
                      </span>
                    </div>

                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2 leading-tight">
                      {exp.role}
                    </h3>
                    <p className="text-white/40 text-sm sm:text-base mb-6">
                      {exp.company} <span className="mx-2 opacity-30">·</span> {exp.location}
                    </p>

                    <ul className="space-y-3.5">
                      {exp.description.map((item, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500/60" />
                          <span className="text-white/55 text-sm sm:text-base leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>

                    {exp.technologies.length > 0 && (
                      <div className="mt-8 flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="pill pill-familiar text-[0.7rem]"
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
