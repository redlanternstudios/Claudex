#!/usr/bin/env python3
"""
set_deepseek_routing.py
SwarmClaw — DeepSeek Model Routing Script
Version: 1.0 | Created: 2026-06-12 | Owner: Ro / RUNTIME

PURPOSE:
  Sets important SwarmClaw agents to DeepSeek models.
  Leaves low-priority agents on Groq scout (cheaper, no wasted cost).

DEEPSEEK MODEL LOGIC:
  deepseek-reasoner  → DeepSeek R1 — chain-of-thought reasoning
                        Use for: agents that make high-stakes judgments
                        (TRUTH, SECURITY, ARCHITECT, REVIEWER, CHANGE)

  deepseek-chat      → DeepSeek V3 — fast, smart, general intelligence
                        Use for: coordination, routing, build execution
                        (ROBBY, SUPERVISOR, RUNTIME, CHIEF_OF_STAFF, PM, BACKEND, FRONTEND)

PROVIDER:
  DeepSeek direct API: https://api.deepseek.com
  - Set DEEPSEEK_API_KEY in your SwarmClaw env
  - Or route via OpenRouter: use "deepseek/deepseek-reasoner" / "deepseek/deepseek-chat"

RUN:
  python3 swarmclaw/set_deepseek_routing.py
  python3 swarmclaw/set_deepseek_routing.py --dry-run   (preview only, no writes)
  python3 swarmclaw/set_deepseek_routing.py --revert    (restore all to Groq defaults)
"""

import json
import sys
import shutil
from datetime import datetime
from pathlib import Path

# ── CONFIG ───────────────────────────────────────────────────────────────────

ORG_CHART_PATH = Path(__file__).parent / "RL_ORG_CHART_LIVE.json"
BACKUP_PATH    = Path(__file__).parent / f"RL_ORG_CHART_LIVE.backup_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"

# DeepSeek model IDs
# Swap prefix to "deepseek/" if routing through OpenRouter instead of direct API
DEEPSEEK_R1   = "deepseek-reasoner"   # R1 — chain-of-thought, high-stakes decisions
DEEPSEEK_V3   = "deepseek-chat"       # V3 — fast general intelligence, coordination

# Groq defaults (used for revert)
GROQ_MAVERICK = "meta-llama/llama-4-maverick-17b-128e-instruct"
GROQ_SCOUT    = "meta-llama/llama-4-scout-17b-16e-instruct"

# ── ROUTING MAP ──────────────────────────────────────────────────────────────
#
# DEEPSEEK-R1  → Reasoning-critical agents. Wrong output = real damage.
#                These need to think, not just respond.
#
# DEEPSEEK-V3  → Coordination + execution agents. Need speed + judgment.
#                Quality matters but throughput matters too.
#
# GROQ SCOUT   → Everything else. Low-stakes, high-volume, cheap.
#
DEEPSEEK_ROUTING = {

    # ── T0: GOVERNANCE SPINE — R1 for judgment, V3 for routing ───────────────
    "ROBBY":          DEEPSEEK_V3,   # Conductor: routes fast, needs judgment
    "SUPERVISOR":     DEEPSEEK_V3,   # Org oversight: coordination
    "RUNTIME":        DEEPSEEK_V3,   # CTO: system state decisions
    "CHIEF_OF_STAFF": DEEPSEEK_V3,   # COO: intent translation, ops

    "TRUTH":          DEEPSEEK_R1,   # Bar Raiser: cannot be wrong, must reason deeply
    "SECURITY":       DEEPSEEK_R1,   # Security review: high-stakes, catch subtle issues
    "CHANGE":         DEEPSEEK_R1,   # Change mgmt: every prod change needs careful review

    # ── T1: BUILD CORE ────────────────────────────────────────────────────────
    "ARCHITECT":      DEEPSEEK_R1,   # System design: complex trade-off reasoning
    "REVIEWER":       DEEPSEEK_R1,   # Code review: catch bugs, enforce standards
    "PM":             DEEPSEEK_V3,   # Product mgmt: judgment + speed
    "BACKEND":        DEEPSEEK_V3,   # Engineering: build execution
    "FRONTEND":       DEEPSEEK_V3,   # Engineering: build execution

    # ── STAYS ON GROQ SCOUT (not set here — leave as-is) ────────────────────
    # LIBRARIAN, TECHWRITER, DESIGNER, RESEARCHER, DATA
    # QA, DEPLOY, SRE
    # MARKETING, BRAND_COPY, ASO_SEO, SUPPORT
    # LEGAL, FINANCE, SALES, PEOPLE_ROSTER
    # CONTENT_SOURCING, SCHOLARLY_REVIEW, EDITORIAL
    # DEBUG, ACCESSIBILITY, ANALYTICS, HANDOFF, OBSERVE
}

