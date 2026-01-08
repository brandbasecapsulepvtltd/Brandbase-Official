import React, { useState } from "react";
import { X, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
//import { api } from "./utils/api"; // Assuming you have this API utility

export function LeadForm({ event, isOpen, onClose }) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    stallSize: "",
    budget: "",
    message: "",
  });

  // Reset form when modal closes
  const handleClose = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      stallSize: "",
      budget: "",
      message: "",
    });
    setError(null);
    setIsSubmitted(false);
    setIsSubmitting(false);
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      // Prepare lead data according to your backend model
      const leadData = {
        exhibitionName: event.name,
        exhibitionLocation: `${event.city}, ${event.venue}`,
        exhibitionDate: event.startDate,
        fullName: formData.name,
        companyName: formData.company,
        email: formData.email,
        phoneNumber: formData.phone,
        preferredStallSize: formData.stallSize,
        budgetRange: formData.budget,
        additionalMessage: formData.message,
        source: "website_form" // Or get from window.location.href
      };

      console.log('Submitting lead data:', leadData);

      // Send to backend API
      const response = await fetch('https://brandbase.onrender.com/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': '8c36f75937af6c0777eeda50d0a0ca4ab90e8ddc4b518c9dbe51a59f064392de'
        },
        body: JSON.stringify(leadData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit lead');
      }

      if (data.success) {
        setIsSubmitted(true);

        // Optionally send email notification via EmailJS
        try {
          await sendEmailNotification(leadData);
        } catch (emailError) {
          console.warn('Email notification failed:', emailError);
          // Continue anyway - lead is saved in database
        }

        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          stallSize: "",
          budget: "",
          message: "",
        });
      } else {
        throw new Error(data.message || 'Failed to submit lead');
      }
    } catch (err) {
      console.error('Error submitting lead:', err);
      setError(err.message || 'Failed to submit lead. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const sendEmailNotification = async (leadData) => {
    try {
      // Initialize EmailJS
      const emailjs = await import('@emailjs/browser');
      emailjs.init('maLQ-G7P2BQOoOVoY');

      const templateParams = {
        to_name: 'Admin Team',
        to_email: 'admin@brandbase.com', // Change to your admin email
        from_name: `${leadData.fullName} (via Website)`,
        from_email: leadData.email,
        subject: `New Lead Submission: ${leadData.exhibitionName}`,
        message: `
New Lead Submitted:

Event: ${leadData.exhibitionName}
Location: ${leadData.exhibitionLocation}
Date: ${new Date(leadData.exhibitionDate).toLocaleDateString()}

Lead Details:
- Name: ${leadData.fullName}
- Company: ${leadData.companyName}
- Email: ${leadData.email}
- Phone: ${leadData.phoneNumber}

Requirements:
- Stall Size: ${leadData.preferredStallSize}
- Budget Range: ${getBudgetLabel(leadData.budgetRange)}
- Additional Message: ${leadData.additionalMessage || 'None'}

Submitted on: ${new Date().toLocaleString()}
        `.trim(),
        reply_to: leadData.email
      };

      await emailjs.send(
        'service_wotevqq',
        'template_2ysu787',
        templateParams
      );

      console.log('Lead notification email sent successfully');
    } catch (error) {
      console.error('Failed to send lead notification email:', error);
      throw error;
    }
  };

  const getBudgetLabel = (value) => {
    const labels = {
      'under-1l': 'Under ₹1 Lakh',
      '1l-3l': '₹1 - 3 Lakhs',
      '3l-5l': '₹3 - 5 Lakhs',
      '5l-10l': '₹5 - 10 Lakhs',
      'above-10l': 'Above ₹10 Lakhs'
    };
    return labels[value] || value;
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (error) setError(null);
  };

  // If the modal isn't open, don't render anything
  if (!isOpen) return null;

  // Available stall sizes (default if event doesn't have them)
  const availableStallSizes = event.stallSizes || ['6x6', '9x9', '12x12', '15x15', '18x18', '20x20'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-xl bg-white dark:bg-zinc-900 p-6 shadow-xl max-h-[90vh] overflow-y-auto">

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 dark:text-gray-300"
          disabled={isSubmitting}
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          /* Success View */
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="font-bold text-xl text-gray-900 dark:text-gray-100 mb-2">
              Thank You!
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Your quote request for <strong>{event.name}</strong> has been
              submitted. Our design team will contact you within 24 hours.
            </p>
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-6 p-3 bg-gray-50 dark:bg-zinc-800 rounded-lg">
              <p>We've sent a confirmation to your email.</p>
              <p className="mt-1">Reference ID: L-{Date.now().toString().slice(-6)}</p>
            </div>
            <button
              onClick={handleClose}
              className="px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-md hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          /* Form View */
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                Get Stall Designed for {event.name}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                Fill out the form below and our team will get back to you with a custom quote.
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-red-700 font-medium">Submission Failed</p>
                  <p className="text-sm text-red-600">{error}</p>
                  <button
                    onClick={() => setError(null)}
                    className="text-xs text-red-500 hover:text-red-700 mt-1"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Pre-filled Event Info */}
              <div className="p-3 rounded-lg bg-gray-100 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700">
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Exhibition</p>
                <p className="font-medium text-gray-900 dark:text-gray-100">{event.name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {event.city} | {event.venue}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {new Date(event.startDate).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Full Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="w-full px-3 py-2 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-gray-100 disabled:bg-gray-100 dark:disabled:bg-zinc-900 disabled:cursor-not-allowed"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder="John Doe"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="company" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Company Name *
                  </label>
                  <input
                    id="company"
                    type="text"
                    className="w-full px-3 py-2 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-gray-100 disabled:bg-gray-100 dark:disabled:bg-zinc-900 disabled:cursor-not-allowed"
                    value={formData.company}
                    onChange={(e) => handleChange("company", e.target.value)}
                    placeholder="Your Company"
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email Address *
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="w-full px-3 py-2 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-gray-100 disabled:bg-gray-100 dark:disabled:bg-zinc-900 disabled:cursor-not-allowed"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="john@company.com"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Phone Number *
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    className="w-full px-3 py-2 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-gray-100 disabled:bg-gray-100 dark:disabled:bg-zinc-900 disabled:cursor-not-allowed"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    placeholder="+91 98765 43210"
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="stallSize" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Preferred Stall Size *
                  </label>
                  <div className="relative">
                    <select
                      id="stallSize"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-zinc-600 rounded-md appearance-none bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 dark:disabled:bg-zinc-900 disabled:cursor-not-allowed"
                      value={formData.stallSize}
                      onChange={(e) => handleChange("stallSize", e.target.value)}
                      required
                      disabled={isSubmitting || availableStallSizes.length === 0}
                    >
                      <option value="" disabled>Select stall size</option>
                      {availableStallSizes.map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                      {availableStallSizes.length === 0 && (
                        <option value="custom">Custom Size (Please specify in message)</option>
                      )}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="budget" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Budget Range *
                  </label>
                  <div className="relative">
                    <select
                      id="budget"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-zinc-600 rounded-md appearance-none bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 dark:disabled:bg-zinc-900 disabled:cursor-not-allowed"
                      value={formData.budget}
                      onChange={(e) => handleChange("budget", e.target.value)}
                      required
                      disabled={isSubmitting}
                    >
                      <option value="" disabled>Select budget</option>
                      <option value="under-1l">Under ₹1 Lakh</option>
                      <option value="1l-3l">₹1 - 3 Lakhs</option>
                      <option value="3l-5l">₹3 - 5 Lakhs</option>
                      <option value="5l-10l">₹5 - 10 Lakhs</option>
                      <option value="above-10l">Above ₹10 Lakhs</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Additional Requirements
                </label>
                <textarea
                  id="message"
                  className="w-full px-3 py-2 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-gray-100 disabled:bg-gray-100 dark:disabled:bg-zinc-900 disabled:cursor-not-allowed"
                  value={formData.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  placeholder="Tell us about your specific requirements, branding needs, or any special features you want..."
                  rows={3}
                  disabled={isSubmitting}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-4 rounded-md transition-all shadow-sm disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Submit Quote Request
                  </>
                )}
              </button>

              <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                By submitting, you agree to receive communication from our team regarding your stall design inquiry.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
