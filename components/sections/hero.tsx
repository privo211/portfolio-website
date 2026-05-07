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
      <div className="void-bg">
        <div className="void-nebula" />
        <div className="void-stars" />
      </div>

      <motion.div
        className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center text-center"
        style={{ y, opacity }}
      >
        <motion.div
          className="mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <span className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm text-cyan-400/80 tracking-[0.2em] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
            {SITE_CONFIG.role}
          </span>
        </motion.div>

        <div className="flex flex-col gap-1 mb-8 overflow-hidden">
          <SplitText
            as="h1"
            type="chars"
            trigger="load"
            className="font-display text-[clamp(3.5rem,10vw,9rem)] font-extrabold leading-[0.88] tracking-[-0.03em] text-white text-glow"
            stagger={0.025}
            duration={1.1}
          >
            PRIYANSHU
          </SplitText>
          <SplitText
            as="h1"
            type="chars"
            trigger="load"
            className="font-display text-[clamp(3.5rem,10vw,9rem)] font-extrabold leading-[0.88] tracking-[-0.03em] text-white text-glow"
            stagger={0.025}
            duration={1.1}
            delay={0.3}
          >
            VORA
          </SplitText>
        </div>

        <motion.p
          className="max-w-2xl text-base sm:text-lg md:text-xl text-white/70 leading-relaxed mb-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {SITE_CONFIG.tagline}
        </motion.p>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-3 text-sm text-white/55 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7, duration: 0.6 }}
        >
          <MapPin size={14} className="text-violet-400" />
          <span>{SITE_CONFIG.location}</span>
          <span className="opacity-30">|</span>
          <span className="flex items-center gap-2">
            <span className="status-dot" />
            Available for Full-Time
          </span>
        </motion.div>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.9, duration: 0.6 }}
        >
          <MagneticButton
            href="/Priyanshu%20Vora.pdf"
            download="Priyanshu_Vora_Resume.pdf"
            className="btn-primary"
          >
            <Download size={18} />
            Download Resume
          </MagneticButton>

          <MagneticButton
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            <LinkedinIcon size={18} />
            LinkedIn
          </MagneticButton>

          <MagneticButton
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
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
