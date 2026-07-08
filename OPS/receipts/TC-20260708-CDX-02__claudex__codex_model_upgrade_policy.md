# TruthCal Receipt TC-20260708-CDX-02

Date: 2026-07-08
Product: claudex
Lane: claudex/keymon-codex-cost-setup
Author: codex
Intent: Add future Codex model upgrade policy for scalable cost control
Result: COMPLETE

## Truth

VERIFIED: `OPS/KEYMON_CODEX_COST_SETUP_20260708.md` now includes a future model upgrade rule.
VERIFIED: `OPS/CTP_CODEX_COST_SETUP_20260708.md` now records the upgrade policy in the CTP decision.
VERIFIED: `OPS/DECISION_LOG.md` now contains ADR-005 for evidence gated model promotion.
PARTIAL: The policy is documented and ready, but no future model comparison has been run yet because no new model decision is active right now.
UNKNOWN: Which future model, if any, will become the best candidate. That will need side by side testing when it exists.

## Evidence

Files updated:
- `OPS/KEYMON_CODEX_COST_SETUP_20260708.md`
- `OPS/CTP_CODEX_COST_SETUP_20260708.md`
- `OPS/DECISION_LOG.md`

Decision:
Keep `gpt-5.4-mini` as the default for routine work. Treat new models as candidates only after they prove lower cost or better output on real RedLantern tasks, then promote them in stages instead of flipping the default on hype.

Keymon retrieval:
Pull Claudex and open `OPS/KEYMON_CODEX_COST_SETUP_20260708.md`.

## Next action

Use the current cheap default now, and when a new model appears, test it in deep mode before changing the default profile.
