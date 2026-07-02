# Amina Dashboard — v0 Prompt (Fused)
# RLS Formatting Constitution + Amina Color Override
# Generated: 2026-06-27

---

## PROMPT (paste this into v0)

```
You are building a production-quality mobile-first home dashboard for Amina — a Muslim women's spiritual wellness, reflection, and sisterhood app.

FRAMEWORK:
- Next.js 14+ App Router
- Tailwind CSS v3 (utility-first only, no inline styles)
- shadcn/ui primitives (Button, Card, Input, Badge, Avatar)
- TypeScript strict mode
- Single file, default export, no required props

VIEWPORT (mobile-first, non-negotiable):
- Base: 375px minimum
- All layout starts at 375px. Breakpoints enhance, never fix.
- Safe areas mandatory: pb-[calc(80px+env(safe-area-inset-bottom))] for bottom nav clearance
- Minimum tap target: 44x44px (min-h-[44px] min-w-[44px])

COLOR SYSTEM — AMINA (overrides all RLS dark defaults):
bg-[#FAF7F2]         ← page background (warm cream)
bg-[#F0EBE3]         ← surface/card background
bg-[#E8DDD0]         ← surface alt / subtle inset
border-[#DDD5C8]     ← borders
text-[#1C1917]       ← text primary
text-[#78716C]       ← text secondary
text-[#A8A29E]       ← text muted
bg-[#C5707A]         ← accent rose/clay (primary)
hover:bg-[#B35C66]   ← accent hover
bg-[#8B9E8B]         ← accent sage (secondary)
bg-[#C4A265]         ← accent gold (moon/spiritual)
bg-[#F2E8E8]         ← blush tint for hero cards
text-[#C5707A]       ← accent text

TYPOGRAPHY:
- Brand wordmark: font-serif italic text-[#1C1917]
- Headings: font-semibold text-[#1C1917] tracking-tight
- Body: text-base text-[#1C1917]
- Secondary: text-sm text-[#78716C]
- Caption: text-xs text-[#A8A29E]
- No text below 12px

CARD PATTERN:
<div className="bg-[#F0EBE3] border border-[#DDD5C8] rounded-2xl p-4 sm:p-5 shadow-sm">
  {/* content */}
</div>

BUTTON PATTERNS:
// Primary CTA
<button className="bg-[#C5707A] hover:bg-[#B35C66] text-white font-semibold px-6 py-3 rounded-xl transition-colors min-h-[44px]">
  Action
</button>
// Chip/pill
<button className="bg-[#F0EBE3] border border-[#DDD5C8] text-[#1C1917] text-sm font-medium px-4 py-2 rounded-full transition-colors min-h-[44px] flex items-center gap-2">
  Label
</button>

INPUT PATTERN:
<input className="w-full bg-[#F0EBE3] border border-[#DDD5C8] focus:border-[#C5707A] text-[#1C1917] placeholder:text-[#A8A29E] rounded-full px-5 py-3 text-base outline-none transition-colors" />

BOTTOM NAV:
<nav className="fixed bottom-0 left-0 right-0 bg-[#FAF7F2] border-t border-[#DDD5C8] pb-[env(safe-area-inset-bottom)] z-50">
  <div className="flex items-center justify-around h-16">
    {/* 5 tabs */}
  </div>
</nav>

ANTI-PATTERNS (never):
- No dark backgrounds (#07080D, gray-800, gray-900, black)
- No white (#FFFFFF) backgrounds — use cream tokens only
- No unreadable Arabic text, no calligraphy, no pseudo-Arabic
- No clipped cards behind bottom nav — use pb-[calc(80px+env(safe-area-inset-bottom))]
- No placeholder gray boxes for the character — use an SVG silhouette or styled emoji
- No generic admin dashboard feel
- No tap targets below 44px
- No horizontal scroll
- No emojis in navigation icons — use lucide-react line icons

---

BUILD THIS PAGE:

Amina Home Dashboard — single-screen mobile view, full-height, scrollable, warm spiritual premium feel.

LAYOUT WRAPPER:
<div className="min-h-screen bg-[#FAF7F2]">
  <main className="max-w-md mx-auto px-4 pt-4 pb-[calc(80px+env(safe-area-inset-bottom))] space-y-4">
    {/* all sections go here */}
  </main>
  {/* bottom nav */}
</div>

SECTION 1 — TOP BAR:
Minimal header: left hamburger Menu icon (lucide), center "Amina" in font-serif italic text-xl text-[#1C1917], right Bell icon with a small rose dot indicator.
No heavy shadows. bg-[#FAF7F2] sticky top-0 z-40 py-3.

SECTION 2 — HERO WELCOME CARD:
Full-width card, bg-[#F2E8E8] (blush), rounded-2xl, p-5.
Left column (flex-1):
  - "Assalamu alaykum, Sister" — text-xs text-[#C5707A] font-medium uppercase tracking-wide
  - "What would you like to reflect on today?" — text-xl font-semibold text-[#1C1917] leading-snug
  - Small line: "A gentle space to return to yourself and Allah." — text-xs text-[#78716C] mt-1
  - mt-4: rose CTA button "Begin Reflecting" full-width sm:w-auto
Right column (w-24 shrink-0):
  IMPORTANT: Do NOT use an img tag or broken image box.
  Instead render a styled SVG or emoji-based character placeholder:
  <div className="w-20 h-24 bg-[#F0E0E2] rounded-2xl flex items-end justify-center overflow-hidden border border-[#DDD5C8]">
    <span className="text-5xl pb-1">🧕</span>
  </div>
  Above it, add a soft gold crescent: ☽ in text-[#C4A265] text-lg absolute top-2 right-3.

SECTION 3 — QUICK INTENTION CHIPS:
"What calls to you?" label — text-sm font-medium text-[#78716C] mb-2.
Horizontal scroll row (overflow-x-auto, no scrollbar, flex gap-2 pb-1):
4 pill chips:
  - 🌿 Reflect
  - 🔦 Guidance  
  - 📖 Learn
  - 🌱 Grow
Each: bg-[#F0EBE3] border border-[#DDD5C8] rounded-full px-4 py-2 text-sm text-[#1C1917] min-h-[44px] flex items-center gap-2 whitespace-nowrap shrink-0.
Active state (first chip): bg-[#C5707A] text-white border-[#C5707A].

SECTION 4 — DAILY PRACTICE CARD:
Card (bg-[#F0EBE3] border border-[#DDD5C8] rounded-2xl p-4):
Row: left icon (🌙 in w-10 h-10 bg-[#F2E8E8] rounded-xl flex items-center justify-center text-xl) + right content:
  - "Daily Practice" — text-sm font-semibold text-[#1C1917]
  - "Begin your streak" — text-xs text-[#78716C]
  - 7 dots below: w-2 h-2 rounded-full — first 3 bg-[#C5707A], rest bg-[#DDD5C8], flex gap-1 mt-2
  - "Start today →" text-xs text-[#C5707A] font-medium mt-2

SECTION 5 — AMINA COMPANION CARD (emotional center):
Card (bg-[#F0EBE3] border border-[#DDD5C8] rounded-2xl p-4):
Header row: small rose avatar circle (w-8 h-8 bg-[#C5707A] rounded-full flex items-center justify-center text-white text-sm font-bold "A") + "Amina" text-sm font-semibold text-[#1C1917] + "Here with you" pill (bg-[#F0E8E8] text-[#C5707A] text-xs px-2 py-0.5 rounded-full) + ml-auto.
Subtitle: "Your companion for faith, reflection, and growth" — text-xs text-[#78716C] mt-0.5.
Divider: border-t border-[#DDD5C8] my-3.
Message bubble: bg-[#FAF7F2] rounded-2xl rounded-tl-none p-3 text-sm text-[#1C1917] leading-relaxed:
  "Salam, Sister 🌸
   I'm so happy you're here.
   What's on your heart today?"
Input row (mt-3): rounded-full input (placeholder "Share what's on your heart…") + rose circular send button (w-9 h-9 bg-[#C5707A] rounded-full flex items-center justify-center).
Add Paperclip and Mic icons inside the input on the left (text-[#A8A29E]).

SECTION 6 — CONTINUE YOUR JOURNEY:
"Continue Your Journey" — text-base font-semibold text-[#1C1917] mb-3.
3 horizontal scroll cards (overflow-x-auto, flex gap-3, pb-2, no scrollbar):
  Card 1: "Finding Peace in Uncertainty" / "A short reflection for anxious moments" / "4 min" / icon: 🕊️
  Card 2: "Building a Stronger Connection with Allah" / "Gentle prompts for spiritual closeness" / "6 min" / icon: 🌿
  Card 3: "Letting Go & Trusting Allah" / "Release what you cannot control" / "5 min" / icon: 🌊
Each card: w-52 shrink-0 bg-[#F0EBE3] border border-[#DDD5C8] rounded-2xl p-4.
Icon in w-9 h-9 bg-[#F2E8E8] rounded-xl flex items-center justify-center text-xl.
Title: text-sm font-semibold text-[#1C1917] mt-3 line-clamp-2.
Desc: text-xs text-[#78716C] mt-1 line-clamp-2.
Time badge: bg-[#F0EBE3] border border-[#DDD5C8] text-[#A8A29E] text-xs px-2 py-0.5 rounded-full mt-3 inline-flex.

SECTION 7 — BOTTOM NAV:
5 tabs using lucide-react icons (Home, Users2, BookOpen, HandHeart, User).
Active tab (Home): icon + label text-[#C5707A]. Inactive: text-[#A8A29E].
Label: text-[10px] mt-0.5.
Each tab: flex flex-col items-center justify-center flex-1 h-full min-h-[44px] gap-0.5.

OUTPUT RULES:
1. Single TSX file, default export AminaDashboard.
2. No required props.
3. Complete and runnable — no placeholder comments.
4. Import lucide-react icons at top.
5. Mobile-first, max-w-md centered.
6. No content clipped behind bottom nav.
7. The overall feel: warm, calm, premium, spiritually grounded, App Store ready.
```
