# SWARMCLAW — BRAND DOCUMENT ENFORCEMENT
Version: 1.0 | Owner: Ro | Enforced: 2026-06-10
Priority: CRITICAL — applies to ALL document output

---

## RULE (NON-NEGOTIABLE)

Every document produced by any SwarmClaw agent — internal or external — must follow the RedLantern Studios brand standard.

**No plain markdown exports for anything shared externally or presented to Ro.**
**No generic formatting. No white-page Word docs without brand.**

---

## APPLIES TO THESE AGENTS

- TECHWRITER — all doc generation
- LIBRARIAN — all aggregated reports, WBRs, digests
- ARCHITECT — architecture reviews, ADRs when rendered as docs
- FRONTEND — any document-style page or landing page
- Any agent producing a deliverable that Ro or external parties will read

---

## BRAND STANDARD LOCATION

Full spec: `/workspace/.claude/brand/BRAND_DOCUMENT_STANDARD.md`
Master HTML template: `/workspace/.claude/brand/RLS_DOCUMENT_TEMPLATE.html`

---

## QUICK REFERENCE

### Page structure (every page, in order):
1. Black header (`#07080D`) + real logo image (left) + strap (right)
2. Diagonal sash (CSS stripe, black/white)
3. Cream body (`#F7F2EE`) with all content
4. Black footer (`#07080D`) — "BUILD IN PUBLIC. OPERATE IN TRUTH." / "REDLANTERN STUDIOS · EST. 2015 · BY RED, LLC" / "PAGE X OF Y"

### Key colors:
- Command Black: `#07080D` — headers, footers, callouts
- Proof Red: `#D92532` — accents, section labels, H1 line 2
- Packet Cream: `#F7F2EE` — page body
- Lantern Gold: `#B9782A` — Halal suite cards only

### Logo:
- File: `/workspace/rls_logo_v2.png`
- Always embed as image. Never replace with text.
- Height: 52pt in header

### Output format:
- HTML first (self-contained, base64 logo embedded)
- **ALWAYS deliver PDF alongside HTML. No exceptions.**
- PDF via Chrome headless (user's machine) — EXACT COMMAND (do not omit any flag):
```
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless --disable-gpu \
  --print-to-pdf="OUTPUT.pdf" \
  --print-to-pdf-no-header \
  --no-margins \
  "file://INPUT.html"
```
⚠️ `--print-to-pdf-no-header` is REQUIRED — omitting it causes Chrome to inject its own date/title header over the brand header.
- PDF via WeasyPrint (Claude sandbox — Chrome not available):
  ```python
  import weasyprint
  weasyprint.HTML(filename='input.html').write_pdf('output.pdf')
  ```
  Install: `pip install weasyprint --break-system-packages`
- Save both HTML and PDF to workspace

### CRITICAL pagination CSS (WeasyPrint / print-correct):
```css
@page { size: 8.5in 11in; margin: 0; }
.page {
  width: 8.5in;
  height: 11in;      /* FIXED height — NOT min-height */
  overflow: hidden;  /* clips overflow, forces 1 div = 1 page */
  break-after: page;
}
.page:last-child { break-after: avoid; }
```
⚠️ `min-height` causes WeasyPrint to overflow content → 17 pages instead of 6. Always use `height` + `overflow:hidden`.

### Verified winning spec (June 13 2026 — Amina Build Plan v2):
- Header: 76pt, logo 46pt height, strap right-aligned
- Sash: 11pt diagonal stripe
- Body: padding 16pt 44pt 12pt, `#F7F2EE`
- Footer: 26pt, 3-column layout
- Body font: 8pt / 1.4 line-height
- Table font: 7.5pt, row padding: 4pt 7pt
- Available content per page: ~651pt
- Reference generator: `build_html_v2.py` (outputs/)

---

## DOCUMENT TYPES + WHEN TO USE

| Type | Pages | Audience | Template section |
|------|-------|----------|-----------------|
| Operating Update | 4–6 | Ro / team | Strategic Frame → Products → OS → Blockers |
| Product Brief | 2–3 | Investors / partners | Problem → Solution → Architecture → Status |
| Vendor Packet | 2 | Clients / contractors | Entity → Compliance → Scope → Contact |
| Sprint Report | 1–2 | Internal | Shipped → Blocked → Next |
| Handoff Doc | 1 | Agents / contractors | State → Decisions → Next action |

---

## ENFORCEMENT TRIGGER

When any agent is about to produce a document output:
1. Check: is this going to Ro or external parties? → YES → apply brand standard
2. Load template from `/workspace/.claude/brand/RLS_DOCUMENT_TEMPLATE.html`
3. Populate with content
4. Export HTML + PDF
5. Save to workspace

**Do not present plain markdown as a final deliverable.**

---

## FAILURE CONDITION

A document output FAILS brand review if:
- Logo is missing or replaced with text
- Background is plain white (not cream `#F7F2EE`)
- No diagonal sash
- No black footer with standard copy
- Colors deviate from the locked palette
- Output is plain markdown without HTML/PDF rendering
