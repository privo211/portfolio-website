# Draft: AI Systems Engineer Portfolio Redesign

## Requirements (confirmed)

- **Primary Identity**: AI Systems Engineer (applied AI + orchestration + automation + deployment)
- **Secondary Identity**: Forward-Deployed Problem Solver
- **Tertiary Identity**: Technical Generalist with Production Depth
- **Visual Target**: Premium, calm, intentional — Linear/Vercel/Anthropic aesthetic
- **Tone**: Calm, intelligent, concise, operational, systems-oriented, credible
- **Not**: Cyberpunk, neon, generic AI startup, student portfolio, template

## Visual Direction

- Warm neutrals + subtle AI-blue accents
- Muted gradients (not pure black)
- "Infrastructural" motion — subtle workflow animations, not flashy
- Typography: Refined, calm, capable
- Color inspiration: Linear, Vercel, Anthropic

## Section Structure (proposed)

### Hero (Section 1)
- Name (large, elegant, not oversized)
- Primary headline replacing "Junior AI Engineer & Forward Deployed Engineer"
- Supporting copy about AI systems, operational workflows, deployment
- CTA hierarchy: View Work (primary) → Download Resume (secondary) → Contact (tertiary)
- Right side: Animated systems diagram / orchestration flow (subtle, minimal)
- Remove floating paragraph

### About (Section 2)
- Replace 3-column marketing blocks with single narrative
- Part 1: Who you are
- Part 2: How you operate
- Part 3: What you've impacted
- Part 4: What kind of problems excite you
- Key themes: operational bottlenecks, systems thinking, embedded collaboration, production environments

### Experience (Section 3)
- Keep metrics (87%, 200+, 250+ hours, 94%) — STRONGEST section
- Add hierarchy: mission statement → impact metrics → key initiatives → technologies
- Add visual impact indicators
- Add system diagrams (OCR pipeline, automation flow, reconciliation)
- Reduce text density
- Each role: 3 strongest bullets + expandable "More Details"

### Projects (Section 4)
- Each project: Problem → System → Constraints → Outcome → Stack
- ADD "Engineering Decisions" section (critical for recruiter perception)
- Add architecture diagrams for DocFlow (pipeline), ResumeX (architecture)
- Increase perceived technical depth

### Skills (Section 5)
- Replace keyword taxonomy with "Capability Areas":
  - AI Systems & Orchestration
  - Enterprise & Operational Systems
  - Full-Stack Engineering
  - Infrastructure & Deployment
- Minimal, elegant technical tags

### Education (Section 6)
- Compress to single elegant card
- Degree, first-class standing, GPA, dean's list only
- Significantly reduce prominence

### Testimonials (Section 7)
- Keep them — extremely valuable
- Reduce verbosity, highlight strongest sentences
- Add visual credibility (logos, role badges)
- Extract high-signal phrases

### Final CTA (Section 8)
- Replace "LET'S WORK" with intentional positioning statement
- Example: "Building systems that turn operational complexity into scalable automation"
- Contact, resume, LinkedIn, GitHub

## Copywriting Rules

**Preferred vocabulary**: systems, workflows, orchestration, deployment, operations, automation, integrations, infrastructure, operational impact, production, ambiguity, scalable, reliability

**Avoid**: passionate, visionary, innovative, cutting-edge, revolutionary, guru, ninja, caffeinated, AI enthusiast

## Brand Rules

**Positioning Goal**: "high-agency engineer capable of embedding into operational environments and building deployable AI-powered systems that improve how organizations work"

**Not**: "recent graduate interested in AI"

## Recruiter Takeaway

> "He feels unusually mature operationally for his experience level."

## Success Metrics

- Technical depth perception
- Operational maturity perception
- Execution capability perception
- Systems thinking perception
- Startup readiness perception
- Production credibility perception
- Calm confidence (without claiming seniority)

## Design Research Findings

### UI/UX Pro Max (Design System)
- **Recommended Style**: Liquid Glass (flowing glass, morphing, smooth transitions) — but this is TOO FLASHY. User wants calm/premium/infrastructure aesthetic.
- **Recommended Typography**: Premium Sans (Satoshi/General Sans from Fontshare, DM Sans as Google alternative). Current: Space Grotesk (close but could upgrade).
- **Recommended Colors (Developer Tool)**: bg #0F172A, primary #1E293B, CTA #22C55E. But user wants "warm neutrals + subtle AI-blue accents" not green.

### Key UX Guidelines
- Respect `prefers-reduced-motion` (HIGH severity)
- Animate only 1-2 key elements per view (not everything)
- Use ease-out for entering, ease-in for exiting (not linear)
- No emojis as icons — use SVG (Heroicons/Lucide)
- Light mode: text contrast 4.5:1 minimum

### Custom Design Direction
Based on user brief (not database recommendations):
- **Colors**: Warm dark grays (#0D1117, #161B22), subtle AI-blue accents (#3B82F6, #6366F1), muted gradients. Like GitHub dark mode but warmer.
- **Typography**: Upgrade from Space Grotesk to Satoshi/General Sans or DM Sans. Clean, modern, premium sans-serif.
- **Motion**: Framer Motion `ease: [0.76, 0, 0.24, 1]` cubic bezier (same as current). Subtle stagger reveals. No flashy parallax.

## Open Questions

- Exact headline wording for Hero
- Whether to keep "AI" in primary title or use "Software Engineer building AI systems"
- Education compression: keep all honors or reduce?
- System diagram implementation approach (Framer Motion? Three.js? CSS animations?)
- Project ordering: DocFlow first (most impressive) or chronological?

## Scope Boundaries

- INCLUDE: All 8 sections redesigned, new copy throughout, motion design, color system, typography
- EXCLUDE: Backend changes, new data entries, new project additions, deployment config
