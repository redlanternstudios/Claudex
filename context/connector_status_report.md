# Connector Status Report — Live Test Results
**Date:** 2026-04-13  
**Method:** Direct MCP tool calls from Claude session  
**Tested by:** Claude (Integration Architect role)

---

## LIVE STATUS: ALL CONNECTORS

| # | Connector | Status | Auth Identity | Test Result |
|---|---|---|---|---|
| 1 | **Google Drive** | ✅ LIVE | roryleesemeah@gmail.com | Returned files + folders. "Red Lantern" folder found (owned by rshnl.studio@gmail.com). byRed Shop doc found. |
| 2 | **Gmail** | ✅ LIVE | roryleesemeah@gmail.com | Returned 3 recent threads (GoDaddy security alert, Google security alerts, Workday application). Full read + search working. |
| 3 | **Google Calendar** | ✅ LIVE | roryleesemeah@gmail.com | Primary calendar confirmed. Timezone: America/Los_Angeles. US Holidays calendar also subscribed. |
| 4 | **Notion** | ✅ LIVE | RedLantern Studios workspace | Returned pages: "Welcome to RedLantern Studios!", "LeadsEngine", "Clarity". Workspace search functional. |
| 5 | **Supabase** | ✅ LIVE | Vercel-linked org | 3 projects found: **RedLantern Studios** (ACTIVE_HEALTHY), **AuthenticHadith-App** (ACTIVE_HEALTHY), TheBlondeMuslim (INACTIVE). Postgres 17. |
| 6 | **Stripe** | ✅ LIVE | acct_1THc0PD8NguWaPm7 | Display name: **HireWire**. Dashboard + API keys accessible. |
| 7 | **Figma** | ✅ LIVE | roryleesemeah@gmail.com (Rory Semeah) | Starter plan. Team: "Rory Semeah's team" (View seat). Connected and responding. |
| 8 | **DocuSign** | ✅ LIVE | roryleesemeah@icloud.com | Account: 71a17b8d-6db9-4af1-b042-08b9613ddb25. Base URI: na4.docusign.net. Created 2026-03-03. |
| 9 | **Canva** | ✅ LIVE | (authenticated) | Search returned empty for "RedLantern" but tool is responding. No designs created yet in Canva. |
| 10 | **Gamma** | ✅ LIVE | (authenticated) | 8 folders found: Authentic Hadith App, byRed Shop, NAFS, QBos - App, RedLantern Studios, Rise w/ Bliss, UHY, University of Janna. |
| 11 | **monday.com** | ✅ LIVE | Rory Semeah (user ID: 102146189) | Board found: "🪔RedLantern Studios". Connected and responding. |
| 12 | **Sentry** | ❌ NEEDS AUTH | — | Error: "This connector requires authentication. The user needs to connect it before this tool can be used." |
| 13 | **Midpage Legal** | ⚠️ NO MCP TOOLS | — | No MCP tool endpoints found. Either not connected or connector has no exposed tools. |
| 14 | **Vercel** | ⚠️ INDIRECT ONLY | — | No dedicated Vercel MCP tools found. Supabase projects are linked through Vercel org (`vercel_icfg_rkyVLpjfv9fooUrFjURvhZpy`), but there is no direct Vercel deploy/status connector. |

---

## SUMMARY

| Category | Count | Tools |
|---|---|---|
| ✅ Fully live | 11 | Google Drive, Gmail, Google Calendar, Notion, Supabase, Stripe, Figma, DocuSign, Canva, Gamma, monday.com |
| ❌ Needs reauth | 1 | Sentry |
| ⚠️ No MCP tools / indirect | 2 | Midpage Legal, Vercel |

---

## OBSERVATIONS AND FLAGS

### 1. Sentry — Fix Now
Sentry is the only connector that failed authentication. This is likely the source of your "MCP token exchange failed" error.

**Fix:**
1. Go to Settings → Connectors in the Claude desktop app
2. Find Sentry → Disconnect
3. Reconnect → Authorize with your Sentry account
4. Test: ask Claude "who am I in Sentry?"

