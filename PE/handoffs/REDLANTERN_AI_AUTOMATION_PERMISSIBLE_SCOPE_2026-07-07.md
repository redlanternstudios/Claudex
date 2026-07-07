# RedLantern AI Automation Permissible Scope

Receipt timestamp: 2026-07-07T00:04:41-0700

## Status

VERIFIED: Scope drafted from KP-provided offer language in this Codex session.

PARTIAL: This scope does not verify live Make.com, n8n, or client-facing readiness. It only defines what is permissible to move forward for discovery, packaging, and proof planning.

## Scope Lock

Outcome: define the permissible working scope for RedLantern AI Automation so already-built automations can move forward through discovery, packaging, proof, and responsible client-offer framing.

Done receipt: this scope packet plus the linked discovery queue.

Not now:

- no production Make.com edits;
- no n8n activation or workflow edits;
- no client-facing publish or sales claim;
- no proof claim that is not backed by an execution, destination readback, screenshot, file, commit, or dashboard receipt.

## Offer Boundary

KP-provided offer language:

```text
Smart automations powered by AI that handle the repetitive work — customer follow-ups, document generation, data entry, scheduling, and more. We design workflows that run in the background so your team can focus on the work that actually needs a human.
```

Permissible offer category:

```text
AI Automation for business optimization.
```

The service may include workflow discovery, automation design, workflow buildout, proof testing, documentation, packaging, and responsible handoff for business operations automations.

## Included Automation Types

These are inside scope:

1. AI-powered customer follow-up
2. document and proposal generation
3. automated scheduling and reminders
4. data extraction and processing
5. data entry and CRM updates
6. integration with existing tools
7. internal routing and task handoffs
8. approval reminders and dashboard feeds
9. error handling, failure alerts, and proof logs
10. reusable automation packages for client delivery

## Platform Permission

Make.com is permissible when:

- the automation is mostly SaaS-to-SaaS movement;
- the workflow benefits from a visual client-friendly interface;
- the logic is simple enough to prove through Make history and destination readback;
- Make Grid has been checked before scenario-impact work.

n8n is permissible when:

- the automation contains business logic;
- AI classification or generation is part of the core workflow;
- custom code, branching, retries, or durable self-hosted execution are needed;
- private or sensitive data should stay in the self-hosted lane;
- the system needs a stronger proof or monitoring layer than a simple SaaS connector.

Both are permissible when:

- Make handles external SaaS trigger or delivery;
- n8n owns the logic, AI work, transformation, retry, and proof flow.

## RedLantern May Move Forward With

RedLantern, Claude Code, Codex, and supporting agents may move forward with:

- inventorying already-built automations;
- classifying each automation under the included automation types;
- mapping each automation to Make, n8n, or hybrid routing;
- producing client-safe descriptions;
- producing internal technical descriptions;
- drafting build specs and proof plans;
- packaging verified automations into reusable assets;
- creating GitHub or Claudex handoff packets;
- producing non-public sales or discovery material;
- identifying missing proof and blockers.

## Approval Gates

L0, Codex or Claude may do without KP approval:

- read local files;
- draft scope, specs, and handoffs;
- create internal documentation;
- create non-public proof plans;
- classify automations;
- run local checks that do not mutate external systems.

L1, recommend then proceed if low risk:

- update internal queue or handoff files;
- prepare PRs or staging-only config packets;
- draft client-safe descriptions;
- organize proof packets.

L2, KP approval required:

- production Make.com edits;
- n8n activation, deactivation, or production workflow changes;
- sending client-facing messages;
- publishing website, portfolio, social, or sales claims;
- paid tool spend;
- new client commitment, pricing, contract, or proposal;
- any action touching sensitive client data or irreversible external state.

## Proof Gates

No automation can be called ready, sellable, shipped, or client-safe until it has the matching proof:

- Make.com: Make Grid receipt when landscape context matters, scenario history, execution id, and destination readback.
- n8n: workflow id, active state if applicable, execution id, one real item through the live write path, and destination readback.
- Document generation: generated document file plus source input trace.
- Customer follow-up: sent-message proof or staged draft proof, depending on approval gate.
- Scheduling: calendar or task readback.
- Data extraction: source sample, extracted output, validation check, and destination readback.
- CRM/data entry: row/page/API record readback.
- Client-facing claim: sanitized receipt summary with no internal IDs, secrets, private paths, or client data.

## Exclusions

Outside scope unless KP separately approves:

- cold outreach at scale;
- live Gmail sending;
- public posting;
- legal, finance, healthcare, or compliance advice automation;
- scraping where terms or permission are unclear;
- credential handling in docs or chat;
- replacing human approval for client-facing commitments;
- storing secrets, cookies, tokens, raw env values, or client data dumps in Claudex or handoff files.

## First Discovery Categories

The initial discovery queue should group already-built or incoming automations under:

1. Customer Follow-Up
2. Document and Proposal Generation
3. Scheduling and Reminders
4. Data Extraction and Processing
5. CRM and Data Entry
6. Tool Integrations
7. Internal Team Routing
8. Error Handling and Monitoring
9. Proof Packaging

## Current Linked Queue

Use this file as the current operating queue:

`/Users/kp/Penn Enterprises LLC/operations/handoffs/PE_INCOMING_AUTOMATION_DISCOVERY_QUEUE_2026-07-07.md`

Use this file as the current Claudex lane setup packet:

`/Users/kp/Penn Enterprises LLC/operations/handoffs/CLAUDEX_PE_INCOMING_AUTOMATION_DISCOVERY_2026-07-07.md`

Use this file as the lead intake prospect answer bank:

`/Users/kp/Penn Enterprises LLC/operations/handoffs/REDLANTERN_LEAD_INTAKE_PROSPECT_ANSWER_BANK_2026-07-07.md`

## Decision

APPROVED WORKING SCOPE: RedLantern can move forward on AI Automation discovery and packaging for the categories above, as long as every automation stays behind the proof gates and approval gates in this packet.

NOT APPROVED BY THIS PACKET: production mutation, activation, public claims, client commitments, or paid spend.

## Next Action

Turn the discovery queue into a category view:

- each automation;
- category;
- Make/n8n/hybrid route;
- current proof status;
- missing proof;
- approval gate;
- next receipt needed.
