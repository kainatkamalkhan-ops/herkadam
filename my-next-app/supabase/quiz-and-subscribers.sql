-- Run once in Supabase → SQL Editor (creates quiz leads + newsletter subscribers).

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

create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  source text not null default 'newsletter',
  subscribed_at timestamptz not null default now(),
  welcome_email_sent_at timestamptz,
  constraint newsletter_subscribers_email_key unique (email)
);

create index if not exists newsletter_subscribers_subscribed_at_idx
  on public.newsletter_subscribers (subscribed_at desc);

alter table public.newsletter_subscribers enable row level security;

-- No public RLS policies: writes go through the server API (service role) only.
