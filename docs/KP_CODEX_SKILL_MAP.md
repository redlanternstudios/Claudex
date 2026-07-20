# KP Codex Skill Map

## How to invoke

Codex supports skills through the `/skills` picker or by mentioning a skill with the dollar prefix.

Examples:

* `$kp_scope define the next Lantern revision ticket`
* `$kp_plan sequence the approved migration safety revision`
* `$kp_checkit verify PR 1 against final head and semantic gates`
* `$kp_receipt close the verified task`
* `$kp_retrospective quantify this run and improve the process`
* `$kp_systemize turn this repeated workflow into a reusable system`
* `$kp_repository_baseline audit this repository before feature work`

## Real time activation map

1. A repeated problem appears
   Use `kp_systemize`.
2. A specific task needs boundaries
   Use `kp_scope`.
3. Scope is approved and needs sequencing
   Use `kp_plan`.
4. Codex completes authorized work
   Use `kp_checkit` before believing the completion claim.
5. Verification reaches a gate
   Use `kp_receipt`.
6. The task closes
   Use `kp_retrospective`.
7. A repository needs technical readiness proof
   Use `kp_repository_baseline`, then run the standard scope, plan, check, receipt, and retrospective lifecycle.

## Learning rule

For the first five runs, invoke skills explicitly. Review whether the correct skill was selected, whether it stopped at authorization gates, and whether its output was measurable. Add failed prompts to `evals/skills/kp_skill_triggers.csv`.
