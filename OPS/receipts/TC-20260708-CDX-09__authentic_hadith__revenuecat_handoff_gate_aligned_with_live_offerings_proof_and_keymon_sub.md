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
VERIFIED: Authentic Hadith app branch `fix/repair-batch-2026-06-25` was pushed at commit `5729a0c` with the RevenueCat anonymous logout guard, live offering verifier alignment, gate docs, Keymon handoff docs, and subscription screenshot 39.
VERIFIED: Live RevenueCat offering audit passed against the configured iOS public key. Current offering is `default`; product ids are `ah_monthly_premium`, `ah_annual_premium`, and `ah_lifetime_premium`; missing product ids are none.
VERIFIED: TypeScript passed, focused Jest passed, App Store metadata QA passed, and simulator rebuild passed with the known pod warning only.
VERIFIED: The app no longer shows the launch paywall gate in the rebuilt simulator proof set.
PARTIAL: Ro then requested the monthly plan show a free seven day option tied to the nine dollar ninety nine monthly plan. Codex paused immediately after a local copy patch in `authentic-hadith/authentichadithapp/app/settings/subscription.tsx`; that patch is uncommitted and unverified.
UNKNOWN: App Store Connect introductory offer state is not visible from this Codex session. Local copy cannot create the real free trial. Keymon must confirm `ah_monthly_premium` has a seven day free trial introductory offer before iOS submission.
UNKNOWN: Manual App Store Connect product state remains pending. Gate F Ready to Submit, Gate G RoPhone paywall proof, and the final go or no go doc still need human evidence.

## Evidence

Repository proof:

`authentic-hadith/authentichadithapp` branch `fix/repair-batch-2026-06-25`, commit `5729a0c`.

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

Important caveat: screenshot 39 predates the uncommitted seven day monthly trial copy patch.

Paused local app delta:

```text
M app/settings/subscription.tsx
```

The local delta changes the monthly plan wording to seven days free, then monthly premium access. It still needs rebuild, screenshot, QA, commit, and push before Keymon should treat it as shipped.

## Keymon Handoff

VERIFIED: The handoff owner should start from commit `5729a0c`, then explicitly handle the paused monthly trial copy delta.

Keymon next actions:

1. Pull `authentic-hadith/authentichadithapp` branch `fix/repair-batch-2026-06-25`.
2. Preserve or reapply the paused monthly trial copy change in `app/settings/subscription.tsx`, then run TypeScript, focused tests, and simulator proof again.
3. In App Store Connect, confirm `ah_monthly_premium` has a seven day free trial introductory offer, then nine dollars ninety nine monthly billing.
4. Confirm all three products are Ready to Submit: `ah_monthly_premium`, `ah_annual_premium`, `ah_lifetime_premium`.
5. Confirm RevenueCat entitlement `premium` maps to all three product ids and that the default offering still returns three packages.
6. Run TestFlight or RoPhone paywall proof, restore purchases proof, and screenshot the subscription page after the seven day monthly trial wording is visible.
7. Update `PRE_TESTFLIGHT_READINESS_GATE.md`, `IOS_SUBMISSION_GO_NO_GO.md`, and rerun `node scripts/ios-go-no-go-audit.mjs`.
8. Only mark submit ready when the go or no go audit returns GO and the RoPhone or TestFlight paywall proof is attached.

## Next action

Keymon confirms the App Store Connect seven day monthly trial, finishes Gate F and Gate G proof, and updates the final go or no go doc before any iOS submission claim.
