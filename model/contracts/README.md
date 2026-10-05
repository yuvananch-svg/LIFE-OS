# Cross-section contracts

`index.ts` is the implemented TypeScript boundary for provider-neutral section reads and time calculations. A section registers one `SectionCapability`; the registry and query path never branch on section names. Records carry `(section, entityType, sourceId)` plus an optional canonical `entityId`, and are owned by `ownerUserId`. These are TypeScript interfaces and runtime functions; this package does not currently define or generate runtime validation schemas.

`querySections` requires a matching user ID and an explicit per-section read grant. Field and key allow-lists are applied after provider reads. Providers return typed facts, metrics, and time blocks; arbitrary SQL and model-generated SQL are deliberately outside this contract.

Conflict and availability functions are deterministic and operate over blocks from any number of sections. Vitest executes the registry authorization/filtering, cross-owner rejection, conflict, and availability coverage in `index.test.ts` with `npm test`. The root TypeScript check also includes this directory with `npm run typecheck`.

These contracts do not implement Voice Capture, recording, transcription, AI interpretation, write commands, or persistence. Those remain planned work in phases 3–4; the shared capture provider is lifecycle scaffolding only until the real pipeline is implemented and tested. The provider-neutral contracts can support a basic phase-4 gateway, while broader cross-section AI context and insight behavior remain phase 8 work.
