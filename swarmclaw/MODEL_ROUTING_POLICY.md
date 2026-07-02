# MODEL ROUTING POLICY — LOCKED (money-optimized)
Version: LOCKED 2026-06-25 · Do NOT change without Ro's explicit instruction.

## PRINCIPLE
Save money everywhere. Default to free + uncapped. Never let agents depend on a metered or rate-capped cloud provider for routine/autonomy work.

## LOCKED ROUTING
- **ALL agents → `ollama` / `llama3.1:8b`** (local, free, uncapped, cannot rate-crash). PRIMARY for everything incl. the autonomy/observation loop.
- **DeepSeek → DISABLED.** Paid AND was dead (402 Insufficient Balance + 401 invalid key). Do not re-enable.
- **Anthropic → DISABLED for agents.** Premium, reserve for explicit high-value manual use only.
- **Groq → ENABLED but unused by default.** Free burst only. Its 500k tokens/day cap caused GROQ-RATE-001 crashes when used as primary. Do not route agents here by default.

## INFRA (VERIFIED 2026-06-25)
- Ollama via brew, `brew services start ollama`, localhost:11434 (v0.30.10). Model `llama3.1:8b` (4.9GB) pulled + confirmed responding.
- Provider registered in `provider_configs` (id=ollama, baseUrl http://localhost:11434/v1).
- Agents carry provider=ollama, model=llama3.1:8b, apiEndpoint=http://localhost:11434/v1, ollamaMode=local.

## RE-APPLY AFTER ANY WIPE
```
cd ~/swarmclaw
pm2 stop swarmclaw
python3 set_ollama_all.py        # --dry-run to preview
bash ~/swarmclaw/sc-restart.sh
```

## ESCALATION ROUTING (prompt-builder.ts, commit ce23a01)
Operational/clarifying/technical/planning questions → PM agent (PM may consult ROBBY/CHIEF_OF_STAFF). `ask_human` reaches the founder ONLY for: money, legal/contract sign-off, irreversible/destructive actions, strategic/product direction. When unsure → PM, not founder.

## TRADE-OFF (truth)
Local 8B on a 16GB MacBook Air is lower quality than llama-4/deepseek and slower under heavy concurrency. Accepted in exchange for $0 cost and zero rate/auth/balance crashes. To prioritize quality later: Groq-primary + Ollama-fallback (requires verifying fallback engine actually engages on 429/402).
