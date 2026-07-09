# iOS App Store Submission Template
**RedLantern Studios — Standard Operating Checklist**
Version: 2.0 | Applies to: All RLS iOS submissions
Reference product: Authentic Hadith (IN REVIEW June 2026)

---

## PROMPT CONTRACT (CTP Step 0)

**GOAL:** Ship an app through Apple review with zero avoidable rejections and a defensible audit trail.
**CONSTRAINTS:** Apple rejects on guidelines, metadata, privacy, payments, content, and technical quality. Faith and Islamic apps receive additional content scrutiny. Subscriptions require specific disclosure. AI-generated content requires explicit labeling. Sign in with Apple is mandatory when any third-party login exists.
**FORMAT:** Phase-gated checklist. Each item has PASS/FAIL criteria. Nothing moves to the next phase until the current phase is complete.
**FAILURE:** Skipping a section, marking PASS without verification, submitting without a demo account, or skipping the TestFlight gate.

---

## HOW TO USE THIS TEMPLATE

1. Copy this file to `projects/[app-name]/submissions/[date]-submission.md`
2. Work through every phase in order. Do not skip ahead.
3. Every item must be marked `[PASS]`, `[FAIL]`, or `[BLOCKED — reason]`
4. Do not submit until all items are `[PASS]` or documented exceptions exist
5. After review decision: annotate outcomes in Phase 11

---

## PHASE 1 — ACCOUNT HEALTH

*Check before touching anything else. A rejected account cannot submit.*

- [ ] Apple Developer account is active and paid ($99/yr confirmed)
- [ ] Account has not received any recent policy violations or app removals
- [ ] Bundle ID registered in App Store Connect and matches Xcode project exactly
- [ ] Certificates (distribution) are valid and not expired
- [ ] Provisioning profile matches the bundle ID and distribution certificate
- [ ] All team members who need access have correct roles assigned
- [ ] Two-factor authentication is active on the Apple ID used for submission

**PHASE 1 GATE — all 7 items PASS before continuing**

---

## PHASE 2 — TECHNICAL BUILD REQUIREMENTS

*What Apple rejects at the binary level before a human ever sees it.*

### 2A — Build Quality

- [ ] Xcode version is current (verify at developer.apple.com — required version changes annually)
- [ ] iOS deployment target is within Apple's supported range
- [ ] App builds without errors on a PHYSICAL device (not simulator only)
- [ ] App builds with the `Release` scheme (not Debug)
- [ ] Archive created with correct signing identity (distribution, not development)
- [ ] No deprecated APIs that Apple has flagged as hard-blocked
- [ ] All third-party SDKs updated to versions supporting current iOS
- [ ] Required device capabilities declared correctly in Info.plist
- [ ] No placeholder API keys or test credentials in the production build
- [ ] App does not reference any private Apple APIs
- [ ] App does not crash on launch (test with clean install, no prior data)
- [ ] App does not crash under memory pressure (test on iPhone SE as baseline device)
- [ ] Background modes declared in Info.plist match actual background behavior (Apple audits this)
- [ ] If using push notifications: APNs certificate or Auth Key configured in App Store Connect
- [ ] Entitlements file contains only capabilities the app actually uses

### 2B — Sign in with Apple (Guideline 4.8 — hard rejection if missed)

**Rule:** If the app offers ANY third-party login (Google, Facebook, email magic link, or any other external identity provider), Apple REQUIRES Sign in with Apple as an option at the same level of prominence. No exceptions for apps distributed through the App Store.

- [ ] Confirmed: does the app offer any third-party or external login method? (YES / NO)
- [ ] If YES: Sign in with Apple is implemented and visible on the login/signup screen
- [ ] Sign in with Apple button meets Apple's visual requirements (not a custom styled button unless following Apple HIG)
- [ ] Sign in with Apple flow is tested end-to-end on a physical device
- [ ] If the app does NOT offer any third-party login (email and password only): this section is N/A — document the decision

### 2C — Network and Offline Handling

*Apple reviewers test apps in airplane mode and on degraded connections. A blank screen or crash in offline state is a Guideline 2.1 rejection.*

