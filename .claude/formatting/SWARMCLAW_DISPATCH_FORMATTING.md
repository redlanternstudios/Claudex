# SWARMCLAW DISPATCH — FORMATTING CONSTITUTION
# Trigger: "formatting" keyword in any agent conversation
# Scope: All agents producing UI, design, mockups, screens, slides, or visual assets

---

## DISPATCH RULE

When any agent receives the keyword "formatting" OR is about to produce a UI/visual output:

1. READ: `.claude/formatting/FORMATTING_CONSTITUTION.md`
2. IDENTIFY: Which tool is being used for output
3. LOAD: Matching tool prompt from `.claude/formatting/tool-prompts/[tool].md`
4. APPLY: Inject the prompt block before the generation request

---

## AGENTS THAT MUST ENFORCE THIS

| Agent         | Trigger condition                                            |
|---------------|--------------------------------------------------------------|
| VisionEngine  | Any screen, mockup, UI layout, or visual asset task          |
| SightEngine   | Any visual review, design critique, or output verification   |
| All agents    | When user types "formatting" as a keyword                   |

---

## TOOL ROUTING

| If output is going to → | Load this file →                                    |
|-------------------------|-----------------------------------------------------|
| v0                      | `.claude/formatting/tool-prompts/v0.md`             |
| Claude Design           | `.claude/formatting/tool-prompts/claude-design.md`  |
| Canva                   | `.claude/formatting/tool-prompts/canva.md`          |
| Gamma                   | `.claude/formatting/tool-prompts/gamma.md`          |
| ChatGPT image           | `.claude/formatting/tool-prompts/chatgpt-image.md`  |
| Unknown / code default  | `.claude/formatting/tool-prompts/v0.md`             |

---

## WHAT THIS ENFORCES (summary)

Every visual output from RLS must conform to:

- Mobile-first layout (base 375px)
- Tailwind breakpoints: 640 / 768 / 1024 / 1280px
- 4px spacing scale
- Max container: 1280px centered
- Safe areas: 44px top / 34px bottom on mobile
- Typography scale: 12–72px, Inter, tight headings
- Color tokens: #07080D bg / #111318 surface / #D92532 accent / #FFFFFF text
- 44×44px minimum tap targets
- No horizontal scroll on mobile
- No arbitrary pixel values

---

## AGENT INSTRUCTIONS

When routing a v0 task:
```
Before sending the prompt to v0, prepend the full content of:
.claude/formatting/tool-prompts/v0.md
Then append the specific component/page request below it.
```

When routing a Canva task:
```
Before describing the design, inject:
.claude/formatting/tool-prompts/canva.md
State the canvas size, safe zone, and color scheme first.
```

When routing a Gamma task:
```
Before generating slide content, inject:
.claude/formatting/tool-prompts/gamma.md
Use the prompt structure template in that file.
```

---

## FILESYSTEM PATH

This file is accessible to SwarmClaw via Filesystem MCP `99bd0d9e` at:
`/Users/rorysemeah/Documents/Claude/Projects/RedLantern Studios/.claude/formatting/`

All tool prompt files are in: `.claude/formatting/tool-prompts/`
Master constitution: `.claude/formatting/FORMATTING_CONSTITUTION.md`

---

_Last updated: 2026-06-22 | Owner: Ro / RedLantern Studios_
