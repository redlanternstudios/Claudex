# Supabase Production Product Boundary Repair

Date: 2026 07 14

Owner: Codex with Claudex receipt capture

## OBJECTIVE

VERIFIED: Close proven cross product data access in the shared RedLantern Studios Supabase project without changing project endpoints, Auth users, sessions, keys, or App Store release paths.

VERIFIED: Enable default deny protection for the empty By Red cursor table.

ASSUMED: Current product databases remain in place until a separate migration proves Auth, storage, session, and rollback behavior product by product.

## REALITY CHECK

VERIFIED: Before repair, an Amina only account could read 24 HireWire companies, 13 Circle profiles, and 5 HireWire feature flags.

VERIFIED: The public is_feature_enabled function also returned HireWire flag state to an Amina only account.

VERIFIED: The Amina home_feed and amina_submit_safety_report functions used elevated database rights without an Amina membership gate.

VERIFIED: The By Red table public.byred_board_sync_cursors contained zero rows, had no dependent database functions, and had row level security disabled.

VERIFIED: Fifteen tables already had row level security with no policies. That is default deny, not public exposure. They still carried unnecessary client grants that made them discoverable API surfaces.

VERIFIED: AuthenticHadith App is isolated in its own project and was not changed.

## EXECUTION

1. VERIFIED: Removed companies_select_authenticated and companies_insert_authenticated from public.companies. Existing owner policies remain active.

2. VERIFIED: Replaced the Circle profile global read policy with Amina membership plus privacy rules. Legacy Circle members remain recognized.

3. VERIFIED: Limited public.feature_flags and public.is_feature_enabled to HireWire members. Anonymous execution was removed.

4. VERIFIED: Added Amina membership checks to public.home_feed and public.amina_submit_safety_report.

5. VERIFIED: Moved product membership helpers into the private schema so they are not public RPC surfaces.

6. VERIFIED: Enabled row level security on public.byred_board_sync_cursors and removed all anon and authenticated grants.

7. VERIFIED: Locked the empty legacy app.companies table by removing its unrestricted authenticated policy and grants.

8. VERIFIED: Removed anon and authenticated grants from the fifteen existing default deny tables. No row policies were invented for unused or server owned tables.

9. VERIFIED: Forward migrations and rollback SQL were saved in the HireWire repository. The By Red grant repair SQL was mirrored into Claudex.

## RESULT

VERIFIED: Amina only role simulation now returns zero HireWire companies, zero HireWire feature flags, false for the HireWire flag RPC, and a working Amina home feed.

VERIFIED: HireWire role simulation still returns all five HireWire flags. A tested company owner sees 18 owned companies and zero foreign companies.

VERIFIED: An authenticated account belonging to neither product sees zero companies, zero Circle profiles, zero feature flags, false for the flag RPC, and zero home feed rows.

VERIFIED: The By Red cursor table now has row level security enabled, zero client grants, zero rows, and zero authenticated visibility.

VERIFIED: Advisor comparison no longer reports unrestricted access for public.companies, public.circle_profiles, public.feature_flags, or app.companies. The remaining no policy notices for server owned tables are informational and reflect intentional default deny behavior.

VERIFIED: No project was moved. No organization was renamed. No user, session, key, endpoint, bucket, or product data row was deleted.

## EDGE CASES

UNKNOWN: The currently saved Supabase password reset email template cannot be verified through the database connector. A prior dashboard view showed Amina branded source but did not prove the save completed.

PARTIAL: This repair proves database role behavior. It does not replace final physical device sign in, reset password, purchase, restore, and deletion tests for the Amina App Store release.

PARTIAL: Storage space was audited but not reduced. Current database sizes are not the immediate risk. Deleting dormant data remains blocked until product ownership and rollback are proven.

UNKNOWN: Six organizations visible in the earlier dashboard screenshot are not available through the connected Supabase account view. They require a separate live organization inventory before archival or deletion.

## ROLLBACK

VERIFIED: Each production change has local rollback SQL. The rollback restores the exact prior access grants and policy behavior where captured. Applying rollback would intentionally reopen the cross product access described above, so it is emergency use only.
