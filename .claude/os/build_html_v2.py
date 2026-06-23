"""
RLS PDF Generator v2
Fix: WeasyPrint needs @page sizing + height:11in overflow:hidden on .page divs
Each .page div = exactly one PDF page. Content calibrated to fit.
"""
with open('/sessions/eloquent-modest-volta/mnt/outputs/logo_b64.txt') as f:
    b64 = f.read().strip()

LOGO = f"data:image/png;base64,{b64}"
FL = "Build in Public. Operate in Truth."
TOTAL = 6

def hdr(strap):
    return f'''<div class="page-header">
    <img class="header-logo" src="{LOGO}" alt="RedLantern Studios">
    <div class="header-strap">{strap}</div>
  </div>
  <div class="sash"></div>'''

def ftr(label, n):
    return f'''<div class="page-footer">
    <div class="footer-left">{FL}</div>
    <div class="footer-center">RedLantern Studios &middot; Est. 2025 &middot; By Red, LLC</div>
    <div class="footer-right">{label} &middot; Page {n} of {TOTAL}</div>
  </div>'''

CSS = """
@page { size: 8.5in 11in; margin: 0; }
* { margin:0; padding:0; box-sizing:border-box; }
body { font-family:'Helvetica Neue',Arial,sans-serif; background:#F7F2EE; color:#1B1C24; font-size:8pt; line-height:1.4; }

.page {
  width: 8.5in; height: 11in; overflow: hidden;
  background: #F7F2EE;
  display: flex; flex-direction: column;
  break-after: page;
}
.page:last-child { break-after: avoid; }

.page-header {
  background:#07080D; width:100%; height:76pt;
  display:flex; align-items:center; justify-content:space-between;
  padding:0 36pt; flex-shrink:0;
}
.header-logo { height:46pt; width:auto; }
.header-strap { color:#FFF; font-size:7pt; font-weight:700; letter-spacing:2pt; text-transform:uppercase; text-align:right; }

.sash { width:100%; height:11pt; flex-shrink:0;
  background:repeating-linear-gradient(-45deg,#07080D 0px,#07080D 7px,#FFF 7px,#FFF 12px); }

.page-body { flex:1; padding:16pt 44pt 12pt; overflow:hidden; }

.page-footer {
  background:#07080D; width:100%; height:26pt;
  display:flex; align-items:center; justify-content:space-between;
  padding:0 36pt; flex-shrink:0;
}
.footer-left { color:#FFF; font-size:6pt; font-weight:700; letter-spacing:0.5pt; text-transform:uppercase; }
.footer-center { color:#6B727C; font-size:6pt; font-weight:600; letter-spacing:1pt; text-transform:uppercase; text-align:center; }
.footer-right { color:#6B727C; font-size:6pt; font-weight:600; letter-spacing:0.5pt; text-transform:uppercase; text-align:right; }

.eyebrow { color:#D92532; font-size:6.5pt; font-weight:700; letter-spacing:2pt; text-transform:uppercase; margin-bottom:4pt; }
.headline-black { font-size:22pt; font-weight:900; text-transform:uppercase; line-height:1.05; color:#1B1C24; }
.headline-red { font-size:22pt; font-weight:900; text-transform:uppercase; line-height:1.05; color:#D92532; margin-bottom:10pt; }
.section-label { color:#D92532; font-size:6.5pt; font-weight:700; letter-spacing:3pt; text-transform:uppercase;
  margin-top:12pt; margin-bottom:4pt; padding-bottom:3pt; border-bottom:0.75pt solid #D92532; }
.body-text { color:#1B1C24; font-size:8pt; line-height:1.5; margin-bottom:7pt; }
.sub-date { color:#6B727C; font-size:7pt; font-weight:600; letter-spacing:1pt; text-transform:uppercase; margin-bottom:10pt; }

.principle-strip { display:flex; width:100%; margin:10pt 0; }
.principle-cell { flex:1; background:#07080D; color:#FFF; font-size:6.5pt; font-weight:700;
  letter-spacing:1.5pt; text-transform:uppercase; padding:6pt 8pt; text-align:center; border-right:1pt solid #2a2b32; }
.principle-cell:last-child { border-right:none; }

.callout { background:#07080D; border-left:3.5pt solid #D92532; padding:9pt 14pt; margin:9pt 0; }
.callout-label { color:#D92532; font-size:6pt; font-weight:700; letter-spacing:2pt; text-transform:uppercase; margin-bottom:4pt; }
.callout-body { color:#DDD6CF; font-size:8pt; line-height:1.45; }
.callout-body strong { color:#FFF; }

.card-grid { display:grid; grid-template-columns:1fr 1fr; gap:9pt; margin:8pt 0; }
.card-grid-3 { display:grid; grid-template-columns:1fr 1fr 1fr; gap:8pt; margin:8pt 0; }
.card { background:#FFF; border:0.5pt solid #DDD6CF; border-top:2.5pt solid #D92532; padding:8pt 10pt; }
.card-gold { background:#FFF; border:0.5pt solid #DDD6CF; border-top:2.5pt solid #B9782A; padding:8pt 10pt; }
.card-label { color:#D92532; font-size:5.5pt; font-weight:700; letter-spacing:1.5pt; text-transform:uppercase; margin-bottom:2pt; }
.card-label-gold { color:#B9782A; font-size:5.5pt; font-weight:700; letter-spacing:1.5pt; text-transform:uppercase; margin-bottom:2pt; }
.card-title { font-size:9.5pt; font-weight:800; color:#1B1C24; margin-bottom:3pt; line-height:1.2; }
.card-body { font-size:7.5pt; color:#1B1C24; line-height:1.45; }
.card-divider { border:none; border-top:0.5pt solid #DDD6CF; margin:5pt 0; }

.spec-table { width:100%; border-collapse:collapse; margin:6pt 0; font-size:7.5pt; }
.spec-table th { background:#1B1C24; color:#FFF; font-size:6pt; font-weight:700; letter-spacing:1.5pt;
  text-transform:uppercase; padding:5pt 7pt; text-align:left; }
.spec-table tr:nth-child(even) { background:#ECE7E2; }
.spec-table tr:nth-child(odd) { background:#F7F2EE; }
.spec-table td { padding:4pt 7pt; vertical-align:top; border-bottom:0.5pt solid #DDD6CF; }
.spec-table td:first-child { color:#D92532; font-weight:700; font-size:7.5pt; }

.badge { display:inline-block; padding:1pt 4pt; border-radius:2pt; font-size:5.5pt; font-weight:700; letter-spacing:0.8pt; text-transform:uppercase; white-space:nowrap; }
.badge-live { background:#d4edda; color:#155724; }
.badge-active { background:#cce5ff; color:#004085; }
.badge-build { background:#e2d9f3; color:#4a2572; }
.badge-paused { background:#fff3cd; color:#856404; }
.badge-pending { background:#fde8d8; color:#8a3a00; }

.verified-strip { background:#1B1C24; border-left:3.5pt solid #22c55e; padding:8pt 12pt; margin:8pt 0; }
.verified-label { color:#22c55e; font-size:6pt; font-weight:700; letter-spacing:2pt; text-transform:uppercase; margin-bottom:3pt; }
.verified-body { color:#DDD6CF; font-size:7.5pt; line-height:1.45; }
.verified-body strong { color:#FFF; }

.stat-row { display:flex; gap:9pt; margin:10pt 0; }
.stat-cell { flex:1; background:#FFF; border:0.5pt solid #DDD6CF; border-top:2.5pt solid #D92532; padding:9pt 11pt; }
.stat-number { font-size:18pt; font-weight:900; color:#D92532; line-height:1; }
.stat-label { font-size:5.5pt; font-weight:700; letter-spacing:1.5pt; text-transform:uppercase; color:#6B727C; margin-top:2pt; }
.stat-desc { font-size:7pt; color:#1B1C24; margin-top:4pt; line-height:1.35; }
"""

