# Supabase Organization Cleanup CTP

Date: 2026 07 14
Owner: Ro
Status: PARTIAL

## OBJECTIVE

VERIFIED: Replace the product shaped organization sprawl with three legal entity organizations: RedLantern Studios, By Red, LLC, and Penn Enterprises LLC.

VERIFIED: Protect every live database, user, session, key, endpoint, App Store path, and Vercel connection during cleanup.

## CONTRACT

GOAL: Establish the live organization and project inventory, make only the naming correction that has no data plane effect, and define the evidence gates for later transfers or retirement.

CONSTRAINTS: No project move, pause, archive, deletion, endpoint change, key change, Auth change, or billing downgrade without project specific ownership proof, dependency proof, backup proof, and rollback proof.

FORMAT: Live inventory, verified correction, target map, failure conditions, and next gates.

FAILURE: Any loss of data, Auth continuity, endpoint continuity, billing capability, Vercel integration, release continuity, or legal ownership clarity.

## REALITY CHECK

VERIFIED: The Supabase dashboard showed seven organizations before the naming correction.

| Organization | Plan | Live project inventory | Current decision |
| --- | --- | --- | --- |
| Authentic Hadith | Free | Authentic Hadith, `lwklogxdpjnvfxrlcnca`, AWS us east 1 | KEEP until duplicate analysis is complete |
| FloorIQ | Free | FloorIQ, `awnzgbiugomncrnfqnnr`, AWS us east 2; PhonePO, `yocoxetfpmnmrparbmnf`, AWS us east 1 | HOLD for archive proof |
| QBos RobbyPA | Free | No project card visible | HOLD for member and billing proof before retirement |
| QuietBuild OS | Free | QBos, `gcpnnkdldnnnkkkwbnog`, AWS us west 2 | KEEP until By Red ownership and transfer gates pass |
| RedLantern Studios | Pro | AuthenticHadith App, `nqklipakrfuwebkdnhwg`, AWS us east 1; By Red, LLC., `mlmrdkiyxlngmwhdtrln`, AWS us east 1; RedLantern Studios, `endovljmaudnxdzdapmf`, AWS us east 1 | KEEP as active paid organization |
| TradeSwam | Free | rsemeah's Project, `dadvjqemlevhdnkgettc`, AWS ca central 1; TradeSwarm, `rnvaagbrvibokkhuztnc`, AWS us west 2 | HOLD for product and duplicate analysis |
| TradeSwarm | Free | Authentic Hadith, `wsgyvnnwbbezqycfktym`, AWS us west 2 | HOLD for duplicate analysis |

VERIFIED: The paid organization is managed through Vercel Marketplace and contains the three connected projects that the Supabase connection can access.

VERIFIED: The organization identifier `vercel_icfg_rkyVLpjfv9fooUrFjURvhZpy` did not change when the organization name changed.

VERIFIED: The previous organization name `rsemeah's projects` is now `RedLantern Studios` in both the live dashboard and the Supabase connection.

PARTIAL: Product ownership is known at the portfolio level but is not yet proven project by project for every legacy database.

UNKNOWN: Which of the three Authentic Hadith databases is production, staging, dormant, or historical.

UNKNOWN: Whether `rsemeah's Project` is unused, a TradeSwarm dependency, or another product under a stale name.

UNKNOWN: Whether PhonePO has any active clients, functions, integrations, or retained data obligations.

UNKNOWN: Whether the empty QBos RobbyPA organization still has members, billing artifacts, integrations, audit history, or legal retention requirements.

## EXECUTION

VERIFIED: Captured the organization names, plans, project names, project references, regions, and visible Vercel relationship from the live dashboard.

VERIFIED: Renamed only the Pro organization from `rsemeah's projects` to `RedLantern Studios`.

VERIFIED: Made no project transfer, pause, archive, deletion, endpoint mutation, key mutation, Auth mutation, billing downgrade, or data mutation.

VERIFIED: Confirmed the new name through two independent live surfaces: the dashboard and the Supabase connection.

## TARGET MAP

VERIFIED: RedLantern Studios is the target organization for RedLantern Studios products after each product passes its own transfer gate.

PARTIAL: By Red, LLC is the likely target organization for QuietBuild OS, QBos RobbyPA, and the current `By Red, LLC.` project. Legal ownership must be proven before any move.

UNKNOWN: Penn Enterprises LLC has no verified project mapping in this inventory.

UNKNOWN: FloorIQ and PhonePO need a retention or archive decision supported by usage and dependency evidence.

## RESULT

VERIFIED: The highest value safe correction is complete. The active paid organization now has the correct RedLantern Studios identity without changing its organization identifier or its three databases.

PARTIAL: The broader consolidation remains intentionally incomplete because the live inventory exposed duplicate Authentic Hadith databases, a misspelled TradeSwam organization, an unnamed personal project, and unresolved ownership.

## EDGE CASES

VERIFIED: A project transfer can affect billing features and may be blocked by active GitHub integration, scoped roles, or log drains. Every candidate therefore requires a separate transfer preflight.

VERIFIED: Renaming an organization does not separate product data. Product isolation remains enforced inside each database through schema, grants, and row level security.

VERIFIED: Space is consumed by project compute and stored data, not by the organization label itself. Storage and compute review must be performed per project before any archive decision.

VERIFIED: Duplicate product names do not prove duplicate data. Production traffic, Auth users, database size, recent activity, functions, storage, integrations, environment references, and backup state must be compared first.

## NEXT ACTION

1. VERIFIED: Keep all current projects in place.

2. UNKNOWN: Resolve the three Authentic Hadith project roles using client environment references, recent database activity, Auth counts, storage, functions, and release configuration.

3. UNKNOWN: Resolve `rsemeah's Project`, PhonePO, FloorIQ, and both TradeSwarm databases using the same evidence set.

4. PARTIAL: Create or verify the By Red, LLC and Penn Enterprises LLC target organizations only after billing ownership and member access are confirmed.

5. VERIFIED: Require a backup receipt and rollback receipt before the first project transfer or retirement.
