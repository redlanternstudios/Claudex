# Claudex Rory Operating Loop Contract

Version 1.0

Owner KP

Status ACTIVE

## Goal

Give KP and Rory two reliable entry points that share one evidence governed operating loop.

`Send to Rory` turns verified work into one precise RLS delivery.

`FROM RORY` turns Rory's return artifact into plain language system understanding with upstream and downstream consequences.

## Single authority map

This contract coordinates the loop. It does not duplicate the procedures inside the skill files.

| Capability | Canonical repository authority | Consumer |
| --- | --- | --- |
| Outbound delivery | `.claude/skills/send-to-rory.md` | KP, Codex, Claude |
| Inbound interpretation | `.claude/skills/from-rory.md` | KP, Codex, Claude |
| Visual release gate | `.claude/skills/sight-engine.md` | Outbound and inbound visual work |
| Priority and owner lane | `.claude/skills/backlog-heartbeat.md` | Heartbeat and handoff |
| Claudex capture | `.claude/skills/ship-to-claudex.md` | Durable system advancement |
| Verified learning | `.claude/skills/receipt-backed-process-memory.md` | Future sessions and skill maintenance |

Personal ChatGPT skills remain the ChatGPT runtime authority. The files above are the single Claudex repository authority Rory and repository based agents can read. Do not paste another copy into `OPS`, `docs`, memory, status, or a second skill file.

## Upstream flow

Work must begin from a named product or system, exact topic, artifact type, current owner intent, canonical source when available, and evidence strong enough for the requested action.

`Current work -> precise routing -> evidence verification -> visual gate when applicable -> owner action`

## Outbound flow

`.claude/skills/send-to-rory.md` owns the complete procedure.

The shared control is:

`Explicit KP authorization -> verified artifact -> Sight Engine PASS -> RLS package -> verified recipient -> send -> sent mail readback -> receipt`

No explicit authorization means no external send.

## Inbound flow

`.claude/skills/from-rory.md` owns the complete procedure.

The shared control is:

`Rory artifact -> evidence state -> upstream purpose -> current mechanism -> downstream effect -> KP decision -> one Rory action -> done proof`

Activity evidence cannot become completion evidence without the required authoritative readback.

## Downstream state

The backlog and heartbeat may consume the result only after the artifact is classified.

Only executable `SIGNAL` enters a Top 5 lane. Missing owner, path, outcome, evidence, or done proof remains `CLARIFY`. A new handoff requires new canonical evidence.

Verified reusable corrections flow through Receipt Backed Process Memory and Ship to Claudex. Temporary observations do not become permanent rules.

## Duplicate prevention

1. Every Claudex skill has one canonical path and one `Canonical capability` identifier.
2. Boot files contain discovery pointers only.
3. This contract contains shared controls and authority mapping only.
4. Tests reject repeated capability identifiers, repeated Rory skill headings, missing canonical paths, and missing boot pointers.
5. Extend the existing skill when behavior changes. Never create `v2`, `updated`, `final`, copied, or alternate skill authorities.

## Authority boundary

These skills do not create a scheduler, background daemon, or standing authorization.

Inbound explanation is read only unless KP authorizes another action.

Outbound email requires KP's explicit current send command and a verified connector result.

Repository publication, production changes, credential work, and completion state changes retain their existing approval and evidence gates.

## Failure state

Stop and report `BLOCKED` when the authoritative artifact, recipient, visual PASS, connector, canonical route, or required readback is unavailable.

Report `CLARIFY` when the artifact is useful but owner, outcome, path, evidence, or done proof is incomplete.

## Acceptance criteria

1. Both trigger families are discoverable during Claude and Codex boot.
2. Outbound execution fails closed before an unverified send.
3. Inbound execution always teaches upstream, current, and downstream relationships.
4. Sight Engine gates every human facing outbound visual.
5. The repository contains one canonical skill per capability.
6. The duplicate detector passes positive, negative, and boundary cases.
7. The full repository check passes.
8. A TruthCal receipt and canonical remote readback prove publication.

## Rollback

Revert the publication commit. This removes the four new skill authorities, the two boot pointers, the duplicate detector, and this contract without changing personal ChatGPT skills or external mail state.
