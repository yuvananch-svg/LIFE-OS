# Supabase MCP test chunks

Run the five SQL files in numeric order as separate Supabase `execute_sql` calls after both migrations in `supabase/migrations` are applied.

Each file is self-contained, stays below 4,000 bytes, creates fixed test users and records inside one transaction, and finishes with `ROLLBACK`. A successful call returns one row whose `result` value ends in `passed`.

| File | Coverage |
|---|---|
| `01_rls_crud.sql` | A/B ownership, CRUD, cross-user reads/writes |
| `02a_links_typed.sql` | owner and cross-owner links and typed records |
| `02b_identity_time.sql` | wrong section, immutable identity, time checks |
| `03_finance_access.sql` | balanced ledger, owner access, cross-owner and anon denial |
| `04_finance_invariants.sql` | empty and unbalanced ledger rejection |

Stop on the first SQL error or a missing success row. Because every call rolls back, neither successful nor failed tests should leave fixture rows behind.
