'use client'

import { motion } from 'motion/react'
import { SectionHeading } from '@/components/ui/section-heading'
import { FadeIn } from '@/components/animations/fade-in'
import { useCursor } from '@/components/providers/cursor-provider'
import { featuredProjects, otherProjects } from '@/data/projects'
import { GithubIcon } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

function ProjectCard({ project }: { project: typeof featuredProjects[number] }) {
  const { setIsHovering } = useCursor()

  return (
    <motion.article
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-2xl p-8 sm:p-10 md:p-12 h-full',
        'border border-white/[0.05] bg-bg-elevated/80 backdrop-blur-sm',
        'hover:border-violet-500/20 hover:shadow-[0_0_50px_rgba(124,58,237,0.06)] transition-all duration-500'
      )}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br from-violet-500/[0.03] via-cyan-400/[0.02] to-transparent" />

      <div className="relative z-10 flex flex-col h-full">
        <span className="font-mono text-[0.65rem] text-violet-400/80 uppercase tracking-[0.15em] font-semibold mb-4">
          {project.subtitle}
        </span>

        <h3 className="text-2xl sm:text-3xl font-display font-bold tracking-tight text-white mb-5">
          {project.title}
        </h3>

        <p className="text-white/70 leading-relaxed text-sm sm:text-base mb-8">
          {project.description}
        </p>

        <ul className="flex flex-col gap-4 mb-auto">
          {project.highlights.map((item, j) => (
            <li key={j} className="flex items-start gap-3">
              <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400/60" />
              <span className="text-white/70 text-sm leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-10 pt-8 border-t border-white/[0.05]">
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
              className="inline-flex items-center gap-2 text-xs text-white/40 hover:text-violet-400 transition-colors"
            >
              <GithubIcon size={16} />
              <span>View Source</span>
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}

export function Projects() {
  return (
    <section id="projects" className="relative py-28 md:py-36 lg:py-44 section-padding">
      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionHeading title="Featured Work" subtitle="artifact archive" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {featuredProjects.map((project, i) => (
            <FadeIn
              key={project.id}
              delay={i * 0.15}
              className={project.gridSpan === 'large' ? 'md:col-span-2' : ''}
            >
              <ProjectCard project={project} />
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <div className="mb-8">
            <h3 className="font-mono text-xs text-cyan-400/70 uppercase tracking-[0.15em] font-medium flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-cyan-400" />
              Additional projects
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {otherProjects.map((project) => (
              <div
                key={project.id}
                className="glass-card p-5 sm:p-6 flex flex-col"
              >
                <span className="font-mono text-[0.6rem] text-violet-400/70 uppercase tracking-[0.12em] font-semibold mb-2">
                  {project.subtitle}
                </span>
                <h4 className="font-display text-base font-bold text-white mb-2">
                  {project.title}
                </h4>
                <p className="text-white/55 text-xs leading-relaxed mb-4 flex-1 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span key={tech} className="pill pill-familiar text-[0.6rem] !px-2 !py-0.5">
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="pill pill-familiar text-[0.6rem] !px-2 !py-0.5">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
