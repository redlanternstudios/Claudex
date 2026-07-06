━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TRUTHCAL RECEIPT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Receipt ID:         TC-20260702-004
Product:            HireWire
Sprint / milestone: Notifications Standard V1 (doc)
Date:               2026-07-02
Author agent:       Cowork Claude (doc build + branding)
Reviewer agent:     PENDING (/repo-ingest to verify catalog truth)
Human accepted by:  Ro (requested; delivered in chat)
CHANGE RECORD:      NONE (documentation, no code)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

WHAT WAS BUILT
Intent:             Canonical notification system spec for HireWire on the RLS branded
                    document standard, with the OFFICIAL HireWire logo (not RLS logo)
                    and full HireWire palette + type. Standardizes every notification:
                    trigger, channel, copy, state, dedup, owner, truth status.
Feature area:       HireWire notifications / comms
User-visible:       NO (internal spec). Governs user-visible messages once built.

FILES CREATED (vault: projects/hirewire/)
  HIREWIRE_NOTIFICATIONS_STANDARD.pdf   — 6-page branded deliverable
  HIREWIRE_NOTIFICATIONS_STANDARD.html  — web/mobile responsive source
  HIREWIRE_NOTIFICATIONS_STANDARD.md    — Obsidian note (wikilinked into vault)
  build_notifications_doc.py            — generator (reproducible)
  hirewire-logo.png / -trim.png         — official logo pulled from Drive
                                          (Drive id 1lWiO0xjU1Ve0aULvg_q5l4dnOeAHPkI7)

TRUTH LABEL BLOCK
VERIFIED:           1 notification — magic link sign in email exists (seen in Gmail).
                    It renders in RedLantern branding, NOT HireWire → defect N-A01.
PLANNED / ASSUMED:  All other 22 catalog rows. Spec is the TARGET, not shipped state.
MISSING:            notification_preferences + notification_log tables; n8n dispatch
                    flow; dedup + receipt + state machine; HireWire email shell in prod.
CANNOT VERIFY:      HireWire repo notification code (not on this mount; /repo-ingest owns it).

CLAUDEX / OBSIDIAN
  Obsidian:  note lives in vault, wikilinks to [[HIREWIRE — PROJECT MEMORY]], [[constraints]],
             [[Obsidian Knowledge Layer]], [[Bridge System]]. Auto-indexed by graph.
  Claudex:   this receipt is the canonical record. _CLAUDEX LIVE.md is a generated view
             (not hand-edited). Global focus stays Amina; no BRIDGE.json focus change.

NEXT ACTIONS (from doc, page 6)
  1. /repo-ingest HireWire → verify catalog, promote ASSUMED rows.
  2. Ship fix N-A01 — rebrand live sign in email to HireWire shell.
  3. Create notification_preferences + notification_log with RLS (C-003).
  4. Build n8n notification dispatch flow (C-002).

GOVERNANCE SIGN-OFFS
TRUTH:       PASS — 1 VERIFIED (and flagged mis-branded); rest labeled PLANNED/ASSUMED.
SECURITY:    N/A (doc). Spec calls RLS on notification tables before prod.
CHANGE:      NOT REQUIRED (no code).

FINAL STATUS:  DELIVERED. PDF + Obsidian note in vault. Drive upload: HireWire/Notifications.
Notes:         HireWire remains PAUSED (firebreak). This is a spec artifact, not a build.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
