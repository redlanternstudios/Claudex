import assert from 'node:assert/strict'
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import test from 'node:test'

const root = fileURLToPath(new URL('..', import.meta.url))

function markdownFiles(directory) {
  return readdirSync(directory).flatMap((name) => {
    const path = join(directory, name)
    return statSync(path).isDirectory() ? markdownFiles(path) : path.endsWith('.md') ? [path] : []
  })
}

function capabilityIds(entries) {
  return entries.flatMap(({ path, text }) => {
    const match = text.match(/^Canonical capability: (.+)$/m)
    return match ? [{ path, id: match[1].trim() }] : []
  })
}

function assertUnique(values, label) {
  const duplicates = values.filter((value, index) => values.indexOf(value) !== index)
  assert.deepEqual(duplicates, [], `duplicate ${label}: ${duplicates.join(', ')}`)
}

const expected = {
  send: '.claude/skills/send-to-rory.md',
  from: '.claude/skills/from-rory.md',
  sight: '.claude/skills/sight-engine.md',
  backlog: '.claude/skills/backlog-heartbeat.md',
  ship: '.claude/skills/ship-to-claudex.md',
  memory: '.claude/skills/receipt-backed-process-memory.md'
}

test('Rory loop canonical skills are unique and present', () => {
  const files = markdownFiles(join(root, '.claude', 'skills'))
  const entries = files.map((path) => ({ path, text: readFileSync(path, 'utf8') }))
  const ids = capabilityIds(entries)
  const roryIds = ids.filter(({ id }) => id.startsWith('claudex.skill.'))

  assertUnique(roryIds.map(({ id }) => id), 'canonical capability identifier')
  for (const path of Object.values(expected)) {
    assert.ok(files.includes(join(root, path)), `missing canonical skill ${path}`)
  }

  const roryHeadings = entries
    .map(({ text }) => text.match(/^# (Send to Rory|From Rory|Sight Engine|Backlog heartbeat|Ship to Claudex|Receipt Backed Process Memory)$/m)?.[1])
    .filter(Boolean)
  assertUnique(roryHeadings, 'Rory skill heading')
  assert.equal(roryHeadings.length, 6)
})

test('duplicate detector rejects repeated capability identifiers', () => {
  assert.throws(
    () => assertUnique(['claudex.skill.from-rory', 'claudex.skill.from-rory'], 'canonical capability identifier'),
    /duplicate canonical capability identifier/
  )
})

test('outbound skill is explicit, gated, and read back', () => {
  const text = readFileSync(join(root, expected.send), 'utf8')
  assert.match(text, /send to my brother/)
  assert.match(text, /Authorize -> Resolve -> Route -> Verify -> Sight Engine -> Package RLS -> Send -> Read back -> Receipt/)
  assert.match(text, /Continue only on `PASS`/)
  assert.match(text, /explicit authorization/)
  assert.match(text, /Never store a personal email address in Claudex/)
})

test('inbound skill teaches upstream and downstream before action', () => {
  const text = readFileSync(join(root, expected.from), 'utf8')
  assert.match(text, /FROM RORY/)
  assert.match(text, /Trace upstream/)
  assert.match(text, /Trace downstream/)
  assert.match(text, /What is proven/)
  assert.match(text, /teach back question/)
  assert.match(text, /Do not replace the walkthrough with a heartbeat/)
})

test('boot files point to the canonical skills without becoming authorities', () => {
  const claude = readFileSync(join(root, '.claude', 'CLAUDE.md'), 'utf8')
  const agents = readFileSync(join(root, 'AGENTS.md'), 'utf8')
  for (const path of [expected.send, expected.from]) {
    assert.ok(claude.includes(path), `.claude/CLAUDE.md missing ${path}`)
    assert.ok(agents.includes(path), `AGENTS.md missing ${path}`)
  }
})

test('shared contract declares single authority and no daemon claim', () => {
  const text = readFileSync(join(root, 'OPS', 'CLAUDEX_RORY_OPERATING_LOOP_CONTRACT.md'), 'utf8')
  assert.match(text, /single Claudex repository authority/)
  assert.match(text, /Do not paste another copy/)
  assert.match(text, /do not create a scheduler, background daemon, or standing authorization/)
})
