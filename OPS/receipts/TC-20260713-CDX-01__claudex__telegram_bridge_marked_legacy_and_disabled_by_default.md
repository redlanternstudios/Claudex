# TruthCal Receipt TC-20260713-CDX-01

Date: 2026-07-13
Product: claudex
Lane: claudex/telegram-bridge-control
Author: codex
Intent: Mark the Telegram bridge legacy and remove it from the routine completion path
Result: COMPLETE

## Truth

VERIFIED: `memory/business_state.md` now marks the Telegram bridge as legacy and disabled by default.
VERIFIED: `memory/MEMORY.md`, `memory/agent_prompts/robby_v4_20260612.md`, and `OPS/BOOT_PACK.md` no longer describe Telegram as the normal completion surface.
VERIFIED: `swarmclaw/RL_ORG_CHART_LIVE.json` no longer lists `send_telegram_report` as an allowed action.

## Evidence

- Updated the live bridge memory and prompt references.
- Removed Telegram from the maintenance action allowlist.
- Logged the decision in `OPS/DECISION_LOG.md`.

## Next action

Keep Telegram disabled unless Ro explicitly re enables it, and use the approved human surface for any future completion routing.
