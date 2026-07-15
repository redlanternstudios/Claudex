# Claude Memory Handoff: Authentic Hadith App v3 iOS Testing

Date: 2026-07-11
Target memory: Authentic Hadith iOS submission and QA memory

## Save This

The canonical iOS testing pack now lives at:

`Claudex/OPS/iOS App Testing/AUTHENTIC_HADITH_V3_IOS_TESTING_STEPS.md`

Save or mirror it into memory as the active Authentic Hadith iOS submission QA checklist.

## Current Truth

VERIFIED:

- Submission is paused.
- Current work shifted from immediate App Store push to responsive formatting, section segmentation, onboarding, paywall, and full QA proof.
- New users must not reach app interior without premium access.
- QA and Apple review need a no payment route.
- The no payment route must be exact account based, not a visible public skip button.
- The monthly RevenueCat path must show a seven day trial before 9.99 monthly billing.
- The paywall plan layout needs readable stacked pricing so the monthly label and long trial price do not collide.

PARTIAL:

- Simulator can prove routing and layout.
- Physical TestFlight is still required for final device proof.
- StoreKit native sheet proof is required before submission.
- Any simulator or paywall anomaly must be written into this folder immediately so the next run does not repeat the same miss.

UNKNOWN:

- Whether the latest physical TestFlight build includes every local fix until a fresh install pass is completed.

## Next Claude Action

1. Save the testing pack into memory.
2. Treat it as the required checklist before any iOS submission.
3. Keep App Store submission on hold until the checklist returns GO.
4. Track screenshots against this checklist, not scattered chat images.
5. Do not mark complete unless both normal user paywall gate and QA no payment path are proven.
6. Document every loop, stall, or flaky simulator result in the iOS App Testing folder before starting the next pass.
