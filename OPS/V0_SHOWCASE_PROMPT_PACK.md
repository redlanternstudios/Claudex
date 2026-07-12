# V0 SHOWCASE PROMPT PACK

Status: ACTIVE
Owner: Rory Semeah
Purpose: retrieval ready prompt pack for generating public showcase screens in v0

Use this pack with the standard v0 formatting prompt from `.claude/formatting/tool-prompts/v0.md` first.

## Retrieval order

1. Portfolio shell
2. ByRedLanternOS
3. SwarmClaw
4. The Lantern Daily
5. Amina
6. HireWire
7. Authentic Hadith
8. Ingram Micro
9. loanDepot

## Global rules for every prompt

1. Keep the visual tone premium, calm, and executive readable.
2. Use RedLantern branding where relevant.
3. Show measurable proof, not vague marketing.
4. Do not expose proprietary code, internal prompts, secrets, or exact logic.
5. Make every screen feel like a familiar business dashboard.
6. Prefer clean cards, clear labels, KPI chips, and short narrative captions.
7. Use logos when public and safe.
8. Build for screenshot use, not just interaction.

## Portfolio shell prompt

```text
Build a premium public portfolio landing page for Rory Semeah, AI Technical Product Manager, with RedLantern Studios branding.

Goal:
Create a first impression that feels like an executive dashboard, not a generic personal site.

Must include:
1. Hero with Rory name, role, and RedLantern Studios brand line.
2. Visible KPI cards with real delivery signals such as rollout count, countries reached, live products, and operational cleanup.
3. Claim register with when, where, type, and follow up.
4. Clear proof sections for ByRedLanternOS, SwarmClaw, The Lantern Daily, Amina, HireWire, Authentic Hadith, Ingram Micro, and loanDepot.
5. A screenshot strip area for product captures.
6. A clean IP boundary note so the page feels safe for employers.
7. A polished footer with website and LinkedIn contact.

Look and feel:
Minimal dark executive dashboard, warm RedLantern accents, tasteful emoji use only where it helps readability, and no clutter.
```

## ByRedLanternOS prompt

```text
Create a public proof page for ByRedLanternOS, the RedLantern multi tenant operations platform.

Show these screens:
1. Product overview dashboard
2. Workspace or operator home
3. A proof or workflow screen that shows the system is real

Must show:
1. Clear product title and one line summary
2. KPI cards for tenants, workflows, or active surfaces if available
3. Brand section with Next.js, Supabase, Vercel, OpenAI, Anthropic
4. One visible screenshot strip or three compact mock screenshots
5. A short note explaining that public proof is shown without exposing the moat

Tone:
Operational, premium, simple, and confident.
```

## SwarmClaw prompt

```text
Create a public showcase page for SwarmClaw, also described as QuietBuild OS, the RedLantern Build Team.

Show these screens:
1. Dispatch or intake board
2. Agent roster or lane overview
3. Receipted handoff or build coordination screen

Must represent SwarmClaw as:
1. A routing and coordination system
2. A team of agents with clear roles
3. A state keeper that reduces repeat work and keeps decisions clean

Must include a light agent roster with roles such as:
1. SwarmClaw
2. Claudex Bridge
3. Robby PA
4. Obsidian

Do not make it look like a toy chatbot or a generic AI demo.
```

## The Lantern Daily prompt

```text
Create a public publication page for The Lantern Daily.

Show these screens:
1. Editorial home
2. Article or update detail
3. Release note or studio note preview

Must feel like:
1. A clean studio publication
2. A reliable place for updates and proof
3. A public narrative layer that stays current

Include:
1. Date stamped story cards
2. Short issue summaries
3. A strong visual hierarchy with one hero article and supporting cards
```

## Amina prompt

```text
Create a premium public product showcase for Amina.

Show these screens:
1. Home dashboard
2. Companion conversation screen
3. Daily practice or journey screen

Must show:
1. Warm spiritual product tone
2. Clear mobile first layout
3. App Store ready polish
4. A visible companion presence
5. Gentle KPI or progress cards

Avoid:
1. Generic admin design
2. Cold enterprise styling
3. Visual clutter
```

## HireWire prompt

```text
Create a public showcase page for HireWire, the AI career product.

Show these screens:
1. Candidate or job matching dashboard
2. Resume optimization or confidence routing screen
3. Results or next step summary screen

Must show:
1. Matching logic at a high level without exposing implementation
2. A clean job seeker experience
3. Metrics or confidence indicators where appropriate
4. Strong trust and clarity in the layout

Tone:
Helpful, polished, career focused, and direct.
```

## Authentic Hadith prompt

```text
Create a public showcase page for Authentic Hadith.

Show these screens:
1. Content or learning home
2. Reading or study screen
3. Release or test flight proof screen

Must show:
1. Respectful, readable, trust first design
2. Proof that the app shipped through QA and release discipline
3. Clear boundaries between public proof and private content logic

Keep the page calm, credible, and easy to scan.
```

## Ingram Micro prompt

```text
Create a public enterprise delivery case study page for Ingram Micro.

Show these screens:
1. Rollout summary dashboard
2. Workflow automation proof screen
3. KPI or impact summary screen

Must show:
1. 60 country rollout story
2. OpenAI powered automation across 20 plus countries
3. Cross team delivery across SAP, Salesforce, billing, and operations
4. Enterprise level clarity without internal detail

Tone:
Boardroom ready, measurable, and restrained.
```

## loanDepot prompt

```text
Create a public operations recovery case study page for loanDepot.

Show these screens:
1. Support backlog or operations summary
2. Workflow redesign before and after view
3. SLA or resolution outcome screen

Must show:
1. Backlog reduction
2. Operational cleanup
3. Reliable support process improvement

Tone:
Plain, credible, and outcome focused.
```

## Retrieval note

If you only need one prompt for v0, use the portfolio shell first. If you need product screenshots, use the product prompt that matches the page you are building and capture three screens per product.
