# PE Incoming Automation Discovery Queue

Receipt timestamp: 2026-07-07T00:04:41-0700

## Status

PARTIAL: first discovery queue drafted from local PE control files.

Missing: live Make Grid receipt, live n8n workflow inventory, and KP's exact incoming automation list.

## Claudex Link

- Claudex repo: `/Users/kp/Penn Enterprises LLC/Claudex`
- Claudex commit published: `a46fdd6`
- Claudex receipt: `/Users/kp/Penn Enterprises LLC/Claudex/OPS/receipts/TC-20260707-011.md`
- Claudex lane: `claudex/pe-incoming-automation-discovery`
- PE setup packet: `/Users/kp/Penn Enterprises LLC/operations/handoffs/CLAUDEX_PE_INCOMING_AUTOMATION_DISCOVERY_2026-07-07.md`
- Permissible scope packet: `/Users/kp/Penn Enterprises LLC/operations/handoffs/REDLANTERN_AI_AUTOMATION_PERMISSIBLE_SCOPE_2026-07-07.md`
- Prospect answer bank: `/Users/kp/Penn Enterprises LLC/operations/handoffs/REDLANTERN_LEAD_INTAKE_PROSPECT_ANSWER_BANK_2026-07-07.md`

## Queue

| Priority | Automation | Source | Outcome | Initial Routing | Proof Gate | Status |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | PE Tier 1 Intake Engine n8n error investigation | `/Users/kp/Penn Enterprises LLC/operations/CURRENT_WORK.md` | Diagnose the one real n8n execution error surfaced in the last 7 days | n8n first; Make only if the error crosses the Make twin | n8n execution id, root cause, fix or no-change finding, destination readback if write path is touched | LOCAL POINTER VERIFIED; LIVE ERROR UNVERIFIED THIS SESSION |
| 2 | Revenue Cell Work Intake Router | `/Users/kp/Penn Enterprises LLC/operations/revenue-cell/AUTOMATION_BLUEPRINTS.md` | Turn business objectives into routed team work | n8n for routing logic; Make only for external SaaS trigger glue | task packet in `handoffs/`, pipeline row update, KP approval flag readback | LOCAL BLUEPRINT VERIFIED; LIVE BUILD UNVERIFIED |
| 3 | Provider Handoff Ledger | `/Users/kp/Penn Enterprises LLC/operations/revenue-cell/AUTOMATION_BLUEPRINTS.md` | Track provider handoffs, acceptance, savings, and rework avoided | n8n or local ledger first; Make not primary | handoff packet exists, next agent consumed it, Codex acceptance or rejection logged | LOCAL BLUEPRINT VERIFIED; LIVE BUILD UNVERIFIED |
| 4 | Revenue Pipeline Automation | `/Users/kp/Penn Enterprises LLC/operations/revenue-cell/AUTOMATION_BLUEPRINTS.md` | Move prospects from candidate to qualified to outreach prepared | n8n if logic branches; Make acceptable for simple Sheet or Notion flow | one synthetic prospect travels through candidate to qualified to outreach prepared with destination readback | LOCAL BLUEPRINT VERIFIED; LIVE BUILD UNVERIFIED |
| 5 | Build and QA Gate | `/Users/kp/Penn Enterprises LLC/operations/revenue-cell/AUTOMATION_BLUEPRINTS.md` and `02_ERROR_CODEX.md` | Stop broken client automations and paid loops before scale | n8n or Make depending on target workflow | one real input to actual write target to destination readback to receipt | LOCAL BLUEPRINT VERIFIED; LIVE BUILD UNVERIFIED |
| 6 | Learning Loop Automation | `/Users/kp/Penn Enterprises LLC/operations/revenue-cell/AUTOMATION_BLUEPRINTS.md` | Capture verified lessons from completed or rejected tasks | n8n for classification; local ledger is source of truth | `REVENUE_LEARNING_LEDGER.md` entry with linked receipt and verification status | LOCAL BLUEPRINT VERIFIED; LIVE BUILD UNVERIFIED |
| 7 | KP Dashboard Feed | `/Users/kp/Penn Enterprises LLC/operations/revenue-cell/AUTOMATION_BLUEPRINTS.md` | Show approvals, hot opportunities, revenue status, broken loops, lessons, next best action | n8n for aggregation; frontend/dashboard only renders | dashboard source generated from current ledgers with no missing high-risk approval item | LOCAL BLUEPRINT VERIFIED; LIVE BUILD UNVERIFIED |
| 8 | Make per-scenario error counts v1.2 | `/Users/kp/Penn Enterprises LLC/operations/CURRENT_WORK.md` | Enrich pipeline tracker with per-scenario Make error counts | Make API or MCP path; no module edits | `/scenarios/{id}/logs` evidence and tracker readback | LOCAL POINTER VERIFIED; LIVE API UNVERIFIED |
| 9 | AI Front Desk proof packet automation completion | `/Users/kp/Penn Enterprises LLC/PE Automation Operating System/PE_AI_Front_Desk_Proof_Packet_v1/` | Move the proof packet from staged evidence toward a real sellable automation asset | Make for SaaS intake glue; n8n if AI classification and CRM branching become durable logic | CRM row created by automation, AI analysis output, owner alert, and readback receipts | LOCAL PROOF PACKET VERIFIED; LIVE AUTOMATION UNVERIFIED |

## Classification Rule For This Queue

If the automation contains branching business logic, AI classification, custom code, durable retries, private data processing, or multi-step state transitions, route it to n8n first.

If the automation is mostly app-to-app transfer with simple mappings and client-friendly visibility, route it to Make.com first.

If both apply, Make handles SaaS trigger and delivery, n8n owns the logic.

## Discovery Gate Before Build

Before any build or fix:

1. Confirm whether the target is Make, n8n, or both.
2. For Make, capture Make Grid receipt if browser/Grid access is available.
3. For n8n, confirm live workflow id, owner project, active state, and latest execution health.
4. Prove one item through the real write path before schedule, batch, or paid AI scale.
5. Record the receipt in the correct PE ledger and leave Claudex as the bridge pointer, not the second source of truth.

## Smallest Missing Fact

The exact incoming automation list is still missing. The queue above is a local-control-file inventory, not a live dashboard inventory.

KP or the next operator can unblock the live queue by providing one of:

- Make organization and team plus Make Grid access;
- n8n workflow list or live API/dashboard access;
- a plain list of incoming automations with trigger, source, destination, and business outcome.
