# Priyanshu Vora Portfolio — Complete UI/UX Audit & Redesign Strategy

**Auditor:** Hermes Agent (Senior Portfolio UX Strategist)
**Date:** May 20, 2026
**Live URL:** https://priyanshu-vora.vercel.app/
**Stack:** Next.js 15 + Tailwind CSS + GSAP + Framer Motion

---

## A. BRUTAL UX/UI AUDIT — RANKED BY SEVERITY

### CRITICAL (Fix immediately — these make the site look broken)

**C1. About section text renders without spaces — READABILITY FAILURE**
The live deployed About section renders the bio paragraph as a single concatenated string: "I'masoftwareengineerwhobuildsAI-poweredautomationthateliminatesoperationalbottlenecks..." The `TextReveal` component appears to be stripping whitespace between words during the character-split animation. This makes the entire About section unreadable. A recruiter who encounters this will close the tab in 3 seconds.
**Root cause:** The `TextReveal` or `SplitText` component likely splits by character and doesn't preserve space characters, or the animation adds `display: inline-block` to each character which collapses non-breaking spaces.
**Fix:** Ensure space characters are rendered as `&nbsp;` or wrapped in spans with `white-space: pre` during split-text animations.

**C2. Massive content repetition across sections**
The same information is delivered 3-5 times throughout the page:
- "90% invoice processing reduction" appears in: hero tagline → about bio → about stats → experience bullet → invoice OCR project card → resume summary
- "30+ ERP extensions" appears in: about bio → about stats → experience bullet → resume summary
- "250+ hours saved" appears in: about stats → experience bullet → resume summary
- "First-Class Standing / Dean's Honour List / GPA 3.7" appears in: about bio → education section → honors section → resume summary
Each repetition dilutes impact. A recruiter scanning the site sees the same claim repeatedly and concludes there's nothing else to say. This is the #1 reason the site feels "thin" despite having strong achievements.

**C3. Navigation bar has 9 items — decision paralysis**
The nav includes: About, Experience, Projects, Education, Testimonials, Skills, Resume, Contact (+ Honors hidden). That's 9 click targets before the user has seen any content. Portfolio best practice is 4-5 items maximum. The current nav telegraphs that the page will be long and repetitive before the recruiter has even scrolled.

### HIGH (Significantly degrades professional impression)

**H1. Section ordering is wrong for recruiter scanning**
A recruiter spends ~6 seconds scanning before deciding to read further. The critical scan path should be: WHO (hero) → WHAT CAN YOU DO (skills/stack) → PROVE IT (experience) → SHOW IT (projects) → CREDENTIALS (education) → SOCIAL PROOF (testimonials) → NEXT STEP (contact).
Current order buries Skills at position 7 (after testimonials) and puts Education at position 4. Skills must appear in the first 2 scrolls.

**H2. Hero misalignment: "AI Solutions Developer" vs "Software Engineer"**
The hero badge says "AI SOLUTIONS DEVELOPER" but your resume and site constants say "Software Engineer." This title discrepancy signals either indecision or dishonesty. Pick ONE primary professional identity and own it everywhere. "AI Solutions Developer" is stronger and more distinctive — but you must be prepared to defend it in interviews.

**H3. Skills section is a raw data dump with no hierarchy**
Six categories of skills rendered as identical pill tags. No visual distinction between "this is my bread and butter" (Python, Flask, Azure AI, MS Dynamics) and "I've used this once" (Django, Docker, MongoDB). The marquee in the About section compounds this by scrolling 30+ skill names in 4rem text — it's decorative noise, not useful information.

**H4. "Resume" section is 100% redundant**
The Resume section duplicates every other section: experience list, project list, skill list, education — all compressed into one panel. If you have a PDF download button (which you do), you don't need an inline HTML resume. This section adds ~800 words of pure repetition and signals that you don't trust the user to find information elsewhere.

**H5. Testimonials are anonymous — zero credibility**
All 3 testimonials are attributed to "IT Manager" — no real name, no photo, no linked LinkedIn profile. This reads as fabricated, whether or not it is. A single named testimonial from a real person is worth 10 anonymous ones. The 4.94/5.00 rating format is also unusual — standard is "5/5" or "4.9/5."

**H6. No clear conversion path**
The site has three "Download Resume" buttons (hero, resume section) and one "Say Hello" (contact). There's no Calendly link, no "View my work" CTA, no "Hire me" signal. A recruiter who's interested has to figure out what to do next. The contact section just says "Let's Work Together" with a mailto link — that's leaving conversions to chance.

