# Portfolio Redesign — Premium Personal Brand

## TL;DR

> **Quick Summary**: Complete UX/UI audit + redesign execution plan transforming a dark-only, glass-heavy, content-repetitive portfolio into a premium, recruiter-friendly site with full light/dark mode, WCAG AA contrast compliance, de-duplicated narrative, and a cleaner information architecture.

> **Deliverables**:
> - Full light/dark theme system with `prefers-color-scheme` respect
> - 10 tightened sections with zero redundant claims
> - WCAG AA+ contrast compliance across all text
> - 6 dead components removed, `useSectionInView` wired to header
> - Rewritten hero, about, and resume copy — buzzwords stripped, metrics preserved
> - Navigation with active scroll spy and `aria-current`
> - Optimized preloader (≤500ms) + touch-safe cursor
> - Project screenshots integrated from LinkedIn export assets

> **Estimated Effort**: Medium
> **Parallel Execution**: YES — 5 waves
> **Critical Path**: Task 1 → Task 3 → Task 4 → Task 8 → Task 12 → Task 18

---

## Context

### Original Request
Full audit and redesign of portfolio into premium, recruiter-friendly personal brand. Priorities: readability, visual hierarchy, typography, contrast, credible branding, recruiter scanning experience, deliberate motion, reduced repetition.

### Interview Summary
**Key Discussions**:
- **Title**: User chose "Software Engineer" over "AI Solutions Developer" or "Business Solutions Developer"
- **Color mode**: Full light/dark system with system preference detection
- **Subtitles**: Replace sci-fi labels ("mission briefing", "ship's log") with factual labels
- **Section strategy**: Keep all 10 sections but tighten content (remove duplication, not sections)
- **Preloader/cursor**: Keep both but optimize (shorten preloader ≤500ms, hide cursor on touch)

**Research Findings**:
- **48 LinkedIn-exported images** available for project screenshots and recognition badges
- **Professional Summary** in ResumeViewer is hardcoded prose, not from data files — violates single-source-of-truth
- **6 dead components**: `project-card.tsx`, `resume-card.tsx`, `skill-node.tsx`, `terminal-block.tsx`, `gradient-blob.tsx`, `hologram-frame.tsx`
- **`useSectionInView` hook** exists and works but is imported/used nowhere
- **Testimonials line 70**: `slice(0, 200)` truncates mid-word (content bug)
- **`float-up` keyframe, `cursor-blink` class, `text-gradient` class**: Defined but unused in any component
- **Contrast audit**: 54 opacity-modified text instances; `text-white/20` through `text-white/45` all fail WCAG AA

### Metis Review
**Identified Gaps** (addressed in plan):
- **Zero tests**: Test infrastructure assessment to be included; QA scenarios required per task
- **Design direction**: Final direction chosen: **Soft UI Evolution** (accessibility-focused, better contrast, subtle depth) with current Space Grotesk + Syne fonts preserved
- **`useSectionInView` dead**: Task 5 wires it to header
- **6 dead components**: Task 2 removes them
- **Honors not in nav**: Task 7 adds it

---

## Work Objectives

### Core Objective
Transform the portfolio into a premium, recruiter-friendly personal brand site with WCAG AA compliance, de-duplicated content, and a professional design system that works across light and dark modes.

### Concrete Deliverables
- Light/dark theme system with system preference detection + manual toggle
- All 10 sections with tightened content, zero duplicate claims
- WCAG AA compliant contrast (minimum 4.5:1 for body text)
- Scroll spy navigation with active states
- Optimized preloader and touch-safe cursor
- Project screenshots from existing LinkedIn assets
- All copy rewritten to remove buzzwords while preserving metrics

### Definition of Done
- [ ] `tsc --noEmit` passes with zero errors
- [ ] `npm run build` succeeds
- [ ] Light mode: all `<p>`, `<li>`, `<span>` text passes 4.5:1 contrast
- [ ] Dark mode: all `<p>`, `<li>`, `<span>` text passes 4.5:1 contrast
- [ ] Header nav shows `aria-current="page"` on scroll
- [ ] No sci-fi section subtitles remain
- [ ] Zero instances of "AI-powered" outside project context (max 3 total)
- [ ] `text-white/20`, `/25`, `/30`, `/35`, `/40`, `/45` removed from all components
- [ ] Zero dead components in `/components/ui/`
- [ ] Preloader ≤500ms total duration
- [ ] Custom cursor hidden on touch devices

### Must Have
- Full light/dark theme system
- WCAG AA compliance on ALL text
- Active nav scroll spy
- De-duplicated content (no repeat claims across sections)
- Professional title: "Software Engineer" throughout
- Project screenshots from existing assets
- `prefers-reduced-motion` respected

### Must NOT Have (Guardrails)
- NO forced dark-only mode (`className="dark"` on `<html>` removed)
- NO sci-fi section subtitles ("mission briefing", "ship's log", etc.)
- NO buzzwords: "AI-powered" limited to max 3 instances (project subtitles only)
- NO self-assessed "expert" skill levels — replace with neutral proficiency indicators
- NO text opacity below `text-white/55` equivalent in dark mode (WCAG AA minimum)
- NO hardcoded prose in ResumeViewer — pull from data files
- NO duplicate claims (same achievement in 2+ sections without strong reason)
- NO `text-gradient` or `float-up` dead CSS
- NO magnetic button effect on touch devices
- NO glass morphism on every section — use sparingly (max 3 sections)

---

## Verification Strategy

### Test Decision
- **Infrastructure exists**: YES (Playwright, pixelmatch for visual regression)
- **Automated tests**: Tests-after (add after implementation)
- **Framework**: Playwright (existing) + visual regression (existing `scripts/capture-screenshots.mjs`)
- **Agent-Executed QA**: MANDATORY for all tasks — Playwright for UI, curl for API checks, bash for build verification

### QA Policy
Every task MUST include agent-executed QA scenarios.
Evidence saved to `.sisyphus/evidence/task-{N}-{scenario-slug}.{ext}`.

- **Frontend/UI**: Use Playwright — Navigate, interact, assert DOM, screenshot
- **Build/Types**: Use Bash — `tsc --noEmit`, `npm run build`
- **Contrast**: Use Bash — Run contrast checker script against built output
- **Navigation**: Use Playwright — Scroll, verify active states, test keyboard

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Foundation — theme system, type updates, cleanup):
├── Task 1: Light/dark theme system + CSS design tokens [deep]
├── Task 2: Remove dead code + unused CSS [quick]
├── Task 3: Update data layer — title, copy, skill levels, de-duplication [quick]
├── Task 4: Rewrite lib/constants.ts — site config, nav items, section IDs [quick]
└── Task 5: Wire useSectionInView to header for scroll spy [quick]

Wave 2 (Core sections — hero, about, experience, projects):
├── Task 6: Redesign Hero section — title, tagline, CTA [visual-engineering]
├── Task 7: Redesign About section — stats, bio, profile [visual-engineering]
├── Task 8: Tighten Experience section — remove inflated language [visual-engineering]
├── Task 9: Redesign Projects section — add screenshots, tighten copy [visual-engineering]
└── Task 10: Update SectionHeading — remove sci-fi subtitles [quick]

Wave 3 (Secondary sections — education, honors, testimonials, skills, resume):
├── Task 11: Merge Honors into Education + add to nav [quick]
├── Task 12: Tighten Testimonials — fix truncation, balance superlatives [quick]
├── Task 13: Streamline Skills — reduce expert count, improve visual [visual-engineering]
├── Task 14: Redesign ResumeViewer — remove hardcoded prose, fix contrast [visual-engineering]
└── Task 15: Redesign Contact section — de-duplicate CTAs, tighten copy [quick]

Wave 4 (Polish — preloader, cursor, footer, accessibility):
├── Task 16: Optimize Preloader — 500ms max, reduced-motion respect [quick]
├── Task 17: Optimize CustomCursor — hide on touch, reduce visual weight [quick]
├── Task 18: Redesign Footer — add back-to-top, better contrast [quick]
└── Task 19: Accessibility pass — aria labels, focus traps, rel attributes [quick]

