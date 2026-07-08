# SwarmClaw AI Cost Setup Guide
For: Keymon Penn
From: Ro / RedLantern Studios
Date: June 2026

---

## What SwarmClaw Is

SwarmClaw is our internal AI operating system. It runs 36 AI agents that handle product work, code review, deployment, research, and ops tasks. Think of it as a dev team that runs 24/7.

The agents talk to AI model providers (DeepSeek, Groq) via API. Those providers charge per token (per word processed). If routing is wrong, costs spike fast.

---

## The Cost Problem (What Happened to Us)

We burned $60 in June because all 36 agents were pointed at DeepSeek's premium model (deepseek-v4-pro). Most of those agents don't need that much power. They're doing simple tasks like writing docs, running QA checks, formatting content. Paying premium model prices for that is wasteful.

---

## The Correct Setup (Two Provider System)

### Tier 1 — DeepSeek (smart, costs more, use sparingly)

Use DeepSeek for agents that need actual reasoning: architecture decisions, quality gates, product management, backend/frontend logic, security review.

Agents that belong here (13 total):
- ROBBY (conductor)
- CHIEF OF STAFF
- RUNTIME (system state)
- PM (product manager)
- FRONTEND
- BACKEND
- ARCHITECT (use deepseek-reasoner model)
- TRUTH (use deepseek-reasoner model)
- CHANGE (production change management)
- SECURITY (auth and data trust)
- REVIEW (code review)
- COMPLIANCE (legal/regulatory)
- QA (quality assurance)

Model to use: `deepseek-chat` for most, `deepseek-reasoner` only for ARCHITECT and TRUTH.

### Tier 2 — Groq (fast, nearly free, use for everything else)

Use Groq for agents doing pattern matching, writing, formatting, monitoring, deployment, research, content. These tasks don't need deep reasoning.

Agents that belong here (23 total):
PEOPLE ROSTER, DESIGN, SCHOLARLY REVIEW, ASO/SEO, RESEARCH, SUPPORT, MARKETING, LIBRARIAN, OBSERVE, DEPLOY, TECHWRITER, ANALYTICS, SALES, HANDOFF, ACCESSIBILITY, FINANCE, EDITORIAL, DEBUG, BRAND COPY, DATA, CONTENT, INFRA, and the default agent.

Model to use: `llama-4-scout-17b-16e-instruct`

---

## How to Set This Up in SwarmClaw

1. Go to SwarmClaw (localhost:3456 when running locally)
2. Click Agents in the left nav
3. For each Tier 2 agent:
   - Click the agent
   - Change Provider → Groq
   - Change Model → llama-4-scout-17b-16e-instruct
   - Save

OR run the migration script (ask Ro for path: `/Users/rorysemeah/swarmclaw/set_deepseek_all.py` — there's a version that handles routing).

---

## API Keys You Need

**DeepSeek** (for Tier 1 agents)
- Platform: platform.deepseek.com
- Add in SwarmClaw → Settings → Credentials → Add → DeepSeek
- API Key location: in OPS/PROVIDER_LOCATIONS.md

**Groq** (for Tier 2 agents)
- Platform: console.groq.com
- Add in SwarmClaw → Settings → Credentials → Add → Groq
- API Key location: in OPS/PROVIDER_LOCATIONS.md
- Important: Get the paid/Dev tier on Groq. Free tier hits rate limits fast when 23 agents are calling it.

---

## Balance Alerts (Do This Now)

**DeepSeek:**
- Go to platform.deepseek.com/usage
- Click "Balance alert disabled (Settings)"
- Set alert at $5 remaining balance
- This prevents the account from going negative (which blocks all agents)

**Groq:**
- console.groq.com → Settings → Billing
- Set a monthly spend cap

---

## Expected Monthly Cost With Correct Setup

| Tier | Agents | Provider | Est. Monthly |
|---|---|---|---|
| Tier 1 core | 11 agents on deepseek-chat | DeepSeek | ~$10-15 |
| Tier 1 reasoning | 2 agents on deepseek-reasoner | DeepSeek | ~$5-10 |
| Tier 2 all specialist | 23 agents on llama-4-scout | Groq | ~$2-5 |
| **Total** | | | **~$17-30/month** |

vs. what we were spending: $60+ in June with wrong routing.

---

## Rule of Thumb

If an agent is writing copy, doing research, running tests, deploying code, or formatting output → Groq.
If an agent is making architecture decisions, reviewing code quality, or holding a quality gate → DeepSeek.
Only ARCHITECT and TRUTH get the reasoner model.

## Claudex File Names

When Keymon or Keymon's engines create Claudex receipts, follow `OPS/NAMING_STANDARD.md`.

New receipt files use:

`TC-YYYYMMDD-ENG-NN__product__topic_words.md`

Example:

`TC-20260707-HUM-01__amina__testflight_submission.md`

The receipt ID proves order. The product and topic words explain what is inside before anyone opens the file.

---

Questions: message Ro or check `/swarmclaw/MODEL_ROUTING_POLICY.md` in the repo.

## Codex Cost Setup

Keymon should also read:

`OPS/KEYMON_CODEX_COST_SETUP_20260708.md`

That file is the current Codex setup for lower routine usage and safer auth. It explains the default `gpt-5.4-mini` setup, the deep and review profiles, and the check that prevents accidental API billing through a global `OPENAI_API_KEY`.
