# SKILL.md — Priyanshu Vora Portfolio UI/UX Redesign

## Mode: prototype
## Platform: desktop
## Scenario: personal
## Design System: priyanshu-portfolio (see DESIGN.md at project root)

---

## What This Project Is

A personal portfolio website for Priyanshu Vora — a recent Computer Science graduate (Brock University, GPA 3.7) and AI Solutions Developer currently working at Stokes Seeds. The portfolio targets recruiters and hiring managers for entry-level roles in Toronto.

**Tech stack**: Next.js 15 App Router, Tailwind CSS v4, TypeScript, GSAP, Framer Motion, Lenis smooth scroll.

**All functionality is already built.** Animations, routing, data fetching, SEO, accessibility, smooth scrolling, custom cursor — everything works. Your job is **UI/UX styling only.**

---

## Your Task

Restyle the visual layer of every component in:
- `components/sections/*.tsx` (11 sections)
- `components/ui/*.tsx` (shared UI components)
- `components/layout/*.tsx` (header, footer, preloader)

Apply the DESIGN.md design system consistently across all components to achieve a **Project Hail Mary holographic sci-fi aesthetic** — premium, immersive, space-themed, dark.

---

## Step-by-Step Instructions

### Step 1: Read the Design System
Read `DESIGN.md` at the project root. It contains the complete visual system: colors, typography, spacing, layout, component specs, motion rules, voice, brand, and anti-patterns. Internalize it.

### Step 2: Read All Section Files
Read every file in `components/sections/` to understand the current structure and content.

### Step 3: Restyle Each Section (in order)
For each section, apply the DESIGN.md rules:

1. **hero.tsx** — Observatory Dome aesthetic. Massive holographic name, role with blinking cursor, resume download CTA, LinkedIn + GitHub buttons. `whoami` terminal block. Make it feel like standing in a spaceship observatory looking at the stars.
   
2. **about.tsx** — Mission Briefing. Profile photo with violet border, rewritten recruiter-optimized bio, 3 stat cards (90%, 30+, 200+). Skills marquee.

3. **experience.tsx** — Ship's Log. Timeline with gradient line, 4 entries with violet dot nodes, list-style bullets with violet markers, tech tags.

4. **projects.tsx** — Artifact Archive. 2 featured cards (Invoice OCR, ResumeX) + compact row of 4 supporting projects. Cards should feel like projected holograms.

5. **education.tsx** — Crew Manifest. Brock University info, GPA stat card, honors badges (amber/gold), coursework tag cloud.

6. **honors.tsx** — Achievement Display. 3 cards with tiered styling (platinum/gold/silver).

7. **testimonials.tsx** — Communications Log. Featured quote (large, with stars) + 2 supporting quote cards. Blockquote styling with decorative quotes.

8. **skills.tsx** — Engineering Bay. Marquee header, proficiency-tiered skill pills (E/P/F badges), legend at bottom.

9. **resume-viewer.tsx** — Data Core. Interactive full resume document with tabbed sections, PDF download button.

10. **contact.tsx** — Communications Terminal. Hiring-focused CTA, email button, resume download, social links.

11. **layout components** — Header (sticky glass), Footer (minimal), Preloader (holographic ring → PV monogram).

### Step 4: Restyle Shared UI Components
- **hologram-frame.tsx** — Already styled with variants (panel/card/terminal) and glow colors. Enhance consistency.
- **project-card related elements** — Ensure consistent spacing, borders, glow effects.
- **section-heading.tsx** — Subtitle in violet mono with `>` prefix in cyan, SplitText title.
- **skill-node.tsx** — Already has proficiency-based styling. Enhance hover states.
- **cursor.tsx** — Crosshair style (dot + ring), violet/cyan color scheme.
- **buttons** — MagneticButton should have consistent pill shape, violet primary / outlined secondary.

### Step 5: Apply Consistency Rules
- ALL cards use the same glass morphism: `bg-[#0D0D14]/80 backdrop-blur-sm border border-white/[0.05] rounded-2xl`
- ALL sections use the same vertical rhythm: `py-28 md:py-36 lg:py-44`
- ALL content containers use `max-w-7xl mx-auto`
- ALL section headings follow the same pattern (subtitle + SplitText title)
- ALL interactive elements use violet for primary, cyan for secondary
- ALL text uses the typography scale from DESIGN.md

---

## What NOT to Change

- **DO NOT** modify component structure or add/remove elements
- **DO NOT** change data files (`data/*.ts`)
- **DO NOT** touch animation code (GSAP, Framer Motion, SplitText)
- **DO NOT** modify the custom cursor implementation
- **DO NOT** change Lenis smooth scroll
- **DO NOT** modify SEO metadata or accessibility attributes
- **DO NOT** change the import structure
- **DO NOT** add new npm dependencies

---

## Success Criteria

When done correctly, the portfolio should feel like:
- A premium, immersive dark space experience
- Each section has a distinct "station" feel within the spacecraft theme
- The holographic elements (shimmer, scan lines, glow effects) feel subtle and premium, not gimmicky
- Typography is crisp and readable at all sizes
- Spacing is generous and rhythmic
- Colors are restrained — predominantly dark with violet/cyan accents only where needed
- The overall feeling is: "This developer has taste and ships production-grade work"
