# SwarmClaw AI Cost Setup Guide
For: Keymon Penn
From: Ro / RedLantern Studios
Date: June 2026

---

## What SwarmClaw Is

SwarmClaw is our internal AI operating system. It runs 36 AI agents that handle product work, code review, deployment, research, and ops tasks. Think of it as a dev team that runs 24/7.

The agents talk to AI model providers (DeepSeek, Groq) via API. Those providers charge per token (per word processed). If routing is wrong, costs spike fast.

---

## The Cost Problem

The old paid provider setup burned money because too many agents and workflows were routed through a paid provider by default.

---

## The Correct Setup

### Default

Use local Ollama for routine swarm work.

Model to use: `llama3.1:8b`

### Paid providers

DeepSeek, Groq, Anthropic, and OpenRouter are exception only. Do not load money into them unless Ro has assigned a named lane and a receipt records why.

---

## How to Set This Up in SwarmClaw

1. Go to SwarmClaw.
2. Confirm agents are on local Ollama.
3. If the chart drifts, reapply the local only router from Claudex.

---

## API Keys You Need

**Local Ollama**
- Default provider for routine swarm work.
- No paid API key needed.

**Paid providers**
- Only for named exception lanes with a receipt.

---

## Balance Alerts (Do This Now)

If a paid lane is active, set a spend alert before adding credit.

---

## Expected Monthly Cost With Correct Setup

| Tier | Provider | Est. Monthly |
|---|---|---|
| Default local | Ollama | $0 |
| Paid exception lane | DeepSeek or Groq | Only when explicitly approved |

---

## Rule of Thumb

If a workflow is routine, keep it local.
If a workflow needs paid provider spend, get the lane named in a receipt first.

## Claudex File Names

When Keymon or Keymon's engines create Claudex receipts, follow `OPS/NAMING_STANDARD.md`.

New receipt files use:

`TC-YYYYMMDD-ENG-NN__product__topic_words.md`

Example:

`TC-20260707-HUM-01__amina__testflight_submission.md`

The receipt ID proves order. The product and topic words explain what is inside before anyone opens the file.

---

Questions: message Ro or check `swarmclaw/MODEL_ROUTING_POLICY.md` in the repo.

## Codex Cost Setup

Keymon should also read:

`OPS/SWARMCLAW_COST_CONTROL_ADDENDUM_20260708.md`

That file is the current local only routing truth for SwarmClaw and the handoff back into Claudex.
