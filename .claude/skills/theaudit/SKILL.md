# THE AUDIT — Solution Audit Protocol v1.0

**Trigger:** `theaudit`, `the audit`, `run the audit`, `audit this solution`, `/theaudit`

When triggered, build or refresh the Solution Audit for the solution in context using the full Audit standard. ("The Audit" is the RedLantern build-reality standard; a "Solution Audit" is the living per-solution document it produces.)

**Spec:** `.claude/frameworks/THE_AUDIT_PROTOCOL.md`
**Template:** `.claude/frameworks/THE_AUDIT_INSTANCE_TEMPLATE.md`
**Command:** `.claude/commands/theaudit.md`

---

## WHAT THIS SKILL DOES

Produces a single source of truth that maps a solution (app / website / workflow / automation) down to every page, feature, component, button, click, trigger, and notification — with a stated input, output, state change, owner, and truth status for each. Codes out ambiguity in no-code / AI-native building.

CTP governs thinking. The Audit governs build reality. Run CTP first when the *decision* is open; run The Audit to map what *exists and is missing*.

## WHEN TO USE
- Starting a new solution → build the Audit skeleton (classify + North Star + surface tree).
- Auditing an existing solution → fill the Atomic I/O table, run the four audits.
- Before launch → run Section 17 readiness gate.
- After any build session → update Section 18, downgrade stale statuses.

## HOW TO RUN
1. **Classify** (The Audit §2): CONCEPT / PROTOTYPE / PLAYBOOK / PRODUCT-READY → sets required depth.
2. **Self-answer first:** read memory + repo + live URL before asking Ro anything.
3. **Build surface tree** (§3) top-down. No orphans.
4. **Fill Atomic I/O table** (§11) — one row per element, every column. The core work.
5. **Cross-wire** element → flow → entity → receipt → failure path.
6. **Run four audits:** orphan · blank-cell · trap-state · fake-complete.
7. **Emit:** markdown SSOT + branded PDF (WeasyPrint) + optional live dashboard.
8. **Session close:** update change log.

## OUTPUT
`projects/[solution]/audit/Audit.md` + `Audit.pdf` (+ `LSB_dashboard.html` on request).

## FAILURE CONDITIONS (reject output if any)
- Interactive element with no I/O row
- Button/input with blank output, state change, or validation
- Loop with no exit condition
- Automation with no kill switch
- VERIFIED claim with no receipt
- External write with no dedup key
- Business logic in the frontend

## SUCCESS CONDITION
A builder who has never seen the solution can rebuild it from the Audit alone, with zero questions.

---
*Integrates [[critical-thought-process]] and the RedLantern Product Integrity standard. Brand output per `feedback-rls-branded-doc-spec` — always deliver PDF.*
