# LIVING SOLUTION BLUEPRINT — [SOLUTION NAME]
**Class:** CONCEPT / PROTOTYPE / PLAYBOOK / PRODUCT-READY
**Owner:** · **Last reviewed:** · **Spec:** The Audit v1.0 · **Status:** ACTIVE
> Fill every cell. A blank cell is ambiguity. Ambiguity = MISSING, not "done."

---

## 1 — NORTH STAR
- **Outcome (1 sentence):**
- **The user (named persona):**
- **Job-to-be-done:**
- **Why now:**
- **North Star metric:** baseline __ → target __ · measurement: __
- **Non-goals:**

## 2 — TRUTH LEDGER
| Claim | Status | Evidence / Receipt | Risk if wrong | What resolves it |
|---|---|---|---|---|
| | VERIFIED/PARTIAL/ASSUMED/PLANNED/MISSING/BROKEN | | | |

## 3 — SURFACE INVENTORY (SOLUTION MAP)
```
[Solution]
└─ [Surface: web/mobile/site/workflow/automation/API]
   └─ [Page/Route/Screen]
      └─ [Section/Zone]
         └─ [Component]
            └─ [button/input/link/toggle/job-step]
```
| Element ID | Name | Type | Status | Owner | Flow it belongs to |
|---|---|---|---|---|---|

## 4 — BUILD STATE (what's been built — receipts only)
| Element / Feature | Class | Receipt | Wired end-to-end? | Notes |
|---|---|---|---|---|

## 5 — EMERGENT WORK (because of what's been built)
| Trigger (what was built) | Emergent obligation created | Status | Blocks | Owner |
|---|---|---|---|---|

## 6 — BACKLOG (net-new, ranked by impact)
| Item | Class target | Impact | Depends on | First action | Maturity gate passed? |
|---|---|---|---|---|---|

## 7 — INTEGRATION MAP
| From | To | Type | Contract (payload/shape) | Auth/secret | Env var | Direction | Status | Failure owner |
|---|---|---|---|---|---|---|---|---|

## 8 — ENTITY & DATA MODEL
| Entity | Fields (name:type) | Ownership | Relationships | Lifecycle | RLS/access | SSOT? |
|---|---|---|---|---|---|---|

## 9 — STATE MACHINES
**[Entity/Flow name]** — States: __ · Terminal: __
| From | To | Event | Entry cond | Exit cond | Blocked? | Retry | Failure | Cancel | Partial |
|---|---|---|---|---|---|---|---|---|---|

## 10 — TRIGGER / HOOK / LOOP REGISTRY
| ID | Kind | Fires on | Entry condition | What it runs | Exit/stop condition | Idempotent? | Owner | Status |
|---|---|---|---|---|---|---|---|---|

## 11 — ATOMIC I/O CONTRACT TABLE ★ (one row per element — fill EVERY column)
| Element ID | Type | Trigger | Precondition | Inputs (+source+validation) | Action/Logic (where it lives) | Output | State change (from→to) | Side effects | Success state | Error states (+recovery) | Receipt | Owner | Status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|

## 12 — NOTIFICATION MATRIX
| ID | Audience | Int/Ext | Channel | Trigger (§10) | Recipient rule | Template ref | Throttle/dedup | Failure fallback | Status |
|---|---|---|---|---|---|---|---|---|---|

## 13 — START / STOP / KILL CONTROLS
| System / Flow | Start | Normal stop | Pause/resume | Kill switch | Who operates | Receipt on change |
|---|---|---|---|---|---|---|

## 14 — CONTROL LAYER
| Action | Allowed | Blocked | Requires review | Requires confirmation | Must be logged | User-controlled |
|---|---|---|---|---|---|---|

## 15 — RECEIPTS & OBSERVABILITY
| Stateful action | Receipt fields | PostHog event | Sentry context | Log location | Business question answered |
|---|---|---|---|---|---|

## 16 — FAILURE & RECOVERY + DEDUP
| Flow | Failure mode | Detection | Recovery path | Retry policy | Dedup key | Residual risk |
|---|---|---|---|---|---|---|

## 17 — LAUNCH / HANDOFF READINESS (all YES + receipt to ship)
- [ ] North Star metric instrumented + baselined
- [ ] Every §11 row VERIFIED or deferred with owner+date
- [ ] No trap states
- [ ] Every integration contract documented both ends
- [ ] Every high-risk action has a control gate
- [ ] Every automation has a kill switch
- [ ] Every external notification has a failure fallback
- [ ] Every stateful action has a receipt
- [ ] Empty/loading/error states for every screen
- [ ] Dedup keys for every external write
- [ ] Handoff doc generated

## 18 — CHANGE & DECISION LOG (append-only)
| Date | Change | Section(s) | Decision / rationale | New truth status | By |
|---|---|---|---|---|---|
