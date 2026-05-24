# Portfolio Changes (Nav, About, Work, Fonts, DocFlow Images)

## TL;DR
> Apply 5 quick changes to the portfolio: (1) swap DocFlow gallery image order, (2) reorder/trim navigation items, (3) change About section to photo-left/text-right layout, (4) remove ScannerCardStream from Work section, (5) reduce hero/contact font sizes.

**Deliverables**:
- `data/projects.ts` — DocFlow gallery order swapped
- `lib/constants.ts` — NAV_ITEMS reordered and trimmed
- `app/page.tsx` — About layout, ScannerCardStream removal, font sizes
- Build passes with `npm run build`

**Estimated Effort**: Quick (~5 min)
**Parallel Execution**: YES — Task 1 and Task 2 are independent
**Critical Path**: Tasks 1-4 → Task 5 (build)

---

## Context

### Original Request
Clean up nav items, fix About section layout, remove scanner animation, reduce oversized fonts, and swap DocFlow image order.

### Current State
- `data/projects.ts` line 43: `gallery: ["/projects/docflow-2.jpg", "/projects/docflow-1.png"]`
- `lib/constants.ts` lines 20-29: NAV_ITEMS has 8 entries (About, Work, Projects, Skills, Experience, Education, Testimonials, Contact) — wrong order (Projects before Skills, duplicate "Work" vs "Projects" confusion)
- `app/page.tsx`: About section has photo centered at top + 3 cards below (grid md:grid-cols-3), ScannerCardStream component at lines 344-358 with tech footer at lines 423-426, hero font is `text-[14vw] md:text-[12vw]`, contact heading is `text-[12vw] md:text-[10vw]`

---

## Work Objectives

### Core Objective
Apply 4 UX/presentation fixes + 1 image ordering fix to the portfolio.

### Concrete Deliverables
- Changed `data/projects.ts` line 43
- Updated `lib/constants.ts` NAV_ITEMS
- Modified `app/page.tsx` About section, Work section, and font sizes

### Definition of Done
- [ ] `npm run build` passes with 0 errors

---

## Verification Strategy

> ZERO HUMAN INTERVENTION — ALL verification is agent-executed.

### QA Policy
- **Task 1**: Read `data/projects.ts` line 43, verify gallery order
- **Task 2**: Read `lib/constants.ts` NAV_ITEMS, verify order and entries
- **Task 3-4**: Read `app/page.tsx` relevant sections, verify changes
- **Task 5**: Run `npm run build`, verify 0 errors

---

## Execution Strategy

### Parallel Waves

```
Wave 1 (All at once — fully independent):
├── Task 1: Swap DocFlow gallery order [quick]
├── Task 2: Reorder NAV_ITEMS [quick]
├── Task 3: About section layout [quick]
└── Task 4: Remove ScannerCardStream + tech footer [quick]

Wave 2 (After Wave 1):
└── Task 5: Reduce font sizes + build verification [quick]
```

---

## TODOs

- [ ] 1. Swap DocFlow Gallery Image Order

  **What to do**:
  - In `data/projects.ts` (line 43), change:
    ```
    gallery: ["/projects/docflow-2.jpg", "/projects/docflow-1.png"],
    ```
    to:
    ```
    gallery: ["/projects/docflow-1.png", "/projects/docflow-2.jpg"],
    ```
  - Only change this one line. Do NOT modify anything else.

  **Must NOT do**:
  - Do not change any other project's gallery
  - Do not touch any other fields

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 2, 3, 4)
  - **Blocks**: None
  - **Blocked By**: None

  **References**:
  - `data/projects.ts:43` — The exact line to change

  **Acceptance Criteria**:
  - [ ] `data/projects.ts` line 43 reads: `gallery: ["/projects/docflow-1.png", "/projects/docflow-2.jpg"],`
  - [ ] No other lines changed

  **QA Scenarios**:
  ```
  Scenario: Verify gallery order swapped
    Tool: Bash (grep)
    Steps:
      1. Run: grep -n "gallery" data/projects.ts
    Expected Result: docflow-1.png appears before docflow-2.jpg on the DocFlow line
    Evidence: .sisyphus/evidence/task-1-gallery-order.txt
  ```

  **Commit**: YES (groups with 2-5)
  - Message: `fix: swap DocFlow gallery image order`
  - Files: `data/projects.ts`

