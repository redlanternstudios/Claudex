# Backlog Heartbeat

Version 1.0
Status ACTIVE
Owner RedLantern Studios

## Objective

Maintain one studio execution backlog and publish separate KP and Rory Top 5 lanes on every Claudex heartbeat. Rank completed value, release progress, revenue, risk reduction, and downstream unblocking above task volume.

## Authority boundary

`OPS/BRIDGE.json` remains the studio state authority.

`OPS/BACKLOG.json` is the execution priority authority.

`scripts/heartbeat.mjs` reads both. It does not copy bridge state into a second system.

## Classification gate

Classify every task before scoring:

| State | Meaning |
| --- | --- |
| SIGNAL | Owned, executable work tied to an active objective |
| CLARIFY | Potentially valuable work missing an owner, outcome, next action, done proof, or trustworthy estimate |
| BLOCKED | Valuable work that cannot move until a named dependency is resolved |
| PARKED | Legitimate later work with no current objective or time trigger |
| NOISE | Duplicate, cancelled, unsupported, or outcome free motion |
| DONE | Completion is backed by acceptance evidence |

Only SIGNAL can enter an owner Top 5.

## Score

Use 1 through 5 scales for impact, effort, urgency, leverage, and downstream unblocking. Use 0 through 1 for evidence confidence.

```text
value = 0.40 impact + 0.20 urgency + 0.20 leverage + 0.20 unblock
effort factor = 1.00, 0.90, 0.75, 0.60, 0.45 for effort 1 through 5
confidence factor = 0.70 + 0.30 evidence confidence
priority = 20 x value x effort factor x confidence factor
```

Manual priority is allowed only with a reason and expiry condition. It cannot bypass classification or evidence rules.

## Ownership

Use `KP` and `Rory` as canonical owners.

Joint work must contain distinct `owner_actions.KP` and `owner_actions.Rory` contracts. Each action gets its own next action and definition of done. Unsplit joint work becomes CLARIFY and cannot rank.

## Dynamic behavior

Recalculate when any objective, deadline, blocker, owner, status, effort, score input, evidence confidence, or completion proof changes.

The prior heartbeat is used only for movement. A prior parent task ID reconciles to its owner child after a joint task is split.

Source freshness and task freshness are visible. Staleness does not erase a task, but it prevents silent claims that the backlog is current.

## Heartbeat output

Every run includes:

1. Bridge sync color and receipt.
2. Backlog status and active objectives.
3. KP Top 5.
4. Rory Top 5.
5. Rank movement since the prior heartbeat.
6. Blocked and clarification decisions.
7. Parked and noise counts.
8. One concrete next action.

If fewer than five qualified tasks exist, report OPEN CAPACITY. Never fill a lane with noise.

## Commands

```bash
npm run backlog:status
npm run backlog:validate
npm run heartbeat
npm run check
```

## Acceptance criteria

1. No blocked, parked, noise, done, or clarification task appears in either Top 5.
2. Each ranked task has one owner, one next action, and one definition of done.
3. No owner lane contains more than five tasks.
4. Joint work cannot rank until owner actions are split.
5. Highest impact and lowest effort work rises without displacing release or security critical work with trivial quick wins.
6. The existing bridge sync color remains visible and unchanged by backlog scoring.
7. Tests prove classification, ranking, movement, owner splitting, and capacity behavior.

## Definition of done

The system is complete when the backlog validates, the heartbeat renders both owner lanes, the full Claudex check passes, the bridge points to this contract, a receipt records the change, and the commit exists on GitHub.
