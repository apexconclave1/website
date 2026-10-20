-- DIPLOVIA — Supabase Postgres Migration 001
-- Registration Schema with Coupons & Payment Tracking
-- Following supabase-postgres-best-practices:
--   ✅ bigint identity PKs (not serial, not random UUID)
--   ✅ text over varchar(n)
--   ✅ timestamptz for all timestamps
--   ✅ FK indexes on every foreign key column
--   ✅ RLS enabled on all tables
--   ✅ Proper enum types

-- ===================================
-- ENUM TYPES
-- ===================================

create type delegate_track as enum ('HIGH_SCHOOL', 'COLLEGIATE');
create type delegation_type as enum ('INDIVIDUAL', 'DOUBLE_DELEGATION', 'DELEGATION_HEAD');
create type experience_level as enum ('FIRST_TIME', 'INTERMEDIATE_1_3', 'ADVANCED_4_7', 'VETERAN_8_PLUS');
create type registration_status as enum (
  'SUBMITTED',
  'PAYMENT_SUBMITTED',
  'PAYMENT_VERIFIED',
  'CONFIRMED',
  'WAITLISTED',
  'REJECTED',
  'CANCELLED'
);

-- ===================================
-- COUPONS TABLE
-- ===================================

create table coupons (
  id bigint generated always as identity primary key,
  code text not null unique,
  discount_amount numeric(10,2) not null,
  max_redemptions integer,  -- null = unlimited
  current_redemptions integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- Enable RLS
alter table coupons enable row level security;

-- Only service role can manage coupons
create policy "Service role full access on coupons"
  on coupons for all
  to service_role
  using (true);

-- Anonymous can read active coupons (for validation)
create policy "Anyone can read active coupons"
  on coupons for select
  to anon, authenticated
  using (is_active = true);

-- ===================================
-- REGISTRATIONS TABLE
-- ===================================

create table registrations (
  id bigint generated always as identity primary key,
  tracking_code text not null unique,

  -- Step 1: Identity
  full_name text not null,
  email text not null,
  phone text not null,
  track delegate_track not null,
  institution_name text not null,
  delegation_type delegation_type not null,
  partner_name text,
  city text not null,
  country text not null,

  -- Step 2: Committee Preferences
  first_choice_committee text not null,
  first_choice_country text not null,
  second_choice_committee text not null,
  second_choice_country text not null,
  third_choice_committee text,
  third_choice_country text,

  -- Step 3: Experience
  experience_level experience_level not null,
  prior_awards text,
  motivation text not null,
  portfolio_sample_url text,

  -- Step 5: Payment
  coupon_code text,
  original_amount numeric(10,2) not null default 399.00,
  final_amount numeric(10,2) not null default 399.00,
  payment_utr text,
  payment_screenshot_path text,  -- Supabase Storage path
  
  -- Status & Metadata
  status registration_status not null default 'SUBMITTED',
  admin_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ===================================
-- INDEXES (following supabase best practices)
-- ===================================

create index registrations_email_idx on registrations (email);
create index registrations_status_idx on registrations (status);
create index registrations_tracking_code_idx on registrations (tracking_code);
create index registrations_created_at_idx on registrations (created_at desc);

-- ===================================
-- ROW LEVEL SECURITY
-- ===================================

alter table registrations enable row level security;

-- Allow anonymous inserts (public registration form)
create policy "Anyone can register"
  on registrations for insert
  to anon, authenticated
  with check (true);

-- Only service role can read/update/delete (admin dashboard)
create policy "Service role full access on registrations"
  on registrations for all
  to service_role
  using (true);

-- ===================================
-- UPDATED_AT TRIGGER
-- ===================================

create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger registrations_updated_at
  before update on registrations
  for each row
  execute function update_updated_at_column();

-- ===================================
-- SEED COUPONS
-- ===================================

insert into coupons (code, discount_amount, max_redemptions, is_active) values
  ('EARLYBIRD30', 100.00, 30, true),
  ('DIPFRIEND', 100.00, null, true);

-- ===================================
-- STORAGE BUCKET (run this in Supabase Dashboard > Storage)
-- Note: Supabase SQL editor doesn't support storage.createBucket()
-- Create bucket 'payment-proofs' via Dashboard with:
--   - Public: false
--   - File size limit: 5MB
--   - Allowed MIME types: image/jpeg, image/png, image/webp
-- ===================================
