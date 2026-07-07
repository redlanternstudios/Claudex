# PUSH TRANSPORT — closing the sandbox to GitHub gap
Date: 2026-07-07 · Decision: Ro (via Cowork session) · Status: BUILT, awaiting one time install
Receipt: see OPS/receipts/INDEX.md entry for this change

## The problem

Heartbeat and Cowork sessions commit inside a sandbox that has no GitHub credentials. Codex and
Keymon read GitHub. Every hour Ro does not push, the truth they can see decays — on 2026-07-06
remote fell 12 commits behind and histories diverged. The manual fix (Ro pushes when he remembers)
makes Ro the transport layer of his own studio.

## CTP — the options

**Prompt contract.** GOAL: commits made anywhere in this repo reach origin within minutes with no
recurring human step. CONSTRAINTS: no new secret surface, never force, nothing that can fight the
heartbeat's reconcile. FAILURE: any design that stores a token inside the vault folder, or that
can push a diverged history.

**Option A — push credential in the sandbox context.** A PAT or token file the heartbeat can read.
Rejected: it creates a new secret inside the vault folder (the exact pattern already flagged on
API_KEY_VAULT.md), needs expiry management, and grants write credentials to every process that can
read the mount. Fails the no new secret surface constraint.

**Option B — push from the credentialed machine (CHOSEN).** The host Mac already pushes this repo
today using the macOS keychain. A launchd agent runs a guarded script every 10 minutes: fetch,
and push only when strictly ahead and not diverged. No new credentials exist anywhere. If the Mac
is asleep, the sandbox is asleep too — the transport window matches the write window by design.

**Option C — GitHub App / CI mirror.** Correct for a team of ten, overbuilt for a team of two.
Rejected on ease of use.

**Pass 3 check.** The dangerous failure mode of automation here is a forced or diverged push
destroying the heartbeat's hand merge work. The script therefore refuses to act on divergence
(heartbeat owns reconciliation), refuses to act during any git or bridge lock, never pulls, and
never touches the working tree. Worst case on any failure is the status quo: local ahead, remote
stale, one log line saying why.

## The pieces

| File | Role |
|---|---|
| `scripts/host/claudex_autopush.sh` | Guarded push: ahead and clean → push; diverged / locked / offline → skip and log |
| `scripts/host/com.redlantern.claudex.autopush.plist` | launchd agent, every 10 minutes + at login |
| `scripts/host/install_autopush.sh` | One time install (or `--uninstall`) |
| `~/Library/Logs/claudex_autopush.log` | What happened, one line per action, self trimming |

## Install (Ro, once, on the host Mac — Terminal)

    bash "/Users/rorysemeah/Documents/Claude/Projects/RedLantern Studios/scripts/host/install_autopush.sh"

## What changes for each person

**Ro:** stops being the transport layer. No more hourly "push from your Mac" asks — the digest
only mentions push if the agent itself reports a credential failure.
**Keymon:** nothing to learn. GitHub is simply fresh within ~10 minutes of any engine's work.
**Codex:** boots from a remote that matches local; the "local is canonical until Ro pushes"
caveat retires once the agent is verified running.
**Heartbeat:** keeps attempting its own push (harmless); its divergence reconcile duty is unchanged.

## Verification (first day)

1. After install, `tail -5 ~/Library/Logs/claudex_autopush.log` shows a PUSHED or in sync run.
2. Next heartbeat digest should report remote as fresh instead of behind.
3. The standing YELLOW "local ahead of origin" condition clears on its own and stays clear.
