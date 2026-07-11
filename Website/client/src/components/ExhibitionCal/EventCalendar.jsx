"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, CalendarX } from "lucide-react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isToday,
  addMonths,
  subMonths,
  getDay,
  isSameDay,
  startOfDay,
  endOfDay,
  isBefore,
  isAfter,
  addDays,
} from "date-fns";
import { countEventsInMonth, isEventPast, parseEventDate } from "@/lib/eventUtils";

// --- CSS STYLES ---
const styles = `
  :root {
    --cal-bg: #ffffff;
    --cal-text-main: #0f172a;
    --cal-text-muted: #64748b;
    --cal-border: #e2e8f0;
    --cal-grid-line: #f1f5f9;
    --cal-header-bg: #f8fafc;
    --cal-cell-bg: #ffffff;
    --cal-cell-hover: #fafafa;
    --cal-empty-bg: #fcfcfc;
    --cal-btn-bg: #fff;
    --cal-btn-hover: #f8fafc;
    --event-height: 26px;
    --event-gap: 4px;
  }

  /* Dark Mode Variables */
  @media (prefers-color-scheme: dark) {
    :root {
      --cal-bg: #09090b;
      --cal-text-main: #f4f4f5;
      --cal-text-muted: #a1a1aa;
      --cal-border: #27272a;
      --cal-grid-line: #18181b;
      --cal-header-bg: #18181b;
      --cal-cell-bg: #09090b;
      --cal-cell-hover: #18181b;
      --cal-empty-bg: #0a0a0a;
      --cal-btn-bg: #18181b;
      --cal-btn-hover: #27272a;
    }
  }

  .calendar-wrapper {
    color: var(--cal-text-main);
    background: var(--cal-bg);
    border-radius: 24px;
    padding: 32px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
    border: 1px solid var(--cal-border);
    max-width: 1200px;
    margin: 0 auto;
    transition: all 0.3s ease;
  }

  @media (prefers-color-scheme: dark) {
    .calendar-wrapper {
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2);
    }
  }

  /* --- HEADER --- */
  .cal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
  }

  .cal-title-section h2 {
    font-size: 24px;
    font-weight: 700;
    color: var(--cal-text-main);
    margin: 0;
  }
  
  .cal-title-section p {
    font-size: 14px;
    color: var(--cal-text-muted);
    margin-top: 4px;
  }

  .cal-controls { display: flex; gap: 8px; align-items: center; }

  .cal-btn {
    display: flex; align-items: center; justify-content: center;
    padding: 8px 16px; background: var(--cal-btn-bg);
    border: 1px solid var(--cal-border); border-radius: 8px;
    cursor: pointer; font-weight: 600; font-size: 14px;
    color: var(--cal-text-muted);
    transition: all 0.2s;
    box-shadow: 0 1px 2px rgba(0,0,0,0.05);
  }
  .cal-btn:hover { background: var(--cal-btn-hover); border-color: var(--cal-border); color: var(--cal-text-main); }
  .cal-btn:active { transform: translateY(1px); }
  .cal-btn.icon-only { padding: 8px; border-radius: 8px; width: 36px; height: 36px; }

  /* --- GRID --- */
  .cal-grid-container {
    border: 1px solid var(--cal-border);
    border-radius: 16px;
    overflow: hidden;
    background: var(--cal-cell-bg);
    box-shadow: 0 0 0 1px rgba(0,0,0,0.02);
  }

  .cal-weekday-row {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    background: var(--cal-header-bg);
    border-bottom: 1px solid var(--cal-border);
  }

  .cal-weekday {
    padding: 14px; text-align: center; font-size: 12px;
    font-weight: 600; color: var(--cal-text-muted);
    text-transform: uppercase; letter-spacing: 0.05em;
  }

  .cal-days-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    background: var(--cal-grid-line);
    gap: 1px;
    border-bottom: 1px solid var(--cal-grid-line);
  }

  .cal-day-cell {
    background: var(--cal-cell-bg);
    padding: 8px 0;
    min-height: 150px;
    display: flex;
    flex-direction: column;
  }
  
  .cal-day-cell:hover { background: var(--cal-cell-hover); }
  .cal-empty { background: var(--cal-empty-bg); }

  .cal-day-header {
    display: flex; justify-content: flex-end;
    margin-bottom: 6px; padding-right: 12px;
    align-items: center;
  }

  .cal-day-number {
    font-size: 14px; font-weight: 500; color: var(--cal-text-muted);
    width: 28px; height: 28px;
    display: flex; align-items: center; justify-content: center;
    border-radius: 50%;
    transition: all 0.2s;
  }

  .cal-day-cell.is-today .cal-day-number {
    background: #FF6600; color: white;
    font-weight: 700;
    box-shadow: 0 4px 10px rgba(255, 102, 0, 0.35);
  }

  /* --- EVENTS --- */
  .cal-events-list {
    display: flex; flex-direction: column;
    width: 100%;
  }

  .cal-event-wrapper {
    height: var(--event-height);
    margin-bottom: var(--event-gap);
    width: 100%;
    position: relative;
    padding-left: 2px; padding-right: 2px;
  }

  .cal-event-pill {
    height: 100%;
    padding: 0 8px;
    font-size: 11px;
    font-weight: 600;
    color: white;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
    display: flex;
    align-items: center;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    transition: transform 0.1s, box-shadow 0.2s;
  }
  
  .cal-event-pill:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 6px rgba(0,0,0,0.15);
    z-index: 10;
  }
  
  .cal-event-spacer {
    height: var(--event-height);
    margin-bottom: var(--event-gap);
    width: 100%;
    pointer-events: none;
  }

  /* Event Segments (Desktop) */
  .event-single { border-radius: 6px; margin: 0 4px; }
  .event-start {
    border-top-left-radius: 6px; border-bottom-left-radius: 6px;
    margin-left: 4px; margin-right: -4px; z-index: 2;
  }
  .event-middle {
    border-radius: 0; margin-left: -4px; margin-right: -4px; z-index: 1;
    opacity: 0.9;
  }
  .event-end {
    border-top-right-radius: 6px; border-bottom-right-radius: 6px;
    margin-left: -4px; margin-right: 4px; z-index: 2;
  }

  /* Colors */
  .bg-purple { background: linear-gradient(135deg, #8b5cf6, #7c3aed); }
  .bg-cyan { background: linear-gradient(135deg, #06b6d4, #0891b2); }
  .bg-blue { background: linear-gradient(135deg, #3b82f6, #2563eb); }
  .bg-pink { background: linear-gradient(135deg, #ec4899, #db2777); }
  .bg-orange { background: linear-gradient(135deg, #f97316, #ea580c); }
  .bg-emerald { background: linear-gradient(135deg, #10b981, #059669); }

  /* --- MOBILE RESPONSIVENESS --- */
  @media (max-width: 768px) {
    .calendar-wrapper { padding: 16px; border-radius: 16px; }
    
    .cal-header {
      flex-direction: column; align-items: flex-start; gap: 16px;
    }
    .cal-controls { width: 100%; justify-content: space-between; }
    
    /* Transform Grid to List */
    .cal-weekday-row { display: none; } /* Hide Sun/Mon header */
    .cal-days-grid { display: flex; flex-direction: column; gap: 0; }
    .cal-empty { display: none; } /* Hide empty days from prev month */

    .cal-day-cell {
      min-height: auto;
      padding: 16px;
      border-bottom: 1px solid var(--cal-grid-line);
      flex-direction: column;
      align-items: flex-start;
    }

    .cal-day-header {
      width: 100%;
      justify-content: flex-start;
      margin-bottom: 12px;
      padding-right: 0;
    }

    /* Add Day Name next to date on mobile */
    .cal-day-header::after {
      content: attr(data-weekday);
      font-size: 14px;
      color: #64748b;
      font-weight: 600;
      margin-left: 10px;
      text-transform: uppercase;
    }

    /* Reset Event Styles for List View */
    .cal-events-list { gap: 8px; }
    .cal-event-wrapper { height: auto; margin-bottom: 0; padding: 0; }
    .cal-event-spacer { display: none; } /* Hide spacers in list view */
    
    .cal-event-pill {
      height: 32px;
      font-size: 12px;
      width: 100%;
    }

    /* Make all events look like full capsules on mobile */
    .event-start, .event-middle, .event-end, .event-single {
      border-radius: 6px !important;
      margin: 0 !important;
    }
  }
`;

