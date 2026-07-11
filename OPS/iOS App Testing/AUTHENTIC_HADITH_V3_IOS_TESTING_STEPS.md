# Authentic Hadith App v3 iOS Testing Steps

Date: 2026-07-11
Owner: RedLantern Studios
Status: ACTIVE
Submission: HOLD

## CTP Contract

GOAL: Prove Authentic Hadith App v3 is ready for App Store submission only after a clean iOS QA pass across simulator, TestFlight, and physical device.

CONSTRAINTS:

- Production users must not enter the app interior without premium access.
- QA and Apple review must have a bounded no payment path.
- Monthly plan must show a seven day trial before 9.99 monthly billing.
- Sahih Bukhari and Sahih Muslim remain the only hadith collections exposed.
- Screenshots must represent the current build, not stale binaries.
- School of thought must be saved and used as a study lens, not to alter hadith text or grades.

FORMAT: Complete each section with PASS, FAIL, PARTIAL, or BLOCKED plus screenshot path and notes.

FAILURE: Any unproven paywall bypass, onboarding loop, unreadable page, broken navigation, missing screenshot, or mismatched RevenueCat product blocks submission.

## Build Under Test

- App: Authentic Hadith
- Bundle ID: `com.byred.authentichadith`
- Target build: 107 or later
- Current submission posture: paused until formatting, QA path, and full pass are complete
- Required devices:
  - iPhone simulator
  - Physical iPhone via TestFlight
  - iPad or tablet viewport
  - Web mobile viewport
  - Web tablet viewport
  - Web desktop viewport

## Required Accounts

### Normal New User

Purpose: proves real user gate behavior.

Expected:

- Account creation completes.
- User lands on sign in after account creation.
- Sign in opens onboarding.
- Onboarding saves profile.
- User reaches paywall before app interior.
- No close button bypass exists on paywall.

### QA No Payment User

Purpose: lets testers verify the interior without Apple payment.

Expected:

- Account uses an exact allowlisted QA or reviewer email.
- RevenueCat provider resolves premium in app for that exact email only.
- User reaches Home after onboarding without purchase.
- Profile and Subscription screens show premium state consistently.
- Regular non allowlisted users still stop at paywall.

### Apple Reviewer User

Purpose: lets Apple review premium features even if RevenueCat live entitlement lookup fails.

Expected:

- Email matches the App Store Connect demo account exactly.
- No password is written in docs.
- Reviewer can access premium interior.
- RevenueCat product sheet can still be opened from subscription settings.

## Fresh Install Reset

1. Delete app from physical device or erase simulator.
2. Install latest TestFlight or simulator build.
3. Launch app.
4. Confirm first visible screen is Create Account or Sign In.
5. Confirm Home is not reachable before auth.
6. Capture screenshot.

Result:

- Status:
- Screenshot:
- Notes:

## New User Flow

1. Tap Create Account.
2. Enter disposable name, email, and password.
3. Submit account creation.
4. Confirm success alert appears.
5. Confirm app returns to Sign In, not onboarding.
6. Sign in with the same account.
7. Confirm onboarding opens.
8. Enter name.
9. Select school of thought.
10. Complete onboarding.
11. Confirm regular user lands on paywall, not Home.
12. Confirm no close button or hidden dismissal bypass exists.
13. Capture screenshots for each step.

Result:

- Status:
- Screenshot folder:
- Notes:

## Onboarding Integrity

Verify:

- Name field accepts text.
- School selection saves.
- School of thought appears in Profile.
- LanternAI uses school as context lens only.
- Onboarding does not loop after completion.
- Onboarding does not skip required profile fields.
- Onboarding completion event routes correctly.

Result:

- Status:
- Screenshot:
- Notes:

## Paywall Required Gate

Verify as a normal user:

- Paywall appears before Home.
- Monthly card reads `7 days free, then $9.99 / month`.
- Annual card reads `$49.99 / year`.
- Lifetime card reads `$99.99`.
- Plan titles are readable.
- Price does not wrap into vertical letters.
- Continue opens native Apple purchase sheet.
- Native sheet shows monthly seven day trial.
- Terms and Privacy links are visible.
- Restore Purchases is visible.
- Canceling Apple sheet returns to paywall.
- User still cannot access Home without purchase.

Result:

- Status:
- Screenshot:
- Notes:

## No Payment QA Path

Verify with exact QA or reviewer account:

- Sign in succeeds.
- RevenueCat provider resolves premium by exact email.
- User reaches Home.
- No real Apple payment is required.
- Interior screens are accessible.
- Profile confirms premium state.
- Subscription screen does not contradict premium state.
- Sign out clears private state.

Result:

- Status:
- Screenshot:
- Notes:

## RevenueCat Proof

Verify:

- RevenueCat SDK config succeeds.
- Current offering is loaded.
- Offering includes:
  - `ah_monthly_premium`
  - `ah_annual_premium`
  - `ah_lifetime_premium`
- Entitlement is `premium`.
- Monthly trial is active in Apple native sheet.
- Purchase success activates premium.
- Restore success activates premium.
- Failed restore shows a clear no subscription message.

Result:

- Status:
- Screenshot:
- Notes:

## Navigation Proof

Every signed in page must have one of:

- Bottom tab access
- Visible Back button
- Visible Home button

Required screens:

- Home
- Today
- LanternAI
- My Hadith
- More
- Collections
- Collection detail
- Book detail
- Hadith detail
- Learning paths
- Lesson detail
- Quiz
- Badges
- Profile
- Settings
- Subscription

Result:

- Status:
- Screenshot folder:
- Notes:

## Formatting and Page Break Proof

Verify on mobile, tablet, and web:

- Sections are segmented, not visually melted together.
- Text does not overlap status bar, buttons, or footer.
- Cards do not cut off mid section at first viewport when avoidable.
- Dark mode uses readable green pattern.
- Light mode remains readable.
- Long Arabic hadith text scrolls cleanly.
- Tables in lessons fit width.
- Quiz option cards are readable.
- Badges screen is readable.
- Paywall plan cards are readable.

Result:

- Status:
- Screenshot folder:
- Notes:

## Screenshot Set for App Store

Capture current build only:

1. Home
2. Today
3. LanternAI empty state
4. LanternAI answer state
5. Collections
6. Bukhari or Muslim detail
7. Hadith detail
8. Learning paths
9. Lesson detail
10. Quiz
11. Badges
12. Profile
13. Paywall monthly trial
14. Native purchase sheet
15. Subscription settings

Result:

- Status:
- Folder:
- Notes:

## Final Go or No Go

GO only if:

- Normal user cannot bypass paywall.
- QA reviewer can test without payment by exact account.
- Monthly seven day trial is proven in native sheet.
- Onboarding does not loop.
- All required pages are readable.
- Screenshots are current.
- Typecheck passes.
- Lint has no new blocking errors.
- TestFlight physical pass is complete.

Decision:

- Status:
- Reviewer:
- Date:
- Notes:
