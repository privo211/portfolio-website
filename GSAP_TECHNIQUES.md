# GSAP Animation Techniques for Immersive Portfolio Sites

> Dark-themed, holographic/sci-fi inspired portfolio — Next.js 15, GSAP 3, Lenis, Framer Motion

---

## Table of Contents

1. [Scroll-Triggered Animation Patterns](#1-scroll-triggered-animation-patterns)
2. [Text Animation Effects](#2-text-animation-effects)
3. [3D Transforms & Perspective Animations](#3-3d-transforms--perspective-animations)
4. [Mouse-Follow & Magnetic Effects](#4-mouse-follow--magnetic-effects)
5. [Parallax & Depth Effects](#5-parallax--depth-effects)
6. [Stagger Children Animations](#6-stagger-children-animations)
7. [Timeline-Based Sequenced Animations](#7-timeline-based-sequenced-animations)
8. [SVG Morphing & Path Animations](#8-svg-morphing--path-animations)
9. [Particle Effects](#9-particle-effects)
10. [Page Transitions & Route Changes](#10-page-transitions--route-changes)
11. [Smooth Scrolling with Lenis + GSAP](#11-smooth-scrolling-with-lenis--gsap-integration)
12. [Performance Optimization](#12-performance-optimization-for-animation-heavy-sites)

---

## 1. Scroll-Triggered Animation Patterns

### 1a. Basic Scroll-Triggered Reveal

```tsx
// components/ScrollReveal.tsx
'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function ScrollReveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(ref.current, {
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 80%',
        end: 'top 20%',
        toggleActions: 'play none none reverse',
        // markers: true, // uncomment during dev
      },
      y: 80,
      opacity: 0,
      filter: 'blur(10px)',
      duration: 1,
      ease: 'power3.out',
    });
  }, { scope: ref });

  return <div ref={ref}>{children}</div>;
}
```

### 1b. Pin & Scrub Sections (Holographic Panels)

```tsx
// components/HolographicSection.tsx
'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function HolographicSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=2000',
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      },
    });

    tl.fromTo('.holographic-title', 
      { opacity: 0, scale: 0.7, rotateX: 45 },
      { opacity: 1, scale: 1, rotateX: 0, duration: 1 }
    )
    .fromTo('.holographic-card', 
      { y: 200, opacity: 0, filter: 'blur(20px)' },
      { y: 0, opacity: 1, filter: 'blur(0px)', stagger: 0.2 }
    )
    .to('.holographic-scanline', 
      { y: '100vh', duration: 2, ease: 'none' }
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="holographic-section">
      <div className="holographic-scanline" />
      <h2 className="holographic-title">Projects</h2>
      {/* cards here */}
    </section>
  );
}
```

### 1c. Horizontal Scroll Section (Crucial for Portfolios)

```tsx
// components/HorizontalScroll.tsx
'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function HorizontalScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const sections = gsap.utils.toArray('.horizontal-item');
    const totalWidth = (sections.length - 1) * window.innerWidth;

    gsap.to(trackRef.current, {
      x: -totalWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: `+=${totalWidth}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="horizontal-container" style={{ overflow: 'hidden' }}>
      <div ref={trackRef} className="horizontal-track" style={{ display: 'flex', height: '100vh' }}>
        {items.map((item, i) => (
          <div key={i} className="horizontal-item" style={{ minWidth: '100vw', height: '100vh' }}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
```

### 1d. ScrollTrigger.batch() for Grid Items

```tsx
useGSAP(() => {
  ScrollTrigger.batch('.grid-item', {
    interval: 0.1,
    batchMax: 6,
    onEnter: (batch) => {
      gsap.fromTo(batch,
        { opacity: 0, y: 40, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.08, duration: 0.7, ease: 'power3.out' }
      );
    },
    onLeaveBack: (batch) => {
      gsap.to(batch,
        { opacity: 0, y: -40, scale: 0.9, stagger: 0.05, duration: 0.4 }
      );
    },
  });
});
```

### When to use GSAP ScrollTrigger vs. CSS scroll-driven animations

| GSAP ScrollTrigger | CSS scroll-driven animations |
|---|---|
| Complex sequencing, pinning, scrubbing | Simple fade-in / slide-in |
| Need `scrub: true` with smoothing | Pure declarative when possible |
| Horizontal scroll sections | Single-element reveals |
| Velocity-based snapping (`getVelocity()`) | `animation-timeline: scroll()` |

### Performance

- Use `invalidateOnRefresh: true` for responsive layouts
- `anticipatePin: 1` eliminates the 1-frame flash on pinned sections
- Set `once: true` for animations that only need to play forward once
- Avoid animating `left`/`top`/`width`/`height`; prefer `x`, `y`, `scale`

---

## 2. Text Animation Effects

### 2a. SplitText Character Reveal (Lines + Words + Chars)

```tsx
// components/HolographicText.tsx
'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitText from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

export default function HolographicText({ children }: { children: string }) {
  const ref = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    const split = new SplitText(ref.current, {
      type: 'lines,words,chars',
      linesClass: 'line++',
      wordsClass: 'word++',
      charsClass: 'char++',
      mask: 'lines',
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    tl.fromTo(split.chars,
      { y: 100, rotateX: -80, opacity: 0 },
      {
        y: 0,
        rotateX: 0,
        opacity: 1,
        duration: 0.8,
        stagger: { amount: 0.5, from: 'random' },
        ease: 'back.out(1.7)',
      }
    )
    .to(split.chars,
      { color: '#00fff5', stagger: 0.02, duration: 0.5 },
      '-=0.3'
    )
    .to(split.chars,
      { color: '#ffffff', stagger: 0.02, duration: 0.5 }
    );

    return () => split.revert();
  }, { scope: ref });

  return <h1 ref={ref} className="holographic-text">{children}</h1>;
}
```

### 2b. ScrambleText (Matrix-Style Decode Effect)

```tsx
// components/ScrambleReveal.tsx
'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin, useGSAP);

export default function ScrambleReveal({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    gsap.to(ref.current, {
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
        once: true,
      },
      scrambleText: {
        text,
        chars: '!@#$%^&*()_+-=[]{}|;:,.<>?/~`0123456789ABCDEF',
        revealDelay: 0.5,
        speed: 0.3,
        newClass: 'scramble-new',
        oldClass: 'scramble-old',
      },
      duration: 2,
      ease: 'power2.inOut',
    });
  }, { scope: ref });

  return <span ref={ref} className="scramble-text">{text.replace(/./g, '█')}</span>;
}
```

### 2c. Manual Scramble Function (Pure JS, No Plugin Required)

```tsx
// lib/scrambleText.ts
export function scrambleTextEffect(element: HTMLElement, finalText: string, duration = 1.5) {
  const chars = '!<>-_\\/[]{}—=+*^?#________abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let frame = 0;
  const maxFrames = Math.floor(duration * 60);
  const interval = duration / maxFrames * 1000;

  const originalText = finalText.split('');
  let currentText = Array(originalText.length).fill('');

  const obj = { progress: 0 };

  const tween = gsap.to(obj, {
    progress: 1,
    duration,
    ease: 'power3.inOut',
    onUpdate: () => {
      const progress = obj.progress;
      const revealed = Math.floor(progress * originalText.length);

      for (let i = 0; i < originalText.length; i++) {
        if (i < revealed) {
          currentText[i] = originalText[i];
        } else {
          currentText[i] = chars[Math.floor(Math.random() * chars.length)];
        }
      }
      element.textContent = currentText.join('');
    },
    onComplete: () => {
      element.textContent = finalText;
    },
  });

  return tween;
}
```

### 2d. Glitch Text Reveal (CSS + GSAP)

```tsx
'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function GlitchText({ text }: { text: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = ref.current!;
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 3 });

    tl.to(el.querySelector('.glitch-main'), {
      x: () => gsap.utils.random(-3, 3),
      y: () => gsap.utils.random(-3, 3),
      duration: 0.05,
      repeat: 5,
      yoyo: true,
    })
    .to(el.querySelector('.glitch-clip-1'), {
      x: () => gsap.utils.random(-8, 8),
      clipPath: 'inset(0 0 60% 0)',
      duration: 0.06,
      repeat: 3,
    }, '<')
    .to(el.querySelector('.glitch-clip-2'), {
      x: () => gsap.utils.random(-8, 8),
      clipPath: 'inset(50% 0 0 0)',
      duration: 0.06,
      repeat: 3,
    }, '<');
  }, { scope: ref });

  return (
    <div ref={ref} className="glitch-container">
      <span className="glitch-main" data-text={text}>{text}</span>
      <span className="glitch-clip glitch-clip-1" data-text={text}>{text}</span>
      <span className="glitch-clip glitch-clip-2" data-text={text}>{text}</span>
    </div>
  );
}

// CSS:
// .glitch-container { position: relative; }
// .glitch-clip { position: absolute; inset: 0; color: #0ff; opacity: 0.8; }
// .glitch-clip-1 { text-shadow: -2px 0 red; }
// .glitch-clip-2 { text-shadow: 2px 0 blue; }
```

### When GSAP text vs. Framer Motion

| GSAP | Framer Motion |
|---|---|
| SplitText (chars/words/lines) | `motion.span` wrapping needed manually |
| ScrambleText built-in | No equivalent — build manually |
| Complex sequencing in Timelines | `useAnimate()` or `animate()` |
| Mask reveal effects | `clipPath` animate |

### Performance

- **Revert SplitText** after animations complete: `split.revert()` reduces DOM nodes
- Use `autoSplit: true` + `onSplit` callback for responsive text that reflows on resize
- Add `font-kerning: none; text-rendering: optimizeSpeed` to avoid kerning shifts after split
- Never split by chars alone — always include words or lines (or set `smartWrap: true`)

---

## 3. 3D Transforms & Perspective Animations

### 3a. 3D Card Tilt (Holographic Card)

```tsx
// components/HoloCard.tsx
'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

export default function HoloCard({ children }: { children: React.ReactNode }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP({ scope: cardRef });

  const handleMouseMove = contextSafe((e: React.MouseEvent) => {
    const card = cardRef.current!;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = ((x - centerX) / centerX) * 15;
    const rotateX = ((y - centerY) / centerY) * -15;

    gsap.to(card, {
      rotateY,
      rotateX,
      duration: 0.5,
      ease: 'power2.out',
    });

    gsap.to(glowRef.current, {
      x: x,
      y: y,
      duration: 0.3,
      ease: 'power2.out',
    });
  });

  const handleMouseLeave = contextSafe(() => {
    gsap.to(cardRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.7,
      ease: 'elastic.out(1, 0.5)',
    });
    gsap.to(glowRef.current, {
      opacity: 0,
      duration: 0.3,
    });
  });

  return (
    <div
      ref={cardRef}
      className="holo-card"
      style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="card-content">{children}</div>
      <div ref={glowRef} className="card-glow" />
    </div>
  );
}

// CSS:
// .holo-card {
//   transform-style: preserve-3d;
//   background: rgba(0, 255, 245, 0.05);
//   border: 1px solid rgba(0, 255, 245, 0.2);
//   position: relative;
//   overflow: hidden;
// }
// .card-glow {
//   position: absolute;
//   width: 150px; height: 150px;
//   background: radial-gradient(circle, rgba(0,255,245,0.4), transparent 70%);
//   pointer-events: none;
//   transform: translate(-50%, -50%);
//   opacity: 0;
//   border-radius: 50%;
// }
```

### 3b. Floating/Orbiting 3D Elements

```tsx
useGSAP(() => {
  gsap.to('.floating-element', {
    y: -20,
    rotationX: 10,
    rotationY: 15,
    duration: 3,
    yoyo: true,
    repeat: -1,
    ease: 'sine.inOut',
    stagger: 0.5,
  });
});
```

### 3c. 3D Perspective Scroll Reveal

```tsx
useGSAP(() => {
  gsap.from('.perspective-reveal', {
    scrollTrigger: {
      trigger: '.perspective-section',
      start: 'top 70%',
      toggleActions: 'play none none reverse',
    },
    rotateX: 45,
    rotateY: -15,
    scale: 0.8,
    y: 100,
    opacity: 0,
    transformOrigin: '50% 0%',
    filter: 'blur(5px)',
    duration: 1.2,
    stagger: 0.15,
    ease: 'expo.out',
  });
});
```

### When GSAP 3D vs. Framer Motion 3D

- GSAP: `rotateX`/`rotateY` on DOM elements with CSS `perspective` — works on any element
- Framer Motion: `motion.div` with `rotateX`/`rotateY` — simpler API, same underlying transforms
- Either: For true 3D objects, use Three.js / React Three Fiber with GSAP for 3D camera moves
- **Browser note**: `transform-style: preserve-3d` on parent required; Safari needs `-webkit-` prefix on some 3D transforms

---

## 4. Mouse-Follow & Magnetic Effects

### 4a. Custom Cursor

```tsx
// components/CustomCursor.tsx
'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current!;
    const follower = followerRef.current!;

    // Fast cursor
    const onMove = (e: MouseEvent) => {
      gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.05, ease: 'power2.out' });
      gsap.to(follower, {
        x: e.clientX, y: e.clientY,
        duration: 0.5, ease: 'power3.out',
      });
    };

    // Magnetic hover on links/buttons
    const onEnter = () => gsap.to([cursor, follower], { scale: 2, borderColor: '#00fff5', duration: 0.3 });
    const onLeave = () => gsap.to([cursor, follower], { scale: 1, borderColor: '#ffffff', duration: 0.3 });

    const magnets = document.querySelectorAll('a, button, [data-magnetic]');
    magnets.forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    window.addEventListener('mousemove', onMove);

    return () => {
      window.removeEventListener('mousemove', onMove);
      magnets.forEach(el => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="cursor-dot" />
      <div ref={followerRef} className="cursor-follower" />
    </>
  );
}

// CSS:
// .cursor-dot, .cursor-follower {
//   position: fixed; top: -4px; left: -4px; pointer-events: none; z-index: 9999;
//   border-radius: 50%; will-change: transform;
// }
// .cursor-dot { width: 8px; height: 8px; background: #00fff5; }
// .cursor-follower { width: 32px; height: 32px; border: 1px solid rgba(0,255,245,0.5); }
```

### 4b. Magnetic Element Effect

```tsx
// hooks/useMagnetic.ts
'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';

export function useMagnetic(strength = 0.3) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      gsap.to(el, {
        x: deltaX,
        y: deltaY,
        duration: 0.6,
        ease: 'power3.out',
      });
    };

    const onLeave = () => {
      gsap.to(el, {
        x: 0, y: 0,
        duration: 0.8,
        ease: 'elastic.out(1, 0.4)',
      });
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);

    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [strength]);

  return ref;
}
```

### 4c. Holographic Distortion on Mouse Move

```tsx
useGSAP(() => {
  const handleMove = (e: MouseEvent) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1; // -1 to 1
    const y = (e.clientY / window.innerHeight) * 2 - 1;

    gsap.to('.holographic-grid', {
      x: x * 15,
      y: y * 15,
      duration: 0.6,
    });

    gsap.to('.holo-glow', {
      x: e.clientX,
      y: e.clientY,
      duration: 0.3,
    });
  };

  window.addEventListener('mousemove', handleMove);
});
```

### Performance

- Always use `will-change: transform` on cursor elements
- Use `passive: true` for mousemove if no `preventDefault` needed (deprecated pattern — just avoid preventDefault)
- Throttle `onUpdate` calls for heavy canvas distort effects (use `gsap.ticker` for frame-synced updates)
- Hide custom cursor on touch devices: `ScrollTrigger.isTouch !== 0`

---

## 5. Parallax & Depth Effects

### 5a. Multi-Layer Parallax (Y-based)

```tsx
// components/ParallaxLayers.tsx
'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function ParallaxLayers() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Each layer moves at a different speed
    gsap.to('.parallax-deep', {
      scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
      y: '20%',
      ease: 'none',
    });

    gsap.to('.parallax-mid', {
      scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
      y: '50%',
      ease: 'none',
    });

    gsap.to('.parallax-front', {
      scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
      y: '80%',
      ease: 'none',
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="parallax-container">
      <div className="parallax-deep">Distant</div>
      <div className="parallax-mid">Middle</div>
      <div className="parallax-front">Close</div>
    </section>
  );
}
```

### 5b. Parallax with Scale (Zoom-Out Effect on Hero)

```tsx
useGSAP(() => {
  gsap.to('.hero-bg', {
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
    },
    scale: 1.3,
    filter: 'blur(4px) brightness(0.6)',
    ease: 'none',
  });

  // Text moves opposite direction
  gsap.to('.hero-content', {
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
    },
    y: 150,
    opacity: 0,
    ease: 'none',
  });
});
```

### 5c. Depth-Based Z-Index Parallax (Cards Stack)

```tsx
useGSAP(() => {
  const cards = gsap.utils.toArray('.depth-card');
  
  cards.forEach((card: any, i) => {
    gsap.fromTo(card, {
      zIndex: cards.length - i,
    }, {
      scrollTrigger: {
        trigger: card,
        start: 'top 90%',
        end: i === cards.length - 1 ? 'top top' : 'bottom 60%',
        scrub: 1,
        // pin: i === cards.length - 1 ? false : true,
        // pinSpacing: false,
      },
      scale: 1 - i * 0.05,
      y: i * 30,
      filter: `blur(${i * 2}px)`,
      opacity: 1 - i * 0.2,
      ease: 'none',
    });
  });
});
```

### When GSAP parallax vs. CSS

- **GSAP**: Multi-layer, scrubbed, responsive — any easing possible
- **CSS** `@scroll-timeline`: Limited browser support (Chromium only), less flexible
- **CSS** `background-attachment: fixed`: Only for background images, buggy on iOS Safari

### Performance

- Use `translate3d(0,0,0)` or `force3D: true` to force GPU layer for parallax elements
- `scrub: true` without a number is cheaper than `scrub: 1` (no catch-up tween)
- Avoid parallax on `touch` devices via `ScrollTrigger.isTouch` — it causes jank

---

## 6. Stagger Children Animations

### 6a. Configurable Stagger

```tsx
// utils/gsap-helpers.ts
import gsap from 'gsap';

