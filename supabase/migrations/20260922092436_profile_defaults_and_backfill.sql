-- Profile lifecycle for new and existing auth users.
-- Safe to run after the core baseline; preserves user supplied timezone values.
create or replace function public.handle_new_user_profile()
returns trigger
language plpgsql
security definer
set search_path = pg_catalog, public
as $$
begin
  insert into public.profiles (user_id, display_name, timezone)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', new.email), 'Asia/Bangkok')
  on conflict (user_id) do nothing;
  return new;
end;
$$;
revoke all on function public.handle_new_user_profile() from public, anon, authenticated;

drop trigger if exists on_auth_user_created_profile on auth.users;
create trigger on_auth_user_created_profile
after insert on auth.users
for each row execute function public.handle_new_user_profile();

insert into public.profiles (user_id, display_name, timezone)
select id, coalesce(raw_user_meta_data ->> 'full_name', email), 'Asia/Bangkok'
from auth.users
on conflict (user_id) do nothing;

alter table public.profiles add column if not exists locale text not null default 'th-TH';
alter table public.profiles add column if not exists base_currency text not null default 'THB';
alter table public.profiles drop constraint if exists profiles_base_currency_check;
alter table public.profiles add constraint profiles_base_currency_check check (base_currency ~ '^[A-Z]{3}$');
alter table public.profiles add column if not exists units text not null default 'metric';
alter table public.profiles drop constraint if exists profiles_units_check;
alter table public.profiles add constraint profiles_units_check check (units in ('metric','imperial'));
alter table public.profiles drop constraint if exists profiles_locale_check;
alter table public.profiles add constraint profiles_locale_check check (locale ~ '^[A-Za-z]{2,3}(-[A-Za-z]{2,4})?$');
alter table public.profiles drop constraint if exists profiles_display_name_length_check;
alter table public.profiles add constraint profiles_display_name_length_check check (display_name is null or char_length(display_name) <= 160);
alter table public.profiles drop constraint if exists profiles_timezone_format_check;
alter table public.profiles add constraint profiles_timezone_format_check check (timezone ~ '^[A-Za-z_]+(/[A-Za-z0-9_+.-]+)+$');
alter table public.profiles add column if not exists ai_consent boolean not null default false;

