# TruthCal Receipt TC-20260713-CDX-04

Date: 2026-07-13
Product: footprint
Lane: footprint/proof_bridge
Author: codex
Intent: SwarmClaw proof bridge preflight
Result: HOLD

## Truth

VERIFIED: Receipt created through the Claudex command layer.

VERIFIED: Claudex alignment is YELLOW and ALIGNED, not RED.

VERIFIED: The bridge validates and names `footprint/proof_bridge`.

VERIFIED: The global focus remains `the_lantern`.

VERIFIED: The Lantern product record fingerprint is unchanged at `163944dc604a234af45e0dd68495e603da3356120e2572fffd152b868395620f`.

PARTIAL: Required SwarmClaw roles exist across the registry and permission matrix, but current authority and live routing are incomplete.

UNKNOWN: Live Footprint Supabase, n8n, analytics, error monitoring, identity, and LinkedIn platform authority.

## Evidence

1. Reconciliation commit before registration: `b235dd1d7f5a313a3d9f62167f30bc7c1d0a36db`.
2. Footprint planning commit: `7ea97730af3c8a5403b522b700b60c3d903911aa`.
3. Footprint consumer connection commit: `e3497f2f4ad9de7106889a8c5794c31939d8c837`.
4. `npm run bridge:doctor` passed every integrity check.
5. `npm run bridge:align` returned YELLOW, ALIGNED, and dirty because unrelated user work remains preserved.
6. `npm run check` passed twenty three tests before registration.
7. `OPS/FOOTPRINT_PROOF_BRIDGE_PREFLIGHT_20260713.md` records every blocker, owner, Codex action, and manual Ro action.
8. No secret value is present in this receipt.

## Next action

Resolve every named blocker, repeat the preflight, and begin implementation only after a READY verdict.
