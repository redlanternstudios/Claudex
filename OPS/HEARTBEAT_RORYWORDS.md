# HEARTBEAT RORYWORDS FORMAT

Version 1.0
Owner: Ro
Applies to: every scheduled Claudex heartbeat update sent to Ro

## PROMPT CONTRACT

GOAL: make every heartbeat update useful at a glance, so Ro can see what changed, what needs attention, and what happens next without reading bridge internals.

CONSTRAINTS:

* Keep the voice plain, warm, direct, and Ro native.
* Use headers and bullets.
* Use truth labels when facts matter.
* Do not expose secrets.
* Do not claim alignment, pushes, receipts, or state changes without evidence.
* Do not soften RED blockers.

FORMAT:

Use this exact shape.

```md
## Heartbeat

* Status: VERIFIED SYNC GREEN, YELLOW, or RED.
* Focus: product plus lane.
* Receipt: latest receipt, or NONE if honest.

## What changed

* VERIFIED one sentence.
* If nothing changed: VERIFIED no new bridge change. Live note refreshed.

## KP Top 5

* Rank, task, score, why now, next action, done proof, and movement.
* If fewer than five qualified tasks exist, state OPEN CAPACITY.

## Rory Top 5

* Rank, task, score, why now, next action, done proof, and movement.
* If fewer than five qualified tasks exist, state OPEN CAPACITY.

## Needs decision

* Only include blockers or clarification items that require KP, Rory, or another named owner.
* If nothing needs a decision: VERIFIED nothing needs you right now.

## Parked and noise

* Show counts only unless a parked or noise decision changed.

## Next

* One concrete next action.
```

FAILURE:

The heartbeat fails if it sends a raw technical dump, skips the color, omits either owner lane, fills open capacity with noise, hides a blocker, reports a push that did not happen, or makes Ro decode internal bridge language.

## STYLE RULES

* RoryWords means plain, casual, direct, warm, and organized.
* Lead with the outcome.
* Use short bullets.
* Translate engine terms into normal language.
* Keep the whole update compact unless RED needs detail.
* Headers are required.
* Bullets are required.
* If everything is calm, the update should still use the same structure.

## EXAMPLE GREEN

```md
## Heartbeat

* Status: VERIFIED SYNC GREEN.
* Focus: Claudex, studio bridge.
* Receipt: TC 20260707 005.

## What changed

* VERIFIED no new bridge change. Obsidian live note refreshed.

## KP Top 5

* 1. Current KP task. Score 80. Next: exact action. Done: exact proof. Move: SAME.

## Rory Top 5

* 1. Current Rory task. Score 80. Next: exact action. Done: exact proof. Move: SAME.

## Needs decision

* VERIFIED nothing needs you right now.

## Parked and noise

* 0 parked. 0 noise.

## Next

* Heartbeat checks again in one hour inshallah.
```

## EXAMPLE RED

```md
## Heartbeat

* Status: VERIFIED SYNC RED.
* Focus: Amina, iOS submission.
* Receipt: TC 20260707 004.

## What changed

* VERIFIED the app code is ready, but archive is still blocked by Apple account access.

## KP Top 5

* OPEN CAPACITY. No qualified signal.

## Rory Top 5

* 1. Restore Apple account access. Score 100. Next: refresh the Apple ID. Done: Xcode fetches the profile. Move: NEW.

## Needs decision

* Keymon needs the Apple ID for team P5H924VDYH refreshed in Xcode.

## Parked and noise

* 0 parked. 0 noise.

## Next

* Do not continue archive work until Xcode can fetch the provisioning profile.
```