- [ ] Every screen that makes a network call has a handled failure state (error message, retry option, or graceful degradation)
- [ ] App does not show a blank white screen when offline
- [ ] App does not crash when launched with no internet connection
- [ ] Loading states are present for all async operations
- [ ] Timeout handling is implemented — the app does not hang indefinitely waiting for a response
- [ ] If the app has offline functionality: it works correctly without any network connection
- [ ] If the app is network-only: a clear message is shown when connectivity is unavailable

### 2D — Accessibility Baseline (increasing Apple scrutiny — do not skip)

*Full WCAG audit is not required pre-launch. A 30-minute VoiceOver walkthrough is.*

- [ ] All interactive elements (buttons, links, inputs) have accessibility labels
- [ ] Dynamic Type is tested at the largest accessibility font size — layout does not break or overlap
- [ ] VoiceOver can navigate through the primary user flows without getting stuck
- [ ] Color is not the only means of conveying information (important for status indicators)
- [ ] Touch targets are at minimum 44x44 points
- [ ] Images that convey meaning have accessibility descriptions

### 2E — AI Feature Requirements (Amina, HireWire, any AI-powered app)

- [ ] AI-generated content is not presented as authoritative human-verified fact
- [ ] If generating personalized recommendations: no claims of medical, legal, financial, or religious ruling authority
- [ ] AI content disclosure exists somewhere in-app or in metadata
- [ ] If generating text: content moderation or output filtering exists for harmful outputs

**PHASE 2 GATE — all applicable sub-sections PASS before continuing**

---

## PHASE 3 — PRIVACY AND DATA DECLARATIONS

*The most common silent rejection trigger. Apple will reject without explanation if the privacy nutrition label does not match actual data usage.*

### 3A — Privacy Nutrition Label (App Store Connect)

Audit EVERY data type Apple lists. For each: Does the app collect it? Is it linked to identity? Is it used for tracking?

**Data types to audit:**
- [ ] Contact Info (name, email, phone, address)
- [ ] Health and Fitness
- [ ] Financial Info
- [ ] Location (precise and/or coarse)
- [ ] Sensitive Info
- [ ] Contacts
- [ ] User Content (messages, photos, audio, other user content)
- [ ] Browsing History
- [ ] Search History
- [ ] Identifiers (User ID, Device ID)
- [ ] Purchases
- [ ] Usage Data (product interaction, other usage data)
- [ ] Diagnostics (crash data, performance data)

**For each data type collected:**
- [ ] Purpose is declared accurately
- [ ] Whether it is linked to identity is correctly marked
- [ ] Whether it is used for tracking is correctly marked

**For faith and Islamic apps:**
- [ ] If collecting prayer time location: declared as Location > Coarse
- [ ] If collecting Quran reading history or reading position: declared as Usage Data
- [ ] If collecting journal or reflection entries (Amina Daily Moments): declared as User Content, linked to identity
- [ ] Third-party analytics and error tracking (PostHog, Sentry) data collection is reflected in the label

### 3B — App Tracking Transparency (ATT — Guideline 5.1.2)

*PostHog and Sentry may trigger ATT depending on configuration. Audit before assuming you are exempt.*

- [ ] Audit how PostHog is initialized: does it use IDFA or cross-app tracking? (YES triggers ATT)
- [ ] Audit Sentry configuration: does it collect device identifiers used across apps? (YES triggers ATT)
- [ ] If ANY cross-app or cross-website tracking occurs: ATT permission prompt is implemented using `AppTrackingTransparency` framework
- [ ] ATT prompt is shown BEFORE any tracking begins (not after app launch without prompt)
- [ ] If ATT is required: NSUserTrackingUsageDescription is present in Info.plist with a clear user-facing explanation
- [ ] If confirmed no cross-app tracking occurs: document this decision explicitly. Do not assume — verify with the SDK documentation for each third-party tool used.

### 3C — Privacy Policy

- [ ] Privacy policy URL is live and publicly accessible (not behind a login)
- [ ] Privacy policy is in English (Apple requirement)
- [ ] Privacy policy covers all data types in the nutrition label
- [ ] Privacy policy names all third-party services that receive data (Supabase, PostHog, Sentry, Stripe, etc.)
- [ ] Privacy policy includes user data deletion and data subject rights section
- [ ] Privacy policy URL is entered in App Store Connect metadata field
- [ ] If app is used by or accessible to users under 13: COPPA compliance is explicit, and an age gate exists in-app

