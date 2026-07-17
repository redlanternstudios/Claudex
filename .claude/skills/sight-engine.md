# Sight Engine

Status ACTIVE

Canonical capability: claudex.skill.sight-engine

## Trigger

Run when KP says `run Sight Engine`, identifies an unacceptable visual defect, requests professional visual review, or when Send to Rory includes a human facing visual attachment.

## Contract

Inspect the final rendered artifact at the actual delivery dimensions.

1. Check text clipping, overlap, collisions, duplicate numbering, incorrect page order, hidden labels, unsafe margins, contrast, hierarchy, alignment, and visual balance.
2. Check professional articulation, terminology precision, factual consistency, brand treatment, and whether diagrams teach the intended relationship.
3. Search upstream and downstream pages or screens for the same defect class.
4. Name every defect with exact page, region, element, failure, and correction.
5. Correct only when the current task authorizes editing. Rerender after every correction.
6. Return `PASS` only when the final rendered artifact has been inspected after the last edit.

Fail closed on clipped text, obscured content, duplicate sequence numbers, unreadable contrast, unprofessional wording, or uninspected replacement files.

Sight Engine proves visual quality only. It does not prove delivery, publication, code execution, or canonical repository state.
