# Naming Convention Standard

Receipt timestamp: 2026-07-07 America/Los_Angeles

## Purpose

Names must be readable at face value by someone who does not know KP, Rory, Claudex, PE Agentic OS, Amina, Make, Supabase, Obsidian, or the internal build system.

If a person has to ask "what is this?" after reading the filename, the name failed.

## Core Rule

Use plain English first. Use system codes only at the end when they help machines or receipts.

Good name:

`2026-07-07 - Penn Enterprises - Notion Exit Migration Plan.md`

Bad name:

`notion_mig_v2_final_final.md`

Bad name:

`PEOS_N2C_SYNC_FIX.md`

## Human Facing File Names

Use this format for Obsidian, Google Drive, client folders, and portfolio assets:

`YYYY-MM-DD - Owner or Project - Plain Outcome - Status.ext`

Examples:
- `2026-07-07 - Penn Enterprises - Notion Exit Migration Plan - Draft.md`
- `2026-07-07 - Amina - App Store Submission Checklist - Verified.md`
- `2026-07-07 - Client Name - Automation Delivery Receipt - Sent.pdf`
- `2026-07-07 - KP Brain - Migrated Notion Notes Index - Active.md`

Rules:
- Use spaces for human-facing names.
- Use Title Case for main words.
- Start with a date only when the item is time-bound, a receipt, a meeting, a draft, a migration batch, or a status snapshot.
- Do not use internal abbreviations unless the full name appears first.
- Do not use "final" unless no further edits are expected and a receipt exists.
- Do not use vague names like `notes`, `stuff`, `misc`, `new doc`, `brain dump`, or `cleaned`.

## Claudex Operating File Names

Use this format for canonical Claudex operating docs:

`CLEAR_SYSTEM_TOPIC.md`

Examples:
- `NOTION_EXIT_MIGRATION_PLAN.md`
- `NAMING_CONVENTION_STANDARD.md`
- `DATABASE_MAP.md`
- `SCOPE_LOCK_CLAUDEX_V2.md`

Rules:
- Use uppercase snake case for canonical `OPS/` files.
- Keep names short, direct, and operational.
- A canonical file name should describe the system role, not a one-time task.

## Obsidian Note Names

Use this format for durable notes:

`Project or Area - Plain Topic.md`

Examples:
- `Penn Enterprises - Notion Exit Migration.md`
- `Amina - Product Strategy Notes.md`
- `ByRedLLC - Production Source of Truth.md`
- `KP Personal - Weekly Reflection.md`

Use dates for:
- daily notes;
- meeting notes;
- migration batches;
- receipts;
- time-specific snapshots.

Examples:
- `2026-07-07 - Notion Migration Batch 001.md`
- `2026-07-07 - Daily Note.md`

## Google Drive Names

Use this format for deliverables and shareable files:

`Owner - Asset Type - Plain Outcome - Version or Date.ext`

Examples:
- `Penn Enterprises - Portfolio One Pager - 2026-07-07.pdf`
- `Amina - App Store Screenshots - Build 21.zip`
- `Client Name - Automation Proof Packet - v1.pdf`

Rules:
- Put client-facing deliverables in Google Drive, not buried in Obsidian.
- Keep the name understandable without opening the file.
- Use version numbers only for deliverables, not thinking notes.

## Folder Names

Folders should answer "what lives here?"

Good:
- `01 - Current Operating State`
- `02 - Product Documentation`
- `03 - Receipts and Proof`
- `04 - Migrated Notion Notes`
- `99 - Archive`

Bad:
- `random`
- `old`
- `stuff`
- `temp`
- `brain`
- `important`

## Status Words

Allowed status words:
- `Draft`
- `Active`
- `Verified`
- `Partial`
- `Archived`
- `Superseded`
- `Needs Review`
- `Do Not Use`

Avoid:
- `Final`
- `Real`
- `New`
- `Updated`
- `Clean`
- `Good`

## Migration Batch Names

Use this for Notion migration batches:

`YYYY-MM-DD - Notion Migration Batch NNN - Lane - Status.md`

Examples:
- `2026-07-07 - Notion Migration Batch 001 - Operating State - Partial.md`
- `2026-07-07 - Notion Migration Batch 002 - Client Hubs - Verified.md`
- `2026-07-07 - Notion Migration Batch 003 - Personal Notes - Needs Review.md`

## Required Header For Migrated Notes

Every migrated Notion note must start with:

```markdown
# Clear Human Title

Migration status: Partial | Verified | Archived | Needs Review
Original Notion title:
Original Notion URL:
Migrated on:
New home:
Owner:
Verification receipt:

## Summary

## Content
```

## Decision Test

Before keeping a name, ask:

1. Can someone outside the build system understand it?
2. Does it say the owner or project?
3. Does it say the outcome or content?
4. Does it avoid unexplained codes?
5. Does the location match the type of information?

If any answer is no, rename it before migration.

