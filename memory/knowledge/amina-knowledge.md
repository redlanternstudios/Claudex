# Knowledge: Amina
# Product: amina
# Last verified: 2026-06-08
# Maintained by: Librarian (writes) + Ro (approves changes)

---

## Standing Truth

### Purpose (VERIFIED)
Amina is a spiritual wellness app. It is the dogfood product for QuietBuild OS — meaning it proves the SwarmClaw agent org works before that methodology is applied to HireWire or other products. If Amina doesn't work with this org, nothing else will be built on it.

### Current Status (VERIFIED as of 2026-06-08)
- ACTIVE — primary development product
- Proving: QuietBuild OS methodology
- HireWire is PAUSED until Amina proves the method

### Core Features (ASSUMPTION — verify against latest spec)
- Daily reflections / journal entries
- Spiritual guidance content
- User account + auth
- Reflection persistence across sessions

### Stack Specifics
- Frontend: Next.js + Tailwind (standard)
- Backend: Supabase project `endovljmaudnxdzdapmf` (VERIFIED — shared project, all products use table prefix + RLS)
- Repo: `rsemeah/redlanternstudios` (VERIFIED — renamed from rsemeah/amina 2026-06-08)
- Logic: n8n at `http://localhost:5678` (ASSUMPTION — local dev default, verify prod URL)
- UI prototyping: v0.dev

### Content Sensitivity (VERIFIED)
Amina handles spiritually sensitive personal content (reflections, prayers, intentions).
This means:
- Reflection content must be private by default — RLS enforces user-owns-row
- AI access to reflection content requires explicit user opt-in
- Export/delete must be supported (user data portability)
- No reflection content visible to other users under any configuration

---

## Non-Negotiables

- Reflection data is private. RLS must enforce user isolation at the database level.
- No reflection content is AI-readable without explicit user opt-in.
- The product must work before HireWire resumes. This is the priority gate.
- User-facing language is warm, grounded, not clinical.

---

## Common Mistakes in This Area

1. Designing reflection features without thinking about the delete/export path — always needs to be designed in from the start
2. Assuming AI can read user reflections by default — it cannot without opt-in
3. Building Amina features that would need to be rebuilt differently for a different product — keep it clean and reusable where possible (proves QuietBuild)

---

## Open Questions

- What is the current DB schema for reflections table? (UNKNOWN — pull from Supabase project endovljmaudnxdzdapmf before any schema work)
- Is there a current PostHog project for Amina? (UNKNOWN)
- What is the n8n flow for any existing Amina automation? (UNKNOWN — local dev at localhost:5678 assumed)
- Current deployment: Vercel? Railway? Other? (UNKNOWN)
