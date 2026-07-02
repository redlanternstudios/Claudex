# RedLantern Studios — Integration Architecture
**Owner:** Red (Rory Semeah) — RedLantern Studios LLC  
**Products in scope:** HireWire · QBos · SilentEngine · InSense · Authentic Hadith · Chapman Bot  
**Last updated:** 2026-04-13

---

## SECTION 1 — CONNECTOR AUDIT

### Decision Framework
- **YES-NOW** = connect immediately, has active purpose  
- **YES-PHASE2** = connect after core infra is stable  
- **LATER** = real use case exists, not yet urgent  
- **NO** = creates overlap, risk, or noise — do not connect

---

| Tool | Decision | Role in Your System | What Flows Through It | What Must NOT Flow Through It |
|---|---|---|---|---|
| **Google Drive** | ✅ YES-NOW | Document storage: client deliverables, business docs, By Red LLC corporate docs | PDFs, contracts, design exports, shared assets | Source code, API keys, database backups |
| **GitHub** | ✅ YES-NOW | Source of truth for all product codebases | Code, PRs, commits, CI results, changelogs | Secrets, .env files, API keys |
| **Notion** | ✅ YES-NOW | Operational brain: specs, decision logs, project memory, roadmaps | Product specs, task boards, meeting notes, decisions | Raw database data, customer PII, payment data |
| **Supabase** | ✅ YES-NOW | Primary database layer for all products | Schema migrations, query results, row counts, error logs | Personal keys, plain-text passwords |
| **Vercel** | ✅ YES-NOW | Deployment infrastructure for all Next.js products | Deploy status, build logs, environment configs, preview URLs | Production secrets (use Vercel env vars, not connectors) |
| **Sentry** | ✅ YES-NOW | Error monitoring per product (HireWire first, then others) | Exceptions, stack traces, performance metrics, release tags | PII, full request bodies with user data |
| **Stripe** | ✅ YES-PHASE2 | Revenue + billing for HireWire and client products | Payment intents, subscription status, revenue metrics | Full card data, raw payment methods |
| **Gmail** | ✅ YES-PHASE2 | Client communication, inbound project requests, DocuSign notifications | Client threads, inbound leads, contract notifications | Passwords, API keys, internal system logs |
| **Google Calendar** | ✅ YES-PHASE2 | Meeting context, sprint scheduling, deadline awareness | Events, attendees, meeting links | Personal/private calendar items |
| **Figma** | ✅ YES-PHASE2 | Design system + dev handoff for HireWire and InSense | Component specs, design tokens, frames, handoff notes | Source code, backend logic |
| **DocuSign** | ✅ YES-PHASE2 | Contract execution for By Red LLC: client agreements, NDAs | Envelopes, signature status, completed PDFs | Business bank data, EINs in raw form |
| **Canva** | ⏳ LATER | Marketing assets, social media visuals, client presentations | Brand graphics, social templates, pitch decks | Product data, customer information |
| **Gamma** | ⏳ LATER | Investor decks, client pitch materials | Presentation content | Any operational or customer data |
| **Midpage Legal Research** | ⏳ LATER | Legal research for By Red LLC compliance, contract review | Case law, statute references | Client PII, financial data |
| **monday.com** | ❌ NO | **Redundant with Notion.** Two PM tools creates split-brain task tracking. Pick Notion as your single source of truth. | — | — |

---

### Critical Thinking Notes

**Do NOT connect:** monday.com — you already have Notion. Adding a second PM layer fragments your operational picture and creates duplicate update work.

**Missing tools you should add later:**
- **Resend or Postmark** — transactional email for HireWire (signup, password reset, job alerts). Supabase Auth emails are not enough at scale.
- **Linear or GitHub Issues** — once team size grows, structured bug/feature tracking per product becomes necessary. GitHub Issues is free and already connected.
- **PostHog or Mixpanel** — product analytics for HireWire. You have error monitoring (Sentry) but no behavioral analytics. These are different.
- **Anthropic API dashboard** — not a connector but should be bookmarked for usage/cost monitoring as SilentEngine routes traffic.

**Overlap to eliminate:**
- Notion + monday.com → Keep Notion only
- Google Drive + Notion docs → Use Drive for file storage, Notion for structured knowledge. Don't duplicate documents in both.

---

