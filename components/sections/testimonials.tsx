'use client'

import { SectionHeading } from '@/components/ui/section-heading'
import { FadeIn } from '@/components/animations/fade-in'
import { testimonials } from '@/data/testimonials'
import { Quote, Star } from 'lucide-react'

export function Testimonials() {
  const featured = testimonials.find((t) => t.featured)
  const others = testimonials.filter((t) => !t.featured)

  return (
    <section id="testimonials" className="relative py-28 md:py-36 lg:py-44 section-padding">
      <div className="relative z-10 mx-auto max-w-5xl">
        <SectionHeading title="What People Say" subtitle="communications log" />

        {featured && (
          <FadeIn className="mb-10">
            <div className="glass-panel p-8 sm:p-10 md:p-12 relative">
              <Quote size={72} className="absolute top-6 left-6 text-violet-500/[0.08] pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center gap-1.5 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                  ))}
                  <span className="ml-2 font-mono text-[0.6rem] text-amber-400/70 uppercase tracking-[0.1em]">
                    {featured.rating}
                  </span>
                </div>

                <blockquote className="text-base sm:text-lg leading-relaxed text-white/70 italic mb-8 max-w-3xl">
                  &ldquo;{featured.quote}&rdquo;
                </blockquote>

                <div className="flex items-center gap-4 pt-6 border-t border-white/[0.05]">
                  <div className="w-10 h-10 rounded-full bg-violet-500/12 border border-violet-500/25 flex items-center justify-center">
                    <span className="font-display text-xs font-bold text-violet-300">
                      {featured.name.split(' ').map((w) => w[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{featured.name}</p>
                    <p className="text-xs text-white/35">{featured.role}, {featured.company}</p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {others.map((testimonial, i) => (
            <FadeIn key={testimonial.id} delay={i * 0.1}>
              <div className="glass-card p-7 flex flex-col">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star
                      key={j}
                      size={12}
                      className={j < 4 ? 'fill-amber-400 text-amber-400' : 'fill-zinc-700 text-zinc-700'}
                    />
                  ))}
                  <span className="ml-2 font-mono text-[0.55rem] text-white/25 uppercase tracking-[0.08em]">
                    {testimonial.rating}
                  </span>
                </div>

                <blockquote className="text-sm leading-relaxed text-white/55 italic mb-6 flex-1">
                  &ldquo;{testimonial.quote.slice(0, 200)}&rdquo;
                </blockquote>

                <div className="flex items-center gap-3 pt-4 border-t border-white/[0.05]">
                  <div className="w-8 h-8 rounded-full bg-cyan-500/12 border border-cyan-500/20 flex items-center justify-center">
                    <span className="font-display text-[0.6rem] font-bold text-cyan-300">
                      {testimonial.name.split(' ').map((w) => w[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-white">{testimonial.name}</p>
                    <p className="text-[0.65rem] text-white/30">{testimonial.role}, {testimonial.company}</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
