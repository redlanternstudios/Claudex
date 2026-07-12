# Claudex Alignment Policy

Version: 1.0
Date: 2026-07-02

## Objective

Codex and Claude detect new bridge revisions without waiting for Ro to explain that an update exists.

The bridge is two-way:

- Remote to local: fetch `origin/main`, verify the remote bridge's latest receipt exists in GitHub history, then fast-forward only when the local checkout is clean.
- Local to remote: validate, test, verify the local bridge's latest receipt exists in the working tree and HEAD commit, then push without force.

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

Behind with missing remote receipt: do not merge. Record red.

Diverged: do not merge. Record red.

Offline: preserve local state and record yellow.

The local signal lives at `.claudex/alignment.json` and is never committed.

### Obsidian mirror sync

The vault mirror service runs every five minutes and on load.

It calls `npm run bridge:obsidian`.

Its job is to keep `_CLAUDEX LIVE.md` and `_CLAUDEX STARTUP PACK.md` current from the bridge so the vault and Claudex read the same state.

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
| Behind | clean, remote receipt missing | RED | Stop; fix the remote receipt before importing state |
| Ahead | clean, local receipt present | YELLOW | Validate, test, push |
| Ahead | dirty or receipt missing | RED/YELLOW | Commit the receipt-backed state before push |
| Diverged | any | RED | Stop, inspect both histories, reconcile, test, receipt, push |
| Fetch failed | any | YELLOW | Use local state and retry later |

## Engine start rule

Both engines run `npm run bridge:sync` before reading the bridge.

If the sync signal is red, stop.

If yellow, explain the warning and follow the recorded action.

If green, continue.

Use `npm run bridge:sync -- --apply` only when importing remote state into a clean checkout. This refuses to fast-forward if the remote bridge references a missing receipt.

## Engine close rule

Run the full integrity suite.

Write the receipt.

Commit.

Run `npm run bridge:publish`.

The publish command fetches first, confirms local is ahead, confirms the bridge receipt exists in the working tree and HEAD, runs `npm run check`, and pushes without force. The pre push hook verifies again.

Push without force.

If rejected, fetch and reconcile. Never overwrite the other engine.
