'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { NAV_ITEMS, SECTION_IDS } from '@/lib/constants'
import { useSectionInView } from '@/hooks/use-section-in-view'
import { useCursor } from '@/components/providers/cursor-provider'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { NavMenu } from './nav-menu'
import { cn } from '@/lib/utils'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { setIsHovering } = useCursor()
  const sectionIds = Object.values(SECTION_IDS)
  const activeSection = useSectionInView(sectionIds)

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
          isScrolled && 'bg-[var(--theme-bg)]/80 backdrop-blur-xl border-b border-[var(--theme-border)]'
        )}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
      >
        <a
          href="#hero"
          className="relative font-display text-lg font-bold tracking-tight text-[var(--theme-text)] hover:text-[var(--theme-accent)] transition-colors duration-300"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          PV<span className="text-[var(--theme-accent)]">.</span>
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href.replace('#', '')
            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={`text-[0.75rem] px-3 py-1.5 rounded-full transition-all duration-200 ${
                  isActive
                    ? 'text-[var(--theme-accent)] bg-[var(--theme-accent-glow)]'
                    : 'text-[var(--theme-text-muted)] hover:text-[var(--theme-text)] hover:bg-[var(--theme-border)]'
                }`}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                {item.label}
              </a>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className="md:hidden relative z-[60] flex flex-col items-center justify-center w-10 h-10 gap-1.5"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <motion.span
              className="w-5 h-px bg-[var(--theme-text)] block"
              animate={isMenuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="w-5 h-px bg-[var(--theme-text)] block"
              animate={isMenuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen && <NavMenu onClose={() => setIsMenuOpen(false)} activeSection={activeSection} />}
      </AnimatePresence>
    </>
  )
}