Wave FINAL (Verification + review):
├── Task F1: Plan compliance audit (oracle)
├── Task F2: Build + type check + visual regression
├── Task F3: Cross-browser QA (Playwright)
└── Task F4: Scope fidelity check (deep)
```

### Dependency Matrix

- **1**: - — 6, 7, 13 | Theme token foundation
- **2**: - — (independent) | Cleanup before redesign
- **3**: - — 6, 7, 8, 9, 12, 14, 15 | Data must be correct before UI
- **4**: - — 6, 10, 15 | Constants feed multiple sections
- **5**: - — (independent) | Hook wiring, no dependencies
- **6**: 1, 3, 4 — (final) | Hero needs theme + data + constants
- **7**: 1, 3 — (final) | About needs theme + data
- **8**: 3 — (final) | Experience needs data
- **9**: 1, 3 — (final) | Projects needs theme + data
- **10**: 4 — (final) | SectionHeading needs constants
- **11**: 3 — (final) | Honors merge needs data
- **12**: 3 — (final) | Testimonials needs data
- **13**: 1, 3 — (final) | Skills needs theme + data
- **14**: 1, 3 — (final) | ResumeViewer needs theme + data
- **15**: 3, 4 — (final) | Contact needs data + constants
- **16**: 1 — (final) | Preloader may use theme tokens
- **17**: - — (independent) | Cursor optimization
- **18**: 1 — (final) | Footer needs theme
- **19**: 5, 11, 14 — F1-F4 | Accessibility final pass
- **F1-F4**: ALL — user okay | Reviews depend on all tasks

### Agent Dispatch Summary

- **Wave 1**: 5 tasks — T1 → `deep`, T2 → `quick`, T3 → `quick`, T4 → `quick`, T5 → `quick`
- **Wave 2**: 5 tasks — T6 → `visual-engineering`, T7 → `visual-engineering`, T8 → `visual-engineering`, T9 → `visual-engineering`, T10 → `quick`
- **Wave 3**: 5 tasks — T11 → `quick`, T12 → `quick`, T13 → `visual-engineering`, T14 → `visual-engineering`, T15 → `quick`
- **Wave 4**: 4 tasks — T16 → `quick`, T17 → `quick`, T18 → `quick`, T19 → `quick`
- **Wave FINAL**: 4 tasks — F1 → `oracle`, F2 → `quick`, F3 → `unspecified-high`, F4 → `deep`

---

## TODOs

- [x] 1. **Light/Dark Theme System + CSS Design Tokens**

  **What to do**:
  - Remove `className="dark"` from `<html>` in `app/layout.tsx:86`
  - Add `next-themes` or custom `ThemeProvider` with `prefers-color-scheme` detection
  - Define complete light theme CSS custom properties in `globals.css` under `:root` (light defaults)
  - Define dark theme overrides under `.dark` selector
  - Create `ThemeToggle` component (sun/moon icon button) and place in header
  - Create `ThemeProvider` in `components/providers/` — wraps children, sets `class="dark"` on `<html>`, persists to `localStorage`
  - Update all `@theme inline` tokens to reference CSS variables that respond to theme
  - Ensure `--color-bg`, `--color-text`, `--color-text-muted`, `--color-accent`, `--color-border` all have light + dark values
  - Set light mode: bg=#FAFAFA, text=#09090B, muted=#52525B, accent=#2563EB, border=rgba(0,0,0,0.08)
  - Set dark mode: bg=#050510, text=#E8ECF4, muted=#8B92A8, accent=#7C3AED, border=rgba(255,255,255,0.08)
  - Remove all hardcoded `bg-[#050510]`, `text-white/X`, `text-[#...]` references that should use theme tokens
  - Update `.glass-panel`, `.glass-card`, `.glass-terminal` to work in light mode (use `bg-white/80` in light, `bg-[#0A0A18]/70` in dark)
  - Update `.btn-primary` to use `bg-accent` not hardcoded gradient
  - Update `.btn-outline` borders to use `border-border` token
  - Update `.pill-expert`, `.pill-proficient`, `.pill-familiar` to use theme-aware backgrounds
  - Update void-bg/nebula/stars to be dark-mode only (hidden in light mode via `.dark .void-bg`)

  **Must NOT do**:
  - Do NOT remove the dark theme — both modes must work
  - Do NOT use `color-scheme: dark` on html — system should auto-detect
  - Do NOT change the glass morphism approach — just make it work in light mode
  - Do NOT add a third theme variant

  **Recommended Agent Profile**:
  - **Category**: `deep`
    - Reason: Theme system touches every component; requires thorough planning of token architecture and careful propagation
  - **Skills**: []
    - Theme work is pure CSS/React — no specialized skills needed
  - **Skills Evaluated but Omitted**:
    - `ui-ux-pro-max`: Design tokens already defined in plan; no additional search needed

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 2, 3, 4, 5)
  - **Blocks**: Tasks 6, 7, 9, 13, 14, 16, 18
  - **Blocked By**: None (can start immediately)

  **References**:
  - `app/globals.css:1-31` — Current `@theme inline` tokens to extend
  - `app/globals.css:88-218` — Void background, glass-panel, glass-card, glass-terminal — need light variants
  - `app/globals.css:287-353` — Pill and button styles — need theme-aware colors
  - `app/layout.tsx:86` — Current forced `className="dark"` to remove
  - `components/providers/index.tsx` — Provider composition to modify (add ThemeProvider)
  - `components/layout/header.tsx` — Where ThemeToggle will be placed
  - **WHY**: These are the foundation files that every other component references for colors and backgrounds

  **Acceptance Criteria**:
  - [ ] Light mode: body background is light, text is dark
  - [ ] Dark mode: body background is dark, text is light
  - [ ] System preference respected on first load
  - [ ] Manual toggle persists across page reloads (localStorage)
  - [ ] Theme toggle button visible in header (desktop + mobile)
  - [ ] Glass panels visible and readable in both modes
  - [ ] No hardcoded colors remain in any component's Tailwind classes

  **QA Scenarios**:

  ```
  Scenario: Light mode — default load and readability
    Tool: Playwright
    Preconditions: localStorage cleared, system prefers light (or override via Playwright)
    Steps:
      1. Navigate to http://localhost:3000
      2. Wait for preloader to finish (max 1s)
      3. Assert: <html> does NOT have class "dark"
      4. Assert: body background-color is light (#FAFAFA or similar)
      5. Assert: hero name text is dark (#09090B or similar), readable against background
      6. Take screenshot: full page light mode
    Expected Result: Full page renders in light mode, all text readable, no invisible elements
    Failure Indicators: Dark background persists, white text on white background, glass panels invisible
    Evidence: .sisyphus/evidence/task-1-light-mode.png

  Scenario: Dark mode — toggle and persistence
    Tool: Playwright
    Preconditions: Light mode active
    Steps:
      1. Click theme toggle button (sun/moon icon in header)
      2. Assert: <html> now has class "dark"
      3. Assert: body background-color is #050510
      4. Reload page
      5. Assert: Dark mode persists after reload
    Expected Result: Theme toggles correctly and persists across navigation
    Failure Indicators: Toggle doesn't change theme, reload resets to light mode
    Evidence: .sisyphus/evidence/task-1-dark-mode.png
  ```

  **Evidence to Capture**:
  - [ ] task-1-light-mode.png — Full page light mode screenshot
  - [ ] task-1-dark-mode.png — Full page dark mode screenshot

  **Commit**: YES (groups with T2-T5)
  - Message: `feat(theme): add light/dark theme system with CSS tokens`
  - Files: `app/globals.css`, `app/layout.tsx`, `components/providers/`, `components/layout/header.tsx`

- [x] 2. **Remove Dead Code + Unused CSS**

  **What to do**:
  - Delete 6 unused component files:
    - `components/ui/project-card.tsx`
    - `components/ui/resume-card.tsx`
    - `components/ui/skill-node.tsx`
    - `components/ui/terminal-block.tsx`
    - `components/ui/gradient-blob.tsx`
    - `components/ui/hologram-frame.tsx`
  - Remove unused CSS classes/keyframes from `globals.css`:
    - `float-up` keyframe (lines 238-241)
    - `cursor-blink` class (line 236)
    - `text-gradient` class (lines 249-255)
    - `gradient-flow` keyframe (lines 243-247) — check if used elsewhere first
    - `text-glow` class (lines 258-260) — check Hero usage before removing
  - Check for any imports of deleted files and remove them
  - Run `grep` for each deleted export name to confirm no remaining references

  **Must NOT do**:
  - Do NOT delete `gradient-flow` or `text-glow` without verifying zero usage
  - Do NOT remove any component that IS imported anywhere
  - Do NOT remove CSS classes that are used by remaining components

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Straightforward file deletion and CSS cleanup — no architectural decisions
  - **Skills**: []
    - Pure file operations — no specialized skills needed
  - **Skills Evaluated but Omitted**:
    - None applicable

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 3, 4, 5)
  - **Blocks**: None directly (cleanup is independent)
  - **Blocked By**: None (can start immediately)

  **References**:
  - `components/ui/` — Directory listing to identify all files and verify which are imported
  - `app/globals.css:236-261` — Dead CSS classes to evaluate and remove
  - **WHY**: These are the exact locations of dead code identified in the audit

  **Acceptance Criteria**:
  - [ ] 6 dead component files deleted
  - [ ] `tsc --noEmit` passes (no broken imports)
  - [ ] `grep -r "project-card\|resume-card\|skill-node\|terminal-block\|gradient-blob\|hologram-frame" components/ app/` returns empty
  - [ ] Dead CSS classes removed from `globals.css`

  **QA Scenarios**:

  ```
  Scenario: Build succeeds after cleanup
    Tool: Bash
    Preconditions: Dead files identified
    Steps:
      1. Delete the 6 dead component files
      2. Remove dead CSS from globals.css
      3. Run: tsc --noEmit
      4. Assert: exit code 0, zero errors
    Expected Result: TypeScript compiles without errors — no broken imports
    Failure Indicators: "Cannot find module" errors, import resolution failures
    Evidence: .sisyphus/evidence/task-2-tsc-clean.txt
  ```

  **Evidence to Capture**:
  - [ ] task-2-tsc-clean.txt — TypeScript compilation output showing zero errors

  **Commit**: YES (groups with T1, T3-T5)
  - Message: `chore(cleanup): remove 6 dead components and unused CSS`
  - Files: `components/ui/*`, `app/globals.css`