export function staggerFrom(
  targets: gsap.TweenTarget,
  fromVars: gsap.TweenVars,
  staggerConfig?: gsap.StaggerVars
) {
  return gsap.from(targets, {
    ...fromVars,
    stagger: staggerConfig ?? {
      amount: 0.6,
      from: 'start',
      ease: 'power3.out',
    },
  });
}

// Advanced stagger configurations:
stagger: {
  each: 0.08,        // fixed time between each
  from: 'random',    // 'start', 'end', 'center', 'edges', 'random', or index
  grid: [4, 3],      // for grid items: [columns, rows]
  axis: 'x',         // stagger direction in grid
  ease: 'power3.in', // easing applied to the stagger distribution
  amount: 0.8,       // total stagger time (overrides `each`)
}
```

### 6b. Grid Stagger Reveal

```tsx
useGSAP(() => {
  gsap.from('.grid-item', {
    scrollTrigger: {
      trigger: '.grid',
      start: 'top 80%',
      toggleActions: 'play none none reverse',
    },
    opacity: 0,
    scale: 0,
    rotate: 15,
    duration: 0.6,
    ease: 'back.out(1.7)',
    stagger: {
      grid: [3, 4], // 3 rows, 4 columns
      from: 'center',
      amount: 0.8,
    },
  });
});
```

### 6c. Holographic Scan-In (Sequential Line by Line)

```tsx
useGSAP(() => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.scan-grid',
      start: 'top 70%',
      toggleActions: 'play none none reverse',
    },
  });

  tl.from('.scan-row', {
    opacity: 0,
    x: () => gsap.utils.random(-100, 100),
    duration: 0.3,
    stagger: {
      amount: 1.2,
      from: 'start',
      ease: 'power2.inOut',
    },
  });
});
```

### 6d. Stagger with Cycle (Random Values Per Element)

```tsx
gsap.from('.project-card', {
  scrollTrigger: { trigger: '.projects', start: 'top 80%' },
  y: () => gsap.utils.random(-50, 200),
  x: () => gsap.utils.random(-100, 100),
  rotate: () => gsap.utils.random(-15, 15),
  scale: () => gsap.utils.random(0.5, 0.9),
  opacity: 0,
  duration: 0.8,
  stagger: 0.06,
  ease: 'expo.out',
});
```

### When GSAP staggers vs. Framer Motion

- GSAP `stagger` with `grid`, `from`, `amount`, `axis` is far more configurable
- Framer Motion: `transition.staggerChildren` with `staggerDirection` — simpler but less powerful
- For grid animations, GSAP's `stagger: { grid: [cols, rows], from: 'center' }` is unmatched

---

## 7. Timeline-Based Sequenced Animations

### 7a. Master Timeline with Labels (Hero → About → Projects)

```tsx
// components/MasterSequence.tsx
'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function MasterSequence() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const master = gsap.timeline({
      scrollTrigger: {
        trigger: ref.current,
        start: 'top top',
        end: '+=5000',
        pin: true,
        scrub: 1.5,
        snap: {
          snapTo: 'labels',
          duration: { min: 0.2, max: 1.5 },
          delay: 0.2,
          ease: 'power2.inOut',
        },
        // markers: true,
      },
    });

    master
      // ——— HERO ———
      .addLabel('hero')
      .from('.hero-title', { y: 100, opacity: 0, duration: 1 })
      .from('.hero-sub', { y: 50, opacity: 0, duration: 0.5 }, '-=0.3')
      .from('.hero-cta', { scale: 0, duration: 0.6, ease: 'back.out(2)' })

      // ——— ABOUT ———
      .addLabel('about')
      .from('.about-image', { x: -200, opacity: 0, duration: 1 })
      .from('.about-text', { x: 200, opacity: 0, duration: 1 }, '-=0.6')
      .from('.skill-badge', {
        y: 40, opacity: 0, duration: 0.4,
        stagger: 0.05, ease: 'back.out(2)',
      })

      // ——— PROJECTS ———
      .addLabel('projects')
      .from('.project-card', {
        y: 150, opacity: 0, scale: 0.8, duration: 0.7,
        stagger: { amount: 0.6, from: 'start' },
      })

      // ——— CONTACT ———
      .addLabel('contact')
      .from('.contact-form', { y: 80, opacity: 0, duration: 0.8 });
  }, { scope: ref });

  return <div ref={ref}>{/* sections */}</div>;
}
```

### 7b. Timeline with Scrub + ToggleActions Mix (Hybrid)

```tsx
useGSAP(() => {
  // Scrub-based background timeline
  const bgTl = gsap.timeline({
    scrollTrigger: {
      trigger: '.skills-section',
      start: 'top center',
      end: 'bottom center',
      scrub: 1,
    },
  });
  bgTl
    .to('.skill-bg', { backgroundColor: '#0a0a1a', duration: 1 })
    .to('.skill-bg', { backgroundColor: '#1a0a2e', duration: 1 });

  // Trigger-based skill bars
  gsap.from('.skill-bar-fill', {
    scrollTrigger: {
      trigger: '.skills-section',
      start: 'top 70%',
      toggleActions: 'play none none none',
      once: true,
    },
    width: 0,
    duration: 1.2,
    stagger: 0.1,
    ease: 'power2.inOut',
  });
});
```

### 7c. Position Parameter Deep Dive

```tsx
const tl = gsap.timeline();

