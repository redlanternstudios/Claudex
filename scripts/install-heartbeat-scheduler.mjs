#!/usr/bin/env node
import { execFileSync } from 'node:child_process'
import { homedir } from 'node:os'
import { join } from 'node:path'
import { mkdirSync, writeFileSync } from 'node:fs'
import { ROOT } from './lib/bridge-core.mjs'

const label = 'com.redlantern.claudex.heartbeat'
const launchAgents = join(homedir(), 'Library', 'LaunchAgents')
const plistPath = join(launchAgents, `${label}.plist`)
const nodePath = process.execPath
const scriptPath = join(ROOT, 'scripts', 'heartbeat.mjs')
const logPath = join(homedir(), 'Library', 'Logs', 'claudex-heartbeat.log')
const plist = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>${label}</string>
  <key>ProgramArguments</key>
  <array>
    <string>${nodePath}</string>
    <string>${scriptPath}</string>
  </array>
  <key>WorkingDirectory</key>
  <string>${ROOT}</string>
  <key>StartCalendarInterval</key>
  <dict>
    <key>Minute</key>
    <integer>5</integer>
  </dict>
  <key>RunAtLoad</key>
  <true/>
  <key>StandardOutPath</key>
  <string>${logPath}</string>
  <key>StandardErrorPath</key>
  <string>${logPath}</string>
</dict>
</plist>
`

mkdirSync(launchAgents, { recursive: true })
writeFileSync(plistPath, plist, { mode: 0o600 })
try {
  execFileSync('launchctl', ['bootout', `gui/${process.getuid()}`, plistPath], { stdio: 'ignore' })
} catch {}
try {
  execFileSync('launchctl', ['bootstrap', `gui/${process.getuid()}`, plistPath], { stdio: 'inherit' })
  console.log(`Installed and started ${label}`)
} catch {
  console.log(`Wrote ${plistPath}. The service may already be loaded.`)
}
