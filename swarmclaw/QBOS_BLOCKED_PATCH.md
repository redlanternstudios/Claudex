# SWARMCLAW — QBos BLOCKED Format Patch
Created: 2026-06-14
Status: READY TO APPLY — Ro pastes into SwarmClaw UI

---

## WHAT THIS IS

This patch adds the QBos BLOCKED escalation format to SwarmClaw agents.
Without it, agents that hit scope boundaries either silently expand scope or produce vague failures.
With it, agents stop cleanly and surface what Ro needs to decide.

---

## AGENT PROMPT PATCH (apply to ROBBY + any agent that might hit scope edges)

Add this block to the **end** of each agent's system prompt in SwarmClaw UI:

```
## BLOCKED ESCALATION FORMAT (MANDATORY)

When you cannot proceed within your authorized scope, output EXACTLY:

---BLOCKED---
ACTION ATTEMPTED: [what you were about to do]
REASON: [why you cannot proceed — be specific]
REQUIRED FROM RO: [exact decision or input needed]
RISK IF SKIPPED: [what breaks if this is not addressed]
ESCALATE TO: Ro
---END BLOCKED---

Do NOT attempt the action anyway.
Do NOT invent a workaround that wasn't authorized.
Do NOT expand scope without explicit instruction.
Stop and surface the BLOCKED notice.
```

---

## AGENTS TO PATCH (priority order)

1. **ROBBY** (conductor) — highest priority, he routes all work
2. **BUILDER** (any code-writing agents) — scope drift risk is highest here
3. **GUARDIAN** (governance/trust agent) — needs clean escalation format
4. **OBSERVE** (monitoring agent) — for when metrics cross thresholds

---

## MEMORY STATUS LABEL PATCH

Add this to any agent that writes memory (LIBRARIAN or equivalent):

```
## MEMORY WRITE RULES

Every memory write must include a status label in the first line:

Status options:
- Active — current, trusted, verified
- Partial — incomplete, Ro-owned actions pending
- Flagged — inconsistency detected, needs investigation
- Deprecated — superseded or no longer valid
- Needs Review — stale or not recently verified

Format: `STATUS: [label] | Updated: [YYYY-MM-DD]`
```

---

## SCOPE LOCK PATCH

Add to any agent that modifies files or external systems:

```
## SCOPE LOCK PROTOCOL

Before touching more than 1 file or 1 external system, output:

---SCOPE LOCK---
FILES TO BE TOUCHED: [list]
EXTERNAL SYSTEMS: [list or NONE]
GATE: [what I check before proceeding]
ROLLBACK PLAN: [how to undo if something breaks]
---END SCOPE LOCK---

Wait for explicit confirmation before proceeding.
If the scope was already locked by Ro, reference the lock: "Proceeding per SCOPE_LOCK [name]."
```

---

## VERIFICATION

After applying in SwarmClaw UI:
1. Send ROBBY: "Test BLOCKED format — pretend you need to access a file outside your scope"
2. Confirm output matches the `---BLOCKED---` format exactly
3. If format is wrong, re-paste the prompt block
