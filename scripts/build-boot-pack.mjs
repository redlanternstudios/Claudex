#!/usr/bin/env node
// Generates OPS/BOOT_PACK.md — one distilled context file for any engine
// that cannot read this repo live (plain ChatGPT chats, fresh web chats).
// Engines with repo access (Claude Code, Cowork, Codex CLI, Codex cloud)
// do NOT need this file; they boot from CLAUDE.md / AGENTS.md directly.
//
// Usage: npm run boot:pack
// Cadence: session close (both engines), or any time BRIDGE state changes.

import { readFileSync, writeFileSync, readdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const read = p => {
  try { return readFileSync(join(root, p), 'utf8') } catch { return '' }
}
const list = p => {
  try { return readdirSync(join(root, p)).filter(f => !f.startsWith('.')) } catch { return [] }
}

// ---- bridge state ----
let state = 'UNKNOWN — OPS/BRIDGE.json unreadable at generation time'
try {
  const b = JSON.parse(read('OPS/BRIDGE.json'))
  const focus = b.global?.focus_product ?? 'UNKNOWN'
  const prod = b.products?.[focus] ?? {}
  const blockers = [...(b.global?.blockers ?? []), ...(prod.blockers ?? [])]
  const warnings = [...(b.global?.warnings ?? []), ...(prod.warnings ?? [])]
  state = [
    `Focus product: ${focus}`,
    `Lane: ${prod.current_lane ?? 'UNKNOWN'}`,
    `Sync: ${prod.sync_status ?? b.global?.sync_status ?? 'UNKNOWN'}`,
    `Updated: ${b.updated_at ?? 'UNKNOWN'} by ${b.updated_by ?? 'UNKNOWN'}`,
    `Latest receipt: ${b.shared?.latest_receipt ?? 'UNKNOWN'}`,
    `Next action: ${prod.next_action ?? b.global?.next_action ?? 'UNKNOWN'}`,
    blockers.length ? `RED blockers: ${blockers.join(' | ')}` : null,
    warnings.length ? `YELLOW warnings: ${warnings.join(' | ')}` : null,
  ].filter(Boolean).join('\n')
} catch { /* keep UNKNOWN */ }

// ---- active memory index ----
const memoryActives = read('memory/MEMORY.md')
  .split('\n')
  .filter(l => l.trim().startsWith('- ') )
  .join('\n') || 'UNKNOWN — memory/MEMORY.md unreadable'

// ---- inventories ----
const commands = list('.claude/commands')
const skills = list('.claude/skills')
const opsDocs = list('OPS').filter(f => f.endsWith('.md'))

const generated = new Date().toISOString()

const pack = `# CLAUDEX BOOT PACK

Generated: ${generated}
Regenerate: \`npm run boot:pack\` in the Claudex repo. If this date is more
than 7 days old, treat every state claim below as STALE and say so.

This file exists for engines that cannot read the Claudex repo live. If you
can read the repo, stop here and boot from \`CLAUDE.md\` / \`AGENTS.md\` instead.

---

## 1. WHO AND WHAT

Ro (Rory Semeah) — founder, RedLantern Studios / By Red LLC. Moves fast,
thinks in systems, zero tolerance for fluff or fake completeness.
Claudex = the RedLantern Studios repo: operating system, bridge state,
memory, receipts, protocols. GitHub: redlanternstudios/Claudex.
The repo folder is also Ro's Obsidian vault (read and graph, no write
authority from Obsidian).

## 2. CURRENT STATE (from OPS/BRIDGE.json at generation time)

${state}

## 3. OPERATING RULES DIGEST (binding)

1. TruthSerum: label claims VERIFIED / PARTIAL / ASSUMED / UNKNOWN. Never
   present an assumption as fact. Never call a demo a feature.
2. Zero hyphens in prose. No hyphenated compounds, no em dashes.
3. Output format for substantive work: OBJECTIVE, REALITY CHECK, EXECUTION,
   RESULT, EDGE CASES.
4. One shot delivery: open builds with PACKAGE MANIFEST, deliver every item
   in full, close with END CHECK. Never end with a question or an offer.
   Missing input = labeled ASSUMPTION, then proceed.
5. Best practice first: correct long term solution directly. No interim
   shortcut plus migrate later without a concrete named blocker.
6. CTP on anything that thinks: Prompt Contract (GOAL / CONSTRAINTS /
   FORMAT / FAILURE), then 3 pass deepening.
7. Commit and push immediately after changes. No confirmation.
8. Updates to Ro: high level, plain, casual. Shipped / blocked / next.

## 4. STACK (LOCKED)

Frontend Next.js App Router + Tailwind · Backend Supabase (Postgres, Auth,
RLS) · Logic in n8n · Make.com for SaaS to SaaS glue only · PostHog +
Sentry · Monday and Notion DEPRECATED · SwarmClaw agent OS + RobbyPA ·
Model routing locked (Gemini 2.5 Flash mix, see memory).

## 5. COMMANDS AND SKILLS (the gang)

Slash commands (.claude/commands): ${commands.join(', ') || 'none found'}
Skills (.claude/skills): ${skills.join(', ') || 'none found'}
Command loop (defined in .claude/CLAUDE.md): /daily-reset, /repo-ingest,
/truth-audit, /task-split
Keyword triggers: \`ctp\` (full critical thought process), \`checkit\`
(quick sanity pass), \`theaudit\` (18 section solution audit),
\`formatting\` (load formatting constitution).

## 6. KEY PROTOCOL FILES (OPS/)

${opsDocs.map(f => `- OPS/${f}`).join('\n')}

## 7. ACTIVE MEMORY INDEX

${memoryActives}

## 8. HOW TO USE THIS FILE PER SURFACE

- Plain ChatGPT chat: this file is your only context. Obey section 3.
- ChatGPT project: this file lives in project files; project instructions
  carry the permanent operating contract (OPS/CODEX_ONE_SHOT_PROTOCOL.md
  Layer 1).
- Any engine with repo access: ignore this file, boot from CLAUDE.md or
  AGENTS.md, which read live state.
`

writeFileSync(join(root, 'OPS', 'BOOT_PACK.md'), pack)
console.log(`BOOT_PACK.md written (${pack.length} chars) at ${generated}`)
