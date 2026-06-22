-- Run once in Supabase → SQL Editor (resource video library for /resources).

create table if not exists public.resource_videos (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  youtube_url text not null,
  sort_order int not null default 0,
  published boolean not null default true,
  published_at timestamptz not null default now()
);

create index if not exists resource_videos_published_at_idx
  on public.resource_videos (published_at desc);

create index if not exists resource_videos_sort_order_idx
  on public.resource_videos (sort_order asc, published_at desc);

alter table public.resource_videos enable row level security;

create policy "Public read published resource videos"
  on public.resource_videos for select
  using (published = true);
