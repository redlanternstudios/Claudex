export function classifyAlignment({ local, remote, base, dirty }) {
  if (!local || !remote) {
    return {
      relation: 'UNKNOWN',
      color: 'YELLOW',
      action: 'Verify local and remote Git references.'
    }
  }
  if (local === remote) {
    return {
      relation: 'ALIGNED',
      color: dirty ? 'YELLOW' : 'GREEN',
      action: dirty
        ? 'Preserve local work and continue only within the current lane.'
        : 'Continue from the bridge next action.'
    }
  }
  if (base === local) {
    return {
      relation: 'BEHIND',
      color: dirty ? 'YELLOW' : 'YELLOW',
      action: dirty
        ? 'Do not merge. Finish or preserve local work, then fast forward.'
        : 'Fast forward to origin main and rerun the bridge doctor.'
    }
  }
  if (base === remote) {
    return {
      relation: 'AHEAD',
      color: 'YELLOW',
      action: 'Validate, receipt, and push the local commits.'
    }
  }
  return {
    relation: 'DIVERGED',
    color: 'RED',
    action: 'Stop continuation. Fetch, inspect both histories, reconcile, test, receipt, and push without force.'
  }
}
