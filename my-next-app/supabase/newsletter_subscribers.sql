-- Run in Supabase → SQL Editor once (or use scripts/run-quiz-migration.mjs).

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

-- No public policies: writes via service role API only.
