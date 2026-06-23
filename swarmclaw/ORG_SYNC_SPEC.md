# ORG SYNC SPEC
**Owner:** LIBRARIAN  
**SSOT:** `swarmclaw/RL_ORG_CHART_LIVE.json`  
**Version:** 1.0 | 2026-06-10  

---

## PURPOSE

`RL_ORG_CHART_LIVE.json` is the single source of truth for the SwarmClaw org.  
LIBRARIAN is responsible for keeping three downstream destinations in sync with it at all times.

No agent — including ROBBY — may unilaterally update a sync target directly.  
All changes flow: **local JSON → LIBRARIAN sync → all three destinations**.

---

## SYNC TARGETS

| Target | Type | Location | Format |
|--------|------|----------|--------|
| **GitHub** | File + version history | `RedLanternstudios/rl-infrastructure` → `swarmclaw/RL_ORG_CHART_LIVE.json` | JSON (identical to SSOT) |
| **Supabase** | Structured query layer | `infrastructure` project → `swarmclaw_agents` + `swarmclaw_rooms` tables | SQL upsert from JSON |
| **Google Drive** | Human-readable view | `RedLantern Studios/` folder → `RL Org Chart — Live` Google Doc | Formatted table, auto-replaced |

---

## TRIGGER CONDITIONS (when LIBRARIAN must sync)

LIBRARIAN runs a sync on **any** of the following events:

1. **Agent added** — new agent registered in SwarmClaw
2. **Agent updated** — prompt, model, role, pod, status, upstream, or downstream changes
3. **Agent removed** — agent deleted or deprecated from SwarmClaw
4. **Room added or renamed** — new channel created or existing channel renamed
5. **Pod restructured** — agents moved between pods
6. **Four Laws or RL stack rules updated** — changes to meta.four_laws or meta.rl_stack_rules
7. **Session handoff** — end of any significant build session (Ro or ROBBY signals close)
8. **Weekly cadence** — every Monday, whether or not changes occurred (freshness confirmation)

---

## SYNC PROTOCOL — STEP BY STEP

### Step 1: Validate SSOT

Before syncing, LIBRARIAN must:
- Confirm `RL_ORG_CHART_LIVE.json` is valid JSON (no syntax errors)
- Confirm `meta.last_updated` reflects current date
- Confirm `meta.updated_by` is set
- Confirm agent count in JSON matches `totals.total_agents`
- If validation fails → BLOCK sync, escalate to Ro

### Step 2: GitHub Sync

```
Action: Commit updated RL_ORG_CHART_LIVE.json to repo
Repo: RedLanternstudios/rl-infrastructure
Path: swarmclaw/RL_ORG_CHART_LIVE.json
Branch: main (direct — this is config, not product code)
Commit message format: "org: sync [date] — [change summary in ≤10 words]"
Example: "org: sync 2026-06-10 — SECURITY prompt updated, 36 agents verified"
```

Failure handling:
- Auth error → log to `/memory/sync_failure_log.md`, alert Ro
- Merge conflict (someone edited directly) → DO NOT overwrite, escalate to Ro

### Step 3: Supabase Sync

Database: `infrastructure` project (separate from Amina `endovljmaudnxdzdapmf` and TradeSwarm `rnvaagbvribokkhuutznc`)

**`swarmclaw_agents` table** — upsert all 36 agents:

```sql
-- Schema
CREATE TABLE swarmclaw_agents (
  id TEXT PRIMARY KEY,           -- swarmclaw_id
  name TEXT NOT NULL,
  role TEXT,
  pod TEXT,
  model TEXT,
  phase TEXT,
  status TEXT,
  org_spec BOOLEAN,
  authority TEXT,
  upstream TEXT[],
  downstream TEXT[],
  proof_log TEXT,
  notes TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Upsert pattern (per agent in JSON)
INSERT INTO swarmclaw_agents (id, name, role, pod, model, phase, status, org_spec, authority, upstream, downstream, proof_log, notes, updated_at)
VALUES (...)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  pod = EXCLUDED.pod,
  model = EXCLUDED.model,
  phase = EXCLUDED.phase,
  status = EXCLUDED.status,
  org_spec = EXCLUDED.org_spec,
  authority = EXCLUDED.authority,
  upstream = EXCLUDED.upstream,
  downstream = EXCLUDED.downstream,
  proof_log = EXCLUDED.proof_log,
  notes = EXCLUDED.notes,
  updated_at = NOW();
```

