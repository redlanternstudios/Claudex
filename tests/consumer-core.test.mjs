import test from 'node:test'
import assert from 'node:assert/strict'
import { END, START, managedBlock, upsertManagedBlock } from '../scripts/lib/consumer-core.mjs'

test('managed block includes the product key', () => {
  assert.match(managedBlock('amina'), /amina/)
})

test('empty instructions become one managed block', () => {
  const result = upsertManagedBlock('', managedBlock('amina'))
  assert.equal(result.match(new RegExp(START, 'g')).length, 1)
  assert.match(result, new RegExp(END))
})

test('existing instructions are preserved', () => {
  const result = upsertManagedBlock('# Existing\n\nKeep this.', managedBlock('amina'))
  assert.match(result, /# Existing/)
  assert.match(result, /Keep this\./)
})

test('managed block updates without duplication', () => {
  const first = upsertManagedBlock('# Existing', managedBlock('amina'))
  const second = upsertManagedBlock(first, managedBlock('hirewire'))
  assert.equal(second.match(new RegExp(START, 'g')).length, 1)
  assert.match(second, /hirewire/)
  assert.doesNotMatch(second, /product key `amina`/)
})
