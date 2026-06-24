-- ============================================================
-- Colloque · Supabase Schema
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- ─── Tables ──────────────────────────────────────────────────────────────────

create table if not exists public.users (
  id               uuid primary key references auth.users(id) on delete cascade,
  email            text unique not null,
  name             text,
  created_at       timestamptz default now(),
  is_founding_member bool default false
);

create table if not exists public.comments (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid not null references public.users(id) on delete cascade,
  log_entry_slug   text not null,
  body             text not null,
  created_at       timestamptz default now()
);

create table if not exists public.likes (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid not null references public.users(id) on delete cascade,
  log_entry_slug   text not null,
  constraint unique_user_slug unique (user_id, log_entry_slug)
);

create table if not exists public.waitlist (
  id               uuid primary key default gen_random_uuid(),
  email            text unique not null,
  created_at       timestamptz default now()
);

-- ─── Indexes ─────────────────────────────────────────────────────────────────

create index if not exists idx_comments_slug on public.comments (log_entry_slug);
create index if not exists idx_likes_slug    on public.likes    (log_entry_slug);

-- ─── Enable Row Level Security ────────────────────────────────────────────────

alter table public.users    enable row level security;
alter table public.comments enable row level security;
alter table public.likes    enable row level security;
alter table public.waitlist enable row level security;

-- ─── RLS Policies: users ─────────────────────────────────────────────────────

create policy "Users can read own profile"
  on public.users for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.users for update
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.users for insert
  with check (auth.uid() = id);

-- ─── RLS Policies: comments ──────────────────────────────────────────────────

create policy "Anyone can read comments"
  on public.comments for select
  using (true);

create policy "Auth users can insert own comments"
  on public.comments for insert
  with check (auth.uid() = user_id);

create policy "Users can delete own comments"
  on public.comments for delete
  using (auth.uid() = user_id);

-- ─── RLS Policies: likes ─────────────────────────────────────────────────────

create policy "Anyone can read likes"
  on public.likes for select
  using (true);

create policy "Auth users can insert own likes"
  on public.likes for insert
  with check (auth.uid() = user_id);

create policy "Users can delete own likes"
  on public.likes for delete
  using (auth.uid() = user_id);

-- ─── RLS Policies: waitlist ──────────────────────────────────────────────────

create policy "Anyone can join waitlist"
  on public.waitlist for insert
  with check (true);
