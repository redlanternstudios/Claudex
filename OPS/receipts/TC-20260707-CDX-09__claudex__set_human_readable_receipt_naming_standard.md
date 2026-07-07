# TruthCal Receipt TC-20260707-CDX-09

Date: 2026-07-07
Product: claudex
Lane: claudex/naming-standard
Author: codex
Intent: Set human readable receipt naming standard
Result: COMPLETE

## Truth

VERIFIED: Receipt created through the Claudex command layer.
VERIFIED: Receipt filename uses the new readable pattern.
VERIFIED: `OPS/NAMING_STANDARD.md` defines the going forward convention.
VERIFIED: `OPS/BRIDGE_PROTOCOL.md`, `OPS/TRUTHCAL_RECEIPT.md`, `AGENTS.md`, `CLAUDE.md`, `.claude/CLAUDE.md`, `docs/EXTERNAL_OPERATOR_ONBOARDING.md`, and `OPS/KEYMON_SWARMCLAW_SETUP.md` now point engines and operators at the standard.
VERIFIED: `scripts/bridge.mjs` now creates new receipt paths through the readable filename helper.
UNKNOWN: Whether Keymon has read the updated docs on his Mac. This resolves when his next Claudex pull or answer desk run confirms it.

## Evidence

Audit finding: `TC-20260707-CDX-08.md` is machine identifiable but not human obvious. The new pattern keeps the receipt ID first and adds product plus topic words.

Test run:
`npm run bridge:test`

Result:
21 tests passed.

Files changed:
- `OPS/NAMING_STANDARD.md`
- `OPS/BRIDGE_PROTOCOL.md`
- `OPS/TRUTHCAL_RECEIPT.md`
- `AGENTS.md`
- `CLAUDE.md`
- `.claude/CLAUDE.md`
- `docs/EXTERNAL_OPERATOR_ONBOARDING.md`
- `OPS/KEYMON_SWARMCLAW_SETUP.md`
- `scripts/lib/bridge-core.mjs`
- `scripts/bridge.mjs`
- `tests/bridge-core.test.mjs`

## Next action

Run `npm run check`, commit, and publish.
