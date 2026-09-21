/**
 * Cross-section domain contracts.  Sections are data providers; the core never
 * contains a branch for a particular section (health, finance, etc.).
 */

export type SectionId = string;

export interface CanonicalIdentity {
  section: SectionId;
  entityType: string;
  /** Source system identifier; stable within the section. */
  sourceId: string;
  /** Optional internal canonical ID assigned after normalization. */
  entityId?: string;
}

export interface OwnedRecord {
  identity: CanonicalIdentity;
  ownerUserId: string;
  createdAt: string;
  updatedAt: string;
}

export type FactValue = string | number | boolean | null | string[];

export interface TypedFact extends OwnedRecord {
  kind: "fact";
  key: string;
  value: FactValue;
  valueType: "string" | "number" | "boolean" | "date" | "datetime" | "duration" | "string[]" | "null";
  observedAt?: string;
  source?: string;
  tags?: string[];
}

export interface Metric extends OwnedRecord {
  kind: "metric";
  metric: string;
  value: number;
  unit: string;
  periodStart: string;
  periodEnd: string;
  dimensions?: Record<string, string>;
}

export interface TimeBlock extends OwnedRecord {
  kind: "time_block";
  startsAt: string;
  endsAt: string;
  label?: string;
  status: "busy" | "tentative" | "available";
  source?: string;
}

export interface AuthorizationScope {
  userId: string;
  /** Explicit allow-list. A missing section is denied by default. */
  sections: Record<SectionId, { read: boolean; write?: boolean; fields?: string[] }>;
}

export interface SectionCapability {
  section: SectionId;
  version: string;
  factKeys?: string[];
  metricNames?: string[];
  entityTypes?: string[];
  /** Provider may return facts, metrics and/or blocks; the core treats them uniformly. */
  read: (request: SectionReadRequest) => Promise<SectionPayload> | SectionPayload;
}

export interface SectionReadRequest {
  userId: string;
  from?: string;
  to?: string;
  entityTypes?: string[];
  limit?: number;
}

export interface SectionPayload {
  facts?: TypedFact[];
  metrics?: Metric[];
  timeBlocks?: TimeBlock[];
}

export interface QueryRequest extends SectionReadRequest {
  sections: SectionId[];
  keys?: string[];
  metricNames?: string[];
}

export interface QueryResult extends SectionPayload {
  errors: Array<{ section: SectionId; message: string }>;
}

export class SectionRegistry {
  private readonly capabilities = new Map<SectionId, SectionCapability>();

  register(capability: SectionCapability): void {
    if (!capability.section || !capability.version || !capability.read) throw new Error("Invalid section capability");
    this.capabilities.set(capability.section, capability);
  }

  get(section: SectionId): SectionCapability | undefined { return this.capabilities.get(section); }
  list(): SectionCapability[] { return [...this.capabilities.values()].sort((a, b) => a.section.localeCompare(b.section)); }
}

function allowed(scope: AuthorizationScope, section: string): boolean {
  return scope.sections[section]?.read === true;
}

function filterFields(facts: TypedFact[], scope: AuthorizationScope): TypedFact[] {
  return facts.filter((f) => {
    const fields = scope.sections[f.identity.section]?.fields;
    return !fields || fields.includes(f.key);
  });
}
function visible(scope: AuthorizationScope, section: string, field: string): boolean {
  const fields = scope.sections[section]?.fields;
  return !fields || fields.includes(field);
}
function validInterval(start: string, end: string): boolean {
  const a = time(start), b = time(end);
  return Number.isFinite(a) && Number.isFinite(b) && a < b;
}

/**
 * Read-only fan-out. Every section read is authorized against the requesting
 * user before invocation. Providers expose typed payloads only: this layer has
 * no arbitrary SQL, model-generated SQL, or section-pair branches.
 */
