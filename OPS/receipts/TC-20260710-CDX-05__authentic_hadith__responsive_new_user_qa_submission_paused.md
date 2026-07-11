# TC-20260710-CDX-05 — Authentic Hadith — responsive new user QA, submission paused

Status: PARTIAL
Product: authentic_hadith
Lane: ah/e2e-v1-refinement
Engine: codex
Date: 2026-07-10

## Objective

Ro paused App Store submission and asked for a responsive web, mobile, and tablet formatting pass with segmented page breaks, plus a brand new user TestFlight style E2E check.

## Verified

- Submission remains paused by Ro.
- TypeScript passes with `npm run qa:types`.
- Lint passes with zero errors and the same four pre existing warnings.
- Focused Jest pass completed: 4 suites, 36 tests.
- iOS simulator build succeeds for `com.byred.authentichadith`.
- New disposable account path reached onboarding.
- Signup, login, onboarding, and shared buttons now expose proper accessible targets for reviewer taps and VoiceOver.
- Onboarding step one, step two, and step three are readable and reachable in simulator.
- Step two onboarding displays only Sahih Bukhari and Sahih Muslim.

## Changes

- Added safe top and bottom spacing across responsive app screens so global Back, Home, and footer tabs do not cover content.
- Tightened Home, Learn, Lesson, Today, LanternAI, auth, and onboarding layouts for smaller iPhone viewports.
- Removed non Sahihayn daily items and fallback collection labels from visible app surfaces.
- Added Sahihayn learning content guard to prevent Four Sunan style lesson or quiz content from leaking into the product.
- Fixed LanternAI empty guidance card so it does not overlap active chat responses.
- Added reachable and accessible onboarding controls for language, school, learning level, agreements, and primary buttons.

## Partial

- The true TestFlight physical device pass is still open. The simulator can prove the code path and layout fixes, but it cannot prove the Apple TestFlight install shell as a brand new physical user.
- RevenueCat product fetch is known to reach offerings in simulator logs, but StoreKit trial purchase verification still requires TestFlight or StoreKit configuration.
- Onboarding Complete tapped in simulator after the disposable account path, but the dev runtime bounced back to onboarding once. No crash was logged. Treat this as the next high priority physical TestFlight check before submission.

## Receipts

- Create Account screenshot: `/var/folders/g7/xlwwsrvj5k37mcmrbjrxdknc0000gn/T/screenshot_optimized_d05e8558-0f47-4992-8ca9-d40377c6a748.jpg`
- Onboarding step one fixed screenshot: `/var/folders/g7/xlwwsrvj5k37mcmrbjrxdknc0000gn/T/screenshot_optimized_fc746800-1b70-4015-afc4-94e9a36c165d.jpg`
- Onboarding step two screenshot: `/var/folders/g7/xlwwsrvj5k37mcmrbjrxdknc0000gn/T/screenshot_optimized_6c186695-4014-4791-a3bd-3bef8082240d.jpg`
- Onboarding step three screenshot: `/var/folders/g7/xlwwsrvj5k37mcmrbjrxdknc0000gn/T/screenshot_optimized_ce9ff116-398c-4d16-8a4b-e3df95e02082.jpg`

## Next Action

Run physical TestFlight on a clean device or deleted app state:

1. Install build 107 or newer.
2. Create a new disposable account.
3. Complete onboarding.
4. Confirm Home opens with no paywall.
5. Confirm monthly option carries the seven day free trial in the native purchase sheet.
6. Capture final screenshots for App Store Connect.
7. Only then resume App Store submission.
