# SCALING — forward playbooks

Version 1.0 · 2026-07-02
How to grow the system without breaking the invariants. Copy-paste playbooks for the common moves.
Invariants that must never break: one shared brain · one shared state · secrets out of the repo · every claim truth-labeled.

---

## PLAYBOOK: add a new product

1. Create its repo under `redlanternstudios/`. Product code stays there, NOT in Claudex.
2. Add an `AGENTS.md` (Codex) + `CLAUDE.md` (or pointer) in that repo that references Claudex as the OS.
3. Add an entry to `docs/PRODUCTS.md` (repo, Supabase ref, status, class).
4. Add an entry to `OPS/BRIDGE.json` `products` block (status, sync_status, current_lane, next_action).
5. Decide Supabase: shared project (`endovljmaudnxdzdapmf`, prefix + RLS) or isolated (payments/PII at volume). Log the decision in `OPS/DECISION_LOG.md`.
6. First real task: run `/repo-ingest` so the OS has a verified picture before build.

## PLAYBOOK: add a new connector (MCP)

1. Connect it on the Claude (Cowork) side.
2. Add a row to `docs/CONNECTORS.md`: purpose, engine, auth location (vault pointer), status.
3. If Codex needs it, add it to `~/.codex/config.toml` — otherwise it stays Claude-only and Codex must delegate.
4. Never inline the auth. Vault only. Confirm `.gitignore` still walls it.

## PLAYBOOK: add a new SwarmClaw agent

1. Register in `swarmclaw/RL_ORG_CHART_LIVE.json` (the SSOT).
2. LIBRARIAN syncs to GitHub + Supabase + Drive per `swarmclaw/ORG_SYNC_SPEC.md`.
3. Set model routing (default: Ollama local, per `MODEL_ROUTING_POLICY.md`).
4. Write its prompt to `memory/agent_prompts/`.

## PLAYBOOK: add a new engine or lane

1. It reads `OPS/BRIDGE.json` + `docs/CAPABILITY_MAP.md` on boot — inherits the division of labor automatically.
2. Give it a lane in the bridge `lanes_open` for the relevant product.
3. If it is a new engine type, add a column to the capability map so delegation stays accurate.

## PLAYBOOK: build a new RLS capability (skill)

1. Scaffold with `skill-creator` into `.claude/skills/` (Claude-invocable).
2. Also write it as a plain protocol doc in the repo so Codex can READ and follow it.
3. Build once, expose at the level each engine can consume.

---

## HARDENING BACKLOG (forward-suggestive, not yet done)

Ordered by leverage. These are the next real upgrades to the OS itself:

1. **Rotate the GitHub token** and move to a fine-grained PAT scoped to `redlanternstudios` only. (Immediate — token was read this session.)
2. **Fix the local `.git` lock** on the workspace so commits work host-side without the clean-clone workaround.
3. **Stand up n8n production URL + flow versioning/backup.** Currently ASSUMED localhost. Logic spine must be durable.
4. **Per-repo `AGENTS.md` pointer files** in every product repo (Codex parity everywhere, not just Claudex).
5. **Bridge validator as a script** — a small check that refuses to flip sync GREEN when TODAY.md is stale or a receipt is missing. Automate the honesty.
6. **Secret-scanning pre-commit hook** in every repo, mirroring the push-time gate used here.
7. **PostHog/Sentry topology decision** — one project vs per-product. Currently UNKNOWN.
8. **Decide Supabase isolation policy** before the first product hits payments/PII at volume.

---

## THE COMPOUNDING THESIS

Every product added should strengthen the shared brain, not fork it. If adding product N means copying the OS, the architecture has failed. Adding product N should mean: one `PRODUCTS.md` row, one bridge entry, one pointer file — and it inherits everything. That is the whole point of Claudex.
