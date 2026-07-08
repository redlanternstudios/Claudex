# TruthCal Receipt TC-20260708-CDX-08

Date: 2026 07 08
Product: authentic_hadith
Lane: ah/e2e-v1-refinement
Author: codex
Intent: Navigation and readability sweep fixed Search, Profile, Progress, and Stories; screenshots 20 through 38 saved

## Objective

VERIFIED: continue the iOS e2e refinement pass, fix remaining visible navigation and readability issues, and save simulator screenshots for App Store review evidence.

## Reality Check

VERIFIED: Search clipped the Sahih Muslim collection chip.

VERIFIED: Profile allowed the logged in email to overflow the identity card.

VERIFIED: Progress used a weak contrast Home label where a Back control was expected.

VERIFIED: Stories used a nested navigator that did not inherit the app level Home action.

PARTIAL: native share, notification permission, purchase restore, and final account deletion were not executed because those flows open external or destructive surfaces.

## Execution

VERIFIED: Search collection chips now wrap across rows with Sahih al Bukhari and Sahih Muslim visible.

VERIFIED: Profile email text now shrinks within the identity card.

VERIFIED: Progress header now exposes a readable Back action plus Home.

VERIFIED: Stories nested stack now has a branded header with Back plus Home.

VERIFIED: Companion and prophet story reader custom headers include Home beside bookmark and share actions.

VERIFIED: `authentic-hadith/authentichadithapp/V1_REFINEMENT_2026_07_08.md` was updated with the pass results and new screenshot list.

## Verification

VERIFIED: `npx tsc --noEmit` passed.

VERIFIED: focused Jest regression checks passed: book titles, visible collections, route integrity, home template, onboarding access.

VERIFIED: iOS simulator rebuilds succeeded with zero errors after the fixes.

PARTIAL: one SDWebImage pod deployment warning remains. It did not block simulator builds.

PARTIAL: XcodeBuildMCP accessibility snapshots are blocked on this machine because the active Xcode selector points at Command Line Tools for the plugin path. Simulator build, launch, direct navigation, and screenshot capture worked through `xcrun`.

## Screenshot Evidence

VERIFIED: Screenshots were saved in `authentic-hadith/authentichadithapp/`.

- `e2e-submit-20260708-20-search.png`
- `e2e-submit-20260708-21-search-fixed.png`
- `e2e-submit-20260708-22-learn.png`
- `e2e-submit-20260708-23-profile.png`
- `e2e-submit-20260708-24-settings.png`
- `e2e-submit-20260708-25-settings-privacy.png`
- `e2e-submit-20260708-26-settings-notifications.png`
- `e2e-submit-20260708-27-settings-about.png`
- `e2e-submit-20260708-28-settings-delete-account.png`
- `e2e-submit-20260708-29-create-folder.png`
- `e2e-submit-20260708-30-bookmarks.png`
- `e2e-submit-20260708-31-progress.png`
- `e2e-submit-20260708-32-achievements.png`
- `e2e-submit-20260708-33-quiz.png`
- `e2e-submit-20260708-34-stories.png`
- `e2e-submit-20260708-35-profile-fixed.png`
- `e2e-submit-20260708-36-progress-fixed.png`
- `e2e-submit-20260708-37-stories-fixed.png`
- `e2e-submit-20260708-38-stories-back-home.png`

## Result

PARTIAL: the visible blockers found in this pass are fixed and receipted.

PARTIAL: App Store submission readiness is not claimed yet. Remaining scoped checks are native share sheet behavior, notification permission prompt behavior, purchase restore behavior, and account deletion final confirmation safeguards.

## Next Action

Continue the final scoped e2e pass through share, notification permission, purchase restore, and account deletion safeguards before any App Store submission readiness claim.