**`swarmclaw_rooms` table** — upsert all rooms:

```sql
CREATE TABLE swarmclaw_rooms (
  name TEXT PRIMARY KEY,
  channel_id TEXT,
  type TEXT,
  purpose TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

Failure handling:
- Connection error → log, retry once after 60s, then alert Ro
- Schema mismatch → DO NOT force insert, log exact error, escalate

### Step 4: Google Drive Sync

```
Target folder: RedLantern Studios/ (connected via Drive MCP, roryleesemeah@gmail.com)
Target doc name: "RL Org Chart — Live"
Format: Replace full document content with:
  - Header: "SwarmClaw Org Chart — {date} — {total} agents · {pods} pods"
  - Section 1: Agent table (Name | Pod | Role | Model | Status | Upstream | Downstream)
  - Section 2: Room table (Name | Type | Channel ID | Purpose)
  - Section 3: Four Laws (verbatim from JSON)
  - Section 4: RL Stack Rules (key/value)
  - Footer: "Last synced: {timestamp} by LIBRARIAN"
```

Failure handling:
- Drive MCP disconnected → log, skip Drive sync, complete GitHub + Supabase, note Drive as PENDING
- Permission error → alert Ro

---

## SYNC RECEIPT FORMAT

After every sync, LIBRARIAN writes to `/memory/sync_log.md`:

```
## Sync — {YYYY-MM-DD HH:MM}
- Trigger: [event that caused sync]
- SSOT validated: YES / NO
- GitHub: SUCCESS / FAILED (reason)
- Supabase: SUCCESS / FAILED (reason)
- Drive: SUCCESS / FAILED / SKIPPED (reason)
- Agent count synced: {n}
- Room count synced: {n}
- Change summary: [what changed vs. prior sync]
```

---

## FAILURE ESCALATION RULES

| Failure | Action |
|---------|--------|
| SSOT invalid JSON | Block all syncs. Alert Ro immediately. |
| 2+ sync targets fail | Alert Ro. Do not proceed. |
| 1 sync target fails | Log. Complete others. Retry failed target once. |
| Auth expired on any target | Log. Alert Ro. Mark target as NEEDS_REAUTH. |
| Schema drift in Supabase | Log exact error. Do NOT force insert. Escalate to ARCHITECT. |

---

## MANUAL SYNC COMMAND

Ro or ROBBY can trigger a manual sync at any time:

```
/librarian sync-org
```

LIBRARIAN must respond with sync receipt within the same session.

---

## DEDUPLICATION RULES

- GitHub: commit only if JSON differs from HEAD. If identical, skip commit (no empty commits).
- Supabase: upsert always — ON CONFLICT updates existing rows. No duplicates possible.
- Drive: full document replacement on every sync. No append logic. Always fresh.

---

## OPEN BLOCKERS (as of 2026-06-10)

1. **Supabase infrastructure project not yet created** — Task #5
2. **GitHub rl-infrastructure repo not yet created** — Task #4  
3. **Drive doc "RL Org Chart — Live" not yet created** — Task #6
4. **LIBRARIAN prompt does not yet include sync duty instructions** — needs LIBRARIAN prompt update in SwarmClaw

---

## NEXT ACTIONS

| # | Action | Owner | Blocker |
|---|--------|-------|---------|
| T4 | Create `RedLanternstudios/rl-infrastructure` on GitHub | Claude (Chrome MCP) | None |
| T5 | Create Supabase `infrastructure` project + apply schema | Claude (Supabase MCP) | None |
| T6 | Create "RL Org Chart — Live" doc in Drive + upload JSON | Claude (Drive MCP) | None |
| T7 | Update LIBRARIAN prompt in SwarmClaw with sync duty | Ro | None |
