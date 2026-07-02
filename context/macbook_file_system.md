# MacBook File System Design
**Owner:** Red (Rory Semeah) — By Red, LLC → RedLantern Studios  
**Last updated:** 2026-04-13  
**Status:** Master reference — enforce on Day 1 cleanup

---

## SECTION 1 — ROOT MAC STRUCTURE

### Where the root lives
Everything business-related lives in `~/Documents`. NOT on the Desktop. NOT in iCloud Drive root. `~/Documents` is the anchor.

iCloud Drive syncs `~/Documents` by default on Mac — you want this ON for the business layer so it is backed up. But you control what is personal vs business by the folder structure, not by toggling iCloud off.

```
~/
├── Documents/
│   ├── ByRed-LLC/                   ← ALL business. Parent entity.
│   │   └── RedLanternStudios/       ← Core execution arm. Lives here.
│   └── Personal/                    ← Personal documents only.
│
├── Desktop/                         ← Temporary only. Cleared weekly.
├── Downloads/                       ← Inbox. Auto-sorted or manually triaged daily.
└── Archive/                         ← Dead projects, old versions, retired docs.
                                        Compressed annually. Never actively browsed.
```

**Rule:** If you cannot answer "where does this file live?" in 3 seconds, the system has failed. If the system has failed, it is because you put something in the wrong place — not because the system is wrong.

---

## SECTION 2 — BY RED, LLC STRUCTURE

```
~/Documents/ByRed-LLC/
│
├── RedLanternStudios/               ← See Section 3 (core execution arm)
│
├── Operations/
│   ├── Legal/
│   │   ├── Formation/               ← LLC formation docs, EIN, state filings
│   │   ├── Contracts/               ← Signed client contracts (PDFs only)
│   │   ├── NDAs/                    ← Executed NDAs
│   │   ├── IP/                      ← Trademark filings, IP assignments
│   │   └── Compliance/              ← Annual compliance, registered agent docs
│   │
│   ├── Finance/
│   │   ├── Banking/                 ← Account statements (monthly PDFs)
│   │   ├── Invoices/
│   │   │   ├── Sent/                ← Invoices issued to clients
│   │   │   └── Received/            ← Vendor invoices
│   │   ├── Tax/
│   │   │   ├── 2024/
│   │   │   └── 2025/
│   │   ├── Payroll/                 ← Gusto exports, pay stubs
│   │   └── Revenue/                 ← Monthly revenue summaries, Stripe exports
│   │
│   ├── Admin/
│   │   ├── Licenses/                ← Business licenses, registrations
│   │   ├── Insurance/               ← Policy docs
│   │   └── Templates/               ← Reusable: invoice template, SOW template
│   │
│   └── Strategy/
│       ├── InternalMemos/           ← Founder decisions, strategic notes
│       ├── CapTable/                ← Equity records (Red 50%, Ahmed 25%, Rasheed 25%)
│       └── Roadmaps/                ← Annual and quarterly business roadmaps
│
├── Revenue/                         ← Monetization tracking (separate from Finance)
│
├── Partnerships/
│   ├── Active/                      ← One folder per active partner/vendor
│   └── Closed/                      ← Ended relationships
│
├── CoFounders/
│   ├── Ahmed/                       ← Agreements, communications, work product
│   └── Rasheed/                     ← Same
│
├── Strategy/
│   ├── InternalMemos/               ← Founder decisions, strategic notes
│   ├── CapTable/                    ← Equity records (Red 50%, Ahmed 25%, Rasheed 25%)
│   └── Roadmaps/                    ← Annual and quarterly business roadmaps
│
└── _SYSTEM.md                       ← System definition file (see context/_SYSTEM.md)
```

---

## SECTION 3 — REDLANTERN STUDIOS STRUCTURE

