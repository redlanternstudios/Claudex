# TruthCal Receipt TC-20260717-CDX-04

Date: 2026-07-17
Product: claudex
Lane: claudex/document-command-surface
Author: codex
Intent: Add /rlsdoc as a slash command surface in addition to the reusable skill
Result: COMPLETE

## Truth

VERIFIED: `Claudex/.claude/commands/rlsdoc.md` now exists and defines the `/rlsdoc` command surface.
VERIFIED: `Claudex/.claude/skills/rlsdoc.md` now exists and contains the exact reusable workflow steps.
VERIFIED: `Claudex/.claude/skills/rlsdox.md` remains the backward compatible alias and points to `/rlsdoc` as canonical.

## Evidence

Files changed:
- `Claudex/.claude/commands/rlsdoc.md`
- `Claudex/.claude/skills/rlsdoc.md`
- `Claudex/.claude/skills/rlsdox.md`
- `Claudex/OPS/DECISION_LOG.md`
- `Claudex/OPS/receipts/TC-20260717-CDX-04__claudex__add_rlsdoc_command_surface.md`

## Next action

Use `/rlsdoc` as the canonical studio document path and `/rlsdox` only as the compatibility alias.
