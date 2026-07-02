import test from 'node:test'
import assert from 'node:assert/strict'
import { classifyAlignment } from '../scripts/lib/alignment-core.mjs'

test('clean aligned state is green', () => {
  assert.equal(
    classifyAlignment({ local: 'a', remote: 'a', base: 'a', dirty: false }).color,
    'GREEN'
  )
})

test('dirty aligned state is yellow', () => {
  assert.equal(
    classifyAlignment({ local: 'a', remote: 'a', base: 'a', dirty: true }).color,
    'YELLOW'
  )
})

test('behind state requests fast forward', () => {
  const result = classifyAlignment({ local: 'a', remote: 'b', base: 'a', dirty: false })
  assert.equal(result.relation, 'BEHIND')
  assert.match(result.action, /Fast forward/)
})

test('dirty behind state refuses merge', () => {
  const result = classifyAlignment({ local: 'a', remote: 'b', base: 'a', dirty: true })
  assert.match(result.action, /Do not merge/)
})

test('ahead state requests push', () => {
  assert.equal(
    classifyAlignment({ local: 'b', remote: 'a', base: 'a', dirty: false }).relation,
    'AHEAD'
  )
})

test('diverged state is red', () => {
  const result = classifyAlignment({ local: 'b', remote: 'c', base: 'a', dirty: false })
  assert.equal(result.color, 'RED')
})
