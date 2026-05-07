"use client";

import { cn } from "@/lib/utils";

interface GradientBlobProps {
  className?: string;
  colors?: [string, string];
  size?: string;
  delay?: number;
}

export function GradientBlob({
  className,
  colors = ["#8b5cf6", "#ec4899"],
  size = "600px",
  delay = 0,
}: GradientBlobProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute rounded-full opacity-20 blur-[100px] animate-blob",
        delay === 2 && "animation-delay-2000",
        delay === 4 && "animation-delay-4000",
        className
      )}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${colors[0]}, ${colors[1]})`,
      }}
    />
  );
}
