# MISSION BRIEF
**ID:** MISSION-2026-06-10-001
**Issued by:** Claude (Specialist — Session 2026-06-10)
**Routed to:** ROBBY → PM + ARCHITECT
**Product:** Amina
**Sprint alignment:** QuietBuild OS dogfood — core loop proof
**Priority:** HIGH
**Date:** 2026-06-10
**Status:** OPEN — awaiting ROBBY routing

---

## OBJECTIVE

Design and integrate the Amina Safety + Infrastructure stack.

Five components. All are required before Circle and DM go to any user.
One is a strategic moat (Halal Compliance Layer) — not a commodity service.

This brief is implementation-ready. ARCHITECT owns ADRs. PM owns acceptance criteria. Engineering pods own build.

---

## CONTEXT — WHY THIS MATTERS NOW

Amina is a safe space for Muslim women.
Circle and DMs are the retention layer.
Without content moderation (text + image) and push notifications, Circle is a liability before it's a feature.

**What is already done (VERIFIED — git f7983af, 2026-06-10):**
- Image moderation: `lib/sightengine.ts` + `app/api/moderate-image/route.ts` COMMITTED
- `moderation_queue` table: APPLIED to Supabase `endovljmaudnxdzdapmf`
- Sightengine API keys: CONFIGURED in `.env.local`
- Sightengine models: `nudity-2.0`, `weapon`, `offensive`, `gore`
- Fail-open policy: DESIGNED (Sightengine down → flagged, never blocks upload)

**What is NOT done (VERIFIED missing):**
- Text moderation: ZERO — Circle messages, DMs, posts have no text checks
- Push notifications: ZERO — no notification layer exists
- Transactional email: ZERO — join request approvals, welcome email unbuilt
- Rate limiting: ZERO — `/api/chat` is live and fully exposed
- Halal compliance layer: ZERO — does not exist anywhere in stack

---

## COMPONENT 1 — TEXT MODERATION
**Service:** OpenAI Moderation API
**Cost:** Free
**Model:** `omni-moderation-latest`
**Latency:** <100ms
**Risk level:** HIGH — this is the blocking gap before Circle goes live

### Architecture

**New files:**
- `lib/moderation/text.ts` — server-side helper (mirrors sightengine.ts exactly)
- `app/api/moderate-text/route.ts` — authenticated server proxy

**New DB migration:** `005_text_moderation_queue.sql`
```sql
CREATE TABLE public.text_moderation_queue (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content      text NOT NULL,
  surface      text NOT NULL CHECK (surface IN ('circle_message', 'dm_message', 'circle_post', 'circle_comment')),
  verdict      text NOT NULL CHECK (verdict IN ('flagged', 'rejected')),
  categories   jsonb NOT NULL DEFAULT '{}',
  reviewed     boolean NOT NULL DEFAULT false,
  reviewed_at  timestamptz,
  created_at   timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.text_moderation_queue ENABLE ROW LEVEL SECURITY;
CREATE INDEX idx_text_mod_unreviewed ON public.text_moderation_queue (reviewed, created_at DESC) WHERE reviewed = false;
```

**`lib/moderation/text.ts` spec:**
```ts
// ASSUMPTION: OPENAI_API_KEY already exists or needs to be added to .env.local
// Categories to check: harassment, hate, illicit, self-harm, sexual, sexual/minors, violence
// Thresholds: score >= 0.8 → rejected | score >= 0.5 → flagged
// Fail-open: API down → flagged/error, content proceeds
export async function moderateText(content: string): Promise<TextModerationResult>
// Returns: { verdict: 'approved'|'flagged'|'rejected', categories: Record<string, number> }
```

**Integration points (ALL required before Circle launch):**
| Surface | When to check | Integration method |
|---|---|---|
| `circle_messages` | Before insert to DB | In `/circle/[id]/chat` sendMessage() — server action |
| `dm_messages` | Before insert to DB | In `/dm/[id]` sendMessage() — server action |
| `circle_posts` | Before insert | In `/api/circle/post` route |
| `circle_comments` | Before insert | In `/api/circle/comment` route |

