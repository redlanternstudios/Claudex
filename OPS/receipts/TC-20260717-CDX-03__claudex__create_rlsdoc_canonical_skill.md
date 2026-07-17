# TruthCal Receipt TC-20260717-CDX-03

Date: 2026-07-17
Product: claudex
Lane: claudex/document-skill-alias
Author: codex
Intent: Create the canonical /rlsdoc RedLantern document skill and keep /rlsdox as the alias
Result: COMPLETE

## Truth

VERIFIED: `Claudex/.claude/skills/rlsdoc.md` now exists as the canonical RedLantern document skill and contains the exact workflow steps for HTML first, PDF second, and page 1 verification.
VERIFIED: `Claudex/.claude/skills/rlsdox.md` now points to `/rlsdoc` as the canonical path and remains the compatibility alias.
VERIFIED: `Claudex/OPS/DECISION_LOG.md` now records `/rlsdoc` as the canonical studio document skill.
VERIFIED: The shared brand standard and shared HTML template already use the correct black and white diagonal sash and the clean export path.

## Evidence

Files changed:
- `Claudex/.claude/skills/rlsdoc.md`
- `Claudex/.claude/skills/rlsdox.md`
- `Claudex/OPS/DECISION_LOG.md`

## Next action

Use `/rlsdoc` for future RedLantern document requests and keep `/rlsdox` only as a backward compatible alias.
