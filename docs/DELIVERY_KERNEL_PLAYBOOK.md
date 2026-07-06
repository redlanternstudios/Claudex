# DELIVERY KERNEL PLAYBOOK — shipping shape

Version 1.0 · 2026-07-02 · **DOCTRINE / PLAYBOOK.** Source `QBos/packages/delivery-kernel` = **PARTIAL** — real package, but the orchestrator **simulates** execution (has a TODO, pushes fake artifacts like `src/index.ts`/`package.json` by engine name). ReleaseEngine is **MOCKED**.

Borrow the shape, not the runtime. Claudex uses the pattern; it does not claim the kernel builds real products.

## THE SHAPE
```
Intent → Plan → Build → Release
```
- **Intent** — what and why, scope-locked. (BrainSmart gate if high blast radius.)
- **Plan** — user stories + acceptance criteria + definition of done.
- **Build** — real implementation in the product repo (by Codex/Claude/SwarmClaw). Not simulated.
- **Release** — checklist + human approval + external proof. (Release Gate.)

## HARD RULES (because the source mocks these)
- **No simulated builds counted as real.** The QBos orchestrator fakes artifacts — Claudex must never record a simulated build as a shipped feature.
- **No release claim without external proof.** ReleaseEngine mocks TestFlight/App Store IDs and compliance. Claudex forbids "submitted/live/ready" unless a real external receipt exists (App Store Connect confirmation, live URL check, real test output). This is the TruthSerum contract applied to shipping.
- Archetypes (product templates) are borrowable as scaffolding ideas only.

## STATUS
Playbook adopted (Intent→Plan→Build→Release + gates). The QBos kernel is **not** an execution runtime for Claudex. Build happens in real repos with real receipts; the kernel is the map, not the engine.
