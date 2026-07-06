# ENGINE REGISTRY — QuietBuild OS

Version 1.0 · 2026-07-02 · Human-readable companion to `OPS/ENGINE_REGISTRY.json`.
**Verified by direct code read of `QBos---Master-Founder-Repo` + Claudex audit (2026-07-02).**
Treating unequal things as equal is the failure this file prevents. Every engine carries a maturity label.

Maturity: **LIVE** (tested, shipped) · **REAL** (real code, works, thin/no tests) · **PARTIAL** (real but simulated/unfinished paths) · **SCAFFOLD** (stub-level) · **MOCKED** (fakes results — doctrine only) · **DOCTRINE** (rules Claudex adopts regardless of code) · **LEGACY** / **REFERENCE**.

| Engine | Source | Maturity | Evidence | Use in Claudex |
|---|---|---|---|---|
| **SwarmClaw** | `swarmclaw` | LIVE | ~247k LOC, deploy configs (docker/fly/railway) | Agent execution org. Keep separate, reference registry + org sync. |
| **engines** (core) | QBos `packages/engines` | REAL | 12,310 LOC, 30 tests | Most mature. Reference. |
| **TruthSerum** | QBos `packages/truthserum` | **REAL / UNVERIFIED** | 1,549 LOC real verify logic, **0 tests** | **Import doctrine now** → `TRUTHSERUM_CONTRACT.md`. Point to code, do not trust as production. |
| **SilentEngine** | QBos `packages/silent-engine` | REAL / PARTIAL | 4,638 LOC, 5 tests, houses safety-classifier | Routing doctrine → `SILENTENGINE_ROUTING_POLICY.md`. |
| **SafetyEngine** | inside silent-engine + `shared/safety-middleware` | PARTIAL (component) | classifier + middleware w/ tests | Pre-execution gate → `SAFETYENGINE_POLICY.md`. Not a standalone engine. |
| **BrainSmart** | QBos `packages/delivery-kernel/src/brainsmart` | PARTIAL (component) | 665 LOC real logic, scope-lock | Deliberation gate → `BRAINSMART_APPROVAL_GATE.md`. |
| **Delivery Kernel** | QBos `packages/delivery-kernel` | **PARTIAL** | 2,679 LOC, 1 test, orchestrator **simulates** execution (TODO, fake artifacts) | Playbook only → `DELIVERY_KERNEL_PLAYBOOK.md`. Not a live builder. |
| **ReleaseEngine** | QBos delivery-kernel | **MOCKED** | mocks TestFlight/App Store, fake build/submission IDs, mock compliance | **Doctrine only.** Release checklist idea. Must never emit "submitted/live" without external proof. |
| **Robby PA** | `RobbyPA` / QBos `packages/robby-pa` | SCAFFOLD | package labels itself "conductor (scaffold)"; good receipt-chain demo | Conductor **contract** → `ROBBY_CONDUCTOR_CONTRACT.md`. Not autonomous. |
| **ReceiptWriter** | QBos truthserum | REAL | local + Supabase, SHA-256, Ed25519 signing, nonce | Adopt as receipt upgrade path for `OPS/receipts`. |
| **QBos (whole)** | `QBos---Master-Founder-Repo` | REFERENCE | monorepo, root test = "Tests coming soon", in-memory storage, missing prod adapters | Source inventory / engine warehouse. Not the production OS. |
| **Silent-Engine** (repo) | `Silent-Engine` (PRIV) | LEGACY | archived 2025-11 | Name/history only. |

## The honest headline

QBos is an **engine prototype warehouse and founder-OS research repo**, not the current production OS. It contains valuable engine DNA. Claudex must become the cleaner, stricter version — adopting the doctrine while labeling implementation truthfully. Do not let any doc imply these engines are production without receipts.
