import {
  startOfDay,
  endOfDay,
  startOfMonth,
  endOfMonth,
  isBefore,
  isAfter,
} from 'date-fns';

/** Parse API date strings as local calendar dates (avoids UTC date-only shifts). */
export function parseEventDate(value) {
  if (!value) return null;
  if (value instanceof Date) return value;

  const str = String(value);
  const dateOnly = str.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (dateOnly) {
    return new Date(Number(dateOnly[1]), Number(dateOnly[2]) - 1, Number(dateOnly[3]));
  }

  const parsed = new Date(str);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

export function toReferenceDate(now = new Date()) {
  return typeof now === 'string' ? new Date(now) : now;
}

export function getEventId(event) {
  return event?._id || event?.id || event?.slug || '';
}

export function isEventPast(event, now = new Date()) {
  const end = parseEventDate(event?.endDate);
  if (!end) return false;
  const ref = toReferenceDate(now);
  return isBefore(endOfDay(end), startOfDay(ref));
}

export function isEventUpcoming(event, now = new Date()) {
  if (!event?.endDate) return true;
  return !isEventPast(event, now);
}

/** Unique events overlapping a given calendar month */
export function countEventsInMonth(events = [], monthDate = new Date()) {
  const monthStart = startOfMonth(monthDate);
  const monthEnd = endOfMonth(monthDate);
  const ids = new Set();

  for (const event of events) {
    const eventStart = parseEventDate(event?.startDate);
    const eventEnd = parseEventDate(event?.endDate);
    if (!eventStart || !eventEnd) continue;
    if (isAfter(startOfDay(eventStart), monthEnd) || isBefore(endOfDay(eventEnd), monthStart)) {
      continue;
    }
    ids.add(getEventId(event));
  }

  return ids.size;
}

/** Events that overlap a given calendar month */
export function filterEventsInMonth(events = [], monthDate = new Date()) {
  const monthStart = startOfMonth(monthDate);
  const monthEnd = endOfMonth(monthDate);
  const seen = new Set();

  return events.filter((event) => {
    const eventStart = parseEventDate(event?.startDate);
    const eventEnd = parseEventDate(event?.endDate);
    if (!eventStart || !eventEnd) return false;
    if (isAfter(startOfDay(eventStart), monthEnd) || isBefore(endOfDay(eventEnd), monthStart)) {
      return false;
    }
    const id = getEventId(event);
    if (seen.has(id)) return false;
    seen.add(id);
    return true;
  });
}