---

- [ ] 2. Reorder and Trim NAV_ITEMS

  **What to do**:
  - In `lib/constants.ts` (lines 20-29), replace the entire `NAV_ITEMS` array with:
    ```typescript
    export const NAV_ITEMS = [
      { label: "About", href: "#about" },
      { label: "Experience", href: "#experience" },
      { label: "Work", href: "#work" },
      { label: "Skills", href: "#skills" },
      { label: "Education", href: "#education" },
      { label: "Testimonials", href: "#testimonials" },
      { label: "Contact", href: "#contact" },
    ] as const;
    ```
  - This removes "Projects" entirely and orders as: About, Experience, Work, Skills, Education, Testimonials, Contact
  - Do NOT touch SITE_CONFIG or SOCIAL_LINKS

  **Must NOT do**:
  - Do not change SITE_CONFIG or SOCIAL_LINKS

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 3, 4)
  - **Blocks**: None
  - **Blocked By**: None

  **References**:
  - `lib/constants.ts:20-29` — Current NAV_ITEMS to replace

  **Acceptance Criteria**:
  - [ ] NAV_ITEMS has exactly 7 entries: About, Experience, Work, Skills, Education, Testimonials, Contact (in that order)
  - [ ] "Projects" entry is removed
  - [ ] SITE_CONFIG and SOCIAL_LINKS unchanged

  **QA Scenarios**:
  ```
  Scenario: Verify NAV_ITEMS order and count
    Tool: Bash (grep)
    Steps:
      1. Run: grep -A 10 "export const NAV_ITEMS" lib/constants.ts
    Expected Result: 7 nav items in correct order, no "Projects"
    Evidence: .sisyphus/evidence/task-2-nav-items.txt
  ```

  **Commit**: YES (groups with 1, 3-5)
  - Message: `fix: reorder nav items and remove Projects duplicate`
  - Files: `lib/constants.ts`

---

- [ ] 3. Change About Section to Photo-Left + Text-Right Layout

  **What to do**:
  In `app/page.tsx`, modify the About section (`id="about"`, lines 195-252):

  1. **Wrap photo + cards in a flex row**: Change the section content area so the photo and the 3 cards sit side-by-side:
     - Replace the current standalone `<motion.div>` wrapping the `<img>` (lines 197-209) with the same photo inside a flex layout
     - The structure should be:
       ```
       <section id="about" ...>
         <div class="max-w-[1400px] mx-auto">
           <motion.h2 ...>About</motion.h2>
           <div class="flex flex-col md:flex-row items-start gap-10">
             <div class="shrink-0">
               <motion.div ...>
                 <img ... />  (same photo, same classes: w-44 h-44 sm:w-48 sm:h-48 md:w-56 md:h-56)
               </motion.div>
             </div>
             <div>
               (3 cards grid - same content, same motion animations)
             </div>
           </div>
         </div>
       </section>
       ```

  2. **Keep the exact same styling**: Same background `bg-[#f3ede1] text-[#1a1a1a]`, same padding, same photo classes `w-44 h-44 sm:w-48 sm:h-48 md:w-56 md:h-56 object-cover grayscale contrast-125 rounded-2xl ring-1 ring-foreground/20`, same card content and animations.

  3. **The 3 cards go from `grid md:grid-cols-3` to just stacking vertically** inside the right-side div.

  **Detailed code changes**:
  - Current structure (lines 195-252):
    ```tsx
    <section id="about" ...>
      <div className="max-w-[1400px] mx-auto">
        <motion.div ...>  <!-- photo wrapper -->
          <img ... />
        </motion.div>
        <motion.h2 ...>About</motion.h2>
        <div className="grid md:grid-cols-3 gap-12 md:gap-16">  <!-- 3 cards -->
          ...
        </div>
      </div>
    </section>
    ```

  - New structure:
    ```tsx
    <section id="about" className="relative bg-[#f3ede1] text-[#1a1a1a] py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl font-light tracking-tighter mb-16 md:mb-24"
        >
          About
        </motion.h2>
        <div className="flex flex-col md:flex-row items-start gap-10">
          <div className="shrink-0">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img
                src="/data/Priyanshu_Profile.png"
                alt="Priyanshu Vora, software engineer"
                className="w-44 h-44 sm:w-48 sm:h-48 md:w-56 md:h-56 object-cover grayscale contrast-125 rounded-2xl ring-1 ring-foreground/20"
              />
            </motion.div>
          </div>
          <div className="grid md:grid-cols-3 gap-12 md:gap-16 flex-1">
            {[
              { title: "AI-First Engineering", text: "..." },
              { title: "Forward Deployed Mindset", text: "..." },
              { title: "Production Impact", text: "..." },
            ].map((item, i) => (...))}
          </div>
        </div>
      </div>
    </section>
    ```

  **Must NOT do**:
  - Do not change the section background or text color classes
  - Do not change the card content or animation delays
  - Do not change the heading text or styling

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 2, 4)
  - **Blocks**: None
  - **Blocked By**: None

  **References**:
  - `app/page.tsx:195-252` — Current About section

  **Acceptance Criteria**:
  - [ ] Photo appears on the left side with `shrink-0` container
  - [ ] The 3 cards are on the right side inside `flex-1` container
  - [ ] Layout uses `flex flex-col md:flex-row items-start gap-10`
  - [ ] Heading "About" stays at the top above both photo and cards
  - [ ] All original content preserved

  **QA Scenarios**:
  ```
  Scenario: Verify About section layout in source
    Tool: Bash (grep)
    Steps:
      1. Run: grep -n "flex flex-col md:flex-row items-start gap-10" app/page.tsx
      2. Run: grep -n "shrink-0" app/page.tsx
      3. Run: grep -n "About" app/page.tsx | head -5
    Expected Result: flex row pattern found, shrink-0 found, About heading present
    Evidence: .sisyphus/evidence/task-3-about-layout.txt
  ```

  **Commit**: YES (groups with 1, 2, 4, 5)
  - Message: `fix: restructure About section to photo-left text-right layout`
  - Files: `app/page.tsx`

