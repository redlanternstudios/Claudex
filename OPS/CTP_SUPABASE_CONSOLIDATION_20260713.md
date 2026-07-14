# SUPABASE CONSOLIDATION — FULL CTP

Date: 2026-07-13
Scope: RedLantern Studios Supabase org consolidation

## Prompt Contract

GOAL: Consolidate fragmented Supabase orgs into one RedLantern Studios org with clear product level sub structure. Single SSOT for billing, access, and governance.

CONSTRAINTS:
- Live products with active users exist
- Keymon has a separate account
- Zero downtime required for live products
- Must preserve all data, RLS policies, and API keys
- Invoices are cleared

FORMAT:
- Target org architecture
- Step by step migration plan per project
- Rollback path for each project
- Access cleanup procedure
- Data verification checklist

FAILURE:
- Data loss during migration
- Broken queries from cross org dependencies
- RLS drift or broken access
- Keymon project orphaned or moved without consent
- One project failure blocks all others

## Reality Check

VERIFIED:
- Invoices are cleared
- You want a unified org structure
- Keymon has a separate account

PARTIAL:
- Product to project mapping from prior memory
- Active product list from prior memory

UNKNOWN:
- What projects exist in each org right now
- Which projects hold live data versus staging versus abandoned
- Live user counts
- RLS policy differences
- Cross org query paths
- Keymon account ownership specifics

## 3 Pass Analysis

Pass 1:
This is an org cleanup and governance migration.

Pass 2:
The real risk is not billing. It is live data, auth, and hidden cross project dependencies.

Pass 3:
The root goal is one clean ownership model without touching live users until each project is individually proven safe.

## Critical Gaps

1. Live project inventory
2. Production versus staging classification
3. Keymon account status
4. Current access audit
5. Dependency audit

## Recommendation

Do not start migration yet.

First collect a live snapshot of each org, each project, product ownership, and account ownership. Then classify risk by project and migrate one project at a time with rollback.

## Failure Conditions

1. Moving a live project without knowing its users
2. Mismatched RLS or auth after migration
3. Cross org query breakage
4. Orphaning Keymon owned work
5. Access cleanup before rollback exists

## Next Action

Collect the live org snapshot and project map before touching production.
