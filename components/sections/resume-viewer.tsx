'use client'

import { SectionHeading } from '@/components/ui/section-heading'
import { MagneticButton } from '@/components/ui/magnetic-button'
import { FadeIn } from '@/components/animations/fade-in'
import { SITE_CONFIG } from '@/lib/constants'
import { experiences } from '@/data/experience'
import { featuredProjects } from '@/data/projects'
import { education } from '@/data/education'
import { skillCategories } from '@/data/skills'
import { Download, FileText } from 'lucide-react'

export function ResumeViewer() {
  return (
    <section id="resume" className="relative py-28 md:py-36 lg:py-44 section-padding">
      <div className="relative z-10 mx-auto max-w-3xl">
        <SectionHeading title="Resume" subtitle="data core" />

        <FadeIn>
          <div className="glass-panel p-8 sm:p-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 pb-10 border-b border-white/[0.05]">
              <div>
                <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  {SITE_CONFIG.name}
                </h3>
                <p className="text-lg text-violet-400 font-medium mt-2">{SITE_CONFIG.role}</p>
                <p className="text-sm text-white/35 mt-2">
                  {SITE_CONFIG.location} · {SITE_CONFIG.email}
                </p>
                <div className="flex gap-4 mt-3">
                  <a href="https://linkedin.com/in/priyanshuvora" target="_blank" rel="noopener noreferrer" className="font-mono text-[0.65rem] text-cyan-400/70 hover:text-cyan-400 transition-colors">
                    linkedin.com/in/priyanshuvora
                  </a>
                  <a href="https://github.com/privo211" target="_blank" rel="noopener noreferrer" className="font-mono text-[0.65rem] text-cyan-400/70 hover:text-cyan-400 transition-colors">
                    github.com/privo211
                  </a>
                </div>
              </div>

              <MagneticButton
                href="/Priyanshu%20Vora.pdf"
                download="Priyanshu_Vora_Resume.pdf"
                className="btn-primary !rounded-full !px-6 !py-2.5 !text-sm shrink-0"
              >
                <Download size={16} />
                Download PDF
              </MagneticButton>
            </div>

            <ResumeBlock title="Professional Summary">
              <p className="text-white/55 text-sm leading-relaxed">
                Full-stack engineer specializing in enterprise automation and AI integration, with deep expertise
                in architecting high-performance modern web backends. Proven ability to eliminate operational
                bottlenecks by engineering resilient data pipelines, AI-powered workflows, and complex ERP
                integrations. Combines deep knowledge of enterprise data structures with agile, modern development
                practices to deliver high-impact, production-ready solutions.
              </p>
            </ResumeBlock>

            <ResumeBlock title="Professional Experience">
              {experiences.filter((e) => e.type === 'work').map((exp) => (
                <div key={exp.id} className="mb-6 last:mb-0">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1.5">
                    <h4 className="text-sm font-semibold text-white">{exp.role}</h4>
                    <span className="font-mono text-[0.65rem] text-violet-400/70 shrink-0">{exp.period}</span>
                  </div>
                  <p className="text-xs text-white/30 mb-2">{exp.company} — {exp.location}</p>
                  <ul className="space-y-1.5">
                    {exp.description.map((item, j) => (
                      <li key={j} className="text-xs text-white/45 flex items-start gap-2">
                        <span className="mt-[0.4rem] h-1 w-1 shrink-0 rounded-full bg-violet-500/40" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </ResumeBlock>

            <ResumeBlock title="Technical Projects">
              {featuredProjects.map((project) => (
                <div key={project.id} className="mb-5 last:mb-0">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1.5">
                    <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                      <FileText size={14} className="text-violet-400" />
                      {project.title}
                    </h4>
                    <span className="font-mono text-[0.6rem] text-cyan-400/60">
                      {project.technologies.slice(0, 4).join(', ')}
                    </span>
                  </div>
                  <ul className="space-y-1">
                    {project.highlights.map((item, j) => (
                      <li key={j} className="text-xs text-white/40 flex items-start gap-2">
                        <span className="mt-[0.4rem] h-1 w-1 shrink-0 rounded-full bg-violet-500/30" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </ResumeBlock>

            <ResumeBlock title="Technical Skills">
              {skillCategories.map((cat) => (
                <div key={cat.name} className="mb-2 last:mb-0">
                  <span className="font-mono text-[0.65rem] text-violet-400/70 font-medium">{cat.name}:</span>{' '}
                  <span className="text-xs text-white/45">{cat.skills.map((s) => s.name).join(', ')}</span>
                </div>
              ))}
            </ResumeBlock>

            <ResumeBlock title="Education" last>
              <h4 className="text-sm font-semibold text-white">{education.degree}</h4>
              <p className="text-xs text-white/30">{education.school}, {education.location}</p>
              <p className="text-xs text-white/30">{education.period} · GPA: {education.gpa}</p>
              <p className="text-xs text-amber-300/60 mt-1">{education.honors.join(' · ')}</p>
            </ResumeBlock>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

function ResumeBlock({ title, children, last }: { title: string; children: React.ReactNode; last?: boolean }) {
  return (
    <div className={`${last ? 'pt-8' : 'py-8'} ${last ? '' : 'border-b border-white/[0.04]'}`}>
      <h4 className="font-mono text-[0.7rem] text-violet-400/80 uppercase tracking-[0.1em] font-medium mb-5 flex items-center gap-2">
        <span className="w-1 h-1 rounded-full bg-violet-500" />
        {title}
      </h4>
      <div className="space-y-4">{children}</div>
    </div>
  )
}