- [x] 3. **Update Data Layer — Title, Copy, Skill Levels, De-Duplication**

  **What to do**:
  - **`data/experience.ts`**:
    - Remove inflated language: "Architected" → "Built", "Orchestrated" → "Developed", "Engineered" → "Built", "Streamlined" → "Automated"
    - Preserve all metrics exactly (94%, 90%, 250+, 200+, etc.)
    - Remove "transformed inventory, sales, and purchasing workflows" — replace with concrete outcome
    - Parshwa Infotech entry: quantify or remove vague claims ("improved accessibility and usability for a broader user base")
  - **`data/projects.ts`**:
    - "AI-Powered ERP Automation Engine" → "Intelligent Invoice Processing Pipeline"
    - "AI-Powered Full-Stack Resume Builder" → "ATS-Optimized Resume Builder"
    - Remove "innovative" from Flick highlights
    - Add concrete metrics to Email Sig project (quantify "reduced IT overhead")
    - Add concrete metrics to BC Query Extensions (quantify "enabled real-time data export")
  - **`data/skills.ts`**:
    - Reduce "expert" count from 11 to max 5: keep Python, Flask, Azure AI Services, MS Dynamics 365 BC, AL
    - Demote TypeScript, JavaScript, Microsoft Azure, Power Automate, OCR/AI Pipelines, VS Code to "proficient"
    - Remove "OCR / AI Pipelines" as a discrete skill (it's a project, not a skill)
    - Remove "VS Code" from skills entirely (not noteworthy)
    - Update level labels: "E" → "Advanced", "P" → "Proficient", "F" → "Familiar"
  - **`data/honors.ts`**:
    - Remove GPA 3.7 honor card (GPA already in Education)
  - **Ensure no data file still references "AI Solutions Developer"** — grep and verify

  **Must NOT do**:
  - Do NOT remove or falsify any metric (94%, 90%, 250+, etc. are real — keep them)
  - Do NOT remove entire skills — only adjust levels and labels
  - Do NOT delete projects — only tighten copy
  - Do NOT change the data file interfaces/types — components depend on them

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Data-only changes with clear, enumerated instructions — no UI work
  - **Skills**: []
    - Text editing and grep verification — no specialized skills needed
  - **Skills Evaluated but Omitted**:
    - None applicable

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 2, 4, 5)
  - **Blocks**: Tasks 6, 7, 8, 9, 12, 14, 15
  - **Blocked By**: None (can start immediately)

  **References**:
  - `data/experience.ts:20-25, 44-48, 80-83` — Lines with inflated verbs to rewrite
  - `data/projects.ts:19, 45, 77-78, 88-91, 115-117` — Subtitles and vague highlights
  - `data/skills.ts:15-80` — Skill levels to adjust
  - `data/honors.ts:32-39` — GPA honor to remove
  - **WHY**: These are the exact lines containing inflated language, duplicated content, and overrated skill levels

  **Acceptance Criteria**:
  - [ ] Zero instances of "AI-Powered" as section subtitle in projects (max 1 in description allowed)
  - [ ] Max 5 skills labeled "expert" (down from 11)
  - [ ] "Architected", "Orchestrated", "Engineered" removed from experience descriptions
  - [ ] GPA 3.7 honor card removed from `honors.ts`
  - [ ] "OCR / AI Pipelines" removed from skills
  - [ ] "VS Code" removed from skills
  - [ ] Zero references to "AI Solutions Developer" in all data files
  - [ ] `tsc --noEmit` passes (no interface violations)

  **QA Scenarios**:

  ```
  Scenario: Data integrity — no broken interfaces
    Tool: Bash
    Preconditions: Data files updated
    Steps:
      1. Run: tsc --noEmit
      2. Assert: exit code 0
      3. Grep: grep -r "AI-Powered" data/
      4. Assert: zero matches (or max 1 acceptable context)
      5. Grep: grep -r "Architected\|Orchestrated\|Engineered" data/experience.ts
      6. Assert: zero matches (all replaced)
    Expected Result: Build passes, inflated language removed, skill levels adjusted
    Failure Indicators: TypeScript errors from interface mismatch, remaining inflated words
    Evidence: .sisyphus/evidence/task-3-data-audit.txt
  ```

  **Evidence to Capture**:
  - [ ] task-3-data-audit.txt — grep results showing zero buzzwords, tsc output

  **Commit**: YES (groups with T1-T2, T4-T5)
  - Message: `refactor(data): de-duplicate content, fix skill levels, update copy`
  - Files: `data/experience.ts`, `data/projects.ts`, `data/skills.ts`, `data/honors.ts`

- [x] 4. **Rewrite lib/constants.ts — Site Config, Nav Items, Section IDs**

  **What to do**:
  - Update `SITE_CONFIG.role`: `"AI Solutions Developer"` → `"Software Engineer"`
  - Update `SITE_CONFIG.title`: `"Priyanshu Vora | AI Solutions Developer"` → `"Priyanshu Vora | Software Engineer"`
  - Update `SITE_CONFIG.description`: Remove "AI-powered data pipelines", use neutral language
  - Update `SITE_CONFIG.tagline`: Replace entirely — see copywriting section below for exact text
  - Update `SITE_CONFIG.location`: Keep `"Toronto, ON, Canada"` (already correct)
  - Update `NAV_ITEMS`: Add `{ label: "Honors", href: "#honors" }` between Education and Testimonials
  - Update `NAV_ITEMS`: Remove "AI Solutions" from any nav label context
  - Verify `SECTION_IDS` contains all 10 sections including `honors`
  - Verify `jsonLd` in `layout.tsx` uses new role
  - New tagline: `"Full-stack engineer specializing in enterprise automation and backend systems — I build tools that eliminate operational waste and ship measurable results."`

  **Must NOT do**:
  - Do NOT change `SOCIAL_LINKS` URLs
  - Do NOT remove any existing nav items (only add Honors)
  - Do NOT change `SITE_CONFIG.url` — wait for deployment URL
  - Do NOT change `SITE_CONFIG.email`

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Single file edit with clear string replacements
  - **Skills**: []
    - Text-only changes — no specialized skills needed
  - **Skills Evaluated but Omitted**:
    - None applicable

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 2, 3, 5)
  - **Blocks**: Tasks 6, 10, 15
  - **Blocked By**: None (can start immediately)

  **References**:
  - `lib/constants.ts:1-41` — Entire file to update
  - `app/layout.tsx:61-78` — JSON-LD schema to verify role matches
  - **WHY**: This is the single source of truth for site-wide text; every section references these constants

  **Acceptance Criteria**:
  - [ ] `SITE_CONFIG.role` is `"Software Engineer"`
  - [ ] `SITE_CONFIG.tagline` is new text (no "AI-powered")
  - [ ] `NAV_ITEMS` includes `{ label: "Honors", href: "#honors" }`
  - [ ] Zero references to "AI Solutions" in constants.ts
  - [ ] JSON-LD schema uses "Software Engineer" as jobTitle
  - [ ] `tsc --noEmit` passes

  **QA Scenarios**:

  ```
  Scenario: Constants export updated correctly
    Tool: Bash
    Preconditions: constants.ts edited
    Steps:
      1. Run: grep "SITE_CONFIG.role\|tagline\|AI" lib/constants.ts
      2. Assert: role is "Software Engineer"
      3. Assert: tagline does NOT contain "AI-powered"
      4. Run: tsc --noEmit
      5. Assert: exit code 0
    Expected Result: Site config updated, no broken references
    Failure Indicators: Old role text remains, import errors
    Evidence: .sisyphus/evidence/task-4-constants.txt
  ```

  **Evidence to Capture**:
  - [ ] task-4-constants.txt — grep results showing updated config

  **Commit**: YES (groups with T1-T3, T5)
  - Message: `refactor(constants): update title, nav items, tagline`
  - Files: `lib/constants.ts`, `app/layout.tsx`

- [x] 5. **Wire useSectionInView to Header for Scroll Spy**

  **What to do**:
  - Import `useSectionInView` in `components/layout/header.tsx`
  - Pass `SECTION_IDS` values as tracked sections
  - Add `aria-current="page"` to the nav link matching the active section
  - Add visual active state: `text-accent` + `bg-accent/10` for the active nav link
  - Update desktop nav rendering to apply conditional classes based on active section
  - Update mobile nav menu (`nav-menu.tsx`) similarly — pass active section as prop or use hook directly
  - Ensure smooth transition for active state change (use `transition-colors duration-200`)
  - Verify scroll spy works with Lenis smooth scrolling (IntersectionObserver `rootMargin` may need adjustment)

  **Must NOT do**:
  - Do NOT change the hook implementation — it works; just wire it
  - Do NOT break the mobile menu animation
  - Do NOT add scroll-jacking or override Lenis scroll behavior

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Wiring existing hook into existing component — clear integration point
  - **Skills**: []
    - React hook integration — no specialized skills needed
  - **Skills Evaluated but Omitted**:
    - None applicable

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 2, 3, 4)
  - **Blocks**: Task 19 (accessibility pass verifies scroll spy)
  - **Blocked By**: None (can start immediately)

  **References**:
  - `hooks/use-section-in-view.ts` — The hook to import (currently unused)
  - `lib/constants.ts:30-41` — SECTION_IDS object with all section IDs to track
  - `components/layout/header.tsx:46-58` — Desktop nav rendering to update
  - `components/layout/nav-menu.tsx:21-37` — Mobile nav rendering to update
  - **WHY**: The hook exists and works but is dead code; wiring it adds immediate UX value

  **Acceptance Criteria**:
  - [ ] Scrolling to About section highlights "About" in nav
  - [ ] `aria-current="page"` present on active nav link
  - [ ] Active state visually distinct (text color + subtle background)
  - [ ] Active state updates smoothly on scroll (no flicker)
  - [ ] Mobile nav also shows active state
  - [ ] All 10 sections trigger active state correctly

  **QA Scenarios**:

  ```
  Scenario: Scroll spy updates nav on scroll
    Tool: Playwright
    Preconditions: Page loaded, preloader finished
    Steps:
      1. Scroll to #about section (or click "About" in nav)
      2. Assert: Nav link "About" has class containing "text-accent" (or visual active indicator)
      3. Assert: Nav link "About" has attribute aria-current="page"
      4. Scroll to #projects section
      5. Assert: Nav link "Projects" has aria-current="page"
      6. Assert: Nav link "About" no longer has aria-current="page"
    Expected Result: Active nav state follows scroll position
    Failure Indicators: No active state ever appears, active state doesn't change on scroll
    Evidence: .sisyphus/evidence/task-5-scroll-spy.png
  ```

  **Evidence to Capture**:
  - [ ] task-5-scroll-spy.png — Screenshot of nav with active state highlighted

  **Commit**: YES (groups with T1-T4)
  - Message: `feat(nav): wire useSectionInView for scroll spy active states`
  - Files: `components/layout/header.tsx`, `components/layout/nav-menu.tsx`

