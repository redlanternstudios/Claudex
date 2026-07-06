# Amina Full Interaction Trigger Registry

Version: 1.0
Date: 2026 07 06
Status: CANONICAL CONTRACT
Scope: Every current page, reusable interactive component, feature action, button, click, form, native handoff, scheduled trigger, webhook, and recovery path.

## Objective

Every visible action in Amina must have a complete path:

User action → interface state → authenticated command → authorization → atomic data change → durable event → downstream consumer → user feedback → recovery → receipt.

No button is complete because it navigates or calls an API. It is complete only when the full path above is proven.

## Universal interaction contract

Every interaction must register:

1. Surface and control label.
2. User intent.
3. Eligibility and disabled state.
4. Command name and version.
5. Authentication requirement.
6. Ownership and authorization rule.
7. Input schema and size limits.
8. Idempotency key.
9. Atomic database mutation.
10. Durable domain event.
11. Downstream consumers.
12. Loading state.
13. Success state.
14. Empty state.
15. Error and retry state.
16. Offline behavior.
17. Accessibility label and focus behavior.
18. Privacy classification.
19. Analytics payload without private text.
20. Automated and end to end proof.

## Event envelope

All durable events require:

1. `event_id`
2. `event_name`
3. `event_version`
4. `occurred_at`
5. `actor_user_id`
6. `aggregate_type`
7. `aggregate_id`
8. `idempotency_key`
9. `payload`
10. `sensitivity`
11. `producer`
12. `correlation_id`
13. `causation_id`
14. `processing_status`
15. `retry_count`

Private chat, reflection, memory, Du’a, post, comment, audio, and image content is prohibited in analytics and general domain event payloads.

## Shared application shell

| Surface | Interaction | Command or result | Downstream and recovery |
|---|---|---|---|
| Bottom navigation | Home | Navigate `/home` | Preserve session and selected state |
| Bottom navigation | Circle | Navigate `/circle` | Load owned circles, show retry |
| Bottom navigation | Reflections | Navigate `/reflections` | Load private reflections |
| Bottom navigation | Learn | Navigate `/learn` | Load approved content |
| Bottom navigation | Du’a Wall | Navigate `/dua-wall` | Load moderated feed |
| Bottom navigation | Profile | Navigate `/profile` | Load profile and access state |
| App header | Menu | Open sidebar | Trap focus, restore focus on close |
| App header | Back | Browser history back | Safe fallback to Home |
| App header | Brand | Navigate Home | No data mutation |
| Sidebar | Backdrop or close | Close sidebar | Restore prior focus |
| Sidebar | Navigation item | Navigate route | Close before navigation |
| Sidebar | Ask Amina | Create or open chat | Auth required |
| Sidebar | Settings or account | Navigate Profile | Load fresh state |
| Sidebar | Sign out | `session.sign_out` | Supabase sign out, RevenueCat reset, local sensitive state clear |
| Theme toggle | Toggle theme | `preference.theme.change` | Persist locally, no sensitive analytics |

## Marketing and legal routes

### `/`

| Control | Result | Contract |
|---|---|---|
| About | Scroll to About | Focus target after scroll |
| How It Works | Scroll to section | Focus target after scroll |
| Access | Scroll to Access | Focus target after scroll |
| Get started | Navigate Welcome | Preserve referral parameters |
| Sign in | Navigate Auth | Preserve intended redirect |
| Privacy | Navigate Privacy | Public and available without auth |
| Terms | Navigate Terms | Public and available without auth |

### `/privacy`

Read only. Must always match actual providers, retention, analytics, memory, deletion, and user generated content behavior.

### `/terms`

Read only. BLOCKED until the age floor agrees with the 13 plus gate.

### `/community-standards`

Read only. Must state moderation, report, block, enforcement, appeal, and response expectations.

## Welcome and authentication

### `/welcome`

| Control | Command or result | Required hook |
|---|---|---|
| Sign in | Navigate Auth | Preserve redirect |
| Slide dot | Select onboarding slide | `welcome.slide_viewed` neutral event |
| Continue | Advance slide | Last slide routes Signup |
| Skip or existing member | Navigate Auth | No profile mutation |

### `/auth`

| Control | Command or result | Required hook |
|---|---|---|
| Sign in | Open SignInForm in signin mode | Focus email |
| Create account | Open SignInForm in signup mode | Focus email |
| Legal links | Navigate legal route | Public route |

### `SignInForm`

