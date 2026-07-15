# TruthCal Receipt TC-20260714-CDX-08

Date: 2026-07-14
Product: footprint
Lane: footprint/proof_bridge
Author: codex
Intent: converted all setup handoffs to downloadable PDF pack
Result: COMPLETE

## Truth

VERIFIED: Receipt created through the Claudex command layer.

VERIFIED: The n8n, Supabase, PostHog, Sentry, downstream account, and self sustaining candidate engine handoffs each have a separate branded PDF.

VERIFIED: One fifteen page master setup pack contains all six handoffs.

VERIFIED: One eighteen page complete pack contains the master setup pack plus the Rory, Homira, and Keymon authority forms.

VERIFIED: One ZIP contains all eleven final PDF files.

VERIFIED: Every PDF passed page count, text extraction, and 2015 footer checks.

VERIFIED: The ZIP passed archive integrity checks.

VERIFIED: All eighteen pages of the complete pack were rendered through Poppler and visually checked for clipping, black page defects, missing headers, missing footers, and unreadable text.

## Evidence

1. `scripts/build_footprint_download_pack.py`
2. `output/pdf/footprint_download_pack/Footprint_n8n_Keymon_Instructions.pdf`
3. `output/pdf/footprint_download_pack/Footprint_Supabase_Instructions.pdf`
4. `output/pdf/footprint_download_pack/Footprint_PostHog_Instructions.pdf`
5. `output/pdf/footprint_download_pack/Footprint_Sentry_Instructions.pdf`
6. `output/pdf/footprint_download_pack/Footprint_Downstream_Account_Map.pdf`
7. `output/pdf/footprint_download_pack/Footprint_Self_Sustaining_Candidate_Engine_CTP.pdf`
8. `output/pdf/footprint_download_pack/Footprint_Setup_and_Candidate_Engine_Master_Pack.pdf`
9. `output/pdf/footprint_download_pack/Footprint_Complete_Manual_and_Authority_Pack.pdf`
10. `output/pdf/footprint_download_pack/Footprint_All_Downloadable_PDFs.zip`

## Next action

Ro downloads either the complete PDF pack or the ZIP. The live setup work remains gated by the approval inbox, Supabase project, n8n workspace, signed authority forms, and the remaining Footprint preflight requirements.
