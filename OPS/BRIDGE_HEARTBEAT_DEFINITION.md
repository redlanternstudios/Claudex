# Bridge Heartbeat Definition

Connected: 2026-07-07T09:49:05-0700
Owner: Ro
Prepared for: Keymon Penn
Source artifact: `/Users/kp/Library/Messages/Attachments/c8/08/69EEB950-FC39-41AD-8416-A5DE9AC94EF1/BRIDGE_HEARTBEAT_DEFINITION.pdf`

## Status

VERIFIED: The local PDF source was read by Codex on 2026-07-07. `pdfinfo` reported title `The Bridge Heartbeat`, producer `WeasyPrint 69.0`, 2 pages, unencrypted.

VERIFIED: The current executable heartbeat contract is `OPS/BRIDGE_SYNC_HEARTBEAT.md` v2.1. That file is newer than the PDF definition and remains the operating rule when the two differ.

VERIFIED: The bridge channel is file based, not live chat. The heartbeat writes bridge state. Engines read bridge state at boot.

## What the PDF Defines

The heartbeat is an hourly Claude run inside the RedLantern studio workspace. Its job is to keep `OPS/BRIDGE.json` truthful so Claude, Codex, and humans derive the same state without re explaining it in chat.

Every heartbeat reads five required inputs:

1. `OPS/BRIDGE.json`
2. `OPS/BRIDGE_PROTOCOL.md`
3. `OPS/TODAY.md`
4. The latest receipt
5. `OPS/receipts/INDEX.md`

It then validates the bridge, computes the effective sync color, reconciles drift, writes a receipt only for real shipped change, and commits or queues the result according to the current push transport.

## Integration Rule

`OPS/BRIDGE_HEARTBEAT_DEFINITION.md` is the human readable source definition for Keymon and Rory.

`OPS/BRIDGE_SYNC_HEARTBEAT.md` is the active operating contract for the scheduled heartbeat.

`OPS/BRIDGE_PROTOCOL.md` is the cross engine protocol that Codex and Claude must obey when reading or writing bridge state.

Do not copy bridge state into product repos. Product repos consume the bridge through `.claudex.json` and the consumer contract.

## Current Delta From the PDF

The PDF describes v1.0. The current local heartbeat file describes v2.1.

VERIFIED v2.1 deltas:

1. The heartbeat now ingests both sides through git fetch and reconcile.
2. Cross engine asks live in `shared.directives` instead of buried sync note prose.
3. Questions live in `OPS/questions/` under `OPS/QA_PROTOCOL.md`.
4. Receipt IDs use the engine tagged scheme from `OPS/BRIDGE_PROTOCOL.md`.
5. Push transport is documented in `OPS/PUSH_TRANSPORT.md` and no longer treated as a permanent blind spot when host side autopush is available.

## Hard Guarantees

The heartbeat must never fake GREEN, clear RED without evidence, invent proof, store secret values, force git, or claim a push that did not happen.

GREEN requires validator proof. YELLOW means usable with a named warning. RED stops continuation for that lane.

## KP And Rory Operating Meaning

Keymon and Rory should not need a chat relay to know the state. The source of truth is the file layer:

1. Heartbeat writes `OPS/BRIDGE.json`.
2. Codex and Claude read `OPS/BRIDGE.json` at boot.
3. Receipts prove real changes.
4. Directives and questions carry asks across engines.
5. Product repos point to Claudex; they do not own separate bridge brains.

## Verification Commands

Run these from the Claudex repo:

```bash
npm run bridge:status
npm run bridge:doctor
npm run check
```

