# Amina iOS submission handoff

Audience: Keymon and Keymon’s Claude

Owner: Keymon

Bridge lane: `amina/ios-submission-qa`

Last reconciled: 2026-07-05

Canonical product copy: Amina `coordination/IOS_SUBMISSION_HANDOFF.md`

Primary evidence: `OPS/receipts/TC-20260705-005.md`

## Objective

Move Amina from a verified simulator build to an accepted App Store submission with a signed archive, TestFlight proof, physical device proof, complete privacy declarations, and a review ready demo account.

## Current verdict

**RED. Do not submit yet.**

VERIFIED: Amina builds, installs, launches, restores an authenticated session, and renders the core routes on an iPhone 17 Pro simulator running iOS 26.5.

VERIFIED: The Home initiated chat loop creates its conversation, streams an OpenAI response, renders it, and persists the user and assistant rows in the same Supabase conversation.

VERIFIED: Safe area repairs cover marketing, authentication, shared app headers, chat, Reflections, Du’a Wall, Profile, and moderation routes. PR 51 merged at `41ec9c8`.

VERIFIED: The privacy disclosure names OpenAI. A baseline `PrivacyInfo.xcprivacy` exists.

VERIFIED: Eleven invariant checks, three chat persistence tests, three family tests, thirty six deen evaluations, five moderation tests, TypeScript checking, and the production web build passed during the submission audit.

BLOCKED: The Release archive exits with code 65 because the App target has no Apple development team.

UNKNOWN: The final privacy manifest report and App Store Connect privacy answers have not been reconciled.

UNKNOWN: TestFlight install, sandbox purchase, restore, account deletion, recovery, deep links, and the physical device matrix have not been receipted.

UNKNOWN: App Review metadata, screenshots, support URL, privacy URL, review notes, and demo account readiness have not been receipted.

## Keymon execution contract

Run these gates in order:

1. Select the RedLantern Apple development team for the Amina App target and confirm `com.redlanternstudios.amina`.
2. Reconcile the signed archive privacy report, `PrivacyInfo.xcprivacy`, public policy, and App Store Connect App Privacy answers.
3. Produce and validate the signed Release archive.
4. Upload that exact archive to TestFlight and install the processed build on a physical iPhone.
5. Run signup, age gate, onboarding, session restoration, Home to chat, chat persistence, chat recovery, Reflections, Du’a Wall, Circle, report, block, purchase, restore, account deletion, offline recovery, deep links, permissions, and accessibility.
6. Complete screenshots, review notes, URLs, age rating, export compliance, content rights, review contact, and a fresh demo account.
7. Submit the exact build that passed the matrix.
8. Write a TruthCal receipt and update the bridge through the command layer.

## Acceptance gate

Keep Amina RED unless all of the following are VERIFIED:

1. Repository checks pass on the submitted commit.
2. Release archive and Organizer validation pass.
3. Privacy report and App Privacy answers agree.
4. TestFlight processing and physical installation pass.
5. Every critical journey passes on the exact TestFlight build.
6. RevenueCat sandbox purchase and restore pass.
7. Account deletion signs the disposable test account out.
8. No primary route overlaps system UI.
9. Chat visibly responds or exposes a recoverable error, and the successful exchange persists.
10. Review metadata, screenshots, notes, and credentials work from a clean device.

## Stop conditions

Stop and preserve RED if signing fails, privacy declarations drift, the tested and submitted builds differ, purchase or restore fails, deletion fails, chat stalls silently, report or block is missing, safe areas regress, or the review account cannot reach gated features.

## Locked decisions

1. Chat remains OpenAI `gpt-4o`.
2. `pnpm test:invariants` must pass.
3. Do not merge `v0/*` during submission.
4. No secrets or review credentials enter Git.
5. Simulator proof is not physical device proof.
6. TestFlight processing is not App Store approval.

## Required receipt

The closeout receipt must name the Amina commit, version, build, archive result, privacy result, TestFlight build, physical devices, every journey result, purchase and restore result, deletion result, App Store Connect state, remaining warnings, and owners.

## Full operating handoff

The Amina repository copy is the complete runbook. It contains the scope lock, commands, six gates, matrix, evidence requirements, metadata checklist, stop conditions, known operational notes, and definition of done:

`coordination/IOS_SUBMISSION_HANDOFF.md`

## First action

Keymon selects the RedLantern Apple development team on the App target and produces the first signed Release archive. Everything after that must use the same version and build lineage.
