-- LIFE OS core model. Requires Supabase auth schema.
create extension if not exists pgcrypto;

create table public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  timezone text not null default 'Asia/Bangkok',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.sections (
  id uuid primary key default gen_random_uuid(),
  key text not null unique check (key ~ '^[a-z][a-z0-9_]{1,63}$'),
  name text not null,
  version integer not null default 1 check (version > 0),
  schema jsonb not null default '{}'::jsonb,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.section_permissions (
  user_id uuid not null references auth.users(id) on delete cascade,
  section_id uuid not null references public.sections(id) on delete cascade,
  can_read boolean not null default true,
  can_write boolean not null default true,
  created_at timestamptz not null default now(),
  primary key (user_id, section_id)
);

-- Every user-owned object gets one stable identity here. Links never point to arbitrary tables.
create table public.entity_records (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  section_id uuid not null references public.sections(id),
  entity_type text not null check (entity_type ~ '^[a-z][a-z0-9_]{1,63}$'),
  -- Stable identifier from the section adapter/source system; use the entity id for native records.
  source_id text not null check (length(source_id) between 1 and 255),
  title text,
  payload jsonb not null default '{}'::jsonb,
  valid_from timestamptz,
  valid_to timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, id),
  unique (user_id, section_id, entity_type, source_id),
  check (valid_to is null or valid_from is null or valid_to >= valid_from)
);
create index entity_records_owner_section_idx on public.entity_records(user_id, section_id, updated_at desc);
create index entity_records_type_idx on public.entity_records(user_id, entity_type);

create table public.entity_links (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  source_entity_id uuid not null,
  target_entity_id uuid not null,
  foreign key (user_id, source_entity_id) references public.entity_records(user_id, id) on delete cascade,
  foreign key (user_id, target_entity_id) references public.entity_records(user_id, id) on delete cascade,
  relation_type text not null check (relation_type ~ '^[a-z][a-z0-9_]{1,63}$'),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  unique (source_entity_id, target_entity_id, relation_type),
  check (source_entity_id <> target_entity_id)
);
create index entity_links_target_idx on public.entity_links(user_id, target_entity_id);

create table public.time_blocks (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade,
  entity_id uuid,
  foreign key (user_id, entity_id) references public.entity_records(user_id, id) on delete cascade,
  starts_at timestamptz not null, ends_at timestamptz not null, kind text not null default 'scheduled',
  status text not null default 'planned' check (status in ('planned','cancelled')), metadata jsonb not null default '{}'::jsonb,
  check (ends_at > starts_at)
);
create index time_blocks_window_idx on public.time_blocks(user_id, starts_at, ends_at);

create table public.tasks (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade,
  entity_id uuid not null unique,
  foreign key (user_id, entity_id) references public.entity_records(user_id, id) on delete cascade,
  status text not null default 'open' check (status in ('open','in_progress','done','cancelled')),
  due_at timestamptz, priority smallint not null default 0 check (priority between -10 and 10)
);
create table public.events (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade,
  entity_id uuid not null unique,
  foreign key (user_id, entity_id) references public.entity_records(user_id, id) on delete cascade,
  starts_at timestamptz not null, ends_at timestamptz not null, location text,
  check (ends_at > starts_at)
);
create table public.workouts (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade,
  entity_id uuid not null unique,
  foreign key (user_id, entity_id) references public.entity_records(user_id, id) on delete cascade,
  performed_at timestamptz not null, duration_minutes integer check (duration_minutes is null or duration_minutes > 0),
  metrics jsonb not null default '{}'::jsonb
);
create table public.health_measurements (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade,
  entity_id uuid not null unique,
  foreign key (user_id, entity_id) references public.entity_records(user_id, id) on delete cascade,
  measured_at timestamptz not null, metric text not null, value numeric not null, unit text not null
);

create table public.finance_transactions (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade,
  entity_id uuid not null unique,
  foreign key (user_id, entity_id) references public.entity_records(user_id, id) on delete cascade,
  occurred_at timestamptz not null, description text,
  currency text not null default 'THB' check (currency ~ '^[A-Z]{3}$'),
  unique (user_id, id, currency)
);
create table public.finance_entries (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade,
  transaction_id uuid not null,
  currency text not null default 'THB' check (currency ~ '^[A-Z]{3}$'),
  foreign key (user_id, transaction_id, currency) references public.finance_transactions(user_id, id, currency) on delete cascade,
  account text not null, amount numeric(20,4) not null check (amount <> 0),
  created_at timestamptz not null default now()
);
create index finance_entries_tx_idx on public.finance_entries(user_id, transaction_id);

