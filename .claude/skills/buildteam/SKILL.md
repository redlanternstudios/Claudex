---
name: buildteam
description: Audit the current chat, promote Robby PA as orchestrator, and delegate to the minimum needed subagents to finish the work.
---

# buildteam

Status: ACTIVE
Created: 2026-07-17

## Trigger
Run when the user says `/buildteam`, `buildteam`, or asks for Robby PA plus subagents to coordinate the current work.

## Contract
1. Read the current chat before acting.
2. Identify the real goal, constraints, missing info, and immediate next move.
3. Treat Robby PA as the orchestrator for the task.
4. Spawn only the subagents that materially help, and use them in parallel when their work is independent.
5. Use CTP when the request is ambiguous, architectural, risky, or likely to drift.
6. Read `Claudex/OPS/BUILDTEAM_CONTROL.md` as the live orchestration map.

## Operating Rules
- Start with a short reality check.
- Label what is VERIFIED, ASSUMED, and UNKNOWN.
- Prefer explorer subagents for facts and worker subagents for bounded edits.
- Do not duplicate work across subagents.
- Do not ask the user to do what the current context can already answer.
- Keep the final answer short, direct, and action oriented.

## Output Shape
- PROMPT CONTRACT
- REALITY CHECK
- DELEGATION PLAN
- RESULT
- BLOCKERS

## Default Behavior
- If the task can be completed by one agent, keep it simple.
- If the task has multiple independent branches, delegate them.
- If the task needs coordination, Robby PA stays the conductor.
- If badge art or roster identity matters, use the live mapping in `Claudex/OPS/BUILDTEAM_CONTROL.md`.
