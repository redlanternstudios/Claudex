# ACTIVE PRIORITIES
State as of: 2026-04-17 | Update cadence: Weekly (every Monday)

---

## CURRENT SPRINT FOCUS

Primary product: HireWire
Secondary: Paradise Property Services (vendor compliance system)
Infrastructure: RedLantern OS setup (this system)

---

## PRIORITY STACK (RANKED)

### P1 — HIREWIRE: Reach verified Tier 3 on core features
**Why:** HireWire's core features (job URL parsing, resume generation, evidence matching) are ASSUMPTION: partially wired. None have passed a feature completeness audit. Cannot build on top of unverified foundations.
**Unblocks:** Legitimate sprint planning, real task creation, launch conversation
**Immediate action:** Run /repo-ingest on HireWire repo → run /truth-audit → classify all features
**Owner:** Ro + Claude

### P2 — HIREWIRE: Job parser feature — n8n flow spec
**Why:** Job URL parsing is the entry point to the entire HireWire product. If this isn't real, nothing downstream is real.
**Status:** ASSUMPTION — n8n flow may exist in some form. Not verified.
**Immediate action:** Run /n8n-plan for job parser flow. Verify live flow matches spec.
**Owner:** Ro

### P3 — PARADISE: Vendor approval flow — define entity model
**Why:** Paradise's vendor packet system (Basheer entity, license + insurance + bond compliance) has no defined entity model. Without it, the workflow cannot be classified above Tier 2.
**Status:** ASSUMPTION — workflow described but not specced
**Immediate action:** Run /entity-map for vendor approval workflow
**Owner:** Ro

### P4 — REDLANTERN OS: Complete Phase 1-2 file installation
**Why:** This OS is not operational until the core files are in place and Claude can start sessions from context, not from re-explanation.
**Status:** IN PROGRESS (this session)
**Immediate action:** Complete current build, then run /daily-reset to verify orientation works
**Owner:** Claude

### P5 — HIREWIRE: Supabase RLS audit
**Why:** ASSUMPTION: RLS may not be enabled on all tables. If user data tables lack RLS, this is a critical security gap that blocks launch.
**Status:** Unverified
**Immediate action:** Pull schema from Supabase, check RLS status per table
**Owner:** Ro

---

## BLOCKED ITEMS

| Item | Blocked by | Owner |
|------|-----------|-------|
| HireWire sprint planning | Feature classification not complete | Ro |
| Paradise task creation | Entity model not defined | Ro |
| HireWire launch conversation | Feature completeness audit not run | Ro |

---

## DEPRIORITIZED (NOT THIS SPRINT)

- SEO listing consistency audit (Paradise) — P3 must be done first
- Gamma/Canva asset work — not blocking any critical path
- Monday board restructuring — current board is functional enough

---

## NEXT REVIEW DATE: 2026-04-25
