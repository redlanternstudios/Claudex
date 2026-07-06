# TODAY.md — RedLantern Daily Command Center
> Update at session start. This file is the single source of current intent.
> No agent may start work without reading this file first.

---

## DATE
2026-07-06

## ACTIVE PRODUCT
Amina (iOS submission window) · Claudex stays the standing control plane

## CURRENT SPRINT GOAL
Get Amina through the Apple gate. Software side is verified clean; remaining work is the human lane (Keymon: signing, archive, TestFlight, device matrix, submit) plus two owner decisions from Ro.

## ALLOWED AGENTS
ROBBY, PM, RUNTIME, BACKEND, FRONTEND, DESIGN, QA, REVIEW, SECURITY, TRUTH, CHANGE, ARCHITECT, LIBRARIAN, TECHWRITER

## BLOCKED AGENTS (do not activate today unless Ro explicitly reassigns)
MARKETING, SALES, ASO_SEO, GTM, CONTENT, EDITORIAL, BRAND_COPY

## OPEN RISKS
- [ ] Amina iOS submission BLOCKED on Apple account items (no development team on Release archive; TestFlight + authenticated device matrix unrun)
- [ ] Terms say 18+ while age gate is 13+ — owner decision needed before submission
- [ ] OPENAI_API_KEY rotation recommended (exposed in a chat transcript 2026-07-04)
- [ ] Codex side monitor UNVERIFIED (.claudex/alignment.json absent; Claudex/ pointer path in product .claudex.json files unresolved)
- [ ] TradeSwarm schema drift — do not touch until host side /repo-ingest
- [ ] Authentic Hadith UAT issues open while App Store review state may change externally

## TOP 3 TASKS
1. Keymon: Apple development team → signed Release archive → TestFlight → authenticated device matrix → submit
2. Ro: resolve the 18+/13+ terms conflict and rotate OPENAI_API_KEY
3. Codex: execute the active `amina/chat-loop-proof` lane — one authenticated browser exchange, verify the exact persisted rows

## CURRENT LANE
`amina/ios-submission-qa` (human, waiting) · `amina/chat-loop-proof` (codex, active)

## SINGLE NEXT ACTION
Keymon selects the Apple development team and produces the signed Release archive. Everything downstream of the gate is queued behind that.

## DEFINITION OF DONE
1. Release archive signed with a development team selected.
2. Build uploaded to TestFlight.
3. Authenticated device matrix run, including RevenueCat sandbox.
4. 18+/13+ conflict resolved and reflected in the shipped terms.
5. TruthCal receipt written and bridge next action updated.

## DO NOT TOUCH TODAY
- v0/* branches (one carries a broken gpt-4-turbo re swap; no merges in the submission window without `pnpm test:invariants`)
- HireWire build work (closed loop coach lane closed with TC-20260703-006; product otherwise paused)
- TradeSwarm (schema drift — blocked)
- Clarity, Daily OS, QBos (pipeline)
- Any pricing or landing page work

## RELEASE TARGET
Amina iOS submission to App Store review — gated on Apple account items, not software

## END-OF-DAY PROOF REQUIRED
- [ ] Screenshot of working feature
- [ ] Test command output (not just "looks good")
- [ ] List of files changed
- [ ] Known risks remaining
- [ ] TruthCal receipt for any meaningful change

## CONTEXT
Full synthesis of the last four days across Cowork and code: `OPS/CTP_STUDIO_STATE_20260706.md`

---
*This file is updated by Ro at session start. Refreshed 2026-07-06 by Claude at Ro's direction (Cowork session) — it had been stale since 2026-07-02 and was capping the studio at YELLOW.*
