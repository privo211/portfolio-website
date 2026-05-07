# Modern Portfolio & Personal Brand UI/UX Design Patterns — Comprehensive Analysis

> Sourced from Mobbin.com's curated library of 600K+ screens, Awwwards SOTD winners, and leading design-forward portfolios from companies like Obys, Studio375, Locomotive, Active Theory, Resn, and individual designers featured across Dribbble, Behance, and Awwwards.

---

## 1. Navigation Patterns

### 1.1 Sticky Headers — The Transparent-to-Solid Transition

**What makes it effective:**

The dominant pattern among 2024–2026 award-winning portfolios is the **transparent-to-solid header transition on scroll**. The header starts fully transparent (or with a subtle `backdrop-filter: blur(12px)`), sitting on top of the hero content. As the user scrolls past a defined threshold (usually 60–100px or when the hero CTA passes the fold), it transitions to a solid background — typically pure white with a `1px` border-bottom in `rgba(0,0,0,0.06)`, or pure black `#0a0a0a` for dark-mode sites.

**Spacing & Typography:**
- Logo locked to the top-left, `16–20px` font size, often in a bold grotesk (Inter, Satoshi, DM Sans)
- Nav links right-aligned, `14–15px`, weight `500`, color `#666` → `#111` on hover
- Spacing between links: `32–40px` gap
- Total header height: `64–80px` with `24px` horizontal padding on desktop (`max-width: 1440px` centered)
- CTA button (e.g., "Let's talk") sits last, filled/bordered, with a subtle scale transform on hover (`transform: scale(1.04)`)

**Animation Entry Points:**
1. Page load: header fades in from `opacity: 0` with `y: -10px` over 600ms, ease-out, delayed 200ms after hero text appears
2. Scroll transition: `background-color` and `box-shadow` animate using CSS transition `300ms ease`
3. Active nav link: an animated underline using `::after` pseudo-element that slides in from left (`transform: scaleX(0)` → `scaleX(1)`, `transform-origin: left`, `300ms cubic-bezier(0.65, 0, 0.35, 1)`)

**Visual Hierarchy:**
- Logo → Primary nav links → CTA button (right-most)
- The logo takes visual dominance through weight and position
- Active section indicator (the animated underline) provides spatial awareness
- On mobile, the header condenses to logo-left + hamburger-right

**Color & Contrast:**
- Light mode: `#ffffff` or `rgba(255,255,255,0.85)` with backdrop blur
- Dark mode: `#0a0a0a` or `rgba(10,10,10,0.9)` with backdrop blur
- Text: `#333333` (body) / `#ffffff` (inverse)
- Active state: brand accent color (e.g., `#6C5CE7`, `#FF6B35`, or a custom gradient)

### 1.2 Full-Screen Overlay Navigation (The "Studio" Pattern)

Used prominently by creative agencies (Obys, Locomotive, RESN). Clicking the hamburger triggers a full-screen overlay that slides or fades in, completely replacing the viewport with a navigation experience.

**Spacing & Typography:**
- Nav links are massive — `64–120px` font size, weight `600–700`, letter-spacing `-0.02em`
- Stacked vertically, centered or left-aligned within a `max-width: 1200px` container
- Each link spaced `16–24px` apart vertically
- Footer/contact info in bottom-left at `14px`, `400` weight, `60%` opacity
- Often includes a "close" X button top-right, also large (`48px × 48px` touch target)

**Animation Entry Points:**
1. Overlay container: `scale(1.1)` → `scale(1)` with opacity `0 → 1`, `500ms cubic-bezier(0.83, 0, 0.17, 1)` (for a spring-like feel: `0.76, 0, 0.24, 1`)
2. Nav links stagger in, each with `80–120ms` delay offset, translating `y: 40px → 0` with opacity fade
3. Background dims the page content via a `rgba(0,0,0,0.92)` overlay
4. Hover effect on links: a subtle parallax — the link text shifts right `8px` while showing a thumbnail image that follows the cursor or a large background preview image swaps behind

