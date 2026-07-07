# TRUTHCAL_RECEIPT.md — TruthCal Build Receipt Template
> Module 8 of the RedLantern Guardrail Stack v2.1.
> Every meaningful change that ships produces a receipt.
> A change without a receipt is a change that cannot be audited, rolled back, or learned from.

---

## WHAT IS A TRUTHCAL RECEIPT

A TruthCal receipt is an engineering memory artifact.
It records WHAT was built, WHO built it (which agent), WHAT it assumed, and HOW to verify it.

Receipts are not summaries. They are reconstructable records.
You must be able to hand a receipt to a new engineer and have them fully understand what happened.

---

## RECEIPT FORMAT

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TRUTHCAL RECEIPT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Receipt ID:         TC-[YYYYMMDD]-[ENG]-[NN]   (ENG: CLA=Claude session, HB=heartbeat, CDX=Codex, HUM=human)
Product:            [product name]
Sprint / milestone: [sprint label or milestone]
Date:               [ISO date]
Author agent:       [which SwarmClaw agent built this]
Reviewer agent:     [REVIEW / TRUTH / QA]
Human accepted by:  [Ro / other]
CHANGE RECORD:      [CR-ID from DECISION_LOG.md or NONE]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

WHAT WAS BUILT
Intent:             [one sentence — the goal of this change]
Feature area:       [auth / data layer / UI / integration / etc.]
User-visible:       [YES — describe / NO]

FILES CHANGED
  [file path] — [brief description of change]
  [file path] — [brief description of change]

DATABASE CHANGES
  Tables added:     [list or NONE]
  Tables modified:  [list or NONE]
  Tables removed:   [list or NONE]
  Migration file:   [filename or NONE]
  RLS updated:      [YES — describe / NO]
  Rollback SQL:     [inline or reference to file]

AUTH CHANGES
  Auth flow affected:  [YES — describe / NO]
  New policies:        [list or NONE]
  Service role usage:  [YES — justify / NO]

EXTERNAL INTEGRATIONS
  Third-party APIs called:  [list with method or NONE]
  n8n flows involved:       [flow name and ID or NONE]
  Webhooks added:           [YES — describe / NO]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TRUTH LABEL BLOCK
VERIFIED:           [what the agent confirmed from the actual repo]
ASSUMED:            [what the agent assumed without explicit confirmation]
NEEDS CONFIRMATION: [what Ro or REVIEW must verify]
CANNOT VERIFY:      [what cannot be confirmed without running the code]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TEST RECORD
Test command:       [exact terminal command]
Test output:        [copy of output or "NOT RUN — reason"]
Manual QA:
  Step 1: [action]
  Step 2: [action]
  Expected result: [what should happen]
  Actual result:   [what happened or "NOT VERIFIED"]

Edge cases considered:
  - [edge case 1]
  - [edge case 2]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ROLLBACK PLAN
Method:             [git revert / migration rollback / feature flag / etc.]
Steps:
  1. [step]
  2. [step]
Rollback owner:     [who executes]
Estimated time:     [X minutes]
Last known good:    [commit hash]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

GOVERNANCE SIGN-OFFS
TRUTH:       [PASS / BLOCK / NOT REQUIRED — reason]
SECURITY:    [PASS / BLOCK / NOT REQUIRED — reason]
CHANGE:      [PASS / BLOCK / NOT REQUIRED — reason]
COMPLIANCE:  [PASS / BLOCK / NOT REQUIRED — reason]
ROBBY:       [APPROVED / PENDING / NOT REQUIRED]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FINAL STATUS:  [COMPLETE / PARTIAL / FAILED / ROLLED BACK]
Notes:         [anything the next agent or engineer needs to know]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## RECEIPT RULES

1. **One receipt per meaningful change.** A meaningful change = any change that touches production-path code, schema, auth, or external APIs.
2. **Receipts are append-only.** Never delete. If a change is rolled back, add a ROLLED_BACK receipt linking to the original.
3. **A partial receipt is still a receipt.** If NOT VERIFIED is in the test record, say so — do not fabricate output.
4. **Receipt ID format:** TC-[YYYYMMDD]-[ENG]-[NN] — engine tagged, incrementing per engine per day (see BRIDGE_PROTOCOL.md Receipt ID Scheme). Legacy untagged IDs stay valid; never renumber committed receipts.
5. **Receipt file format:** `TC-[YYYYMMDD]-[ENG]-[NN]__product__topic_words.md` for all new receipt files. See `OPS/NAMING_STANDARD.md`.
6. **Agents cannot approve their own receipts.** The reviewer agent must be different from the author agent.

---

## WHERE RECEIPTS LIVE
- Individual receipts: `/OPS/receipts/TC-[YYYYMMDD]-[ENG]-[NN]__product__topic_words.md`
- Receipt index: `/OPS/receipts/INDEX.md` (one line per receipt)
- CHANGE RECORD links back to receipt ID

---

*This template is required by Module 8 of the RedLantern Guardrail Stack. Enforced by TRUTH and RUNTIME.*
