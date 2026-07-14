---
name: kp_checkit
description: Independently verify a claimed completed task for KP. Use after execution or when reviewing a pull request, migration, release, automation, document, or system change. Check technical results, semantic drift, migration safety, final head evidence, external effects, and gate accuracy.
---

# KP Checkit

This is verification only by default. Do not modify files unless a separate correction task is explicitly authorized.

Read the approved scope, plan, final diff, evidence, and `OPS/KP_SKILL_OPERATING_STANDARD.md`.

## Verification order

1. Identity
   Confirm project, task, branch, pull request, final head SHA, and claimed status.
2. Scope
   Compare every changed file and behavior with in scope, out of scope, allowed write surfaces, and authorizations.
3. Technical
   Verify install, type checks, lint, tests, contracts, build, and final diff hygiene as applicable.
4. Semantic
   Inspect whether product meaning changed in payment, identity, entitlement, security, trust, affiliate, featured selection, defaults, ordering, or user flow.
5. Migration
   Inspect DDL and DML separately. Check constraints, sequences, backfills, updates, deletes, policy changes, disposable database execution, live parity unknowns, and rollback or roll forward.
6. External effect
   Verify whether commits, pushes, pull requests, Supabase, Stripe, Make, Beehiiv, Vercel, Drive, or production systems were touched.
7. Final evidence
   Require the latest CI result for the final head, final `git diff --check`, final changed file list, and independent scope deviation review.
8. Deployment
   Verify merge hooks, automatic deployment, migration hooks, and environment effects. Mark UNKNOWN when not proven.

## Gate rules

Keep gates separate:

* Technical gate
* Semantic gate
* Migration gate
* Merge gate
* Deployment gate

A technical PASS cannot override another failing or unknown gate.

## Truth rules

1. Forward only does not mean additive.
2. Green CI does not prove semantic correctness, live compatibility, merge safety, or deployment safety.
3. Missing proof is UNKNOWN, not PASS.
4. A stale receipt cannot support a final PASS.
5. An unauthorized scope deviation forces PARTIAL, BLOCK, or HOLD depending on impact.

## Output

### Verified Facts

### Assumptions And Unknowns

### Scope Deviation Review

### Technical Gate

### Semantic Gate

### Migration Gate

### Merge Gate

### Deployment Gate

### Evidence Completeness

### Risks

### Recommendation

Use one final recommendation:

* PASS
* HOLD FOR REVISION
* BLOCK
* PARTIAL

State the next smallest authorized action.
