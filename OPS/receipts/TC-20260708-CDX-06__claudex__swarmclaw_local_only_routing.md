# TruthCal Receipt TC-20260708-CDX-06

Date: 2026-07-08
Product: claudex
Lane: claudex/keymon-codex-cost-setup
Author: codex
Intent: Reapply SwarmClaw so every agent defaults to local Ollama and paid providers stay exception only
Result: COMPLETE

## Truth

VERIFIED: `swarmclaw/RL_ORG_CHART_LIVE.json` now routes all agents to `ollama` with `llama3.1:8b`, and the paid secondary provider fields are cleared.
VERIFIED: `swarmclaw/set_ollama_all.py` exists and the dry run reports no model changes needed after the live chart update.
VERIFIED: `swarmclaw/set_deepseek_routing.py` is now a deprecated wrapper that still routes to local Ollama.
VERIFIED: `swarmclaw/KEYMON_SETUP.md` now tells Keymon to keep DeepSeek and Groq as exception only.
VERIFIED: `OPS/SWARMCLAW_COST_CONTROL_ADDENDUM_20260708.md` records the completed cost control state for easy retrieval.
UNKNOWN: Whether every external SwarmClaw runtime has already reloaded the chart on disk. If not, restart SwarmClaw.

## Evidence

Files changed:
- `swarmclaw/RL_ORG_CHART_LIVE.json`
- `swarmclaw/set_ollama_all.py`
- `swarmclaw/set_deepseek_routing.py`
- `swarmclaw/KEYMON_SETUP.md`
- `OPS/SWARMCLAW_COST_CONTROL_ADDENDUM_20260708.md`

Test command:
- `python3 swarmclaw/set_ollama_all.py --dry-run`

Test output:
- `No model changes needed.`

Manual QA:
1. Open `swarmclaw/RL_ORG_CHART_LIVE.json`.
2. Confirm the agent defaults are `provider: ollama` and `model: llama3.1:8b`.
3. Confirm `secondary_provider` and `secondary_model` are null across the chart.

Expected result:
- No DeepSeek or Groq default routing remains.

Actual result:
- Verified in file and by dry run.

## Rollback Plan

Method: restore the backup file or revert the commit.
Steps:
1. Replace `swarmclaw/RL_ORG_CHART_LIVE.json` from the backup created by `set_ollama_all.py`.
2. Restore the prior routing docs if needed.
Rollback owner: Ro or Codex
Estimated time: 5 minutes
Last known good: d2585ef8752fcd5fea6efbdae4076bf89f59064d

## Sign Offs

TRUTH: PASS
SECURITY: PASS
CHANGE: PASS
COMPLIANCE: PASS
ROBBY: NOT REQUIRED

## Final Status

COMPLETE
Notes: Keymon can retrieve the setup by opening `OPS/SWARMCLAW_COST_CONTROL_ADDENDUM_20260708.md` and `swarmclaw/KEYMON_SETUP.md` in Claudex.
