# Footprint LinkedIn Setup Checklist

**Blocker 7**: Select an approved LinkedIn messaging partner and complete platform application authority before any automated public action.

---

## Pre-Setup Requirements (MUST COMPLETE FIRST)

- [ ] **Decision: Partner Selection**  
  Choose one of: (a) RedLantern Studios org account, (b) Rory's personal account, (c) Keymon as partner, or (d) external approved partner  
  **Owner**: Ro  
  **Evidence to collect**: Written decision stating which partner and why

- [ ] **Decision: Posting Rights**  
  Confirm who may post: Rory only, Keymon only, both, or a third partner  
  **Owner**: Ro + Keymon (separate confirmation required)  
  **Evidence to collect**: Written agreement from each person

---

## LinkedIn Business Account Setup

If using organization account:
- [ ] Open LinkedIn Business Page for RedLantern Studios
- [ ] Verify ownership and branding (logo, description, contact)
- [ ] Add team members with appropriate roles (Admin, Editor, Analyst, Viewer)
- [ ] Enable Content Calendar and Scheduling
- [ ] **Collect**: Screenshot of complete setup with members listed

---

## LinkedIn Developer Application

If building integrations or using API:
- [ ] Navigate to LinkedIn Developer Portal (developers.linkedin.com)
- [ ] Create a new "App"
- [ ] Request required permissions:
  - `w_member_social` (write to member social actions)
  - `r_liteprofile` (read basic profile)
  - `r_emailaddress` (read email)
- [ ] Set callback/redirect URLs for Footprint auth flow
- [ ] **Do NOT complete** "Request access to Sign In with LinkedIn" unless specifically approved
- [ ] **Collect**: App credentials (Client ID, Client Secret — keep secret)

---

## OAuth and Authentication

- [ ] Set up Footprint→LinkedIn OAuth redirect at approved redirect URL
- [ ] Footprint must store LinkedIn tokens in approved secret vault (not in code)
- [ ] Test OAuth flow:
  1. Start from Footprint dashboard
  2. Click "Connect LinkedIn"
  3. Approve permissions
  4. Verify token is stored and valid
  5. Test token refresh
- [ ] **Collect**: Screenshots of successful auth flow, token validation, and expiration behavior

---

## Permission Scopes (LOCKED)

**Allowed scopes for Footprint:**
- `w_member_social` — write posts (required for scheduling/publishing)
- `r_liteprofile` — read profile info (required for attribution)
- `r_emailaddress` — read email (for verification only)

**Prohibited scopes:**
- `w_organization_social` (org-level posting without explicit further approval)
- `r_organization_admin_approved_* (admin panel access)
- Any scope involving messaging on behalf of users

---

## Posting and Messaging Rules (LOCKED)

### Publishing (Posts, Articles, Comments)
- [ ] **MUST** collect Rory approval before publishing any external post
- [ ] **MUST** collect Keymon approval before publishing any post about Keymon
- [ ] **MUST** record approval timestamp and content in audit log
- [ ] Scheduled posts must be reviewed and approved before scheduling (not after)
- [ ] **NEVER** publish test, draft, or experimental posts to public accounts

### Messaging (Direct Messages)
- [ ] Footprint **CANNOT** send messages on behalf of Rory or Keymon without explicit message-level approval
- [ ] If messaging is enabled, it must be behind a "Send for Review" button only
- [ ] Recipient must be pre-approved
- [ ] Message content must be pre-approved
- [ ] No automated, bulk, or templated messages without explicit further approval

### Comments and Interactions
- [ ] Commenting on others' posts is prohibited unless explicitly approved per comment
- [ ] Liking, sharing, or engaging with others' content is prohibited (no automated social proof)
- [ ] Retweeting or sharing others' posts must be explicitly approved per instance

---

## Testing Gate (Must Complete Before Go-Live)

- [ ] **Test 1: Draft Post Flow**
  - Create draft in Footprint → Approve in dashboard → Schedule/publish → Verify on LinkedIn
  - **Pass condition**: Post appears exactly as drafted with correct author attribution
  
- [ ] **Test 2: Multi-Author Approval**
  - Create post attributed to Keymon → Request Keymon approval → Publish → Verify attribution
  - **Pass condition**: Post shows correct author, approval timestamp is logged

- [ ] **Test 3: Token Expiration and Refresh**
  - Let token expire (if testable) → Trigger refresh → Verify posting still works
  - **Pass condition**: No failed posts due to expired tokens

- [ ] **Test 4: Error Handling**
  - Attempt to post with invalid token → Verify error message is clear
  - Attempt to post over LinkedIn rate limit → Verify graceful degradation
  - **Pass condition**: Errors are logged with timestamps and sent to admin alert

- [ ] **Test 5: Audit Trail**
  - Publish a test post → Verify audit log contains: timestamp, author, content, approval path, LinkedIn response
  - **Pass condition**: Full trail is reconstructible

---

## Post-Launch Monitoring

Once Footprint goes live with LinkedIn:
- [ ] Monitor LinkedIn API quota usage (daily/monthly limits vary)
- [ ] Alert if quota approaches 80% of limit
- [ ] Monitor for failed posts (rate limits, token errors, validation failures)
- [ ] Weekly review of published content against authority documents
- [ ] Immediate escalation if any unauthorized or unexpected posts appear

---

## Compliance Checklist

- [ ] Footprint has NOT published any content before this checklist is complete and approved
- [ ] Footprint has NOT solicited or sent unsolicited LinkedIn messages
- [ ] Footprint has NOT used Rory or Keymon's identity in promotional or misleading contexts
- [ ] All partnerships are documented in writing
- [ ] All public claims about Footprint or RedLantern Studios are verified before posting
- [ ] LinkedIn Terms of Service are reviewed and understood (especially against automated actions)

---

## Owner and Timeline

**Checklist Owner**: Ro  
**Keymon Involvement**: Confirm messaging rules and identity authority before launch  
**Expected Completion**: Before Footprint goes live  
**Review Cadence**: Every 90 days post-launch

---

## Sign-Off

When complete, Ro and Keymon must sign off:

**Ro approval**: ________________________     Date: ______________

**Keymon approval**: ________________________     Date: ______________

After sign-off, Footprint may proceed with LinkedIn integration as part of the implementation phase.
