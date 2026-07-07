# Claudex Naming Standard

Version 1.0
Date 2026 07 07
Owner RedLantern Studios

## Objective

Make files readable to Ro, Keymon, Claude, and Codex before anyone opens them.

## Reality Check

VERIFIED: Old receipt files like `TC-20260707-CDX-08.md` prove sequence and engine, but they do not explain the work.
VERIFIED: The receipt index carries intent, but a person scanning a folder still sees opaque names first.
VERIFIED: Bridge references depend on stable file paths, so committed receipt history must not be mass renamed.

## Canonical Pattern

Use this for all new receipt files:

`TC-YYYYMMDD-ENG-NN__product__topic_words.md`

Examples:

`TC-20260707-CDX-08__hirewire__auth_email_recovery.md`
`TC-20260707-HUM-01__amina__testflight_submission.md`
`TC-20260707-CLA-02__claudex__naming_standard.md`

## Rules

1. Keep the receipt ID first.
2. Use the engine tags already defined in `OPS/BRIDGE_PROTOCOL.md`.
3. Add exactly two readable fields after the ID: product, then topic.
4. Use lowercase words joined with underscores for readable fields.
5. Do not use spaces in filenames.
6. Do not rename committed receipts unless the bridge has a broken pointer and the repair is receipted.
7. If a legacy receipt needs readability, add an index line or a clearly marked alias file. Do not erase the original.
8. The receipt body must still include the exact `Receipt ID`.

## Other Claudex Files

Use this pattern for new operating docs:

`AREA_TOPIC_YYYYMMDD.md`

Examples:

`OPS_NAMING_STANDARD_20260707.md`
`AMINA_IOS_SUBMISSION_HANDOFF_20260707.md`
`PE_AUTOMATION_DISCOVERY_QUEUE_20260707.md`

Use this pattern for questions and directives because tooling expects it:

`Q-YYYYMMDD-NN.md`
`DIR-YYYYMMDD-ENG-NN`

## Acceptance Criteria

VERIFIED: A new operator can infer product and topic from the filename alone.
VERIFIED: The receipt ID remains machine sortable and collision resistant.
VERIFIED: The filename can be safely referenced by `OPS/BRIDGE.json`.

## Definition Of Done

This standard is active when:

1. `OPS/BRIDGE_PROTOCOL.md` points here.
2. `OPS/TRUTHCAL_RECEIPT.md` points here.
3. `AGENTS.md`, `CLAUDE.md`, and `.claude/CLAUDE.md` tell engines to follow it.
4. Keymon onboarding points external operators here.
5. The bridge command layer creates readable receipt filenames automatically.
