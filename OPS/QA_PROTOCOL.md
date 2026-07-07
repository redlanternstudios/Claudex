# QA PROTOCOL — ask another engine, get an answer without waiting on a human
Version 1.0 · 2026-07-07 · Owner: Ro · Channel: `OPS/questions/` (one file per question)

## What this is

Ro (or any engine) can ask a question TO a specific engine — Keymon's Claude, Keymon's Codex,
studio Codex, or studio Claude — and the answer comes back through the repo. The human the engine
belongs to does not have to be in the loop. Directives carry WORK; questions carry KNOWLEDGE.
Do not mix them.

## PROMPT CONTRACT
- GOAL: a question asked in any session reaches the target engine's next run and comes back
  answered, with the answer surfaced to the asker automatically.
- CONSTRAINTS: async by nature — the file is the channel. No secrets in questions or answers.
  An engine answers only from what it can verify (its repo, its machine, its runtime); it labels
  everything else UNKNOWN or ASSUMPTION per TruthSerum.
- FAILURE: fails if an engine invents an answer to close a question, answers a question addressed
  to someone else, or if an answered question never reaches the asker's digest.

## Honest latency

An engine can only answer when it runs. Expected answer time:
- studio Claude (Cowork): within the hour (heartbeat answers what it can on its runs)
- studio / Keymon Codex: next boot in the Claudex repo
- Keymon's Claude: next session on his Mac — or within the hour once he installs the sweep task
  (ready prompt at the bottom of this file; one time setup, then his Claude answers on schedule)

## The format

One file per question: `OPS/questions/Q-YYYYMMDD-NN.md` (re read the folder and take the next
free NN immediately before committing — parallel writers collide).

    # Q-20260707-01
    From: ro
    To: keymon-claude        (keymon-claude | keymon-codex | codex | claude)
    Asked: 2026-07-07
    Status: OPEN             (OPEN | ANSWERED | STALE)

    ## Question
    One clear question. Context links welcome. One question per file.

    ## Answer
    (empty until the target engine fills it)

    Answered: (date) by (engine)
    Truth: VERIFIED | PARTIAL | UNKNOWN — what was checked to answer this

`OPS/questions/INDEX.md` holds one line per question: id, to, status, short subject.

## Duties

**Asker (usually Ro, via any Claude session):** say "ask keymon's claude: ..." — the session
writes the file, updates INDEX, commits. Transport (autopush / heartbeat) ships it.

**Target engine:** on every run in this repo, check `OPS/questions/` for OPEN files addressed to
you BEFORE starting other work. Answering beats building — an unanswered question is someone
blocked. Answer from verifiable context, set Status: ANSWERED, fill Truth, update INDEX, commit.
If you genuinely cannot answer, write what you checked and what is missing — that IS an answer
(Truth: UNKNOWN). Never leave it silently open.

**Heartbeat (every run):** sweep the folder. New ANSWERED since last cursor → put the answer
(condensed, faithful) in Ro's digest. OPEN and older than 24h → one nudge line to the target in
the bridge sync_note and note the age in the digest. Never answers on behalf of another engine's
machine state.

## What each engine may answer

Repo facts, build state, receipts, their own machine and runtime state, their own work.
Keymon's engines answer for Keymon's machine (Xcode, TestFlight, certificates, his task state) —
that is the whole point. No engine speaks for a human's intentions or commitments; if a question
is really for the human ("will Keymon..."), the engine says so and the ask becomes a directive.

## Keymon's one time setup (copy paste, his Mac, Claude scheduled task)

Schedule hourly with this prompt:

    You are the RedLantern ANSWER DESK for Keymon's Claude. In the Claudex repo
    (git pull first): read OPS/questions/INDEX.md. For every Status OPEN question with
    To: keymon-claude, answer it from what you can verify on this machine and this repo
    (label VERIFIED / PARTIAL / UNKNOWN — never guess), set Status: ANSWERED, update the
    INDEX line, commit, push. If nothing is open, do nothing and stay silent. Never answer
    questions addressed to anyone else. Never write secret values into an answer.
