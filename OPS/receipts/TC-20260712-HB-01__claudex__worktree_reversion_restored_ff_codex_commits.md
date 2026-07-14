# TruthCal Receipt TC-20260712-HB-01

Date: 2026-07-12
Product: claudex
Lane: claudex/os
Author: claude (bridge sync heartbeat)
Intent: Restore a silently reverted local worktree and ingest four Codex commits from origin
Result: COMPLETE

## Truth

VERIFIED: At 02:10 PT, 10 tracked files in the host worktree (CLAUDE.md, .claude/CLAUDE.md, OPS/BRIDGE.json, OPS/BRIDGE_SYNC_HEARTBEAT.md, OPS/CLAUDEX_SKILL_PROTOCOL.md, OPS/DECISION_LOG.md, OPS/receipts/INDEX.md, docs/OBSIDIAN_VAULT.md, docs/README.md, scripts/sync-obsidian.mjs) held content byte identical to commit 5235ddf (2026-07-11 ~21:05 state) while HEAD was e0ea9a7 — the worktree had rolled BACK past six commits. BRIDGE.json in the worktree said revision 137 while HEAD held 138.
VERIFIED: Restoring those 10 files from HEAD lost nothing — their worktree content matched 5235ddf exactly (checked via git diff 5235ddf), so every byte lives in git history.
VERIFIED: After restore, main fast forwarded cleanly e0ea9a7 → a66f36b (4 commits, all Codex authored: 9f56242 checkit skill wire, 04e44af showcase portfolio doc, f4c7241 bridge+Obsidian scheduler install, a66f36b TODAY refresh to 2026-07-12 Lantern focus).
VERIFIED: bridge:doctor after the ff: SYNC YELLOW, single FAIL = OPS secret scan (API_KEY_VAULT.md, standing DIR-20260707-05 to Ro). TODAY.md is now dated 2026-07-12, so the stale intent cap is cleared.
UNKNOWN: What reverted the worktree. Stale sandbox owned .git/HEAD.lock (Jul 11 22:10) suggests an interrupted operation from a prior Cowork run; the new 5 minute host schedulers (bridge:watch = alignment sync --apply, heartbeat, Obsidian) installed by TC-20260712-CDX-02 are a second candidate. Not proven either way. Watch for recurrence.
VERIFIED: Held out of this commit on purpose: swarmclaw/MODEL_ROUTING_POLICY.md edit + TC-20260708-ENG-01 receipt, still pending Ro's decision on DIR-20260708-HB-03.

## Evidence

- Renamed stale .git/HEAD.lock and .git/index.lock (rename only, never rm).
- git checkout -- <10 files>, then git merge --ff-only origin/main → a66f36b.
- Post ff status: only the held MODEL_ROUTING_POLICY.md modification plus known untracked files remain.
- Bridge written to revision 142 by this heartbeat.

## Next action

If a worktree reversion appears again, suspect the 5 minute schedulers first and audit scripts/alignment.mjs sync --apply before restoring.
