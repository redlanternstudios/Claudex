# /rlsdoc

Status: ACTIVE
Created: 2026-07-17

## Trigger

Run when KP asks for any RedLantern Studios document that must ship in the studio standard format, including handoffs, briefs, operating notes, decision records, branded PDFs, and any request explicitly named `/rlsdoc`.

## Contract

Read these first:

1. `.claude/brand/BRAND_DOCUMENT_STANDARD.md`
2. `.claude/brand/RLS_DOCUMENT_TEMPLATE.html`
3. `.claude/skills/rlsdox.md`

If a Drive template is named in the request, treat that Drive file as the content source of truth, but still render the final artifact through the RedLantern template and brand rules.

## Exact steps

1. Classify the document type before writing.
2. Identify the source of truth.
3. Read the shared brand standard and master HTML template.
4. Build the document as HTML first, using the shared RedLantern page anatomy.
5. Keep the header black, the body cream, the footer black, and the logo real.
6. Use the diagonal sash immediately below the header with the shared black and white repeating pattern.
7. Render the HTML to PDF with the clean export path.
8. Verify the PDF by rendering page 1 to PNG and checking for:
   1. no pink or magenta bar
   2. no browser date or URL header
   3. black and white diagonal sash
   4. cream body and black footer
9. If the verification fails, fix the template or export pipeline, not the finished doc.
10. Ship the PDF as the canonical human facing artifact.

## Required behavior

1. Use the RedLantern template and brand tokens exactly.
2. Preserve the shared sash specification from the brand standard.
3. Render HTML first, then PDF for any human facing deliverable.
4. Treat the PDF as the final branded output and the HTML as the build source.
5. If the request is missing source content, return what is missing instead of fabricating.

## Truth rule

No template, no final doc claim.
No PDF, no complete external artifact claim.
No plain markdown as the finished human deliverable.
