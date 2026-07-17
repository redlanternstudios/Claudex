import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const root = join(import.meta.dirname, '..')
const contract = readFileSync(join(root, 'OPS/CLAUDEX_CAPTURE_AND_SHIP.md'), 'utf8')
const skill = readFileSync(join(root, '.claude/skills/ship-to-claudex.md'), 'utf8')
const agents = readFileSync(join(root, 'AGENTS.md'), 'utf8')
const claude = readFileSync(join(root, '.claude/CLAUDE.md'), 'utf8')

test('capture and ship trigger is discoverable by both engines', () => {
  assert.match(agents, /ship-to-claudex\.md/)
  assert.match(claude, /ship-to-claudex\.md/)
  assert.match(skill, /OPS\/CLAUDEX_CAPTURE_AND_SHIP\.md/)
})

test('capture gate refuses secrets and misplaced product code', () => {
  assert.match(contract, /secret, credential, token/)
  assert.match(contract, /product implementation that belongs in a product repository/)
  assert.match(skill, /Never ship raw conversation/)
})

test('unverified work is parked instead of hardcoded as truth', () => {
  assert.match(contract, /CLARIFY/)
  assert.match(contract, /BLOCKED/)
  assert.match(contract, /PARKED/)
  assert.match(contract, /does not become a permanent rule/)
})

test('shipped requires verified remote read back and a receipt', () => {
  assert.match(contract, /Local files and local commits are not shipped state/)
  assert.match(contract, /TruthCal receipt/)
  assert.match(contract, /read the remote commit back/)
  assert.match(skill, /Do not claim shipped until the remote commit/)
  assert.match(contract, /Never invent a repository command/)
})
