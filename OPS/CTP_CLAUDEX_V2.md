# CTP: Claudex Control Plane v2

Date: 2026-07-02
Decision: Build Claudex as an executable studio control plane.

## Prompt contract

GOAL: Make cross engine continuation reliable enough that Ro can name a product or lane and work continues from verified state.

CONSTRAINTS: One mutable authority, no secrets, no fake green, no product code, compatibility with Codex and Claude, receipts for meaningful changes.

FORMAT: Working repository controls with a schema, command layer, tests, CI, operating artifacts, and receipt.

FAILURE: Contradictory colors pass, stale writers overwrite current state, secrets enter Git, state depends on manual edits, or product repositories create competing bridges.

## Problem statement

Type: systems and operations.

The existing bridge records state but does not enforce it. Two engines can interpret or overwrite the same JSON differently, and missing supporting artifacts cannot be detected automatically.

## Three pass analysis

### Pass 1

The repository needs more bridge files and clearer documentation.

### Pass 2

Documentation is not the constraint. The constraint is deterministic state transition and proof. A larger document set without execution controls increases confidence faster than reliability.

### Pass 3

The root problem is distributed coordination without concurrency control. Claudex must behave like a small control plane: typed inputs, one writer contract, revision checks, explicit ownership, deterministic gates, receipts, and recovery. Pass 3 governs the build.

## Ten layer analysis

### 1. Intent

Ro wants continuation without coordination overhead.

### 2. Users

Ro needs plain commands. Codex and Claude need machine readable state. Automation needs deterministic exit codes. Product teams need isolation from studio state internals.

### 3. System

GitHub is durable transport. Claudex is the control plane. Product repositories are consumers. External platforms remain authorities for their own live state.

### 4. Data

Verified data includes products, colors, lanes, next actions, receipts, and engine capability evidence. Secret values and live database contents are excluded.

### 5. Logic

Effective color is the worse of global and focus product. Yellow may have warnings. Red must have blockers. Green may have neither. Writes require the current revision.

### 6. Risk

Silent failures are stale overwrites, false green, stale intent, missing receipts, and capability claims inferred from configuration. Loud failures are invalid JSON and missing files. Secret exposure is the catastrophic path.

### 7. Integration

Upstream producers are Codex, Claude, Ro, CI, n8n, and Make. Downstream consumers are future sessions, product repositories, dispatches, and audits.

### 8. Trust

Configuration present does not prove credentials, authentication, capability, or production success. Each state requires separate evidence.

### 9. Time

Intent and capabilities decay. Receipts should not. Bridge status requires daily freshness while receipt history remains append only.

### 10. Truth

VERIFIED: Claudex is on GitHub and both engine boot files read it.

VERIFIED: Codex configuration exposes enabled plugins and an MCP runtime.

PARTIAL: Claude live capability inventory is not machine reported.

UNKNOWN: Product live state remains unknown until each product provides a current receipt.

## Driver separation

Functional driver: engines need shared state.

Behavioral driver: Ro wants to stop repeating context and policing handoffs.

Emotional driver: trust collapses when an engine claims completion without proof.

Systemic driver: Git branches, separate sessions, and external platforms create distributed state.

Economic driver: repeated reorientation burns specialist time and delays shipping.

Real constraint: enforcement and concurrency, not document availability.

## Cold start

At zero products, the bridge still validates studio state.

At one product, a consumer manifest resolves one product key.

At many products, each maintains isolated lane, warning, blocker, and receipt state.

Minimum useful state is one product, one next action, one color, and one readable receipt.

## Instrumentation

Activation signal: a new engine reads status and continues without Ro restating context.

Engagement signal: meaningful sessions close with a new receipt and next action.

Failure signal: doctor or CI exits nonzero.

Retention signal: repeated cross engine handoffs succeed without state reconstruction.

## Privacy and security

The bridge needs credential names and locations to route work but never values. Capability evidence is stored without authentication material.

## Community correction

Not applicable to an end user community. Operational correction is owned by the validator, CI, TruthCal receipts, and Ro.

## Category timing

The need is immediate because both engines are already active. Delay compounds duplicate state and coordination debt.

## Identity check

Gamification is not relevant. The system reinforces RedLantern’s operating identity: build in public and operate in truth.

## Assumptions audit

VERIFIED: GitHub transports Claudex state.

VERIFIED: Node 20 can run the dependency free command layer.

PARTIAL: Every product repository can expose a stable local path.

UNKNOWN: Which automations will write directly to the bridge later.

## Upstream and downstream chain

Producer writes intent or result.

Command layer validates revision and semantics.

Atomic writer saves state and backup.

Receipt proves the transition.

Git transports the commit.

Next engine reads and computes effective color.

Any missing link stops or warns according to severity.

## Constructive criticism

The weakest point is that product truth is still manually summarized. The highest leverage next improvement is signed product receipts or automated read only status adapters.

## Destructive criticism

Catastrophic path: secret committed. Trigger is manual paste or unsafe automation. Impact is credential compromise. Mitigation is scanning, rotation protocol, and no value fields. Residual risk remains Git history exposure.

High impact path: stale writer overwrites current lane. Trigger is concurrent sessions. Mitigation is revision comparison and exclusive lock. Residual risk remains remote Git conflicts across machines, which Git must reject and the agent must reconcile.

High impact path: an engine does not know a remote revision exists. Trigger is an open session or idle local checkout. Mitigation is immediate Git hooks, a five minute local watcher, a fifteen minute GitHub signal, and a fifteen minute Codex monitor. Alignment classification prevents unsafe automatic merging.

High impact path: false green. Trigger is inconsistent warnings or blockers. Mitigation is semantic validation and CI.

Medium impact path: stale product summary. Trigger is missing receipt cadence. Mitigation is yellow status and daily intent.

## Final recommendation

Maintain Claudex as a narrow executable control plane. Do not turn it into a product data warehouse or copy product source truth into it.

Confidence: HIGH.

First action after this build: ingest Amina and write the first product truth receipt.

Decision deadline: immediate. The bridge is already in active use.

## KPI thresholds

If any invalid bridge reaches main, stop bridge mutations and fix CI protection.

If handoff success is below 95 percent across ten handoffs, audit consumer installation and receipt quality.

If more than one competing bridge appears, mark global red until removed.

If any secret value enters Git, mark global red and rotate immediately.

Target: 100 percent of meaningful cross engine handoffs have a receipt and concrete next action.

Target: remote bridge updates are detected locally within five minutes and by Codex within fifteen minutes.

Kill condition: any watcher force merges, discards dirty work, or continues across diverged histories.
