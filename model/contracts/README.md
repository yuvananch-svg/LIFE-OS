# Cross-section contracts

`index.ts` is the provider-neutral boundary for every Life OS section. A section registers one `SectionCapability`; the registry and query path never branch on section names. Records carry `(section, entityType, sourceId)` plus an optional canonical `entityId`, and are owned by `ownerUserId`.

`querySections` requires a matching user ID and an explicit per-section read grant. Field and key allow-lists are applied after provider reads. Providers return typed facts, metrics, and time blocks; arbitrary SQL and model-generated SQL are deliberately outside this contract.

Conflict and availability functions are deterministic and operate over blocks from any number of sections. A minimal smoke test is included in `index.test.ts`; run with a TypeScript runtime such as `npx tsx model/contracts/index.test.ts` (or compile with `tsc --noEmit` in the host project).
