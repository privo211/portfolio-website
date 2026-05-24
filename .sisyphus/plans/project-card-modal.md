# Project Card Modal Overhaul Plan

## Current State
- 3 project cards (DocFlow, ResumeX, Flick) in Work section
- Cards show: title, subtitle, description (now full), tech tags with expandable +N
- Inline expand shows highlights as bullet list
- GitHub/Figma links at bottom

## Proposed: Card → Modal (2-tier)

### Tier 1: Card Preview (normal)
Each card shows:
- **Cover image** (primary project image)
- **Title + Subtitle**
- **Short summary** (first 2 lines of description, truncated)
- **Tech tags preview** (first 4-5, +N indicator)
- **Action buttons row**: "See Details" (opens modal), GitHub icon, Live/Figma icon, YouTube icon (ResumeX only)
- **Click on card or "See Details"** → opens modal

### Tier 2: Modal (full detail)
Overlay/lightbox that opens when card is clicked:
- **Image gallery** at top (carousel if multiple images, dots navigation)
- **Project title** (large)
- **Full description** (no truncation)
- **Highlights** as bullet list
- **For DocFlow only**: Architecture + Pipeline + Outcomes sections from data
- **All tech tags** displayed fully (no +N)
- **Link buttons row**: GitHub, Live Demo, Figma, YouTube (as applicable)
- **YouTube integration**: Inline embed (iframe) for ResumeX demo video
- **Extra photos section**: Additional screenshots below

### Image assignments

| Project | Cover | Gallery images |
|---------|-------|---------------|
| DocFlow | `/public/projects/docflow-2.jpg` | docflow-2.jpg, docflow-1.png |
| ResumeX | `/public/projects/resumex-cover.jpg` | resumex-cover.jpg, resumex-1.png, resumex-demo screenshots |
| Flick | `/public/projects/flick-cover.png` | flick-cover.png, flick-1.png, Figma screenshots |

### Data structure updates
Add to Project interface in `data/projects.ts`:
```typescript
gallery?: string[];      // additional images for modal carousel
youtubeEmbed?: string;   // YouTube embed URL (e.g., "uSg_ZD70cC4")
```

## Open Questions

1. **Modal style**: Full-screen overlay (dark backdrop, centered content, scrollable) or smaller centered dialog (800px max-width)?

2. **Modal trigger**: Click anywhere on the card opens modal, or only a "See Details" button?

3. **YouTube video**: Embedded `<iframe>` player inside the modal, or a button that opens a separate modal/player?

4. **Gallery navigation**: Carousel with arrows, or just stacked images?

5. **Close modal**: X button top-right + click backdrop + Escape key?

6. **URL state**: Should opening a modal update the URL hash (e.g., `#project-docflow`)?

7. **Figma prototype**: The Flick project has a Figma link. Should this open in a new tab, or attempt to embed it somehow?

8. **DocFlow screenshots**: We have 2 images. Are these enough or should we screenshot more from the actual app (which we can't access)?

9. **resumex-demo.vercel.app**: Should I screenshot this now with Playwright for additional gallery images?
