# TruthCal Receipt TC-20260710-CLA-01

Date: 2026-07-10
Product: the_lantern
Lane: lantern/source-registry-os
Author: claude
Intent: Wrote dynamic source registry OS CTP (Part 2 schema-reconciled against live repo) and strict Codex build dispatch; opened bridge lane for codex; found and documented live lantern_content_queue schema bug as Phase 0 blocker; local commits only, sandbox has no git push credentials
Result: PARTIAL

## Truth

VERIFIED: Read `supabase/migrations/001_initial_schema.sql`, `002_make_automation_tables.sql`, `003_ai_agent_stack.sql`, `20260617_content_radar.sql`, `lib/lantern/queries.ts`, `lib/lantern/types.ts`, `app/dashboard/page.tsx`, `app/api/admin/content-radar/route.ts` directly in this session.
VERIFIED: `lib/lantern/queries.ts` selects `content_type, category, halal_classification, halal_score` from `lantern_content_queue`; the only migration that creates that table (002) does not define those columns. Root cause (drift vs. genuine bug) not yet determined — flagged as Phase 0 in the Codex dispatch, requires an `information_schema.columns` check against production Supabase, which this session did not have credentials to run.
VERIFIED: `lantern_source_whitelist` (001) already exists and is the correct base to extend — the CTP originally proposed a new `lantern_sources` table before this was found; corrected in Part 2 before any migration was written.
VERIFIED: three parallel/redundant table pairs exist — `lantern_posts`(daily-dispatch/weekly-brief) vs `lantern_drafts`; `lantern_signals` vs `content_radar`; three different halal-stance enum vocabularies across `lantern_content_queue`/`lantern_signals`/`content_radar`.
VERIFIED: `app/dashboard/page.tsx` Automation Status panel is a hardcoded literal array, not a live query — confirmed by reading the component source.
VERIFIED: sandbox git push blocked — `git push origin main` in both `the-lantern/` and the RedLantern Studios root returned `fatal: could not read Username for 'https://github.com'` (exit 128) in both repos, consistent with prior Claudex Push Topology finding.
VERIFIED: local commits made — `the-lantern` commit `f328f8f` (CTP + dispatch doc, scoped to only those 2 files, pre-existing unrelated working-tree changes left untouched), RedLantern Studios root commit `8832782` (OPS/BRIDGE.json lane-open only, `swarmclaw/MODEL_ROUTING_POLICY.md` pending change from DIR-20260708-HB-03 left untouched).
UNKNOWN: whether the schema mismatch means the live site is currently serving broken/null data, or the columns exist in production but were never migrated into a tracked file. Requires a live Supabase query Ro or Codex must run — Phase 0 of the dispatch.
UNKNOWN: whether the three deprecation-candidate decisions (halal-stance vocabulary, `lantern_posts` vs `lantern_drafts`, `lantern_signals` vs `content_radar`) have been confirmed by Ro — not asked in this session, listed as Phase 0.5 blocking confirmations in the dispatch.

## Evidence

- `the-lantern` commit: `f328f8f` — "docs: dynamic source registry + publication OS CTP, plus strict Codex build dispatch" (local only, not pushed).
- RedLantern Studios root commit: `8832782` — "bridge: open lane the_lantern/lantern/source-registry-os for codex" (local only, not pushed).
- Bridge lane opened via `node scripts/bridge.mjs open the_lantern lantern/source-registry-os codex "<next action>" claude` — atomic write path, not a hand-edit of BRIDGE.json. Revision 128 -> 129 (lane open) -> 130 (this receipt).
- Files: `the-lantern/LANTERN_SOURCE_REGISTRY_OS_CTP.md` (992 lines incl. dispatch), `the-lantern/CODEX_DISPATCH_LANTERN_SOURCE_REGISTRY_OS.md`.
- Sandbox unlink limitation recurred on `OPS/BRIDGE.lock`, `.git/index.lock`, `.git/HEAD.lock`, and several `.git/objects/*/tmp_obj_*` files across both repos during this session — all renamed rather than deleted (per established workaround), none blocked the underlying write.

## Next action

Read the-lantern/CODEX_DISPATCH_LANTERN_SOURCE_REGISTRY_OS.md before writing any code. Phase 0 (schema bug: lantern_content_queue missing columns queries.ts depends on) must be confirmed and fixed before any new table/column work. Then build the dynamic source registry + bundle release flow per the-lantern/LANTERN_SOURCE_REGISTRY_OS_CTP.md Part 2 (Section 21 supersedes Part 1's entity model).
