# THE AUDIT — SOLUTION AUDIT PROTOCOL v1.0
**RedLantern Studios build-reality standard · "Code out the ambiguity."**
Last reviewed: 2026-07-01 · Owner: Ro · Status: ACTIVE

---

## 0. WHAT THIS IS AND WHY IT EXISTS

CTP (Critical Thought Process) governs **thinking** — how we reason about a problem before we act.
The Audit (Solution Audit Protocol) governs **build reality** — the complete, living, de-ambiguated map of what a solution *is*, what it *does*, and what it still *needs*, at every level down to the individual button and click.

**The problem The Audit solves:** In fast, no-code / AI-native building, ambiguity accumulates faster than code. Screens get built with no backend. Buttons exist with undefined outputs. Automations fire with no failure path. Features get "done" that were never wired. The blueprint in your head drifts from the blueprint in the repo, and nobody can tell what is real.

**The Audit rule:** A solution is not defined until every page, feature, component, button, click, trigger, and notification has a stated input, output, state change, owner, and truth status. No element is allowed to be ambiguous. If it is ambiguous, it is `MISSING`, not "done."

The Audit produces one artifact per solution: the **Solution Audit** — a single source of truth that is *dynamically maintained* as the solution develops.

**Applies to:** every product, app, website, workflow, and automation in RedLantern Studios — Amina, TradeSwarm, HireWire, The Lantern, Paradise, Deixis, Daily OS, Authentic Hadith, the OS itself, and every future build. No exceptions.

---

## 1. RELATIONSHIP TO CTP AND PRODUCT INTEGRITY

The Audit does not replace CTP or the Product Integrity standard. It operationalizes them into a persistent map.

| Layer | Governs | Question it answers |
|---|---|---|
| **CTP** | Thinking | *Is this the right thing to build, and have we reasoned about it deeply?* |
| **The Audit** | Build reality | *What exists, what does each piece do, and what is still missing — with zero ambiguity?* |
| **Product Integrity** | Trust boundaries | *Is this actually product-ready, or just organized?* |

**Order of operations for any solution:**
1. **CTP** the decision (Prompt Contract → 3-pass → 10-layer → recommendation).
2. **The Audit** the solution (build/maintain the Solution Audit).
3. **Product Integrity gate** before anything is called product-ready.

CTP feeds Section 2 (North Star) and Section 4 (Truth Ledger). Product Integrity feeds Sections 11–16 (entities, states, control, receipts, failure, dedup).

---

## 2. MATURITY CLASSIFICATION GATE (RUNS FIRST — SETS REQUIRED DEPTH)

Before mapping, classify the solution. Classification sets *how granular the blueprint must be*. This is the "tiered by maturity" rule — ambiguity is coded out progressively, but the target is always full granularity.

| Class | Definition | Required blueprint depth |
|---|---|---|
| **CONCEPT** | Idea only. No build. | Sections 2, 3 (flow level), 6, 7 |
| **PROTOTYPE** | Something runs, not trustworthy. | + Sections 4, 5, 8, 9 at flow level |
| **PLAYBOOK** | Human-operated, repeatable, documented. | + Sections 10–16 at feature level |
| **PRODUCT-READY** | Governed, receipted, safe, owned. | **ALL sections at full component/button/click granularity** |

**Rule:** Nothing is classified PRODUCT-READY until every Section 11 I/O row is filled and every Section 15 control is defined. Classification is a claim; a claim without a filled blueprint is `ASSUMED`, not `VERIFIED`.

---

## 3. THE CANONICAL SOLUTION-AUDIT STRUCTURE (18 SECTIONS)

Every Solution Audit has these sections, in this order. This is the "10x" of the original ask — each of your bullets is expanded into a rigorous, de-ambiguating section.

