# By Red, LLC — Company Architecture Diagram

Canonical deliverable (branded 2 page PDF, landscape, diagram first):
https://drive.google.com/file/d/1vPlz3OtWPpWVEaXclekO6oDd9Fs5cVZR/view
Drive location: RedLantern Studios - Internal Dox / BY_RED_LLC_ARCHITECTURE.pdf

Local copies (untracked by design, repo excludes pdf/html binaries):
- BY_RED_LLC_ARCHITECTURE.pdf (repo root, workspace only)
- BY_RED_LLC_ARCHITECTURE.html (build artifact)

## Contents
- Page 1: By Red, LLC (Colorado 20151007791, Good Standing) -> RedLantern Studios (9 product nodes), By Red Ops (Daily OS), Paradise Property Services (BLOCKED). DBA connectors labeled PENDING.
- Page 2: Shared platform (GitHub, SwarmClaw, RobbyPA, Claude Code, Ollama LOCKED, Vercel, Supabase x3 with project IDs, Stripe, Capacitor, Obsidian) + team map (Ro, Homira, Basheer, Keymon, Bilal, Mohamed Jr., Jah Jah, Paul).
- Truth badges on every node. Statuses as of 2026-07-07 from memory index. Clarity = UNKNOWN.

## Regenerate
1. `python3 -c "import base64; print(base64.b64encode(open('rls_logo_v2.png','rb').read()).decode())" > logo_b64.txt`
2. `pip install weasyprint` then run `python3 scripts/build_byred_arch.py` from a directory containing logo_b64.txt
3. Outputs BY_RED_LLC_ARCHITECTURE.html + .pdf

Receipt: TC-20260707-014
