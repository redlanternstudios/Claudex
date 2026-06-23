#!/bin/bash
# =============================================================
# RedLantern Studios — SwarmClaw Phase 1 Agent Setup
# Run this locally on your machine against localhost:18789
# =============================================================
# BEFORE RUNNING:
# 1. Confirm OpenClaw gateway is running: curl http://localhost:18789/health
# 2. Confirm SwarmClaw agent UI is running: open http://localhost:3456
# 3. Read each agent's system prompt from rl_agent_prompts.md before loading
# 4. Adjust API_FORMAT below to match your SwarmClaw version's API spec
#
# HOW TO LOAD SYSTEM PROMPTS:
# The system prompts are in:
#   RedLantern Studios/swarmclaw/rl_agent_prompts.md
# Each agent has a section marked ── START PROMPT ── and ── END PROMPT ──
# Copy the content between those markers into your SwarmClaw agent config.
# =============================================================

GATEWAY="http://localhost:18789"
WORKSPACE_PATH="/Users/rorysemeah/Documents/Claude/Projects/RedLantern Studios"

echo "============================================="
echo "RedLantern Studios — Phase 1 Agent Setup"
echo "============================================="
echo ""

# Step 1: Health check
echo "[1/5] Checking OpenClaw gateway health..."
if curl -s --max-time 5 "$GATEWAY/health" > /dev/null 2>&1; then
  echo "  ✓ Gateway is reachable at $GATEWAY"
else
  echo "  ✗ Gateway not reachable at $GATEWAY"
  echo "  → Start SwarmClaw first, then re-run this script"
  exit 1
fi
echo ""

# Step 2: Confirm existing agents
echo "[2/5] Checking current agent roster..."
echo "  Run this in your browser or via SwarmClaw UI:"
echo "  → http://localhost:3456"
echo "  → Confirm which agents are already active before adding Phase 1 agents"
echo "  → Phase 1 additions: Architect, Librarian, TechWriter"
echo ""
read -p "  Have you confirmed the current roster? (y/n): " roster_confirmed
if [ "$roster_confirmed" != "y" ]; then
  echo "  → Aborted. Confirm roster first."
  exit 1
fi
echo ""

# Step 3: Load system prompts
echo "[3/5] Loading system prompts..."
echo ""
echo "  ARCHITECT system prompt:"
echo "  File: $WORKSPACE_PATH/swarmclaw/rl_agent_prompts.md"
echo "  Section: ── ARCHITECT ──"
echo ""
echo "  LIBRARIAN system prompt:"
echo "  File: $WORKSPACE_PATH/swarmclaw/rl_agent_prompts.md"
echo "  Section: ── LIBRARIAN ──"
echo ""
echo "  TECHWRITER system prompt:"
echo "  File: $WORKSPACE_PATH/swarmclaw/rl_agent_prompts.md"
echo "  Section: ── TECHWRITER ──"
echo ""
echo "  Each prompt includes the GLOBAL PREAMBLE automatically."
echo "  Copy the content between START PROMPT and END PROMPT markers."
echo ""
read -p "  Have you copied all three system prompts? (y/n): " prompts_ready
if [ "$prompts_ready" != "y" ]; then
  echo "  → Aborted. Load system prompts first."
  exit 1
fi
echo ""

# Step 4: Memory structure verification
echo "[4/5] Verifying memory folder structure..."
MEMORY_PATH="$WORKSPACE_PATH/memory"

check_path() {
  if [ -e "$1" ]; then
    echo "  ✓ $2"
  else
    echo "  ✗ MISSING: $2 → $1"
  fi
}

check_path "$MEMORY_PATH/MEMORY.md" "memory/MEMORY.md"
check_path "$MEMORY_PATH/active_work_registry.md" "memory/active_work_registry.md"
check_path "$MEMORY_PATH/routing_log.md" "memory/routing_log.md"
check_path "$MEMORY_PATH/health_log.md" "memory/health_log.md"
check_path "$MEMORY_PATH/dead_letter_log.md" "memory/dead_letter_log.md"
check_path "$MEMORY_PATH/roster_log.md" "memory/roster_log.md"
check_path "$MEMORY_PATH/knowledge/global-stack-rules.md" "memory/knowledge/global-stack-rules.md"
check_path "$MEMORY_PATH/knowledge/amina-knowledge.md" "memory/knowledge/amina-knowledge.md"
check_path "$MEMORY_PATH/knowledge/authentic-hadith-knowledge.md" "memory/knowledge/authentic-hadith-knowledge.md"
check_path "$MEMORY_PATH/knowledge/paradise-knowledge.md" "memory/knowledge/paradise-knowledge.md"
check_path "$MEMORY_PATH/decisions/README.md" "memory/decisions/"
check_path "$MEMORY_PATH/lessons/README.md" "memory/lessons/"
check_path "$MEMORY_PATH/debriefs/README.md" "memory/debriefs/"
check_path "$MEMORY_PATH/incidents/README.md" "memory/incidents/"
check_path "$MEMORY_PATH/missions/README.md" "memory/missions/"
echo ""

# Step 5: Configure Filesystem MCP path
echo "[5/5] Filesystem MCP configuration..."
echo ""
echo "  SwarmClaw agents need to read the memory files via Filesystem MCP."
echo "  MCP ID: 99bd0d9e (from your SwarmClaw config)"
echo "  Workspace path: $WORKSPACE_PATH"
echo ""
echo "  Verify in SwarmClaw that MCP 99bd0d9e is:"
echo "  ✓ Connected"
echo "  ✓ Pointing to: $WORKSPACE_PATH"
echo "  ✓ Has read + write permissions"
echo ""
echo "  If not configured: add it in SwarmClaw Settings → MCP Servers"
echo ""

# Final summary
echo "============================================="
echo "SETUP SUMMARY"
echo "============================================="
echo ""
echo "Next steps (in this order):"
echo ""
echo "  1. In SwarmClaw, add Architect agent with config from:"
echo "     $WORKSPACE_PATH/swarmclaw/agents/architect-config.json"
echo "     System prompt from: rl_agent_prompts.md → ARCHITECT section"
echo ""
echo "  2. Add Librarian agent with config from:"
echo "     $WORKSPACE_PATH/swarmclaw/agents/librarian-config.json"
echo "     System prompt from: rl_agent_prompts.md → LIBRARIAN section"
echo "     Point Librarian's working directory to: $WORKSPACE_PATH/memory/"
echo ""
echo "  3. Add TechWriter agent with config from:"
echo "     $WORKSPACE_PATH/swarmclaw/agents/techwriter-config.json"
echo "     System prompt from: rl_agent_prompts.md → TECHWRITER section"
echo ""
echo "  4. Run the Phase 1 keystone task:"
echo "     $WORKSPACE_PATH/swarmclaw/phase1/keystone-task.md"
echo ""
echo "  5. Verify all 11 acceptance criteria:"
echo "     $WORKSPACE_PATH/swarmclaw/phase1/acceptance-criteria-tracker.md"
echo ""
echo "  DO NOT proceed to Phase 2 until all 11 criteria are checked."
echo ""
echo "============================================="
