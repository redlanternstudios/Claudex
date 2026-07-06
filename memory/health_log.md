# Health Log
# Owner: Supervisor
# Purpose: Record health observations, flags, and incidents for drift detection
# Format: append-only — newest entries at bottom

---

## FORMAT

```
[TIMESTAMP] | SEVERITY: [INFO/WARN/CRITICAL] | AGENT: [role] | OBSERVATION: [description] | ACTION: [taken]
```

## SEVERITY DEFINITIONS

```
INFO     — Normal observation, no action needed
WARN     — Pattern that may become a problem, monitoring
CRITICAL — Immediate action required, escalated to Conductor or Ro
```

## AUTOMATIC FLAGS (Supervisor watches for these)

```
FLAG: Agent stuck in ACTIVE for >2 hours without progress signal
FLAG: TechWriter silent for >2 hours during active mission
FLAG: Handoff bouncing between same two agents more than twice
FLAG: Dead-letter queue item (3 failed retries)
FLAG: Ro gate pending for >4 hours (standard) or >30 min (critical)
FLAG: Unattributed write attempt to Librarian
FLAG: Authentic Hadith content advancing without human sign-off record
```

---

## LOG

(No health events yet — initialized 2026-06-08)

---
Initialized: 2026-06-08 by Librarian
