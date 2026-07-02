#!/usr/bin/env node
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { basename, join, relative, resolve } from 'node:path'
import { BRIDGE_PATH, ROOT, readBridge } from './lib/bridge-core.mjs'

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
if ((existsSync(manifestPath) || existsSync(bootPath)) && forceFlag !== 'force') {
  console.error('Consumer files already exist. Pass force to replace them.')
  process.exit(2)
}

const manifest = {
  version: '1.0',
  bridge_repo: 'https://github.com/redlanternstudios/Claudex.git',
  bridge_path: relative(target, BRIDGE_PATH),
  product_key: productKey
}
writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`)
writeFileSync(bootPath, readFileSync(join(ROOT, 'templates', 'CLAUDEX_BOOT.md'), 'utf8'))
console.log(`Installed Claudex consumer for ${productKey} in ${basename(target)}`)
