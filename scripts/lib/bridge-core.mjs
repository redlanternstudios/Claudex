import {
  closeSync,
  copyFileSync,
  existsSync,
  mkdirSync,
  openSync,
  readFileSync,
  readdirSync,
  renameSync,
  unlinkSync,
  writeSync,
  writeFileSync
} from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

export const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..')
export const BRIDGE_PATH = join(ROOT, 'OPS', 'BRIDGE.json')
export const STATUS_ORDER = { GREEN: 0, YELLOW: 1, RED: 2 }
export const SECRET_PATTERN = /(sk_live_|sk_test_|sk-proj-|github_pat_|ghp_|AKIA|xox[baprs]-)[A-Za-z0-9_.-]{8,}/

export function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf8'))
}

export function readBridge(path = BRIDGE_PATH) {
  return readJson(path)
}

export function today(now = new Date()) {
  return now.toISOString().slice(0, 10)
}

export function focusKey(state) {
  const wanted = state.global?.focus_product?.toLowerCase().replaceAll(' ', '_')
  if (state.products?.[wanted]) return wanted
  return Object.keys(state.products ?? {}).find(
    (key) => key.toLowerCase() === state.global?.focus_product?.toLowerCase()
  )
}

export function effectiveColor(state) {
  const key = focusKey(state)
  const productColor = key ? state.products[key].sync_status : 'RED'
  return STATUS_ORDER[state.global.sync_status] >= STATUS_ORDER[productColor]
    ? state.global.sync_status
    : productColor
}

function requiredString(value, path, errors) {
  if (typeof value !== 'string' || value.trim() === '') errors.push(`${path} must be a nonempty string`)
}

function validateColorNode(node, path, errors) {
  const colors = ['GREEN', 'YELLOW', 'RED']
  if (!colors.includes(node?.sync_status)) errors.push(`${path}.sync_status is invalid`)
  if (!Array.isArray(node?.warnings)) errors.push(`${path}.warnings must be an array`)
  if (!Array.isArray(node?.blockers)) errors.push(`${path}.blockers must be an array`)
  if (node?.sync_status === 'RED' && (node?.blockers?.length ?? 0) === 0) {
    errors.push(`${path} is RED without a blocker`)
  }
  if (node?.sync_status !== 'RED' && (node?.blockers?.length ?? 0) > 0) {
    errors.push(`${path} has blockers but is not RED`)
  }
  if (node?.sync_status === 'GREEN' && (node?.warnings?.length ?? 0) > 0) {
    errors.push(`${path} is GREEN with unresolved warnings`)
  }
}

export function validateBridge(state, options = {}) {
  const errors = []
  const warnings = []
  requiredString(state.bridge_version, 'bridge_version', errors)
  if (!Number.isInteger(state.revision) || state.revision < 1) errors.push('revision must be a positive integer')
  requiredString(state.scope, 'scope', errors)
  requiredString(state.updated_at, 'updated_at', errors)
  requiredString(state.updated_by, 'updated_by', errors)
  if (!['codex', 'claude', 'human', 'automation'].includes(state.updated_by)) {
    errors.push('updated_by is invalid')
  }
  requiredString(state.session_note, 'session_note', errors)
  requiredString(state.global?.focus_product, 'global.focus_product', errors)
  requiredString(state.global?.next_action, 'global.next_action', errors)
  validateColorNode(state.global, 'global', errors)

  const key = focusKey(state)
  if (!key) errors.push('global.focus_product does not resolve to a product')

  for (const [productKey, product] of Object.entries(state.products ?? {})) {
    requiredString(product.status, `products.${productKey}.status`, errors)
    requiredString(product.current_lane, `products.${productKey}.current_lane`, errors)
    requiredString(product.next_action, `products.${productKey}.next_action`, errors)
    if (!Array.isArray(product.lanes_open)) {
      errors.push(`products.${productKey}.lanes_open must be an array`)
    } else {
      for (const [index, lane] of product.lanes_open.entries()) {
        requiredString(lane.lane, `products.${productKey}.lanes_open.${index}.lane`, errors)
        if (!['codex', 'claude', 'human', 'automation', 'shared'].includes(lane.engine)) {
          errors.push(`products.${productKey}.lanes_open.${index}.engine is invalid`)
        }
        if (!['planned', 'active', 'waiting', 'complete', 'blocked'].includes(lane.state)) {
          errors.push(`products.${productKey}.lanes_open.${index}.state is invalid`)
        }
      }
    }
    validateColorNode(product, `products.${productKey}`, errors)
  }

  const requiredPaths = [
    state.shared?.latest_receipt,
    state.shared?.receipt_template,
    state.shared?.current_intent,
    state.shared?.engine_registry,
    state.shared?.alignment_policy,
    state.shared?.consumer_registry
  ]
  for (const relativePath of requiredPaths) {
    if (!relativePath || !existsSync(join(ROOT, relativePath))) {
      errors.push(`required shared path is missing: ${relativePath ?? 'undefined'}`)
    }
  }

  const serialized = JSON.stringify(state)
  if (SECRET_PATTERN.test(serialized)) errors.push('bridge contains a secret shaped value')

  if (state.updated_at !== today(options.now)) warnings.push('bridge updated_at is not today')
  const intent = state.shared?.current_intent
  if (intent && existsSync(join(ROOT, intent))) {
    const text = readFileSync(join(ROOT, intent), 'utf8')
    if (!text.includes(today(options.now))) warnings.push('current intent does not contain today')
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    effectiveColor: errors.length > 0 ? 'RED' : effectiveColor(state),
    focusKey: key
  }
}