**Interactive Elements:**
- Hover line: thin horizontal line appears below each link on hover, `2px` height, brand accent color, animating from `scaleX(0)` → `scaleX(1)`
- Cursor transforms to a custom cursor (dot expanding to circle with "View" or "→")
- Escape key and clicking outside nav area closes it with a reverse animation (faster, ~`350ms`)

### 1.3 Sidebar Navigation (Fixed Left Column)

Less common but highly effective for architect/designer portfolios. A fixed left column (`280–320px` wide) contains the logo, vertical nav links, social icons, and sometimes a short bio line.

**Why it works:** It creates a strong brand anchor. The user always knows where they are. The sidebar serves as a constant frame for all content, giving the entire site a magazine-like structure.

**Specifications:**
- Sidebar width: `300px` (fixed)
- Background: solid `#111` or `#fafafa` with a `1px` right border
- Links: `14px`, `500` weight, uppercase `0.08em` letter-spacing, `32px` line-height
- Active state: `::before` bullet point (small dot, `6px`, brand color) or a color shift
- Bottom of sidebar: social icons and copyright, `12px`

---

## 2. Hero Section Layouts

### 2.1 Full-Screen Statement Hero

The most awarded pattern on Awwwards. Occupies `100vh` (or `100svh` for mobile-safe), no scroll indicator visible to force complete absorption of the statement.

**Layout structure:**
```
┌──────────────────────────────────────────┐
│  [Logo]                    [Nav]  [CTA]  │
│                                          │
│                                          │
│         PRINCIPAL HEADLINE               │
│          (56–96px, bold)                 │
│                                          │
│     Supporting subheadline               │
│     (18–24px, regular, 60% opacity)      │
│                                          │
│              [Primary CTA]               │
│              [Secondary link]            │
│                                          │
│                                          │
│  ↓ scroll indicator (optional)           │
└──────────────────────────────────────────┘
```

**Typography:**
- Headline: `64–96px` on desktop (`clamp(48px, 7vw, 96px)`), weight `700–800`, letter-spacing `-0.03em`, line-height `1.05–1.15`
- Fonts used: Satoshi, Switzer, Neue Haas Grotesk, PP Neue Montreal, General Sans
- Subheadline: `18–24px`, weight `400`, line-height `1.5`, max-width `560px`, color `rgba(0,0,0,0.6)` or `rgba(255,255,255,0.6)`

**Animation Entry Points:**
1. Headline: word-by-word or character-by-character reveal using clip-path animation or `overflow: hidden` with `translateY`
2. Each word rises from `y: 100%` to `y: 0` with staggered delay (`80ms` per word), `800ms` duration, `cubic-bezier(0.76, 0, 0.24, 1)`
3. Subheadline: fades in after headline completes, `400ms` delay, `600ms` duration
4. CTA button: fades + slides up `20px`, `300ms` after subheadline

**Technique:**
```css
/* The split-text animation approach */
.word-wrapper {
  overflow: hidden;
  display: inline-block;
}
.word {
  display: inline-block;
  transform: translateY(100%);
  animation: wordReveal 0.8s cubic-bezier(0.76, 0, 0.24, 1) forwards;
}
@keyframes wordReveal {
  to { transform: translateY(0); }
}
```

**Visual Hierarchy:**
- Headline dominates everything (`z-index` via typographic weight)
- Subheadline is secondary, lighter weight, lower opacity
- CTA button draws the eye through contrast (solid fill vs transparent background)
- Background may feature a subtle texture, gradient mesh, or abstract 3D shapes — always with very low opacity so text remains legible

### 2.2 Split-Screen Hero (Image + Text)

Popular among product designers and UX portfolios. Left half: large statement text. Right half: a hero image, 3D illustration, or animated mockup.

