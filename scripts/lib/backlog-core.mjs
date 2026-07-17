import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT, today } from './bridge-core.mjs'

export const BACKLOG_PATH = join(ROOT, 'OPS', 'BACKLOG.json')
export const OWNERS = ['KP', 'Rory']
export const CLASSIFICATIONS = ['SIGNAL', 'CLARIFY', 'BLOCKED', 'PARKED', 'NOISE', 'DONE']

const OWNER_ALIASES = new Map([
  ['kp', 'KP'],
  ['keymon', 'KP'],
  ['keymon penn', 'KP'],
  ['rory', 'Rory'],
  ['ro', 'Rory'],
  ['rory semeah', 'Rory']
])
const EFFORT_FACTORS = new Map([
  [1, 1],
  [2, 0.9],
  [3, 0.75],
  [4, 0.6],
  [5, 0.45]
])
const REQUIRED_TEXT = [
  'id',
  'title',
  'project',
  'objective',
  'outcome',
  'next_action',
  'definition_of_done'
]
const REQUIRED_SCORES = ['impact', 'effort', 'urgency', 'leverage', 'unblock']

export function readBacklog(path = BACKLOG_PATH) {
  return JSON.parse(readFileSync(path, 'utf8'))
}

export function canonicalOwner(value) {
  if (value === null || value === undefined) return null
  return OWNER_ALIASES.get(String(value).trim().toLowerCase()) ?? null
}

function numeric(value) {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : null
}

function normalized(value) {
  return String(value ?? '').trim().toLowerCase()
}

function parseDate(value) {
  if (!value) return null
  const parsed = new Date(value)
  return Number.isNaN(parsed.getTime()) ? null : parsed
}

function ageDays(value, now) {
  const parsed = parseDate(value)
  if (!parsed) return null
  return Math.max(0, Math.floor((now.getTime() - parsed.getTime()) / 86_400_000))
}

function heartbeatDate(value) {
  const parsed = parseDate(value)
  return parsed ?? new Date()
}

function taskStaleness(task, now) {
  const age = ageDays(task.updated_at, now)
  if (age === null) return { stale: true, stale_reason: 'updated_at is missing or invalid' }
  const status = normalized(task.status)
  const threshold = status === 'in_progress' ? 3 : status === 'parked' ? 30 : 7
  return age > threshold
    ? { stale: true, stale_reason: `${age} days since the last task evidence` }
    : { stale: false, stale_reason: '' }
}

export function expandJointTasks(task) {
  const owner = normalized(task.owner)
  if (!['joint', 'shared', 'both', 'kp+rory', 'rory+kp'].includes(owner)) {
    return { tasks: [task], issues: [] }
  }

  const actions = task.owner_actions && typeof task.owner_actions === 'object' ? task.owner_actions : {}
  const tasks = []
  const issues = []
  for (const ownerName of OWNERS) {
    const child = actions[ownerName]
    if (!child || typeof child !== 'object') {
      issues.push({
        ...task,
        missing_owner_action: ownerName,
        classification: 'CLARIFY',
        classification_reason: `joint task lacks a distinct ${ownerName} owner action`
      })
      continue
    }
    const merged = { ...task, ...child }
    delete merged.owner_actions
    merged.parent_id = task.id
    merged.id = `${task.id}:${ownerName}`
    merged.owner = ownerName
    tasks.push(merged)
  }
  return { tasks, issues }
}

