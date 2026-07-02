# ORG STRUCTURE — By Red, LLC

Version 1.0 · 2026-07-02 · Roles and relationships only. **No personal contact info here** (that stays in the gitignored vault). Three layers: legal entity, human org, AI org.

---

## 1. LEGAL ENTITY

- **By Red, LLC** — Colorado LLC, in good standing, EIN confirmed. The parent legal entity.
- **RedLantern Studios** — operating brand / DBA of By Red, LLC. The software studio. (DBA filing noted as needed.)
- **Paradise Property Services** — separate business line / DBA under By Red, LLC (contractor/vendor operations). Licensed-entity structure with a named licensed operator.
- Ownership and financial specifics live in private legal docs, not in this repo.

---

## 2. HUMAN ORG (roles, not contacts)

| Person (first name) | Role | Scope |
|---|---|---|
| **Ro (Rory)** | Founder / judgment layer | Direction, final approval, product taste, all lanes. |
| **Bilal** | Co-founder (Halal Suite) / JV partner | Halal Software Suite, Deixis, Alif accelerator track. |
| **Keymon** | Ops / conductor collaborator (contractor) | Operator tooling, SwarmClaw/Robby setup, cross-engine bridge counterpart. |
| **Mohammed El Askary Jr.** | Co-investor / community + VC connector | Authentic Hadith backer, network. |
| **Basheer** | Licensed operator (Paradise) | Paradise Property Services licensed entity. |
| **Homira** | Contributor (invoiced) | Per-engagement work. |
| Others (Jah Jah, Paul, etc.) | Partners / family / network | Situational. |

Note: keep the Keymon vs Kevin distinction straight (two different people). Do not conflate. Contested naming (e.g. Basheer's full legal name) is resolved in private records, not here.

---

## 3. AI ORG (the QuietBuild OS engines)

```
Ro (founder — direction + final approval)
  │
  ├── Claude (Cowork) — senior specialist: architecture, security, taste, review
  ├── Codex (VS Code) — throughput builder: bulk implementation, native git
  │
  └── via CLAUDEX (shared brain + bridge state)
        │
        ├── SwarmClaw — agent execution org (36 agents, Ollama-routed)
        ├── Robby PA — conductor/operator (intake, route, receipts; cannot self-approve)
        └── Engines (QBos): TruthSerum (verify), SilentEngine (route/reason),
            SafetyEngine (gate), BrainSmart (deliberate), Delivery Kernel (ship)
```

Multi-operator: Ro's engines and **Keymon's engines** both bridge through Claudex. See `docs/EXTERNAL_OPERATOR_ONBOARDING.md`. Engine maturity is tracked in `docs/ENGINE_REGISTRY.md` (REAL / PARTIAL / UNVERIFIED — do not assume "named" means "working").

---

## AUTHORITY RULES

- Only **Ro** declares product-ready or approves merges to main.
- **Robby / agents** cannot self-approve, deploy silently, or overwrite source truth.
- **AI engines** propose and build; humans hold judgment and financial/legal decisions.
- Personal, financial, and legal PII never enters this repo — vault or private records only.