tl.to('.a', { x: 100, duration: 1 })
  .to('.b', { x: 100, duration: 1 }, '-=0.5')        // 0.5s before a ends (overlap)
  .to('.c', { x: 100, duration: 1 }, '+=0.2')        // 0.2s after b ends
  .to('.d', { x: 100, duration: 1 }, 'start')        // same time as 'start' label
  .to('.e', { x: 100, duration: 1 }, '<')            // same as previous tween start
  .to('.f', { x: 100, duration: 1 }, '>-0.3')        // 0.3s before previous tween ends
  .addLabel('middle')
  .to('.g', { x: 100, duration: 1 }, 'middle+=0.5'); // 0.5s after 'middle' label
```

### Performance

- Use `once: true` on ScrollTrigger when animations don't need to reverse
- Timelines with many tweens are more performant than individual tweens with separate ScrollTriggers
- `scrub: true` (boolean) is cheaper than `scrub: 1.5` (no secondary tween running)
- `preventOverlaps: true` on ScrollTrigger to force prior animations to end state before starting new ones

---

## 8. SVG Morphing & Path Animations

### 8a. Logo Morph Animation

```tsx
// components/LogoMorph.tsx
'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(MorphSVGPlugin, useGSAP);

export default function LogoMorph() {
  const pathRef = useRef<SVGPathElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ repeat: -1, yoyo: true, repeatDelay: 1 });

    tl.to(pathRef.current, {
      duration: 1.5,
      morphSVG: { shape: '#shape-hexagon', type: 'rotational' },
      fill: '#00fff5',
      ease: 'power2.inOut',
    })
    .to(pathRef.current, {
      duration: 1.5,
      morphSVG: { shape: '#shape-diamond', type: 'rotational' },
      fill: '#7b2ff7',
      ease: 'power2.inOut',
    })
    .to(pathRef.current, {
      duration: 1.5,
      morphSVG: { shape: '#shape-original', type: 'rotational' },
      fill: '#ffffff',
      ease: 'power2.inOut',
    });
  }, { scope: pathRef });

  return (
    <svg viewBox="0 0 100 100" className="logo-svg">
      <path
        ref={pathRef}
        id="shape-original"
        d="M50 10 L80 40 L80 70 L50 90 L20 70 L20 40 Z"
        fill="white"
      />
      {/* Hidden reference shapes */}
      <path id="shape-hexagon" d="M50 5 L78 21 L78 79 L50 95 L22 79 L22 21 Z" fill="transparent" />
      <path id="shape-diamond" d="M50 2 L98 50 L50 98 L2 50 Z" fill="transparent" />
    </svg>
  );
}
```

### 8b. DrawSVG + ScrollTrigger (Line Drawing)

```tsx
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';

