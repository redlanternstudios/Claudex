# Plugins And Skills Audit

Version 2.0
Date 2026-07-13
Scope Claude, Codex, and shared RedLantern operating workflows

## Current capability truth

Claude and Codex both support reusable skills, but they discover them from different repository locations and may have different tool access.

* Claude custom skills live under `.claude/skills/` and related Claude configuration.
* Codex repository skills live under `.agents/skills/` and are available from the `/skills` picker or by using the dollar prefixed skill name.
* Shared operating standards remain plain repository files so both engines can read the same source of truth.
* A skill does not grant a connector, credential, browser, or production permission that the active engine does not already have.

## Claude plugins

| Plugin | Purpose | Key skills |
|---|---|---|
| anthropic skills | Core document and build toolkit | docx, pptx, xlsx, pdf, canvas design, algorithmic art, brand guidelines, skill creator, mcp builder, document coauthoring, theme factory, web artifacts builder, internal communications, learn, schedule, setup cowork, consolidate memory |
| apollo | Sales prospecting | enrich lead, prospect, sequence load |
| brand voice | Brand voice discovery and enforcement | discover brand, generate guidelines, brand voice enforcement |
| data | Analytics and SQL | analyze, build dashboard, create visualization, SQL queries, validate data |
| design | Product and UX design | design critique, design system, design handoff, accessibility review, user research |
| enterprise search | Cross source search | search, knowledge synthesis, digest, source management |
| legal | Contracts and compliance | review contract, triage NDA, compliance check, legal risk assessment |
| product management | Product workflows | write spec, roadmap update, sprint planning, metrics review |
| productivity | Task and memory | task management, memory management, start, update |
| sales | Sales workflows | account research, call preparation, pipeline review, outreach |

## RedLantern shared frameworks

| Asset | Location | Purpose |
|---|---|---|
| CTP Framework | `CTP_FRAMEWORK.md` | Mandatory analytical contract and truth process |
| Claude CTP skill | `.claude/skills/ctp/SKILL.md` | Claude invocation of CTP |
| Claude Checkit | `.claude/skills/checkit.md` | Claude light sanity check |
| The Audit | `.claude/frameworks/THE_AUDIT_PROTOCOL.md` | Build reality audit |
| Build Constitution | `BUILD_CONSTITUTION.md` | Product integrity rules |
| Formatting Constitution | `.claude/formatting/FORMATTING_CONSTITUTION.md` | Design and artifact formatting rules |
| Brand Standard | `.claude/brand/BRAND_DOCUMENT_STANDARD.md` | RedLantern document pipeline |
| KP Skill Operating Standard | `OPS/KP_SKILL_OPERATING_STANDARD.md` | Measurement, gates, authorization, and learning rules for KP Codex skills |

## KP Codex skills

| Skill | Location | Purpose |
|---|---|---|
| `kp_systemize` | `.agents/skills/kp_systemize/SKILL.md` | Convert repeated friction into the simplest reusable system |
| `kp_scope` | `.agents/skills/kp_scope/SKILL.md` | Define boundaries, permissions, evidence, and explicit execution authorization |
| `kp_plan` | `.agents/skills/kp_plan/SKILL.md` | Sequence approved work and expose change classes and approval gates |
| `kp_checkit` | `.agents/skills/kp_checkit/SKILL.md` | Verify technical, semantic, migration, merge, and deployment gates |
| `kp_receipt` | `.agents/skills/kp_receipt/SKILL.md` | Create a final head evidence backed completion receipt |
| `kp_retrospective` | `.agents/skills/kp_retrospective/SKILL.md` | Quantify a run and propose controlled process improvements |
| `kp_repository_baseline` | `.agents/skills/kp_repository_baseline/SKILL.md` | Audit repository build, contracts, CI, migration, and deployment readiness |

## Invocation

Use the Codex `/skills` picker or mention a skill explicitly.

Examples:

* `$kp_scope define the next task`
* `$kp_checkit verify this pull request`
* `$kp_repository_baseline audit this repository before feature work`

## Measurement

* Metrics ledger: `OPS/KP_SKILL_METRICS_LEDGER.csv`
* Trigger evals: `evals/skills/kp_skill_triggers.csv`
* Usage map: `docs/KP_CODEX_SKILL_MAP.md`

## Governance rules

1. Keep each skill focused on one job.
2. Scope readiness never authorizes execution by itself.
3. Separate technical, semantic, migration, merge, and deployment gates.
4. Record final head evidence in receipts.
5. Add real failures as new eval prompts.
6. Review skill trigger precision, first pass success, scope containment, evidence completeness, gate accuracy, semantic surprise, rework, and receipt freshness.
7. Skills may guide workflows but cannot exceed active permissions or invent tool access.
