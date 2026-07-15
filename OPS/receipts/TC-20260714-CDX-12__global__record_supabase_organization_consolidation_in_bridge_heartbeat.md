# TruthCal Receipt TC-20260714-CDX-12

Date: 2026-07-14
Product: global
Lane: studio/bridge-control-plane
Author: codex
Intent: record Supabase organization consolidation in bridge heartbeat
Result: VERIFIED

## Truth

VERIFIED: Receipt created through the Claudex command layer.

## Heartbeat

* Status: VERIFIED SYNC YELLOW.
* Focus: VERIFIED The Lantern, source registry OS.
* Receipt: VERIFIED TC 20260714 CDX 12.

## What changed

* VERIFIED: Supabase now has exactly three organizations: By Red, LLC with five paused projects; Penn Enterprises LLC with two paused Authentic Hadith projects; and RedLantern Studios Pro with three active projects.
* VERIFIED: Four empty legacy organizations were removed after their project lists were confirmed empty.
* VERIFIED: Every remaining organization has Supabase Assistant database sharing Disabled.
* VERIFIED: No project data, Auth users, endpoints, keys, functions, storage, integrations, or release paths were deleted.
* VERIFIED: No paused project resumed and no new recurring compute charge was accepted.
* VERIFIED: The active Authentic Hadith project reference is `nqklipakrfuwebkdnhwg`.
* VERIFIED: The TradeSwarm project reference is `rnvaagbrvibokkhuztnc`.
* VERIFIED: HireWire and Amina currently share the production project `endovljmaudnxdzdapmf` with Lantern, Deixis, and By Red operating data.

## Needs Ro

* PARTIAL: Decide whether QBos should be restored for inspection before 27 Jul 2026.
* PARTIAL: Decide whether TradeSwarm should be restored before 02 Aug 2026 because it is next for release.

## Next

* VERIFIED: Keep every current project in place while the release paths remain active.
* PARTIAL: Protect the QBos and TradeSwarm recovery gates, keep Amina release state frozen, and design the shared production database split as a separate rehearsed migration with Auth and rollback proof.

## Evidence

* `OPS/CTP_SUPABASE_ORGANIZATION_CLEANUP_20260714.md`
* `OPS/receipts/TC-20260714-CDX-11__supabase__consolidated_to_three_legal_organizations.md`
* Live Supabase organization page verified with exactly three organizations after cleanup.
* Live organization privacy settings verified Disabled for all three remaining organizations.

## Next action

Keep the current Lantern focus unchanged. Protect the QBos and TradeSwarm recovery gates and do not split the shared production database during the Amina release window.