- [x] 6. **Redesign Hero Section — Title, Tagline, CTA**

  **What to do**:
  - Update role badge: `"Software Engineer"` (from `SITE_CONFIG.role`)
  - Replace tagline: `"Full-stack engineer specializing in enterprise automation and backend systems — I build tools that eliminate operational waste and ship measurable results."`
  - Reduce name font size from `clamp(3.5rem, 10vw, 9rem)` to `clamp(3rem, 8vw, 7rem)` — still dramatic but less excessive
  - Remove `text-glow` class from name (retain only if it renders well in light mode, else drop)
  - Update CTA row: Keep "Download Resume" + "LinkedIn" + "GitHub" but ensure buttons work in light mode
  - Add theme-aware styling to CTA buttons
  - Update status dot text from "Available for Full-Time" to `"Open to work — Toronto, ON"`
  - Remove `text-white/50` on tagline → use `text-muted` token (must be ≥4.5:1 in both modes)
  - Remove `text-white/40` on location line → use `text-muted` token
  - Ensure void-bg/nebula/stars only render in dark mode (add `.dark .void-bg` or conditional)

  **Must NOT do**:
  - Do NOT remove the SplitText character animation on the name
  - Do NOT remove the scroll parallax (`useTransform` opacity/translateY)
  - Do NOT change the name from "PRIYANSHU VORA"
  - Do NOT remove the scroll indicator

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Hero is the first impression — requires careful visual judgment and theme system integration
  - **Skills**: []
    - Straightforward component editing with defined design tokens
  - **Skills Evaluated but Omitted**:
    - `frontend-ui-ux`: Design direction already specified; no mockup generation needed

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 7, 8, 9, 10)
  - **Blocks**: None downstream (final task)
  - **Blocked By**: Tasks 1, 3, 4

  **References**:
  - `components/sections/hero.tsx:1-137` — Full hero component to update
  - `lib/constants.ts:7-12` — SITE_CONFIG for updated tagline, role, location
  - `app/globals.css:258-260` — text-glow class (evaluate for removal)
  - **WHY**: Hero is the first thing visitors see; tagline and title are the most important copy on the site

  **Acceptance Criteria**:
  - [ ] Role badge reads "Software Engineer"
  - [ ] Tagline matches new text, no "AI-powered"
  - [ ] Name font size reduced (not dominant on mobile)
  - [ ] Tagline contrast ≥4.5:1 in both light and dark mode
  - [ ] CTAs visible and clickable in both modes
  - [ ] Void background hidden in light mode
  - [ ] Hero looks professional and readable in both themes
  - [ ] Preloader and scroll indicator still function

  **QA Scenarios**:

  ```
  Scenario: Hero renders correctly in light mode
    Tool: Playwright
    Preconditions: Light mode active, preloader finished
    Steps:
      1. Navigate to http://localhost:3000
      2. Wait for hero to render
      3. Assert: Role badge text is "Software Engineer"
      4. Assert: Tagline text contains "full-stack engineer" (NOT "AI-powered")
      5. Take screenshot of hero section
      6. Evaluate contrast: tagline text vs background (must be ≥4.5:1)
    Expected Result: Clean, professional hero with no buzzwords, readable in light mode
    Failure Indicators: "AI Solutions Developer" still visible, text unreadable in light mode
    Evidence: .sisyphus/evidence/task-6-hero-light.png

  Scenario: Hero renders correctly in dark mode
    Tool: Playwright
    Preconditions: Dark mode active
    Steps:
      1. Toggle to dark mode
      2. Assert: Void background (nebula/stars) visible
      3. Assert: Name text is white, readable on dark background
      4. Assert: Tagline text is readable (not too dim)
      5. Take screenshot of hero dark mode
    Expected Result: Atmospheric dark hero with readable text
    Evidence: .sisyphus/evidence/task-6-hero-dark.png
  ```

  **Evidence to Capture**:
  - [ ] task-6-hero-light.png — Hero in light mode
  - [ ] task-6-hero-dark.png — Hero in dark mode

  **Commit**: YES
  - Message: `refactor(hero): redesign with new title, tagline, theme support`
  - Files: `components/sections/hero.tsx`

- [x] 7. **Redesign About Section — Stats, Bio, Profile**

  **What to do**:
  - Rewrite paragraph 1: `"I'm a software engineer who builds backend systems and automation that eliminate operational waste. At Stokes Seeds, I built an OCR pipeline using Azure AI that cut invoice processing by 90% and shipped 30+ ERP extensions across inventory, sales, and purchasing modules."`
  - Rewrite paragraph 2: `"During my co-op at Ontario's Ministry of Transportation, I supported CI/CD pipelines for the Track My Plow platform and led AODA accessibility remediation across 10+ government web applications. I graduated from Brock University in December 2025 with First-Class Standing and am seeking full-time software engineering roles in Toronto."`
  - Update stat cards: Keep 90%, 30+, 250+ but add context subtitles. Change "90% Faster Invoice Processing" → "Invoice Processing Time Reduced" with subtitle "From 2 days to 4 hours"
  - Profile image: Keep as-is, works in both modes
  - Remove `text-white/75`, `text-white/65`, `text-white/40` → use theme tokens
  - Remove email/location text (duplicates hero + contact) OR keep but ensure contrast
  - Keep skill marquee at bottom but ensure it works in light mode (stroke text visible)

  **Must NOT do**:
  - Do NOT remove the profile image
  - Do NOT remove the stat cards — they're effective
  - Do NOT remove the skills marquee
  - Do NOT repeat the hero tagline word-for-word

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: About section combines bio, stats, and image — requires layout judgment
  - **Skills**: []
    - Clear copy/layout instructions provided
  - **Skills Evaluated but Omitted**:
    - `frontend-ui-ux`: Layout pattern already specified

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 6, 8, 9, 10)
  - **Blocks**: None downstream
  - **Blocked By**: Tasks 1, 3

  **References**:
  - `components/sections/about.tsx:41-73` — Bio paragraphs and stat cards to update
  - `data/skills.ts` — allSkills for marquee
  - `lib/constants.ts:7-12` — Updated SITE_CONFIG for reference
  - **WHY**: About is the second section visitors read; bio must support (not repeat) hero

  **Acceptance Criteria**:
  - [ ] Bio paragraph 1 contains no "AI-powered automation eliminates operational bottlenecks"
  - [ ] Bio paragraph 2 mentions Ontario 511 without "serving millions" (or rephrased accurately)
  - [ ] Stat cards show context (not just numbers)
  - [ ] All text has ≥4.5:1 contrast in both modes
  - [ ] Profile image visible in both modes
  - [ ] Marquee visible in light mode

  **QA Scenarios**:

  ```
  Scenario: About section — bio and stats readable
    Tool: Playwright
    Preconditions: Light mode active
    Steps:
      1. Scroll to #about section
      2. Assert: Bio text contains "backend systems" NOT "AI-powered automation"
      3. Assert: Three stat cards visible with numbers and context labels
      4. Assert: Profile image loaded and visible
      5. Take screenshot of about section
    Expected Result: Clean about section with original bio (not hero clone), readable stats
    Failure Indicators: Hero tagline repeated verbatim, blurry profile image, stats without labels
    Evidence: .sisyphus/evidence/task-7-about.png
  ```

  **Evidence to Capture**:
  - [ ] task-7-about.png — About section screenshot (light mode)

  **Commit**: YES
  - Message: `refactor(about): tighten bio, update stats, improve layout`
  - Files: `components/sections/about.tsx`

