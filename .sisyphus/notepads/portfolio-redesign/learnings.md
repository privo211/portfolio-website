# Learnings — Task 1: Light/Dark Theme System

## Architecture
- **CSS variable bridge pattern**: `:root`/`.dark` define `--theme-*` properties, `@theme inline` maps them to Tailwind tokens via `var()`. This allows `bg-bg`, `text-text` etc. to work while theme switches at runtime via class toggling.
- **next-themes**: Provider wraps at innermost level (closest to children) so Lenis and Cursor have theme access. `attribute="class"` strategy toggles `.dark` on `<html>`.
- **suppressHydrationWarning**: Required on `<html>` to prevent flash/diff on SSR mismatch with theme detection.

## Files modified
1. `app/globals.css` — Complete restructure: CSS custom properties with :root/.dark blocks, @theme inline referencing var(), void-bg hidden in light, glass classes dual-mode, pills/buttons theme-aware
2. `app/layout.tsx` — Removed `className="dark"`, added `suppressHydrationWarning`
3. `components/providers/index.tsx` — Added ThemeProvider as outer wrapper
4. `components/providers/theme-provider.tsx` — NEW: NextThemesProvider wrapper with class strategy
5. `components/ui/theme-toggle.tsx` — NEW: Sun/Moon toggle with mounted hydration guard
6. `components/layout/header.tsx` — Added ThemeToggle, replaced hardcoded dark colors with CSS variables
7. `components/layout/nav-menu.tsx` — Made `activeSection` optional (pre-existing bug fix to unblock build)

## Key decisions
- Tailwind v4 `@theme inline` with `var()` works for basic utilities but opacity modifiers (`bg-bg/50`) won't decompose. Used `[var(--theme-bg)]` style where needed.
- Void background (nebula/stars) hidden with `display:none` in light mode rather than removing them — preserves the dark aesthetic when toggled.
- Glass panels use solid `bg-elevated` in light mode, translucent blur in dark mode — maintains the glass morphism intent per mode.

## Task 5: Scroll Spy — Active Nav Wiring (2026-05-18)

### Changes Made
- **`components/layout/header.tsx`**:
  - Added imports: `SECTION_IDS` from constants, `useSectionInView` from hooks
  - Added `activeSection` via `useSectionInView(Object.values(SECTION_IDS))`
  - Desktop nav: conditional `aria-current="page"` + active: `text-[var(--theme-accent)] bg-[var(--theme-accent-glow)]`, inactive: `text-[var(--theme-text-muted)] hover:text-[var(--theme-text)] hover:bg-[var(--theme-border)]`
  - Passes `activeSection` to `<NavMenu>`
- **`components/layout/nav-menu.tsx`**:
  - Made `activeSection: string | null` required in `NavMenuProps`
  - Mobile nav links: conditional `aria-current="page"` + active: `text-[var(--theme-accent)]`, inactive: `text-[var(--theme-text)] hover:text-[var(--theme-accent)]`
  - Staggered animation delays preserved

### Key Observations
- **Theme-aware via CSS variables**: Uses `var(--theme-accent)`, `var(--theme-accent-glow)`, etc. — works across light/dark themes implemented in Task 1
- `NAV_ITEMS` uses `href="#about"` format; `SECTION_IDS` uses raw `"about"` — match with `href.replace('#', '')`
- IntersectionObserver `rootMargin: "-40% 0px -40% 0px"` means section triggers active only when 20% of its middle is visible — compatible with Lenis
- **Re-run reminder**: First attempt used Tailwind classes (`text-accent`/`bg-accent/10`), but the theme system uses CSS variable tokens — re-applied with `var(--theme-*)` approach

### Verification
- `tsc --noEmit`: Passed (zero errors)
- LSP diagnostics: Clean on both header.tsx and nav-menu.tsx

## Task 6: About Section Redesign (2026-05-19)

