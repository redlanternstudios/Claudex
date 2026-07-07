#!/usr/bin/env node
import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
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

function readBridgeAt(ref) {
  try {
    return JSON.parse(git(['show', `${ref}:OPS/BRIDGE.json`]))
  } catch {
    return null
  }
}

function gitPathExists(ref, relativePath) {
  if (!relativePath || relativePath === 'NONE') return false
  try {
    git(['cat-file', '-e', `${ref}:${relativePath}`])
    return true
  } catch {
    return false
  }
}

function inspect() {
  const local = safeGit(['rev-parse', 'HEAD'])
  const remote = safeGit(['rev-parse', 'origin/main'])
  const base = local && remote ? safeGit(['merge-base', local, remote]) : ''
  const dirty = safeGit(['status', '--porcelain']).length > 0
  const classification = classifyAlignment({ local, remote, base, dirty })
  const bridge = readBridge()
  const remoteBridge = readBridgeAt('origin/main')
  const localReceipt = bridge.shared?.latest_receipt ?? ''
  const remoteReceipt = remoteBridge?.shared?.latest_receipt ?? ''
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
    local_latest_receipt: localReceipt,
    remote_latest_receipt: remoteReceipt,
    local_receipt_exists: Boolean(localReceipt && existsSync(join(ROOT, localReceipt))),
    remote_receipt_exists: gitPathExists('origin/main', remoteReceipt),
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
  console.log(`Local receipt: ${signal.local_latest_receipt || 'UNKNOWN'} (${signal.local_receipt_exists ? 'present' : 'missing'})`)
  console.log(`Remote receipt: ${signal.remote_latest_receipt || 'UNKNOWN'} (${signal.remote_receipt_exists ? 'present' : 'missing'})`)
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
  if (!signal.remote_receipt_exists) {
    return {
      ...signal,
      color: 'RED',
      action: 'Refused fast forward: origin/main bridge points to a missing receipt. Fix the remote receipt before importing state.'
    }
  }
  git(['merge', '--ff-only', 'origin/main'])
  const updated = inspect()
  updated.action = 'Fast forward completed from origin/main with remote receipt present. Run the bridge doctor and continue from the new next action.'
  return updated
}

function publishLocal(signal) {
  if (signal.dirty) {
    return {
      ...signal,
      color: 'YELLOW',
      action: 'Refused publish: working tree has uncommitted changes. Commit a receipt-backed bridge update first.'
    }
  }
  if (signal.relation !== 'AHEAD') {
    return {
      ...signal,
      action: 'No publish needed: local branch is not ahead of origin/main.'
    }
  }
  if (!signal.local_receipt_exists || !gitPathExists('HEAD', signal.local_latest_receipt)) {
    return {
      ...signal,
      color: 'RED',
      action: 'Refused publish: local bridge points to a receipt that is missing from the working tree or HEAD commit.'
    }
  }
  execFileSync('npm', ['run', 'check'], { cwd: ROOT, stdio: 'inherit' })
  git(['push', 'origin', 'HEAD:main'], { stdio: 'inherit' })
  fetchRemote()
  const updated = inspect()
  updated.action = 'Published local receipt-backed bridge state to origin/main.'
  return updated
}

const [command = 'check', flag] = process.argv.slice(2)
if ((command === 'sync' || command === 'publish') && !fetchRemote()) {
  process.exit()
}
let signal = inspect()
if (flag === '--apply') signal = applyFastForward(signal)
if (flag === '--push' || command === 'publish') signal = publishLocal(signal)
saveAndPrint(signal)
