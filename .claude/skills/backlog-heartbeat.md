# Backlog heartbeat

Status ACTIVE

## Trigger

Run when KP or Rory asks to create, clean, prioritize, triage, or refresh a backlog, asks what either owner should do next, asks to separate signal from noise, or asks for the KP and Rory Top 5 heartbeat.

## Contract

Read `OPS/BACKLOG_HEARTBEAT.md`, `OPS/BACKLOG.json`, `OPS/BRIDGE.json`, and `OPS/TODAY.md`.

Use `npm run backlog:status` for deterministic classification and ranking.

## Rules

1. Preserve the master backlog. Park or reclassify tasks. Do not silently delete them.
2. Use KP and Rory as the owner lanes.
3. Split joint work into distinct owner actions before ranking.
4. Do not rank blocked work unless the task itself is an executable unblock action owned by the person.
5. Do not call work done without acceptance evidence.
6. Report OPEN CAPACITY when fewer than five qualified tasks exist.
7. Update the backlog and heartbeat contract only when the source evidence supports the change.

## Required output

Backlog status, active objectives, KP Top 5, Rory Top 5, movement, blocked or clarification decisions, parked or noise summary, and the single next action.