### Changes Made
- **`components/sections/about.tsx`** — Complete text + theme rewrite:
  - **Paragraph 1**: Replaced "AI-powered automation that eliminates operational bottlenecks" → "backend systems and automation that eliminate operational waste". Changed `text-white/75` → `text-[var(--theme-text)] opacity-90`
  - **Paragraph 2**: Replaced "serving millions of drivers" → "CI/CD pipelines for the Track My Plow platform" + "AODA accessibility remediation across 10+ government web applications". Removed explicit GPA mention and "apply AI to solve real business problems" ending. Changed `text-white/65` → `text-[var(--theme-text-muted)]`
  - **Stat cards**: Added contextual labels with sublabel context (`From 2 days to 4 hours`, `Across inventory, sales, purchasing`, `Through process automation`). Changed `text-violet-400` → `text-[var(--theme-accent)]`, `text-cyan-400` → `text-[var(--theme-violet-bright)]`, `text-white/40` → `text-[var(--theme-text-muted)]`
  - **Profile info**: `text-cyan-400/80` → `text-[var(--theme-accent)]`, `text-white/30` → `text-[var(--theme-text-muted)] opacity-60`
  - **Marquee**: `text-white/[0.03]` → `text-[var(--theme-text-muted)] opacity-[0.04]` — visible in both light/dark modes

### Verification
- `tsc --noEmit`: Passed (zero errors)
- LSP diagnostics: Clean on about.tsx

## Task 2: Hero Section Redesign (2026-05-19)

### Changes Made
- **Void background**: Added `hidden dark:block` to the void-bg container so nebula/stars only render in dark mode — avoids empty dark void in light mode.
- **Role badge**: Changed `text-cyan-400/80` → `text-[var(--theme-cyan-glow)]` for theme-aware cyan. Kept the decorative cyan dot with glow shadow — works in both modes.
- **Name font size**: Reduced from `clamp(3.5rem,10vw,9rem)` to `clamp(3rem,8vw,7rem)` on both "PRIYANSHU" and "VORA" h1 elements. Removed `text-glow` class (text-shadow can look bad in light mode).
- **Tagline**: Changed `text-white/50` → `text-[var(--theme-text-muted)]`. Tagline text is pulled from `SITE_CONFIG.tagline`.
- **Location/status**: Changed `text-white/40` → `text-[var(--theme-text-muted)]`, changed MapPin color from `text-violet-400` → `text-[var(--theme-accent)]`. Status text: "Available for Full-Time" → "Open to work — Toronto, ON".
- **CTA buttons**: Left unchanged — `btn-primary` and `btn-outline` already use theme variables from Task 1.
- **Preserved**: SplitText animation, scroll parallax (useTransform), scroll indicator, name text.

### Result
- `tsc --noEmit` passes with zero errors.
- All 6 hardcoded color references replaced with CSS variable tokens.

## Task 8: Resume Viewer Redesign (2026-05-19)

### Changes Made
- **`components/sections/resume-viewer.tsx`** — Complete contrast + content + sizing pass:
  - **Professional Summary**: Replaced verbose 5-line summary with concise 2-line version mentioning 2.5 years experience, key skills, and Brock University degree.
  - **Contrast fixes** (14 hardcoded color → theme variables):
    - `text-violet-400` (role) → `text-[var(--theme-accent)]`
    - `text-white/35` (location/email) → `text-[var(--theme-text-muted)]`
    - `text-cyan-400/70` (LinkedIn/GitHub links) → `text-[var(--theme-accent)]`
    - `text-white/30` (company, education lines ×3) → `text-[var(--theme-text-muted)] opacity-60`
    - `text-white/45` (experience bullets, skills values ×2) → `text-[var(--theme-text-muted)]`
    - `text-cyan-400/60` (project tech tags) → `text-[var(--theme-text-muted)]`
    - `text-white/40` (project highlights) → `text-[var(--theme-text-muted)]`
    - `text-violet-400/70` (skill category labels) → `text-[var(--theme-accent)]`
  - **Font size bump**: All `text-[0.6rem]` and `text-[0.65rem]` promoted to `text-[0.7rem]`. `text-xs` (~0.75rem) left as-is since it exceeds the 0.7rem minimum.
  - **External links**: `rel="noopener noreferrer"` already present on both LinkedIn and GitHub links (pre-existing, no change needed).
  - **Borders**: `border-white/[0.05]` (header divider) and `border-white/[0.04]` (ResumeBlock dividers) → `border-[var(--theme-border)]` for theme-aware rendering.
  - **Preserved**: All headings (`text-white`), decorative colors (`text-violet-400` FileText icon, `text-amber-300/60` honors), ResumeBlock component structure, Download PDF button, data-driven sections.

