# CODEX ONE SHOT PROTOCOL

Version 1.0 · 2026-07-11 · Owner: Ro · Status: ACTIVE
Applies to: ChatGPT / Codex dispatch tasks, ChatGPT projects, and any engine that ships partial packages or ends responses with offers.
Wired into: `AGENTS.md` → ONE SHOT DELIVERY section.

Purpose: every build request returns the complete deliverable in one response. No addendum questions. No "if you want, I can." No subset shipping.

---

## ROOT CAUSE — WHY THE ADDENDUM LOOP HAPPENS

| # | Cause | What it looks like |
|---|-------|--------------------|
| 1 | Mini tier token conservation | Model ships 60% and offers the rest. Verified today: HireWire task on 5.4 Mini Medium ended with "If you want, I can now turn this into a sharper brief." |
| 2 | No failure definition | Stopping short costs the model nothing, so it stops short. |
| 3 | Undefined package | "The whole package" invites the model to pick the subset. It always picks smaller than you meant. |
| 4 | Reviewer assumption | The model assumes a human review turn follows, so deferring feels safe. It must be told it is the last stop. |
| 5 | Option language in the prompt | "Could", "maybe", "or" get read as a menu to present back instead of a decision already made. |

Every layer below closes one or more of these.

---

## LAYER 0 — SETTINGS (do once, before any prompt work)

1. **Model tier.** Build tasks run on the top model with high or extended reasoning. Mini tiers fail this protocol roughly 1 in 5 times regardless of prompt quality. Mini is for trivial edits only.
2. **Project instructions.** Paste Layer 1 into the ChatGPT project instructions (RedLantern Studios project → project settings → instructions). Every task in the project inherits it. Stop retyping contracts per message.
3. **Approval mode.** "Approve for me" keeps Codex pausing for consent mid run. For dispatch tasks you want completed end to end, set the widest approval mode you trust for that repo.

---

## LAYER 1 — PERMANENT OPERATING CONTRACT

Paste once into project instructions. This is the persistent layer.

```
OPERATING CONTRACT — PERMANENT. BINDING ON EVERY RESPONSE IN THIS PROJECT.

ROLE
You are the last stop. No reviewer follows you. Anything you leave out of a
response does not exist. Anything you defer never happens.

QUESTION BAN
Never ask a clarifying question. Never end a response with a question. If
input is missing or ambiguous, write ASSUMPTION: [what you assumed and why it
is the strongest option] inline and proceed. A wrong assumption clearly
labeled beats a stalled task.

OFFER BAN
Never offer work. These phrases are banned: "if you want", "I can also",
"want me to", "let me know if", "would you like". If the work would improve
the package, it is already in scope. Execute it in the same response.

MANIFEST RULE
Every build response opens with PACKAGE MANIFEST: a numbered list of every
artifact the response will contain. Then deliver every item in full. No item
may be summarized, sketched, sampled, or marked as available on request.

END CHECK RULE
Every build response closes with END CHECK: the manifest restated, each item
marked DELIVERED. Any item you cannot mark DELIVERED means the response is
not finished. Keep writing.

CONTINUATION RULE
If output length limits cut delivery short, end with CONTINUING and resume
in your next message without waiting to be asked. Never compress or drop
package items to fit one message.

FAILURE DEFINITION
A response has failed if it ends with a question, ends with an offer,
summarizes future work instead of doing it, or ships any manifest item
incomplete. Completeness beats brevity in every case. Token cost is never a
reason to shorten a deliverable.
```

---

## LAYER 2 — PER TASK CONTRACT

Paste at the top of every build request. Fill the brackets. This is the CTP prompt contract adapted for their side.

