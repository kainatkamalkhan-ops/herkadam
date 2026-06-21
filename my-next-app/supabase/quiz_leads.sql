-- Run in Supabase → SQL Editor once.

create table if not exists public.quiz_leads (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  opportunity_types text[] not null default '{}',
  education_level text not null,
  region text not null,
  field_of_interest text not null,
  submitted_at timestamptz not null default now()
);

create index if not exists quiz_leads_submitted_at_idx on public.quiz_leads (submitted_at desc);

alter table public.quiz_leads enable row level security;

-- No public policies: inserts via service role API only.