# ── PAGE 1 COVER
p1 = f"""<div class="page">
  {hdr("Product Architecture &amp; Build Plan<br>June 2026 &middot; Confidential")}
  <div class="page-body">
    <div style="margin-top:10pt">
      <div class="eyebrow">Halal App Suite &middot; Build Plan &middot; Inshallah</div>
      <div class="headline-black">Amina &amp; The</div>
      <div class="headline-red">Halal App Suite</div>
      <div class="sub-date">Day 2 Architecture Brief &middot; June 13, 2026</div>
    </div>
    <div class="principle-strip">
      <div class="principle-cell">One Backbone</div>
      <div class="principle-cell">Multiple Products</div>
      <div class="principle-cell">Category-Defining</div>
      <div class="principle-cell">Template Out/Down</div>
    </div>
    <p class="body-text">This document defines the product architecture, data strategy, and build sequence for <strong>Amina</strong> &mdash; a category-defining iOS companion for Muslim women &mdash; and the full <strong>Halal App Suite</strong> built on a shared, verified Islamic knowledge backbone.</p>
    <p class="body-text"><strong>Authentic Hadith</strong> (authentichadith.app) is live in production with 36,246 hadiths, a working AI assistant, and an iOS submission awaiting App Store review. Every product in this suite templates down from that infrastructure. Users see standalone apps. We operate one machine.</p>
    <div class="callout">
      <div class="callout-label">Strategic Directive</div>
      <div class="callout-body">Amina is not a data problem. The data exists, is verified, and is live in production. Amina is a <strong>persona, UX, and product focus</strong> problem &mdash; built for Muslim women, powered by 14,444 sahih hadith from Bukhari and Muslim, plus Sunnah practices and the Quran. The backbone is shared. The experience is distinct. Nobody needs to know they share a spine.</div>
    </div>
    <div class="stat-row">
      <div class="stat-cell">
        <div class="stat-number">36,246</div>
        <div class="stat-label">Hadiths in Production</div>
        <div class="stat-desc">8 major collections live in Supabase. Authentic Hadith backend, active and healthy June 13, 2026.</div>
      </div>
      <div class="stat-cell">
        <div class="stat-number">14,444</div>
        <div class="stat-label">Sahih Hadiths for Amina</div>
        <div class="stat-desc">Bukhari (7,277) + Muslim (7,167). Verified via direct DB query. The most rigorously authenticated. Amina&apos;s knowledge layer.</div>
      </div>
      <div class="stat-cell">
        <div class="stat-number">8</div>
        <div class="stat-label">Apps in the Suite</div>
        <div class="stat-desc">Amina, Authentic Hadith, Quran Companion, RUSHD 99, and four more. All template-down from one backbone.</div>
      </div>
    </div>
  </div>
  {ftr("Cover", 1)}
</div>"""

