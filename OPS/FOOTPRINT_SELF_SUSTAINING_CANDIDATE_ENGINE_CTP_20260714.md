# Footprint Self Sustaining Candidate Engine CTP

Date: 2026 07 14

Status: CTP COMPLETE. BUILD GATED.

## OBJECTIVE

Build a private candidate list that continuously finds, verifies, scores, dedupes, refreshes, and retires qualified Tech Builders and Talent Partners without making Ro maintain the list.

## CONTRACT

GOAL: A small, high quality, self renewing network candidate pool.

CONSTRAINTS: Free participation. Invite only founding cohort. No overpopulation. No login wall scraping. No personal credential sharing. Human approval for every public post, invitation, introduction, and outreach action during the first ninety days.

FORMAT: Supabase source of truth, n8n workflows, email approval loop, PostHog measurement, Sentry monitoring.

FAILURE: A noisy list, repeated people, weak proof, biased scoring, unauthorized outreach, stale records, or growth that outruns participant care.

## REALITY CHECK

VERIFIED: Ro does not want candidate search and list maintenance as his responsibility.

VERIFIED: Ro authorizes the safety, deployment, accessibility, writing, brand, and editing roles when their approved gates are reached.

VERIFIED: The first ninety days still require recorded human approval for public posts and introductions.

ASSUMED: Autonomous adding means adding qualified people to the private candidate list. It does not mean silently inviting, messaging, introducing, or publishing about them.

UNKNOWN: The dedicated Footprint approval email address.

UNKNOWN: The final Supabase organization, project reference, and region.

UNKNOWN: Which public search provider will be approved for production use.

## CORE DECISION

Footprint may autonomously discover, enrich, score, dedupe, add, refresh, quarantine, and retire private candidate records after the data, safety, and quality gates pass.

Footprint may not autonomously send an invitation, message, introduction, public response, or post during the first ninety days. Those actions require the exact final action to be approved through the dedicated Footprint inbox.

## TWO PRIVATE LANES

### Tech Builders

1. Automation builders
2. Artificial intelligence builders
3. Software builders
4. Systems builders

### Talent Partners

1. Recruiters
2. Headhunters
3. Staffing agencies
4. Internal talent leaders

## DISCOVERY SOURCES

Use public and permitted sources only:

1. Public personal sites
2. Public GitHub profiles and repositories
3. Public company team pages
4. Public conference speaker lists
5. Public professional articles and podcasts
6. Public job and agency pages
7. Direct nominations from trusted participants

Do not scrape login walls or automate personal LinkedIn accounts.

## PIPELINE

1. Discover a public candidate and source URL.
2. Normalize the name, organization, location, and lane.
3. Dedupe by canonical profile, domain, organization, and identity signals.
4. Gather current evidence from at least two permitted sources when possible.
5. Score proof, relevance, freshness, trust, network fit, and risk.
6. Add qualified records to the private candidate list.
7. Quarantine conflicts, weak evidence, sensitive data, and identity uncertainty.
8. Refresh active records every thirty days.
9. Retire stale or unqualified records without deleting the audit history.
10. Create an approval request only when capacity and a real network need justify action.

## QUALITY SCORE

Each dimension scores zero through five:

1. Verified proof of work
2. Fit with the selected Footprint lane
3. Freshness of evidence
4. Trust and consent safety
5. Ability to add value without crowding
6. Geographic or opportunity relevance

Rules:

1. Twenty four or higher may enter the ready pool.
2. Eighteen through twenty three stays in watch.
3. Below eighteen retires unless new evidence appears.
4. Any safety or identity conflict overrides the score and quarantines the record.

## SELF SUSTAINING LOOP

1. Search runs on a controlled schedule.
2. The system adds private records by itself.
3. Dedupe runs before every insert.
4. Evidence freshness decays over time.
5. Candidate quality is reviewed against real outcomes.
6. Poor sources lose weight.
7. Strong sources gain weight.
8. Capacity caps pause discovery before the pool becomes noisy.
9. Opt outs create a permanent suppression record.
10. Every external action remains traceable to evidence and approval.

## CAPACITY CAPS

Founding mode starts with:

1. Maximum fifty ready Tech Builders
2. Maximum twenty five ready Talent Partners
3. Maximum ten new candidates entering ready status per week
4. Maximum five proposed external actions per day

The system pauses new ready admissions when participant care, approval response time, or introduction quality falls below target.

## APPROVED ROLE AUTHORITY

Safety, deployment, accessibility, writing, brand, and editing roles may act only after their named gates pass. Authorization does not itself prove that a gate passed.

Every role must:

1. Produce evidence
2. Respect the current scope lock
3. Stop on unknown identity or permission
4. Record its action
5. Submit public action to human approval during the first ninety days

## DEFINITION OF DONE

1. Supabase project exists.
2. Data model and row level security pass review.
3. n8n workflows exist and remain inactive until verified.
4. Approval inbox is confirmed.
5. Candidate discovery produces deduped private records.
6. Quality scoring and quarantine tests pass.
7. No external action can bypass approval.
8. PostHog measures the minimum allowed events.
9. Sentry catches workflow and application failures without private data leakage.
10. Stop authority works for Ro and Keymon.

## NEXT ACTION

Ro creates or confirms the Footprint approval inbox and Supabase project. Keymon creates the n8n workspace and the nine inactive workflows. Codex then builds the versioned data model and workflow contracts for gate review.
