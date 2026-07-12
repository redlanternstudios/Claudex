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

---

## [ADR-004] — 2026-07-08 — Codex defaults to low cost routine execution with explicit deep mode

**Status:** ACCEPTED
**Supersedes:** NONE
**Superseded by:** NONE
**Product(s):** Claudex, all RedLantern local Codex work
**Decision maker:** Ro
**TruthSerum label:** VERIFIED

### Context

Ro uses Codex primarily for code heavy repo execution, file audits, refactors, tests, git work, and mechanical follow through. The local Codex config was globally pinned to the strongest model and an ambient `OPENAI_API_KEY` was exported in shell startup, creating unnecessary usage and surprise API billing risk.

### Options considered

1. Keep `gpt-5.5` as the default — highest quality, highest routine usage.
2. Use `gpt-5.4-mini` as default and keep `gpt-5.5` as an explicit profile — lower routine usage, preserves high power path.
3. Move routine work to local OSS only — lowest direct usage, but not enough quality for RedLantern build execution.

### Decision

Use `gpt-5.4-mini` with low reasoning and low verbosity as the default local Codex setup. Keep `gpt-5.5` high reasoning in `deep` and `review` profiles. Force ChatGPT login for Codex and remove global `OPENAI_API_KEY` exports so API billing is not used accidentally.

### Consequences

- Positive: Routine Codex work becomes cheaper and more predictable.
- Positive: Deep capability remains available when the task needs it.
- Negative: Some ambiguous tasks may need a manual switch to deep mode.
- Risk: A future shell setup could re export `OPENAI_API_KEY` globally.

### Verification required

Ro local verification is recorded in `OPS/CTP_CODEX_COST_SETUP_20260708.md`.
Keymon must run the same audit on his machine and produce a receipt after setup.

---

## [ADR-005] — 2026-07-08 — Future Codex model upgrades are evidence gated

**Status:** ACCEPTED
**Supersedes:** NONE
**Superseded by:** NONE
**Product(s):** Claudex, all RedLantern local Codex work
**Decision maker:** Ro
**TruthSerum label:** VERIFIED

### Context

Ro wants the Codex setup to stay scalable. If a new model appears later, the system should know when to adopt it and when to ignore it. Newer is not automatically better for RedLantern work.

### Options considered

1. Promote every newer model quickly — simple, but turns releases into cost churn.
2. Freeze one model forever — stable, but blocks real efficiency gains.
3. Keep the cheap default and require evidence before promotion — slightly more process, much better control.

### Decision

Keep `gpt-5.4-mini` as the default until a future model proves itself on actual RedLantern work. A new model may move into deep or review profiles first. It only becomes the default after side by side testing shows equal or better quality at equal or lower cost with no new reliability problem.

### Consequences

- Positive: The setup stays cheap by default and still has a clean path to improvement.
- Positive: New model hype does not override real evidence.
- Negative: A future upgrade takes a little longer because it must be proven.
- Risk: If the benchmark is too loose, a weak model could still slip through.

### Verification required

When a future model is proposed, run a side by side comparison against the current default, record the result in a CTP note or receipt, then decide whether to promote it.

---

## [ADR-006] — 2026-07-08 — RedLantern document output routes through /rlsdox

**Status:** ACCEPTED
**Supersedes:** NONE
**Superseded by:** NONE
**Product(s):** Claudex, all RedLantern document output
**Decision maker:** Ro
**TruthSerum label:** VERIFIED

### Context

Ro wants future RedLantern documents to ship in the standard branded format every time, not as ad hoc markdown or inconsistent one off styling. The output path itself needs to be reusable so Claude and Keymon can find it later.

### Options considered

1. Keep formatting ad hoc — fast today, messy tomorrow.
2. Bake the template into each request — repetitive and easy to drift.
3. Create a dedicated `/rlsdox` skill that always routes through the RedLantern standard document template — reusable and consistent.

### Decision

Use `/rlsdox` for any RedLantern document that needs to ship in the studio standard format. The skill reads `BRAND_DOCUMENT_STANDARD.md` and `RLS_DOCUMENT_TEMPLATE.html`, applies the template, and treats plain markdown as a draft only.

### Consequences

- Positive: Documents stay visually and structurally consistent.
- Positive: Keymon and Claude have a single retrieval point for the format.
- Negative: A little more setup up front.
- Risk: If the skill drifts from the template, branded output could degrade.

### Verification required

When `/rlsdox` is used, the output must render through the RedLantern template and produce a branded PDF or an explicitly draft only artifact.

## [ADR-007] — 2026-07-11 — Shared startup context pack for Claude, Codex, and Obsidian

**Status:** ACCEPTED
**Supersedes:** NONE
**Superseded by:** NONE
**Product(s):** Claudex, Obsidian mirror, all RedLantern chat start flows
**Decision maker:** Ro
**TruthSerum label:** VERIFIED

### Context

Ro wants every Claude and Codex chat to start from the same studio frame, with the bridge, current intent, memory index, and Obsidian view available in one obvious place.

### Options considered

1. Keep the existing scattered boot docs — less work, more drift.
2. Make a new bridge file — wrong, because the bridge already exists.
3. Create one shared startup pack and wire the boot paths to it — clean, direct, and Obsidian friendly.

### Decision

Create `OPS/SESSION_CONTEXT_PACK.md` as the shared retrieval anchor, update Claude boot files to read it, and have the Obsidian sync generate `_CLAUDEX STARTUP PACK.md` beside the live bridge note.

### Consequences

- Positive: One obvious startup path for both chat systems.
- Positive: Obsidian gets the same context frame as the repo.
- Negative: Slightly more upkeep when the boot contract changes.
- Risk: If the pack drifts from the bridge, the retrieval path could become stale.

### Verification required

The pack exists, the boot docs point at it, and the Obsidian sync generates the matching startup pack note.
