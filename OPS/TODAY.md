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
- [ ] Amina iOS submission BLOCKED on Xcode account credentials for team P5H924VDYH (team is SET and signing identity present per TC-20260707-002; the archive cannot create or fetch provisioning profiles for com.redlanternstudios.amina until the Apple ID is added or refreshed in Xcode Accounts)
- [ ] OPS/API_KEY_VAULT.md fails the bridge secret scan (gitignored and untracked, nothing pushed) — Ro decision needed on its location
- [ ] Local main is ahead of origin — Codex reads GitHub, so remote is stale until Ro pushes from the host Mac
- [ ] Terms say 18+ while age gate is 13+ — owner decision needed before submission
- [ ] OPENAI_API_KEY rotation recommended (exposed in a chat transcript 2026-07-04)
- [ ] Codex side monitor UNVERIFIED (.claudex/alignment.json absent; Claudex/ pointer path in product .claudex.json files unresolved)
- [ ] TradeSwarm schema drift — do not touch until host side /repo-ingest
- [ ] Authentic Hadith UAT issues open while App Store review state may change externally

## TOP 3 TASKS
1. Keymon: open Xcode Settings > Accounts, add or refresh the Apple ID for team P5H924VDYH, rerun the Release archive with automatic provisioning → TestFlight → device matrix → RevenueCat sandbox → notification delivery → submit
2. Ro: push local main to GitHub from the host Mac, rotate OPENAI_API_KEY, decide API_KEY_VAULT.md location, confirm 13+ terms closure
3. Codex: run the approved side effect E2E with disposable test data (report, block, account deletion, signup confirmation) — this also closes the open `amina/chat-loop-proof` lane

## CURRENT LANE
`amina/ios-submission-qa` (human, active — Apple credential gate) · `amina/chat-loop-proof` (codex, open)

## SINGLE NEXT ACTION
Keymon fixes the Xcode account credential for team P5H924VDYH and reruns the Release archive. Everything downstream of the gate is queued behind that.

## DEFINITION OF DONE
1. Release archive builds with valid provisioning for com.redlanternstudios.amina.
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
*This file is updated by Ro at session start. Refreshed 2026-07-06 late PDT (2026-07-07 UTC) by Claude at Ro's direction (Cowork session) — it had been stale since 2026-07-02 and was capping the studio at YELLOW. Risk wording aligned to bridge rev 60 and receipts TC-20260707-001/002.*
