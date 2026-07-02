# Claudex Alignment Policy

Version: 1.0
Date: 2026-07-02

## Objective

Codex and Claude detect new bridge revisions without waiting for Ro to explain that an update exists.

## Trigger layers

### Immediate local hooks

Post checkout: recompute alignment.

Post commit: report whether local state is ahead.

Post merge: run doctor and recompute alignment.

Pre push: run the full integrity suite.

### Local scheduled watcher

The macOS service runs every five minutes.

It fetches `origin/main`.

Clean and behind: fast forward and report.

Dirty and behind: do not merge. Record yellow.

Diverged: do not merge. Record red.

Offline: preserve local state and record yellow.

The local signal lives at `.claudex/alignment.json` and is never committed.

### GitHub scheduled signal

GitHub validates the bridge every fifteen minutes and after every bridge, intent, or receipt update.

One durable GitHub issue receives alignment comments. This is the cross machine event feed.

### Codex scheduled monitor

Codex runs the watcher every fifteen minutes in the local Claudex checkout and reports red or yellow alignment changes.

## Alignment matrix

| Relation | Local state | Color | Required action |
|---|---|---|---|
| Aligned | clean | GREEN | Continue from bridge next action |
| Aligned | dirty | YELLOW | Continue only within the current lane |
| Behind | clean | YELLOW | Fast forward, doctor, continue |
| Behind | dirty | YELLOW | Preserve work, then fast forward |
| Ahead | any | YELLOW | Validate, receipt, push |
| Diverged | any | RED | Stop, inspect both histories, reconcile, test, receipt, push |
| Fetch failed | any | YELLOW | Use local state and retry later |

## Engine start rule

Both engines run `npm run bridge:sync` before reading the bridge.

If the sync signal is red, stop.

If yellow, explain the warning and follow the recorded action.

If green, continue.

## Engine close rule

Run the full integrity suite.

Write the receipt.

Commit.

The pre push hook verifies again.

Push without force.

If rejected, fetch and reconcile. Never overwrite the other engine.
