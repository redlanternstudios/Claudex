# RLS FORMATTING CONSTITUTION v1.0
# TRIGGER: "formatting"
# STATUS: ACTIVE — hardcoded source of truth for all layout, spacing, viewport, and brand formatting decisions
# WIRE: Claude (Cowork) · SwarmClaw agents · v0 · Claude Design · Canva · Gamma · ChatGPT image · GitHub context

---

## SECTION 1: BREAKPOINTS

Standard: Tailwind-aligned. Mobile-first. No custom breakpoints unless explicitly approved.

| Token     | Width   | Target                   |
|-----------|---------|--------------------------|
| xs        | 375px   | iPhone SE / small mobile |
| sm        | 640px   | Large mobile / phablet   |
| md        | 768px   | Tablet portrait          |
| lg        | 1024px  | Laptop / tablet landscape|
| xl        | 1280px  | Desktop                  |
| 2xl       | 1536px  | Wide desktop             |

Rule: All layouts start at 375px. Every breakpoint up is an enhancement, never a fix.

---

## SECTION 2: SPACING SCALE

Base unit: 4px. All spacing is a multiple of 4.

| Token | Value | Use case                          |
|-------|-------|-----------------------------------|
| 1     | 4px   | Micro gaps, icon padding          |
| 2     | 8px   | Tight component internal spacing  |
| 3     | 12px  | Small gaps                        |
| 4     | 16px  | Default padding, card internal    |
| 6     | 24px  | Section sub-spacing               |
| 8     | 32px  | Component gap                     |
| 12    | 48px  | Section spacing (mobile)          |
| 16    | 64px  | Section spacing (desktop)         |
| 24    | 96px  | Large section breaks              |
| 32    | 128px | Hero-level whitespace             |

Rule: Never use arbitrary px values. Always use scale multiples.

---

## SECTION 3: CONTAINERS

| Breakpoint | Container behavior                  | Horizontal padding |
|------------|-------------------------------------|--------------------|
| xs / sm    | 100% width                          | px-4 (16px)        |
| md         | 100% width                          | px-6 (24px)        |
| lg+        | max-w-7xl (1280px) centered         | px-8 (32px)        |

