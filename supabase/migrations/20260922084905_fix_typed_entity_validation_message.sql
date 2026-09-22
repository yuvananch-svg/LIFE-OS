-- Fix validate_typed_entity error formatting from the initial baseline.
create or replace function public.validate_typed_entity()
returns trigger
language plpgsql
security invoker
set search_path = pg_catalog, public
as $$
begin
  if not exists (
    select 1
    from public.entity_records r
    join public.sections s on s.id = r.section_id
    where r.user_id = new.user_id
      and r.id = new.entity_id
      and s.key = tg_argv[0]
      and r.entity_type = tg_argv[1]
  ) then
    raise exception using
      errcode = '23514',
      message = format(
        'entity %s does not belong to section %s and type %s',
        new.entity_id,
        tg_argv[0],
        tg_argv[1]
      );
  end if;
  return new;
end
$$;

revoke all on function public.validate_typed_entity()
  from public, anon, authenticated;
