# CTP — Authentic Hadith: Category-Leading V1 — Codex Execution Plan
Date: 2026-07-12 · Author: claude (remote session, Ro-directed) · Product key: `authentic_hadith`
Status: DISPATCHED to Codex · Boot rule: read `.claudex.json` → bridge → this plan → begin Phase 0.

> Strategy CTP behind this plan (Pass 3 finding): the winnable category is **daily hadith
> literacy as a built identity habit**, not hadith reference (Sunnah.com owns free reference,
> Muslim Pro owns lifestyle breadth). Two assets decide it: (A) provable AI trust,
> (B) an explicit 21-day identity loop. Everything below serves one of those two.

---

## VERIFIED GROUND TRUTH (receipts, 2026-07-12 remote session)

1. **AI grounding is already strict by design — better than assumed.**
   `external/v0-authentic-hadith/lib/api/hadith-grounding.ts` (repo of record, main):
   shared by BOTH `/api/chat` and `/api/mobile-chat`; Sahihayn-scoped retrieval (14,444
   hadiths); `STRICT_GROUNDING_RULES` (lines 181-185) forbid citing anything outside the
   retrieved block and forbid recall from training. Empty retrieval → fail-closed wording.
2. **Three AI routes are NOT under those rules:** `app/api/summarize/route.ts` and
   `app/api/enrich/route.ts` (plain gpt-4o-mini prompt, no safety/grounding block),
   `app/api/quiz/generate/route.ts` (grounded inputs from `learning_lessons` + `hadiths`,
   but generated questions/explanations are never validated against them).
3. **Enforcement is prompt-level only.** No post-generation citation validator, no
   adversarial regression fixtures anywhere in either repo.
4. **No 21-day engagement spec exists** (grep across both repos: only a coincidental
   "Foundations of Faith (21 days)" learning-path title). Ingredients all exist:
   `lib/notifications/NotificationService.ts`, streak/badge/progress services, share flows.
5. **Repo-of-record gap (Phase 0 blocker):** `redlanternstudios/AuthenticHadithApp`
   origin/main is frozen at `9ac3960` (Jul 2). The TC-20260710-CDX-02 feature pass
   (11 files incl. `lib/share/shareContent.ts`, `lib/gamification/badge-config.ts`) exists
   ONLY in the local Mac working tree. Commits `3032abf`/`b149e8c`/`9c90f41`/`3b03b17`
   are unreachable from GitHub.
6. Open manual gates from `IOS_SUBMISSION_GO_NO_GO.md` (Gate F Ready-to-Submit, Gate G
   paywall + restore proof, doc verdict NO-GO) remain human-owned (KP/Ro), not Codex-owned.

---

## PHASE 0 — UNBLOCK THE RECORD (do first, ~1 session, local Mac only)
Owner: Codex on Ro's Mac (the only place the working tree exists).

0.1 In `authentic-hadith/authentichadithapp`: `git status` → confirm the 11 modified files
    from TC-20260710-CDX-02 are still present. If gone → STOP, write a RED receipt.
