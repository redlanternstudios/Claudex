# TruthCal Receipt TC-20260714-CDX-15

Date: 2026-07-14
Product: claudex
Lane: claudex/document-skill-alias
Author: codex
Intent: Add the /rlsdoc RedLantern document skill alias and keep it matched to the studio standard template flow
Result: COMPLETE

## Truth

VERIFIED: `Claudex/.claude/skills/rlsdoc.md` now exists and routes RedLantern documents through the same studio standard flow as the existing branded doc path.
VERIFIED: The new skill keeps the document contract anchored to `.claude/brand/BRAND_DOCUMENT_STANDARD.md` and `.claude/brand/RLS_DOCUMENT_TEMPLATE.html`.
VERIFIED: The new skill requires HTML first and PDF for human facing delivery.
UNKNOWN: Whether the current Footprint Homira PDF render is already clean, because the HTML artifact still needs a live render check.

## Evidence

Files added:
- `Claudex/.claude/skills/rlsdoc.md`
- `Claudex/OPS/receipts/TC-20260714-CDX-15__claudex__rlsdoc_document_skill_alias.md`

Decision:
Use `/rlsdoc` as the current studio name for this document flow. Keep `/rlsdox` as the existing live path unless Ro asks to retire it.

## Next action

Install the matching personal Codex skill copy, then render and verify the Homira PDF against the directive.
