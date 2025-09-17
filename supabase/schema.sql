-- Enable UUID generator
create extension if not exists "pgcrypto";

-- Forms table with a **public_id** for sharing (separate from primary key)
create table if not exists public.forms (
  id uuid primary key default gen_random_uuid(),
  public_id uuid unique not null default gen_random_uuid(),
  title text not null,
  schema jsonb not null,
  created_at timestamptz default now()
);

-- Keep RLS ON, but we rely on service role for reads/writes (bypasses RLS)
alter table public.forms enable row level security;

-- No public policies needed at this stage.
-- Later: add owner column + policies when you introduce auth.