| # | Section | Your original bullet it 10x's |
|---|---|---|
| 1 | **North Star** | North Star |
| 2 | **Truth Ledger** | (integrity spine — new) |
| 3 | **Surface Inventory (Solution Map)** | I/O of everything: pages/features/components/buttons/clicks |
| 4 | **Build State** | What's been built |
| 5 | **Emergent Work** | What needs to be built *because of* what's been built |
| 6 | **Backlog (Net-New)** | What needs to be built |
| 7 | **Integration Map** | What we need to integrate all that's been built |
| 8 | **Entity & Data Model** | (integrity — new) |
| 9 | **State Machines** | Starts/stops (states) |
| 10 | **Trigger / Hook / Loop Registry** | Triggers/hooks/loops/etc. |
| 11 | **Atomic I/O Contract Table** | Inputs/outputs of everything — the heart |
| 12 | **Notification Matrix** | Notifications internal/external |
| 13 | **Start / Stop / Kill Controls** | Starts/stops (controls) |
| 14 | **Control Layer** | (integrity — new) |
| 15 | **Receipts & Observability** | (integrity — new) |
| 16 | **Failure & Recovery + Dedup** | (integrity — new) |
| 17 | **Launch / Handoff Readiness** | (gate — new) |
| 18 | **Change & Decision Log** | (dynamic maintenance — new) |

---

## SECTION 1 — NORTH STAR

One screen. Never longer.

- **One-sentence outcome:** the single measurable change this solution creates for one user.
- **The user:** exactly who. Not "users." A named persona.
- **The job:** the job-to-be-done this solution is hired for.
- **Why now:** the category-timing reason this exists today (from CTP category ownership).
- **North Star metric:** the ONE number that proves the outcome. Baseline + target + measurement method.
- **Non-goals:** what this solution explicitly will NOT do. Ambiguity killer.

**De-ambiguation rule:** if the North Star metric has no measurement method, the solution has no North Star — it has a wish.

---

## SECTION 2 — TRUTH LEDGER (integrity spine)

Every claim about the solution is labeled. This is the spine that prevents fake completeness.

Statuses (locked vocabulary): `VERIFIED` · `PARTIAL` · `ASSUMED` · `PLANNED` · `MISSING` · `BROKEN`

| Claim | Status | Evidence / Receipt | Risk if wrong | What resolves it |
|---|---|---|---|---|

**De-ambiguation rule:** `VERIFIED` requires a receipt (URL, test result, screenshot, log, migration). No receipt → downgrade to `ASSUMED`. Polished language never upgrades a status.

---

## SECTION 3 — SURFACE INVENTORY (SOLUTION MAP)

The complete tree of everything a user or system can touch. Built top-down so nothing is orphaned.

```
Solution
└─ Surface (web app / mobile / website / workflow / automation / API)
   └─ Page / Route / Screen / Scenario
      └─ Section / Zone
         └─ Component
            └─ Interactive element (button / input / link / toggle / job step)
```

Every node gets: `ID · name · type · status · owner · links-to (parent/child) · flow it belongs to`.

**De-ambiguation rule (no orphans):** every element must connect to at least one flow (Section 10) and, if it produces or consumes data, at least one entity (Section 8). An element connected to nothing is flagged `ORPHANED` and either wired or deleted. No dead ends.

---

## SECTION 4 — BUILD STATE (WHAT'S BEEN BUILT)

Only things with a receipt. Everything real, nothing aspirational.

| Element / Feature | Class | Receipt | Wired end-to-end? | Notes |
|---|---|---|---|---|

**"Wired end-to-end?"** = UI → logic → data → back to UI, verified. `NO` here means the feature is `BROKEN` or `PARTIAL` in the Truth Ledger, regardless of how it looks.

**De-ambiguation rule:** "It renders" is not "it's built." Built = wired + receipted.

---

## SECTION 5 — EMERGENT WORK (BECAUSE OF WHAT'S BEEN BUILT)

The downstream work that *existing* build has created but not yet satisfied. This is the most-forgotten category and the biggest source of silent breakage.

