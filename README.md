# Claudex

Claudex is the RedLantern Studios control plane shared by Codex, Claude, humans, and automation.

It stores continuation state, not product code and not secrets.

## Start

```bash
npm run bridge:status
npm run bridge:doctor
```

## Core commands

```bash
npm run bridge -- focus amina
npm run bridge -- open amina amina/engagement-loop codex "Verify the core loop"
npm run bridge -- warn amina "Live schema is not verified"
npm run bridge -- block amina "Unsafe migration state"
npm run bridge -- resolve amina "Live schema is not verified"
npm run bridge -- receipt amina "Verified the core loop"
npm run bridge -- handoff amina claude "Review the verified loop" OPS/receipts/TC-20260702-003.md
npm run bridge -- close amina amina/engagement-loop OPS/receipts/TC-20260702-003.md
```

## Contract

`OPS/BRIDGE.json` is the only mutable studio state.

`OPS/BRIDGE_PROTOCOL.md` defines colors and handoffs.

`OPS/TODAY.md` defines current intent.

`OPS/ENGINE_REGISTRY.json` records capability evidence.

`OPS/receipts/` proves meaningful transitions.

## Safety

Claudex rejects contradictory colors, missing required artifacts, and secret shaped values.

Writes are validated, revision checked, locked, and atomic. The previous state is copied to a local ignored backup before replacement. A stale engine cannot silently overwrite newer state.

## Consumers

Run:

```bash
node scripts/install-consumer.mjs "/path/to/product" amina
```

This creates a pointer manifest and boot note. It does not copy bridge state.
