# BRAINSMART APPROVAL GATE — deliberation gate

Version 1.0 · 2026-07-02 · **DOCTRINE.** Source `QBos/packages/delivery-kernel/src/brainsmart` = PARTIAL (665 LOC, real logic, scope-lock).

Deeper reasoning before action — but only when it earns its cost. NOT always-on.

## WHEN IT TRIGGERS (high blast radius only)
- Scope changes on a locked scope
- Architecture decisions
- High-cost work (money, time, irreversible)
- Launch / deploy decisions
- Cross-product changes
- Safety or religious risk
- Production-readiness calls

## WHEN IT DOES NOT
Routine edits, single-file changes, reads, low-risk mechanical work. Running BrainSmart on every task slows the whole OS — that is a known anti-pattern. Default is: proceed without it.

## WHAT IT DOES
Analyze intent → build plan → estimate risk + cost → recommend → **enforce scope lock** (block silent scope expansion) → write a receipt of the deliberation.

## RULES
- BrainSmart advises; it does not approve. High-impact approval is Ro's.
- A locked scope cannot be expanded without an explicit new decision (logged in `OPS/DECISION_LOG.md`).
- Its reasoning is receipted so the decision is reconstructable.
