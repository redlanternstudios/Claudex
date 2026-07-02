# SWARMCLAW PATCH NOTE — AMINA DAY 8
Date: 2026-06-25 | Owner: Ro | Status: READY FOR PICKUP

No hyphens. Truth labels: VERIFIED, PARTIAL, MISSING, PLANNED.

---

## WHAT LANDED ON GITHUB TODAY (commit a6b495e → main)

All items VERIFIED pushed to `redlanternstudios/Amina` main branch.

| File | Change | Status |
|------|--------|--------|
| `components/brand/Amina3DCharacter.tsx` | NEW — 3D SVG character component, two variants: `full` (hero portrait) and `avatar` (circular, small) | VERIFIED |
| `app/(marketing)/page.tsx` | Hero right column: replaced `✦` placeholder with `Amina3DCharacter variant="full"` | VERIFIED |
| `components/app/AminaBubble.tsx` | Floating launcher + panel header: replaced flat `amina-logo.png` with `Amina3DCharacter variant="avatar"` | VERIFIED |
| `app/(app)/chat/page.tsx` | Loading state: replaced `AminaIcon` with `Amina3DCharacter variant="avatar"` | VERIFIED |
| `AMINA_CIRCLE_SCOPE_LOCK_V2.md` | Circle V1 Real scope lock (locked 2026-06-24) — source of truth for Circle build | VERIFIED |
| `SWARMCLAW_DISPATCH_CIRCLE_V1_REAL.md` | 6-phase Circle V1 Real build dispatch — READY FOR TRIGGER | VERIFIED |
| `AMINA_HEALTH_AUDIT_TEMPLATE.md` | Day 8 CTP audit template — Amina-specific, App Store gate included | VERIFIED |

---

## CIRCLE V1 REAL DISPATCH — STATUS

**The dispatch is ready. Ro must trigger it. Sandbox cannot reach localhost:3456.**

File on disk: `amina/SWARMCLAW_DISPATCH_CIRCLE_V1_REAL.md`
Scope lock on disk: `amina/AMINA_CIRCLE_SCOPE_LOCK_V2.md`

Auth is VERIFIED working end-to-end (SSR fix b8fa625 + rebase confirmed). Circle V1 Real is unblocked.

### What the dispatch covers (6 phases):

| Phase | Work | Agent |
|-------|------|-------|
| 1 | DB migration: `post_type` enum, expanded reactions (4 faith types), handle bug fix, `replies_enabled`, `also_on_dua_wall`, post status | ARCHITECT / DATABASE |
| 2 | Aggregated "Today's Circle" home feed, du'a requests float up | FRONTEND + BACKEND |
| 3 | Trust and safety: report, block, moderation review queue, crisis detection on post content | BACKEND + FRONTEND |
| 4 | Gentle notifications: reaction received, reply received, du'a answered | BACKEND + DEPLOY |
| 5 | Handle bug fix: real display handle when `is_anonymous = false` | FRONTEND |
| 6 | QA gate: full retention loop tested end-to-end | QA |

---

## KNOWN OPEN ITEMS (NOT in this dispatch — do not scope in)

| Item | Status | Owner |
|------|--------|-------|
| `/reflections/[id]` detail page | MISSING — confirmed by agent audit | Keymon next sprint |
| Circle tab still in bottom nav (F-01) | NOT DONE — Phase 2 UI still visible | Keymon next sprint |
| EAS Build config (iOS) | NOT STARTED | Ro |
| Sentry DSN configured | UNKNOWN | Ro |
| PostHog 5 core events | UNKNOWN | Ro |
| Account deletion in-app | MISSING — App Store hard requirement | Keymon |
| RevenueCat / IAP | DEFERRED Phase 2 | — |

---

## FOR ROBBY (CONDUCTOR)

Circle V1 Real is the active mission. When Ro triggers the dispatch:

1. Read `amina/SWARMCLAW_DISPATCH_CIRCLE_V1_REAL.md` in full before assigning
2. Read `amina/AMINA_CIRCLE_SCOPE_LOCK_V2.md` — this is the authority. No silent additions.
3. Auth dependency is CLEARED. Do not wait on it.
4. Phase sequence is strict: Phase 1 (DB) must complete before Phase 2 (feed) begins.
5. Trust and safety (Phase 3) must complete before QA gate (Phase 6). It gates launch.
6. Any scope addition requires Ro approval + new scope version. Do not freelance.
7. Merge to main and push on completion of all phases.

---

## v0 SYNC STATUS

GitHub main is now at `a6b495e`. v0 auto-syncs from main on the `integrate-v0-into-amina` worktree. No manual v0 action required — changes will propagate on next v0 session open.

---

*This patch note is for SwarmClaw pickup only. Ro owns the dispatch trigger.*
