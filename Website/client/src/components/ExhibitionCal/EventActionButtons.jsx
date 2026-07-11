"use client";

import { useState } from "react";
import Link from "next/link";
import { Bookmark, Bell, ArrowRight, CalendarX } from "lucide-react";
import { LeadForm } from "./LeadForm";
import { isEventPast } from "@/lib/eventUtils";

export default function EventActionButtons({ event, asOfDate }) {
  const [showLeadForm, setShowLeadForm] = useState(false);
  const past = isEventPast(event, asOfDate);

  const handleAddToCalendar = () => {
    if (past) return;

    const formatDate = (date) =>
      `${new Date(date).toISOString().replace(/[-:]/g, "").split(".")[0]}Z`;

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//BrandBase Capsule//Event Calendar//EN
BEGIN:VEVENT
UID:${event.id}@brandbasecapsule.com
DTSTAMP:${formatDate(new Date())}
DTSTART:${formatDate(event.startDate)}
DTEND:${formatDate(event.endDate)}
SUMMARY:${event.name}
DESCRIPTION:${event.description}\\n\\nVenue: ${event.venue}\\nOrganizer: ${event.organizer}
LOCATION:${event.venue}, ${event.city}
URL:${typeof window !== "undefined" ? window.location.href : ""}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = `${event.slug || event.id}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSaveEvent = () => {
    if (past) return;
    if (typeof window === "undefined" || !window.localStorage) return;

    const saved = JSON.parse(localStorage.getItem("savedEvents") || "[]");
    if (saved.includes(event.id)) return;
    saved.push(event.id);
    localStorage.setItem("savedEvents", JSON.stringify(saved));
    alert("Event saved!");
  };

  return (
    <>
      <div className="flex flex-col gap-6">
        {past && (
          <div className="flex items-start gap-3 rounded-xl border border-amber-200 dark:border-amber-900/40 bg-amber-50 dark:bg-amber-950/30 px-4 py-3 text-sm text-amber-900 dark:text-amber-200">
            <CalendarX className="w-5 h-5 shrink-0 mt-0.5" aria-hidden="true" />
            <p>
              This exhibition has ended. Reminders and calendar export are unavailable — contact us
              to plan your stall for the next edition or a similar show.
            </p>
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleSaveEvent}
            disabled={past}
            title={past ? "This event has ended" : "Save to your browser"}
            className="px-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800 flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
          >
            <Bookmark className="w-4 h-4" />
            Save Event
          </button>
          <button
            type="button"
            onClick={handleAddToCalendar}
            disabled={past}
            title={past ? "This event has ended" : "Download .ics calendar file"}
            className="px-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800 flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
          >
            <Bell className="w-4 h-4" />
            Add to Calendar
          </button>
        </div>

        <div className="p-6 rounded-2xl bg-gradient-to-r from-[#FF6600] to-orange-600 text-white shadow-lg">
          <h3 className="font-bold text-xl mb-2">
            {past ? "Plan Your Next Exhibition Stall" : "Get Your Stall Designed for This Exhibition"}
          </h3>
          <p className="text-white/90 mb-4">
            {past
              ? "Missed this show? We can help you prepare for upcoming editions and similar trade fairs across India."
              : "Stand out with a custom-designed exhibition stall that converts visitors into clients."}
          </p>
          <button
            type="button"
            onClick={() => setShowLeadForm(true)}
            className="px-6 py-3 bg-white text-[#FF6600] hover:bg-orange-50 font-medium rounded-lg flex items-center gap-2 transition-colors shadow-sm"
          >
            Get Free Quote
            <ArrowRight className="w-4 h-4" />
          </button>
          {past && (
            <Link
              href="/event-calendar"
              className="mt-3 inline-flex text-sm font-semibold text-white/90 hover:text-white underline underline-offset-2"
            >
              Browse upcoming exhibitions
            </Link>
          )}
        </div>
      </div>

      {showLeadForm && (
        <LeadForm event={event} isOpen={showLeadForm} onClose={() => setShowLeadForm(false)} />
      )}
    </>
  );
}
