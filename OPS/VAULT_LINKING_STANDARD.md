# Vault Linking Standard

Version 1.0
Date 2026 07 08
Owner RedLantern Studios

## Objective

Keep the Obsidian graph a real web instead of decaying back into isolated dots.

## Reality Check

VERIFIED: as of 2026 07 08, 511 eligible markdown files existed in the vault (node_modules, build artifacts, receipts, and secret files excluded). Only 15 files (2.3%) contained an outbound wikilink. The graph rendered 3 real hub clusters against a wall of disconnected nodes.
VERIFIED: 12 domain Maps of Content were generated the same day (`_MOC AMINA.md`, `_MOC AUTHENTIC HADITH.md`, `_MOC MEMORY.md`, `_MOC OPS.md`, `_MOC THE LANTERN.md`, `_MOC TRADESWARM.md`, `_MOC SWARMCLAW.md`, `_MOC DEIXIS.md`, `_MOC PARADISE AND BY RED LLC.md`, `_MOC PE PENN ENTERPRISES.md`, `_MOC RLS OS ARCHITECTURE.md`, `_MOC CLAUDE SYSTEM.md`), covering all 502 non nav files. `_HOME.md` links to all 12.
ASSUMED: without a rule enforced at creation time, new files will keep landing outside every MOC and the vault will drift back toward islands within weeks. This has already happened once (the memory system's own spec says to link liberally with `[[name]]`, and it was not being followed before this pass).
UNKNOWN: whether Obsidian Templater or a similar plugin is installed. This standard is written as a manual policy because that has not been confirmed. If Templater is available, this should be converted into an enforced template rather than a checklist.

## Rule

Every new markdown file added to this vault must ship with:

1. A home. It must appear as a line item in the Map of Content for its domain, added in the same edit that creates the file. If no MOC fits, that is a signal a 13th MOC is needed, not a reason to skip this step.
2. A frontmatter block for any file that is not owned by an existing agent format (SwarmClaw's `memory/`, `agent_prompts/`, `knowledge/`, and similar Librarian maintained files keep their existing plain header style and should not be retrofitted with YAML, see Edge Cases below):

```
---
project: <domain name matching a MOC title>
status: active | paused | archived
tags: [tag1, tag2]
related: ["[[_MOC <DOMAIN>]]"]
---
```

3. At minimum one wikilink somewhere in the body or frontmatter back to the domain MOC. This is the single cheapest habit that keeps the graph connected.

## Execution

Applies going forward to every new file. Does not require retroactively touching already compliant files.

When starting a new product or workstream large enough to need its own folder, create its MOC in the same session, before or immediately after the first file lands in that folder.

## Result

Orphan rate stays near the 2026 07 08 baseline of 0% for newly created files, instead of drifting back toward the pre fix baseline of 97.7%.

## Edge Cases

Do not inject YAML frontmatter into files owned by an operating agent with its own format contract, specifically anything under `memory/agent_prompts/`, `memory/knowledge/`, `memory/decisions/`, `memory/debriefs/`, `memory/incidents/`, `memory/lessons/`, `memory/missions/`, `memory/sessions/`, or root files maintained by ROBBY or Librarian (`business_state.md`, `MEMORY.md`, `roster_log.md`, `routing_log.md`, `health_log.md`, `dead_letter_log.md`, `active_work_registry.md`, `phases.md`, `note_taking_protocol.md`). Those already have a real header and a real owner. Link to them from a MOC. Do not edit their body format.

Do not touch anything under `OPS/receipts/` or the secrets exclusion list already defined in `_HOME.md` (`OPS/API_KEY_VAULT.md`, `ENV_VARS.md`, `OPS/SKILL_API_KEY_VAULT.md`, `the-lantern/.../LANTERN_KEYS_REFERENCE.md`).

This standard has no enforcement mechanism yet. It is a written rule, not a hook or a lint check. Treat any claim that the vault is fully linked as unverified until a script actually checks it. See `_MOC OPS` for where an automated version of this check should eventually live.
