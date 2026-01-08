"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Helmet } from "react-helmet";
// Import your api object
import { api } from "@/lib/api";
import { CalendarFilters } from "@/components/ExhibitionCal/CalendarFilters";
import { EventCalendar } from "@/components/ExhibitionCal/EventCalendar";
import { EventDetailModal } from "@/components/ExhibitionCal/EventDetailModal";
import { getIndustryLabel } from "@/lib/master-data";

const ExCalendar = () => {
  // New States for API Data
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("all");
  const [selectedIndustry, setSelectedIndustry] = useState("all");
  const [venueType, setVenueType] = useState("all");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- FETCH DATA ---
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        const response = await api.getEvents();
        if (response.success) {
          setEvents(response.data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // --- DERIVE FILTERS FROM API DATA ---
  const cities = useMemo(() => {
    const uniqueCities = [...new Set(events.map((event) => event.city))];
    return ["all", ...uniqueCities.sort()];
  }, [events]);

  const industries = useMemo(() => {
    const uniqueIndustries = [...new Set(events.map((event) => event.industry))];
    return ["all", ...uniqueIndustries.sort()];
  }, [events]);

  // --- CORE FILTERING LOGIC ---
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        event.name.toLowerCase().includes(searchLower) ||
        event.venue.toLowerCase().includes(searchLower) ||
        event.organizer.toLowerCase().includes(searchLower);

      const matchesCity = selectedCity === "all" || event.city === selectedCity;
      const matchesIndustry = selectedIndustry === "all" || event.industry === selectedIndustry;

      let matchesVenue = true;
      if (venueType === "indoor") matchesVenue = event.isIndoor === true;
      if (venueType === "outdoor") matchesVenue = event.isIndoor === false;

      return matchesSearch && matchesCity && matchesIndustry && matchesVenue;
    });
  }, [events, searchQuery, selectedCity, selectedIndustry, venueType]);

  // Handlers
  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCity("all");
    setSelectedIndustry("all");
    setVenueType("all");
  };

  if (error) return <div className="p-10 text-center text-red-500">Error: {error}</div>;

  return (
    <>
      <Helmet>
        <title>Exhibition Calendar 2025 | India</title>
      </Helmet>

      <div className="min-h-screen bg-slate-50/50 dark:bg-zinc-950">
        <main className="py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-7xl mt-5">
            {/* Header omitted for brevity */}
            <div className="text-center mb-12">

              <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-sm font-semibold uppercase tracking-wide mb-4 mt-10">

                2026 Schedule

              </span>

              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 tracking-tight mb-4">

                Exhibition Calendar

              </h1>

              <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">

                Explore the top trade shows and conferences happening across India.

                Find the perfect event to grow your business.

              </p>
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
            />

            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 dark:border-indigo-400"></div>
              </div>
            ) : (
              <EventCalendar
                eventsData={filteredEvents}
                onEventClick={handleEventClick}
              />
            )}
          </div>

          <EventDetailModal
            event={selectedEvent}
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedEvent(null);
            }}
            eventsData={events} // Use API data here
            industryLabel={getIndustryLabel}
            setSelectedEvent={setSelectedEvent}
            setIsModalOpen={setIsModalOpen}
          />
        </main>
      </div>
    </>
  );
};

export default ExCalendar;