**Layout:**
```
┌────────────────────┬────────────────────┐
│                    │                    │
│   HEADLINE TEXT    │   HERO VISUAL      │
│   (40–48px)        │   (product mockup, │
│                    │    3D render,       │
│   Subheadline      │    abstract art)    │
│                    │                    │
│   [CTA Button]     │                    │
│                    │                    │
└────────────────────┴────────────────────┘
    50% width            50% width
```

**What makes it effective:** The brain processes imagery faster than text. Placing a high-quality visual beside the value proposition creates an immediate emotional connection before the user even reads the headline. The split layout imposes constraint, which forces stronger copywriting.

**Animation:** The image side enters with a `clip-path: inset(0 0 0 100%)` → `inset(0 0 0 0%)` reveal over `1.2s`, or scales from `0.95` → `1` with a slight rotation correction.

### 2.3 Animated/Morphing Text Hero

The headline rotates through multiple words or phrases — e.g., "I design ✕ products ✕ experiences ✕ brands." Each word cycles with a fade/slide or typewriter effect.

**Cycle timing:** `2–3s` per word, `300ms` transition between words.

**Technique:** The rotating word sits inside an `overflow: hidden` container. Words slide up and fade in/out using CSS `transition` on `transform` and `opacity`. The container has a subtle colored underline or highlight that resizes to match each word's width (animated with CSS transition on `width`).

**Effectiveness:** Demonstrates range without overwhelming. Adds movement that captures attention. Creates a "sticky" impression — users remember the motion.

### 2.4 Background Video / WebGL Hero

Used by tech-forward portfolios. A subtle looping video or interactive WebGL shader runs behind the text. Motion is slow and atmospheric (particle systems, flowing gradient waves, geometric morphing).

**Critical rules:**
- Video must be heavily compressed, muted, autoplay, and `playsinline`
- Text overlay must have sufficient contrast — typically achieved with a semi-transparent dark overlay (`rgba(0,0,0,0.3)` to `0.5`)
- The motion should be slow and non-distracting — `opacity: 0.4–0.6` on the visual layer
- Perceived performance matters: preload a poster image, lazy-load the video

---

## 3. Project / Work Showcase Patterns

### 3.1 Full-Bleed Alternating Cards (The "Editorial" Pattern)

The gold standard for design portfolios. Each project is a full-width row, alternating text-left/image-right with text-right/image-left. Each row is `100vh` or `90vh`.

**Structure per row:**
```
┌──────────────────────────────────────────┐
│  ┌──────────┐              ┌──────────┐  │
│  │ PROJECT  │              │          │  │
│  │   01     │              │  IMAGE   │  │
│  │  Title   │              │  (fills  │  │
│  │  Category│              │  right   │  │
│  │  Year    │              │  half)   │  │
│  │          │              │          │  │
│  └──────────┘              └──────────┘  │
└──────────────────────────────────────────┘
```

**Typography:**
- Project number: `14px`, `500` weight, `uppercase`, `0.1em` letter-spacing, `40%` opacity
- Project title: `48–72px`, `700` weight, `-0.02em` letter-spacing, line-height `1.1`
- Category/Year: `16px`, `400` weight, `50%` opacity
- All left-aligned within a `max-width: 560px` text block, centered vertically in its half

**Animation Entry Points:**
1. On scroll into view: the text block slides in from `x: -60px`, the image from `x: 60px` (opposite for alternating rows), both with `opacity: 0 → 1`, `800ms` duration, `cubic-bezier(0.65, 0, 0.35, 1)`
2. Image hover: a subtle `scale(1.03)` over `400ms` with `transform-origin: center`
3. On image hover, the project number/title shifts color to the brand accent

**Visual Hierarchy:** Number → Title → Category/Year. The number provides scannability. The large title communicates the project. The category gives context. The large image provides proof.

### 3.2 Masonry / Asymmetric Grid

Used when the portfolio contains diverse aspect ratios (mobile apps, desktop screens, brand work, photography). A CSS Grid with `grid-template-columns` using fractional units or a masonry layout with `columns: 3` and `column-gap: 16px`.

