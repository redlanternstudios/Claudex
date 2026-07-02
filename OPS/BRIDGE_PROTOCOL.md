# BRIDGE PROTOCOL — RedLantern Studios cross-engine handoff
Version 1.1 · 2026-07-01 · Studio-wide (all products)

The bridge is how Codex and Claude Code hand off work without Ro re-explaining state.
One shared state file. One validator. No secrets. Both engines read the same truth and derive the same color.

---

## THE ONE FILE

`OPS/BRIDGE.json` is the single shared state contract.
- Machine readable. Both engines read it at session start, write it at session close.
- Studio-wide: a `global` block plus a per-product entry under `products`.
- Never holds secrets. Key sources are pointers only (`shared.provider_keys_source`).

If a rule here conflicts with `CLAUDE.md`, `CLAUDE.md` wins. Flag the conflict, do not silently pick.

---

## SYNC COLOR (the whole point)

Read `global.sync_status` for the studio, and the focus product's `sync_status` for the lane you are in.

- **GREEN** — keep moving. State fresh, no blockers, last receipt clean.
- **YELLOW** — usable, but read the `sync_note` before continuing. Explain the warning to Ro.
- **RED** — STOP continuation. Fix or explain the blocker before any build work.

Rule: the effective color for a task is the WORSE of `global.sync_status` and that product's `sync_status`.

Field rule:
- `warnings` may exist under GREEN or YELLOW. A warning does not stop continuation.
- `blockers` is reserved for RED conditions. If `blockers` contains an unresolved item, the corresponding sync status must be RED.

---

## SESSION START (both engines)

1. Read `OPS/BRIDGE.json`.
2. Read `OPS/TODAY.md` for current intent. If its date is not today, treat global as at most YELLOW and say so.
3. Identify your lane from `global.focus_product` + that product's `current_lane`.
4. State current reality in 5 lines: focus product, lane, color, latest receipt, next action.
5. If color is RED, stop and surface the blocker. Otherwise proceed.

## SESSION CLOSE (both engines)

1. Update the focus product's `current_lane`, `sync_status`, `sync_note`, `next_action`.
2. If a meaningful change shipped, write a receipt to `OPS/receipts/` using `OPS/TRUTHCAL_RECEIPT.md`, and set `latest_receipt` to that filename (pointer only, never content).
3. Update `global.next_action` and `updated_at` / `updated_by`.
4. Recompute `global.sync_status` from open blockers.
5. Commit and push (per the git rule — no confirmation needed).

---

## VALIDATOR (what keeps the bridge honest)

Before flipping any color to GREEN, confirm all of:
- `updated_at` is today.
- `OPS/TODAY.md` date is today.
- Focus product and global state have no unresolved entry in `blockers`.
- `latest_receipt` points to a real file in `OPS/receipts/` (or is honestly NONE).
- Truth source is not Notion unless Ro has explicitly reversed the deprecation.

Stale state, missing optional evidence, or unverified automation → YELLOW and record under `warnings`.
An unresolved blocker, invalid state, or unsafe continuation condition → RED and record under `blockers`.
Never place a warning under `blockers` while declaring YELLOW. Never fake GREEN.

---

## TRUTH SOURCE (locked)

`shared.truth_source.primary` = repo (`memory/MEMORY.md` + `OPS/TODAY.md`).
Notion is DEPRECATED per `memory/project_stack_architecture.md`. Do NOT point Truth Serum at Notion until Ro explicitly reverses that. Code truth comes live from Supabase MCP where configured, else a dated `db-schema.md`.

---

## SECRETS (hard rule)

The bridge names where keys live (`OPS/API_KEY_VAULT.md`, `OPS/ENV_VARS.md`). It never contains a value. A key value in `BRIDGE.json` is a protocol violation — remove it and rotate the key.

---

## PORTABILITY NOTE

The bridge only reaches repos inside this workspace. TradeSwarm lives outside it (`~/Desktop/TradeSwarm-repo/`) and is marked RED until a host-side `/repo-ingest`. Any repo outside this tree needs its own copy of `OPS/BRIDGE.json` + this protocol, or a symlink, to participate.
