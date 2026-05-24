# Portfolio Content & UX Overhaul

## TL;DR
> **Quick Summary**: Complete content and UX overhaul of the portfolio — new tagline positioning as AI/Forward Deployed Engineer, em-dash removal across all files, names/location fixes, non-functional button removal, scroll-to-top, clickable project deep-dive cards, merged Work+Projects section, and section reordering for narrative flow.
> 
> **Deliverables**: Updated data files (testimonials, experience, projects, skills, education, honors, constants), rewritten page.tsx with all UX fixes, new scroll-to-top component
> 
> **Estimated Effort**: Large
> **Parallel Execution**: Some data files can be updated in parallel, then page.tsx rewrite

## Context

### User's Requests (verbatim)
1. Remove all em-dashes (—) from all text — replace with commas or alt punctuation
2. Full name "Priyanshu Vora" at top (not just "PRIYANSHU" or "PV")
3. Highlight AI skills, agentic skills — position as Junior AI Engineer AND Forward Deployed Engineer
4. New tagline: sell mindset, skills, potential value — not just OCR/ERP
5. Verify and include ALL missing content from original portfolio (path: /Users/priyanshuvora/Documents/Priyanshu_Portfolio copy/)
6. Section headings must be large and match nav titles exactly (e.g., "Skills" not "What I Bring")
7. Fix profile picture: square aspect ratio displayed as rectangle — needs fixing
8. Project screenshots: run projects locally, take screenshots, add to site
9. Merge Work + Projects into one section
10. Rename Vendor Invoice Processor to something generic/fun for broader audience
11. Remove non-functioning arrow keys/buttons OR make them functional
12. Testimonial names: Peter Gale (IT Manager, Stokes), Novica Kovacevic (MTO)
13. Location: "Ontario, Canada" (not "St. Catharines")
14. Reorder sections to build a narrative that sells
15. Scroll-to-top button at bottom
16. All external links open new tab (target=_blank)
17. Project cards clickable for deep dive, summary shouldn't cut off, + icon should expand skills
18. Research all 3 project repos for deep-dive content

### Files to Modify
- `data/testimonials.ts`: Names (Peter Gale, Novica Kovacevic), em-dashes
- `data/experience.ts`: Em-dashes in periods
- `data/education.ts`: Em-dash in period
- `data/projects.ts`: Em-dash, rename Invoice Processor, add deep-dive content
- `data/honors.ts`: Em-dash
- `lib/constants.ts`: Full rewrite of tagline, description, location
- `app/page.tsx`: Full rewrite (all UX fixes, new sections, merged Work+Projects, scroll-to-top, clickable cards)
- `app/layout.tsx`: Em-dashes in metadata

### New tagline (proposed)
"I'm an AI-first engineer who embeds into teams, diagnoses bottlenecks, and builds automation that transforms how organizations operate. I write code, deploy systems, and relentlessly improve workflows across every team I touch."

### Section Order (narrative-building)
1. Hero — Hook with value proposition
2. About — Who I am, key metrics
3. Experience — Prove I've done this before
4. Work/Projects (merged) — Show what I built
5. Skills — What I bring technically
6. Education — Credentials
7. Testimonials — Social proof
8. Contact — CTA
