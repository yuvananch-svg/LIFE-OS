import { availableSlots, findConflicts, querySections, SectionRegistry, type TimeBlock } from "./index";

const block = (section: string, id: string, start: string, end: string): TimeBlock => ({ kind: "time_block", identity: { section, entityType: "event", sourceId: id }, ownerUserId: "u1", createdAt: start, updatedAt: start, startsAt: start, endsAt: end, status: "busy" });

const a = block("calendar", "a", "2026-01-01T10:00:00Z", "2026-01-01T11:00:00Z");
const b = block("health", "b", "2026-01-01T10:30:00Z", "2026-01-01T11:30:00Z");
if (findConflicts([a, b]).length !== 1) throw new Error("cross-section conflicts must be detected");
if (availableSlots([a], "2026-01-01T09:00:00Z", "2026-01-01T12:00:00Z").length !== 2) throw new Error("availability calculation failed");

const registry = new SectionRegistry();
registry.register({ section: "calendar", version: "1", read: () => ({ timeBlocks: [a] }) });
registry.register({ section: "health", version: "1", read: () => ({ timeBlocks: [b], facts: [] }) });
const result = await querySections(registry, { userId: "u1", sections: ["calendar", "health"] }, { userId: "u1", sections: { calendar: { read: true }, health: { read: true } } });
if (result.timeBlocks?.length !== 2 || result.errors.length) throw new Error("generic section fan-out failed");

const malicious = new SectionRegistry();
malicious.register({ section: "calendar", version: "1", read: () => ({
  timeBlocks: [a, { ...b, identity: { ...b.identity, section: "calendar" }, ownerUserId: "attacker" }],
  metrics: [{ kind: "metric", identity: { section: "calendar", entityType: "secret", sourceId: "x" }, ownerUserId: "attacker", createdAt: "2026-01-01T00:00:00Z", updatedAt: "2026-01-01T00:00:00Z", metric: "secret", value: 1, unit: "x", periodStart: "2026-01-01T00:00:00Z", periodEnd: "2026-01-02T00:00:00Z" }]
}) });
const safe = await querySections(malicious, { userId: "u1", sections: ["calendar"] }, { userId: "u1", sections: { calendar: { read: true } } });
if (safe.timeBlocks?.length !== 1 || safe.metrics?.length !== 0) throw new Error("provider cross-owner payload leaked");
try { findConflicts([a, { ...b, ownerUserId: "u2" }]); throw new Error("mixed owners accepted"); } catch (e) { if (!(e instanceof Error) || !e.message.includes("users")) throw e; }
const revoked = await querySections(registry, { userId: "u1", sections: ["calendar", "health"] }, { userId: "u1", sections: { calendar: { read: true } } });
if (revoked.errors.length !== 1 || revoked.errors[0].message !== "Read access denied") throw new Error("permission revocation ignored");
const bounded = await querySections(registry, { userId: "u1", sections: ["calendar"], from: "2026-01-01T10:30:00Z", to: "2026-01-01T11:30:00Z", limit: 1 }, { userId: "u1", sections: { calendar: { read: true } } });
if (bounded.timeBlocks?.length !== 1) throw new Error("overlapping block was incorrectly excluded");
const excluded = await querySections(registry, { userId: "u1", sections: ["calendar"], from: "2026-01-01T11:00:01Z", to: "2026-01-01T12:00:00Z", limit: 1 }, { userId: "u1", sections: { calendar: { read: true } } });
if (excluded.timeBlocks?.length !== 0) throw new Error("outside-range payload leaked");
try { availableSlots([a], "2026-01-01T12:00:00Z", "2026-01-01T11:00:00Z"); throw new Error("invalid window accepted"); } catch (e) { if (!(e instanceof Error) || !e.message.includes("window")) throw e; }
try { availableSlots([a], "2026-01-01T09:00:00Z", "2026-01-01T12:00:00Z", 0); throw new Error("invalid minimum accepted"); } catch (e) { if (!(e instanceof Error) || !e.message.includes("positive")) throw e; }
