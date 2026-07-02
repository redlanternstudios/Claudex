# PRODUCT_FIREBREAK.md — RedLantern Product Firebreak
> Hard separation between Active, Maintenance, and Parked products.
> Prevents product bleed — the #1 cause of scattered, incomplete work.
> Updated in TODAY.md when sprint changes.

---

## RULE
At any moment, RedLantern operates with:
- **1 Active Build** — full agent team, new features allowed
- **1–2 Maintenance Lane** — bug fixes, compliance, critical updates only
- **Everything else: Parked** — no new code without Product Governor approval

---

## CURRENT STATE (2026-06-10)

### 🟢 ACTIVE BUILD
**Amina** — QuietBuild OS dogfood  
Goal: prove core loop is real and repeatable before scaling  
Sprint: /repo-ingest → truth audit → core loop verification  
Agents allowed: ALL (within tier permissions)

### 🟡 MAINTENANCE LANE
**Authentic Hadith** — active, scholarly sign-off gate  
Allowed work: bug fixes, SCHOLARLY_REVIEW coordination, content compliance  
No new features until Amina sprint complete

**Paradise** — active, COMPLIANCE gated  
Allowed work: vendor compliance, license/insurance/bond flow  
No new features until Amina sprint complete

### 🔴 PARKED
**HireWire** — paused until Amina proves QuietBuild OS  
Allowed: NONE. Security fixes only if critical.

**TradeSwarm** — blocked (schema drift confirmed, scope unknown)  
Allowed: /repo-ingest only. No build work until drift resolved.

**Clarity** — pipeline, no active sprint  
**Daily OS** — pipeline, no active sprint  
**QBos** — pipeline, no active sprint

---

## PARKED PRODUCT OVERRIDE CONDITIONS
A parked product may receive work ONLY if one of these applies:
1. **Security fix** — SECURITY issues a CRITICAL finding. ROBBY approves.
2. **Revenue-critical** — Ro declares it blocks revenue for an active product.
3. **Legal/religious safety** — COMPLIANCE issues a ruling requiring immediate fix.
4. **Deployment blocker** — parked product's infrastructure blocks an active product.

Override requires: Ro updates TODAY.md + RUNTIME acknowledges + CHANGE RECORD created.

---

## PRODUCT GOVERNOR RULE (enforced in RUNTIME + ROBBY prompts)
```
No agent may open work on a parked product unless:
1. TODAY.md shows the product as Active or Maintenance, OR
2. RUNTIME has flagged it as CRITICAL with an override reason, OR
3. Ro has explicitly stated the reassignment in Command Center.

Any agent that opens parked product work without this → task goes to dead-letter.
```

---

## SPRINT TRANSITION PROTOCOL
When Amina sprint completes and HireWire becomes active:
1. Ro updates TODAY.md — changes Active Build to HireWire
2. ROBBY posts transition brief to Command Center
3. Amina moves to Maintenance Lane
4. CHANGE RECORD created for sprint transition
5. Previous sprint end-of-day proof required before transition

---
*This file is read by ROBBY and PM at every session start. Product classification is owned by Ro.*