- [x] 8. **Tighten Experience Section — Remove Inflated Language**

  **What to do**:
  - Remove inflated action verbs (already done in Task 3 data layer — this task verifies rendering)
  - Replace `text-white/55` on bullet points → use `text-muted` token (≥4.5:1)
  - Replace `text-white/40` on company/location → use `text-muted` token
  - Technology pills: Use `pill-proficient` styling for all (neutral, not claiming "familiar")
  - Timeline dot: Ensure visible in light mode (currently `border-violet-500`)
  - GSAP timeline line animation: Keep as-is (works regardless of theme)
  - Add brief context line above timeline: `"2.5 years of progressive experience across enterprise, government, and startup environments"`

  **Must NOT do**:
  - Do NOT remove any experience entries
  - Do NOT break the GSAP scroll-triggered timeline line animation
  - Do NOT change the timeline layout structure

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Timeline layout with GSAP animation + theme integration requires visual care
  - **Skills**: []
    - GSAP animation is already built — only theme classes need updating
  - **Skills Evaluated but Omitted**:
    - None applicable

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 6, 7, 9, 10)
  - **Blocks**: None downstream
  - **Blocked By**: Task 3

  **References**:
  - `components/sections/experience.tsx:1-101` — Full experience component
  - `data/experience.ts` — Already updated data from Task 3
  - **WHY**: Experience section text contrast fails WCAG AA; needs theme token pass

  **Acceptance Criteria**:
  - [ ] All bullet text ≥4.5:1 contrast in both modes
  - [ ] No inflated verbs in rendered output (verified in UI, not just data)
  - [ ] Timeline line animation still works
  - [ ] Technology pills readable in light mode
  - [ ] Timeline dots visible in both modes

  **QA Scenarios**:

  ```
  Scenario: Experience timeline — readable and themed
    Tool: Playwright
    Preconditions: Light mode active
    Steps:
      1. Scroll to #experience section
      2. Assert: Timeline line renders (GSAP animation triggered on scroll)
      3. Assert: All bullet text visible (not too light)
      4. Assert: Technology pills visible and readable
      5. Assert: No "Architected" or "Orchestrated" in rendered text
      6. Take screenshot
    Expected Result: Clean timeline with readable text, visible pills, no inflated words
    Evidence: .sisyphus/evidence/task-8-experience.png
  ```

  **Evidence to Capture**:
  - [ ] task-8-experience.png — Experience section screenshot

  **Commit**: YES
  - Message: `refactor(experience): remove inflated language, fix contrast`
  - Files: `components/sections/experience.tsx`

- [x] 9. **Redesign Projects Section — Screenshots, Tighten Copy**

  **What to do**:
  - **Vendor Invoice Processor card**: Add screenshot from `/Priyanshu_Profile_For_Research/images_2026-05-04_20-31-04/` (Index Page or OCR Website thumbnail)
  - **ResumeX card**: Add screenshot or live site thumbnail
  - Update subtitles (already done in Task 3 — "Intelligent Invoice Processing Pipeline", "ATS-Optimized Resume Builder")
  - Replace `text-white/50`, `text-white/45`, `text-white/40` → theme tokens
  - Add subtle image treatment: rounded top, slight shadow, 60% height of card
  - Ensure "View Source" links are visible in both modes
  - Update "Additional projects" grid: keep 4 cards but ensure `glass-card` works in light mode
  - Flick project: highlight UX research methodology, not "AI-powered editing"

  **Must NOT do**:
  - Do NOT remove any projects from the grid
  - Do NOT use external images (only assets from public/ or data/)
  - Do NOT change card layout structure (Bento-style grid is effective)

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Image integration, card layout, and visual hierarchy for the most important portfolio section
  - **Skills**: []
    - Image placement and card styling — straightforward with guidelines
  - **Skills Evaluated but Omitted**:
    - `frontend-ui-ux`: Card patterns already established; just theme adaptation needed

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 6, 7, 8, 10)
  - **Blocks**: None downstream
  - **Blocked By**: Tasks 1, 3

  **References**:
  - `components/sections/projects.tsx:1-136` — Full projects section
  - `data/projects.ts` — Updated project data from Task 3
  - `Priyanshu_Profile_For_Research/images_2026-05-04_20-31-04/` — Available screenshot assets
  - **WHY**: Projects are the strongest proof of competence; adding visuals dramatically increases credibility

  **Acceptance Criteria**:
  - [ ] At least 2 project screenshots visible
  - [ ] Images render correctly at all breakpoints
  - [ ] Card text readable in both modes
  - [ ] "View Source" links functional
  - [ ] No "AI-Powered" in any project subtitle (replaced with neutral descriptors)
  - [ ] Additional projects grid renders 4 cards with readable text

  **QA Scenarios**:

  ```
  Scenario: Project cards with images — light mode
    Tool: Playwright
    Preconditions: Light mode, images copied to public/
    Steps:
      1. Scroll to #projects section
      2. Assert: At least 2 project cards have visible images
      3. Assert: Project subtitles do NOT contain "AI-Powered"
      4. Assert: "View Source" links visible and clickable
      5. Take screenshot
    Expected Result: Rich project cards with screenshots, clean copy
    Evidence: .sisyphus/evidence/task-9-projects.png
  ```

  **Evidence to Capture**:
  - [ ] task-9-projects.png — Projects section screenshot

  **Commit**: YES
  - Message: `feat(projects): add screenshots, tighten copy, improve cards`
  - Files: `components/sections/projects.tsx`, `public/` (new image assets)

- [x] 10. **Update SectionHeading — Replace Sci-Fi Subtitles**

  **What to do**:
  - Replace all section subtitles in their respective components (SectionHeading `subtitle` prop):
    - About: `"mission briefing"` → `"Who I am"`
    - Experience: `"ship's log"` → `"Where I've worked"`
    - Projects: `"artifact archive"` → `"What I've built"`
    - Education: `"academic foundation"` → `"My education"`
    - Honors: `"recognition"` → `"Awards & honors"` (already close, just refine)
    - Testimonials: `"communications log"` → `"What others say"`
    - Skills: `"engineering bay"` → `"Technologies I use"`
    - Resume: `"data core"` → `"Full resume"`
  - Each subtitle change is a single string replacement in the respective section component
  - Verify no sci-fi subtitle text remains anywhere in the codebase (`grep -r "mission briefing\|ship's log\|artifact archive\|communications log\|engineering bay\|data core" components/`)

  **Must NOT do**:
  - Do NOT change the SectionHeading component itself — just the subtitle strings
  - Do NOT change section title text (only subtitle)
  - Do NOT add subtitles to sections that don't have them

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: 8 string replacements across 8 files — purely mechanical
  - **Skills**: []
    - String replacement only
  - **Skills Evaluated but Omitted**:
    - None applicable

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 6, 7, 8, 9)
  - **Blocks**: None downstream
  - **Blocked By**: Task 4

  **References**:
  - `components/sections/about.tsx:18` — `subtitle="mission briefing"`
  - `components/sections/experience.tsx:38` — `subtitle="ship's log"`
  - `components/sections/projects.tsx:80` — `subtitle="artifact archive"`
  - `components/sections/education.tsx:12` — `subtitle="academic foundation"`
  - `components/sections/honors.tsx:39` — `subtitle="recognition"`
  - `components/sections/testimonials.tsx:15` — `subtitle="communications log"`
  - `components/sections/skills.tsx:21` — `subtitle="engineering bay"`
  - `components/sections/resume-viewer.tsx:17` — `subtitle="data core"`
  - **WHY**: These are the exact lines to change in each file

  **Acceptance Criteria**:
  - [ ] Zero sci-fi subtitles in any component
  - [ ] All subtitles use factual, descriptive labels
  - [ ] `tsc --noEmit` passes
  - [ ] SectionHeading component still works (no broken props)

  **QA Scenarios**:

  ```
  Scenario: All subtitles updated to factual labels
    Tool: Playwright
    Preconditions: All section components updated
    Steps:
      1. Navigate to http://localhost:3000
      2. Scroll through each section
      3. Assert: About subtitle is "Who I am" (not "mission briefing")
      4. Assert: Experience subtitle is "Where I've worked" (not "ship's log")
      5. Assert: No sci-fi subtitle visible anywhere on page
      6. Take screenshots of 2-3 sections
    Expected Result: Clean, factual subtitles throughout
    Failure Indicators: Any sci-fi subtitle still visible
    Evidence: .sisyphus/evidence/task-10-subtitles.png
  ```

  **Evidence to Capture**:
  - [ ] task-10-subtitles.png — Section screenshots showing new subtitles

  **Commit**: YES
  - Message: `refactor(section-heading): replace sci-fi subtitles with factual labels`
  - Files: `components/sections/about.tsx`, `experience.tsx`, `projects.tsx`, `education.tsx`, `honors.tsx`, `testimonials.tsx`, `skills.tsx`, `resume-viewer.tsx`

- [x] 11. **Merge Honors into Education + Add Honors to Nav**

  **What to do**:
  - Move the 2 remaining honor cards (Dean's Honour List, First-Class Standing) into the Education section as compact badges/cards below the main education panel
  - Remove the standalone Honors section component (delete `components/sections/honors.tsx`)
  - Remove the `<Honors />` import and render from `app/page.tsx`
  - Add `{ label: "Honors", href: "#honors" }` to NAV_ITEMS in constants (already done in Task 4) — keep the `#honors` anchor on the education section or add it as an ID
  - Update Education section to include an `id="honors"` anchor point (or add a wrapper div with that ID)
  - Ensure the GPA card, degree info, and honors badges form a cohesive visual unit
  - Use existing `honors` data but render inline (not as separate cards with tier system)
  - Simplify honor badges to match education styling (amber badges for honors, purple for coursework)

  **Must NOT do**:
  - Do NOT lose any honor data — Dean's List and First-Class Standing must still appear
  - Do NOT remove Education section
  - Do NOT break the `#education` nav link

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Component merge with clear copy-paste + inline restructuring
  - **Skills**: []
    - React component merge — straightforward

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 12, 13, 14, 15)
  - **Blocks**: Task 19 (accessibility pass verifies nav)
  - **Blocked By**: Task 3 (data updated)

  **References**:
  - `components/sections/honors.tsx` — Component to inline into education
  - `components/sections/education.tsx:1-84` — Target component for merge
  - `app/page.tsx:12` — Honors import line to remove
  - `app/page.tsx:30` — `<Honors />` render to remove
  - `data/honors.ts` — Honor data (already de-duplicated from Task 3)
  - **WHY**: Honors was a 3-card section duplicating Education content; merging reduces scroll length and repetition

  **Acceptance Criteria**:
  - [ ] Dean's Honour List and First-Class Standing visible in Education section
  - [ ] `components/sections/honors.tsx` deleted
  - [ ] `<Honors />` removed from `app/page.tsx`
  - [ ] `#honors` nav link scrolls to education section (or anchor within it)
  - [ ] `tsc --noEmit` passes
  - [ ] No empty space where Honors section used to be
  - [ ] Page has 9 sections (down from 10) but 10 nav items (Education + Honors anchor)

  **QA Scenarios**:

  ```
  Scenario: Honors merged into education
    Tool: Playwright
    Preconditions: Education section updated
    Steps:
      1. Scroll to #education section
      2. Assert: Dean's Honour List badge/card visible
      3. Assert: First-Class Standing badge/card visible
      4. Click "Honors" in nav
      5. Assert: Page scrolls to education/honors area
      6. Take screenshot
    Expected Result: Honors content integrated into education, no standalone honors section
    Failure Indicators: Missing honor data, broken nav link, empty space on page
    Evidence: .sisyphus/evidence/task-11-education-honors.png
  ```

  **Evidence to Capture**:
  - [ ] task-11-education-honors.png — Education section with honors content

  **Commit**: YES
  - Message: `refactor(education): merge honors, add to nav`
  - Files: `components/sections/education.tsx`, `components/sections/honors.tsx` (delete), `app/page.tsx`

