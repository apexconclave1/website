-- Apex Conclave: registration funnel, free and first-party (Vercel shows custom events only on Pro).
-- Run once in the Supabase SQL editor, after 002_utm.sql. Read it in Table Editor or SQL:
--   select * from registration_funnel order by registrations desc;

create view registration_funnel
with (security_invoker = true)  -- respects RLS: only the service role (dashboard, API) can read it
as
select
  event_id,
  coalesce(utm_source, '(direct)')   as source,
  coalesce(utm_campaign, '(none)')   as campaign,
  count(*)                                                                         as registrations,
  count(*) filter (where status in ('PAYMENT_SUBMITTED', 'PAYMENT_VERIFIED', 'CONFIRMED')) as paid,
  count(*) filter (where status = 'CONFIRMED')                                     as confirmed,
  round(100.0 * count(*) filter (where status in ('PAYMENT_SUBMITTED', 'PAYMENT_VERIFIED', 'CONFIRMED'))
        / nullif(count(*), 0), 1)                                                  as paid_percent,
  coalesce(sum(final_amount) filter (where status in ('PAYMENT_VERIFIED', 'CONFIRMED')), 0) as verified_revenue
from registrations
group by event_id, coalesce(utm_source, '(direct)'), coalesce(utm_campaign, '(none)');

-- Supabase grants new views to the API roles by default; take that back.
revoke all on registration_funnel from anon, authenticated;