**Specs:**
- Gap: `12–20px` between items
- Items have rounded corners: `8–16px`
- Hover: overlay slides up from bottom with project name + category, `rgba(0,0,0,0.7)` background, `300ms` transition
- Images use `object-fit: cover` to maintain aspect ratio within the grid cell
- Load-in animation: staggered fade-up using Intersection Observer, `100ms` stagger per item

**Why it works:** Mimics the experience of browsing a gallery. The irregular layout creates visual rhythm that keeps the eye moving. Dense information display without feeling cluttered.

### 3.3 Horizontal Scroll Carousel

Projects laid out in a single horizontal row that the user scrolls through (via mouse wheel hijack on desktop, native horizontal scroll on mobile). The horizontal track is pinned while the user scrolls vertically — created using GSAP ScrollTrigger or Locomotive Scroll.

**Structure:**
- Container: `display: flex`, `flex-wrap: nowrap`
- Each project card: `500–700px` wide, `100vh` tall (or `80vh`)
- Content inside each card: vertically centered, large image fills `70%` with project title below
- Progress indicator at the bottom (a thin `2px` line that fills from `0%` to `100%`)

**Animation:** The horizontal translation is tied to vertical scroll progress. As the user scrolls, the carousel track moves horizontally — creating the illusion of "scrubbing through" a timeline.

**Caution:** Accessibility — provide arrow key navigation, a skip link, and ensure it degrades gracefully without JavaScript.

### 3.4 Staggered Reveal Grid (3-Column)

A clean `3-column` grid on desktop, `2-column` on tablet, single-column on mobile. Each card is a project thumbnail with the project name, category, and year.

**Animation:** As the user scrolls and cards enter the viewport, they animate in with staggered delays. Card 1 → 0ms, Card 2 → 100ms, Card 3 → 200ms, Card 4 → 0ms (next row), etc. Each card translates `y: 40px → 0` with `opacity: 0 → 1` over `700ms`, `cubic-bezier(0.65, 0, 0.35, 1)`.

**Card hover effects:**
- Image: slight scale `1.04` + `brightness(1.1)`
- Title: color shifts to accent
- A "View Project →" label appears below the title (slides in from `x: -10px`, `opacity: 0 → 1`)

---

## 4. About / Story Sections

### 4.1 The Personal Narrative Layout

A full-width section with a large portrait photo (left or right, `40–50%` width) and a personal statement (the other `50–60%`). The text is editorial, warm, and human.

**Typography choices:**
- Section label: `12–14px`, uppercase, `0.15em` letter-spacing, `50%` opacity — "ABOUT ME" or "THE STORY"
- Headline: `36–48px`, `700` weight, `-0.02em` letter-spacing — e.g., "Designer by craft, problem-solver by nature"
- Body: `16–18px`, `400` weight, line-height `1.7–1.8`, max-width `500px`, color `#555` on white
- Often includes an inline link or highlight word in the brand accent color

**Photo treatment:**
- Grayscale or slightly desaturated
- `border-radius: 8px` or full `border-radius: 50%` (avatar style)
- Subtle inner shadow for depth
- Parallax effect on scroll: image moves at `0.9x` speed relative to text

**Animation:** The section fades in using an Intersection Observer trigger at `30%` visibility. The photo scales from `0.95 → 1` while the text slides up from `y: 40px`. Both over `800ms`, `cubic-bezier(0.65, 0, 0.35, 1)`.

### 4.2 Timeline / Experience Section

Horizontal or vertical timeline showing career milestones, education, or key achievements. Each node has a year, title, company, and a short description.

**Vertical timeline structure:**
```
2024  ●  Senior Product Designer at Company X
           Led redesign of core product suite...
           │
2021  ●  Product Designer at Startup Y
           Shipped 0→1 product, grew to 50K users...
           │
2018  ●  UX Design Intern at Agency Z
           Research and wireframing for Fortune 500...
```

