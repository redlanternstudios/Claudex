# RELEASE_GATE.md — RedLantern Release Checklist
> Run before every production deploy. Binary output: SHIP / HOLD / ROLLBACK.
> No vague "looks good." Every item is checked or explicitly skipped with a reason.

---

## PRE-DEPLOY CHECKLIST

### Code Quality
- [ ] `npm run lint` — passed, no errors
- [ ] `npm run typecheck` — passed, no errors  
- [ ] `npm run build` — build succeeded
- [ ] No `console.log` left in production paths
- [ ] No hardcoded secrets, keys, or env values in code

### Database
- [ ] Supabase migration reviewed — forward and rollback path confirmed
- [ ] `rls_audit.sql` run — all user tables have RLS enabled
- [ ] No new table ships without full TABLE CHECKLIST passed (see DATABASE_MAP.md)
- [ ] Service role usage documented — no unintended bypass

### Auth
- [ ] Auth happy path tested (login, session, logout)
- [ ] Auth failure path tested (wrong credentials, expired token)
- [ ] Protected routes actually protect (test as unauthenticated user)

### Environment
- [ ] All required env vars confirmed in deployment platform
- [ ] `.env.local` NOT committed (verify git status)
- [ ] No `NEXT_PUBLIC_*` var contains a secret

### Testing
- [ ] Happy path tested — [describe the core user flow tested]
- [ ] Failure path tested — [describe what happens when things go wrong]
- [ ] Edge case tested — [describe at least one edge case]
- [ ] Mobile/responsive checked (if UI change)
- [ ] Test output attached — not just "I tested it"

### Governance
- [ ] TRUTH gate: PASS (or explain why not required)
- [ ] CHANGE RECORD created with ID: [CR-ID]
- [ ] Rollback plan documented in CHANGE RECORD
- [ ] SECURITY reviewed (if auth/RLS/data change)
- [ ] COMPLIANCE reviewed (if halal product or contractor data)

### Observability
- [ ] PostHog events fire for key user actions (if applicable)
- [ ] Sentry error tracking confirmed active
- [ ] Any new API route has error handling that does not expose internals

### Rollback Readiness
- [ ] Rollback plan: [exact steps to revert]
- [ ] Rollback owner: [who executes if needed]
- [ ] Rollback time estimate: [X minutes]
- [ ] Previous state is known (last working commit hash: [hash])

---

## GATE VERDICT

```
DEPLOY AGENT VERDICT:

[ ] SHIP   — All checks passed. Cleared for production.
[ ] HOLD   — [list specific failing checks]. Do not deploy until resolved.
[ ] ROLLBACK — Active incident. Revert to [commit hash] immediately.

Signed: DEPLOY
Date: [ISO date]
CHANGE RECORD: [CR-ID]
ROBBY sign-off: [pending / received]
```

---

## SKIP RULES
A check may be skipped only if:
1. It is explicitly not applicable (document why)
2. TRUTH has issued a PASS that covers this check
3. Ro has explicitly accepted the risk in writing

Skipped checks must be listed with reason — not silently omitted.

---
*DEPLOY agent owns this checklist. ROBBY signs off. Nothing ships without a completed gate.*
