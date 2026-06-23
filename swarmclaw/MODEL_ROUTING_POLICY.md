# MODEL_ROUTING_POLICY.md — SwarmClaw Provider Routing & Token Budget Governance
Version: 1.1 | Created: 2026-06-10 | Updated: 2026-06-12 | Owner: RUNTIME
Trigger: Groq on_demand exhaustion incident (499,596/500,000 tokens — 2026-06-10)
v1.1 Change: DeepSeek added as T0/T1 primary provider. Script: swarmclaw/set_deepseek_routing.py

---

## 1. OBJECTIVE

Prevent single-provider token exhaustion from taking down the entire SwarmClaw OS.
Define deterministic routing rules, per-tier token budgets, and fallback assignment for every agent.

---

## 2. ROOT CAUSE (INCIDENT 2026-06-10)

**What happened:** Groq on_demand tier daily token limit hit (499,596 / 500,000 used).
ROBBY queued. All dependent agent responses stalled. OS effectively dark.

**Why it happened:**
- All 27+ agents routed to single Groq provider, single API key
- No token budget governance — every agent competed for the same pool
- No exhaustion threshold monitoring
- No fallback routing configured
- No alerting before the wall was hit

**False assumption that caused it:**
Groq on_demand (500k tokens/day) is sufficient for multi-agent concurrent operation.

**Reality:** 9 active agents × average 2k tokens/response × ~30 interactions/day = 540k+ tokens.
This limit gets hit before end of business on any active build day.

---

## 3. PROVIDER PRIORITY STACK

```
T0/T1 PRIMARY: DeepSeek (deepseek-reasoner / deepseek-chat)   — governance + build core
               API: https://api.deepseek.com | Key: DEEPSEEK_API_KEY
               Alt: OpenRouter with "deepseek/deepseek-reasoner" / "deepseek/deepseek-chat"

T2-T4 PRIMARY: Groq (llama-4-scout)                           — fast, cheap, high-volume agents
FALLBACK:      Ollama local (localhost, any running model)     — zero cost, no rate limit
SECONDARY:     OpenRouter (claude-haiku-4-5 / llama-3-8b)     — cloud fallback if Ollama down
RESERVE:       Anthropic direct (Claude Sonnet)                — emergency governance only
```

**DeepSeek model assignment:**
- `deepseek-reasoner` (R1) → TRUTH, SECURITY, CHANGE, ARCHITECT, REVIEWER
  Agents that make high-stakes decisions. Needs chain-of-thought. Wrong output = real damage.
- `deepseek-chat` (V3) → ROBBY, SUPERVISOR, RUNTIME, CHIEF_OF_STAFF, PM, BACKEND, FRONTEND
  Coordination + build execution. Needs speed + judgment.

**Routing decision order:**
1. Agent in T0/T1 → route to DeepSeek (reasoner or chat per map above)
2. Agent in T2-T4 → check Groq usage vs. threshold
3. If under Groq threshold → use Groq scout
4. If over Groq threshold → route to Ollama fallback
5. If Ollama unavailable → route to OpenRouter secondary

**To re-apply or update DeepSeek routing:**
```bash
python3 swarmclaw/set_deepseek_routing.py           # apply
python3 swarmclaw/set_deepseek_routing.py --dry-run # preview
python3 swarmclaw/set_deepseek_routing.py --revert  # restore Groq defaults
```

---

## 4. AGENT TIER CLASSIFICATION

### TIER 0 — GOVERNANCE SPINE (highest priority, reserved tokens)
Reserved daily allocation: **200,000 tokens** (40% of daily pool)
Models: Primary = llama-4-maverick (highest Groq tier), Fallback = Claude Sonnet direct

| Agent          | Role                     | Daily Token Reserve |
|----------------|--------------------------|---------------------|
| ROBBY          | RTE / Conductor          | 60,000              |
| SUPERVISOR     | Org oversight            | 40,000              |
| TRUTH          | Bar Raiser               | 40,000              |
| RUNTIME        | System state authority   | 40,000              |
| CHIEF_OF_STAFF | COO / intent translation | 20,000              |

**Rule:** If TIER 0 reserve is depleted, Ro must be notified. Session should pause.

---

### TIER 1 — BUILD CORE (high priority)
Reserved daily allocation: **150,000 tokens** (30% of daily pool)
Models: Primary = llama-4-maverick, Fallback = Ollama (llama3/mistral)

| Agent     | Role                   | Daily Token Budget |
|-----------|------------------------|--------------------|
| ARCHITECT | System architecture    | 40,000             |
| PM        | Product management     | 40,000             |
| BACKEND   | Backend engineering    | 30,000             |
| FRONTEND  | Frontend engineering   | 20,000             |
| REVIEWER  | Code review            | 20,000             |

---

### TIER 2 — QUALITY & RELEASE (medium priority)
Reserved daily allocation: **75,000 tokens** (15% of daily pool)
Models: Primary = llama-4-scout, Fallback = Ollama

| Agent   | Role               | Daily Token Budget |
|---------|--------------------|--------------------|
| QA      | Quality assurance  | 25,000             |
| DEPLOY  | Release management | 20,000             |
| SRE     | Reliability        | 15,000             |
| DATA    | Data layer         | 15,000             |

---

