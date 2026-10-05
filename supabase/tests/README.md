# Supabase MCP test chunks

These are manual database integration tests, not part of `npm test`/Vitest. The current inventory is six SQL test files and five migrations. Run the SQL tests in the order below as separate Supabase `execute_sql` calls only against an explicitly selected test project after all five migrations in `supabase/migrations` are applied. This repository task does not execute them against a remote database.

Each file is self-contained, stays below 4,000 bytes, creates fixed test users and records inside one transaction, and finishes with `ROLLBACK`. A successful call returns one row whose `result` value ends in `passed`.

| File | Coverage |
|---|---|
| `01_rls_crud.sql` | A/B ownership, CRUD, cross-user reads/writes |
| `02a_links_typed.sql` | owner and cross-owner links and typed records |
| `02b_identity_time.sql` | wrong section, immutable identity, time checks |
| `03_finance_access.sql` | balanced ledger, owner access, cross-owner and anon denial |
| `04_finance_invariants.sql` | empty and unbalanced ledger rejection |
| `profile_rls.sql` | profile ownership and row-level security |

Stop on the first SQL error or a missing success row. Because every call rolls back, neither successful nor failed tests should leave fixture rows behind. The SQL files currently require manual execution; passing unit tests do not imply that database migrations or these SQL cases passed.

Migration inventory (five files): `20260922032016_life_os_core_baseline.sql`, `20260922084905_fix_typed_entity_validation_message.sql`, `20260922092436_profile_defaults_and_backfill.sql`, `20260922092639_profile_timezone_hardening.sql`, and `20260922092948_profile_trigger_truncate.sql`.