**Design specs:**
- Timeline line: `1px` solid, color `#e0e0e0`, running along the left
- Timeline dots: `12px` circles, filled with brand accent
- Year: `14px` mono or tabular font, `600` weight, `40%` opacity
- Title + company: `18–20px` `600` weight headline, `16px` company name in lighter weight
- Description: `15px`, line-height `1.6`, `60%` opacity, max-width `460px`

**Animation:** Each timeline item animates in as the user scrolls. The dot pulses (scales `0 → 1.2 → 1`), the line draws down (using `clip-path` or `height` animation), and the content fades in from the right. `150ms` stagger between items.

### 4.3 Values/Services Cards (3-Up Grid)

Three cards in a row on desktop, each representing a core value, skill, or service offering. Icon on top, heading, short description.

```
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│   [Icon]     │  │   [Icon]     │  │   [Icon]     │
│              │  │              │  │              │
│  Strategy    │  │  Design      │  │  Development │
│              │  │              │  │              │
│  Research-   │  │  Beautiful,  │  │  Pixel-perfect│
│  driven      │  │  usable      │  │  production  │
│  decisions   │  │  interfaces  │  │  code         │
└──────────────┘  └──────────────┘  └──────────────┘
```

**Specs:**
- Cards: `background: #f9f9f9` or `#ffffff` with `1px` border `#eee`, `border-radius: 16px`, `padding: 40px 32px`
- Icon: `48px × 48px`, brand accent color
- Heading: `20–24px`, `600` weight
- Body: `15px`, line-height `1.6`, color `#666`
- Hover: card lifts `y: -4px`, shadow appears (`0 8px 30px rgba(0,0,0,0.08)`)
- Animation: cards stagger in from below on scroll, each `120ms` apart

---

## 5. Contact Sections and CTAs

### 5.1 The "Big Ask" CTA Banner

A full-width section before the footer with a strong headline, subtext, and a prominent CTA button. Background is often the brand accent color or a dark solid fill.

**Structure:**
```
┌──────────────────────────────────────────┐
│                                          │
│     Let's build something great.         │
│     (48–64px, weight 700, #fff)          │
│                                          │
│     Have a project in mind? I'm          │
│     currently available for freelance.   │
│     (18–20px, weight 400, 70% opacity)   │
│                                          │
│           [ Get in Touch → ]             │
│           (filled white button           │
│            or outlined white button)     │
│                                          │
│     ✉  hello@yourname.com               │
│     🐦 @yourhandle                       │
│                                          │
└──────────────────────────────────────────┘
```

**Animation:** The headline text reveals with the word-stagger effect. The CTA button pulses gently (subtle `box-shadow` glow animation, `2s` infinite loop) to draw attention without being aggressive. Social links fade in last.

**Color:** Dark background (`#111` or brand accent like `#5B4CF0`), white text. High contrast ensures the CTA dominates.

### 5.2 The Split Contact Section

Left half: contact form. Right half: personal contact info, availability status, and a photo or map.

**Form design:**
- Inputs: minimal, `border-bottom: 1px solid #ddd`, focus state: border-bottom expands to `2px` and changes to accent color, `300ms` transition
- Labels float above as placeholders or sit above the input — `14px`, `500` weight, `#666`
- Input text: `16px`, generous padding (`12px 0`)
- Submit button: full-width, `48–56px` tall, `border-radius: 8px`, accent background, white text, `16px` `600` weight
- Success state: the form collapses and a success message animates in with a checkmark icon

**Right side info:**
- "Currently available for" with a green dot (live status indicator)
- Email + phone + location with icons
- Response time indicator: "Typically replies within 24 hours"
- Social links as small icon buttons

### 5.3 Footer-Integrated Contact (Minimal)

Instead of a dedicated contact section, the contact info lives in the footer alongside a "Start a conversation" link. This works for portfolios where the work IS the CTA — the user is expected to reach out after browsing.

---

## 6. Footer Designs

### 6.1 The Mega Footer

A large, well-organized footer with 3–4 columns: Brand/Logo + Description, Quick Links, Services, Social/Contact.