gsap.registerPlugin(DrawSVGPlugin);

useGSAP(() => {
  gsap.fromTo('.draw-path', 
    { drawSVG: '0% 0%' },
    {
      drawSVG: '0% 100%',
      duration: 2,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: '.svg-container',
        start: 'top 70%',
        toggleActions: 'play none none none',
        once: true,
      },
    }
  );
});
```

### 8c. SVG Filter + GSAP (Sci-Fi Glow)

```tsx
useGSAP(() => {
  gsap.to('.holo-feTurbulence', {
    scrollTrigger: {
      trigger: '.svg-section',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
    },
    attr: { baseFrequency: '0.02 0.06' },
    duration: 2,
  });

  // Pulse the glow
  gsap.to('.glow-circle', {
    attr: { r: '+=5' },
    opacity: 0.3,
    duration: 2,
    yoyo: true,
    repeat: -1,
    ease: 'sine.inOut',
  });
});
```

### SVG Filter for Holographic Effect (inline in JSX)

```html
<svg width="0" height="0" style={{ position: 'absolute' }}>
  <defs>
    <filter id="holo-glitch">
      <feTurbulence type="fractalNoise" baseFrequency="0.02 0.06" numOctaves="1" result="noise" />
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" xChannelSelector="R" yChannelSelector="G" />
    </filter>
    <filter id="holo-glow">
      <feGaussianBlur stdDeviation="3" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>
