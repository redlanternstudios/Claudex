#!/bin/bash
# One time installer for Claudex autopush. Run ON THE HOST MAC (not in a sandbox):
#   bash "/Users/rorysemeah/Documents/Claude/Projects/RedLantern Studios/scripts/host/install_autopush.sh"
# Uninstall:
#   bash ".../install_autopush.sh" --uninstall

set -euo pipefail
REPO="/Users/rorysemeah/Documents/Claude/Projects/RedLantern Studios"
LABEL="com.redlantern.claudex.autopush"
PLIST_SRC="$REPO/scripts/host/$LABEL.plist"
PLIST_DST="$HOME/Library/LaunchAgents/$LABEL.plist"

if [ "${1:-}" = "--uninstall" ]; then
  launchctl bootout "gui/$(id -u)/$LABEL" 2>/dev/null || true
  rm -f "$PLIST_DST"
  echo "Autopush removed."
  exit 0
fi

chmod +x "$REPO/scripts/host/claudex_autopush.sh"
mkdir -p "$HOME/Library/LaunchAgents"
cp "$PLIST_SRC" "$PLIST_DST"
launchctl bootout "gui/$(id -u)/$LABEL" 2>/dev/null || true
launchctl bootstrap "gui/$(id -u)" "$PLIST_DST"

echo "Autopush installed — Claudex now pushes itself every 10 minutes when ahead and clean."
echo "Verify:   tail -5 ~/Library/Logs/claudex_autopush.log   (after the first run)"
echo "Remove:   bash \"$REPO/scripts/host/install_autopush.sh\" --uninstall"
