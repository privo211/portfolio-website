'use client'

import { TextReveal } from '@/components/ui/text-reveal'
import { SectionHeading } from '@/components/ui/section-heading'
import { Marquee } from '@/components/ui/marquee'
import { FadeIn } from '@/components/animations/fade-in'
import { allSkills } from '@/data/skills'
import Image from 'next/image'

export function About() {
  return (
    <section id="about" className="relative py-28 md:py-36 lg:py-44 section-padding">
      <div className="void-bg opacity-40">
        <div className="void-nebula" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionHeading title="About Me" subtitle="Who I am" />

        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-12 lg:gap-16 items-start">
          <FadeIn direction="left">
            <div className="flex flex-col items-center lg:items-start gap-6">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden ring-1 ring-white/[0.06] ring-offset-4 ring-offset-[#050510]">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-600/30 to-cyan-600/20 mix-blend-overlay z-10" />
                <Image
                  src="/data/Priyanshu_Profile.png"
                  alt="Priyanshu Vora"
                  width={256}
                  height={256}
                  className="w-full h-full object-cover grayscale-[20%]"
                />
              </div>
              <div className="text-center lg:text-left">
                <p className="font-mono text-xs text-[var(--theme-accent)]">priyanshu.vora211@gmail.com</p>
                <p className="font-mono text-xs text-[var(--theme-text-muted)] opacity-60 mt-1">Toronto, ON · Canada</p>
              </div>
            </div>
          </FadeIn>

          <div className="space-y-8">
            <TextReveal as="p" className="text-base sm:text-lg leading-relaxed text-[var(--theme-text)] opacity-90">
              I&apos;m a software engineer who builds backend systems and automation that eliminate operational waste.
              At Stokes Seeds, I built an OCR pipeline using Azure AI that cut invoice processing by 90%
              and shipped 30+ ERP extensions across inventory, sales, and purchasing modules.
            </TextReveal>

            <TextReveal as="p" className="text-base sm:text-lg leading-relaxed text-[var(--theme-text-muted)]">
              During my co-op at Ontario&apos;s Ministry of Transportation, I supported CI/CD pipelines for the
              Track My Plow platform and led AODA accessibility remediation across 10+ government web
              applications. I graduated from Brock University in December 2025 with First-Class Standing
              and am seeking full-time software engineering roles in Toronto.
            </TextReveal>

            <FadeIn delay={0.3}>
              <div className="grid grid-cols-3 gap-4 mt-8">
                {[
                  { value: '90%', label: 'Invoice Processing Time Reduced', accent: 'text-[var(--theme-accent)]', sublabel: 'From 2 days to 4 hours' },
                  { value: '30+', label: 'ERP Extensions Shipped', accent: 'text-[var(--theme-violet-bright)]', sublabel: 'Across inventory, sales, purchasing' },
                  { value: '250+', label: 'Hours of Manual Work Saved', accent: 'text-[var(--theme-accent)]', sublabel: 'Through process automation' },
                ].map((stat) => (
                  <div key={stat.label} className="glass-card p-5 sm:p-6 text-center">
                    <span className={`font-display text-3xl sm:text-4xl font-extrabold ${stat.accent}`}>
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

        <div className="mt-24">
          <Marquee
            items={allSkills}
            className="text-4xl md:text-6xl font-bold text-[var(--theme-text-muted)] opacity-[0.04] select-none"
            speed={45}
          />
        </div>
      </div>
    </section>
  )
}