export function classifyTask(task, activeObjectives) {
  const status = normalized(task.status)
  if (status === 'done') {
    return task.completion_evidence
      ? ['DONE', 'completion evidence is present']
      : ['CLARIFY', 'marked done without completion evidence']
  }
  if (status === 'cancelled' || task.duplicate_of || task.noise_reason) {
    return [
      'NOISE',
      String(task.noise_reason ?? (task.duplicate_of ? `duplicates ${task.duplicate_of}` : 'cancelled'))
    ]
  }

  const objective = normalized(task.objective)
  if (status === 'parked' || !objective || (activeObjectives.size > 0 && !activeObjectives.has(objective))) {
    return ['PARKED', 'not linked to a current active objective']
  }
  if (task.blocked === true || status === 'blocked') {
    return ['BLOCKED', String(task.blocker ?? 'blocked without a named dependency')]
  }

  const missing = REQUIRED_TEXT.filter((field) => !String(task[field] ?? '').trim())
  if (!canonicalOwner(task.owner)) missing.push('owner')
  for (const field of REQUIRED_SCORES) {
    const value = numeric(task[field])
    if (value === null || value < 1 || value > 5) missing.push(field)
  }
  const confidence = numeric(task.evidence_confidence)
  if (confidence === null || confidence < 0 || confidence > 1) missing.push('evidence_confidence')
  if (missing.length > 0) {
    return ['CLARIFY', `missing or invalid: ${[...new Set(missing)].join(', ')}`]
  }
  if (confidence < 0.35) return ['CLARIFY', 'evidence confidence is below 0.35']
  if (!['ready', 'in_progress'].includes(status)) {
    return ['CLARIFY', 'status must be ready or in_progress to rank']
  }
  return ['SIGNAL', 'owned executable work linked to an active objective']
}

export function priorityScore(task) {
  const manual = numeric(task.manual_priority)
  if (manual !== null && task.override_reason && task.override_expires) {
    return Math.round(Math.max(0, Math.min(100, manual)) * 10) / 10
  }
  const impact = Number(task.impact)
  const urgency = Number(task.urgency)
  const leverage = Number(task.leverage)
  const unblock = Number(task.unblock)
  const effort = Number(task.effort)
  const confidence = Number(task.evidence_confidence)
  const value = 0.4 * impact + 0.2 * urgency + 0.2 * leverage + 0.2 * unblock
  const score = 20 * value * EFFORT_FACTORS.get(effort) * (0.7 + 0.3 * confidence)
  return Math.round(score * 10) / 10
}

function priorIds(previous, owner) {
  const lane = previous?.[owner]
  if (!Array.isArray(lane)) return null
  return lane.map((item) => (typeof item === 'string' ? item : item?.id)).filter(Boolean)
}

function movement(item, rank, prior) {
  if (!prior) return '—'
  let oldIndex = prior.indexOf(item.id)
  if (oldIndex < 0 && item.parent_id) oldIndex = prior.indexOf(item.parent_id)
  if (oldIndex < 0) return 'NEW'
  const oldRank = oldIndex + 1
  if (oldRank > rank) return `UP ${oldRank - rank}`
  if (oldRank < rank) return `DOWN ${rank - oldRank}`
  return 'SAME'
}

function whyNow(item) {
  if (item.why_now) return item.why_now
  return `Impact ${item.impact}, urgency ${item.urgency}, unblock value ${item.unblock}`
}

function sourceFreshness(sources, now) {
  return (Array.isArray(sources) ? sources : []).map((source) => {
    const age = ageDays(source.updated_at, now)
    const threshold = Number.isFinite(Number(source.stale_after_days))
      ? Number(source.stale_after_days)
      : 3
    return {
      ...source,
      age_days: age,
      freshness: !source.path || !existsSync(join(ROOT, source.path))
        ? 'MISSING'
        : age === null
          ? 'UNKNOWN'
          : age > threshold
            ? 'STALE'
            : 'CURRENT'
    }
  })
}

function contractErrors(backlog) {
  const errors = []
  if (backlog.version !== '1.0') errors.push('backlog version must be 1.0')
  if (!parseDate(backlog.updated_at)) errors.push('backlog updated_at is missing or invalid')
  if (!Array.isArray(backlog.active_objectives)) errors.push('active_objectives must be an array')
  if (!Array.isArray(backlog.sources)) errors.push('sources must be an array')
  if (!Array.isArray(backlog.tasks)) errors.push('tasks must be an array')
  const ids = new Set()
  for (const task of Array.isArray(backlog.tasks) ? backlog.tasks : []) {
    if (!task?.id) continue
    if (ids.has(task.id)) errors.push(`duplicate task id: ${task.id}`)
    ids.add(task.id)
  }
  return errors
}