0.2 `npx tsc --noEmit` + `npm run lint` + `git diff --check` (re-run, don't trust the old pass).
0.3 Commit on branch `ah/e2e-v1-refinement`, push to origin. **COMMIT-AS-YOU-GO RULE
    (permanent, learned from the Jul 8 usage-limit loss event): every artifact commits the
    moment it exists. No batching work behind a final push, ever.**
0.4 Capture the 3 outstanding Day-1 receipts (Today > Quiz completion; More > Badges
    reachability; native share sheet) + paywall 9.99/7-day-trial screenshot.
0.5 Cut build 107+ from the pushed commit. Build 106 and `3032abf` are superseded — never submit them.
0.6 Write receipt `TC-2026MMDD-CDX-NN` closing lane `ah/e2e-v1-refinement`.

## PHASE 1 — TRUST HARDENING (the category moat; parallel-safe with Phase 0.5+)
Lane: `ah/trust-hardening` (open it in the bridge via the command layer).

1.1 **Citation validator (fail-closed).** New `lib/api/citation-validator.ts` in the web
    repo: parse model output for any `(collection, number)` citation pattern; every citation
    must exist in the retrieved set passed to the model; on violation, strip-and-regenerate
    once, then fail closed with the "couldn't find a specific authenticated narration"
    wording. Wire into `/api/chat` + `/api/mobile-chat` AFTER `generateText`.
1.2 **Adversarial regression fixtures.** Test suite that fails CI on: empty-retrieval prompts
    that elicit citations; "quote me a weak hadith about X"; misattribution bait ("didn't
    Bukhari say…" with a fake number); madhab-ruling bait. Zero-citation-outside-retrieval
    is the invariant. This is the receipt behind the marketing claim.
1.3 **Bring summarize/enrich/quiz under the umbrella.** Shared safety block (not-a-mufti,
    no-fatwa, sensitive-topics rules) prepended to all three prompts; quiz `correctIndex`/
    `explanation` must be answerable from the lesson's `hadith_ids` rows — add a validation
    pass; enrichment output stored only with `status` gating it for review before "published".
1.4 **Retrieval recall (bounded).** Expand `COLLECTION_ALIASES` + add a topic-synonym map
    (sabr→patience etc.). NO embedding/vector migration in this phase — schema is gated.
1.5 Receipt with before/after fixture results. This closes the "content integrity
    governance" open risk in `IOS_SUBMISSION_GO_NO_GO.md` with evidence instead of a doc claim.

## PHASE 2 — THE 21-DAY IDENTITY LOOP (after Phase 0 lands; spec first, then wire)
Lane: `ah/identity-loop`.

2.1 Write `docs/ENGAGEMENT_LOOP_SPEC.md` (mobile repo) as an explicit sequence, not a
    feature list: D1-3 first LanternAI exchange feels personal (seeded starter question
    from onboarding interests); D4-7 three study touches (lesson/quiz/save) → streak framed
    as identity ("7 days with Bukhari — this is who you are now"), never points; D8-14 one
    social artifact (share a citation card; at low N use aggregate proof "3,214 people
    studied this hadith today", never require a reply); D15-21 memory surfacing ("Two weeks
    ago you saved the hadith on patience — here is its pair in Muslim").
2.2 Audit ALL badge/quiz/notification copy: replace gamification language with identity
    language. Copy-only pass — no data-layer edits.
2.3 Instrument each milestone with an event that answers a named business question
    (CTP rule: no question, no event). Baselines: D7 retention target >25%, share-to-install
    >0.3, zero confirmed AI-accuracy incidents in 90 days.
2.4 Notification copy through `NotificationService.ts` follows the same identity framing.

## PHASE 3 — LAUNCH POSTURE (human-gated; Codex prepares, KP/Ro decide)
3.1 Onboarding + App Store copy states the scope as rigor, not gap: "Starting with the two
    most rigorously authenticated collections in Islam — Sahih al-Bukhari and Sahih Muslim."
3.2 Surface the Phase-1 fixture results to KP as the content-integrity closure evidence.
3.3 Device QA routes through the CANONICAL pack Ro landed 2026-07-11:
    `OPS/iOS App Testing/AUTHENTIC_HADITH_V3_IOS_TESTING_STEPS.md` (10-point rule, per
    TC-20260711-HB-01). Both gates must be proven: normal-user paywall (7-day trial visible
    on the monthly sheet) AND exact-account no-payment QA route — never a public skip
    button. Submission stays on hold until that checklist returns GO.
3.4 Gate F/G device proofs remain KP-finger-only per Rule 034/040. Codex never runs
    `eas submit`.

## HARD RAILS (unchanged, from the app repo's own governance)
- `forbidden-actions.md` zones stay locked: auth, Supabase schema/RLS, RevenueCat config,
  `app.json`/`eas.json`, dependency pins. Phase 1-2 need NONE of them.
- TruthSerum: no claim without a receipt in the same message. Fixture output IS the receipt.
- One builder at a time per repo. If another thread touched the files, re-audit before commit.
- Engine-tagged receipt IDs (`TC-YYYYMMDD-CDX-NN`). One lane, one receipt, per close.

## DEFINITION OF DONE (V1 "category-ready")
1. Phase 0: feature pass on GitHub + build 107+ cut from it. 2. Phase 1: validator live on
both chat routes, fixtures green in CI, all four AI routes under the safety umbrella.
3. Phase 2: spec doc committed, copy audit done, milestone events firing. 4. Phase 3
evidence handed to KP. Anything less is PARTIAL — say so in the receipt.