**Structure:**
```
┌──────────────────────────────────────────────────┐
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌─────┐ │
│  │ LOGO     │ │  NAV     │ │ SERVICES │ │SOCIAL│ │
│  │          │ │  Work    │ │ Design   │ │  IN  │ │
│  │ Brand    │ │  About   │ │ Dev      │ │  TW  │ │
│  │ tagline  │ │  Contact │ │ Strategy │ │  GH  │ │
│  │          │ │  Blog    │ │ Brand    │ │  DR  │ │
│  └──────────┘ └──────────┘ └──────────┘ └─────┘ │
│                                                  │
│  ─────────────────────────────────────────────   │
│  © 2026 Your Name. All rights reserved.          │
│  [Back to top ↑]                                 │
└──────────────────────────────────────────────────┘
```

**Typography:** Column headings: `14px`, `600` weight, `uppercase`, `0.08em` letter-spacing. Links: `15px`, `400`, line-height `2`. Colors: `#888` → `#111` on hover.

**Animation:** Footer fades in as one unit at `10%` visibility. The "Back to top" link smoothly scrolls to top (using `scroll-behavior: smooth` on the `html` element).

### 6.2 The Minimalist Footer

One line: centered or left-aligned text with copyright and a few links. Used by portfolios that want the focus entirely on the work above.

```
© 2026 Your Name  ·  LinkedIn  ·  Twitter  ·  Email
```

Set in `14px`, `400` weight, `50%` opacity. The simplicity feels confident — no need for a heavy footer when the work speaks.

### 6.3 The "Conversation Starter" Footer

A larger footer block with a friendly message: "Thanks for scrolling this far. Let's make something together." followed by an email link styled as a large, underlined text link. This footer treats the end of the page as a handoff point, not a dead end.

---

## 7. Loading Screens and Preloaders

### 7.1 The Branded Splash Preloader

A full-screen overlay that displays the logo or a custom animation while assets load. This is critical for WebGL-heavy portfolios where the initial bundle is large.

**Design:**
- Background: solid brand color or dark `#111`
- Center: logo mark (no text) at `60–80px`, animating
- Below: a thin progress bar, `3px` height, `200px` width, `border-radius: 2px`
- The progress bar fills from `0%` to `100%` as assets load (real progress, not fake)
- Or: a counter animating from `0` to `100` (%) using a monospace font

**Animation:**
1. Logo: subtle breathing animation (`scale: 1 → 1.02 → 1`, `2s` infinite, `ease-in-out`)
2. On 100% load: the entire overlay fades out (or slides up revealing the page), `600ms`
3. Often includes a "Skip" link for accessibility (visible on focus)

**Why it works:** It manages perceived wait time. A branded animation is more tolerable than a white screen. The progress bar provides certainty that the page IS loading.

### 7.2 The "Instant" Transition Preloader

For lighter portfolios, a quick `300–500ms` page transition that animates content in without a visible loading screen. Uses:
- A fixed overlay that wipes from bottom to top on initial load (using `clip-path` or `transform: translateY`)
- The body content fades up as the overlay exits
- Total duration: `400–600ms`

**Technique (using CSS + a tiny JS class):**
```css
.page-transition-overlay {
  position: fixed;
  inset: 0;
  background: #111;
  z-index: 9999;
  transform: translateY(0);
  transition: transform 0.6s cubic-bezier(0.76, 0, 0.24, 1);
}
.page-transition-overlay.exit {
  transform: translateY(-100%);
}
```

### 7.3 The Counter Preloader

Displays a large percentage number (`0%` → `100%`) in the center of the screen. Uses `requestAnimationFrame` to smoothly increment the number. At 100%, the number fades out and the page reveals. Popular among interactive/creative developer portfolios.

---

## 8. Scroll-Based Storytelling Patterns

### 8.1 Parallax Depth Layers

Multiple layers of content scroll at different speeds, creating depth. A background layer at `0.5x`, a midground at `0.7x`, and foreground text at `1x`.