Sources of emergent work:
- A UI built → its backend, validation, and error states now owed.
- A table created → its RLS, indexes, and cleanup jobs now owed.
- An automation added → its failure route, retry, dedup, and observability now owed.
- A feature shipped → its empty state, loading state, and edge cases now owed.
- An integration wired → its auth refresh, rate-limit handling, and webhook retries now owed.

| Trigger (what was built) | Emergent obligation created | Status | Blocks | Owner |
|---|---|---|---|---|

**De-ambiguation rule:** every row in Section 4 must be scanned against the "obligations owed" list. Unsatisfied obligation = a `MISSING` entry here, not a hidden bug waiting.

---

## SECTION 6 — BACKLOG (NET-NEW)

Work that is genuinely new, not emergent. Ranked by impact (CTP), not effort.

| Item | Class target | Impact | Depends on | First action | Maturity gate passed? |
|---|---|---|---|---|---|

**Maturity gate** (from `/task-split`): classified? DoD definable? dependencies known? risk classified? owner assignable? If any = no, the item stays in backlog and is NOT promoted to a build task.

---

## SECTION 7 — INTEGRATION MAP (WHAT CONNECTS TO WHAT)

Every internal and external connection required to make the built pieces work together.

| From | To | Type | Contract (payload/shape) | Auth / secret | Env var | Direction | Status | Failure owner |
|---|---|---|---|---|---|---|---|---|

Covers: Supabase, n8n, Make, Stripe, Vercel, external APIs, webhooks, MCPs, cross-product data flows.

**De-ambiguation rule (contract-first):** no integration is `VERIFIED` without a documented payload shape on both ends. "It calls the API" is not a contract. The exact request and response schema is the contract.

---

## SECTION 8 — ENTITY & DATA MODEL (integrity)

| Entity | Fields (name:type) | Ownership | Relationships | Lifecycle (create→archive) | RLS / access | SSOT? |
|---|---|---|---|---|---|---|

**De-ambiguation rule:** every entity names its SSOT. If two systems both write the "truth" of a field, that is a drift bug — declare one owner. Generation layers (AI, automations) must NOT silently create canonical truth (truth-chain rule).

---

## SECTION 9 — STATE MACHINES (STARTS / STOPS)

For every entity and every flow with more than one state.

Required per state machine:
- **States** (enumerated)
- **Transitions** (from → to, and the event that causes each)
- **Entry conditions** / **Exit conditions**
- **Blocked transitions** (explicitly disallowed)
- **Retry paths** · **Failure states** · **Cancel paths** · **Partial-completion states**

**De-ambiguation rule:** every state must have at least one entry and one exit, except terminal states which must be explicitly marked terminal. A state you can enter but not leave is a trap — flag `BROKEN`.

---

## SECTION 10 — TRIGGER / HOOK / LOOP REGISTRY

Every way the solution *starts doing something on its own or in response to something*.

| ID | Kind | Fires on | Entry condition | What it runs | Exit / stop condition | Idempotent? | Owner | Status |
|---|---|---|---|---|---|---|---|---|

`Kind` ∈ { user-action, page-load, webhook, cron/schedule, db-event, queue, n8n-trigger, make-trigger, AI-callback, timer, retry }.

**Loops get extra scrutiny:** every loop must declare its **exit condition** and **max iterations / timeout**. A loop without a stated exit is a runaway — flag `BROKEN` and do not ship.

**De-ambiguation rule (idempotency):** every trigger that writes to an external system must declare whether it is idempotent and, if not, its dedup key (see Section 16).

---

## SECTION 11 — ATOMIC I/O CONTRACT TABLE ★ THE HEART

This is where "code out the ambiguity at every level" lives. **Every interactive element** from Section 3 gets exactly one row. This table *is* the de-ambiguation engine.

**Canonical row schema (fill every column — blank column = ambiguity = not done):**

