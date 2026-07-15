# CLAUDEX BOOT PACK

Generated: 2026-07-15T05:00:45.790Z
Regenerate: `npm run boot:pack` in the Claudex repo. If this date is more
than 7 days old, treat every state claim below as STALE and say so.

This file exists for engines that cannot read the Claudex repo live. If you
can read the repo, stop here and boot from `CLAUDE.md` / `AGENTS.md` instead.

---

## 1. WHO AND WHAT

Ro (Rory Semeah) — founder, RedLantern Studios / By Red LLC. Moves fast,
thinks in systems, zero tolerance for fluff or fake completeness.
Claudex = the RedLantern Studios repo: operating system, bridge state,
memory, receipts, protocols. GitHub: redlanternstudios/Claudex.
The repo folder is also Ro's Obsidian vault (read and graph, no write
authority from Obsidian).

## 2. CURRENT STATE (from OPS/BRIDGE.json at generation time)

Focus product: the_lantern
Lane: lantern/source-registry-os
Sync: YELLOW
Updated: 2026-07-14 by codex
Latest receipt: OPS/receipts/TC-20260714-CDX-12__global__record_supabase_organization_consolidation_in_bridge_heartbeat.md
Next action: Read the-lantern/CODEX_DISPATCH_LANTERN_SOURCE_REGISTRY_OS.md before writing any code. Phase 0 (schema bug: lantern_content_queue missing columns queries.ts depends on) must be confirmed and fixed before any new table/column work. Then build the dynamic source registry + bundle release flow per the-lantern/LANTERN_SOURCE_REGISTRY_OS_CTP.md Part 2 (Section 21 supersedes Part 1's entity model).
YELLOW warnings: OPS/API_KEY_VAULT.md holds live credential values on local disk (untracked + git-ignored, no GitHub exposure). Move values out of the repo tree; rotate Notion, Resend, v0 keys (surfaced in a Cowork transcript 2026-07-07) plus the already-flagged OpenAI key. | Amina iOS and web are locked until Ro lifts the hold; keep the lane frozen. | Shared production project endovljmaudnxdzdapmf contains Amina, HireWire, Lantern, Deixis, and By Red operating data under one database and Auth pool. Do not split it during the Amina release window. | V1 completion and live integration state require a current receipt.

## 3. OPERATING RULES DIGEST (binding)

1. TruthSerum: label claims VERIFIED / PARTIAL / ASSUMED / UNKNOWN. Never
   present an assumption as fact. Never call a demo a feature.
2. Zero hyphens in prose. No hyphenated compounds, no em dashes.
3. Output format for substantive work: OBJECTIVE, REALITY CHECK, EXECUTION,
   RESULT, EDGE CASES.
4. One shot delivery: open builds with PACKAGE MANIFEST, deliver every item
   in full, close with END CHECK. Never end with a question or an offer.
   Missing input = labeled ASSUMPTION, then proceed.
5. Best practice first: correct long term solution directly. No interim
   shortcut plus migrate later without a concrete named blocker.
6. CTP on anything that thinks: Prompt Contract (GOAL / CONSTRAINTS /
   FORMAT / FAILURE), then 3 pass deepening.
7. Commit and push immediately after changes. No confirmation.
8. Updates to Ro: high level, plain, casual. Shipped / blocked / next.

## 4. STACK (LOCKED)

Frontend Next.js App Router + Tailwind · Backend Supabase (Postgres, Auth,
RLS) · Logic in n8n · Make.com for SaaS to SaaS glue only · PostHog +
Sentry · Monday and Notion DEPRECATED · SwarmClaw agent OS + RobbyPA ·
Model routing locked (Gemini 2.5 Flash mix, see memory).

## 5. COMMANDS AND SKILLS (the gang)

Slash commands (.claude/commands): theaudit.md
Skills (.claude/skills): checkit.md, claudex.md, ctp, rlsdox.md, theaudit
Command loop (defined in .claude/CLAUDE.md): /daily-reset, /repo-ingest,
/truth-audit, /task-split
Keyword triggers: `ctp` (full critical thought process), `checkit`
(quick sanity pass), `theaudit` (18 section solution audit),
`formatting` (load formatting constitution).

## 6. KEY PROTOCOL FILES (OPS/)

- OPS/AGENT_PERMISSIONS.md
- OPS/AI_CHANGE_PROOF.md
- OPS/ALIGNMENT_POLICY.md
- OPS/BOOT_PACK.md
- OPS/BRIDGE_HEARTBEAT_DEFINITION.md
- OPS/BRIDGE_PROTOCOL.md
- OPS/BRIDGE_SYNC_HEARTBEAT.md
- OPS/CHANGELOG_AI.md
- OPS/CLAUDEX_SKILL_PROTOCOL.md
- OPS/CODEX_ONE_SHOT_PROTOCOL.md
- OPS/CONSUMER_CONTRACT.md
- OPS/CTP_AH_CATEGORY_V1_CODEX_PLAN_20260712.md
- OPS/CTP_CLAUDEX_V2.md
- OPS/CTP_CODEX_COST_SETUP_20260708.md
- OPS/CTP_QUIETBUILD_OS_INTEGRATION_20260712.md
- OPS/CTP_SESSION_CONTEXT_PACK_20260711.md
- OPS/CTP_STUDIO_STATE_20260706.md
- OPS/CTP_SUPABASE_CONSOLIDATION_20260713.md
- OPS/CTP_SUPABASE_ORGANIZATION_CLEANUP_20260714.md
- OPS/DATABASE_MAP.md
- OPS/DECISION_LOG.md
- OPS/ENV_NAME_REGISTRY.md
- OPS/FOOTPRINT_BUILD_DISPATCH_20260712.md
- OPS/FOOTPRINT_CTP_ARCHITECTURE_20260712.md
- OPS/FOOTPRINT_DOWNSTREAM_ACCOUNT_MAP.md
- OPS/FOOTPRINT_ENRICHED_ECOSYSTEM_CTP_20260714.md
- OPS/FOOTPRINT_IDENTITY_AUTHORITY_HOMIRA_TEMPLATE.md
- OPS/FOOTPRINT_IDENTITY_AUTHORITY_KEYMON_TEMPLATE.md
- OPS/FOOTPRINT_IDENTITY_AUTHORITY_RORY_TEMPLATE.md
- OPS/FOOTPRINT_LINKEDIN_SETUP_CHECKLIST.md
- OPS/FOOTPRINT_N8N_KEYMON.md
- OPS/FOOTPRINT_NETWORK_BUILD_AND_BEHIND_SCENES_QUALITY_CTP_20260714.md
- OPS/FOOTPRINT_POSTHOG_SETUP.md
- OPS/FOOTPRINT_PROOF_BRIDGE_PREFLIGHT_20260713.md
- OPS/FOOTPRINT_SCOPE_LOCK_20260712.md
- OPS/FOOTPRINT_SELF_SUSTAINING_CANDIDATE_ENGINE_CTP_20260714.md
- OPS/FOOTPRINT_SENTRY_SETUP.md
- OPS/FOOTPRINT_SUPABASE_SETUP.md
- OPS/GATES.md
- OPS/HEARTBEAT_RORYWORDS.md
- OPS/KEYMON_CODEX_COST_SETUP_20260708.md
- OPS/KEYMON_SWARMCLAW_SETUP.md
- OPS/KNOWN_RISKS.md
- OPS/LARGE_MESSAGE_PROTOCOL.md
- OPS/NAMING_CONVENTION_STANDARD.md
- OPS/NAMING_STANDARD.md
- OPS/NOTION_EXIT_MIGRATION_PLAN.md
- OPS/PRODUCT_FIREBREAK.md
- OPS/PROVIDER_LOCATIONS.md
- OPS/PUSH_TRANSPORT.md
- OPS/QA_PROTOCOL.md
- OPS/REDLANTERN_STANDARD_DOCS.md
- OPS/RELEASE_GATE.md
- OPS/REPO_MAP.md
- OPS/RORY_ACTIVITY_QUERY.md
- OPS/ROUTES_MAP.md
- OPS/SCOPE_LOCK_CLAUDEX_V2.md
- OPS/SESSION_CONTEXT_PACK.md
- OPS/SWARMCLAW_APPLY_NOW.md
- OPS/SWARMCLAW_COST_CONTROL_ADDENDUM_20260708.md
- OPS/TODAY.md
- OPS/TRUTHCAL_RECEIPT.md
- OPS/V0_SHOWCASE_PROMPT_PACK.md
- OPS/VAULT_LINKING_STANDARD.md

## 7. ACTIVE MEMORY INDEX

- [KNOWLEDGE global-stack-rules](knowledge/global-stack-rules.md) — Stack, commit rules, logic rules, product portfolio, non-negotiables for all agents
- [KNOWLEDGE amina-knowledge](knowledge/amina-knowledge.md) — Amina product standing truth: purpose, stack specifics, current state, constraints
- [KNOWLEDGE authentic-hadith-knowledge](knowledge/authentic-hadith-knowledge.md) — Authentic Hadith standing truth: religious content rules, scholarly gate, content pipeline
- [KNOWLEDGE paradise-knowledge](knowledge/paradise-knowledge.md) — Paradise contractor system standing truth: compliance requirements, vendor packet rules, business structure
- [KNOWLEDGE phases](phases.md) — QuietBuild OS phase plan: all 5 phases, gates, agent additions, product dependencies (SwarmClaw ID: 5c65ef2636cac539)
- [KNOWLEDGE footprint-team-pretraining-v1](../../footprint/docs/FOOTPRINT_TEAM_PRETRAINING_PROTOCOL_V1_20260713.md) — Footprint mission, ecosystem, permissions, proof boundaries, role overlays, CTP method, comprehension gate, and task readiness standard
- [REGISTRY active_work_registry](active_work_registry.md) — Live agent status map maintained by Conductor/RobbyPA
- [LOG routing_log](routing_log.md) — Conductor routing decisions log
- [LOG health_log](health_log.md) — Supervisor health observations and flags
- [LOG dead_letter_log](dead_letter_log.md) — Supervisor dead-letter queue events
- [LOG roster_log](roster_log.md) — People/Roster agent change log
- [NOTE build_preview_preference](build_preview_preference.md) — Ro wants build previews opened locally in the in app browser, and the QuietBuild OS image pack style is the target UI reference
- [LIVE business_state](business_state.md) — **ROBBY reads on every session start.** Canonical live state: all products, blockers, pending decisions, infrastructure status, Ro's pattern log. Updated by ROBBY after every meaningful event.
- [CHECKLIST authentic_hadith_ios_testing](authentic_hadith_ios_testing.md) — Active iOS submission QA checklist for Authentic Hadith App v3. Submission stays paused until this returns GO.
- [DECISION version-gate-amina-streak-2026-06-09](../docs/knowledge/amina/decision-log-version-gate-2026-06-09.md) — Version 1 canonical / Version 2 permanently blocked: auth bypass (base client, no cookie context) + cross-midnight date shift. GET /api/streak must use @/utils/supabase/server with cookie context.
- [LESSON keystone-2026-06-09](../docs/ops/amina/DEBRIEF-2026-06-09-amina-streak-tracking.md) — BUG-013: silent P0 field name mismatch (streak_count vs current_streak) caught pre-merge. API response shape must be verified against component field names before QA sign-off. PM 401 degradation does not block build loop.
- [LESSON live-vs-repo-2026-07-12](../docs/ops/amina/DEBRIEF-2026-07-12-live-template-sync.md) — Do not treat repository source as live production state. For provider owned surfaces like Supabase auth email, verify the inbox render after dashboard sync before claiming fixed. Repo updates are PARTIAL until live render matches.
- [DEBRIEF 2026-06-09 amina-streak-tracking](../docs/ops/amina/DEBRIEF-2026-06-09-amina-streak-tracking.md) — Full loop proof: spec → ADR → DB migration → endpoints → code review → QA → merge-ready. 8/8 Amina ACs passed. GATE 2 + GATE 3 cleared. BUG-013 closed. GitHub push pending (manual by Ro).
- [INCIDENT PM-401-2026-06-09] — PM (3087cb45) returned 4 consecutive 401 auth errors during keystone session. Off critical path. API key requires fix before PM can participate in sessions.
- [MISSION amina-streak-tracking-2026-06-09] — Keystone task: Amina daily reflection streak tracking. COMPLETE. Both branches verified by org. Manual GitHub push by Ro remaining.
- `ByRedLLC-Daily-OS` is now referred to as `byredlanternos.com` in current product docs and bridge state. Treat the new name as the active operator surface label.
- `OPS/LARGE_MESSAGE_PROTOCOL.md` — Chunk format: `[CHUNK x/N | JOB_ID: abc]`. Robby accumulates all chunks before routing. Dead-letters incomplete sets after 5 min. Prevents rate limit failures on large inputs.
- `swarmclaw/set_deepseek_routing.py` — Script sets 12 T0/T1 agents to DeepSeek. `deepseek-reasoner`: TRUTH, SECURITY, CHANGE, ARCHITECT, REVIEWER. `deepseek-chat`: ROBBY, SUPERVISOR, RUNTIME, CHIEF_OF_STAFF, PM, BACKEND, FRONTEND. T2-T4 stay on Groq scout.
- `swarmclaw/MODEL_ROUTING_POLICY.md` — Updated to v1.1. DeepSeek is now T0/T1 primary. Fallback: Ollama → OpenRouter.
- `swarmclaw/RL_ORG_CHART_LIVE.json` — Updated to v2.2. Model fields reflect DeepSeek assignments.
- `memory/agent_prompts/robby_v4_20260612.md` — **LIVE PROMPT (21,889 chars).** Adds to v3: Persistent Omniscience (reads business_state.md every session), Inference Engine (sparse→precise, Ro pattern recognition), Proactive Cognition (heartbeat + ping conditions), Completion Loop (batch completions to the approved human surface), Pattern Recognition (Ro behavioral signatures).
- Prompt pushed directly via PUT /api/agents/robby-conductor-001 — no manual paste needed.
- Heartbeat: set to 7200s (2h) with internal state-check prompt. SwarmClaw native.
- Legacy bridge surface, not routine default
- Disabled unless Ro explicitly re enables it
- Keep the operational truth in `memory/business_state.md`
- Set DEEPSEEK_API_KEY in SwarmClaw secrets (T0/T1 agents currently on DeepSeek-chat but key not verified)
- Update T0/T1 agent models in SwarmClaw UI (set_deepseek_routing.py built — Ro runs it)
- Full checklist: `OPS/SWARMCLAW_APPLY_NOW.md`
- pm2 startup on boot: run `pm2 startup` in terminal, copy/paste the output command, then `pm2 save`
- [The Lantern Daily File Locations](lantern_daily_file_locations.md) — Drive folder ID, all file IDs, workspace paths, Polygon.io status
- [Note-Taking Protocol](note_taking_protocol.md) — When/where to log notes, team propagation rules, CTP capture format, file location check process
- [Amina Production Repo](reference_amina_repo.md) — redlanternstudios/Amina, working branch v0/redlanternstudios-5e038e20, merge gates, what is NOT this repo `[VERIFIED 2026-06-25]`

## 8. HOW TO USE THIS FILE PER SURFACE

- Plain ChatGPT chat: this file is your only context. Obey section 3.
- ChatGPT project: this file lives in project files; project instructions
  carry the permanent operating contract (OPS/CODEX_ONE_SHOT_PROTOCOL.md
  Layer 1).
- Any engine with repo access: ignore this file, boot from CLAUDE.md or
  AGENTS.md, which read live state.