**Implementation:** CSS `transform: translateZ()` with `perspective` on the parent for GPU-accelerated parallax, or JS-driven transforms using GSAP ScrollTrigger tied to scroll position.

**Effectiveness:** Creates a cinematic, immersive feel. The depth cues signal that this is a premium, crafted experience. Subtle parallax (small speed differences like `0.85x` vs `1x`) is more tasteful than extreme parallax.

### 8.2 Scroll-Triggered Pin and Reveal

A section is "pinned" (using `position: sticky` or GSAP ScrollTrigger `pin: true`) while an animation plays through as the user scrolls. Common patterns:

- **Image sequence scrubbing:** A series of frames plays as the user scrolls, creating a video-like effect driven by scroll position
- **Progressive disclosure:** Text reveals line by line, images fade in one by one, all tied to scroll progress within a pinned section
- **Product deconstruction:** A 3D model rotates or disassembles as the user scrolls

**Specs for pinned reveal sections:**
- Pin duration: `200%` of viewport height (i.e., scrolls `2x` the normal distance while pinned)
- Content appears at specific scroll thresholds within the pin (e.g., at `25%`, `50%`, `75%`)
- Each reveal item: `opacity: 0 → 1` and `y: 30px → 0`, triggered by its individual scroll trigger point
- A progress indicator at the bottom edge shows how much of the pinned section is complete

### 8.3 Horizontal Storytelling (Scroll Hijack)

The user scrolls vertically, but the page translates horizontally. Each "slide" is a full viewport-width panel. This is the storytelling pattern used heavily by Apple product pages.

**Structure:**
- Container: `height: 100vh`, `overflow: hidden`
- Inner track: `display: flex`, `width: 500vw` (for 5 slides), translated via JS on scroll
- Each slide: `width: 100vw`, `height: 100vh`, containing content for one chapter
- Navigation dots at the bottom indicate position

**Effectiveness:** Forces linear narrative consumption. Excellent for case studies where you want to walk the user through a process step by step.

### 8.4 The "Scrollytelling" Case Study

The dominant pattern for UX designer portfolios presenting case studies. Combines pinned sections, progressive reveals, and image/video embeds.

**Structure of a case study:**
1. **Hero:** Project name, role, timeline — full-screen with a hero image
2. **Context (pinned):** The challenge statement appears as the user scrolls. A pinned phone mockup stays on screen while text reveals beside it.
3. **Process (scroll-through):** Wireframes → User flows → Design iterations — each as a full-width image with brief annotations
4. **Solution (horizontal scroll):** Final screens presented in a horizontal carousel
5. **Results (fade-in grid):** Metrics and outcomes in large font cards

**Animation mix:**
- Pin + text reveal for the problem statement
- Fade-in for wireframes (with a "sketch → final" cross-fade on hover)
- Horizontal scroll for final screens
- Scale-in for results/numbers

---

## 9. Mobile Responsive Adaptations

### 9.1 Navigation

**Pattern:** Hamburger menu (always). The full-screen overlay is the dominant mobile nav pattern for portfolios. It provides the most room for large, tappable links.

