# TODAY.md — RedLantern Daily Command Center
> Update at session start. This file is the single source of current intent.
> No agent may start work without reading this file first.

---

## DATE
2026-07-18

## ACTIVE PRODUCT
Amina is Ro's primary active product and is being fixed for the iOS push. Ro is also working on Footprint and designing the marketing engine in parallel. Keymon is working on TheLanternDaily.com. Ro reports Authentic Hadith was pushed.

## CURRENT SPRINT GOAL
Finish and verify the active Amina repair path toward iOS submission while preserving parallel Footprint strategy, marketing engine design, and Keymon ownership of TheLanternDaily.com.

## ALLOWED AGENTS
ROBBY, PM, RUNTIME, BACKEND, FRONTEND, DESIGN, QA, REVIEW, SECURITY, TRUTH, CHANGE, ARCHITECT, LIBRARIAN, TECHWRITER

## BLOCKED AGENTS
MARKETING, SALES, ASO_SEO, GTM, CONTENT, EDITORIAL, BRAND_COPY unless Ro or Keymon explicitly reassigns them.

## OPEN RISKS
- [ ] The bridge command layer still computes `today()` from UTC in `scripts/lib/bridge-core.mjs`, which can produce a stale intent warning in Pacific time. Fix belongs in code, not by backdating files.
- [ ] `OPS/API_KEY_VAULT.md` still indicates live credential values on local disk. Rotation and relocation remain owner work.
- [ ] Amina is active. Every repaired release path needs current build, device, and submission evidence.
- [ ] The Lantern Phase 0 schema bug remains the active Codex build blocker until the missing columns issue is confirmed and fixed with a receipt.
- [ ] Authentic Hadith submission remains gated behind the canonical testing pack and physical device proof.
- [ ] TradeSwarm schema drift remains red until host side repo ingest clears it.
- [ ] Shared production project `endovljmaudnxdzdapmf` still contains Amina, HireWire, Lantern, Deixis, and By Red operating data under one Auth pool. Do not split it during the Amina release window.
- [ ] QBos has a 27 Jul 2026 recovery gate. TradeSwarm has a 02 Aug 2026 recovery gate and is next for release.

## TOP 3 TASKS
1. Ro: continue Amina repair and verify the next iOS build or submission state.
2. Keymon: continue TheLanternDaily.com work and attach receipts as milestones land.
3. Ro: continue Footprint strategy and marketing engine design in parallel without crossing the Footprint implementation hold.

## CURRENT LANE
`amina/ios-submission-qa` is active with Ro.

Open related lanes:
- `claudex/os` — Claude active.
- `claudex/pe-incoming-automation-discovery` — Codex active, PARTIAL pending live Make Grid and n8n proof.
- `amina/chat-loop-proof` — Codex directive open, requires approved disposable test data and cleanup behavior before side effect tests.
- `lantern/source-registry-os` is active with Keymon.
- `footprint/proof_bridge` is active with Ro for strategy and decisions. Implementation remains HOLD until the preflight returns READY.
- `claudex/marketing-engine-design` is active with Ro in parallel.

## SINGLE NEXT ACTION
Ro continues the Amina fixes and records the next verified iOS build or submission result.

## DEFINITION OF DONE
1. `OPS/TODAY.md` is dated 2026-07-17 and matches the current bridge focus.
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
Amina reaches a verified iOS submission state with receipt backed repair evidence.

## END-OF-DAY PROOF REQUIRED
- [ ] `npm run check` output.
- [ ] `npm run bridge:status` output.
- [ ] TruthCal receipt path.
- [ ] Git commit and push receipt if files changed.
- [ ] Remaining blockers or owner actions, if any.

## CONTEXT
- Current bridge receipt before this refresh: `OPS/receipts/TC-20260714-CDX-14__claudex__refresh_today_and_set_ro_response_contract_live.md`.
- Current bridge focus before this refresh: `amina`.
- Current bridge status before this refresh: `YELLOW`.
- Heartbeat PDF source definition is connected in `OPS/BRIDGE_HEARTBEAT_DEFINITION.md`; the live heartbeat contract remains `OPS/BRIDGE_SYNC_HEARTBEAT.md` v2.1.
- Supabase now contains exactly three legal organizations. Receipt: `OPS/receipts/TC-20260714-CDX-12__global__record_supabase_organization_consolidation_in_bridge_heartbeat.md`.
- Active project pointers are recorded in the bridge for Authentic Hadith, TradeSwarm, Amina, By Red OS, and HireWire.
- Ro corrected the active lineup on 2026-07-14: Amina active for iOS repair; Footprint and marketing engine design parallel; Keymon on TheLanternDaily.com; Authentic Hadith reported pushed.
- Ro response contract refreshed and receipt backed at `OPS/receipts/TC-20260714-CDX-14__claudex__refresh_today_and_set_ro_response_contract_live.md`.

---
*Refreshed 2026-07-17 by Claude heartbeat. Reflecting Ro's active lineup corrections from 2026-07-14. Existing open directives remain open where proof is missing.*
