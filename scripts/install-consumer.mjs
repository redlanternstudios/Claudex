#!/usr/bin/env node
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { basename, join, relative, resolve } from 'node:path'
import { BRIDGE_PATH, ROOT, readBridge } from './lib/bridge-core.mjs'
import { managedBlock, upsertManagedBlock } from './lib/consumer-core.mjs'

const [targetArg, productKey, forceFlag] = process.argv.slice(2)
if (!targetArg || !productKey) {
  console.error('Usage: node scripts/install-consumer.mjs <target path> <product key> [force]')
  process.exit(2)
}

const state = readBridge()
if (!state.products[productKey]) {
  console.error(`Unknown product key: ${productKey}`)
  process.exit(2)
}

const target = resolve(targetArg)
if (!existsSync(target)) {
  console.error(`Target does not exist: ${target}`)
  process.exit(2)
}

const manifestPath = join(target, '.claudex.json')
const bootPath = join(target, 'CLAUDEX_BOOT.md')
if (existsSync(manifestPath) && forceFlag !== 'force') {
  const current = JSON.parse(readFileSync(manifestPath, 'utf8'))
  if (current.product_key !== productKey) {
    console.error(`Consumer already belongs to ${current.product_key}. Pass force to replace it.`)
    process.exit(2)
  }
}

const manifest = {
  version: '1.2',
  bridge_repo: 'https://github.com/redlanternstudios/Claudex.git',
  bridge_ref: 'main',
  bridge_file: 'OPS/BRIDGE.json',
  qa_protocol_file: 'OPS/QA_PROTOCOL.md',
  questions_index_file: 'OPS/questions/INDEX.md',
  local_bridge_path: relative(target, BRIDGE_PATH),
  product_key: productKey
}
writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`)
writeFileSync(bootPath, readFileSync(join(ROOT, 'templates', 'CLAUDEX_BOOT.md'), 'utf8'))
const block = managedBlock(productKey)
for (const instructionName of ['AGENTS.md', 'CLAUDE.md']) {
  const instructionPath = join(target, instructionName)
  const existing = existsSync(instructionPath) ? readFileSync(instructionPath, 'utf8') : ''
  writeFileSync(instructionPath, upsertManagedBlock(existing, block))
}
console.log(`Installed Claudex consumer and boot pointers for ${productKey} in ${basename(target)}`)
