---
name: kp_scope
description: Define a measurable CTP task scope for KP before implementation. Use when a meaningful task needs boundaries, permissions, acceptance criteria, evidence, stop conditions, and explicit execution authorization. Do not use for trivial one step edits.
---

# KP Scope

Read `AGENTS.md`, `CTP_FRAMEWORK.md`, and `OPS/KP_SKILL_OPERATING_STANDARD.md` before producing the final scope.

## Purpose

Turn a desired outcome into one bounded task. Scoping is planning work. It does not authorize mutation unless the completed scope explicitly says `Execution authorized: Yes`.

## Interactive behavior

When KP asks to fill the template, ask one section at a time. Preserve his answers. Clarify vague language by converting it into observable conditions.

## Required fields

1. Mission
2. Single active task
3. Goal
4. Business or user value
5. Current state
6. Verified facts
7. Assumptions
8. Unknowns
9. Upstream dependencies
10. Downstream effects
11. In scope
12. Out of scope
13. Allowed read surfaces
14. Allowed write surfaces
15. External systems allowed
16. Protected surfaces
17. Constraints
18. Risk and blast radius
19. Acceptance criteria
20. Required evidence
21. Stop conditions
22. Definition of Done
23. Execution authorized Yes or No
24. Commit authorized Yes or No
25. Push authorized Yes or No
26. Pull request authorized Yes or No
27. External write authorized Yes or No
28. Production action authorized Yes or No
29. Approval owner
30. Status gate

## Authorization rules

1. Default every authorization field to No unless the user explicitly grants it.
2. A scope marked READY means the task is defined. It does not mean execution is authorized.
3. Runtime behavior, payment, identity, security, trust, entitlement, data backfill, external write, and production action require explicit authorization.
4. A new objective becomes a new task.
5. If execution reveals a new change class, stop and request a scope amendment before editing.

## Change class preview

List expected change classes using:

`DOC`, `SOURCE`, `RUNTIME`, `SCHEMA_DDL`, `DATA_DML`, `EXTERNAL_WRITE`, `PRODUCTION`.

## Output

Return:

### Scope Contract

All required fields.

### Authorization Matrix

A table with every authorization field and Yes or No.

### Measurement Plan

State the metrics that will prove value, quality, efficiency, and learning.

### Gate

Use one status:

* READY FOR PLAN
* BLOCK
* PARTIAL

Never use PASS because no implementation has been verified yet.
