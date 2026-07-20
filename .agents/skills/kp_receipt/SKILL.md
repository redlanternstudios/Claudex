---
name: kp_receipt
description: Create a final evidence backed completion receipt for KP after independent verification. Use only when a task has reached a gate. Require final head evidence, latest CI, scope deviation review, separate technical and semantic statuses, risks, rollback, and next action.
---

# KP Receipt

Read the approved scope, plan, execution evidence, `kp_checkit` result, and `OPS/KP_SKILL_OPERATING_STANDARD.md`.

## Entry gate

Do not create a final PASS receipt when:

1. Independent verification is missing.
2. Final head SHA is missing for code work.
3. Latest CI does not match final head.
4. Scope deviation review is missing.
5. Semantic, migration, merge, or deployment gates are unknown but the receipt implies they passed.
6. Required rollback or recovery is missing.

## Required receipt fields

1. Receipt ID
2. Date and time
3. Project
4. Mission
5. Task
6. Skill chain used
7. Model and reasoning
8. Approved scope reference
9. Execution authorization
10. Final branch
11. Final head SHA
12. Pull request URL
13. Latest CI URL and result
14. Files changed
15. Commands run
16. External systems touched
17. Change classes present
18. Acceptance criteria results
19. Evidence required and present
20. Technical gate
21. Semantic gate
22. Migration gate
23. Merge gate
24. Deployment gate
25. Scope deviations
26. First pass success
27. Corrective retries
28. Rework required
29. Remaining risks
30. Rollback or roll forward
31. Next authorized action
32. Final status

## Status rules

Use:

* PASS only for the exact gate fully proven
* HOLD FOR REVISION when valuable work exists but merge or release is unsafe
* BLOCK when a dependency or critical risk prevents progress
* PARTIAL when meaningful work is complete but the task goal is not fully verified

Name the passed gate. Example: `Technical baseline PASS. Merge readiness HOLD FOR REVISION.`

## Ledger update

Append one row to `OPS/KP_SKILL_METRICS_LEDGER.csv` when repository access and write authorization are available. Do not fabricate unavailable metrics. Use `unknown`.
