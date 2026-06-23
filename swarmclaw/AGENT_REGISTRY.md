# SwarmClaw Agent Registry — RedLantern Studios
# Last updated: 2026-06-10 (routing policy added — INCIDENT GROQ-RATE-001)
# All phases loaded. All agents active in SwarmClaw (localhost:3456).
# v2 prompts loaded 2026-06-10: ROBBY, RUNTIME, PM, CHIEF_OF_STAFF, SUPERVISOR, QA, DEPLOY, SECURITY, ARCHITECT, TECHWRITER, LIBRARIAN, OBSERVE, FINANCE
# KNOWN BREAK: PM (3087cb45) — 401 auth error. API key needs regeneration before PM-dependent sessions.
#
# MODEL ROUTING: See swarmclaw/MODEL_ROUTING_POLICY.md for full rules.
# TIERS: T0=Governance(reserved 200k), T1=Build(150k), T2=Quality(75k), T3=GTM(50k), T4=Ops(25k)
# FALLBACK ORDER: Groq → Ollama (localhost:11434) → OpenRouter
# EXHAUSTION THRESHOLDS: 75%=T3/T4→Ollama | 85%=T2-T4→Ollama | 95%=T1-T4→Ollama | 100%=ALL→Ollama

---

## GOVERNANCE SPINE — TIER 0 (reserved 200k tokens/day)

| Agent          | ID                   | Primary Model        | Fallback Model      | Tier | Phase | Status  |
|----------------|----------------------|----------------------|---------------------|------|-------|---------|
| ROBBY          | robby-conductor-001  | llama-4-maverick     | claude-sonnet-4-6   | T0   | base  | UPDATED |
| SUPERVISOR     | 68f3d9d6             | llama-4-maverick     | claude-sonnet-4-6   | T0   | base  | UPDATED |
| CHIEF_OF_STAFF | 2ee18a55             | llama-4-maverick     | claude-sonnet-4-6   | T0   | base  | CREATED |
| LIBRARIAN      | 63bab5ba             | llama-4-scout        | ollama/llama3.2:3b  | T4   | 1     | CREATED |
| TECHWRITER     | 7ec4d0f2             | llama-4-maverick     | ollama/llama3.2:3b  | T1   | 1     | UPDATED |

## PRODUCT & STRATEGY POD — TIER 1

| Agent      | ID       | Primary Model    | Fallback Model     | Tier | Phase | Status  |
|------------|----------|------------------|--------------------|------|-------|---------|
| PM         | 3087cb45 | llama-4-maverick | ollama/llama3.2:3b | T1   | base  | UPDATED |
| DESIGNER   | 1ae4f248 | llama-4-maverick | ollama/llama3.2:3b | T1   | base  | UPDATED |
| RESEARCHER | 5e5ea5c8 | llama-4-scout    | ollama/llama3.2:3b | T2   | base  | UPDATED |

## BUILD / ENGINEERING POD — TIER 1

| Agent    | ID       | Primary Model    | Fallback Model     | Tier | Phase | Status  |
|----------|----------|------------------|--------------------|------|-------|---------|
| ARCHITECT| a4c9f2e1 | llama-4-maverick | ollama/llama3.2:3b | T1   | 1     | UPDATED |
| FRONTEND | 65de47a2 | llama-4-maverick | ollama/llama3.2:3b | T1   | base  | UPDATED |
| BACKEND  | adb45687 | llama-4-maverick | ollama/llama3.2:3b | T1   | 2     | CREATED |
| DATA     | d7b3c8a5 | llama-4-scout    | ollama/llama3.2:3b | T2   | 2     | UPDATED |

## QUALITY & RELEASE POD — TIER 2

