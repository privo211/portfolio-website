# DESIGN.md — Priyanshu Vora Portfolio

> Project Hail Mary inspired holographic sci-fi personal portfolio for an AI Solutions Developer.

---

## 1. Color

| Token | Hex | Usage |
|-------|-----|-------|
| Void Black | `#06060A` | Page background, deepest layer |
| Space Dark | `#0D0D14` | Card backgrounds, elevated surfaces |
| Panel Gray | `#161622` | Subtle borders, secondary surfaces |
| Nebula Violet | `#7C3AED` | Primary accent — buttons, links, active states, highlights |
| Cyan Glow | `#22D3EE` | Secondary accent — hover states, decorative, code elements |
| Bright Violet | `#A78BFA` | Prominent highlights, hero text glow |
| White | `#F5F5F5` | Primary text |
| Muted Gray | `#A1A1AA` | Secondary text, descriptions |
| Dim Gray | `rgba(255,255,255,0.5)` | Tertiary text, muted elements |
| Ghost | `rgba(255,255,255,0.06)` | Subtle borders, dividers |
| Success Green | `#10B981` | Availability indicator, success states |
| Amber Gold | `#F59E0B` | Honors, awards, star ratings |

### Gradient Rules
- Violet-to-cyan gradient ONLY for section dividers and decorative accents
- NEVER use rainbow or multi-stop gradients
- All backgrounds are solid or a single radial glow at low opacity (<10%)

---

## 2. Typography

| Role | Font | Weights | Usage |
|------|------|---------|-------|
| Display | Syne | 700, 800 | Hero name, section headings, large stats |
| Body | Space Grotesk | 400, 500, 600 | Paragraphs, navigation, cards, buttons |
| Mono | JetBrains Mono | 400, 500 | Code, terminal, tech tags, metrics, dates |

### Type Scale
| Level | Size | Line Height | Letter Spacing |
|-------|------|-------------|----------------|
| Hero Name | `clamp(3rem, 10vw, 9rem)` | 0.9 | -0.03em |
| Section Heading | `clamp(2.5rem, 5vw, 6rem)` | 1.1 | -0.02em |
| Card Title | `1.5rem - 2rem` | 1.2 | 0 |
| Body Large | `1.125rem - 1.25rem` | 1.8 | 0 |
| Body | `1rem - 1.125rem` | 1.7 | 0 |
| Small/Meta | `0.75rem - 0.875rem` | 1.5 | 0.02em |
| Mono Labels | `0.75rem - 0.875rem` | 1.5 | 0.05em |

---

## 3. Spacing

| Name | Value | Usage |
|------|-------|-------|
| section-y | `py-28 md:py-36 lg:py-44` | Every major section's vertical padding |
| section-x | `px-6 md:px-12 lg:px-20` | Section horizontal padding |
| content-max | `max-w-7xl` | Primary content container (1280px) |
| card-padding | `p-8 md:p-10` | Standard card interior |
| card-gap | `gap-6 md:gap-8` | Between cards in a grid |
| section-gap | `mt-16 md:mt-24` | Between sub-sections within a section |

---

## 4. Layout

### Section Architecture
```
Preloader → Hero (min-h-screen) → About (py-28) → Experience (py-28) →
Projects (py-28) → Education (py-28) → Honors (py-28) →
Testimonials (py-28) → Skills (py-28) → Resume Viewer (py-28) → Contact (py-32)
```

### Grid System
- **Full width**: Section headings, marquees, dividers
- **2-column**: Featured projects, about section (desktop)
- **3-column**: Stat cards, honors cards, skill categories (desktop)
- **4-column**: Compact project cards, tech tags

### Section Identity (Project Hail Mary Theme)
Each section represents a different "station" on a spacecraft:
- **Hero** = Observatory Dome (expansive, cosmic, the view outside)
- **About** = Mission Briefing (personal + mission statement)
- **Experience** = Ship's Log (chronological, data-driven)
- **Projects** = Artifact Archive (projected holograms of work)
- **Education** = Crew Manifest (credentials, stats)
- **Honors** = Achievement Display (badges, medals)
- **Testimonials** = Communications Log (received transmissions)
- **Skills** = Engineering Bay (tools, capabilities)
- **Resume** = Data Core (full document)
- **Contact** = Communications Terminal (outgoing transmission)

---

## 5. Components

### Cards
- `rounded-2xl` or `rounded-[2rem]` for featured cards
- `bg-[#0D0D14]/80 backdrop-blur-sm` for glass morphism effect
- `border border-white/[0.05]` for subtle edge definition
- On hover: border transitions to `border-violet-500/25` with subtle glow shadow
- Scan lines overlay at 2-3% opacity inside cards
- Shimmer animation on hover (gradient light sweep across the card surface)

