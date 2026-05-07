'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { NAV_ITEMS, SECTION_IDS } from '@/lib/constants'
import { useCursor } from '@/components/providers/cursor-provider'
import { useSectionInView } from '@/hooks/use-section-in-view'
import { NavMenu } from './nav-menu'
import { cn } from '@/lib/utils'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { setIsHovering } = useCursor()
  const activeSection = useSectionInView(Object.values(SECTION_IDS))

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isMenuOpen])

  return (
    <>
      <motion.header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 md:px-8 py-4 transition-all duration-300',
          isScrolled && 'bg-[#050510]/80 backdrop-blur-xl border-b border-white/[0.04]'
        )}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
      >
        <a
          href="#hero"
          className="relative font-display text-lg font-bold tracking-tight text-white hover:text-violet-400 transition-colors duration-300"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          PV<span className="text-violet-400">.</span>
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const sectionId = item.href.slice(1)
            const isActive = activeSection === sectionId
            return (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  'text-[0.8rem] px-3 py-1.5 rounded-full transition-all duration-200',
                  isActive
                    ? 'text-violet-300 bg-violet-500/10'
                    : 'text-white/40 hover:text-white hover:bg-white/[0.03]'
                )}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                {item.label}
              </a>
            )
          })}
        </nav>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className="md:hidden relative z-[60] flex flex-col items-center justify-center w-10 h-10 gap-1.5"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          <motion.span
            className="w-5 h-px bg-white block"
            animate={isMenuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="w-5 h-px bg-white block"
            animate={isMenuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
        </button>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen && <NavMenu onClose={() => setIsMenuOpen(false)} />}
      </AnimatePresence>
    </>
  )
}
