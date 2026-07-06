# BRIDGE SYNC HEARTBEAT — Claude ↔ Codex cross engine sync
Version 1.0 · Owner: Ro · Cadence: hourly · Authority: full close out with guardrails

The heartbeat is the recurring job that keeps `OPS/BRIDGE.json` fresh so Codex reads accurate
state at its next session start. It does not create a live chat with Codex. The channel is the
file. The heartbeat writes, Codex reads on boot. Async handoff only. Do not claim otherwise.

---

## PROMPT CONTRACT
- GOAL: keep the shared bridge truthful every hour so both engines derive the same state.
- CONSTRAINTS: never fake GREEN. Never auto resolve a RED blocker. Never write a secret value.
  Only write a receipt when a real change occurred. Repo is the single truth source, not Notion.
- FORMAT: bridge write + optional receipt + short push summary to Ro.
- FAILURE: fails if it flips a color without passing the validator, invents a change to justify a
  receipt, edits `blockers` to make YELLOW look GREEN, or reports a Codex message it cannot verify.

---

## INPUTS (read first, every run)
1. `OPS/BRIDGE.json` — current shared state.
2. `OPS/BRIDGE_PROTOCOL.md` — the rules and the validator.
3. `OPS/TODAY.md` — current intent and its date.
4. Latest receipt named in `shared.latest_receipt`.
5. `OPS/receipts/INDEX.md` — receipt ledger.

## THE LOOP (ordered)
1. Load all five inputs. If `BRIDGE.json` cannot be read, report SYNC RED and stop.
2. Run the validator from `BRIDGE_PROTOCOL.md` for global and for `global.focus_product`:
   - Is `updated_at` today?
   - Is `OPS/TODAY.md` date today?
   - Does the focus product have unresolved `blockers`?
   - Does `latest_receipt` point to a real file in `OPS/receipts/` or honestly say NONE?
   - Is the truth source NOT Notion?
3. Recompute each `sync_status`. Effective color for any lane is the worse of `global.sync_status`
   and that product's `sync_status`. Any validator failure holds the color at YELLOW or RED.
4. Detect drift since last run: stale TODAY, missing receipt, a blocker that appeared or cleared,
   a `.claudex.json` pointer that resolves to a missing path, a lane whose engine is `codex`.
5. Write to `BRIDGE.json`:
   - Update `sync_status` and `sync_note` per the recompute (guardrails below).
   - Append a dated line to the focus product `sync_note` addressed to Codex, naming the single
     next action Codex should take on its next boot. Keep it to one sentence.
   - Set `updated_at` to today and `updated_by` to `claude-heartbeat`.
6. If a real change shipped since the last receipt, write a new receipt using
   `OPS/TRUTHCAL_RECEIPT.md`, add it to `OPS/receipts/INDEX.md`, and set `shared.latest_receipt`.
   If nothing meaningful changed, write NO receipt. An empty hour is a valid outcome.
7. Commit locally. Attempt push. If push fails for missing credentials, say so plainly and leave
   the commit staged for Ro to push from the host Mac. Do not claim a push that did not happen.
8. Push a summary to Ro: focus product, effective color, what changed, any RED blocker, and the
   one next action. If everything is fresh and GREEN, say so in one line. No filler.

## GUARDRAILS (hard)
- GREEN requires ALL validator checks to pass. If any fail, the color is YELLOW at best.
- A RED blocker is never cleared by the heartbeat. It is surfaced to Ro, verbatim, and left RED.
- Receipts are written only for real change. No change means no receipt and no fabricated proof.
- `blockers` arrays are never edited to manufacture a better color.
- No secret value is ever written to the bridge or any committed file. Pointers only.
- If TODAY.md is stale, global is capped at YELLOW and the summary tells Ro to refresh it.

## KNOWN OPEN DRIFT (reconcile, do not paper over)
- `.claudex.json` in each product points to `Claudex/OPS/BRIDGE.json`, a path that does not resolve
  inside this workspace. Until a `Claudex/` repo or symlink exists here, report this as MISSING.
- The Codex "bridge monitor" task reads `.claudex/alignment.json` and runs `npm run bridge:watch`.
  Neither file nor script is present in this workspace. Treat Codex side status as UNVERIFIED.

---
*Written by the RedLantern OS. The heartbeat serves the bridge. The bridge serves the truth.*
