# Claudex Preflight Audit Contract

Version: 1.0
Owner: Claudex
Canonical repository: `redlanternstudios/Claudex`

## Goal

Turn a checklist that is getting used as a one off troubleshooting note into a repeatable preflight audit that can be rerun on any BuildTeam style surface.

## Scope

This contract covers:

1. live surface verification;
2. checklist completeness;
3. repeatable skill shape;
4. freeze cause detection;
5. readiness verdicts;
6. durable capture back into Claudex.

It does not claim to create or repair the live product surface by itself.

## Trusted inputs

1. Current bridge state.
2. Current chat context.
3. The exact surface being audited.
4. Any existing checklist or audit notes.
5. File based evidence or committed proof.

## Deterministic procedure

1. State the prompt contract.
2. Confirm the exact surface and whether it is live, mirrored, or documented only.
3. List every checklist item as a testable step.
4. Give each step an entry condition, exit condition, proof requirement, and rollback.
5. Mark freeze risks and missing proof.
6. Classify the result as `READY`, `HOLD`, or `BLOCKED`.
7. If the shape is reusable, store it as the smallest durable skill or command update.

## Authority boundary

This contract is a Claudex operating artifact. It does not authorize product changes outside the current repo scope or any live platform mutation without separate proof and approval.

## Failure state

The audit fails if any of these are true:

1. a checklist item has no proof requirement;
2. a readiness claim is made without evidence;
3. the live surface cannot be distinguished from a mirror;
4. the freeze cause has no rollback or exit condition;
5. the skill shape cannot be rerun by a future session.

## Evidence

Accepted evidence includes:

1. the routed skill and command file;
2. a matching contract file;
3. a receipt or commit that records the change;
4. a read back of the exact file paths.

## Rollback

If the skill proves too broad, reduce it to the checklist core and keep the command wrapper pointing at the same contract. Do not create a duplicate authority file.
