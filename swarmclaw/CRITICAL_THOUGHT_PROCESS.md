# REDLANTERN STUDIOS — CRITICAL THOUGHT PROCESS
**Version: 2.0 | Owner: Ro | Status: MANDATORY OPERATING STANDARD**
**Upgraded: 2026-06-10 | Previous: v1.1**
**Applies to: ALL of RedLantern Studios — every product, every agent, every domain. No exceptions.**

---

## DIRECTIVE

Every substantive output from any SwarmClaw agent must pass through this framework before handoff.
Partial completion = incomplete output = handoff rejected.
This is not optional. It is part of the handoff contract.

**v2.0 changes:** Added Section 0 (Quick Reference), Section 11 (Agent Application Guide), Section 12 (Live Product Context). Enriched all sections with product-specific examples, real known failure modes, and agent-specific responsibilities.

---

## SECTION 0 — QUICK REFERENCE

### When to Apply Full 10-Layer Analysis

| Trigger | Full Required? |
|---|---|
| New feature spec | YES — all 10 layers |
| Schema change | YES — all 10 layers |
| Architecture decision | YES — all 10 layers |
| Bug fix touching core logic | YES — all 10 layers |
| New agent, MCP, or integration added | YES — all 10 layers |
| Minor bug fix (isolated, no data impact) | ABBREVIATED — Layers 1, 2, 6, 7, 8, 9 minimum |
| Routine content / copy task | ABBREVIATED — Layers 1, 3, 7 minimum |
| Handoff between agents | ALWAYS — Sections 5 + 6 mandatory regardless |

**Abbreviated = still structured output.** It is not permission to skip. It is permission to apply the 6 most relevant layers instead of 10. Label which layers you ran.

### TruthSerum Labels — Mandatory on Every Claim

Every factual claim in any output must carry one of:
- `VERIFIED` — confirmed against a named source (file path, API response, test result, Supabase row count)
- `ASSUMED` — inferred from context, not confirmed
- `PARTIAL` — some but not all components confirmed
- `UNKNOWN` — cannot be determined with available information
- `PLANNED` — intended but not built
- `BROKEN` — exists but does not function correctly

No unlabeled claims. An unlabeled claim is treated as ASSUMED. ASSUMED with no verification path = automatic handoff rejection.

---

## SECTION 1 — PROBLEM STATEMENT

State the problem or decision in one precise paragraph.
- No solution language in this section
- No assumptions stated as facts
- Label the type:

| Type | Definition | Examples |
|---|---|---|
| `ARCHITECTURAL` | Changes structure that other components depend on | DB schema, API contracts, agent routing rules |
| `PRODUCT` | Changes user-facing behavior or core promise | Evidence matching logic, chat UI, Circle feature |
| `OPERATIONAL` | Changes how the team or system runs | Agent prompts, handoff contract, MCP config |
| `FINANCIAL` | Has direct cost or revenue implications | Broker credentials, paid API tiers, billing |
| `STRATEGIC` | Changes direction of a product or portfolio | Pausing HireWire, Alif submission, TradeSwarm paper → live |
| `EXECUTION` | Standard build task with defined scope | Wiring a UI component, creating a Supabase table, fixing a bug |
| `COMPLIANCE` | Legal, regulatory, or religious constraint | Hadith content rules, Paradise vendor compliance, RLS |

- If the problem is unclear: surface the ambiguity before proceeding. Do not begin Section 2 on an unclear problem statement.

---

## SECTION 2 — 10-LAYER ANALYSIS

Apply to every major point. All 10 layers. No skipping on full-required triggers.

| Layer | Name | Question | Who Owns This Layer |
|---|---|---|---|
| 1 | Surface | What does this appear to be at face value? | All agents |
| 2 | Root Cause | Why does this exist or happen? | DEBUG, ARCHITECT, TRUTH |
| 3 | First-Order Consequence | What happens immediately if we act or don't act? | PM, BACKEND, FRONTEND |
| 4 | Second-Order Consequence | What does that first consequence cause next? | ARCHITECT, PM |
| 5 | Third-Order Consequence | What compounds from there? What is the cascade? | ARCHITECT, TRUTH |
| 6 | Upstream Dependencies | What must be true, built, or stable for this to work? | BACKEND, DATA, ARCHITECT |
| 7 | Downstream Dependencies | What breaks if this is wrong? Who is the downstream consumer? | PM, QA, REVIEW |
| 8 | Failure Modes | How does this break? Under what conditions? At what scale? | DEBUG, SECURITY, QA |
| 9 | Recovery Paths | When it breaks: is recovery possible? What restores it? | DEBUG, DEPLOY, BACKEND |
| 10 | Strategic Implication | What does this mean for the broader system in 6–24 months? | ROBBY escalates to Ro |

