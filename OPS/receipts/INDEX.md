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

| TC-20260706-004 | 2026-07-06 | global | Studio state CTP synthesis + TODAY.md refresh to 2026-07-06 (registered by heartbeat — receipt existed on disk but was absent from this index; its Evidence section is unfilled) | COMPLETE (evidence incomplete) |

| CORRECTION 2026-07-06 (heartbeat): the file for the TC-20260706-004 entry above no longer exists on disk. The same intent now lives at `OPS/receipts/TC-20260706-007-claude-cowork.md` (renumbered to avoid remote collision; NOTE its internal header says TC-20260706-006 — filename/header mismatch, and Evidence is still unfilled boilerplate). shared.latest_receipt repointed to the real file. No content fabricated. |

| TC-20260706-008 | 2026-07-06 | global | Stale lock recovery (.git/index.lock + OPS/BRIDGE.lock) — root cause of two heartbeats failing to commit, incl. one falsely claimed commit; latest_receipt pointer repaired; API_KEY_VAULT.md secret-scan FAIL surfaced (gitignored, not committed) | COMPLETE |
