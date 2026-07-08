# TruthCal Receipt TC-20260708-CDX-01

Date: 2026-07-08
Product: claudex
Lane: claudex/codex-cost-setup
Author: codex
Intent: Document Codex cost setup for Keymon
Result: COMPLETE

## Truth

VERIFIED: Receipt created through the Claudex command layer.
VERIFIED: `OPS/CTP_CODEX_COST_SETUP_20260708.md` records the CTP analysis and accepted decision.
VERIFIED: `OPS/KEYMON_CODEX_COST_SETUP_20260708.md` gives Keymon a direct retrieval and setup checklist.
VERIFIED: `OPS/DECISION_LOG.md` contains ADR-004 for the Codex cost setup decision.
VERIFIED: `OPS/KEYMON_SWARMCLAW_SETUP.md` points Keymon to the new Codex setup file.
PARTIAL: Ro local Codex setup was verified in the prior audit. Keymon setup remains unverified until Keymon runs the checklist and writes a receipt.
UNKNOWN: Whether Keymon has the same global API key export issue on his machine.

## Evidence

Files added:
- `OPS/CTP_CODEX_COST_SETUP_20260708.md`
- `OPS/KEYMON_CODEX_COST_SETUP_20260708.md`

Files updated:
- `OPS/DECISION_LOG.md`
- `OPS/KEYMON_SWARMCLAW_SETUP.md`
- `OPS/BRIDGE.json`
- `OPS/receipts/INDEX.md`

Decision:
Default Codex should use `gpt-5.4-mini` with low reasoning for routine work. Deep and review profiles preserve `gpt-5.5` for high risk work. Global `OPENAI_API_KEY` exports should stay disabled so Codex does not route routine usage through API billing by accident.

Keymon retrieval:
Pull Claudex and open `OPS/KEYMON_CODEX_COST_SETUP_20260708.md`.

## Next action

Run `npm run check`, commit, push, then Keymon mirrors the setup and receipts his machine proof.