</svg>
```

### Performance

- Precompile complex morphs: use `precompile: 'log'` first, then paste the result as `precompile: [...]`
- Use `shapeIndex: [number]` instead of `"auto"` to skip calculation overhead
- Render morphs to `<canvas>` with `render: drawFunction` when dealing with many/animated SVGs
- Use `MorphSVGPlugin.convertToPath()` to pre-convert `<circle>`/`<rect>`/`<ellipse>` before morphing
- Avoid animating SVG attributes that trigger layout (use `transform` instead of `cx`/`cy`)

---

## 9. Particle Effects

### 9a. Canvas Particle System with GSAP

```tsx
// components/CanvasParticles.tsx
'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface Particle {
  x: number;
  y: number;
  radius: number;
  color: string;
  velocity: { x: number; y: number };
  alpha: number;
  tween?: gsap.core.Tween;
}

export default function CanvasParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    let animationId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Create particles
    const colors = ['#00fff5', '#7b2ff7', '#ff00ff', '#00ff88'];
    for (let i = 0; i < 80; i++) {
      particlesRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        velocity: {
          x: (Math.random() - 0.5) * 0.8,
          y: (Math.random() - 0.5) * 0.8,
        },
        alpha: Math.random() * 0.6 + 0.2,
      });
    }

    // Mouse interaction
    let mouse = { x: 0, y: 0 };
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    // Animate particles with GSAP ticker for frame sync
    gsap.ticker.add(() => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particlesRef.current) {
        // Move
        p.x += p.velocity.x;
        p.y += p.velocity.y;

        // Wrap around edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Draw
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();

        // Connection lines to mouse
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 150) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = p.color;
          ctx.globalAlpha = (1 - dist / 150) * 0.3;
          ctx.stroke();
        }
      }
    });

    return () => {
      gsap.ticker.remove(() => {});
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-10" />;
}
```

### 9b. GSAP-Driven Particles (Animate Individual Particle Properties)

```tsx
// Animate specific particles with GSAP
const particleTl = gsap.timeline({ repeat: -1, yoyo: true });

