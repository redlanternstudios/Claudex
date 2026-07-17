import test from 'node:test'
import assert from 'node:assert/strict'
import { readContentRouting, routeArtifact, validateContentRouting } from '../scripts/lib/content-routing.mjs'

const date = '2026-07-16'

test('content routing registry passes its integrity gate', () => {
  const result = validateContentRouting(readContentRouting())
  assert.deepEqual(result, { passed: true, errors: [] })
})

test('skill receives a precise name and canonical skill folder', () => {
  const result = routeArtifact({ type: 'skill', product: 'Claudex', topic: 'artifact naming gate', date })
  assert.equal(result.artifact_id, 'claudex:skill:artifact-naming-gate')
  assert.equal(result.precise_name, 'Claudex Artifact Naming Gate Skill')
  assert.equal(result.canonical_path, '.claude/skills/artifact-naming-gate.md')
})

test('feature specification routes into the feature content folder', () => {
  const result = routeArtifact({ type: 'feature', product: 'Amina', topic: 'subscription recovery', date })
  assert.equal(result.canonical_path, 'docs/features/FEATURE-amina-subscription-recovery.md')
})

test('architecture record includes product topic and date', () => {
  const result = routeArtifact({ type: 'architecture', product: 'The Lantern Daily', topic: 'source registry', date })
  assert.equal(result.canonical_path, 'OPS/architecture/THE_LANTERN_DAILY_SOURCE_REGISTRY_ARCHITECTURE_20260716.md')
})

test('evidence pack routes to a precise dated folder', () => {
  const result = routeArtifact({ type: 'evidence', product: 'Authentic Hadith', topic: 'ios submission', date })
  assert.equal(result.canonical_path, 'OPS/evidence/authentic_hadith_ios_submission_20260716/README.md')
})

test('heartbeat handoff resolves to the stable Rory system path', () => {
  const result = routeArtifact({ type: 'heartbeat_handoff', product: 'Claudex', topic: 'KP to Rory', date })
  assert.equal(result.canonical_path, 'OPS/status/CLAUDEX_HEARTBEAT_KP_TO_RORY.md')
})

test('Rory activity snapshot includes Claudex topic date and time', () => {
  const result = routeArtifact({
    type: 'status_snapshot',
    product: 'Claudex',
    topic: 'Rory activity',
    date,
    time: '2330'
  })
  assert.equal(result.canonical_path, 'OPS/status/CLAUDEX_RORY_ACTIVITY_STATUS_20260716_2330.md')
})

test('Rory live status resolves to one precise rolling path', () => {
  const result = routeArtifact({ type: 'live_status', product: 'Claudex', topic: 'Rory activity', date })
  assert.equal(result.canonical_path, 'OPS/status/CLAUDEX_RORY_ACTIVITY_TODAY.md')
})

test('timestamped status fails closed without a precise time', () => {
  assert.throws(
    () => routeArtifact({ type: 'status_snapshot', product: 'Claudex', topic: 'Rory activity', date }),
    /requires time in HHMM format/
  )
})

test('timestamped status rejects an impossible clock time', () => {
  assert.throws(
    () => routeArtifact({
      type: 'status_snapshot',
      product: 'Claudex',
      topic: 'Rory activity',
      date,
      time: '2460'
    }),
    /time must be a valid HHMM value/
  )
})

test('generic listed item names fail before file creation', () => {
  assert.throws(
    () => routeArtifact({ type: 'contract', product: 'Claudex', topic: 'new final notes', date }),
    /generic topic rejected/
  )
})

test('command owned receipts cannot receive invented names', () => {
  assert.throws(
    () => routeArtifact({ type: 'receipt', product: 'Claudex', topic: 'artifact naming gate', date }),
    /command owned/
  )
})

test('unknown artifact types fail closed', () => {
  assert.throws(
    () => routeArtifact({ type: 'random_folder', product: 'Claudex', topic: 'artifact naming gate', date }),
    /unknown artifact type/
  )
})
