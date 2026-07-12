# TODAY.md — RedLantern Daily Command Center
> Update at session start. This file is the single source of current intent.
> No agent may start work without reading this file first.

---

## DATE
2026-07-12

## ACTIVE PRODUCT
Claudex bridge control plane. The Lantern is the current focus product. Amina and Authentic Hadith remain active downstream lanes.

## CURRENT SPRINT GOAL
Keep Claudex receipt backed and current, preserve automatic bridge and vault sync, and advance The Lantern Phase 0 blocker only with evidence.

## ALLOWED AGENTS
ROBBY, PM, RUNTIME, BACKEND, FRONTEND, DESIGN, QA, REVIEW, SECURITY, TRUTH, CHANGE, ARCHITECT, LIBRARIAN, TECHWRITER

## BLOCKED AGENTS
MARKETING, SALES, ASO_SEO, GTM, CONTENT, EDITORIAL, BRAND_COPY unless Ro or Keymon explicitly reassigns them.

## OPEN RISKS
- [ ] The bridge command layer still computes `today()` from UTC in `scripts/lib/bridge-core.mjs`, which can produce a stale intent warning in Pacific time. Fix belongs in code, not by backdating files.
- [ ] `OPS/API_KEY_VAULT.md` still indicates live credential values on local disk. Rotation and relocation remain owner work.
- [ ] Amina iOS and web remain locked until Ro lifts the hold.
- [ ] The Lantern Phase 0 schema bug remains the active Codex build blocker until the missing columns issue is confirmed and fixed with a receipt.
- [ ] Authentic Hadith submission remains gated behind the canonical testing pack and physical device proof.
- [ ] TradeSwarm schema drift remains red until host side repo ingest clears it.

## TOP 3 TASKS
1. Codex: read `the-lantern/CODEX_DISPATCH_LANTERN_SOURCE_REGISTRY_OS.md` and confirm or fix Phase 0 before any new table or column work.
2. Codex or Claude heartbeat: keep bridge, heartbeat, and Obsidian sync current, and close only items backed by receipts.
3. Keymon and Ro: handle human authority actions that Codex cannot truthfully close, including Apple and API key work where still relevant.

## CURRENT LANE
`lantern/source-registry-os` — Codex active.

Open related lanes:
- `claudex/os` — Claude active.
- `claudex/pe-incoming-automation-discovery` — Codex active, PARTIAL pending live Make Grid and n8n proof.
- `amina/chat-loop-proof` — Codex directive open, requires approved disposable test data and cleanup behavior before side effect tests.
- `lantern/source-registry-os` — Codex active, Phase 0 blocker first.

## SINGLE NEXT ACTION
Codex: read the Lantern dispatch file, verify the schema blocker, and land the first evidence backed fix.

## DEFINITION OF DONE
1. `OPS/TODAY.md` is dated 2026-07-12 and matches the current bridge focus.
2. `npm run check` passes.
3. Latest TruthCal receipt exists and points at the TODAY refresh.
4. Bridge state stays receipt backed and honest.
5. Any remaining open directives are listed honestly as either blocking, nonblocking, or owner action pending.

## DO NOT TOUCH TODAY
- Do not edit secret values, env files, tokens, auth caches, or credential stores.
- Do not force push, force merge, or bypass the bridge command layer for normal bridge state changes.
- Do not close Ro, Keymon, or Claude addressed directives without proof from the owner lane.
- Do not mutate Amina App Store, TestFlight, Supabase, RevenueCat, Make, or n8n state during this Claudex control-plane cleanup unless a separate scoped task authorizes it.
- Do not copy bridge state into product repos. Product repos consume Claudex through `.claudex.json`.

## RELEASE TARGET
Claudex control plane `SYNC GREEN` with receipt backed state. This is not an Amina App Store release target.

## END-OF-DAY PROOF REQUIRED
- [ ] `npm run check` output.
- [ ] `npm run bridge:status` output.
- [ ] TruthCal receipt path.
- [ ] Git commit and push receipt if files changed.
- [ ] Remaining blockers or owner actions, if any.

## CONTEXT
- Current bridge receipt before this refresh: `OPS/receipts/TC-20260712-CDX-02__claudex__installed_and_documented_automatic_bridge_heartbeat_and_obsidian_mirror_sync.md`.
- Current bridge focus before this refresh: `the_lantern`.
- Current bridge status before this refresh: `YELLOW`.
- Heartbeat PDF source definition is connected in `OPS/BRIDGE_HEARTBEAT_DEFINITION.md`; the live heartbeat contract remains `OPS/BRIDGE_SYNC_HEARTBEAT.md` v2.1.

---
*Refreshed 2026-07-12 by Codex for the current bridge and Lantern focus. Existing open directives remain open where proof is missing.*
