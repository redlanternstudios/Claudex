# REDLANTERN STUDIOS — BRAND DOCUMENT STANDARD
Version: 1.0 | Owner: Ro | Last updated: 2026-06-10
Status: ENFORCED — applies to ALL documents, internal and external

---

## NON-NEGOTIABLE RULE

**Every document produced for RedLantern Studios — internal or external — must follow this standard.**

This includes:
- Operating updates
- Product briefs
- Pitch decks (adapted)
- Vendor packets
- Handoff docs
- Sprint reports
- Architecture reviews
- Investor materials
- Any PDF, HTML, DOCX, or PPTX output

No plain documents. No generic formatting. No exceptions.

---

## BRAND SYSTEM

### Color Palette (exact hex — never approximate)
| Token | Hex | Usage |
|-------|-----|-------|
| Command Black | `#07080D` | Page headers, footers, callout backgrounds, principle strips |
| Ink Black | `#1B1C24` | Body text, table rows |
| Proof Red | `#D92532` | Accent lines, eyebrow labels, section labels, H1 second line, badge borders |
| Packet Cream | `#F7F2EE` | Page body background |
| Paper White | `#FFFFFF` | Card backgrounds, clean sections |
| Muted Gray | `#6B727C` | Secondary text, metadata, footer center |
| Line Warm Gray | `#DDD6CF` | Dividers, card borders, table lines |
| Lantern Gold | `#B9782A` | Alif/Halal suite gold-top cards only |

### Logo
- **File:** `RedLantern Studios - Standard Document Logo.png` (Drive: Logos & Branding folder)
- **Local path:** `/Users/rorysemeah/Documents/Claude/Projects/RedLantern Studios/rls_logo_v2.png`
- **Usage:** Top-left of every page header. Height: 52pt. Never stretch. Never replace with text.
- **DO NOT** use text substitutes like "By Red · RedLantern Studios™"

---

## PAGE ANATOMY (in order, top to bottom)

### 1. Page Header
- Background: `#07080D` (Command Black)
- Left: Real logo image at 52pt height
- Right: Document strap (e.g., "Truth · Technology · Trajectory")
- Height: ~90pt

### 2. Diagonal Sash
- CSS: `repeating-linear-gradient(-45deg, #07080D 0px, #07080D 6px, #FFFFFF 6px, #FFFFFF 10px)`
- Height: 12px
- Full width

### 3. Page Body
- Background: `#F7F2EE` (Packet Cream)
- Padding: 20px 30px 16px
- Contains all content

### 4. Page Footer
- Background: `#07080D` (Command Black)
- Left: "BUILD IN PUBLIC. OPERATE IN TRUTH."
- Center: "REDLANTERN STUDIOS · EST. 2015 · BY RED, LLC"
- Right: "PAGE X OF Y"
- Font: 5.5pt, uppercase, letter-spaced

---

## TYPOGRAPHY

| Element | Spec |
|---------|------|
| Eyebrow | 6px, `#D92532`, 700 weight, 2px letter-spacing, uppercase |
| H1 Line 1 | 20pt+, `#1B1C24`, 900 weight, uppercase |
| H1 Line 2 | 20pt+, `#D92532`, 900 weight, uppercase (second line always red) |
| Section Label | 6px, `#D92532`, 700 weight, 3px letter-spacing, uppercase, red bottom border |
| Body Copy | 8.5–10pt, `#1B1C24`, line-height 1.5 |
| Meta | 6.5pt, `#6B727C`, uppercase, letter-spaced |

---

## COMPONENTS

### Cards (white)
- Background: `#FFFFFF`
- Top border: 2.5px solid `#D92532`
- Outer border: 0.5px `#DDD6CF`
- Card label: `#D92532`, 6px, uppercase

### Gold Cards (Halal/Alif suite only)
- Top border: 2.5px solid `#B9782A`
- Label: `#B9782A`

### Callout Box
- Background: `#07080D`
- Left border: 3px solid `#D92532`
- Label: `#D92532`, uppercase
- Body text: `#DDD6CF`, bold highlights in `#FFFFFF`

### Principle Strip
- 4-cell black bar (`#07080D`)
- White uppercase text
- Full width

### Tables
- Header row: `#1B1C24` background, white text, 6px uppercase
- Alternating rows: `#F7F2EE` / `#ECE7E2`
- Borders: `#DDD6CF`

### Status Badges
| Status | Colors |
|--------|--------|
| Live | Green bg `#d4edda`, text `#155724` |
| Active | Blue bg `#cce5ff`, text `#004085` |
| Paused | Yellow bg `#fff3cd`, text `#856404` |
| Blocked | Red bg `#f8d7da`, text `#721c24` |
| Build/Dogfood | Purple bg `#e2d9f3`, text `#4a2572` |

---

## TEMPLATE REFERENCE

**Master HTML template:** `/Users/rorysemeah/Documents/Claude/Projects/RedLantern Studios/.claude/brand/RLS_DOCUMENT_TEMPLATE.html`