**Pattern:**
```ts
// Call before every message insert — server-side only
const result = await fetch('/api/moderate-text', {
  method: 'POST',
  body: JSON.stringify({ content: messageText, surface: 'circle_message' })
})
const { verdict } = await result.json()
if (verdict === 'rejected') return { error: 'Message cannot be sent.' }
// 'approved' or 'flagged' → proceed with insert
```

**Env var required:** `OPENAI_API_KEY` → `.env.local`

---

## COMPONENT 2 — PUSH NOTIFICATIONS
**Service:** OneSignal
**Cost:** Free tier (10,000 subscribers)
**Decision required first:** PWA vs React Native

### Architectural decision (ARCHITECT owns this ADR)

**Option A: PWA + Web Push**
- Works: iOS 16.4+, all Android, all desktop
- Service worker: `public/OneSignalSDKWorker.js`
- Permission prompt: browser-native
- Migration to React Native: OneSignal SDK exists for both — low migration cost
- Build time: ~1 sprint

**Option B: React Native (Expo)**
- Requires full rebuild of UI in React Native
- Better native feel, faster push delivery
- Build time: multiple sprints

**Recommendation (ASSUMPTION):** PWA first. Amina is Next.js today. React Native is a separate product decision that should not gate Circle launch. PWA push on iOS 16.4+ covers the target demographic.

**ARCHITECT must issue ADR before implementation begins.**

### OneSignal setup (PWA path)

**New env vars:**
- `NEXT_PUBLIC_ONESIGNAL_APP_ID` — public, safe in frontend
- `ONESIGNAL_REST_API_KEY` — server only, never expose to client

**New files:**
- `lib/notifications/onesignal.ts` — server-side send helper
- `public/OneSignalSDKWorker.js` — service worker (OneSignal provides this)
- `app/(app)/components/NotificationPermissionPrompt.tsx` — permission request UI

**Notification triggers to implement:**
| Event | Recipient | Template |
|---|---|---|
| New circle message | All active circle members except sender | "[Name] in [Circle]: [preview]" |
| Join request approved | Requesting user | "You're in! [Circle] approved your request." |
| New circle join request | Circle admin | "[Name] wants to join [Circle]" |
| New DM received | Recipient | "New message from [Name]" |

**Supabase → OneSignal bridge pattern:**
```
DB insert → Supabase Edge Function → POST to OneSignal API
```
NOT: client → OneSignal (never bypass server for notifications)

**OneSignal external user ID:** = Supabase `user_id` (link on auth)

---

## COMPONENT 3 — TRANSACTIONAL EMAIL
**Service:** Resend
**Cost:** Free tier (3,000 emails/month)
**Package:** `resend` (npm)

### Setup

**Env var:** `RESEND_API_KEY` → `.env.local`
**Sending domain:** `mail.aminaapp.com` (ASSUMPTION — needs DNS setup)
  → DNS records: SPF + DKIM + DMARC required before any email sends in production
  → For dev: use Resend's sandbox domain

**New files:**
- `lib/email/client.ts` — `new Resend(process.env.RESEND_API_KEY)`
- `lib/email/send.ts` — typed `sendEmail(template, to, data)` wrapper
- `lib/email/templates/join-request-received.tsx` — React Email component
- `lib/email/templates/join-request-approved.tsx` — React Email component
- `lib/email/templates/welcome.tsx` — React Email component

**New API route:** `app/api/email/send/route.ts`
- Auth required (server-side only, never callable from client directly)
- Called from: join request flow, auth webhook, scheduled digest

**React Email template standard:**
- Amina brand: `#F7F2EB` cream background, `#D6AAA3` dusty rose accents, `#2C2926` charcoal text
- Logo in header
- Footer: "You're receiving this because you're a member of Amina. Unsubscribe."

**Trigger map:**
| Trigger | Template | Called from |
|---|---|---|
| User signs up | welcome.tsx | Supabase auth webhook → Edge Function |
| Join request submitted | join-request-received.tsx | circle join request API |
| Join request approved | join-request-approved.tsx | circle admin approval action |
| Daily reflection opt-in | reflection-digest.tsx | n8n scheduled (07:00 local time) |

---