```
TASK CONTRACT

GOAL: [one sentence: the finished thing, not the activity]

PACKAGE — this response must contain, in full:
1. [artifact]
2. [artifact]
3. [artifact]
Nothing may be delivered as a sample, an excerpt, or a first pass.

SCOPE IN: [what is included]
SCOPE OUT: [what is explicitly excluded, so it does not ask about it]

INPUTS: [paste or link everything needed — missing input can never justify a
question, only a labeled ASSUMPTION]

DEPTH: run three passes internally. Pass 1 draft. Pass 2 attack the draft
for gaps, edge cases, and weak claims. Pass 3 final. Deliver only pass 3.

FORMAT: [exact structure of the output]

FAILURE: partial delivery, ending with a question or offer, or any PACKAGE
item missing = failed response. Assumptions labeled ASSUMPTION are
acceptable. Questions are not.
```

---

## LAYER 3 — THE PACKAGE MANIFEST TECHNIQUE (the biggest single lever)

Rule: **if you cannot list the package contents, the model decides them for you.** "The whole package" is exactly the phrase that produced today's partial output.

Worked example — the HireWire resume interrogation task, spelled as a PACKAGE:

```
PACKAGE — this response must contain, in full:
1. Interrogation brief: every resume claim mapped to one source line in the
   profile or evidence library, each marked SUPPORTED or UNSUPPORTED
2. Pass / fail check table, one row per claim
3. Gap list: 5 plus years visibility, SQL not demonstrated in bullets,
   Looker missing, keyword stuffing risk on Kubernetes, SAP, Salesforce
4. Rewritten bullets fixing every failed check
5. Rewritten summary distanced from the job posting language
6. Final ATS safe resume block, complete, no placeholders
7. QA checklist confirming zero hallucinated experience
```

Seven numbered items. The model now cannot ship item 1 and offer items 2 through 7. Each unnumbered wish becomes a numbered obligation.

Fast path: when you do not want to write the list yourself, open the task with one line: "First output the PACKAGE MANIFEST for the complete deliverable, then produce every item in full in the same response." The model writes its own obligation list, then is bound by it.

---

## LAYER 4 — RECOVERY COMMANDS

When a response still fails, reply with one word. Never restate context. Restating context reopens scope negotiation and invites new questions.

| Reply | Use when |
|-------|----------|
| `execute` | It ended with an offer instead of doing the work |
| `continue` | It got cut off and stopped |
| `all` | It delivered a subset of the manifest |
| `manifest` | It skipped the manifest or the END CHECK |

---

## LAYER 5 — END CHECK FORMAT

Required close of every build response. This is the receipt:

```
END CHECK
1. Interrogation brief — DELIVERED
2. Pass / fail table — DELIVERED
3. Gap list — DELIVERED
4. Rewritten bullets — DELIVERED
5. Rewritten summary — DELIVERED
6. Final resume block — DELIVERED
7. QA checklist — DELIVERED
```

An END CHECK the model cannot honestly complete forces it to keep writing instead of stopping. That is the point.

---

## ANTI PATTERNS — WHAT REOPENS THE QUESTION LOOP

| You write | Model hears | Write instead |
|-----------|-------------|---------------|
| "the whole package" | pick a reasonable subset | numbered PACKAGE list |
| "can you..." | politeness, so optional | imperative: "Deliver..." |
| "maybe / could / or" | menu of options to present back | one decided path |
| no format spec | choose the cheapest format | exact FORMAT block |
| "thoughts?" | discussion requested | deliverable requested |
| restating context after a failure | fresh scope negotiation | one recovery word |

---

## EXPECTED RESULTS

- Top model + Layer 1 + Layer 2: addendum offers near zero.
- Mini tier + full protocol: roughly 80% fixed. The remaining 20% is tier behavior, not prompt failure. Recovery words handle it in one turn.
- Layer 1 alone without a PACKAGE list: still leaks. The manifest is the enforcement mechanism; the contract without it is just tone.

## FAILURE DEFINITION FOR THIS PROTOCOL

This protocol has failed if build tasks still require more than one recovery word per task on the top model, if Layer 1 is not sitting in project instructions within a day, or if PACKAGE lists stop being written and "the whole package" returns to prompts.
