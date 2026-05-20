'use client'

import { TextReveal } from '@/components/ui/text-reveal'
import { SectionHeading } from '@/components/ui/section-heading'
import { Marquee } from '@/components/ui/marquee'
import { FadeIn } from '@/components/animations/fade-in'
import { allSkills } from '@/data/skills'
import { SITE_CONFIG } from '@/lib/constants'
import Image from 'next/image'

export function About() {
  return (
    <section id="about" className="relative py-20 md:py-28 lg:py-32 section-padding">
      <div className="void-bg opacity-40">
        <div className="void-nebula" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl">
        <SectionHeading title="About" subtitle="Who I am" />

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10 lg:gap-14 items-start">
          <FadeIn direction="left">
            <div className="flex flex-col items-center lg:items-start gap-6">
              <div className="relative w-44 h-44 sm:w-48 sm:h-48 rounded-2xl overflow-hidden ring-1 ring-[var(--theme-border)] ring-offset-4 ring-offset-[var(--theme-bg)]">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-600/30 to-cyan-600/20 mix-blend-overlay z-10" />
                <Image
                  src="/data/Priyanshu_Profile.png"
                  alt="Priyanshu Vora, software engineer"
                  width={256}
                  height={256}
                  className="w-full h-full object-cover grayscale-[20%]"
                />
              </div>
              <div className="text-center lg:text-left">
                <p className="font-mono text-xs text-[var(--theme-accent)]">{SITE_CONFIG.email}</p>
                <p className="font-mono text-xs text-[var(--theme-text-muted)] opacity-60 mt-1">
                  {SITE_CONFIG.location}
                </p>
              </div>
            </div>
          </FadeIn>

          <div className="space-y-6">
            <TextReveal as="p" className="text-base sm:text-lg leading-relaxed text-[var(--theme-text)] opacity-90">
              I build backend systems and automation for enterprise operations. Over 2.5 years, I've delivered ERP extensions
              across inventory, sales, and purchasing modules, and built an AI-powered invoice processing pipeline handling
              200+ invoices daily.
            </TextReveal>

            <TextReveal as="p" className="text-base sm:text-lg leading-relaxed text-[var(--theme-text-muted)]">
              I graduated from Brock University in December 2025 with First-Class Standing (GPA 3.7). During my co-op at
              Ontario's Ministry of Transportation, I supported CI/CD for the Track My Plow platform and led accessibility
              remediation across 10+ government applications. I'm seeking full-time software engineering roles in Toronto.
            </TextReveal>

            <FadeIn delay={0.3}>
              <div className="grid grid-cols-3 gap-4 mt-6">
                {[
                  { value: '90%', label: 'Faster Processing', sublabel: 'Invoice intake: 2 days → 4 hours' },
                  { value: '30+', label: 'Extensions Shipped', sublabel: 'Across inventory, sales, purchasing' },
                  { value: '250+', label: 'Hours Saved', sublabel: 'Annual manual work eliminated' },
                ].map((stat) => (
                  <div key={stat.label} className="glass-card p-5 sm:p-6 text-center">
                    <span className="font-display text-3xl sm:text-4xl font-extrabold text-[var(--theme-accent)]">
                      {stat.value}
                    </span>
                    <p className="mt-2 text-xs sm:text-sm text-[var(--theme-text-muted)] leading-snug">
                      {stat.label}
                    </p>
                    <p className="mt-1 text-[0.65rem] text-[var(--theme-text-muted)] opacity-60">
                      {stat.sublabel}
                    </p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>

        <div className="mt-20">
          <Marquee
            items={allSkills}
            className="text-3xl md:text-4xl font-bold text-[var(--theme-text-muted)] opacity-[0.04] select-none"
            speed={45}
          />
        </div>
      </div>
    </section>
  )
}
