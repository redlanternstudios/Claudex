# CHANGELOG_AI.md — [PRODUCT NAME]
> Every AI-generated change that touches production-path code must be logged here.
> This is not the git log. This is the agent decision trail.

---

## ENTRY FORMAT
```
## [CHANGE-ID] — [DATE] — [STATUS: AI_PROPOSED|AI_REVIEWED|HUMAN_ACCEPTED|TESTED|MERGED]

**Agent:** [which agent generated this]
**Human owner:** [who accepted it — Ro or named collaborator]
**Feature/area:** [what was being built]
**Files changed:** [list]
**Intent:** [what this was supposed to do]
**Assumptions made:** [what the agent assumed about the codebase]
**Database impact:** [tables read/written or NONE]
**Auth/RLS impact:** [policies affected or NONE]
**External API impact:** [third-party calls or NONE]
**User-facing impact:** [what changes for users]
**Rollback plan:** [how to revert]
**Test command:** [exact command to verify]
**Manual QA path:** [step-by-step user flow to confirm]
**Known weakness:** [what the agent flagged as uncertain]
**TruthCal Receipt:** [receipt ID or NONE]
```

---

## STATUS FLOW
```
AI_PROPOSED → AI_REVIEWED → HUMAN_ACCEPTED → TESTED → MERGED
```

- **AI_PROPOSED:** Claude generated it. Not yet reviewed.
- **AI_REVIEWED:** REVIEW or TRUTH agent checked it. May surface issues.
- **HUMAN_ACCEPTED:** Ro reviewed and approved intent + approach.
- **TESTED:** Test command ran. Output confirmed. Not just "looks good."
- **MERGED:** In main branch. CHANGE RECORD created. Release gate passed.

**Rule:** No AI-generated code moves to MERGED without passing through all prior stages.

---

## LOG

*Entries appended here. Newest first.*

---
*This file is append-only. Do not delete entries. Status updates are edits to existing entries.*