```
~/Documents/ByRed-LLC/RedLanternStudios/
│
├── Projects/                        ← One folder per product/client
│   ├── HireWire/                    ← See Section 4 for per-project template
│   ├── QBos/
│   ├── SilentEngine/
│   ├── InSense/
│   ├── AuthenticHadith/
│   ├── ChapmanBot/
│   ├── _Clients/                    ← Client work (not internal products)
│   │   ├── ParadiseLandscaping/
│   │   ├── ArtGalleryPlatform/
│   │   └── _template/               ← Copy this for every new client
│   └── _template/                   ← Copy this for every new product
│
├── SharedSystems/                   ← Cross-product infrastructure
│   ├── AIPrompts/                   ← QBos prompt library, SilentEngine config
│   ├── Components/                  ← Shared React components, UI kits
│   ├── Automation/                  ← n8n workflows, Zapier templates
│   ├── APIs/                        ← API contracts, Postman collections, shared schemas
│   └── InternalTools/               ← Scripts, CLIs, build helpers
│
├── Design/
│   ├── BrandAssets/                 ← RedLantern logo variants (confirmed: flat geometric, white bg)
│   ├── DesignSystem/                ← Tokens, fonts (Barlow Condensed, DM Sans, JetBrains Mono)
│   ├── FigmaExports/                ← Exported frames, organized by product
│   └── UIKits/                      ← Shadcn customizations, component libraries
│
├── Documentation/
│   ├── Architecture/                ← System design docs
│   ├── ProductSpecs/                ← PRDs and feature specs per product
│   ├── Decisions/                   ← Decision log (mirrors Notion)
│   └── SessionNotes/                ← Handoffs, session summaries
│
└── _Studio/                         ← Studio-level (not product-level) ops
    ├── Hiring/                      ← Contractor agreements (Waleed, Suhaib)
    ├── Positioning/                 ← Studio pitch, About pages, bios
    └── Press/                       ← Media mentions, case studies
```

---

## SECTION 4 — PER PROJECT STRUCTURE

This is the exact template for every product and client project. Copy `_template` and rename.

```
Projects/HireWire/
│
├── app/                             ← Frontend source code mirror (or symlink to repo)
│   └── README.md                    ← Points to GitHub repo URL
│
├── backend/                         ← Backend logic, API routes, server configs
│   └── README.md                    ← Points to GitHub repo URL
│
├── ai/                              ← AI logic, prompt files, SilentEngine config for this product
│   ├── prompts/
│   ├── context/
│   └── models.md                    ← Which models used, why, cost notes
│
├── docs/                            ← All product documentation
│   ├── spec.md                      ← Master product spec (living document)
│   ├── prd/                         ← PRDs by feature
│   ├── architecture.md              ← System architecture
│   ├── decisions/                   ← Decision log entries
│   └── changelog.md                 ← Version history
│
├── assets/                          ← Static assets for this product
│   ├── images/
│   ├── icons/
│   └── fonts/                       ← If product-specific fonts exist
│
├── exports/                         ← Deliverables: PDFs, ZIP packs, design exports
│   ├── YYYY-MM-DD_feature-name/     ← Date-stamped export folders
│   └── client-deliverables/         ← For client projects: what was handed off
│
├── design/                          ← Figma exports, mockups, wireframes
│   ├── wireframes/
│   ├── mockups/
│   └── final/
│
└── archive/                         ← Retired drafts, old specs, superseded files
    └── YYYY-MM/                     ← Organized by month archived
```

**What goes where:**
- `/app` and `/backend` do NOT store code locally. They contain README files pointing to the GitHub repo. Code lives in GitHub. This folder exists for mental structure only.
- `/ai` is the exception — local copies of prompt files and context configs are fine here since they are text and tied to the product.
- `/exports` is the delivery layer. Every file you hand off to a client or teammate goes through here, dated.
- `/archive` is for anything that was once active but is now superseded. Never delete — archive.

---

## SECTION 5 — PERSONAL VS BUSINESS SEPARATION