## COMPONENT 4 — RATE LIMITING
**Service:** Upstash Redis
**Package:** `@upstash/ratelimit @upstash/redis`
**Cost:** Free tier (10,000 commands/day)

### Setup

**Env vars:**
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`
Both available at console.upstash.com after creating a Redis database.

**New file:** `lib/rate-limit.ts`
```ts
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const redis = Redis.fromEnv()

export const chatLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(20, '1 m'),
  prefix: 'amina:chat',
})

export const moderationLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(100, '1 m'),
  prefix: 'amina:moderation',
})

export const emailLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, '1 h'),
  prefix: 'amina:email',
})
```

**Rate limits by endpoint:**
| Endpoint | Limit | Window | Key |
|---|---|---|---|
| `/api/chat` | 20 requests | 1 minute | user_id |
| `/api/moderate-text` | 100 requests | 1 minute | user_id |
| `/api/moderate-image` | 50 requests | 1 minute | user_id |
| `/api/email/send` | 5 requests | 1 hour | user_id |

**Response on limit exceeded:**
```ts
return NextResponse.json(
  { error: 'Rate limit exceeded. Please try again shortly.' },
  { status: 429, headers: { 'Retry-After': String(reset) } }
)
```

**Add to `/api/chat` first** — this is the highest-cost endpoint and currently fully exposed.

---

## COMPONENT 5 — HALAL COMPLIANCE LAYER
**Type:** Internal capability — not a third-party service
**Strategic classification:** MOAT — differentiated, not replicable by forking a generic app
**Model:** Groq (already in stack) — fast inference, no additional cost tier needed

### Why this is different from OpenAI Moderation

OpenAI Moderation API catches: harassment, hate speech, sexual content, violence.
It does NOT catch:
- Discussion promoting riba (interest/usury) — relevant if Circle evolves to include finance discussions
- Relationship advice crossing mahram boundaries
- Sectarian content creating fitna between Muslim communities
- Content disrespectful to Islamic scholarship in the context of a faith app
- Imagery/descriptions inappropriate to a Muslim women's safe space context

This is a compliance gap that is invisible to generic moderation — but material to Amina's trust guarantee.

### Architecture

**New file:** `lib/moderation/halal.ts`

**System prompt (locked — owned by PM, reviewed by TRUTH):**
```
You are a halal content compliance assistant for Amina — a faith-based community app for Muslim women.

Your job is to evaluate content that has already passed standard content moderation (not harmful by general standards) but may violate Islamic community standards specific to this platform.

Evaluate the following content for these violations ONLY:

1. RIBA — promotes, normalizes, or gives advice about interest-bearing financial products
2. MAHRAM_BOUNDARY — relationship advice inappropriate between non-mahram individuals
3. FITNA — content creating division or conflict between Muslim communities or sects
4. SCHOLARLY_DISRESPECT — dismissal or mockery of legitimate Islamic scholarship
5. SAFE_SPACE_VIOLATION — content that makes Muslim women feel unsafe or unwelcome in this specific context

Respond with JSON only:
{
  "halal_compliant": true | false,
  "violations": [],
  "confidence": 0.0-1.0,
  "reasoning": "brief explanation if not compliant"
}

If uncertain: return halal_compliant: true with confidence < 0.5. Do not flag what is merely culturally unfamiliar.
```

**Integration — when halal check runs:**
- NOT on every message (latency cost is too high for real-time chat)
- YES on: circle posts, circle comments (async, before publish)
- YES on: content that OpenAI Moderation flagged but did not reject (the gray zone)
- FUTURE: async pass over circle_messages after delivery (retroactive flagging)

**Call chain:**
```
User submits content
→ OpenAI Moderation check (fast, free, real-time)
  → REJECTED: block immediately, no halal check needed
  → FLAGGED: run halal check (async or inline based on surface)
    → halal_compliant: false → add to moderation_queue with source='halal_layer'
    → halal_compliant: true → allow, queue row stays for review context
  → APPROVED: allow for real-time surfaces (chat/DM)
              run halal check async for post surfaces