### 2. DocuSign — Auth Identity Mismatch
DocuSign is authenticated under `roryleesemeah@icloud.com` (your personal iCloud). Every other business connector uses `roryleesemeah@gmail.com`.

**Risk:** If you ever separate personal from business accounts, DocuSign will be on the wrong identity.
**Recommendation:** Re-register DocuSign under your business email when you have one (help@byredllc.com or similar). Not urgent, but flag for Phase 2.

### 3. Google Drive — Shared Ownership
The "Red Lantern" folder in Google Drive is owned by `rshnl.studio@gmail.com`, not your primary account. This is fine for shared access, but be aware that:
- If rshnl.studio removes sharing, you lose access
- Business-critical docs should live in folders YOU own

### 4. monday.com — Connected but Redundant
monday.com is fully live and has a "🪔RedLantern Studios" board. Per our integration architecture, this is **redundant with Notion**. You now have two PM tools connected, which is exactly what we said to avoid.

**Decision needed:** Keep monday.com connected (as a secondary/specific use) or disconnect it and consolidate to Notion only.

### 5. Gamma — Active Use
8 folders already exist in Gamma, including product-specific ones (QBos, Authentic Hadith, RedLantern Studios). This is more active than expected — Gamma may belong in Phase 2, not Phase 3.

### 6. Vercel — No Direct MCP
Supabase projects show they are linked through a Vercel org, but there is no standalone Vercel MCP connector providing deploy status, build logs, or environment management. You would need to:
- Use Vercel's dashboard directly for deploy status
- Or check if a Vercel MCP connector becomes available in Claude's registry

### 7. Canva — Empty but Connected
Canva is authenticated and responding but has no designs. This is fine — it's ready when you need it. No action required.

### 8. Supabase — TheBlondeMuslim Project is INACTIVE
You have an inactive Supabase project called "TheBlondeMuslim." If this is no longer needed, consider pausing or deleting it to reduce clutter and potential cost.

---

## WHAT CLAUDE CAN NOW DO WITH EACH CONNECTOR

| Connector | What I Can Do Right Now |
|---|---|
| **Google Drive** | Search files, read Google Docs content, find folders |
| **Gmail** | Search threads, read full messages, create drafts, label/unlabel messages |
| **Google Calendar** | List calendars, list events, create/update/delete events, find free time, find meeting times, RSVP |
| **Notion** | Search workspace, fetch pages, create pages/databases, update pages, query databases, create comments |
| **Supabase** | List projects, read schema, execute SQL, apply migrations, manage branches, deploy edge functions, list tables |
| **Stripe** | List customers/products/prices/invoices/subscriptions, create payment links, create customers, manage refunds, retrieve balance |
| **Figma** | Get design context, get screenshots, search design system, get metadata, get variables, generate diagrams |
| **DocuSign** | Get user info, get/create envelopes, list recipients, get templates, manage workflows |
| **Canva** | Search designs, generate designs, create from templates, export designs, manage folders, manage brand kits, edit designs |
| **Gamma** | Get folders, get themes, read gammas, generate presentations |
| **monday.com** | Get boards, create items, update columns, search, create docs, manage sprints, create dashboards |
| **Sentry** | ❌ Nothing until reauthed. Once connected: search issues, search events, analyze with Seer AI, manage releases |

---

## RECOMMENDED IMMEDIATE ACTIONS

1. **Reconnect Sentry** — this is your only broken connector. 5-minute fix.
2. **Decide on monday.com** — keep or disconnect. Two PM tools = split brain.
3. **Note DocuSign identity** — on iCloud, not Gmail. Flag for future cleanup.
4. **Acknowledge Gamma is active** — move from Phase 3 to Phase 2 in your plan.
5. **Check "TheBlondeMuslim" Supabase project** — pause if no longer needed.

---

*All 14 connectors probed. 11 fully operational. 1 needs reauth (Sentry). 2 have no MCP tools available (Vercel, Midpage Legal).*
