# Knowledge: Paradise Property Services
# Product: paradise
# Last verified: 2026-06-08
# Maintained by: Librarian (writes) + Ro (approves changes)

---

## Standing Truth

### Purpose (VERIFIED)
Paradise Property Services is a contractor vendor approval and compliance system. Its goal is to manage vendor approval, contracts, insurance verification, licensing compliance, and bonding for contractor relationships.

### Current Status (VERIFIED as of 2026-06-08)
- ACTIVE

### Business Structure (VERIFIED)
- Basheer = the licensed entity (contractor-of-record)
- By Red = the operational layer running the system
- Distinction matters for contracts, compliance docs, and vendor-facing communications

### Compliance Requirements (VERIFIED — ASSUMPTION on specific thresholds)
Every vendor must provide:
- Active contractor license (state-specific)
- General liability insurance (threshold: UNKNOWN — verify with Ro/Legal)
- Workers' comp insurance (if applicable)
- Bond documentation (if required by project type)
- Completed vendor packet

### Vendor Packet (ASSUMPTION — verify structure with Ro)
The vendor packet is the single onboarding artifact that captures all compliance documents.
It must be complete before a vendor is approved to work.
Partial packets = BLOCKED vendor status. Not approved, not rejected — blocked pending completion.

---

## Non-Negotiables

### LICENSING RULE
No vendor is approved to work without a verified active contractor license.
License verification must be documented, not assumed.

### LEGAL GATE
Any contract execution routes to Legal/Compliance agent + Ro approval before signing.
Sales agent proposes. Legal reviews. Ro signs off. No exceptions.

### VENDOR STATUS MODEL
```
States: PENDING → UNDER REVIEW → APPROVED / BLOCKED / REJECTED
BLOCKED: Has a vendor packet but it is incomplete — awaiting specific document(s)
REJECTED: Failed compliance check — cannot be resubmitted without addressing specific failure
APPROVED: All compliance documents verified, vendor is cleared to work
```

### DATA SENSITIVITY
Vendor compliance documents (insurance certs, licenses) are sensitive business documents.
RLS must ensure vendors can only see their own records.
Internal compliance staff and Ro can see all records.

---

## Common Mistakes in This Area

1. Approving a vendor before all compliance documents are received — never do this
2. Treating BLOCKED as REJECTED — blocked vendors can complete their packet and move to approved
3. Storing compliance documents without expiration date tracking — insurance certs and licenses expire
4. Routing contracts to Release without Legal review

---

## Open Questions

- What is the exact insurance minimum threshold? (UNKNOWN — verify with Ro)
- Is bonding required for all vendor types or only specific ones? (UNKNOWN — verify)
- What is the DB schema for vendor records? (UNKNOWN — pull before any schema work)
- Is there a Supabase project for Paradise or does it share with another product? (UNKNOWN)
- What is the current vendor packet format? (UNKNOWN — PM to define)
- Is there a dashboard for Basheer/Ro to view vendor status? (UNKNOWN — verify with PM)