### Key Observations
- The file already had `rel="noopener noreferrer"` on both external links — the task's Edit 4 was a no-op.
- Heading text (`text-white`) on `h3`/`h4` was left intentionally — these are structural elements that derive sufficient contrast from the glass-panel `bg-elevated` in both themes.
- `border-white/[0.04]` and `border-white/[0.05]` use the Tailwind v4 bracket syntax for opacity; replaced with CSS variable `var(--theme-border)` directly.

### Verification
- `tsc --noEmit`: Passed (zero errors)

## Task 8: Testimonials Section Theme Fix (2026-05-19)

### Changes Made
- **`components/sections/testimonials.tsx`** — 9 color replacements + 2 year labels:
  - **Truncation bug**: Removed `.slice(0, 200)` on line 76 — quotes now display in full. Mid-word cuts eliminated.
  - **Year labels**: Added conditional year badges for `stokes-2024` ("2024 Review") and `stokes-2025` ("2025 Review") to differentiate the two IT Manager testimonials. Labels appear on both featured and non-featured cards.
  - **text-white → theme variables**:
    - Featured blockquote: `text-white/70` → `text-[var(--theme-text)] opacity-80`
    - Featured name: `text-white` → `text-[var(--theme-text)]`
    - Featured role: `text-white/35` → `text-[var(--theme-text-muted)] opacity-60`
    - Others blockquote: `text-white/55` → `text-[var(--theme-text-muted)]`
    - Others rating label: `text-white/25` → `text-[var(--theme-text-muted)] opacity-40`
    - Others name: `text-white` → `text-[var(--theme-text)]`
    - Others role: `text-white/30` → `text-[var(--theme-text-muted)] opacity-50`
  - **Border visibility**:
    - Featured border-t: `border-white/[0.05]` → `border-[var(--theme-border)]`
    - Others border-t: `border-white/[0.05]` → `border-[var(--theme-border)]`
  - **Glass card verification**: Featured uses `glass-panel`, others use `glass-card` — both already themed from Task 1. No changes needed.

### Verification
- `tsc --noEmit`: Passed (zero errors)
- LSP diagnostics: Clean on testimonials.tsx

## Task: Simplify Skills Section (2026-05-19)

### Changes Made
- **Removed**: `Marquee` import, `allSkills` data import, `levelBadge` record, `levelLabel` record, and the full marquee block from JSX
- **Pills simplified to 2 tiers**: Expert (`skill.level === 'expert'`) gets primary accent styling (`var(--theme-accent-glow) bg`, `var(--theme-accent)/30 border`, `var(--theme-accent) text`); everything else gets neutral secondary (`var(--theme-bg-subtle)` bg, `var(--theme-border)` border, `var(--theme-text-muted)` text). E/P/F badge dots removed.
- **Legend simplified**: 3-tier → 2-tier ("Core" + "Proficient"). Color dots use `var(--theme-accent)/30` and `var(--theme-bg-subtle)`. Text uses `text-[var(--theme-text-muted)]` instead of hardcoded `text-white/25`.
- **All 6 skill categories preserved** — only visual rendering changed.

### Verification
- `tsc --noEmit`: Passed (zero errors)

## Task: Contact Section Redesign (2026-05-19)

