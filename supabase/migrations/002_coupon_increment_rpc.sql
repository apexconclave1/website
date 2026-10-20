-- DIPLOVIA — Supabase Postgres Migration 002
-- RPC function for atomic coupon usage increment
-- Called by the payment API route to prevent race conditions

create or replace function increment_coupon_usage(coupon_code_param text)
returns void as $$
begin
  update coupons
  set current_redemptions = current_redemptions + 1
  where code = coupon_code_param
    and is_active = true
    and (max_redemptions is null or current_redemptions < max_redemptions);
end;
$$ language plpgsql security definer;

-- Grant execute to service_role only
revoke execute on function increment_coupon_usage(text) from public, anon, authenticated;
grant execute on function increment_coupon_usage(text) to service_role;
