-- Keep profile timezone values within the initial supported UI list.
alter table public.profiles drop constraint if exists profiles_timezone_format_check;
alter table public.profiles add constraint profiles_timezone_format_check check (timezone in ('Asia/Bangkok','Asia/Tokyo','Europe/London','America/Los_Angeles'));
