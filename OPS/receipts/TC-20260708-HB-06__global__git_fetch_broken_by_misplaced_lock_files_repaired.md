# TruthCal Receipt — TC-20260708-HB-06

**Date:** 2026-07-08
**Product:** global (Claudex bridge plumbing)
**Author:** claude-heartbeat
**Status:** COMPLETE

## Action Attempted
Routine hourly heartbeat cycle: ingest other side, validate, digest.

## Finding
`git fetch origin` was FAILING with `fatal: bad object refs/heads/main.lock.stale-1783563287-2` /
`error: ... did not send all necessary objects` (confirmed reproducible, exit code 1, before fix).

Root cause: a prior heartbeat's stale-lock rename put `main.lock.stale-1783563287-2` directly
inside `.git/refs/heads/` instead of `.git/`. Git treats every file under `refs/heads/` as a
candidate branch ref; a 0-byte file there is an invalid ref object, which broke ref enumeration
during fetch negotiation. Separately, a live (non-renamed) `.git/index.lock` from 19:14 PT today
was present with no owning process (`ps aux` showed no git process running) — a second stale lock
that would have blocked the next local write.

`git status` / `git rev-list --left-right --count` were NOT affected (they read cached refs), which
is why prior heartbeat digests reported "level with origin" correctly even while live fetch was
broken. Net effect: ingest of new remote commits would have silently stopped working until a fetch
was forced some other way.

## Inputs Used
- `git fetch origin` (reproduced failure twice, same error both times)
- `ls .git/refs/heads/`, `ls -la .git/index.lock`, `ps aux | grep git` (confirmed no live process)

## Fix Applied
1. Moved `main.lock.stale-1783563287-2` OUT of `.git/refs/heads/` into a new
   `.git/stale-lock-archive/` directory (rename, not delete — sandbox denies unlink on this mount,
   per standing protocol in `memory/reference_sandbox_unlink_denied.md`).
2. Renamed `.git/index.lock` to `.git/index.lock.stale-hb06-<unix ts>` (same rename-not-delete rule;
   direct `rm` was attempted first and failed with `Operation not permitted`, confirming the known
   sandbox constraint).
3. Re-ran `git fetch origin` — succeeded, exit 0.

## Outputs Produced
- `git fetch origin` now succeeds (exit 0).
- `main...origin/main` confirmed `0 0` (still level, HEAD `b30d712` both sides) — no new commits
  landed on either side since the prior digest (~19:16 PT / HB-05).
- New folder `.git/stale-lock-archive/` for future misplaced-ref-lock debris, to keep `refs/heads/`
  clean specifically (the general `.git/` root stale-lock pile is a separate, already-flagged,
  lower-urgency cleanup item).

## Versions Bound
- Local HEAD / origin/main: `b30d712` (unchanged by this fix — plumbing repair only, no content
  commit needed beyond this receipt).

## Confirmation Observed
`git fetch origin` exit 0, reproduced clean twice after fix. `git rev-list --left-right --count
main...origin/main` → `0 0`.

## Failure Reason (if failed)
N/A — fix succeeded.

## Follow up (not this receipt's scope)
- The general `.git/*.lock.stale-*` debris pile (100+ files at repo root, flagged since earlier
  heartbeats) is untouched and still a host-side cleanup candidate — none of those are inside
  `refs/heads/` so they don't break git the way this one did, but the pattern that produced this
  bug (renaming a lock to a `refs/heads/`-shaped or otherwise ref-adjacent path) should not repeat.
  No code changed to prevent recurrence; noting as a real gap for whoever owns the lock-rename
  script next.
