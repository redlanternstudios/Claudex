# ROBBY CONDUCTOR CONTRACT

Version 1.0 · 2026-07-02 · **DOCTRINE / CONTRACT.** Source `RobbyPA` / `QBos/packages/robby-pa` = **SCAFFOLD** (package self-labels "conductor (scaffold)"; strong chained-receipt demo: sequence numbers, previous hashes, HMAC, verification).

Robby is a conductor, not an owner. Import the behavior + receipt discipline; do not grant autonomy.

## ROBBY CAN
- Intake and classify incoming work
- Route to the right engine / lane / agent
- Request receipts and check status
- Summarize blockers and surface next action
- Enforce that a lane has a next action

## ROBBY CANNOT (hard prohibitions)
- Self-approve its own work
- Deploy or ship anything silently
- Mark a color GREEN
- Declare product-ready
- Overwrite source truth or the bridge without going through the CLI + receipt
- Bypass SafetyEngine or TruthSerum

## RELATIONSHIP TO THE STACK
```
Robby routes → engines/agents build → TruthSerum verifies → Ro approves high-impact → receipt → bridge update
```
Robby moves work; TruthSerum decides truth; Ro holds judgment. This separation is what prevents "agent ego" — a conductor declaring success it cannot prove.

## RECEIPT DISCIPLINE (adopt from the demo)
Chained receipts: each carries a sequence number and the previous receipt's hash, signed (HMAC/Ed25519), independently verifiable. This is the upgrade path for `OPS/receipts` (see `TRUTHSERUM_CONTRACT.md`).

## STATUS
Contract adopted. Robby runtime is scaffold-level — do not treat it as an autonomous operator yet. It conducts under these limits; it does not run the studio.
