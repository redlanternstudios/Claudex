---
name: amina-repo-production
description: "Amina production repo — org, branch, working branch, what lives where. Verified 2026-06-25."
metadata:
  node_type: memory
  type: reference
---

## Amina Production Repo — Verified 2026-06-25

**Org/Repo:** `redlanternstudios/Amina`
**Base branch:** `main`
**Current working branch:** `v0/redlanternstudios-5e038e20`

**What's on the working branch (not yet merged to main):**
- 4 SwarmClaw branch integrations
- Mosque-finder feature
- @supabase/ssr login-loop fix (addresses Circle login redirect)
- New Sign In path

**What is NOT this repo:**
- `rsemeah/HireWireInGroup` — HireWire app, separate product, do not confuse
- `v0-amina` — Ro's local dev copy (8 commits), not canonical production

**Merge gate before `v0/redlanternstudios-5e038e20` → `main`:**
- task-008: REVIEW sign-off
- task-009: QA sign-off
- task-010: TRUTH sign-off
- Use `amina/SWARMCLAW_DISPATCH_CIRCLE_LOGINFIX_V1.md` as QA AC checklist — verify /circle redirect case is specifically covered by the @supabase/ssr fix already on branch

**How to apply:** Any session touching Amina code routes to `redlanternstudios/Amina`. Default branch for new work is `v0/redlanternstudios-5e038e20` until merged and a new branch is cut.
