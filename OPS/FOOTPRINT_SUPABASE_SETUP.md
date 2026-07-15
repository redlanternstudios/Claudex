# footprint. | Supabase

Status: MANUAL SPACE CREATION REQUIRED

Owner: Ro

Purpose: Give Footprint one private source of truth for candidates, evidence, consent, approvals, actions, and audit history.

## What Ro does

1. Open the [Supabase dashboard](https://supabase.com/dashboard).
2. Check which organization has an open project slot and belongs under By Red, LLC.
3. If no safe slot exists, create a new organization named `By Red, LLC` or add the right paid capacity. Do not delete or move a live product to make room.
4. Create one project named `footprint production`.
5. Choose the region nearest the primary Footprint users.
6. Generate a strong database password and save it in the approved team password manager.
7. Invite Keymon as Developer. Keep Ro as Owner.
8. Send Codex only the project reference and region. Never send the database password, service role value, or access token in chat.

## What Codex builds after the project exists

1. Versioned migrations
2. Row level security on every private table
3. Candidate and evidence tables
4. Approval and consent records
5. Audit history and stop state
6. Service access for n8n with the smallest required permissions
7. Verification receipts for every migration and policy

## First data model

1. `candidate_sources`
2. `candidates`
3. `candidate_evidence`
4. `candidate_scores`
5. `consent_events`
6. `approval_requests`
7. `approval_decisions`
8. `external_actions`
9. `audit_events`
10. `system_stop_state`

## Hard rules

1. Supabase is the source of truth. n8n moves work. It does not become the database.
2. Candidate discovery may add private records autonomously after the data and safety gates pass.
3. Public action stays human gated for the first ninety days.
4. Raw secret values never enter Claudex, Git, screenshots, email, or chat.
5. No live product is deleted, paused, or moved just to create space for Footprint.

## Receipt Ro returns

1. Organization name
2. Project name
3. Project reference
4. Region
5. Keymon invite status

Official help: [Supabase platform](https://supabase.com/docs/guides/platform) and [Supabase access control](https://supabase.com/docs/guides/platform/access-control)