### Must stay in iCloud (personal layer)
- Personal photos, personal health docs, family documents
- Personal finance (personal bank statements, personal tax docs)
- Apple device backups
- Personal notes (Apple Notes, unrelated to business)
- Personal subscriptions and account records

### Must stay in Documents/ByRed-LLC (business layer)
- All product source code references and documentation
- Client contracts and deliverables
- Business financial records
- API configs, prompt files, architecture docs
- RedLantern brand assets

### Must NEVER mix
| Business | Personal |
|---|---|
| Client contracts | Personal legal docs |
| Company bank statements | Personal bank statements |
| Product specs | Personal journal / notes |
| API keys and configs | Apple Keychain personal items |
| Business emails (exports) | Personal email exports |
| Employee/contractor agreements | Personal relationships |

**Enforcement rule:** If you are unsure whether a file is business or personal, it goes in business. You can always move it. You cannot always reconstruct it.

---

## SECTION 6 — DESKTOP + DOWNLOADS RULES

### Desktop
The Desktop is a **staging zone**, not storage.

Rules:
- Maximum 10 items on Desktop at any time
- Every item on Desktop must be actively in use right now
- Every Monday: clear Desktop. Nothing stays more than 7 days.
- If a file is waiting to be processed, it goes in `~/Downloads/_inbox/` — not Desktop
- Screenshots go to `~/Downloads/_screenshots/` via Screenshot settings (change in System Preferences → Screenshots)

### Downloads
Downloads is an **inbox**, not a filing cabinet.

Structure:
```
~/Downloads/
├── _inbox/          ← New downloads land here
├── _screenshots/    ← Screenshots auto-routed here
├── _installers/     ← .dmg and .pkg files (review quarterly, delete old)
└── _toprocess/      ← Files reviewed but not yet filed
```

Rules:
- File or delete every download within 48 hours of receiving it
- Anything still in Downloads after 7 days gets moved to `_toprocess` for batch review
- Monthly: audit `_installers`, delete anything for apps you no longer use
- No document should live permanently in Downloads

---

## SECTION 7 — NAMING CONVENTIONS

### Files

**Format:** `YYYY-MM-DD_description_version.ext`

Examples:
```
2026-04-13_hirewire-spec_v3.md
2026-04-13_client-contract_paradise-landscaping_FINAL.pdf
2026-04-01_by-red-operating-agreement_SIGNED.pdf
```

**Rules:**
- All lowercase, hyphens between words (no spaces, no underscores except for separating sections)
- Date first — enables natural chronological sort
- No `final_FINAL_v2_REAL` naming. One `FINAL`. After that, archive the old one and create a new dated version.
- Version suffix: `_v1`, `_v2`, `_v3` — not `_new` or `_updated`
- `FINAL` means signed, shipped, or delivered. Not "I think I'm done."

### Folders

**Format:** PascalCase for top-level product folders. `kebab-case` for sub-folders within projects.

Examples:
```
HireWire/            ← Product folder: PascalCase
├── docs/            ← Sub-folder: lowercase
├── ai/
└── exports/
    └── 2026-04-13_resume-templates/
```

### Exports and deliverables

**Format:** `YYYY-MM-DD_[product]_[deliverable-type]_[recipient-or-context]`

Examples:
```
2026-04-13_hirewire_resume-templates_v1.zip
2026-03-15_paradise-landscaping_lead-engine_client-delivery.zip
2026-04-10_by-red_operating-agreement_ahmed-rasheed.pdf
```

---

## SECTION 8 — FILE LIFECYCLE SYSTEM

Every file has a state. The state determines where it lives.

| State | Definition | Location |
|---|---|---|
| **Draft** | Being actively written, not shared | `/docs/` or `/ai/` in the project folder, with `_draft` suffix |
| **Active** | In use, being referenced, not finalized | Same folder, no suffix (just `_v1`, `_v2` etc.) |
| **Final** | Signed, shipped, or delivered. Done. | Same folder with `_FINAL` suffix |
| **Archived** | Superseded or retired but kept for record | Move to `/archive/YYYY-MM/` in the project |

