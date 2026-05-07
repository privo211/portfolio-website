"use client";

import { useRef, useMemo } from "react";
import { gsap } from "@/lib/gsap-config";
import { useGSAP } from "@gsap/react";

interface SplitTextProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  type?: "chars" | "words";
  trigger?: "load" | "scroll";
  stagger?: number;
  duration?: number;
  delay?: number;
}

export function SplitText({
  children,
  className,
  as: Tag = "div",
  type = "chars",
  trigger = "scroll",
  stagger = 0.03,
  duration = 1,
  delay = 0,
}: SplitTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const elements = useMemo(() => {
    if (type === "chars") {
      return children.split("").map((char, i) => (
        <span key={i} className="inline-block split-char" style={{ opacity: 0, transform: "translateY(100%)" }}>
          {char === " " ? "\u00A0" : char}
        </span>
      ));
    }
    const wordArray = children.split(" ");
    return wordArray.map((word, i) => (
      <span key={i} className="inline-block overflow-hidden" style={{ marginRight: i < wordArray.length - 1 ? "0.3em" : 0 }}>
        <span className="inline-block split-word" style={{ opacity: 0, transform: "translateY(100%)" }}>
          {word}
        </span>
      </span>
    ));
  }, [children, type]);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const targets = containerRef.current.querySelectorAll(
        type === "chars" ? ".split-char" : ".split-word"
      );

      if (targets.length === 0) return;

      const animation = {
        y: 0,
        opacity: 1,
        duration,
        stagger,
        ease: "power4.out",
        delay,
      };

      if (trigger === "scroll") {
        gsap.to(targets, {
          ...animation,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            once: true,
          },
        });
      } else {
        gsap.to(targets, animation);
      }
    },
    { scope: containerRef, dependencies: [trigger, stagger, duration, delay] }
  );

  return (
    <Tag ref={containerRef as React.RefObject<HTMLHeadingElement & HTMLParagraphElement & HTMLSpanElement & HTMLDivElement>} className={className}>
      {elements}
    </Tag>
  );
}
