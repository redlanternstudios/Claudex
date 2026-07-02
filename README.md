# Claudex — RedLantern Studios cross-engine OS

The shared brain for RedLantern Studios. Both **Claude Code** and **Codex** boot from this repo, read the same state, and hand off work without Ro re-explaining anything.

Claudex is Claude + Codex. This repo is the operating system layer, not product code.

---

## WHAT LIVES HERE (and what does not)

**In scope — the OS layer:**
- Instructions: `CLAUDE.md` (Claude), `AGENTS.md` (Codex), `.claude/`
- State: `OPS/BRIDGE.json` + `OPS/BRIDGE_PROTOCOL.md` (the cross-engine handoff)
- Frameworks: `CTP_FRAMEWORK.md`, `BUILD_CONSTITUTION.md`
- Governance: `OPS/` (decision log, known risks, release gate, receipts, maps)
- Truth / memory: `memory/`, `context/`
- Org: `swarmclaw/`

**Out of scope — never commit here:**
- Product source code (Amina, The Lantern, Deixis, TradeSwarm, etc. live in their own repos)
- Secrets (API keys, tokens, `.env` files) — hard-excluded in `.gitignore`
- Large binaries (PDF, DOCX, PPTX, images except brand logos)

A shared brain only works if it stays trustworthy. Volume is not value.

---

## THE BRIDGE (start here)

`OPS/BRIDGE.json` is the single shared state contract. Read `OPS/BRIDGE_PROTOCOL.md` for the rules.

Sync color:
- **GREEN** — keep moving.
- **YELLOW** — usable, read the sync_note first.
- **RED** — stop; fix or explain the blocker before build work.

Every session: read the bridge first, write it at close. Every meaningful change gets a TruthCal receipt in `OPS/receipts/`.

---

## BOOT SEQUENCE

**Claude** reads `.claude/CLAUDE.md`. **Codex** reads `AGENTS.md`. Both then:
1. Read `OPS/BRIDGE.json` — focus product, lane, sync color, latest receipt, next action.
2. Read `memory/MEMORY.md` index.
3. State current reality in 5 lines. If sync is RED, stop and surface the blocker.
4. Work. At close, update the bridge, write a receipt, commit, push.

---

*BUILD IN PUBLIC. OPERATE IN TRUTH. — RedLantern Studios · By Red, LLC*
