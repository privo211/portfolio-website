"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap-config";
import { useGSAP } from "@gsap/react";

interface TextRevealProps {
  children: string;
  className?: string;
  as?: "h2" | "h3" | "p" | "span";
}

export function TextReveal({
  children,
  className,
  as: Tag = "p",
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const words = children.split(" ");

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const wordEls = containerRef.current.querySelectorAll(".reveal-word");

      gsap.fromTo(
        wordEls,
        { opacity: 0.15 },
        {
          opacity: 1,
          stagger: 0.05,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "bottom 40%",
            scrub: 1,
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <Tag
      ref={containerRef as React.RefObject<HTMLHeadingElement & HTMLParagraphElement & HTMLSpanElement>}
      className={className}
    >
      {words.map((word, i) => (
        <span key={i} className="reveal-word inline">
          {word}{i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