### MEDIUM (Noticed by attentive viewers)

**M1. Glass card holographic shimmer is visually noisy**
Every `.glass-card` has a continuously animating gradient shimmer (`holo-shimmer` at 10s infinite) plus a repeating-linear-gradient scanline overlay. Move your mouse — it also gets a border glow AND translateY. Three simultaneous animated effects per card, per frame. On lower-end devices or battery-constrained laptops, this is jank-inducing. The effect is impressive for 3 seconds, then distracting forever.

**M2. ">" terminal prompt prefix is a gimmick that doesn't land**
Every section subtitle starts with ">" — e.g., "> MISSION BRIEFING", "> SHIP'S LOG", "> ARTIFACT ARCHIVE". This is trying to evoke a terminal/developer aesthetic, but a portfolio website is not a terminal. Recruiters (who are often non-technical HR screeners) won't get the reference and will find the labels confusing. "Mission Briefing" doesn't tell me I'm about to read About Me.

**M3. Letter-spaced hero name is visually aggressive**
"P R I Y A N S H U" and "V O R A" rendered with per-character split animation at `tracking-[-0.03em]` in `font-extrabold`. The tracked-out characters combined with the split animation create a jittery entrance. The name should feel confident and anchored, not vibrating into existence character-by-character.

**M4. Extreme size contrast between headings and body**
Section headings use `clamp(2rem, 6vw, 5rem)` — on a 1440px display that's ~86px. Body text is 16-18px. That's a 5:1 ratio. The headings feel disconnected from their content; they read as decorative banners rather than section leaders. A 3:1 ratio (heading ~48px, body 16px) would feel more composed.

**M5. Education + Honors are split unnecessarily**
The Education section contains an honors sub-section ("Honors & Awards" with 2 pill tags), AND there's a separate Honors section in the nav. But there are only 2 honor items (Dean's List, First-Class Standing) — they don't warrant their own section. This fragmentation makes the page feel padded.

**M6. The "Additional Projects" grid weakens the portfolio**
Four mini-project cards at 1/4 width each with truncated descriptions. "Café Management System" and "BC Query Extensions" are filler — they dilute the impact of the two strong featured projects (Invoice OCR, ResumeX). A portfolio is judged by its weakest project, not its strongest.

**M7. Light mode appears under-tested**
The CSS defines light mode variables but the dark mode shows much more visual care (void-bg, nebula, stars, glass effects with backdrop-blur). In light mode, the glass cards lose their depth and the background is a flat #FAFAFA. Many CSS classes force white text regardless of theme (e.g., project cards use `text-white` hardcoded, not `text-[var(--theme-text)]`).

### LOW (Polish items — fix when convenient)

**L1. Custom cursor is unnecessary complexity**
The custom dot/ring cursor (`CustomCursor`, `CursorProvider`) replaces the native browser cursor. On some setups, a laggy custom cursor signals "amateur over-engineering." It's correctly disabled for touch devices but adds maintenance burden with no conversion benefit.

**L2. Preloader adds perceived load time**
The `Preloader` component shows a loading animation before the page renders. Even if it's 300ms, it creates a perceived delay. Modern portfolios should be instant-on — the preloader draws attention to load time rather than hiding it.

**L3. Footer is bare-minimum**
Copyright, back-to-top, GitHub, LinkedIn. No email, no location, no "Built with" credit. A footer is often the last thing a recruiter sees — it should reinforce your brand, not feel like an afterthought.

**L4. Skip-to-content link is styled but invisible**
You have a `.skip-to-content` class with proper focus styles — excellent for accessibility. But it only shows when focused. Consider making it more discoverable for keyboard users.

**L5. Profile image has a hardcoded dark gradient**
The about section image has `ring-offset-[#050510]` hardcoded — this is the dark background color. In light mode, the ring offset would mismatch. Should reference `var(--theme-bg)`.

**L6. Font choices are fine but not distinctive**
Space Grotesk + Syne + JetBrains Mono is a solid sans-serif/mono pairing. The UI/UX design system recommends Archivo + Space Grotesk for portfolio sites — slightly warmer and more characterful than Syne's geometric austerity. Consider the swap.

---

## B. REDESIGNED PORTFOLIO STRATEGY

### New Information Architecture

**Page flow (top to bottom):**