**PHASE 3 GATE — every data type audited, ATT decision documented, policy live and linked**

---

## PHASE 4 — IN-APP PURCHASES AND SUBSCRIPTIONS

*Apple scrutinizes monetization harder than almost anything else. Incorrect setup is an automatic rejection.*

- [ ] All IAP products created in App Store Connect BEFORE submitting the build
- [ ] IAP product IDs in code match App Store Connect exactly (case-sensitive)
- [ ] If offering subscriptions: subscription group created with correct display priority
- [ ] Introductory offers and free trials configured if used
- [ ] Pricing set in App Store Connect for all target markets
- [ ] Tax category assigned to each product
- [ ] App does not process payments outside of StoreKit for digital goods delivered in-app. This is an automatic rejection. Stripe for digital content consumed in the app is banned on iOS. Stripe is only permitted for physical goods or web-based service billing.

**Subscription disclosure requirements (Guideline 3.1.2):**
- [ ] Subscription price displayed clearly on the paywall BEFORE the user subscribes
- [ ] Subscription duration displayed clearly (monthly, annual, etc.)
- [ ] What the subscription unlocks is described clearly
- [ ] Auto-renewal disclosure present ("Subscription automatically renews unless cancelled...")
- [ ] Link to Terms of Service visible on the paywall
- [ ] Link to Privacy Policy visible on the paywall
- [ ] Restore Purchases button is present and functional

**Stripe usage audit:**
- [ ] Confirmed: Stripe is ONLY used for web payments or physical goods — not digital content delivered in-app
- [ ] If any in-app digital content is gated behind a Stripe payment: STOP. This requires a redesign to StoreKit before submission.

**PHASE 4 GATE — all IAPs set up, all subscription disclosures verified on device**

---

## PHASE 5 — CONTENT AND COMMUNITY GUIDELINES

### 5A — General Content

- [ ] No adult content unless age-gated with correct content rating
- [ ] No promotion of violence, illegal activity, or hate speech
- [ ] App does not impersonate another app or brand
- [ ] App name does not include words implying App Store curation ("Best", "Top", "#1") unless verifiable
- [ ] App does not make false claims about features not present in the submitted build

### 5B — Religious and Faith App Rules (Guideline 1.1 + 1.2)

- [ ] App does not disparage or attack other religions or belief systems
- [ ] App does not position itself as providing religious rulings (fatwas) without clear scholarly source attribution
- [ ] AI-generated religious content (Quran reflections, hadith explanations) is labeled as AI-generated or as "for reflection purposes"
- [ ] If quoting Quran or Hadith: sources are correctly attributed with reference numbers where applicable
- [ ] App does not claim scholarly endorsement it does not have
- [ ] If app features a community or social component: moderation policy exists and is described in-app or in review notes

### 5C — User Generated Content (Amina Daily Moments, Circle, any community feature)

- [ ] Mechanism exists for users to report offensive content
- [ ] Content moderation capability exists (manual at launch is acceptable if disclosed)
- [ ] Terms of Service covering UGC are in place and linked in-app
- [ ] If voice content is possible: audio storage complies with the privacy policy

**PHASE 5 GATE — all content reviewed, no undefended claims in metadata or in-app**

---

## PHASE 6 — APP METADATA

### 6A — Name and Subtitle

- [ ] App name is 30 characters or fewer
- [ ] App name matches the name shown in the app (Apple checks consistency)
- [ ] No keyword stuffing in app name
- [ ] Subtitle is 30 characters or fewer and describes the app accurately

### 6B — Description

- [ ] Primary description is under 4,000 characters
- [ ] First 3 lines are strong (visible without "more" tap on the App Store listing)
- [ ] Description does not reference competitors negatively
- [ ] Description does not promise features not in this version
- [ ] "What's New" section filled in accurately for updates (not applicable to first submission)

### 6C — Keywords

- [ ] Keywords field is under 100 characters total
- [ ] No keyword stuffing or repeated words
- [ ] No competitor names as keywords
- [ ] No category names as keywords (Apple already indexes these)

### 6D — Category and Rating

- [ ] Primary category is the most accurate fit
- [ ] Secondary category selected if applicable
- [ ] Age rating questionnaire completed accurately
- [ ] For faith and Islamic apps: minimum 12+ if community features exist; 4+ only for purely informational apps with no community interaction