**Specifications:**
- Hamburger icon: `24px × 24px`, `3` lines, `2px` stroke, `#111`, animated to an X on toggle (top line rotates `45°`, middle fades, bottom rotates `-45°`)
- Overlay: full screen, `#111` or `#fff` background
- Links: `36–48px` font size (larger than desktop because the user's face is closer to the screen), stacked with `40px` spacing, centered
- Safe area: respects `env(safe-area-inset-top)` and `env(safe-area-inset-bottom)` for notched devices

### 9.2 Typography Scaling

Headlines reduce significantly but maintain their hierarchy:
- Hero headline: `96px` → `40px` (or `clamp(32px, 8vw, 64px)`)
- Section headlines: `64px` → `32px`
- Body text: `18px` → `16px`
- Line-height increases slightly for readability: `1.5` on body

**Spacing adjustments:**
- Section padding: `120px` → `60px` vertical
- Card gaps: `24px` → `16px`
- Container padding: `80px` → `20px` horizontal
- CTA buttons: expand to full-width where needed for easy thumb reach

### 9.3 Layout Transformations

| Desktop Pattern | Mobile Adaptation |
|---|---|
| 3-column grid | Single column, stacked |
| Split-screen (50/50) | Text on top, image below |
| Sidebar + content | Sidebar becomes top bar or hamburger |
| Horizontal scroll carousel | Native horizontal scroll with `overflow-x: auto` and `scroll-snap-type: x mandatory` |
| Alternating text+image rows | Vertical stack: text above image, always |
| 2-column footer | Single column, stacked |

### 9.4 Touch-Optimized Interactions

- Hover effects are replaced with tap/active states. Cards that scaled on hover now show the active state immediately on touch.
- "View Project" overlays that appeared on hover now appear permanently (or slide in on first touch, and the second touch navigates to the project).
- Carousels use `scroll-snap-type: x mandatory` for natural swipe behavior
- All interactive elements have minimum `44px × 44px` touch targets (Apple HIG)
- Pull-to-refresh and swipe gestures are preserved, not hijacked by custom scroll

### 9.5 Performance Optimizations

- Images serve via `<picture>` with `srcset` for appropriate sizes
- WebGL/3D elements are disabled or replaced with static images on mobile
- Video autoplay is disabled (mobile browsers prevent it anyway)
- Heavy animations are replaced with simpler CSS transitions
- Fonts use `font-display: swap` to prevent FOIT (Flash of Invisible Text)
- Total payload budget: under `1.5MB` on 4G (first load)

### 9.6 Mobile-Specific UX Enhancements

- A "Back to Top" floating button appears after the user scrolls past the first viewport
- Email/phone links become tappable `mailto:` and `tel:` links
- Contact forms use `inputmode` attributes (`inputmode="email"`, `inputmode="tel"`) for appropriate keyboards
- The page respects `prefers-reduced-motion` and disables heavy animations
- Dark mode support via `prefers-color-scheme` media query

---

## Summary: Pattern Selection Guide

| Portfolio Type | Recommended Nav | Hero Pattern | Work Showcase | Loading |
|---|---|---|---|---|
| **UX Designer** | Sticky header + hamburger | Split-screen (text + mockup) | Full-bleed cards with case study links | Minimal fade-in |
| **Creative Developer** | Full-screen overlay nav | WebGL / animated background | Horizontal scroll carousel | Branded preloader |
| **Brand Designer** | Sidebar nav | Full-screen statement | Masonry grid | Logo animation |
| **Product Designer** | Transparent → solid sticky header | Split-screen | Staggered reveal grid + case studies | Instant transition |
| **Agency** | Full-screen overlay nav | Video background + typewriter text | Alternating editorial rows | Counter preloader |
| **Photographer** | Minimal sticky header | Full-bleed hero image | Masonry/infinite grid with lightbox | Simple fade-in |

---

## Key Tools & Technologies Used by Top Portfolios

- **GSAP ScrollTrigger** — for scroll-based animations, pinning, and parallax
- **Locomotive Scroll** — smooth scrolling with parallax and lerp-based easing
- **Three.js** — WebGL 3D scenes and shader backgrounds
- **Lenis** — lightweight smooth scroll library (increasingly popular)
- **Framer Motion** — for React-based portfolios with declarative animations
- **Barba.js** — page transitions for multi-page portfolios
- **Swiper.js** — touch-friendly carousels
- **SplitType / Splitting.js** — text splitting for character/word animation
- **Intersection Observer API** — for triggering scroll-based reveal animations
- **CSS `@property`** — for animating gradients and custom properties

---

*This report is compiled from patterns observed across Mobbin.com's library of 600,000+ screens, Awwwards Sites of the Day winners (2024–2026), and leading portfolio websites from top design agencies and individual practitioners.*
