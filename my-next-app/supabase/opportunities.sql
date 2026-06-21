-- Run in Supabase → SQL Editor once. Then add rows in Table Editor (no code deploy).

create table if not exists public.opportunities (
  id text primary key,
  title text not null,
  organization text not null,
  location text not null,
  deadline date not null,
  type text not null,
  funding_type text not null,
  region text not null,
  description text not null,
  summary text,
  benefits text,
  eligibility text,
  requirements text,
  impact_for_women text,
  is_featured boolean default false,
  image text,
  published boolean not null default true,
  published_at timestamptz not null default now(),
  application_link text
);

-- Migrations for existing tables:
alter table public.opportunities add column if not exists application_link text;
alter table public.opportunities add column if not exists summary text;
alter table public.opportunities add column if not exists benefits text;
alter table public.opportunities add column if not exists eligibility text;
alter table public.opportunities add column if not exists requirements text;
alter table public.opportunities add column if not exists impact_for_women text;

alter table public.opportunities enable row level security;

create policy "Public read published opportunities"
  on public.opportunities for select
  using (published = true);
