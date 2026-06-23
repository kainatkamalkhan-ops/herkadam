-- Run once in Supabase → SQL Editor (Apply With Us submissions).

create table if not exists public.application_services (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  whatsapp text not null,
  service_selected text not null,
  program_name text not null,
  program_link text,
  application_deadline date not null,
  document_path text,
  documentation_folder_url text,
  account_holder_name text not null,
  payment_medium text not null,
  payment_proof_path text not null,
  additional_notes text,
  rush_fee_applies boolean not null default false,
  needs_two_week_notice boolean not null default false,
  status text not null default 'submitted'
    check (status in ('submitted', 'payment_reviewed', 'in_progress', 'delivered')),
  created_at timestamptz not null default now()
);

create index if not exists application_services_created_at_idx
  on public.application_services (created_at desc);

create index if not exists application_services_status_idx
  on public.application_services (status, created_at desc);

alter table public.application_services enable row level security;

-- No public policies — reads/writes via service role from API routes only.

-- Private bucket for CV/SOP uploads and payment receipts (service role uploads).
insert into storage.buckets (id, name, public, file_size_limit)
values ('application-submissions', 'application-submissions', false, 10485760)
on conflict (id) do nothing;