particles.forEach((p, i) => {
  particleTl.to(p, {
    alpha: Math.random() * 0.8 + 0.2,
    radius: Math.random() * 4 + 1,
    duration: gsap.utils.random(1, 3),
    ease: 'sine.inOut',
  }, i * 0.02);
});
```

### 9c. Constellation/Network Effect (Nodes + Lines)

```tsx
// Add line connections between nearby particles
const drawConnections = (ctx: CanvasRenderingContext2D, particles: Particle[]) => {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 100) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(0, 255, 245, ${(1 - dist / 100) * 0.2})`;
        ctx.stroke();
      }
    }
  }
};
```

### When GSAP particles vs. Three.js

| GSAP + Canvas 2D | Three.js / R3F |
|---|---|
| 2D particles, lighter setup | True 3D, camera controls |
| ~200-500 particles smoothly | 10,000+ particles via instanced meshes |
| Quick PoC, decorative | Full 3D scenes, post-processing |
| Good for backgrounds, mouse trails | Good for hero 3D elements, product showcases |

### Performance

- Use `gsap.ticker` instead of `requestAnimationFrame` for frame-synced canvas updates
- Limit particle count to <200 for mobile, <500 for desktop
- Reduce connections (`dist < 100`, check only nearby pairs with spatial hashing for >100 particles)
- Use `ctx.globalCompositeOperation = 'lighter'` for additive blending (looks great on dark themes)
- Offload heavy particle systems to Web Worker if needed

---

## 10. Page Transitions & Route Changes

### 10a. Next.js App Router Page Transition (GSAP + Template)

```tsx
// app/template.tsx
'use client';

import { useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Exit animation (previous page) — handled by layout, this runs on mount
      gsap.set(ref.current, { opacity: 1, y: 0 });

      // Enter animation
      gsap.fromTo(ref.current,
        { opacity: 0, y: 30, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.6, ease: 'power3.out' }
      );
    }, ref);

    return () => ctx.revert();
  }, [pathname]);

  return <div ref={ref}>{children}</div>;
}
```

### 10b. Sci-Fi Wipe Transition Overlay

```tsx
// components/HoloTransition.tsx
'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';

export function useHoloTransition() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const transition = useCallback((to: string) => {
    const overlay = overlayRef.current!;
    const tl = gsap.timeline();

    tl.set(overlay, { display: 'block', opacity: 0 })
      .to(overlay, {
        opacity: 1,
        duration: 0.4,
        ease: 'power2.in',
        onComplete: () => router.push(to),
      })
      // The overlay stays visible while Next.js navigates
      .to(overlay, {
        opacity: 0,
        duration: 0.4,
        delay: 0.2,
        ease: 'power2.out',
        onComplete: () => gsap.set(overlay, { display: 'none' }),
      });
  }, [router]);

  const Overlay = () => (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[999] pointer-events-none hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(0,255,245,0.1), rgba(123,47,247,0.1))',
        backdropFilter: 'blur(20px)',
      }}
    >
      <div className="holo-scan" />
    </div>
  );

  return { transition, Overlay };
}

// Usage in layout:
// const { transition, Overlay } = useHoloTransition();
// <Overlay />
// <button onClick={() => transition('/projects')}>Go to Projects</button>
```

### 10c. Page Exit + Enter (with React Context)

```tsx
// contexts/TransitionContext.tsx
'use client';

import { createContext, useContext, useRef, useState } from 'react';

interface TransitionContextType {
  isTransitioning: boolean;
  navigate: (to: string) => Promise<void>;
}

const TransitionContext = createContext<TransitionContextType>({
  isTransitioning: false,
  navigate: async () => {},
});

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  const navigate = async (to: string) => {
    setIsTransitioning(true);
    const overlay = overlayRef.current!;

    await gsap.to(overlay, { autoAlpha: 1, duration: 0.5, ease: 'power2.in' }).then(() => true);
    window.location.href = to;
  };

  return (
    <TransitionContext.Provider value={{ isTransitioning, navigate }}>
      <div ref={overlayRef} className="fixed inset-0 z-[9999] pointer-events-none invisible bg-black" />
      {children}
    </TransitionContext.Provider>
  );
}

export const useTransition = () => useContext(TransitionContext);
```

