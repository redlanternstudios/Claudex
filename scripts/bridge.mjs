#!/usr/bin/env node
import { appendFileSync, existsSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import {
  BRIDGE_PATH,
  ROOT,
  effectiveColor,
  focusKey,
  nextReceiptId,
  readBridge,
  receiptPath,
  scanSecretFiles,
  setAuditFields,
  today,
  validateBridge,
  writeBridgeAtomic
} from './lib/bridge-core.mjs'

function fail(message) {
  console.error(message)
  process.exitCode = 2
}

function printState(state, validation) {
  const key = validation.focusKey
  const product = key ? state.products[key] : null
  console.log(`SYNC ${validation.effectiveColor}`)
  console.log(`Focus: ${state.global.focus_product}`)
  console.log(`Lane: ${product?.current_lane ?? 'UNKNOWN'}`)
  console.log(`Updated: ${state.updated_at} by ${state.updated_by}`)
  console.log(`Receipt: ${state.shared.latest_receipt}`)
  console.log(`Next: ${product?.next_action ?? state.global.next_action}`)
  for (const warning of [...(state.global.warnings ?? []), ...(product?.warnings ?? []), ...validation.warnings]) {
    console.log(`WARNING: ${warning}`)
  }
  for (const blocker of [...(state.global.blockers ?? []), ...(product?.blockers ?? []), ...validation.errors]) {
    console.log(`BLOCKER: ${blocker}`)
  }
}

function status() {
  const state = readBridge()
  const validation = validateBridge(state)
  printState(state, validation)
  if (!validation.valid || validation.effectiveColor === 'RED') process.exitCode = 2
}

function validate() {
  const state = readBridge()
  const result = validateBridge(state)
  console.log(JSON.stringify(result, null, 2))
  if (!result.valid) process.exitCode = 2
}

function doctor() {
  const state = readBridge()
  const result = validateBridge(state)
  const checks = [
    ['bridge parses', true],
    ['bridge semantics valid', result.valid],
    ['receipt exists', existsSync(join(ROOT, state.shared.latest_receipt))],
    ['receipt template exists', existsSync(join(ROOT, state.shared.receipt_template))],
    ['current intent exists', existsSync(join(ROOT, state.shared.current_intent))],
    ['engine registry exists', existsSync(join(ROOT, state.shared.engine_registry))],
    ['alignment policy exists', existsSync(join(ROOT, state.shared.alignment_policy))],
    ['consumer registry exists', existsSync(join(ROOT, state.shared.consumer_registry))],
    ['no active write lock', !existsSync(join(ROOT, 'OPS', 'BRIDGE.lock'))],
    ['OPS secret scan clean', scanSecretFiles().length === 0],
    ['Codex boot reads bridge', readFileSync(join(ROOT, 'AGENTS.md'), 'utf8').includes('OPS/BRIDGE.json')],
    ['Claude boot reads bridge', readFileSync(join(ROOT, '.claude', 'CLAUDE.md'), 'utf8').includes('OPS/BRIDGE.json')]
  ]
  for (const [name, passed] of checks) console.log(`${passed ? 'PASS' : 'FAIL'}: ${name}`)
  printState(state, result)
  if (checks.some(([, passed]) => !passed) || !result.valid) process.exitCode = 2
}

function setFocus(args) {
  const [productKey, actor = 'codex'] = args
  const state = readBridge()
  if (!state.products[productKey]) return fail(`Unknown product: ${productKey}`)
  state.global.focus_product = productKey
  state.global.focus_reason = `Explicitly selected by ${actor}`
  state.global.next_action = state.products[productKey].next_action
  setAuditFields(state, actor, `Focus changed to ${productKey}`)
  writeBridgeAtomic(state)
  status()
}

function openLane(args) {
  const [productKey, lane, engine, nextAction, actor = 'codex'] = args
  if (!productKey || !lane || !engine || !nextAction) {
    return fail('Usage: bridge open <product> <lane> <engine> <next action> [actor]')
  }
  const state = readBridge()
  const product = state.products[productKey]
  if (!product) return fail(`Unknown product: ${productKey}`)
  if (product.sync_status === 'RED') return fail(`Cannot open a lane while ${productKey} is RED`)
  product.status = 'ACTIVE'
  product.sync_note = `Active lane ${lane} opened by ${actor}.`
  product.current_lane = lane
  product.next_action = nextAction
  const existing = product.lanes_open.find((item) => item.lane === lane)
  if (existing) {
    existing.engine = engine
    existing.state = 'active'
    existing.note = nextAction
  } else {
    product.lanes_open.push({ lane, engine, state: 'active', note: nextAction })
  }
  state.global.focus_product = productKey
  state.global.next_action = nextAction
  setAuditFields(state, actor, `Opened ${lane} for ${engine}`)
  writeBridgeAtomic(state)
  status()
}

function addCondition(args, kind) {
  const [scope, message, actor = 'codex'] = args
  if (!scope || !message) return fail(`Usage: bridge ${kind} <global or product> <message> [actor]`)
  const state = readBridge()
  const node = scope === 'global' ? state.global : state.products[scope]
  if (!node) return fail(`Unknown scope: ${scope}`)
  if (!node[kind].includes(message)) node[kind].push(message)
  node.sync_status = kind === 'blockers' ? 'RED' : node.sync_status === 'GREEN' ? 'YELLOW' : node.sync_status
  setAuditFields(state, actor, `Added ${kind.slice(0, -1)} to ${scope}`)
  writeBridgeAtomic(state)
  status()
}

function resolveCondition(args) {
  const [scope, text, actor = 'codex'] = args
  if (!scope || !text) return fail('Usage: bridge resolve <global or product> <exact text> [actor]')
  const state = readBridge()
  const node = scope === 'global' ? state.global : state.products[scope]
  if (!node) return fail(`Unknown scope: ${scope}`)
  const before = (node.warnings?.length ?? 0) + (node.blockers?.length ?? 0)
  node.warnings = (node.warnings ?? []).filter((item) => item !== text)
  node.blockers = (node.blockers ?? []).filter((item) => item !== text)
  const after = node.warnings.length + node.blockers.length
  if (before === after) return fail('Condition not found')
  if (node.blockers.length === 0) node.sync_status = node.warnings.length ? 'YELLOW' : 'GREEN'
  if (Array.isArray(node.resolved)) node.resolved.push(text)
  setAuditFields(state, actor, `Resolved condition in ${scope}`)
  writeBridgeAtomic(state)
  status()
}

function receipt(args) {
  const [productKey, intent, result = 'COMPLETE', actor = 'codex'] = args
  if (!productKey || !intent) return fail('Usage: bridge receipt <product> <intent> [result] [actor]')
  const state = readBridge()
  const isGlobal = productKey === 'global'
  const product = isGlobal
    ? {
        current_lane: 'studio/bridge-control-plane',
        next_action: state.global.next_action
      }
    : state.products[productKey]
  if (!product) return fail(`Unknown product: ${productKey}`)
  const id = nextReceiptId(state)
  const relativePath = `OPS/receipts/${id}.md`
  const content = `# TruthCal Receipt ${id}

Date: ${today()}
Product: ${productKey}
Lane: ${product.current_lane}
Author: ${actor}
Intent: ${intent}
Result: ${result}

## Truth

VERIFIED: Receipt created through the Claudex command layer.
UNKNOWN: Add any external state that was not directly verified.

## Evidence

Add commands, checks, commit identifiers, and external receipts here.

## Next action

${product.next_action}
`
  writeFileSync(receiptPath(id), content)
  if (!isGlobal) product.latest_receipt = relativePath
  state.shared.latest_receipt = relativePath
  setAuditFields(state, actor, `Receipt ${id} created for ${productKey}`)
  writeBridgeAtomic(state)
  appendFileSync(
    join(ROOT, 'OPS', 'receipts', 'INDEX.md'),
    `\n| ${id} | ${today()} | ${productKey} | ${intent.replaceAll('|', '/')} | ${result} |\n`
  )
  console.log(relativePath)
}

function handoff(args) {
  const [productKey, nextEngine, nextAction, receiptRelativePath, actor = 'codex'] = args
  if (!productKey || !nextEngine || !nextAction || !receiptRelativePath) {
    return fail('Usage: bridge handoff <product> <next engine> <next action> <receipt path> [actor]')
  }
  const state = readBridge()
  const product = state.products[productKey]
  if (!product) return fail(`Unknown product: ${productKey}`)
  if (product.sync_status === 'RED') return fail(`Cannot hand off while ${productKey} is RED`)
  if (!existsSync(join(ROOT, receiptRelativePath))) return fail(`Receipt does not exist: ${receiptRelativePath}`)
  const lane = product.lanes_open.find((item) => item.lane === product.current_lane)
  if (!lane) return fail(`Current lane is not open: ${product.current_lane}`)
  lane.engine = nextEngine
  lane.state = 'active'
  lane.note = nextAction
  product.next_action = nextAction
  product.latest_receipt = receiptRelativePath
  state.shared.latest_receipt = receiptRelativePath
  state.global.focus_product = productKey
  state.global.next_action = nextAction
  setAuditFields(state, actor, `Handed ${product.current_lane} to ${nextEngine}`)
  writeBridgeAtomic(state)
  status()
}

function closeLane(args) {
  const [productKey, laneName, receiptRelativePath, actor = 'codex'] = args
  if (!productKey || !laneName || !receiptRelativePath) {
    return fail('Usage: bridge close <product> <lane> <receipt path> [actor]')
  }
  const state = readBridge()
  const product = state.products[productKey]
  if (!product) return fail(`Unknown product: ${productKey}`)
  if (!existsSync(join(ROOT, receiptRelativePath))) return fail(`Receipt does not exist: ${receiptRelativePath}`)
  const lane = product.lanes_open.find((item) => item.lane === laneName)
  if (!lane) return fail(`Lane is not open: ${laneName}`)
  lane.state = 'complete'
  lane.note = `Closed with ${receiptRelativePath}`
  product.latest_receipt = receiptRelativePath
  state.shared.latest_receipt = receiptRelativePath
  setAuditFields(state, actor, `Closed ${laneName}`)
  writeBridgeAtomic(state)
  status()
}

const [command = 'status', ...args] = process.argv.slice(2)
if (command === 'status') status()
else if (command === 'validate') validate()
else if (command === 'doctor') doctor()
else if (command === 'focus') setFocus(args)
else if (command === 'open') openLane(args)
else if (command === 'warn') addCondition(args, 'warnings')
else if (command === 'block') addCondition(args, 'blockers')
else if (command === 'resolve') resolveCondition(args)
else if (command === 'receipt') receipt(args)
else if (command === 'handoff') handoff(args)
else if (command === 'close') closeLane(args)
else fail(`Unknown command: ${command}`)
