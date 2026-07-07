# RedLantern Lead Intake Prospect Answer Bank

Receipt timestamp: 2026-07-07T00:04:41-0700

## Status

VERIFIED: drafted from KP-provided prospect questions in this Codex session.

VERIFIED: current official platform pages confirm Microsoft Outlook support exists in both Make.com and n8n.

PARTIAL: this is an answer bank and automation knowledge spec. It does not prove any specific client tenant, CRM, mailbox, or production workflow is connected.

Sources checked:

- Make Microsoft 365 Email Outlook integration: `https://www.make.com/en/integrations/microsoft-email`
- n8n Microsoft Outlook node docs: `https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.microsoftoutlook`
- n8n Microsoft Outlook Trigger docs: `https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.microsoftoutlooktrigger`
- n8n Microsoft credentials docs: `https://docs.n8n.io/integrations/builtin/credentials/microsoft`

## Purpose

Give RedLantern's lead intake automation, sales assistant, and first discovery call flow a clean way to answer prospect questions without overpromising.

The automation should answer like a systems consultant, not like a chatbot trying to close too early.

## Core Positioning

Short answer:

```text
The Lead Intake System catches new leads, organizes them, routes them to the right person, and helps your team follow up faster without forcing you to abandon the tools you already use.
```

Plain-English version:

```text
It sits around your existing lead process. We connect to the places your leads already come from, clean up the intake flow, route each lead based on your rules, and give your team a simple place to see what needs action.
```

## System Shape

The system is mixed.

It can sit on top of the client's existing systems when the client already has usable tools:

- existing Outlook or Gmail inbox;
- existing website forms;
- existing CRM;
- existing calendar;
- existing spreadsheets;
- existing employee assignment process.

It can sit below the client's process when RedLantern needs to provide the operational engine:

- lead intake database;
- routing logic;
- reminder logic;
- error logging;
- proof records;
- internal dashboard or tracker.

It can sit between systems when the real job is connecting tools:

- form to CRM;
- email to CRM;
- CRM to employee assignment;
- CRM to calendar;
- missed lead to follow-up reminder;
- manager alert to employee task.

Client-safe answer:

```text
Most installs are mixed. We do not rip out your process first. We map how leads currently move, keep what is working, and place automation around the handoffs where leads get delayed, duplicated, or lost.
```

## Prospect Question Answer Bank

### What does it look like?

Client-safe answer:

```text
You would usually see three parts: the intake source, the tracking view, and the follow-up or routing actions. For example, a lead comes in from a form or inbox, the system logs it, checks what type of lead it is, assigns it to the right person, and creates the follow-up steps.
```

Discovery follow-up:

```text
Do your leads mostly come from forms, phone calls, email, ads, referrals, or a CRM already?
```

Automation data to collect:

- lead sources;
- required fields;
- current destination;
- first human action;
- current failure points.

### Can I see it?

Client-safe answer:

```text
Yes. I can show you a demo version and walk you through the flow from lead capture to follow-up. For your business, the exact view depends on whether we connect to your current CRM or provide a lightweight tracker first.
```

Do not say:

```text
This is already ready for your exact system.
```

unless there is a client-specific proof receipt.

Automation action:

- offer demo flow;
- collect prospect's current tools;
- mark demo status as generic, industry-specific, or client-specific.

### Does it come with its own email?

Client-safe answer:

```text
It can, but it does not have to. Some businesses want a dedicated intake email like leads@yourdomain.com. Others want the system to work with the inbox they already use. We decide that during setup based on your team and brand.
```

Discovery follow-up:

```text
Do you want replies coming from a shared company inbox, the assigned employee, or a dedicated intake address?
```

### Can I bring my Outlook email?

Client-safe answer:

```text
Yes, Outlook can be part of the setup. The final setup depends on your Microsoft 365 account permissions, but Outlook is a normal integration path for this kind of workflow.
```

Proof status:

- VERIFIED: Make.com has Microsoft 365 Email Outlook modules.
- VERIFIED: n8n has Microsoft Outlook node and trigger support.
- MISSING: the prospect's Microsoft tenant permissions, admin consent, mailbox type, and security policy must be checked before promising a live connection.

Discovery follow-up:

```text
Is your Outlook account personal, Microsoft 365 Business, or managed by an IT admin?
```

### Can this automatically route leads to the correct employees?

Client-safe answer:

```text
Yes, if we define the routing rules. Leads can be routed by service type, location, department, urgency, source, deal size, or availability. The key is making the assignment rules explicit before we automate them.
```

Discovery follow-up:

```text
How do you decide today who gets a lead?
```

Automation data to collect:

- employee list;
- departments or roles;
- routing rules;
- fallback owner;
- out-of-office or unavailable handling;
- manager escalation rule.

### I need it, but I want to see it first.

Client-safe answer:

```text
That is the right move. First we show the general flow. Then we map your current lead path. After that, we can build a small proof version using one real lead path before anything is scaled.
```

Discovery call move:

```text
Let's pick one lead source and one follow-up path. If we can prove that path cleanly, then we can decide whether to expand it across the team.
```

### Does this sit on top of my process, below it, or mixed?

Client-safe answer:

