# BRIDGE SYNC HEARTBEAT — two way Claude ↔ Codex ↔ Keymon sync
Version 2.0 · Owner: Ro · Cadence: hourly · Authority: full close out with guardrails
Upgraded 2026-07-07 at Ro's direction (receipt TC-20260707-012; the originally cited 005 collided with the Amina notification packet ID). v1.0 was one way: read local, write bridge, Codex reads on boot. v2.0 ingests BOTH sides every run and carries asks in both directions.

The channel is still the file — the heartbeat does not create a live chat with Codex or Keymon.
Two way means: every run PULLS the other side's work in (fetch + reconcile + attribution) and
PUSHES structured asks out (directives with acks), and Ro's digest covers both sides. Async
handoff with receipts in both directions. Do not claim more than that.

---

## PROMPT CONTRACT
- GOAL: every hour, both engines and Ro derive the same state, including work that landed on the
  OTHER side since last run, and every open ask has a named owner and a status.
- CONSTRAINTS: never fake GREEN. Never auto resolve a RED blocker. Never write a secret value.
  Never force git. Repo is the single truth source. Sandbox limits apply: clear stale locks by
  RENAME, merge via plumbing and in place writes, pushes usually need Ro on the host Mac.
- FORMAT: bridge write + directives update + optional receipt + one need to know digest to Ro,
  structured per `OPS/HEARTBEAT_RORYWORDS.md` (Heartbeat / What changed / Needs Ro / Next).
- FAILURE: fails if it flips a color without the validator, invents a change to justify a receipt,
  reports play by play instead of need to know, force merges, buries an ask inside a growing
  sync_note instead of the directives array, or claims two way chat that does not exist.

---

## INPUTS (read first, every run)
1. `git fetch origin` — then compare `main` to `origin/main` (ahead / behind / diverged).
2. `OPS/BRIDGE.json` — current shared state (and `origin/main:OPS/BRIDGE.json` when behind or diverged).
3. `OPS/BRIDGE_PROTOCOL.md` — rules and validator.
4. `OPS/TODAY.md` — current intent and its date.
5. Latest receipt in `shared.latest_receipt` + `OPS/receipts/INDEX.md` — including receipts that
   only exist on origin (Keymon / Codex work that has not landed locally yet).
6. `OPS/HEARTBEAT_CURSOR.json` (gitignored, local only) — last seen local SHA, remote SHA, and
   digest timestamp. This is how "since last run" is computed. Missing cursor = treat as first run.

## THE LOOP (ordered)
1. Load inputs. If `BRIDGE.json` cannot be read, report SYNC RED and stop.

2. **INGEST THE OTHER SIDE.** Using the cursor:
   - List remote commits since last seen remote SHA. Attribute each to keymon / codex / other by
     author. Read any new receipts they added (receipt `Author:` field is the truth for attribution).
   - If behind and clean → fast forward. If diverged → reconcile per the proven protocol
     (TC-20260707-003): apply remote receipts + INDEX lines to the worktree, hand merge
     BRIDGE.json to a new revision keeping BOTH sides' facts, conclude the merge, never force.
   - If their bridge write claims a color the local validator rejects, the validator wins — say so
     in the sync_note, name whose claim was overruled and why.

3. **VALIDATE + RECOMPUTE.** Run the validator for global and the focus product. Effective color =
   worse of global and product. Any validator failure caps at YELLOW or RED. Same v1 checks:
   updated_at today, TODAY.md fresh, blockers unresolved, latest_receipt real, truth source not Notion.

4. **DIRECTIVES (the two way channel).** `shared.directives` in BRIDGE.json is the single place
   asks live. Each entry: `id` (DIR-YYYYMMDD-NN), `from`, `to` (ro | keymon | codex | claude),
   `ask` (one sentence), `date`, `status` (open | acked | done | dropped), `note`.
   - Sweep this run's ingested work: if a commit or receipt completes an open directive, mark it
     `done` with the evidence in `note`. Never mark done without evidence.
   - New asks discovered this run (from receipts, blockers, or Ro's session work) become new
     directives. One ask, one entry. No duplicates — update the existing entry instead.
   - Directives addressed to codex are ALSO echoed as the one dated sentence in the focus product
     sync_note (Codex boot habit already reads there). Directives to keymon and ro surface in
     Ro's digest — Keymon has no boot file; Ro relays or the ask rides the next handoff doc.
   - The heartbeat never closes a directive addressed to Ro on Ro's behalf.

5. **WRITE THE BRIDGE.** Update sync_status / sync_note per the recompute. **Compaction rule:**
   sync_note keeps at most the two most recent dated lines; older history already lives in
   receipts and git — delete it from the note. The bridge is a dashboard, not a scroll.
   Set `updated_at` today, `updated_by` claude (heartbeat authorship named inside the note).

6. **RECEIPT.** Only for real change since the last receipt (a reconcile, a directive state change
   with evidence, a shipped fix). Quiet hour = no receipt. Never fabricate.

7. **COMMIT + PUSH.** Commit locally. Attempt push. If push fails for credentials, leave it for Ro
   and count it once in the digest — not as a repeated alarm line every hour. Update the cursor.

8. **DIGEST TO RO — need to know only.** Two sides, then asks. Rules:
   - Report OUTCOMES and state changes, never steps taken. No play by play, no file paths,
     no jargon (the task prompt carries the banned word list and the exact shape).
   - THEIR SIDE: what Keymon / Codex landed since last digest and what they are stuck on, in one
     or two plain sentences. If nothing landed, one clause — not a paragraph.
   - OUR SIDE: what shipped from Claude / Cowork since last digest, same discipline.
   - YOUR MOVE: only directives with `to: ro`, hard capped at 3, most valuable first.
   - Quiet hour (nothing landed either side, nothing needed, nothing broken): ONE short line.
   - A stop or a new problem is ALWAYS reported. Silence never hides a real issue.

## GUARDRAILS (hard — unchanged from v1 plus two way additions)
- GREEN requires ALL validator checks to pass. Failures cap at YELLOW at best.
- A RED blocker is never cleared by the heartbeat; it is surfaced verbatim and left RED.
- Receipts only for real change. `blockers` arrays never edited to fake a better color.
- No secret values anywhere. Pointers only.
- Never force push, never force merge, never bypass the command layer or the lock protocol.
- A directive is never marked `done` without evidence (commit, receipt, or Ro saying so).
- Another engine's stale GREEN never overrides a failing local validator.
- If TODAY.md is stale, global caps at YELLOW and the digest tells Ro in plain words.
- Digests to Ro use the structured RoryWords format in `OPS/HEARTBEAT_RORYWORDS.md`; the v2.0
  two sides content (their side / our side / your move) lives inside that structure.

## KNOWN OPEN DRIFT (reconcile, do not paper over)
- Product `.claudex.json` files point to a `Claudex/` path that does not resolve here. Report MISSING.
- Codex side monitor (`.claudex/alignment.json` + `npm run bridge:watch`) is intermittent. Treat
  Codex runtime status as UNVERIFIED unless its own fresh write proves otherwise.
- Push topology: this machine usually cannot push. Local main is canonical until Ro pushes from
  the host Mac; Codex reads GitHub, so remote staleness is a standing YELLOW condition, counted
  once per digest.

---
*Written by the RedLantern OS. The heartbeat serves the bridge. The bridge serves the truth — in both directions.*
