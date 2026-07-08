# CTP Codex Cost Setup

Date: 2026 07 08
Local Mac time during audit: 2026 07 07 23:55 PDT
Owner: Ro
Engine: Codex
Status: ACCEPTED

## Prompt Contract

GOAL: Reduce routine Codex cost exposure while preserving a high power path for complex RedLantern build work.

CONSTRAINTS: Do not expose secrets. Do not weaken the repo sandbox. Do not remove useful plugins. Do not force Keymon to read chat history.

FORMAT: Decision record plus Keymon retrieval artifact.

FAILURE: This fails if Codex keeps using API billing by accident, if routine sessions stay pinned to the strongest model, or if Keymon cannot retrieve the setup from Claudex.

## Problem Statement

Type: operations and cost control.

Codex was configured like a premium reasoning worker for every task, while Ro mostly uses it as a high throughput coding and repo execution engine. The hidden cost risk was bigger than model choice: `OPENAI_API_KEY` was globally exported, so Codex could route through API billing instead of ChatGPT plan usage.

## Three Pass Analysis

Pass 1: The obvious fix is to change the default model from `gpt-5.5` to `gpt-5.4-mini` and lower reasoning.

Pass 2: Model choice alone is not enough. Global API credentials can silently change the billing path. Subagents also multiply usage because each worker performs its own model and tool work.

Pass 3: The durable setup is tiered operation. Default Codex should be cheap, fast, and bounded. Deep capability should exist as an explicit profile, not the default. API keys should be project scoped only when a build truly needs OpenAI Platform billing.

## Ten Layer Analysis

1. Surface: Codex should cost less for everyday RedLantern repo work.
2. Root cause: The global config used the strongest default model and an ambient API key existed in shell startup.
3. First order consequence if fixed: Routine tasks consume fewer plan credits and avoid accidental API billing.
4. Second order consequence: Ro can use Codex more often for mechanical work without cost anxiety.
5. Third order consequence: Claude stays in the senior review seat while Codex handles grind work at lower cost.
6. Upstream dependencies: Codex config must parse, ChatGPT auth must remain valid, and API key exports must stay disabled globally.
7. Downstream dependencies: Keymon needs a retrieval doc, and future operators need the same default versus deep mode rule.
8. Failure modes: A future shell file re exports `OPENAI_API_KEY`; a user runs everything with `--profile deep`; subagents are spawned casually; project env files leak into global shells.
9. Recovery paths: Run `codex doctor`, check auth mode, inspect `.zshrc` for global key exports, and restore from `~/.codex/config.toml.backup-*` if needed.
10. Strategic implication: Codex becomes the low friction production engine instead of another premium model sink.

## Behavioral Driver Separation

Driver: Ro wants to move fast without feeling that every mechanical build step burns expensive capacity.

Mechanism: Model defaults, auth path, subagent caps, and explicit profiles.

Real constraint: Hidden global credentials and unbounded premium defaults.

## Assumptions Audit

VERIFIED: Official Codex manual recommends `gpt-5.5` for most demanding tasks and `gpt-5.4-mini` for faster lower cost lighter work.

VERIFIED: Official Codex manual says API key auth uses standard API pricing, while ChatGPT login follows ChatGPT workspace permissions and plan usage.

VERIFIED: Official Codex manual says subagent workflows consume more tokens than comparable single agent runs.

VERIFIED: Local config was changed to default to `gpt-5.4-mini`, low reasoning, low verbosity, cached web search, capped tool output, forced ChatGPT login, and capped subagent fanout.

VERIFIED: `.zshrc` had two global `OPENAI_API_KEY` exports and both were disabled.

VERIFIED: macOS launch environment no longer returned an `OPENAI_API_KEY` value after cleanup.

VERIFIED: Clean doctor simulation with `OPENAI_API_KEY` removed showed ChatGPT auth, stored ChatGPT tokens, no stored API key, provider reachability through ChatGPT auth, and successful WebSocket handshake.

PARTIAL: This already running Codex session still inherited the old environment variable until restart.