**If a layer is unanswerable:** Label it `UNKNOWN` and state exactly what information resolves it.
Unknown is not a failure. Unacknowledged unknown is.

### Product-Specific Layer 2 Examples (Root Cause — seed these, do not ignore)

**Amina — chat partition broken:**
Not a rendering bug. Root cause: two competing tables (`companion_conversations` vs `amina_conversations`) — table naming conflict from a prior schema iteration. Canonical = `amina_*` prefix per NORTH_STAR.md. Fix = wire UI to `amina_conversations`, deprecate `companion_conversations`.

**TradeSwarm — schema drift:**
Root cause: tables created via Supabase dashboard directly, not through migration files. Result: `evidence_library` and `job_scores` have no CREATE TABLE in `/supabase/migrations/`. Fix = baseline recovery migration before any schema work.

**HireWire — open questions persist:**
Root cause: `/repo-ingest` never run. Every feature row in `project_memory.md` is ASSUMED, not VERIFIED. Fix = run `/repo-ingest` on `rsemeah/HireWireInGroup` before any build work restarts.

---

## SECTION 3 — ASSUMPTIONS AUDIT

| # | Assumption | Label | Risk If Wrong | How to Verify | Override Path If False |
|---|---|---|---|---|---|
| A1 | [assumption] | VERIFIED / PARTIAL / ASSUMED / UNKNOWN | [what breaks] | [test or source] | [path forward] |

Rules:
- Every assumption must be labeled before output
- VERIFIED requires a named source (file path, row count, API call result — not "it was discussed")
- High-risk assumptions (wrong = project fails) must have an explicit override path
- UNKNOWN with no verification path = escalate to Ro before proceeding

### High-Risk Assumption Categories by Product

**Amina:**
- Which Supabase table is canonical (NORTH_STAR.md resolves: `amina_*` prefix wins always)
- Whether Circle tables exist (PLANNED — not VERIFIED until BACKEND confirms creation)
- Chat UI table pointer (ASSUMED `amina_conversations` — BACKEND must verify in code)

**TradeSwarm:**
- `ALPACA_PAPER=true` must remain true until Ro explicitly approves T33 — NEVER assume live mode
- Supabase env vars exist in `.env.local` — must VERIFY before engine runs (currently ⚠️ UNVERIFIED)
- TruthSerum is real, not a stub — VERIFIED in `services/truthserum/index.ts`
- Yahoo Finance is blocked by TruthSerum — do not attempt to use it

**HireWire (PAUSED):**
- All feature rows in `project_memory.md` are ASSUMED — treat as UNKNOWN until `/repo-ingest` runs
- OQ-004 (hallucination guard) is OPEN — if no guard exists, this is a legal risk before any demo

**Authentic Hadith:**
- Hadith authenticity, grading, attribution = NEVER agent-verified. Always UNKNOWN until human scholar sign-off received and documented with scholar name + date.

---

## SECTION 4 — UPSTREAM / DOWNSTREAM LOGIC CHAIN

```
[Upstream trigger / input]
        ↓  [what travels: data / decision / artifact / signal]
[This decision / component]
        ↓  [what travels]
[Immediate downstream effect]
        ↓  [what travels]
[Secondary downstream effect]
        ↓
[Terminal state or loop-back]
```

Rules:
- Every node names its producer and consumer
- Dead ends = labeled `DEAD END` = flagged gaps — not acceptable in a shipped product
- Loops = labeled `FEEDBACK LOOP` = evaluated: healthy (self-correcting) or dangerous (self-amplifying)

### Standard Chain Templates

**Feature Build Chain:**
```
Ro intent → Chief of Staff (mission brief)
        ↓  scoped mission
ROBBY (route + assign)
        ↓  task assignment
PM (spec + AC + DoD)
        ↓  approved story
ARCHITECT (ADR if non-trivial)
        ↓  architecture decision
DATA (schema) + FRONTEND (UI) + BACKEND (API)
        ↓  branch + PR
REVIEW → QA → Ro approve → DEPLOY
        ↓  merge + ship
OBSERVE (production monitoring)
        ↓  signals
PM + Chief of Staff (next cycle)  ← FEEDBACK LOOP (healthy)
```

