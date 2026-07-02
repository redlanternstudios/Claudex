# Dead Letter Log
# Owner: Supervisor
# Purpose: Track handoffs that have failed 3+ times and their resolution
# Format: append-only

---

## DEAD LETTER RESOLUTION OPTIONS

```
Option A: REPAIR — Supervisor routes back to originating agent with specific fix instructions
Option B: ESCALATE — Supervisor routes to Ro with full context and recommendation
```

A handoff enters the dead-letter queue when:
- It has been rejected 3 times between the same two agents
- The producer cannot resolve the rejection without external input

---

## FORMAT

```
[TIMESTAMP]
Task: [slug]
From: [agent] → To: [agent]
Retry count: 3
Rejection reason (last): [description]
Supervisor action: REPAIR / ESCALATE
Resolution: [outcome]
Closed: [timestamp or OPEN]
```

---

## LOG

(No dead-letter events yet — initialized 2026-06-08)

---
Initialized: 2026-06-08 by Librarian
