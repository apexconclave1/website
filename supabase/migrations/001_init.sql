-- Apex Conclave: initial schema (fresh project)
-- Run once in the Supabase SQL editor of a new project.
--
-- Security model: RLS is on for every table and there are NO policies for anon/authenticated.
-- The public anon key can therefore read or write nothing. All reads and writes go through
-- the Next.js API routes, which use the service-role key (bypasses RLS) on the server only.

-- ===================================
-- ENUM TYPES
-- ===================================

create type delegate_track as enum ('HIGH_SCHOOL', 'COLLEGIATE');
create type delegation_type as enum ('INDIVIDUAL', 'DOUBLE_DELEGATION', 'DELEGATION_HEAD');
create type experience_level as enum ('FIRST_TIME', 'INTERMEDIATE_1_3', 'ADVANCED_4_7', 'VETERAN_8_PLUS');
create type registration_status as enum (
  'SUBMITTED',          -- form sent, not paid
  'PAYMENT_SUBMITTED',  -- UTR sent, waiting for manual check
  'PAYMENT_VERIFIED',
  'CONFIRMED',          -- seat assigned
  'WAITLISTED',
  'REJECTED',
  'CANCELLED'
);

-- ===================================
-- UPDATED_AT TRIGGER FUNCTION
-- ===================================

create or replace function set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ===================================
-- COUPONS
-- ===================================

create table coupons (
  id bigint generated always as identity primary key,
  code text not null unique check (code = upper(code)),
  discount_amount numeric(10,2) not null check (discount_amount > 0),
  max_redemptions integer check (max_redemptions > 0),  -- null = unlimited
  current_redemptions integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

alter table coupons enable row level security;

-- Atomically use one redemption. Returns the discount, or null if the code is invalid or used up.
create or replace function redeem_coupon(coupon_code_param text)
returns numeric
language plpgsql
security definer
set search_path = ''
as $$
declare
  discount numeric;
begin
  update public.coupons
     set current_redemptions = current_redemptions + 1
   where code = upper(coupon_code_param)
     and is_active
     and (max_redemptions is null or current_redemptions < max_redemptions)
  returning discount_amount into discount;
  return discount;
end;
$$;

revoke execute on function redeem_coupon(text) from public, anon, authenticated;
grant execute on function redeem_coupon(text) to service_role;

-- ===================================
-- REGISTRATIONS
-- ===================================

create table registrations (
  id bigint generated always as identity primary key,
  tracking_code text not null unique,
  event_id text not null,  -- matches id in src/lib/data/events.ts

  -- Identity
  full_name text not null,
  email text not null,
  phone text not null,
  track delegate_track not null,
  institution_name text not null,
  delegation_type delegation_type not null,
  partner_name text,
  city text not null,
  country text not null,

  -- Preferences (the team assigns the actual seat)
  first_choice_committee text not null,
  first_choice_country text not null,
  second_choice_committee text not null,
  second_choice_country text not null,
  third_choice_committee text,
  third_choice_country text,

  -- Assigned by the team after review
  assigned_committee text,
  assigned_country text,

  -- Experience
  experience_level experience_level not null,
  prior_awards text,
  motivation text not null,
  portfolio_sample_url text,

  -- Payment (amounts are set by the server, never by the browser)
  original_amount numeric(10,2) not null,
  coupon_code text,
  final_amount numeric(10,2) not null,
  payment_utr text,
  payment_screenshot_path text,  -- path in the payment-proofs bucket

  status registration_status not null default 'SUBMITTED',
  admin_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- One registration per email per event
create unique index registrations_event_email_key on registrations (event_id, lower(email));
create index registrations_status_idx on registrations (status);
create index registrations_created_at_idx on registrations (created_at desc);

alter table registrations enable row level security;

create trigger registrations_updated_at
  before update on registrations
  for each row execute function set_updated_at();

-- ===================================
-- CONTACT MESSAGES
-- ===================================

create table contact_messages (
  id bigint generated always as identity primary key,
  name text not null,
  email text not null,
  phone text,
  institution text,
  category text not null,
  subject text not null,
  message text not null,
  handled boolean not null default false,
  created_at timestamptz not null default now()
);

create index contact_messages_created_at_idx on contact_messages (created_at desc);

alter table contact_messages enable row level security;

-- ===================================
-- STORAGE: private bucket for payment screenshots
-- ===================================

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('payment-proofs', 'payment-proofs', false, 5242880, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do nothing;

-- ===================================
-- SEED COUPONS (edit or remove before launch)
-- ===================================

insert into coupons (code, discount_amount, max_redemptions) values
  ('EARLYBIRD30', 100.00, 30),
  ('DIPFRIEND', 100.00, null);