# ── PAGE 2 PRODUCT VISION
p2 = f"""<div class="page">
  {hdr("Amina &middot; Product Vision<br>Halal App Suite &middot; 2026")}
  <div class="page-body">
    <div class="eyebrow">Product &middot; Amina</div>
    <div class="headline-black">Category-Defining iOS</div>
    <div class="headline-red">Companion for Muslim Women</div>
    <p class="body-text">The Muslim app market is dominated by Quran readers and prayer timers. What does not exist &mdash; at any meaningful quality level &mdash; is an AI companion that understands the lived experience of being a Muslim woman in 2026. Amina is that product. Not a fatwa bot. A companion grounded in authentic sources that meets you where you are.</p>
    <div class="section-label">The Category Gap</div>
    <div class="card-grid">
      <div class="card">
        <div class="card-label">What Exists</div>
        <div class="card-title">Quran Readers &amp; Prayer Timers</div>
        <div class="card-divider"></div>
        <div class="card-body">Muslim Pro, Athan, Quran.com dominate utility. High usage, low emotional depth. No AI companion. No journaling. No longitudinal spiritual memory. Nothing built specifically for Muslim women at this level.</div>
      </div>
      <div class="card">
        <div class="card-label">What Amina Is</div>
        <div class="card-title">AI Islamic Companion with Memory</div>
        <div class="card-divider"></div>
        <div class="card-body">Amina remembers your journey. She sources every religious claim from 14,444 verified hadith. She offers a daily reflection loop that builds habit. She speaks your language &mdash; not textbook Arabic, not generic wellness. A companion that knows you over time.</div>
      </div>
    </div>
    <div class="section-label">Core MVP &mdash; Three Things Done Flawlessly</div>
    <div class="card-grid-3">
      <div class="card">
        <div class="card-label">01 &middot; Core</div>
        <div class="card-title">Amina AI</div>
        <div class="card-divider"></div>
        <div class="card-body">Powered by 14,444 verified sahih hadith + Quran. Persona-consistent. Tone set at onboarding. Every religious claim cites its source. She does not issue fatwas &mdash; she surfaces sources and defers on fiqh.</div>
      </div>
      <div class="card">
        <div class="card-label">02 &middot; Habit Loop</div>
        <div class="card-title">Daily Reflection</div>
        <div class="card-divider"></div>
        <div class="card-body">One prompt per day, rooted in deen. 60-second commitment. User writes one thought, it saves. Streak tracking. The retention hook that drives daily opens and distinguishes Amina from a one-time app.</div>
      </div>
      <div class="card">
        <div class="card-label">03 &middot; Memory</div>
        <div class="card-title">Your Journey</div>
        <div class="card-divider"></div>
        <div class="card-body">Amina builds a longitudinal picture of the user&apos;s spiritual journey. Past reflections, conversations, sunnah tracked. Over time she feels like she knows you. No Islamic app does this today. The real differentiator at scale.</div>
      </div>
    </div>
    <div class="section-label">What Gets Cut at MVP</div>
    <p class="body-text">The Circle (community), article library, voice/attach input, and all decorative dead buttons are deferred. Community needs density &mdash; at zero users there is no community. Circle is Phase 2 minimum. Category-defining apps launch with depth on one thing, not breadth across five.</p>
    <div class="callout">
      <div class="callout-label">App Store Narrative</div>
      <div class="callout-body">&ldquo;Every response from Amina is grounded in <strong>14,444 verified hadith from Bukhari and Muslim</strong> and the Quran. Not an AI guessing about your deen. A companion that understands your journey.&rdquo; <strong>This is the sentence that earns trust in Muslim communities before anyone downloads it.</strong></div>
    </div>
  </div>
  {ftr("Product Vision", 2)}
</div>"""

