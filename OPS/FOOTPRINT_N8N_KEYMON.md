# footprint. | n8n

Status: READY FOR KEYMON

Owner: Keymon

Purpose: Give Footprint one controlled automation home for candidate discovery, enrichment, scoring, approval routing, and follow through.

## What Keymon does tonight

1. Open [n8n Cloud](https://app.n8n.cloud/).
2. Sign in with the dedicated Footprint team email.
3. Create one workspace named `footprint.`
4. Invite Ro as owner and Homira as member.
5. Turn on two factor authentication for every human account.
6. Create one project named `footprint. production`.
7. Do not add any personal password, LinkedIn password, browser cookie, or personal account token.
8. Send Ro only the workspace URL and the email addresses that now have access. Never send passwords or secret values.

## Credentials to add after Supabase exists

Create credentials with these names:

1. `footprint supabase production`
2. `footprint approval inbox`
3. `footprint posthog production`
4. `footprint sentry production`

Use the smallest permission each connection needs. Keep every secret inside the n8n credential vault.

## Workflows to create

Create empty workflows with these exact names. Do not activate them yet.

1. `footprint 01 discover candidates`
2. `footprint 02 normalize and dedupe`
3. `footprint 03 enrich and score`
4. `footprint 04 add to private candidate list`
5. `footprint 05 prepare approval email`
6. `footprint 06 record approval decision`
7. `footprint 07 execute approved public action`
8. `footprint 08 monitor quality and stale records`
9. `footprint 09 stop and quarantine`

## Hard rules

1. Workflows 01 through 04 may run without human review once their technical gates pass.
2. Workflows 05 and 06 create and record the human approval loop.
3. Workflow 07 stays off until the ninety day policy gate, identity gate, safety gate, and deployment gate pass.
4. During the first ninety days, workflow 07 may act only when the dedicated Footprint inbox contains a recorded approval for the exact final action.
5. No login wall scraping. No personal account automation. No mass outreach. No silent approval.
6. Any missing source, conflicting identity, weak evidence, or opt out moves the record to quarantine.

## Receipt Keymon returns

1. Workspace URL
2. Project name
3. Invited team members
4. Screenshot showing the nine inactive workflows
5. Confirmation that no personal credentials were added

Official help: [n8n Cloud](https://docs.n8n.io/manage-cloud/overview/) and [n8n credentials](https://docs.n8n.io/integrations/builtin/credentials/)
