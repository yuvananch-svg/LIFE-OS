export type DateContext = { timezone: string; locale: string };

export function localDateKey(instant: Date, timezone: string): string {
  const parts = new Intl.DateTimeFormat('en-CA', { timeZone: timezone, year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(instant);
  const part = (type: Intl.DateTimeFormatPartTypes) => parts.find((item) => item.type === type)?.value;
  const year = part('year'); const month = part('month'); const day = part('day');
  if (!year || !month || !day) throw new RangeError('Unable to resolve calendar date for timezone');
  return `${year}-${month}-${day}`;
}

/** Shared day labels for profile-aware Today and tomorrow views. */
export function profileDayLabels(now: Date, context: DateContext) {
  const today = localDateKey(now, context.timezone);
  const [year, month, day] = today.split('-').map(Number);
  const nextDate = new Date(Date.UTC(year, month - 1, day + 1, 12));
  const tomorrow = `${nextDate.getUTCFullYear()}-${String(nextDate.getUTCMonth() + 1).padStart(2, '0')}-${String(nextDate.getUTCDate()).padStart(2, '0')}`;
  return { today, tomorrow, locale: context.locale, timezone: context.timezone };
}