# ── PAGE 3 DATA ARCHITECTURE
p3 = f"""<div class="page">
  {hdr("Data Architecture &middot; Verified<br>Halal App Suite &middot; 2026")}
  <div class="page-body">
    <div class="eyebrow">Architecture &middot; Data Backbone</div>
    <div class="headline-black">Shared Infrastructure.</div>
    <div class="headline-red">Invisible Seams.</div>
    <p class="body-text">The Authentic Hadith Supabase project is the master backbone. Every app in the Halal Suite templates down from it. Each app gets its own Supabase project seeded from a filtered export. The AI search pattern is the same across every product &mdash; only the data subset and persona change.</p>
    <div class="section-label">Verified Counts &mdash; Direct Supabase Query &middot; June 13, 2026</div>
    <div class="verified-strip">
      <div class="verified-label">&#10003; Verified via Direct Database Query</div>
      <div class="verified-body">
        <strong>Sahih al-Bukhari:</strong> 7,277 &nbsp;&middot;&nbsp; <strong>Sahih Muslim:</strong> 7,167 &nbsp;&middot;&nbsp; <strong>Sahih Corpus (Amina):</strong> 14,444<br>
        Nasai: 5,045 &nbsp;&middot;&nbsp; Abu Dawud: 3,751 &nbsp;&middot;&nbsp; Ibn Majah: 3,524 &nbsp;&middot;&nbsp; Tirmidhi: 3,241 &nbsp;&middot;&nbsp; Muwatta: 1,488 &nbsp;&middot;&nbsp; Musnad Ahmad: 393<br>
        <strong>Total in production: 36,246 hadiths.</strong> All with Arabic + English text and authenticity grading.
      </div>
    </div>
    <div class="section-label">Amina&apos;s Knowledge Layer</div>
    <table class="spec-table">
      <tr><th>Source</th><th>Contents</th><th>Status</th><th>Action</th></tr>
      <tr><td>Sahih al-Bukhari</td><td>7,277 hadiths &mdash; Arabic + English, graded</td><td><span class="badge badge-live">Live</span></td><td>Filtered export from master Supabase</td></tr>
      <tr><td>Sahih Muslim</td><td>7,167 hadiths &mdash; Arabic + English, graded</td><td><span class="badge badge-live">Live</span></td><td>Filtered export from master Supabase</td></tr>
      <tr><td>Sunnah Practices</td><td>365 daily sunnah, categorized</td><td><span class="badge badge-live">Live</span></td><td>Copy sunnah_practices + sunnah_categories</td></tr>
      <tr><td>Quran</td><td>6,236 ayahs &mdash; open source, Arabic + English</td><td><span class="badge badge-active">To Add</span></td><td>Seed into Amina Supabase (confirm if in master first)</td></tr>
    </table>
    <div class="section-label">Schema Inherited from Backbone</div>
    <table class="spec-table">
      <tr><th>Table</th><th>Purpose</th><th>Action</th></tr>
      <tr><td>hadiths</td><td>Core knowledge &mdash; 14,444 sahih rows</td><td>Filtered export (Bukhari + Muslim only)</td></tr>
      <tr><td>sunnah_practices + sunnah_categories</td><td>Daily sunnah habit loop content</td><td>Copy directly</td></tr>
      <tr><td>reflections</td><td>Daily reflection journal entries</td><td>Copy schema</td></tr>
      <tr><td>user_streaks</td><td>Streak tracking for retention loop</td><td>Copy schema</td></tr>
      <tr><td>profiles</td><td>User identity, preferences, onboarding state</td><td>Copy + extend for Amina persona fields</td></tr>
      <tr><td>ai_usage</td><td>AI call tracking, quota enforcement</td><td>Copy + add Islamic scope guardrail fields</td></tr>
    </table>
    <div class="section-label">AI Architecture</div>
    <p class="body-text">The Authentic Hadith AI assistant (GPT-4o-mini with hadith search tool) is the proven pattern Amina copies. At query time, semantic search retrieves the top N relevant hadiths, injected into Amina&apos;s system prompt with her persona. Three Islamic scope guardrails: (1) No fatwas &mdash; surface sources, defer to scholars on fiqh. (2) Every religious claim must trace to corpus or Amina states no source. (3) Query classification &mdash; personal support mode vs. knowledge mode, different response styles.</p>
  </div>
  {ftr("Data Architecture", 3)}
</div>"""

