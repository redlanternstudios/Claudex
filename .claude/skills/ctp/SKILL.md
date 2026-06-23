# CTP — Critical Thought Process v3.0

**Trigger:** `ctp`, `run ctp`, `apply ctp`, `use ctp`

When triggered, run the full CTP v3.0 framework against the active request or problem in context.

---

## WHAT THIS SKILL DOES

Forces every non-trivial analysis, decision, or build through a structured critical thinking protocol that prevents:
- Rationalized shortcuts
- Assumptions presented as facts
- Shallow analysis that misses behavioral or systemic drivers
- Outputs that look complete but are not

---

## STEP 0 — PROMPT CONTRACT (MANDATORY FIRST)

Before any analysis begins, state the contract explicitly:

```
GOAL:       [What outcome are we actually solving for?]
CONSTRAINTS:[What limits apply — time, stack, scope, users, budget?]
FORMAT:     [What does the output need to look like — decision, plan, spec, audit, code?]
FAILURE:    [What would make this output wrong, incomplete, or dangerous?]
```

**The FAILURE clause is non-negotiable.** It is the circuit breaker that prevents rationalized shortcuts.
If the FAILURE clause cannot be stated, the problem is not well-enough defined to analyze.

Do not proceed past Step 0 until all four are explicit.

---

## STEP 1 — 3-PASS DEEPENING

Run three successive passes of increasing depth:

**Pass 1 — Surface Read**
What does the request appear to be asking for?

**Pass 2 — Structural Read**
What system, constraint, or behavioral driver is actually at play?
What is the request hiding or assuming?

**Pass 3 — Root Read**
What is the underlying goal that would still matter if the stated request changed?
What would break if this root is ignored?

---

## STEP 2 — 10-LAYER ANALYSIS

Evaluate the problem across all relevant layers. Skip layers only with explicit justification.

| Layer | Question |
|-------|----------|
| 1. Intent | What is the real goal vs. stated goal? |
| 2. Users | Who is affected? What are their actual behaviors and constraints? |
| 3. System | What are the architectural or operational boundaries? |
| 4. Data | What data exists, what is assumed, what is missing? |
| 5. Logic | What decisions and branching does this require? |
| 6. Risk | What fails silently? What fails loudly? What cannot be undone? |
| 7. Integration | What upstream and downstream systems are touched? |
| 8. Trust | What assumptions are being made about users, inputs, or system state? |
| 9. Time | What decays? What scales poorly? What creates future debt? |
| 10. Truth | What is verified vs. assumed vs. unknown? Label each explicitly. |

---

## STEP 3 — BEHAVIORAL DRIVER SEPARATION

Do not conflate different types of drivers. Separate explicitly:

- **Functional drivers** — what the system must do
- **Behavioral drivers** — what users actually do (vs. what they say they do)
- **Emotional drivers** — what creates or destroys trust and motivation
- **Systemic drivers** — what constraints come from the stack, org, or environment
- **Economic drivers** — what affects cost, revenue, or incentive alignment

Conflating these is the most common source of wrong product decisions.

---

## STEP 4 — COLD START PROTOCOL

For any new product, feature, or system:

Answer these before designing the solution:

1. What does the user experience before any data exists?
2. What is the minimum useful state?
3. What creates the first perceived value?
4. What fails if onboarding is skipped or rushed?
5. How does the system behave at 0 users, 1 user, 100 users, 10,000 users?

Do not skip this for v1 features. Cold start failure is the most common cause of abandonment.

---

## STEP 5 — INSTRUMENTATION MOAT

Define what must be measured before shipping anything:

- **Activation signal** — what proves a user got value?
- **Engagement signal** — what proves the feature is being used as intended?
- **Failure signal** — what reveals silent failure?
- **Retention signal** — what proves users return?

If these cannot be defined, the feature cannot be evaluated. Ship without them = building blind.

---

## STEP 6 — CATEGORY TIMING AUDIT

Before recommending a solution, evaluate:

1. Is the category too early? (users don't have the pain yet)
2. Is the category too late? (dominant players have locked distribution)
3. Is there a window? (what creates the opening?)
4. What is the decay rate of the window?

Category timing overrides product quality in many failure cases. A right product at the wrong time is a wrong product.

---

## STEP 7 — IDENTITY VS. GAMIFICATION CHECK

For any engagement or retention mechanic:

- Does this reinforce the user's **identity** (who they want to be)?
- Or does this substitute for identity (streaks, points, badges that feel hollow over time)?

Identity-based retention compounds. Gamification-based retention decays after the novelty window closes.

21-day rule: if the mechanic doesn't feel natural to the user's identity by day 21, it will not sustain.

---

## STEP 8 — PRIVACY PARADOX AUDIT

For any feature that collects, displays, or infers personal data:

- Users say they want privacy.
- Users behave as if they want to be known and recognized.

Resolve the paradox explicitly:
1. What data is needed to deliver the value users actually want?
2. What data creates discomfort when users realize it's being used?
3. Where is the trust line for this specific user segment?

Do not assume. The line shifts by culture, context, and stakes.

---

## STEP 9 — COMMUNITY CORRECTION SIGNAL

For any social or community feature:

Define in advance:
- What is the correction mechanism when users behave badly?
- Who owns correction — the system, the community, or the operator?
- What is the escalation path if correction fails?

A community without a correction signal becomes a liability, not an asset.

---

## STEP 10 — KPI THRESHOLD AUDIT

Before any recommendation becomes a decision:

State the KPI thresholds that would change the recommendation:

```
IF [metric] < [threshold] THEN [action]
IF [metric] > [threshold] THEN [action]
KILL condition: [what makes us stop or pivot entirely]
```

A recommendation without defined KPI thresholds is an opinion, not a decision framework.

---

## OUTPUT FORMAT

After running the CTP, output in this structure:

### PROMPT CONTRACT
[State the four fields explicitly]

### REALITY CHECK
[What is wrong, missing, or risky in the current framing]

### ANALYSIS FINDINGS
[Structured output from the 10-layer analysis — include only layers with substantive findings]

### CRITICAL GAPS
[Specifically what is unknown, assumed, or missing — labeled VERIFIED / ASSUMED / UNKNOWN]

### RECOMMENDATION
[The clearest best next move, with justification]

### FAILURE CONDITIONS
[What would make this recommendation wrong]

### KPI THRESHOLDS
[Defined kill conditions and decision triggers]

---

## TRUTHSERUM ENFORCEMENT

This skill operates under TruthSerum. That means:

- Do not validate weak assumptions
- Do not call something advanced if it is merely organized
- Do not call something product-ready if it lacks control layers
- Do not call something complete if it lacks receipts, review gates, or state logic
- Label every claim: VERIFIED / ASSUMED / UNKNOWN / PLANNED / MISSING / BROKEN

If running CTP reveals that the request is under-specified: stop, state what is missing, and require completion before proceeding.

---

## USAGE NOTES

- Run CTP before any significant architectural decision
- Run CTP before any feature spec is written
- Run CTP before any automation is designed
- Run CTP before any product claim is made to investors or users
- CTP is a pre-flight, not a post-mortem

**Reference doc:** `CTP_v3_RedLantern.pdf` in Google Drive → RedLantern Studios - Internal Dox
