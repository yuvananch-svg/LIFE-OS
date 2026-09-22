-- Profile lifecycle and ownership checks. Run as one execute_sql request.
begin;
insert into auth.users(id,aud,role,email,raw_user_meta_data) values
 ('66666666-6666-6666-6666-666666666666','authenticated','authenticated','profile-a@example.invalid',jsonb_build_object('full_name',repeat('x',300))),
 ('77777777-7777-7777-7777-777777777777','authenticated','authenticated','profile-b@example.invalid',null),
 ('99999999-9999-9999-9999-999999999999','authenticated','authenticated','profile-c@example.invalid',null);

do $$ declare n integer; begin
  select char_length(display_name) into n from public.profiles where user_id='66666666-6666-6666-6666-666666666666';
  if n <> 160 then raise exception 'new-user display name was not bounded'; end if;
end $$;
set local role authenticated;
select set_config('request.jwt.claim.sub','66666666-6666-6666-6666-666666666666',true);
update public.profiles set locale='en-US' where user_id='66666666-6666-6666-6666-666666666666';
do $$ declare affected integer; begin
  if (select locale from public.profiles where user_id='66666666-6666-6666-6666-666666666666') <> 'en-US' then raise exception 'owner update did not persist'; end if;
  begin update public.profiles set timezone='Mars/Time' where user_id='66666666-6666-6666-6666-666666666666'; raise exception 'invalid timezone accepted'; exception when check_violation then null; end;
  begin update public.profiles set locale='th_TH' where user_id='66666666-6666-6666-6666-666666666666'; raise exception 'invalid locale accepted'; exception when check_violation then null; end;
  update public.profiles set locale='fr-FR' where user_id='77777777-7777-7777-7777-777777777777';
  get diagnostics affected = row_count;
  if affected <> 0 then raise exception 'cross-owner update affected a row'; end if;
  begin update public.profiles set user_id='77777777-7777-7777-7777-777777777777' where user_id='66666666-6666-6666-6666-666666666666'; raise exception 'ownership reassignment accepted'; exception when insufficient_privilege then null; end;
  begin insert into public.profiles(user_id) values ('99999999-9999-9999-9999-999999999999'); raise exception 'spoofed profile insert accepted'; exception when insufficient_privilege then null; end;
  if (select locale from public.profiles where user_id='77777777-7777-7777-7777-777777777777') <> 'th-TH' then raise exception 'cross-owner update succeeded'; end if;
end $$;
set local role anon;
select set_config('request.jwt.claim.sub','',true);
do $$ begin
  begin perform (select count(*) from public.profiles); raise exception 'anon can read profiles'; exception when insufficient_privilege then null; end;
end $$;
rollback;
select 'profile lifecycle, validation, owner/cross-owner/anon RLS passed' as result;
