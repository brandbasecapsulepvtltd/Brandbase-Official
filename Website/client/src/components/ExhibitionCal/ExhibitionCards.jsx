"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  MapPin,
  ExternalLink,
  ArrowRight,
  Building2,
  Users,
  CalendarDays,
} from "lucide-react";
import { format } from "date-fns";
import { getIndustryLabel } from "@/lib/master-data";
import { isEventPast, parseEventDate } from "@/lib/eventUtils";

export function ExhibitionCards({ eventsData = [], asOfDate }) {
  if (eventsData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-zinc-900/50 rounded-3xl border border-dashed border-slate-200 dark:border-zinc-800">
        <div className="w-20 h-20 bg-slate-50 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-6">
          <CalendarDays className="w-10 h-10 text-slate-300 dark:text-zinc-600" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No Exhibitions Found</h3>
        <p className="text-slate-500 dark:text-zinc-400 text-center max-w-md px-6">
          We couldn&apos;t find any exhibitions matching your current filters. Try adjusting your search criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      <AnimatePresence mode="popLayout">
        {eventsData.map((event, index) => (
          <motion.div
            key={event._id || event.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{
              duration: 0.4,
              delay: index * 0.05,
              ease: [0.23, 1, 0.32, 1],
            }}
          >
            <ExhibitionCard event={event} asOfDate={asOfDate} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

function ExhibitionCard({ event, asOfDate }) {
  const startDate = parseEventDate(event.startDate) || new Date(event.startDate);
  const endDate = parseEventDate(event.endDate) || new Date(event.endDate);
  const past = isEventPast(event, asOfDate);
  const detailHref = `/event-calendar/${event.slug || event.id}`;

  const isSameMonth = startDate.getMonth() === endDate.getMonth();
  const dateDisplay = isSameMonth
    ? `${format(startDate, "MMM d")} - ${format(endDate, "d, yyyy")}`
    : `${format(startDate, "MMM d")} - ${format(endDate, "MMM d, yyyy")}`;

  return (
    <article
      className={`relative h-full bg-white dark:bg-zinc-900 border rounded-[2rem] overflow-hidden transition-all duration-500 flex flex-col ${
        past
          ? "border-slate-200 dark:border-zinc-800 opacity-80"
          : "border-slate-200 dark:border-zinc-800 hover:shadow-[0_20px_50px_-12px_rgba(255,102,0,0.15)] hover:border-[#FF6600]/30 dark:hover:border-[#FF6600]/30 hover:-translate-y-1"
      }`}
    >
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#FF6600] via-orange-400 to-amber-500 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <Link href={detailHref} className="flex flex-col flex-1 p-8 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6600] focus-visible:ring-inset rounded-[2rem]">
        <div className="flex justify-between items-start mb-6">
          <span className="px-4 py-1.5 rounded-full bg-orange-50 dark:bg-orange-900/20 text-[#FF6600] dark:text-orange-400 text-xs font-bold uppercase tracking-wider">
            {getIndustryLabel(event.industry)}
          </span>
          <div className="flex flex-col items-end gap-1">
            {past && (
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-500 dark:text-zinc-400 text-[10px] font-bold uppercase tracking-wide">
                Ended
              </span>
            )}
            <span className="text-xs font-medium text-slate-400 dark:text-zinc-500 uppercase tracking-widest">
              {format(startDate, "yyyy")}
            </span>
          </div>
        </div>

        <div className="mb-8 flex-1">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white leading-tight mb-4 group-hover:text-[#FF6600] dark:group-hover:text-orange-400 transition-colors duration-300 line-clamp-2">
            {event.name}
          </h3>

          <div className="space-y-3">
            <div className="flex items-start gap-3 text-slate-600 dark:text-zinc-400">
              <Calendar className="w-5 h-5 mt-0.5 shrink-0 text-slate-400 dark:text-zinc-500" />
              <span className="text-[15px] font-medium">{dateDisplay}</span>
            </div>

            <div className="flex items-start gap-3 text-slate-600 dark:text-zinc-400">
              <MapPin className="w-5 h-5 mt-0.5 shrink-0 text-slate-400 dark:text-zinc-500" />
              <span className="text-[15px] font-medium line-clamp-1">{event.venue}</span>
            </div>

            <div className="flex items-center gap-3 text-slate-500 dark:text-zinc-500 flex-wrap">
              <Building2 className="w-4 h-4 shrink-0" />
              <span className="text-sm font-medium">{event.city}</span>
              <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-zinc-700" />
              <Users className="w-4 h-4 shrink-0" />
              <span className="text-sm font-medium">
                {event.expectedFootfall?.toLocaleString() || "N/A"}+ Visitors
              </span>
            </div>
          </div>
        </div>

        <div className="mt-auto pt-6 border-t border-slate-100 dark:border-zinc-800 flex items-center gap-2">
          <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-[#FF6600] dark:group-hover:text-orange-400 transition-colors">
            View Details
          </span>
          <ArrowRight className="w-4 h-4 text-slate-400 dark:text-zinc-500 group-hover:translate-x-1 group-hover:text-[#FF6600] dark:group-hover:text-orange-400 transition-all" />
        </div>
      </Link>

      {event.organizerWebsite && (
        <button
          type="button"
          onClick={() => window.open(event.organizerWebsite, "_blank", "noopener,noreferrer")}
          className="absolute bottom-8 right-8 p-2 rounded-xl bg-slate-50 dark:bg-zinc-800/50 hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-400 hover:text-slate-900 dark:text-zinc-500 dark:hover:text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6600]"
          aria-label={`Open organizer website for ${event.name}`}
        >
          <ExternalLink className="w-4 h-4" />
        </button>
      )}
    </article>
  );
}
