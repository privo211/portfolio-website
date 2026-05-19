'use client'

import { SOCIAL_LINKS, SITE_CONFIG } from '@/lib/constants'
import { GithubIcon, LinkedinIcon } from '@/components/ui/icons'

export function Footer() {
  return (
    <footer className="relative border-t border-[var(--theme-border)] py-8 section-padding">
      <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-[var(--theme-text-muted)] opacity-60 font-mono">
          &copy; {new Date().getFullYear()} {SITE_CONFIG.name} &middot; {SITE_CONFIG.location}
        </p>

        <div className="flex items-center gap-5">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-xs text-[var(--theme-text-muted)] opacity-60 hover:text-[var(--theme-accent)] transition-colors"
          >
            Back to top &uarr;
          </button>
          <span className="text-[var(--theme-border)]">|</span>
          <a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--theme-text-muted)] opacity-60 hover:text-[var(--theme-accent)] transition-colors"
            aria-label="GitHub"
          >
            <GithubIcon size={16} />
          </a>
          <a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--theme-text-muted)] opacity-60 hover:text-[var(--theme-accent)] transition-colors"
            aria-label="LinkedIn"
          >
            <LinkedinIcon size={16} />
          </a>
        </div>
      </div>
    </footer>
  )
}
