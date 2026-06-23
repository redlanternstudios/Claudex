# SWARMCLAW DISPATCH — AMINA
Dispatched: June 13 2026 | Scope Lock: SCOPE_LOCK_AMINA_v1.md
Priority: EXECUTE NOW — scope is locked, build begins

---

## SCOPE LOCK REFERENCE

Scope is locked at: `/workspace/SCOPE_LOCK_AMINA_v1.md`
Full solution design: `/workspace/AMINA_SOLUTION_DESIGN_v1.md`
Keymon brief: `/workspace/KEYMON_BRIEF_AMINA_DAY2.md`
Critical thought process: `/workspace/.claude/os/CRITICAL_THOUGHT_PROCESS.md`

All agents must read SCOPE_LOCK_AMINA_v1.md before acting on this product. Scope is fixed. Feature additions require user story + AC + DoD before implementation.

---

## ENTITIES (CTP-LEVEL)

### Core entities and their owners:

| Entity | Table | Owner Agent | State |
|---|---|---|---|
| User | profiles | AUTH agent | registered / onboarded / churned |
| Conversation | conversations | AI agent | active / completed / abandoned |
| Message | messages | AI agent | sent / cited / share_eligible |
| User Memory | user_memory | MEMORY agent | extracted / surfaced / stale |
| Journal Entry | journal_entries | JOURNAL agent | draft / saved / milestone |
| Du'a | duas | COMMUNITY agent | active / answered / hidden / reported |
| Du'a Ameen | dua_ameens | COMMUNITY agent | given |
| Room | rooms | COMMUNITY agent | active / inactive |
| Notification | push_queue | NOTIFY agent | pending / sent / failed |
| Waitlist | waitlist | GROWTH agent | captured |
| Share Card | share_cards | GROWTH agent | generated / sent / converted |

---

## STATE MODELS

### Conversation states:
`created` → `active` (first message sent) → `completed` (user closes / inactivity 10min) → `archived`
- On `completed`: trigger memory extraction n8n flow
- Failure state: `orphaned` (memory extraction failed) → retry once → log to Sentry

### Du'a states:
`draft` → `posted` → `answered` (user marks) OR `hidden` (5+ reports → auto-hide)
- `hidden` does NOT delete — keeps in DB for mod review
- `answered` fires celebration moment + PostHog event

### User retention states (21-day sequence):
`onboarded` → `day1-3_trust` → `day4-7_journaling` → `day8-14_social` → `day15-21_memory` → `retained`
- If any transition fails: user enters at-risk state
- OBSERVE agent monitors DAU/MAU and flags users stuck in early states

---

## ASSIGNED AGENTS

| Track | Agent | First Action |
|---|---|---|
| Frontend | FRONTEND (Keymon) | Fix P0: hamburger regression |
| Backend schema | ARCHITECT | Create Amina Supabase project + run migrations |
| AI integration | AI | Wire /api/chat with Amina system prompt + citation enforcement |
| Memory extraction | AUTOMATOR | Build n8n memory extraction flow |
| Notifications | AUTOMATOR | Build n8n du'a ameen notification flow |
| Observability | OBSERVE | Configure PostHog + Sentry in Amina project |
| Documentation | TECHWRITER | Keep AMINA_SOLUTION_DESIGN_v1.md current as build progresses |

---

## BUILD SEQUENCE (ordered, dependencies explicit)

**Phase 0 — Unblock (Keymon)**
1. Fix P0 frontend bugs
2. Fix P1 frontend bugs
3. Remove dead UI

**Phase 1 — Backend Foundation (ARCHITECT)**
1. Create Amina Supabase project
2. Run schema migrations (profiles, conversations, messages, journal, rooms, duas, dua_ameens, waitlist)
3. Seed hadith data (export from AuthenticHadith project: `nqklipakrfuwebkdnhwg`)
4. Seed Quran data (see SWARMCLAW_DISPATCH_QURAN.md)
5. Wire Amina /api/chat endpoint
6. Configure Supabase RLS on all tables

**Phase 2 — AI Layer (AI agent)**
1. Write Amina system prompt with scope guardrails
2. Wire citation enforcement (every response cites hadith/Quran or states none available)
3. Wire topic classifier (keyword-based MVP for share suppression)
4. Write memory extraction prompt (3-5 themes per conversation)
5. Test 20 conversations manually — verify citations are correct before share feature

**Phase 3 — Community Layer (AUTOMATOR + FRONTEND)**
1. Du'a Wall backend (tables already from Phase 1)
2. Supabase realtime subscription for ameen counts
3. Frontend Du'a Wall UI (Keymon)
4. Report flow → hide at 5 reports (auto-trigger already in schema)

**Phase 4 — Observability (OBSERVE)**
1. PostHog configured with all 15 events from AMINA_SOLUTION_DESIGN_v1.md
2. Sentry configured with user_id + conversation_id tags
3. Weekly retention report setup

---

## CONTROL LAYER

**What is allowed without Ro review:**
- Frontend bug fixes
- Schema migrations (additive only)
- Seed data additions
- n8n flow builds

**What requires Ro review before execution:**
- System prompt changes
- Citation enforcement logic changes
- Any change to the Islamic scope guardrails
- Any RLS policy changes
- Any data deletion logic

**What requires scope lock version bump:**
- Any new feature not in SCOPE_LOCK_AMINA_v1.md
- Any removal of a locked feature

---

## RECEIPT REQUIREMENTS

Every phase completion requires a receipt:
- Screenshot or test output confirming the work
- Logged to AMINA_BUILD_LOG.md (create if not exists)
- Format: `[DATE] [PHASE] [AGENT] [ACTION] [RESULT] [VERIFIED BY]`

---

## FAILURE HANDLING

| Failure | Response |
|---|---|
| Memory extraction fails | Log to Sentry, retry once, mark conversation `orphaned`, do not surface broken memory to user |
| Citation not found | Amina responds without citation, flags with: "I don't have a specific citation for this" — never fabricates |
| Du'a ameen notification fails | Log to n8n error log, do not retry more than once — notification is not critical path |
| Share card generation fails | Hide share button gracefully, log to Sentry — never show broken card |
| Supabase realtime disconnects | Reload ameen count on next page focus — silent graceful degradation |

---

*This dispatch is the SwarmClaw execution brief for Amina. Refer to AMINA_SOLUTION_DESIGN_v1.md for full product spec. Refer to SCOPE_LOCK_AMINA_v1.md for change management rules.*
