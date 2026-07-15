# REPO INVENTORY — By Red, LLC / RedLantern Studios

Version 1.1 · 2026-07-02 · **VERIFIED live from GitHub API** (account `redlanternstudios`, type: User).
Authoritative map of every repo By Red owns. **Not everything is active** — see Lifecycle column.

Lifecycle: ACTIVE (worked now) · PAUSED (intentional hold) · BLOCKED (gated) · LIVE (shipped, maintenance) · DORMANT (idle experiment) · LEGACY (superseded) · REFERENCE (source only) · PARKED (parked idea).

Regenerate:
```
curl -s -H "Authorization: Bearer $GH_TOKEN" "https://api.github.com/user/repos?per_page=100&sort=pushed&affiliation=owner,organization_member"
```

---

## OS / ENGINES / INFRASTRUCTURE

| Repo | Vis | Lifecycle | Role |
|---|---|---|---|
| `Claudex` | pub | ACTIVE | Cross-engine OS / control plane (this repo) |
| `QuietBuild-OS` | pub | NEEDS DECISION | Umbrella OS repo — overlaps the QuietBuild OS concept. Decide home of doctrine (here vs Claudex). |
| `QBos---Master-Founder-Repo` | pub | REFERENCE | Legacy engine warehouse (TruthSerum, silent-engine, delivery-kernel, robby-pa, engines, war-room) |
| `swarmclaw` | pub | ACTIVE | Agent execution org (~247k LOC, deployable) |
| `RobbyPA` | pub | ACTIVE | Conductor/operator (Python) |
| `robby-telegram` | PRIV | ACTIVE | Robby Telegram command surface |
| `Silent-Engine` | PRIV | LEGACY | Routing engine, archived (last push 2025-11). Live code is in QBos. |
| `rl-infrastructure` | PRIV | ACTIVE | Infra config, org-chart sync target |
| `VidEdEngine` | pub | DORMANT | Video editing engine (Python) |

## PRODUCTS

| Product | Canonical repo | Lifecycle | Duplicates to resolve |
|---|---|---|---|
| Amina | `Amina` (PRIV) | ACTIVE (dogfood) | `v0-amina` (proto) |
| Authentic Hadith | **PICK ONE** | BLOCKED (App review) | `AuthenticHadithApp`, `Authentic-Hadith`, `v0-authentic-hadith` |
| ByRed Daily OS | `byredlanternos.com` | ACTIVE | — |
| The Lantern Daily | **PICK ONE** | ACTIVE | `the-lantern-daily` (PRIV), `thelanterndaily` (pub) |
| Deixis | `Deixis` | ACTIVE | — |
| Mission Esthetics | `missionesthetic` | LIVE | — |
| TradeSwarm | `TradeSwarm` | BLOCKED (schema drift) | — |
| HireWire | `HireWireInGroup` | PAUSED | — |
| Clarity (UHY) | `UHY-Clarity---Executive-Visibility-Layer` (PRIV) | DORMANT | — |
| Paradise Property Services | `paradise-property-services-2` (PRIV) | PARKED (business, not code focus) | — |
| Rushd | `Rushd` | DORMANT | — |
| University of Janna | `v0-universityofjanna` (PRIV) | PARKED (proto) | — |
| FloorIQ | `v0-flooriq` (PRIV) | PARKED (proto) | — |
| The Blonde Muslim | `the-blonde-muslim-website` | DORMANT | — |
| phonepop | `phonepop` (PRIV) | PARKED | — |

## CORPORATE / WEB / PERSONAL

| Repo | Vis | Lifecycle | Purpose |
|---|---|---|---|
| `By-Red-LLC` | PRIV | REFERENCE | The LLC repo |
| `byredllccom` | PRIV | DORMANT | By Red LLC corporate site |
| `byredlanternstudios.com` | PRIV | DORMANT | RedLantern Studios site |
| `byredllc-redirect` | pub | LIVE | Domain redirect |
| `redlantern-studios-web` | PRIV | DORMANT | Studio web |
| `rorysemeahdotcom` | PRIV | DORMANT | Ro personal site |

## EXTERNAL / OWNERSHIP RISK (TruthSerum flag)

| Repo | Issue |
|---|---|
| `clashon64-ship-it/By-Red-LLC.` | PRIV — a **By Red LLC repo on a non-By-Red account.** Ownership/IP risk. Confirm control; migrate or archive. |
| `EReis0/SQL` | PRIV — unrelated external collab. Not By Red. |

---

## AUDIT FINDINGS

1. **34 By Red repos** (+2 external). ~6 truly ACTIVE; the rest paused, dormant, parked, or legacy. The portfolio is intentionally narrowed — do not treat every repo as live work.
2. **Repo sprawl = governance debt.** Authentic Hadith (3 repos) and The Lantern (2) have no declared canonical. Pick one each; archive the rest. Fragmentation is how truth drifts.
3. **`QuietBuild-OS` repo vs the concept** — two things, one name. Decide the doctrine home.
4. **`clashon64-ship-it/By-Red-LLC.`** — company IP on an outside account. Resolve ownership.

## SCALING NOTE

Factual base layer, VERIFIED from GitHub, not asserted. Keep regenerated (command above). Product *state* lives in `OPS/BRIDGE.json`; this is the *estate map*. On any repo create/rename/archive, update here + the bridge.
