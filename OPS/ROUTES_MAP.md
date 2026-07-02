# ROUTES_MAP.md — [PRODUCT NAME]
> Live route inventory. Updated on every /repo-ingest run.
> Purpose: prevents agents from inventing routes that don't exist.
> Status must be VERIFIED from the actual repo — not assumed.

---

## ROUTE INVENTORY

### API Routes (`/app/api/`)

| Route | Method | Auth required | n8n call | Status | Owner | Notes |
|-------|--------|--------------|----------|--------|-------|-------|
| [fill on /repo-ingest] | | | | | | |

**Status definitions:**
- `VERIFIED` — route exists, wired, logic confirmed
- `STUB` — route exists, returns placeholder/mock
- `PARTIAL` — route exists, some logic missing
- `BROKEN` — route exists, logic fails
- `MISSING` — called in frontend, does not exist in backend
- `ORPHANED` — exists in backend, called from nowhere

---

### Page Routes (`/app/` or `/pages/`)

| Route | Auth required | Data fetching | Status | Notes |
|-------|--------------|---------------|--------|-------|
| [fill on /repo-ingest] | | | | |

---

### n8n Webhook Endpoints

| Webhook path | Trigger | Connected to | Status | Notes |
|-------------|---------|--------------|--------|-------|
| [fill on /repo-ingest] | | | | |

---

## WIRING AUDIT

### Frontend calls that have no backend route
```
[fill on /repo-ingest]
```

### Backend routes that are never called
```
[fill on /repo-ingest]
```

### Routes that call n8n but n8n flow does not exist
```
[fill on /repo-ingest]
```

### Routes with no auth where auth is expected
```
[fill on /repo-ingest]
```

---

## AUTH BOUNDARY MAP

| Public route | Requires auth | Role required |
|-------------|--------------|--------------|
| [fill on /repo-ingest] | | |

---

## ROUTE CHANGE PROTOCOL
When a route is added, modified, or deleted:
1. Update this file immediately
2. Create a CHANGE RECORD
3. Update CHANGELOG_AI.md
4. Confirm AGENT_PERMISSIONS tier still applies

---

## LAST UPDATED
Date: [ISO date]  
Updated by: [agent or Ro]  
Source: [/repo-ingest run or manual]

---
*This file is read by BACKEND, FRONTEND, REVIEW, and TRUTH agents before any API or route work.*
