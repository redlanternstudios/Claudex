# AI CHANGE PROOF — Template
> Required for every meaningful Claude output that touches code, schema, or config.
> If an agent cannot fill this out clearly, it does not understand what it built.
> This is the bullshit detector.

---

## HOW TO USE
Copy this block. Fill it out. Paste it into the session before Ro accepts any change.
An incomplete or vague proof block = the change is not accepted.

---

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
AI CHANGE PROOF
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Change ID:          [CHANGE-NNN or generate one]
Product:            [product name]
Agent:              [which agent wrote this]
Date:               [ISO date]

Intent:             [one sentence — what this is supposed to do]

Files changed:
  - [file path] — [what changed]
  - [file path] — [what changed]

Assumptions:
  - [what the agent assumed about existing code]
  - [what it assumed about the database]
  - [what it assumed about user behavior]

Database impact:
  Tables read:       [list or NONE]
  Tables written:    [list or NONE]
  Schema changed:    [YES — migration required / NO]
  RLS affected:      [YES — policies need review / NO]

Auth/RLS impact:
  Auth required:     [YES / NO]
  RLS policies:      [unchanged / new policies added / existing policies modified]
  Service role used: [YES — document why / NO]

External API impact:
  [list any third-party calls or NONE]

User-facing impact:
  [what a user will see or experience differently]

Rollback plan:
  [exact steps to revert — git revert, migration rollback, etc.]

Test command:
  [exact terminal command that proves this works]

Manual QA path:
  1. [step]
  2. [step]
  3. expected result: [what should happen]

Known weakness:
  [what the agent is uncertain about — be honest]

Verified from repo:  [what the agent confirmed exists]
Assumed:             [what it assumed without checking]
Needs confirmation:  [what Ro must verify before accepting]
Cannot verify:       [what the agent cannot confirm without running the code]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## HALLUCINATION TRIPWIRES
The following claims require VERIFIED evidence — not agent assumption:

| Claim | What counts as verified |
|-------|------------------------|
| "File X exists" | Agent read the file and can show contents |
| "Function Y exists" | Agent can show the function definition |
| "Table Z exists" | Agent confirmed in DATABASE_MAP.md or ran SQL |
| "Package version N" | Agent read package.json |
| "Env var V is set" | Listed in ENV_NAME_REGISTRY.md |
| "RLS is enabled" | Agent ran rls_audit.sql and shows output |
| "It works" | Agent shows test command output, not just code |
| "It's deployed" | Agent shows deployment log or URL |
| "Tests pass" | Agent shows test runner output |

**If an agent claims any of the above without evidence — the claim is ASSUMED, not VERIFIED.**

---
*This template is read by RUNTIME, REVIEW, TRUTH, and SECURITY before any code is accepted.*
