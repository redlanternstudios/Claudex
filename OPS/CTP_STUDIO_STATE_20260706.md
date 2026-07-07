# CTP — Studio State Synthesis
Date: 2026-07-06 · Author: Claude (Cowork session, Ro directing) · Framework: CTP_FRAMEWORK.md v3.0
Scope: everything shipped or decided across Cowork sessions and code since 2026-07-02, pulled into Claudex and the Obsidian vault.

---

## STEP 0 — PROMPT CONTRACT

GOAL: One synthesized, truth labeled picture of studio state covering both surfaces (Cowork/Claude work and Codex/code work), written into Claudex so the bridge, TODAY.md, and the vault agree.
CONSTRAINTS: No secrets in any committed file. `_CLAUDEX LIVE.md` stays generated, never hand edited. Bridge writes go through the validated command layer.
FORMAT: This document + refreshed OPS/TODAY.md + TruthCal receipt + regenerated live note.
FAILURE: Output fails if it restates the bridge without reconciling the two surfaces, if any claim lacks a VERIFIED/PARTIAL/ASSUMED/UNKNOWN label, or if the drift items are softened.

---

## WHAT SHIPPED — COWORK / CLAUDE SURFACE (since 2026-07-02)

1. **Amina hydration root cause fixed and verified on prod.** Pre paint theme script vs missing `suppressHydrationWarning` on `<html>`. PR #52 merged as `1ddc42b`, Vercel deploy READY, exact failing condition re tested clean. Receipt TC-20260705-006. **VERIFIED**
2. **Live E2E unauth pass.** 6 routes with screenshot evidence; authed leg pending sign in. Receipt TC-20260705-007. **PARTIAL**
3. **v0 branch flagged do not merge.** `v0/redlanternstudios-997abb7a` regresses the gpt-4o owner decision and reintroduces FOUC. Standing rule: no v0/* merges in the submission window without `pnpm test:invariants`. **VERIFIED**
4. **Amina Deen Aware Context feature.** Law: Amina asks, never infers. P0–P5 phasing dispatched to Claude Code. Receipt TC-20260702-003. **VERIFIED (spec dispatched; build state UNKNOWN)**
5. **Obsidian knowledge layer stood up.** Vault = read and graph surface only, no write authority, secrets excluded, cloud sync off. Receipt TC-20260702-002. **VERIFIED**
6. **Bridge heartbeat live.** Hourly Cowork task `claudex-bridge-heartbeat` keeps BRIDGE.json fresh for Codex; the file is the channel. **VERIFIED**
7. **The Audit framework** (BUILD REALITY standard, trigger `theaudit`) and **RLS PPTX template** (5 slide masters, brand spec in `.claude/brand/`) added to the operating layer. **VERIFIED on disk**
8. **HireWire notifications standard v1** (23 notifications, 5 domains) written to vault + Drive. HireWire itself stays paused; contract is canonical. **VERIFIED as spec**

## WHAT SHIPPED — CODEX / CODE SURFACE (since 2026-07-02)

1. **Obsidian ↔ Claudex live bridge.** `scripts/sync-obsidian.mjs`, `_CLAUDEX LIVE.md` generation, Ro context room, platform rooms (v0 / GitHub / Supabase). Receipts TC-20260703-002/003/004. **VERIFIED**
2. **Amina iOS submission push.** Prod chat verified on OpenAI; handoff to Keymon dispatched (TC-20260705-002, PR #47). Safe areas fixed and simulator verified (TC-20260705-003, PR #48). **VERIFIED**
3. **Apple gate reached, then narrowed.** First BLOCKED on missing development team (TC-20260705-001/004, TC-20260706-003). By end of day: team P5H924VDYH SET in Xcode, signing identity present, cap sync ios done (TC-20260707-002). Live blocker is now the **Xcode account credential** for the team — the archive cannot create or fetch provisioning profiles for com.redlanternstudios.amina. **VERIFIED BLOCKED — human lane (Keymon)**
4. **Native simulator authenticated E2E pass** on iPhone 17 Pro iOS 26.5 with evidence (TC-20260706-006); Amina continuation code green — all proof gates pass, prod build 58 pages (TC-20260707-001). Overnight Codex lanes (trust closure, notification system, logo seal) merged and receipted. **VERIFIED**
5. **Amina feature enrichment audit** (TC-20260706-001, PARTIAL) and **Companion Continuity design registered** (TC-20260706-002, PASS).
6. **HireWire closed loop coach shipped.** Verified fit gate ≥70%, single resume generation journey, rendered QA clean, 33 tests pass. Commits `2f400f3`, `b3e1409`. Receipts TC-20260703-005/006. Lane closed. **VERIFIED**

---

## 3 PASS

**Pass 1 — Surface.** Busy, productive week. Amina is one human gate from submission. HireWire quietly shipped a real loop. The knowledge layer (Obsidian, bridge, heartbeat) went from concept to running system.

**Pass 2 — Challenge.** The software claims are strong because they carry receipts. The coordination claims are weaker than they look: the bridge write was left uncommitted twice, TODAY.md sat 4 days stale and capped the studio at YELLOW, stale git and bridge locks broke two heartbeat commits (one falsely claimed, TC-20260706-008), histories diverged 12 ahead / 2 behind and needed a hand merge to rev 60 (TC-20260707-003), `OPS/API_KEY_VAULT.md` fails the bridge secret scan (gitignored, nothing pushed, location decision pending), and Codex marked global GREEN from a stale base and had to be overruled. The system that certifies truth has hygiene debt of its own.

**Pass 3 — Real truth.** The constraint has moved. It is no longer engineering throughput; it is **human gates and sync topology**. Keymon owns one credential fix in Xcode Accounts. Ro owns four small items: push local main from the host Mac (Codex reads GitHub, so remote staleness silently degrades every Codex boot), rotate OPENAI_API_KEY, decide the API_KEY_VAULT.md location, and confirm the 13+ terms closure. The deeper pattern: two engines plus a heartbeat all writing to one repo that only Ro can push means local truth and remote truth drift apart every day by design. The hand merge worked this time because the heartbeat caught it; the durable fix is push capability from wherever writes happen, or an explicit rule that local BRIDGE.json is canonical and Codex boots read the machine, not GitHub. Second order: fix the topology, not each day's divergence.

---

## DRIFT REGISTER (open, unsoftened)

| Item | State | Owner |
|---|---|---|
| TODAY.md stale since 2026-07-02 | FIXED this session (refreshed to 2026-07-06, wording aligned to rev 60) | Ro (cadence) |
| Diverged histories (local 12 ahead / 2 behind) | RECONCILED by heartbeat to bridge rev 60 (TC-20260707-003) | Claude heartbeat |
| Local main ahead of origin — remote stale for Codex | OPEN — push must happen from the host Mac | Ro |
| `OPS/API_KEY_VAULT.md` fails bridge secret scan (gitignored, nothing pushed) | OPEN — location decision | Ro |
| Xcode account credentials for team P5H924VDYH missing or invalid | OPEN — the live Apple blocker | Keymon |
| Terms 18+ vs age gate 13+ | Closure reported; Ro to CONFIRM in TODAY.md | Ro |
| OPENAI_API_KEY rotation | OPEN | Ro |
| `Claudex/` pointer path in product `.claudex.json` files unresolved | OPEN | Ro decision |
| Untracked working tree files (templates, .local docs, OPS/.write_test) | Triaged this session | Claude |
| TradeSwarm schema drift, repo outside workspace | OPEN — do not touch until host side ingest | Ro + host |
| capacitor.config.ts points at vercel.app while prod references myamina.app | UNKNOWN if custom domain must be canonical — decide before archive | Keymon/Ro |

---

## NEXT ACTIONS (ranked)

1. **Keymon:** Xcode Settings > Accounts — add or refresh the Apple ID for team P5H924VDYH, rerun the Release archive with automatic provisioning, then TestFlight → device matrix → RevenueCat sandbox → notification delivery → submit.
2. **Ro:** push local main from the host Mac (unblocks every Codex boot), rotate OPENAI_API_KEY, decide API_KEY_VAULT.md location, confirm 13+ terms closure.
3. **Codex:** run the approved side effect E2E with disposable test data (report, block, account deletion, signup confirmation) — closes `amina/chat-loop-proof`.
4. **Codex/Ro:** resolve the `Claudex/` pointer path and the push topology so local and remote truth stop diverging daily.

---

*Vault placement: linked from OPS/TODAY.md. Coordination truth remains OPS/BRIDGE.json + latest receipt; this document is the synthesized human view for 2026-07-06.*
