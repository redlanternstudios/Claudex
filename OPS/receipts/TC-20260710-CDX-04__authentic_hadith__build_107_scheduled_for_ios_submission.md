# TC-20260710-CDX-04 — Authentic Hadith Build 107 Scheduled for iOS Submission

Date: 2026-07-10
Product: authentic_hadith
Lane: ah/e2e-v1-refinement
Author: codex
Status: PARTIAL

## OBJECTIVE

Cut the next production iOS binary from the verified Day 1 branch and queue App Store Connect submission through EAS.

## REALITY CHECK

VERIFIED: the app repo was clean on branch `fix/repair-batch-2026-06-25`.

VERIFIED: the source commit used for this submission pass was `e9f1bfd`.

VERIFIED: local TypeScript passed.

VERIFIED: lint passed with zero errors and the same four old warnings.

VERIFIED: Jest passed with 18 suites and 154 tests.

VERIFIED: RevenueCat offering audit passed with current offering `default` and product ids `ah_monthly_premium`, `ah_annual_premium`, `ah_lifetime_premium`.

VERIFIED: EAS incremented the remote iOS build number from 106 to 107.

VERIFIED: EAS scheduled iOS submission for build 107.

PARTIAL: automatic submission is scheduled, but final App Store Connect processing and App Review selection still need confirmation in Apple.

UNKNOWN: App Store Connect introductory offer proof for the seven day free trial on `ah_monthly_premium`. RevenueCat product exposure is verified, but Apple subscription offer configuration must be checked in App Store Connect.

## EVIDENCE

App repo:

`/Users/rorysemeah/Documents/RedLantern Studios/authentic-hadith/authentichadithapp`

Source:

`fix/repair-batch-2026-06-25` at `e9f1bfd`

Checks:

`npm run qa:types` passed.

`npm run lint` passed with zero errors and four warnings.

`npm test -- --runInBand` passed with 18 suites and 154 tests.

`npm run qa:revenuecat` passed.

Build:

Build ID: `86473f82-d0a8-4b45-ad00-522ffb97ff79`

Build number: `107`

App version: `1.1.1`

Build logs:

`https://expo.dev/accounts/redlantern/projects/authentichadithapp/builds/86473f82-d0a8-4b45-ad00-522ffb97ff79`

Submission:

Submission ID: `a3a777e1-e138-49d7-a1ca-ea34f58dcabd`

Submission details:

`https://expo.dev/accounts/redlantern/projects/authentichadithapp/submissions/a3a777e1-e138-49d7-a1ca-ea34f58dcabd`

Apple:

ASC App ID: `6764673665`

Bundle ID: `com.byred.authentichadith`

Apple Team: `LXL3ZMHHK6`

## NEXT ACTION

Open App Store Connect, confirm build 107 finishes processing, verify `ah_monthly_premium` has the seven day free trial attached to the monthly 9.99 product, select build 107 for the app version, attach the Day 1 screenshots from Claudex evidence, and submit for review.

## EDGE CASES

If build 107 fails processing, do not submit build 106. Fix the processing issue and cut build 108 or later from `e9f1bfd` or a newer verified commit.

If App Store Connect does not show the seven day monthly trial, fix the subscription introductory offer before review. Do not rely on RevenueCat alone for this claim.

If Apple asks for screenshots, use the existing evidence folder first:

`/Users/rorysemeah/Documents/RedLantern Studios/Claudex/OPS/evidence/authentic_hadith_ios_submission_day_1_20260710`
