# CRITICAL THOUGHT PROCESS (CTP)
### RedLantern Studios — Mandatory Analytical Framework
Version 3.0 · Last updated 2026-06-17 · Status: ACTIVE / MANDATORY

Apply to ALL of RedLantern Studios — every product (Amina, TradeSwarm, HireWire, Paradise, Authentic Hadith, QBos, the OS itself), every domain (product, engineering, operations, marketing, legal, financial, trading, content), every agent. No exceptions. Partial completion = incomplete output. Incomplete output does not get handed off.

**Why:** Ro requires reasoning depth that exposes hidden assumptions, second and third order effects, upstream/downstream dependency chains, failure modes, behavioral drivers separate from mechanisms, and measurable outcomes. Surface analysis is not analysis. It is a guess with formatting.

**Order of operations:** Input contracting (Prompt Contract) → 3 Pass Analysis → 10 Layer Analysis → all remaining sections. Never skip the input phase. A poorly contracted input produces precise wrong output.

---

## STEP 0 — THE PROMPT CONTRACT (runs BEFORE everything else)

Every input — vague or specific, short or long — must be contracted before analysis begins. Do not run analysis on an uncontracted input. Vague inputs produce plausible sounding wrong outputs.

| Component | What it forces |
|---|---|
| **GOAL** | The quantifiable success metric. Not "analyze the feature" but "identify the top 3 retention risks with evidence and rank by impact." If the goal cannot be stated precisely, the task is underspecified. Pause and state the real goal. |
| **CONSTRAINTS** | Hard limits that cannot be violated. Time budget, scope boundary, what is off limits, what assumptions are locked. If constraints are unstated, scope silently expands. |
| **FORMAT** | Exact output shape. Numbered list, table, decision + rationale, one page brief, task batch. If unstated, the most comfortable shape gets chosen, not the most useful one. |
| **FAILURE** | Explicit failure conditions. What makes this output unacceptable. The most important component — it prevents rationalized shortcuts. |

**Key insight:** The FAILURE clause is what stops agents from taking shortcuts they would otherwise rationalize as acceptable. Without it, output optimizes for completeness and internal consistency. With it, output is bound to the actual quality standard.

**How to apply:**
- Input already precise → confirm the contract matches, proceed.
- Input vague → reconstruct the contract from context, state it, confirm, proceed.
- Quick ask → minimal contract (GOAL + FAILURE minimum), proceed.

**Rule:** Every session that begins with a vague ask must produce a stated contract before substantive output. The contract is not overhead — it is the first act of quality control.

---

## THE 3 PASS DEEPENING PROTOCOL

Run three passes minimum. Each must challenge and deepen the previous, not restate it.

**Pass 1 — Surface.** What appears true at face value. Obvious implications. Visible risks. Embedded assumptions. Necessary but insufficient.

**Pass 2 — Challenge Pass 1.** What did Pass 1 miss? What assumptions went unflagged? What is the distinction between the behavioral driver and the mechanism? What happens at scale? What upstream dependencies were taken for granted? What user behavior already happens without the feature?

**Pass 3 — Find the real truth.** What did Pass 2 still miss? What is the second order effect of fixing the problem? What does this mean in 6 to 24 months if it works? If it fails subtly? Is the moat really a moat or just a lead? What would destroy this system in a way that is not obvious today?

**Rule:** Pass 3 output becomes the basis for the recommendation. Not Pass 1. Not the summary of all three. The deepest layer governs.

---

## THE 10 LAYERS (apply to every major point)

| Layer | Question |
|---|---|
| 1 — Surface | What does this appear to be at face value? |
| 2 — Root Cause | Why does this exist or happen? What behavior or condition produces it? |
| 3 — First Order Consequence | What happens immediately if we act or don't? |
| 4 — Second Order Consequence | What does that first consequence cause? |
| 5 — Third Order Consequence | What compounds from there over weeks/months? |
| 6 — Upstream Dependencies | What must be true or built for this to work? Name them. |
| 7 — Downstream Dependencies | What breaks if this is wrong or missing? Name the orphaned work. |
| 8 — Failure Modes | How does this break, under what conditions, at what scale trigger? |
| 9 — Recovery Paths | When it breaks, what restores it? Is it recoverable at all? |
| 10 — Strategic Implication | What does this mean for the system at 6, 12, 24 months? |