- [x] 12. **Tighten Testimonials — Fix Truncation, Balance Superlatives**

  **What to do**:
  - Fix truncation bug: Remove `slice(0, 200)` — show full text with proper ellipsis OR show all text (no truncation)
  - If keeping truncation: use CSS `line-clamp-4` instead of JS slice (prevents mid-word cuts)
  - Reduce featured testimonial from "4.94 / 5.00 — Highly Effective" to show only the rating number + context
  - Combine the two Stokes IT Manager testimonials OR add a note they're from different review periods
  - Add subtle "2024 Review" / "2025 Review" labels to differentiate the two Stokes testimonials
  - Replace `text-white/70`, `text-white/55`, `text-white/35` → theme tokens
  - Ensure star ratings visible in light mode
  - Ensure testimonial cards render correctly in light mode (`glass-card` light variant)

  **Must NOT do**:
  - Do NOT remove any testimonials
  - Do NOT change quote text — only fix truncation and labeling
  - Do NOT remove star ratings

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Bug fix + labeling + contrast pass — all surface-level
  - **Skills**: []
    - Simple fixes with clear instructions

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 11, 13, 14, 15)
  - **Blocks**: None downstream
  - **Blocked By**: Task 3

  **References**:
  - `components/sections/testimonials.tsx:70` — The truncation bug: `slice(0, 200)` to fix
  - `data/testimonials.ts:12-39` — Testimonial data with ratings
  - `app/globals.css:186-192` — glass-card hover styles to verify in light mode
  - **WHY**: Truncation cuts off text mid-word; this is a visible content bug

  **Acceptance Criteria**:
  - [ ] No mid-word text truncation on any testimonial
  - [ ] Two Stokes testimonials differentiated (year labels)
  - [ ] All text ≥4.5:1 contrast in both modes
  - [ ] Star ratings visible in light mode
  - [ ] Cards look intentional in light mode (not invisible)

  **QA Scenarios**:

  ```
  Scenario: Testimonials — no truncation, year labels
    Tool: Playwright
    Preconditions: Light mode active
    Steps:
      1. Scroll to #testimonials section
      2. Assert: No testimonial text ends mid-word
      3. Assert: Two Stokes testimonials have distinct year labels
      4. Assert: Star icons visible and colored
      5. Take screenshot
    Expected Result: Complete testimonial text, differentiated review periods
    Evidence: .sisyphus/evidence/task-12-testimonials.png
  ```

  **Evidence to Capture**:
  - [ ] task-12-testimonials.png — Testimonials section screenshot

  **Commit**: YES
  - Message: `fix(testimonials): fix truncation bug, balance quote selection`
  - Files: `components/sections/testimonials.tsx`

- [x] 13. **Streamline Skills — Reduce Expert Count, Improve Visual**

  **What to do**:
  - Remove the massive skills marquee (duplicates the About section marquee) — keep one marquee only
  - Reduce to 6 categories, 30 skills max (remove "VS Code", "OCR / AI Pipelines", "IntelliJ", etc.)
  - Replace `pill-expert`, `pill-proficient`, `pill-familiar` with simplified 2-tier system:
    - `pill-primary`: For core skills (Python, Flask, Azure AI, D365 BC, AL)
    - `pill-secondary`: For all other skills (neutral styling, no proficiency claim)
  - Remove the E/P/F badge system entirely — no self-assessed proficiency labels
  - Update legend to show only 2 tiers
  - Replace `text-white/25` on legend → `text-muted` token (≥4.5:1)
  - Skills grid: 3 columns desktop, 2 tablet, 1 mobile (already done)
  - Ensure pill styling works in light mode (colored bg with sufficient contrast)

  **Must NOT do**:
  - Do NOT remove skill categories — just reduce items within them
  - Do NOT remove the marquee entirely — keep one instance (in About section)
  - Do NOT add back proficiency levels

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Skill grid restructure with 2-tier system + theme integration
  - **Skills**: []
    - Clear grid/pill changes specified

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 11, 12, 14, 15)
  - **Blocks**: None downstream
  - **Blocked By**: Tasks 1, 3

  **References**:
  - `components/sections/skills.tsx:1-75` — Full skills section
  - `data/skills.ts` — Updated skill data from Task 3
  - `app/globals.css:287-322` — Pill styles to simplify (pill-expert/proficient/familiar → pill-primary/secondary)
  - **WHY**: 11 "expert" ratings undermine credibility; simplified visual with 2 tiers is more honest and cleaner

  **Acceptance Criteria**:
  - [ ] No E/P/F proficiency badges
  - [ ] Max 30 skills total across 6 categories
  - [ ] Two-tier pill styling (primary + secondary)
  - [ ] Legend text ≥4.5:1 contrast in both modes
  - [ ] Skills marquee removed from this section (kept in About)
  - [ ] Pills visible and styled correctly in light mode

  **QA Scenarios**:

  ```
  Scenario: Skills section — clean 2-tier system
    Tool: Playwright
    Preconditions: Light mode active
    Steps:
      1. Scroll to #skills section
      2. Assert: No E/P/F badges on any skill pill
      3. Assert: Two visually distinct pill styles (primary accent, secondary neutral)
      4. Assert: Legend labels readable (not text-white/25)
      5. Assert: No marquee in this section
      6. Take screenshot
    Expected Result: Clean skill grid with 2 visual tiers, no proficiency claims
    Evidence: .sisyphus/evidence/task-13-skills.png
  ```

  **Evidence to Capture**:
  - [ ] task-13-skills.png — Skills section screenshot

  **Commit**: YES
  - Message: `refactor(skills): reduce expert count, simplify to 2-tier visual`
  - Files: `components/sections/skills.tsx`, `app/globals.css`

- [x] 14. **Redesign ResumeViewer — Remove Hardcoded Prose, Fix Contrast**

  **What to do**:
  - **Remove hardcoded Professional Summary** (lines 50-58): Replace with a concise summary generated from data or add a `summary` field to SITE_CONFIG
  - Replace prose: `"Full-stack engineer with 2.5 years of experience building enterprise automation, ERP integrations, and AI-powered workflows. Skilled in Python, TypeScript, Azure, and Dynamics 365 Business Central. Recent CS graduate from Brock University (GPA 3.7)."`
  - Fix ALL contrast issues: `text-white/30` → `text-muted`, `text-white/35` → `text-muted`, `text-white/40` → `text-muted`, `text-white/45` → `text-muted` or `text-text` (opacity 0.55 minimum)
  - Increase minimum text size: `text-[0.65rem]` → `text-[0.75rem]`, `text-[0.6rem]` → `text-[0.7rem]`
  - Add `rel="noopener noreferrer"` to LinkedIn/GitHub links (lines 31, 34)
  - Ensure ResumeBlock borders visible in light mode (`border-white/[0.04]` → `border-border`)
  - Keep Download PDF CTA
  - Keep experience, projects, skills, education data-driven rendering

  **Must NOT do**:
  - Do NOT change the ResumeBlock component structure
  - Do NOT remove the Download PDF button
  - Do NOT remove any data-driven sections (experience, projects, skills, education)
  - Do NOT convert to PDF embed

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Dense text section with critical contrast fixes and content rewrite
  - **Skills**: []
    - Text/contrast work with clear specifications

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 11, 12, 13, 15)
  - **Blocks**: Task 19 (accessibility pass)
  - **Blocked By**: Tasks 1, 3

  **References**:
  - `components/sections/resume-viewer.tsx:50-58` — Hardcoded summary to replace
  - `components/sections/resume-viewer.tsx:31,34` — Missing rel attributes
  - `components/sections/resume-viewer.tsx:67,70,88,94,107,108,115,116` — Low-contrast text to fix
  - `lib/constants.ts` — SITE_CONFIG for dynamic summary source
  - **WHY**: This section has the worst contrast on the site (1.9:1 to 3.7:1 across multiple lines)

  **Acceptance Criteria**:
  - [ ] No hardcoded prose — summary from constants or data
  - [ ] All text ≥4.5:1 contrast in both modes
  - [ ] Minimum font size ≥0.7rem (11.2px) throughout
  - [ ] `rel="noopener noreferrer"` on all external links
  - [ ] Section borders visible in light mode
  - [ ] Download PDF button functional

  **QA Scenarios**:

  ```
  Scenario: Resume section — readable in light mode
    Tool: Playwright
    Preconditions: Light mode active
    Steps:
      1. Scroll to #resume section
      2. Assert: Professional summary text visible and readable
      3. Assert: All body text has sufficient contrast (not washed out)
      4. Assert: No text smaller than ~11px
      5. Assert: Download PDF button functional
      6. Take screenshot
    Expected Result: Fully readable resume section with proper contrast
    Failure Indicators: Hardcoded prose still present (contains "deep expertise"), text too small to read
    Evidence: .sisyphus/evidence/task-14-resume.png
  ```

  **Evidence to Capture**:
  - [ ] task-14-resume.png — Resume section screenshot

  **Commit**: YES
  - Message: `refactor(resume): remove hardcoded prose, fix contrast, fix a11y`
  - Files: `components/sections/resume-viewer.tsx`