export function EventCalendar({ eventsData = [], onEventClick = () => { }, asOfDate }) {
  const referenceDate = asOfDate || new Date().toISOString();
  const [currentDate, setCurrentDate] = useState(() => new Date());

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const startDayIndex = getDay(monthStart);
  const emptyDays = Array(startDayIndex).fill(null);
  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const getEventColor = (id) => {
    const colors = [
      "bg-purple",
      "bg-blue",
      "bg-orange",
      "bg-cyan",
      "bg-pink",
      "bg-emerald",
    ];
    const hash =
      typeof id === "string"
        ? id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
        : id;
    return colors[hash % colors.length];
  };

  const layoutData = useMemo(() => {
    if (!eventsData || eventsData.length === 0) return {};

    const sortedEvents = [...eventsData].sort((a, b) => {
      const startDiff = new Date(a.startDate) - new Date(b.startDate);
      if (startDiff !== 0) return startDiff;
      const durA = new Date(a.endDate) - new Date(a.startDate);
      const durB = new Date(b.endDate) - new Date(b.startDate);
      return durB - durA;
    });

    const dayLayouts = {};
    const calendarStart = startOfDay(monthStart);
    const calendarEnd = endOfDay(monthEnd);

    eachDayOfInterval({ start: monthStart, end: monthEnd }).forEach((day) => {
      dayLayouts[day.toISOString()] = [];
    });

    sortedEvents.forEach((event) => {
      const eventStart = startOfDay(parseEventDate(event.startDate) || new Date(event.startDate));
      const eventEnd = endOfDay(parseEventDate(event.endDate) || new Date(event.endDate));

      if (isAfter(eventStart, calendarEnd) || isBefore(eventEnd, calendarStart))
        return;

      const current = isBefore(eventStart, calendarStart)
        ? calendarStart
        : eventStart;
      const endLoop = isAfter(eventEnd, calendarEnd) ? calendarEnd : eventEnd;

      let proposedSlotIndex = 0;
      let isSlotFound = false;

      while (!isSlotFound) {
        let isFree = true;
        let tempDay = current;

        while (tempDay <= endLoop) {
          const dayKey = tempDay.toISOString();
          if (!dayLayouts[dayKey]) {
            tempDay = addDays(tempDay, 1);
            continue;
          }
          if (dayLayouts[dayKey][proposedSlotIndex]) {
            isFree = false;
            break;
          }
          tempDay = addDays(tempDay, 1);
        }
        if (isFree) isSlotFound = true;
        else proposedSlotIndex++;
      }

      let assignDay = current;
      while (assignDay <= endLoop) {
        const dayKey = assignDay.toISOString();
        if (dayLayouts[dayKey]) {
          while (dayLayouts[dayKey].length < proposedSlotIndex) {
            dayLayouts[dayKey].push(null);
          }
          dayLayouts[dayKey][proposedSlotIndex] = event;
        }
        assignDay = addDays(assignDay, 1);
      }
    });

    return dayLayouts;
  }, [eventsData, currentDate]);

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const eventsInMonth = countEventsInMonth(eventsData, currentDate);
  const monthLabel = format(currentDate, "MMMM");

  return (
    <>
      <style>{styles}</style>

      <div className="calendar-wrapper">
        <header className="cal-header">
          <div className="cal-title-section">
            <h2>{format(currentDate, "MMMM yyyy")}</h2>
            <p>
              {eventsInMonth > 0
                ? `${eventsInMonth} exhibition${eventsInMonth === 1 ? "" : "s"} in ${monthLabel}`
                : `No exhibitions in ${monthLabel}`}
            </p>
          </div>
          <div className="cal-controls">
            <button className="cal-btn" onClick={() => setCurrentDate(new Date())}>
              Today
            </button>
            <div className="flex gap-1">
              <button className="cal-btn icon-only" onClick={prevMonth}>
                <ChevronLeft size={18} />
              </button>
              <button className="cal-btn icon-only" onClick={nextMonth}>
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </header>

        <div className="cal-grid-container">
          <div className="cal-weekday-row">
            {weekDays.map((day) => (
              <div key={day} className="cal-weekday">
                {day.substring(0, 3)}
              </div>
            ))}
          </div>

          <div className="cal-days-grid">
            {emptyDays.map((_, i) => (
              <div key={`empty-${i}`} className="cal-day-cell cal-empty" />
            ))}

            {daysInMonth.map((day, i) => {
              const dayKey = day.toISOString();
              const daySlots = layoutData[dayKey] || [];
              const isTodayCell = isToday(day);
              // We pass the full weekday name to CSS for mobile display
              const weekdayName = format(day, "EEEE");

              return (
                <div
                  key={i}
                  className={`cal-day-cell ${isTodayCell ? "is-today" : ""}`}
                >
                  <div className="cal-day-header" data-weekday={weekdayName}>
                    <span className="cal-day-number">{format(day, "d")}</span>
                  </div>

                  <div className="cal-events-list">
                    {daySlots.map((event, slotIndex) => {
                      if (!event)
                        return (
                          <div
                            key={`spacer-${slotIndex}`}
                            className="cal-event-spacer"
                          />
                        );

                      const eventStart = startOfDay(parseEventDate(event.startDate) || new Date(event.startDate));
                      const eventEnd = startOfDay(parseEventDate(event.endDate) || new Date(event.endDate));
                      const currentDay = startOfDay(day);

                      const isStart = isSameDay(currentDay, eventStart);
                      const isEnd = isSameDay(currentDay, eventEnd);
                      const isMonday = getDay(day) === 0;

                      let positionClass = "event-middle";
                      if (isStart && isEnd) positionClass = "event-single";
                      else if (isStart) positionClass = "event-start";
                      else if (isEnd) positionClass = "event-end";

                      const past = isEventPast(event, referenceDate);

                      return (
                        <Link
                          key={`${event.id}-${dayKey}`}
                          href={`/event-calendar/${event.slug || event.id}`}
                          className="cal-event-wrapper block"
                          title={past ? `${event.name} (ended)` : event.name}
                        >
                          <div
                            className={`cal-event-pill ${getEventColor(
                              event.id
                            )} ${positionClass} ${past ? "opacity-50" : ""}`}
                          >
                            {/* Always show name on mobile, or check logic */}
                            {(isStart || isMonday) && <span>{event.name}</span>}
                            {!(isStart || isMonday) && <span className="hidden sm:inline">&nbsp;</span>}
                            {/* Force show name on mobile even if middle of event */}
                            <span className="sm:hidden">{event.name}</span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {eventsData.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-zinc-900">
              <CalendarX size={48} className="mb-4 text-slate-300 dark:text-slate-600" />
              <p className="text-lg font-medium">No events found</p>
              <p className="text-sm">
                Try adjusting your filters to see more results.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
