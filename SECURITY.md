# Security Policy

## Secret rule

Never commit credentials, tokens, cookies, private keys, connection strings, or environment values.

Claudex stores names and approved locations only.

## State integrity

All bridge writes must pass the command layer or equivalent validation.

Red means stop. Yellow means continue with stated warnings. Green means no unresolved warnings or blockers.

## Incident response

If a secret enters Git history:

1. Mark global state red.
2. Rotate the credential immediately.
3. Remove the value from the working tree.
4. Assess history cleanup with Ro before rewriting Git history.
5. Write a receipt with exposure scope and rotation proof.

## Reporting

Report bridge integrity or credential issues privately to Ro.
