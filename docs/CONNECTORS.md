# CONNECTORS AUDIT — MCP servers available to Claude (Cowork)

Version 1.0 · 2026-07-02 · Audited live from the Cowork session environment.
This is the CLAUDE-side surface. Codex reaches a subset via `~/.codex/config.toml` (see `docs/CAPABILITY_MAP.md`).
Auth lives in the vault (`OPS/API_KEY_VAULT.md`, gitignored) — never in this repo.

---

## PRODUCT / BUILD CONNECTORS (highest leverage)

| Connector | What it does | Engine | Auth | Notes |
|---|---|---|---|---|
| **Supabase MCP** | SQL, migrations, edge functions, branches, advisors, logs, types | Claude + Codex | project-scoped | The data-layer workhorse. Prefer over static schema files. |
| **Vercel MCP** | Deploy, list deployments, build logs, runtime errors/logs, domain check | Claude + Codex | token | Deploy + debug loop. |
| **GitHub** | Repo read/write, PRs, org ops (via browser + token) | Claude + Codex | `ghp_` in vault | Push path when local git is jammed. Rotate token (read this session). |
| **Figma MCP** | Design context, code-connect, generate designs, screenshots | Claude | OAuth | Design-to-code + code-to-design. |
| **Chrome (Claude in Chrome)** | Navigate, read DOM, click, form-fill, JS exec | Claude only | browser ext | Codex has NO browser. Delegate web tasks to Claude. |
| **Desktop Commander** | Terminal, file ops, process control on host | Claude | local | Host-side execution. |
| **computer-use** | Screenshot + mouse/keyboard on the Mac | Claude only | per-app grant | Native-app automation. Codex cannot do this. |

---

## OPS / PRODUCTIVITY CONNECTORS

| Connector | What it does | Engine | Status |
|---|---|---|---|
| **Notion MCP** | Pages, databases, search, comments | Claude | DEPRECATED as default — do not route truth here |
| **Monday.com MCP** | Boards, items, docs, dashboards, workflows, agents | Claude | DEPRECATED as default — evaluate per product |
| **Google Calendar MCP** | Events, availability, scheduling | Claude | active |
| **Gmail MCP** | Drafts, labels, thread search (send needs approval) | Claude | active |
| **Microsoft 365 MCP** | Outlook mail/calendar, SharePoint, Teams search | Claude | active |
| **Box (file storage) MCP** | Create/copy/search/download files, permissions | Claude | active |
| **DocuSign MCP** | Envelopes, templates, workflows, agreements | Claude | active — contracts pipeline |
| **iMessage MCP** | Read/search/send iMessages, contacts | Claude | active — send is side-effectful |

---

## CONTENT / DESIGN CONNECTORS

| Connector | What it does | Engine | Status |
|---|---|---|---|
| **Canva MCP** | Designs, brand templates, export, folders | Claude | branded asset pipeline |
| **Gamma MCP** | Generate decks/docs/sites, export | Claude | cannot edit existing gammas |
| **visualize** | Inline SVG/HTML widgets, charts, diagrams | Claude | in-chat visuals |

---

## PLATFORM / META CONNECTORS

| Connector | What it does |
|---|---|
| **cowork** | Artifacts (live persisted HTML views), file presentation, directory access |
| **scheduled-tasks** | Cron + one-shot triggers into this session |
| **mcp-registry** | Search/suggest new connectors from the registry |
| **skills / plugins** | List + suggest skills and plugins |
| **session_info** | Read prior session transcripts |
| **workspace** | Sandboxed Linux shell + web fetch |

---

## AUDIT FINDINGS (TruthSerum)

1. **Two Chrome controllers exist** — `Claude_in_Chrome` (full DOM automation) and `Control_Chrome` (basic tab ops). Prefer `Claude_in_Chrome`. Redundant; no action needed but noted.
2. **Notion + Monday are connected but DEPRECATED as defaults.** Leaving them connected is fine; routing canonical truth through them is not. Enforced in `OPS/BRIDGE.json` truth_source.
3. **Codex sees only what its `config.toml` declares.** The high-value set to mirror there: Supabase, GitHub, Vercel. Everything else is Claude-only until added. See capability map.
4. **Secrets discipline holds** — every connector's auth is in the vault, none in this repo. Verified at push time by a staged-file secret gate.

---

## SCALING NOTE

When a connector graduates from "connected" to "load-bearing" (a product depends on it in production), promote it: document its auth location, add it to the relevant product entry in `docs/PRODUCTS.md`, and if Codex needs it, add it to `config.toml`. Do not wire every connector you own into every engine — only what a task actually touches.