## SECTION 2 — MCP TOKEN EXCHANGE FAILURE: DIAGNOSIS + FIX

### What It Means
MCP (Model Context Protocol) connectors authenticate via OAuth 2.0. The token exchange step is where the connector trades an authorization code for an access token + refresh token. "Token exchange failed" means this handshake broke — Claude cannot act on behalf of the connector.

### Likely Causes (in order of probability)

1. **Connector was authorized but token expired** — the most common cause. OAuth access tokens have short lifespans (typically 1 hour). If the refresh token also expired or was revoked, the exchange fails silently.

2. **Reauth required after permission scope change** — if you or a team member changed the OAuth app's scopes, all existing tokens are invalidated.

3. **Browser session / incognito mismatch** — connector was authorized in a different browser profile than your current session. Token is stored per-profile.

4. **Account switched** — if you changed your Google, GitHub, or other account login since the connector was set up, the token references a stale identity.

5. **Connector app credentials rotated** — the underlying MCP app's client ID or secret changed (rare, but happens after security incidents).

### Fix Steps (do these in order)

**Step 1: Identify the failing connector**
Go to Settings → Connectors in the Claude desktop app. Any connector showing a red status or "Reconnect" prompt is the one failing. Note which tool it is.

**Step 2: Disconnect the failing connector**
Click the connector → select Disconnect or Remove. This clears the broken token state.

**Step 3: Reconnect from scratch**
Click Add Connector → find the same tool → click Connect. This triggers a fresh OAuth flow.

**Step 4: Authorize in your primary browser profile**
When the OAuth window opens, confirm you are logged into the correct account (your RedLantern Studios Google account, your primary GitHub account, etc.) before approving.

**Step 5: Verify the connection**
After reconnecting, ask Claude to perform a simple action with that connector (e.g., "list my recent Google Drive files"). If it responds with data, the token exchange succeeded.

**Step 6: If still failing**
- Clear browser cookies for the affected service
- Try in a different browser
- Check if the service (Google, GitHub, etc.) has any OAuth restrictions set at the account or organization level

### Scope of Impact
Token exchange failures are **connector-specific** — they affect only the one connector whose token broke. Your other connected tools are unaffected unless they share the same underlying OAuth session. Google Drive and Google Calendar share Google OAuth, so if one fails, check the other.

---

## SECTION 3 — INTEGRATION ARCHITECTURE MAP

### Design Principle
Each connector has one primary role. Data flows in one direction unless there is a specific bidirectional need. No tool does two jobs that could cause confusion about which is authoritative.

---

### Core Architecture Diagram

```
CLAUDE (Orchestration Layer)
    │
    ├── NOTION ──────────────── Product specs, decisions, task memory
    │       ↑                   Session handoffs, project truth
    │       │ GitHub webhooks
    │
    ├── GITHUB ──────────────── All product code repos
    │       │                   HireWire / QBos / SilentEngine / InSense
    │       └── Vercel ───────── Auto-deploy on push to main
    │               │
    │               └── Sentry ─ Error events tagged by release/deploy
    │
    ├── SUPABASE ────────────── Primary DB (all products)
    │       │                   Schema migrations, row-level security
    │       └── Sentry ───────── DB error surfacing
    │
    ├── STRIPE ──────────────── HireWire billing + client invoices
    │       │
    │       └── Notion ───────── Revenue summaries (manual or webhook)
    │
    ├── FIGMA ───────────────── Design system + component specs
    │       │
    │       └── GitHub ───────── Dev picks up specs, references tokens
    │
    ├── GMAIL ───────────────── Client comms, inbound requests
    │       │
    │       └── Notion ───────── Action items from threads → task board
    │
    ├── GOOGLE DRIVE ────────── File storage: contracts, exports, assets
    │       │
    │       └── DocuSign ─────── Contracts routed for signature
    │
    └── GOOGLE CALENDAR ─────── Meeting context, sprint checkpoints
```

---

### Explicit Data Flows

**Flow 1: Product build loop**
`Claude → Notion (spec) → GitHub (code) → Vercel (deploy) → Sentry (monitor)`
Red writes or refines specs in Notion. Claude references them. Code lives in GitHub. Vercel deploys on push. Sentry catches runtime errors tagged to that release.

