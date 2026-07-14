# TruthCal Receipt TC-20260713-HB-01

Date: 2026-07-13
Product: claudex
Lane: claudex/os
Author: automation
Intent: Bridge heartbeat quiet-hour check (HB-01, 07-13). Wrote BRIDGE.json rev 147 (TODAY.md day-rollover note, EST 2025->2015 unresolved unchanged). New finding: sandbox git writes escalated from routine "stale lock, clear by rename" to rename itself failing with "Operation not permitted" and the lock file being recreated between calls, with no live git process visible in sandbox `ps`. Confirmed via Desktop Commander that no git process was running on the host Mac either — the host copy of the same working tree committed and pushed instantly once touched directly. This means the sandbox-side mount view of `.git/` is now unreliable for local commit, not only for push as previously documented. Escalated this run to full host fallback for add+commit+push.
Result: COMPLETE

## Truth

VERIFIED: Sandbox `git add`/`git commit` on OPS/BRIDGE.json failed repeatedly with `.git/index.lock` "File exists" / "Operation not permitted" on unlink and on rename, across three separate attempts. `ps aux` in sandbox showed no git process. `ps aux` on host Mac (via Desktop Commander) showed no git process either. Running the identical `git add && git commit` sequence directly on the host Mac at `/Users/rorysemeah/Documents/Claude/Projects/RedLantern Studios` succeeded immediately (commit 4b4188e) and `git push` succeeded cleanly (5c668e8..4b4188e, no rejection).
VERIFIED: `.git/` in this working tree currently holds 100+ accumulated `*.lock.stale*` / `*.lock.cleared*` artifacts from prior heartbeat runs (rename-only cleanup, sandbox cannot unlink). This is a growing housekeeping debt, not itself a functional blocker, but the volume suggests the lock-contention pattern is now routine per run rather than occasional.
ASSUMED: The mount between this sandbox and the host Mac folder has some form of write-lock or cache latency that makes freshly-created `.git/index.lock` files appear un-removable from the sandbox side even seconds after creation, independent of any real concurrent writer. Root cause of the mount behavior itself is UNKNOWN — only the workaround (host fallback) is verified.
NEEDS CONFIRMATION: Whether this is a one-off degradation or a permanent regression in sandbox git reliability for this mount. If it recurs on the next heartbeat run, treat host-fallback-for-commit (not just push) as the new default rather than re-attempting sandbox commit first.

## Evidence

- Sandbox commit attempts: 3x `fatal: Unable to create '.../.git/index.lock': File exists` despite prior `mv`-based clears; final attempt also failed via `mv`/`rm` with `Operation not permitted`.
- Host Desktop Commander PID 24407: `ps aux | grep git` → only unrelated `mcp-server-github` node processes, no git.
- Host Desktop Commander PID 24435/24453/24466: `rm -f .git/index.lock .git/HEAD.lock` clean, `git add && git commit` → `[main 4b4188e] ...`, `git push` → `5c668e8..4b4188e main -> main`.
- Sandbox `git fetch origin` afterward confirms `HEAD == origin/main == 4b4188e`.

## Next action

No action required unless this recurs. If the next heartbeat hits the same sandbox lock failure, skip the sandbox commit retry loop and go straight to host fallback for add+commit+push to save a run. Not escalating to Ro as a directive yet — one occurrence, workaround proven, no data lost.
