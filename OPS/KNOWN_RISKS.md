# KNOWN_RISKS.md — [PRODUCT NAME]
> Living risk register. Append-only additions. Risks are resolved, never deleted.
> Every agent reads this before proposing changes to affected areas.

---

## RISK FORMAT
```
[RISK-NNN] — [SEVERITY: CRITICAL/HIGH/MEDIUM/LOW] — [STATUS: OPEN/MITIGATED/RESOLVED]
Area: [auth | rls | data | logic | api | ui | infra | external]
Description: [what could go wrong]
Trigger: [what action would cause this]
Blast radius: [who/what is affected]
Current mitigation: [what's in place or NONE]
Owner: [agent or Ro]
Last reviewed: [date]
```

---

## CRITICAL RISKS

### [RISK-001] — CRITICAL — OPEN
**Area:** rls  
**Description:** Any table without RLS enabled exposes all user data to any authenticated user  
**Trigger:** New table created without running `ALTER TABLE x ENABLE ROW LEVEL SECURITY`  
**Blast radius:** ALL users — data breach  
**Current mitigation:** rls_audit.sql must be run before every deploy  
**Owner:** SECURITY  
**Last reviewed:** —

### [RISK-002] — CRITICAL — OPEN
**Area:** auth  
**Description:** Service role key exposed in client bundle bypasses all RLS policies  
**Trigger:** `SUPABASE_SERVICE_ROLE_KEY` referenced in any `NEXT_PUBLIC_*` var or client-side file  
**Blast radius:** Complete data exposure  
**Current mitigation:** ENV_VARS.md documents separation. SECURITY audits before deploy.  
**Owner:** SECURITY  
**Last reviewed:** —

### [RISK-005] — CRITICAL — MITIGATED
**Area:** infra  
**Description:** Single-provider token exhaustion takes down entire SwarmClaw OS. All agents share one Groq API key with 500k token/day on_demand cap. When exhausted, ROBBY queues, all dependent agents stall, OS goes dark until midnight UTC reset.  
**Trigger:** Any active build day with 9+ agents running concurrently. Observed: hit 499,596/500k on 2026-06-10.  
**Blast radius:** ENTIRE OS — ROBBY cannot orchestrate, no agent can respond, all active workflows stalled  
**Current mitigation:** `swarmclaw/MODEL_ROUTING_POLICY.md` — tier-based token budgets, Ollama fallback, OBSERVE monitoring duty, exhaustion thresholds (60/75/85/95/100%). Groq Dev Tier upgrade required (doubles daily cap).  
**Owner:** RUNTIME  
**Last reviewed:** 2026-06-10

---

## HIGH RISKS

### [RISK-003] — HIGH — OPEN
**Area:** logic  
**Description:** Business logic in Next.js API routes instead of n8n creates untestable, unobservable, unmaintainable flows  
**Trigger:** Any Claude output that puts AI inference, data processing, or business rules in `/app/api/`  
**Blast radius:** Maintainability, testability, observability  
**Current mitigation:** Stack rule enforced in ARCHITECT prompt. ADR required for any deviation.  
**Owner:** ARCHITECT  
**Last reviewed:** 2026-06-10

### [RISK-004] — HIGH — OPEN
**Area:** data  
**Description:** AI-generated code invents table/column names that don't exist in Supabase  
**Trigger:** Agent writes queries to tables not in DATABASE_MAP.md  
**Blast radius:** Runtime errors, data loss  
**Current mitigation:** Hallucination tripwires in RUNTIME prompt. DATABASE_MAP.md required reading.  
**Owner:** TRUTH  
**Last reviewed:** —

---

## PRODUCT-SPECIFIC RISKS
> Add product-specific risks here as they are discovered

---
*Updated at every session end. New risks added by any agent. Resolved only after verification.*