### Changes Made
- **`components/sections/contact.tsx`** — Deduplicated CTAs, simplified to email-primary:
  - **Tag**: `> open to work <` → `Available now`. Removed decorative `<>` spans. Color: `text-violet-400/70` → `text-[var(--theme-accent)]`
  - **Body text**: Replaced "Seeking Software Developer & AI Solutions roles" → "Currently seeking full-time Software Engineer roles in Toronto. Open to on-site, hybrid, or remote. Let's talk." Color: `text-white/40` → `text-[var(--theme-text-muted)]`
  - **CTA simplification**: Removed Download Resume, LinkedIn, GitHub `MagneticButton` components. Kept only `Say Hello` email CTA (primary).
  - **Social links**: Added subtle inline text links for LinkedIn and GitHub below CTA — `text-sm text-[var(--theme-text-muted)] hover:text-[var(--theme-accent)]` with `·` separator.
  - **Email display**: `text-white/20` → `text-[var(--theme-text-muted)] opacity-40`
  - **Imports cleaned**: Removed `Download` from lucide-react, removed `GithubIcon, LinkedinIcon` from icons import.

### Rationale
- Hero section already has Download Resume, LinkedIn, and GitHub buttons — contact section was duplicating them. Email is the primary conversion goal for a contact section.

### Verification
- `tsc --noEmit`: Passed (zero errors)
- LSP diagnostics: Clean on contact.tsx

## Task: Footer Redesign (2026-05-19)

### Changes Made
- **`components/layout/footer.tsx`** — 5 color replacements + Back to top button:
  - **Border**: `border-white/[0.04]` → `border-[var(--theme-border)]`
  - **Copyright text**: `text-white/20` → `text-[var(--theme-text-muted)] opacity-60`
  - **GitHub icon**: `text-white/20 hover:text-violet-400` → `text-[var(--theme-text-muted)] opacity-60 hover:text-[var(--theme-accent)]`
  - **LinkedIn icon**: `text-white/20 hover:text-cyan-400` → `text-[var(--theme-text-muted)] opacity-60 hover:text-[var(--theme-accent)]`
  - **"Back to top" button**: Added `<button>` with `window.scrollTo({ top: 0, behavior: 'smooth' })` between separator and social icons. Uses theme variables for text/hover, with `&uarr;` arrow.
  - **Separator**: Added `|` pipe character with `text-[var(--theme-border)]` between back-to-top button and social icons.

### Verification
- `tsc --noEmit`: Passed (zero errors)
- LSP diagnostics: Clean on footer.tsx

## Task: Preloader Optimization (2026-05-19)

### Changes Made
- **`components/layout/preloader.tsx`** — Speed + accessibility + theme pass:
  - **Duration ≤500ms**: Timeout reduced from 2200ms → 400ms, exit transition from 0.6s → 0.1s (total ~500ms)
  - **Reduced motion**: Checks `window.matchMedia('(prefers-reduced-motion: reduce)')` via JS. If true, `setIsLoading(false)` immediately and `return null` — preloader never renders.
  - **aria-hidden**: Added `aria-hidden="true"` to the outermost `motion.div` so screen readers skip the decorative loading animation.
  - **Theme colors** (7 replacements):
    - `bg-[#050510]` → `bg-[var(--theme-bg)]`
    - `text-white` → `text-[var(--theme-text)]`
    - `text-violet-400` → `text-[var(--theme-accent)]`
    - `bg-violet-600/[0.06]` → `bg-[var(--theme-accent)]/5`
    - `border-violet-500/25` → `border-[var(--theme-border)]`
    - `bg-violet-400` (dot) → `bg-[var(--theme-accent)]`
    - `boxShadow` rgba animation simplified to `opacity` pulse (`[0.6, 1, 0.6]`) — avoids hardcoded rgba colors in motion values
  - **Animation speeds scaled**: ring rotation 2.5s → 0.8s, logo reveal delay 0.5s → 0.1s, logo duration 0.5s → 0.15s, glow pulse 1.2s → 0.4s

