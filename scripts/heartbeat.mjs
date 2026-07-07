#!/usr/bin/env node
import { execFileSync } from 'node:child_process'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT, readBridge, validateBridge } from './lib/bridge-core.mjs'

const signalDir = join(ROOT, '.claudex')
const digestPath = join(signalDir, 'heartbeat-last.md')
const jsonPath = join(signalDir, 'heartbeat-last.json')

function run(command, args) {
  try {
    return {
      ok: true,
      output: execFileSync(command, args, {
        cwd: ROOT,
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'pipe']
      }).trim()
    }
  } catch (error) {
    return {
      ok: false,
      output: `${error.stdout ?? ''}${error.stderr ?? ''}`.trim() || error.message
    }
  }
}

function questionSummary() {
  try {
    const index = readFileSync(join(ROOT, 'OPS', 'questions', 'INDEX.md'), 'utf8')
    const open = index
      .split('\n')
      .filter((line) => /\bOPEN\b/.test(line))
      .map((line) => line.trim())
      .filter(Boolean)
    return { open_count: open.length, open }
  } catch {
    return { open_count: 0, open: [] }
  }
}

const startedAt = new Date().toISOString()
const sync = run(process.execPath, ['scripts/alignment.mjs', 'sync', '--apply'])
const doctor = run(process.execPath, ['scripts/bridge.mjs', 'doctor'])
const roryStatus = run(process.execPath, ['scripts/rory-activity-status.mjs', '--git'])
const bridge = readBridge()
const validation = validateBridge(bridge)
const productKey = validation.focusKey
const product = productKey ? bridge.products[productKey] : null
const questions = questionSummary()
const status = validation.effectiveColor
const receipt = bridge.shared?.latest_receipt || 'NONE'
const changedLine = sync.ok
  ? `VERIFIED heartbeat ran sync and bridge doctor. Alignment output: ${sync.output.split('\n')[0] ?? 'ALIGN UNKNOWN'}.`
  : `PARTIAL heartbeat attempted sync, but sync returned an error. ${sync.output}`
const needsRo = status === 'RED'
  ? `SYNC RED needs Ro or owner attention before continuation.`
  : questions.open_count > 0
    ? `VERIFIED ${questions.open_count} open question(s) remain in OPS/questions.`
    : `VERIFIED nothing needs you right now.`
const next = product?.next_action ?? bridge.global?.next_action ?? 'Read bridge next action.'

const digest = `## Heartbeat

* Status: VERIFIED SYNC ${status}.
* Focus: ${bridge.global.focus_product}, ${product?.current_lane ?? 'UNKNOWN'}.
* Receipt: ${receipt}.

## What changed

* ${changedLine}

## Needs Ro

* ${needsRo}

## Next

* ${next}
`

mkdirSync(signalDir, { recursive: true })
writeFileSync(digestPath, digest, { mode: 0o600 })
writeFileSync(
  jsonPath,
  `${JSON.stringify(
    {
      started_at: startedAt,
      completed_at: new Date().toISOString(),
      status,
      focus_product: bridge.global.focus_product,
      lane: product?.current_lane ?? 'UNKNOWN',
      receipt,
      sync_ok: sync.ok,
      doctor_ok: doctor.ok,
      rory_status_ok: roryStatus.ok,
      rory_status_output: roryStatus.output,
      open_questions: questions.open_count,
      digest_path: digestPath
    },
    null,
    2
  )}\n`,
  { mode: 0o600 }
)

console.log(digest)
if (!sync.ok || !doctor.ok || !roryStatus.ok || status === 'RED') process.exitCode = status === 'RED' ? 2 : 1
