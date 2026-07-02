-- Maintenance Ledger Migration
-- Target: By Red LLC Supabase (mlmrdkiyxlngmwhdtrln)
-- Run via: Supabase dashboard → SQL editor, or supabase db push
-- Date: 2026-06-25

-- MAINTENANCE RUNS
-- One row per agent run per product
create table if not exists maintenance_runs (
  id uuid primary key default gen_random_uuid(),
  product_slug text not null,
  product_name text not null,
  run_type text not null check (run_type in ('weekly', 'monthly', 'pre-release', 'manual')),
  triggered_by text not null default 'schedule',
  verdict text not null check (verdict in ('PASS', 'WARN', 'FAIL', 'BLOCKED')),
  findings_count int not null default 0,
  critical_count int not null default 0,
  high_count int not null default 0,
  medium_count int not null default 0,
  low_count int not null default 0,
  checks_performed text[] not null default '{}',
  checks_blocked text[] not null default '{}',
  summary text,
  telegram_sent boolean not null default false,
  created_at timestamptz not null default now(),
  completed_at timestamptz
);

-- MAINTENANCE FINDINGS
-- One row per finding per run
create table if not exists maintenance_findings (
  id uuid primary key default gen_random_uuid(),
  run_id uuid not null references maintenance_runs(id) on delete cascade,
  product_slug text not null,
  title text not null,
  severity text not null check (severity in ('CRITICAL', 'HIGH', 'MEDIUM', 'LOW')),
  category text not null check (category in ('repo', 'site_url', 'vercel_deploy', 'supabase_health', 'dependency', 'truth', 'visual', 'release', 'sprawl')),
  description text,
  recommended_action text,
  auto_fix_applied boolean not null default false,
  approval_required boolean not null default false,
  github_issue_url text,
  github_pr_url text,
  status text not null default 'open' check (status in ('open', 'resolved', 'wont-fix', 'acknowledged')),
  created_at timestamptz not null default now(),
  resolved_at timestamptz
);

-- INDEXES
create index if not exists idx_maintenance_runs_product on maintenance_runs(product_slug);
create index if not exists idx_maintenance_runs_created on maintenance_runs(created_at desc);
create index if not exists idx_maintenance_runs_verdict on maintenance_runs(verdict);
create index if not exists idx_maintenance_findings_run on maintenance_findings(run_id);
create index if not exists idx_maintenance_findings_severity on maintenance_findings(severity);
create index if not exists idx_maintenance_findings_status on maintenance_findings(status);

-- RLS
alter table maintenance_runs enable row level security;
alter table maintenance_findings enable row level security;

-- Service role only — agent writes, Ro reads via dashboard (service role bypasses RLS)
-- No public access
create policy "No public access to maintenance_runs"
  on maintenance_runs for all
  using (false);

create policy "No public access to maintenance_findings"
  on maintenance_findings for all
  using (false);