---

- [ ] 4. Remove ScannerCardStream and Tech Footer from Work Section

  **What to do**:
  In `app/page.tsx`, make these changes:

  1. **Remove import** (line 6): Delete `import { ScannerCardStream } from "@/components/ui/scanner-card-stream";`

  2. **Remove ScannerCardStream component** (lines 344-358): Delete the entire block:
     ```tsx
     <div className="h-[600px] relative">
       <ScannerCardStream
         cardImages={[...]}
         repeat={4}
         scanEffect="scramble"
         initialSpeed={120}
         cardGap={80}
       />
     </div>
     ```

  3. **Remove tech footer** (lines 423-426): Delete:
     ```tsx
     <div className="px-6 md:px-12 mt-12 max-w-[1400px] mx-auto flex justify-between items-end text-sm text-muted-foreground/60">
       <div>/Python /Azure AI /TypeScript /React /Flask /ERP</div>
       <div>/2026</div>
     </div>
     ```

  4. **Clean up** the Work section `</div>` tags after removing the scanner — make sure the section still closes properly. The closing `</section>` at line 609 should still be intact.

  **Must NOT do**:
  - Do not touch the project cards grid (lines 360-421)
  - Do not touch the modal (lines 428-608)
  - Do not remove the unused imports check — but if `ScannerCardStream` was the only use of certain imports, those may remain unused

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 2, 3)
  - **Blocks**: None
  - **Blocked By**: None

  **References**:
  - `app/page.tsx:6` — Import to remove
  - `app/page.tsx:344-358` — ScannerCardStream block to remove
  - `app/page.tsx:423-426` — Tech footer to remove

  **Acceptance Criteria**:
  - [ ] No `ScannerCardStream` import or usage remains in file
  - [ ] No `h-[600px]` scanner wrapper in Work section
  - [ ] No tech footer line (`/Python /Azure AI...`) in Work section
  - [ ] Work section still has project cards grid and modal
  - [ ] Project cards section headings preserved

  **QA Scenarios**:
  ```
  Scenario: Verify ScannerCardStream removed
    Tool: Bash (grep)
    Steps:
      1. Run: grep -n "ScannerCardStream" app/page.tsx
    Expected Result: No matches found
    Evidence: .sisyphus/evidence/task-4-no-scanner.txt
  ```

  **Commit**: YES (groups with 1, 2, 3, 5)
  - Message: `fix: remove ScannerCardStream and tech footer from Work section`
  - Files: `app/page.tsx`

