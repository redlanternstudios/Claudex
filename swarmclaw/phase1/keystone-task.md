# Phase 1 Keystone Task
# Product: Amina
# Feature: Daily Reflection Streak Tracking
# Purpose: Validate the complete Phase 1 org loop with all new agents active
# Date: 2026-06-08

---

## WHY THIS TASK

The keystone task must:
1. Touch enough of the org to prove contracts hold (PM → Architect → Engineering → Reviewer → QA → Ro → TechWriter → Librarian)
2. Be small enough to complete in one session
3. Be real product work, not a test fixture
4. Exercise the three new Phase 1 agents: Architect, Librarian, TechWriter

**Chosen feature:** Daily reflection streak tracking for Amina.
- Small enough to be Phase 1 appropriate
- Touches: schema (Data/DB), API (Backend), UI (Frontend), new table (RLS required), PostHog event
- Enough surface area to validate all handoff contracts

---

## KEYSTONE TASK DEFINITION

**Feature:** A user can see how many consecutive days they have logged a reflection. This count is visible on their home screen. Missing a day resets the streak to 0. The streak is calculated server-side, not client-side.

**Acceptance Criteria (PM produces these):**
1. A logged-in user can see their current streak count on the home screen
2. The streak increments when a reflection is submitted on a new calendar day
3. The streak resets to 0 if the user does not submit a reflection by end of calendar day (UTC)
4. The streak calculation lives in n8n — not in the API route
5. The home screen shows 0 if no reflections exist yet
6. PostHog event `streak_viewed` fires when home screen loads with a non-zero streak
7. Loading state present while streak fetches
8. Error state present if streak fetch fails (shows "--" not an error message to user)

---

## FULL LOOP WALKTHROUGH

### STEP 1 — Chief of Staff → Mission Brief

Chief of Staff receives intent from Ro: "Build streak tracking for Amina."

Mission brief written to: `memory/missions/2026-06-08-amina-streak-tracking.md`

```
Mission: amina-streak-tracking
Date: 2026-06-08
Product: Amina
Objective: Give users visibility into their daily reflection consistency via a streak counter
Scope: Streak calculation, persistence, and home screen display
Out of Scope: Streak notifications, badges, social sharing, leaderboards
Priority: NORMAL
Dependencies: Supabase Amina project accessible, n8n instance configured
Success Criteria: All 8 acceptance criteria verified by QA
KP Gates Required: Gate 1 (production merge), Gate 2 (deploy)
Handoff To: Conductor
```

TechWriter commits: `MISSION Amina 2026-06-08: Streak tracking mission brief`
Librarian stores: write signal accepted, MEMORY.md updated

---

### STEP 2 — Conductor → Routes to PM

Conductor reads mission brief. Checks active_work_registry.md — PM is IDLE.
Routes to PM. Logs routing decision.

```
Routing log entry:
2026-06-08T[TIME] | FROM: Chief of Staff | TO: PM | TASK: amina-streak-tracking | PRIORITY: NORMAL
```

---

### STEP 3 — PM → Spec

PM reads mission brief. Reads `memory/knowledge/amina-knowledge.md`.
Produces spec at: `docs/technical/amina/streak-tracking-spec.md`

**Handoff Contract:**
```
Artifact: streak-tracking-spec.md
Artifact Version: 1.0.0
Upstream Hash: [file hash]
Proof: Spec file exists at /docs/technical/amina/ with all 8 acceptance criteria
Consumer: Architect
Acceptance Criteria:
  - All 8 acceptance criteria are present and testable
  - n8n is specified as the home of streak calculation logic
  - PostHog event is named
  - Out of scope list is explicit
Failure Route: Back to PM — list which acceptance criteria are missing or ambiguous
```

TechWriter triggers on spec approval. Commits: `SPEC Amina 2026-06-08: Streak tracking v1.0.0`
Librarian stores spec reference in `/memory/specs/`.

---

### STEP 4 — Architect → ADR

Architect reads spec. Reads `memory/knowledge/global-stack-rules.md`. Reads `memory/knowledge/amina-knowledge.md`.
Runs collision check — Frontend and Backend are IDLE. Clear.

Produces ADR at: `docs/technical/amina/ADR-amina-streak-tracking.md`

