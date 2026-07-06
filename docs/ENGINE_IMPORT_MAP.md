# ENGINE IMPORT MAP

Version 1.0 · 2026-07-02 · Exactly what Claudex borrows from each repo, and what it refuses.
Rule: Claudex imports **doctrine and patterns**, not raw code (yet). Code stays in its source repo, pointed to.

| Source | Borrow | Do NOT borrow |
|---|---|---|
| **QBos** | TruthSerum doctrine, ReceiptWriter model, SilentEngine routing pattern, BrainSmart gate pattern, Delivery Kernel Intent→Plan→Build→Release shape, engine definitions | Root "production-ready" claims, "Tests coming soon" state, in-memory storage, mocked Release/compliance, placeholder proof routes, repo sprawl |
| **TruthSerum** | claim → evidence → confidence → receipt → verdict; forbidden-claim sanitization | The untested implementation as production truth |
| **SilentEngine** | safety → policy → route → fallback → cost → audit → receipt sequence | Whole engine copy; archived `Silent-Engine` repo as active source |
| **SafetyEngine** | pre-execution risk gate (secrets, destructive, religious, financial/legal, prod deploy) | Standalone-engine framing (it's a component) |
| **BrainSmart** | deliberation gate + scope-lock enforcement | Always-on reasoning (too slow/costly) |
| **Delivery Kernel** | shipping playbook shape + archetypes | Simulated execution as if it builds real products |
| **ReleaseEngine** | release checklist idea only | Any output — it mocks submission/compliance |
| **Robby PA** | conductor behavior + chained-receipt discipline | Self-approval, self-deploy, marking GREEN |
| **SwarmClaw** | org chart, agent roles, lifecycle, org sync spec | Product state duplication (state lives in the bridge) |

## Import status
All rows are currently **DOCTRINE-only** imports (docs in this folder). Promotion of any engine from doctrine to live Claudex tooling requires: tests exist, no mocked outputs on the used path, and a TruthSerum receipt of the promotion. Until then, Claudex describes the rule; it does not run the engine.
