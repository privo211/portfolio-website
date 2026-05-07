'use client'

import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface ResumeCardProps {
  title: string
  subtitle?: string
  children: ReactNode
  className?: string
  defaultOpen?: boolean
}

export function ResumeCard({
  title,
  subtitle,
  children,
  className,
}: ResumeCardProps) {
  return (
    <motion.div
      className={cn(
        'border-b border-white/[0.06] py-8 first:pt-0 last:border-b-0 last:pb-0',
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-5">
        <h3 className="font-display text-xl md:text-2xl font-bold text-white">
          {title}
        </h3>
        {subtitle && (
          <p className="mt-1 font-mono text-sm text-violet-400">{subtitle}</p>
        )}
      </div>
      <div className="text-text-muted text-sm md:text-base leading-relaxed space-y-3">
        {children}
      </div>
    </motion.div>
  )
}
