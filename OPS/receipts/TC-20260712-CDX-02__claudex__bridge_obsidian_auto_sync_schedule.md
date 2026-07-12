# TruthCal Receipt TC-20260712-CDX-02

Date: 2026-07-12
Product: claudex
Lane: claudex/keymon-codex-cost-setup
Author: codex
Intent: Install and document automatic bridge, heartbeat, and Obsidian mirror sync
Result: COMPLETE

## Truth

VERIFIED: `com.redlantern.claudex.watch`, `com.redlantern.claudex.heartbeat`, and `com.redlantern.claudex.obsidian` are loaded as LaunchAgents and set to run on a five minute interval.
VERIFIED: `npm run bridge:obsidian` refreshed the vault mirror at `_CLAUDEX LIVE.md`.
VERIFIED: `OPS/ALIGNMENT_POLICY.md`, `docs/OBSIDIAN_VAULT.md`, `package.json`, and `scripts/install-obsidian-scheduler.mjs` now document and support the automatic sync path.
VERIFIED: `bridge:install` now bootouts then bootstraps cleanly after the installer fix.

## Evidence

- Added `scripts/install-obsidian-scheduler.mjs`.
- Added `obsidian:install` and `bridge:install` package scripts.
- Updated `docs/OBSIDIAN_VAULT.md` and `OPS/ALIGNMENT_POLICY.md`.
- Installed the heartbeat and Obsidian launch agents.
- Reloaded the bridge launch agent after fixing the installer.
- Refreshed the Obsidian mirror note.

## Next action

Leave the scheduled bridge, heartbeat, and Obsidian mirror services running so the repo and vault stay in sync automatically.
