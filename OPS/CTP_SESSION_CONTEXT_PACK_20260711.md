# CTP Session Context Pack

Date: 2026 07 11
Owner: Ro
Engine: Codex
Status: ACCEPTED

## Prompt Contract

GOAL: Give every Claude and Codex chat a single retrieval pack that points at the bridge, memory, docs, and Obsidian mirror.

CONSTRAINTS: Keep the pack local, avoid secrets, do not make a second bridge, and keep the current control plane as the source of truth.

FORMAT: Decision note plus implementation receipt.

FAILURE: This fails if the startup context stays scattered, if Obsidian does not get a live mirror note, or if the boot path still depends on memory alone.

## Problem Statement

Type: operations and context retrieval.

The repo already has the bridge, memory index, docs index, and live Obsidian note. What it lacked was one obvious pack that both chat systems can read first so the same frame is loaded every time.

## Three Pass Analysis

Pass 1: The repo needs another note.

Pass 2: Another note alone is not enough. The boot docs need to point at it, and Obsidian needs a live mirror of the same entrypoint.

Pass 3: The right fix is a single startup pack in Claudex, wired into both boot files and mirrored into the vault by the Obsidian sync.

## Recommendation

Use `OPS/SESSION_CONTEXT_PACK.md` as the shared startup retrieval pack. Make the Claude boot files read it, and have the Obsidian sync generate a matching `_CLAUDEX STARTUP PACK.md`.

## Verification

VERIFIED: Claudex already has `OPS/BRIDGE.json`, `OPS/TODAY.md`, `memory/MEMORY.md`, `docs/README.md`, and `docs/OBSIDIAN_VAULT.md`.
VERIFIED: The Obsidian sync already writes `_CLAUDEX LIVE.md`.
PARTIAL: The startup pack had not existed before this change.