### TIER 3 — CONTENT & GTM (lower priority)
Reserved daily allocation: **50,000 tokens** (10% of daily pool)
Models: Primary = llama-4-scout, Fallback = Ollama

| Agent      | Role         | Daily Token Budget |
|------------|--------------|--------------------|
| EDITORIAL  | Content       | 15,000             |
| BRAND_COPY | Brand writing | 15,000             |
| MARKETING  | GTM           | 10,000             |
| DESIGNER   | Design        | 10,000             |

---

### TIER 4 — OPS & SUPPORT (lowest priority — haiku/scout only)
Reserved daily allocation: **25,000 tokens** (5% of daily pool)
Models: Primary = llama-4-scout (smallest), Fallback = Ollama, Secondary = OpenRouter haiku

| Agent         | Role             | Daily Token Budget |
|---------------|------------------|--------------------|
| LIBRARIAN     | Memory / docs     | 8,000              |
| SUPPORT       | User support      | 6,000              |
| FINANCE       | Financial ops     | 5,000              |
| SALES         | Sales ops         | 3,000              |
| PEOPLE_ROSTER | HR / roster       | 3,000              |

---

## 5. EXHAUSTION THRESHOLDS & ACTIONS

| Threshold | % Used  | Tokens Used  | Action                                                    |
|-----------|---------|--------------|-----------------------------------------------------------|
| WATCH     | 60%     | 300,000      | Log to routing_log.md. No action required.               |
| ALERT     | 75%     | 375,000      | OBSERVE agent notifies Ro. Tier 3+4 route to Ollama.     |
| THROTTLE  | 85%     | 425,000      | Tier 2-4 locked to Ollama/OpenRouter. Only Tier 0-1 use Groq. |
| CRITICAL  | 95%     | 475,000      | Only TIER 0 GOVERNANCE SPINE may use Groq. All others → Ollama. |
| EXHAUSTED | 100%    | 500,000      | Groq fully blocked. ROBBY notifies Ro. All routes → Ollama/OpenRouter. |

---

## 6. IMMEDIATE FIX ACTIONS (apply today)

### 6.1 Groq Tier Upgrade
- Go to: https://console.groq.com/settings/billing
- Upgrade to Dev Tier ($0 paid / increased limits)
- Dev Tier provides: 1M tokens/day on llama-4-scout, 500k on llama-4-maverick
- This doubles the daily cap immediately

### 6.2 Model Assignment Correction
Current state: ALL agents running llama-4- (exact variant unknown — likely maverick, highest cost)
Required: Tier 3-4 agents must run llama-4-scout (smaller, cheaper, lower token cost)

### 6.3 Ollama Local Setup (fallback)
If Ollama is not running on localhost:
```bash
# Install if not present
brew install ollama

# Pull lightweight fallback model
ollama pull llama3.2:3b

# Start Ollama service
ollama serve
```
Verify: `curl http://localhost:11434/api/tags`

### 6.4 Daily Reset Awareness
Groq daily limits reset at midnight UTC.
If OS hits EXHAUSTED threshold → pause non-critical work and resume after midnight UTC.

---

## 7. ROBBY ROUTING PROTOCOL UPDATE

ROBBY must check provider state before delegating tasks.

Add to ROBBY prompt context:
```
PROVIDER AWARENESS:
- Check routing_log.md for current Groq usage estimate before scheduling large tasks
- At THROTTLE threshold: do not assign Tier 2-4 agents to Groq tasks
- At CRITICAL threshold: only dispatch GOVERNANCE SPINE agents
- At EXHAUSTED: notify Ro. Suggest session pause or Ollama-only operation.
- Log every routing decision to routing_log.md
```

---

## 8. OBSERVE AGENT DUTY — RATE LIMIT MONITORING

Add to OBSERVE agent prompt:
```
RATE LIMIT MONITORING DUTY:
- At session start: check Groq usage via console.groq.com or routing_log.md estimate
- Maintain a running token estimate in routing_log.md based on observed responses
- Alert ROBBY when WATCH threshold (300k) is crossed
- Alert Ro directly when ALERT threshold (375k) is crossed
- Log every threshold crossing as a routing_log.md entry
```

---

## 9. RECEIPT FOR THIS INCIDENT

```
INCIDENT: GROQ-RATE-001
Date: 2026-06-10
Trigger: ROBBY queued message hit Groq 429 rate limit
Tokens used: 499,596 / 500,000
Requested: 16,240 tokens
Result: ROBBY response queued. OS stalled.
Root cause: No token budget governance. Single provider. No fallback.
Immediate fix: Groq tier upgrade + this policy
Systemic fix: Tier-based routing + Ollama fallback + OBSERVE monitoring duty
Status: POLICY WRITTEN — APPLY NOW
Owner: RUNTIME
```

---

## 10. ANTI-DRIFT RULES

- This policy is the source of truth for model routing. No agent config overrides it.
- Any new agent added to AGENT_REGISTRY.md MUST have: tier, primary_model, fallback_model
- LIBRARIAN audits this file weekly for drift
- RUNTIME owns this file. Only RUNTIME or Ro may change tier assignments.
- Any change to Groq tier or API key → update Section 3 and Section 6.1 immediately

---

*Created by: Claude (Cowork) on behalf of Ro | Incident trigger: 2026-06-10*
*Next review: 2026-06-17*
