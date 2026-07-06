# /theaudit [solution] [scope?]

**Purpose:** Build or refresh the Solution Audit (the per-solution Audit) for a solution using The Audit Protocol. Codes out ambiguity down to every button and click.

**Spec:** `.claude/frameworks/THE_AUDIT_PROTOCOL.md`
**Template:** `.claude/frameworks/THE_AUDIT_INSTANCE_TEMPLATE.md`

---

## INPUTS
- `solution` (required) — Amina, TradeSwarm, HireWire, The Lantern, Paradise, Deixis, Daily OS, RLS Website, etc.
- `scope` (optional) — a single surface/page/flow to map instead of the whole solution (e.g. `Amina onboarding`).

## PRECONDITIONS (self-answer first)
Read before asking Ro anything:
1. `memory/MEMORY.md` index → the solution's project + repo memory files
2. Any existing `projects/[solution]/repo/` outputs from `/repo-ingest`
3. The live repo + live URL if available
4. Existing Audit if one exists (refresh, don't rebuild)

## EXECUTION
1. **Classify** the solution (The Audit §2 gate): CONCEPT / PROTOTYPE / PLAYBOOK / PRODUCT-READY → sets required depth.
2. **Build the Surface Inventory tree** (§3) top-down. No orphans.
3. **Fill the Atomic I/O Contract Table** (§11) — one row per interactive element, every column. This is the core.
4. **Cross-wire**: element → flow (§10) → entity (§8) → receipt (§15) → failure path (§16).
5. **Populate** all applicable sections for the maturity class.
6. **Run the four audits**: orphan · blank-cell · trap-state · fake-complete.
7. **Emit** the Audit.

## OUTPUTS
Writes to `projects/[solution]/audit/`:
- `Audit.md` — the markdown SSOT (all 18 sections)
- `Audit.pdf` — branded RLS PDF (build HTML → WeasyPrint)
- `LSB_dashboard.html` — live dashboard artifact (optional per request)
- Updated Section 18 change log

## SUCCESS CONDITION
A builder who has never seen the solution can rebuild it from the Audit alone, with zero questions.

## FAILURE CONDITIONS (output rejected if any)
- Any interactive element without an I/O row
- Any button/input with blank output, state change, or validation
- Any loop without an exit condition
- Any automation without a kill switch
- Any VERIFIED claim without a receipt
- Any external write without a dedup key
- Business logic mapped to the frontend

## SESSION CLOSE
Update The Audit §18 (Change & Decision Log). Downgrade stale statuses. Write next action to session handoff.
