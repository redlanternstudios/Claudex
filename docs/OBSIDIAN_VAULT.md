# Obsidian Vault

Status: VERIFIED

Obsidian is the human knowledge view for RedLantern Studios. Claudex remains the canonical coordination source for engine state, lane ownership, warnings, blockers, and receipts.

## Local vault

Default path:

`~/Documents/Claude/Projects/RedLantern Studios`

Override with:

`CLAUDEX_OBSIDIAN_VAULT`

## Live note

Run:

`npm run bridge:obsidian`

This generates `_CLAUDEX LIVE.md` from `OPS/BRIDGE.json`. The note points back to the control room, product registry, repository inventory, current work, risks, and receipts.

The same sync also generates `_CLAUDEX STARTUP PACK.md`, which is the vault entry point for starting from the same context every time.

The generated note must not contain secrets, credentials, personal contact details, or copied environment values.

`_RO HOME.md` and its linked notes hold local human context. They remain in the private vault and are not copied into the public Claudex repository.

`_PLATFORMS HOME.md` links the local v0, GitHub, and Supabase knowledge rooms. GitHub and Supabase facts should be refreshed from their live connectors. v0 account state remains PARTIAL unless a live v0 source verifies it.

## Authority

The vault can hold research, briefs, product knowledge, and human navigation.

Claudex decides current coordination truth.

Product repositories decide product code truth.

The latest verified receipt decides whether a claim is complete.