| Control | Command | Data and downstream |
|---|---|---|
| Email change | Local input | Validate format without analytics |
| Password change | Local input | Never log |
| Submit signup | `identity.signup` | Supabase user, profile bootstrap, confirmation state |
| Submit signin | `identity.signin` | Session, RevenueCat identity, intended redirect |
| Forgot password | `identity.password_reset.request` | Rate limit, generic success response |
| Resend confirmation | `identity.confirmation.resend` | Rate limit and cooldown |
| Switch mode | Local state | Clear sensitive errors |
| Close | Dismiss modal | Restore focus |

Required recovery:

1. Invalid credentials.
2. Existing account.
3. Unconfirmed email.
4. Rate limit.
5. Network failure.
6. Expired redirect.

### `/auth/reset-password`

| Control | Command | Required result |
|---|---|---|
| Password | Local secret input | Strength guidance |
| Confirm password | Local secret input | Exact match validation |
| Submit | `identity.password_reset.complete` | Update password, revoke old sensitive sessions, sign out, route Auth |

### Recovery hash router

Detect password recovery fragments and route to the reset page without exposing tokens to logs or analytics.

## Age gate and onboarding

### `/age-gate`

| Control | Command | Data and event |
|---|---|---|
| Birth year | Local eligibility calculation | Never persist full birth date |
| Accept legal documents | Local consent | Version identifiers required |
| Continue | `identity.age_attest` | Write immutable consent receipt and route Intent |
| Terms, Privacy, Standards | Navigate public documents | Return state preserved |

Underage result must block account use and avoid dark patterns.

### `/onboarding/intent`

| Control | Result |
|---|---|
| Back | Prior onboarding step |
| Intent option | Set one stated intent |
| Continue | Store draft and route Tone |

### `/onboarding/tone`

| Control | Result |
|---|---|
| Back | Intent |
| Tone option | Set one companion tone |
| Continue | Store draft and route Preferences |
| Skip | Route Preferences with documented default |

### `/onboarding/preferences`

| Control | Command or result |
|---|---|
| Back | Tone |
| Frequency | Set stated preference |
| Topic | Toggle stated topic |
| Preferred address | Set user supplied name |
| Reminder toggle | Set reminder preference only |
| Continue | `onboarding.complete` atomic profile update and receipt |

Reminder preference cannot imply notification delivery until permission and scheduling succeed.

### `/onboarding/complete`

| Control | Result | Gap |
|---|---|---|
| Feature row | Navigate feature | Must use real available routes |
| Save reflection icon | UNKNOWN | Current visible button has no registered action |
| Enter Amina | Navigate Home | Emit onboarding completed once |

## Home

### `/home`

| Control | Command or result | Downstream |
|---|---|---|
| Quick chip | Start chat with selected prompt | Conversation created server side |
| Message input | Local draft | Never analytics |
| Send or Enter | `conversation.message.send` | Stream, persist both rows, retry state |
| More options | GAP | Remove or define menu |
| Streak counter | Read practice state | Retry without blocking Home |
| Open Circle | Navigate Circle | Load current circles |
| Feed item | Navigate source | Authorization rechecked |
| Say Ameen | `dua.ameen.toggle` | Optimistic state, idempotent server result |
| Safety actions | Report or block | Moderation and user projection |
| View all reflections | Navigate Reflections | No mutation |
| Daily reflection card | Start sourced reflection chat | Pass approved source identifiers |
| Thread from before | Fetch eligible memory | GET must not consume cooldown |
| Reflect on this | `memory.resurface.reflect` | Acknowledge display, seed chat |
| Let it rest | `memory.rest` | Retire and remove card |

Required page hooks:

1. Authenticated Home viewed.
2. Network online or offline.
3. Last good feed availability.
4. Memory eligible.
5. Notification permission state.
6. App foreground refresh.

## Chat

### `/chat`

Redirect to a real conversation or Auth with return path.

### `/chat/[id]`

| Control | Command or result | Contract |
|---|---|---|
| Back | Home | Preserve conversation |
| History | Navigate `/chat/history` | No content in analytics |
| More options | GAP | Remove or define rename, archive, delete |
| Keep this insight | Open InsightSheet | Use selected assistant text |
| Suggested reply chip | Send chat message | Same command as composer |
| Composer | Local private draft | Never telemetry |
| Send | `conversation.message.send` | Idempotent message identifier |
| Try again | `conversation.message.retry` | Do not duplicate user row |
| Mosque location request | Native geolocation permission | Contextual request and denial recovery |
| Mosque select | Select mosque | No private location analytics |
| Directions | Open Maps URL | Confirm external handoff |
| Phone | Open telephone URL | Device capability fallback |
| Mosque retry | Retry search | Bounded retry |
| Share location | Repeat permission request only when allowed | Settings recovery |
| Skip location | Continue without location | No penalty |