### When GSAP transitions vs. Framer Motion `AnimatePresence`
- **Framer Motion**: `AnimatePresence` with `mode="wait"` is the idiomatic Next.js approach — handles exit animations natively
- **GSAP**: More control over complex overlay effects, timeline-based multi-step transitions, sync with scroll positions
- **Hybrid**: Use Framer Motion for simple page enter/exit, GSAP for complex transitioning overlays

---

## 11. Smooth Scrolling with Lenis + GSAP Integration

### 11a. Lenis Setup with ScrollTrigger Proxy

```tsx
// app/providers.tsx (or layout.tsx)
'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // exponential ease
      smoothWheel: true,
      touchMultiplier: 2,
      lerp: 0.1, // lower = smoother but more delayed
      infinite: false,
    });

    // Link Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Disable GSAP's default lag smoothing (Lenis handles it)
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(() => {});
    };
  }, []);

  return <>{children}</>;
}
```

### 11b. Lenis with Custom Scroll Actions

```tsx
// hooks/useLenis.ts
import { useRef, useEffect } from 'react';
import Lenis from 'lenis';

export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      lerp: 0.08,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    lenisRef.current = lenis;

    return () => lenis.destroy();
  }, []);

  return {
    scrollTo: (target: string | number | HTMLElement, options?: { offset?: number; duration?: number }) => {
      const lenis = lenisRef.current;
      if (!lenis) return;

      if (typeof target === 'string') {
        const el = document.querySelector(target);
        if (el) lenis.scrollTo(el, options);
      } else if (typeof target === 'number') {
        lenis.scrollTo(target, options);
      } else {
        lenis.scrollTo(target, options);
      }
    },
    stop: () => lenisRef.current?.stop(),
    start: () => lenisRef.current?.start(),
  };
}
```

### 11c. Lenis + GSAP ScrollTo Plugin

```tsx
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

const smoothScrollTo = (target: string) => {
  const el = document.querySelector(target);
  if (!el) return;

  // Use Lenis directly (cleaner than ScrollToPlugin with Lenis)
  lenis.scrollTo(el, {
    offset: -100,
    duration: 1.5,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  });
};
```

### 11d. Delayed ScrollTrigger Refresh (Lenis wrapper)

```tsx
// After Lenis init, refresh all ScrollTriggers
useEffect(() => {
  const lenis = new Lenis({ /* config */ });

  // Critical: Refresh after fonts/images load
  const refreshAll = () => ScrollTrigger.refresh();
  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => lenis.raf(time * 1000));

  // Refresh after a short delay to let Lenis initialize
  setTimeout(refreshAll, 100);
  window.addEventListener('resize', refreshAll);

  return () => {
    lenis.destroy();
    window.removeEventListener('resize', refreshAll);
  };
}, []);
```

### Lenis configuration for holographic/sci-fi feel

```ts
const lenis = new Lenis({
  duration: 1.5,       // slower scroll for cinematic feel
  lerp: 0.06,          // very smooth interpolation
  smoothWheel: true,
  syncTouch: true,
  touchMultiplier: 2,  // speed up touch scroll (otherwise feels sluggish)
  smoothTouch: false,  // keep native on touch for performance
});
```

### Performance notes

- Always set `gsap.ticker.lagSmoothing(0)` to prevent GSAP and Lenis from fighting
- `ScrollTrigger.normalizeScroll(true)` prevents mobile address bar show/hide jitter
- Call `ScrollTrigger.refresh()` after dynamic content loads (images, fonts, data)
- Lenis auto-handles `window` vs `scroller` for ScrollTrigger — no `scrollerProxy` needed

---

## 12. Performance Optimization for Animation-Heavy Sites

### 12a. GSAP Context Cleanup (React Best Practice)

```tsx
// Always use useGSAP for automatic cleanup
'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function AnimatedComponent() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // All animations inside here are auto-registered to context
    // They get reverted on unmount

    gsap.from('.title', { y: 100, opacity: 0 });
    gsap.from('.card', { y: 50, opacity: 0, stagger: 0.1 });

    ScrollTrigger.create({
      trigger: '.section',
      start: 'top 80%',
      onEnter: () => console.log('triggered'),
    });

    return () => {
      // Manual cleanup if needed (rare — context handles most)
    };
  }, { scope: container });

  return <div ref={container}>{/* ... */}</div>;
}
```

### 12b. Conditional Animations with matchMedia

```tsx
useGSAP(() => {
  const mm = gsap.matchMedia();

  // Desktop: heavy animations
  mm.add('(min-width: 768px)', () => {
    gsap.from('.heavy-animation', {
      scrollTrigger: { trigger: '.heavy-animation', start: 'top 80%' },
      x: 200, rotation: 15, opacity: 0, duration: 1,
    });
  });

  // Mobile: reduced motion
  mm.add('(max-width: 767px)', () => {
    gsap.from('.heavy-animation', {
      scrollTrigger: { trigger: '.heavy-animation', start: 'top 90%' },
      y: 20, opacity: 0, duration: 0.4,
    });
  });

  // Respect prefers-reduced-motion
  mm.add('(prefers-reduced-motion: reduce)', () => {
    gsap.set('.heavy-animation', { opacity: 1, x: 0 });
    // No animations
  });

  return () => mm.revert();
});
```

### 12c. Performance Checklist