-- Enforce balanced double-entry transactions at commit. Insert all entries in one DB transaction.
create or replace function public.assert_balanced_finance_transaction()
returns trigger language plpgsql security invoker set search_path = pg_catalog, public as $$
declare tx uuid; total numeric; entry_count integer; affected uuid[];
begin
  if tg_op = 'UPDATE' then
    select array_agg(x order by x::text) into affected
      from (select distinct unnest(array[old.transaction_id, new.transaction_id]) x) ids;
  elsif tg_op = 'DELETE' then
    affected := array[old.transaction_id];
  else
    affected := array[new.transaction_id];
  end if;

  foreach tx in array affected loop
    -- Cascading deletes remove entries after their parent transaction; permit that path.
    if not exists (select 1 from public.finance_transactions where id = tx) then continue; end if;
    -- Sorted affected IDs make concurrent multi-transaction updates lock deterministically.
    perform pg_advisory_xact_lock(hashtextextended(tx::text, 0));
    select count(*), coalesce(sum(amount),0) into entry_count, total
      from public.finance_entries where transaction_id = tx;
    if entry_count < 2 then raise exception 'finance transaction % requires at least two entries', tx; end if;
    if total <> 0 then raise exception 'finance transaction % is unbalanced (%)', tx, total; end if;
  end loop;
  return null;
end $$;
create constraint trigger finance_entries_balanced
  after insert or update or delete on public.finance_entries
  deferrable initially deferred for each row execute function public.assert_balanced_finance_transaction();
create or replace function public.assert_finance_header_balanced()
returns trigger language plpgsql security invoker set search_path = pg_catalog, public as $$
declare entry_count integer; total numeric;
begin
  if tg_op = 'DELETE' then return null; end if;
  perform pg_advisory_xact_lock(hashtextextended(new.id::text, 0));
  select count(*), coalesce(sum(amount),0) into entry_count, total
    from public.finance_entries where transaction_id = new.id;
  if entry_count < 2 then raise exception 'finance transaction % requires at least two entries', new.id; end if;
  if total <> 0 then raise exception 'finance transaction % is unbalanced (%)', new.id, total; end if;
  return null;
end $$;
create constraint trigger finance_transaction_balanced
  after insert or update on public.finance_transactions
  deferrable initially deferred for each row execute function public.assert_finance_header_balanced();

-- Keep timestamps deterministic for mutable canonical rows.
create or replace function public.set_updated_at()
returns trigger language plpgsql security invoker set search_path = pg_catalog as $$
begin
  new.updated_at := clock_timestamp();
  return new;
end $$;
create trigger profiles_set_updated_at before update on public.profiles
  for each row execute function public.set_updated_at();
create trigger entity_records_set_updated_at before update on public.entity_records
  for each row execute function public.set_updated_at();

create or replace function public.prevent_entity_identity_change()
returns trigger language plpgsql security invoker set search_path = pg_catalog as $$
begin
  if new.user_id is distinct from old.user_id
     or new.section_id is distinct from old.section_id
     or new.entity_type is distinct from old.entity_type
     or new.source_id is distinct from old.source_id then
    raise exception using errcode = '23514', message = 'canonical entity identity is immutable';
  end if;
  return new;
end $$;
create trigger entity_records_identity_immutable before update on public.entity_records
  for each row execute function public.prevent_entity_identity_change();

-- Typed rows must point to the expected canonical section and entity type.
create or replace function public.validate_typed_entity()
returns trigger language plpgsql security invoker set search_path = pg_catalog, public as $$
begin
  if not exists (
    select 1 from public.entity_records r
    join public.sections s on s.id = r.section_id
    where r.user_id = new.user_id and r.id = new.entity_id
      and s.key = tg_argv[0] and r.entity_type = tg_argv[1]
  ) then
    raise exception using
      errcode = '23514',
      message = format('entity % does not belong to section % and type %', new.entity_id, tg_argv[0], tg_argv[1]);
  end if;
  return new;
end $$;
create trigger tasks_validate_entity before insert or update on public.tasks for each row execute function public.validate_typed_entity('tasks','task');
create trigger events_validate_entity before insert or update on public.events for each row execute function public.validate_typed_entity('calendar','event');
create trigger workouts_validate_entity before insert or update on public.workouts for each row execute function public.validate_typed_entity('health','workout');
create trigger health_measurements_validate_entity before insert or update on public.health_measurements for each row execute function public.validate_typed_entity('health','health_measurement');
create trigger finance_transactions_validate_entity before insert or update on public.finance_transactions for each row execute function public.validate_typed_entity('finance','finance_transaction');

