# TruthCal Receipt TC-20260708-CLA-01

Date: 2026-07-08
Product: amina
Lane: amina/ios-submission-qa
Author: claude
Intent: section 4b supabase route patch commit deploy
Result: COMPLETE

## Truth

VERIFIED: Amina Section 4B (commit + deploy of the Section 4A Supabase invite security patch) is complete on production web.
VERIFIED: The prior amina bridge blocker (Xcode account access for team P5H924VDYH blocking the Release archive) is stale — Build 1.0 (7) was archived, uploaded to TestFlight, and its source pushed to remote main per KP-verified transfer state 2026-07-08. Blocker resolved via `bridge resolve`; amina now YELLOW (2 standing warnings remain).
UNKNOWN: Section 4C (reset email delivery + Supabase auth log proof) and Vercel runtime log access (403 in prior pass) remain unproven.

## Evidence

- Commit `3745851ea9acc84bb7741e650b07db924d23b62a` on Amina `main`: fix(security) — `/api/circles/preview` and `/api/circles/join` moved from direct `circle_groups` reads to the SECURITY DEFINER `lookup_circle_invite` RPC; migration `supabase/migrations/20260708_secure_circle_invite_lookup.sql` committed. 3 files, +75/−16.
- `git ls-remote origin main` = `3745851...` (remote matches local HEAD).
- Pre-commit `npx tsc --noEmit`: 0 errors in project source (all reported errors confined to untracked `build/DerivedData-AppStoreScreenshots-iPhone/` vendored checkouts).
- Vercel production deployment `dpl_Fm8UpmuUnXuQyXdwkR1DTBszXrJB` state READY; API-verified `gitSource.sha = 3745851...`, `ref = main`.
- Alias `myamina.app` API-verified pointing at `dpl_Fm8UpmuUnXuQyXdwkR1DTBszXrJB`.
- Live probes on myamina.app: `GET /api/circles/preview?code=TESTCODE` → 404 "Circle is not available in this release."; `POST /api/circles/join` → same. Expected: `CIRCLES_ENABLED=false` gate (Section 6) holds; route code behind it is now the RPC version.
- Full section receipt: `/Users/kp/Documents/Penn Enterprises LLC/11_Current_Projects/02_Other_Active_Projects/ByRedLLC/Amina/04_Receipts/2026-07-08-amina-section-4b-supabase-route-commit-deploy.md`
- DB side was applied + live-verified in Section 4A (receipt 2026-07-08-amina-section-4a-supabase-invite-security-patch.md).

## Next action

KP picks the next authorized Amina section: 4C (Supabase reset delivery + auth log proof), 5B (RevenueCat mandatory paid subscription repair), 7A (App Store Connect finalization), F (screenshots), or 3 (physical iPhone UAT rerun). The old Xcode-accounts next action is superseded — Build 7 is live on TestFlight.
