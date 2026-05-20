'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { SplitText } from '@/components/ui/split-text'
import { ScrollIndicator } from '@/components/ui/scroll-indicator'
import { SITE_CONFIG, SOCIAL_LINKS } from '@/lib/constants'
import { GithubIcon, LinkedinIcon } from '@/components/ui/icons'
import { MagneticButton } from '@/components/ui/magnetic-button'
import { Download, MapPin } from 'lucide-react'

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden section-padding"
    >
      <div className="void-bg hidden dark:block">
        <div className="void-nebula" />
        <div className="void-stars" />
      </div>

      <motion.div
        className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center"
        style={{ y, opacity }}
      >
        <motion.div
          className="mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm tracking-[0.15em] uppercase text-[var(--theme-accent)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--theme-accent)] opacity-60" />
            {SITE_CONFIG.role}
          </span>
        </motion.div>

        <div className="flex flex-col gap-0 mb-8 overflow-hidden">
          <SplitText
            as="h1"
            type="words"
            trigger="load"
            className="font-display text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[0.95] tracking-[-0.02em] text-[var(--theme-text)]"
            stagger={0.06}
            duration={0.8}
          >
            Priyanshu Vora
          </SplitText>
        </div>

        <motion.p
          className="max-w-2xl text-base sm:text-lg md:text-xl text-[var(--theme-text-muted)] leading-relaxed mb-8"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {SITE_CONFIG.tagline}
        </motion.p>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-3 text-sm text-[var(--theme-text-muted)] mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.5 }}
        >
          <MapPin size={14} className="text-[var(--theme-accent)]" />
          <span>{SITE_CONFIG.location}</span>
          <span className="opacity-30">·</span>
          <span className="flex items-center gap-2">
            <span className="status-dot" />
            Open to full-time roles
          </span>
        </motion.div>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.6 }}
        >
          <MagneticButton
            href="/Priyanshu%20Vora.pdf"
            download="Priyanshu_Vora_Resume.pdf"
            className="btn-primary !rounded-full !px-7 !py-3.5 !text-base"
          >
            <Download size={18} />
            Download Resume
          </MagneticButton>

          <MagneticButton
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline !rounded-full !px-6 !py-3.5"
          >
            <LinkedinIcon size={18} />
            LinkedIn
          </MagneticButton>

          <MagneticButton
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline !rounded-full !px-6 !py-3.5"
          >
            <GithubIcon size={18} />
            GitHub
          </MagneticButton>
        </motion.div>
      </motion.div>

      <ScrollIndicator />
    </section>
  )
}
