# EXTERNAL OPERATOR ONBOARDING — bridge your Claude/Codex into RedLantern via Claudex

Version 1.0 · 2026-07-02 · RedLantern Studios standard.
Hand this to another operator's engines (e.g. Keymon's Claude Code + Codex) so they read the same
state, follow the same rules, and hand off work through Claudex without collision or re-explaining context.

Claudex is the shared brain. `OPS/BRIDGE.json` is the single shared state. This doc is the contract for joining it.

---

## WHO THIS IS FOR

Any operator (a human + their Claude/Codex) collaborating with RedLantern Studios. Example: **Keymon's engines bridging with Ro's.** Each operator keeps their own machine, their own product repos, and their own engines — but they share one state contract: Claudex.

---

## SETUP (once)

1. Get read/write access to `github.com/redlanternstudios/Claudex`.
2. Clone it next to your work: `git clone https://github.com/redlanternstudios/Claudex.git`
3. In each product repo you work on, add `.claudex.json`:
   ```json
   {
     "version": "1.0",
     "bridge_repo": "https://github.com/redlanternstudios/Claudex.git",
     "bridge_path": "../Claudex/OPS/BRIDGE.json",
     "product_key": "<product>"
   }
   ```
4. Point your Codex `~/.codex/config.toml` and your Claude at the Claudex clone. Both must read it on boot.

---

## BOOT RULE (every session, both engines)

1. `git pull` Claudex. Read `OPS/BRIDGE.json` + `OPS/BRIDGE_PROTOCOL.md`.
2. Read `AGENTS.md` (Codex) or `CLAUDE.md` / `.claude/CLAUDE.md` (Claude), then `memory/MEMORY.md`.
3. Compute effective sync color = **worse of** `global.sync_status` and your `product` color.
4. State reality in 5 lines. **If RED, stop** and surface the blocker.
5. Work only in your lane.

## LANE RULE (prevents two operators colliding)

- Each unit of work is a **lane** on a product (`bridge open <product> <lane> <engine> <next action>`).
- Before starting, check `products.<key>.lanes_open`. **Do not take a lane another operator's engine already owns.** Open your own.
- `engine` values: `codex`, `claude`, `human`, `automation`, `shared`.

## WRITE RULE (the golden rule)

- **Only the Claudex repo receives bridge-state writes and receipts.** Product repos never own bridge state.
- Use the bridge CLI, never hand-edit: `node scripts/bridge.mjs <status|open|warn|block|resolve|receipt|handoff|close|focus>`.
- Every meaningful change → a TruthCal receipt in `OPS/receipts/` (template: `OPS/TRUTHCAL_RECEIPT.md`). Point `latest_receipt` at the file, never inline its content.
- New receipt filenames must follow `OPS/NAMING_STANDARD.md`: `TC-YYYYMMDD-ENG-NN__product__topic_words.md`. The ID prevents collisions; the readable words tell Ro and Keymon what is inside.
- At session close: update your lane + color + next_action, write your receipt, commit, push.

## CONCURRENCY RULE (two operators pushing at once)

The bridge has a `revision` field and optimistic locking. When your push is rejected:
1. `git pull --rebase origin main`
2. Re-apply your bridge change via the CLI (it reads current state, bumps revision, writes atomically).
3. Push again.
**Never force-push.** Never discard the other operator's work. This is how two Claude/Codex pairs reconciled in practice, not just in theory.

## COLOR RULE

- **GREEN** keep moving · **YELLOW** usable, read the sync_note · **RED** stop, fix or explain the blocker.
- Never fake GREEN. Run `npm run bridge:doctor` before claiming green — it checks receipts, intent freshness, secret scan, and boot wiring.

## SECRET RULE (non-negotiable)

- No secrets, tokens, keys, `.env`, or personal contact info ever enter Claudex. Auth is referenced by location only (the gitignored vault).
- A staged secret is a protocol violation: remove it and rotate the key.

## FAILURE BEHAVIOR

- Missing bridge repo → `SYNC RED`. Invalid bridge JSON → `SYNC RED`. Unknown product key → `SYNC RED`. Stale bridge/intent → `SYNC YELLOW`.

---

## THE HANDOFF PROMISE

Once both operators follow this, the workflow becomes: "continue from the bridge." Keymon's Codex can pick up a lane Ro's Claude left, read the receipt, see the color, and move — no meeting, no re-explaining. The repo is the shared memory; the bridge is the shared state; this doc is the shared rulebook.