# ── PAGE 4 BUILD PLAN
p4 = f"""<div class="page">
  {hdr("Amina &middot; Build Plan &middot; Day 2<br>Dead Buttons &amp; Backend Wiring")}
  <div class="page-body">
    <div class="eyebrow">Execution &middot; Amina Build</div>
    <div class="headline-black">What Exists.</div>
    <div class="headline-red">What Ships Next.</div>
    <p class="body-text">The Amina frontend is built: Next.js + Tailwind, full onboarding, chat, home, guidance, reflections, circle, and profile. The iOS wrapper follows the same WebView + Expo pattern Keymon already shipped for Authentic Hadith. Remaining work: fix dead button regressions, seed the backend, wire AI to the knowledge layer.</p>
    <div class="section-label">Dead Button Audit &mdash; Priority Order</div>
    <table class="spec-table">
      <tr><th>Page</th><th>Issue</th><th>Priority</th><th>Fix</th></tr>
      <tr><td>Home + Guidance</td><td>Hamburger menu regressed &mdash; AppHeader not rendering. Sidebar cannot open.</td><td><span class="badge badge-build">P0</span></td><td>Restore AppHeader in both pages</td></tr>
      <tr><td>Guidance</td><td>&ldquo;Read Article&rdquo; is dead. Core content CTA does nothing.</td><td><span class="badge badge-build">P0</span></td><td>Wire to article route or modal</td></tr>
      <tr><td>Circle</td><td>Post submit has no onSubmit handler. Posts cannot be created.</td><td><span class="badge badge-build">P0</span></td><td>Wire to Supabase insert</td></tr>
      <tr><td>Marketing</td><td>Waitlist form has no submit handler. No leads captured.</td><td><span class="badge badge-active">P1</span></td><td>Add handler &rarr; Supabase or email capture</td></tr>
      <tr><td>Auth</td><td>/terms and /privacy routes do not exist.</td><td><span class="badge badge-active">P1</span></td><td>Create stub pages or external links</td></tr>
      <tr><td>All pages</td><td>Attach / Voice / Suggestions / Notifications &mdash; decorative dead.</td><td><span class="badge badge-paused">P2</span></td><td>Remove or visually disable before launch</td></tr>
    </table>
    <div class="section-label">Backend Wiring &mdash; Three Parallel Tracks</div>
    <div class="card-grid-3">
      <div class="card">
        <div class="card-label">Track 1 &middot; Data</div>
        <div class="card-title">Seed Amina Supabase</div>
        <div class="card-divider"></div>
        <div class="card-body">Create new Supabase project. Export Bukhari + Muslim (14,444 rows). Copy sunnah, reflections, streaks, profiles schema. Seed Quran open-source data. Configure RLS to match Authentic Hadith patterns.</div>
      </div>
      <div class="card">
        <div class="card-label">Track 2 &middot; AI</div>
        <div class="card-title">Wire Knowledge Layer</div>
        <div class="card-divider"></div>
        <div class="card-body">Copy Authentic Hadith /api/chat pattern. Point at Amina&apos;s hadith table. Update system prompt: Amina persona + tone + 3 Islamic scope guardrails. Test citation accuracy and fiqh deferral across 10 queries.</div>
      </div>
      <div class="card">
        <div class="card-label">Track 3 &middot; iOS</div>
        <div class="card-title">WebView Wrapper</div>
        <div class="card-divider"></div>
        <div class="card-body">Same Expo + WebView pattern Keymon used for Authentic Hadith. Wrap deployed Amina web app. Add RevenueCat for native IAP. Configure EAS build + GitHub Actions CI/CD. Submit to App Store.</div>
      </div>
    </div>
    <div class="callout">
      <div class="callout-label">iOS Context</div>
      <div class="callout-body">Keymon&apos;s current iOS submission is <strong>Authentic Hadith</strong> &mdash; <strong>awaiting App Store review.</strong> Amina is a separate submission using the identical wrapper pattern. Once Authentic Hadith clears, Amina&apos;s submission process is fully de-risked and known.</div>
    </div>
  </div>
  {ftr("Build Plan", 4)}
</div>"""

