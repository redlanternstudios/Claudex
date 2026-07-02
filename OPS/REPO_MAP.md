# REPO_MAP.md — [PRODUCT NAME]
> Generated at session start. Updated at session end.
> Every agent reads this before modifying any file.

---

## REPO IDENTITY
- **Product:** [product name]
- **Repo:** [GitHub org/repo]
- **Stack:** Next.js (App Router) + Tailwind | Supabase | n8n logic | Make.com integrations
- **Last agent session:** [date]
- **Last human review:** [date]

---

## DIRECTORY STRUCTURE

```
/app                    — Next.js App Router pages + layouts
  /api                  — API routes (thin wrappers only — logic lives in n8n)
  /(auth)               — Auth-gated pages
  /(public)             — Public pages
/components             — Shared UI components
/lib                    — Utilities, Supabase client, type definitions
/supabase
  /migrations           — Schema migrations (append-only)
  /rls_audit.sql        — Standing RLS audit query
/n8n                    — n8n flow specs (JSON exports + markdown docs)
/OPS                    — This directory
/public                 — Static assets
```

---

## KEY FILES
| File | Purpose | Last Modified | Owner |
|------|---------|--------------|-------|
| `app/layout.tsx` | Root layout, global providers | — | FRONTEND |
| `lib/supabase/client.ts` | Browser Supabase client | — | BACKEND |
| `lib/supabase/server.ts` | Server Supabase client | — | BACKEND |
| `supabase/rls_audit.sql` | Standing RLS check | — | SECURITY |
| `OPS/TODAY.md` | Daily command center | — | Ro |
| `.env.local` | Environment variables (NOT committed) | — | Ro |

---

## WHAT DOES NOT EXIST YET
> Label honestly. Agents must not invent.

- [ ] [list missing features/files here]

---

## KNOWN BROKEN OR UNVERIFIED
> If it compiles but isn't confirmed to work end-to-end, it goes here.

- [ ] [list unverified wiring here]

---

## AGENT SESSION LOG
| Date | Agent | Files touched | Reason | Receipt ID |
|------|-------|--------------|--------|-----------|
| | | | | |

---
*Updated at every session end. If this file is stale by >7 days, flag to TRUTH.*
