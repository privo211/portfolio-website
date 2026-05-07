'use client'

import { motion } from 'motion/react'
import { SplitText } from '@/components/ui/split-text'
import { MagneticButton } from '@/components/ui/magnetic-button'
import { SOCIAL_LINKS, SITE_CONFIG } from '@/lib/constants'
import { Mail, Download } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/ui/icons'

export function Contact() {
  return (
    <section id="contact" className="relative py-32 md:py-44 lg:py-56 section-padding">
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[500px] h-[500px] rounded-full bg-violet-600/[0.03] blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <div className="section-divider mb-16" />

        <motion.span
          className="inline-flex items-center gap-2 font-mono text-xs text-violet-400/70 uppercase tracking-[0.15em] mb-6"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-cyan-400/70">&gt;</span>
          open to work
          <span className="text-cyan-400/70">&lt;</span>
        </motion.span>

        <SplitText
          as="h2"
          type="words"
          className="font-display text-[clamp(2rem,6vw,5rem)] font-bold leading-[1.05] tracking-[-0.02em] text-white mb-8"
        >
          Let&apos;s Work Together
        </SplitText>

        <motion.p
          className="text-white/40 text-base sm:text-lg max-w-lg mx-auto leading-relaxed mb-12"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
        >
          Seeking Software Developer &amp; AI Solutions roles in Toronto.
          Open to on-site, hybrid, or remote — available for full-time immediately.
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

          <MagneticButton
            href="/Priyanshu%20Vora.pdf"
            download="Priyanshu_Vora_Resume.pdf"
            className="btn-outline !rounded-full !px-6 !py-3.5"
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

        <motion.p
          className="mt-10 font-mono text-xs text-white/20"
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
