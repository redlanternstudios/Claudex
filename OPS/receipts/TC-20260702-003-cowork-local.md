━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TRUTHCAL RECEIPT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Receipt ID:         TC-20260702-003
Product:            Amina
Sprint / milestone: Deen-Aware Family Context ("Ask, Never Infer")
Date:               2026-07-02
Author agent:       Cowork Claude (design + handoff)
Reviewer agent:     PENDING (Claude Code verify against main)
Human accepted by:  Ro (design approved in chat)
CHANGE RECORD:      NONE (spec + handoff, no code yet)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

WHAT WAS BUILT
Intent:             Design + Claude Code handoff for Amina cultural/age awareness. Core law: Amina ASKS, never infers. On family/relational topics she considers culture + age and invites the sister to share; stated facts may be gently referenced but every implication is turned into a question.
Feature area:       Amina chat brain / profile / memory / prompt
User-visible:       YES (once built)

FILES CHANGED
  None yet. Deliverable is a single copy/paste Claude Code handoff prompt (in Cowork chat, this session).

TRUTH LABEL BLOCK
VERIFIED:           Pre-#28 local repo audit — profiles had no age/ethnicity; chat/route.ts used a static SYSTEM_PROMPT with no profile injection; no user memory table. (app/api/chat/route.ts, supabase/migrations/001_initial_schema.sql, onboarding/complete/route.ts)
ASSUMED:            main now advanced via PR #28 (Ro's Claude Code session: adds Deen grounding, age gate, profile/memory, memory controls, guidance). Exact new schema/prompt state NOT re-read from post-#28 main here. Handoff instructs Claude Code to verify + reconcile before building.
MISSING (to build):  consented age_range + heritage capture; family-dynamic topic detection; ask-behavior in prompt; stated-only user_facts memory; scholar-reviewed cultural_context_kb; ask-not-infer eval set.
CANNOT VERIFY:      post-#28 main contents from this workspace (Claude Code owns that repo state).

DESIGN LAW (locked with Ro)
  1. Never infer situation/views/family-views from heritage, age, ethnicity.
  2. On family/relational topics: ASK. Consider culture + age; invite the sister to share.
  3. Reference STATED facts gently; convert every cultural/generational implication into a question.
  4. Ethnicity has no standing in the Deen; counter colorism/prejudice with mercy, never validate.
  5. Culture surfaces only on family/relational topics.
  6. Fiqh -> existing fiqh protocol; frame difference, never rule.

PHASING
  P0 inject existing profile | P1 consented age_range+heritage (special-category, opt in, deletable)
  P2 family-dynamic detection + ask behavior | P3 stated-only user_facts memory
  P4 scholar-reviewed cultural_context_kb (comprehension + Deen anchor) | P5 evals + red team (mandatory)

GOVERNANCE SIGN-OFFS
TRUTH:       PASS — pre-#28 claims verified; post-#28 flagged ASSUMED; handoff forces reconcile.
SECURITY:    PASS — special-category data rules specified (opt in, RLS owner only, deletable, no logs).
SCHOLARLY:   REQUIRED at P4 (Bilal / Authentic Hadith review) before KB ships.
CHANGE:      NOT REQUIRED yet (no code).
ROBBY:       N/A

FINAL STATUS:  DISPATCHED to Claude Code (fresh branch off main). Awaiting Claude Code verify + build.
Notes:         Amina builds go through Claude Code directly, not SwarmClaw. Do not re-land #30's guidance CMS (corpus-grounded version is canonical on main).

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
