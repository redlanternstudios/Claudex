import test from 'node:test'
import assert from 'node:assert/strict'
import { rankBacklog } from '../scripts/lib/backlog-core.mjs'

function task(overrides = {}) {
  return {
    id: 'task',
    title: 'Complete release gate',
    owner: 'KP',
    project: 'Amina',
    objective: 'Ship Amina',
    outcome: 'Release gate closed',
    next_action: 'Run the exact gate',
    definition_of_done: 'Gate receipt passes',
    status: 'ready',
    impact: 5,
    effort: 2,
    urgency: 5,
    leverage: 3,
    unblock: 5,
    evidence_confidence: 1,
    updated_at: '2026-07-16T20:00:00-07:00',
    ...overrides
  }
}

function backlog(tasks, previous_heartbeat) {
  return {
    version: '1.0',
    updated_at: '2026-07-16T21:00:00-07:00',
    active_objectives: ['Ship Amina'],
    sources: [{ path: 'OPS/BRIDGE.json', updated_at: '2026-07-16T20:00:00-07:00' }],
    previous_heartbeat,
    tasks
  }
}

const now = '2026-07-16T21:00:00-07:00'

test('highest impact lowest effort signal ranks first', () => {
  const result = rankBacklog(
    backlog([
      task({ id: 'cosmetic', impact: 2, effort: 1, urgency: 2, leverage: 1, unblock: 1 }),
      task({ id: 'release', impact: 5, effort: 1, urgency: 5, leverage: 4, unblock: 5 })
    ]),
    { heartbeatAt: now }
  )
  assert.equal(result.lanes.KP[0].id, 'release')
})

test('blocked and noise tasks never consume a Top 5 slot', () => {
  const result = rankBacklog(
    backlog([
      task({ id: 'blocked', status: 'blocked', blocked: true, blocker: 'credential missing' }),
      task({ id: 'duplicate', duplicate_of: 'canonical' }),
      task({ id: 'ready' })
    ]),
    { heartbeatAt: now }
  )
  assert.deepEqual(result.lanes.KP.map((item) => item.id), ['ready'])
  assert.equal(result.buckets.BLOCKED[0].id, 'blocked')
  assert.equal(result.buckets.NOISE[0].id, 'duplicate')
})

test('joint work bifurcates into distinct KP and Rory actions', () => {
  const result = rankBacklog(
    backlog([
      task({
        id: 'joint',
        owner: 'joint',
        owner_actions: {
          KP: { next_action: 'Confirm pricing', definition_of_done: 'Pricing receipt' },
          Rory: { next_action: 'Run purchase test', definition_of_done: 'Purchase receipt' }
        }
      })
    ]),
    { heartbeatAt: now }
  )
  assert.equal(result.lanes.KP[0].id, 'joint:KP')
  assert.equal(result.lanes.Rory[0].id, 'joint:Rory')
  assert.notEqual(result.lanes.KP[0].next_action, result.lanes.Rory[0].next_action)
})

test('unsplit joint work is clarification, not signal', () => {
  const result = rankBacklog(
    backlog([
      task({
        id: 'joint',
        owner: 'joint',
        owner_actions: { KP: { next_action: 'Confirm pricing', definition_of_done: 'Receipt' } }
      })
    ]),
    { heartbeatAt: now }
  )
  assert.equal(result.lanes.Rory.length, 0)
  assert.match(result.buckets.CLARIFY[0].classification_reason, /Rory/)
})

test('prior parent identity reconciles to an owner child movement', () => {
  const result = rankBacklog(
    backlog(
      [
        task({
          id: 'joint',
          owner: 'joint',
          owner_actions: {
            KP: { next_action: 'Confirm pricing', definition_of_done: 'Receipt' },
            Rory: { next_action: 'Run purchase test', definition_of_done: 'Receipt' }
          }
        })
      ],
      { KP: ['joint'], Rory: ['joint:Rory'] }
    ),
    { heartbeatAt: now }
  )
  assert.equal(result.lanes.KP[0].movement, 'SAME')
  assert.equal(result.lanes.Rory[0].movement, 'SAME')
})

test('owner lanes hard stop at five tasks', () => {
  const tasks = Array.from({ length: 7 }, (_, index) => task({ id: `task${index}` }))
  const result = rankBacklog(backlog(tasks), { heartbeatAt: now })
  assert.equal(result.lanes.KP.length, 5)
  assert.equal(result.integrity.passed, true)
})

test('done requires completion evidence', () => {
  const result = rankBacklog(
    backlog([
      task({ id: 'unsupported', status: 'done' }),
      task({ id: 'proved', status: 'done', completion_evidence: 'TC proof' })
    ]),
    { heartbeatAt: now }
  )
  assert.equal(result.buckets.CLARIFY[0].id, 'unsupported')
  assert.equal(result.buckets.DONE[0].id, 'proved')
})

test('duplicate task identities fail the integrity gate', () => {
  const result = rankBacklog(backlog([task({ id: 'same' }), task({ id: 'same' })]), {
    heartbeatAt: now
  })
  assert.equal(result.status, 'BLOCKED')
  assert.match(result.integrity.errors.join('\n'), /duplicate task id/)
})
