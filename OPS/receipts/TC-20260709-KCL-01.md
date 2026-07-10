# TC-20260709-KCL-01

Date: 2026-07-09T23:30:00-0700
Product: claudex
Lane: claudex/rlsdox-heartbeat-digest
Author: keymon-claude (Cowork session, KP directing)
Status: COMPLETE

## Intent

Route KP's heartbeat digest through /rlsdox per KP's CTP: render the daily Claudex heartbeat as a RedLantern standard branded PDF, mirror to the Obsidian vault, and update the Cowork scheduled task to keep doing it daily.

## Evidence

- `OPS/status/CLAUDEX_HEARTBEAT_DIGEST_2026-07-09.html` and `.pdf` rendered through `.claude/brand/RLS_DOCUMENT_TEMPLATE.html` with brand tokens and real logo (WeasyPrint).
- Mirrored to vault: `Claudex/Heartbeats/CLAUDEX_HEARTBEAT_DIGEST_2026-07-09.pdf`.
- Cowork scheduled task `claudex-heartbeat-rorywords` prompt updated: hourly RoryWords feed entry stays markdown; once per day (first run after 06:00) it re-renders the branded digest PDF via /rlsdox and mirrors it to the vault.
- Cowork-side `rlsdox` skill packaged for one-click install so every future RedLantern doc request in Cowork routes through the standard.

## Result

COMPLETE: heartbeat digest ships in RLS standard format; /rlsdox is the routing rule in Cowork as well as Claude Code and Codex.