# ── PAGE 5 SUITE ROADMAP
p5 = f"""<div class="page">
  {hdr("Halal App Suite &middot; Full Roadmap<br>2026 Build Sequence")}
  <div class="page-body">
    <div class="eyebrow">Portfolio &middot; Halal App Suite</div>
    <div class="headline-black">One Backbone.</div>
    <div class="headline-red">Eight Products.</div>
    <p class="body-text">Every app templates down from the Authentic Hadith infrastructure. The data exists. The AI pattern is proven in production. The iOS wrapper is known. Each new product is a filtered data export, a specific UX, and a distinct App Store listing. Users see standalone products. We operate one machine.</p>
    <div class="section-label">Suite Overview</div>
    <table class="spec-table">
      <tr><th>App</th><th>Audience</th><th>Knowledge Layer</th><th>Key Feature</th><th>Status</th></tr>
      <tr><td>Authentic Hadith</td><td>Anyone</td><td>All 36,246 &mdash; 8 collections</td><td>AI scholar + learning paths + gamification</td><td><span class="badge badge-live">Live &middot; iOS Pending</span></td></tr>
      <tr><td>Amina</td><td>Muslim women</td><td>14,444 Bukhari + Muslim + Sunnah + Quran</td><td>AI companion + daily reflection + journey memory</td><td><span class="badge badge-build">Active Build</span></td></tr>
      <tr><td>Quran Companion</td><td>Daily Quran practice</td><td>Quran (6,236 ayahs) + supporting hadith</td><td>Daily ayah + memorization + reflection</td><td><span class="badge badge-active">Next After Amina</span></td></tr>
      <tr><td>RUSHD 99</td><td>Names of Allah study</td><td>99 Names + Quran refs + hadith</td><td>Name-by-name study with daily dua + practice</td><td><span class="badge badge-active">Queued</span></td></tr>
      <tr><td>University of Janna</td><td>Children + families</td><td>Prophets, Sahaba, Quran stories</td><td>Islamic children&apos;s books + ebooks</td><td><span class="badge badge-paused">Q4 2026</span></td></tr>
      <tr><td>Unauthentic Hadith</td><td>Education</td><td>Fabricated + weak hadith corpus</td><td>Learn to identify inauthentic narrations</td><td><span class="badge badge-paused">Q4 2026</span></td></tr>
      <tr><td>Deixis Digital Gallery</td><td>Islamic art + culture</td><td>Bilal&apos;s product (details TBD)</td><td>Digital gallery experience</td><td><span class="badge badge-paused">Bilal-Led</span></td></tr>
    </table>
    <div class="section-label">2026 Build Sequence</div>
    <div class="card-grid">
      <div class="card-gold">
        <div class="card-label-gold">Q3 2026 &middot; Now</div>
        <div class="card-title">Amina MVP &rarr; Quran Companion</div>
        <div class="card-divider"></div>
        <div class="card-body">Fix P0 dead buttons &rarr; Seed Amina Supabase &rarr; Wire AI knowledge layer &rarr; iOS WebView wrapper &rarr; App Store submission. Proves the template-down model end to end. Quran Companion follows immediately &mdash; same pattern, Quran-primary knowledge layer, new UX. Fast to ship because every system is already proven.</div>
      </div>
      <div class="card-gold">
        <div class="card-label-gold">Q3&ndash;Q4 2026</div>
        <div class="card-title">RUSHD 99 &rarr; Suite + Alif</div>
        <div class="card-divider"></div>
        <div class="card-body">RUSHD 99: 99 Names + Quran refs + relevant hadith. Daily name study with dua. Short sessions, deep impact. Then University of Janna, Unauthentic Hadith, Deixis Gallery. <strong>Alif submission:</strong> portfolio company &mdash; 5+ live products, shared infrastructure, $341B Islamic consumer market.</div>
      </div>
    </div>
  </div>
  {ftr("Suite Roadmap", 5)}
</div>"""

