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
| Authentic Hadith | Free | Authentic Hadith, `lwklogxdpjnvfxrlcnca`, AWS us east 1 | PAUSED; restore decision due by 02 Oct 2026 |
| FloorIQ | Free | FloorIQ, `awnzgbiugomncrnfqnnr`, AWS us east 2; PhonePO, `yocoxetfpmnmrparbmnf`, AWS us east 1 | PAUSED; archive evidence incomplete |
| QBos RobbyPA | Free | No project card visible | HOLD for member and billing proof before retirement |
| QuietBuild OS | Free | QBos, `gcpnnkdldnnnkkkwbnog`, AWS us west 2 | PAUSED; restore decision due by 27 Jul 2026 |
| RedLantern Studios | Pro | Authentic Hadith App, `nqklipakrfuwebkdnhwg`, AWS us east 1; By Red OS Core, `mlmrdkiyxlngmwhdtrln`, AWS us east 1; RedLantern Shared Production, `endovljmaudnxdzdapmf`, AWS us east 1 | KEEP as active paid organization |
| TradeSwam | Free | rsemeah's Project, `dadvjqemlevhdnkgettc`, AWS ca central 1; TradeSwarm, `rnvaagbrvibokkhuztnc`, AWS us west 2 | PAUSED; restore decisions due by 02 Aug 2026 |
| TradeSwarm | Free | Authentic Hadith, `wsgyvnnwbbezqycfktym`, AWS us west 2 | ARCHIVE CANDIDATE; dashboard restore expired |

VERIFIED: The paid organization is managed through Vercel Marketplace and contains the three connected projects that the Supabase connection can access.

VERIFIED: The organization identifier `vercel_icfg_rkyVLpjfv9fooUrFjURvhZpy` did not change when the organization name changed.

VERIFIED: The previous organization name `rsemeah's projects` is now `RedLantern Studios` in both the live dashboard and the Supabase connection.

PARTIAL: Product ownership is known at the portfolio level but is not yet proven project by project for every legacy database.

PARTIAL: `nqklipakrfuwebkdnhwg` is the active current Authentic Hadith database. It has 74 Auth users, a latest sign in on 13 Jul 2026, 185 MB of database data, 31,885 hadith rows, and two active Edge Functions. The exact App Store build endpoint still needs release configuration proof.

VERIFIED: `lwklogxdpjnvfxrlcnca` is paused, appears only in local Authentic Hadith audit and deployment documents, and can be resumed through 02 Oct 2026.

VERIFIED: `wsgyvnnwbbezqycfktym` has been paused since 23 Jun 2024, can no longer be restored through the dashboard, and has no local project reference. It is an archive candidate, not a deletion candidate until its backup is downloaded and inspected.

UNKNOWN: Whether `rsemeah's Project` is unused, a TradeSwarm dependency, or another product under a stale name.

UNKNOWN: Whether PhonePO has any active clients, functions, integrations, or retained data obligations.

UNKNOWN: Whether the empty QBos RobbyPA organization still has members, billing artifacts, integrations, audit history, or legal retention requirements.

VERIFIED: Every visible Free Plan project is paused. FloorIQ and PhonePO returned no usable backup status in the dashboard. QBos has a dashboard restore deadline of 27 Jul 2026. Both TradeSwarm organization projects have a dashboard restore deadline of 02 Aug 2026.

VERIFIED: The Pro organization is well below every included quota for the 28 Jun to 28 Jul billing cycle: 43 of 100,000 monthly active users, 0.084 of 250 GB egress, 0.008 of 100 GB storage, and no disk overage. Each project has 8 GB provisioned. Space is not a current risk.

VERIFIED: Current Pro compute usage is 1,233 Micro hours with $16.57 shown for the cycle. New active projects would add dedicated compute cost even though the organization plan is shared.

VERIFIED: `endovljmaudnxdzdapmf` is a live shared production database. It contains active HireWire, Amina, By Red operating system, Lantern, and Deixis table families under one Postgres database and one Supabase Auth user pool. It has 44 Auth users, a latest sign in on 15 Jul 2026, 49 MB of database data, and three active Edge Functions.

VERIFIED: `mlmrdkiyxlngmwhdtrln` is an active By Red operating system database. It has 11 Auth users, a latest sign in on 12 Jul 2026, 14 MB of database data, and no Edge Functions.

## EXECUTION

