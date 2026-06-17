-- Add Arabic specifications column to projects
alter table projects
  add column if not exists specifications_ar jsonb default '{}'::jsonb;
