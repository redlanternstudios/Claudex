# SWARMCLAW — APPLY THESE CHANGES NOW
Created: 2026-06-12 | Priority: CRITICAL | Owner: Ro

These are the manual steps required to make the file changes live in SwarmClaw.
Files on disk do NOT auto-load into running agents — you have to apply them in the UI.

---

## WHY ROBBY ISN'T RESPONDING

Two causes:
1. `DEEPSEEK_API_KEY` is not set → DeepSeek call fails → Robby goes silent
2. Robby's prompt in SwarmClaw UI is still the old version → v3 changes not live

Fix both below.

---

## STEP 1 — SET DEEPSEEK_API_KEY (do this first)

1. Get your key: https://platform.deepseek.com/api_keys
2. In SwarmClaw: Settings → Environment / Secrets
3. Add: `DEEPSEEK_API_KEY = <your key>`
4. Save. Restart any agents if required.

If you want to route through OpenRouter instead of DeepSeek direct:
- Use your existing `OPENROUTER_API_KEY`
- In the routing script, open `swarmclaw/set_deepseek_routing.py`
- Change: `DEEPSEEK_R1 = "deepseek-reasoner"` → `"deepseek/deepseek-r1"`
- Change: `DEEPSEEK_V3 = "deepseek-chat"` → `"deepseek/deepseek-chat"`
- Re-run: `python3 swarmclaw/set_deepseek_routing.py`

---

## STEP 2 — UPDATE ROBBY'S SYSTEM PROMPT IN SWARMCLAW UI

1. Open: `memory/agent_prompts/robby_v3_20260610.md`
2. Copy the entire contents
3. In SwarmClaw: find Robby → Edit Agent → System Prompt
4. Replace the existing prompt with the v3 contents
5. Save

What's new in v3:
- PING PROTOCOL: Robby now immediately acknowledges all @mentions
- PROVIDER AWARENESS: Robby knows about DeepSeek, knows to flag API failures
- SESSION START: now reads MODEL_ROUTING_POLICY.md
- LARGE MESSAGE PROTOCOL: chunk handling for big inputs

---

## STEP 3 — UPDATE ROBBY'S MODEL IN SWARMCLAW UI

In SwarmClaw → Robby → Edit Agent → Model:
- Set to: `deepseek-chat`
- Provider: DeepSeek (api.deepseek.com) OR OpenRouter

---

## STEP 4 — UPDATE T0/T1 AGENT MODELS (do in order of importance)

These 11 agents need their model updated in SwarmClaw UI.

### Set to `deepseek-reasoner`:
| Agent     | Why                              |
|-----------|----------------------------------|
| TRUTH     | Bar Raiser — cannot be wrong     |
| SECURITY  | High-stakes security review      |
| CHANGE    | Prod change mgmt — careful       |
| ARCHITECT | Complex system design trade-offs |
| REVIEWER  | Code review — catch subtle bugs  |

### Set to `deepseek-chat`:
| Agent          | Why                         |
|----------------|-----------------------------|
| SUPERVISOR     | Org oversight               |
| RUNTIME        | CTO / system state          |
| CHIEF_OF_STAFF | COO / intent translation    |
| PM             | Product mgmt                |
| BACKEND        | Engineering execution       |
| FRONTEND       | Engineering execution       |

All others → leave on Groq llama-4-scout (unchanged).

---

## STEP 5 — UPDATE PM SYSTEM PROMPT (optional but recommended)

PM v2 prompt is at: `memory/agent_prompts/pm_v2_20260610.md`
It does not currently reference DeepSeek. It will still work — just won't have provider awareness.
Low urgency, do after Robby is confirmed working.

---

## STEP 6 — VERIFY ROBBY IS ALIVE

After applying Steps 1–3:
1. Open the main SwarmClaw room
2. Type: `@robby are you there`
3. Expected response within a few seconds:
   `ROBBY: Here. Idle. Ready for input.`

If no response:
- Check DEEPSEEK_API_KEY is saved
- Check the model field shows deepseek-chat not llama-4-maverick
- Check SwarmClaw console/logs for API errors

---

## WHAT'S ALREADY DONE (files on disk — no action needed)

| File | Status |
|------|--------|
| `memory/agent_prompts/robby_v3_20260610.md` | ✓ Written — needs manual paste to UI |
| `swarmclaw/RL_ORG_CHART_LIVE.json` | ✓ Updated — model fields set |
| `swarmclaw/MODEL_ROUTING_POLICY.md` | ✓ Updated — DeepSeek documented |
| `swarmclaw/set_deepseek_routing.py` | ✓ Script written and executed |
| `OPS/LARGE_MESSAGE_PROTOCOL.md` | ✓ Written — chunking protocol live |