### `InsightSheet`

| Control | Command | Atomic result |
|---|---|---|
| Editable insight | Local selected text | Limit 600 characters |
| Editable title | Local title | Limit 120 characters |
| Remember toggle | Explicit memory consent | Default off |
| Save privately | `insight.save` | Reflection, optional memory, consent receipt, event in one transaction |
| Not now or backdrop | Dismiss | No writes |

### `/chat/history`

| Control | Command or result |
|---|---|
| Back | Prior route |
| Search | Debounced private search |
| Today, This week, Archived | Local or server filter |
| Conversation row | Open conversation |
| Archive or restore | `conversation.archive.set` |

Required additions:

1. Rename.
2. Delete confirmation.
3. Provenance handling for saved insights and memory.

## Reflections

### `/reflections`

| Control | Command or result | Contract |
|---|---|---|
| New or Close | Toggle creation form | Preserve draft intentionally |
| Prompt | Insert prompt into empty draft | Never overwrite user text |
| Title | Local private draft | No telemetry |
| Reflection body | Local private draft | No telemetry |
| Mood | User selected metadata | Never infer |
| Theme | User selected metadata | Never infer |
| Save reflection | `reflection.create` | Atomic reflection and practice update |
| Search | Private local or server search | No query logging |
| All, Week, Month, Favorites, Themes | Filter | Empty state per filter |
| Review mode | Enter selection mode | No automatic content access |
| Select reflection | Explicit review consent | Selection only |
| Create review | `reflection.review.create` | Summarize only selected entries |
| Export | `reflection.export.request` | Secure expiring artifact |
| Favorite | `reflection.favorite.set` | Optimistic with rollback |
| More options | Open Edit or Delete menu | Touch and keyboard accessible |
| Edit | `reflection.update` | Ownership enforced |
| Delete | `reflection.delete` | Confirmation and review invalidation |
| Retry | Reload reflections | Preserve local draft |

### Reflection edit modal

Close, title edit, body edit, cancel, and save. Save requires ownership, validation, error state, and focus return.

### Reflection delete dialog

Cancel and confirm. Confirm is idempotent and updates every active projection.

## Learn, Guidance, and Support

### `/learn`

| Control | Result | Required governance |
|---|---|---|
| Category | Filter static or published content | Approved content only |
| Resource row | Expand or collapse | Reading progress optional |

Every item needs source, reviewer, approval, revision, and correction status before publication.

### `/guidance`

| Control | Command or result |
|---|---|
| Search | `guidance.search` |
| Clear | Reset search |
| Category | Filter |
| Featured item | Open detail |
| Article | Open detail |
| Question | Open detail |

Search refusal for ruling requests must be measurable without storing the question text.

### `/guidance/[id]`

Back and read only content. Source attribution, scripture, translation, review date, and withdrawal status are mandatory.

### `/support`

| Control | Result |
|---|---|
| Crisis call | Native telephone handoff |
| Crisis text | Native message handoff |
| External care directory | External browser handoff |
| Circle support | Navigate Circle |
| Wellness accordion | Expand or collapse |

Crisis actions receive no marketing analytics.

## Du’a Wall

### `/dua-wall`

| Control | Command | Downstream |
|---|---|---|
| Du’a body | Local private draft | Max 1000 characters |
| Share | `dua.publish` | Prescreen, publish or moderation queue |
| Retry | Reload feed | Preserve draft |
| Make Du’a | `dua.ameen.toggle` | Idempotent unique user and Du’a pair |
| Mark fulfilled | `dua.fulfilled.set` | Owner only and optional gratitude flow |
| Safety actions | Report or block | Moderation escalation |

Required states:

1. Empty.
2. Loading.
3. Offline.
4. Moderation pending.
5. Rejected with appeal guidance.
6. Fulfilled.

## Circle

### `/circle`

| Control | Result |
|---|---|
| Browse | Navigate Browse |
| Create | Navigate Create |
| Join | Navigate Join |
| Circle card | Open owned circle |

### `/circle/browse`

| Control | Command or result |
|---|---|
| Back | Circle |
| Search | Debounced browse search |
| Topic | Filter |
| Join | `circle.join.request` |
| Create | Navigate Create |

