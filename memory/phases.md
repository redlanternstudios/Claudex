# QuietBuild OS — Phase Plan
# Scope: global (all agents)
# Last updated: 2026-06-08
# SwarmClaw knowledge ID: 5c65ef2636cac539

RULE: Do not start Phase N+1 before Phase N acceptance criteria are fully met.
More agents without enforced handoff contracts = more gaps, not more power.

---

## Phase 1 — Close the Knowledge and Architecture Gaps
STATUS: SIGNED OFF by Ro — 2026-06-08

Agents added:
- Architect  (a4c9f2e1) — system design, ADR authorship, entity/state/RLS enforcement
- Librarian  (63bab5ba) — persistent memory, write validation, read queries
- TechWriter (7ec4d0f2) — organized-push documentation, HIGH/NORMAL commit triggers

Deliverables:
- Handoff contract v2 (7 fields) wired to all existing agents
- Active work registry running (Conductor maintains)
- Dead-letter queue active (Supervisor routes failures)
- Keystone task: Amina daily reflection streak tracking — full loop proof

Gate: All 11 acceptance criteria in phase1/acceptance-criteria-tracker.md checked with evidence.
Phase 2 NOT authorized until Ro explicitly says "Phase 2 authorized."

---

## Phase 2 — Complete the Engineering-to-Operations Spine
STATUS: AUTHORIZED — 2026-06-08

Agents to add:
- Backend (full implementation)
- Data/DB (Supabase schema, migrations, RLS enforcement)
- SRE (deploy pipeline, monitoring, rollback)

Enables: full build → deploy → monitor loop
Unlocks: Amina can ship to production

---

## Phase 3 — Launch Capability
STATUS: LOCKED (pending Phase 2)

Agents to add:
- Marketing
- Brand/Copy
- ASO/SEO
- Support

Enables: built product → launched product → user feedback loop
Unlocks: Amina public launch, app store presence

---

## Phase 4 — Full Business Operations
STATUS: LOCKED (pending Phase 3)

Agents to add:
- Finance
- Legal
- Sales
- People/Roster

Enables: commercial operations, vendor compliance (Paradise), revenue streams
Unlocks: Paradise contractor system, HireWire commercial launch

---

## Phase 5 — Content Pipeline at Scale
STATUS: LOCKED (pending Phase 4)

Agents to add:
- Content Sourcing
- Scholarly Review Coordinator
- Editorial

Enables: Authentic Hadith publish pipeline with human gate enforced
Hard rule: No hadith content ships without documented human scholar sign-off (name + date).

---

## Product → Phase Dependency Map

| Product         | Active? | Unlocked by      |
|-----------------|---------|------------------|
| Amina           | YES     | Phase 1 keystone |
| HireWire        | PAUSED  | Phase 2 proven   |
| Paradise/By Red | YES     | Phase 4 for ops  |
| Authentic Hadith| PLANNED | Phase 5 pipeline |
