# WORKSPACE MEMORY — REDLANTERN STUDIOS
State as of: 2026-04-17 | Update cadence: Weekly

---

## PORTFOLIO STATE

### HireWire
**What it is:** AI Career OS — job URL parsing + evidence matching + ATS-safe resume generation
**Current state:** Mid-build. Core flows partially built. Feature classifications unverified. No /repo-ingest has been run. Build state is ASSUMPTION, not verified.
**Biggest gap:** Feature completeness is unknown. Cannot run sprint planning until /truth-audit is complete.
**Next action:** Run /repo-ingest → /truth-audit → classify all features
**Classification:** Tier 2 (ASSUMPTION)

### Paradise Property Services
**What it is:** Vendor/contractor compliance system for a property services business
**Current state:** Business structure defined (Basheer = licensed entity, By Red = ops layer). Vendor approval workflow described but not specced. No entity model defined.
**Biggest gap:** Entity model for vendor approval flow not defined. Cannot create tasks.
**Next action:** Run /entity-map for vendor approval workflow
**Classification:** Tier 1-2 (ASSUMPTION)

### RedLantern OS (this system)
**What it is:** Claude operating system — file-based memory, command loop, integrity enforcement
**Current state:** Phase 1-2 files being installed (this session). Core files created. Commands defined. Not yet tested end-to-end.
**Next action:** Complete file installation, run /daily-reset simulation, verify orientation works
**Classification:** In progress

---

## CROSS-PROJECT DEPENDENCIES

| Dependency | From | To | Risk |
|-----------|------|----|------|
| Entity structure must be finalized before Paradise docs | Entity structure | All Paradise docs | Medium — addresses missing above |
| OS must be operational before reliable sprint planning | RedLantern OS | HireWire + Paradise | Medium — currently installing |
| HireWire truth audit must complete before task creation | /truth-audit | HireWire sprint | High — blocking P1 |

---

## KNOWN CROSS-PRODUCT RISKS

1. Both HireWire and Paradise require Supabase. If schema is managed inconsistently (some tables via migrations, some via dashboard), both products are at risk.
2. n8n is the logic layer for both products. If n8n goes down or flows are undocumented, both products are exposed.