### `/circle/create`

| Control | Command or result |
|---|---|
| Back | Prior step or route |
| Name | Local draft |
| Next | Validate name |
| Intention | Local draft |
| Next | Validate intention |
| Topic | Select one topic |
| Create | `circle.create` |
| Copy code | Native clipboard |
| Open circle | Navigate created circle |

Creation must atomically create group, creator membership, invite code, and welcome state.

### `/circle/join`

| Control | Command or result |
|---|---|
| Back | Prior route |
| Code | Normalize invite code |
| Preview | `circle.invite.preview` |
| Anonymous mode | Set privacy mode |
| Named mode | Require display handle |
| Join | `circle.join` or `circle.join.request` |

### `/circle/[id]`

| Control | Command or result |
|---|---|
| Back or invalid recovery | Circle list |
| Settings | Settings route |
| Members | Members route |
| Invite | Invite route or modal |
| Posts | Posts route |
| Chat | Circle chat |
| New post text | Local draft |
| Media picker | Native photo or audio workflow |
| Send post | `circle.post.publish` |
| Reaction | `circle.reaction.toggle` |
| Comment | Open thread |
| Share | Privacy safe share artifact |
| Post menu | Edit or delete owner post |
| Safety actions | Report or block |
| Retry | Reload circle |

### `/circle/[id]/posts`

Load, retry, compose, and create post. Must share the same moderation and idempotency command as Circle detail.

### `/circle/[id]/posts/[postId]`

| Control | Command or result |
|---|---|
| Back | Prior route |
| Load more | Cursor pagination |
| Reply | Set reply target |
| Cancel reply | Clear reply target |
| Comment input | Local draft |
| Submit | `circle.comment.publish` |
| Reply button | Focus composer |
| Delete comment | `circle.comment.delete` |
| Safety actions | Report or block |

### `/circle/[id]/chat`

| Control | Command or result |
|---|---|
| Retry | Reload messages |
| Text input | Local draft |
| Enter or Send | `circle.message.publish` |
| Photo | Native camera or library permission |
| Audio | Native microphone permission |
| Remove media | Clear local attachment |
| Upload and send | Moderate, upload, publish atomically from user perspective |

### `/circle/[id]/invite`

Back, copy invite code, native share. Share payload contains no private circle content.

### `/circle/[id]/members`

Search members and remove member. Removal requires admin authorization, creator protection, confirmation, and notification.

### `/circle/[id]/settings`

| Control | Command |
|---|---|
| Back | Discard warning when dirty |
| Name, intention, topic, capacity | Local draft |
| Copy invite | Clipboard |
| Regenerate code | `circle.invite.regenerate` |
| Save | `circle.settings.update` |
| Delete circle | `circle.delete` after confirmation |
| Retry | Reload |
| Cancel | Return to form |

### Circle reusable components

| Component | Controls |
|---|---|
| CircleCard | Join and open |
| CircleList | Action, retry, open circle |
| CreateCircleForm | Dismiss error, fields, privacy toggle, cancel, submit |
| JoinCircleModal | Retry, close, join |
| InviteMembersModal | Search, select, deselect, invite, retry, close |
| FaithReactions | Toggle each supported reaction |
| CircleMediaPicker | Choose photo, record, stop, remove, send |
| ShareCard | Native share or clipboard fallback |
| SafetyActions | Open, close, choose reason, report content, report user, block |

## Profile, memory, and account

### `/profile`

| Control | Command or result |
|---|---|
| Retry | Reload profile |
| Preferred name | Local draft |
| Save name | `profile.name.update` |
| Reminder toggle | `preference.reminder.set` then schedule or cancel native reminder |
| Remember chats toggle | `memory.consent.set` with receipt |
| Forget everything | `memory.forget_all` |
| Delete one memory | `memory.delete` |
| Community standards | Navigate |
| Privacy | Navigate |
| Terms | Navigate |
| Deletion acknowledgment | Local confirmation |
| Request deletion | `account.delete.request` |
| Sign out | `session.sign_out` |

### MemoryList

Load active memories and delete one memory. Current fire and forget deletion requires visible failure recovery and optimistic rollback.

## Moderation

### `/moderation`

Restricted to verified moderator role.

| Control | Command |
|---|---|
| Refresh | `moderation.queue.read` |
| Restore | `moderation.case.restore` |
| Remove | `moderation.case.remove` |

Every action requires reviewer identifier, timestamp, reason, target version, audit record, and notification where appropriate.

## Premium

### PaywallModal

