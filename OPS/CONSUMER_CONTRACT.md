# Claudex Consumer Contract

Version: 1.0

A product repository consumes Claudex. It never copies or owns bridge state.

## Required consumer file

Each workspace may contain `.claudex.json`:

```json
{
  "version": "1.1",
  "bridge_repo": "https://github.com/redlanternstudios/Claudex.git",
  "bridge_ref": "main",
  "bridge_file": "OPS/BRIDGE.json",
  "local_bridge_path": "../Claudex/OPS/BRIDGE.json",
  "product_key": "amina"
}
```

## Boot rule

Codex and Claude read the resolved Claudex bridge before product instructions.

Resolution order:

1. Read `local_bridge_path` when it exists.
2. Otherwise locate or clone `bridge_repo` at `bridge_ref`.
3. Read `bridge_file`.
4. Never create a product local bridge as fallback state.

The installer creates or updates managed blocks in `AGENTS.md` and `CLAUDE.md`. Existing product instructions remain below the managed block.

The product key selects the product state. The effective color is the worse of global and product color.

## Write rule

Only the Claudex repository receives bridge state writes and receipts.

Product repositories may write product code receipts locally, then point Claudex at the committed receipt.

## Failure behavior

Missing bridge repository: `SYNC RED`.

Invalid bridge JSON: `SYNC RED`.

Unknown product key: `SYNC RED`.

Stale bridge or intent: `SYNC YELLOW`.

Valid current bridge with no warnings: use computed color.

## Installation

```bash
node scripts/install-consumer.mjs "/absolute/product/path" product_key
```

Reconcile and commit consumer files inside the product repository. Do not bundle unrelated dirty work.
