# Receipt Index
> Append-only. One line per TruthCal receipt.
> Format: [Receipt ID] | [Date] | [Product] | [Intent] | [Status]

---

| Receipt ID | Date | Product | Intent | Status |
|-----------|------|---------|--------|--------|
| TC-20260701-001 | 2026-07-01 | RedLantern Studios | Cross-engine bridge v1.1 | COMPLETE (pending push + Ro accept) |
| TC-20260702-002 | 2026-07-02 | RedLantern Studios | Codex bridge connection verification | COMPLETE |
| TC-20260702-003 | 2026-07-02 | global | Built Claudex control plane v2 | COMPLETE |
| TC-20260702-004 | 2026-07-02 | global | Installed scheduled bridge alignment system | COMPLETE |
| TC-20260702-005 | 2026-07-02 | global | Connected verified product repositories to Claudex | COMPLETE |
| TC-20260702-006 | 2026-07-02 | global | Connected remaining local product repositories | COMPLETE |

| TC-20260702-007 | 2026-07-02 | amina | Amina primary chat loop ownership and persistence correction | PARTIAL |

| TC-20260703-001 | 2026-07-03 | authentic_hadith | Keymon Penn onboarded as external Claudex operator per docs/EXTERNAL_OPERATOR_ONBOARDING.md: cloned repo locally, GitHub collaborator invitation accepted (write access verified via API + live push/delete round-trip), registered in OPS/ENGINE_REGISTRY.json as human_keymon, .claudex.json wired into local authentic_hadith repo, lane ah/claudex-onboarding opened and closing now. | COMPLETE |

| TC-20260703-002 | 2026-07-03 | global | Obsidian live bridge integration | COMPLETE |

| TC-20260703-003 | 2026-07-03 | global | Local Ro context layer linked to Obsidian | COMPLETE |

| TC-20260703-004 | 2026-07-03 | global | Obsidian platform rooms for v0 GitHub and Supabase | COMPLETE |

| TC-20260703-005 | 2026-07-03 | hirewire | Enforce verified fit above seventy percent and one resume generation entry | Typecheck lint build and thirty three tests pass at HireWire commit 2f400f3. Browser rendering remains unverified because local URL access was blocked by browser policy. |

| TC-20260703-006 | 2026-07-03 | hirewire | Finish verified fit gate and single resume generation journey | Rendered QA passes at 67 percent blocked fit with clean console. Typecheck lint thirty three tests and production build pass. HireWire commits 2f400f3 and b3e1409 are pushed. |

| TC-20260705-001 | 2026-07-05 | amina | Amina iOS submission readiness test | BLOCKED |

| TC-20260705-002 | 2026-07-05 | amina | Verify prod chat on OpenAI and dispatch iOS submission handoff to Keymon | Chat LIVE on myamina.app via OpenAI. Disclosure and privacy manifest closed in Amina PR 47. Handoff dispatched; Apple-side items remain with Keymon. |

| TC-20260705-003 | 2026-07-05 | amina | Repair and verify iPhone safe areas | FIXED AND VERIFIED. Check 4 FAIL to PASS via Amina PR 48 and post-deploy simulator capture. Keymon list now purely Apple-gated. |

| TC-20260705-004 | 2026-07-05 | amina | Local authenticated iOS journey verification | BLOCKED |

| TC-20260705-005 | 2026-07-05 | amina | Amina iOS chat repair verification and remaining safe area patch | PARTIAL |

| TC-20260706-001 | 2026-07-06 | amina | Audit Amina feature enrichment | PARTIAL |

| TC-20260706-002 | 2026-07-06 | amina | Register Companion Continuity design | PASS |