**Lifecycle triggers:**
- Draft → Active: when you share it with anyone else
- Active → Final: when it is signed, shipped, or the decision is locked
- Final → Archived: when a newer Final version replaces it, or the project closes
- Any state → Deleted: NEVER. Archive instead. Deletion is only for clearly duplicated or empty files.

---

## SECTION 9 — AUTOMATION OPPORTUNITIES (MAC LEVEL)

### Hazel (most powerful — worth the $42 one-time)
If you install Hazel, set up these rules:

| Rule | Trigger | Action |
|---|---|---|
| Route screenshots | File added to Downloads, extension .png, name starts with "Screen Shot" | Move to `Downloads/_screenshots/` |
| Route installers | File added to Downloads, extension .dmg or .pkg | Move to `Downloads/_installers/` |
| Flag old downloads | File in Downloads, last opened > 7 days ago | Add color label (red = review needed) |
| Auto-archive exports | File in any `/exports/` folder, last modified > 90 days | Move to `archive/YYYY-MM/` |
| Clean Desktop | File on Desktop, last modified > 7 days | Move to `Downloads/_toprocess/` |

### Built-in Mac (no extra apps)
- **Smart Folders** (Finder → New Smart Folder): Create a smart folder called `_Unsorted` that finds all files in Documents modified in the last 7 days that are NOT inside ByRedLLC or Personal. This surfaces strays.
- **Stacks on Desktop** (right-click Desktop → Use Stacks): Auto-groups files by type. Not a replacement for a system, but reduces visual chaos during active work.

### Shortcuts (Mac Shortcuts app)
- Create a shortcut: "File This" — opens a dialog, lets you pick destination folder, moves the frontmost Finder selection there. Bind to a keyboard shortcut.
- Create a shortcut: "Weekly Cleanup" — opens Downloads and Desktop simultaneously. Run every Monday.

### Terminal script (for power users)
Save this as `~/Documents/ByRed-LLC/RedLanternStudios/SharedSystems/InternalTools/cleanup.sh`:

```bash
#!/bin/bash
# Weekly cleanup: flag old Desktop and Downloads files
echo "=== Files on Desktop older than 7 days ==="
find ~/Desktop -maxdepth 1 -mtime +7 -type f -print

echo "=== Files in Downloads older than 7 days ==="
find ~/Downloads -maxdepth 1 -mtime +7 -type f -print

echo "=== Review these files and move or archive. ==="
```

Run this every Monday. It surfaces what to deal with without deleting anything.

---

## SECTION 10 — CLEANUP PLAN

### Day 1 — Triage and structure (2–3 hours)

**Hour 1: Build the skeleton**
1. Open Finder. Navigate to `~/Documents`.
2. Create these folders in order:
   - `ByRedLLC/`
   - `ByRedLLC/Operations/Legal/`
   - `ByRedLLC/Operations/Finance/`
   - `ByRedLLC/Operations/Admin/`
   - `ByRedLLC/Operations/Strategy/`
   - `ByRedLLC/RedLanternStudios/Projects/`
   - `ByRedLLC/RedLanternStudios/SharedSystems/`
   - `ByRedLLC/RedLanternStudios/Design/`
   - `ByRedLLC/RedLanternStudios/Documentation/`
   - `Personal/`
   - `Archive/`
3. Inside Projects, create one folder per product: HireWire, QBos, SilentEngine, InSense, AuthenticHadith, ChapmanBot, _Clients, _template.
4. Inside each product folder, create: app, backend, ai, docs, assets, exports, design, archive.

**Hour 2: Sort what already exists**
5. Open Downloads. Sort by date (oldest first).
6. Anything clearly garbage → Trash.
7. Business documents → route to correct ByRedLLC folder.
8. Personal documents → route to Personal/.
9. Unclear → `Downloads/_toprocess/` — deal with in Hour 3.

