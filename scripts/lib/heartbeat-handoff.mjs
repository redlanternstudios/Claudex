function field(text, name) {
  const match = text.match(new RegExp(`^${name}:\\s*(.+)$`, 'mi'))
  return match?.[1]?.trim() ?? 'UNKNOWN'
}

function section(text, name) {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const match = text.match(new RegExp(`^## ${escaped}\\s*\\n+([\\s\\S]*?)(?=^## |\\s*$)`, 'mi'))
  return match?.[1]?.trim().replace(/\s+/g, ' ') ?? 'UNKNOWN'
}

function title(value) {
  return String(value ?? '')
    .replace(/[_-]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export function parseHeartbeatReceipt(text) {
  return {
    product: field(text, 'Product'),
    author: field(text, 'Author'),
    intent: field(text, 'Intent'),
    result: field(text, 'Result'),
    next_action: section(text, 'Next action')
  }
}

export function buildKpRoryHandoff({ receiptPath, receiptText, previousReceipt, roryTask }) {
  const receipt = parseHeartbeatReceipt(receiptText)
  const preciseName = `${title(receipt.product)} ${receipt.intent}`.trim()
  const movement = receiptPath === previousReceipt ? 'SAME HANDOFF' : 'NEW HANDOFF'
  const roryAction = roryTask?.next_action ?? `Continue from KP's stopping point: ${receipt.next_action}`
  const doneProof = roryTask?.definition_of_done ?? 'Rory records a receipt naming what he changed, where he stopped, and the next owner action.'
  return {
    precise_name: preciseName,
    author: receipt.author,
    result: receipt.result,
    evidence: receiptPath,
    left_off: receipt.next_action,
    rory_action: roryAction,
    done_proof: doneProof,
    movement
  }
}

export function handoffMarkdown(handoff) {
  return `## KP to Rory handoff

* What KP did: ${handoff.precise_name}. Result: ${handoff.result}.
* Evidence: ${handoff.evidence}. Author: ${handoff.author}.
* Where KP left off: ${handoff.left_off}
* Message to Rory: ${handoff.rory_action}
* Rory is done when: ${handoff.done_proof}
* Handoff movement: ${handoff.movement}.`
}