| TC-20260706-003 | 2026-07-06 | amina | Publish comprehensive Amina iOS submission handoff for Keymon and Claude | BLOCKED |
| TC-20260705-006 | 2026-07-05 | amina | Hydration root cause fix (suppressHydrationWarning on html, PR #52) verified on prod; v0 branch flagged do-not-merge | PASS |

| TC-20260705-007 | 2026-07-05 | amina | Live site E2E unauth pass, 6 routes + screenshots; authed leg pending sign in; terms 18+ vs gate 13+ flagged | PARTIAL |

| TC-20260706-002 | 2026-07-06 | amina | Companion Continuity shipped end to end | Production-verified loop: conversation to consented insight to stated memory to Home resurfacing. Security definer closure applied. Leaked-password toggle remains a human dashboard click. |

| TC-20260706-003 | 2026-07-06 | amina | Enrichment on real pages: Reflections practice, Home honesty, Dua fulfilled | Shipped in Amina PR 56 and verified on implemented routes. Simulator capture committed. Learn governance, Circle seeding, premium remain. |

| TC-20260706-004 | 2026-07-06 | amina | Register full interaction trigger contract | PASS |

| TC-20260706-004 | 2026-07-06 | amina | Trust closure: age policy, deletion cascade, export, isolation | Terms now 13 plus live. Five intimate tables gained user cascade FKs. Owner export shipped. Isolation audit clean. Password protection and key rotation remain human. |

| TC-20260706-005 | 2026-07-06 | amina | Amina trust flows hardened after trust closure | PARTIAL |

| TC-20260706-005 | 2026-07-06 | amina | Notification system build packet implemented on real stack | Copy law enforced by tests. Real on-device reminder delivery via Capacitor at user-chosen time. Keymon must cap sync ios before archive and device-verify. |

| TC-20260706-006 | 2026-07-06 | amina | Official logo set across notification surfaces | Seal derived from the logo crescent and star motif, aniconic per deen law. Full lockup committed as master; face-bearing artwork held for Rory decision. Live verified. |

| TC-20260706-004 | 2026-07-06 | global | Studio state CTP synthesis + TODAY.md refresh to 2026-07-06 (registered by heartbeat — receipt existed on disk but was absent from this index; its Evidence section is unfilled) | COMPLETE (evidence incomplete) |

| CORRECTION 2026-07-06 (heartbeat): the file for the global TC-20260706-004 entry above no longer exists on disk. The same intent now lives at `OPS/receipts/TC-20260706-007-claude-cowork.md` (renumbered; its internal header says TC-20260706-006 and Evidence is unfilled boilerplate). No content fabricated. |

| CORRECTION 2026-07-06 (heartbeat, merge): receipt IDs collided across engines this week — codex has two distinct TC-20260706-004 entries (trigger contract, trust closure) and two TC-20260706-005 entries (trust flows, notification system) above, separate from the global 004 registration line. Files on disk are the arbiter; ledger left append-only. |

| TC-20260706-008 | 2026-07-06 | global | Stale lock recovery (.git/index.lock + OPS/BRIDGE.lock) — root cause of two heartbeats failing to commit, incl. one falsely claimed commit; latest_receipt pointer repaired; API_KEY_VAULT.md secret-scan FAIL surfaced (gitignored, not committed) | COMPLETE (see in-receipt addendum: locks cleared by rename this run) |

| TC-20260707-001 | 2026-07-07 | amina | Amina Rory continuation code green after pull, proof gates, and local bridge update | COMPLETE |

| TC-20260707-002 | 2026-07-07 | amina | Amina Apple team configured; archive blocked by missing Xcode account credentials for P5H924VDYH | BLOCKED |

| TC-20260707-003 | 2026-07-06 | global | Reconciled diverged histories (local 12 ahead / 2 behind) after Keymon/Codex pushed TC-20260707-001/002; BRIDGE.json hand-merged to rev 60; Amina blocker narrowed to Xcode account credentials per codex evidence | COMPLETE |


| TC-20260707-004 | 2026-07-07 | global | Studio state CTP synthesis into Claudex and Obsidian; TODAY.md refreshed and aligned to bridge rev 60 | COMPLETE |
- TC-20260707-005 — amina/notification-system — codex — Notification packet completion (Amina PR 62), renumbered from remote 003 during reconcile
- TC-20260707-006 — amina/brand-integrity — codex — Brand leak cleanup (Amina 2799471), renumbered from remote 004 during reconcile

| TC-20260707-007 | 2026-07-07 | claudex | Add two-way receipt-gated sync and publish path | COMPLETE |

| TC-20260707-008 | 2026-07-07 | claudex | Fix bridge publish post-push stdio crash | COMPLETE |

| TC-20260707-009 | 2026-07-07 | claudex | Structured RoryWords format for scheduled heartbeat updates | COMPLETE |

| TC-20260707-010 | 2026-07-07 | claudex | Connect Penn Enterprises incoming automation discovery through Claudex | PARTIAL: PE handoff packet exists; live Make Grid, exact automation list, and n8n readback still missing. |

| TC-20260707-011 | 2026-07-07 | claudex | Draft first Penn Enterprises incoming automation discovery queue | PARTIAL: local queue exists; live Make Grid and n8n inventory still unverified. |

| TC-20260707-012 | 2026-07-07 | global | Two way reconcile: fast forward onto origin (8 commits), heartbeat v2.0 directives channel landed at bridge rev 72, DIR-03 closed with evidence, Codex GREEN on claudex capped to YELLOW by stale TODAY.md | COMPLETE |

| TC-20260707-013 | 2026-07-07 | global | Push transport gap closed by design: host side launchd autopush (guarded, never force, no new secrets) built with installer; decision record OPS/PUSH_TRANSPORT.md; DIR-20260707-08 opened for Ro one time install | COMPLETE |

| TC-20260707-015 | 2026-07-07 | global | Cross engine Q&A channel live: OPS/questions with QA_PROTOCOL, answer desk duties wired into AGENTS.md and KEYMON_CLAUDE.md, heartbeat sweep added, first question Q-20260707-01 dispatched to keymon-claude | COMPLETE |
