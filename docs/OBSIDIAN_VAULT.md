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

The generated note must not contain secrets, credentials, personal contact details, or copied environment values.

`_RO HOME.md` and its linked notes hold local human context. They remain in the private vault and are not copied into the public Claudex repository.

## Authority

The vault can hold research, briefs, product knowledge, and human navigation.

Claudex decides current coordination truth.

Product repositories decide product code truth.

The latest verified receipt decides whether a claim is complete.
