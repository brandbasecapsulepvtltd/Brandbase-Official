"use client";

import { X, Calendar, MapPin, Users, Building, ExternalLink, Bookmark, Bell, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import { LeadForm } from "./LeadForm";

export function EventDetailModal({ event, isOpen, onClose, eventsData, industryLabel }) {
  const [showLeadForm, setShowLeadForm] = useState(false);

  if (!event || !isOpen) return null;

  // Get similar events based on similarEvents array in master data
  const similarEvents = eventsData.filter(e => 
    event.similarEvents && event.similarEvents.includes(e.id)
  ).slice(0, 3);

  // Get portfolio items from the event data
  const portfolio = event.portfolioItems || [];

  // Handle modal close when clicking outside
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={handleBackdropClick}
        >
          {/* Modal Content */}
          <div className="bg-white dark:bg-zinc-900 dark:bg-black rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
            {/* Header Banner */}
            <div className={`industry-${event.industry} p-6 text-black dark:text-white`}>
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-sm font-medium opacity-90">
                    {industryLabel(event.industry)}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold mt-1">
                    {event.name}
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="text-black dark:text-white hover:bg-black/20 p-2 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-8 overflow-y-auto max-h-[calc(90vh-200px)]">
              {/* Event Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-gray-500 dark:text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Date</p>
                      <p className="font-medium text-gray-900 dark:text-gray-100 dark:text-gray-100">
                        {format(event.startDate, 'MMMM d')} - {format(event.endDate, 'd, yyyy')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-500 dark:text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Venue</p>
                      <p className="font-medium text-gray-900 dark:text-gray-100 dark:text-gray-100">{event.venue}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{event.city}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Building className="w-5 h-5 text-gray-500 dark:text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Organizer</p>
                      <p className="font-medium text-gray-900 dark:text-gray-100 dark:text-gray-100">{event.organizer}</p>
                      <a
                        href={event.organizerWebsite}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline inline-flex items-center gap-1"
                      >
                        Visit website <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-gray-500 dark:text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Expected Footfall</p>
                      <p className="font-medium text-gray-900 dark:text-gray-100 dark:text-gray-100">{event.expectedFootfall.toLocaleString()}+ visitors</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Stall Sizes Available</p>
                    <div className="flex flex-wrap gap-2">
                      {event.stallSizes.map((size) => (
                        <span
                          key={size}
                          className="px-3 py-1 rounded-lg bg-gray-100 text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          {size}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Venue Type</p>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      event.isIndoor 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {event.isIndoor ? 'Indoor' : 'Outdoor'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 dark:text-gray-100 mb-2">About This Exhibition</h3>
                <p className="text-gray-600 dark:text-gray-300">{event.description}</p>
              </div>

              {/* Why Participate */}
              <div className="p-4 rounded-xl bg-gray-50 dark:bg-zinc-900 border border-gray-200">
                <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 dark:text-gray-100 mb-2">Why Should You Participate?</h3>
                <p className="text-gray-600 dark:text-gray-300">{event.whyParticipate}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:bg-zinc-900 flex items-center gap-2 transition-colors">
                  <Bookmark className="w-4 h-4" />
                  Save Event
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:bg-zinc-900 flex items-center gap-2 transition-colors">
                  <Bell className="w-4 h-4" />
                  Set Reminder
                </button>
              </div>

              {/* CTA Section */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
                <h3 className="font-bold text-xl mb-2">
                  Get Your Stall Designed for This Exhibition
                </h3>
                <p className="text-white/80 mb-4">
                  Stand out from the competition with a custom-designed exhibition stall that converts visitors into clients.
                </p>
                <button
                  onClick={() => setShowLeadForm(true)}
                  className="px-6 py-3 bg-white dark:bg-zinc-900 dark:bg-black text-blue-600 hover:bg-gray-100 font-medium rounded-lg flex items-center gap-2 transition-colors"
                >
                  Get Free Quote
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Portfolio Section */}
              {portfolio.length > 0 && (
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 dark:text-gray-100 mb-4">
                    Our Work for Similar Exhibitions
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {portfolio.map((item) => (
                      <div key={item.id} className="rounded-xl overflow-hidden border border-gray-200 group">
                        <div className="aspect-video overflow-hidden">
                          <img
                            src={item.imageUrl}
                            alt={item.eventName}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                        <div className="p-4">
                          <p className="font-medium text-gray-900 dark:text-gray-100 dark:text-gray-100 text-sm">{item.eventName}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{item.stallSize} stall</p>
                          <p className="text-xs text-gray-600 dark:text-gray-300 mt-2 italic">
                            "{item.clientTestimonial.slice(0, 60)}..."
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            — {item.clientName}, {item.clientCompany}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Similar Events */}
              {similarEvents.length > 0 && (
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 dark:text-gray-100 mb-4">
                    Similar Exhibitions You May Like
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {similarEvents.map((e) => (
                      <div
                        key={e.id}
                        className="p-4 rounded-xl border border-gray-200 hover:shadow-md transition-shadow cursor-pointer hover:border-blue-200"
                        onClick={() => {
                          // This would need to be handled by parent component
                          onClose();
                          // The parent should handle opening modal with new event
                        }}
                      >
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium industry-${e.industry} text-white`}>
                          {industryLabel(e.industry)}
                        </span>
                        <h4 className="font-medium text-gray-900 dark:text-gray-100 dark:text-gray-100 mt-2">{e.name}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {format(e.startDate, 'MMM d')} - {format(e.endDate, 'd, yyyy')}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{e.city}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Lead Form Modal*/}
      {showLeadForm && (
        <LeadForm
          event={event}
          isOpen={showLeadForm}
          onClose={() => setShowLeadForm(false)}
        />
      )}
    </>
  );
}