# ── REVERT MAP ───────────────────────────────────────────────────────────────
GROQ_REVERT = {name: GROQ_MAVERICK for name in DEEPSEEK_ROUTING}

# ── FUNCTIONS ─────────────────────────────────────────────────────────────────

def load_org_chart():
    with open(ORG_CHART_PATH) as f:
        return json.load(f)

def save_org_chart(data):
    with open(ORG_CHART_PATH, "w") as f:
        json.dump(data, f, indent=2)

def apply_routing(data, routing_map, dry_run=False):
    agents = data.get("agents", [])
    updated = []
    skipped = []

    for agent in agents:
        name = agent.get("name", "")
        if name in routing_map:
            old_model = agent.get("model", "NONE")
            new_model = routing_map[name]
            if old_model != new_model:
                if not dry_run:
                    agent["model"] = new_model
                    agent["model_updated"] = datetime.now().strftime("%Y-%m-%d")
                    agent["model_updated_by"] = "set_deepseek_routing.py"
                updated.append((name, old_model, new_model))
            else:
                skipped.append((name, old_model, "already set"))

    return updated, skipped

def print_report(updated, skipped, dry_run):
    tag = "[DRY RUN] " if dry_run else ""

    print(f"\n{'═'*65}")
    print(f"  {tag}DEEPSEEK ROUTING — AGENT MODEL UPDATES")
    print(f"{'═'*65}\n")

    if updated:
        print(f"  {'AGENT':<22} {'OLD MODEL':<35} NEW MODEL")
        print(f"  {'-'*62}")
        for name, old, new in updated:
            old_short = old.split("/")[-1] if "/" in old else old
            print(f"  {name:<22} {old_short:<35} {new}")
    else:
        print("  No model changes needed.")

    if skipped:
        print(f"\n  Already correct ({len(skipped)} agents): {', '.join(n for n,_,_ in skipped)}")

    print(f"\n  {'─'*62}")
    print(f"  Total updated: {len(updated)} | Skipped (no change): {len(skipped)}")
    if dry_run:
        print(f"\n  [DRY RUN] No files written. Remove --dry-run to apply.")
    else:
        print(f"\n  ✓ RL_ORG_CHART_LIVE.json updated.")
        print(f"  ✓ Backup saved to: {BACKUP_PATH.name}")
    print(f"{'═'*65}\n")

# ── MAIN ─────────────────────────────────────────────────────────────────────

def main():
    dry_run = "--dry-run" in sys.argv
    revert  = "--revert"  in sys.argv

    routing_map = GROQ_REVERT if revert else DEEPSEEK_ROUTING

    if revert:
        print("\n  MODE: REVERT — restoring all agents to Groq maverick defaults")
    elif dry_run:
        print("\n  MODE: DRY RUN — preview only")
    else:
        print("\n  MODE: APPLY — writing changes")

    # Backup before any write
    if not dry_run:
        shutil.copy(ORG_CHART_PATH, BACKUP_PATH)

    data = load_org_chart()

    # Update meta
    if not dry_run:
        data["meta"]["version"] = "2.2" if not revert else "2.1"
        data["meta"]["last_updated"] = datetime.now().strftime("%Y-%m-%d")
        data["meta"]["updated_by"] = "set_deepseek_routing.py"
        data["meta"]["change"] = (
            "DeepSeek routing applied to T0/T1 agents" if not revert
            else "Reverted to Groq defaults"
        )

    updated, skipped = apply_routing(data, routing_map, dry_run=dry_run)
    print_report(updated, skipped, dry_run)

    if not dry_run:
        save_org_chart(data)

if __name__ == "__main__":
    main()
