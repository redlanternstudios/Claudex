#!/usr/bin/env python3
"""
set_ollama_all.py
SwarmClaw — local only model routing
Version: 1.0 | Created: 2026-07-08 | Owner: Ro / RUNTIME

Purpose:
  Re apply the live SwarmClaw org chart so every agent defaults to local Ollama.
  This is the cost control path. Paid providers stay out unless Ro adds an explicit exception lane.

Run:
  python3 swarmclaw/set_ollama_all.py
  python3 swarmclaw/set_ollama_all.py --dry-run
"""

from __future__ import annotations

import json
import shutil
import sys
from datetime import datetime
from pathlib import Path

ORG_CHART_PATH = Path(__file__).parent / "RL_ORG_CHART_LIVE.json"
BACKUP_PATH = Path(__file__).parent / f"RL_ORG_CHART_LIVE.backup_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
OLLAMA_MODEL = "llama3.1:8b"


def load_org_chart() -> dict:
    with ORG_CHART_PATH.open() as handle:
        return json.load(handle)


def save_org_chart(data: dict) -> None:
    with ORG_CHART_PATH.open("w") as handle:
        json.dump(data, handle, indent=2)
        handle.write("\n")


def route_all_to_local(data: dict, dry_run: bool = False):
    agents = data.get("agents", [])
    updated = []

    for agent in agents:
        name = agent.get("name", "UNKNOWN")
        old = (
            agent.get("provider"),
            agent.get("model"),
            agent.get("primary_model"),
            agent.get("fallback_model"),
            agent.get("secondary_provider"),
            agent.get("secondary_model"),
        )

        new_state = {
            "provider": "ollama",
            "model": OLLAMA_MODEL,
            "primary_model": OLLAMA_MODEL,
            "fallback_model": OLLAMA_MODEL,
            "fallback_provider": "ollama",
            "secondary_provider": None,
            "secondary_model": None,
            "model_updated": datetime.now().strftime("%Y-%m-%d"),
            "model_updated_by": "set_ollama_all.py v1.0",
        }

        changed = False
        for key, value in new_state.items():
            if agent.get(key) != value:
                changed = True
                if not dry_run:
                    agent[key] = value

        if changed:
            updated.append((name, old))

    return updated


def print_report(updated: list, dry_run: bool) -> None:
    tag = "[DRY RUN] " if dry_run else ""
    print(f"\n{tag}SWARMCLAW LOCAL ONLY ROUTING")
    print(f"{'=' * 60}")

    if updated:
        print(f"Updated agents: {len(updated)}")
        for name, old in updated:
            provider, model, primary_model, fallback_model, secondary_provider, secondary_model = old
            print(
                f"- {name}: {provider}/{model} -> ollama/{OLLAMA_MODEL}"
            )
            if secondary_provider or secondary_model:
                print(f"  cleared secondary provider/model")
    else:
        print("No model changes needed.")

    if dry_run:
        print("\n[DRY RUN] No files written.")
    else:
        print(f"\nBackup saved to: {BACKUP_PATH.name}")
        print("Live org chart updated.")


def main() -> None:
    dry_run = "--dry-run" in sys.argv
    if not dry_run:
        shutil.copy(ORG_CHART_PATH, BACKUP_PATH)

    data = load_org_chart()

    if not dry_run:
        data.setdefault("meta", {})
        data["meta"]["version"] = "2.3"
        data["meta"]["last_updated"] = datetime.now().strftime("%Y-%m-%d")
        data["meta"]["updated_by"] = "set_ollama_all.py"
        data["meta"]["change"] = "Local Ollama defaults applied to all agents"

    updated = route_all_to_local(data, dry_run=dry_run)
    print_report(updated, dry_run)

    if not dry_run:
        save_org_chart(data)


if __name__ == "__main__":
    main()
