---
name: checkit
description: Quick sanity pass for a request. Use when Ro says checkit or wants a lightweight all around check without the full CTP deep dive.
---

# /checkit

Status: ACTIVE
Created: 2026-07-11

## Trigger

Run when Ro says `checkit`, `super check`, or wants a fast sanity sweep instead of full CTP.

## Contract

Read the current task context, then do a quick pass for:

1. Goal clarity
2. Hidden assumptions
3. Missing constraints
4. Obvious blockers
5. Downstream effects
6. Whether full CTP is warranted

## Required behavior

1. Keep it light and practical.
2. Surface only the highest value risks or gaps.
3. Label unknowns plainly.
4. Escalate to full CTP if the task is high stakes, analysis heavy, or ambiguous.
5. Do not repeat the full CTP unless Ro asks for it.

## Output shape

Short verdict, top checks, and whether full CTP is needed.

## Truth rule

`checkit` is a quick sanity pass, not a license to skip rigor.
