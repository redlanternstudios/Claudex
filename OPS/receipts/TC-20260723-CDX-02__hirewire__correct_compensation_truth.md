# TruthCal Receipt TC-20260723-CDX-02

Date: 2026-07-23
Product: hirewire
Lane: hirewire/career-command-center-sync
Author: codex
Intent: Correct the global HireWire compensation targets after detecting a conflict between the first reconciliation receipt and the latest locked career context.
Result: PARTIAL

## Truth

VERIFIED: Ro's current Career Command Center base target is $160,000 to $180,000.

VERIFIED: Ro's current stretch target is $180,000 to $210,000 plus.

VERIFIED: The earlier $130,000 amount was a recruiter specific confirmation request. It is not the universal HireWire compensation target.

VERIFIED: The canonical Claudex note was corrected at commit c4e633fbb15664aff131d7c729c44761144107ea.

VERIFIED: The six agent contract, 75 percent role gate, 80 out of 100 résumé gate, packet standards, Drive links, manual submission boundary, and SecurityWire separation remain unchanged.

PARTIAL: The existing Obsidian mirror service will route the corrected canonical note into the vault, but live vault readback is unavailable in this run.

## Evidence

1. Canonical note: memory/knowledge/hirewire-career-command-center.md

2. Corrective commit: c4e633fbb15664aff131d7c729c44761144107ea

3. Prior receipt requiring correction: OPS/receipts/TC-20260723-CDX-01__hirewire__career_command_center_obsidian_sync.md

4. Current Obsidian target: HireWire/HireWire Career Command Center.md

## Next action

Allow the existing Obsidian mirror service to write the corrected note, then read back the live vault before returning HireWire to GREEN.
