# CLAUDEX — BRIEFING FOR SWARMCLAW AGENTS
Version 1.0 · 2026-07-03 · Read at session start alongside MODEL_ROUTING_POLICY.md

---

## WHAT CLAUDEX IS

Claudex is the shared coordination brain for RedLantern Studios. It is how Claude, Codex, Keymon, and SwarmClaw hand off work across every product without Ro re-explaining state.

It is NOT a person and NOT an agent. It is a shared truth layer. Repo: github.com/redlanternstudios/Claudex.

The live state is one file: `OPS/BRIDGE.json`. Everything else is a view of it.

---

## HOW SWARMCLAW ACCESSES IT

SwarmClaw reads the RedLantern Studios workspace through the Filesystem MCP (server id 99bd0d9e). Through that mount you can read:

- `OPS/BRIDGE.json` — the single shared state contract (focus product, per product lane, sync color, latest receipt, next action). Read this first.
- `OPS/BRIDGE_PROTOCOL.md` — the rules for reading and writing the bridge.
- `OPS/TODAY.md` — current intent for the day.
- `OPS/receipts/` — TruthCal receipts (proof of what actually happened).

Do NOT expect a local `Claudex/` directory. That path in `.claudex.json` is a known drift and currently resolves to nothing. Use the workspace mount above as the source of truth until Ro repairs the pointer.

No secrets live in the bridge. Key sources are pointers only. Never write secrets into it.

---

## SWARMCLAW'S ROLE RELATIVE TO CLAUDEX

1. Read before acting. At session start, read `OPS/BRIDGE.json` and honor the sync color.
   - GREEN: proceed.
   - YELLOW: read the sync_note first, then proceed with the warning stated.
   - RED: STOP. Do not start build work until the blocker is fixed or explained.
   - Effective color = the WORSE of `global.sync_status` and the focus product's `sync_status`.

2. Stay subordinate to upstream truth. The bridge and the latest receipt win over any agent's own assumption. If your output disagrees with the bridge, flag it, do not silently override.

3. Do not duplicate canonical truth. Reference the bridge and workspace docs. Do not create competing state files.

4. Write receipts for meaningful state changes. Any real external or stateful action produces a TruthCal receipt (pointer only, no secrets) under `OPS/receipts/`, and the bridge `latest_receipt` is updated.

5. Product lock discipline. Work only on the product named in your dispatch. If a task drifts to another product, stop and flag.

6. For the byredlanternos memory loop and build flow, read `swarmclaw/SWARMCLAW_DISPATCH_BYRED_OS_v1.md` after `OPS/BRIDGE.json` and before any build work.

---

## CURRENT KNOWN DRIFT (do not treat as broken, treat as caution)

- Local `Claudex/` dir does not resolve; `.claudex.json` pointers are UNVERIFIED. Use the workspace mount.
- `OPS/TODAY.md` may be stale. If its date is not today, treat global as at most YELLOW and say so.
- Global sync is held at YELLOW until Ro pushes from host and refreshes TODAY.md.

---

## ONE LINE

Claudex = the shared brain. `OPS/BRIDGE.json` = the live truth. Read it first, obey the color, never fake a receipt.
