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

## [ADR-008] — 2026-07-12 — Footprint autonomy begins after private commissioning

**Status:** ACCEPTED
**Supersedes:** NONE
**Superseded by:** NONE
**Product(s):** Footprint, Claudex, RedLantern Studios public authority surfaces
**Decision maker:** Ro
**TruthSerum label:** VERIFIED

### Context

Ro requires Footprint to operate fully autonomously from the day it is set up. The first critique interpreted trust proof as a mandatory public human review period and treated LinkedIn access as the whole product gate.

### Options considered

1. Publish autonomously without commissioning. This satisfies speed but makes public identities the test environment.
2. Require routine human approval for the first thirty days. This earns trust but violates Ro's full autonomy requirement.
3. Make private commissioning part of setup, then activate fully autonomous operation with safe abstention. This satisfies autonomy and trust.

### Decision

Footprint commissions its Authority Registry, identity permissions, evidence classification, immutable policies, channel permissions, kill switch, retraction path, and adversarial suite before the first public action. Once the commissioning gate passes, safe work publishes without routine approval. Unknown or unsafe work resolves autonomously to wait, rewrite, reroute, reject, or quarantine.

LinkedIn is an adapter gate, not the engine gate. The single engine gate is the commissioned Authority Registry and deterministic decision kernel.

### Consequences

1. Positive: Full autonomy begins on the first public day.
2. Positive: Public identities are not used as the initial truth test.
3. Positive: Owned media remains useful if a social adapter is denied.
4. Negative: Setup is more rigorous before activation.
5. Risk: Weak commissioning fixtures could create false confidence.

### Verification required

The commissioning suite must include at least one hundred labeled cases, one hundred percent pass on catastrophic boundaries, at least ninety eight percent claim classification accuracy, working kill switch and retraction tests, and a TruthCal activation receipt.

## [ADR-009] — 2026-07-13 — Telegram bridge is legacy unless explicitly re enabled

**Status:** ACCEPTED
**Supersedes:** NONE
**Superseded by:** NONE
**Product(s):** Claudex, SwarmClaw, RobbyPA
**Decision maker:** Ro
**TruthSerum label:** VERIFIED

### Context

Ro is not using Telegram, but the repo and prompt state still treated it like a live bridge. That keeps an unused path alive in memory and can steer routine completions into the wrong surface.

### Options considered

1. Keep Telegram live by default — convenient, but it keeps an unused path active.
2. Leave it undocumented — low effort, but the stale path keeps resurfacing.
3. Mark it legacy and disabled by default — still recoverable later, but no routine traffic now.

### Decision

Treat the Telegram bridge as legacy only. Keep it disabled unless Ro explicitly re enables it. Remove Telegram from routine completion paths and live allowed actions.

### Consequences

- Positive: Stops accidental Telegram driven usage and simplifies the default surface.
- Positive: The repo now matches how Ro actually works.
- Negative: If Ro wants Telegram back later, it needs an explicit re enable step.
- Risk: A separate robby telegram runtime could still exist until disabled outside this repo.

### Verification required

Confirm the live bridge no longer expects Telegram as the normal path and that any separate runtime is disabled or left unused.

## [ADR-010] — 2026-07-14 — Footprint uses one bifurcated opportunity network

**Status:** ACCEPTED
**Supersedes:** NONE
**Superseded by:** NONE
**Product(s):** Footprint, Claudex
**Decision maker:** Ro
**TruthSerum label:** VERIFIED

### Context

Ro selected tech builders, recruiters, head hunters, and staffing agencies as the opening Footprint audience. Ro also required an enriched ecosystem that does not become overpopulated or convoluted and directed communication, responses, outreach, and posts to bifurcate with the network.

The By Red operating agreement records Homira as a fifty percent owner and Ro as the fifty percent managing member. Homira may serve as Footprint's visible founding administrator while Ro and Keymon remain behind the scenes during trust formation.

### Options considered

1. Build four separate audience communities. This creates precise labels but fragments density and duplicates operations.
2. Use one generic audience and one communication stream. This stays simple but ignores different motivations, evidence needs, and calls to action.
3. Build one network with tech builders on one side and talent partners on the other. Recruiter, head hunter, and staffing agency remain talent partner subtypes. Communication branches by role and intent while the brand and data model remain unified.

### Decision

Footprint uses one public brand, one network, and two audience sides.

1. Tech builders.
2. Talent partners.

Recruiter, head hunter, and staffing agency are talent partner subtypes.

Every substantive response, outreach action, and public post routes through builder, talent partner, bridge, or clarification logic.

Version one is limited to the LinkedIn Page, the owned Footprint site, and the private control room. Group, newsletter, native chat, native social feed, rankings, badges, and separate audience portals remain deferred until evidence gates justify them.

The complete CTP and provisional density thresholds are recorded in `OPS/FOOTPRINT_ENRICHED_ECOSYSTEM_CTP_20260714.md`.

### Consequences

1. Positive: Each side receives relevant language, proof, calls to action, and useful routes.
2. Positive: Footprint preserves early density and avoids duplicate profiles, feeds, and communities.
3. Positive: Bridge communication can translate real demand into better builder proof and better opportunity descriptions.
4. Negative: Role and intent classification become mandatory before substantive responses.
5. Risk: Poor classification can make a polished message irrelevant or unsafe.
6. Risk: If qualified introductions do not occur, Footprint can become two disconnected content streams.

### Verification required

The founding cohort must prove response capacity, useful routes, qualified mutual introductions, and zero critical trust incidents before expanded cohorts or surfaces activate.
