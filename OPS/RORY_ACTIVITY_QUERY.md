# Rory Activity Query

Receipt timestamp: 2026-07-07 America/Los_Angeles

## Purpose

Let KP ask normal questions like:

- What has Rory done today?
- Has Rory started Amina archive work?
- What is Rory blocked on?
- Did Rory answer my question yet?

The answer must come from Claudex receipts, bridge state, questions, directives, and git history.

## Status

PARTIAL: read-only query helper added.

VERIFIED:
- `OPS/BRIDGE.json` carries current product lanes, blockers, warnings, next actions, and sync status.
- `OPS/BRIDGE_SYNC_HEARTBEAT.md` defines an hourly heartbeat that ingests both sides and pushes structured asks.
- `OPS/QA_PROTOCOL.md` defines cross-engine questions in `OPS/questions/`.
- Receipts in `OPS/receipts/` carry author, date, product, lane, intent, result, and evidence.

MISSING:
- Mobile Codex access depends on the Claudex repo being reachable from that Codex session.
- Rory activity is only visible after Rory or his heartbeat writes and pushes receipts, bridge updates, commits, or question answers.

## CTP Contract

GOAL: KP can ask status questions in plain language and receive an answer grounded in receipts.

CONSTRAINTS:
- No guessing Rory's intentions.
- No claiming work happened unless a receipt, commit, bridge update, question answer, or directive proves it.
- No secret values.
- No relying on Notion as the truth source.

FORMAT:
- Direct answer first.
- Then evidence bullets.
- Then missing proof or blocker if any.

FAILURE:
- The system fails if it answers from vibes, stale memory, or private chat context that was never written into Claudex.

## Truth Rule

Rory did something only if at least one of these exists:

- a same-day receipt with `Author: claude`, `Author: ro`, `Author: rory`, or Cowork wording;
- a same-day git commit by Rory/Ro/Claude/Cowork;
- a same-day `OPS/BRIDGE.json` update naming the work;
- an answered question in `OPS/questions/`;
- a directive marked `done` with evidence.

Otherwise the answer is:

`MISSING: I do not see a receipt or bridge update proving Rory started this.`

## Mobile Reality

Possible in Codex mobile if the mobile session can access the Claudex repo state through one of these:

1. GitHub-backed Claudex repo.
2. A Codex thread connected to this workspace or a synced checkout.
3. A future lightweight status endpoint or bot that reads the same files.

Not possible if Rory's latest work is only on his local machine and has not been pushed, synced, or written into Claudex.

## Query Helper

Run from the Claudex repo:

```bash
node scripts/rory-activity.mjs
node scripts/rory-activity.mjs --date 2026-07-07
node scripts/rory-activity.mjs --search amina
```

The helper is read-only. It does not modify bridge state.

## Status Writer

Run from the Claudex repo:

```bash
node scripts/rory-activity-status.mjs
node scripts/rory-activity-status.mjs --git
```

The status writer creates:

- `OPS/status/RORY_ACTIVITY_TODAY.md`
- `OPS/status/RORY_ACTIVITY_STATUS_YYYY-MM-DD_HHMM.md`

With `--git`, it commits only those status files when the repo has no unrelated dirty changes.
This is what makes mobile Codex useful, because mobile needs the status committed and synced.
