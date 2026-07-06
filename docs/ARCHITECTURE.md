# ARCHITECTURE — the Claudex OS model

Version 1.0 · 2026-07-02
How the layers stack, where Claudex sits, and how information flows between engines and products.

---

## THE MODEL

RedLantern runs as a founder-led, AI-native dev OS: one founder (Ro) directing a layer of AI engines
(Claude specialist + Codex builder) sitting on top of an agent execution layer (SwarmClaw, 36 agents),
building a portfolio of products off one shared brain (this repo).

```
        Ro (founder — direction, judgment, final approval)
                        │
        ┌───────────────┴───────────────┐
     Claude (Cowork)                 Codex (VS Code)
     senior specialist               throughput builder
        └───────────────┬───────────────┘
                        │  read/write
                CLAUDEX REPO  ← the shared brain
             (instructions, bridge state,
              frameworks, governance, memory)
                        │
                SwarmClaw agent OS (execution)
                        │
     Products: Amina · Authentic Hadith · TradeSwarm ·
     ByRed Daily OS · The Lantern · Deixis · Mission · HireWire
```

---

## LAYERS (each with purpose + where it lives)

| # | Layer | Lives in | Purpose |
|---|---|---|---|
| 1 | Identity / behavior | `CLAUDE.md`, `AGENTS.md`, `.claude/` | Who each engine is, how it communicates, truth rules. |
| 2 | Truth / integrity | `CTP_FRAMEWORK.md`, `BUILD_CONSTITUTION.md`, `.claude/frameworks/` (The Audit) | Enforce reality over assumption. |
| 3 | State (the bridge) | `OPS/BRIDGE.json` + `OPS/BRIDGE_PROTOCOL.md` | Cross-engine handoff: lane, sync color, receipt, next action. |
| 4 | Governance | `OPS/` (decision log, known risks, release gate, receipts, permissions, firebreak) | What is allowed, blocked, logged, reviewed. |
| 5 | Reference | `docs/` (STACK, CONNECTORS, PLUGINS_AND_SKILLS, CAPABILITY_MAP, PRODUCTS, this file, SCALING) | The map of the whole system. |
| 6 | Memory / truth log | `memory/` | Verified facts, agent prompts, product knowledge, decisions. |
| 7 | Org | `swarmclaw/` | Agent registry, routing policy, org sync spec. |
| 8 | Products | product repos (pointed to, not stored) | The actual apps. |

---

## INFORMATION FLOW (the rules)

1. **Truth flows down, never up silently.** Source truth (memory + TODAY.md) → validation → generation → execution → receipts. Generation never becomes canonical truth on its own.
2. **The handoff medium is the repo.** Chat memory does not cross engines. If it matters to the other engine, it is a file: bridge, receipt, decision log, spec.
3. **State is one file.** `OPS/BRIDGE.json` is the single shared state. Both engines derive the same sync color from it. No competing state files.
4. **Secrets never enter the repo.** Auth is referenced by location (vault), never by value. Enforced by `.gitignore` + a staged-file secret gate at push.

---

## WHERE CLAUDEX SITS

Claudex is layers 1–7. It is the OS, not the products. A new product plugs in by pointing back to Claudex (inheriting the whole operating layer) rather than copying it. This is what makes the system compound: every product added strengthens the shared brain instead of forking it.

---

## SCALING NOTE

The architecture is designed to add engines and products without rewrites:
- **More build throughput** → more Codex lanes, each reading the bridge + capability map.
- **More products** → new entries in `docs/PRODUCTS.md` + bridge, each inheriting the OS.
- **More agents** → registered in `swarmclaw/` org, routed per policy.
The invariant that must never break: one shared brain, one shared state, secrets out, truth labeled.
