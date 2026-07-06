#!/bin/bash
# ============================================================
# RedLantern Studios — Full File System Builder
# Run this ONCE on a clean Mac to create the entire tree.
#
# Usage:
#   chmod +x build_structure.sh
#   ./build_structure.sh
#
# Safe to re-run: mkdir -p will not overwrite existing folders.
# ============================================================

set -e

ROOT="$HOME/Documents"

echo "🔨 Building By Red LLC file system..."
echo "Root: $ROOT"
echo ""

# ============================================================
# BY RED LLC — Business parent entity
# ============================================================

# RedLantern Studios — Core execution arm
# Products
mkdir -p "$ROOT/ByRed-LLC/RedLanternStudios/Projects/HireWire/"{app,backend,ai/prompts,ai/context,docs/prd,docs/decisions,assets/images,assets/icons,assets/fonts,exports/client-deliverables,design/wireframes,design/mockups,design/final,archive}
mkdir -p "$ROOT/ByRed-LLC/RedLanternStudios/Projects/QBos/"{app,backend,ai/prompts,ai/context,docs/prd,docs/decisions,assets,exports,design,archive}
mkdir -p "$ROOT/ByRed-LLC/RedLanternStudios/Projects/SilentEngine/"{app,backend,ai/prompts,ai/context,docs/prd,docs/decisions,assets,exports,design,archive}
mkdir -p "$ROOT/ByRed-LLC/RedLanternStudios/Projects/InSense/"{app,backend,ai/prompts,ai/context,docs/prd,docs/decisions,assets,exports,design,archive}
mkdir -p "$ROOT/ByRed-LLC/RedLanternStudios/Projects/AuthenticHadith/"{app,backend,ai/prompts,ai/context,docs/prd,docs/decisions,assets,exports,design,archive}
mkdir -p "$ROOT/ByRed-LLC/RedLanternStudios/Projects/ChapmanBot/"{app,backend,ai/prompts,ai/context,docs/prd,docs/decisions,assets,exports,design,archive}
mkdir -p "$ROOT/ByRed-LLC/RedLanternStudios/Projects/TradeSwarm/"{app,backend,ai/prompts,ai/context,docs/prd,docs/decisions,assets,exports,design,archive}
mkdir -p "$ROOT/ByRed-LLC/RedLanternStudios/Projects/Clarity/"{app,backend,ai/prompts,ai/context,docs/prd,docs/decisions,assets,exports,design,archive}

# Project template (copy this for new products)
mkdir -p "$ROOT/ByRed-LLC/RedLanternStudios/Projects/_Template/"{app,backend,ai/prompts,ai/context,docs/prd,docs/decisions,assets/images,assets/icons,assets/fonts,exports/client-deliverables,design/wireframes,design/mockups,design/final,archive}

# Client projects
mkdir -p "$ROOT/ByRed-LLC/RedLanternStudios/Projects/_Clients/ParadiseLandscaping/"{app,backend,ai,docs,assets,exports/client-deliverables,design,archive}
mkdir -p "$ROOT/ByRed-LLC/RedLanternStudios/Projects/_Clients/ArtGalleryPlatform/"{app,backend,ai,docs,assets,exports/client-deliverables,design,archive}
mkdir -p "$ROOT/ByRed-LLC/RedLanternStudios/Projects/_Clients/_Template/"{app,backend,ai,docs,assets,exports/client-deliverables,design,archive}

# Shared systems (cross-product infrastructure)
mkdir -p "$ROOT/ByRed-LLC/RedLanternStudios/Shared/AI"
mkdir -p "$ROOT/ByRed-LLC/RedLanternStudios/Shared/Components"
mkdir -p "$ROOT/ByRed-LLC/RedLanternStudios/Shared/Automation"
mkdir -p "$ROOT/ByRed-LLC/RedLanternStudios/Shared/APIs"
mkdir -p "$ROOT/ByRed-LLC/RedLanternStudios/Shared/InternalTools"

# Design (studio-wide)
mkdir -p "$ROOT/ByRed-LLC/RedLanternStudios/Design/Brand"
mkdir -p "$ROOT/ByRed-LLC/RedLanternStudios/Design/UI"
mkdir -p "$ROOT/ByRed-LLC/RedLanternStudios/Design/Exports"
mkdir -p "$ROOT/ByRed-LLC/RedLanternStudios/Design/DesignSystem"

# Documentation (studio-wide)
mkdir -p "$ROOT/ByRed-LLC/RedLanternStudios/Docs/Architecture"
mkdir -p "$ROOT/ByRed-LLC/RedLanternStudios/Docs/Product"
mkdir -p "$ROOT/ByRed-LLC/RedLanternStudios/Docs/Strategy"
mkdir -p "$ROOT/ByRed-LLC/RedLanternStudios/Docs/SessionNotes"
mkdir -p "$ROOT/ByRed-LLC/RedLanternStudios/Docs/Decisions"

# Studio operations (not product-level)
mkdir -p "$ROOT/ByRed-LLC/RedLanternStudios/_Studio/Hiring"
mkdir -p "$ROOT/ByRed-LLC/RedLanternStudios/_Studio/Positioning"
mkdir -p "$ROOT/ByRed-LLC/RedLanternStudios/_Studio/Press"

# ============================================================
# OPERATIONS — Business layer (legal, finance, admin)
# ============================================================

mkdir -p "$ROOT/ByRed-LLC/Operations/Legal/"{Formation,Contracts,NDAs,IP,Compliance}
mkdir -p "$ROOT/ByRed-LLC/Operations/Finance/"{Banking,Tax/2024,Tax/2025,Tax/2026,Payroll}
mkdir -p "$ROOT/ByRed-LLC/Operations/Finance/Invoices/"{Sent,Received}
mkdir -p "$ROOT/ByRed-LLC/Operations/Contracts"
mkdir -p "$ROOT/ByRed-LLC/Operations/Admin/"{Licenses,Insurance,Templates}

