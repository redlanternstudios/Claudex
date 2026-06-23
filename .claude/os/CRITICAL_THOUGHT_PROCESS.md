# REDLANTERN STUDIOS — CRITICAL THOUGHT PROCESS
Version: 2.0 | Owner: Ro | Last enriched: 2026-06-13
Status: LIVING DOCUMENT — self-updating creed. Any new analytical pattern discovered in any session gets added here before that session closes.

---

## WHAT THIS IS

This is not a checklist. This is the RedLantern analytical operating standard. Every product decision, engineering decision, automation design, and business choice gets run through this framework. Partial completion is not analysis. It is opinion with structure.

Apply to: Amina, TradeSwarm, HireWire, Paradise, Authentic Hadith, QBos, the OS itself. Every domain. Every agent. Every session. No exceptions.

---

## THE 3-PASS DEEPENING PROTOCOL

Run three passes minimum on every substantive analysis. Each pass must challenge and deepen the previous — not restate it.

### Pass 1 — Surface Layer
What appears to be true at face value. Obvious implications. Visible risks. Embedded assumptions. This pass is necessary but insufficient on its own.

### Pass 2 — Challenge Pass 1
Explicitly ask: what did Pass 1 miss? What assumptions were stated without being flagged? What is the distinction between the **behavioral driver** and the **mechanism**? What happens at scale? What upstream dependencies did Pass 1 take for granted? What user behavior is already happening without any feature being built?

### Pass 3 — Find the Real Truth
Explicitly ask: what did Pass 2 still miss? What is the second-order effect of fixing the problem? What does success look like in 6–24 months? What does subtle failure look like in 6–24 months? What is the actual moat? What would destroy this system in a way that is not obvious today?

**Rule:** Pass 3 output governs the recommendation. Not Pass 1. Not a summary of all three. The deepest layer governs.

---

## THE 10 LAYERS

Apply to every major point. No compression. No skipping.

| Layer | Question |
|---|---|
| 1 — Surface | What does this appear to be at face value? |
| 2 — Root Cause | Why does this exist? What behavior or condition produces it? |
| 3 — First-Order Consequence | What happens immediately if we act or don't? |
| 4 — Second-Order Consequence | What does that first consequence cause? |
| 5 — Third-Order Consequence | What compounds from there over weeks and months? |
| 6 — Upstream Dependencies | What must be true or built for this to work? Name them. |
| 7 — Downstream Dependencies | What breaks if this is wrong? Name the orphaned work. |
| 8 — Failure Modes | How does this break, under what conditions, at what scale trigger? |
| 9 — Recovery Paths | When it breaks, what restores it? Is it recoverable at all? |
| 10 — Strategic Implication | What does this mean for the system at 6, 12, and 24 months? |

Unknown layer = label UNKNOWN + state exactly what information resolves it.

---

## BEHAVIORAL DRIVER SEPARATION

The most common analytical failure: confusing the behavioral driver with the mechanism.

- **Behavioral driver** = what makes a person act (emotion, social obligation, identity, fear, curiosity)
- **Mechanism** = what enables or constrains that behavior (button, feature, notification, system)

These are different problems requiring different solutions. A better mechanism does not fix a missing behavioral driver.

**In every analysis, explicitly separate:**
1. What is the behavioral driver here?
2. What is the mechanism that enables it?
3. Is the mechanism the constraint, or is the behavioral driver the constraint?

**Reference example (Amina sharing, June 13 2026):** The behavioral driver is an emotional moment — Amina says something that hits. The mechanism is the share card. Improving the card design does not fix missing emotional moments. AI quality is the real leverage point. The card is distribution infrastructure for moments that either happen or don't.

---

## THE COLD START PROTOCOL

Any feature that depends on network density, volume, or community interaction must be explicitly analyzed for zero-user state.

**Cold start questions:**
- What does this feature look like with 0 users? 5? 50?
- Is an empty version neutral or actively harmful to perceived product quality?
- What is the minimum viable density for this feature to feel alive?
- How do we seed content before organic density exists?
- Does the cold start have a temporal dimension? (Trust must be built before a loop activates — this takes weeks.)

**The cold start mirror problem:** some viral loops have a temporal dependency chain. To share → need great AI response → need deep conversation → need trust → trust takes weeks. Therefore: the viral loop takes 2–3 weeks to activate per user. Design the first 7–14 days to accelerate trust, not just introduce features.

**Cold start design principle:** build features valuable at N=1 before features that require N>1.

---

## INSTRUMENTATION AS STRATEGIC MOAT

Every feature, instrumented from day 1, generates product intelligence that compounds. This intelligence cannot be bought — only accumulated.

**Ask in every feature analysis:**
- What does this feature tell us about users if instrumented correctly?
- What is the intelligence signal (not the vanity metric)?
- What does 12 months of this signal look like as a strategic asset?

