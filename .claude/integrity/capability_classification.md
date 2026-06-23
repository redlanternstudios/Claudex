# CAPABILITY CLASSIFICATION STANDARD
Version: 1.0 | Last reviewed: 2026-04-17

---

## THE FOUR TIERS

Classification is mandatory before any task creation, documentation, or launch decision.
Running /prototype-classify produces the tier. No tier = no task.

---

## TIER 1: CONCEPT ONLY

**Definition:** The idea exists. Nothing is built or specced.

**Criteria (ALL must be true):**
- No entity model defined
- No state model defined
- No code exists
- No spec exists
- May have a name and a description

**Allowed actions:**
- Brainstorm
- Rough scoping
- Feasibility discussion

**Blocked actions:**
- Task creation ← HARD BLOCK
- Sprint assignment ← HARD BLOCK
- Documentation in Notion ← HARD BLOCK
- Any build work ← HARD BLOCK

---

## TIER 2: PROTOTYPE CAPABILITY

**Definition:** Something exists that demonstrates the core behavior. It is not reliable, not wired, and not ready for real users.

**Criteria (ALL must be true):**
- Core behavior has been demonstrated at least once
- May have partial UI or partial backend
- No complete entity model
- No complete state model
- No failure handling
- No receipt mechanism

**Allowed actions:**
- Continued prototyping
- Entity model definition (required to advance)
- State model definition (required to advance)

**Blocked actions:**
- Task creation for build ← HARD BLOCK (must reach Tier 3 first)
- Launch readiness discussion ← HARD BLOCK
- Documentation as complete ← HARD BLOCK

---

## TIER 3: DOCUMENTED OPERATOR PLAYBOOK

**Definition:** The feature is fully specced and a capable operator can build it from the documentation. It is not yet built or verified.

**Criteria (ALL must be true):**
- Entity model: complete (entities, fields, ownership, relationships, lifecycle)
- State model: complete (states, transitions, entry/exit conditions, failure states, retry paths)
- Control layer: defined (what is allowed, blocked, review-required, logged)
- Receipt plan: defined for any external or stateful action
- Risk: classified (low/medium/high)
- Owner: named
- DoD: written as a verifiable statement

**Allowed actions:**
- Task creation ← UNLOCKED
- Sprint assignment ← UNLOCKED
- Build work ← UNLOCKED
- Notion spec documentation ← UNLOCKED

**Blocked actions:**
- Launch ← HARD BLOCK (must reach Tier 4 first)
- Marketing claims ← HARD BLOCK

---

## TIER 4: PRODUCT-READY SUBSYSTEM

**Definition:** Built, verified, wired, tested, and monitored. A real user can use this feature in production without a human supervising it.

**Criteria (ALL must be true):**
- UI exists and is wired to real backend (verified, not assumed)
- Backend logic exists and is not mocked (verified in code)
- Entity model implemented correctly in database
- State model implemented (all states, including error and empty states)
- Control layer enforced (auth, permissions, logging)
- Failure handling: all failure modes return meaningful errors
- Receipts: all stateful actions produce receipts
- PostHog: critical event instrumented
- Sentry: error captured with context
- At least one test exists and passes
- RLS enabled on all Supabase tables this feature touches

**Allowed actions:**
- Launch ← UNLOCKED
- Production deployment ← UNLOCKED
- Stakeholder demos with real users ← UNLOCKED

**Required before marking Tier 4:**
- Feature completeness audit must pass (all 10 checks)
- UI wiring audit must pass
- No critical items open in broken-wiring-report.md

---

## CLASSIFICATION DECISION TREE

```
Does it exist in any form?
  → No → TIER 1

Has the core behavior been demonstrated?
  → No → TIER 1
  → Yes → check next

Is the entity model complete AND state model complete AND control layer defined?
  → No → TIER 2
  → Yes → check next

Has it been built, wired, and verified?
  → No → TIER 3
  → Yes → check next

Does it pass the full feature completeness audit?
  → No → TIER 3 (classified as built but incomplete)
  → Yes → TIER 4
```

---

## ENFORCEMENT RULE

Claude must check this file before:
- Creating any task
- Writing any feature spec
- Making any launch recommendation
- Documenting any feature as complete

If classification is unknown: run /prototype-classify before proceeding.
