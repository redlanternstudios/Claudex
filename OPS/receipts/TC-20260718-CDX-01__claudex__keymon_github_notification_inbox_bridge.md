# Keymon GitHub notification inbox bridge

Date: 2026-07-18
Engine: codex
Status: PARTIAL

## What changed

- Added `.github/workflows/keymon-ping.yml`.
- The workflow creates or comments on a dedicated Keymon inbox issue.
- The message can include a GitHub mention for notification delivery.
- The workflow reads Keymon's GitHub login from `OPS/ENGINE_REGISTRY.json` and falls back safely if needed.
- Added `OPS/NOTIFICATION_BRIDGE.md` so the path is visible to future runs.

## What this enables

- A chat driven ping can be turned into a repo backed notification.
- GitHub notifications become the practical push layer available from Claudex.

## What is still unknown

- Whether Keymon wants this inbox to be the primary alert channel.
- Whether his personal GitHub notification settings will surface it as a phone push.
- Whether a true iMessage path will also be wired on his Mac later.

## Verification

- Workflow file written.
- No live Action run has been performed yet.
- No push receipt from Keymon has been observed yet.
