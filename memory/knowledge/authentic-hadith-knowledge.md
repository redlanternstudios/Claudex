# Knowledge: Authentic Hadith
# Product: authentic-hadith
# Last verified: 2026-06-08
# Maintained by: Librarian (writes) + Ro (approves changes)

---

## Standing Truth

### Purpose (VERIFIED)
Authentic Hadith is an Islamic hadith reference application. It provides users access to hadith collections with verified sourcing. It is an active product.

### Current Status (VERIFIED as of 2026-06-08)
- ACTIVE

### Religious Content Classification (VERIFIED — NON-NEGOTIABLE)
This product handles Islamic religious content. This is the highest sensitivity classification in the RedLantern product portfolio.

---

## Non-Negotiables

### THE HUMAN GATE (non-negotiable — no exceptions)
- No agent may claim to have verified a hadith's authenticity, chain of transmission, or grading
- All content involving hadith grading, attribution, or authenticity must pass through a named human scholar for sign-off
- Sign-off record must include: scholar's name + date + any notes from the scholar
- TechWriter will HARD BLOCK any commit that lacks this record
- The Scholarly Review Coordinator prepares content for human review — it does NOT review

### SOURCE RULES (non-negotiable)
- Primary sources only: Sahih Bukhari, Sahih Muslim, Sunan Abu Dawud, Jami at-Tirmidhi, Sunan an-Nasa'i, Sunan Ibn Majah, and other established collections
- Secondary sources require explicit PM + Ro approval before use
- Each hadith entry must include: collection name, book number, hadith number, chain of transmission (isnad), Arabic text, English translation

### CONTENT PIPELINE (VERIFIED)
Content Sourcing → Scholarly Review Coordinator → [HUMAN SCHOLAR GATE] → Editorial → Backend/Data → Published

### WHAT NO AGENT MAY DO
- Claim a hadith is sahih, da'if, mawdu', or any other grade
- Produce attribution to a scholar without verification
- Skip or abbreviate the human scholarly gate for speed
- Publish any content to the app without the full pipeline completed

### LISTING/MARKETING RULE (VERIFIED)
All ASO/marketing copy must not claim AI has verified the hadith. This is a trust and integrity issue for Muslim users.

---

## Common Mistakes in This Area

1. Treating hadith grading as a text classification task — it is not. It requires human scholarly expertise.
2. Skipping the human gate because content looks obviously correct — the gate is not about confidence, it is about integrity and trust.
3. Using secondary sources or summaries instead of primary texts.
4. Publishing content without Arabic text — always include both Arabic and English.

---

## Open Questions

- Who is the named human scholar currently engaged for review? (UNKNOWN — Ro to confirm)
- What is the response time expectation for scholarly review? (UNKNOWN — defines pipeline timing)
- Is there a priority for which collections are sourced first? (UNKNOWN — PM to define in spec)
- What is the DB schema for hadith entries? (UNKNOWN — pull before any schema work)
