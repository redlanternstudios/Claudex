# footprint. | Sentry

Status: MANUAL ACCOUNT CREATION REQUIRED

Owner: Ro or Keymon

Purpose: Catch broken Footprint pages, failed automations, and unsafe error paths before users carry the damage.

## What the owner does

1. Open [Sentry](https://sentry.io/signup/).
2. Sign in with the dedicated Footprint team email.
3. Create or select the organization for By Red, LLC.
4. Create one project named `footprint web` using the Next.js platform.
5. Create one project named `footprint automation` only when the n8n error bridge is ready.
6. Invite Ro as owner and Keymon as member.
7. Keep source map access private.
8. Send Codex only the organization slug, project slug, and approved connection values through the secret handoff.

## Alerts

Create alerts for:

1. New production error
2. Repeated candidate workflow failure
3. Approval workflow failure
4. Unauthorized public action attempt
5. Stop state failure

## Privacy rules

1. Remove personal data from error payloads.
2. Never send candidate message bodies, resumes, tokens, or approval email content to Sentry.
3. Use candidate record identifiers instead of names where possible.

## Receipt

1. Organization slug
2. Project slugs
3. Invited members
4. Screenshot of alert rules

Official help: [Sentry projects](https://docs.sentry.io/product/projects/)
