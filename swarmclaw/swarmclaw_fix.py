#!/usr/bin/env python3
"""
swarmclaw_fix.py — v1.0 | 2026-06-12
Remove rogue credentials + re-route all Anthropic-model agents to DeepSeek/Groq
Run from SwarmClaw repo root: python3 swarmclaw_fix.py [--dry-run]
"""
import sqlite3, glob, os, sys, json

DRY_RUN = '--dry-run' in sys.argv

# ── Model maps ─────────────────────────────────────────────────────────────────
ANTHROPIC_PATTERNS = [
    'claude-opus', 'claude-sonnet', 'claude-haiku', 'claude-3',
    'claude-fable', 'anthropic/', 'claude-instant',
]
REASONING_AGENTS = {'TRUTH', 'SECURITY', 'CHANGE', 'ARCHITECT', 'REVIEWER'}
ROGUE_CRED_IDS   = ('cred_fad53d7bd70e', 'cred_eca721efc2b9')  # Both "OpenAI (deepseek)" fakes

# ── Find database ──────────────────────────────────────────────────────────────
CANDIDATES = [
    'prisma/dev.db', 'dev.db', 'data.db', 'swarmclaw.db',
    '.data/dev.db', 'db/dev.db', 'database.db', 'local.db',
]
db_path = None
for c in CANDIDATES:
    if os.path.exists(c):
        db_path = c
        break

if not db_path:
    hits = glob.glob('./**/*.db', recursive=True) + glob.glob('./**/*.sqlite', recursive=True)
    hits = [h for h in hits if 'node_modules' not in h]
    if hits:
        db_path = hits[0]

if not db_path:
    print("❌  No database found. Run from SwarmClaw repo root.")
    print("    Searching in:", os.getcwd())
    print("    Try: find . -name '*.db' -not -path '*/node_modules/*'")
    sys.exit(1)

print(f"{'[DRY RUN] ' if DRY_RUN else ''}✓ Database: {db_path}")
con = sqlite3.connect(db_path)
cur = con.cursor()

tables = [t[0] for t in cur.execute("SELECT name FROM sqlite_master WHERE type='table'").fetchall()]
print(f"  Tables: {tables}\n")

# ── Step 1: Delete rogue credentials ──────────────────────────────────────────
print("── Step 1: Rogue credentials ─────────────────────────────────────────────")
for cred_table in ['Credential', 'credential', 'credentials', 'ApiKey', 'api_key']:
    if cred_table not in tables and cred_table.lower() not in [t.lower() for t in tables]:
        continue
    actual = next((t for t in tables if t.lower() == cred_table.lower()), cred_table)
    try:
        rows = cur.execute(f'SELECT id, name, type FROM "{actual}"').fetchall()
        print(f"  All credentials ({actual}):")
        for r in rows:
            flag = " ← ROGUE" if r[0] in ROGUE_CRED_IDS else ""
            print(f"    {r}{flag}")

        for rid in ROGUE_CRED_IDS:
            if not DRY_RUN:
                cur.execute(f'DELETE FROM "{actual}" WHERE id = ?', (rid,))
                if cur.rowcount:
                    print(f"  ✓ Deleted: {rid}")
            else:
                exists = cur.execute(f'SELECT id FROM "{actual}" WHERE id = ?', (rid,)).fetchone()
                if exists:
                    print(f"  [DRY] Would delete: {rid}")
        break
    except sqlite3.OperationalError as e:
        print(f"  Skip {cred_table}: {e}")

# ── Step 2: Re-route Anthropic-model agents ────────────────────────────────────
print("\n── Step 2: Agent re-routing (Anthropic → DeepSeek) ─────────────────────────")
for agent_table in ['Agent', 'agent', 'agents']:
    actual = next((t for t in tables if t.lower() == agent_table.lower()), None)
    if not actual:
        continue
    try:
        # Check columns
        cols = [c[1] for c in cur.execute(f'PRAGMA table_info("{actual}")').fetchall()]
        print(f"  Agent columns: {cols}")

        # Try common column name patterns
        name_col  = next((c for c in cols if c.lower() in ['name', 'agentname', 'agent_name']), None)
        model_col = next((c for c in cols if c.lower() in ['model', 'modelid', 'model_id', 'llm']), None)
        id_col    = next((c for c in cols if c.lower() == 'id'), 'id')

        if not name_col or not model_col:
            print(f"  ⚠️  Can't find name/model columns in {actual}. Cols: {cols}")
            # Print first 3 rows raw
            sample = cur.execute(f'SELECT * FROM "{actual}" LIMIT 3').fetchall()
            for s in sample:
                print(f"    {s}")
            break

        rows = cur.execute(f'SELECT {id_col}, {name_col}, {model_col} FROM "{actual}"').fetchall()
        print(f"\n  All agents ({len(rows)} total):")
        updated = 0
        for aid, name, model in rows:
            is_anthropic = model and any(p in str(model).lower() for p in ANTHROPIC_PATTERNS)
            target = 'deepseek-reasoner' if str(name).upper() in REASONING_AGENTS else 'deepseek-chat'
            status = f"→ {target}" if is_anthropic else "OK"
            print(f"    {str(name):<22} {str(model):<45} {status}")
            if is_anthropic:
                if not DRY_RUN:
                    cur.execute(f'UPDATE "{actual}" SET {model_col} = ? WHERE {id_col} = ?', (target, aid))
                updated += 1
        print(f"\n  {'[DRY] Would update' if DRY_RUN else 'Updated'} {updated} agents off Anthropic")
        break
    except sqlite3.OperationalError as e:
        print(f"  Skip {agent_table}: {e}")

if not DRY_RUN:
    con.commit()
    print("\n✓ Committed. Restart SwarmClaw (or reload agents) for changes to take effect.")
else:
    print("\n[DRY RUN complete — no changes written. Remove --dry-run to apply.]")

con.close()
