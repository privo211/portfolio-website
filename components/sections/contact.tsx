'use client'

import { motion } from 'motion/react'
import { SplitText } from '@/components/ui/split-text'
import { MagneticButton } from '@/components/ui/magnetic-button'
import { SOCIAL_LINKS, SITE_CONFIG } from '@/lib/constants'
import { Mail } from 'lucide-react'

export function Contact() {
  return (
    <section id="contact" className="relative py-32 md:py-44 lg:py-56 section-padding">
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[500px] h-[500px] rounded-full bg-violet-600/[0.03] blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <div className="section-divider mb-16" />

        <motion.span
          className="inline-flex items-center gap-2 font-mono text-xs text-[var(--theme-accent)] uppercase tracking-[0.15em] mb-6"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Available now
        </motion.span>

        <SplitText
          as="h2"
          type="words"
          className="font-display text-[clamp(2rem,6vw,5rem)] font-bold leading-[1.05] tracking-[-0.02em] text-[var(--theme-text)] mb-8"
        >
          Let&apos;s Work Together
        </SplitText>

        <motion.p
          className="text-[var(--theme-text-muted)] text-base sm:text-lg max-w-lg mx-auto leading-relaxed mb-12"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
        >
          Currently seeking full-time Software Engineer roles in Toronto.
          Open to on-site, hybrid, or remote. Let&apos;s talk.
        </motion.p>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <MagneticButton
            href={`mailto:${SITE_CONFIG.email}`}
            className="btn-primary !rounded-full !px-7 !py-3.5 !text-base"
          >
            <Mail size={18} />
            Say Hello
          </MagneticButton>
        </motion.div>

        <motion.div
          className="mt-8 flex items-center justify-center gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--theme-text-muted)] hover:text-[var(--theme-accent)] transition-colors">
            LinkedIn
          </a>
          <span className="text-[var(--theme-text-muted)] opacity-20">·</span>
          <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--theme-text-muted)] hover:text-[var(--theme-accent)] transition-colors">
            GitHub
          </a>
        </motion.div>

        <motion.p
          className="mt-10 font-mono text-xs text-[var(--theme-text-muted)] opacity-40"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          {SITE_CONFIG.email}
        </motion.p>
      </div>
    </section>
  )
}
