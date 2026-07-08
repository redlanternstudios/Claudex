# TODAY.md — RedLantern Daily Command Center
> Update at session start. This file is the single source of current intent.
> No agent may start work without reading this file first.

---

## DATE
2026-07-08

## ACTIVE PRODUCT
Claudex bridge control plane. Amina and Penn Enterprises discovery remain active downstream lanes, but today's control target is Claudex `SYNC GREEN`.

## CURRENT SPRINT GOAL
Move Claudex from `SYNC YELLOW` to receipt backed `SYNC GREEN` without hiding unresolved owner actions, stale directives, or protocol drift.

## ALLOWED AGENTS
ROBBY, PM, RUNTIME, BACKEND, FRONTEND, DESIGN, QA, REVIEW, SECURITY, TRUTH, CHANGE, ARCHITECT, LIBRARIAN, TECHWRITER

## BLOCKED AGENTS
MARKETING, SALES, ASO_SEO, GTM, CONTENT, EDITORIAL, BRAND_COPY unless Ro or Keymon explicitly reassigns them.

## OPEN RISKS
- [ ] Claudex is still `SYNC YELLOW`. `npm run bridge:doctor` passes, but bridge status will not be GREEN until the bridge state is recomputed after this TODAY refresh and remaining warnings/directives are handled with evidence.
- [ ] The bridge command layer still generated an old untagged receipt ID during the heartbeat PDF connection. Codex corrected the receipt to `TC-20260707-CDX-05`, but `scripts/lib/bridge-core.mjs` still needs the tagged ID generator fix before future Codex receipts are safe.
- [ ] `shared.directives` still contains open owner and engine asks. Do not mark any directive done without a receipt, commit, or explicit owner confirmation.
- [ ] Amina Apple/Xcode directives mention old team `P5H924VDYH`, while current local Amina source now contains `LXL3ZMHHK6` signing settings. Treat the bridge Apple lane as stale until a focused Amina reconciliation pass updates it from current receipts and live Apple/Xcode proof.
- [ ] Ro security asks remain open: rotate the exposed `OPENAI_API_KEY` and decide the proper home for any API key vault file. Codex verified `OPS` secret scan is currently clean, but that does not prove rotation happened.
- [ ] Penn Enterprises discovery remains PARTIAL until live Make Grid organization/team evidence, the exact automation list, and n8n readback are captured.
- [ ] Keymon answer desk question `Q-20260707-01` remains OPEN until the addressed Keymon Claude lane answers it or the question is superseded by a new receipt.
- [ ] TradeSwarm schema drift remains out of scope until host side repo ingest or a separate lane clears it.

## TOP 3 TASKS
1. Codex: patch the Claudex receipt ID generator so Codex receipts use `TC-YYYYMMDD-CDX-NN` automatically, then run `npm run check`.
2. Codex or Claude heartbeat: reconcile bridge `sync_note`, open directives, and product status after this TODAY refresh. Close only items backed by evidence.
3. Keymon and Ro: handle human authority/security actions that Codex cannot truthfully close: Apple/Xcode account proof if still relevant, API key rotation, API vault decision, answer desk setup, and Make Grid/n8n evidence.

## CURRENT LANE
`claudex/codex-cost-setup` — Codex complete. CTP decision and Keymon retrieval file are ready.

Open related lanes:
- `claudex/os` — Claude active.
- `claudex/pe-incoming-automation-discovery` — Codex active, PARTIAL pending live Make Grid and n8n proof.
- `amina/chat-loop-proof` — Codex directive open, requires approved disposable test data and cleanup behavior before side effect tests.

## SINGLE NEXT ACTION
Keymon: pull Claudex and open `OPS/KEYMON_CODEX_COST_SETUP_20260708.md`, then mirror the Codex cost setup and write a verification receipt.

## DEFINITION OF DONE
1. `OPS/TODAY.md` is dated 2026-07-08 and points at the active Codex cost setup handoff.
2. `npm run check` passes.
3. Latest TruthCal receipt exists and points at the TODAY refresh.
4. Bridge `SYNC GREEN` is claimed only if validator output and current bridge state support it.
5. Any remaining open directives are listed honestly as either blocking, nonblocking, or owner-action pending.

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
- Current bridge receipt before this refresh: `OPS/receipts/TC-20260707-CDX-05.md`.
- Current bridge focus before this refresh: `claudex`.
- Current bridge status before this refresh: `SYNC YELLOW`.
- Heartbeat PDF source definition is connected in `OPS/BRIDGE_HEARTBEAT_DEFINITION.md`; the live heartbeat contract remains `OPS/BRIDGE_SYNC_HEARTBEAT.md` v2.1.

---
*Refreshed 2026-07-08 by Codex for the Codex cost setup handoff. Existing open directives remain open where proof is missing.*
