---
name: preflight-audit
description: Run the repeatable preflight audit for BuildTeam and related live surfaces before implementation or restart work.
---

# Preflight Audit

**Canonical capability:** `claudex.skill.preflight-audit`

Use this skill when a BuildTeam style surface is frozen, when a checklist needs to be repeated, or when the question is whether a surface is ready to build on.

## Contract

Read the current bridge, current chat, the relevant surface files, and the preflight contract before taking action.

1. Contract the request first.
2. Identify the exact surface, the expected live behavior, and the failure mode.
3. Verify whether the surface is live, mirrored, or only documented.
4. Separate checklist evidence from actual runtime proof.
5. Convert the checklist into a repeatable sequence with entry, exit, proof, and rollback.
6. Route durable outcomes to `OPS/CLAUDEX_PREFLIGHT_AUDIT_CONTRACT.md`.

## Required behavior

1. Start with `GOAL`, `CONSTRAINTS`, `FORMAT`, and `FAILURE`.
2. Label every claim `VERIFIED`, `PARTIAL`, `ASSUMED`, or `UNKNOWN`.
3. Check for freeze causes: missing data, circular render state, unsupported live dependency, or no exit condition.
4. Distinguish the live surface from any mirror, draft, or doc only checklist.
5. Return one clear readiness verdict: `READY`, `HOLD`, or `BLOCKED`.
6. If the checklist is reusable, save the narrowest durable version and point future runs back to it.

## Output shape

- Prompt Contract
- Reality Check
- Audit Findings
- Repeatable Skill Shape
- Readiness Verdict
- Next Action
- Blockers

## Failure conditions

- Any checklist item has no proof, owner, or exit condition.
- Any readiness claim is made without live or committed evidence.
- Any freeze cause is named without a rollback path.
- Any durable skill is written without a contract or command entry point.

## Success condition

A future run can repeat the same audit, reach the same verdict class, and know exactly what proof would change the verdict.