export async function querySections(registry: SectionRegistry, request: QueryRequest, scope: AuthorizationScope): Promise<QueryResult> {
  if (scope.userId !== request.userId) throw new Error("Authorization user mismatch");
  if ((request.from && !Number.isFinite(time(request.from))) || (request.to && !Number.isFinite(time(request.to))) || (request.from && request.to && !validInterval(request.from, request.to))) throw new Error("Invalid query window");
  if (request.limit !== undefined && (!Number.isFinite(request.limit) || request.limit < 0)) throw new Error("Invalid query limit");
  const sections = [...new Set(request.sections)].filter((s) => allowed(scope, s));
  const denied = [...new Set(request.sections)].filter((s) => !allowed(scope, s));
  const results = await Promise.all(sections.map(async (section) => {
    const capability = registry.get(section);
    if (!capability) return { section, error: "Section is not registered" };
    try { return { section, payload: await capability.read(request) }; }
    catch (e) { return { section, error: e instanceof Error ? e.message : "Section read failed" }; }
  }));
  const facts: TypedFact[] = [], metrics: Metric[] = [], timeBlocks: TimeBlock[] = [];
  const errors = denied.map((section) => ({ section, message: "Read access denied" }));
  for (const result of results) {
    if ("error" in result) { errors.push({ section: result.section, message: result.error }); continue; }
    // Provider output is untrusted: enforce ownership and section provenance at
    // the boundary before any cross-section operation can see it.
    facts.push(...(result.payload.facts ?? []).filter((f) => f.ownerUserId === request.userId && f.identity.section === result.section));
    metrics.push(...(result.payload.metrics ?? []).filter((m) => m.ownerUserId === request.userId && m.identity.section === result.section));
    timeBlocks.push(...(result.payload.timeBlocks ?? []).filter((b) => b.ownerUserId === request.userId && b.identity.section === result.section && validInterval(b.startsAt, b.endsAt)));
  }
  const boundedBlocks = timeBlocks.filter((b) => visible(scope, b.identity.section, "time_block") && (!request.from || time(b.endsAt) > time(request.from)) && (!request.to || time(b.startsAt) < time(request.to)));
  const boundedMetrics = metrics.filter((m) => visible(scope, m.identity.section, m.metric) && (!request.metricNames || request.metricNames.includes(m.metric)) && (!request.from || time(m.periodEnd) > time(request.from)) && (!request.to || time(m.periodStart) < time(request.to)));
  const boundedFacts = filterFields(facts, scope).filter((f) => (!request.keys || request.keys.includes(f.key)) && (!f.observedAt || ((!request.from || time(f.observedAt) >= time(request.from)) && (!request.to || time(f.observedAt) <= time(request.to)))));
  const limit = request.limit === undefined ? undefined : Math.max(0, Math.floor(request.limit));
  // `limit` is applied independently to each typed payload collection.
  return { facts: boundedFacts.slice(0, limit), metrics: boundedMetrics.slice(0, limit), timeBlocks: boundedBlocks.slice(0, limit), errors };
}

export interface Conflict { left: TimeBlock; right: TimeBlock; overlapStart: string; overlapEnd: string; }
const time = (x: string) => Date.parse(x);

/** Deterministic interval conflict calculation across any registered section. */
export function findConflicts(blocks: TimeBlock[]): Conflict[] {
  if (blocks.some((b) => !b.ownerUserId || !validInterval(b.startsAt, b.endsAt))) throw new Error("Invalid or incomplete time block");
  const owners = new Set(blocks.map((b) => b.ownerUserId));
  if (owners.size > 1) throw new Error("Cannot calculate conflicts across users");
  const sorted = blocks.filter((b) => b.status !== "available").sort((a, b) => time(a.startsAt) - time(b.startsAt));
  const conflicts: Conflict[] = [];
  for (let i = 0; i < sorted.length; i++) for (let j = i + 1; j < sorted.length; j++) {
    if (time(sorted[j].startsAt) >= time(sorted[i].endsAt)) break;
    const start = Math.max(time(sorted[i].startsAt), time(sorted[j].startsAt));
    const end = Math.min(time(sorted[i].endsAt), time(sorted[j].endsAt));
    if (start < end) conflicts.push({ left: sorted[i], right: sorted[j], overlapStart: new Date(start).toISOString(), overlapEnd: new Date(end).toISOString() });
  }
  return conflicts;
}

export function availableSlots(blocks: TimeBlock[], from: string, to: string, minimumMinutes = 30): Array<{ startsAt: string; endsAt: string }> {
  const start = time(from), end = time(to);
  if (!validInterval(from, to)) throw new Error("Invalid availability window");
  if (!Number.isFinite(minimumMinutes) || minimumMinutes <= 0) throw new Error("Minimum duration must be positive");
  if (blocks.some((b) => !b.ownerUserId || !validInterval(b.startsAt, b.endsAt))) throw new Error("Invalid or incomplete time block");
  if (new Set(blocks.map((b) => b.ownerUserId)).size > 1) throw new Error("Cannot calculate availability across users");
  const busy = blocks.filter((b) => b.status !== "available").map((b) => [Math.max(start, time(b.startsAt)), Math.min(end, time(b.endsAt))] as [number, number]).filter(([a, b]) => a < b).sort((a, b) => a[0] - b[0]);
  const merged: Array<[number, number]> = [];
  for (const interval of busy) { const last = merged[merged.length - 1]; if (last && interval[0] <= last[1]) last[1] = Math.max(last[1], interval[1]); else merged.push(interval); }
  const result: Array<{ startsAt: string; endsAt: string }> = []; let cursor = start;
  for (const [a, b] of merged) { if (a - cursor >= minimumMinutes * 60000) result.push({ startsAt: new Date(cursor).toISOString(), endsAt: new Date(a).toISOString() }); cursor = Math.max(cursor, b); }
  if (end - cursor >= minimumMinutes * 60000) result.push({ startsAt: new Date(cursor).toISOString(), endsAt: new Date(end).toISOString() });
  return result;
}
