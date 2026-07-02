# TODAY.md — RedLantern Daily Command Center
> Update at session start. This file is the single source of current intent.
> No agent may start work without reading this file first.

---

## DATE
2026-06-12

## ACTIVE PRODUCT
Amina

## CURRENT SPRINT GOAL
QuietBuild OS dogfood — prove core loop is real and repeatable

## ALLOWED AGENTS
ROBBY, PM, RUNTIME, BACKEND, FRONTEND, DESIGN, QA, REVIEW, SECURITY, TRUTH, CHANGE, ARCHITECT, LIBRARIAN, TECHWRITER

## BLOCKED AGENTS (do not activate today unless Ro explicitly reassigns)
MARKETING, SALES, ASO_SEO, GTM, CONTENT, EDITORIAL, BRAND_COPY

## OPEN RISKS
- [ ] Amina repo state unverified — needs /repo-ingest before any build work
- [ ] TradeSwarm schema drift — do not touch until /repo-ingest run
- [ ] Authentic Hadith: no scholarly sign-off on file yet

## TOP 3 TASKS
1. Run /repo-ingest on Amina repo — update alif_product_truth_log.md
2. Verify Amina core loop is wired end-to-end (not just UI)
3. Confirm Supabase RLS on all Amina tables before next deploy

## DO NOT TOUCH TODAY
- HireWire (PAUSED)
- TradeSwarm (schema drift — blocked)
- Clarity, Daily OS, QBos (PIPELINE)
- Any pricing or landing page work

## RELEASE TARGET
Local alpha proof — no production deploy until TRUTH gate passes

## END-OF-DAY PROOF REQUIRED
- [ ] Screenshot of working feature
- [ ] Test command output (not just "looks good")
- [ ] List of files changed
- [ ] Known risks remaining
- [ ] TruthCal receipt for any meaningful change

---
*This file is updated by Ro at session start. Agents read it, they do not rewrite it.*