```tsx
// ✅ DO
// 1. Animate transforms, not layout properties
gsap.to(el, { x: 100, y: 50 });                  // GPU-accelerated
// ❌ gsap.to(el, { left: 100, top: 50 });       // Triggers layout

// 2. Use force3D for tricky elements
gsap.set(el, { force3D: true });                   // Forces GPU layer

// 3. Kill ScrollTriggers on unmount
// useGSAP() handles this automatically

// 4. Use once: true when animation only plays forward
scrollTrigger: { trigger: el, once: true }

// 5. Revert SplitText after animation completes
const split = new SplitText(el, { type: 'chars' });
gsap.from(split.chars, {
  onComplete: () => split.revert()                // Restore DOM
});

// 6. Batch ScrollTriggers for grid items
ScrollTrigger.batch('.grid-item', { interval: 0.1 });

// 7. Use scrub: true (boolean) over scrub: 1 (number) when possible
// Boolean = linked, no overhead. Number = catch-up tween running.

// ❌ AVOID
// - Animating width, height, margin, padding, border-width (triggers layout)
// - Creating 100+ simultaneous ScrollTriggers
// - Splitting thousands of characters (SplitText on long paragraphs)
// - scrollTrigger: { trigger: 'body' }  (triggers are always active)
// - new ScrollTrigger() inside event handlers without contextSafe()
// - Forgetting to registerPlugin
```

### 12d. Image & Asset Loading Strategy

```tsx
// Wait for fonts and images before initializing animations
useEffect(() => {
  let ctx: gsap.Context;

  document.fonts.ready.then(() => {
    ctx = gsap.context(() => {
      // Your animations here — fonts are loaded
      gsap.from('.headline', { y: 100, opacity: 0 });
    });
  });

  return () => ctx?.revert();
}, []);

// Or for SplitText specifically:
SplitText.create('.split', {
  type: 'lines, words',
  autoSplit: true,  // re-splits when fonts load or width changes
  onSplit(self) {
    return gsap.from(self.lines, { y: 50, opacity: 0, stagger: 0.05 });
  },
});
```

### 12e. GSAP Config for Production

```tsx
// gsap.config() — call once at app root
gsap.config({
  force3D: true,            // Default to GPU layers for all tweens
  nullTargetWarn: false,    // Suppress warnings about missing targets in prod
  trialWarn: false,
  autoSleep: 60,            // Automatically pause ticker after 60s of inactivity
});
```

### 12f. Browser-Specific Notes

| Issue | Solution |
|---|---|
| Safari `backdrop-filter` with GSAP transform | Add `will-change: transform` to parent |
| iOS Safari parallax jank | Avoid `background-attachment: fixed`; use `position: sticky` or `<canvas>` |
| `transform-style: preserve-3d` in Safari | May need `-webkit-transform-style: preserve-3d` |
| Firefox SVG filter performance | Reduce `feTurbulence` `numOctaves` and `baseFrequency` |
| Mobile `100vh` with address bar | Use `dvh` units or `window.innerHeight` in JS; `ScrollTrigger.normalizeScroll(true)` |
| Chromium `@scroll-timeline` vs GSAP ScrollTrigger | GSAP has consistent cross-browser behavior |

---

## Quick Decision Matrix: GSAP vs. CSS vs. Framer Motion

| Scenario | Best Tool | Why |
|---|---|---|
| Simple fade-in on scroll | CSS `animation-timeline` or Framer Motion | Declarative, no JS overhead |
| Horizontal scroll sections | **GSAP ScrollTrigger** | Pin + scrub is built for this |
| Text char-by-char reveal | **GSAP SplitText** | No equivalent in CSS or FM |
| 3D card hover tilt | GSAP or Framer Motion | Both use same CSS transforms |
| Page transitions in Next.js | **Framer Motion** `AnimatePresence` | Framework-native exit animations |
| Complex multi-step timeline | **GSAP Timeline** | Labels, position parameter, scrubbing |
| Staggered grid reveal | **GSAP** | `stagger: { grid, from }` is unmatched |
| SVG path morphing | **GSAP MorphSVGPlugin** | Only production-ready solution |
| Canvas particle system | **GSAP ticker + Canvas** | Frame-synced with existing GSAP context |
| Mouse-follow custom cursor | **GSAP** quickTo/quickSetter | Sub-frame updates without overhead |

---

## Project Setup (Next.js 15 + GSAP + Lenis)

```bash
npm install gsap @gsap/react lenis
```

```tsx
// lib/gsap.ts — single registration point
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { TextPlugin } from 'gsap/TextPlugin';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { SplitText } from 'gsap/SplitText';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { useGSAP } from '@gsap/react';

// Register ALL plugins once
gsap.registerPlugin(
  ScrollTrigger,
  ScrollToPlugin,
  TextPlugin,
  ScrambleTextPlugin,
  SplitText,
  MorphSVGPlugin,
  DrawSVGPlugin,
  useGSAP
);

// Production config
gsap.config({
  force3D: true,
  nullTargetWarn: process.env.NODE_ENV === 'development',
  autoSleep: 60,
});

export { gsap, useGSAP };
```

```tsx
// app/layout.tsx
import SmoothScrollProvider from './providers';
import CustomCursor from '@/components/CustomCursor';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <CustomCursor />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
```

---

## Key Resources

- [GSAP Cheatsheet](https://gsap.com/cheatsheet)
- [ScrollTrigger Demos](https://codepen.io/collection/AEbkkJ)
- [Text Animation Demos](https://codepen.io/collection/ExBwoK)
- [MorphSVG Demos](https://codepen.io/collection/naMaNQ)
- [GSAP React Docs](https://gsap.com/resources/React)
- [Common ScrollTrigger Mistakes](https://gsap.com/resources/st-mistakes)
- [Lenis GitHub](https://github.com/darkroomengineering/lenis)
