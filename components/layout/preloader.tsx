'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true)

  const reducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false

  useEffect(() => {
    if (reducedMotion) {
      setIsLoading(false)
      return
    }
    const timer = setTimeout(() => setIsLoading(false), 400)
    return () => clearTimeout(timer)
  }, [reducedMotion])

  if (reducedMotion) return null

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          aria-hidden="true"
          className="fixed inset-0 z-[200] flex items-center justify-center bg-[var(--theme-bg)]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-72 h-72 rounded-full bg-[var(--theme-accent)]/5 blur-[80px] animate-pulse" />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.15 }}
            className="relative"
          >
            <motion.div
              className="w-28 h-28 rounded-full border border-[var(--theme-border)] flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
            >
              <motion.div
                className="w-2 h-2 rounded-full bg-[var(--theme-accent)] absolute top-[2px] left-1/2 -translate-x-1/2"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 0.4, repeat: Infinity }}
              />
            </motion.div>

            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="font-display text-3xl font-extrabold text-[var(--theme-text)] tracking-[-0.02em]">
                P<span className="text-[var(--theme-accent)]">V</span>
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
