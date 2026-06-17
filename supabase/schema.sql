-- Emera Developments — Supabase Schema

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Projects
create table if not exists projects (
  id           uuid primary key default uuid_generate_v4(),
  title        text not null,
  title_ar     text,                          -- Arabic title
  description  text,
  description_ar text,                        -- Arabic description
  location     text,
  location_ar  text,                          -- Arabic location
  price        numeric(12, 2),
  status       text not null default 'available'
                 check (status in ('available', 'sold', 'coming_soon')),
  images       jsonb default '[]'::jsonb,     -- array of image URLs
  specifications    jsonb default '{}'::jsonb,
  specifications_ar jsonb default '{}'::jsonb,
  created_at   timestamptz default now(),
  updated_at   timestamptz default now()
);

-- Auto-update updated_at
create or replace function update_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger projects_updated_at
  before update on projects
  for each row execute function update_updated_at();

-- Inquiries
create table if not exists inquiries (
  id         uuid primary key default uuid_generate_v4(),
  name       text not null,
  email      text not null,
  phone      text,
  message    text,
  project_id uuid references projects(id) on delete set null,
  read       boolean default false,
  created_at timestamptz default now()
);

-- Row Level Security
alter table projects  enable row level security;
alter table inquiries enable row level security;

-- Public can read projects
create policy "Public read projects"
  on projects for select using (true);

-- Only authenticated (admin) can write projects
create policy "Admin write projects"
  on projects for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Anyone can insert an inquiry (contact form)
create policy "Public submit inquiry"
  on inquiries for insert with check (true);

-- Only authenticated (admin) can read/manage inquiries
create policy "Admin manage inquiries"
  on inquiries for all
  using (auth.role() = 'authenticated');
