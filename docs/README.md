# docs/ — Claudex OS reference

The in-depth map of the RedLantern Studios operating system. Both Claude and Codex read these.
Start with the root `README.md` and `OPS/BRIDGE.json`, then use these for depth.

| Doc | What it answers |
|---|---|
| [ARCHITECTURE.md](ARCHITECTURE.md) | How the layers stack, where Claudex sits, how info flows. |
| [STACK.md](STACK.md) | The full tech stack, locked rules, infra, open questions. |
| [CAPABILITY_MAP.md](CAPABILITY_MAP.md) | Claude vs Codex — who can do what, and the delegation contract. |
| [CONNECTORS.md](CONNECTORS.md) | Every MCP connector audited: purpose, engine, auth location, status. |
| [PLUGINS_AND_SKILLS.md](PLUGINS_AND_SKILLS.md) | Every plugin + skill, and the RLS-custom frameworks (the moat). |
| [PRODUCTS.md](PRODUCTS.md) | The 8-product registry (pointers; live state is in the bridge). |
| [REPO_INVENTORY.md](REPO_INVENTORY.md) | Every By Red repo (VERIFIED from GitHub) with lifecycle status. Not everything is active. |
| [ORG_STRUCTURE.md](ORG_STRUCTURE.md) | Legal entity, human roles (PII-free), and the AI engine org. |
| [EXTERNAL_OPERATOR_ONBOARDING.md](EXTERNAL_OPERATOR_ONBOARDING.md) | Standard for another operator's Claude/Codex (e.g. Keymon) to bridge in via Claudex. |
| [OBSIDIAN_VAULT.md](OBSIDIAN_VAULT.md) | Obsidian human knowledge view and live Claudex bridge note. |
| [../OPS/SESSION_CONTEXT_PACK.md](../OPS/SESSION_CONTEXT_PACK.md) | Shared startup pack for Claude, Codex, and the vault mirror. |
| `../OPS/HEARTBEAT_RORYWORDS.md` | Required format for hourly heartbeat updates to Ro. |
| [QUIETBUILD_OS_MODEL.md](QUIETBUILD_OS_MODEL.md) | The umbrella model + engine hierarchy. |
| [ENGINE_REGISTRY.md](ENGINE_REGISTRY.md) | Every engine with maturity label (LIVE/REAL/PARTIAL/SCAFFOLD/MOCKED/DOCTRINE). |
| [ENGINE_IMPORT_MAP.md](ENGINE_IMPORT_MAP.md) | What Claudex borrows from each repo and what it refuses. |
| [TRUTHSERUM_CONTRACT.md](TRUTHSERUM_CONTRACT.md) | Verification doctrine: claim → evidence → receipt → verdict. |
| [SILENTENGINE_ROUTING_POLICY.md](SILENTENGINE_ROUTING_POLICY.md) | Model routing sequence + current Ollama lock + capability caveat. |
| [SAFETYENGINE_POLICY.md](SAFETYENGINE_POLICY.md) | Pre-execution risk gate. |
| [BRAINSMART_APPROVAL_GATE.md](BRAINSMART_APPROVAL_GATE.md) | Deliberation gate for high-blast-radius decisions only. |
| [DELIVERY_KERNEL_PLAYBOOK.md](DELIVERY_KERNEL_PLAYBOOK.md) | Intent→Plan→Build→Release shape; no simulated builds counted real. |
| [ROBBY_CONDUCTOR_CONTRACT.md](ROBBY_CONDUCTOR_CONTRACT.md) | Robby conducts, never self-approves. |
| `../OPS/GATES.md` | The ordered execution gate stack. |
| [SCALING.md](SCALING.md) | Forward playbooks: add a product, connector, agent, lane, skill + hardening backlog. |

Truth labels apply throughout: VERIFIED / ASSUMED / UNKNOWN. If a doc conflicts with `CLAUDE.md`, `CLAUDE.md` wins — flag it, do not silently pick.