```

**Env var needed:** `GROQ_API_KEY` (already in .env.local placeholder — not yet filled)

**Cost model:** Groq inference on Llama 3 8B is ~$0.05/1M tokens. A 200-word post check = ~300 tokens. At 10,000 posts/day = ~$0.15/day. Negligible.

---

## TASK DECOMPOSITION FOR ROBBY

**Route these as follows:**

### ARCHITECT
- ADR: PWA vs React Native decision (unblocks all push notification work)
- ADR: Text moderation integration pattern (inline vs async per surface)
- ADR: Halal layer system prompt ownership and update governance
- Review: Upstash rate limit configuration for Amina's usage profile

### PM
- Acceptance criteria for each component
- Prioritization: confirm order (text mod → rate limit → push → email → halal layer)
- Spec: notification copy for all 4 OneSignal triggers
- Spec: React Email templates (brand spec provided above)

### BACKEND
- `lib/moderation/text.ts` + `app/api/moderate-text/route.ts`
- `supabase/migrations/005_text_moderation_queue.sql`
- `lib/rate-limit.ts` + integration into `/api/chat` first
- `lib/notifications/onesignal.ts`
- `lib/email/client.ts` + `lib/email/send.ts`
- `lib/moderation/halal.ts`

### FRONTEND
- `NotificationPermissionPrompt.tsx` — permission request UI
- Wire `/api/moderate-text` into circle chat + DM send flows
- Show rejection message when verdict = 'rejected'

### SECURITY
- Review: OpenAI Moderation API key in .env.local (ensure not committed)
- Review: Upstash Redis credentials handling
- Review: OneSignal `ONESIGNAL_REST_API_KEY` server-only enforcement
- Review: Rate limit bypass attack surface

### TRUTH (bar raiser gate required before Circle launch)
- Verify text moderation is wired on ALL four surfaces before launch sign-off
- Verify halal layer system prompt is reviewed and locked (not drifting)
- Verify fail-open policy is tested: what happens when OpenAI API is down?
- Classification: Circle is PROTOTYPE until text moderation is live. Not PRODUCT-READY.

---

## REQUIRED ENV VARS (full list for this mission)

| Var | Component | Source | Status |
|---|---|---|---|
| `OPENAI_API_KEY` | Text moderation | platform.openai.com/api-keys | UNKNOWN — may already exist |
| `NEXT_PUBLIC_ONESIGNAL_APP_ID` | Push notifications | onesignal.com | NOT YET |
| `ONESIGNAL_REST_API_KEY` | Push notifications | onesignal.com | NOT YET |
| `RESEND_API_KEY` | Email | resend.com | NOT YET |
| `UPSTASH_REDIS_REST_URL` | Rate limiting | console.upstash.com | NOT YET |
| `UPSTASH_REDIS_REST_TOKEN` | Rate limiting | console.upstash.com | NOT YET |
| `GROQ_API_KEY` | Halal layer + chat | console.groq.com | FILL_IN (placeholder exists) |

---

## HANDOFF CONTRACT

| Field | Value |
|---|---|
| **Artifact** | MISSION-2026-06-10-001 Safety + Infrastructure Stack brief |
| **Artifact Version** | v1.0 |
| **Upstream Hash** | Claude session 2026-06-10, Amina git f7983af |
| **Proof** | This file at `/memory/missions/2026-06-10-amina-safety-infra-stack.md` |
| **Consumer** | ROBBY → PM (AC) + ARCHITECT (ADRs) + BACKEND (implementation) |
| **Acceptance Criteria** | All 5 components designed, ADRs issued, env vars confirmed, TRUTH gate passed before Circle launch |
| **Failure Route** | If ARCHITECT cannot issue ADR on PWA vs React Native within current sprint → escalate to Ro for decision |

---

## OPEN QUESTIONS FOR ROBBY TO RESOLVE

1. **PWA vs React Native** — this is a founder decision, not an agent decision. Ro must answer before push notification work begins.
2. **OPENAI_API_KEY** — does it already exist in any RLS environment? Check before creating a new one.
3. **Resend sending domain** — `mail.aminaapp.com` assumed. Confirm domain with Ro. DNS cannot be set without this.
4. **Halal layer system prompt governance** — who owns updates to the prompt? PM? TRUTH? Needs policy before it goes live.
5. **Rate limit thresholds** — 20 req/min for chat is conservative. Validate against expected usage pattern before locking.