**Hour 3: Desktop + strays**
10. Clear the Desktop. Move everything to the correct folder or `_toprocess`.
11. Search Documents for files NOT inside ByRedLLC or Personal. Move them.
12. Set Desktop wallpaper to something clean. Visual signal that this is a workspace.

---

### Day 2 — Enforcement + automation (1–2 hours)

1. Install Hazel OR set up Mac Smart Folders (your choice — Hazel is worth it).
2. Set up the screenshot auto-routing (System Preferences → Screenshots → Save to `Downloads/_screenshots`).
3. Create the `cleanup.sh` script and schedule it as a weekly reminder.
4. Open Notion. Create a page: `File System Rules`. Paste the key rules from Section 11 below. This is your enforcement reference.
5. Test: take a screenshot → confirm it lands in `_screenshots`. Download a PDF → confirm you can file it in 30 seconds.
6. Walk the tree one more time. If anything feels wrong about where something lives, fix it now before habit forms.

---

## SECTION 11 — GOVERNANCE RULES (NON-NEGOTIABLE)

These are the rules. You enforce them. No exceptions.

1. **No file without a home.** Before closing a document, it is filed. Not later. Now.

2. **No random naming.** Every file follows the naming convention. `untitled.pdf` and `new doc 3.docx` do not exist in this system.

3. **No duplicates.** Before saving a new version, check if the old one should be archived. Never have two files with the same name in the same folder.

4. **No business files in personal folders.** By Red LLC docs do not live in iCloud root, Desktop, or personal folders. Period.

5. **Desktop is temporary.** Nothing stays on Desktop more than 7 days.

6. **Downloads is an inbox.** Nothing lives in Downloads permanently.

7. **Archive, never delete.** If you are not sure, archive. Deletion is final. Archive is reversible.

8. **Code lives in GitHub.** Local folders for code projects contain READMEs pointing to repos — not actual code checked out to Documents.

9. **Secrets never in documents.** API keys, passwords, and tokens do not go into Notion pages, Google Docs, or local text files. They go in Vercel, Supabase vault, or a password manager.

10. **One PM layer.** Notion is the single source of truth for tasks, decisions, and project state. If it is not in Notion, it is not tracked.

11. **File it or lose it.** The system only works if you are consistent. The biggest risk is not bad structure — it is partial adoption.

---

## WEAK POINTS AND FAILURE MODES

### Where clutter will return
- **Downloads** — this is the highest-entropy folder on every Mac. Without Hazel or a daily habit, it reverts to chaos within 2 weeks. The automation in Section 9 is not optional.
- **Desktop** — same problem. The weekly cleanup rule must become a physical habit (calendar reminder, Monday morning).
- **Exports folder** — if you generate a lot of deliverables, this fills up fast. The date-stamped subfolder system prevents chaos, but you must use it consistently.

### What you will likely break
- You will create a file on Desktop "just for now" and leave it for a month.
- You will download a contract, sign it, and forget to move the signed version to Operations/Legal/Contracts.
- You will start a new product and forget to create the project folder first, resulting in files scattered in SharedSystems or Documentation.
- You will have a stale v2 and v3 of a spec with no clear indication which is current.

### Enforcement mechanisms
- Set a recurring Monday calendar event: "10-minute file cleanup" — check Desktop, Downloads, and recent Downloads/_toprocess.
- Add a Notion task template for every new project: Step 1 is always "Create project folder from _template."
- Before any client delivery: the export MUST be in `/exports/YYYY-MM-DD_[project]_[type]/`. If it is not there, it does not go out.
- After every session with Claude or any AI tool: move generated files from wherever they landed to their correct project folder before ending the session.

---

*This document is the single reference for file governance across all RedLantern Studios and By Red LLC work. When in doubt, read Section 11.*
