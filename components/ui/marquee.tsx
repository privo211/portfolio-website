"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap-config";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: string[];
  className?: string;
  speed?: number;
  separator?: string;
}

export function Marquee({
  items,
  className,
  speed = 30,
  separator = " \u2014 ",
}: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!innerRef.current) return;

      const innerWidth = innerRef.current.scrollWidth / 2;

      gsap.to(innerRef.current, {
        x: -innerWidth,
        duration: speed,
        ease: "none",
        repeat: -1,
      });
    },
    { scope: containerRef }
  );

  const text = items.join(separator);

  return (
    <div
      ref={containerRef}
      className={cn("overflow-hidden whitespace-nowrap", className)}
    >
      <div ref={innerRef} className="inline-flex">
        <span className="px-4">{text}</span>
        <span className="px-4">{text}</span>
      </div>
    </div>
  );
}
