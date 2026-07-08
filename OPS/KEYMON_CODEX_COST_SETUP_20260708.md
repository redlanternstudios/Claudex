# Keymon Codex Cost Setup

Date: 2026 07 08
Owner: Keymon
Source: Ro local Codex audit

## Retrieval

1. Pull Claudex.
2. Open this file:
   `OPS/KEYMON_CODEX_COST_SETUP_20260708.md`
3. Read the CTP decision if you want the full reasoning:
   `OPS/CTP_CODEX_COST_SETUP_20260708.md`

## What Ro Changed

VERIFIED: Ro local Codex now defaults to cheaper routine work.

Default config:

```toml
model = "gpt-5.4-mini"
model_reasoning_effort = "low"
model_verbosity = "low"
web_search = "cached"
tool_output_token_limit = 8000
cli_auth_credentials_store = "auto"
forced_login_method = "chatgpt"

[agents]
max_threads = 3
max_depth = 1
job_max_runtime_seconds = 1800
```

Deep profile:

```toml
model = "gpt-5.5"
model_reasoning_effort = "high"
model_verbosity = "medium"
web_search = "cached"
tool_output_token_limit = 12000

[agents]
max_threads = 3
max_depth = 1
job_max_runtime_seconds = 1800
```

Review profile:

```toml
model = "gpt-5.5"
model_reasoning_effort = "high"
model_verbosity = "medium"
web_search = "cached"
sandbox_mode = "read-only"
approval_policy = "on-request"
tool_output_token_limit = 12000

[agents]
max_threads = 2
max_depth = 1
job_max_runtime_seconds = 1800
```

## Keymon Setup

1. Back up your Codex config.

```bash
cp ~/.codex/config.toml ~/.codex/config.toml.backup
```

2. Put the default settings above into:

```bash
~/.codex/config.toml
```

3. Put the deep profile into:

```bash
~/.codex/deep.config.toml
```

4. Put the review profile into:

```bash
~/.codex/review.config.toml
```

5. Check shell startup files for global OpenAI keys.

```bash
grep -n "OPENAI_API_KEY" ~/.zshrc ~/.zprofile ~/.bash_profile ~/.bashrc ~/.profile 2>/dev/null
```

6. If you see `export OPENAI_API_KEY=...`, disable it globally. Keep API keys only in project env files when a project truly needs Platform API billing.

7. Remove a launch environment key if one exists.

```bash
launchctl unsetenv OPENAI_API_KEY
```

8. Restart Codex and terminal.

9. Verify.

```bash
env -u OPENAI_API_KEY codex doctor
```

Expected result:

```text
auth is configured
stored ChatGPT tokens: true
stored API key: false
reachability mode: ChatGPT auth
Responses WebSocket handshake succeeded
```

## Operating Rule

Use normal Codex for routine repo work:

```bash
codex
```

Use deep mode only for architecture, migrations, security, and high risk refactors:

```bash
codex --profile deep
```

Use review mode when Codex should inspect without writing:

```bash
codex --profile review
```

## Why This Matters

VERIFIED: API key auth bills through OpenAI Platform usage.

VERIFIED: ChatGPT login follows ChatGPT workspace and plan usage.

VERIFIED: Subagents cost more than single agent work because each worker performs its own model and tool work.

Rule: default cheap, escalate only when needed.

## Keymon Receipt Needed

After setup, Keymon should create a receipt with this intent:

`Keymon Codex cost setup verified`

Evidence required:

1. `codex doctor` shows ChatGPT auth.
2. No global `OPENAI_API_KEY` export remains.
3. Default model is `gpt-5.4-mini`.
4. Deep and review profiles exist.
