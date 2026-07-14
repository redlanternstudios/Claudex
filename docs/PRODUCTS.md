# PRODUCTS — RedLantern Studios registry

Version 1.0 · 2026-07-02 · Pointers only. Product code lives in product repos, not here.
Live state is in `OPS/BRIDGE.json` (`products` block). This is the durable registry; the bridge is the moving state.

North star: one founder + AI army = enterprise output. Amina is the dogfood proving the OS (QuietBuild).

---

| Product | Status | Class | Repo | Supabase | Notes |
|---|---|---|---|---|---|
| **Amina** | ACTIVE (dogfood) | PROTOTYPE→PLAYBOOK | `redlanternstudios/Amina`, local `amina/` | `endovljmaudnxdzdapmf` | Muslima companion. Proving QuietBuild OS. Stripe price IDs set. |
| **Authentic Hadith** | IN REVIEW (App Store) | PROTOTYPE | `authentic-hadith/` | Quran seeded | Human scholarly sign-off REQUIRED before any content ships. |
| **TradeSwarm** | ACTIVE (constrained) | PROTOTYPE | `~/Desktop/TradeSwarm-repo/` (outside workspace) | `rnvaagbvribokkhuutznc` | Halal capital war room. Schema drift — /repo-ingest before build. Needs Polygon.io. |
| **ByRed Daily OS** | ACTIVE | PROTOTYPE | `redlanternstudios/ByRedLLC-Daily-OS` | `mlmrdkiyxlngmwhdtrln` | Internal OS. Build-resilience fix in progress. |
| **The Lantern Daily** | ACTIVE | PROTOTYPE | `the-lantern/` | — | Muslim tech newsletter. Scope locked, Stripe live. Ummah-first: Ro not personally featured. |
| **Footprint** | ACTIVE PREVIEW | PROTOTYPE | `redlanternstudios/footprint.`, local `footprint/` | UNKNOWN | Community opportunity network and proof bridge. SwarmClaw preflight is required before implementation. |
| **Deixis** | ACTIVE | PROTOTYPE | `deixis/` | Shopify-headless + Supabase | Bilal's consignment art store. Prodigi fulfilment. Domain creds outstanding. |
| **Mission Esthetics** | LIVE | SHIPPED | external | none (GlossGenius) | Alex's waxing studio site. www.missionesthetics.com. Maintenance only. |
| **HireWire** | PAUSED | CONCEPT | GitHub HireWire | `endovljmaudnxdzdapmf` (confirm) | AI Career OS. Firebreak — do not build until QuietBuild proven. Governance engine canonical, ContextEngine frozen. |

Portfolio grouping: **Halal Software Suite** (8-product Islamic tech portfolio, Ro + Bilal, Alif accelerator track). See memory `project_halal_suite`.

---

## CLASSIFICATION LADDER (from BUILD_CONSTITUTION)

`CONCEPT → PROTOTYPE → DOCUMENTED OPERATOR PLAYBOOK → PRODUCT-READY`

Nothing is PRODUCT-READY without: truth-aligned inputs, explicit entities + states, safe execution boundaries, review controls, durable receipts, failure handling, scope limits, clear ownership. Do not label up the ladder without evidence.

---

## SCALING NOTE

Each product entry here is a pointer. When a product graduates:
1. Confirm its repo + Supabase ref, add an `AGENTS.md` pointer file in its own repo.
2. Add/refresh its entry in `OPS/BRIDGE.json` `products` block (lane, sync color, next action).
3. If it needs isolation (payments/PII at volume), split it to its own Supabase project and log the decision.
New products inherit the whole OS (bridge, CTP, constitution, brand) by pointing back to Claudex — they do not re-invent it.

## CONSUMER CONNECTION STATE

Machine readable connection receipts live in `OPS/CONSUMERS.json`.

Connected: Amina, Daily OS, HireWire, TradeSwarm, Authentic Hadith, The Lantern, Footprint, Deixis.

Missing locally: none.

External and not applicable: Mission Esthetics.

Unregistered local repository: RedLantern marketing website. Do not assign a product key until Ro registers it.

Deixis warning: consumer state is committed locally, but the repository has no configured Git remote.
