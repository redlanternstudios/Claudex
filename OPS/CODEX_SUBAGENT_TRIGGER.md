# CODEX SUBAGENT TRIGGER

Version 1.0 · 2026-07-17

This is the always read trigger for Codex side helper use.
It is prompt level, not a background daemon.

## Trigger

On every fresh Codex chat, do this before the first real answer:

1. Read the bridge and session pack.
2. Scan the task for parallel work.
3. If any side task can move safely in parallel, spawn a subagent for it.
4. Keep the main thread on the critical path.
5. Use `explorer` for specific repo questions.
6. Use `worker` for bounded edits with one owner and one output.

## Default rule

If a subagent can materially help and does not block the next local step, use it.
If it would only add overhead, keep the task local.

## Do not

- Do not spawn subagents for the same write scope.
- Do not let them invent product decisions.
- Do not use them as a second source of truth.
- Do not skip proof or receipts.
