---
name: note-taking-protocol
description: Ro's "make note" protocol — how to capture, store, and propagate decisions, file locations, and design choices across memory, team, and documentation
metadata:
  type: feedback
---

# "Make Note" Protocol

## What triggers a note
- A file is saved anywhere (Drive, workspace, Supabase)
- A design decision is made
- A CTP verdict is reached
- A product scope is locked
- A tool/API status changes (verified, blocked, missing)
- A location is confirmed (Drive folder, repo path, etc.)

## Where notes go

| Note type | Destination |
|-----------|-------------|
| File locations | `memory/[product]_file_locations.md` |
| Design decisions | `memory/decision_log.md` |
| CTP verdicts | `memory/[product]_design_decisions.md` |
| Scope locks | `memory/scope_lock_[product].md` + SwarmClaw dispatch |
| Team updates | iMessage to Keymon + Basheer (via iMessage MCP) |
| MEMORY.md index | Always update after writing any memory file |

## Team propagation rule
When a note is significant enough for Keymon or the team:
- Use iMessage MCP (`mcp__Read_and_Send_iMessages__send_imessage`) to Keymon
- Contact ref: `memory/project_contacts.md`
- Keep it high-level, casual, plain language (Ro's style)
- No walls of structured text in iMessage — conversational only

## CTP capture rule
Every CTP must be logged. Format:
```
Product: [name]
Date: [date]
Question: [what was CTPs]
Pass 1 verdict: [key finding]
Pass 2 audit: [what Pass 1 missed]
Final answer: [decision]
Status: [open / decided / locked]
```

## How I check before assuming
Before referencing a file location, API key, or feature status:
1. Check `memory/[product]_file_locations.md`
2. Check DATA_MANIFEST for API/data status
3. Check `.env.local` for active keys
4. Never assume — label as ASSUMPTION if unverified

**Why:** Ro's build has multiple products, scattered across Drive, workspace, Supabase, and SwarmClaw. Without explicit notes, Claude guesses wrong locations and wastes sessions.
