# LARGE MESSAGE PROTOCOL
**Version:** 1.0 | **Added:** 2026-06-10 | **Owner:** ROBBY (RTE)
**Status:** ACTIVE — enforced on all SwarmClaw rooms

---

## PROBLEM

Large messages sent as a single payload to SwarmClaw agents can exceed API token-per-minute
(TPM) rate limits, causing the request to fail and the work to be lost.

Root cause: system prompt + conversation history + large user message = combined token count
exceeds the rate tier limit for the current model (Sonnet by default).

---

## SOLUTION

Split large messages into chunks before sending. Robby accumulates all chunks, reconstructs
the full message, then routes normally. No data loss. No rate errors.

---

## WHEN TO USE THIS

Split your message into chunks if it is:
- Over ~800 words (~1,000 tokens)
- Contains large code blocks, file contents, or logs
- Contains a full spec, ADR, or multi-section document
- Contains pasted output from another tool (error logs, audit results, etc.)

If in doubt: chunk it. Chunks have zero downside. Failed unsplit messages have to be resent anyway.

---

## HOW TO CHUNK A MESSAGE

### Step 1 — Pick a JOB_ID
Use a short unique string. Easiest: timestamp + 3 letters.
Example: `jun10-xyz`

### Step 2 — Split your message on logical boundaries
- Split at paragraph breaks, numbered sections, or topic shifts
- Never split mid-sentence or mid-code-block
- Each chunk should be roughly 800–1,200 words

### Step 3 — Add the header to each chunk

```
[CHUNK 1/3 | JOB_ID: jun10-xyz]
<your message body — part 1>
```

```
[CHUNK 2/3 | JOB_ID: jun10-xyz]
<your message body — part 2>
```

```
[CHUNK 3/3 | JOB_ID: jun10-xyz]
<your message body — part 3>
```

### Step 4 — Send chunks one at a time
Wait for Robby's acknowledgment after each chunk before sending the next.

Robby will reply: `"CHUNK x/N received. JOB_ID: jun10-xyz. Waiting for remaining chunks."`

After the final chunk, Robby replies: `"All chunks received. Processing now."` and routes normally.

---

## WHAT ROBBY DOES AUTOMATICALLY

| Trigger | Action |
|---|---|
| Sees `[CHUNK x/N | JOB_ID: ...]` header | Acknowledges, holds processing, waits for all N chunks |
| Receives all N/N chunks | Reconstructs message in order, routes normally |
| Chunk arrives out of order | Requests re-send of missing chunk by number |
| >5 min gap with incomplete set | Dead-letters the job with status INCOMPLETE_CHUNK_SEQUENCE |
| Malformed header | Dead-letters with CORRUPT_HEADER, notifies sender |

---

## EXAMPLE — SPLITTING A LARGE SPEC

Original message: 2,400 words (too large → split into 3)

**Message 1:**
```
[CHUNK 1/3 | JOB_ID: jun10-abc]
Here is the full spec for the Amina onboarding flow.

## OBJECTIVE
...first 800 words of spec...
```

**Message 2:**
```
[CHUNK 2/3 | JOB_ID: jun10-abc]
## DATA MODEL
...next 800 words...
```

**Message 3:**
```
[CHUNK 3/3 | JOB_ID: jun10-abc]
## EDGE CASES + ACCEPTANCE CRITERIA
...final section...
```

---

## RECOVERY — IF A MESSAGE ALREADY FAILED

If you already hit a rate limit and the message was dropped:
1. Generate a new JOB_ID
2. Re-send as chunks using this protocol
3. Robby treats it as a fresh job — no need to reference the failure

---

## AGENT-TO-AGENT LARGE CONTEXT

When ROBBY routes a task to a downstream agent requiring >3,000 tokens of context:
- Primary task instruction = first message
- Supplemental context labeled: `[CONTEXT SUPPLEMENT | JOB_ID: <id> | PART x/n]`
- Downstream agent must acknowledge each part before next is sent

This prevents cascading rate limit failures across the agent chain.

---

## DEAD-LETTER STATUSES FOR CHUNK FAILURES

| Status | Meaning |
|---|---|
| `INCOMPLETE_CHUNK_SEQUENCE` | Not all chunks received within 5-minute timeout |
| `OUT_OF_ORDER_UNRESOLVED` | Missing chunk was not resent within timeout |
| `CORRUPT_HEADER` | Header malformed — could not parse chunk number, total, or JOB_ID |

Dead-letter action: Robby notifies originating sender with JOB_ID + status + instruction to resend full sequence with a new JOB_ID.

---

## REFERENCE

- Robby prompt: `/memory/agent_prompts/robby_v3_20260610.md`
- This file: `/OPS/LARGE_MESSAGE_PROTOCOL.md`
- Change introduced: 2026-06-10 (rate limit fix, Ro + Claude)