**Bug Fix Chain:**
```
Error signal (Sentry / user report / agent discovery)
        ↓  error + context
DEBUG (root cause + fix diff)
        ↓  fix diff + proof
REVIEW (PASS / FLAG / REJECT)
        ↓  approved diff
DEPLOY (ship)
        ↓  deploy confirmation
OBSERVE (confirms fix in prod)
        ↓  resolved signal
TECHWRITER (documents root cause + resolution)  ← close the loop
```

**TradeSwarm Trade Decision Chain:**
```
Market data (Polygon.io daily OHLCV — V1 only, no intraday)
        ↓  OHLCV signal
HMM regime classifier
        ↓  regime label (bull/bear/neutral)
Kelly position sizing
        ↓  position size
Preflight safety gates (fail-closed — NEVER bypass)
        ↓  PASS or BLOCK
GROQ multi-model deliberation
        ↓  deliberation result
TruthCal™ SHA-256 proof bundle (IMMUTABLE — do not modify schema)
        ↓  receipt
Trade execution (Alpaca PAPER only until T33 Ro-approved)
        ↓  fill confirmation
Supabase persistence
        ↓  stored receipt
OBSERVE (monitors outcomes)  ← FEEDBACK LOOP (healthy)
```

---

## SECTION 5 — ACCEPTANCE CRITERIA

```
AC-01: [verifiable condition — binary pass/fail]
AC-02: [verifiable condition]
AC-03: [verifiable condition]
```

Rules:
- Binary only — pass or fail, not "mostly done"
- No subjective criteria ("looks good" is not an AC)
- Every AC has a named verification method
- "It renders" is not an AC. "It renders with real data from `amina_conversations` where `user_id = auth.uid()`" is an AC.

### AC Templates by Agent

**BACKEND AC format:**
```
AC-B01: Table [name] exists in Supabase [project_id] — verified via: SELECT tablename FROM pg_tables WHERE tablename = '[name]'
AC-B02: RLS enabled on [table] — verified via: SELECT rowsecurity FROM pg_tables WHERE tablename = '[name]'
AC-B03: Insert succeeds as authenticated user — verified via: test insert with real auth token, confirm row created
AC-B04: Insert blocked as unauthenticated user — verified via: test insert without auth header → expect 401/403
```

**FRONTEND AC format:**
```
AC-F01: Component renders with real data (not mock/hardcoded) — verified via: Network tab shows Supabase query
AC-F02: Loading state shown during fetch — verified via: throttle network, confirm skeleton/spinner appears
AC-F03: Error state shown on failed fetch — verified via: kill network, confirm error UI appears (not blank/crash)
AC-F04: User name is dynamic — verified via: grep codebase for hardcoded name strings (zero "Candace" or persona names)
```

**QA AC format:**
```
AC-Q01: RLS blocks non-member from accessing [resource] — verified via: authenticate as user B, attempt to read user A's data → expect empty result
AC-Q02: Data persists across page reload — verified via: insert row, reload, confirm row present
AC-Q03: Realtime update received within 3 seconds — verified via: insert from session A, confirm update in session B
```

---

## SECTION 6 — DEFINITION OF DONE

The complete state of the world when this work is genuinely finished:

- [ ] All acceptance criteria passed (reference AC numbers explicitly)
- [ ] All artifacts produced and named (file path + version)
- [ ] All handoffs completed with proof (handoff contract v2, all 7 fields populated)
- [ ] All downstream agents or systems notified (name them explicitly)
- [ ] Memory updated: TECHWRITER committed decision, LIBRARIAN stored it
- [ ] No open failure states (all Section 8 mitigations confirmed active)
- [ ] Receipt exists confirming completion (timestamp + artifact hash or commit SHA)

**A task is not done because work was performed. It is done when every item above is checked.**

### Product-Specific DoD Additions

**All Amina work:**
- [ ] No hardcoded user names (grep confirms zero "Candace" or persona name strings)
- [ ] Brand colors used: Soft Cream `#F7F2EB`, Dusty Rose `#D6AAA3`, Soft Olive `#8E9878`, Muted Gold `#D7BA82`
- [ ] Faith reactions only on posts — no generic emoji reactions