UNKNOWN: Whether Keymon has the same global API key export problem on his machine. Keymon must run the same audit locally.

## Upstream And Downstream Logic Chain

Producer: `~/.codex/config.toml` sets routine Codex defaults.

Producer: `~/.codex/deep.config.toml` gives high power mode.

Producer: `~/.codex/review.config.toml` gives read only review mode.

Producer: `.zshrc` no longer exports `OPENAI_API_KEY` globally.

Consumer: Ro uses normal Codex for routine implementation.

Consumer: Ro uses `codex --profile deep` for hard architecture or migrations.

Consumer: Ro uses `codex --profile review` for read only audit.

Consumer: Keymon reads `OPS/KEYMON_CODEX_COST_SETUP_20260708.md` to mirror the setup.

## Acceptance Criteria

1. `~/.codex/config.toml` defaults to `gpt-5.4-mini`.
2. `~/.codex/config.toml` uses low reasoning and low verbosity.
3. `~/.codex/config.toml` forces ChatGPT login.
4. Global `OPENAI_API_KEY` exports are disabled.
5. Deep and review profiles exist.
6. Clean doctor simulation shows ChatGPT auth.
7. Keymon retrieval doc exists in Claudex.
8. Decision is logged in `OPS/DECISION_LOG.md`.

## Definition Of Done

Done when this CTP, the decision log, the Keymon retrieval file, and the receipt are committed and pushed.

## Constructive Criticism

Weakest point: `gpt-5.4-mini` may underperform on broad ambiguous architecture tasks if Ro forgets to use the deep profile.

Highest leverage improvement: Add a quick shell alias later, such as `codexdeep`, only after confirming it does not encourage overuse.

Over engineering risk: Too many profiles would create confusion. Keep two.

## Destructive Criticism

Failure path: API key gets re added globally.
Trigger: A new install script writes `export OPENAI_API_KEY` into `.zshrc`.
Impact: Surprise API spend.
Mitigation: Search shell startup files during monthly ops audit.
Residual risk: Medium until all machines are audited.

Failure path: Deep profile becomes the default habit.
Trigger: Ro starts every session with `--profile deep`.
Impact: Credit burn returns.
Mitigation: Use deep only when the task is high risk or ambiguous.
Residual risk: Low if the retrieval doc is followed.

Failure path: Keymon copies only half the setup.
Trigger: He changes model but leaves global API key export.
Impact: Cost route stays wrong.
Mitigation: His checklist requires auth doctor proof.
Residual risk: Medium until Keymon receipt exists.

## Final Recommendation

Use `gpt-5.4-mini` low effort as the default RedLantern Codex mode. Use deep mode only for architecture, serious migrations, security, and scary refactors. Never export `OPENAI_API_KEY` globally.

Confidence: HIGH for Ro local setup. PARTIAL for Keymon until he verifies his machine.

First action: Keymon pulls Claudex and opens `OPS/KEYMON_CODEX_COST_SETUP_20260708.md`.

Decision deadline: before Keymon does another long Codex build session.

### Future Model Upgrade Policy

Default stays cheap until a new model earns promotion.

Promotion should happen only after a side by side check against the current default on RedLantern work, not on headlines or release notes alone. The comparison should answer three questions:

1. Does it lower cost for routine work?
2. Does it improve output quality on actual repo tasks?
3. Does it keep tool use, reliability, and latency acceptable?

If the answer is unclear, stay on the current default. If the answer is yes, promote in layers: deep first, then review if needed, then default only after the new model is stable enough for ordinary sessions.

For RedLantern documents, route the output through `/rlsdox` so the brand template is used instead of ad hoc formatting.

## ROI And KPI Framework

KPI: Percentage of routine Codex sessions using ChatGPT auth and mini default.

Baseline: UNKNOWN before this audit.

Target: 90 percent or higher for routine sessions.

Measurement: `codex doctor` auth summary plus `/status` or model indicator in active sessions.

Timeline: first seven days after setup.

Upgrade KPI: new model adoption only when side by side tests show equal or better quality at equal or lower cost.
