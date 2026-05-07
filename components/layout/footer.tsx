'use client'

import { SOCIAL_LINKS, SITE_CONFIG } from '@/lib/constants'
import { GithubIcon, LinkedinIcon } from '@/components/ui/icons'

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.04] py-8 section-padding">
      <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-white/20 font-mono">
          &copy; {new Date().getFullYear()} {SITE_CONFIG.name} · {SITE_CONFIG.location}
        </p>

        <div className="flex items-center gap-5">
          <a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/20 hover:text-violet-400 transition-colors"
            aria-label="GitHub"
          >
            <GithubIcon size={16} />
          </a>
          <a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/20 hover:text-cyan-400 transition-colors"
            aria-label="LinkedIn"
          >
            <LinkedinIcon size={16} />
          </a>
        </div>
      </div>
    </footer>
  )
}
