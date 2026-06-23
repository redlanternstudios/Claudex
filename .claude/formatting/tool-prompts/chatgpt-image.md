# RLS ChatGPT Image Gen Formatting Prompt
# Paste before every image generation request requiring layout/UI context

---

## CANVAS DECLARATION (always state this first)
Start every image prompt with:
```
[CANVAS: {size}] [LAYOUT: {layout type}] [THEME: dark tech, precision brand]
```

| Purpose              | Canvas declaration              |
|----------------------|---------------------------------|
| Presentation slide   | [CANVAS: 1920x1080]             |
| Mobile app mockup    | [CANVAS: 390x844, portrait]     |
| Desktop app mockup   | [CANVAS: 1440x900]              |
| Social post square   | [CANVAS: 1080x1080]             |
| OG / header image    | [CANVAS: 1200x628]              |

## LAYOUT TYPES
| Layout              | Description                                          |
|---------------------|------------------------------------------------------|
| Single column       | Centered content, top-to-bottom hierarchy            |
| Sidebar + main      | Left panel 25% / Right content 75%                  |
| Split horizontal    | Left text 50% / Right visual 50%                    |
| Hero centered       | Large centered heading, small subtext, CTA below     |
| Card grid           | 2 or 3 columns of cards with equal spacing           |
| Full bleed          | Edge-to-edge image or graphic with overlay text      |

## SAFE ZONE INSTRUCTION
Always include:
```
Keep all text and critical UI elements at least 10% inset from canvas edges.
```

## COLOR BRIEF (include in every prompt)
```
Color scheme: near-black background #07080D, white text, subtle dark gray surfaces #111318, 
single red accent #D92532 for primary CTA or key label only. No other accent colors.
```

## TYPOGRAPHY BRIEF
```
Typography: clean sans-serif (Inter style), tight heading tracking, 
heading text large and high contrast white, body text medium gray, 
small labels in muted gray. No decorative or script fonts.
```

## FULL PROMPT TEMPLATE
```
[CANVAS: {size}] [LAYOUT: {layout type}] [THEME: dark tech, precision brand]

{Describe what the screen/image shows — components, content, visual elements}

Safe zone: all content 10% inset from canvas edges.
Color scheme: #07080D background, white text, #111318 surface, #D92532 single accent.
Typography: Inter-style sans-serif, large tight headings, medium gray body, small muted labels.
Style: clean, minimal, professional tech product. No decorative elements. No gradients unless subtle dark-to-transparent.
```

## EXAMPLE PROMPT (mobile app screen)
```
[CANVAS: 390x844, portrait] [LAYOUT: single column] [THEME: dark tech, precision brand]

A Muslim prayer app home screen showing: top status bar area, user greeting "Assalamu Alaikum, Ro", 
next prayer time card showing "Asr — 4:42 PM" in large bold white text with a progress bar, 
below it a 2x2 grid of feature cards (Quran, Duas, Qibla, Tasbih), 
bottom tab navigation with 5 icons.

Safe zone: all content 10% inset from canvas edges. Status bar and home indicator safe areas respected.
Color scheme: #07080D background, white text, #111318 surface cards, #D92532 accent on next prayer card.
Typography: Inter-style, "Asr" heading 36px bold, sub-text 14px gray.
Style: premium mobile app, dark mode, no decorative elements.
```

## ANTI-PATTERNS
- Do not request "colorful" or "vibrant" — brand is dark and precise
- Do not use gradients as a background — dark flat or dark-to-transparent only
- Do not describe "photorealistic UI" — describe elements and layout, not lighting effects
- Do not skip the canvas declaration — without it, proportions will be wrong
