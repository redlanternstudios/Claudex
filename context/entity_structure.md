# ENTITY STRUCTURE — REDLANTERN STUDIOS
Version: 1.0 | Last reviewed: 2026-04-17
This file governs which legal entity is used in every contract, document, and external action.
Claude must reference this before generating any business document.

---

## ENTITIES

### ENTITY 1: Basheer (Licensed Entity)
**Role:** Licensed contractor / service provider for Paradise Property Services
**Used for:** Contracts where a licensed entity is required (contractor agreements, vendor work orders, licensed trade work)
**Legal basis:** Holds the contractor license
**Address:** [UNKNOWN — requires Ro input]
**License number:** [UNKNOWN — requires Ro input]
**Insurance:** [UNKNOWN — requires Ro input]

**Use this entity when:** The work requires a contractor license. Paradise vendor agreements where Basheer is the performing party.

**Do NOT use for:** RedLantern Studios product agreements, software contracts, or any work that does not require a contractor license.

---

### ENTITY 2: By Red (Operations Layer)
**Role:** Operational entity for Paradise Property Services day-to-day operations
**Used for:** Vendor onboarding, subcontractor management, operational agreements where licensed work is not required
**Legal basis:** Business operations entity
**Address:** [UNKNOWN — requires Ro input]

**Use this entity when:** Paradise vendor packets for non-licensed operational work. Subcontractor management. Operational service agreements.

**Do NOT use for:** Work requiring a contractor license (that's Basheer). Software or product work (that's RedLantern Studios).

---

### ENTITY 3: RedLantern Studios (Product Entity)
**Role:** Technology product company. Owns HireWire, the RedLantern OS, and all software products.
**Used for:** Software agreements, SaaS contracts, technology partnerships, product licensing
**Legal basis:** Primary product and IP entity
**Address:** [UNKNOWN — requires Ro input]

**Use this entity when:** Any HireWire-related agreement. Software subscriptions. Technology vendor contracts. Product partnerships.

**Do NOT use for:** Contractor work (that's Basheer or By Red). Physical service work (that's Paradise entities).

---

## ENTITY ROUTING RULES

| Situation | Use Entity |
|-----------|-----------|
| Vendor contract for Paradise trade work | Basheer |
| Vendor onboarding for Paradise operations | By Red |
| Subcontractor agreement (Paradise) | By Red (or Basheer if licensed work) |
| Software vendor contract | RedLantern Studios |
| HireWire partnership | RedLantern Studios |
| Technology subscription | RedLantern Studios |
| Insurance certificate request | Basheer (for licensed work) |
| Ambiguous situation | → STOP. Ask Ro. Do not assume. |

---

## ENFORCEMENT RULE

Claude must check this file before generating any contract, vendor packet, or business document.
If the entity is ambiguous, Claude must ask Ro explicitly. No guessing.
Wrong entity on a contract = legal exposure.