export function writeBridgeAtomic(state, options = {}) {
  const path = options.path ?? BRIDGE_PATH
  const backupDir = join(ROOT, 'OPS', 'backups')
  const lockPath = options.lockPath ?? join(ROOT, 'OPS', 'BRIDGE.lock')
  mkdirSync(backupDir, { recursive: true })

  let lock
  try {
    lock = openSync(lockPath, 'wx', 0o600)
    writeSync(lock, JSON.stringify({ pid: process.pid, created_at: new Date().toISOString() }))
  } catch {
    throw new Error('Bridge write refused: another writer holds OPS/BRIDGE.lock')
  }

  try {
    const prior = existsSync(path) ? readBridge(path) : null
    if (prior && state.revision !== prior.revision) {
      throw new Error(
        `Bridge write refused: stale revision ${state.revision}; current revision is ${prior.revision}`
      )
    }
    if (prior) {
      const stamp = new Date().toISOString().replaceAll(':', '').replaceAll('.', '')
      copyFileSync(path, join(backupDir, `BRIDGE.${stamp}.json`))
      state.revision = prior.revision + 1
    }

    const validation = validateBridge(state, options)
    if (!validation.valid) throw new Error(`Bridge write refused:\n${validation.errors.join('\n')}`)

    const tempPath = `${path}.tmp`
    writeFileSync(tempPath, `${JSON.stringify(state, null, 2)}\n`, { mode: 0o600 })
    renameSync(tempPath, path)
    return validation
  } finally {
    if (lock !== undefined) closeSync(lock)
    if (existsSync(lockPath)) unlinkSync(lockPath)
  }
}

export function setAuditFields(state, actor, note, now = new Date()) {
  state.updated_at = today(now)
  state.updated_by = actor
  state.session_note = note
  return state
}

export function receiptPath(id) {
  return join(ROOT, 'OPS', 'receipts', `${id}.md`)
}

export function nextReceiptId(state, now = new Date()) {
  const date = today(now).replaceAll('-', '')
  const referenced = Object.values(state.products ?? {})
    .map((product) => product.latest_receipt)
    .concat(state.shared?.latest_receipt ?? '')
  const onDisk = readdirSync(join(ROOT, 'OPS', 'receipts'))
  const matches = referenced
    .concat(onDisk)
    .filter((value) => typeof value === 'string')
    .map((value) => value.match(new RegExp(`TC-${date}-(\\d+)`)))
    .filter(Boolean)
    .map((match) => Number(match[1]))
  const next = Math.max(0, ...matches) + 1
  return `TC-${date}-${String(next).padStart(3, '0')}`
}

export function resolveFromRoot(path) {
  return resolve(ROOT, path)
}

export function scanSecretFiles(directory = join(ROOT, 'OPS')) {
  const findings = []
  function walk(path) {
    for (const entry of readdirSync(path, { withFileTypes: true })) {
      if (entry.name === 'backups') continue
      const fullPath = join(path, entry.name)
      if (entry.isDirectory()) walk(fullPath)
      else {
        const text = readFileSync(fullPath, 'utf8')
        if (SECRET_PATTERN.test(text)) findings.push(fullPath)
        SECRET_PATTERN.lastIndex = 0
      }
    }
  }
  walk(directory)
  return findings
}
