# TruthCal Receipt

Receipt ID: TC-20260708-CDX-04
Product: authentic_hadith
Lane: ah/e2e v1 refinement
Engine: codex
Date: 2026 07 08

## Objective

Checkpoint the Authentic Hadith v1 refinement work so screenshots, fixes, and current submission posture are durable in Claudex.

## Reality Check

VERIFIED: the bridge lane was opened as `ah/e2e-v1-refinement`.

VERIFIED: the app folder contains the local receipt `V1_REFINEMENT_2026_07_08.md`.

VERIFIED: 24 screenshot files are saved in the Authentic Hadith app folder across the v1 refinement and submission passes.

VERIFIED: the visible collection scope is Sahih al Bukhari and Sahih Muslim only.

VERIFIED: the forced launch paywall was removed from the tested startup path.

VERIFIED: Home, Collections, collection detail, topic list, topic detail, Today, Chat, My Hadith, More, and Book detail have simulator screenshots in this checkpoint.

PARTIAL: full e2e is not complete. Hadith detail, settings child pages, search, learn, profile, save, share, and destructive account flows still need explicit pass or scoped deferral before submission readiness is claimed.

## Execution

Implemented app fixes for Sahihayn visibility, route alignment, paywall access, dark mode patterning, collection titles, topic scoping, Collections formatting, Chat spacing, and Book detail naming.

Ran focused TypeScript and Jest verification during the pass.

Rebuilt the app on the iPhone 17 Pro simulator after fixes.

## Result

PARTIAL: the work is now checkpointed and no longer only exists as unreceipted local screenshots. Continue the e2e route sweep before App Store submission.

## Edge Cases

UNKNOWN: App Store Connect live review state was not checked in this Codex pass.

PARTIAL: Google Drive and Obsidian copies are still pending from this checkpoint unless a later receipt says they were completed.