### Key Observations
- The `boxShadow` animation used hardcoded `rgba(139,92,246,*)` values which can't be parameterized with CSS variables in Framer Motion's `animate` array. Switched to a simpler `opacity` pulse that achieves a similar glow effect without color-specific values.
- `prefers-reduced-motion` was already respected in `globals.css` for CSS animations — this adds the JS-side check needed for Framer Motion components.
- Tailwind v4 supports `bg-[var(--theme-accent)]/5` for opacity-modified CSS variables in bracket syntax.

### Verification
- `tsc --noEmit`: Passed (zero errors)
- LSP diagnostics: Clean on preloader.tsx

## Task: Final Accessibility Pass (2026-05-19)

### Changes Made
- **`components/layout/nav-menu.tsx`** — Esc key handler:
  - Added `import { useEffect } from "react"`
  - Added `useEffect` with `keydown` listener: Esc key calls `onClose()`
  - Cleanup removes listener on unmount
  - Dependency: `[onClose]` — re-attaches if the close callback reference changes

### Pre-existing (no changes needed)
- **Resume external links** (`resume-viewer.tsx` lines 31, 34): Already had `rel="noopener noreferrer"` from previous task (Task 8).
- **Theme toggle** (`theme-toggle.tsx` line 27): Already had `aria-label="Toggle theme"` from Task 1.
- **Nav social links** (`nav-menu.tsx` lines 65, 74): Already had `rel="noopener noreferrer"`.
- **Mobile nav links**: Already had `aria-current="page"` from Task 5.

### Accessibility Checklist Summary
| Check | Status |
|---|---|
| Esc closes mobile nav | ✅ Added |
| External links have `rel="noopener noreferrer"` | ✅ Pre-existing |
| Theme toggle has `aria-label` | ✅ Pre-existing |
| Desktop nav `aria-current` | ✅ Pre-existing (Task 5) |
| Mobile nav `aria-current` | ✅ Pre-existing (Task 5) |
| Skip-to-content link | ✅ Pre-existing (layout.tsx) |
| Preloader `aria-hidden` | ✅ Pre-existing (Preloader task) |
| Preloader `prefers-reduced-motion` | ✅ Pre-existing (Preloader task) |

### Verification
- `tsc --noEmit`: Passed (zero errors)
- LSP diagnostics: Clean on nav-menu.tsx

## Task: Cursor Optimization (2026-05-19)

### Changes Made
- **`components/ui/cursor.tsx`** — 6 changes:
  - **Touch device hiding**: Added `custom-cursor-dot` / `custom-cursor-ring` class names to both divs. `globals.css` uses `@media (pointer: coarse)` to `display: none !important` — covers all touch devices (phones + tablets) regardless of screen width.
  - **Ring size reduced ~30%**: Default 28px→20px, hover 40px→28px. Dot hover 6px→4px. Less visually intrusive.
  - **Theme-aware colors**: Hardcoded `#A78BFA` → `var(--theme-accent)`, `rgba(139,92,246,0.8)` boxShadow → `var(--theme-accent-glow-strong)`, ring border `rgba(34,211,238,0.5)` / `rgba(139,92,246,0.25)` → `var(--theme-accent)` / `var(--theme-accent-glow)`.
  - **Accessibility**: `aria-hidden="true"` on both cursor elements (purely decorative).
  - **Performance**: `willChange: 'transform'` on both elements for GPU compositing. `pointer-events: none` already existed.
  - **Removed inline comments**: JSX comments (`{/* Inner dot... */}`) removed — self-documenting code.
- **`app/globals.css`** — Added cursor section with `@media (pointer: coarse)` rule.

### Key Observations
- `pointer: coarse` media query is more reliable than `hover: none` for touch device detection — some devices have both coarse pointer and hover capability (stylus). `pointer: coarse` correctly targets finger touch.
- `md:block` + `pointer: coarse` gives two layers of protection: small screens are hidden by Tailwind, large touch screens (tablets) are hidden by the media query.
- CSS variables in JSX `style` props work as plain strings — no need for `var()` parsing, browser resolves at paint time.

### Verification
- `tsc --noEmit`: Passed (zero errors)
- LSP diagnostics: Clean on cursor.tsx
