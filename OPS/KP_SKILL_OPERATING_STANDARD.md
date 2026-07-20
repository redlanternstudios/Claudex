# KP Codex Skill Operating Standard

Version 1.0
Date 2026-07-13
Owner Keymon Penn
System RedLantern Studios Claudex control plane

## Objective

Turn repeated judgment into measurable Codex workflows without confusing planning, execution, verification, merge readiness, or production readiness.

## Core operating law

One mission. One task. One evidence trail. One completion receipt.

Evidence attaches to the active task. A new objective becomes a new task.

## The seven skill lifecycle

1. `kp_systemize`
   Decide whether the recurring problem should become a one time task, checklist, template, skill, SOP, agent, or automation.
2. `kp_scope`
   Define the result, boundaries, permissions, acceptance criteria, stop conditions, and explicit execution authorization.
3. `kp_plan`
   Sequence the authorized work and classify every step by change type and approval risk.
4. Execute
   Codex performs only the approved plan under the approved permission surface.
5. `kp_checkit`
   Verify technical, semantic, migration, external effect, and final head safety.
6. `kp_receipt`
   Record final evidence against the exact final commit or artifact state.
7. `kp_retrospective`
   Quantify the run, find process failures, and recommend controlled skill improvements.

Use `kp_repository_baseline` for repository readiness missions that need build, schema, environment, CI, migration, and deployment contract analysis.

## Mandatory separation of gates

A result can pass one gate while failing another.

1. Scope ready
   The task is defined. No mutation is authorized unless the scope says `Execution authorized: Yes`.
2. Plan ready
   The sequence is safe and approval points are visible.
3. Technical pass
   Install, type checks, tests, contracts, and builds pass.
4. Semantic pass
   Product meaning, identity, entitlement, trust, selection, and business rules remain correct or are explicitly approved.
5. Migration pass
   Schema changes, data changes, constraints, sequences, and rollback behavior are verified.
6. Merge pass
   The final pull request head is in scope, clean, reviewed, and safe to merge.
7. Deployment pass
   Production triggers, live data, external services, and rollback are separately authorized and verified.

Never use one PASS label to imply every gate passed.

## Change classification

Every planned step and observed diff must receive one or more labels.

1. `DOC`
   Documentation or evidence only.
2. `SOURCE`
   Source code with no intended runtime behavior change.
3. `RUNTIME`
   User visible or business behavior change.
4. `SCHEMA_DDL`
   Tables, fields, indexes, constraints, policies, functions, sequences.
5. `DATA_DML`
   Backfills, updates, deletes, inserts, transformations.
6. `EXTERNAL_WRITE`
   GitHub, Supabase, Stripe, Make, Beehiiv, Vercel, Drive, or another remote system.
7. `PRODUCTION`
   Deployment, live migration, live configuration, entitlement activation, payment activation, or launch.

`RUNTIME`, `DATA_DML`, `EXTERNAL_WRITE`, and `PRODUCTION` require explicit authorization. Payment, identity, access, security, and trust semantics require a second decision gate when they appear after execution begins.

## Model Routing Gate

Before meaningful implementation, state:

1. Selected model
2. Reasoning level
3. Why it is sufficient
4. Why a weaker model is rejected
5. Why a stronger model is rejected
6. Escalation triggers
7. Downgrade path

Preferred routing map:

* Luna for clear, repeatable, mechanical work
* Terra for normal implementation, tests, audits, and documentation
* Sol for architecture, compliance, security, release, migration, payment, identity, expensive error, or ambiguous cross system work

Use the lowest reasoning level that can safely pass the task.

## Required run metrics

Every meaningful skill run records:

### Invocation

* Skill name
* Explicit or implicit activation
* Trigger matched correctly
* Project and task

### Contract

* Goal present
* Constraints present
* Failure clause present
* Execution authorized Yes or No
* Allowed write surfaces
* External write permission
* Production permission

### Process

* Planned steps
* Completed steps
* Change classifications
* Model and reasoning
* Commands run
* Files changed
* External systems touched

### Quality

* Acceptance criteria total and passed
* Required evidence total and present
* Technical gate
* Semantic gate
* Migration gate
* Merge gate
* Deployment gate

### Efficiency

* First pass success Yes or No
* Corrective retries
* Rework required Yes or No
* Scope expansion count
* Cycle time when available
* Stronger model escalations

### Learning

* Hidden assumption found
* Scope deviation found
* Semantic surprise found
* Receipt correction required
* Lesson captured
* Skill update proposed

## Core rates

Use these formulas over a rolling set of runs.

1. Scope containment rate
   Runs with no unauthorized scope deviation divided by total runs.
2. First pass success rate
   Runs that pass without corrective rework divided by total runs.
3. Evidence completeness rate
   Evidence items present divided by evidence items required.
4. Gate accuracy rate
   Final statuses not corrected by later review divided by total final statuses.
5. Semantic surprise rate
   Runs where deeper review found an unapproved behavior change divided by total implementation runs.
6. Rework rate
   Runs requiring corrective commits or reopened work divided by total runs.
7. Receipt freshness rate
   Receipts tied to final head and latest CI divided by total receipts.
8. Trigger precision
   Correct skill activations divided by all skill activations.
9. Trigger recall
   Expected skill activations that occurred divided by all prompts that should have activated the skill.
10. Production containment rate
    Runs with no unauthorized live or external effect divided by all runs.

## Skill quality score

Score each completed run out of 100.

* Trigger correctness 10
* Prompt contract completeness 10
* Scope and authorization integrity 15
* Plan classification and approval gates 15
* Technical verification 10
* Semantic and migration safety 15
* Evidence and final head freshness 15
* Efficiency and rework control 5
* Learning capture 5

Any unauthorized production action, hidden payment or identity semantic change, fabricated evidence, or stale receipt caps the run at 49 and forces BLOCK or PARTIAL.

## Lantern Phase 0 lessons now encoded

The Lantern Phase 0 retrospective established these permanent rules:

1. A green build proves compilation, not semantic correctness, live compatibility, merge safety, or deployment safety.
2. Scope readiness does not authorize mutation.
3. Runtime payment, identity, trust, affiliate, and featured selection changes are product decisions.
4. Forward only does not mean additive. Constraint replacement and data backfills must be labeled precisely.
5. Schema definition, data backfill, live application, and production deployment are separate gates.
6. Migration SQL must be tested against a disposable database before executable readiness is claimed.
7. Final receipts must reference the final pull request head, latest CI, final diff hygiene, and independent scope deviation review.
8. External deployment triggers must be verified, not inferred from repository files.
9. Rollback or roll forward instructions are required before merge readiness when data or constraints change.
10. Successive probes are valuable, but newly exposed work must pass a scope and authorization check before modification.

## Current baseline from Lantern

* Build blockers repaired 3
* Corrective retries 2
* Source files analyzed 65
* Database tables reconciled 9
* Database fields reconciled 119
* Environment variables reconciled 16
* CI workflows added 1
* CI gates added 4
* Generated pages 37
* Pull request files changed 18
* Independent CI runs passed 2
* Acceptance criteria reported 10 of 10
* Evidence items reported 11 of 11
* First pass success No
* Rework required Yes
* Final correction Source baseline PASS, merge readiness HOLD FOR REVISION

This baseline is the first comparison point for future repository and skill runs.
