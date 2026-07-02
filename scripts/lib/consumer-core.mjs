export const START = '<!-- CLAUDEX:START -->'
export const END = '<!-- CLAUDEX:END -->'

export function managedBlock(productKey) {
  return `${START}
# Claudex Bridge Boot

Before product instructions:

1. Read \`.claudex.json\`.
2. Resolve \`local_bridge_path\`. If unavailable, use \`bridge_repo\`, \`bridge_ref\`, and \`bridge_file\`.
3. Read the canonical bridge, protocol, alignment policy, current intent, and latest receipt.
4. Select product key \`${productKey}\`.
5. Use the worse of global and product sync colors.
6. RED means stop. YELLOW means continue with the warning. GREEN means continue.
7. Never create a product local bridge or copy secret values.

${END}`
}

export function upsertManagedBlock(existing, block) {
  const start = existing.indexOf(START)
  const end = existing.indexOf(END)
  if (start >= 0 && end >= start) {
    const after = end + END.length
    return `${existing.slice(0, start)}${block}${existing.slice(after)}`.trimEnd() + '\n'
  }
  if (existing.trim() === '') return `${block}\n`
  return `${block}\n\n${existing.trimStart().trimEnd()}\n`
}
