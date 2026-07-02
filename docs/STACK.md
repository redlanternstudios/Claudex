# STACK — RedLantern Studios (Claudex canonical)

Version 1.0 · 2026-07-02 · Truth-labeled: VERIFIED / ASSUMED / UNKNOWN
Source of truth for the tech stack. If a rule here conflicts with `CLAUDE.md`, `CLAUDE.md` wins.

---

## LOCKED STACK (VERIFIED — from memory/knowledge/global-stack-rules.md, 2026-06-08)

| Layer | Tech | Rule |
|---|---|---|
| Frontend | Next.js (App Router) + Tailwind CSS | UI only. No business logic in client components. |
| Backend | Supabase — Postgres + Auth + RLS | Supabase Auth, not custom. RLS on every table before any write. |
| Business logic | n8n | ALL logic lives here. No exceptions. |
| SaaS integration | Make.com | SaaS-to-SaaS glue only. |
| Product analytics | PostHog | Critical events only, not every click. |
| Error tracking | Sentry | Errors with full context, not warnings. |
| UI generation | v0.dev | Prototyping assist (Amina). |
| Agent OS | SwarmClaw (localhost:3456) + RobbyPA conductor | OpenClaw gateway 18789. |
| Design / assets | Canva, Gamma, MagicPatterns | Branded output pipeline. |

---

## NON-NEGOTIABLES (VERIFIED — enforced by SwarmClaw agents)

1. **LOGIC RULE** — Business logic lives in n8n. An `/api` route may call a Supabase query, call an n8n webhook, and return a response. It may NOT hold conditional business rules, orchestration, or AI processing.
2. **COMMIT RULE** — No agent commits to `main`. Ever. Work → feature branch → PR → Reviewer → QA → Ro approval → merge. Branch naming: `[agent-role]/[product]/[task-slug]`.
3. **RLS RULE** — Every Supabase table has RLS enabled before any data is written, with policies for SELECT/INSERT/UPDATE/DELETE. Default: users see only their own rows.
4. **RELIGIOUS CONTENT RULE** — Authentic Hadith content requires human scholarly sign-off (name + date + notes) before any downstream step. No agent may claim to verify a hadith.
5. **DEPENDENCY RULE** — No new package without PR justification. No new Supabase extension without Architect sign-off. No new Make scenario without Integrations agent + Ro aware.
6. **BEST-PRACTICE-FIRST** — Recommend and implement the correct long-term solution directly. No "shortcut + migrate later" unless a concrete named blocker makes the right path impossible now.

---

## MODEL ROUTING (VERIFIED — LOCKED 2026-06-25, money-optimized)

- All 36 SwarmClaw agents → **Ollama local** (`llama3.1:8b`, free, uncapped, localhost:11434).
- DeepSeek + Anthropic API → OFF. Groq → free-burst only.
- Re-apply: `python3 ~/swarmclaw/set_ollama_all.py`.
- Do not change without a cost decision. Full policy: `swarmclaw/MODEL_ROUTING_POLICY.md`.

---

## VERIFIED INFRASTRUCTURE

| Thing | Value | Status |
|---|---|---|
| Supabase (shared) | `endovljmaudnxdzdapmf` — shared DB, table-prefix + RLS per product | VERIFIED (2026-06-08) |
| Amina Supabase | `endovljmaudnxdzdapmf` | VERIFIED |
| TradeSwarm Supabase | `rnvaagbvribokkhuutznc` | VERIFIED |
| ByRed Daily OS Supabase | `mlmrdkiyxlngmwhdtrln` | VERIFIED |
| GitHub org | `redlanternstudios` | VERIFIED |
| OS repo (this) | `redlanternstudios/Claudex` | VERIFIED (renamed from rls-claude-os 2026-07-02) |
| Filesystem MCP | `99bd0d9e` → workspace path, bidirectional | VERIFIED |
| Hosting | Vercel | VERIFIED |

---

## OPEN / UNRESOLVED (do not treat as solved)

- **n8n production URL** — ASSUMED `localhost:5678`. No production URL confirmed. Verify before any n8n automation work.
- **Make.com vs n8n boundary** — rule is "Make = SaaS integrations" but no deeper written spec. ASSUMED.
- **PostHog project topology** — one shared project or per-product? UNKNOWN.
- **Notion** — DEPRECATED as active default. Do not point truth at it unless Ro reverses.
- **Monday** — DEPRECATED as active default. Evaluate per product.

---

## SCALING NOTES (forward-suggestive)

- **Shared Supabase is a decision, not an accident.** One project, table prefixes + RLS. This scales until a product needs isolation for compliance or blast-radius reasons (candidates: anything with payments or PII at volume). When that day comes, split that product to its own project and record it in `docs/PRODUCTS.md` + a decision log entry.
- **n8n is the logic spine.** As products grow, the risk is logic leaking back into `/api` routes for speed. Enforce at review. A production n8n URL + backup/versioning of flows is the next hardening step.
- **Model routing is cost-locked to Ollama.** The scale lever is: move latency-sensitive or quality-sensitive tiers to Groq/Anthropic only when a product has revenue to justify it. Decide per product, log it.

See `docs/SCALING.md` for the how-to playbooks.