**Flow 2: Error triage loop**
`Sentry (error detected) → Claude (diagnose) → GitHub (fix PR) → Vercel (redeploy)`
Sentry surfaces the error. Claude reads the stack trace and identifies the fix. PR goes into GitHub. Vercel auto-deploys.

**Flow 3: Revenue visibility**
`Stripe (payment event) → Notion (revenue log) → Claude (summarize on demand)`
Stripe handles all transactions. A webhook or manual sync pushes key metrics (MRR, churn, new subs) into a Notion revenue database. Claude queries it when asked.

**Flow 4: Client engagement**
`Gmail (inbound) → Claude (draft reply or extract action) → Notion (log task) → DocuSign (if contract needed) → Google Drive (archive signed PDF)`

**Flow 5: Design → Dev handoff**
`Figma (design finalized) → Claude (read design context via Figma MCP) → GitHub (component scaffold) → Vercel (preview URL) → Figma comment (feedback loop)`

**Flow 6: Session memory loop**
`Claude (session end) → Notion or /context files (decisions, handoffs) → Claude (session start reads context)`
This is the continuity loop. Every meaningful session writes decisions back. Every new session reads state first.

**Flow 7: Database migrations**
`Supabase MCP → Claude (read schema) → SQL migration drafted → Supabase (applied) → GitHub (migration file committed)`
Never apply migrations that aren't also committed to the repo.

---

## SECTION 4 — SETUP PRIORITY PLAN

### Phase 1 — Critical (Do This Week)
These are the tools your build pipeline cannot function without.

1. **Fix MCP token error** — follow Section 2 steps. Unblock everything else first.
2. **GitHub** — confirm connected, test by listing a repo. All product code flows here.
3. **Notion** — connect and validate. This is your operational brain. Set up: Products database, Decisions log, Session handoff page.
4. **Supabase** — connect to your HireWire project. Test schema read. This unblocks DB-assisted sessions.
5. **Vercel** — connect. Test deploy status read for HireWire project.
6. **Sentry** — connect. Create a HireWire project in Sentry if not already done. Tag releases to deploys.

**Gate:** Do not move to Phase 2 until Claude can successfully read data from all 5 tools above.

---

### Phase 2 — High Leverage (Next 2 Weeks)
These directly support revenue, client work, and communication.

7. **Stripe** — connect after HireWire billing is live or in staging. Test payment intent read.
8. **Gmail** — connect. Scope to business email only (roryleesemeah@gmail.com or RedLantern domain if you have one).
9. **Google Calendar** — connect. Gives Claude meeting awareness for session prep and sprint planning.
10. **Figma** — connect when HireWire v2 UI work begins or when InSense design work resumes.
11. **DocuSign** — connect when next client contract needs to go out. Test envelope creation on a dummy doc.

---

### Phase 3 — Optional / Scale (When Ready)
12. **Canva** — connect when you hire a marketing resource or start content campaigns.
13. **Gamma** — connect when investor or demo deck creation becomes a recurring need.
14. **Midpage Legal Research** — connect when By Red LLC legal review work increases (compliance, terms of service review, contract analysis).

---

### Do Not Connect
- **monday.com** — redundant with Notion. Do not connect.

---

## SECTION 5 — AUTOMATION ROUTING STRATEGY

### Three Routing Layers

**Layer 1: Direct Claude integration**
Use for: real-time, conversational, context-rich tasks where Claude needs to read, write, or reason about data in the moment.

| Tool | Direct Claude tasks |
|---|---|
| Notion | Read specs, write decisions, update task status |
| GitHub | Read code, create issues, review PRs |
| Supabase | Read schema, draft migrations, query data |
| Sentry | Read errors, diagnose issues |
| Figma | Read design context, extract tokens |
| Gmail | Draft replies, extract action items |
| Stripe | Read revenue state, surface anomalies |

**Layer 2: n8n (event-driven, internal automation)**
Use for: automated triggers that run without Claude being in the loop. Background data sync, webhook handling, scheduled reports.

| Automation | Flow |
|---|---|
| GitHub PR merged → Notion task updated | n8n watches GitHub webhook, marks Notion task complete |
| Stripe payment received → Notion revenue log row created | n8n handles Stripe webhook, writes to Notion DB |
| Sentry new issue → Notion bug ticket created | n8n handles Sentry webhook, opens Notion task |
| Vercel deploy succeeded → Sentry release created | n8n coordinates post-deploy release tagging |
| Daily: Sentry error count → Notion health metric | n8n scheduled digest |

