# MEMORY INDEX — RedLantern Studios SwarmClaw Org
# Maintained by: Librarian agent
# Last updated: 2026-06-12 (ROBBY v4 live, business_state.md created, heartbeat wired)
# Max lines: 200 — Librarian compresses when approaching limit

---

## KNOWLEDGE (Standing Truth)

- [KNOWLEDGE global-stack-rules](knowledge/global-stack-rules.md) — Stack, commit rules, logic rules, product portfolio, non-negotiables for all agents
- [KNOWLEDGE amina-knowledge](knowledge/amina-knowledge.md) — Amina product standing truth: purpose, stack specifics, current state, constraints
- [KNOWLEDGE authentic-hadith-knowledge](knowledge/authentic-hadith-knowledge.md) — Authentic Hadith standing truth: religious content rules, scholarly gate, content pipeline
- [KNOWLEDGE paradise-knowledge](knowledge/paradise-knowledge.md) — Paradise contractor system standing truth: compliance requirements, vendor packet rules, business structure
- [KNOWLEDGE phases](phases.md) — QuietBuild OS phase plan: all 5 phases, gates, agent additions, product dependencies (SwarmClaw ID: 5c65ef2636cac539)

## OPERATIONAL LOGS (Live State)

- [REGISTRY active_work_registry](active_work_registry.md) — Live agent status map maintained by Conductor/RobbyPA
- [LOG routing_log](routing_log.md) — Conductor routing decisions log
- [LOG health_log](health_log.md) — Supervisor health observations and flags
- [LOG dead_letter_log](dead_letter_log.md) — Supervisor dead-letter queue events
- [LOG roster_log](roster_log.md) — People/Roster agent change log
- [LIVE business_state](business_state.md) — **ROBBY reads on every session start.** Canonical live state: all products, blockers, pending decisions, infrastructure status, Ro's pattern log. Updated by ROBBY after every meaningful event.

## DECISIONS

- [DECISION version-gate-amina-streak-2026-06-09](../docs/knowledge/amina/decision-log-version-gate-2026-06-09.md) — Version 1 canonical / Version 2 permanently blocked: auth bypass (base client, no cookie context) + cross-midnight date shift. GET /api/streak must use @/utils/supabase/server with cookie context.

## LESSONS

- [LESSON keystone-2026-06-09](../docs/ops/amina/DEBRIEF-2026-06-09-amina-streak-tracking.md) — BUG-013: silent P0 field name mismatch (streak_count vs current_streak) caught pre-merge. API response shape must be verified against component field names before QA sign-off. PM 401 degradation does not block build loop.

## DEBRIEFS

- [DEBRIEF 2026-06-09 amina-streak-tracking](../docs/ops/amina/DEBRIEF-2026-06-09-amina-streak-tracking.md) — Full loop proof: spec → ADR → DB migration → endpoints → code review → QA → merge-ready. 8/8 Amina ACs passed. GATE 2 + GATE 3 cleared. BUG-013 closed. GitHub push pending (manual by Ro).

## INCIDENTS

- [INCIDENT PM-401-2026-06-09] — PM (3087cb45) returned 4 consecutive 401 auth errors during keystone session. Off critical path. API key requires fix before PM can participate in sessions.

## MISSIONS

- [MISSION amina-streak-tracking-2026-06-09] — Keystone task: Amina daily reflection streak tracking. COMPLETE. Both branches verified by org. Manual GitHub push by Ro remaining.

---

## SESSION 2026-06-12 — SWARMCLAW UPGRADES

### Large Message Protocol
- `OPS/LARGE_MESSAGE_PROTOCOL.md` — Chunk format: `[CHUNK x/N | JOB_ID: abc]`. Robby accumulates all chunks before routing. Dead-letters incomplete sets after 5 min. Prevents rate limit failures on large inputs.

### DeepSeek Routing
- `swarmclaw/set_deepseek_routing.py` — Script sets 12 T0/T1 agents to DeepSeek. `deepseek-reasoner`: TRUTH, SECURITY, CHANGE, ARCHITECT, REVIEWER. `deepseek-chat`: ROBBY, SUPERVISOR, RUNTIME, CHIEF_OF_STAFF, PM, BACKEND, FRONTEND. T2-T4 stay on Groq scout.
- `swarmclaw/MODEL_ROUTING_POLICY.md` — Updated to v1.1. DeepSeek is now T0/T1 primary. Fallback: Ollama → OpenRouter.
- `swarmclaw/RL_ORG_CHART_LIVE.json` — Updated to v2.2. Model fields reflect DeepSeek assignments.

### ROBBY v4 — LIVE (pushed via API 2026-06-12)
- `memory/agent_prompts/robby_v4_20260612.md` — **LIVE PROMPT (21,889 chars).** Adds to v3: Persistent Omniscience (reads business_state.md every session), Inference Engine (sparse→precise, Ro pattern recognition), Proactive Cognition (heartbeat + ping conditions), Completion Loop (batch completions to Telegram), Pattern Recognition (Ro behavioral signatures).
- Prompt pushed directly via PUT /api/agents/robby-conductor-001 — no manual paste needed.
- Heartbeat: set to 7200s (2h) with internal state-check prompt. SwarmClaw native.

### Telegram Bridge — v2 (robby-telegram)
- **LIVE on pm2 id:1** — end-to-end tested 2026-06-12
- Heartbeat cron added to index.js: every 2h (08:00–22:00 MT), sends HEARTBEAT CHECK to ROBBY, forwards to Ro only if not ALL_CLEAR
- Bridge respects ALL_CLEAR suppression — silent when nothing needs attention

### Pending (Ro owns)
- Set DEEPSEEK_API_KEY in SwarmClaw secrets (T0/T1 agents currently on DeepSeek-chat but key not verified)
- Update T0/T1 agent models in SwarmClaw UI (set_deepseek_routing.py built — Ro runs it)
- Full checklist: `OPS/SWARMCLAW_APPLY_NOW.md`
- pm2 startup on boot: run `pm2 startup` in terminal, copy/paste the output command, then `pm2 save`

---
Last updated: 2026-06-12

- [The Lantern Daily File Locations](lantern_daily_file_locations.md) — Drive folder ID, all file IDs, workspace paths, Polygon.io status
- [Note-Taking Protocol](note_taking_protocol.md) — When/where to log notes, team propagation rules, CTP capture format, file location check process
- [Amina Production Repo](reference_amina_repo.md) — redlanternstudios/Amina, working branch v0/redlanternstudios-5e038e20, merge gates, what is NOT this repo `[VERIFIED 2026-06-25]`
