# PE / RedLantern Subject

Receipt timestamp: 2026-07-07T00:04:41-0700

## Status

PARTIAL: Bridged into Claudex as a coordination subject file.

This file points to the Penn Enterprises control-plane artifacts. It is not the source of truth for live Make.com or n8n readiness.

## Subject

RedLantern AI Automation and the Lead Intake System sales/discovery answer bank for Penn Enterprises.

## Why This Exists

KP wants RedLantern's existing and incoming AI automations to move forward with a permissible scope, so prospects can ask practical first-call questions and the system can answer without overpromising.

The key prospect context:

```text
I want to invest in the lead intake system for my business.
What does it look like? Can I see it?
Does it come with its own email?
Can I bring Outlook?
Can it route leads to the right employees?
Does it sit on top of my systems, below them, or mixed?
What manual configuration is required?
Is Google the only platform?
Do you provide the CRM or integrate with mine?
What is the cost per seat if I open this up to my team?
```

## Current Answer

The Lead Intake System should be described as a mixed-layer system.

It sits:

- on top of existing systems for visibility, dashboards, reminders, and summaries;
- between systems for intake, routing, CRM updates, inbox handoffs, and scheduling handoffs;
- below the process when RedLantern provides the routing logic, tracker, proof logs, and failure alerts.

It should not be framed as a forced replacement for the client's email, CRM, or process.

## Client-Safe Positioning

```text
The Lead Intake System catches new leads, organizes them, routes them to the right person, and helps your team follow up faster without forcing you to abandon the tools you already use.
```

```text
Most installs are mixed. We do not rip out your process first. We map how leads currently move, keep what is working, and place automation around the handoffs where leads get delayed, duplicated, or lost.
```

## Key Permission Boundary

Allowed through this subject:

- discovery;
- categorization;
- internal sales answer-bank drafting;
- proof planning;
- demo planning;
- packaging;
- client-safe framing drafts.

Not allowed through this subject without KP approval and proof:

- production Make.com edits;
- n8n activation or workflow changes;
- public claims;
- client commitments;
- paid spend;
- exact vendor pricing claims;
- claiming a prospect's Outlook, CRM, or mailbox is connected before a live connection test.

## Outlook Status

VERIFIED in the Codex session that created the PE answer bank:

- Make.com has Microsoft 365 Email Outlook integration pages.
- n8n has Microsoft Outlook node and trigger documentation.
- n8n has Microsoft credential documentation covering Microsoft Outlook.

Still missing before a client-specific promise:

- the prospect's Microsoft account type;
- tenant admin consent requirements;
- mailbox security policy;
- whether the connection can be tested in the prospect environment.

## Source Artifacts

Penn Enterprises source of truth:

- `/Users/kp/Penn Enterprises LLC/operations/handoffs/REDLANTERN_LEAD_INTAKE_PROSPECT_ANSWER_BANK_2026-07-07.md`
- `/Users/kp/Penn Enterprises LLC/operations/handoffs/REDLANTERN_AI_AUTOMATION_PERMISSIBLE_SCOPE_2026-07-07.md`
- `/Users/kp/Penn Enterprises LLC/operations/handoffs/PE_INCOMING_AUTOMATION_DISCOVERY_QUEUE_2026-07-07.md`
- `/Users/kp/Penn Enterprises LLC/operations/handoffs/CLAUDEX_PE_INCOMING_AUTOMATION_DISCOVERY_2026-07-07.md`

Claudex bridge receipts:

- `OPS/receipts/TC-20260707-012.md`
- `OPS/receipts/TC-20260707-013.md`

## Next Claudex Action

Use this subject file to route Claude Code or Codex back to the PE source artifacts, then:

1. categorize existing lead-intake automations against the prospect questions;
2. verify the live demo path;
3. verify Make Grid organization and scenario context;
4. verify n8n workflow inventory and health;
5. verify CRM and email claims before client-facing use.

## Truth Boundary

This file is a bridge pointer and operating brief.

Do not treat it as proof that:

- a live demo exists;
- a client's Outlook tenant is connected;
- a client's CRM is integrated;
- team seat pricing is known;
- Make.com or n8n production state is ready.

Those claims require fresh receipts.
