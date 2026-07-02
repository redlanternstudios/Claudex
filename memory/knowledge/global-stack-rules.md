# Knowledge: Global Stack Rules
# Product: global (all products)
# Last verified: 2026-06-08
# Maintained by: Librarian (writes) + Ro (approves changes)

---

## Standing Truth

### Stack (VERIFIED — LOCKED)
- Frontend: Next.js (App Router) + Tailwind CSS
- Backend: Supabase (Postgres + Auth + RLS)
- Business Logic: n8n — ALL logic lives here, no exceptions
- SaaS Integrations: Make.com only
- Product Analytics: PostHog (critical events only — not every click)
- Error Tracking: Sentry (errors with full context — not warnings)
- Agent OS: SwarmClaw localhost:3456 | OpenClaw gateway: 18789 | Conductor: RobbyPA
- Memory/FS access: Filesystem MCP `99bd0d9e` → workspace path (bidirectional)
- UI generation assist: v0.dev (Amina UI prototyping)
- Auth: Supabase Auth (not custom)

### AI Layer (VERIFIED)
- Claude: primary specialist + local execution
- ChatGPT: strategic brain (Ro uses externally)
- Copilot: secondary VS Code assist
- SwarmClaw agents: execution layer

---

## Non-Negotiables

### LOGIC RULE (non-negotiable, enforced by Reviewer)
Business logic lives in n8n. Not in Next.js /api routes. Not in client components.
An /api route may: call a Supabase query, call an n8n webhook, return a response.
An /api route may NOT: contain conditional business rules, orchestration logic, or AI processing.

### COMMIT RULE (non-negotiable, enforced by Reviewer)
- No agent commits to main. Ever.
- All work → feature branch → PR → Reviewer → QA → Ro approval → merge
- Branch naming: [agent-role]/[product]/[task-slug]
- Example: frontend/amina/reflection-streak-ui

### RLS RULE (non-negotiable, enforced by Reviewer + Data/DB)
- Every Supabase table must have RLS enabled before any data is written
- Every table has policies for SELECT, INSERT, UPDATE, DELETE
- Default: authenticated users see only their own rows unless explicitly designed otherwise
- No table ships without documented RLS policies

### RELIGIOUS CONTENT RULE (non-negotiable, enforced by all agents)
- Authentic Hadith content requires human scholarly sign-off before ANY downstream step
- No agent may claim to have verified a hadith's authenticity, grading, or chain of transmission
- Human sign-off record must include: scholar's name + date + notes
- TechWriter hard-blocks any Hadith commit without this record

### DEPENDENCY RULE
- No new npm/pip package added without justification in PR description
- No new Supabase extension added without Architect sign-off
- No new Make.com scenario without Integrations agent + Ro aware

---

## Common Mistakes in This Area

1. Putting conditional logic in Next.js /api routes — always caught in review, always rejected
2. Creating Supabase tables without RLS — blocked by Data/DB agent and Reviewer
3. Committing directly to main — SwarmClaw branch discipline must be enforced at agent config level
4. Putting business logic in client components for "speed" — creates debt, always caught
5. Adding PostHog tracking to every user action instead of critical events — creates noise

---

## Verified Infrastructure (2026-06-08)

### Supabase (VERIFIED)
- Project ID: `endovljmaudnxdzdapmf` (shared project — all products)
- Model: SHARED DB with table prefix + RLS per product. No separate Supabase project per product.
- All agents doing DB work must use this project ID.

### GitHub (VERIFIED)
- Repo: `rsemeah/redlanternstudios` (renamed from rsemeah/amina on 2026-06-08)
- GitHub MCP ID: `52886dfd`

### Filesystem MCP (VERIFIED)
- MCP ID: `99bd0d9e`
- Path: `/Users/rorysemeah/Documents/Claude/Projects`
- Bidirectional: agents can read workspace docs + write memory files

### n8n (ASSUMPTION — not verified)
- Inferred URL: `http://localhost:5678` (default local dev)
- No production URL found in workspace configs. Verify before any n8n automation work.

## Open Questions

- What is the n8n production instance URL? (ASSUMPTION: localhost:5678 — verify with Ro)
- Make.com vs n8n decision boundary: is there a written rule beyond "Make = SaaS integrations"? (ASSUMPTION — needs confirmation)
- Is there a PostHog project per product or one shared project? (UNKNOWN)
