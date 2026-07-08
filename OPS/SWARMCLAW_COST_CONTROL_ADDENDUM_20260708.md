# SwarmClaw Cost Control Addendum

Date: 2026-07-08
Owner: Ro
Scope: Claudex SwarmClaw cost control
Status: COMPLETE

## Objective

Keep SwarmClaw on local Ollama defaults and stop accidental paid provider spend.

## Verified State

VERIFIED:
- `swarmclaw/RL_ORG_CHART_LIVE.json` now routes every agent to `ollama` with `llama3.1:8b`.
- `swarmclaw/set_deepseek_routing.py` is now a deprecated wrapper that still routes to local Ollama.
- `swarmclaw/KEYMON_SETUP.md` now tells Keymon to use local Ollama by default and treat DeepSeek or Groq as exception only.
- `swarmclaw/set_ollama_all.py` exists as the local only re apply script.
- `python3 swarmclaw/set_ollama_all.py --dry-run` reports no model changes needed after the live chart update.

PARTIAL:
- External SwarmClaw runtime instances may still need a restart or reload to pick up the file on disk.

## How Keymon Retrieves This

1. Pull Claudex.
2. Open this file.
3. Open `swarmclaw/KEYMON_SETUP.md`.
4. If the chart drifts again, run `python3 swarmclaw/set_ollama_all.py`.

## Cost Rule

DeepSeek, Groq, Anthropic, and OpenRouter are exception only. Local Ollama stays the default for routine swarm work.

## Related Receipt

`OPS/receipts/TC-20260708-CDX-06__claudex__swarmclaw_local_only_routing.md`
