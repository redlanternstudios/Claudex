# Send to Rory

Status ACTIVE

Canonical capability: claudex.skill.send-to-rory

## Trigger

Run when KP explicitly says `send to Rory`, `send this to Rory`, `email Rory`, `send to my brother`, or `send to Brother Rory`.

Discussion, drafting, and `FROM RORY` do not authorize an external send.

## Contract

Read `OPS/CLAUDEX_RORY_OPERATING_LOOP_CONTRACT.md` before execution.

Execute every authorized send through this sequence:

`Authorize -> Resolve -> Route -> Verify -> Sight Engine -> Package RLS -> Send -> Read back -> Receipt`

1. Resolve exactly one current artifact from the active context and verified files.
2. Name the product or system, exact topic, artifact type, canonical filename, and folder.
3. Separate verified facts from limitations. Confirm every cited path, receipt, commit, or link.
4. Apply `.claude/skills/sight-engine.md` to every human facing visual attachment. Continue only on `PASS`.
5. Package the artifact in the current RedLantern Studios document and email standard.
6. Give Rory exactly one executable next action and observable completion proof.
7. Resolve Rory through the authorized mail connector. Never store a personal email address in Claudex.
8. Send only after KP's current explicit authorization.
9. Read the sent record back and confirm recipient, subject, sent state, and attachment names.
10. Report `VERIFIED SENT` only after readback succeeds.

## Failure states

Stop before sending when the artifact is ambiguous, a visual gate fails, evidence is missing, a secret is present, the recipient cannot be verified, or sent mail cannot be read back.

Never treat this skill as a scheduler or daemon. It runs on KP's explicit trigger and performs an external send only within that authorized execution.
