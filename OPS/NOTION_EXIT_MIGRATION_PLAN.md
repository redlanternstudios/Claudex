# Notion Exit Migration Plan

Receipt timestamp: 2026-07-07 America/Los_Angeles

## Status

PARTIAL: migration control standard created.

VERIFIED:
- Claudex is the coordination bridge for Claude and Codex.
- Obsidian is the human knowledge view.
- Google Drive is available locally at `/Users/kp/Library/CloudStorage/GoogleDrive-clashon64@gmail.com/My Drive`.
- KP Brain Obsidian vault is available at `/Users/kp/Documents/Penn Enterprises LLC/KP Brain`.

MISSING:
- Full live Notion workspace inventory has not been exported or audited in this pass.
- No Notion pages were deleted, archived, or moved in Notion.

## Objective

Move Notion out of the center of the operating system without losing knowledge, receipts, or user-facing clarity.

Notion should become optional. Claudex, Obsidian, Google Drive, Supabase, and product repos should each own the lane they are best at.

## Failure Conditions

This migration fails if:
- a stranger cannot tell what a file is from its name;
- agent state is moved into Obsidian where Codex cannot reliably execute from it;
- private thinking is moved into Claudex where it becomes operational truth too early;
- deliverables are buried in notes instead of stored in Drive;
- database truth is copied into markdown instead of living in Supabase or a verified export;
- Notion is deleted before every migrated item has a destination, owner, and verification status.

## Destination Rules

| Notion content type | New home | Why |
| --- | --- | --- |
| Agent operating state, handoffs, blockers, next actions | Claudex `OPS/` | Agents need a strict bridge, not a human note wall. |
| Verified receipts and completion proof | Claudex `OPS/receipts/` or PE receipts lane | Truth Serum needs durable proof artifacts. |
| Product architecture and build rules | Claudex `docs/` or product repo docs | Builders need versioned files close to execution. |
| Private strategy notes and personal thinking | Obsidian `KP Brain/` | Obsidian is the human knowledge graph. |
| Migrated Notion notes not yet reclassified | Obsidian `06 - Notion Mirror/01 - Migrated Notes/` | Safe landing zone while preserving context. |
| Client deliverables, PDFs, decks, videos, exports | Google Drive | Drive is the file cabinet and sharing layer. |
| App data, user records, auth, production tables | Supabase | Real product data belongs in a database. |
| Source code, migrations, package config | Product repo | Build systems expect code in repos. |
| Old, stale, or duplicate Notion pages | Obsidian archive or Drive archive after verification | Keep history without treating it as current truth. |

## Migration Phases

### Phase 1: Inventory

Create an inventory before moving anything.

Required fields:
- Current Notion title
- Current Notion URL
- Content type
- New home
- New file or folder name
- Owner
- Status: KEEP, MIGRATE, ARCHIVE, DELETE LATER, UNKNOWN
- Verification receipt

Do not delete Notion pages during inventory.

### Phase 2: Classify

Classify every page into one primary lane:
- Claudex operating truth
- Obsidian human knowledge
- Google Drive deliverable
- Supabase data
- Product repo documentation
- Archive

If a page fits multiple lanes, split it. Do not duplicate it blindly.

### Phase 3: Migrate

Use the naming standard in `OPS/NAMING_CONVENTION_STANDARD.md`.

Every migrated item gets:
- a clear title;
- original Notion URL;
- migration date;
- destination path;
- verification status;
- next owner.

### Phase 4: Verify

Verification means:
- destination exists;
- title is understandable at face value;
- original Notion URL is preserved;
- content is readable;
- destination lane matches the content type;
- no secrets were copied into public or git-tracked locations.

### Phase 5: Retire Notion

Only after verification:
- mark Notion page as migrated, or move it to a Notion archive area;
- do not delete until the matching destination has been checked.

## Human Simple Version

Claudex is for what the agents need to operate.

Obsidian is for what KP needs to think and remember.

Google Drive is for files people need to open, share, sign, watch, or download.

Supabase is for real app data.

Notion is the old workspace being drained carefully.

