# CODEX SUBAGENT PLAYBOOK

Version 1.0 · 2026-07-17

This page makes the Codex side agent use path visible.
SwarmClaw stays the source of truth for the 36 role registry.
Codex uses temporary subagents for bounded work, not for a second permanent org.

## Rule

Use a subagent any time it can materially help without blocking the immediate next local step.
If a task can be split cleanly, split it.
If a task needs one owner, keep it local.

## Available Codex subagent shapes

`explorer`
Use for a specific question about the codebase, repo state, or current docs.

`worker`
Use for bounded edits or a concrete implementation slice with a clear file ownership boundary.

## How to use them

1. Keep the main thread on the critical path.
2. Delegate the side task.
3. Give the subagent one job and one output.
4. Reuse the result, do not redo it.
5. Close the subagent when the task is done.

## Safety

Do not delegate the same write scope to multiple workers.
Do not let subagents invent product decisions.
Do not treat a subagent as a new source of truth.
Do not use subagents to bypass review, proof, or receipts.

## Reference

Keymon's setup is the reference model for keeping Claudex aligned across operators.
See `OPS/KEYMON_SWARMCLAW_SETUP.md` and `docs/EXTERNAL_OPERATOR_ONBOARDING.md`.
