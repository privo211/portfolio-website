"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

gsap.defaults({
  duration: 1,
  ease: "power3.out",
});

export { gsap, ScrollTrigger };
export type { ScrollTrigger as ScrollTriggerType };