- [x] 15. **Redesign Contact Section — De-Duplicate CTAs, Tighten Copy**

  **What to do**:
  - Remove "Download Resume" button (already in Hero + Resume sections — 2 places is enough)
  - Remove "LinkedIn" and "GitHub" buttons (already in Hero + Footer — keep email as the primary CTA here)
  - Contact section now has: (1) "Say Hello" email CTA, (2) subtle email display, (3) social link text
  - Or keep a minimal social row: LinkedIn + GitHub as small icon links (not full buttons)
  - Update body text: `"Currently seeking full-time Software Engineer roles in Toronto. Open to on-site, hybrid, or remote. Let's talk."`
  - Update tag: `"> open to work <"` → `"Available now"` (cleaner, less bash-prompt aesthetic)
  - Replace `text-white/40`, `text-white/20` → theme tokens
  - Remove "AI Solutions" from body text (already replaced with "Software Engineer")
  - Ensure gradient divider visible in light mode

  **Must NOT do**:
  - Do NOT remove the email CTA ("Say Hello")
  - Do NOT remove the contact section entirely
  - Do NOT remove social links — just make them less prominent than Hero

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Button removal + string replacement — straightforward
  - **Skills**: []
    - Simple component editing

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 11, 12, 13, 14)
  - **Blocks**: None downstream
  - **Blocked By**: Tasks 3, 4

  **References**:
  - `components/sections/contact.tsx:1-107` — Full contact section
  - `components/sections/contact.tsx:46-48` — Body text to update
  - `components/sections/contact.tsx:27-28` — "open to work" tag to update
  - `components/sections/contact.tsx:66-93` — CTA buttons (remove resume, LinkedIn, GitHub)
  - **WHY**: Contact duplicates Hero CTAs; streamlining makes each section's purpose clearer

  **Acceptance Criteria**:
  - [ ] "Say Hello" email CTA remains
  - [ ] "Download Resume" button removed from contact
  - [ ] Social links present but minimal (small icons, not full buttons)
  - [ ] Body text does NOT mention "AI Solutions"
  - [ ] All text ≥4.5:1 contrast in both modes
  - [ ] Section still looks complete (not empty)

  **QA Scenarios**:

  ```
  Scenario: Contact section — clean, de-duplicated
    Tool: Playwright
    Preconditions: Light mode active
    Steps:
      1. Scroll to #contact section
      2. Assert: "Say Hello" email button visible and clickable
      3. Assert: "Download Resume" button NOT present
      4. Assert: LinkedIn and GitHub present as links (not full CTA buttons)
      5. Assert: Body text mentions "Software Engineer" not "AI Solutions"
      6. Take screenshot
    Expected Result: Focused contact section — email CTA primary, social links secondary
    Evidence: .sisyphus/evidence/task-15-contact.png
  ```

  **Evidence to Capture**:
  - [ ] task-15-contact.png — Contact section screenshot

  **Commit**: YES
  - Message: `refactor(contact): de-duplicate CTAs, tighten copy`
  - Files: `components/sections/contact.tsx`