-- Composite foreign keys below enforce endpoint ownership and prevent cross-account links.

-- Seed the initial catalog. Idempotent so this migration is safe to replay in a clean environment.
insert into public.sections (key, name, version, schema, active) values
  ('tasks', 'Tasks', 1, '{"entityTypes":["task"]}'::jsonb, true),
  ('calendar', 'Calendar', 1, '{"entityTypes":["event"]}'::jsonb, true),
  ('health', 'Health', 1, '{"entityTypes":["workout","health_measurement"]}'::jsonb, true),
  ('finance', 'Finance', 1, '{"entityTypes":["finance_transaction"]}'::jsonb, true)
on conflict (key) do update set name = excluded.name, version = excluded.version,
  schema = excluded.schema, active = excluded.active;

create index if not exists section_permissions_section_idx
  on public.section_permissions(section_id, user_id);
create index if not exists tasks_owner_due_idx
  on public.tasks(user_id, due_at) where status <> 'done' and status <> 'cancelled';
create index if not exists events_owner_start_idx
  on public.events(user_id, starts_at);
create index if not exists workouts_owner_time_idx
  on public.workouts(user_id, performed_at desc);
create index if not exists health_measurements_owner_time_idx
  on public.health_measurements(user_id, measured_at desc);
create index if not exists finance_transactions_owner_time_idx
  on public.finance_transactions(user_id, occurred_at desc);

-- RLS: every user-owned table is isolated by auth.uid(). Catalog is readable to signed-in users.
alter table public.profiles enable row level security;
alter table public.sections enable row level security;
alter table public.section_permissions enable row level security;
alter table public.entity_records enable row level security;
alter table public.entity_links enable row level security;
alter table public.time_blocks enable row level security;
alter table public.tasks enable row level security;
alter table public.events enable row level security;
alter table public.workouts enable row level security;
alter table public.health_measurements enable row level security;
alter table public.finance_transactions enable row level security;
alter table public.finance_entries enable row level security;

create policy profiles_owner on public.profiles for all to authenticated using ((select auth.uid())=user_id) with check ((select auth.uid())=user_id);
create policy sections_read on public.sections for select to authenticated using (active);
create policy permissions_owner on public.section_permissions for all to authenticated using ((select auth.uid())=user_id) with check ((select auth.uid())=user_id);
create policy entity_records_owner on public.entity_records for all to authenticated using ((select auth.uid())=user_id) with check ((select auth.uid())=user_id);
create policy entity_links_owner on public.entity_links for all to authenticated using ((select auth.uid())=user_id) with check ((select auth.uid())=user_id);
create policy time_blocks_owner on public.time_blocks for all to authenticated using ((select auth.uid())=user_id) with check ((select auth.uid())=user_id);
create policy tasks_owner on public.tasks for all to authenticated using ((select auth.uid())=user_id) with check ((select auth.uid())=user_id);
create policy events_owner on public.events for all to authenticated using ((select auth.uid())=user_id) with check ((select auth.uid())=user_id);
create policy workouts_owner on public.workouts for all to authenticated using ((select auth.uid())=user_id) with check ((select auth.uid())=user_id);
create policy health_owner on public.health_measurements for all to authenticated using ((select auth.uid())=user_id) with check ((select auth.uid())=user_id);
create policy finance_tx_owner on public.finance_transactions for all to authenticated using ((select auth.uid())=user_id) with check ((select auth.uid())=user_id);
create policy finance_entries_owner on public.finance_entries for all to authenticated using ((select auth.uid())=user_id) with check ((select auth.uid())=user_id);


-- Expose only these Life OS tables through the Data API. RLS remains the row boundary.
grant usage on schema public to authenticated;
grant select, insert, update, delete on table
  public.profiles, public.section_permissions, public.entity_records,
  public.entity_links, public.time_blocks, public.tasks, public.events,
  public.workouts, public.health_measurements, public.finance_transactions,
  public.finance_entries to authenticated;
grant select on table public.sections to authenticated;
revoke all on table
  public.profiles, public.sections, public.section_permissions, public.entity_records,
  public.entity_links, public.time_blocks, public.tasks, public.events,
  public.workouts, public.health_measurements, public.finance_transactions,
  public.finance_entries from anon;
revoke all on function public.assert_balanced_finance_transaction() from public, anon, authenticated;
revoke all on function public.assert_finance_header_balanced() from public, anon, authenticated;
revoke all on function public.prevent_entity_identity_change() from public, anon, authenticated;
revoke all on function public.set_updated_at() from public, anon, authenticated;
revoke all on function public.validate_typed_entity() from public, anon, authenticated;