# ============================================================
# REVENUE — Monetization tracking (separate from Finance)
# ============================================================

mkdir -p "$ROOT/ByRed-LLC/Revenue"

# ============================================================
# PARTNERSHIPS — External relationships
# ============================================================

mkdir -p "$ROOT/ByRed-LLC/Partnerships/Active"
mkdir -p "$ROOT/ByRed-LLC/Partnerships/Closed"

# ============================================================
# CO-FOUNDERS
# ============================================================

mkdir -p "$ROOT/ByRed-LLC/CoFounders/Ahmed"
mkdir -p "$ROOT/ByRed-LLC/CoFounders/Rasheed"

# ============================================================
# STRATEGY — Business strategy (founder-level)
# ============================================================

mkdir -p "$ROOT/ByRed-LLC/Strategy/InternalMemos"
mkdir -p "$ROOT/ByRed-LLC/Strategy/CapTable"
mkdir -p "$ROOT/ByRed-LLC/Strategy/Roadmaps"

# ============================================================
# PERSONAL — iCloud layer (just create the container)
# ============================================================

mkdir -p "$ROOT/Personal"

# ============================================================
# ARCHIVE — Dead projects, old versions
# ============================================================

mkdir -p "$ROOT/Archive"

# ============================================================
# DOWNLOADS — Inbox structure
# ============================================================

mkdir -p "$HOME/Downloads/_inbox"
mkdir -p "$HOME/Downloads/_screenshots"
mkdir -p "$HOME/Downloads/_installers"
mkdir -p "$HOME/Downloads/_toprocess"

# ============================================================
# PLACEHOLDER README FILES
# Create README.md pointers in app/ and backend/ folders
# so you remember: code lives in GitHub, not here.
# ============================================================

for project in HireWire QBos SilentEngine InSense AuthenticHadith ChapmanBot TradeSwarm Clarity; do
  APP_DIR="$ROOT/ByRed-LLC/RedLanternStudios/Projects/$project/app"
  BACKEND_DIR="$ROOT/ByRed-LLC/RedLanternStudios/Projects/$project/backend"
  AI_DIR="$ROOT/ByRed-LLC/RedLanternStudios/Projects/$project/ai"

  # Only create if README doesn't already exist
  if [ ! -f "$APP_DIR/README.md" ]; then
    echo "# $project — Frontend" > "$APP_DIR/README.md"
    echo "" >> "$APP_DIR/README.md"
    echo "Code lives in GitHub. This folder is a reference pointer only." >> "$APP_DIR/README.md"
    echo "Repo: https://github.com/[your-org]/$project" >> "$APP_DIR/README.md"
  fi

  if [ ! -f "$BACKEND_DIR/README.md" ]; then
    echo "# $project — Backend" > "$BACKEND_DIR/README.md"
    echo "" >> "$BACKEND_DIR/README.md"
    echo "Code lives in GitHub. This folder is a reference pointer only." >> "$BACKEND_DIR/README.md"
    echo "Repo: https://github.com/[your-org]/$project" >> "$BACKEND_DIR/README.md"
  fi

  if [ ! -f "$AI_DIR/models.md" ]; then
    echo "# $project — AI Models" > "$AI_DIR/models.md"
    echo "" >> "$AI_DIR/models.md"
    echo "| Model | Provider | Use Case | Cost Notes |" >> "$AI_DIR/models.md"
    echo "|---|---|---|---|" >> "$AI_DIR/models.md"
    echo "| claude-sonnet-4-6 | Anthropic | Primary generation | TBD |" >> "$AI_DIR/models.md"
  fi
done

# ============================================================
# TEMPLATE README
# ============================================================

TEMPLATE_DIR="$ROOT/ByRed-LLC/RedLanternStudios/Projects/_Template"
if [ ! -f "$TEMPLATE_DIR/README.md" ]; then
  cat > "$TEMPLATE_DIR/README.md" << 'READMEEOF'
# _Template

Copy this entire folder when starting a new product or client project.

## Steps:
1. Duplicate this folder
2. Rename to your project name (PascalCase)
3. Update README files in /app and /backend with GitHub repo URL
4. Update /ai/models.md with the models this product uses
5. Create spec.md in /docs as the master product spec

## Folder purposes:
- /app — Frontend code pointer (README → GitHub repo)
- /backend — Backend code pointer (README → GitHub repo)
- /ai — Prompt files, context configs, model registry
- /docs — Specs, PRDs, architecture, decisions, changelog
- /assets — Images, icons, fonts for this product
- /exports — Deliverables (date-stamped: YYYY-MM-DD_description/)
- /design — Figma exports, wireframes, mockups
- /archive — Retired files (organized by YYYY-MM/)
READMEEOF
fi

# ============================================================
# DONE
# ============================================================

echo ""
echo "✅ File system built successfully."
echo ""
echo "Structure created at: $ROOT/ByRed-LLC/"
echo ""
echo "Next steps:"
echo "  1. Move existing files into the correct folders"
echo "  2. Create _SYSTEM.md at $ROOT/ByRed-LLC/_SYSTEM.md"
echo "  3. Update GitHub repo URLs in each project's app/README.md"
echo "  4. Set screenshot save location: System Preferences → Screenshots → $HOME/Downloads/_screenshots"
echo ""
echo "Run 'tree -L 3 $ROOT/ByRed-LLC/' to verify."
