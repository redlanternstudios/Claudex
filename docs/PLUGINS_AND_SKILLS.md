# PLUGINS & SKILLS AUDIT — Claude (Cowork)

Version 1.0 · 2026-07-02 · Audited live from the Cowork session.
Skills are CLAUDE-side (Codex has no skills system). This tells Codex what to delegate to Claude.

---

## INSTALLED PLUGINS (skill bundles)

| Plugin | Purpose | Key skills |
|---|---|---|
| **anthropic-skills** | Core document + build toolkit | docx, pptx, xlsx, pdf, canvas-design, algorithmic-art, brand-guidelines, skill-creator, mcp-builder, doc-coauthoring, theme-factory, web-artifacts-builder, internal-comms, learn, slack-gif-creator, schedule, setup-cowork, consolidate-memory |
| **apollo** | Sales prospecting | enrich-lead, prospect, sequence-load |
| **brand-voice** | Brand voice discovery + enforcement | discover-brand, generate-guidelines, brand-voice-enforcement (+ agents) |
| **data** | Analytics + SQL | analyze, build-dashboard, create-viz, sql-queries, write-query, explore-data, statistical-analysis, validate-data, data-context-extractor, data-visualization |
| **design** | Product/UX design | design-critique, design-system, design-handoff, accessibility-review, user-research, research-synthesis, ux-copy |
| **enterprise-search** | Cross-source search | search, search-strategy, knowledge-synthesis, digest, source-management |
| **legal** | Contracts + compliance | review-contract, triage-nda, compliance-check, legal-risk-assessment, signature-request, vendor-check, brief, legal-response, meeting-briefing |
| **pdf-viewer** | Interactive PDF | view-pdf, annotate, fill-form, sign, open |
| **product-management** | PM workflows | write-spec, roadmap-update, sprint-planning, metrics-review, stakeholder-update, synthesize-research, competitive-brief, product-brainstorming |
| **productivity** | Task + memory | task-management, memory-management, start, update |
| **sales** | Sales workflows | account-research, call-prep, call-summary, pipeline-review, forecast, competitive-intelligence, create-an-asset, daily-briefing, draft-outreach |
| **cowork-plugin-management** | Build/customize plugins | create-cowork-plugin, cowork-plugin-customizer |

---

## RLS-CUSTOM SKILLS & FRAMEWORKS (in this repo — the durable IP)

These live in `.claude/` and root, and are the RedLantern-specific operating layer both engines should honor:

| Asset | Location | Purpose |
|---|---|---|
| CTP Framework | `CTP_FRAMEWORK.md` | Mandatory analytical framework (Prompt Contract → 3-pass → 10-layer). |
| Checkit skill | `.claude/skills/checkit.md` | Quick sanity pass trigger for light checks without full CTP. |
| The Audit | `.claude/frameworks/THE_AUDIT_PROTOCOL.md` + `.claude/commands/theaudit.md` | BUILD-REALITY standard: 18-section solution map to every button/trigger with truth status. |
| Build Constitution | `BUILD_CONSTITUTION.md` | Product integrity rules. |
| Formatting Constitution | `.claude/formatting/FORMATTING_CONSTITUTION.md` + tool-prompts/ | `formatting` trigger → per-tool prompt (v0, Canva, Gamma, Claude Design, ChatGPT image). |
| Brand Standard | `.claude/brand/BRAND_DOCUMENT_STANDARD.md` + template | Branded HTML/PDF doc pipeline. |
| Command loop | `.claude/CLAUDE.md` | /daily-reset, /repo-ingest, /truth-audit, /task-split. |

---

## AUDIT FINDINGS (TruthSerum)

1. **Skills are Claude-only.** Codex cannot invoke any of the above. The delegation rule: any task that needs a skill (doc/deck/spreadsheet generation, brand output, deep research, design critique, PDF work) routes to Claude, not Codex. Encoded in `docs/CAPABILITY_MAP.md`.
2. **The RLS-custom frameworks are the real moat** — CTP, The Audit, Build Constitution, Formatting Constitution. Plugins are commodity; these are yours. They are now in the repo so Codex can at least READ and follow them even though it can't invoke them as skills.
3. **Skill sprawl risk.** 12 plugins is a lot of surface. Most sales/legal/apollo skills are not active to the current build focus (Amina dogfood). Keep installed, but do not let them pull focus. Review quarterly; prune what a full quarter never triggered.

---

## SCALING NOTE

New RLS-specific capability should be built as a **skill in `.claude/skills/`** (invocable by Claude) AND documented as a **plain protocol in the repo** (readable by Codex). Build once, expose to both surfaces at the level each can consume. Use `skill-creator` to scaffold, `mcp-builder` if it needs a new connector.
