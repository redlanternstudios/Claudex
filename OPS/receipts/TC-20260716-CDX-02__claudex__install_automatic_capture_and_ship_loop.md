# TruthCal Receipt TC-20260716-CDX-02

Date: 2026-07-16
Product: claudex
Lane: claudex/keymon-codex-cost-setup
Author: codex
Intent: Install automatic capture and ship loop
Result: COMPLETE

## Truth

VERIFIED: Claudex now triggers a capture gate when authorized work creates a reusable topic, loop, rule, lesson, skill, control, or system advancement.
VERIFIED: Codex and Claude boot instructions both discover the same local skill and canonical contract.
VERIFIED: The gate refuses raw conversation, secrets, personal data, unsupported completion claims, and product implementation that belongs in another repository.
VERIFIED: Useful but unproven work routes to CLARIFY, BLOCKED, or PARKED instead of becoming permanent verified truth.
VERIFIED: Shipped state requires a TruthCal receipt and read back of the exact remote commit.
UNKNOWN: No product deployment, production mutation, credential change, or external message was authorized or performed.

## Evidence

- `node --test tests/capture-and-ship-contract.test.mjs`: 4 of 4 focused contract tests passed.
- `npm run check`: 35 of 35 repository tests passed, backlog integrity passed, and bridge doctor passed.
- `git diff --check`: passed.
- `OPS` secret scan: passed through bridge doctor.
- Primary authority: `OPS/CLAUDEX_CAPTURE_AND_SHIP.md`.
- Engine trigger: `.claude/skills/ship-to-claudex.md`.
- Discovery pointers: `AGENTS.md` and `.claude/CLAUDE.md`.
- Rollback: revert the Git commit containing this receipt and remove the capture trigger pointers.

## Next action

Use the capture gate whenever authorized work produces a verified reusable Claudex advancement. Continue owner execution from the ranked heartbeat.
