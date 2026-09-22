-- Keep auth profile provisioning bounded by the profile display_name constraint.
create or replace function public.handle_new_user_profile()
returns trigger
language plpgsql
security definer
set search_path = pg_catalog, public
as $$
begin
  insert into public.profiles (user_id, display_name, timezone)
  values (new.id, left(coalesce(new.raw_user_meta_data ->> 'full_name', new.email), 160), 'Asia/Bangkok')
  on conflict (user_id) do nothing;
  return new;
end;
$$;
revoke all on function public.handle_new_user_profile() from public, anon, authenticated;

insert into public.profiles (user_id, display_name, timezone)
select id, left(coalesce(raw_user_meta_data ->> 'full_name', email), 160), 'Asia/Bangkok'
from auth.users
on conflict (user_id) do nothing;
