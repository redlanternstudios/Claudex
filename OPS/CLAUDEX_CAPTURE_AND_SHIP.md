# Claudex Capture and Ship Contract

Version: 1.0
Owner: KP
Canonical repository: `redlanternstudios/Claudex`

## Goal

Turn a verified reusable system advancement from current work into the smallest correct Claudex artifact, prove it, receipt it, and publish it to the canonical repository during the same authorized work loop.

This contract makes capture automatic at session close. It does not make unverified ideas true and it does not widen repository or production authority.

## Trigger

Run the capture gate when any condition is true:

1. KP or Rory names a new topic, loop, hardcoded rule, reusable lesson, skill, control, or system advancement that should persist.
2. The current authorized task creates verified behavior that should work in later sessions or across engines.
3. Repeated work reveals a proven rule that prevents rediscovery, drift, or failure.
4. Claudex itself gains a new interface, validator, heartbeat, command, or trust boundary.

## Capture gate

Capture only when the advancement is authorized and durable.

PASS when it does at least one of these:

1. changes reusable operating behavior;
2. creates a shared loop, interface, skill, validator, or control;
3. records a verified recurring lesson;
4. advances the Claudex control plane;
5. is explicitly directed into durable Claudex memory.

PARK or REJECT when it is:

1. casual brainstorming or an unsupported hypothesis;
2. already represented by an existing authority file;
3. a secret, credential, token, personal data, or transcript dump;
4. product implementation that belongs in a product repository;
5. temporary generated status without reusable value;
6. a completion claim without acceptance evidence.

An unproven but potentially useful item belongs in `OPS/BACKLOG.json` as `CLARIFY`, `BLOCKED`, or `PARKED`. It does not become a permanent rule.

## Routing

| Advancement | Primary authority | Supporting pointer when needed |
| --- | --- | --- |
| Reusable agent behavior | `.claude/skills/<name>.md` | An `OPS/` contract for shared semantics |
| Dynamic task or loop | `OPS/BACKLOG.json` | TruthCal receipt on completion |
| Current authorized focus | `OPS/TODAY.md` | Backlog item or bridge pointer |
| Shared engine state | `OPS/BRIDGE.json` through the command layer | Schema and protocol |
| Durable architecture decision | Current architecture decision location | Memory index |
| Verified recurring lesson | Current memory location | Memory index |
| Work request to another engine | Bridge directive through the command layer | Evidence in acknowledgement or completion |
| Knowledge request | `OPS/questions/` protocol | Answer swept into receipt or memory |
| Completed advancement | `OPS/receipts/` through the command layer | Receipt index and bridge latest receipt |

Use one primary authority. Discovery files point to it and do not restate it.

## Capture contract

Every durable advancement must make these fields recoverable:

1. Trigger
2. Goal
3. Scope
4. Trusted inputs and freshness
5. Deterministic procedure
6. Authority boundary
7. Failure state
8. Evidence
9. Rollback

## Workflow

1. Boot from the current bridge, repository instructions, memory index, and current intent.
2. Sync before writing. Stop on RED.
3. Search existing capability and authority files before creating anything.
4. State goal, constraints, format, failure, acceptance criteria, and definition of done.
5. Route and implement the narrowest durable artifact.
6. Add tests or validation for executable behavior and structured state.
7. Use the command layer for bridge, directive, question, pointer, and receipt changes.
8. Run narrow tests, full check, secret scan, and diff whitespace check.
9. Create a TruthCal receipt with exact evidence, unknowns, remaining owner action, and rollback.
10. Refresh required boot and status artifacts, then run the full check again.
11. Review and stage only the scoped files.
12. Confirm the remote base is current, publish to the canonical default branch, and read the remote commit back.

Use only publication commands or connected GitHub capabilities that actually exist. Never invent a repository command.

## Authority boundary

This contract authorizes scoped writes to the Claudex repository when the underlying work is already authorized. It does not authorize:

1. production mutations;
2. secret or credential changes;
3. external messages or coordination;
4. product repository edits;
5. closing another owner's directive;
6. changing product authority or release state without evidence.

## Truth states

`VERIFIED` means the exact remote commit and evidence were read back.

`PARTIAL` means a useful artifact exists but a proof, dependency, or publication gate is incomplete.

`BLOCKED` means authority, trustworthy source, repository access, or required validation is unavailable.

`UNKNOWN` means external state was not inspected.

Local files and local commits are not shipped state.

## Acceptance criteria

1. Claudex agents discover the trigger during boot.
2. Durable work routes to one primary authority.
3. Unverified work cannot become a permanent verified rule.
4. Product code and secrets remain outside Claudex capture.
5. The repository full check passes.
6. A TruthCal receipt names evidence and rollback.
7. The resulting default branch commit is read back through GitHub.

## Definition of done

The advancement is complete only when the artifact, discovery pointer, validation, receipt, and verified remote commit all exist. Otherwise report the strongest honest partial state.
