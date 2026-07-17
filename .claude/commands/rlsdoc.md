# /rlsdoc [source?] [scope?]

**Purpose:** Produce a RedLantern Studios document in the shared studio standard format and verify the PDF output.

**Skill:** `.claude/skills/rlsdoc.md`
**Standard:** `.claude/brand/BRAND_DOCUMENT_STANDARD.md`
**Template:** `.claude/brand/RLS_DOCUMENT_TEMPLATE.html`

---

## INPUTS
- `source` (optional) - the document source, Drive file, brief, notes, or prior draft
- `scope` (optional) - one document or section if the request is narrow

## PRECONDITIONS
Read before asking Ro anything:
1. `memory/MEMORY.md` index if the request depends on prior studio context
2. `.claude/skills/rlsdoc.md`
3. `.claude/brand/BRAND_DOCUMENT_STANDARD.md`
4. `.claude/brand/RLS_DOCUMENT_TEMPLATE.html`
5. Existing draft or source files if named in the request

## EXECUTION
1. Classify the document type.
2. Identify the source of truth.
3. Build the document as HTML using the shared RLS template and tokens.
4. Keep the header black, the body cream, the footer black, and the logo real.
5. Use the diagonal black and white sash immediately below the header.
6. Render the HTML to PDF with the clean export path.
7. Render page 1 of the PDF to PNG and visually inspect it.
8. Confirm no pink bar, no browser header, and no layout drift.
9. Return the final PDF path and note any remaining unknowns.

## OUTPUTS
- Branded HTML source
- Branded PDF
- Render verification image for page 1 if the request requires proof
- TruthCal receipt if this is a meaningful repo change

## SUCCESS CONDITION
A stakeholder can open the PDF and see the exact shared RLS format with the diagonal sash, no browser header, and no pink fallback.

## FAILURE CONDITIONS
- Any pink or magenta bar appears
- Chrome date or URL header appears
- PDF and HTML differ visually in the header region
- Plain markdown is treated as the final deliverable
- The template drifts from the shared brand standard

## SESSION CLOSE
Update the relevant receipt or decision record if the command changed any shared template or export behavior.
