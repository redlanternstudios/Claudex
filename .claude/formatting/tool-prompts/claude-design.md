# RLS Claude Design Formatting Prompt
# Paste before any Claude Design session or as DESIGN.md in project root

---

## VISUAL THEME & ATMOSPHERE
Dark, precise, disciplined. No decorative clutter. Every element earns its place.
Aesthetic: Controlled power. Cinematic dark. Intelligence over ornament.
Feeling: Premium tech product. Trusted. Focused.

## COLOR PALETTE
- Background: #07080D (near-black)
- Surface elevated: #111318
- Surface alt: #1A1D24
- Border: #2A2D35
- Text primary: #FFFFFF
- Text secondary: #9CA3AF
- Accent: #D92532 (red — use sparingly, only for CTAs and critical emphasis)
- Light surface (docs/marketing): #F7F2EE

## TYPOGRAPHY
- Font: Inter (system-ui fallback)
- Scale: 12 / 14 / 16 / 18 / 20 / 24 / 30 / 36 / 48 / 60 / 72px
- Body: 16px / 24px line-height / 400 weight
- Headings: 700–900 weight, tight tracking (-0.02em to -0.05em)
- Never below 12px. Never body above 20px.

## LAYOUT & VIEWPORT
- Mobile-first. Base: 375px.
- Breakpoints: 640 / 768 / 1024 / 1280px
- Container: max 1280px centered, 16px padding mobile → 32px desktop
- 12-column grid. 24px gutters.
- Section spacing: 48px mobile / 96px desktop

## COMPONENT STYLE
- Cards: rounded-xl, 1px border (#2A2D35), subtle shadow
- Buttons: rounded-lg, 44px min height, full-width on mobile
- Inputs: rounded-lg, focus ring red, dark background
- Navigation: sidebar 256px desktop / bottom tab bar mobile
- Modals: centered desktop / bottom sheet mobile

## SPACING
4px base unit. Scale: 4/8/12/16/24/32/48/64/96px
All spacing is a multiple of 4. No arbitrary values.

## FIXED CANVAS (if generating mockups)
- App desktop: 1440×900px
- App mobile: 390×844px
- Presentation: 1920×1080px
- Safe zone: 10% inset from edges

## BRAND VOICE (visual tone)
- Precision over decoration
- Negative space is intentional — let it breathe
- Red accent is a signal, not wallpaper — max 1 per section
- Typography does the heavy lifting
- No gradients unless cinema-grade dark-to-transparent

## ANTI-PATTERNS
- No white backgrounds on app screens
- No light mode default
- No decorative blobs or random gradients
- No mixed font families
- No under-12px text
- No mobile horizontal scroll
