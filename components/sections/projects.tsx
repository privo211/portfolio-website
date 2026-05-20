'use client'

import { motion } from 'motion/react'
import { SectionHeading } from '@/components/ui/section-heading'
import { FadeIn } from '@/components/animations/fade-in'
import { useCursor } from '@/components/providers/cursor-provider'
import { featuredProjects } from '@/data/projects'
import { GithubIcon } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

function ProjectCard({ project }: { project: typeof featuredProjects[number] }) {
  const { setIsHovering } = useCursor()

  return (
    <motion.article
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-[1.75rem] p-8 sm:p-10 md:p-12 h-full',
        'border border-[var(--theme-border)] bg-[var(--theme-bg-elevated)]',
        'hover:border-[var(--theme-accent)]/30 hover:shadow-[0_4px_32px_var(--theme-accent-glow)] transition-all duration-300'
      )}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br from-violet-500/[0.03] via-cyan-500/[0.02] to-transparent" />

      <div className="relative z-10 flex flex-col h-full">
        <span className="font-mono text-[0.65rem] text-violet-400/80 uppercase tracking-[0.15em] font-semibold mb-4">
          {project.subtitle}
        </span>

        <h3 className="text-2xl sm:text-3xl font-display font-bold tracking-tight text-[var(--theme-text)] mb-5">
          {project.title}
        </h3>

        <p className="text-[var(--theme-text-muted)] leading-relaxed text-sm sm:text-base mb-8">
          {project.description}
        </p>

        <ul className="flex flex-col gap-4 mb-auto">
          {project.highlights.map((item, j) => (
            <li key={j} className="flex items-start gap-3">
              <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500 shadow-[0_0_8px_rgba(139,92,246,0.5)]" />
              <span className="text-[var(--theme-text-muted)] text-sm leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-10 pt-8 border-t border-[var(--theme-border)]">
          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.map((tech) => (
              <span key={tech} className="pill pill-familiar text-[0.65rem]">
                {tech}
              </span>
            ))}
          </div>

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs text-[var(--theme-text-muted)] hover:text-violet-400 transition-colors"
            >
              <GithubIcon size={16} />
              <span>View on GitHub</span>
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}

export function Projects() {
  return (
    <section id="projects" className="relative py-20 md:py-28 lg:py-32 section-padding">
      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionHeading title="Featured Work" subtitle="What I've built" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredProjects.map((project, i) => (
            <FadeIn
              key={project.id}
              delay={i * 0.1}
              className={project.gridSpan === 'large' ? 'md:col-span-2' : ''}
            >
              <ProjectCard project={project} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
