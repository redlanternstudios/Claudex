# KP Codex Skill Authority Map

Status: VERIFIED MAPPING, LOCAL INSTALLATION PENDING
Owner: Keymon Penn
Authority: Penn Enterprises LLC

## Canonical local root

`/Users/kp/Penn Enterprises LLC`

## Canonical file locations

### Codex discoverable skills

`/Users/kp/Penn Enterprises LLC/.agents/skills/`

Expected skills:

- `kp_systemize/SKILL.md`
- `kp_scope/SKILL.md`
- `kp_plan/SKILL.md`
- `kp_checkit/SKILL.md`
- `kp_receipt/SKILL.md`
- `kp_retrospective/SKILL.md`
- `kp_repository_baseline/SKILL.md`

### PE governance and measurement

`/Users/kp/Penn Enterprises LLC/operations/codex/skills/`

Expected files:

- `README.md`
- `CTP_FRAMEWORK.md`
- `KP_SKILL_OPERATING_STANDARD.md`
- `KP_SKILL_METRICS_LEDGER.csv`
- `KP_CODEX_SKILL_MAP.md`

### Skill evaluations

`/Users/kp/Penn Enterprises LLC/operations/codex/evals/kp_skill_triggers.csv`

### Receipts

`/Users/kp/Penn Enterprises LLC/operations/receipts/`

### Claudex bridge

`/Users/kp/Penn Enterprises LLC/operations/handoffs/CLAUDEX_KP_CODEX_SKILL_BRIDGE.md`

## Authority rule

Penn Enterprises LLC is the source of truth for KP's Codex skill implementation, metrics, and receipts.

Claudex may hold a bridge copy or upstream template, but it must not claim authority over PE runtime state or overwrite a newer PE version.

## Current Claudex PR role

Claudex PR 2 is a staging and review package. It is not proof that the skills are installed or discoverable inside the Penn Enterprises LLC workspace.

Local installation must be verified from the PE root by:

1. Confirming all seven files exist under `.agents/skills/`.
2. Opening Codex from `/Users/kp/Penn Enterprises LLC`.
3. Confirming all seven skills appear in `/skills`.
4. Running one explicit invocation.
5. Writing a PE receipt under `operations/receipts/`.