**All TradeSwarm work:**
- [ ] `ALPACA_PAPER=true` confirmed in active env before any order execution
- [ ] TruthCal™ receipt generated for every trade decision (SHA-256, not skipped)
- [ ] Yahoo Finance not referenced anywhere in new or modified code (grep confirms)

**All HireWire work (when unpaused):**
- [ ] No resume claim exists that cannot be traced to a user evidence item
- [ ] OQ-004 hallucination guard confirmed active before any generation runs

**All Authentic Hadith content:**
- [ ] Human scholar name + sign-off date documented before content moves to Editorial
- [ ] No agent-authored hadith authenticity, grading, or attribution claim in any output

---

## SECTION 7 — CONSTRUCTIVE CRITICISM

What makes this stronger?

- Weakest point in current thinking: [identify specifically]
- Highest-leverage improvement available: [state it]
- What is over-engineered (complexity without proportional value): [identify]
- What is under-engineered (simplicity that creates future risk): [identify]
- One addition that would materially increase probability of success: [state it]

Rules:
- Must challenge the work, not validate it
- Generic praise banned ("this looks solid" = rejected, return with specific critique)
- Every criticism names a specific fix
- If you cannot identify a weakness, that is itself a red flag — look harder

---

## SECTION 8 — DESTRUCTIVE CRITICISM

Steelman every path to failure.

```
Failure Mode: [what breaks]
Trigger Condition: [what causes it]
Probability: LOW / MEDIUM / HIGH
Impact: LOW / MEDIUM / HIGH / CATASTROPHIC
Detection: [how would we know this is happening]
Mitigation: [what prevents it]
Recovery: [what restores the system]
Residual Risk: [what risk remains after mitigation]
```

Rules:
- Do not skip LOW-probability / CATASTROPHIC-impact failures
- Every CATASTROPHIC failure path must have mitigation before work proceeds
- No mitigation = label `UNMITIGATED RISK` = escalate to Ro immediately

### Known Failure Modes by Product (Seed These — Run Against Every Relevant Output)

**Amina — Shared DB Risk:**
```
Failure Mode: HireWire RLS bug leaks Amina user data (or vice versa)
Trigger: Incorrect RLS policy on shared table in endovljmaudnxdzdapmf
Probability: MEDIUM
Impact: CATASTROPHIC (user data exposure, trust destroyed, app pulled)
Detection: QA test — authenticate as HireWire user, attempt to query amina_ tables
Mitigation: RLS default deny on all tables, explicit per-role grants only, QA gate on every new table
Recovery: Audit all rows accessed, notify affected users, split DB immediately
Residual Risk: Until DB is split, one misconfigured RLS policy = both products exposed
```

**TradeSwarm — Paper → Live Transition:**
```
Failure Mode: Agent executes live trade before T33 approved by Ro
Trigger: ALPACA_PAPER=true removed or overridden without explicit Ro approval
Probability: LOW (locked in env)
Impact: CATASTROPHIC (real capital loss, regulatory exposure)
Detection: IBroker interface paper-mode assertion fires on every order
Mitigation: Hard assertion in IBroker before any order — paper mode confirmed or order blocked
Recovery: Immediately cancel order if live, document incident, restore paper mode
Residual Risk: Alpaca allows paper→live switch in dashboard — must be Ro-only action
```

**HireWire — Hallucination Leak:**
```
Failure Mode: Resume generated with experience user never provided
Trigger: No hallucination guard on generation (OQ-004 OPEN and unresolved)
Probability: HIGH (open question, unverified)
Impact: CATASTROPHIC (false credentials, legal liability, core product promise broken)
Detection: Test: minimal evidence input → generate → verify output contains only evidence items
Mitigation: Generation governance layer (40 runs exist — verify it is blocking, not logging-only)
Recovery: Pull all generated resumes, add guard, regenerate
Residual Risk: Resumes already submitted to employers cannot be recalled
```

**SwarmClaw — Phase 1 Keystone Not Run:**
```
Failure Mode: Agents produce outputs that never get consumed (orphaned artifacts)
Trigger: Handoff contract not enforced — no named consumer, no dead-letter queue active
Probability: HIGH (keystone task not confirmed executed as of 2026-06-10)
Detection: Check /memory/routing_log.md — if empty or absent, keystone has not run
Mitigation: Run Phase 1 keystone task, confirm all 11 ACs pass before Phase 2
Recovery: Retroactively apply handoff contract to in-flight work
Residual Risk: Without Librarian active, decisions made across sessions are permanently lost
```

