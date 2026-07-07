#!/bin/bash
# Claudex autopush — runs on Ro's host Mac via launchd. Closes the transport gap:
# heartbeat and Cowork sessions commit in the sandbox, this pushes within minutes
# using the credentials already in the macOS keychain. No new secrets anywhere.
#
# Safety posture (matches OPS/BRIDGE_PROTOCOL.md):
#   push only when strictly AHEAD and not diverged (fast forward on the remote)
#   never force, never pull, never merge, never touch the working tree
#   skip silently when a merge/rebase is in progress or a bridge write lock exists
# Decision record: OPS/PUSH_TRANSPORT.md

set -u
REPO="/Users/rorysemeah/Documents/Claude/Projects/RedLantern Studios"
LOG="$HOME/Library/Logs/claudex_autopush.log"
STAMP="$(date '+%Y-%m-%d %H:%M:%S')"

log() { echo "$STAMP $1" >> "$LOG"; }

# keep the log from growing forever
if [ -f "$LOG" ] && [ "$(wc -l < "$LOG")" -gt 2000 ]; then
  tail -n 500 "$LOG" > "$LOG.tmp" && mv "$LOG.tmp" "$LOG"
fi

cd "$REPO" || { log "SKIP repo path missing"; exit 0; }

# never act mid write: bridge lock or git operation in progress
[ -f "OPS/BRIDGE.lock" ] && { log "SKIP bridge lock present"; exit 0; }
[ -d ".git/rebase-merge" ] || [ -d ".git/rebase-apply" ] && { log "SKIP rebase in progress"; exit 0; }
[ -f ".git/MERGE_HEAD" ] && { log "SKIP merge in progress"; exit 0; }
[ -f ".git/index.lock" ] && { log "SKIP git index lock present"; exit 0; }

git fetch origin --quiet 2>> "$LOG" || { log "SKIP fetch failed (offline?)"; exit 0; }

AHEAD=$(git rev-list --count origin/main..main 2>/dev/null || echo 0)
BEHIND=$(git rev-list --count main..origin/main 2>/dev/null || echo 0)

if [ "$AHEAD" -gt 0 ] && [ "$BEHIND" -eq 0 ]; then
  if git push origin main --quiet 2>> "$LOG"; then
    log "PUSHED $AHEAD commit(s)"
  else
    log "FAIL push rejected or credentials missing — Ro should push manually once and check keychain"
  fi
elif [ "$AHEAD" -gt 0 ] && [ "$BEHIND" -gt 0 ]; then
  log "SKIP diverged ($AHEAD ahead / $BEHIND behind) — heartbeat owns reconciliation, never forcing"
fi
# in sync or behind only: nothing to do, stay silent
exit 0
