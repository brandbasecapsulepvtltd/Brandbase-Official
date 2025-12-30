"use client";

import React, { useState, useMemo } from "react";
import { Helmet } from "react-helmet";
import { CalendarFilters } from "@/components/ExhibitionCal/CalendarFilters";
import { EventCalendar } from "@/components/ExhibitionCal/EventCalendar";
import { EventDetailModal } from "@/components/ExhibitionCal/EventDetailModal";
import {
  masterData,
  getAllCities,
  getAllIndustries,
  getIndustryLabel,
} from "@/lib/master-data";

const ExCalendar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("all");
  const [selectedIndustry, setSelectedIndustry] = useState("all");
  const [venueType, setVenueType] = useState("all");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Derive lists from data
  const cities = ["all", ...getAllCities()];
  const industries = ["all", ...getAllIndustries()];

  // --- CORE FILTERING LOGIC ---
  // This was missing in the original code. We filter here, then pass results.
  const filteredEvents = useMemo(() => {
    return masterData.filter((event) => {
      // 1. Search Query (Name, Venue, or Organizer)
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        event.name.toLowerCase().includes(searchLower) ||
        event.venue.toLowerCase().includes(searchLower) ||
        event.organizer.toLowerCase().includes(searchLower);

      // 2. City Filter
      const matchesCity =
        selectedCity === "all" || event.city === selectedCity;

      // 3. Industry Filter
      const matchesIndustry =
        selectedIndustry === "all" || event.industry === selectedIndustry;

      // 4. Venue Type
      let matchesVenue = true;
      if (venueType === "indoor") matchesVenue = event.isIndoor === true;
      if (venueType === "outdoor") matchesVenue = event.isIndoor === false;

      return matchesSearch && matchesCity && matchesIndustry && matchesVenue;
    });
  }, [searchQuery, selectedCity, selectedIndustry, venueType]);

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

  return (
    <>
      <Helmet>
        <title>Exhibition Calendar 2025 | India</title>
        <meta
          name="description"
          content="Discover upcoming exhibitions across India in 2025."
        />
      </Helmet>

      <div className="min-h-screen bg-slate-50/50">
        <main className="py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-7xl mt-5">
            {/* Page Header */}
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold uppercase tracking-wide mb-4 mt-10">
                2026 Schedule
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
                Exhibition Calendar
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Explore the top trade shows and conferences happening across India.
                Find the perfect event to grow your business.
              </p>
            </div>

            {/* Filters Section */}
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

            {/* Calendar Grid */}
            <EventCalendar
              eventsData={filteredEvents}
              onEventClick={handleEventClick}
            />
          </div>

          {/* Details Modal */}
          <EventDetailModal
            event={selectedEvent}
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedEvent(null);
            }}
            eventsData={masterData}
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