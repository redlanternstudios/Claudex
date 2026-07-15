# Supabase Project Roles Usage And Safe Display Names

Receipt: TC 20260714 CDX 10
Date: 2026 07 14
Product: supabase
Result: PARTIAL

## OBJECTIVE

VERIFIED: Continue the organization cleanup through live project identity, usage, pause state, and product boundary verification without moving or deleting data.

## REALITY CHECK

VERIFIED: The RedLantern Studios Pro organization is below all included quotas. The current cycle shows 43 monthly active users, 0.084 GB egress, 0.008 GB storage, and no disk overage.

VERIFIED: Authentic Hadith App is active with 74 Auth users, 185 MB of database data, recent sign in activity, 31,885 hadith rows, and two active Edge Functions.

VERIFIED: By Red OS Core is active with 11 Auth users, 14 MB of database data, recent sign in activity, and no Edge Functions.

VERIFIED: RedLantern Shared Production is active with 44 Auth users, 49 MB of database data, recent sign in activity, and three active Edge Functions.

VERIFIED: RedLantern Shared Production contains HireWire, Amina, By Red operating system, Lantern, and Deixis table families under one Postgres database and one Auth user pool.

VERIFIED: Every visible Free Plan project is paused. QBos can be resumed through 27 Jul 2026. Both projects in the misspelled TradeSwam organization can be resumed through 02 Aug 2026. The Free Authentic Hadith project can be resumed through 02 Oct 2026. The Authentic Hadith project inside the separate TradeSwarm organization has been paused since 23 Jun 2024 and is no longer restorable through the dashboard.

## EXECUTION

VERIFIED: Searched the studio workspace for all ten project references without exposing secret values.

VERIFIED: Renamed three active display names: Authentic Hadith App, By Red OS Core, and RedLantern Shared Production.

VERIFIED: Confirmed all three names through both the dashboard and the Supabase connection. Project references, regions, Postgres databases, Auth users, endpoints, and integrations did not change.

VERIFIED: Attempted legacy organization naming cleanup. Supabase disabled those controls for the current account and reported that additional permissions are required.

VERIFIED: No project was resumed, transferred, paused, archived, or deleted. No schema, row, key, Auth setting, endpoint, billing plan, or integration changed.

## RESULT

VERIFIED: Space is not a current problem.

VERIFIED: Product data crossing is the primary architectural risk because multiple live products share one database and Auth namespace.

PARTIAL: Safe cleanup advanced through verified naming and classification. Consolidation remains blocked by legacy permissions, paused project recovery decisions, legal ownership mapping, and release endpoint proof.

## EDGE CASES

VERIFIED: A new active project adds dedicated compute cost even when it belongs to the existing Pro organization.

VERIFIED: A display name change does not alter project references or separate data.

VERIFIED: A paused project name does not prove that its retained data is disposable.

## NEXT ACTION

Protect the 27 Jul and 02 Aug recovery gates first. Prove the current TradeSwarm repository and project reference. Verify the exact Authentic Hadith App Store endpoint. Then design a rehearsed product boundary split for the shared production database without touching Amina during its release window.
