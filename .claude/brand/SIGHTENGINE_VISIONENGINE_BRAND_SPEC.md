# RedLantern Studios — Brand Spec for SightEngine / VisionEngine
Version 1.0 · Locked 2026-06-29 · Owner: Ro
Status: ENFORCED — load before ANY UI / design / layout / deck / doc / asset task.

> This is the agent-facing brief. The full machine-readable tokens live in
> `.claude/brand/RLS_TEMPLATE_SPEC.json`. Editable deck template:
> `RedLantern_Studios_TEMPLATE.pptx`. Document/PDF standard:
> `.claude/brand/BRAND_DOCUMENT_STANDARD.md`. Type system: `.claude/brand/RLS_TYPE_SYSTEM.md`.

---

## WHO MUST USE THIS
SightEngine, VisionEngine, and any agent producing mockups, screens, slides, docs, or visual assets. No RLS visual artifact ships without passing the CTP at the bottom.

## THE 9 COLORS (never approximate, never add)
| Token | Hex | Use |
|---|---|---|
| Command Black | `#07080D` | Headers, footers, dark slides, callouts. Dominant dark. |
| Ink Black | `#1B1C24` | Body text on cream, table header rows. |
| Proof Red | `#D92532` | Accent only: eyebrows, labels, card top-edge, page numbers. |
| Packet Cream | `#F7F2EE` | Content background. |
| Cream Alt | `#ECE7E2` | Alt table rows, soft tiles. |
| Paper White | `#FFFFFF` | Cards. |
| Muted Gray | `#6B727C` | Secondary text, footer center. |
| Line Warm | `#DDD6CF` | Borders, dividers, table lines. |
| Lantern Gold | `#B9782A` | **Partner / Alif-Halal-suite ONLY.** Never a default accent. |

## THE 3 FONTS (embed in every export; no system-font fallback)
- **Space Grotesk** — wordmark, H1, section titles, stat numbers. Files: `SpaceGrotesk-Bold.ttf`, `-Medium.ttf`.
- **Inter** — body, subheads, card text. Files: `Inter-Regular/-SemiBold/-Bold.ttf`.
- **IBM Plex Mono** — eyebrows, labels, metadata, footer, stat labels. Files: `IBMPlexMono-Regular/-Medium/-SemiBold.ttf`.
- Dir: `.claude/brand/fonts/`. OFL, embeddable. **Never** Helvetica / Arial / Aptos in a final artifact.

## THE LOGO RULE (the #1 failure)
`rls_logo_v2.png` is a cinematic plate with a near-black background. It MUST sit on a `#07080D` bar or dark slide. **On cream/white it renders as a dark box.** Never typeset "RedLantern Studios" beside it — the plate already contains the wordmark + ™.

## LAYOUT DNA (deck 13.333×7.5in)
- Black header bar `0.92in` + logo (`0.5in` left, `~0.56in` tall) + right mono strap.
- **Diagonal sash** (`-45°` black/white repeating — the Virgil-Abloh motif): horizontal `0.17in` under the header on light/section slides; vertical `0.22in` down the left edge on cover/closing.
- Cream body, `0.5in` margins.
- Black footer `0.36in`: left `BUILD IN PUBLIC. OPERATE IN TRUTH.` / center `REDLANTERN STUDIOS™ · BY RED, LLC` / right page number in **Proof Red**.
- Titles **left-aligned**, Space Grotesk. Eyebrow above title in mono red.

## PPTX MASTERS (use, don't rebuild)
`RLS_COVER` · `RLS_SECTION` · `RLS_CONTENT` · `RLS_TWO_COLUMN` (red card vs gold card) · `RLS_CLOSING`. Open `RedLantern_Studios_TEMPLATE.pptx`, New Slide → pick a layout, fill placeholders.

## "AND BEYOND" (web/v0, Canva, Gamma, social)
Map the same tokens: black header, logo on black, cream body, red accent, gold partner-only, the 3 fonts, sash motif. Same DNA, different surface.

## DON'T
Logo on light · text logo substitutes · system fonts · serif/italic display · gold as general accent · hyphen-as-connector (RLS no-hyphen rule) · centered body/titles · footers < 8pt · decorative accent lines under titles (use whitespace).

## CTP — run before declaring done
1. Logo on a dark field (not a box on light).
2. Only the 9 colors + 3 fonts; fonts embedded.
3. Eyebrow = mono red; H1 = Space Grotesk, left; body = Inter.
4. Footer present, page number Proof Red, ≥ 8pt.
5. Gold only on partner/Alif.
6. No hyphen-as-connector; no system-font fallback visible.
