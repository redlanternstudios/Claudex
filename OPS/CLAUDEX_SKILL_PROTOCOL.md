# Claudex Skill Protocol

Status: ACTIVE
Created: 2026-07-07 America/Los_Angeles

## Trigger

Use this protocol whenever KP starts a message with `/claudex`.

## Purpose

Convert important chat context into a durable Claudex artifact and an Obsidian-ready mirror note.

## Rule

Do not claim a push happened unless a file write, commit, sync, or receipt proves it.

## Destinations

Receipt: `OPS/receipts/YYYY-MM-DD/<slug>.md`
Directive: `OPS/directives/YYYY-MM-DD/<slug>.md`
Question: `OPS/questions/YYYY-MM-DD/<slug>.md`
Bridge Update: `OPS/bridge-updates/YYYY-MM-DD/<slug>.md`
CTP Contract: `OPS/ctp/YYYY-MM-DD/<slug>.md`
Architecture Note: `OPS/architecture/YYYY-MM-DD/<slug>.md`
Rory Activity Evidence: `OPS/status/YYYY-MM-DD/<slug>.md`

Obsidian mirrors use the same slug under `Claudex/` by category.

## Required Output

Classification, Claudex path, Obsidian path, status, evidence, next action, and missing proof.

## Rory Activity Rule

Rory activity counts only when proven by a same-day receipt, commit, bridge update, answered question, or directive marked done with evidence.

Otherwise answer exactly:

`MISSING: I do not see a receipt or bridge update proving Rory started this.`