| Agent    | ID       | Primary Model    | Fallback Model     | Tier | Phase | Status  |
|----------|----------|------------------|--------------------|------|-------|---------|
| REVIEWER | 943d1ebc | llama-4-maverick | ollama/llama3.2:3b | T1   | base  | UPDATED |
| QA       | d011c7b9 | llama-4-scout    | ollama/llama3.2:3b | T2   | base  | UPDATED |
| DEPLOY   | 7ac01029 | llama-4-scout    | ollama/llama3.2:3b | T2   | 2     | UPDATED |
| SRE      | f9a2b4c7 | llama-4-scout    | ollama/llama3.2:3b | T2   | 2     | UPDATED |

## GO-TO-MARKET POD — TIER 3

| Agent      | ID       | Primary Model  | Fallback Model     | Tier | Phase | Status  |
|------------|----------|----------------|--------------------|------|-------|---------|
| MARKETING  | 601e976f | llama-4-scout  | ollama/llama3.2:3b | T3   | 3     | CREATED |
| BRAND_COPY | cd0a7627 | llama-4-scout  | ollama/llama3.2:3b | T3   | 3     | CREATED |
| ASO_SEO    | 4b9e977d | llama-4-scout  | ollama/llama3.2:3b | T3   | 3     | CREATED |
| SUPPORT    | 5fb527f8 | llama-4-scout  | ollama/llama3.2:3b | T4   | 3     | CREATED |

## OPERATIONS & BUSINESS POD — TIER 4

| Agent         | ID       | Primary Model  | Fallback Model     | Tier | Phase | Status  |
|---------------|----------|----------------|--------------------|------|-------|---------|
| LEGAL         | c5a2d9f3 | llama-4-scout  | ollama/llama3.2:3b | T4   | 4     | UPDATED |
| FINANCE       | a8a2134a | llama-4-scout  | ollama/llama3.2:3b | T4   | 4     | CREATED |
| SALES         | 9bb065f2 | llama-4-scout  | ollama/llama3.2:3b | T4   | 4     | CREATED |
| PEOPLE_ROSTER | 37695455 | llama-4-scout  | ollama/llama3.2:3b | T4   | 4     | CREATED |

## CONTENT POD (AUTHENTIC HADITH) — TIER 3

| Agent            | ID       | Primary Model  | Fallback Model     | Tier | Phase | Status  |
|------------------|----------|----------------|--------------------|------|-------|---------|
| CONTENT_SOURCING | e2f4a8b9 | llama-4-scout  | ollama/llama3.2:3b | T3   | 5     | UPDATED |
| SCHOLARLY_REVIEW | 2771c22e | llama-4-scout  | ollama/llama3.2:3b | T3   | 5     | CREATED |
| EDITORIAL        | a8a42922 | llama-4-maverick| ollama/llama3.2:3b| T3   | 5     | CREATED |

---

## UNMAPPED (existing SwarmClaw agents — not in org spec)

| Agent       | ID       | Notes                              |
|-------------|----------|------------------------------------|
| DEBUG       | b374bcb5 | Generic debug agent — not org role |
| ACCESSIBILITY| a1c2e3f4 | Not in org spec — may overlap Designer/QA |
| ANALYTICS   | 8b4c7d9e | Not in org spec — PostHog is tooling, not a role |
| CHANGE      | 6c4a9e2d | Not in org spec                    |
| HANDOFF     | 9f2b8e4a | Not in org spec                    |
| RUNTIME     | bed545df | Not in org spec                    |
| SECURITY    | 3c9d2f8b | Not in org spec — covered by Reviewer |
| TRUTH       | 7a4b9c1d | Not in org spec                    |
| OBSERVE     | 68f3d9d6 | Remapped → SUPERVISOR              |

---

## SUMMARY

- Total org-spec agents: 27
- Total loaded/updated: 27
- Phase 1 agents with v2 prompts: ARCHITECT, LIBRARIAN, TECHWRITER ✓
- SwarmClaw global knowledge: phases loaded (ID: 5c65ef2636cac539)
- All phases signed off by Ro: 2026-06-08
