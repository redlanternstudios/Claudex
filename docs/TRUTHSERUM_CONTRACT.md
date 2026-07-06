# TRUTHSERUM CONTRACT — verification doctrine

Version 1.0 · 2026-07-02 · **DOCTRINE (adopted by Claudex).** Source engine `QBos/packages/truthserum` = REAL code, **0 tests** (UNVERIFIED). Claudex adopts the rules now; it does not treat the QBos implementation as production.

The soul of Claudex. This is what separates RedLantern from "AI making stuff up."

## STATES
- **Verified** — all required proofs exist as receipts.
- **Unknown** — required proof missing. This is the default. Never silently upgraded.
- **Blocked** — a gate failed (safety, review, missing sign-off).

**Core rule: never upgrade Unknown → Verified without receipts.** Generation does not create truth.

## THE CHAIN (every meaningful claim)
```
claim → required evidence → receipt(s) → confidence → risk → verdict (Verified/Unknown/Blocked)
```
A claim with no matching receipt is Unknown, full stop.

## FORBIDDEN CLAIM WORDS (sanitized unless a matching receipt exists)
`deployed`, `live`, `submitted`, `shipped`, `ready`, `working`, `completed`, `connected`, `passing`, `production-ready`.
If used without proof, downgrade the statement to Unknown and name the missing receipt. This is exactly the guard the QBos ReleaseEngine violated (it emitted "submitted" with mocked IDs).

## RECEIPT REQUIREMENTS
- One receipt per meaningful change (`OPS/TRUTHCAL_RECEIPT.md` template).
- Receipts are append-only, reconstructable, and carry: what/who/assumed/verified/how-to-check.
- Upgrade path: adopt ReceiptWriter model (SHA-256 hash, nonce, Ed25519 signature, Supabase persistence) so receipts are tamper-evident. Currently `OPS/receipts` is plain markdown — that's the honest current state.

## GATE BEHAVIOR
TruthSerum is the last gate before a color goes GREEN or a claim ships. `npm run bridge:doctor` already enforces a subset (receipt exists, intent fresh, secret scan). Full TruthSerum verdicts are doctrine until the engine is tested.

## HONEST NOTE
The verification engine itself is untested. Making it "the soul" means its first real test should be verifying a live case (the Amina loop). Do not enshrine it as production truth before that.
