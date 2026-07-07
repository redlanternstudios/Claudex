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

---

## SESSION START (both engines)

1. Run `npm run bridge:sync`.
2. If local is clean and behind, run `npm run bridge:sync -- --apply`; this refuses to import remote state when the remote bridge references a missing receipt.
3. Run `npm run bridge:status`.
4. Read `OPS/BRIDGE.json`.
5. Read `OPS/TODAY.md` for current intent. If its date is not today, treat global as at most YELLOW and say so.
6. Identify your lane from `global.focus_product` + that product's `current_lane`.
7. State current reality in 5 lines: focus product, lane, color, latest receipt, next action.
8. If color is RED, stop and surface the blocker. Otherwise proceed.

## SESSION CLOSE (both engines)

1. Use the command layer to update lane and conditions.
2. Write a receipt with `bridge receipt` or the receipt template.
3. Use `bridge handoff` when ownership changes.
4. Use `bridge close` when a lane completes.
5. Run `npm run check`.
6. Commit.
7. Run `npm run bridge:publish` so local receipt-backed bridge state is pushed only after the receipt exists in the committed history.

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

## QUESTION EXCHANGE

Use `OPS/questions/` when Rory's system needs to ask KP/Codex a project question through GitHub, or when KP/Codex needs to answer back through GitHub.

```bash
Read OPS/QA_PROTOCOL.md
Add one file at OPS/questions/Q-YYYYMMDD-NN.md
Update OPS/questions/INDEX.md
```

Rules:

- Questions live in Claudex, not in product repos.
- Product repos point to the exchange through `.claudex.json`.
- Answers require Truth labels and must follow `OPS/QA_PROTOCOL.md`.
- Never store secrets, auth codes, private tokens, or raw env values.

---

## RECEIPT ID SCHEME (engine tagged — MANDATORY from 2026-07-07)

Receipt IDs collided three times on 2026-07-06 because every engine picked "next number" off
whatever base it could see. New scheme makes collisions impossible:

`TC-YYYYMMDD-<ENG>-NN`  where `<ENG>` is:
- `CLA` — Claude interactive session (Cowork / Claude Code)
- `HB`  — Claude heartbeat (scheduled)
- `CDX` — Codex
- `HUM` — Keymon or any human writing a receipt by hand

Rules:
1. Sequence NN is per engine per day. Check `OPS/receipts/` for your own tag's highest number
   that day — never another engine's.
2. Legacy untagged IDs (`TC-YYYYMMDD-NNN`) remain valid history. Never renumber committed receipts.
3. If a remote receipt still arrives with an untagged ID that collides locally, the reconciler
   renumbers the REMOTE copy to the next free ID with a dated note and leaves local history alone.
4. Directive IDs use the same tag: `DIR-YYYYMMDD-<ENG>-NN`.

## RECEIPT FILE NAMING (human readable — MANDATORY from 2026-07-07)

Receipt IDs stay compact. Receipt filenames must explain the work.

New receipt files use:

`TC-YYYYMMDD-<ENG>-NN__product__topic_words.md`

Example:

`TC-20260707-CDX-08__hirewire__auth_email_recovery.md`

Rules:
1. Keep the exact receipt ID first so tooling and sort order still work.
2. Add product and topic after two underscores.
3. Use lowercase words joined with underscores after the ID.
4. Legacy receipt names stay valid. Do not mass rename committed history.
5. Full standard: `OPS/NAMING_STANDARD.md`.

---

## VALIDATOR (what keeps the bridge honest)

Before flipping any color to GREEN, confirm all of:
- `updated_at` is today.
- `OPS/TODAY.md` date is today.
- Focus product has no unresolved entry in its `blockers` (or `global.blockers`).
- `latest_receipt` points to a real file in `OPS/receipts/` (or is honestly NONE).
- Truth source is not Notion unless Ro has explicitly reversed the deprecation.

Any failure → color stays YELLOW or RED. Never fake GREEN.

---

## TRUTH SOURCE (locked)

`shared.truth_source.primary` = repo (`memory/MEMORY.md` + `OPS/TODAY.md`).
Notion is DEPRECATED per `memory/project_stack_architecture.md`. Do NOT point Truth Serum at Notion until Ro explicitly reverses that. Code truth comes live from Supabase MCP where configured, else a dated `db-schema.md`.

---

## SECRETS (hard rule)

The bridge names where credentials live (`OPS/PROVIDER_LOCATIONS.md`, `OPS/ENV_NAME_REGISTRY.md`). It never contains a value. A credential value in `BRIDGE.json` is a protocol violation — remove it and rotate it.

---

## PORTABILITY NOTE

The bridge only reaches repos inside this workspace. TradeSwarm lives outside it (`~/Desktop/TradeSwarm-repo/`) and is marked RED until a host-side `/repo-ingest`. Any repo outside this tree needs its own copy of `OPS/BRIDGE.json` + this protocol, or a symlink, to participate.