| Control | Command | Required lifecycle |
|---|---|---|
| Close | Dismiss | No entitlement change |
| Package | Select StoreKit package | Current Apple data only |
| Continue | `subscription.purchase.start` | Native RevenueCat purchase |
| Restore | `subscription.restore` | Reconcile RevenueCat and Supabase |

Webhook events:

1. Initial purchase.
2. Renewal.
3. Product change.
4. Uncancellation.
5. Cancellation with access through paid period.
6. Billing issue with grace state.
7. Expiration.
8. Refund.
9. Transfer or alias reconciliation.

Every webhook stores the provider event identifier before processing.

## Native permissions and external handoffs

| Capability | Trigger | Required states |
|---|---|---|
| Location | Mosque search | Ask in context, denied, restricted, settings recovery |
| Camera and photo library | Circle media | Ask in context, denied, limited library, retry |
| Microphone | Circle audio | Ask in context, denied, interruption, cleanup |
| Notifications | Reminder enable | Ask after value explanation, denied, settings recovery |
| Clipboard | Invite copy | Success feedback and unsupported fallback |
| Native share | Invite or share card | Cancel is neutral, failure has clipboard fallback |
| Telephone | Mosque or crisis call | Unsupported device fallback |
| SMS | Crisis text | Unsupported device fallback |
| Maps | Mosque directions | External handoff confirmation where needed |

## Scheduled triggers

| Schedule | Command |
|---|---|
| Daily local time | Reflection reminder eligibility |
| Every Home feed interval | Rebuild anonymized feed snapshot |
| Hourly | Moderation response target enforcement |
| Daily | Memory resurfacing eligibility projection |
| Daily | RevenueCat entitlement reconciliation |
| Daily | Account deletion job reconciliation |
| Daily | Guidance approval and withdrawal reconciliation |
| Weekly | Eligible reflection review offer |
| Daily | Dead letter alert |
| Daily | Stale notification token cleanup |

## Webhooks

| Provider | Required processing |
|---|---|
| RevenueCat | Verify secret, store event, process idempotently, reconcile entitlement |
| Stripe web | Verify signature, store event, isolate web subscription from iOS purchase path |
| Supabase Auth | Bootstrap profile and record identity lifecycle |
| Apple notifications where used | Handle delivery feedback and token changes |

## Data integrity triggers

Database triggers are permitted for:

1. Updated timestamps.
2. Ownership invariant enforcement.
3. Unique membership and reaction constraints.
4. Capacity protection.
5. Practice state projection.
6. Append only receipt protection.

Database triggers must not send notifications, call providers, publish content, or own cross feature business workflows.

## Operational hooks

Alert on:

1. Chat stream or persistence failures.
2. OpenAI latency and error rate.
3. Missing assistant message after accepted user message.
4. Home snapshot staleness.
5. Moderation queue age.
6. Failed or delayed account deletion.
7. RevenueCat entitlement drift.
8. Notification delivery failure.
9. Guidance published without approval.
10. Event consumer retries or dead letters.
11. Storage upload moderation failures.
12. RLS or authorization denials above baseline.
13. Crash and blank screen rate.
14. TestFlight build regression.

## Known interaction gaps

1. Home chat More options has no action.
2. Chat More options has no action.
3. Onboarding completion Save reflection has no action.
4. Reminder preference lacks proven native delivery.
5. Memory resurfacing GET currently mutates cooldown state before render acknowledgment.
6. Insight save requires one atomic transaction.
7. MemoryList delete needs visible failure recovery.
8. RevenueCat cancellation, billing issue, and alias handling need correction.
9. Account deletion completion worker is not proven.
10. Conversation rename and delete are incomplete.
11. Export is incomplete outside the current reflection export path.
12. Legal age language is inconsistent.
13. Compromised password protection remains off.
14. Generated design images are not implementation evidence.

## Definition of done for any control

One control is done only when:

1. Its registry row exists.
2. Its command schema is versioned.
3. Authentication and ownership tests pass.
4. The mutation and event are atomic.
5. Duplicate delivery is harmless.
6. Loading, success, empty, error, retry, and offline states are implemented where applicable.
7. Accessibility passes.
8. Private content is absent from analytics and general logs.
9. A real simulator or device capture proves the visible result.
10. The receipt links code, test, database, and visual evidence.

## Enforcement

Pull requests that add or change an interactive control must update this registry. CI should fail when a new button, link, form submission, native permission request, webhook event, or scheduled job is introduced without a registered interaction identifier.
