"use client";

import { motion } from "motion/react";
import { useCursor } from "@/components/providers/cursor-provider";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  const { setIsHovering } = useCursor();

  return (
    <motion.article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-[2rem] border border-white/5 bg-bg-elevated p-12 sm:p-14 md:p-16 shadow-2xl",
        className
      )}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="pointer-events-none absolute inset-0 rounded-[2rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-br from-accent/20 via-cyan-500/10 to-transparent" />

      <div className="relative z-10 flex flex-col h-full">
        <span className="font-mono text-xs text-accent uppercase tracking-widest font-semibold block mb-4">
          {project.subtitle}
        </span>

        <h3 className="text-3xl md:text-4xl font-display font-bold tracking-tight">
          {project.title}
        </h3>

        <p className="mt-6 text-text-muted/90 leading-relaxed text-lg">
          {project.description}
        </p>

        <ul className="mt-10 flex flex-col gap-5">
          {project.highlights.map((item, i) => (
            <li key={i} className="flex items-start gap-4">
              <span className="mt-[0.35rem] h-2.5 w-2.5 shrink-0 rounded-full bg-accent shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
              <span className="flex-1 text-text-muted/80 leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-10">
          <div className="flex flex-wrap gap-3 mb-10">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-bg-subtle px-5 py-2.5 text-sm font-mono text-text-muted border border-border hover:border-accent/40 transition-colors whitespace-nowrap"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex gap-6 pt-6 border-t border-white/5">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-text-muted hover:text-accent transition-colors"
              >
                <GithubIcon size={18} />
                <span>Source</span>
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-text-muted hover:text-accent transition-colors"
              >
                <ExternalLink size={18} />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}