VERIFIED: Captured the organization names, plans, project names, project references, regions, and visible Vercel relationship from the live dashboard.

VERIFIED: Renamed only the Pro organization from `rsemeah's projects` to `RedLantern Studios`.

VERIFIED: Renamed the three active project display names without changing their project references: `AuthenticHadith-App` to `Authentic Hadith App`, `By Red, LLC.` to `By Red OS Core`, and `RedLantern Studios` to `RedLantern Shared Production`.

VERIFIED: Made no project transfer, pause, archive, deletion, endpoint mutation, key mutation, Auth mutation, billing downgrade, or data mutation.

VERIFIED: Confirmed the new name through two independent live surfaces: the dashboard and the Supabase connection.

VERIFIED: Searched the local studio workspace for all ten project references without reading or exposing secret values. Four references have local evidence. Six legacy references have no local product reference.

VERIFIED: Attempted the safe legacy organization naming cleanup. The legacy organization settings are disabled for the current account and state that additional permissions are required. No unsupported workaround was used.

## TARGET MAP

VERIFIED: RedLantern Studios is the target organization for RedLantern Studios products after each product passes its own transfer gate.

PARTIAL: By Red, LLC is the likely target organization for QuietBuild OS, QBos RobbyPA, and the current `By Red, LLC.` project. Legal ownership must be proven before any move.

UNKNOWN: Penn Enterprises LLC has no verified project mapping in this inventory.

UNKNOWN: FloorIQ and PhonePO need a retention or archive decision supported by usage and dependency evidence.

## RESULT

VERIFIED: The active paid organization and all three active project display names now communicate their real role without changing organization identifiers, project references, databases, endpoints, Auth, or integrations.

VERIFIED: The user's space concern is resolved for the current cycle. There is no quota or disk overage.

VERIFIED: The user's data crossing concern is real. The shared production project combines multiple products and a shared Auth pool. That database must stay in place for the current releases while a product boundary migration is designed and tested.

PARTIAL: The broader consolidation remains intentionally incomplete because the legacy organizations cannot be renamed with current permissions, all legacy projects are paused, several recovery deadlines are close, and exact legal ownership remains unresolved.

## EDGE CASES

VERIFIED: A project transfer can affect billing features and may be blocked by active GitHub integration, scoped roles, or log drains. Every candidate therefore requires a separate transfer preflight.

VERIFIED: Renaming an organization does not separate product data. Product isolation remains enforced inside each database through schema, grants, and row level security.

VERIFIED: Space is consumed by project compute and stored data, not by the organization label itself. Storage and compute review must be performed per project before any archive decision.

VERIFIED: Duplicate product names do not prove duplicate data. Production traffic, Auth users, database size, recent activity, functions, storage, integrations, environment references, and backup state must be compared first.

VERIFIED: The July 2026 platform change does not block the three active projects. They are already on Postgres 17.6.1.063. Supabase ended Postgres 14 support on 01 Jul 2026.

VERIFIED: Supabase documents that transfers require ownership in both organizations and may be blocked by active GitHub integrations, project scoped roles, or log drains. Usage and add on billing remain attributed to the source organization through the transfer point. Reference: https://supabase.com/docs/guides/platform/project-transfer

## NEXT ACTION

1. VERIFIED: Keep all current projects in place.

2. PARTIAL: Treat `nqklipakrfuwebkdnhwg` as the active Authentic Hadith database. Verify the exact iOS release endpoint before retiring or restoring either older Authentic Hadith project.

3. UNKNOWN: Decide by 27 Jul 2026 whether QBos must be resumed for inspection or allowed to become backup only.

4. UNKNOWN: Decide by 02 Aug 2026 whether `rsemeah's Project` and TradeSwarm must be resumed for inspection. TradeSwarm is next for release, so its paused state is a release blocker until the correct repository and project reference are proven.

5. UNKNOWN: Resolve PhonePO and FloorIQ through support or backup evidence because the dashboard returned no backup status.

6. PARTIAL: Repair legacy organization owner permissions before renaming or consolidating them. Create or verify the By Red, LLC and Penn Enterprises LLC target organizations only after billing ownership and member access are confirmed.

7. VERIFIED: Design the shared production split product by product. Start with a fresh project, schema and Auth migration rehearsal, client endpoint cutover plan, and rollback. Do not split Amina during the current App Store release window.

8. VERIFIED: Require a backup receipt and rollback receipt before the first project transfer or retirement.
