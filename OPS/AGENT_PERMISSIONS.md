# AGENT_PERMISSIONS.md — RedLantern Agent Permission Matrix
> Enforced by ROBBY and RUNTIME. No agent operates outside its tier.
> Core rule: No single agent can both create AND approve its own change.
> This is the SwarmClaw separation of powers.

---

## TIER DEFINITIONS

### Tier 0 — Observe Only
Can: read, summarize, analyze, flag risks, produce reports.  
Cannot: write code, modify schema, create tasks, approve changes.

| Agent | Primary function |
|-------|----------------|
| OBSERVE | Post-ship monitoring, health signals |
| ANALYTICS | PostHog/Sentry data analysis |
| ACCESSIBILITY | A11y auditing, WCAG checks |
| RESEARCH | Market intel, competitive signals |
| DATA | Data model analysis, query review |
| PEOPLE_ROSTER | Org roster, agent directory |

---

### Tier 1 — Propose Only
Can: write specs, PRDs, content, plans, copy, tasks.  
Cannot: write code, modify schema, approve code changes.

| Agent | Primary function |
|-------|----------------|
| PM | Product backlog, sprint planning, acceptance criteria |
| CONTENT | Content writing, knowledge base |
| BRAND_COPY | Brand voice, marketing copy |
| EDITORIAL | Content editing, Authentic Hadith review |
| MARKETING | Campaign planning, channel strategy |
| SALES | Outreach copy, sales assets |
| ASO_SEO | App store + SEO strategy |
| SUPPORT | User support, FAQ |
| SCHOLARLY_REVIEW | Hadith scholarly verification (human hand-off only) |
| HANDOFF | Handoff docs, session summaries |
| TECHWRITER | Technical documentation, changelogs |

---

### Tier 2 — Code Proposal
Can: write and propose code changes, suggest schema changes, create migrations.  
Cannot: approve own changes, merge to main, bypass REVIEW/TRUTH.

| Agent | Primary function |
|-------|----------------|
| BACKEND | API logic, Supabase integration, n8n webhooks |
| FRONTEND | Next.js components, UI wiring |
| INFRA | Deployment config, env setup |
| DEBUG | Root cause analysis, fix proposals |
| DESIGN | UI/UX designs, v0 prompts |

---

### Tier 3 — Gate Authority (governance — independent)
Can: approve or block changes, issue verdicts, require rollback.  
Cannot: initiate builds, write product code, override each other.  
Governance agents operate independently — PM and ROBBY cannot override them.

| Agent | Gate authority |
|-------|--------------|
| TRUTH | Bar Raiser veto — quality and completeness |
| SECURITY | Security veto — auth, RLS, data exposure |
| CHANGE | CAB chair — production change register |
| ARCHITECT | ARB chair — structural decisions, ADRs |
| COMPLIANCE | DJIM, contractor, GDPR/CCPA, religious content |
| FINANCE | Budget authority gate |

---

### Tier 4 — Release Authority
Can: run tests and approve release after lower tiers pass. ROBBY holds final sign-off.  
Cannot: bypass governance gates, approve without TRUTH + SECURITY pass.

| Agent | Release authority |
|-------|----------------|
| REVIEW | Code review — logic, patterns, correctness |
| QA | Acceptance criteria, user flow verification |
| DEPLOY | Release execution — SHIP/HOLD/ROLLBACK verdict |
| RUNTIME | System state authority, lifecycle enforcement |
| ROBBY | RTE — final release sign-off. Nothing ships without this. |
| CHIEF_OF_STAFF | Cross-org coordination, Ro intent translation |
| LIBRARIAN | Memory write authority — no unauthorized doc writes |

---

## ENFORCEMENT RULES

1. **No self-approval.** An agent that proposes a change cannot approve the same change.
2. **Tier escalation required.** A Tier 2 change must pass through at least one Tier 3 gate before Tier 4 signs off.
3. **Governance gates are independent.** TRUTH, SECURITY, CHANGE, COMPLIANCE cannot be overruled by PM or ROBBY.
4. **Parked products are locked.** No Tier 2 agent may open work on a parked product without Product Governor approval (see PRODUCT_FIREBREAK.md).
5. **Dead-letter authority.** RUNTIME holds dead-letter queue. ROBBY must be notified of any dead-letter entry.

---

## PRODUCT GOVERNOR RULE
No agent may open work on a **parked product** unless:
- SUPERVISOR/RUNTIME marks it as CRITICAL (security fix, revenue-critical, legal/religious safety), OR
- Ro explicitly reassigns the active sprint in TODAY.md

This prevents product bleed. One active sprint at a time.

---
*This file is read by ROBBY and RUNTIME at session start. Any agent that violates tier rules is flagged to Command Center.*
