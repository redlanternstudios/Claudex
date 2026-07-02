# Claudex Control Plane Scope Lock

Version: 2.0
Lock date: 2026-07-02
Owner: Ro
Implementer: Codex
Status: LOCKED

## User story

As Ro, I want Codex, Claude, humans, and automation to share one validated studio state so that work can continue across engines without repeated explanation or silent contradiction.

## In scope

1. One canonical mutable bridge.
2. Global and product sync colors.
3. Explicit warnings and blockers.
4. Product lanes and engine ownership.
5. Current intent.
6. Receipt creation and indexing.
7. Engine capability evidence.
8. Schema and semantic validation.
9. Atomic writes, revision control, lock, and local recovery backup.
10. Consumer pointer installation.
11. Secret boundary and scanning.
12. Automated tests and GitHub integrity checks.
13. Codex and Claude boot integration.
14. Handoff and lane closure commands.

## Out of scope

1. Product source code.
2. Secret values.
3. Live database mirrors.
4. Provider credential management.
5. Replacing n8n, Make, GitHub, Supabase, or product repositories.
6. Automatic production actions without task authority.
7. A second bridge inside any product.

## Acceptance criteria

1. Bridge validation fails for contradictory colors.
2. Red requires at least one blocker.
3. Nonred state rejects blockers.
4. Green rejects unresolved warnings.
5. Missing required shared artifacts fail validation.
6. Secret shaped values fail validation.
7. Stale writers cannot overwrite newer revision state.
8. Concurrent writers cannot hold the write path together.
9. State replacement is atomic.
10. Prior state receives a local ignored backup.
11. Codex and Claude boot from the bridge.
12. A new consumer can install a pointer without copying state.
13. CI runs the same test and doctor commands as local verification.
14. A TruthCal receipt proves the build.

## Definition of done

All acceptance criteria pass, the CTP artifact exists, the bridge receipt exists, the repository is clean, and the commit is pushed to Claudex main.

## Change rule

Any new mutable state authority, engine type, color meaning, or secret handling behavior requires a versioned scope change and receipt.
