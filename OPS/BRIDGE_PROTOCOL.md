# BRIDGE PROTOCOL — RedLantern Studios cross-engine handoff
Version 2.0 · 2026-07-02 · Studio-wide (all products)

The bridge is how Codex and Claude Code hand off work without Ro re-explaining state.
One shared state file. One validator. No secrets. Both engines read the same truth and derive the same color.

---

## THE ONE FILE

`OPS/BRIDGE.json` is the single shared state contract.
- Machine readable. Both engines read it at session start, write it at session close.
- Studio-wide: a `global` block plus a per-product entry under `products`.
- Never holds secrets. Key sources are pointers only (`shared.provider_keys_source`).

If a rule here conflicts with `CLAUDE.md`, `CLAUDE.md` wins. Flag the conflict, do not silently pick.

All state mutations use `node scripts/bridge.mjs`. Direct manual editing is reserved for recovery and must still pass `npm run check`.

Every write uses:

1. Exclusive local write lock.
2. Revision comparison against the current file.
3. Semantic validation.
4. Local ignored backup of the prior state.
5. Atomic replacement.

A stale writer is rejected. The engine must reread and reconcile.

If a process terminates while holding `OPS/BRIDGE.lock`, verify no bridge writer is running, inspect the lock metadata, remove the stale lock, run `npm run bridge:doctor`, and write a recovery receipt.

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

1. Run `npm run bridge:status`.
2. Read `OPS/BRIDGE.json`.
3. Read `OPS/TODAY.md` for current intent. If its date is not today, treat global as at most YELLOW and say so.
4. Identify your lane from `global.focus_product` + that product's `current_lane`.
5. State current reality in 5 lines: focus product, lane, color, latest receipt, next action.
6. If color is RED, stop and surface the blocker. Otherwise proceed.

## SESSION CLOSE (both engines)

1. Use the command layer to update lane and conditions.
2. Write a receipt with `bridge receipt` or the receipt template.
3. Use `bridge handoff` when ownership changes.
4. Use `bridge close` when a lane completes.
5. Run `npm run check`.
6. Commit and push.

## COMMAND CONTRACT

```bash
npm run bridge:status
npm run bridge:doctor
npm run bridge -- focus amina
npm run bridge -- open amina amina/engagement-loop codex "Verify core loop"
npm run bridge -- warn amina "Live schema is not verified"
npm run bridge -- block amina "Unsafe migration state"
npm run bridge -- resolve amina "Live schema is not verified"
npm run bridge -- receipt amina "Verified core loop"
npm run bridge -- handoff amina claude "Review evidence" OPS/receipts/TC-YYYYMMDD-NNN.md
npm run bridge -- close amina amina/engagement-loop OPS/receipts/TC-YYYYMMDD-NNN.md
```

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
