# HireWire Rory Application Bridge

Date: 2026-07-19
Status: V1 PILOT
Owner: Rory Lee Semeah

## Objective

Move Rory from job discovery through verified fit analysis, evidence questions, approved packet generation, filing, submission, follow-up, interview, and outcome learning without allowing agents to improvise career evidence or document layouts.

## Ownership

- HireWire owns intake, live-posting verification, gap analysis, Candidate Match Score, evidence questions, approval, and application status.
- The controlled packet renderer owns the cover letter, master-template resume, candidate profile, combined packet, and editable sources.
- The QA gate owns truth, visual fidelity, ATS extraction, packet order, brand restraint, and stale-artifact prevention.
- Claudex stores this protocol, queue summaries, decisions, receipts, and artifact manifests.
- Google Drive stores private PDFs, DOCX files, application answers, and exact submitted copies.

## State machine

`DISCOVERED -> VERIFIED -> SCORED -> NEEDS_EVIDENCE -> READY_FOR_DECISION -> APPROVED -> GENERATING -> QA_REVIEW -> READY_TO_APPLY -> SUBMITTED -> FOLLOW_UP_DUE -> INTERVIEWING -> OFFER|CLOSED`

Side states: `SKIPPED`, `EXPIRED`, `REJECTED`, `WITHDRAWN`, `DUPLICATE`.

## Packet contract

Each approved priority role produces:

1. One-page cover letter PDF and DOCX.
2. One-page master-template resume PDF and DOCX.
3. One-page company candidate profile PDF and DOCX.
4. Three-page combined PDF ordered Cover Letter, Resume, Candidate Profile.
5. Gap analysis, missing-evidence warnings, application answers, upload guidance, and artifact manifest.

## Branding contract

Every role receives a restrained company-derived palette. Record accent, rule, border, and muted-text tokens from official company sources. Apply them only to headings, rules, borders, and small accents. Do not use employer logos, imitate official documents, lower contrast, or create large brand-color fields.

## Evidence contract

All claims must resolve to Rory's canonical evidence library and carry direct, adjacent, or missing status. Questions may uncover real evidence but may never manufacture it. Contact information, eligibility details, compensation notes, and generated documents are private and do not belong in this public repository.

## Quality gate

A packet fails unless:

- every component has exactly one US Letter page;
- the combined packet has exactly three pages in the locked order;
- the resume preserves the approved centered identity, selected-builds strap, ruled sections, two-row tool grid, ATS skills, experience hierarchy, and education;
- the rendered resume is inspected at full-page and mobile scale;
- standalone resume and combined page two render identically;
- ATS extraction succeeds;
- all links, certification statuses, claims, palette tokens, filenames, and versions pass;
- no stale artifact shares the active application identity.

## Drive contract

`Rory San Diego/Job Applications/<YEAR>/<COMPANY>/<ROLE>/`

Folders: `01 Job Posting`, `02 Gap Analysis`, `03 Editable Sources`, `04 Final Application Packet`, `05 Submitted`, `06 Interview Preparation`.

Only QA-passed packets may be filed as final.
