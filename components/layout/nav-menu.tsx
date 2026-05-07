"use client";

import { motion } from "motion/react";
import { NAV_ITEMS, SOCIAL_LINKS } from "@/lib/constants";
import { navMenuVariants } from "@/lib/animations";

interface NavMenuProps {
  onClose: () => void;
}

export function NavMenu({ onClose }: NavMenuProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 bg-bg-elevated flex flex-col items-center justify-center"
      variants={navMenuVariants}
      initial="closed"
      animate="open"
      exit="closed"
    >
      <nav className="flex flex-col items-center gap-8">
        {NAV_ITEMS.map((item, i) => (
          <motion.a
            key={item.href}
            href={item.href}
            onClick={onClose}
            className="text-[length:var(--font-size-heading)] font-bold tracking-tight hover:text-accent transition-colors"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3 + i * 0.1,
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {item.label}
          </motion.a>
        ))}
      </nav>

      <motion.div
        className="mt-12 flex gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <a
          href={SOCIAL_LINKS.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-text-muted hover:text-accent transition-colors"
        >
          GitHub
        </a>
        <a
          href={SOCIAL_LINKS.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-text-muted hover:text-accent transition-colors"
        >
          LinkedIn
        </a>
      </motion.div>
    </motion.div>
  );
}
