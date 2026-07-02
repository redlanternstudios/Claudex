# GATES — the execution gate stack

Version 1.0 · 2026-07-02 · The operational spine. Every unit of work passes the gates that apply to it.
Gates are ordered. A failed gate stops progress until fixed or explained. Never skip, never fake.

---

## THE STACK (in order)

| # | Gate | When | Passes when | Doctrine |
|---|---|---|---|---|
| 1 | **Bridge Gate** | Before any build | Bridge read, lane opened, effective color not RED | `BRIDGE_PROTOCOL.md` |
| 2 | **SafetyEngine Gate** | Before any risky action | No secrets/destructive/religious/financial/prod-deploy risk unhandled | `docs/SAFETYENGINE_POLICY.md` |
| 3 | **BrainSmart Gate** | Before scope/architecture/high-blast-radius decisions | Deliberation done, scope lock respected, decision logged | `docs/BRAINSMART_APPROVAL_GATE.md` |
| 4 | **SilentEngine Gate** | Before model output on judgment tasks | Routed per policy, fallback ready, cost logged | `docs/SILENTENGINE_ROUTING_POLICY.md` |
| 5 | **TruthSerum Gate** | Before any "verified" claim | All required proofs exist as receipts; no forbidden claim words without proof | `docs/TRUTHSERUM_CONTRACT.md` |
| 6 | **Release Gate** | Before any deploy/submit | Real external proof (live URL, App Store confirmation, real test output) + human approval | `docs/DELIVERY_KERNEL_PLAYBOOK.md` |
| 7 | **Receipt Gate** | Before a color goes GREEN | A real receipt exists in `OPS/receipts/` and `bridge:doctor` passes | `OPS/TRUTHCAL_RECEIPT.md` |

---

## HARD RULES
- **Fail closed.** Unknown risk or missing proof → stop, do not proceed on optimism.
- **No gate is skippable by any agent, including Robby.** Humans (Ro) approve high-impact; agents cannot self-approve past a gate.
- **Never fake GREEN.** The Receipt Gate + `npm run bridge:doctor` exist to make GREEN mean something. A green with no receipt is a lie.
- **Forbidden without proof:** deployed, live, submitted, shipped, ready, working, completed, connected, passing, production-ready. (TruthSerum sanitization.)

## ENFORCEMENT STATUS (honest)
- **Enforced by tooling today:** Bridge Gate + Receipt Gate + a subset of TruthSerum (via `bridge:doctor`: parse, semantics, receipt exists, intent fresh, secret scan, boot wiring).
- **Enforced by discipline (not yet automated):** SafetyEngine, BrainSmart, SilentEngine, Release. The doctrine is set; automatic enforcement is a hardening item. Do not claim these gates run automatically until wired + tested.
