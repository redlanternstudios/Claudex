#!/usr/bin/env node
import { execFileSync } from 'node:child_process'
import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT, readBridge } from './lib/bridge-core.mjs'
import { classifyAlignment } from './lib/alignment-core.mjs'

const signalDir = join(ROOT, '.claudex')
const signalPath = join(signalDir, 'alignment.json')

function git(args, options = {}) {
  return execFileSync('git', args, {
    cwd: ROOT,
    encoding: 'utf8',
    stdio: options.stdio ?? ['ignore', 'pipe', 'pipe']
  }).trim()
}

function safeGit(args) {
  try {
    return git(args)
  } catch {
    return ''
  }
}

function inspect() {
  const local = safeGit(['rev-parse', 'HEAD'])
  const remote = safeGit(['rev-parse', 'origin/main'])
  const base = local && remote ? safeGit(['merge-base', local, remote]) : ''
  const dirty = safeGit(['status', '--porcelain']).length > 0
  const classification = classifyAlignment({ local, remote, base, dirty })
  const bridge = readBridge()
  return {
    version: '1.0',
    detected_at: new Date().toISOString(),
    local_commit: local,
    remote_commit: remote,
    merge_base: base,
    dirty,
    bridge_revision: bridge.revision,
    bridge_updated_at: bridge.updated_at,
    focus_product: bridge.global.focus_product,
    relation: classification.relation,
    color: classification.color,
    action: classification.action
  }
}

function saveAndPrint(signal) {
  mkdirSync(signalDir, { recursive: true })
  writeFileSync(signalPath, `${JSON.stringify(signal, null, 2)}\n`, { mode: 0o600 })
  console.log(`ALIGN ${signal.color}`)
  console.log(`Relation: ${signal.relation}`)
  console.log(`Dirty: ${signal.dirty}`)
  console.log(`Bridge revision: ${signal.bridge_revision}`)
  console.log(`Action: ${signal.action}`)
  if (signal.color === 'RED') process.exitCode = 2
}

function fetchRemote() {
  try {
    git(['fetch', '--prune', 'origin'])
    return true
  } catch (error) {
    const signal = inspect()
    signal.color = signal.color === 'RED' ? 'RED' : 'YELLOW'
    signal.relation = 'FETCH_FAILED'
    signal.action = 'Remote check failed. Use local bridge state, report the warning, and retry when network access returns.'
    signal.error = error.stderr?.trim() || error.message
    saveAndPrint(signal)
    return false
  }
}

function applyFastForward(signal) {
  if (signal.relation !== 'BEHIND' || signal.dirty) return signal
  git(['merge', '--ff-only', 'origin/main'])
  const updated = inspect()
  updated.action = 'Fast forward completed. Run the bridge doctor and continue from the new next action.'
  return updated
}

const [command = 'check', flag] = process.argv.slice(2)
if (command === 'sync' && !fetchRemote()) {
  process.exit()
}
let signal = inspect()
if (flag === '--apply') signal = applyFastForward(signal)
saveAndPrint(signal)
