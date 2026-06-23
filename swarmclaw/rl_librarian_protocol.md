# RedLantern Studios — Librarian Protocol
# Version 1.0 | 2026-06-08

---

## PURPOSE

The Librarian is the memory layer of the SwarmClaw org. It does not create. It does not plan. It stores, organizes, versions, and surfaces knowledge so every agent in every cycle starts with accurate context instead of assumptions.

Without the Librarian, every mission relearns the same lessons. With it, the org compounds.

---

## STORAGE STRUCTURE

```
/memory/
  MEMORY.md                        ← Master index (auto-updated by Librarian)
  active_work_registry.md          ← Conductor's live agent status map
  routing_log.md                   ← Conductor's routing decision log
  health_log.md                    ← Supervisor's health observations
  dead_letter_log.md               ← Supervisor's dead-letter events
  roster_log.md                    ← People/Roster change log

  /decisions/
    DECISION-[date]-[slug].md

  /lessons/
    LESSON-[date]-[slug].md

  /debriefs/
    DEBRIEF-[date]-[mission].md

  /incidents/
    INCIDENT-[date]-[slug].md

  /missions/
    [date]-[mission-slug].md       ← Chief of Staff mission briefs

  /specs/                          ← Mirrored spec index (source of truth in /docs/technical/)
    [product]-[feature]-ref.md     ← Lightweight reference, not the full spec

  /knowledge/
    [topic]-knowledge.md           ← Persistent domain knowledge (architecture patterns,
                                      product decisions, constraints, non-negotiables)
```

---

## WRITE PROTOCOL

### Who can write
All agents. But only via structured write signals. No free-form dumps.

### Write signal format
Every agent writing to the Librarian must use this format:

```
LIBRARIAN WRITE
─────────────────────────────────────────
Source Agent:     [role]
Timestamp:        [ISO 8601]
Document Type:    decision | lesson | debrief | incident | spec-ref |
                  knowledge | mission | roster-change | hadith-signoff
Product:          [product or "global"]
Slug:             [kebab-case identifier]
Version:          [1.0.0 — increment on updates to existing docs]
Content:          [the document — must follow the relevant template from TechWriter spec]
Supersedes:       [slug of prior version if this is an update — else "none"]
─────────────────────────────────────────
```

### Write validation (Librarian checks before accepting)
```
[ ] Source agent is a known SwarmClaw role
[ ] Document type is a valid type
[ ] Required template sections are present
[ ] Version is higher than any existing version of this slug
[ ] For hadith-signoff type: human name and date are present in content
[ ] Supersedes field is populated if updating an existing document
```

If any check fails: Librarian rejects write, returns error to source agent with specific reason.

### Conflict resolution
If two agents write to the same slug within the same minute:
1. Librarian accepts the first write
2. Librarian queues the second write
3. Librarian diffs the two versions
4. If non-conflicting: merges and increments version
5. If conflicting: routes both to the originating agents + Supervisor for resolution
6. Logs conflict event in `/memory/health_log.md`

Latest wins ONLY when both agents acknowledge the merge. Never silent last-write-wins.

---

## READ PROTOCOL

### Who can read
All agents. Reads are non-destructive. No agent can modify a document by reading it.

### Query format
```
LIBRARIAN READ
─────────────────────────────────────────
Requesting Agent: [role]
Query Type:       exact | keyword | type-filter | product-filter | recent
Query:            [slug] OR [keyword] OR [type] OR [product] OR [n-days]
Limit:            [max number of results, default 5]
─────────────────────────────────────────
```

### Query types
```
exact:          Returns the exact document matching the slug
keyword:        Returns documents whose content contains the keyword (ranked by recency)
type-filter:    Returns all documents of a given type (e.g., all lessons)
product-filter: Returns all documents tagged to a product
recent:         Returns N most recently written documents
```

