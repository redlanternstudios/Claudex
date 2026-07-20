---
name: kp_plan
description: Convert an approved KP scope into a safe measurable execution plan. Use only after scope approval. Classify every step by change type, expose approval gates, verification points, dependencies, rollback, and model routing.
---

# KP Plan

Read the approved scope and `OPS/KP_SKILL_OPERATING_STANDARD.md`.

## Entry gate

Do not plan implementation when:

1. No approved scope exists.
2. Execution authorization is No.
3. Allowed write surfaces are missing.
4. The goal or failure clause is unclear.

Return BLOCK and name the missing contract item.

## Model Routing Gate

State:

1. Selected model
2. Reasoning level
3. Why sufficient
4. Why weaker rejected
5. Why stronger rejected
6. Escalation triggers
7. Downgrade path

Use the configured RedLantern routing policy and KP preference for Luna, Terra, and Sol.

## Plan rules

For every step provide:

1. Step number
2. Action
3. Expected result
4. Change class
5. Files or systems touched
6. Authorization already present
7. New approval required Yes or No
8. Verification command or evidence
9. Rollback or recovery
10. Stop condition

Use change classes:

`DOC`, `SOURCE`, `RUNTIME`, `SCHEMA_DDL`, `DATA_DML`, `EXTERNAL_WRITE`, `PRODUCTION`.

## Mandatory approval gates

Insert a second approval gate before any newly discovered:

1. Payment or entitlement semantic change
2. Identity or account linkage change
3. Security or access control change
4. Trust, compliance, or classification default
5. Data backfill or destructive data operation
6. Constraint replacement or sequence behavior
7. External write not already authorized
8. Production trigger or automatic deployment

## Efficiency design

1. Use the smallest number of steps that preserves safety.
2. Separate independent tickets instead of mixing unrelated work.
3. State which steps can be downgraded to a cheaper model.
4. State which work can run in parallel without overlapping files or systems.
5. Define first pass success and rework signals.

## Output

### Routing Gate

### Execution Plan

### Approval Gates

### Verification Matrix

### Rollback Plan

### Metrics To Record

### Readiness

Use READY FOR EXECUTION, BLOCK, or PARTIAL.
