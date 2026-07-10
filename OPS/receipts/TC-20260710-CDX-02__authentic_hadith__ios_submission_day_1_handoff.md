# TC-20260710-CDX-02 — Authentic Hadith App - iOS Submission Day 1

Date: 2026-07-10
Product: authentic_hadith
Lane: ah/e2e-v1-refinement
Engine: codex
Status: PARTIAL

## OBJECTIVE

Pause the active build safely, update Claudex with every current change, and leave a clear path for Keymon or the next Codex run to complete iOS submission without picking up stale build 106.

## REALITY CHECK

VERIFIED: The app repo is at commit `3032abf` before the current feature pass.

PARTIAL: The current feature pass is implemented locally but not committed yet because Ro explicitly asked to pause and write this handoff at low usage.

VERIFIED: One competing Codex Features thread was told to stop coding. That thread was renamed to `Authentic Hadith App - iOS Submission Day 1`.

VERIFIED: The simulator Expo launcher showed three recent server entries, not three installed apps. Use the localhost entry only.

VERIFIED: Metro was started on `http://localhost:8081` and the app opened from the localhost dev target.

## CURRENT APP CHANGES

Files currently modified in `authentic-hadith/authentichadithapp`:

- `app/(tabs)/assistant.tsx`
- `app/(tabs)/more.tsx`
- `app/(tabs)/today.tsx`
- `app/achievements.tsx`
- `app/learn/lesson/[lessonId].tsx`
- `app/quiz.tsx`
- `components/ui/Button.tsx`
- `hooks/useProgress.ts`
- `lib/progress/progressService.ts`
- `lib/share/shareContent.ts`
- `lib/gamification/badge-config.ts`

Implemented changes:

- LanternAI remains available from the footer tab and More menu.
- LanternAI assistant footer bubble text now matches the app role and avoids telling users to look only in More.
- Learning lesson pages have readable dark mode markdown and a visible Share Lesson action.
- Shared outline buttons now use dark mode readable border and text colors.
- Quiz start screen includes lesson correlated quizzes plus general hadith quiz mode.
- Quiz results can be shared.
- Quiz completion writes local progress for badge unlocks.
- Badges now include quiz metrics and quiz badge definitions.
- Achievements now has progress sharing, quiz stats, badge sharing, and config driven badge calculation.
- More menu now links to Badges so the incentive loop is reachable.
- Today quick links keep Quiz reachable.
- Today Sunnah references were tightened to Bukhari and Muslim only.

## CHECKS

VERIFIED: `npx tsc --noEmit` passed.

VERIFIED: `npm run lint` passed with zero errors.

VERIFIED: Remaining lint warnings are pre existing:

- `app/(tabs)/today.tsx` hook dependency warning.
- `app/_layout.tsx` unused `useRevenueCat`.
- `app/hadith/[id].tsx` hook dependency warning.
- `app/stories/index.tsx` unused `refetchProphets`.

## SIMULATOR RECEIPTS

Evidence folder:

`OPS/evidence/authentic_hadith_ios_submission_day_1_20260710/`

Screenshots copied:

- `01-lanternai-footer-bubble.jpg`
- `02-lesson-share-button-readable.jpg`

VERIFIED in simulator:

- LanternAI footer tab is visible.
- LanternAI assistant screen opens.
- LanternAI bubble copy is readable.
- More screen has Open LanternAI and Learn entries.
- Learn path opens.
- Lesson 1 is readable in dark mode.
- Share Lesson button is readable after the outline button fix.
- Back and Home controls are present on the lesson page.

PARTIAL:

- Quiz full completion path still needs one more simulator receipt after reopening from Today > Quiz.
- Badges screen reachability still needs one more simulator receipt from More > Badges.
- Native iOS share sheet was not submitted as a screenshot yet because the pause came first.

## PATH TO COMPLETE IOS SUBMISSION

1. Keep one builder active. Do not let the renamed Features thread continue coding.
2. In `authentic-hadith/authentichadithapp`, confirm working tree changes listed above.
3. Run final checks again:
   - `npx tsc --noEmit`
   - `npm run lint`
   - `git diff --check`
4. Reopen simulator through localhost Metro.
5. Capture remaining receipts:
   - Home.
   - More.
   - More > LanternAI.
   - More > Badges.
   - Today > Quiz start.
   - One lesson correlated quiz result.
   - Lesson page Share Lesson action visible.
   - Paywall showing monthly 9.99 with free seven day trial.
6. Commit the app feature pass and push it.
7. Treat build 106 and commit `3032abf` as superseded once the new commit exists.
8. Cut build 107 or later from the new app commit.
9. In RevenueCat and App Store Connect, verify `ah_monthly_premium` includes the free seven day trial tied to the monthly 9.99 product.
10. Upload build 107 or later.
11. Run TestFlight smoke proof:
    - launch
    - auth
    - no forced paywall
    - Bukhari and Muslim only
    - dark mode readable lessons
    - relevant quiz
    - Back and Home controls
    - LanternAI footer
    - Badges reachable
12. Submit to App Review only after TestFlight proof and RevenueCat trial proof are captured.

## RESULT

PARTIAL: The current feature fixes are implemented and locally verified enough to preserve the path. The build is not submission ready until the local pass is committed, pushed, build 107 or later is cut, and the remaining simulator and RevenueCat receipts are captured.

## EDGE CASES

Build 106 is stale. Do not submit it.

The Expo launcher may show multiple old server URLs. Use `localhost:8081` only, or clear recent servers.

If Metro is down, start the dev client server before tapping the launcher entry.

If another thread changed the same files after this receipt, re audit before committing.
