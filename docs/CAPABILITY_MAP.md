# CAPABILITY MAP — Claude (Cowork) vs Codex

Version 1.0 · 2026-07-02
The contract for how the two engines divide work. "Codex builds off Claude" means Codex delegates
what it structurally cannot do to Claude, and Claude leaves durable artifacts Codex can act on.

---

## THE TWO ENGINES

- **Claude (Cowork)** — senior specialist. Architecture, security, product taste, final judgment, plus a wide tool surface: ~40 MCP connectors, a browser, computer-use, and a skills system. Auto-loads memory. Runs skills.
- **Codex** — high-throughput builder in VS Code. Reads the same repo, reaches MCP via `config.toml`, commits code fast. NO computer use, NO browser, NO auto-memory, NO skills.

Both read the same repo. The repo is the shared brain. `OPS/BRIDGE.json` is the shared state.

---

## WHAT EACH CAN DO

| Capability | Claude | Codex | Rule |
|---|---|---|---|
| Read/write repo files | yes | yes | Both. Codex is faster at bulk code. |
| Commit + push | yes (via token/browser) | yes (native git) | Codex owns routine git; Claude pushes when Codex/host is blocked. |
| Supabase (SQL, migrations) | yes (MCP) | yes (MCP via config.toml) | Either. Prefer live MCP over stale schema files. |
| Vercel deploy/debug | yes (MCP) | yes (MCP) | Either. |
| Web browsing / DOM / forms | yes (Chrome) | NO | Delegate to Claude. |
| Native desktop apps | yes (computer-use) | NO | Delegate to Claude. |
| Skills (docx/pptx/xlsx/pdf, brand, design, research) | yes | NO | Delegate to Claude. |
| Auto-load memory index | yes | NO (must be told to read `memory/MEMORY.md`) | Codex boot sequence forces the read. |
| Long autonomous build loops | limited | yes | Codex owns heavy scaffolding + mechanical work. |
| Architecture / security / final judgment | yes | assists | Claude is the senior reviewer. |

---

## DELEGATION CONTRACT

**Codex → Claude** (Codex hands off when it hits a wall):
- Needs a browser (scrape, click, OAuth flow, web verify) → Claude.
- Needs a generated artifact (Word doc, deck, spreadsheet, branded PDF, design) → Claude.
- Needs deep research or a design critique → Claude.
- Needs architecture or security sign-off before merge → Claude (reviewer role).

**Codex subagents** are temporary workers, not permanent roles.
- Use `explorer` for a specific repo question.
- Use `worker` for a bounded edit with one file owner and one output.
- If a task can be split safely, delegate the side task instead of doing every step in one thread.
- Treat this as the default on fresh chats once the trigger doc is read.

**Claude → Codex** (Claude leaves artifacts Codex can build on):
- Claude writes the spec, scope lock, and acceptance criteria → Codex implements.
- Claude writes migrations/contracts as files with regen commands → Codex runs and extends.
- Claude records decisions in `OPS/DECISION_LOG.md` + a receipt → Codex reads state, continues.

**The handoff medium is always the repo**, never chat memory. If it isn't written to the repo (bridge, receipt, decision log, spec), it did not happen for the other engine.

---

## BOOT PARITY

Both engines run the same boot: read `OPS/BRIDGE.json` → read instructions (`CLAUDE.md` / `AGENTS.md`) → read `memory/MEMORY.md` → state reality in 5 lines → if RED stop → work → at close update bridge + write receipt + push.

The only difference: Claude does this partly automatically; Codex does it because `AGENTS.md` step 1 tells it to. That is why `AGENTS.md` and the bridge must always be in the repo — Codex has no other way to inherit Claude's context.

---

## SCALING NOTE (forward-suggestive)

- As Codex takes more of the mechanical load, Claude's job shifts further toward **review gates and truth enforcement**. Keep Claude on the senior seat; do not burn it on scaffolding Codex can do.
- The failure mode to watch: capability drift. When a new tool is added to Claude's Cowork surface, it does NOT automatically reach Codex. Update `docs/CONNECTORS.md` and, if Codex needs it, `config.toml`. Otherwise Codex will assume a capability it lacks.
- Long-term, the delegation contract is the scaling asset. More engines (or more Codex instances per lane) can plug in by reading this file + the bridge, and inherit the same division of labor.
