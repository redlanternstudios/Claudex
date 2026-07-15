# REDLANTERN STUDIOS™ — TYPE SYSTEM
Version 1.0 | Locked 2026-06-28 | Owner: Ro
Status: ENFORCED — supplements BRAND_DOCUMENT_STANDARD.md (colors/anatomy unchanged)

---

## WHY THIS EXISTS

The old standard said "Helvetica Neue / Arial." That is a fallback, not a brand. A studio
selling AI software needs a typographic voice that reads as **built, technical, and grounded** —
not Canva-default sans, not literary serif. This file locks that voice.

Balance target for every RLS surface: **60% premium software studio · 25% cinematic RedLantern · 15% editorial warmth.**

---

## THE THREE TYPEFACES

| Role | Typeface | Why | Weights bundled |
|------|----------|-----|-----------------|
| **Display / Wordmark / H1** | **Space Grotesk** | Technical grotesque with quiet character. Heavy weight gives command without looking corporate. This is the studio's "voice." | 700 (Bold), 500 (Medium) |
| **Body / Subheads** | **Inter** | The software-studio standard (Vercel/Linear lineage). Neutral, premium, legible at small sizes. Carries trust. | 400, 600, 700 |
| **Labels / Eyebrows / Metadata / Stats labels / Footer** | **IBM Plex Mono** | The operational/technical signal. Mono uppercase = "this team ships." Does 80% of the "software studio" feel. | 400, 500, 600 |

All three are open-licence (OFL), embeddable, and render in WeasyPrint + browsers.
Files live in `.claude/brand/fonts/`. Never swap for system fonts in final artifacts.

**No serif display. No italics for emphasis. No decorative wordmark treatment.** Those caused the "poetry journal / gallery pamphlet" failure.

---

## TYPE SCALE (deck / landscape 1280×720)

| Element | Font | Size | Weight | Tracking | Case | Color |
|---------|------|------|--------|----------|------|-------|
| Cover wordmark | Space Grotesk | 104px | 700 | -3px | Mixed | White, ™ in red |
| H1 (interior) | Space Grotesk | 54px | 700 | -1px | Sentence | Ink `#1B1C24` |
| H1 secondary clause | Space Grotesk | 54px | 500 | -1px | Sentence | Gray `#6B727C` |
| Eyebrow / section label | IBM Plex Mono | 11px | 600 | 5px | UPPER | Red `#D92532` |
| Card name | Space Grotesk | 19px | 700 | -.3px | Mixed | Ink |
| Card label | IBM Plex Mono | 9.5px | 600 | 2px | UPPER | Red (gold for partner/early) |
| Body / lead | Inter | 13–15px | 400 | 0 | Sentence | Ink |
| Stat number | Space Grotesk | 44px | 700 | -1px | — | Ink (key stat in red) |
| Stat label | IBM Plex Mono | 10px | 500 | 2px | UPPER | Gray |
| Footer | IBM Plex Mono | 9px | 500 | 2.5px | UPPER | Gray, page no. red |

For portrait letter documents, scale display down ~40% (H1 ≈ 30–34px) but keep the same roles.

---

## HEADER / FOOTER LOCKUP (the "integrated" fix)

The logo is a full cinematic plate that **already contains the wordmark and ™**. Do not typeset
"RedLantern Studios" next to it — that is the redundancy that made it look pasted.

**Header rule:**
- Command-black bar `#07080D`, height ~88px.
- Real logo left, 58px tall, 52px left padding (breathing room = integration).
- Right: two-line IBM Plex Mono strap — section name (gray) over a red sub-line.
- A single **3px Proof-Red rule** under the bar. This replaces the busy diagonal sash for decks.
  (The diagonal sash stays valid for portrait documents; the solid red rule is the deck variant.)

**Footer rule:** black bar, 3-column mono — `BUILD IN PUBLIC. OPERATE IN TRUTH.` / `REDLANTERN STUDIOS · EST. 2015 · BY RED, LLC` / `PAGE X / Y` (page number in red). Min 9px — never microscopic.

---

## TRADEMARK USAGE

- Write the brand as **RedLantern Studios™** in body and titles (™, not ®).
- ™ asserts a common-law mark; do not imply federal registration unless/until filed.
- On the cover, ™ is set in Space Grotesk Medium, red, superscript.

---

## COVER PATTERN (cinematic, 25%)

Full `#07080D`, faint red radial glow lower-left (echoes the lantern), smaller gold glow upper-right.
Red vertical rule grounds the title block. Big Space Grotesk wordmark. Mono metadata top and bottom.
Interior slides return to the cream operating system. Entrance is cinematic; the body is operational.

---

## ANTI-PATTERNS (this revision killed these)

- Serif or italic display type → looked editorial/literary
- Delicate, low-weight wordmark → lost authority
- Logo dropped onto a flat bar with no framing → looked pasted
- A lone vertical line carrying the whole page → felt empty
- Microscopic 5.5px footer → looked like generated deck furniture

---

## REFERENCE ARTIFACT

`RedLantern_Alif_Deck_v3.pdf` + build file `.claude/brand/RLS_DECK_TEMPLATE_v3.html`.
Copy the template, swap content, keep the type roles. This is the approved studio-deck reference.
