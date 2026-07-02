# Environment Variable Name Registry

Status: ACTIVE

This file stores names, purpose, owner, and source location only.

Secret values are prohibited.

| Name pattern | Purpose | Expected source | Owner |
|---|---|---|---|
| `OPENAI_API_KEY` | OpenAI API access | local environment or managed platform | Ro |
| `ANTHROPIC_API_KEY` | Anthropic API access | local environment or managed platform | Ro |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase server administration | product environment | Product owner |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase public client | product environment | Product owner |
| `GROQ_API_KEY` | Groq model routing | local or automation environment | Ro |
| `OPENROUTER_API_KEY` | Model fallback routing | local or automation environment | Ro |
| `GITHUB_TOKEN` | GitHub automation | GitHub Actions or local credential manager | Ro |

Add product specific names only after verifying they exist. Never paste values.
