# TruthCal Receipt TC-20260717-CDX-01

Date: 2026-07-17
Product: claudex
Lane: claudex/heartbeat-routing-correction
Author: codex
Intent: Correct heartbeat Rory task selection and activity status routing
Result: COMPLETE

## Truth

VERIFIED: The heartbeat now selects the first ranked executable Rory task from the canonical backlog instead of passing a null task into the KP to Rory handoff formatter.
VERIFIED: The Rory activity writer now resolves its timestamped snapshot and rolling live status through the content routing registry before writing either file.
VERIFIED: New status paths include the Claudex system name and precise Rory activity topic. Previously committed `RORY_ACTIVITY_*` history remains unchanged.
VERIFIED: The routing gate fails closed when a timestamped snapshot does not provide a four digit time.
UNKNOWN: Provider credential rotation, Amina release state, and other external owner work were not changed or verified by this correction.

## Evidence

- `node --test tests/heartbeat-handoff.test.mjs tests/content-routing.test.mjs`: 17 of 17 focused tests passed.
- `npm run check`: 52 of 52 repository tests passed; backlog integrity PARTIAL due existing dependency work; content routing and bridge doctor passed.
- `npm run content:route -- --type=status_snapshot --product=Claudex --topic='Rory activity' --date=2026-07-17 --time=0045`: resolved `OPS/status/CLAUDEX_RORY_ACTIVITY_STATUS_20260717_0045.md`.
- `npm run content:route -- --type=live_status --product=Claudex --topic='Rory activity' --date=2026-07-17`: resolved `OPS/status/CLAUDEX_RORY_ACTIVITY_TODAY.md`.
- `npm run heartbeat`: handed Rory the score 83.8 provider key rotation action with its exact done proof.
- Final status writer readback generated `OPS/status/CLAUDEX_RORY_ACTIVITY_STATUS_20260717_0018.md` and refreshed `OPS/status/CLAUDEX_RORY_ACTIVITY_TODAY.md` after the bridge focus returned to Amina.
- Rollback: revert the repair commit. Historical status files remain intact.

## Next action

Publish the correction to canonical Claudex main and verify the remote commit, generated KP to Rory handoff, and exact file set by read back.