---

## SECTION 9 — FINAL RECOMMENDATION

```
RECOMMENDATION:       [single sentence — what to do]
CONFIDENCE:           [LOW / MEDIUM / HIGH] — [one line reason]
PRECONDITIONS:        [what must be true before acting]
FIRST ACTION:         [single next physical action — specific enough to execute immediately]
DECISION DEADLINE:    [when this must be decided and what happens if delayed]
ALTERNATIVES REJECTED:[what was considered and why not recommended]
```

Rules:
- One recommendation. Not options. Pick one.
- If genuinely between two paths: state that + name the single piece of information that resolves it
- No hedging without a resolution path
- "FIRST ACTION" must be executable without further clarification — if it needs clarification, that question is the first action

### ROBBY-Specific Routing Recommendation Format

When ROBBY routes a task, the recommendation section must include:

```
ROUTED TO:       [agent name + ID]
ROUTING REASON:  [one sentence — why this agent, not another]
PRIORITY:        CRITICAL / HIGH / NORMAL
QUEUE POSITION:  [if agent ACTIVE — what queues ahead of this]
PROOF REQUIRED:  [what receiving agent must produce to confirm task complete]
ESCALATION PATH: [who gets it if receiving agent fails after 3 retries]
```

---

## SECTION 10 — ROI / KPI FRAMEWORK

Every decision has measurable consequences.

**Financial KPIs (where applicable):**
| KPI | Baseline | Target | Measurement Method | Review Cadence |
|---|---|---|---|---|
| TradeSwarm paper return | $0 (not started) | Positive return on $2k bankroll | TruthCal™ receipts vs paper account balance | Per trade batch |
| API cost per agent task | UNKNOWN | Define after 1 week live | SwarmClaw budget tracking | Weekly |
| Supabase cost | UNKNOWN | <$25/mo during dogfood | Supabase dashboard | Monthly |

**Proxy KPIs:**
| KPI | Baseline | Target | Measurement Method | Review Cadence |
|---|---|---|---|---|
| Routing accuracy rate | UNKNOWN | ≥95% | Routing log audit | Weekly |
| Dead-letter queue depth | UNKNOWN | 0 per week | Dead-letter log | Weekly |
| Handoff rejection rate | UNKNOWN | <10% | Handoff contract audit | Per sprint |
| Phase 1 keystone completion | 0/11 ACs | 11/11 | AC checklist | This sprint |
| Assumption verification rate | UNKNOWN | 100% labeled | Template audit | Per output |
| Open question close rate | 0/5 HireWire OQs open | 100% before build restarts | Open questions log | Per session |
| Amina chat fix | BROKEN since Day 3 | Fixed + QA confirmed | QA sign-off | Immediate |

**Compounding / Intangible KPIs:**
| KPI | What It Measures | Basketball Equivalent | Review Cadence |
|---|---|---|---|
| Assumption verification rate | % of assumptions caught and labeled before compounding downstream | Taking a charge before it becomes a 3-point play | Per output |
| Decision reversibility score | Are decisions keeping options open or closing them | Setting a screen that creates two options, not one | Per major decision |
| Agent trust score | % of agent outputs that pass handoff without revision | A point guard whose reads the team executes without hesitation | Weekly |
| Doctrine coverage | % of decisions made from established principles vs ad hoc | Executing a set play vs freelancing under pressure | Weekly |
| Dead knowledge ratio | % of memory/docs that are stale and actively misleading | Ball movement that looks active but produces nothing | Monthly |
| Handoff quality score | Context completeness across agent-to-agent transfers | A perfect skip pass that arrives in rhythm | Per handoff |
| Failure pattern recurrence | Are we making the same class of mistake twice | Giving up the same baseline drive twice in a game | Monthly |
| Scope creep detection rate | How early we catch scope expanding beyond DoD | Recognizing the mismatch before it becomes a run | Per sprint |

Rules:
- Every analysis produces at least one KPI from at least two of the three categories
- KPIs must have a baseline (UNKNOWN is acceptable if stated explicitly)
- KPIs must have a measurement method — if unmeasurable, it is not a KPI
- KPIs reviewed at defined cadence — they do not self-update

---

## SECTION 11 — AGENT APPLICATION GUIDE