function buildChanges(lanes, buckets, previous) {
  const changes = {
    entered_top_five: [],
    moved: [],
    completed: [],
    blocked: [],
    removed_from_top_five: [],
    stale: []
  }
  const byId = new Map()
  for (const [classification, items] of Object.entries(buckets)) {
    for (const item of items) byId.set(item.id, { classification, item })
  }
  for (const owner of OWNERS) {
    const prior = priorIds(previous, owner)
    for (const item of lanes[owner]) {
      if (item.movement === 'NEW') changes.entered_top_five.push(`${owner}: ${item.id}`)
      else if (!['SAME', '—'].includes(item.movement)) {
        changes.moved.push(`${owner}: ${item.id} ${item.movement}`)
      }
      if (item.stale) changes.stale.push(`${owner}: ${item.id}`)
    }
    if (!prior) continue
    const currentIds = new Set(lanes[owner].flatMap((item) => [item.id, item.parent_id].filter(Boolean)))
    for (const id of prior) {
      if (currentIds.has(id)) continue
      const found = byId.get(id)
      if (found?.classification === 'DONE') changes.completed.push(`${owner}: ${id}`)
      else if (found?.classification === 'BLOCKED') changes.blocked.push(`${owner}: ${id}`)
      else changes.removed_from_top_five.push(`${owner}: ${id}`)
    }
  }
  return changes
}

function integrityCheck(lanes) {
  const errors = []
  for (const owner of OWNERS) {
    if (lanes[owner].length > 5) errors.push(`${owner} lane contains more than five tasks`)
    const ids = new Set()
    for (const item of lanes[owner]) {
      if (item.owner !== owner) errors.push(`${item.id} is in the wrong owner lane`)
      if (item.classification !== 'SIGNAL') errors.push(`${item.id} is not executable signal`)
      if (ids.has(item.id)) errors.push(`${item.id} is duplicated in ${owner} lane`)
      ids.add(item.id)
    }
  }
  return { passed: errors.length === 0, errors }
}

export function rankBacklog(backlog, options = {}) {
  const inputErrors = contractErrors(backlog)
  const heartbeatAt = options.heartbeatAt ?? backlog.heartbeat_at ?? new Date().toISOString()
  const now = heartbeatDate(heartbeatAt)
  const objectives = (backlog.active_objectives ?? []).map((value) => String(value).trim()).filter(Boolean)
  const activeObjectives = new Set(objectives.map(normalized))
  const rawTasks = Array.isArray(backlog.tasks) ? backlog.tasks : []
  const tasks = []
  const jointIssues = []
  for (const rawTask of rawTasks) {
    if (!rawTask || typeof rawTask !== 'object') continue
    const expanded = expandJointTasks(rawTask)
    tasks.push(...expanded.tasks)
    jointIssues.push(...expanded.issues)
  }

  const buckets = Object.fromEntries(CLASSIFICATIONS.map((name) => [name, []]))
  buckets.CLARIFY.push(...jointIssues)
  for (const task of tasks) {
    const [classification, reason] = classifyTask(task, activeObjectives)
    const staleness = taskStaleness(task, now)
    const item = {
      ...task,
      owner: canonicalOwner(task.owner) ?? task.owner,
      classification,
      classification_reason: reason,
      ...staleness
    }
    if (classification === 'SIGNAL') {
      item.priority_score = priorityScore(item)
      item.why_now = whyNow(item)
    }
    buckets[classification].push(item)
  }

  const previous = options.previous ?? backlog.previous_heartbeat ?? null
  const lanes = {}
  for (const owner of OWNERS) {
    const prior = priorIds(previous, owner)
    const ownerTasks = buckets.SIGNAL
      .filter((item) => item.owner === owner)
      .sort((left, right) => {
        if (right.priority_score !== left.priority_score) return right.priority_score - left.priority_score
        if (normalized(left.status) !== normalized(right.status)) {
          return normalized(left.status) === 'in_progress' ? -1 : 1
        }
        return String(left.due_date ?? '9999-12-31').localeCompare(String(right.due_date ?? '9999-12-31'))
      })
      .slice(0, 5)
    ownerTasks.forEach((item, index) => {
      item.rank = index + 1
      item.movement = movement(item, item.rank, prior)
    })
    lanes[owner] = ownerTasks
  }

  const sources = sourceFreshness(backlog.sources, now)
  const integrity = integrityCheck(lanes)
  integrity.errors.unshift(...inputErrors)
  integrity.passed = integrity.errors.length === 0
  const issues = []
  let status = 'CURRENT'
  if (objectives.length === 0 || rawTasks.length === 0 || !integrity.passed) {
    status = 'BLOCKED'
    if (objectives.length === 0) issues.push('no active objectives supplied')
    if (rawTasks.length === 0) issues.push('no backlog tasks supplied')
    issues.push(...integrity.errors)
  } else if (
    buckets.CLARIFY.length > 0 ||
    buckets.BLOCKED.length > 0 ||
    sources.some((source) => source.freshness !== 'CURRENT') ||
    OWNERS.some((owner) => lanes[owner].some((item) => item.stale))
  ) {
    status = 'PARTIAL'
    issues.push('some work needs clarification, dependency resolution, or source refresh')
  }

  return {
    heartbeat_at: heartbeatAt,
    pacific_date: today(now),
    status,
    active_objectives: objectives,
    sources,
    lanes,
    open_capacity: Object.fromEntries(OWNERS.map((owner) => [owner, 5 - lanes[owner].length])),
    buckets: Object.fromEntries(CLASSIFICATIONS.filter((name) => name !== 'SIGNAL').map((name) => [name, buckets[name]])),
    signal_count: buckets.SIGNAL.length,
    changes: buildChanges(lanes, buckets, previous),
    integrity,
    issues
  }
}