**ADR Content:**
```
Context:
Users need to see their daily reflection streak. Calculation must be server-side
and live in n8n (stack rule). Streak must persist across sessions (requires DB).

Decision:
Add a `reflection_streaks` table to Supabase with: user_id, current_streak (int),
longest_streak (int), last_reflection_date (date), updated_at (timestamp).
n8n calculates streak on each reflection submission and writes the result.
Backend exposes a single GET /api/streak endpoint that reads from this table.
Frontend renders the value with loading and error states.

Alternatives Considered:
- Calculate streak in API route: Rejected — violates logic rule (n8n owns logic)
- Calculate streak client-side: Rejected — unreliable, can be manipulated
- Use existing reflections table to derive streak on read: Rejected — expensive query,
  n8n trigger approach is cleaner and cheaper at scale

Consequences:
+ Logic in n8n means streak calculation is testable and reusable
+ Dedicated table means cheap reads from frontend
- Requires n8n webhook trigger on reflection submission (dependency)
- Adds one more table to manage

Downstream Impact:
- Data/DB agent needs to create reflection_streaks table with RLS
- Backend agent wires GET /api/streak
- n8n requires a new flow: on-reflection-submitted → calculate-streak → write-to-table
- Future: streak notifications will read from this table

Related: streak-tracking-spec.md v1.0.0
```

**Handoff Contract (to Frontend + Backend simultaneously):**
```
Artifact: ADR-amina-streak-tracking.md
Artifact Version: 1.0.0
Upstream Hash: [file hash]
Proof: ADR committed to /docs/technical/amina/ with all required sections
Consumer: Frontend + Backend + Data/DB
Acceptance Criteria:
  - ADR includes all 6 required sections
  - n8n responsibility explicitly stated
  - RLS policy proposed for reflection_streaks table
  - No application code in ADR
Failure Route: Back to Architect — list which sections are missing
```

TechWriter triggers on ADR creation (HIGH — immediate commit).
`ADR Amina 2026-06-08: Streak tracking system design v1.0.0`
Librarian stores.

---

### STEP 5 — Data/DB → Schema + RLS

Data/DB reads ADR. Creates migration.

Migration: `supabase/migrations/20260608_amina_reflection_streaks.sql`

```sql
-- Up
create table public.reflection_streaks (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  current_streak integer not null default 0,
  longest_streak integer not null default 0,
  last_reflection_date date,
  updated_at timestamp with time zone default now(),
  unique(user_id)
);

-- RLS
alter table public.reflection_streaks enable row level security;

create policy "Users can view own streak"
  on public.reflection_streaks for select
  using (auth.uid() = user_id);

create policy "Service role can write streaks"
  on public.reflection_streaks for all
  using (auth.role() = 'service_role');

-- Down
drop table if exists public.reflection_streaks;
```

Read-back confirmation: query table structure after migration runs.

**Handoff Contract:**
```
Artifact: 20260608_amina_reflection_streaks.sql
Artifact Version: 1.0.0
Proof: Migration executed + read-back confirmed + RLS policies verified under anon and authenticated auth states
Consumer: Backend, QA
Acceptance Criteria:
  - Table exists with correct columns
  - RLS: authenticated user can only SELECT their own row
  - RLS: service role can INSERT/UPDATE (needed for n8n webhook)
  - Migration has down path
Failure Route: Back to Data/DB — list which policies are missing or wrong
```

TechWriter commits: `ADR Amina 2026-06-08: reflection_streaks schema + RLS v1.0.0`

---

### STEP 6 — Backend → GET /api/streak

Backend reads ADR + confirms Data/DB migration complete.
Creates: `app/api/streak/route.ts`

```typescript
// GET /api/streak
// Returns the current user's streak from reflection_streaks table
// Logic lives in n8n — this route only reads the result

import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = createRouteHandlerClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data, error } = await supabase
    .from('reflection_streaks')
    .select('current_streak, longest_streak, last_reflection_date')
    .eq('user_id', user.id)
    .single()

  if (error && error.code !== 'PGRST116') { // PGRST116 = no rows (valid state)
    // Log to Sentry
    return NextResponse.json({ error: 'Failed to fetch streak' }, { status: 500 })
  }

  return NextResponse.json({
    current_streak: data?.current_streak ?? 0,
    longest_streak: data?.longest_streak ?? 0,
    last_reflection_date: data?.last_reflection_date ?? null
  })
}
```

Branch: `backend/amina/streak-api`