**Layer 3: Zapier (simple, external-facing, low-code)**
Use for: simple connectors between SaaS tools that do not require custom logic. Reserve for external partner tools or client-facing flows.

| Automation | Flow |
|---|---|
| DocuSign envelope completed → Google Drive PDF saved | Simple 2-step Zap |
| Gmail new thread from specific domain → Notion intake row | Simple Zap for client intake |
| Google Calendar event created with "sprint" in title → Notion sprint log row | Low-complexity scheduling sync |

**Routing Rule:**
- If Claude needs to reason about the data → Direct
- If it's a background trigger with structured output → n8n
- If it's a simple A→B between two SaaS tools → Zapier
- Never duplicate the same flow in two routing layers

---

## SECTION 6 — SECURITY MODEL

### What Tools Can Access Business Data

| Category | Allowed Tools | Notes |
|---|---|---|
| Source code | GitHub, Vercel, Supabase (migrations only) | No code in Notion, Drive, or Canva |
| Customer PII | Supabase only | Never in Notion, Drive, Gmail bodies, or Sentry |
| Payment data | Stripe only | Only aggregated metrics may flow to Notion |
| Business docs + contracts | Google Drive, DocuSign | PDFs only — no raw financial data |
| API keys / secrets | Vercel env vars, Supabase vault | See rules below |
| Product specs / decisions | Notion, GitHub (markdown) | Fine for either |
| Error traces | Sentry | Scrub PII before events are logged — configure in Sentry DSN settings |

### API Key Rules — Non-Negotiable

| Rule | Detail |
|---|---|
| Production secrets live in Vercel environment variables | Never in .env files committed to GitHub |
| Supabase service role key is backend-only | Never in client-side code or Notion |
| Stripe secret key is backend-only | Only publishable key in frontend |
| Claude API key lives in Vercel or your SilentEngine config | Never in a Notion page or Google Doc |
| GitHub PATs for automation live in n8n credential store | Not in plain-text Notion notes |
| DocuSign integration token stored in n8n or Vercel | Not in Gmail or Drive |

### iCloud / Personal Data Separation

iCloud is your personal layer. It should never be connected to this stack. Specifically:
- No product data in iCloud Drive
- No client contracts in iCloud (use Google Drive)
- No API keys in iCloud Notes or Apple Notes
- No customer data exported to personal devices without encryption

If you use an Apple device for work, maintain a hard partition: RedLantern work stays in Google Workspace + GitHub + Supabase. Personal life stays in iCloud.

---

## SECTION 7 — FINAL RECOMMENDATIONS

### What to Do First (Today)
1. Fix the MCP token error — Section 2. Takes 10 minutes.
2. Connect Notion and create three pages: `Active Products`, `Decision Log`, `Session Handoff`. This gives Claude persistent memory on every future session.
3. Confirm GitHub and Supabase are working — run a test read on each.

### What to Stop Doing
- Do not connect monday.com. You do not need it.
- Do not store API keys in Notion pages. Move any that are there now.
- Do not run the same automation in both n8n and Zapier. Pick one per flow.

### What You Are Missing Right Now
- **Behavioral analytics** — you have error monitoring (Sentry) but nothing tracking what users actually do inside HireWire. Add PostHog when HireWire hits beta.
- **Transactional email provider** — Resend is the fastest to integrate with Next.js + Supabase. Add before HireWire launch.
- **A defined Notion structure** — the connector is only as useful as the pages behind it. Build the structure before you connect.

### Overcomplication Check
Your current connector list is actually well-matched to your stack. The only real mistakes are:
- monday.com being listed at all (remove it)
- Not having Notion and Sentry as Phase 1 (fix this)
- The temptation to connect Canva and Gamma before your core build pipeline is solid

The fractal infrastructure principle applies here too: get the core connectors compounding before you add surface area.

### Connector Count Target by Phase
- Phase 1 end: 5 active connectors (GitHub, Notion, Supabase, Vercel, Sentry)
- Phase 2 end: 9–10 active connectors
- Phase 3 end: 11–12 maximum

More than 12 active connectors for a solo-to-small-team operator is overhead, not leverage.

---

*This document should be reviewed and updated each time a new connector is added or a product moves to production.*