Unknown layer = label UNKNOWN + state exactly what information resolves it. Never skip. Never compress two layers into one.

---

## BEHAVIORAL DRIVER SEPARATION

One of the most common analytical failures: confusing the behavioral driver with the mechanism.

- **Behavioral driver** = what makes a person act (emotion, social obligation, fear, identity reinforcement).
- **Mechanism** = what enables or constrains that behavior (a button, feature, notification, system).

Different problems, different solutions. A better mechanism does not fix a missing driver. A strong driver does not mean the mechanism is in place.

In every analysis, separate: What is the driver (emotional, social, identity, fear, curiosity, obligation)? What is the mechanism? Which one is the actual constraint?

---

## REQUIRED SECTIONS IN EVERY SUBSTANTIVE OUTPUT

0. **Prompt Contract** — GOAL / CONSTRAINTS / FORMAT / FAILURE. Not optional.
1. **Problem Statement** — precise, no solution language, labeled by type (product / engineering / operations / behavioral / strategic).
2. **3 Pass Analysis** — Pass 3 governs the recommendation.
3. **10 Layer Analysis** — all 10 per major point. No compression.
4. **Behavioral Driver Separation** — driver, mechanism, real constraint.
5. **Assumptions Audit** — VERIFIED / PARTIAL / ASSUMED / UNKNOWN, risk if wrong, what resolves the unknown.
6. **Cold Start Analysis** — if the system depends on density/volume/network effects, design for zero user state.
7. **Upstream/Downstream Logic Chain** — named producers and consumers, dead ends flagged, loops labeled.
8. **Community/Cultural Context** — in tight communities, reputational dynamics are faster and more permanent. Assess them.
9. **Acceptance Criteria** — binary, verifiable, named verification method.
10. **Definition of Done** — all ACs passed, artifacts named, handoffs complete with proof, receipt exists.
11. **Constructive Criticism** — weakest point, highest leverage improvement, over/under engineering risk.
12. **Destructive Criticism** — steelman every failure path with trigger, probability, impact, mitigation, residual risk.
13. **Final Recommendation** — one recommendation, confidence level, preconditions, first action, decision deadline.
14. **ROI / KPI Framework** — at least one measurable KPI, baseline, target, measurement method, timeline.

---

## COLD START PROTOCOL

Any feature depending on network density, post volume, or community interaction must be analyzed for zero user state.

Questions: What does this look like at 0 users? 5? 50? Is an empty version neutral or actively harmful? What is the minimum viable density to feel alive? How do we seed before organic density? Is there a temporal dimension (trust built before the loop activates)?

Design principles: build N=1 value before N>1 value; seed social proof before organic; sequence social features after solo features are proven; a standalone artifact (a prayer) beats a feature that needs a response.

---

## INSTRUMENTATION AS STRATEGIC MOAT

Every feature instrumented from day 1 generates compounding product intelligence. It cannot be bought, only accumulated.

Ask: What does this feature tell us about users if instrumented right? What is the intelligence signal (not the vanity metric)? What does 12 months of this signal look like as a strategic asset?

**Rule:** every event must have a business question it answers. If you cannot state the question, do not fire the event. If you can state the question but not measure the answer, the KPI is invalid.

---

## CATEGORY OWNERSHIP TIMING

In consumer markets, being first to own a brand association with a behavior beats having the best implementation of it.

Ask: Who owns this behavior in the community's mental model? If nobody, how fast can we own it before someone else? If second, is there a displacement path? What does ownership look like in 12 months? Speed to quality is the strategy — not speed alone, not quality alone.

---

## IDENTITY VS GAMIFICATION

- **Gamification** creates behavior through external reward. Fragile — break the streak, lose the motivation.
- **Identity reinforcement** creates behavior through self concept alignment. "You have shown up for your deen 30 times. That is who you are now." Breaking the habit feels like betraying yourself, not losing a score.

In every retention analysis: is this identity reinforcing or gamification? Does it serve self concept or exploit loss aversion? Tight communities see through manipulative gamification and reject it. **When both are available, always choose identity reinforcement.**

---

## THE 21 DAY CRITICAL RETENTION WINDOW

Consumer retention is won or lost in the first 21 days. Design it explicitly.

