# SAFETYENGINE POLICY — pre-execution risk gate

Version 1.0 · 2026-07-02 · **DOCTRINE.** Source: safety-classifier inside `silent-engine` + `shared/safety-middleware` (has tests). PARTIAL — a component, not a standalone engine.

Runs BEFORE risky work. Blocks or escalates. Never silent.

## WHAT IT GATES (block or require human confirm)
- **Secrets** — any action that would write/expose a key, token, `.env`, or credential.
- **Destructive** — delete data, drop tables, force-push, empty trash, overwrite source truth.
- **Religious risk** — any Authentic Hadith content without human scholarly sign-off (name + date + notes). Hard block.
- **Financial / legal claims** — any statement of legal or financial fact, any money movement or trade. Escalate to Ro.
- **Production deploy** — deploys go through the Release Gate + human approval.
- **Access control** — changing permissions/visibility/sharing. Human-only.

## OUTCOMES
`ALLOW` (safe, proceed) · `CONFIRM` (proceed only with explicit human yes) · `BLOCK` (stop, explain, escalate).

## RULES
- Fail closed: unknown risk → CONFIRM or BLOCK, never ALLOW by default.
- The gate result is logged and receipted.
- No engine or agent may bypass this gate, including Robby.

## STATUS
Doctrine adopted. The classifier code exists and is tested at the middleware layer, but is not wired as a Claudex-wide runtime yet. Until it is, this policy is enforced by engine discipline + `bridge:doctor` secret scan, not by an automatic classifier on every action.
