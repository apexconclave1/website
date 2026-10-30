-- 004 (2026-10-30, after the live security test)
-- 1. One UTR per registration: a single real payment cannot be claimed by several registrations.
--    The payment API stores UTRs in upper case, so a plain unique index is enough.
create unique index registrations_payment_utr_key on registrations (payment_utr) where payment_utr is not null;

-- 2. A rate limit shared by every server instance (the in-memory limiter only sees one instance).
--    Fixed window per key, e.g. 'register:<ip>'. Only the service role (the API routes) can use it.
create table rate_limits (
  key text primary key,
  window_start timestamptz not null default now(),
  hits integer not null default 0
);
alter table rate_limits enable row level security;

create or replace function hit_rate_limit(limit_key text, window_seconds integer)
returns integer
language plpgsql
security definer
set search_path = ''
as $$
declare
  h integer;
begin
  insert into public.rate_limits as r (key, window_start, hits)
  values (limit_key, now(), 1)
  on conflict (key) do update set
    window_start = case when r.window_start <= now() - make_interval(secs => window_seconds) then now() else r.window_start end,
    hits = case when r.window_start <= now() - make_interval(secs => window_seconds) then 1 else r.hits + 1 end
  returning hits into h;
  -- Keep the table small: now and then, drop keys idle for a day
  if random() < 0.01 then
    delete from public.rate_limits where window_start < now() - interval '1 day';
  end if;
  return h;
end;
$$;

revoke execute on function hit_rate_limit(text, integer) from public, anon, authenticated;
grant execute on function hit_rate_limit(text, integer) to service_role;
