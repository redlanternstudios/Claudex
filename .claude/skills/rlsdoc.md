# /rlsdoc

Status: ACTIVE
Created: 2026-07-14

## Trigger

Run when KP asks for any RedLantern Studios document that must ship in the studio standard format, including handoffs, briefs, operating notes, decision records, and branded PDFs.

## Contract

Read these first:

1. `.claude/brand/BRAND_DOCUMENT_STANDARD.md`
2. `.claude/brand/RLS_DOCUMENT_TEMPLATE.html`

If a Drive template is named in the request, treat that Drive file as the content source of truth, but still render the final artifact through the RedLantern template and brand rules.

## Required behavior

1. Classify the document type before writing.
2. Use the RedLantern template and brand tokens exactly.
3. Keep the header black, body cream, accents red, footer black, and logo real.
4. Render HTML first, then PDF for any human facing deliverable.
5. Use `/rlsdoc` for any future RedLantern doc request instead of inventing a new format.
6. If the request is missing source content, return what is missing instead of fabricating.

## Truth rule

No template, no final doc claim.
No PDF, no complete external artifact claim.
No plain markdown as the finished human deliverable.
