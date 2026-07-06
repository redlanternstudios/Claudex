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
`

mkdirSync(vault, { recursive: true })
writeFileSync(output, note)
console.log(output)
