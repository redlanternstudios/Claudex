# DATABASE_MAP.md — [PRODUCT NAME]
> Every Supabase table, its purpose, RLS status, and ownership.
> No new table ships without an entry here. No agent may modify schema without updating this file.

---

## SUPABASE PROJECT
- **Project ID:** [project_id]
- **URL:** [project_url]
- **Auth:** Supabase Auth (email/magic link/OAuth)
- **RLS:** Required on ALL tables with user data

---

## TABLE REGISTRY

### [table_name]
| Field | Type | Notes |
|-------|------|-------|
| id | uuid | PK, default gen_random_uuid() |
| user_id | uuid | FK → auth.users.id |
| created_at | timestamptz | default now() |
| updated_at | timestamptz | updated by trigger |

**RLS Status:** ✅ Enabled / ❌ NOT ENABLED  
**Policies:**
- SELECT: `auth.uid() = user_id`
- INSERT: `auth.uid() = user_id`
- UPDATE: `auth.uid() = user_id`
- DELETE: [explicitly allowed / explicitly denied]
- Anon: [explicitly allowed / explicitly denied]
- Service role: [server-only operations — document what uses it]

**Owner:** [agent responsible for this table]  
**Used by:** [list of features/routes that read/write this table]  
**Migration file:** `supabase/migrations/[timestamp]_create_[table_name].sql`

---

## RLS POLICY STANDARD (apply to every user-owned table)

```sql
-- Enable RLS
ALTER TABLE [table] ENABLE ROW LEVEL SECURITY;

-- SELECT: users see own rows only
CREATE POLICY "users_select_own" ON [table]
  FOR SELECT USING (auth.uid() = user_id);

-- INSERT: users insert own rows only  
CREATE POLICY "users_insert_own" ON [table]
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- UPDATE: users update own rows only
CREATE POLICY "users_update_own" ON [table]
  FOR UPDATE USING (auth.uid() = user_id);

-- DELETE: explicitly deny unless intentional
-- CREATE POLICY "users_delete_own" ON [table]
--   FOR DELETE USING (auth.uid() = user_id);
```

---

## TABLE CHECKLIST (required before any table ships to production)
- [ ] Has `id` (uuid, PK)
- [ ] Has `user_id` or `tenant_id` (FK to auth.users)
- [ ] Has `created_at`
- [ ] Has `updated_at`
- [ ] RLS enabled
- [ ] SELECT policy exists and tested
- [ ] INSERT policy exists and tested
- [ ] UPDATE policy exists and tested
- [ ] DELETE intentionally allowed or denied (documented)
- [ ] Anon access intentionally allowed or denied (documented)
- [ ] Service role usage documented (what server process uses it)
- [ ] Migration file exists and is reversible
- [ ] Seed test exists

---
*Updated whenever schema changes. SECURITY reviews this before any deploy.*