**Handoff Contract:**
```
Artifact: PR #[N] — backend/amina/streak-api
Artifact Version: 1.0.0
Proof: PR with endpoint list showing auth + rate limiting + error handling
Consumer: Reviewer (Robby)
Acceptance Criteria:
  - Auth check present (returns 401 if not logged in)
  - No business logic in route (reads only — n8n writes)
  - Error handling present and non-leaking
  - Returns 0 gracefully if no streak row exists
Failure Route: Back to Backend with specific issues listed
```

---

### STEP 7 — Frontend → Streak UI Component

Frontend reads ADR + confirms Backend branch exists.
Creates streak component. Branch: `frontend/amina/streak-display`

Component requirements (from spec):
- Loading state while fetching
- Error state showing "--" (not an error message)
- Zero state: shows "0 days" not blank
- PostHog event `streak_viewed` fires when non-zero streak loads

**Handoff Contract:**
```
Artifact: PR #[N] — frontend/amina/streak-display
Artifact Version: 1.0.0
Proof: PR description confirming loading/error/zero states, no business logic, PostHog event present
Consumer: Reviewer (Robby)
Acceptance Criteria:
  - Loading, error, and zero states all implemented
  - No business logic in component
  - PostHog event fires correctly
  - Mobile tested
Failure Route: Back to Frontend with specific missing states or violations
```

---

### STEP 8 — Reviewer (Robby) → Code Review

Reviews both PRs (Backend + Frontend) against review checklist.

Expected: Both pass (no logic in routes, auth present, RLS respected, no secrets).

**Pass → handoff to QA with both PRs.**

TechWriter commits review notes if any significant findings.

---

### STEP 9 — QA → Test Execution

QA runs test plan against review-passing PRs.

Test cases against all 8 acceptance criteria:
- Happy path: submit reflection → streak increments ✓
- Zero state: new user sees "0 days" ✓
- Error state: API unavailable → "--" shown ✓
- Loading state: present during fetch ✓
- Reset: missing a day → streak resets to 0 (requires n8n trigger test)
- PostHog: `streak_viewed` fires on non-zero load ✓
- Auth: logged-out user gets 401, no streak data exposed ✓
- Mobile: streak display correct on mobile viewport ✓

Results saved to: `docs/qa/amina/streak-tracking-test-2026-06-08.md`

**Handoff Contract:**
```
Artifact: QA results — streak-tracking-test-2026-06-08.md
Artifact Version: 1.0.0
Proof: All 8 acceptance criteria have test results (pass/fail) documented
Consumer: Release + Ro (approval gate)
Acceptance Criteria:
  - All 8 criteria verified
  - No open P0 or P1 bugs
Failure Route: Back to relevant Engineering agent with bug list and severity
```

TechWriter commits immediately: `QA Amina 2026-06-08: Streak tracking test results`
Librarian stores.

---

### STEP 10 — Ro Approval Gate (Gate 1)

Conductor surfaces QA results + both PRs to Ro for approval before merge.

Gate 1: Before any production merge.

Ro approves → merges proceed.
If Ro doesn't respond in 4h → Supervisor pings again.

---

### STEP 11 — TechWriter → Mission Documentation

After Ro approves, TechWriter produces:

1. `DEBRIEF Amina 2026-06-08: Streak tracking keystone task`
   - What shipped: streak table, GET /api/streak, streak UI component
   - Handoffs executed: 9 handoffs, 0 rejections, 0 dead-letters
   - Librarian queries: [count] successful reads by 2+ agents
   - Upstream mutation test: [result]
   - Lessons surfaced: [any patterns found]

2. Any lessons learned written to `memory/lessons/`

Librarian stores all documents. MEMORY.md updated.

---

### STEP 12 — Loop Closes

Support channel now has a surface to route streak-related user issues.
QA results and ADR available to any future agent working on Amina streak features.
Librarian holds all artifacts. Next cycle starts with full context.

---

## WHAT THIS PROVES

If all 12 steps complete cleanly:
- Handoff contract v2 works in practice
- TechWriter commits on correct triggers without being asked
- Librarian receives and stores write signals from multiple agents
- Librarian responds to read queries from downstream agents
- Upstream mutation rule is understood by Architect
- Dead-letter queue was not needed (proof by absence of dead-letters)
- Concurrent execution model handled simultaneous Frontend/Backend handoffs correctly
- Phase 1 acceptance criteria can be checked
