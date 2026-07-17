#!/usr/bin/env node
import { routeArtifact, validateContentRouting } from './lib/content-routing.mjs'

const [command = 'validate', ...args] = process.argv.slice(2)

function option(name) {
  const prefix = `--${name}=`
  return args.find((value) => value.startsWith(prefix))?.slice(prefix.length)
}

try {
  if (command === 'validate') {
    const result = validateContentRouting()
    console.log(JSON.stringify(result, null, 2))
    if (!result.passed) process.exitCode = 2
  } else if (command === 'route') {
    const result = routeArtifact({
      type: option('type'),
      product: option('product'),
      topic: option('topic'),
      date: option('date'),
      time: option('time')
    })
    console.log(JSON.stringify(result, null, 2))
  } else {
    throw new Error(`unknown command: ${command}`)
  }
} catch (error) {
  console.error(`CONTENT ROUTING BLOCKED: ${error.message}`)
  process.exitCode = 2
}
