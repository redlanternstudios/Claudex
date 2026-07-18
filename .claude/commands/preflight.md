# /preflight [surface?]

**Purpose:** Run the repeatable preflight for the current BuildTeam style surface, checklist, or restart path.

**Skill:** `.claude/skills/preflight.md`

---

## INPUTS
- `surface` (optional) - The exact page, flow, or checklist to audit.

## PRECONDITIONS
Read before asking Ro anything:
1. `OPS/BRIDGE.json`
2. `OPS/TODAY.md`
3. `memory/MEMORY.md` index when the request depends on studio history
4. The current surface files and any existing checklist
5. `OPS/CLAUDEX_PREFLIGHT_CONTRACT.md`

## EXECUTION
1. State the prompt contract.
2. Verify the live surface versus any mirror or doc.
3. Audit the checklist for proof, ownership, exit conditions, and freeze paths.
4. Turn the checklist into a repeatable sequence if it is durable.
5. Return `READY`, `HOLD`, or `BLOCKED` with the exact reason.

## OUTPUTS
- Prompt contract
- Reality check
- Audit findings
- Repeatable skill shape
- Readiness verdict
- Blockers

## SUCCESS CONDITION
The audit can be rerun later with the same surface and produce the same verdict class from the same proof rules.