How each agent applies this framework. Read your section. Apply it every time.

### ROBBY (Conductor / Runtime)
- Run Sections 1 + 9 on every routing decision
- Section 1: classify work type before routing — do not route ambiguous requests, surface ambiguity first
- Section 9: use ROBBY-specific routing format above on every routing output
- Section 3: label every assumption about agent availability VERIFIED (check active_work_registry.md) or ASSUMED
- Do not run Sections 2, 7, 8 on routing decisions — those belong to specialist agents
- Your enforcement job: reject any handoff missing `Framework Applied: CRITICAL_THOUGHT_PROCESS v2.0`

### PM (Product Manager)
- Run full 10-layer on every new story or feature spec
- Section 1: state the user problem, not the solution. Never lead with the implementation.
- Section 5: write ACs using FRONTEND/BACKEND/QA templates — no subjective criteria
- Section 6: DoD must include product-specific additions for the relevant product
- Section 3: every product assumption (is a feature built? is data real?) must be labeled — NEVER assume VERIFIED without a source
- Section 7: challenge your own spec — what is the weakest AC? What is the easiest way for FRONTEND to misread this?
- Section 8: name the most likely failure mode and its mitigation for every story
- Gate: do not hand a story to ARCHITECT or engineering without Ro approving the AC set first

### ARCHITECT
- Full 10-layer on every ADR
- Layer 6 (upstream dependencies) is your most critical layer — name every system that must be stable
- Layer 7 (downstream dependencies) — name every agent and system that depends on your decision
- Layer 8 — every CATASTROPHIC failure mode must have mitigation before ADR is signed off
- Section 4 (logic chain) is mandatory on all architectural decisions — no ADR without a chain

### BACKEND / DATA
- Full 10-layer on schema changes; abbreviated acceptable on routine query work
- Section 3: is RLS enabled? VERIFIED requires the SQL query result. Not "yes I enabled it."
- AC-B01 through AC-B04 templates are mandatory on every new table
- Layer 6: what tables or APIs does this schema depend on?
- Layer 7: what frontend components or downstream agents break if this schema changes?

### FRONTEND
- Full 10-layer on new screens; abbreviated on component wiring
- AC-F01 through AC-F04 are mandatory — especially AC-F04 (dynamic names)
- Layer 3: what does the user experience if this fails silently?
- Section 6 DoD: loading states, error states, and dynamic data are never optional

### SECURITY
- Full 10-layer always. No exceptions.
- Layer 8 is your core deliverable — failure modes, probability, impact
- Shared DB risk (Amina/HireWire in `endovljmaudnxdzdapmf`): always surface until DB is split

### TRUTH
- Your job: run Section 8 on every other agent's output before ROBBY marks it done
- Known failure mode seeds above are your starting checklist — do not skip them
- You pass or you flag. Flag = return to producer with specific fix instructions.
- You never approve your own work. You audit others.

### QA
- AC-Q01 through AC-Q03 templates are your base test suite
- Section 6 DoD is your sign-off checklist — you do not pass until every item is checked
- Product-specific DoD additions are not optional
- Test as a real user, not an agent — RLS tests must use actual auth tokens

### DEBUG
- Layer 2 (root cause) is your core job — do not stop at Layer 1 (surface)
- Do not propose a fix until root cause is confirmed with a named source
- Format: Root Cause (VERIFIED: [source]) → Fix Diff → Recovery Path → Residual Risk
- A fix that doesn't address root cause is a patch. Label it as a patch.

### DEPLOY
- Section 6 DoD is your deploy checklist — every item checked before merge
- Ro approval gate is mandatory before any merge to main. No exceptions. No exceptions.
- Receipt = Vercel deploy URL + timestamp + commit SHA

### OBSERVE
- Primary KPIs: error rate, dead-letter depth, agent trust score
- Surface anything matching the known failure modes in Section 8 above
- Route to ROBBY with CRITICAL priority for: CATASTROPHIC failure triggers, production data exposure, live trade risk (TradeSwarm paper mode violation)

---

## SECTION 12 — LIVE PRODUCT CONTEXT

Reference state as of 2026-06-10. Updated after each meaningful session by TECHWRITER.

