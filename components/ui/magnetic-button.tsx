"use client";

import { motion } from "motion/react";
import { useMagnetic } from "@/hooks/use-magnetic";
import { useCursor } from "@/components/providers/cursor-provider";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  download?: boolean | string;
}

export function MagneticButton({
  children,
  className,
  strength = 0.3,
  href,
  target,
  rel,
  onClick,
  download,
}: MagneticButtonProps) {
  const { ref, style, handlers } = useMagnetic<HTMLAnchorElement & HTMLButtonElement>(strength);
  const { setIsHovering } = useCursor();

  const sharedProps = {
    ref,
    style,
    ...handlers,
    onMouseEnter: () => setIsHovering(true),
    onMouseLeave: () => {
      handlers.onMouseLeave();
      setIsHovering(false);
    },
    className: cn(
      "inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-text transition-colors hover:bg-bg-elevated",
      className
    ),
  };

  if (href) {
    return (
      <motion.a href={href} target={target} rel={rel} download={download} {...sharedProps}>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button onClick={onClick} {...sharedProps}>
      {children}
    </motion.button>
  );
}
