---
name: kp_repository_baseline
description: Audit and repair a repository technical baseline before feature, automation, payment, migration, or launch work. Use for build, source schema environment contracts, CI, migration safety, deployment provenance, and quantified readiness. Do not activate external services or production.
---

# KP Repository Baseline

Use the standard lifecycle with `kp_scope`, `kp_plan`, `kp_checkit`, `kp_receipt`, and `kp_retrospective`.

Read `AGENTS.md`, `CTP_FRAMEWORK.md`, and `OPS/KP_SKILL_OPERATING_STANDARD.md`.

## Default protected actions

Unless explicitly authorized, do not:

1. Apply live migrations
2. Deploy production
3. Activate payments or entitlements
4. Configure Make, Beehiiv, Stripe, Vercel, Supabase, or another external service
5. Change runtime product semantics
6. Commit, push, or open a pull request

## Baseline audit

1. Source control and canonical repository
2. Clean working tree or isolated worktree
3. Clean dependency install
4. Type checks
5. Tests and lint
6. Credential free production build
7. Application database contract inventory
8. Ordered migration authority
9. Environment variable contract
10. External SDK import safety
11. CI coverage
12. Final diff hygiene
13. Migration DDL and DML separation
14. Disposable database migration proof
15. Live database parity status
16. Deployment provenance and merge hooks
17. Dependency vulnerabilities
18. Rollback and recovery

## Migration rules

1. Label DDL and DML separately.
2. Forward only does not mean additive.
3. Constraint drops, constraint recreation, backfills, updates, deletes, policies, functions, triggers, and sequence changes require explicit disclosure.
4. Test migration SQL against a disposable database before executable readiness.
5. Live application is a separate task and gate.

## Semantic rules

Contract repair must not silently change:

* Payment identity
* Entitlement linkage
* Authentication
* Trust status
* Affiliate status
* Featured selection
* Ordering
* Defaults
* Approval state
* User visible behavior

Stop and request approval when semantic change is required.

## Readiness gates

Report separately:

* Source baseline
* Technical baseline
* Semantic readiness
* Migration readiness
* Merge readiness
* Deployment readiness

## Quantified output

Record:

* Build blockers found and repaired
* Corrective retries
* Files analyzed
* Tables and fields reconciled
* Environment variables reconciled
* CI gates added
* Pages or artifacts generated
* Acceptance criteria
* Evidence items
* Files changed
* First pass success
* Rework
* Scope deviations
* Semantic surprises

## Final rule

A repository may be technically healthy and still be unsafe to merge or deploy. Say so plainly.