# ── PAGE 6 NEXT ACTIONS
p6 = f"""<div class="page">
  {hdr("Next Actions &middot; Day 2<br>Amina Build &middot; June 13, 2026")}
  <div class="page-body">
    <div class="eyebrow">Execution &middot; Immediate Next Moves</div>
    <div class="headline-black">Strategy Locked.</div>
    <div class="headline-red">What Moves Now.</div>
    <p class="body-text">Three parallel tracks. Frontend fixes are Keymon&apos;s track &mdash; P0 items unblock shippability. Backend and AI tracks can run in parallel once the Supabase project is created.</p>
    <div class="section-label">Track 1 &mdash; Frontend (Keymon)</div>
    <table class="spec-table">
      <tr><th>#</th><th>Action</th><th>Priority</th></tr>
      <tr><td>1</td><td>Restore AppHeader in Home and Guidance &mdash; hamburger regression. Sidebar must open from both pages.</td><td><span class="badge badge-build">P0 &middot; Now</span></td></tr>
      <tr><td>2</td><td>Wire Guidance &ldquo;Read Article&rdquo; to article content (route or modal)</td><td><span class="badge badge-build">P0 &middot; Now</span></td></tr>
      <tr><td>3</td><td>Wire Circle post submit to Supabase insert with proper onSubmit handler</td><td><span class="badge badge-build">P0 &middot; Now</span></td></tr>
      <tr><td>4</td><td>Add onSubmit to marketing waitlist &rarr; Supabase or email capture. Create /terms + /privacy stubs.</td><td><span class="badge badge-active">P1</span></td></tr>
      <tr><td>5</td><td>Remove or visually disable decorative dead UI (attach / voice / suggestions / notifications)</td><td><span class="badge badge-paused">P2</span></td></tr>
    </table>
    <div class="section-label">Track 2 &mdash; Backend + AI (Ro / Claude)</div>
    <table class="spec-table">
      <tr><th>#</th><th>Action</th><th>Notes</th></tr>
      <tr><td>1</td><td>Create new Supabase project: Amina</td><td>Separate from Authentic Hadith master</td></tr>
      <tr><td>2</td><td>Export Bukhari + Muslim rows (WHERE collection IN (&apos;sahih-bukhari&apos;,&apos;sahih-muslim&apos;))</td><td>14,444 rows &mdash; verified count</td></tr>
      <tr><td>3</td><td>Seed Amina Supabase: hadiths + sunnah + reflections + streaks + profiles. Configure RLS.</td><td>Run migrations in order</td></tr>
      <tr><td>4</td><td>Copy Authentic Hadith /api/chat pattern into Amina. Update system prompt: persona + tone + 3 guardrails.</td><td>Test: citations, fiqh deferral, persona consistency</td></tr>
      <tr><td>5</td><td>Wire daily reflection prompt + streak logic. Seed Quran data (confirm if in master first).</td><td>Open question &mdash; run query before step</td></tr>
    </table>
    <div class="callout">
      <div class="callout-label">One Open Question &mdash; Resolve Before Track 2 Step 5</div>
      <div class="callout-body">Is there already a Quran table in the Authentic Hadith Supabase? <strong>Run the query now to confirm.</strong> If yes: export it alongside the hadiths. If no: source from open-source corpus (fawazahmed0/quran-api) and seed fresh. This is the only remaining ambiguity in the backend track.</div>
    </div>
    <div class="principle-strip">
      <div class="principle-cell">Data: Verified</div>
      <div class="principle-cell">Pattern: Proven</div>
      <div class="principle-cell">iOS: Known</div>
      <div class="principle-cell">Inshallah &mdash; Ship It</div>
    </div>
  </div>
  {ftr("Next Actions", 6)}
</div>"""

html = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Amina &amp; Halal App Suite &mdash; Build Plan &middot; RedLantern Studios</title>
<style>{CSS}</style>
</head>
<body>
{p1}
{p2}
{p3}
{p4}
{p5}
{p6}
</body>
</html>"""

out = '/sessions/eloquent-modest-volta/mnt/outputs/amina_build_plan_v2.html'
with open(out, 'w') as f:
    f.write(html)
print(f"Written: {len(html):,} chars to {out}")
