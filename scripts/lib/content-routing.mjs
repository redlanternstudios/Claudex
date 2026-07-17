import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './bridge-core.mjs'

export const CONTENT_ROUTING_PATH = join(ROOT, 'OPS', 'CONTENT_ROUTING_REGISTRY.json')

export function readContentRouting(path = CONTENT_ROUTING_PATH) {
  return JSON.parse(readFileSync(path, 'utf8'))
}

function words(value) {
  return String(value ?? '')
    .normalize('NFKD')
    .replace(/[’']/g, '')
    .replace(/&/g, ' and ')
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
}

function titleCase(parts) {
  return parts.map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()).join(' ')
}

function tokens(product, topic, date) {
  const productWords = words(product)
  const topicWords = words(topic)
  return {
    productWords,
    topicWords,
    values: {
      product_kebab: productWords.join('-').toLowerCase(),
      product_snake: productWords.join('_').toLowerCase(),
      product_upper: productWords.join('_').toUpperCase(),
      topic_kebab: topicWords.join('-').toLowerCase(),
      topic_snake: topicWords.join('_').toLowerCase(),
      topic_upper: topicWords.join('_').toUpperCase(),
      date_iso: date,
      date_compact: date.replaceAll('-', '')
    }
  }
}

function render(pattern, values) {
  return pattern.replace(/\{([a-z_]+)\}/g, (_, key) => {
    if (!values[key]) throw new Error(`unresolved naming token: ${key}`)
    return values[key]
  })
}

export function validateContentRouting(registry = readContentRouting()) {
  const errors = []
  const requiredFields = [
    'artifact_id',
    'precise_name',
    'artifact_type',
    'product',
    'topic',
    'canonical_path',
    'source_authority',
    'downstream_consumers',
    'acceptance_evidence'
  ]
  for (const field of requiredFields) {
    if (!registry.manifest_fields?.includes(field)) errors.push(`manifest field missing: ${field}`)
  }
  if (!registry.authority || !existsSync(join(ROOT, registry.authority))) {
    errors.push(`authority path missing: ${registry.authority ?? 'UNKNOWN'}`)
  }
  const types = registry.artifact_types ?? {}
  for (const [type, spec] of Object.entries(types)) {
    if (!spec.label) errors.push(`${type}: label missing`)
    if (!spec.source_authority) errors.push(`${type}: source authority missing`)
    if (!Array.isArray(spec.downstream_consumers) || spec.downstream_consumers.length === 0) {
      errors.push(`${type}: downstream consumers missing`)
    }
    if (!spec.acceptance_evidence) errors.push(`${type}: acceptance evidence missing`)
    const routeCount = Number(Boolean(spec.fixed_path)) + Number(Boolean(spec.command_owned)) + Number(Boolean(spec.folder && spec.filename_pattern))
    if (routeCount !== 1) errors.push(`${type}: define exactly one fixed, command owned, or patterned route`)
  }
  return { passed: errors.length === 0, errors }
}

export function routeArtifact({ type, product, topic, date }, registry = readContentRouting()) {
  const spec = registry.artifact_types?.[type]
  if (!spec) throw new Error(`unknown artifact type: ${type}`)
  const normalizedDate = String(date ?? '')
  if (!/^\d{4}-\d{2}-\d{2}$/.test(normalizedDate)) throw new Error('date must be YYYY-MM-DD')

  const tokenSet = tokens(product, topic, normalizedDate)
  if (tokenSet.productWords.length === 0) throw new Error('product or system name is required')
  if (tokenSet.topicWords.length === 0) throw new Error('topic is required')
  if (tokenSet.topicWords.length > 8) throw new Error('topic must contain no more than eight precise words')
  const rejected = new Set((registry.generic_names_rejected ?? []).map((item) => item.toLowerCase()))
  if (tokenSet.topicWords.every((word) => rejected.has(word.toLowerCase()))) {
    throw new Error(`generic topic rejected: ${topic}`)
  }
  if (spec.command_owned) {
    throw new Error(`${type} naming is command owned; use its canonical protocol instead of inventing a filename`)
  }

  const canonicalPath = spec.fixed_path
    ? spec.fixed_path
    : join(render(spec.folder, tokenSet.values), render(spec.filename_pattern, tokenSet.values))
  const typeLabel = spec.label
  const preciseName = `${titleCase(tokenSet.productWords)} ${titleCase(tokenSet.topicWords)} ${typeLabel}`
  const artifactId = `${tokenSet.values.product_kebab}:${type}:${tokenSet.values.topic_kebab}`

  return {
    artifact_id: artifactId,
    precise_name: preciseName,
    artifact_type: type,
    product: titleCase(tokenSet.productWords),
    topic: titleCase(tokenSet.topicWords),
    canonical_path: canonicalPath,
    source_authority: spec.source_authority,
    downstream_consumers: spec.downstream_consumers,
    acceptance_evidence: spec.acceptance_evidence,
    collision: existsSync(join(ROOT, canonicalPath))
  }
}
