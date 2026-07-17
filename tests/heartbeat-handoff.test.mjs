import test from 'node:test'
import assert from 'node:assert/strict'
import { buildKpRoryHandoff, handoffMarkdown, parseHeartbeatReceipt } from '../scripts/lib/heartbeat-handoff.mjs'

const receiptText = `# TruthCal Receipt TC-20260716-CDX-03

Date: 2026-07-16
Product: claudex
Author: codex
Intent: Enforce precise artifact naming and content routing
Result: COMPLETE

## Next action

Use the artifact manifest before creating files.
`

test('receipt parser preserves exact work and stopping point', () => {
  const parsed = parseHeartbeatReceipt(receiptText)
  assert.equal(parsed.product, 'claudex')
  assert.equal(parsed.intent, 'Enforce precise artifact naming and content routing')
  assert.equal(parsed.next_action, 'Use the artifact manifest before creating files.')
})

test('handoff names what KP did where he stopped and Rory action', () => {
  const handoff = buildKpRoryHandoff({
    receiptPath: 'OPS/receipts/TC-20260716-CDX-03.md',
    receiptText,
    previousReceipt: 'OPS/receipts/TC-20260716-CDX-02.md',
    roryTask: {
      next_action: 'Run the Amina submission proof pack.',
      definition_of_done: 'The submission receipt passes.'
    }
  })
  assert.equal(handoff.precise_name, 'Claudex Enforce precise artifact naming and content routing')
  assert.equal(handoff.movement, 'NEW HANDOFF')
  const markdown = handoffMarkdown(handoff)
  assert.match(markdown, /What KP did:/)
  assert.match(markdown, /Where KP left off:/)
  assert.match(markdown, /Message to Rory:/)
  assert.match(markdown, /Rory is done when:/)
})

test('unchanged receipt produces same handoff movement', () => {
  const path = 'OPS/receipts/TC-20260716-CDX-03.md'
  const handoff = buildKpRoryHandoff({
    receiptPath: path,
    receiptText,
    previousReceipt: path,
    roryTask: null
  })
  assert.equal(handoff.movement, 'SAME HANDOFF')
  assert.match(handoff.rory_action, /Continue from KP's stopping point/)
  assert.match(handoff.done_proof, /Rory records a receipt/)
})