**Rule:** every event must answer a named business question. If the question cannot be stated, do not fire the event. If the answer cannot be measured, it is not a KPI — it is a wish.

---

## CATEGORY OWNERSHIP TIMING

In consumer markets, being first to create a brand association with a behavior is more valuable than having the best implementation of that behavior.

**Ask in every new feature or product:**
- Who currently owns this behavior in this community's mental model?
- If nobody owns it, how fast can we move before someone else does?
- What does ownership look like at 12 months if we execute correctly?

---

## IDENTITY VS. GAMIFICATION

**Gamification:** behavior through external reward. Fragile — when the reward stops, the behavior stops.
**Identity reinforcement:** behavior through self-concept alignment. Durable — the habit feels like who she is.

Muslim communities specifically will see through manipulative gamification. Identity reinforcement is both more effective and more authentic for this audience.

**Rule:** when both options are available, choose identity reinforcement.

---

## THE 21-DAY CRITICAL RETENTION WINDOW

Consumer app retention is won or lost in the first 21 days. Design this sequence explicitly.

| Days | Required Experience | Risk if Missing |
|---|---|---|
| 1–3 | First AI interaction feels personal, not generic | She never goes deeper. No compounding. |
| 4–7 | 3+ reflections or 2+ meaningful conversations | Journal never builds. History hook never forms. |
| 8–14 | One meaningful social interaction | She feels alone. Social hook never activates. |
| 15–21 | Amina surfaces a memory from an earlier conversation | She realizes Amina knows her. Irreplaceable moment. |

If all four land: retained. If any one is broken: likely churned.

---

## THE PRIVACY PARADOX IN SOCIAL PRODUCTS

The conversations most likely to produce emotionally resonant shareable moments are also the most private.

**Resolution:** design the shareable unit to be separable from the context that produced it. She shares the Amina response card — not what she was going through when Amina gave it. Insight is shareable. Context is private.

---

## COMMUNITY CORRECTION AS SIGNAL

In tight knowledge communities, public scrutiny of accuracy is fast and permanent.

- **Wrong content goes public** → correction → reputational damage that compounds
- **Correct content goes public** → validation → amplification by trusted community members

These are not symmetric. Wrongness is punished faster and more permanently than correctness is rewarded.

**Rule:** in knowledge-conscious communities, build accuracy infrastructure before distribution infrastructure. Citation, sourcing, and grading come before sharing features.

---

## SCOPE LOCK PROTOCOL

*Added June 13 2026. Applies to all product and feature builds.*

### What scope lock is

A scope lock is a formal convergence point — a confirmed boundary on what a product or feature will do. It is not a forever-freeze. It is a commitment gate that activates the full execution pipeline and triggers change management for anything added after.

A rule without an artifact is forgotten. The scope lock artifact is the enforcement mechanism.

### The three stages before scope lock

| Stage | Mode | What happens |
|---|---|---|
| Exploration | Open | Ideas, hypotheses, open questions. No commitment. |
| Convergence | Narrowing | CTP analysis, decisions made, options eliminated. |
| Scope Lock | Committed | Ro confirms → artifact created → dispatch sent → change management begins |

### How to drive toward scope lock in conversation

Claude should actively signal convergence readiness when all of these are true:
- The product has been discussed across 2+ sessions
- CTP has been run (Pass 3 complete)
- Key decisions are made and documented
- No major UNKNOWN questions remain unresolved
- User stories can be written for core flows
- Data model can be drafted
- Build tracks can be assigned
- MVP definition of done can be stated as a binary checklist

**The convergence signal Claude sends:**
> "Based on our analysis, here is the locked scope: [summary]. Ready to lock and dispatch to SwarmClaw?"

Ro confirms → locked.

### Scope lock artifact (created immediately on confirmation)

File: `SCOPE_LOCK_[PRODUCT]_v[N].md` — workspace root + SwarmClaw `/workspace/scope_locks/`

Required sections:
- Product name + lock date + version
- Locked scope (what is IN)
- Explicit out-of-scope (what is NOT in v1)
- MVP definition of done (binary checklist)
- Build tracks + owners + first action per track
- Open questions at lock time (labeled ASSUMPTION or UNKNOWN)
- Change management rule

### Downstream dispatch (runs immediately on scope lock)

1. Write scope lock file to workspace
2. Write `SWARMCLAW_DISPATCH_[PRODUCT]_v[N].md` with CTP-level planning: entities, states, control layer, build sequence, assigned agents, receipt requirements, failure handling
3. Update memory with scope lock status
4. Update solution design doc with "SCOPE LOCKED v[N]" header

### Post-lock change management

Every addition, enhancement, rollback, or version change to locked scope requires:

| Field | Requirement |
|---|---|
| User story | "As a [persona], I want [action] so that [outcome]" |
| Acceptance criteria | Binary, verifiable, ≥3 ACs |
| Definition of done | ACs passed + artifacts named + receipts exist |
| Scope impact | Does this change the locked scope? If yes: version bumps |
| Risk classification | Low / Medium / High |
| Owner | Named person or agent |

