# SILENTENGINE ROUTING POLICY — model routing doctrine

Version 1.0 · 2026-07-02 · **DOCTRINE.** Source `QBos/packages/silent-engine` = REAL/PARTIAL (4,638 LOC, 5 tests).

How any model call should be routed. Import the sequence, not the whole engine.

## THE SEQUENCE (order is the point)
```
safety check → policy select → model route → fallback chain → cost calc → audit log → receipt
```
1. **Safety check first** (SafetyEngine gate) — never route unsafe input to any model.
2. **Policy select** — task tier decides candidate models.
3. **Model route** — pick per tier + cost + latency.
4. **Fallback chain** — on failure, degrade gracefully to the next provider.
5. **Cost calc** — record token/cost estimate.
6. **Audit log** — emit routing decision event.
7. **Receipt** — for meaningful runs.

## CURRENT ROUTING (VERIFIED, LOCKED 2026-06-25)
- All SwarmClaw agents → **Ollama local `llama3.1:8b`** (free, uncapped). DeepSeek/Anthropic OFF. Groq free-burst only.
- Re-apply: `python3 ~/swarmclaw/set_ollama_all.py`. Full policy: `swarmclaw/MODEL_ROUTING_POLICY.md`.

## HONEST CAVEAT (TruthSerum)
Heavy-judgment engines (TruthSerum verify, SafetyEngine classify, BrainSmart deliberate) currently route to an 8B local model. That is cost-optimal but likely under-powered for the judgment the doctrine implies. **Capability gap is real.** The lever: route only judgment-critical, revenue-justified tasks to a stronger model (Groq/Anthropic) per product, and log the decision. Do not claim verification quality the routed model cannot deliver.