| Col | Meaning |
|---|---|
| **Element ID** | `surface.page.section.element` (stable address) |
| **Type** | page / route / feature / component / button / input / link / toggle / api / job-step |
| **Trigger** | what activates it (click / load / submit / change / webhook / cron / event) |
| **Precondition** | state that must be true to allow it (auth, role, feature flag, prior step) |
| **Inputs** | fields/params consumed + source + validation rule |
| **Action / Logic** | what happens + **where the logic lives** (n8n / Supabase / API route / client) |
| **Output** | data returned + UI change + navigation |
| **State change** | entity/flow state `from → to` (links to Section 9) |
| **Side effects** | writes, events fired, notifications sent, integrations called |
| **Success state** | what "it worked" looks like to the user and the system |
| **Error states** | each failure + the message + the recovery path (links to Section 16) |
| **Receipt** | the event/log/record proving it ran (links to Section 15) |
| **Owner** | who owns this element |
| **Status** | VERIFIED / PARTIAL / ASSUMED / PLANNED / MISSING / BROKEN |

**RLS stack rule reminder:** `Action / Logic` for business logic must resolve to **n8n**, never a client-side fake or an AI-logic API route. If a row's logic lives in the frontend, flag it — it violates the locked stack.

**De-ambiguation rules:**
- A **button** with a blank `Output` or blank `State change` is not designed — it is a placeholder. Mark `MISSING`.
- An **input** with a blank `validation` is an injection/garbage vector. Mark `MISSING`.
- Every row's `Error states` must be non-empty. "Happy path only" is banned.
- Every stateful row must name a `Receipt`. No receipt = cannot be `VERIFIED`.

---

## SECTION 12 — NOTIFICATION MATRIX (INTERNAL / EXTERNAL)

Every message the system sends to a human or another system.

| ID | Audience | Internal/External | Channel | Trigger (links §10) | Recipient rule | Template ref | Throttle / dedup | Failure fallback | Status |
|---|---|---|---|---|---|---|---|---|---|

Channels: email, push, SMS, in-app, Slack/Telegram, webhook, iMessage, agent-room.

**De-ambiguation rules:**
- Every notification names a **throttle** rule. Unthrottled notifications are a spam/abuse vector.
- Every external notification (to a customer) names a **failure fallback** (retry, queue, alert-on-fail).
- No notification fires without a stated **trigger** in Section 10. Orphan notifications are flagged.

---

## SECTION 13 — START / STOP / KILL CONTROLS

How every system, flow, and automation is turned on, off, paused, resumed, and emergency-stopped.

| System / Flow | Start mechanism | Normal stop | Pause / resume | Kill switch | Who can operate | Receipt on state change |
|---|---|---|---|---|---|---|

**De-ambiguation rule:** every automation and every loop must have a **kill switch** reachable by a human without a deploy. A system you cannot stop is a liability, not a feature.

---

## SECTION 14 — CONTROL LAYER (integrity)

Products govern action; they do not just act.

| Action | Allowed | Blocked | Requires review | Requires confirmation | Must be logged | Stays user-controlled |
|---|---|---|---|---|---|---|

Review gates are **required** when: truth is ambiguous · a field is sensitive · a legal/financial statement is involved · an inference is used · an action is irreversible · user expectation implies confirmation.

**De-ambiguation rule:** every irreversible or money/data-moving action must have either a confirmation or a review gate. "Fires immediately, silently" is banned for high-risk actions.

---

## SECTION 15 — RECEIPTS & OBSERVABILITY (integrity)

| Stateful action | Receipt fields | PostHog event | Sentry context | Log location | Business question the event answers |
|---|---|---|---|---|---|

**Minimum receipt standard:** timestamp · action attempted · inputs used · versions bound · outputs produced · confirmation observed · failure reason if failed.

**Instrumentation-as-moat rule (from CTP):** every event must answer a stated business question. If you cannot state the question, do not fire the event. Every high-risk / stateful Section 11 row must map to a receipt here.

---

## SECTION 16 — FAILURE & RECOVERY + DEDUPLICATION (integrity)

