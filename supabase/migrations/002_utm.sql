-- Apex Conclave: where each registration came from (UTM parameters on the landing URL)
-- Run once in the Supabase SQL editor, after 001_init.sql.

alter table registrations
  add column utm_source text,
  add column utm_medium text,
  add column utm_campaign text;

create index registrations_utm_source_idx on registrations (utm_source);
