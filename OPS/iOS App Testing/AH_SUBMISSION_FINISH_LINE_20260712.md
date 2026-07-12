# Authentic Hadith — iOS Submission Finish Line (Codex Instruction Set)
Date: 2026-07-12 · Author: claude (remote, Ro-directed) · Product: `authentic_hadith`
Supersedes nothing — this ROUTES THROUGH the canonical pack
(`AUTHENTIC_HADITH_V3_IOS_TESTING_STEPS.md`, 10-point rule) and the app repo's
Rule 034/040. Every gate is binary and names its receipt. No receipt = gate open.

**Standing verdict rule: "READY FOR SUBMISSION" may only be declared when ALL
gates below are GREEN with receipts. Anyone declaring it earlier is wrong.**

State as of 2026-07-12 (remote-session receipts):
- VERIFIED: `origin/main` of AuthenticHadithApp is still `9ac3960` (Jul 2). The Day-1
  feature pass AND the 10-account allowlist expansion exist ONLY uncommitted on the Mac.
- VERIFIED: live probe `POST https://www.authentichadith.app/api/mobile-chat` → HTTP 200,
  grounded response (Rule 034 probe #3 GREEN, 2026-07-12).
- VERIFIED: `REVIEWER_EMAILS` client override is a pre-existing, KP-authorized (2026-06-12)
  pattern in `lib/revenuecat/config.ts`; Codex's change expands the roster. File is
  forbidden-zone → diff needs explicit Ro/KP approval before commit (Codex correctly
  left it uncommitted).
- OPEN: every device/dashboard gate below.

---

## GATE 0 — REPO OF RECORD (Codex, first, nothing else counts until this lands)
0.1 Ro/KP reviews the `lib/revenuecat/config.ts` diff (forbidden-zone file) + says "ship it".
0.2 Commit the FULL local working tree (Day-1 feature pass + allowlist + tests + docs)
    on branch `ah/e2e-v1-refinement`; push; open PR to main; merge after checks.
    COMMIT-AS-YOU-GO from here forward — no batching behind a final push, ever.
0.3 RECEIPT: GitHub shows the new SHA on main; `git ls-remote` no longer returns 9ac3960.

## GATE 1 — STATIC QA ON THE MERGED SHA (Codex)
1.1 `npx tsc --noEmit` · `npm run qa:lint` · `npm test -- --runInBand` (full suite, not
    just revenuecat.test.ts) · `npx expo-doctor` · `npm run qa:ios:go-no-go`
    (automated_failures must be 0 on the NEW sha) · `npm run qa:appstore:metadata`.
1.2 Allowlist consistency check: the ASC `demoAccountName` email (App Store Connect →
    App Review Information) appears EXACTLY in `REVIEWER_EMAILS`, and the test roster
    matches the code roster 1:1.
1.3 RECEIPT: command outputs pasted in the receipt, tied to the merged SHA.

## GATE 2 — BUILD 107+ FROM THE PUSHED SHA (Codex triggers, KP approves the spend)
2.1 `eas build --platform ios --profile production` from the merged SHA only.
    Build 106 / commit `3032abf` are superseded — submitting them is an automatic NO-GO.
2.2 RECEIPT: EAS build ID + build number + the SHA it was cut from, all three in one line.

## GATE 3 — RULE 034 LIVE PROBES, FRESH, SAME DAY AS SUBMISSION (Codex/KP)
3.1 Reviewer login: `POST {SUPABASE_URL}/auth/v1/token?grant_type=password` with the ASC
    demo credentials → `access_token` returned.
3.2 RevenueCat: `GET https://api.revenuecat.com/v1/subscribers/{auth_uuid}` → `premium`
    entitlement active for the reviewer UUID.
3.3 Backend: mobile-chat POST → 200 (re-run even though it passed 2026-07-12; probes expire).
3.4 RECEIPT: all three responses (token redacted to prefix, no secrets echoed).

## GATE 4 — REAL PURCHASE PATH ON PHYSICAL DEVICE, NON-ALLOWLISTED ACCOUNT (KP)
The allowlist creates a specific blind spot: allowlisted QA accounts NEVER exercise the
real paywall. So this gate exists precisely because Gate 5 does.
4.1 On the TestFlight build 107+, signed into a sandbox Apple ID + an app account whose
    email is NOT in `REVIEWER_EMAILS`: paywall renders live offerings; the MONTHLY sheet
    visibly shows the 7-day free trial then $9.99; sandbox purchase completes; premium
    unlocks; Restore Purchases restores it after reinstall.
4.2 RECEIPT: screenshots of the purchase sheet (trial line visible), post-purchase premium
    state, and post-restore state.

## GATE 5 — ALLOWLIST QA ROUTE PROOF (KP)
5.1 One allowlisted account gets premium with NO payment sheet — exact-account based,
    and confirm there is NO public-facing skip/bypass control anywhere in the UI.
5.2 RECEIPT: screenshot of premium state on the allowlisted account + a screen recording
    or screenshot sweep showing no visible bypass affordance.

## GATE 6 — THE CANONICAL 10-POINT PACK (KP, physical iPhone, TestFlight build 107+)
6.1 Run `AUTHENTIC_HADITH_V3_IOS_TESTING_STEPS.md` page-by-page, feature-by-feature,
    button-by-button: fresh install, new user, existing user, paywall, no-payment QA,
    RevenueCat restore, navigation, screenshot every proof point, known issues, GO/NO-GO.
6.2 RECEIPT: the pack's own checklist filled in with screenshots. Rule 040: only KP's
    device evidence counts; simulator/doc/code inspection does not.

## GATE 7 — APP STORE CONNECT READINESS (KP, dashboards)
7.1 All three IAPs (`ah_monthly_premium`, `ah_annual_premium`, `ah_lifetime_premium`)
    show "Ready to Submit" and sit in the subscription group; the monthly product carries
    the 7-day introductory offer.
7.2 Demo credentials in App Review notes match the allowlisted ASC account exactly.
7.3 Privacy declarations complete; screenshots complete (including iPad 12.9" —
    `supportsTablet` is true); metadata lint (Gate 1) green.
7.4 Content-integrity decision LOGGED: Ro explicitly accepts the live strict-grounding
    layer (`lib/api/hadith-grounding.ts`, verified on prod via probe #3) as sufficient for
    v1 submission, with the Phase-1 citation-validator hardening
    (`OPS/CTP_AH_CATEGORY_V1_CODEX_PLAN_20260712.md`) scheduled post-submission.
    This closes the open "content integrity governance audit" line in
    `IOS_SUBMISSION_GO_NO_GO.md` with a decision instead of silence.
7.5 RECEIPT: dashboard screenshots per item.

## GATE 8 — THE FLIP (human only)
8.1 `IOS_SUBMISSION_GO_NO_GO.md` flipped to GO, linking every receipt above.
8.2 Claudex receipt `TC-2026MMDD-CDX-NN` closing the submission lane, bridge updated
    through the command layer.
8.3 KP's finger presses Submit for Review. Codex never runs `eas submit`.

---

## CODEX: YOUR EXACT SEQUENCE (start now)
1. Present the `lib/revenuecat/config.ts` diff to Ro → get "ship it" → Gate 0 commit/push/PR.
2. Gate 1 commands on the merged SHA; paste outputs; fix anything red; re-run.
3. Trigger Gate 2 build (KP approves); record ID/number/SHA.
4. Run Gate 3 probes; hand Gates 4-7 to KP as a checklist with the receipt formats above;
   chase each item to a receipt — do not summarize them as done without one.
5. When and only when Gates 0-7 are all receipted: execute Gate 8.1-8.2 and hand KP the
   submit decision. If any gate fails, write the failure into the receipt and fix forward.
