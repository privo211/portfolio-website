"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface TerminalBlockProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export function TerminalBlock({
  title = "terminal",
  children,
  className,
}: TerminalBlockProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-white/10 bg-bg-elevated/80 backdrop-blur-md transition-all duration-500 hover:border-accent/50 hover:shadow-[0_0_40px_rgba(168,85,247,0.15)]",
        className
      )}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-white/10 bg-black/20 px-4 py-3">
        <div className="flex gap-2">
          <div className="h-3 w-3 rounded-full bg-[#ff5f57] shadow-inner" />
          <div className="h-3 w-3 rounded-full bg-[#febc2e] shadow-inner" />
          <div className="h-3 w-3 rounded-full bg-[#28c840] shadow-inner" />
        </div>
        <span className="ml-3 font-mono text-xs text-text-muted/80 tracking-wider font-medium">{title}</span>
      </div>
      {/* Content */}
      <div className="p-6 font-mono text-sm leading-relaxed">{children}</div>
    </div>
  );
}