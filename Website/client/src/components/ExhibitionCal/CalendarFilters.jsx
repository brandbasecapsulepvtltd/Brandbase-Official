"use client";
import React from "react";
import { Search, Filter, X } from "lucide-react";

export function CalendarFilters({
  searchQuery,
  onSearchChange,
  selectedCity,
  onCityChange,
  cities,
  selectedIndustry,
  onIndustryChange,
  industries,
  industryLabel,
  venueType,
  onVenueTypeChange,
  onReset,
}) {
  const hasActiveFilters =
    searchQuery ||
    selectedCity !== "all" ||
    selectedIndustry !== "all" ||
    venueType !== "all";

  return (
    <div className="bg-white dark:bg-zinc-900 backdrop-blur-md border border-slate-200 dark:border-zinc-700 p-4 md:p-6 rounded-2xl shadow-sm mb-8 sticky top-20 z-30 transition-all duration-300">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <Filter className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          Filter Events
        </h3>
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="text-red-500 hover:text-red-600 hover:bg-red-50 h-8 px-2 rounded-md text-sm font-medium flex items-center transition-colors"
          >
            <X className="w-3 h-3 mr-1" />
            Reset Filters
          </button>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-3">
        {/* Search Bar */}
        <div className="relative flex-grow md:max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500 w-4 h-4" />
          <input
            type="text"
            placeholder="Search event, venue or organizer..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-3 py-2 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-zinc-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-colors"
          />
        </div>

        {/* Filters Group */}
        <div className="flex flex-wrap gap-3 flex-grow">
          {/* City Select */}
          <div className="relative">
            <select
              value={selectedCity}
              onChange={(e) => onCityChange(e.target.value)}
              className="w-[160px] px-3 py-2 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-slate-100 appearance-none"
            >
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city === "all" ? "All Cities" : city}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg className="w-4 h-4 text-slate-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Industry Select */}
          <div className="relative">
            <select
              value={selectedIndustry}
              onChange={(e) => onIndustryChange(e.target.value)}
              className="w-[180px] px-3 py-2 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-slate-100 appearance-none"
            >
              {industries.map((industry) => (
                <option key={industry} value={industry}>
                  {industry === "all" ? "All Industries" : industryLabel(industry)}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg className="w-4 h-4 text-slate-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Venue Type Buttons */}
          <div className="bg-slate-100 dark:bg-zinc-800 p-1 rounded-lg flex items-center">
            <button
              onClick={() => onVenueTypeChange("all")}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${venueType === "all"
                  ? "bg-white dark:bg-zinc-700 text-slate-900 dark:text-slate-100 shadow-sm"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                }`}
            >
              All
            </button>
            <button
              onClick={() => onVenueTypeChange("indoor")}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${venueType === "indoor"
                  ? "bg-white dark:bg-zinc-700 text-indigo-600 dark:text-indigo-400 shadow-sm"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                }`}
            >
              Indoor
            </button>
            <button
              onClick={() => onVenueTypeChange("outdoor")}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${venueType === "outdoor"
                  ? "bg-white dark:bg-zinc-700 text-emerald-600 dark:text-emerald-400 shadow-sm"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                }`}
            >
              Outdoor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