---

- [ ] 5. Reduce Font Sizes and Build Verify

  **What to do**:
  In `app/page.tsx`:

  1. **Hero name** (line 115): Change:
     ```
     className="text-[14vw] md:text-[12vw] leading-[0.85] font-light tracking-[-0.04em] text-foreground mb-4"
     ```
     to:
     ```
     className="text-[10vw] md:text-[8vw] leading-[0.85] font-light tracking-[-0.04em] text-foreground mb-4"
     ```

  2. **Contact heading** (line 922): Change:
     ```
     className="text-[12vw] md:text-[10vw] leading-[0.85] font-light tracking-[-0.04em] text-foreground mb-12 md:mb-16"
     ```
     to:
     ```
     className="text-[8vw] md:text-[6vw] leading-[0.85] font-light tracking-[-0.04em] text-foreground mb-12 md:mb-16"
     ```

  3. **After all changes applied**: Run `npm run build` and fix any errors.

  **Must NOT do**:
  - Do not change any other font sizes
  - Do not change leading, tracking, or other classes

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: NO (depends on Tasks 1-4 completing)
  - **Parallel Group**: Wave 2 (alone)
  - **Blocks**: None
  - **Blocked By**: Tasks 1, 2, 3, 4

  **References**:
  - `app/page.tsx:115` — Hero font class
  - `app/page.tsx:922` — Contact heading font class

  **Acceptance Criteria**:
  - [ ] Hero name: `text-[10vw] md:text-[8vw]`
  - [ ] Contact heading: `text-[8vw] md:text-[6vw]`
  - [ ] `npm run build` passes with 0 errors

  **QA Scenarios**:
  ```
  Scenario: Verify font size changes
    Tool: Bash (grep)
    Steps:
      1. Run: grep -n "text-\[10vw\] md:text-\[8vw\]" app/page.tsx
      2. Run: grep -n "text-\[8vw\] md:text-\[6vw\]" app/page.tsx
    Expected Result: Hero line found with 10vw/8vw, Contact line found with 8vw/6vw
    Evidence: .sisyphus/evidence/task-5-font-sizes.txt
  ```

  **Commit**: YES (groups with 1-4)
  - Message: `fix: reduce hero and contact font sizes`
  - Files: `app/page.tsx`

---

## Final Verification Wave

- [ ] F1. **Build Verification** — `quick`
  Run `npm run build` from project root. Verify 0 errors, 0 warnings.
  Output: Build output showing L2 completed successfully.

- [ ] F2. **Content Audit** — `quick`
  Read `data/projects.ts:43` (gallery order), `lib/constants.ts:20-29` (NAV_ITEMS), `app/page.tsx` around lines 115, 195-250, 344, 423, 922. Verify all 5 changes applied correctly.
  Output: All 5 changes confirmed or list of failures.

---

## Commit Strategy

- **Commit 1**: `fix: swap DocFlow gallery image order, reorder nav, fix about layout, remove scanner, reduce fonts` — all files (`data/projects.ts`, `lib/constants.ts`, `app/page.tsx`)

---

## Success Criteria

### Verification Commands
```bash
grep -n "gallery" data/projects.ts
grep -A 10 "export const NAV_ITEMS" lib/constants.ts
grep -n "ScannerCardStream\|text-\[14vw\]\|text-\[12vw\]\|text-\[12vw\] md:text-\[10vw\]" app/page.tsx
grep -n "text-\[10vw\] md:text-\[8vw\]\|text-\[8vw\] md:text-\[6vw\]\|flex flex-col md:flex-row items-start gap-10\|shrink-0" app/page.tsx
npm run build
```

### Final Checklist
- [ ] DocFlow gallery: docflow-1.png first, docflow-2.jpg second
- [ ] NAV_ITEMS: 7 items in order (About, Experience, Work, Skills, Education, Testimonials, Contact)
- [ ] About section: photo-left + text-right flex layout
- [ ] No ScannerCardStream in Work section
- [ ] No tech footer in Work section
- [ ] Hero font: `text-[10vw] md:text-[8vw]`
- [ ] Contact heading: `text-[8vw] md:text-[6vw]`
- [ ] `npm run build` passes