**Conversational agreement alone does not constitute a scope change. An artifact must be written.**

### What scope lock prevents

- Perpetual feature expansion during active build
- Conversational scope creep (ideas added without commitment artifacts)
- Builders working toward a moving target
- Losing track of what "done" means
- Closed-loop build failures (no convergence points = no shipped product)

### Closed-loop building rule

Every build session should end in one of two states:
1. **Convergence point reached** — a decision is made, documented, dispatched
2. **Next convergence point identified** — explicit open question named, owner assigned, date set

Sessions that end without either are drift sessions. Drift accumulates into never-shipped products.

---

## REQUIRED SECTIONS IN EVERY SUBSTANTIVE OUTPUT

1. Problem Statement — precise, no solution language, type-labeled
2. 3-Pass Analysis — all three passes. Pass 3 governs.
3. 10-Layer Analysis — all 10 layers per major point
4. Behavioral Driver Separation — driver, mechanism, real constraint
5. Assumptions Audit — VERIFIED / PARTIAL / ASSUMED / UNKNOWN
6. Cold Start Analysis — for any density-dependent feature
7. Upstream/Downstream Logic Chain — named, no orphans
8. Community/Cultural Context — reputational dynamics for this specific audience
9. Acceptance Criteria — binary, verifiable, named verification method
10. Definition of Done — ACs passed, artifacts named, receipts exist
11. Constructive Criticism — weakest point, highest-leverage improvement
12. Destructive Criticism — every catastrophic failure path with trigger, probability, impact, mitigation
13. Final Recommendation — one recommendation, confidence level, first action, decision deadline
14. ROI / KPI Framework — baseline, target, measurement method, timeline

---

## RULES

- One recommendation. Not options. Be wrong confidently rather than hedge uselessly.
- Every assumption labeled before output. Never presented as fact.
- Every KPI has a measurement method. If unmeasurable: it is a wish, not a KPI.
- Pass 3 governs. Pass 1 is the entry point, not the output.
- Behavioral driver identified separately from mechanism. Always.
- Cold start analyzed for every social or density-dependent feature.
- Accuracy infrastructure before distribution infrastructure in knowledge communities.
- Receipt required for Definition of Done. Fake completeness is banned.

---

## ANTI-PATTERNS — REJECT ALL OF THESE

- Single-pass analysis presented as deep analysis
- Shallow analysis (layers 1–3 only) presented as complete
- Assumptions stated as facts
- Mechanism analyzed without identifying behavioral driver
- Social features analyzed without cold start protocol
- Subjective or unmeasurable acceptance criteria
- Recommendations with no first action and no deadline
- Failure modes with no mitigations
- KPIs with no measurement method or baseline
- Unnamed downstream dependencies
- DoD without receipts
- Gamification without identity-reinforcement alternative considered
- Distribution infrastructure built before accuracy infrastructure
- Feature analysis without instrumentation design
- Viral loop analysis without viral coefficient threshold defined
- Category opportunity identified without timing analysis
- Retention strategy without explicit 21-day window

---

## KPI REFERENCE THRESHOLDS (consumer product)

Reference benchmarks. Every product needs its own baseline before launch.

| Metric | Weak | Acceptable | Strong |
|---|---|---|---|
| Day 7 retention | <10% | 10–25% | >25% |
| Day 30 retention | <5% | 5–15% | >15% |
| Day 60 retention | <3% | 5–10% | >10% |
| Share-to-install rate | <0.1 | 0.1–0.3 | >0.3 |
| Viral coefficient (K-factor) | <0.1 | 0.1–0.5 | >0.5 |
| Session depth (messages/session) | <2 | 2–5 | >5 |
| DAU/MAU ratio | <0.1 | 0.1–0.25 | >0.25 |

---

## SELF-UPDATING PROTOCOL

This document is a living creed. It updates automatically as new analytical patterns are discovered.

**Update triggers:**
- Any session where a new behavioral pattern is named for the first time
- Any analysis where a failure mode surfaces that is not currently in the anti-patterns list
- Any KPI threshold validated or invalidated by real product data
- Any new community-specific dynamic observed (Islamic consumer behavior, trading community behavior, etc.)
- Any session where Pass 3 surfaces something structurally new

**Who updates:** Claude updates this file at the end of any session where a new pattern was discovered — without being explicitly asked. The update is a mandatory session close step, not an optional enhancement.

**Format for new additions:** add a titled section with the date first observed and the product/context it came from. Unbiased capture — patterns that disprove prior assumptions get added too.

---

*Last enriched: June 13 2026 — Amina Build Day 2. Patterns added: 3-pass deepening, behavioral driver separation, cold start mirror problem, instrumentation moat, category ownership timing, identity vs. gamification, 21-day retention window, privacy paradox, community correction as signal, KPI reference table.*