| Product | Status | DB | Repo | Immediate Blocker |
|---|---|---|---|---|
| Amina | DOGFOOD — ACTIVE | `endovljmaudnxdzdapmf` | `rsemeah/redlanternstudios` | Chat bug (Track B) — DEBUG dispatch not confirmed |
| TradeSwarm | PRE-LIVE — Sprint 1 partial | Supabase keys ⚠️ UNVERIFIED | `redlanternstudios/TradeSwarm` | Steps 1–2: FRED key inject + Supabase verify |
| HireWire | PAUSED (intentional) | `endovljmaudnxdzdapmf` | `rsemeah/HireWireInGroup` | 3 Ro Decision Records pending → Keymon blocked |
| Authentic Hadith | ACTIVE | `nqklipakrfuwebkdnhwg` | — | UAT mandatory (LL-014); iOS submission blocked |
| Paradise | ACTIVE — blocked | — | — | Basheer: CSLB bond, GL insurance, WC insurance, W-9 |

**Shared DB risk (ACTIVE):** Amina and HireWire share `endovljmaudnxdzdapmf`. RLS is the only isolation layer. Until DB is split, this risk must appear in Section 8 of every BACKEND and SECURITY output touching either product.

**Cowork → Supabase MCP mismatch:** Cowork `.mcp.json` → `mlmrdkiyxlngmwhdtrln` (By Red / Daily OS). SwarmClaw Supabase MCP (`b6ba97f1`) → `endovljmaudnxdzdapmf` (Amina / HireWire). Different databases. Fix `.mcp.json` project ref before any Cowork-direct Supabase work on Amina.

**SwarmClaw Phase 1 keystone:** NOT confirmed executed as of 2026-06-10. 11 acceptance criteria unchecked. Do not authorize Phase 2 work until all 11 pass.

**ROBBY active work registry:** `/memory/active_work_registry.md` — check before routing any new task.

---

## ANTI-PATTERNS — AUTOMATIC HANDOFF REJECTION

If any of these are present, the handoff is rejected and returned to producer:

| Anti-Pattern | Rejection Reason |
|---|---|
| Layers 1-3 only, presented as complete | Layers 4-10 are where real risk lives |
| Assumption stated as fact without TruthSerum label | Breaks truth chain |
| Subjective acceptance criteria | Cannot be verified |
| Recommendation with no first action | Planning theater |
| CATASTROPHIC failure mode with no mitigation | Unmanaged existential risk |
| KPI with no measurement method | Vanity metric |
| Downstream dependency unnamed | Orphaned work |
| DoD without receipt | Fake completeness |
| "It renders" as an AC | Not binary — not verifiable |
| Hardcoded user name in Amina UI | Brand violation + product integrity failure |
| TruthSerum re-stubbed without Ro approval | Core IP violation |
| Hadith content without human scholar sign-off | Religious integrity violation |
| Live trade attempted before T33 Ro-approved | Financial and regulatory exposure |
| Missing `Framework Applied` field in handoff | Automatic dead-letter |

---

## INTEGRATION WITH HANDOFF CONTRACT V2

Every handoff must reference this framework:

```
HANDOFF CONTRACT
─────────────────────────────────────────
Artifact:             [the thing produced — PR, doc, dataset, decision]
Artifact Version:     [semantic version — increment on any change]
Upstream Hash:        [commit SHA or file hash at handoff time]
Proof:                [evidence of completion — test result, file path, log, row count]
Consumer:             [exact next role or Ro — never "whoever"]
Acceptance Criteria:  [reference AC numbers — specific and testable]
Failure Route:        [back to producer with fix instructions, OR Supervisor after 3rd retry]
─────────────────────────────────────────
Framework Applied:    CRITICAL_THOUGHT_PROCESS v2.0
Sections Completed:   [list all sections run]
Sections Abbreviated: [list + reason]
Sections UNKNOWN:     [list + what resolves each]
TruthSerum Labels:    [list: VERIFIED / ASSUMED / PARTIAL / UNKNOWN / PLANNED / BROKEN as used]
```

Any handoff missing `Framework Applied: CRITICAL_THOUGHT_PROCESS v2.0` = automatic dead-letter.

---

*v1.1 initialized: 2026-06-09 | Source: Ro directive via Claude Cowork*
*v2.0 upgraded: 2026-06-10 | Enriched: product context, agent application guides, live state, known failure modes, TruthSerum labels, chain templates*
*Next review: when framework version increments or Ro directs update*
*Owner: Ro | Maintained by: TECHWRITER | Referenced by: All agents*
