# Supabase Live Organization Inventory And RedLantern Rename

Receipt: TC 20260714 CDX 09
Date: 2026 07 14
Product: supabase
Result: PARTIAL

## OBJECTIVE

VERIFIED: Begin the organization cleanup without risking live product databases or release paths.

## REALITY CHECK

VERIFIED: Seven organizations and ten visible projects were inspected through the live dashboard.

VERIFIED: The inventory exposed three databases carrying the Authentic Hadith name across three organizations.

VERIFIED: The active Pro organization is managed through Vercel Marketplace and contains AuthenticHadith App, By Red, LLC., and RedLantern Studios.

## EXECUTION

VERIFIED: The Pro organization name changed from `rsemeah's projects` to `RedLantern Studios`.

VERIFIED: The organization identifier remains `vercel_icfg_rkyVLpjfv9fooUrFjURvhZpy`.

VERIFIED: No project moved, paused, archived, or deleted.

VERIFIED: No database data, Auth user, session, key, endpoint, Vercel connection, billing plan, or release path changed.

## RESULT

VERIFIED: The dashboard shows `RedLantern Studios`, Pro Plan, three projects.

VERIFIED: The Supabase connection returns the same organization identifier with the name `RedLantern Studios`.

PARTIAL: Consolidation is not complete. Duplicate product databases and unresolved legal ownership block safe transfers and retirement.

VERIFIED: Full CTP and live inventory are recorded in `OPS/CTP_SUPABASE_ORGANIZATION_CLEANUP_20260714.md`.

## EDGE CASES

UNKNOWN: Production role of each Authentic Hadith database.

UNKNOWN: Active dependency state for FloorIQ, PhonePO, QBos, rsemeah's Project, and both TradeSwarm databases.

UNKNOWN: Current member, billing, integration, and retention state of the empty QBos RobbyPA organization.

## NEXT ACTION

Keep every project in place. Resolve production identity and dependency evidence product by product, then prepare a reversible transfer plan with backup and rollback receipts.
