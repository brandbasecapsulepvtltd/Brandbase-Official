"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { CalendarDays, LayoutGrid, MapPin, ArrowRight } from "lucide-react";
import Breadcrumbs from "@/components/General/Breadcrumbs";
import ContactFAQ from "@/components/Contact/ContactFAQ";
import { CalendarFilters } from "@/components/ExhibitionCal/CalendarFilters";
import { ExhibitionCards } from "@/components/ExhibitionCal/ExhibitionCards";
import { EventCalendar } from "@/components/ExhibitionCal/EventCalendar";
import { getIndustryLabel } from "@/lib/master-data";
import { CONTACT, EVENT_CALENDAR_FAQS } from "@/lib/contactConstants";
import { isEventUpcoming } from "@/lib/eventUtils";

export default function EventCalendarContent({ initialEvents = [], asOfDate }) {
  const referenceDate = asOfDate || new Date().toISOString();
  const [events] = useState(initialEvents);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("all");
  const [selectedIndustry, setSelectedIndustry] = useState("all");
  const [venueType, setVenueType] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [upcomingOnly, setUpcomingOnly] = useState(false);

  const displayEvents = useMemo(() => {
    if (!upcomingOnly) return events;
    return events.filter((event) => isEventUpcoming(event, referenceDate));
  }, [events, upcomingOnly, referenceDate]);

  const cities = useMemo(() => {
    const uniqueCities = [...new Set(displayEvents.map((event) => event.city).filter(Boolean))];
    return ["all", ...uniqueCities.sort()];
  }, [displayEvents]);

  const industries = useMemo(() => {
    const uniqueIndustries = [...new Set(displayEvents.map((event) => event.industry).filter(Boolean))];
    return ["all", ...uniqueIndustries.sort()];
  }, [displayEvents]);

  const filteredEvents = useMemo(() => {
    return displayEvents.filter((event) => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        !searchQuery ||
        event.name?.toLowerCase().includes(searchLower) ||
        event.venue?.toLowerCase().includes(searchLower) ||
        event.organizer?.toLowerCase().includes(searchLower);

      const matchesCity = selectedCity === "all" || event.city === selectedCity;
      const matchesIndustry = selectedIndustry === "all" || event.industry === selectedIndustry;

      let matchesVenue = true;
      if (venueType === "indoor") matchesVenue = event.isIndoor === true;
      if (venueType === "outdoor") matchesVenue = event.isIndoor === false;

      return matchesSearch && matchesCity && matchesIndustry && matchesVenue;
    });
  }, [displayEvents, searchQuery, selectedCity, selectedIndustry, venueType]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCity("all");
    setSelectedIndustry("all");
    setVenueType("all");
  };

  const stats = useMemo(() => {
    const upcoming = events.filter((event) => isEventUpcoming(event, referenceDate)).length;
    return {
      total: upcomingOnly ? upcoming : events.length,
      cities: cities.length - 1,
      showing: filteredEvents.length,
      pastHidden: upcomingOnly ? events.length - upcoming : 0,
    };
  }, [events, cities.length, filteredEvents.length, upcomingOnly, referenceDate]);

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-zinc-950">
      <div className="container mx-auto px-4 max-w-7xl pt-28 pb-16 md:pt-32 md:pb-24">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Event Calendar", href: "/event-calendar" },
          ]}
        />

        <header className="text-center mb-10 md:mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-orange-100 dark:bg-orange-900/30 text-[#FF6600] text-sm font-semibold uppercase tracking-wide mb-4">
            2026 Schedule
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
            Exhibition &amp; Trade Show{" "}
            <span className="text-[#FF6600]">Calendar</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Explore top trade shows and conferences across India. Find the right event to grow your
            business — then let BrandBase design and build your stall.
          </p>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10 max-w-3xl mx-auto">
          <div className="rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 text-center">
            <p className="text-3xl font-bold text-[#FF6600]">{stats.total}</p>
            <p className="text-sm text-slate-500 dark:text-zinc-400 mt-1">
              {upcomingOnly ? "Upcoming Events" : "Listed Events"}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 text-center">
            <p className="text-3xl font-bold text-slate-900 dark:text-white">{stats.cities}</p>
            <p className="text-sm text-slate-500 dark:text-zinc-400 mt-1">Cities</p>
          </div>
          <div className="col-span-2 md:col-span-1 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 text-center">
            <p className="text-3xl font-bold text-slate-900 dark:text-white">{stats.showing}</p>
            <p className="text-sm text-slate-500 dark:text-zinc-400 mt-1">Matching Filters</p>
          </div>
        </div>

        <CalendarFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCity={selectedCity}
          onCityChange={setSelectedCity}
          cities={cities}
          selectedIndustry={selectedIndustry}
          onIndustryChange={setSelectedIndustry}
          industries={industries}
          industryLabel={getIndustryLabel}
          venueType={venueType}
          onVenueTypeChange={setVenueType}
          onReset={handleResetFilters}
          upcomingOnly={upcomingOnly}
          onUpcomingOnlyChange={setUpcomingOnly}
          pastHiddenCount={stats.pastHidden}
        />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <p className="text-sm text-slate-500 dark:text-zinc-400 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#FF6600]" aria-hidden="true" />
            Showing {filteredEvents.length}
            {upcomingOnly ? " upcoming" : ""} exhibition{filteredEvents.length === 1 ? "" : "s"}
            {stats.pastHidden > 0 && upcomingOnly && (
              <span className="text-slate-400"> ({stats.pastHidden} past hidden)</span>
            )}
          </p>
          <div
            className="inline-flex rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-1"
            role="tablist"
            aria-label="Calendar view mode"
          >
            <button
              type="button"
              role="tab"
              aria-selected={viewMode === "grid"}
              onClick={() => setViewMode("grid")}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6600] ${
                viewMode === "grid"
                  ? "bg-[#FF6600] text-white shadow-sm"
                  : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <LayoutGrid className="w-4 h-4" aria-hidden="true" />
              Cards
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={viewMode === "calendar"}
              onClick={() => setViewMode("calendar")}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6600] ${
                viewMode === "calendar"
                  ? "bg-[#FF6600] text-white shadow-sm"
                  : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <CalendarDays className="w-4 h-4" aria-hidden="true" />
              Calendar
            </button>
          </div>
        </div>

        {filteredEvents.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 rounded-3xl border border-dashed border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 text-center px-6">
            <p className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              {upcomingOnly ? "No upcoming exhibitions match your filters" : "No exhibitions match your filters"}
            </p>
            <p className="text-slate-500 dark:text-zinc-400 max-w-md">
              {upcomingOnly && stats.pastHidden > 0
                ? `${stats.pastHidden} past event${stats.pastHidden === 1 ? "" : "s"} are hidden. Uncheck “Show upcoming only” to browse earlier shows.`
                : "Try adjusting your search or filter criteria."}
            </p>
          </div>
        ) : viewMode === "calendar" ? (
          <EventCalendar eventsData={filteredEvents} asOfDate={referenceDate} />
        ) : (
          <ExhibitionCards eventsData={filteredEvents} asOfDate={referenceDate} />
        )}

        <section className="mt-16 md:mt-20 rounded-3xl bg-gradient-to-br from-[#FF6600] to-orange-600 px-6 py-12 md:px-12 md:py-14 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Ready to exhibit at your next show?</h2>
          <p className="text-orange-50 max-w-xl mx-auto mb-8 leading-relaxed">
            From 3D stall design to on-site execution — BrandBase handles your entire exhibition
            presence. Book a free consultation today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/appointment"
              className="inline-flex items-center gap-2 rounded-full bg-white text-[#FF6600] px-8 py-3.5 font-bold hover:bg-orange-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#FF6600]"
            >
              Book Free Consultation
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/80 px-8 py-3.5 font-semibold hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Contact Us
            </Link>
          </div>
        </section>
      </div>

      <ContactFAQ items={EVENT_CALENDAR_FAQS} />
    </div>
  );
}
