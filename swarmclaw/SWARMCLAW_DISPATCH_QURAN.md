# SWARMCLAW DISPATCH — QURAN DATA SEEDING
Dispatched: June 13 2026 | Priority: HIGH — blocks Amina citation feature

---

## OBJECTIVE

Seed 6,236 Quran ayahs into the Amina Supabase project. The data is already downloaded and verified. This task unblocks Amina's Quran citation enforcement.

## DATA SOURCE (VERIFIED)

- Source: `quran-json` npm package v3.1.2 (jsdelivr CDN)
- File: `quran_seed.json` — in workspace root
- Record count: 6,236 ayahs, 114 surahs
- Fields: surah_number, surah_name_arabic, surah_name_transliteration, surah_name_english, surah_type, ayah_number, arabic_text, english_translation
- Translator: Saheeh International (standard, widely accepted)
- License: Public domain Quran text

## STEP 1 — CREATE MIGRATION IN AMINA REPO

File: `supabase/migrations/002_add_quran.sql`

```sql
create table if not exists public.quran (
  id uuid primary key default gen_random_uuid(),
  surah_number int not null check (surah_number between 1 and 114),
  surah_name_arabic text not null,
  surah_name_transliteration text not null,
  surah_name_english text not null,
  surah_type text check (surah_type in ('meccan', 'medinan')),
  ayah_number int not null check (ayah_number >= 1),
  arabic_text text not null,
  english_translation text not null,
  created_at timestamptz default now(),
  unique(surah_number, ayah_number)
);

-- Full text search index
create index if not exists quran_arabic_fts on public.quran
  using gin(to_tsvector('arabic', arabic_text));

create index if not exists quran_english_fts on public.quran
  using gin(to_tsvector('english', english_translation));

-- RLS: quran is public read, no auth required
alter table public.quran enable row level security;
create policy "quran_public_read" on public.quran
  for select using (true);
```

## STEP 2 — RUN MIGRATION ON AMINA SUPABASE PROJECT

Once Amina Supabase project is created (Track 2 Phase 1), run migration via:
```bash
supabase db push --project-ref [AMINA_PROJECT_REF]
```
Or apply via MCP: `apply_migration` with the SQL above.

## STEP 3 — SEED THE DATA

Script: `supabase/seed/seed_quran.js`

```javascript
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY // service role — not anon
);

async function seedQuran() {
  const ayahs = JSON.parse(fs.readFileSync('quran_seed.json', 'utf8'));
  
  // Batch insert in chunks of 500
  const chunkSize = 500;
  for (let i = 0; i < ayahs.length; i += chunkSize) {
    const chunk = ayahs.slice(i, i + chunkSize);
    const { error } = await supabase.from('quran').upsert(chunk, {
      onConflict: 'surah_number,ayah_number'
    });
    if (error) {
      console.error(`Chunk ${i}-${i+chunkSize} failed:`, error);
      process.exit(1);
    }
    console.log(`Seeded ${Math.min(i + chunkSize, ayahs.length)}/${ayahs.length}`);
  }
  console.log('Quran seeding complete. Total:', ayahs.length);
}

seedQuran();
```

Run with:
```bash
SUPABASE_URL=https://[ref].supabase.co \
SUPABASE_SERVICE_KEY=[service_role_key] \
node supabase/seed/seed_quran.js
```

## STEP 4 — VERIFY

```sql
select count(*) from quran; -- must be 6236
select * from quran where surah_number = 1 order by ayah_number; -- Al-Fatihah, 7 ayahs
select * from quran where surah_number = 114; -- An-Nas, 6 ayahs
```

## ALSO SEED INTO AUTHENTIC HADITH PROJECT

The Authentic Hadith app (ref: `nqklipakrfuwebkdnhwg`) currently has no Quran data. If Quran references are needed there, run the same migration + seed against that project.

## RECEIPT REQUIRED

Log to AMINA_BUILD_LOG.md:
```
[DATE] PHASE_1 ARCHITECT Quran seed complete — 6236 rows inserted, verified via count query
```