1. **HERO** — Name, title, location, ONE clear value proposition sentence, 2 CTAs (Download Resume + View Work)
2. **ABOUT + STATS** — 3-sentence bio (no repetition), 3 impact stats with context
3. **SKILLS** — 4-5 key skill clusters with visual hierarchy (expert/proficient)
4. **EXPERIENCE** — 3 roles (cut Java Developer Intern — it's from 2021 and adds nothing)
5. **FEATURED WORK** — 2 projects, large cards, side by side
6. **EDUCATION** — School, degree, GPA, coursework (merge honors here)
7. **TESTIMONIALS** — 1-2 named testimonials, or cut this section entirely
8. **CONTACT** — Calendly link + Email + Resume download + LinkedIn + GitHub

### What to Keep, Merge, Cut, Rewrite

| Section | Action | Reason |
|---------|--------|--------|
| Hero | **Rewrite** | Sharper tagline, single professional identity |
| About | **Rewrite + Merge** | Merge stats in, cut repeated claims, fix text rendering |
| Skills | **Move up + Restructure** | From position 7 to position 3, add visual hierarchy |
| Experience | **Trim** | Cut Java Developer Intern role (irrelevant, 5+ years old) |
| Projects | **Trim** | Cut "Additional Projects" grid entirely, keep 2 featured |
| Education | **Merge** | Absorb Honors section into Education |
| Honors | **Delete** | 2 items don't warrant their own section |
| Testimonials | **Rewrite or Cut** | Either get real names or remove — anonymous quotes hurt credibility |
| Resume (HTML) | **Delete** | PDF download is sufficient, inline is pure repetition |
| Contact | **Strengthen** | Add Calendly, stronger CTA |

### Cleaner Narrative Flow

```
Hero: "I build automation that saves enterprises thousands of hours."
  ↓
About: Here's who I am in 2 sentences, and here are the numbers.
  ↓
Skills: Here's what I work with (hierarchical, scannable).
  ↓
Experience: Here's where I've done it (3 roles, results-focused).
  ↓
Work: Here are 2 things I've built that prove it.
  ↓
Education: Brock CS, 3.7 GPA, First-Class Standing.
  ↓
Contact: Let's talk. Here's my calendar.
```

---

## C. VISUAL SYSTEM RECOMMENDATION

### Typography Direction

| Role | Font | Weight | Size | Line Height |
|------|------|--------|------|-------------|
| Hero name | Archivo (or Space Grotesk) | 700 | clamp(3.5rem, 7vw, 6rem) | 0.95 |
| Section headings | Space Grotesk | 600 | clamp(2rem, 4vw, 3.5rem) | 1.1 |
| Subheadings | Space Grotesk | 500 | 1.25rem | 1.3 |
| Body | Space Grotesk | 400 | 1rem (16px) | 1.7 |
| Small / Meta | JetBrains Mono | 400 | 0.75rem | 1.5 |
| Stats numbers | Archivo | 700 | 3rem | 1 |

**Key change:** Drop heading sizes by ~30%. Current `clamp(2rem, 6vw, 5rem)` section headings are too large. Reduce to `clamp(2rem, 4vw, 3.5rem)`. This maintains impact while improving the heading-to-body ratio.

### Contrast Targets

| Element | Light Mode | Dark Mode | Target Ratio |
|---------|-----------|-----------|--------------|
| Body text on bg | #09090B on #FAFAFA | #E8ECF4 on #050510 | ≥ 7:1 (AAA) |
| Muted text | #52525B on #FAFAFA | #8B92A8 on #050510 | ≥ 4.5:1 (AA) |
| Accent on bg | #2563EB on #FAFAFA | #7C3AED on #050510 | ≥ 4.5:1 |
| Button text | #FFFFFF on #2563EB | #FFFFFF on #7C3AED | ≥ 4.5:1 |

Current contrast ratios appear adequate but should be verified with a tool like WebAIM's contrast checker.

### Spacing Rhythm

Use a consistent 8px grid:

```
Section padding-y: 120px (15×)
Card padding: 32px (4×)
Card gap: 24px (3×)
Element gap within cards: 16px (2×)
Inline element gap: 8px (1×)
```

The current `py-28 md:py-36 lg:py-44` (112/144/176px) doesn't follow a clean rhythm. Standardize to `py-20 md:py-28 lg:py-32` (80/112/128px).

### Card and Section Styling

**KEEP:**
- Glass panel with subtle border (1px `var(--theme-border)`)
- Purple/cyan accent colors (distinctive, not generic blue)
- Rounded corners (1.25-1.5rem feels premium)
- Dark mode void/nebula background (it's genuinely good)

**CHANGE:**
- Remove holographic shimmer animation from glass cards. Replace with a static subtle gradient overlay that doesn't animate.
- Reduce hover effects to ONE: border color change + subtle shadow. Drop translateY.
- Standardize card styling across all sections. Currently projects, experience, education, testimonials each have different card styles.
- Light mode cards need actual depth (box-shadow, not just flat white).

### Navigation Treatment

- Reduce to 5 items: About, Skills, Experience, Work, Contact
- Keep the pill-style active indicator (it's clean and clear)
- Shrink font size from `text-[0.8rem]` to `text-[0.75rem]` to reduce visual weight
- Remove "PV." logo text weight — it competes with the hero name

### Motion Principles

**KEEP:**
- Staggered fade-in on scroll (FadeIn component)
- Section heading split-text reveal (one-time, on view)
- Smooth scroll behavior

**CHANGE:**
- Remove hero character-split animation (too jittery, delays content delivery). Replace with a simple fade-up of the full name.
- Remove continuous animations (holo-shimmer, status-pulse). All motion should be triggered by user action or happen once on entry.
- All animations must respect `prefers-reduced-motion` (you already have this — good)
- Reduce stagger delays so sections load faster (50ms per item, not 100-150ms)

---

## D. COPYWRITING IMPROVEMENTS

### Hero — Current vs Recommended

**Current:**
> "AI SOLUTIONS DEVELOPER"
> "I build AI-powered automation that eliminates operational bottlenecks and creates measurable impact."
> "Toronto, ON, Canada | Available for Full-Time"

**Problem:** "AI Solutions Developer" is vague. "Eliminates operational bottlenecks" is corporate-speak. "Creates measurable impact" is filler words — every claim should BE the measurable impact.

**Recommended:**
> "SOFTWARE ENGINEER"
> "I build automation that saves enterprises thousands of hours. At Stokes Seeds, my OCR pipeline cut invoice processing from 2 days to 4 hours."
> "Toronto, ON · Open to full-time roles"

**Why:** Specific claim with a real number. No buzzwords. The recruiter immediately knows (a) what you do, (b) that you have proof, (c) where you are.

### About — Current vs Recommended

**Current (truncated):**
> "I'm a software engineer who builds AI-powered automation that eliminates operational bottlenecks. At Stokes Seeds, I built an OCR pipeline using Azure AI that slashed invoice processing by 90%, and shipped 30+ ERP extensions that transformed inventory, sales, and purchasing workflows."

**Problem:** Repeats the hero tagline nearly verbatim. "Transformed workflows" is vague. "Slash" is informal.

**Recommended:**
> "I'm a software engineer who builds backend systems and automation for enterprise operations. Over 2.5 years, I've delivered 30+ ERP extensions across inventory, sales, and purchasing modules, and built an AI-powered invoice processing pipeline that handles 200+ invoices daily with 90% less manual work. I graduated from Brock University in December 2025 with First-Class Standing and am seeking software engineering roles in Toronto."

### Remove These Buzzwords

| Remove | Replace With |
|--------|-------------|
| "eliminates operational bottlenecks" | "automates manual workflows" or specific claim |
| "creates measurable impact" | The number IS the impact — just state the number |
| "transformed workflows" | "redesigned inventory tracking for 10K+ SKUs" |
| "streamlined processes" | "reduced processing from 2 days to 4 hours" |
| "drove efficiency" | "saved 17 hours/week of manual data entry" |
| "leveraged" | "used" — always prefer plain English |

### Achievement Format

Every achievement should follow: **ACTION → RESULT → METRIC**

| Before | After |
|--------|-------|
| "Built 30+ custom MS D365 Business Central (AL) extensions, designing scalable API interfaces across inventory, sales, and purchasing workflows, reducing manual error rates by 94%." | "Shipped 30+ Business Central extensions that reduced manual data entry errors by 94% across inventory, sales, and purchasing." |
| "Developed an OCR invoice processing pipeline using Python, PyMuPDF, and Azure AI Document Intelligence, cutting processing time by 90% and saving 250+ hours of manual work." | "Built an OCR pipeline (Python + Azure AI) processing 200+ invoices/day — down from 2 days to 4 hours per batch." |

---

## E. BUILD SPEC

### Practical Frontend Recommendations

**1. Fix the TextReveal whitespace bug (CRITICAL)**
In `components/ui/text-reveal.tsx` (or wherever the split-text logic lives), ensure space characters between words are preserved. Options:
- Wrap each space in a `<span style="white-space: pre"> </span>`
- Use `word-spacing` on the parent container
- Switch from character-split (`type="chars"`) to word-split (`type="words"`) for body text

```tsx
// Instead of splitting every character:
"Hello world" → ['H','e','l','l','o',' ','w','o','r','l','d']
// Make space spans non-collapsing:
"Hello world" → ['H','e','l','l','o', '&nbsp;', 'w','o','r','l','d']
```

**2. Cut sections — delete these files (or comment out imports)**
- `components/sections/resume-viewer.tsx` — remove entirely, keep PDF download
- Remove `honors` from nav and data
- Cut `otherProjects` from `projects.tsx` — keep only `featuredProjects`
- Cut `Java Developer Intern` from `experience.ts`

**3. Reorder sections in page.tsx**
```tsx
<Hero />
<About />       // was position 2, stays
<Skills />      // was position 7, move to 3
<Experience />  // was position 3, move to 4
<Projects />    // was position 4, move to 5
<Education />   // was position 5, move to 6
<Testimonials />// was position 6, move to 7
<Contact />     // was position 8, stays
// DELETE: <ResumeViewer />
```

**4. Reduce nav items**
```tsx
export const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#projects" },
  { label: "Contact", href: "#contact" },
] as const;
```

**5. Simplify glass cards — remove holographic animation**
In `app/globals.css`, change `.glass-card::before` from animation to static:
```css
.glass-card::before {
  /* Remove animation: holo-shimmer 10s ease-in-out infinite; */
  opacity: 0.3; /* static, subtle */
}
```

**6. Replace hardcoded white text with theme variables**
In `projects.tsx`, change:
```tsx
// FROM: className="text-white/50"
// TO: className="text-[var(--theme-text-muted)]"
```

**7. Add Calendly link to Contact section**
```tsx
<MagneticButton
  href="https://calendly.com/priyanshuvora/chat"
  target="_blank"
  className="btn-outline !rounded-full !px-7 !py-3.5 !text-base"
>
  <Calendar size={18} />
  Schedule a Call
</MagneticButton>
```

**8. Typography adjustments**
```tsx
// SectionHeading — reduce size
className="font-display text-[clamp(1.75rem,4vw,3.5rem)] font-bold leading-[1.1] tracking-[-0.02em]"

// Hero name — remove character split, use word animation
<SplitText
  as="h1"
  type="words"  // was "chars"
  className="font-display text-[clamp(3rem,7vw,5.5rem)] font-bold leading-[0.92] tracking-[-0.02em]"
/>

// Standardize section padding
className="relative py-20 md:py-28 lg:py-32 section-padding"  // was py-28 md:py-36 lg:py-44
```

### Accessibility Fixes

1. **Add real alt text to profile image** — "Priyanshu Vora, software engineer" instead of just "Priyanshu Vora"
2. **Ensure all icon buttons have aria-labels** — the LinkedIn/GitHub icon-only links in the footer need `aria-label`
3. **Heading hierarchy audit** — ensure no skipped levels. Currently there's a jump from h2 (section headings) to h4 in the additional projects grid
4. **Focus indicators for keyboard nav** — the `:focus-visible` style exists but verify it's visible against both light and dark backgrounds
5. **Color contrast for muted text on light mode** — `#52525B` on `#FAFAFA` is only ~5.3:1 (passes AA but verify at small sizes)

### Polished Microcopy

| Current | Recommended |
|---------|-------------|
| "Download Resume" | "Download Resume (PDF)" |
| "Say Hello" | "Get in Touch" or "Let's Talk" |
| "View Source" | "View on GitHub →" |
| "Available now" | "Available for full-time roles" |
| "SCROLL" | Remove — let content pull the user down naturally |
| "WHO I AM" / "WHERE I'VE WORKED" / etc. | Drop the ">" prefix. Use: "About" / "Experience" / "Work" |

---

## SUMMARY: PRIORITY ORDER

1. **Fix the About section text rendering** (Critical C1) — the site is broken without this
2. **Cut Resume section, Honors section, Java Developer Intern, Additional Projects** (Critical C2, High H4) — removes ~40% of content repetition
3. **Reorder sections: Skills moves up to position 3** (High H1)
4. **Rewrite hero tagline and about copy** (High H2, Section D)
5. **Reduce nav to 5 items** (Critical C3)
6. **Simplify glass card animations** (Medium M1)
7. **Fix light mode text contrast** (Medium M7)
8. **Add Calendly and strengthen contact CTA** (High H6)
9. **Typography sizing adjustments** (Medium M4)
10. **Accessibility pass** (Low items)

**Estimated effort:** 4-6 hours of focused work. The changes are mostly deletions, reordering, and copy rewrites — not a rebuild.