This file is the base template. Copy and populate it. Do not rebuild from scratch.

**Reference PDF (June 2026 operating update):**
`/Users/rorysemeah/Documents/Claude/Projects/RedLantern Studios/RLS_OPERATING_UPDATE_JUNE_2026.pdf`

---

## DOCUMENT TYPES

### Internal Operating Update
- 4–6 pages
- Sections: Strategic Frame → Active Products → OS/Infrastructure → Blockers + Next Actions
- Footer: standard
- Audience: Ro, team leads

### Product Brief (external-ready)
- 2–3 pages
- Sections: Problem → Solution → Architecture → Status → Ask
- No internal blocker rows
- Audience: investors, partners

### Vendor Packet
- 2 pages
- Entity structure, compliance status, contact info, scope
- Audience: clients, contractors

### Sprint Report
- 1–2 pages
- What shipped, what's blocked, what's next
- Audience: internal

### Handoff Doc
- 1 page
- Current state, open decisions, next action, receipts
- Audience: agents, contractors, team

---

## ENFORCEMENT RULES

1. **Claude:** Before generating any document output, check this file. Apply the template.
2. **SwarmClaw:** Any TECHWRITER, LIBRARIAN, or ARCHITECT agent producing a document must reference `/workspace/.claude/brand/BRAND_DOCUMENT_STANDARD.md`
3. **ChatGPT:** When producing RedLantern documents, apply this standard. Header = black, logo top-left, cream body, red accents, black footer.
4. **v0:** UI outputs for document-style pages follow this color system.
5. **No plain markdown exports** for anything that will be shared externally. Always render to HTML/PDF.
6. **PDF generation — EXACT Chrome command (never omit flags):**
   ```
   "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
     --headless --disable-gpu \
     --print-to-pdf="OUTPUT.pdf" \
     --print-to-pdf-no-header \
     --no-margins \
     "file:///absolute/path/to/INPUT.html"
   ```
   ⚠️ `--print-to-pdf-no-header` is MANDATORY. Without it, Chrome injects its own date/title bar over the brand header — breaking the design.

---

---

## WEB AND MOBILE VIEW (added June 19 2026 — MANDATORY for all HTML builds)

These rules apply to the HTML build artifact. PDF output locks them via `@media print`. Every RLS HTML doc must be readable in a browser AND render correctly when piped to PDF.

### Required head tag
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```
Missing this = doc breaks on mobile. No exceptions.

### Table scrolling
Every table must be wrapped — no bare `<table>` elements:
```html
<div style="overflow-x:auto;-webkit-overflow-scrolling:touch;">
  <table>...</table>
</div>
```

### Card grid model
Use flex wrap — never `grid-template-columns` without a mobile override:
```css
.card-grid { display: flex; flex-wrap: wrap; gap: 12pt; }
.card      { flex: 1 1 280px; min-width: 0; }
```

### Required breakpoints
```css
/* Tablet / large mobile */
@media (max-width: 768px) {
  .card-grid        { flex-direction: column; }
  .card             { flex: 1 1 100%; }
  .page-body        { padding: 12pt 16pt !important; }
  .principle-strip  { overflow-x: auto; white-space: nowrap; }
  h1                { font-size: 16pt !important; }
  .eyebrow          { font-size: 5.5pt !important; }
}

/* Small mobile */
@media (max-width: 480px) {
  .header-strap { display: none; }  /* logo-only header on small screens */
}

/* PDF print mode — overrides all responsive rules and locks layout */
@media print {
  .page         { width: 8.5in !important; height: 11in !important;
                  overflow: hidden !important; break-after: page !important; }
  .card-grid    { flex-wrap: nowrap !important; }
  .page-body    { padding: 16pt 44pt 12pt !important; }
  .table-scroll { overflow: visible !important; }
}
```

### Logo rule
Always fluid — never fixed pixel width:
```css
.logo { max-height: 46pt; width: auto; display: block; }
```

### Additional web view rules
- Stat rows (`display: flex; justify-content: space-between`): add `flex-wrap: wrap` so cells stack on mobile
- Callout boxes: `box-sizing: border-box; width: 100%` — never fixed `width: 680px` or similar
- Font stacks: `'Helvetica Neue', Arial, sans-serif` — never system-ui alone (inconsistent on Android)
- Sash: `background-size: 20px 20px` minimum — prevents aliasing on Retina + mobile

---

## ANTI-PATTERNS (never do these)

- Text substitutes for the logo
- White backgrounds for page-level documents
- Generic headers without the brand sash
- Missing footer on any page
- Plain section titles without eyebrow + section-label pattern
- Using different fonts (always Helvetica Neue / Arial fallback)
- Inline styles that override brand colors
- Missing `<meta name="viewport">` in HTML output
- Bare `<table>` elements without `overflow-x: auto` wrapper
- Fixed-column card grids without a mobile collapse breakpoint
- Delivering HTML as the final artifact (PDF is the standard — HTML is build artifact only)