Standard wrapper class: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`

Narrow content (forms, articles): `max-w-2xl mx-auto`
Wide content (dashboards, tables): `max-w-full` with internal col constraints

---

## SECTION 4: SAFE AREAS (iOS / Android)

Required on all mobile app views. Not required for pure web.

```css
/* Apply to root app wrapper */
padding-top: env(safe-area-inset-top);
padding-right: env(safe-area-inset-right);
padding-bottom: env(safe-area-inset-bottom);
padding-left: env(safe-area-inset-left);
```

Minimum values for design mockups:
- Status bar / notch area: 44px top
- Home indicator: 34px bottom
- Side notch clearance: 16px

Tailwind plugin: `tailwindcss-safe-area` (pt-safe, pb-safe, pl-safe, pr-safe)

---

## SECTION 5: TYPOGRAPHY SCALE

Base: 16px / 1.5 line-height. Modular scale: ×1.25 (Major Third).

| Token    | Size  | Line height | Weight    | Use case                  |
|----------|-------|-------------|-----------|---------------------------|
| xs       | 12px  | 16px        | 400       | Captions, labels          |
| sm       | 14px  | 20px        | 400       | Secondary body, metadata  |
| base     | 16px  | 24px        | 400       | Body text                 |
| lg       | 18px  | 28px        | 500       | Lead text, card body      |
| xl       | 20px  | 28px        | 500–600   | Sub-headings              |
| 2xl      | 24px  | 32px        | 600       | Section headings          |
| 3xl      | 30px  | 36px        | 700       | Page headings             |
| 4xl      | 36px  | 40px        | 700–800   | Hero headings             |
| 5xl      | 48px  | 48px        | 800       | Display                   |
| 6xl      | 60px  | 60px        | 800–900   | Large display             |
| 7xl      | 72px  | 72px        | 900       | Hero display              |

Font family:
- Heading: Inter or Geist (system fallback: system-ui)
- Body: Inter (system fallback: system-ui, -apple-system)
- Mono: Geist Mono, JetBrains Mono, or monospace

Rule: No text below 12px. No body copy above 20px. No heading under 700 weight.

---

## SECTION 6: GRID SYSTEM

### Responsive (code-based)
- 12-column grid
- Column gap: 24px (gap-6)
- Row gap: 32px (gap-8)
- Common layouts:
  - Full width: `col-span-12`
  - Two column: `col-span-12 md:col-span-6`
  - Three column: `col-span-12 md:col-span-6 lg:col-span-4`
  - Sidebar layout: `col-span-12 lg:col-span-3` + `col-span-12 lg:col-span-9`

### Fixed canvas (Canva / Gamma / image gen)
- Columns: 12
- Margin: 80px desktop / 40px mobile
- Gutter: 24px
- Safe zone: 10% inset from all edges for critical content

---

## SECTION 7: FIXED CANVAS SIZES

| Purpose              | Dimensions         | Notes                             |
|----------------------|--------------------|-----------------------------------|
| Presentation / slide | 1920 × 1080px      | 16:9, Gamma default               |
| Desktop app mockup   | 1440 × 900px       | Standard laptop                   |
| Mobile app mockup    | 390 × 844px        | iPhone 14/15 standard             |
| Mobile small         | 375 × 812px        | iPhone SE / older devices         |
| Tablet mockup        | 768 × 1024px       | iPad portrait                     |
| Square social        | 1080 × 1080px      | Instagram / LinkedIn              |
| Portrait social      | 1080 × 1920px      | Stories / Reels / TikTok          |
| Landscape social     | 1200 × 628px       | Twitter / Facebook / OG image     |
| Document / PDF       | 816 × 1056px       | 8.5 × 11in @ 96dpi                |
| Email header         | 600 × 200px        | Standard email width              |

---

## SECTION 8: PAGE BREAK TEMPLATES

### Mobile (375–639px)
```
Layout:     Single column
Padding:    16px horizontal
Section gap: 48px vertical
Nav:        Bottom tab bar or hamburger menu
Cards:      Full width, 16px radius
CTAs:       Full width buttons
```

### Tablet (768–1023px)
```
Layout:     2-column grid
Padding:    24px horizontal
Section gap: 64px vertical
Nav:        Sidebar (collapsible) or top nav
Cards:      2-up grid
CTAs:       Inline or fixed bottom strip
```

### Desktop (1024px+)
```
Layout:     12-column or sidebar + main
Container:  max-w-7xl centered
Padding:    32px horizontal
Section gap: 96px vertical
Nav:        Fixed left sidebar (256px) or top nav
Cards:      3–4 up grid
CTAs:       Inline
```

---

## SECTION 9: COLOR TOKENS

### RLS Base (Dark Mode — Default)
| Token            | Value     | Use                              |
|------------------|-----------|----------------------------------|
| bg-primary       | #07080D   | App background, header           |
| bg-surface       | #111318   | Card background, elevated surface|
| bg-surface-alt   | #1A1D24   | Secondary cards, inputs          |
| bg-border        | #2A2D35   | Borders, dividers                |
| text-primary     | #FFFFFF   | Primary headings, labels         |
| text-secondary   | #9CA3AF   | Secondary text, metadata         |
| text-muted       | #6B7280   | Placeholder, hints               |
| accent-red       | #D92532   | Primary CTA, highlights, alerts  |
| accent-red-hover | #B91F2B   | Hover state for red elements     |
| cream            | #F7F2EE   | Light surface, docs, cards       |
| cream-dark       | #EDE8E3   | Hover on cream elements          |

### RLS Light Mode (Documents / Marketing)
| Token         | Value     | Use                            |
|---------------|-----------|--------------------------------|
| bg-primary    | #F7F2EE   | Page background                |
| bg-surface    | #FFFFFF   | Cards, containers              |
| text-primary  | #07080D   | Headings                       |
| text-secondary| #4B5563   | Body                           |
| accent        | #D92532   | CTAs, emphasis                 |

Rule: Dark mode is default for apps. Light mode for documents and marketing pages.

---

## SECTION 10: COMPONENT RULES

### Buttons
```
Primary:   bg-[#D92532] text-white hover:bg-[#B91F2B] rounded-lg px-6 py-3 font-semibold
Secondary: border border-[#2A2D35] text-white hover:bg-[#1A1D24] rounded-lg px-6 py-3
Ghost:     text-[#9CA3AF] hover:text-white hover:bg-[#1A1D24] rounded-lg px-4 py-2
Full-width mobile: w-full (always on mobile, optional on desktop)
```

### Cards
```
Background: bg-[#111318] or bg-[#1A1D24]
Border:     border border-[#2A2D35]
Radius:     rounded-xl (12px)
Padding:    p-4 (mobile) / p-6 (desktop)
Shadow:     shadow-lg (subtle on dark)
```

### Forms / Inputs
```
Background: bg-[#1A1D24]
Border:     border border-[#2A2D35] focus:border-[#D92532]
Radius:     rounded-lg
Padding:    px-4 py-3
Text:       text-white placeholder:text-[#6B7280]
Label:      text-sm font-medium text-[#9CA3AF] mb-1
```

### Navigation
```
Sidebar width:  256px (w-64)
Top nav height: 64px (h-16)
Bottom nav:     64px safe-area-aware
Active state:   text-white bg-[#1A1D24] or accent-red left border
```

### Modals / Sheets
```
Overlay:   bg-black/60 backdrop-blur-sm
Container: bg-[#111318] border border-[#2A2D35] rounded-2xl
Mobile:    bottom sheet (slide up from bottom)
Desktop:   centered modal max-w-lg
```

---

## SECTION 11: ANTI-PATTERNS (NEVER DO)

- No arbitrary pixel values outside the spacing scale
- No hardcoded colors outside the token set
- No layout starting above 375px
- No text under 12px
- No tap targets under 44×44px
- No removing safe-area-inset on mobile app views
- No horizontal scroll on mobile
- No fixed px widths on mobile containers
- No z-index above 50 without documentation
- No `!important` unless overriding third-party library
- No inline styles for layout or color (tokens only)

---

## SECTION 12: TOOL-SPECIFIC INJECTION BLOCKS

See: `.claude/formatting/tool-prompts/` for individual tool prompt files.

Quick reference:
| Tool           | File                     |
|----------------|--------------------------|
| v0             | tool-prompts/v0.md       |
| Claude Design  | tool-prompts/claude-design.md |
| Canva          | tool-prompts/canva.md    |
| Gamma          | tool-prompts/gamma.md    |
| ChatGPT image  | tool-prompts/chatgpt-image.md |

---

## SECTION 13: SWARMCLAW WIRING

File location: `.claude/formatting/SWARMCLAW_DISPATCH_FORMATTING.md`

Agents that must reference this constitution when handling UI/design/layout tasks:
- VisionEngine
- SightEngine
- Any agent generating mockups, screens, slides, or visual assets

Trigger keyword: "formatting"

When any agent or Claude session receives the word "formatting" — load this file in full and apply the relevant section to the current tool context.

---

_Last updated: 2026-06-22 | Owner: Ro / RedLantern Studios | Source of truth: this file_
