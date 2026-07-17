#!/usr/bin/env node
import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT, readBridge, validateBridge } from './lib/bridge-core.mjs'
import {
  changeSummary,
  decisionSummary,
  ownerLaneMarkdown,
  rankBacklog,
  readBacklog
} from './lib/backlog-core.mjs'

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

function previousLanes() {
  if (!existsSync(jsonPath)) return null
  try {
    const previous = JSON.parse(readFileSync(jsonPath, 'utf8'))
    return previous.backlog?.lanes ?? null
  } catch {
    return null
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
const backlog = rankBacklog(readBacklog(), {
  heartbeatAt: startedAt,
  previous: previousLanes()
})
const status = validation.effectiveColor
const receipt = bridge.shared?.latest_receipt || 'NONE'
const changedLine = sync.ok
  ? `VERIFIED heartbeat ran sync and bridge doctor. Alignment output: ${sync.output.split('\n')[0] ?? 'ALIGN UNKNOWN'}. ${changeSummary(backlog)}`
  : `PARTIAL heartbeat attempted sync, but sync returned an error. ${sync.output}`
const decisions = decisionSummary(backlog)
const needsDecision = status === 'RED'
  ? 'SYNC RED needs Rory or the named owner before continuation.'
  : decisions.length > 0
    ? `${decisions.length} backlog item(s) need a decision or dependency. ${decisions.slice(0, 3).join(' | ')}`
    : questions.open_count > 0
      ? `VERIFIED ${questions.open_count} open question(s) remain in OPS/questions.`
      : 'VERIFIED nothing needs you right now.'
const next = backlog.lanes.Rory[0]?.next_action
  ?? backlog.lanes.KP[0]?.next_action
  ?? product?.next_action
  ?? bridge.global?.next_action
  ?? 'Read bridge next action.'

const digest = `## Heartbeat

* Status: VERIFIED SYNC ${status}.
* Backlog: ${backlog.status}.
* Focus: ${bridge.global.focus_product}, ${product?.current_lane ?? 'UNKNOWN'}.
* Receipt: ${receipt}.

## What changed

* ${changedLine}

${ownerLaneMarkdown('KP', backlog.lanes.KP, backlog.open_capacity.KP)}

${ownerLaneMarkdown('Rory', backlog.lanes.Rory, backlog.open_capacity.Rory)}

## Needs decision

* ${needsDecision}

## Parked and noise

* ${backlog.buckets.PARKED.length} parked. ${backlog.buckets.NOISE.length} noise. ${backlog.buckets.BLOCKED.length} blocked. ${backlog.buckets.CLARIFY.length} clarify.

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
      backlog,
      digest_path: digestPath
    },
    null,
    2
  )}\n`,
  { mode: 0o600 }
)

console.log(digest)
if (!sync.ok || !doctor.ok || !roryStatus.ok || status === 'RED' || backlog.status === 'BLOCKED') {
  process.exitCode = status === 'RED' || backlog.status === 'BLOCKED' ? 2 : 1
}