- [x] 16. **Optimize Preloader — 500ms Max, Reduced-Motion Respect**

  **What to do**:
  - Shorten total animation duration from ~2.2s to max 500ms
  - Reduce entrance delay to 100ms max
  - Remove or shorten the rotating ring animation phase
  - When `prefers-reduced-motion: reduce`: skip preloader entirely (show content immediately)
  - Keep "PV" logo reveal but make it faster
  - Ensure preloader z-index doesn't block content after animation completes
  - Add `aria-hidden="true"` to preloader (it's decorative)
  - Verify preloader doesn't flash in light mode (use theme-aware colors)

  **Must NOT do**:
  - Do NOT remove the preloader entirely
  - Do NOT make it longer than 500ms
  - Do NOT add complex animations — keep it simple

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Duration reduction and reduced-motion check — straightforward
  - **Skills**: []
    - Simple animation timing changes

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 4 (with Tasks 17, 18, 19)
  - **Blocks**: None downstream
  - **Blocked By**: Task 1 (theme tokens for colors)

  **References**:
  - `components/layout/preloader.tsx` — Full preloader component
  - `app/globals.css:63-70` — Existing reduced-motion media query
  - **WHY**: 2.2s preloader is too long for a portfolio; 500ms gives personality without friction

  **Acceptance Criteria**:
  - [ ] Preloader total duration ≤500ms
  - [ ] With `prefers-reduced-motion: reduce`, preloader skipped (content visible immediately)
  - [ ] Preloader doesn't block interaction after completion
  - [ ] Preloader colors work in both themes

  **QA Scenarios**:

  ```
  Scenario: Preloader duration test
    Tool: Playwright
    Preconditions: Fresh page load
    Steps:
      1. Navigate to http://localhost:3000
      2. Measure time until main content is visible
      3. Assert: Content visible within 600ms of navigation start
      4. Assert: No persistent overlay after content loads
    Expected Result: Quick preloader that resolves fast
    Failure Indicators: Content blocked for >1s, preloader never resolves
    Evidence: .sisyphus/evidence/task-16-preloader.txt (timing log)
  ```

  **Evidence to Capture**:
  - [ ] task-16-preloader.txt — Timing measurements

  **Commit**: YES
  - Message: `perf(preloader): optimize to 500ms, respect reduced-motion`
  - Files: `components/layout/preloader.tsx`

- [x] 17. **Optimize CustomCursor — Hide on Touch, Reduce Visual Weight**

  **What to do**:
  - Add touch device detection: hide cursor entirely on touch devices (already `hidden` below `md:` — extend this)
  - Add `@media (pointer: coarse) { display: none; }` as a CSS fallback
  - Reduce cursor ring size from current to smaller (less visually dominant)
  - Reduce cursor ring opacity in light mode (dark ring on light bg)
  - Ensure cursor color adapts to theme (dark cursor in light mode, light cursor in dark mode)
  - Add `will-change: transform` for GPU acceleration
  - Remove or simplify hover-expand behavior (can be distracting)
  - Add `aria-hidden="true"` to cursor elements

  **Must NOT do**:
  - Do NOT remove the custom cursor entirely on desktop
  - Do NOT break the cursor provider context (used by magnetic buttons)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Touch detection + CSS adjustments — simple
  - **Skills**: []
    - Media query and CSS changes

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 4 (with Tasks 16, 18, 19)
  - **Blocks**: None downstream
  - **Blocked By**: None (independent of theme)

  **References**:
  - `components/ui/cursor.tsx` — Full cursor component
  - `components/providers/cursor-provider.tsx` — Cursor context
  - `app/globals.css` — May add `@media (pointer: coarse)` rule
  - **WHY**: Custom cursor on touch devices is non-functional; reducing visual weight improves UX

  **Acceptance Criteria**:
  - [ ] Cursor hidden on touch devices (mobile + tablet)
  - [ ] Cursor visible and functional on desktop (mouse)
  - [ ] Cursor color adapts to theme (dark in light mode, light in dark mode)
  - [ ] Cursor ring less visually dominant
  - [ ] `aria-hidden="true"` on cursor elements

  **QA Scenarios**:

  ```
  Scenario: Cursor hidden on touch, visible on desktop
    Tool: Playwright
    Preconditions: Desktop viewport (1440px)
    Steps:
      1. Assert: Custom cursor elements visible (dot + ring)
      2. Resize viewport to 375px (mobile)
      3. Assert: Custom cursor elements hidden
    Expected Result: Cursor visible only on pointer-fine devices
    Evidence: .sisyphus/evidence/task-17-cursor.png
  ```

  **Evidence to Capture**:
  - [ ] task-17-cursor.png — Desktop view showing cursor (or mobile showing hidden)

  **Commit**: YES
  - Message: `fix(cursor): hide on touch devices, reduce visual weight`
  - Files: `components/ui/cursor.tsx`, `app/globals.css`

- [x] 18. **Redesign Footer — Add Back-to-Top, Improve Contrast**

  **What to do**:
  - Replace `text-white/20` on copyright → `text-muted` token (≥4.5:1)
  - Replace `text-white/20` on social icons → `text-muted` token with hover accent
  - Add a "Back to top" link/button (smooth scroll to `#hero`)
  - Add a subtle top border that's visible in both modes
  - Keep copyright: `"© 2026 Priyanshu Vora · Toronto, ON"`
  - Keep LinkedIn + GitHub icon links
  - Layout: `[Copyright] [Back to top] [Social icons]` on one row (desktop), stacked on mobile

  **Must NOT do**:
  - Do NOT add a sitemap or footer nav — keep it minimal
  - Do NOT make the footer tall or visually heavy

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Contrast fix + one new element — simple
  - **Skills**: []
    - Button + text style changes

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 4 (with Tasks 16, 17, 19)
  - **Blocks**: None downstream
  - **Blocked By**: Task 1 (theme tokens)

  **References**:
  - `components/layout/footer.tsx:1-37` — Full footer component
  - `components/layout/footer.tsx:10,19,22` — Low-contrast text to fix
  - **WHY**: Footer text at `text-white/20` is the lowest contrast on the entire site

  **Acceptance Criteria**:
  - [ ] Footer text ≥4.5:1 contrast in both modes
  - [ ] "Back to top" button functional (smooth scrolls to hero)
  - [ ] Social icons visible in both modes
  - [ ] Footer border visible in light mode
  - [ ] Responsive layout (row on desktop, stack on mobile)

  **QA Scenarios**:

  ```
  Scenario: Footer — readable, back-to-top works
    Tool: Playwright
    Preconditions: Scrolled to bottom
    Steps:
      1. Scroll to page bottom
      2. Assert: Copyright text readable (not text-white/20)
      3. Assert: Social icons visible
      4. Click "Back to top"
      5. Assert: Page scrolls to hero section
      6. Take screenshot
    Expected Result: Readable footer with functional back-to-top
    Evidence: .sisyphus/evidence/task-18-footer.png
  ```

  **Evidence to Capture**:
  - [ ] task-18-footer.png — Footer screenshot

  **Commit**: YES
  - Message: `refactor(footer): add back-to-top, improve contrast`
  - Files: `components/layout/footer.tsx`

- [x] 19. **Accessibility Pass — ARIA Labels, Focus Traps, Rel Attributes**

  **What to do**:
  - Add `rel="noopener noreferrer"` to LinkedIn/GitHub links in `resume-viewer.tsx` (lines 31, 34)
  - Add `aria-current="page"` to active nav link (already done in Task 5 — verify)
  - Add Esc key handler to mobile nav menu (`nav-menu.tsx`) — close overlay on Escape key
  - Add focus trap to mobile nav menu (focus cycles within the overlay)
  - Verify skip-to-content link works (tab to it, press Enter, focus moves to `#main-content`)
  - Add `aria-label="Theme toggle"` or similar to the theme toggle button (Task 1)
  - Verify all images have `alt` text (profile image already has it)
  - Verify all icon-only buttons have `aria-label` (hamburger already has it, theme toggle needs it)
  - Verify `prefers-reduced-motion` media query still covers all animations (verify after GSAP/Motion changes)
  - Run `lsp_diagnostics` on all changed files — fix any a11y warnings
  - Test keyboard navigation: Tab through entire page, verify focus order is logical

  **Must NOT do**:
  - Do NOT add aria-labels where they're unnecessary (don't over-label)
  - Do NOT change semantic HTML structure
  - Do NOT add role attributes that duplicate native semantics

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Mechanical a11y fixes across known locations
  - **Skills**: []
    - aria attributes and event handlers — well-documented

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 4 (with Tasks 16, 17, 18)
  - **Blocks**: None downstream (final task before verification)
  - **Blocked By**: Tasks 5, 11, 14 (need their features in place to verify)

  **References**:
  - `components/sections/resume-viewer.tsx:31,34` — Missing rel attributes
  - `components/layout/nav-menu.tsx` — Add Esc handler + focus trap
  - `components/layout/header.tsx` — Theme toggle aria-label (from Task 1)
  - `app/layout.tsx:96-98` — Skip-to-content link
  - `app/globals.css:63-70` — Reduced motion media query
  - **WHY**: Keyboard accessibility, screen reader support, and link security are baseline expectations

  **Acceptance Criteria**:
  - [ ] All external links have `rel="noopener noreferrer"`
  - [ ] Esc key closes mobile nav menu
  - [ ] Tab focus cycles within mobile menu (doesn't escape to background)
  - [ ] Skip-to-content works (Tab → Enter → focus on main)
  - [ ] Theme toggle has `aria-label`
  - [ ] `tsc --noEmit` + `npm run lint` pass
  - [ ] Keyboard navigation reaches all interactive elements

  **QA Scenarios**:

  ```
  Scenario: Keyboard navigation — skip link, focus order
    Tool: Playwright
    Preconditions: Page loaded, preloader finished
    Steps:
      1. Press Tab
      2. Assert: "Skip to content" link focused and visible
      3. Press Enter
      4. Assert: Focus moved to main content
      5. Press Tab repeatedly through page
      6. Assert: All nav items, buttons, links reachable via keyboard
      7. Assert: Focus ring visible on each focused element
    Expected Result: Full keyboard accessibility
    Failure Indicators: Focus lost, elements unreachable, no focus indicators
    Evidence: .sisyphus/evidence/task-19-keyboard-nav.png

  Scenario: Mobile menu — Esc key closes
    Tool: Playwright
    Preconditions: Mobile viewport (375px)
    Steps:
      1. Click hamburger menu button
      2. Assert: Mobile nav overlay visible
      3. Press Escape key
      4. Assert: Mobile nav overlay closed
    Expected Result: Esc key dismisses mobile menu
    Evidence: .sisyphus/evidence/task-19-esc-close.png
  ```

  **Evidence to Capture**:
  - [ ] task-19-keyboard-nav.png — Focus ring visible on element
  - [ ] task-19-esc-close.png — Mobile menu before/after Esc

  **Commit**: YES
  - Message: `fix(a11y): aria labels, focus traps, rel attributes, keyboard nav`
  - Files: `components/layout/nav-menu.tsx`, `components/sections/resume-viewer.tsx`, `components/layout/header.tsx`

---

## Final Verification Wave

- [x] F1. **Plan Compliance Audit** — `oracle`
  Read the plan end-to-end. For each "Must Have": verify implementation exists. For each "Must NOT Have": search codebase for forbidden patterns. Check evidence files exist in `.sisyphus/evidence/`. Compare deliverables against plan.
  Output: `Must Have [N/N] | Must NOT Have [N/N] | Tasks [N/N] | VERDICT: APPROVE/REJECT`

- [x] F2. **Build + Type Check + Visual Regression** — `quick`
  Run `tsc --noEmit`, `npm run build`, `npm run screenshots:compare`. Verify zero type errors, successful build, no visual regressions vs baseline.
  Output: `TypeScript [PASS/FAIL] | Build [PASS/FAIL] | Visual [PASS/FAIL] | VERDICT`

- [x] F3. **Cross-Browser QA** — `unspecified-high` (+ `playwright` skill)
  Execute EVERY QA scenario from EVERY task via Playwright. Test light AND dark modes. Test at 375px, 768px, 1024px, 1440px. Verify all contrast ratios pass. Save evidence to `.sisyphus/evidence/final-qa/`.
  Output: `Scenarios [N/N pass] | Responsive [N breakpoints] | Contrast [PASS/FAIL] | VERDICT`

- [x] F4. **Scope Fidelity Check** — `deep`
  For each task: read "What to do", read git diff. Verify 1:1 implementation — no missing, no creep. Check "Must NOT do" compliance. Flag unaccounted changes.
  Output: `Tasks [N/N compliant] | Contamination [CLEAN/N issues] | Unaccounted [CLEAN/N files] | VERDICT`

---

## Commit Strategy

- **W1-T1**: `feat(theme): add light/dark theme system with CSS tokens`
- **W1-T2**: `chore(cleanup): remove 6 dead components and unused CSS`
- **W1-T3**: `refactor(data): de-duplicate content, fix skill levels, update copy`
- **W1-T4**: `refactor(constants): update title, nav items, section IDs`
- **W1-T5**: `feat(nav): wire useSectionInView for scroll spy active states`
- **W2-T6**: `refactor(hero): redesign with new title, tagline, layout`
- **W2-T7**: `refactor(about): tighten bio, update stats, improve layout`
- **W2-T8**: `refactor(experience): remove inflated language, preserve metrics`
- **W2-T9**: `feat(projects): add screenshots, tighten copy, improve cards`
- **W2-T10**: `refactor(section-heading): replace sci-fi subtitles with factual labels`
- **W3-T11**: `refactor(education): merge honors, add to nav`
- **W3-T12**: `fix(testimonials): fix truncation bug, balance quote selection`
- **W3-T13**: `refactor(skills): reduce expert count, improve visual hierarchy`
- **W3-T14**: `refactor(resume): remove hardcoded prose, fix contrast`
- **W3-T15**: `refactor(contact): de-duplicate CTAs, tighten copy`
- **W4-T16**: `perf(preloader): optimize to 500ms, respect reduced-motion`
- **W4-T17**: `fix(cursor): hide on touch devices, reduce visual weight`
- **W4-T18**: `refactor(footer): add back-to-top, improve contrast`
- **W4-T19**: `fix(a11y): aria labels, focus traps, rel attributes`

---

## Success Criteria

### Verification Commands
```bash
npm run build              # Expected: ✓ Compiled successfully
tsc --noEmit              # Expected: zero errors
npm run screenshots:compare  # Expected: PASS (or approved diffs)
```

### Final Checklist
- [ ] All "Must Have" present
- [ ] All "Must NOT Have" absent
- [ ] Build succeeds
- [ ] Zero TypeScript errors
- [ ] Light mode passes WCAG AA (4.5:1 minimum)
- [ ] Dark mode passes WCAG AA (4.5:1 minimum)
- [ ] Scroll spy active in header
- [ ] Zero sci-fi subtitles
- [ ] Zero dead components
- [ ] Preloader ≤500ms
- [ ] All 10 sections reachable via nav
- [ ] Zero repeated claims across sections
