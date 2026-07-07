import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import {
  effectiveColor,
  focusKey,
  receiptFileName,
  receiptRelativePath,
  nextReceiptId,
  validateBridge,
  writeBridgeAtomic
} from '../scripts/lib/bridge-core.mjs'

function state() {
  return {
    bridge_version: '2.0',
    revision: 1,
    scope: 'RedLantern Studios all products',
    updated_at: '2026-07-02',
    updated_by: 'codex',
    session_note: 'test',
    global: {
      focus_product: 'Amina',
      focus_reason: 'test',
      sync_status: 'GREEN',
      sync_note: 'clear',
      next_action: 'continue',
      warnings: [],
      blockers: [],
      resolved: []
    },
    sync_semantics: { GREEN: 'go', YELLOW: 'warn', RED: 'stop' },
    products: {
      amina: {
        status: 'ACTIVE',
        sync_status: 'GREEN',
        sync_note: 'clear',
        current_lane: 'amina/test',
        lanes_open: [],
        latest_receipt: 'NONE',
        repo: 'Amina',
        next_action: 'continue',
        warnings: [],
        blockers: []
      }
    },
    shared: {
      latest_receipt: 'OPS/receipts/TC-20260702-002.md',
      receipt_template: 'OPS/TRUTHCAL_RECEIPT.md',
      current_intent: 'OPS/TODAY.md',
      engine_registry: 'OPS/ENGINE_REGISTRY.json',
      alignment_policy: 'OPS/ALIGNMENT_POLICY.md',
      consumer_registry: 'OPS/CONSUMERS.json'
    }
  }
}

test('focus resolves case insensitively', () => {
  assert.equal(focusKey(state()), 'amina')
})

test('effective color returns the worse state', () => {
  const value = state()
  value.products.amina.sync_status = 'YELLOW'
  assert.equal(effectiveColor(value), 'YELLOW')
})

test('red requires a blocker', () => {
  const value = state()
  value.global.sync_status = 'RED'
  const result = validateBridge(value, { now: new Date('2026-07-02T12:00:00Z') })
  assert.equal(result.valid, false)
  assert.match(result.errors.join('\n'), /RED without a blocker/)
})

test('blockers force red', () => {
  const value = state()
  value.global.blockers.push('unsafe state')
  const result = validateBridge(value, { now: new Date('2026-07-02T12:00:00Z') })
  assert.equal(result.valid, false)
  assert.match(result.errors.join('\n'), /has blockers but is not RED/)
})

test('green rejects warnings', () => {
  const value = state()
  value.global.warnings.push('stale')
  const result = validateBridge(value, { now: new Date('2026-07-02T12:00:00Z') })
  assert.equal(result.valid, false)
  assert.match(result.errors.join('\n'), /GREEN with unresolved warnings/)
})

test('secret shaped values are rejected', () => {
  const value = state()
  value.session_note = 'sk_live_1234567890abcdef'
  const result = validateBridge(value, { now: new Date('2026-07-02T12:00:00Z') })
  assert.equal(result.valid, false)
  assert.match(result.errors.join('\n'), /secret shaped/)
})

test('invalid engine ownership is rejected', () => {
  const value = state()
  value.products.amina.lanes_open.push({
    lane: 'amina/test',
    engine: 'mystery',
    state: 'active',
    note: ''
  })
  const result = validateBridge(value, { now: new Date('2026-07-02T12:00:00Z') })
  assert.equal(result.valid, false)
  assert.match(result.errors.join('\n'), /engine is invalid/)
})

test('atomic writes increment revision', () => {
  const directory = mkdtempSync(join(tmpdir(), 'claudex-'))
  const path = join(directory, 'bridge.json')
  const lockPath = join(directory, 'bridge.lock')
  const value = state()
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`)
  value.session_note = 'updated'
  writeBridgeAtomic(value, {
    path,
    lockPath,
    now: new Date('2026-07-02T12:00:00Z')
  })
  assert.equal(JSON.parse(readFileSync(path, 'utf8')).revision, 2)
})

test('stale revisions are refused', () => {
  const directory = mkdtempSync(join(tmpdir(), 'claudex-'))
  const path = join(directory, 'bridge.json')
  const lockPath = join(directory, 'bridge.lock')
  const current = state()
  current.revision = 2
  writeFileSync(path, `${JSON.stringify(current, null, 2)}\n`)
  const stale = state()
  assert.throws(
    () =>
      writeBridgeAtomic(stale, {
        path,
        lockPath,
        now: new Date('2026-07-02T12:00:00Z')
      }),
    /stale revision/
  )
})

test('next receipt id uses engine tagged scheme', () => {
  const value = state()
  value.shared.latest_receipt = 'OPS/receipts/TC-20990101-CDX-06.md'
  value.products.amina.latest_receipt = 'OPS/receipts/TC-20990101-CDX-05.md'
  assert.equal(
    nextReceiptId(value, new Date('2099-01-01T12:00:00Z'), 'codex'),
    'TC-20990101-CDX-07'
  )
})

test('receipt file names keep the id and add readable context', () => {
  assert.equal(
    receiptFileName('TC-20990101-CDX-07', 'hirewire', 'Auth email recovery fixed'),
    'TC-20990101-CDX-07__hirewire__auth_email_recovery_fixed.md'
  )
  assert.equal(
    receiptRelativePath('TC-20990101-HUM-01', 'Amina', 'Release archive proof'),
    'OPS/receipts/TC-20990101-HUM-01__amina__release_archive_proof.md'
  )
})
