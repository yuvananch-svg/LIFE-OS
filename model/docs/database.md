# LIFE OS database model

สถานะฐานข้อมูลจริง ณ 2026-09-22: foundation ถูก deploy บน Supabase แล้วเป็น 2 migrations (baseline และ typed-entity error-message fix), มี 12 ตารางใน `public`, และชุดทดสอบ RLS/integrity 5 ชุดผ่านทั้งหมด

`entity_records` is the canonical index for all user-owned concepts. Every section creates an entity type and stable `source_id` there and may add a typed table (for validation and query performance) whose row has a unique `entity_id`. `entity_links` is the only cross-section relationship mechanism: both endpoints are canonical entity IDs, and composite foreign keys plus RLS require the same owner. This prevents arbitrary polymorphic table names and cross-account links.

## Core flow

A native LIFE OS row uses its canonical UUID string as `source_id`; an imported row uses the source system's stable ID (scoped by section, entity type, and user). The unique constraint prevents duplicate ingestion.

1. Register a section through a privileged migration. The baseline seeds `tasks`, `calendar`, `health`, and `finance`; authenticated clients have read-only catalog access.
2. Grant a user access in `section_permissions`.
3. Insert one `entity_records` row with that section and entity type.
4. Insert the typed row (task, event, workout, health measurement, or finance transaction) in the same transaction.
5. Connect concepts with `entity_links` (`supports`, `derived_from`, `scheduled_for`, etc.).

All user tables use owner-only `auth.uid()` RLS. `entity_links` uses composite foreign keys `(user_id, entity_id)`, so even a caller who knows another user's UUID cannot create a link to it. The same owner invariant applies to typed tables and time blocks. Typed-row triggers also require the canonical section/entity type expected by each typed table. Canonical `user_id`, `section_id`, `entity_type`, and `source_id` are immutable after creation. `section_permissions` is an explicit user consent/catalog table. It is owner-editable by design; the AI service must check it before reading or writing section data. It does not replace owner RLS.

Finance uses double-entry `finance_entries`; every entry has the transaction currency through a composite foreign key. Deferred constraint triggers on both the transaction header and entries reject a commit unless the transaction has at least two entries and their amounts sum to zero. The default currency is THB; callers may provide another three-letter ISO currency code. Create the canonical entity, transaction header, and all entries atomically in one database transaction.

## Deployed foundation

The 12 initial tables are `profiles`, `sections`, `section_permissions`, `entity_records`, `entity_links`, `time_blocks`, `tasks`, `events`, `workouts`, `health_measurements`, `finance_transactions`, and `finance_entries`.

- `profiles.timezone` defaults to `Asia/Bangkok`.
- `profiles.updated_at` and `entity_records.updated_at` are maintained by triggers.
- `time_blocks.status` accepts `planned` or `cancelled`; adapters map persisted blocks to the shared contract.
- `anon` has no table access. `authenticated` receives explicit CRUD grants only on user-owned Life OS tables and SELECT on `sections`; RLS remains the row boundary.
- The database was verified with owner A, owner B, unauthenticated access, cross-owner links/children, typed identity, time constraints, and finance invariants. Test fixtures were rolled back.

## Extending a new section

Add a catalog row in a migration, define its entity type and payload schema, then create a typed table with `user_id` and unique `entity_id`, enable RLS, add the owner policy, and add a typed-entity validation trigger. Do not add a new link table: use `entity_links`. If the section needs temporal planning, reference `time_blocks.entity_id`; if it needs relationships to any other section, link canonical IDs. Add indexes based on measured query patterns. Every new migration must grant/revoke its objects explicitly because project default privileges are permissive.
