# DECISION_LOG.md — RedLantern Engineering Decisions
> Append-only. Every architectural or product decision lives here.
> A decision that is not logged is a decision that will be re-debated.
> Owner: ARCHITECT agent proposes, Ro approves, LIBRARIAN logs.

---

## ENTRY FORMAT

```
## [ADR-NNN] — [DATE] — [DECISION TITLE]

**Status:** PROPOSED | ACCEPTED | SUPERSEDED | REVERTED
**Supersedes:** [ADR-NNN or NONE]
**Superseded by:** [ADR-NNN or NONE]
**Product(s):** [list of affected products]
**Decision maker:** [Ro / ARCHITECT / CHANGE]
**TruthSerum label:** VERIFIED | ASSUMPTION | UNKNOWN

### Context
[What situation or question required a decision?]

### Options considered
1. [Option A] — [tradeoff]
2. [Option B] — [tradeoff]
3. [Option C] — [tradeoff, if applicable]

### Decision
[Exactly what was decided and why.]

### Consequences
- Positive: [what this enables]
- Negative: [what this forecloses or costs]
- Risk: [what could go wrong]

### Verification required
[What must be confirmed before this decision is treated as fully implemented?]
```

---

## LOG

### [ADR-001] — 2026-06-10 — n8n as primary logic engine for all products

**Status:** ACCEPTED  
**Supersedes:** NONE  
**Product(s):** All  
**Decision maker:** Ro  
**TruthSerum label:** VERIFIED

**Context:** Risk of business logic accumulating in Next.js API routes, making logic untestable, unobservable, and duplicated.

**Decision:** All business logic lives in n8n flows. API routes are thin webhooks only — they receive input, call n8n, return response. No exceptions without ARCHITECT approval and ADR.

**Consequences:**
- Positive: Logic is visible, auditable, reusable, testable in isolation.
- Negative: n8n must be running for any feature to work.
- Risk: n8n flow drift if flows are not versioned and documented.

**Verification required:** Every existing API route audited for logic dumping before Amina goes to production.

---

### [ADR-002] — 2026-06-10 — SwarmClaw as agent OS, not assistant layer

**Status:** ACCEPTED  
**Supersedes:** NONE  
**Product(s):** All (meta — applies to build system itself)  
**Decision maker:** Ro  
**TruthSerum label:** VERIFIED

**Context:** Claude operating as a single assistant was creating context loss, no enforcement, and no separation of concerns between roles.

**Decision:** SwarmClaw is the agent runtime. 36 agents, 6 pods, Tier 0–4 permissions. Claude operates as specialist review only. SwarmClaw handles all mechanical work.

**Consequences:**
- Positive: Separation of powers. No single agent can both create and approve.
- Negative: Complexity of managing 36 agents + prompt drift risk.
- Risk: Agent prompt decay without monthly diff audit.

**Verification required:** All 36 agent prompts backed up in /memory/agent_prompts/. Monthly diff audit scheduled.

---

### [ADR-003] — 2026-06-10 — Amina as QuietBuild OS dogfood (first active product)

**Status:** ACCEPTED  
**Supersedes:** NONE  
**Product(s):** Amina (affects HireWire priority)  
**Decision maker:** Ro  
**TruthSerum label:** VERIFIED

**Context:** HireWire was the original priority product but QuietBuild OS was unproven. Building HireWire on an unproven OS is high risk.

**Decision:** Amina is dogfood. Prove QuietBuild OS on Amina first. HireWire activates when Amina proves the loop works.

**Consequences:**
- Positive: Amina proves or falsifies the OS model with low stakes.
- Negative: HireWire delayed.
- Risk: Amina scope creep pulling in HireWire features prematurely.

**Verification required:** Amina /repo-ingest completed. Truth audit run. Core loop verified.

---

*All new entries appended below. Entries are never deleted.*