```text
Usually mixed. It sits on top where you already have good tools, below where you need the automation engine, and between systems where your team is manually copying, chasing, or routing information.
```

Technical translation:

- on top: dashboards, reminders, summaries;
- below: database, routing engine, logging, proof;
- between: integrations, triggers, follow-up handoffs.

### What manual configuration is required to get it running?

Client-safe answer:

```text
We need access to the tools we are connecting, your lead fields, your routing rules, and the message or follow-up rules you want the system to use. You do not need to rebuild your business process from scratch, but we do need clear rules so the automation does not guess.
```

Setup checklist:

- lead source access;
- mailbox access or shared inbox setup;
- CRM or tracker access;
- calendar access if scheduling is included;
- employee routing list;
- lead status definitions;
- follow-up templates;
- escalation rules;
- test lead approval;
- go-live approval.

### What manual support is needed after handoff?

Client-safe answer:

```text
After handoff, your team mainly needs to keep the connected accounts active, tell us when your process changes, and review exceptions the system flags. If an employee changes roles, a form changes, or your CRM fields change, the automation may need a small update.
```

Maintenance items:

- connection health checks;
- employee list updates;
- form or field changes;
- CRM field changes;
- failed run review;
- follow-up template updates;
- monthly optimization review.

### Is Google the only platform you can use?

Client-safe answer:

```text
No. Google is not the only option. We can work with Google Workspace, Microsoft Outlook, CRMs, forms, spreadsheets, calendars, and other tools depending on what your business already uses.
```

Truth boundary:

```text
The exact tool list gets verified during setup. I do not want to promise a connection until we check your actual account, permissions, and workflow.
```

### Do you provide the CRM, or integrate with mine?

Client-safe answer:

```text
Both are possible. If you already have a CRM your team uses, the best path is usually to integrate with it. If you do not have one, we can provide a lightweight tracker to start, then upgrade or connect to a full CRM later if the team needs it.
```

Stronger sales answer:

```text
I do not want to sell you a new CRM if your current system works. The first question is whether your current CRM is helping or slowing down the lead process.
```

### What is the cost per seat if I bring on my team?

Client-safe answer:

```text
That depends on which CRM or workspace we use. If we connect to your existing CRM, your seat cost is whatever your CRM provider charges. If we provide a lightweight tracker, we can keep the first version lean and only add paid seats where your team actually needs access.
```

Do not quote exact per-seat prices unless current vendor pricing has been verified during the active sales process.

Discovery follow-up:

```text
How many people need to view leads, and how many people need to edit or own leads? Those are different access levels, and that affects cost.
```

Automation data to collect:

- total team size;
- viewers vs editors;
- managers vs reps;
- CRM already owned;
- user permission needs;
- required reporting visibility.

### If I open CRM access to my whole floor, does everyone need a paid seat?

Client-safe answer:

```text
Not always, but sometimes. It depends on the CRM and what each person needs to do. Some teams only need a few users editing records while managers or floor staff view reports another way. We design the access model before we commit you to unnecessary seats.
```

Design principle:

```text
Do not buy seats until roles are clear.
```

## First Discovery Call Question Set

The automation should ask or equip KP to ask:

1. Where do leads come from today?
2. Where do leads get lost, delayed, duplicated, or forgotten?
3. What happens in the first 5 minutes after a lead comes in?
4. Who decides which employee gets the lead?
5. What tools are already in place?
6. Is email Google, Outlook, or something else?
7. Do you already have a CRM?
8. If yes, which CRM and who uses it?
9. If no, do you need a full CRM or just a lead tracker first?
10. How many people need view access?
11. How many people need edit or owner access?
12. What follow-up messages are already working?
13. What follow-ups should never be automated?
14. What counts as urgent?
15. Who is the fallback owner when the system is unsure?
16. What data is sensitive or should not enter automation?
17. What proof would make you comfortable moving forward?

## Automation Response Requirements

Any sales assistant or intake automation answering prospect questions must:

- distinguish generic demo from client-specific verified setup;
- avoid exact pricing unless vendor pricing is checked in the sales process;
- ask what CRM/email/calendar the prospect already uses;
- ask how leads are currently assigned;
- ask whether the prospect wants dedicated intake email or existing mailbox;
- explain that Outlook is possible but tenant permissions must be verified;
- explain that the system is usually mixed: on top, below, and between existing systems;
- capture team seat assumptions as viewers vs editors vs owners;
- route any L2 decision to KP before commitment.

## Client-Safe Close

Use this close when the prospect is interested:

```text
The next step is not to rebuild your whole operation. The next step is to map one lead path, connect the tools involved, and prove that one lead can move from capture to assignment to follow-up without getting lost. Once that works, we decide what should scale.
```

## Do Not Say

- "It works with everything."
- "Everyone gets access for free."
- "We will replace your CRM."
- "Google is required."
- "Outlook will definitely work in your account."
- "This is fully ready for your business already."
- "No manual setup is needed."

## Proof Gate Before Client Claim

Before using this as client-facing material:

- verify the actual demo path;
- capture screenshots or screen recording;
- remove internal paths and IDs;
- verify the email platform claim being made;
- verify CRM access model and vendor seat pricing if pricing is mentioned;
- get KP approval for first public/client-facing use.
