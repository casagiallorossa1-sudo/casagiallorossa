-- 1) INCOLLA QUESTO IN SUPABASE -> SQL Editor -> RUN

create extension if not exists pgcrypto;

create table if not exists public.cities (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  country text not null,
  timezone text not null,
  primary_language text not null default 'it',
  whatsapp_url text,
  telegram_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.venues (
  id uuid primary key default gen_random_uuid(),
  city_id uuid references public.cities(id) on delete cascade not null,
  name text not null,
  address text not null,
  lat double precision,
  lng double precision,
  notes text,
  is_primary boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.doors (
  id uuid primary key default gen_random_uuid(),
  door_id text unique not null,
  city_id uuid references public.cities(id) on delete cascade not null,
  label text not null default 'Porta #001',
  status text not null default 'active',
  primary_venue_id uuid references public.venues(id),
  created_at timestamptz not null default now()
);

create table if not exists public.checkins (
  id uuid primary key default gen_random_uuid(),
  door_id text not null references public.doors(door_id) on delete cascade,
  ip_hash text,
  user_agent text,
  created_at timestamptz not null default now()
);

create index if not exists checkins_door_created_at_idx on public.checkins (door_id, created_at desc);
