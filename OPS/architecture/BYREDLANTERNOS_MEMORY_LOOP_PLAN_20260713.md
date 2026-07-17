# ByRedLanternOS Memory and Build Loop Plan

Date: 2026-07-13
Owner: Ro
Audience: Ro, Keymon, Codex, Claude
System: byredlanternos.com

## Prompt Contract

GOAL: make every project start from the same current state, move through the same build path, and finish with checkoff proof that survives chat loss.

CONSTRAINTS: byredlanternos.com is the project ledger, Claudex is the shared control plane, Obsidian and Drive are mirrors, SwarmClaw is the builder, GitHub and Supabase must be defined before build starts, V0 is UI only, and UI image packs come from Codex or ChatGPT only.

FORMAT: one shared operating plan with a source map, loop design, project record rules, and completion gates.

FAILURE: if a project can be started without a repo and db lock, if a task can be marked done without evidence, if a mirror drifts from the live record, or if a model or provider change happens without a decision record, the system is not coherent yet.

## Reality Check

VERIFIED: Claudex already holds the bridge, receipts, question exchange, and consumer registry.
VERIFIED: ByRed OS already has a live task board, receipt store, and source registry in the local app.
VERIFIED: SwarmClaw already has the local only provider path and can be used as the build engine.
PARTIAL: The studio does not yet have one explicit project manifest standard that every project must follow.
UNKNOWN: Whether every active project currently has the same repo and Supabase lock documented in one place.

## 3 Pass Analysis

### Pass 1

It looks like the missing piece is just a better note.

### Pass 2

It is not just a note. The system needs one living project record, one retrieval path, one build path, and one completion path. Without that, the same project can look different in chat, in the board, in SwarmClaw, and in the mirrors.

### Pass 3

The real problem is split authority. The system needs a canonical project manifest, a controlled loop that writes receipts when state changes, and a retrieval rule that loads current truth before any new build starts. That is what makes the plan behave like an operating system instead of a pile of reminders.

## Missing Pieces To Close The Loop

1. A canonical project manifest template.
2. A rule that locks repo and Supabase before build.
3. A task board entry for every active project or milestone.
4. A receipt for every meaningful state change.
5. A mirror path for Obsidian and Drive.
6. A retrieval rule for new chats.
7. A build handoff rule for SwarmClaw.
8. A UI rule for V0 only, with Codex or ChatGPT image packs only.
9. A model and provider upgrade policy with evidence.
10. A completion gate that requires proof before checkoff.

## Source Of Truth Map

| Surface | Role | What lives there |
|---|---|---|
| Claudex | Shared control plane | Bridge, receipts, directives, current intent, canonical state |
| byredlanternos.com | Project ledger | Tasks, subtasks, status, activity, completion proof |
| SwarmClaw | Build engine | Agent execution, provider routing, local work, handoff execution |
| GitHub | Code truth and transport | Repo history, commits, review trail |
| Supabase | Data truth | Schema, rows, policies, runtime data |
| V0 | UI sketch surface | UI draft only, not final truth |
| Obsidian | Personal mirror | Retrieval notes, session memory, personal references |
| Drive | Shareable mirror | Standard docs, PDFs, handoff packets |

## Operating Flow

1. Capture the idea in chat.
2. Write the project manifest in Claudex and the matching task in ByRed OS.
3. Lock the repo and Supabase project before build starts.
4. Add the build lane in SwarmClaw.
5. Build in SwarmClaw or the target repo.
6. Test before ship.
7. Write the receipt.
8. Mirror the result into Obsidian and Drive.
9. Mark the task complete only after the receipt exists.
10. Archive or roll forward the next task.

## Project Record Standard

Every project should carry the same fields:

- project name
- owner
- assignee
- repo
- Supabase project
- current phase
- current lane
- source pack
- mirror targets
- status
- blockers
- next action
- receipt link

## Hooks, Triggers, And Loops

### Hooks

- New chat starts by reading the bridge, current intent, and the live project record.
- New project starts by creating the manifest and the task board item.
- New build starts only after repo and db are named.

### Triggers

- GitHub commit changes the task status.
- Supabase schema or data change updates the project record and receipt trail.
- SwarmClaw provider or model change creates a decision record.
- V0 output creates a UI draft receipt and a handoff note.
- Drive or Obsidian mirror refreshes from Claudex, not from chat memory.

### Loops

- Plan -> build -> test -> ship.
- Capture -> retrieve -> act -> verify -> archive.
- Update -> receipt -> mirror -> checkoff.

## RAG Layers

1. Project manifest
2. Claudex bridge
3. ByRed OS task board
4. Source registry
5. Receipts index
6. Obsidian mirror
7. Drive mirror
8. SwarmClaw handoff surface

The retrieval path should always answer: what is the current project, what is locked, what is next, and what proof already exists.

## Completion Gate

A project is not done until all of these are true:

- repo is named
- Supabase db is named
- task is checked off in the OS
- receipt exists in Claudex
- mirror notes are updated
- test result is recorded
- ship or archive state is explicit

## Exception Policy

- If a new model appears, keep the current default until evidence shows equal or better quality at equal or lower cost.
- If a provider changes, record the reason before switching.
- If a project needs paid spend, name the lane before money moves.
- If image packs are needed, they come from Codex or ChatGPT only, never Claude.

## Next Action

Create the canonical project manifest template, seed one live task per active project, and wire each one to the same receipt and mirror loop.
