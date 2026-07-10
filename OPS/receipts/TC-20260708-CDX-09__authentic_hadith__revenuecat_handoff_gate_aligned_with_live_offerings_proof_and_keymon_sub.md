# TruthCal Receipt TC-20260708-CDX-09

# Authentic Hadith App v3 iOS Submission Handoff

Date: 2026-07-08
Product: authentic_hadith
Lane: ah/e2e-v1-refinement
Author: codex
Intent: RevenueCat handoff gate aligned with live offerings proof and Keymon submission handoff
Result: PARTIAL

## Truth

VERIFIED: Claudex receipt TC-20260708-CDX-09 was created through the command layer.
VERIFIED: Authentic Hadith app branch `fix/repair-batch-2026-06-25` was pushed at commit `b260cd3` with the RevenueCat anonymous logout guard, live offering verifier alignment, gate docs, Keymon handoff docs, seven day monthly trial copy, build 104 receipt, and release version bump to 1.1.1.
VERIFIED: Live RevenueCat offering audit passed against the configured iOS public key. Current offering is `default`; product ids are `ah_monthly_premium`, `ah_annual_premium`, and `ah_lifetime_premium`; missing product ids are none.
VERIFIED: TypeScript passed, focused Jest passed, App Store metadata QA passed, and simulator rebuild passed with the known pod warning only.
VERIFIED: The app no longer shows the launch paywall gate in the rebuilt simulator proof set.
VERIFIED: Ro requested the monthly plan show a free seven day option tied to the nine dollar ninety nine monthly plan. Codex committed and pushed the local copy patch in `authentic-hadith/authentichadithapp/app/settings/subscription.tsx` at commit `1b01130`.
VERIFIED: Production EAS build 104 finished from commit `1b01130`, app version 1.1.0, build id `67bbfe1d-12b1-4421-8085-766b82a8ccd0`.
VERIFIED: EAS submission `396c981c-b2d6-4dd5-bf95-2da09f3056bd` attempted to upload build 104 to App Store Connect and failed because Apple rejected the closed `1.1.0` train.
VERIFIED: Apple rejection said `CFBundleShortVersionString [1.1.0]` must be higher than the previously approved version `[1.1.0]`, and the `1.1.0` prerelease train is closed for new build submissions.
VERIFIED: Codex bumped app release version to `1.1.1` and pushed commit `b260cd3`.
PARTIAL: Replacement production EAS build 105 for version `1.1.1` is queued as build id `44463f0f-32a7-4580-8050-a16e98a0f308` as of this receipt update.
UNKNOWN: App Store Connect introductory offer state is not visible from this Codex session. Local copy cannot create the real free trial. Keymon must confirm `ah_monthly_premium` has a seven day free trial introductory offer before iOS submission.
UNKNOWN: Manual App Store Connect product state remains pending. Gate F Ready to Submit, Gate G RoPhone paywall proof, and the final go or no go doc still need human evidence.

## Evidence

Repository proof:

`authentic-hadith/authentichadithapp` branch `fix/repair-batch-2026-06-25`, latest pushed commit `b260cd3`.

RevenueCat proof:

`npm run qa:revenuecat`

Result:

```text
RevenueCat offering audit: PASS
current_offering_id: default
current_package_count: 3
expected_product_ids: ah_monthly_premium, ah_annual_premium, ah_lifetime_premium
actual_product_ids: ah_monthly_premium, ah_annual_premium, ah_lifetime_premium
missing_product_ids: none
```

Code and QA proof:

```text
npx tsc --noEmit
npm test -- revenuecat.test.ts onboarding-access.test.ts route-integrity.test.ts --runInBand
node scripts/qa-appstore-metadata.mjs
DEVELOPER_DIR=/Applications/Xcode.app/Contents/Developer npm run ios
```

Verified results:

```text
TypeScript: PASS
Focused tests: PASS, 61 tests
App Store metadata QA: PASS
Simulator rebuild: PASS with known pod warning only
```

Go or no go audit:

```text
node scripts/ios-go-no-go-audit.mjs
```

Result:

```text
NO GO
automated failures: 0
manual pending: 3
Gate F Ready to Submit unchecked
Gate G RoPhone paywall proof unchecked
Go or no go doc still marked NO GO
```

Screenshot proof:

`authentic-hadith/authentichadithapp/e2e-submit-20260708-39-revenuecat-subscription.png`

Claudex evidence copy:

`OPS/evidence/authentic_hadith_ios_submission_20260709/`

This folder contains 39 simulator screenshots:

```text
e2e-submit-20260708-01-launch.png through e2e-submit-20260708-39-revenuecat-subscription.png
```

Important caveat: screenshot 39 predates the committed seven day monthly trial copy patch. A fresh TestFlight or RoPhone subscription screenshot is still required after build 105 lands.

Production build and upload proof:

```text
Build 104: FINISHED
Build id: 67bbfe1d-12b1-4421-8085-766b82a8ccd0
App version: 1.1.0
Build number: 104
Commit: 1b01130
Submission id: 396c981c-b2d6-4dd5-bf95-2da09f3056bd
Submission result: FAILED
Apple reason: 1.1.0 train closed, version must be higher than approved 1.1.0
Fix commit: b260cd3 bumps app version to 1.1.1
Build 105: IN QUEUE at time of this receipt update
Build 105 id: 44463f0f-32a7-4580-8050-a16e98a0f308
Build 105 URL: https://expo.dev/accounts/redlantern/projects/authentichadithapp/builds/44463f0f-32a7-4580-8050-a16e98a0f308
Build 105 version: 1.1.1
Build 105 number: 105
Build 105 commit: b260cd3
```

## Keymon Handoff

VERIFIED: The handoff owner should start from latest pushed commit `b260cd3`, then track replacement build 105 and the screenshot evidence folder.

Keymon next actions:

1. Pull `authentic-hadith/authentichadithapp` branch `fix/repair-batch-2026-06-25` at commit `b260cd3` or newer.
2. Track replacement build 105 for app version `1.1.1`; upload it to App Store Connect if it finishes cleanly.
3. Use `OPS/evidence/authentic_hadith_ios_submission_20260709/` as the simulator screenshot evidence set.
4. In App Store Connect, confirm `ah_monthly_premium` has a seven day free trial introductory offer, then nine dollars ninety nine monthly billing.
5. Confirm all three products are Ready to Submit: `ah_monthly_premium`, `ah_annual_premium`, `ah_lifetime_premium`.
6. Confirm RevenueCat entitlement `premium` maps to all three product ids and that the default offering still returns three packages.
7. Run TestFlight or RoPhone paywall proof, restore purchases proof, and screenshot the subscription page after the seven day monthly trial wording is visible.
8. Update `PRE_TESTFLIGHT_READINESS_GATE.md`, `IOS_SUBMISSION_GO_NO_GO.md`, and rerun `node scripts/ios-go-no-go-audit.mjs`.
9. Only mark submit ready when the go or no go audit returns GO and the RoPhone or TestFlight paywall proof is attached.

## Next action

Keymon confirms the App Store Connect seven day monthly trial, finishes Gate F and Gate G proof, and updates the final go or no go doc before any iOS submission claim.