### 6E — URLs

- [ ] Support URL is a live, accessible page
- [ ] Marketing URL is live if provided
- [ ] Privacy policy URL matches what was entered in Phase 3

**PHASE 6 GATE — all metadata fields complete and verified**

---

## PHASE 7 — SCREENSHOTS AND PREVIEW

- [ ] Screenshots provided for all required device sizes:
  - iPhone 6.9" (iPhone 16 Pro Max) — REQUIRED
  - iPhone 6.5" (iPhone 14 Plus / 13 Pro Max) — REQUIRED
  - iPad Pro 13" — required if app supports iPad
- [ ] Screenshots show ACTUAL app UI — no mockups, stock photos, or UI that does not exist in the submitted build
- [ ] Screenshots do not show competitor apps or Apple hardware (unless using Apple's official device frames)
- [ ] If app has a paywall: at least one screenshot shows what premium content looks like
- [ ] App preview video (if used): no unlicensed music, no non-functional UI shown
- [ ] Screenshots are in the correct resolution for each device size

**PHASE 7 GATE — all required sizes uploaded, content verified accurate**

---

## PHASE 8 — DEMO ACCOUNT AND REVIEW NOTES

### 8A — Demo Account

- [ ] Demo account credentials created (username and password, no biometric-only path)
- [ ] Demo account has all premium and paid features unlocked (reviewer will not pay)
- [ ] Demo account credentials entered in App Store Connect Review Information
- [ ] Demo account works on a CLEAN install with no prior app data
- [ ] If app requires OTP or SMS verification: provide a phone number that can receive SMS or provide a bypass path
- [ ] Demo account data populated enough to demonstrate real functionality (not empty state only)

**For Amina:** use amina@yopmail.com / Amina123! (user_id: d849ca72, lifetime premium). Verify this account is still active before every submission.

### 8B — Review Notes

- [ ] Review notes explain all non-obvious flows
- [ ] Review notes explain how to reach any feature requiring specific steps
- [ ] If app uses location: explain why and what happens in-app, with test coordinates if the feature is geolocation-dependent (prayer times, Qibla direction)
- [ ] If app has content requiring context to evaluate: provide that context in review notes
- [ ] Review notes are in plain English — assume the reviewer has zero context about the product

**PHASE 8 GATE — demo account tested on clean install, review notes written and reviewed**

---

## PHASE 9 — TESTFLIGHT GATE (MANDATORY — do not skip)

*Submitting to App Store without a TestFlight gate is how avoidable crashes reach the reviewer. This phase is non-negotiable.*

- [ ] App has been distributed to TestFlight for a minimum of 7 days before App Store submission
- [ ] Minimum 5 external testers have used the build
- [ ] At least 1 tester is on the oldest supported iOS version declared in the build
- [ ] At least 1 tester is on the current iOS release
- [ ] Crash-free rate in TestFlight is above 99% for the build being submitted
- [ ] All critical feedback from TestFlight testers has been addressed or documented as accepted risk
- [ ] TestFlight build version matches or is the direct predecessor to the App Store submission build
- [ ] No open crash reports in Xcode Organizer for the submission build that are unaddressed

**For external TestFlight builds:** note that Apple reviews external TestFlight submissions before they reach testers. If TestFlight was rejected, that rejection reason must also be resolved before App Store submission.

**PHASE 9 GATE — crash-free rate confirmed above 99%, tester matrix complete**

---

## PHASE 10 — FINAL PRE-SUBMISSION CHECKLIST

- [ ] Build version and build number are incremented correctly
- [ ] Version number matches "What's New" description (for updates)
- [ ] App has been tested on the oldest supported device at the declared minimum iOS version
- [ ] App has been tested on the latest iOS release
- [ ] No test or debug UI visible in the production build
- [ ] No console logs exposing sensitive data (verify with device connected to Xcode)
- [ ] All placeholder copy replaced with real copy
- [ ] All placeholder images replaced
- [ ] Onboarding flow completes cleanly for a first-time user on a clean install
- [ ] Export compliance questions answered correctly (if using any encryption — Supabase Auth and HTTPS both use encryption — answer Yes and use the standard encryption exemption documentation)

**Phased Rollout Decision:**

Before hitting Submit, decide the rollout strategy for this release:

| Strategy | When to Use |
|---|---|
| 100% immediate | First submission or minor bug fixes with low risk |
| Phased (1% → 2% → 5% → 10% → 50% → 100%) | Any significant update, new feature launch, or architectural change |

- [ ] Rollout strategy decision made and documented: (circle one) **IMMEDIATE** / **PHASED**
- [ ] If phased: monitoring plan is in place (Sentry alerts, PostHog dashboards active) to catch regressions before advancing each phase

**Submission Pipeline:**

- [ ] If submitting manually via Xcode Organizer: archive is the correct scheme (Release, correct signing)
- [ ] If using fastlane (recommended for RLS at 3+ apps): `fastlane deliver` configured with correct credentials, metadata folder, and screenshot folder. Fastlane produces a submission receipt — save it.
- [ ] Recommended: set up fastlane before the third app submission. It handles screenshots, metadata, binary upload, and phased rollout configuration in a single auditable command.

**PHASE 10 GATE — entire checklist signed off, rollout strategy documented**

---

## PHASE 11 — POST-SUBMISSION TRACKING

| Field | Value |
|---|---|
| Submitted date | |
| Build version submitted | |
| Rollout strategy | |
| Review status | In Review / Approved / Rejected |
| Days to first response | |
| Rejection reason (if any) | |
| Guideline cited | |
| Resolution applied | |
| Resubmission date | |
| Final approval date | |
| Rollout completion date | |

**If Rejected:**

- [ ] Read the rejection reason in full — do not skim
- [ ] Identify the exact guideline cited
- [ ] Determine: (a) fixable in metadata, (b) fixable in binary, or (c) requires design change
- [ ] Do NOT resubmit until the rejection reason is fully resolved
- [ ] If the rejection reason is ambiguous: use Apple's Resolution Center to ask a clarifying question before resubmitting
- [ ] Document the rejection and resolution in this file for future submissions

---

## FAITH AND ISLAMIC APP WATCHLIST

*Applies to: Authentic Hadith, Amina, The Lantern, any future Islamic product*

1. **Religious authority claims** — Never say AI gives fatwas, rulings, or scholarly opinions. Label AI content as reflection or informational only.
2. **Scholar attribution** — If quoting hadith: include grade (sahih, hasan, etc.) and source (Bukhari, Muslim, etc.). Missing attribution is treated as a metadata accuracy issue.
3. **Content age rating** — Hadith collections can include mature themes (battle, death, marriage). Rate at 12+ minimum, or higher if community features exist.
4. **Community moderation** — If users can post anything: a reported content mechanism is required before approval.
5. **Prayer time location** — Declare location usage even if using coarse location for prayer time calculation.
6. **External links to web content** — If linking to external Islamic content sites: Apple may flag if those sites contain unmoderated content. Audit destination domains.
7. **In-app browser (WKWebView)** — If loading external content: Apple may require additional disclosure.

---

## QUICK REFERENCE — COMMON REJECTION REASONS

| Guideline | Most Common Trigger |
|---|---|
| 2.1 | App crashes or has obvious bugs, blank offline state |
| 3.1.1 | Digital goods not using StoreKit (Stripe for in-app content) |
| 4.0 | Copycat or placeholder content |
| 4.8 | Missing Sign in with Apple when third-party login exists |
| 5.1.1 | Privacy nutrition label inaccurate or privacy policy missing |
| 5.1.2 | ATT prompt missing when cross-app tracking occurs |
| 1.1 | Objectionable content |
| 2.5.4 | Background mode declared but not used or used incorrectly |
| 4.2 | Minimum functionality (app is too simple or demo-level) |

---

## AMENDMENT LOG

| Date | Change | Sign-off |
|---|---|---|
| 2026-06-25 | v1.0 — Initial version from AH submission + CTP enrichment | Ro |
| 2026-06-25 | v2.0 — Added Phase 2B (Sign in with Apple), Phase 2C (Offline Handling), Phase 2D (Accessibility), Phase 3B (ATT), Phase 9 (TestFlight Gate), Phase 10 phased rollout + fastlane additions | Ro |

---

*RedLantern Studios — Build in public. Operate in truth.*
