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
  is_featured boolean default false,
  image text,
  published boolean not null default true,
  published_at timestamptz not null default now()
);

alter table public.opportunities enable row level security;

create policy "Public read published opportunities"
  on public.opportunities for select
  using (published = true);
