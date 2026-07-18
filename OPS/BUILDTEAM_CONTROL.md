# Buildteam Control

This file is the fast orchestration entrypoint for `/buildteam`.

## Purpose

When a new chat starts, or when Ro asks for build coordination, Robby PA should:

1. Read the current chat.
2. Identify the real goal, constraints, and risks.
3. Pull the live SwarmClaw roster from `swarmclaw/RL_ORG_CHART_LIVE.json`.
4. Promote Robby PA as orchestrator.
5. Spawn only the subagents needed for the current task.
6. Use the badge art mapped in the roster file for every agent that surfaces in UI or logs.
7. Treat `/buildteam` as the canonical launch surface when the local ByRed app is in use.

## Source Of Truth

- Roster: `swarmclaw/RL_ORG_CHART_LIVE.json`
- Bridge: `OPS/BRIDGE.json`
- Agent prompts: `swarmclaw/rl_agent_prompts.md`
- Buildteam skill: `~/.codex/skills/buildteam/SKILL.md`
- Badge pack: `/Users/rorysemeah/.codex/visualizations/2026/07/17/019f6f28-ada4-7e63-b1d0-a721e2a94ae9/agent_badges_final/`

## Orchestration Rules

- Robby PA is always the conductor.
- Supervisor watches health and dead letters.
- Chief of Staff scopes work.
- Librarian stores truth.
- TechWriter turns completions into durable docs.
- If live chat speakers are capped, keep the full 36 as visible roster identities and use a companion session for overflow.
- Use explorer agents for facts.
- Use worker agents for bounded edits.
- Prefer parallel work when branches do not overlap.
- Do not spawn extra agents if one agent can finish cleanly.

## 36 Agent Roster

### Governance Spine
- ROBBY
- SUPERVISOR
- CHIEF_OF_STAFF
- LIBRARIAN
- TECHWRITER

### Product And Strategy
- PM
- DESIGNER
- RESEARCHER

### Build And Engineering
- ARCHITECT
- FRONTEND
- BACKEND
- DATA

### Quality And Release
- REVIEWER
- QA
- DEPLOY
- SRE

### Go To Market
- MARKETING
- BRAND_COPY
- ASO_SEO
- SUPPORT

### Operations And Business
- LEGAL
- FINANCE
- SALES
- PEOPLE_ROSTER

### Content And Hadith
- CONTENT_SOURCING
- SCHOLARLY_REVIEW
- EDITORIAL

### Execution And Guardrails
- DEBUG
- ACCESSIBILITY
- ANALYTICS
- CHANGE
- HANDOFF
- RUNTIME
- SECURITY
- TRUTH
- OBSERVE
- MAINTENANCE

## Badge Mapping

Every agent in the roster file now carries a `badge_art` path.

Example:
- ROBBY -> `01_ROBBY.png`
- SUPERVISOR -> `02_SUPERVISOR.png`
- CHIEF_OF_STAFF -> `03_CHIEF_OF_STAFF.png`
- LIBRARIAN -> `04_LIBRARIAN.png`
- TECHWRITER -> `05_TECHWRITER.png`

## Chat Start Behavior

On every fresh chat:

1. Read this file.
2. Read `OPS/BRIDGE.json`.
3. Read `swarmclaw/RL_ORG_CHART_LIVE.json`.
4. Identify the current work.
5. If the task needs depth, run CTP.
6. If the task benefits from parallelism, spawn the minimum useful subagents.
7. Keep Robby PA as orchestrator.
8. If the local build surface is available, start from `/buildteam` first.

## Fail State

If the roster, badge art, or workspace agent surface is unavailable, say so plainly and fall back to the best local control path.
