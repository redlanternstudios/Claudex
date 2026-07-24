#!/usr/bin/env node

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const bridge = JSON.parse(readFileSync(join(root, 'OPS', 'BRIDGE.json'), 'utf8'))
const focus = bridge.global.focus_product
const product = bridge.products[focus]
const vault = process.env.CLAUDEX_OBSIDIAN_VAULT
  ?? join(homedir(), 'Documents', 'Claude', 'Projects', 'RedLantern Studios')
const output = join(vault, '_CLAUDEX LIVE.md')
const startupPackOutput = join(vault, '_CLAUDEX STARTUP PACK.md')
const hirewireSource = join(root, 'memory', 'knowledge', 'hirewire-career-command-center.md')
const hirewireDirectory = join(vault, 'HireWire')
const hirewireOutput = join(hirewireDirectory, 'HireWire Career Command Center.md')
const hirewireStatusOutput = join(hirewireDirectory, '_HIREWIRE SYNC STATUS.md')

const warnings = [...(bridge.global.warnings ?? []), ...(product?.warnings ?? [])]
const blockers = [...(bridge.global.blockers ?? []), ...(product?.blockers ?? [])]
const conditions = blockers.length
  ? blockers.map(item => `RED: ${item}`)
  : warnings.length
    ? warnings.map(item => `YELLOW: ${item}`)
    : ['GREEN: No active warnings or blockers.']

const note = `# Claudex Live

> [!important] Generated from Claudex
> This note is refreshed by the bridge. Edit the canonical Claudex files, not this generated view.

## Current state

**SYNC ${product?.sync_status ?? bridge.global.sync_status}**

Focus: **${focus}**

Lane: **${product?.current_lane ?? 'UNKNOWN'}**

Updated: **${bridge.updated_at}** by **${bridge.updated_by}**

Latest receipt: **${bridge.shared.latest_receipt}**

Next: ${product?.next_action ?? bridge.global.next_action}

## Conditions

${conditions.join('\n\n')}

## Continue

Claude: continue from the bridge.

Codex: continue the ${focus} workflow.

GREEN means keep moving. YELLOW means continue with the warning named. RED means stop until the blocker is resolved.

## Vault map

[[_CLAUDEX HOME|Claudex control room]]

[[_RO HOME|Ro context]]

[[_PLATFORMS HOME|v0, GitHub, and Supabase]]

[[docs/README|Reference index]]

[[docs/PRODUCTS|Products]]

[[docs/REPO_INVENTORY|Repositories]]

[[OPS/TODAY|Today]]

[[OPS/KNOWN_RISKS|Known risks]]

[[OPS/receipts/INDEX|Receipts]]

[[HireWire/HireWire Career Command Center|HireWire Career Command Center]]
`

const startupPack = `# Claudex Startup Pack

> [!important] Generated from Claudex
> This note is the vault entry point for starting a chat with the same studio frame every time.

## Read order

1. [[_CLAUDEX LIVE|Live bridge note]]
2. [[_RO HOME|Ro context]]
3. [[_PLATFORMS HOME|v0, GitHub, and Supabase]]
4. [[OPS/TODAY|Today]]
5. [[OPS/receipts/INDEX|Receipts]]
6. [[HireWire/HireWire Career Command Center|HireWire Career Command Center]]

## Claudex sources

Read the bridge, then the session context pack in Claudex:
OPS/SESSION_CONTEXT_PACK.md

## Rule

Use this vault note as the human entry point. Use Claudex as the canonical coordination source.
`

mkdirSync(vault, { recursive: true })
writeFileSync(output, note)
writeFileSync(startupPackOutput, startupPack)

const hirewireNote = readFileSync(hirewireSource, 'utf8')
const hirewireStatus = `# HireWire Sync Status

> [!important] Generated from Claudex
> Edit the canonical Claudex note, not this generated mirror.

Status: PARTIAL until this file and the Career Command Center note are read back from the live vault.

Canonical source: memory/knowledge/hirewire-career-command-center.md

Mirror target: HireWire/HireWire Career Command Center.md

Last mirror run: ${new Date().toISOString()}

Rule: ChatGPT and Codex write operational truth to Claudex. This service mirrors the canonical readable state into Obsidian. Google Drive stores packet binaries. Ro remains the human submission authority.
`

mkdirSync(hirewireDirectory, { recursive: true })
writeFileSync(hirewireOutput, hirewireNote)
writeFileSync(hirewireStatusOutput, hirewireStatus)
console.log(output)
console.log(hirewireOutput)
console.log(hirewireStatusOutput)
