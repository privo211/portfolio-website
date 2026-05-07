'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-[#050510] pointer-events-none"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-72 h-72 rounded-full bg-violet-600/[0.06] blur-[80px] animate-pulse" />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="relative"
          >
            <motion.div
              className="w-28 h-28 rounded-full border border-violet-500/25 flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
            >
              <motion.div
                className="w-2 h-2 rounded-full bg-violet-400 absolute top-[2px] left-1/2 -translate-x-1/2"
                animate={{
                  boxShadow: [
                    '0 0 8px rgba(139,92,246,0.6)',
                    '0 0 24px rgba(139,92,246,0.9)',
                    '0 0 8px rgba(139,92,246,0.6)',
                  ],
                }}
                transition={{ duration: 1.2, repeat: Infinity }}
              />
            </motion.div>

            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="font-display text-3xl font-extrabold text-white tracking-[-0.02em]">
                P<span className="text-violet-400">V</span>
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
