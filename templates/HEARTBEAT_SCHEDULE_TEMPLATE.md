# Claudex Heartbeat Schedule Template

Use this when adding a scheduled heartbeat for a Claudex consumer or a new engine lane.

## Source Pattern

VERIFIED sources:

- `OPS/BRIDGE_SYNC_HEARTBEAT.md` defines the active heartbeat contract: hourly, two-way, receipt-gated, never force.
- `OPS/HEARTBEAT_RORYWORDS.md` defines the digest shape sent to Ro.
- `scripts/install-scheduler.mjs` installs the local macOS watcher every 5 minutes.
- `.github/workflows/bridge-alignment.yml` runs GitHub alignment every 15 minutes.
- `OPS/QA_PROTOCOL.md` defines the hourly answer-desk setup for Keymon's Claude.

## Schedule Stack

| Layer | Cadence | Owner | Purpose | Proof |
| --- | --- | --- | --- | --- |
| Heartbeat digest | hourly | `<owner-engine>` | Recompute bridge color, reconcile state, sweep directives/questions, send compact digest. | Receipt only when real state changed; otherwise digest says no change. |
| Local watcher | every 5 minutes | local machine | Fetch remote bridge state and apply only when clean and receipt-backed. | `.claudex/alignment.json` plus watcher log. |
| GitHub alignment signal | every 15 minutes | GitHub Actions | Run integrity checks and publish durable alignment signal. | GitHub workflow run and alignment issue/comment. |
| Answer desk | hourly or next boot | target engine | Answer open `OPS/questions/` items addressed to that engine. | Question file set to `ANSWERED` with truth label and commit. |

## Heartbeat Prompt

```text
You are the Claudex heartbeat for <owner-engine>.

Every run:
1. Pull or fetch first.
2. Read OPS/BRIDGE.json, OPS/BRIDGE_PROTOCOL.md, OPS/TODAY.md, OPS/receipts/INDEX.md, OPS/questions/INDEX.md, and OPS/HEARTBEAT_RORYWORDS.md.
3. Recompute sync color from evidence. Never fake GREEN. Never clear RED without proof.
4. Reconcile remote and local bridge state without force push or force merge.
5. Sweep shared.directives. Mark done only with evidence.
6. Sweep OPS/questions/. Answer only questions addressed to this engine and only from verifiable context.
7. Write a receipt only when real state changed.
8. Commit and push only after checks pass. Never write secrets.
9. Send the digest in the RoryWords format:
   - Heartbeat
   - What changed
   - Needs Ro
   - Next

Quiet hour rule: if nothing changed, nothing is needed, and nothing broke, send one compact GREEN digest and do not create a receipt.
```

## macOS Watcher Template

Use a LaunchAgent with:

- `StartInterval`: `300`
- command: `node scripts/alignment.mjs sync --apply`
- working directory: Claudex repo root
- log path: `~/Library/Logs/<lane>-claudex-watch.log`

Install pattern:

```bash
node scripts/install-scheduler.mjs
```

Heartbeat install pattern:

```bash
npm run heartbeat:install
```

## GitHub Schedule Template

```yaml
on:
  push:
    branches:
      - main
    paths:
      - OPS/BRIDGE.json
      - OPS/TODAY.md
      - OPS/receipts/**
      - scripts/**
      - schemas/**
  schedule:
    - cron: "*/15 * * * *"
  workflow_dispatch:
```

## Digest Template

```md
## Heartbeat

* Status: VERIFIED SYNC <GREEN|YELLOW|RED>.
* Focus: <product>, <lane>.
* Receipt: <receipt id or NONE>.

## What changed

* VERIFIED <one sentence>.

## Needs Ro

* VERIFIED nothing needs you right now.

## Next

* <one concrete next action>.
```

## Guardrails

- GREEN requires validator proof.
- YELLOW is usable only with the warning named.
- RED stops continuation for that lane.
- No secrets, raw env values, tokens, cookies, passwords, or private keys.
- No force push.
- No receipt for quiet hours.
- No directive or question closed without evidence.
- The bridge is the channel. Do not claim live chat between engines.
