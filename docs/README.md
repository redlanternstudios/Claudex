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
| [SCALING.md](SCALING.md) | Forward playbooks: add a product, connector, agent, lane, skill + hardening backlog. |

Truth labels apply throughout: VERIFIED / ASSUMED / UNKNOWN. If a doc conflicts with `CLAUDE.md`, `CLAUDE.md` wins — flag it, do not silently pick.
