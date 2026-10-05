import { describe, expect, it } from "vitest";
import { availableSlots, findConflicts, querySections, SectionRegistry, type TimeBlock } from "./index";

const block = (section: string, id: string, start: string, end: string): TimeBlock => ({ kind: "time_block", identity: { section, entityType: "event", sourceId: id }, ownerUserId: "u1", createdAt: start, updatedAt: start, startsAt: start, endsAt: end, status: "busy" });

const a = block("calendar", "a", "2026-01-01T10:00:00Z", "2026-01-01T11:00:00Z");
const b = block("health", "b", "2026-01-01T10:30:00Z", "2026-01-01T11:30:00Z");

describe("cross-section contracts", () => {
  it("detects conflicts across sections", () => {
    expect(findConflicts([a, b])).toHaveLength(1);
  });

  it("treats touching interval boundaries as non-overlapping", () => {
    const next = block("calendar", "next", "2026-01-01T11:00:00Z", "2026-01-01T12:00:00Z");
    expect(findConflicts([a, next])).toHaveLength(0);
  });

  it("finds available slots around busy time", () => {
    expect(availableSlots([a], "2026-01-01T09:00:00Z", "2026-01-01T12:00:00Z")).toEqual([
      { startsAt: "2026-01-01T09:00:00.000Z", endsAt: "2026-01-01T10:00:00.000Z" },
      { startsAt: "2026-01-01T11:00:00.000Z", endsAt: "2026-01-01T12:00:00.000Z" }
    ]);
  });

  it("fans out to registered authorized section providers", async () => {
    const registry = new SectionRegistry();
    registry.register({ section: "calendar", version: "1", read: () => ({ timeBlocks: [a] }) });
    registry.register({ section: "health", version: "1", read: () => ({ timeBlocks: [b], facts: [] }) });
    const result = await querySections(registry, { userId: "u1", sections: ["calendar", "health"] }, { userId: "u1", sections: { calendar: { read: true }, health: { read: true } } });
    expect(result.timeBlocks).toHaveLength(2);
    expect(result.errors).toHaveLength(0);
  });

  it("rejects cross-owner provider payloads", async () => {
    const malicious = new SectionRegistry();
    malicious.register({ section: "calendar", version: "1", read: () => ({
      timeBlocks: [a, { ...b, identity: { ...b.identity, section: "calendar" }, ownerUserId: "attacker" }],
      metrics: [{ kind: "metric", identity: { section: "calendar", entityType: "secret", sourceId: "x" }, ownerUserId: "attacker", createdAt: "2026-01-01T00:00:00Z", updatedAt: "2026-01-01T00:00:00Z", metric: "secret", value: 1, unit: "x", periodStart: "2026-01-01T00:00:00Z", periodEnd: "2026-01-02T00:00:00Z" }]
    }) });
    const safe = await querySections(malicious, { userId: "u1", sections: ["calendar"] }, { userId: "u1", sections: { calendar: { read: true } } });
    expect(safe.timeBlocks).toHaveLength(1);
    expect(safe.metrics).toHaveLength(0);
  });

  it("rejects conflict calculations across owners", () => {
    expect(() => findConflicts([a, { ...b, ownerUserId: "u2" }])).toThrow("users");
  });

  it("reports revoked section permission", async () => {
    const registry = new SectionRegistry();
    registry.register({ section: "calendar", version: "1", read: () => ({ timeBlocks: [a] }) });
    registry.register({ section: "health", version: "1", read: () => ({ timeBlocks: [b] }) });
    const result = await querySections(registry, { userId: "u1", sections: ["calendar", "health"] }, { userId: "u1", sections: { calendar: { read: true } } });
    expect(result.errors).toEqual([{ section: "health", message: "Read access denied" }]);
  });

  it("includes blocks overlapping the query window and honors its per-collection limit", async () => {
    const registry = new SectionRegistry();
    const overlapping = block("calendar", "overlapping", "2026-01-01T10:15:00Z", "2026-01-01T10:45:00Z");
    registry.register({ section: "calendar", version: "1", read: () => ({ timeBlocks: [a, overlapping] }) });
    const result = await querySections(registry, { userId: "u1", sections: ["calendar"], from: "2026-01-01T10:30:00Z", to: "2026-01-01T11:30:00Z", limit: 1 }, { userId: "u1", sections: { calendar: { read: true } } });
    expect(result.timeBlocks).toHaveLength(1);
  });

  it("excludes blocks outside the query window", async () => {
    const registry = new SectionRegistry();
    registry.register({ section: "calendar", version: "1", read: () => ({ timeBlocks: [a] }) });
    const result = await querySections(registry, { userId: "u1", sections: ["calendar"], from: "2026-01-01T11:00:01Z", to: "2026-01-01T12:00:00Z", limit: 1 }, { userId: "u1", sections: { calendar: { read: true } } });
    expect(result.timeBlocks).toHaveLength(0);
  });

  it("rejects an invalid availability window", () => {
    expect(() => availableSlots([a], "2026-01-01T12:00:00Z", "2026-01-01T11:00:00Z")).toThrow("window");
  });

  it("rejects a non-positive minimum slot duration", () => {
    expect(() => availableSlots([a], "2026-01-01T09:00:00Z", "2026-01-01T12:00:00Z", 0)).toThrow("positive");
  });
});