Per meaningful flow, define failure handling for the standard catalog:

auth missing · selector/UI drift · input unavailable · upload failure · partial completion · missing confirmation · unsupported target · duplicate attempt · retry ambiguity · rate limit · timeout · downstream 5xx.

| Flow | Failure mode | Detection | Recovery path | Retry policy | Dedup key | Residual risk |
|---|---|---|---|---|---|---|

**Dedup rule:** before any flow writes to an external system, its dedup key is defined here. Retries without a dedup key create duplicate side effects — banned.

---

## SECTION 17 — LAUNCH / HANDOFF READINESS

A gate, not a vibe. All must be `YES` (with receipt) to ship.

- [ ] North Star metric instrumented and baselined
- [ ] Every Section 11 row `VERIFIED` or explicitly deferred with owner + date
- [ ] Every state machine has no trap states
- [ ] Every integration contract documented both ends
- [ ] Every high-risk action has a control gate
- [ ] Every automation has a kill switch
- [ ] Every external notification has a failure fallback
- [ ] Every stateful action has a receipt
- [ ] Empty / loading / error states exist for every screen
- [ ] Dedup keys defined for every external write
- [ ] Handoff doc generated (who owns what post-launch)

**De-ambiguation rule:** an unchecked box is a launch blocker, not a nice-to-have. "We'll fix it after launch" requires a named blocker and a dated owner, per the Best-Practice-First rule.

---

## SECTION 18 — CHANGE & DECISION LOG (append-only)

Because solutions develop dynamically, the blueprint is worthless if it silently drifts.

| Date | Change | Section(s) touched | Decision / rationale | New truth status | By |
|---|---|---|---|---|---|

**Rule:** any change to the solution updates the Solution Audit in the same work session (the SwarmClaw/Claude session-close protocol). A Solution Audit not updated in the session it changed is `STALE` and must be re-audited before it is trusted.

---

## 4. HOW TO RUN The Audit (OPERATING LOOP)

**Command:** `/theaudit [solution]` (see `.claude/commands/theaudit.md`)

1. **Classify** (Section 2 gate) → sets required depth.
2. **Ingest** repo + memory + live URLs (reuse `/repo-ingest` outputs where they exist).
3. **Build the tree** (Section 3) top-down. No orphans.
4. **Fill the Atomic I/O table** (Section 11) — one row per element. This is 80% of the work and 100% of the value.
5. **Cross-wire**: every element → a flow (§10), an entity (§8), a receipt (§15), a failure path (§16).
6. **Run the four audits** (below).
7. **Emit** the Solution Audit in three surfaces: markdown SSOT, branded PDF, live dashboard.
8. **Session close:** update Section 18, downgrade any stale statuses.

### The four Audit passes (run every pass)
1. **Orphan audit** — any element/notification/trigger connected to nothing → flag.
2. **Blank-cell audit** — any blank column in Section 11 → `MISSING`.
3. **Trap-state audit** — any state you can enter but not leave → `BROKEN`.
4. **Fake-complete audit** — any `VERIFIED` without a receipt → downgrade to `ASSUMED`.

---

## 5. FAILURE CONDITIONS (a Solution Audit fails if…)

- Any interactive element has no I/O row.
- Any button/input has a blank output, state change, or validation.
- Any loop has no exit condition.
- Any automation has no kill switch.
- Any `VERIFIED` claim has no receipt.
- Any external write has no dedup key.
- Any notification has no throttle.
- Business logic lives in the frontend.
- The blueprint was not updated in the session the solution changed.

## 6. SUCCESS CONDITION

A Solution Audit succeeds when a competent builder who has never seen the solution can, from the blueprint alone, rebuild every screen, wire every button, fire every trigger, and know exactly what is real, what is missing, and what breaks — with zero questions asked.

---

*The Audit integrates [[critical-thought-process]] (thinking) and the RedLantern Product Integrity standard (trust boundaries). CTP first, The Audit always, Product Integrity gate before "product-ready."*
