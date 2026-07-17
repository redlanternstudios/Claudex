# Receipt Backed Process Memory

Status ACTIVE

Canonical capability: claudex.skill.receipt-backed-process-memory

## Trigger

Run when KP says `hardcode this`, `remember this`, `add this correction to the skill`, `never make me explain this again`, or when verified recurring work produces a reusable operating rule.

## Contract

1. Inspect the current authority, skill, contract, test, receipt, and affected downstream consumers.
2. Treat owner statements and unverified observations as candidates, not durable truth.
3. Admit a rule only when its identity, evidence, scope, limitation, approval authority, and downstream consumer are recoverable.
4. Update the narrowest existing authority. Do not create a second skill or repeat the same procedure in a contract, boot file, or status document.
5. Add a deterministic positive and negative test when the rule changes executable behavior or a trust boundary.
6. Run the owning checks, create a TruthCal receipt, publish, and read the canonical commit back.

Use one state: `CANDIDATE`, `DRAFT`, `VERIFIED`, `INSTALLED`, `BLOCKED`, or `RETIRED`.

Never hardcode secrets, personal data, transcript dumps, unsupported inference, temporary priorities, or external actions that still require owner approval.