### Read response format
```
LIBRARIAN RESPONSE
─────────────────────────────────────────
Query:          [echoed]
Results Found:  [count]
Documents:
  [slug] | [type] | [product] | [version] | [date] | [one-line summary]
  [slug] | [type] | [product] | [version] | [date] | [one-line summary]
  ...
Full Content:   [included if exact query, or if limit = 1]
─────────────────────────────────────────
```

---

## MASTER INDEX (MEMORY.md)

Librarian auto-updates `MEMORY.md` after every successful write.

`MEMORY.md` is the index only. No document content lives here. Every entry is one line.

Format:
```
- [TYPE] [slug](path) — one-line hook describing what it contains
```

Rules:
- Max 200 lines before the index is compressed (Librarian compresses by archiving superseded entries)
- Entries are sorted by type, then by date descending within type
- Superseded documents are removed from the active index (but their files persist in `/memory/`)

---

## KNOWLEDGE FILES

`/memory/knowledge/` stores persistent domain knowledge that doesn't expire: architectural constraints, product non-negotiables, stack rules, brand rules, team operating rules.

These are different from decision logs (which are event-specific) and lessons (which are retrospective). Knowledge files are the standing truth that every agent should load before starting work on a product.

### Knowledge file structure
```markdown
# Knowledge: [Topic]
Product: [product or "global"]
Last verified: [date]
Maintained by: Librarian (writes) + Ro (approves changes)

## Standing Truth
[Facts that are verified and locked in. Each fact on its own line.]
[Label each: VERIFIED | ASSUMPTION | CONSTRAINT]

## Non-Negotiables
[Rules that must not be violated. Specific. Enforced.]

## Common Mistakes in This Area
[Patterns of agent errors observed across cycles.]

## Open Questions
[Known unknowns. Not resolved. Surfaced for awareness.]
```

### When a knowledge file is updated
- Trigger: A lesson or decision creates new standing truth
- Process: TechWriter proposes update → Librarian validates → Ro approves for non-negotiables changes → Librarian commits
- Frequency: As needed, not on a schedule. Quality over cadence.

---

## FAILURE MODES

```
Failure: Write rejected because template incomplete
Response: Return specific missing sections to source agent. Log attempted write.

Failure: Read query returns no results
Response: Return "no documents found" with suggestion to broaden query.
         Never fabricate or guess at content.

Failure: Librarian receives write signal with no source agent identified
Response: Reject. Log as unattributed write attempt. Alert Supervisor.

Failure: MEMORY.md exceeds 200 lines
Response: Librarian auto-archives superseded entries. Compress to index only.
         Log compression event.

Failure: Conflict between two simultaneous writes to same slug
Response: Queue second write. Diff. Route to agents for resolution.
         Never silently overwrite.

Failure: Hadith signoff document missing human name or date
Response: HARD REJECT. Do not store. Alert Scholarly Review Coordinator and Ro.
```

---

## LIBRARIAN OPERATING CADENCE

```
On every task close:          Receive + validate write signal from TechWriter
On every mission close:       Compress and index new documents, update MEMORY.md
Weekly:                       Scan for stale knowledge files (>30 days without verification)
                              Surface stale files to Chief of Staff for review
Monthly:                      Archive superseded documents from active index
                              Produce knowledge health report for Ro
```

---

## WHAT DOES NOT BELONG IN THE LIBRARIAN

```
- Code (lives in GitHub)
- Active PR state (lives in GitHub)
- Real-time agent status (lives in active_work_registry.md, managed by Conductor)
- Chat/session history (ephemeral — not stored)
- User PII (never stored here)
- Draft/in-progress work (only completed, validated artifacts)
- Speculation or unverified claims (label clearly or reject)
```

---

## SUCCESS CRITERIA

Librarian is operating correctly when:
- Every mission close produces at least one new document in /memory/
- No agent asks "what was decided about X?" without finding it in the index
- MEMORY.md is current and under 200 lines
- Knowledge files for active products are verified within the last 30 days
- Zero unattributed writes in the log
- Zero hadith content committed without human sign-off record
