# API Key Vault Index

Status: POINTERS ONLY

Claudex does not store credentials.

Approved value locations:

1. Local environment files excluded by Git.
2. Operating system credential storage.
3. GitHub Actions secrets.
4. Vercel project environment variables.
5. Supabase managed secrets.
6. n8n credential records.
7. Make connection records.

Every bridge claim about a provider must distinguish:

1. Configuration present.
2. Credential present.
3. Authentication verified.
4. Capability verified.
5. Production action receipted.

These are separate truth states. Never infer a later state from an earlier one.