| Days | Required Experience | Risk if Missing |
|---|---|---|
| 1–3 | First AI interaction feels genuinely personal, not generic | Shallow first session = no compounding |
| 4–7 | 3+ reflections OR 2+ meaningful conversations | Journal never compounds, history hook never forms |
| 8–14 | One meaningful social interaction (an ameen, a reply) | She feels alone, social hook never activates |
| 15–21 | Surfaces a memory from an earlier conversation | She realizes it knows her — the irreplaceable moment |

All four land → retained. Any one breaks → likely churned. Design as intentional milestones, not emergent behavior.

---

## THE PRIVACY PARADOX IN SOCIAL PRODUCTS

The conversations most likely to produce emotionally resonant moments are also the most private.

**Resolution:** the shareable unit must be separable from the context that produced it. The hadith is shareable, the grief is not. Design the share artifact to communicate value without requiring disclosure of what prompted it. Design for separation by default — privacy first sharing is used more, not less.

---

## COMMUNITY CORRECTION AS SIGNAL

In tight knowledge communities (Muslim, medical, legal, academic), public scrutiny of accuracy is fast and permanent.

Two outcomes: wrong content → public correction → compounding reputational damage; correct content → validation → amplification. **This is not symmetric** — wrongness is punished faster and more permanently than correctness is rewarded.

The citation is the defense mechanism: a hadith citation with collection and number converts scrutiny from threat to amplifier. **Rule:** accuracy infrastructure (citations, sources, grading) must be built before distribution infrastructure (sharing, notifications, viral loops). Distributing wrong information at scale in these communities is not recoverable.

---

## CORE RULES

- Contract the input first. Every time.
- The FAILURE clause is mandatory. Without it, shortcuts get rationalized.
- If GOAL is an activity ("analyze X"), reject it and restate as an outcome ("identify the top N with evidence").
- One recommendation. Not options. Be wrong confidently rather than hedge uselessly.
- Every assumption labeled before output — VERIFIED / PARTIAL / ASSUMED / UNKNOWN.
- Every catastrophic failure path has a mitigation before work proceeds.
- Every KPI has a measurement method. Unmeasurable = a wish, not a KPI.
- Every downstream dependency named. Orphaned work is always a gap.
- Receipt required for Definition of Done. Fake completeness is banned permanently.
- Pass 3 governs the recommendation.
- Separate the behavioral driver from the mechanism. Conflating them produces confident wrong solutions.
- Cold start analyzed for every social or density dependent feature.

---

## DOCUMENT OUTPUT STANDARD

PDF is the standard for ALL RedLantern Studios branded documents. Never deliver HTML as a final output. HTML is the build artifact only — generate internally, convert to PDF. Final deliverable to any human is always PDF. Applies to dispatch docs, briefs, handoffs, operating updates, sprint reports, UAT reports, vendor packets — everything.

---

## ANTI PATTERNS TO REJECT

Proceeding without a Prompt Contract · missing FAILURE clause · GOAL as activity not outcome · FORMAT unstated · shallow analysis (layers 1 to 3 only) presented as complete · single pass presented as deep · assumptions stated as facts · mechanism analyzed without the driver · social features without cold start · subjective acceptance criteria · recommendations with no first action or deadline · failure modes with no mitigations · KPIs with no measurement method or baseline · unnamed downstream dependencies · DoD without receipts · gamification without identity alternative considered · distribution built before accuracy in knowledge communities · feature analysis without instrumentation design · viral loop without coefficient threshold · category opportunity without timing analysis · retention strategy without explicit 21 day sequence.

---

## KPI REFERENCE THRESHOLDS (consumer product)

Reference benchmarks, not targets. Every product needs its own baseline.

| Metric | Weak | Acceptable | Strong |
|---|---|---|---|
| Day 7 retention | <10% | 10–25% | >25% |
| Day 30 retention | <5% | 5–15% | >15% |
| Day 60 retention | <3% | 5–10% | >10% |
| Share to install rate | <0.1 | 0.1–0.3 | >0.3 |
| Viral coefficient (K factor) | <0.1 | 0.1–0.5 | >0.5 |
| Session depth (messages per session) | <2 | 2–5 | >5 |
| DAU/MAU ratio | <0.1 | 0.1–0.25 | >0.25 |

**Rule:** define the baseline before launch so you know what "working" looks like. Without a baseline, decisions are made on vibes.

---

**How to apply:** Load this at the start of any session involving analysis, architecture, product decisions, system design, or feature prioritization. Run all three passes. Apply the full framework before producing output, not after. The framework is not overhead — it is the work.
