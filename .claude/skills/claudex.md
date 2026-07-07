# /claudex

Status: ACTIVE
Created: 2026-07-07

## Trigger

Run when KP starts a message with `/claudex`.

## Contract

Read `OPS/CLAUDEX_SKILL_PROTOCOL.md` and convert the current chat into a durable Claudex artifact plus an Obsidian-ready mirror note.

## Required behavior

1. Classify the chat as receipt, directive, question, bridge update, CTP, architecture note, or Rory activity evidence.
2. Choose the correct Claudex path.
3. Choose the matching Obsidian path.
4. Write the markdown artifact when repo or vault access exists.
5. Return PUSHED only when a write or commit proves it.
6. Return READY_TO_PUSH or READY_TO_SYNC when access is missing.

## Truth rule

No evidence, no claim.

For Rory activity, use only same-day receipts, commits, bridge updates, answered questions, or directives marked done with evidence.