function compact(value) {
  return String(value ?? 'MISSING').replaceAll('\n', ' ').trim()
}

export function ownerLaneMarkdown(owner, lane, openCapacity) {
  const lines = [`## ${owner} Top 5`, '']
  if (lane.length === 0) lines.push('* OPEN CAPACITY. No qualified signal.')
  for (const item of lane) {
    lines.push(
      `* ${item.rank}. ${compact(item.title)}. Score ${item.priority_score}. ${compact(item.why_now)}. Next: ${compact(item.next_action)}. Done: ${compact(item.definition_of_done)}. Move: ${item.movement}.`
    )
  }
  if (openCapacity > 0) lines.push(`* OPEN CAPACITY: ${openCapacity} slot(s).`)
  return lines.join('\n')
}

export function changeSummary(result) {
  const parts = []
  if (result.changes.entered_top_five.length > 0) {
    parts.push(`Entered: ${result.changes.entered_top_five.join(', ')}`)
  }
  if (result.changes.moved.length > 0) parts.push(`Moved: ${result.changes.moved.join(', ')}`)
  if (result.changes.completed.length > 0) parts.push(`Completed: ${result.changes.completed.join(', ')}`)
  if (result.changes.blocked.length > 0) parts.push(`Blocked: ${result.changes.blocked.join(', ')}`)
  if (result.changes.removed_from_top_five.length > 0) {
    parts.push(`Removed: ${result.changes.removed_from_top_five.join(', ')}`)
  }
  return parts.length > 0 ? parts.join(' ') : 'No prior rank movement is available.'
}

export function decisionSummary(result) {
  const blocked = result.buckets.BLOCKED.map(
    (item) => `${item.id}: ${item.classification_reason}`
  )
  const clarify = result.buckets.CLARIFY.map(
    (item) => `${item.id}: ${item.classification_reason}`
  )
  return [...blocked, ...clarify]
}

export function backlogMarkdown(result) {
  const decisions = decisionSummary(result)
  const parkedNoise = [...result.buckets.PARKED, ...result.buckets.NOISE]
  return [
    `# Backlog Heartbeat ${result.pacific_date}`,
    '',
    `Status: ${result.status}`,
    '',
    `Active objectives: ${result.active_objectives.join('; ') || 'MISSING'}`,
    '',
    ownerLaneMarkdown('KP', result.lanes.KP, result.open_capacity.KP),
    '',
    ownerLaneMarkdown('Rory', result.lanes.Rory, result.open_capacity.Rory),
    '',
    '## Changes',
    '',
    `* ${changeSummary(result)}`,
    '',
    '## Needs decision',
    '',
    ...(decisions.length > 0 ? decisions.map((item) => `* ${item}`) : ['* None.']),
    '',
    `## Parked and noise (${parkedNoise.length})`,
    '',
    ...(parkedNoise.length > 0
      ? parkedNoise.map((item) => `* ${item.id}: ${item.classification_reason}`)
      : ['* None.'])
  ].join('\n') + '\n'
}
