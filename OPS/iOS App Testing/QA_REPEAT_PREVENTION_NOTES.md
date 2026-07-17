# QA Repeat Prevention Notes

Date: 2026-07-11
Product: Authentic Hadith App v3

## Purpose

This note exists so simulator, paywall, onboarding, and review account mistakes do not get lost between runs.

## Current Verified State

VERIFIED:

1. The simulator shows the current build, not a stale binary.
2. The app lands on the account entry gate on first launch.
3. The capture used for proof is `/private/tmp/auth_hadith_screen.png`.

PARTIAL:

1. The exact no payment QA account still needs to be used for a full interior pass.
2. Physical TestFlight proof is still required later in the submission flow.
3. Simulator device listing and control may be flaky, so a screenshot fallback should be logged whenever the service misbehaves.
4. Simulator login input can look correct in the tool output but still submit as blank in the app.
5. The normal user path now reaches the paywall and the paywall continue action opens the native Apple purchase sheet.
6. Canceling the native purchase sheet returns to the paywall, so this is the expected loop until premium is granted.

## Repeat Prevention Rules

1. Write the issue here the same day it happens.
2. Include the screen, the account, and the exact stop point.
3. Include the next action, even if the next action is only to wait for credentials.
4. Do not assume the next person will remember the context from chat.
5. Treat any paywall loop or onboarding loop as a real QA block until proven otherwise.
6. If the simulator service fails, write that down as environment behavior, not an app defect, unless the app itself is actually frozen.
7. If the developer inspector appears during a flow, clear it before judging the app.
8. If the Apple purchase sheet appears, record whether it opened from Continue and whether Cancel returned to the paywall.

## What To Log Next Time

1. Whether the test account reached the interior.
2. Whether the paywall showed the trial copy correctly.
3. Whether any loop returned the user to sign in, onboarding, or paywall.
4. Whether the simulator itself failed to respond.
5. Whether the app build matched the latest submitted build.
6. Whether a screenshot fallback was needed because simulator control was unreliable.
7. Whether the login form actually accepted the email field.