### Buttons
- `rounded-full` pill shape
- Primary (filled): `bg-violet-600 text-white shadow-[0_0_40px_rgba(139,92,246,0.3)]`
- Secondary (outlined): `border border-white/[0.08] text-white hover:border-violet-500/40`
- Magnetic hover effect (spring physics on mouse proximity)
- Icon + text layout with 8px gap

### Terminal Blocks
- macOS-style traffic light dots (red, yellow, green) in header bar
- Mono font throughout the content
- `bg-[#0A0A0F]/90 backdrop-blur-md` background
- Violet/cyan syntax highlighting for code-like content
- Blinking cursor on interactive elements

### Section Headings
- Subtitle: `font-mono text-sm text-violet-400` with `> ` prefix in cyan
- Title: SplitText animation (words slide up on scroll trigger)
- Display font, bold, large responsive size

### Tags / Pills
- Skill tags: rounded-full, color-coded by proficiency tier
- Expert: `bg-violet-500/15 border-violet-500/40 text-violet-200`
- Proficient: `bg-cyan-500/10 border-cyan-500/25 text-cyan-200`
- Familiar: `bg-white/[0.03] border-white/[0.08] text-white/50`

---

## 6. Motion

### Principles
- Every motion must have meaning — never animate just because you can
- One entrance animation per section (staggered children allowed)
- Reduce all motion for `prefers-reduced-motion: reduce`
- Duration range: 0.3s–1.2s depending on element importance

### Key Animations
| Animation | Trigger | Duration | Easing |
|-----------|---------|----------|--------|
| SplitText reveal | Scroll into view (85%) | 1s | power4.out |
| Section fade-up | Scroll into view | 0.6–0.8s | ease-out |
| Card stagger reveal | Parent scroll trigger | 0.5s each + 0.1s stagger | ease-out |
| Preloader → page | On load complete | 0.6s | expo out |
| Button magnetic hover | Mouse proximity | spring | 300 stiffness |
| Custom cursor lerp | Mouse move | 0.15s (dot), 0.35s (ring) | power2.out |
| Timeline line draw | Scroll scrub | scroll-linked | none (scrub) |
| Holographic shimmer | On hover | 8s loop | ease-in-out |
| Star field drift | Always | 60s loop | linear |

### Anti-Animation Rules
- NO auto-rotating carousels
- NO parallax that fights native scroll
- NO background videos
- NO scroll-jacking
- NO animations that block content from being read first

---

## 7. Voice

### Tone
- Professional, technically confident, direct
- First person, active voice
- Lead with results and metrics — not adjectives
- No filler phrases ("passionate about", "love coding", "dedicated to")

### Messaging
- Hero: "I build AI-powered automation that eliminates operational bottlenecks and creates measurable impact."
- About: Focus on what was BUILT and the IMPACT — not on personal traits
- Contact: Direct hiring language — "Seeking Software Developer & AI Solutions roles in Toronto"
- Status: "Available for Full-Time" with green indicator

### Numbers to Prominently Feature
- 90% faster invoice processing
- 30+ ERP extensions shipped
- 200+ invoices automated daily
- 250+ hours of manual work saved
- GPA 3.7, First-Class Standing, Dean's List
- 4.94/5.00 performance review rating

---

## 8. Brand

### Personal Brand Positioning
- **Role**: AI Solutions Developer
- **Location**: Toronto, ON, Canada
- **Differentiator**: Rare combination of ERP expertise (AL/Business Central) + AI engineering (Azure AI/Python) + Full-stack development (Next.js/TypeScript)
- **Target Audience**: Recruiters and hiring managers for entry-level Software Developer, AI Solutions, and Automation Engineering roles
- **Status**: Recent graduate (Dec 2025), actively seeking full-time employment

### Key Signals to Recruiters
- Resume download CTA in Hero section (above the fold)
- LinkedIn + GitHub links in Hero and Header
- Availability status indicator (green pulsing dot)
- Quantified impact metrics in every project and experience entry
- Performance review quotes from current employer
- Education with GPA and honors prominently displayed

---

## 9. Anti-Patterns

### NEVER use:
- Rainbow or multi-stop gradients
- Floating/animated social media icon bars
- "Progress bars" for skill proficiency (use tier tags instead)
- Auto-rotating carousels or sliders
- Dark/light mode toggle (the site IS dark — it's space)
- More than 3 distinct visual effects in any single section
- Text shadows on body text
- `<br>` tags for spacing (use margin/padding)
- Placeholder lorem ipsum (use real content always)
- Stock photography (use personal images only)

### ALWAYS:
- Use real, verified content from resume/LinkedIn/performance reviews
- Include quantified metrics wherever possible
- Show resume download above the fold
- Make LinkedIn and GitHub accessible in one click
- Use semantic HTML (sections, headings, blockquotes)
- Ensure all images have alt text
- Support keyboard navigation
- Test at 375px, 768px, 1440px viewports
