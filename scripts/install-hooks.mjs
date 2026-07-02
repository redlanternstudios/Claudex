#!/usr/bin/env node
import { execFileSync } from 'node:child_process'
import { chmodSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './lib/bridge-core.mjs'

for (const name of ['post-checkout', 'post-commit', 'post-merge', 'pre-push']) {
  chmodSync(join(ROOT, '.githooks', name), 0o755)
}
execFileSync('git', ['config', 'core.hooksPath', '.githooks'], { cwd: ROOT, stdio: 'inherit' })
console.log('Claudex Git hooks installed.')
