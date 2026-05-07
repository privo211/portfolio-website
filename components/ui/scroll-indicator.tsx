"use client";

import { motion } from "motion/react";

export function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.8 }}
    >
      <span className="font-mono text-xs text-text-muted tracking-[0.2em] uppercase">
        Scroll
      </span>
      <motion.div
        className="w-px h-8 bg-accent"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{
          delay: 2.3,
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{ transformOrigin: "top" }}
      />
    </motion.div>
  );
}
