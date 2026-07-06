# By Red LLC — System Definition

## Entity Structure

**Parent Entity:** By Red LLC (Colorado LLC, EIN 33-5008108)
**Core Execution Arm:** RedLantern Studios
**Co-Managing Member:** Homira Gitesatani

### Equity
| Member | Share |
|---|---|
| Red (Rory Semeah) | 50% |
| Ahmed Falafalla | 25% |
| Rasheed Mirza | 25% |

### Contractors
- Waleed — commission-based
- Suhaib — commission-based

---

## Namespace Rules

This file defines the system hierarchy. All tools, automations, and AI assistants should reference this structure.

```
ByRed-LLC/                          ← Business entity (root)
├── RedLanternStudios/              ← All products and technical systems
│   ├── Projects/                   ← One folder per product or client
│   ├── Shared/                     ← Cross-product infrastructure
│   ├── Design/                     ← Studio-wide design assets
│   ├── Docs/                       ← Studio-wide documentation
│   └── _Studio/                    ← Studio ops (hiring, positioning)
│
├── Operations/                     ← Legal, Finance, Admin, Contracts
├── Revenue/                        ← Monetization tracking (all products)
├── Partnerships/                   ← External relationships
├── CoFounders/                     ← Co-founder agreements and records
└── Strategy/                       ← Founder-level decisions, cap table, roadmaps
```

---

## Products (all under RedLanternStudios/Projects/)

| Product | Status | Description |
|---|---|---|
| HireWire | Active build | Professional Identity Engine — confidence-scored professional model |
| QBos | Active build | File-first build command layer / PromptEngine for LLM-assisted dev |
| SilentEngine | Active build | Multi-model AI orchestration infrastructure |
| TradeSwarm | Planned | TBD |
| Clarity | Planned | TBD |
| InSense | Scaffolded | Sacred personal guidance system (Human Design, Astrology, Numerology) |
| Authentic Hadith | Planned | Verified Islamic knowledge platform |
| Chapman Bot | Spec complete | University advising bot (FERPA-compliant) |

---

## Tech Stack

| Layer | Tool |
|---|---|
| Frontend | Next.js 14 App Router, shadcn/ui |
| Database | Supabase |
| Deployment | Vercel |
| AI (primary) | Claude API via SilentEngine |
| AI (secondary) | OpenAI, Gemini (routed through SilentEngine) |
| Design | Figma, v0 |
| Version control | GitHub |
| Error monitoring | Sentry |
| Payments | Stripe |
| Automation | n8n (event-driven), Zapier (simple A→B) |
| PM / Knowledge | Notion (single source of truth) |

---

## Rules

1. All products MUST live under `RedLanternStudios/Projects/`
2. No files at root level without classification
3. No duplication across systems
4. Operations (Legal, Finance, Admin) lives at `ByRed-LLC/Operations/` — NOT under RedLantern
5. Revenue tracking is separate from Finance (Revenue = product metrics, Finance = accounting)
6. Code lives in GitHub — local project folders contain pointers only
7. Secrets live in Vercel env vars or Supabase vault — never in documents
8. Notion is the single PM layer — no second tool (no monday.com)
9. New products start by copying `Projects/_Template/`
10. Archive, never delete

---

*This file should be placed at the root of the ByRed-LLC directory and updated when the structure changes.*
