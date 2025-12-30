import React, { useState } from "react";
import { X, Send, CheckCircle } from "lucide-react";

export function LeadForm({ event, isOpen, onClose }) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    stallSize: "",
    budget: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    // You can add a standard alert or custom notification logic here if needed
    // alert("Quote Request Submitted!");
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // If the modal isn't open, don't render anything
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-xl bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          /* Success View */
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="font-bold text-xl text-gray-900 mb-2">
              Thank You!
            </h3>
            <p className="text-gray-600 mb-6">
              Your quote request for <strong>{event.name}</strong> has been
              submitted. Our design team will contact you within 24 hours.
            </p>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          /* Form View */
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Get Stall Designed for {event.name}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Pre-filled Event Info */}
              <div className="p-3 rounded-lg bg-gray-100 border border-gray-200">
                <p className="text-xs font-semibold text-gray-500 uppercase">Exhibition</p>
                <p className="font-medium text-gray-900">{event.name}</p>
                <p className="text-sm text-gray-600">
                  {event.city} | {event.venue}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-gray-700">
                    Full Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="company" className="text-sm font-medium text-gray-700">
                    Company Name *
                  </label>
                  <input
                    id="company"
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.company}
                    onChange={(e) => handleChange("company", e.target.value)}
                    placeholder="Your Company"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email Address *
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="john@company.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                    Phone Number *
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    placeholder="+91 98765 43210"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="stallSize" className="text-sm font-medium text-gray-700">
                    Preferred Stall Size *
                  </label>
                  <div className="relative">
                    <select
                      id="stallSize"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={formData.stallSize}
                      onChange={(e) => handleChange("stallSize", e.target.value)}
                      required
                    >
                      <option value="" disabled>Select stall size</option>
                      {event.stallSizes && event.stallSizes.map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                    {/* Custom arrow for select */}
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="budget" className="text-sm font-medium text-gray-700">
                    Budget Range *
                  </label>
                  <div className="relative">
                    <select
                      id="budget"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={formData.budget}
                      onChange={(e) => handleChange("budget", e.target.value)}
                      required
                    >
                      <option value="" disabled>Select budget</option>
                      <option value="under-1l">Under ₹1 Lakh</option>
                      <option value="1l-3l">₹1 - 3 Lakhs</option>
                      <option value="3l-5l">₹3 - 5 Lakhs</option>
                      <option value="5l-10l">₹5 - 10 Lakhs</option>
                      <option value="above-10l">Above ₹10 Lakhs</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-gray-700">
                  Additional Requirements
                </label>
                <textarea
                  id="message"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  placeholder="Tell us about your specific requirements, branding needs, or any special features you want..."
                  rows={3}
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-md transition-all shadow-sm"
              >
                <Send className="w-4 h-4" />
                Submit Quote Request
              </button>

              <p className="text-xs text-center text-gray-500">
                By submitting, you agree to receive communication from our team regarding your stall design inquiry.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}