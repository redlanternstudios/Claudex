#!/usr/bin/env node
import { backlogMarkdown, rankBacklog, readBacklog } from './lib/backlog-core.mjs'

const [command = 'status', ...args] = process.argv.slice(2)
const backlog = readBacklog()
const heartbeatAt = args.find((value) => value.startsWith('--at='))?.slice(5)
const result = rankBacklog(backlog, { heartbeatAt })

if (command === 'status') {
  console.log(backlogMarkdown(result))
} else if (command === 'json') {
  console.log(JSON.stringify(result, null, 2))
} else if (command === 'validate') {
  console.log(JSON.stringify({ status: result.status, integrity: result.integrity, issues: result.issues }, null, 2))
  if (result.status === 'BLOCKED') process.exitCode = 2
} else {
  console.error(`Unknown command: ${command}`)
  process.exitCode = 2
}
