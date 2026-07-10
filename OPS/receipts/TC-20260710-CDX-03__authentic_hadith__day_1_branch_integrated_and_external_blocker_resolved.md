# TC-20260710-CDX-03 — Authentic Hadith Day 1 Branch Integrated and External Blocker Resolved

Date: 2026-07-10
Product: authentic_hadith
Lane: ah/e2e-v1-refinement
Engine: codex
Status: PARTIAL

## OBJECTIVE

Integrate the external report that another environment still sees `origin/main` at `9ac3960` and is missing `lib/share/shareContent.ts` plus `lib/gamification/badge-config.ts`.

## REALITY CHECK

VERIFIED: On Ro's Mac workspace, the active app repo is clean at commit `e9f1bfd`.

VERIFIED: `lib/share/shareContent.ts` exists and is tracked.

VERIFIED: `lib/gamification/badge-config.ts` exists and is tracked.

VERIFIED: the active branch is `fix/repair-batch-2026-06-25`.

VERIFIED: `origin/fix/repair-batch-2026-06-25` contains `e9f1bfd` because the prior push returned:

`3032abf..e9f1bfd  fix/repair-batch-2026-06-25 -> fix/repair-batch-2026-06-25`

PARTIAL: the external Linux container report is accurate only for its own stale clone and `origin/main` view. It is not accurate for the active Mac app workspace or the pushed feature branch.

## CTP CONTRACT

GOAL: prevent any downstream builder from treating the missing file report as an active blocker.

CONSTRAINTS: do not rewrite app history, do not force push, do not merge blind from a stale clone.

FORMAT: single receipt plus bridge pointer update.

FAILURE: build 107 must not be cut from stale `origin/main` or from any branch missing the Day 1 files.

## EXECUTION

The correct integration is to treat the report as a branch selection and clone freshness issue.

Downstream builder instructions:

1. Fetch the app repo.
2. Check out `fix/repair-batch-2026-06-25`.
3. Confirm `git rev-parse --short HEAD` is `e9f1bfd` or later.
4. Confirm both files exist:
   - `lib/share/shareContent.ts`
   - `lib/gamification/badge-config.ts`
5. Do not draft an alternate implementation from prose.
6. Continue from the pushed branch and simulator evidence.

## RESULT

PARTIAL: source integration is complete in the bridge. Build 107 still has not been cut because the prior run hit the usage approval wall before EAS build and submit.

## EDGE CASES

If a clone only tracks `origin/main`, it will appear stale. That is not the active release branch for the current Day 1 pass.

If App Store Connect requires `main`, merge `fix/repair-batch-2026-06-25` through the normal repo path first, then build from the resulting commit. Do not rebuild from `9ac3960`.
