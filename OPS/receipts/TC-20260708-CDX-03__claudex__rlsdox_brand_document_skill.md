# TruthCal Receipt TC-20260708-CDX-03

Date: 2026-07-08
Product: claudex
Lane: claudex/keymon-codex-cost-setup
Author: codex
Intent: Add /rlsdox branded document skill and route RedLantern docs through the standard template
Result: COMPLETE

## Truth

VERIFIED: `.claude/skills/rlsdox.md` now exists and defines the RedLantern doc workflow.
VERIFIED: `~/.codex/skills/rlsdox/SKILL.md` now exists and makes `/rlsdox` available to Codex sessions.
VERIFIED: `OPS/KEYMON_CODEX_COST_SETUP_20260708.md` now points RedLantern document output to `/rlsdox`.
VERIFIED: `OPS/CTP_CODEX_COST_SETUP_20260708.md` now records the `/rlsdox` routing decision.
VERIFIED: `OPS/DECISION_LOG.md` now contains ADR-006 for the document output route.
UNKNOWN: Whether any future Drive template drift exists outside this repo. If needed, the Drive source should be checked before generating a final document.

## Evidence

Files added:
- `.claude/skills/rlsdox.md`
- `OPS/receipts/TC-20260708-CDX-03__claudex__rlsdox_brand_document_skill.md`

Files updated:
- `OPS/KEYMON_CODEX_COST_SETUP_20260708.md`
- `OPS/CTP_CODEX_COST_SETUP_20260708.md`
- `OPS/DECISION_LOG.md`

Decision:
Use `/rlsdox` for RedLantern document output that must ship in the studio standard format. The skill reads the brand standard and master template, then renders the output as branded HTML and PDF instead of plain markdown.

Keymon retrieval:
Pull Claudex and open `OPS/KEYMON_CODEX_COST_SETUP_20260708.md`.

## Next action

Use `/rlsdox` for the next branded RedLantern document request, and treat plain markdown as a draft only.
