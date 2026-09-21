# LIFE OS database model

`entity_records` is the canonical index for all user-owned concepts. Every section creates an entity type and stable `source_id` there and may add a typed table (for validation and query performance) whose row has a unique `entity_id`. `entity_links` is the only cross-section relationship mechanism: both endpoints are canonical entity IDs, and composite foreign keys plus RLS require the same owner. This prevents arbitrary polymorphic table names and cross-account links.

## Core flow

A native LIFE OS row uses its canonical UUID string as `source_id`; an imported row uses the source system's stable ID (scoped by section, entity type, and user). The unique constraint prevents duplicate ingestion.

1. Register a section in `sections` with a stable key and JSON schema metadata.
2. Grant a user access in `section_permissions`.
3. Insert one `entity_records` row with that section and entity type.
4. Insert the typed row (task, event, workout, health measurement, or finance transaction) in the same transaction.
5. Connect concepts with `entity_links` (`supports`, `derived_from`, `scheduled_for`, etc.).

All user tables use `auth.uid()` RLS. `entity_links` uses composite foreign keys `(user_id, entity_id)`, so even a caller who knows another user's UUID cannot create a link to it. The same invariant applies to typed tables and time blocks. `section_permissions` is an explicit user consent/catalog table. It is owner-editable by design; the AI service must check it before reading or writing section data. If direct client section authorization is required later, replace the broad entity policies with policies joining this table.

Finance uses double-entry `finance_entries`; every entry has the transaction currency through a composite foreign key, and a deferred constraint trigger rejects a commit unless each transaction currency's amounts (the Thai default is THB; callers may provide another ISO 4217 code) sum to zero. Create the transaction and all entries atomically in one database transaction.

## Extending a new section

Add a catalog row, define its entity type and payload schema, then create a typed table with `user_id` and unique `entity_id`, enable RLS, and add the owner policy. Do not add a new link table: use `entity_links`. If the section needs temporal planning, reference `time_blocks.entity_id`; if it needs relationships to any other section, link canonical IDs. Add indexes based on the typed table's query patterns and preserve the invariant that every typed row and its canonical row share the same `user_id` by using the composite foreign key `(user_id, entity_id)` shown in the migration.
