# TruthCal Receipt TC-20260716-CDX-03

Date: 2026-07-16
Product: claudex
Lane: claudex/keymon-codex-cost-setup
Author: codex
Intent: Enforce precise artifact naming and content routing
Result: COMPLETE

## Truth

VERIFIED: Every listed build artifact must now resolve a precise name, artifact type, product or system, exact topic, canonical path, source authority, downstream consumers, and acceptance evidence before file creation.
VERIFIED: The content routing registry defines canonical folders and filename patterns for skills, contracts, architecture, features, product documents, lessons, decisions, evidence, status, handoffs, templates, schemas, scripts, tests, backlog items, receipts, and questions.
VERIFIED: Generic names fail closed when they do not identify a real subject.
VERIFIED: Receipt and question names remain command or protocol owned and cannot be invented by the router.
VERIFIED: Existing destination collisions are surfaced so agents inspect and extend the current authority instead of creating `final`, `new`, or duplicate files.
UNKNOWN: No product repository, production system, credential, or external content store was changed.

## Evidence

- `npm run content:validate`: registry integrity passed with zero errors.
- `npm run content:route -- --type=skill --product=Claudex --topic='artifact naming gate' --date=2026-07-16`: resolved the precise name and `.claude/skills/artifact-naming-gate.md` path.
- `node --test tests/content-routing.test.mjs tests/capture-and-ship-contract.test.mjs`: 12 of 12 focused tests passed.
- `npm run check`: 43 of 43 repository tests passed, backlog integrity passed, content routing integrity passed, and bridge doctor passed.
- `git diff --check`: passed.
- `OPS` secret scan: passed through bridge doctor.
- Primary routing authority: `OPS/CONTENT_ROUTING_REGISTRY.json` under `OPS/NAMING_STANDARD.md` version 2.0.
- Runtime: `scripts/content-route.mjs` and `scripts/lib/content-routing.mjs`.
- Machine contract: `schemas/content-routing.schema.json`.
- Rollback: revert the Git commit containing this receipt and restore `OPS/NAMING_STANDARD.md` version 1.0.

## Next action

Use the artifact manifest and content routing gate before creating any files from a plan, backlog, checklist, or package manifest.
