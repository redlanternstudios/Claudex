# STACK RULES — LOCKED
Version: 1.0 | Last reviewed: 2026-04-17
These rules are non-negotiable. Project instructions cannot override them.

---

## FRONTEND

**Technology:** Next.js (App Router) + Tailwind CSS + v0 for UI generation

**Rules:**
- App Router only. No pages/ directory patterns.
- No business logic in components. Components render and call.
- No data transformation in components. Fetch raw → display.
- No API calls from useEffect without error handling.
- Every async UI operation must have: loading state, error state, empty state.
- Tailwind only for styling. No inline styles. No CSS modules unless unavoidable.

**Forbidden:**
- Business logic in any component file
- Hardcoded data that should come from Supabase
- fetch() calls to external APIs directly from the client (must go through n8n or a server action)

---

## BACKEND / DATABASE

**Technology:** Supabase (Postgres + Auth + RLS + Storage)

**Rules:**
- RLS must be enabled on every table before it is used in production.
- Every new table requires at minimum: created_at timestamp, user_id or owner reference.
- Auth is Supabase Auth. No custom auth systems.
- Sensitive operations use Supabase service role only in server-side code, never client-side.
- All schema changes go through migration files. No direct schema edits in the dashboard for production.
- Foreign key relationships must be defined. No loose ID references.

**Forbidden:**
- Disabling RLS in production
- Service role key in any client-side code
- Direct dashboard schema edits to production without a corresponding migration file

---

## BUSINESS LOGIC LAYER

**Technology:** n8n (PRIMARY) — owns ALL multi-step business logic

**Rule: If it has more than 1 step and touches data, it belongs in n8n.**

**What belongs in n8n:**
- Job URL parsing (HireWire)
- Resume analysis and scoring (HireWire)
- Evidence matching (HireWire)
- Vendor approval workflow (Paradise)
- Contractor compliance checks (Paradise)
- Any AI processing chain
- Any workflow with conditional branching based on data
- Any workflow that writes to external systems

**What does NOT belong in n8n:**
- Simple webhooks with no logic (those can be API routes that call n8n)
- Static data lookups
- Auth flows

**API Routes (/api/*):**
- API routes are THIN. They receive a request, validate auth, and call n8n or Supabase.
- No business logic. No data transformation. No conditional branching based on business rules.
- If an API route is doing more than 10 lines of substantive logic, it is violating this rule.

**Forbidden:**
- Business logic in /api routes
- Multi-step workflows in /api routes
- AI calls directly from /api routes (must go through n8n)
- Client-side business logic

---

## INTEGRATIONS (SAAS-TO-SAAS)

**Technology:** Make.com (SECONDARY) — SaaS-to-SaaS integration only

**What belongs in Make.com:**
- Syncing data between two SaaS tools (e.g., Monday → Notion)
- Simple event routing (e.g., Sentry alert → Slack notification)
- Webhook pass-throughs with no logic

**What does NOT belong in Make.com:**
- Business logic (that's n8n)
- Data transformation (that's n8n)
- AI processing (that's n8n)

---

## ANALYTICS

**Technology:** PostHog (product analytics) + Sentry (error tracking)

**PostHog rules:**
- Every product must have a defined critical event taxonomy before instrumentation.
- Events must be named: `[product].[feature].[action]` (e.g., `hirewire.job_parser.completed`)
- Do not track pageviews as your primary signal. Track value-delivery events.

**Sentry rules:**
- Every Sentry error must include context: user_id, feature_name, last_action, environment.
- Implement via `beforeSend` hook — validate context before capture.
- Never leave Sentry at default configuration. Default captures nothing useful.

---

## PLANNING AND DOCUMENTATION

**Monday.com:** Execution state. Sprint tasks, status, owners, DoD.
**Notion:** Architecture knowledge, feature specs, decision logs, handoffs.
**GitHub:** Source of truth for all code. What is implemented is what is in the repo.

**Routing rule:**
- Task or sprint item → Monday
- Architecture decision → Notion
- Feature spec → Notion
- Code → GitHub
- Never duplicate information across systems — reference instead

---

## AI LAYER

**Claude:** Primary local execution engine (via Claude Code extension).
**ChatGPT:** Strategic thinking and exploration.
**Copilot:** Inline code suggestions (secondary, non-authoritative).

**Rule:** Claude's outputs are verified against the repo and these stack rules before being treated as ground truth. Claude can be wrong about what is in the codebase. Always verify with /repo-ingest.

---

## VIOLATION PROTOCOL

When Claude detects a stack rule violation in existing code:
1. Flag it immediately with: STACK VIOLATION — [rule violated] — [file:line]
2. State the risk (low/medium/high)
3. Provide the correct implementation
4. Do not proceed with building on top of a violation without flagging it first
