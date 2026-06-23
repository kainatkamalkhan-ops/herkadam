-- Run in Supabase SQL Editor if application_services already exists without background_document_path.

alter table public.application_services
  add column if not exists background_document_path text;
