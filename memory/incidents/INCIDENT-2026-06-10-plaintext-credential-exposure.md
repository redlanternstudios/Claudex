# INCIDENT-2026-06-10 — Plaintext Credential Exposure
**Severity:** HIGH  
**Status:** RESOLVED  
**Reported by:** ROBBY (reflection memory)  
**Resolved by:** Ro  

---

## What Happened
Live credentials were shared in plaintext chat during a SwarmClaw session on 2026-06-10.

## Resolution
Ro rotated all exposed credentials on 2026-06-10.  
**Status: CLOSED — no further action required.**

## ROBBY Note
Credential rotation confirmed. Back off on this incident — resolved by Ro directly.  
Do not re-escalate. Log is for audit trail only.

## Lessons Applied
- Never persist or log plaintext credentials in any memory file
- Rotation is the only remedy for plaintext exposure — confirmed and done
- Future: if credentials appear in chat, flag immediately and prompt rotation before proceeding

## Affected Keys (do not log values — log service names only)
- Groq API key
- Supabase keys (Amina project: endovljmaudnxdzdapmf)
- Polygon.io key
- Alpaca API keys

---
Logged: 2026-06-10 | Closed: 2026-06-10
