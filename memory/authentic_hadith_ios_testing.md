# Authentic Hadith iOS Testing Memory

Updated: 2026-07-11

Canonical checklist:

`Claudex/OPS/iOS App Testing/AUTHENTIC_HADITH_V3_IOS_TESTING_STEPS.md`

Status:

- Submission is on hold.
- Full iOS testing must prove both regular paid gating and no payment QA access.
- No payment QA access must be exact account based, never a public skip button.
- Monthly RevenueCat purchase sheet must show seven day trial before monthly billing.
- Physical TestFlight remains required before App Store submission.
- Simulator, paywall, onboarding, and reviewer path misses must be written into `Claudex/OPS/iOS App Testing/` on the same day they are found.
- When simulator control is flaky, capture the screen and log the environment issue separately instead of treating it as an app bug.
- On 2026-07-11 simulator testing, reviewer login returned invalid credentials, disposable signup returned Success, and sign in still failed when the email field did not retain input cleanly.
- On 2026-07-12 fresh simulator testing, the allowlisted QA account `qa.review.01@authentichadith.app` was created, signed in, completed onboarding, and entered the app interior without a paywall. The stale reviewer account `apple.reviewer@authentichadith.app` still returned invalid credentials on this backend.
- The clean simulator path confirmed the monthly paywall text, restore purchases alert for a non premium user, and that onboarding does not loop on the allowlisted QA account.
- The allowlisted QA roster now lives in `Claudex/OPS/iOS App Testing/QA_ALLOWLIST_ACCOUNTS.md` and mirrors `authentic-hadith/authentichadithapp/docs/appstore/QA_ALLOWLIST_ACCOUNTS.md`.
- Drive mirror: `https://docs.google.com/document/d/1OO4FEv1iEo6KLRPsYftNYSBN8MwGR4Y5UFwOJ1LrSVo/edit?usp=drivesdk`
- Keep the roster exact. Update code, repo docs, Claudex docs, and tests together when the list changes.

Next action:

Run the checklist page by page, feature by feature, component by component, button by button, screenshot every proof point, then decide GO or NO GO.
