"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import DatePicker from "react-datepicker";
import { format, isBefore, isSameDay, startOfDay } from "date-fns";
import {
  Calendar,
  Clock,
  MapPin,
  Mail,
  MessageCircle,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  AlertCircle,
  Video,
  FileText,
} from "lucide-react";
import Breadcrumbs from "@/components/General/Breadcrumbs";
import ContactFAQ from "@/components/Contact/ContactFAQ";
import { api } from "@/lib/api";
import { CONTACT, APPOINTMENT_FAQS } from "@/lib/contactConstants";
import "react-datepicker/dist/react-datepicker.css";

const INITIAL_FORM = {
  firstName: "",
  lastName: "",
  email: "",
  organization: "",
  region: "",
  industry: "",
  otherIndustry: "",
  category: "",
  otherCategory: "",
  message: "",
  country: "",
  state: "",
  city: "",
  contactNumber: "",
  consent: false,
  marketing: false,
};

const TIME_SLOTS = [
  "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
  "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM",
  "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM",
];

const WHAT_TO_EXPECT = [
  { icon: Video, title: "Discovery call", text: "30-minute video or in-person session with a senior strategist." },
  { icon: FileText, title: "Project review", text: "We walk through your goals, scope, timeline, and budget." },
  { icon: CheckCircle2, title: "Next steps", text: "Receive a tailored proposal within 48 hours if we're a fit." },
];

const QUICK_CONTACT = [
  { icon: Mail, label: "Email", value: CONTACT.email, href: `mailto:${CONTACT.email}` },
  { icon: MessageCircle, label: "WhatsApp", value: "Chat now", href: CONTACT.whatsappUrl },
  { icon: FileText, label: "Contact", value: "Send a message", href: "/contact#contact-form" },
];

const inputClass =
  "w-full border border-gray-200 dark:border-zinc-700 dark:bg-zinc-800 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-[#FF6600] focus:border-[#FF6600] outline-none transition-colors";

const selectClass = `${inputClass} appearance-none`;

export default function AppointmentContent() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const isDateDisabled = (date) =>
    date.getDay() === 0 || isBefore(startOfDay(date), startOfDay(new Date()));

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) setError("");
  };

  const handleDateChange = (date) => {
    if (!isDateDisabled(date)) {
      setSelectedDate(date);
      setSelectedTime("");
    }
  };

  const isFormValid = () =>
    formData.firstName.trim() &&
    formData.lastName.trim() &&
    formData.email.trim() &&
    formData.organization.trim() &&
    formData.region &&
    formData.industry &&
    (formData.industry !== "other" || formData.otherIndustry.trim()) &&
    formData.category &&
    (formData.category !== "other" || formData.otherCategory.trim()) &&
    formData.message.trim() &&
    formData.country.trim() &&
    formData.state.trim() &&
    formData.city.trim() &&
    formData.contactNumber.trim() &&
    formData.consent;

  const handleNextStep = () => {
    if (!selectedDate || !selectedTime) {
      setError("Please select both date and time to continue.");
      return;
    }
    setCurrentStep(2);
    setError("");
  };

  const resetBooking = () => {
    setShowSuccess(false);
    setSelectedDate(null);
    setSelectedTime("");
    setCurrentStep(1);
    setFormData(INITIAL_FORM);
    setError("");
  };

  const handleSubmit = async () => {
    if (!isFormValid()) {
      setError("Please fill in all required fields correctly.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!/^[\d\s\-\+\(\)]{10,}$/.test(formData.contactNumber)) {
      setError("Please enter a valid phone number.");
      return;
    }

    if (!selectedDate || !selectedTime) {
      setError("Please select both date and time to continue.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const payload = {
        ...formData,
        appointmentDate: selectedDate.toISOString(),
        appointmentTime: selectedTime,
        name: `${formData.firstName} ${formData.lastName}`,
        contactNumber: formData.contactNumber,
      };

      const response = await api.createAppointment(payload);

      if (response.success === true || response.status === 200 || response.status === 201) {
        setShowSuccess(true);
      } else {
        setError(
          response.message ||
            response.error?.message ||
            "Failed to create appointment. Please try again."
        );
      }
    } catch (err) {
      if (err.message?.includes("401") || err.message?.includes("403")) {
        setError("Authentication failed. Please try again later.");
      } else if (err.message?.includes("Network") || err.message?.includes("fetch")) {
        setError("Network error. Please check your connection and try again.");
      } else {
        setError(err.message || "An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-white dark:bg-zinc-950 flex items-center justify-center px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl p-10 md:p-12 text-center max-w-xl w-full border border-gray-100 dark:border-zinc-800"
        >
          <div className="w-20 h-20 mx-auto bg-[#FF6600] text-white rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 className="w-10 h-10" aria-hidden="true" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Appointment Confirmed
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
            Your consultation is scheduled. We&apos;ll send a confirmation to{" "}
            <span className="font-medium text-gray-900 dark:text-white">{formData.email}</span>.
          </p>
          <div className="bg-[#FF6600]/5 rounded-2xl p-6 mb-8 border border-[#FF6600]/20 text-left">
            <p className="text-sm font-semibold uppercase tracking-wide text-[#FF6600] mb-2">
              Your slot
            </p>
            <p className="font-semibold text-gray-900 dark:text-white">
              {selectedDate && format(selectedDate, "EEEE, MMMM d, yyyy")} at {selectedTime}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              {formData.contactNumber} · {formData.organization}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              type="button"
              onClick={resetBooking}
              className="px-8 py-3.5 bg-[#FF6600] hover:bg-[#E55A00] text-white font-semibold rounded-xl transition-colors"
            >
              Book Another Slot
            </button>
            <Link
              href="/contact"
              className="px-8 py-3.5 border-2 border-[#FF6600] text-[#FF6600] hover:bg-[#FF6600] hover:text-white font-semibold rounded-xl transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-gray-900 dark:text-gray-100">
      {/* Hero */}
      <section className="relative pt-24 pb-12 md:pb-16 px-4 md:px-8 overflow-hidden border-b border-gray-100 dark:border-zinc-800">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#FF6600]/5 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Book Appointment", href: "/appointment" },
            ]}
          />
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-semibold uppercase tracking-widest text-[#FF6600] mb-4"
          >
            Free 30-Minute Consultation
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-4xl md:text-5xl font-bold mb-5 leading-tight text-gray-900 dark:text-white"
          >
            Schedule Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6600] to-orange-500">
              Strategy Call
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Pick a date and time, tell us about your project, and our team will confirm within 24 hours.
          </motion.p>
        </div>
      </section>

      {/* Quick contact strip */}
      <section className="py-6 px-4 bg-gray-50 dark:bg-zinc-900/50 border-b border-gray-100 dark:border-zinc-800" aria-label="Quick contact">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-3 gap-3">
          {QUICK_CONTACT.map(({ icon: Icon, label, value, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 hover:border-[#FF6600]/40 transition-all group"
            >
              <div className="p-2.5 rounded-lg bg-[#FF6600]/10 text-[#FF6600] group-hover:bg-[#FF6600] group-hover:text-white transition-colors">
                <Icon className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500">{label}</p>
                <p className="font-semibold text-sm">{value}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Booking */}
      <section className="py-12 md:py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_320px] gap-10 lg:gap-12 items-start">
          <div>
            {/* Progress */}
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                    currentStep >= 1
                      ? "bg-[#FF6600] text-white"
                      : "bg-gray-100 dark:bg-zinc-800 text-gray-400"
                  }`}
                >
                  1
                </div>
                <div
                  className={`w-16 sm:w-24 h-1 rounded-full transition-colors ${
                    currentStep > 1 ? "bg-[#FF6600]" : "bg-gray-200 dark:bg-zinc-700"
                  }`}
                />
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                    currentStep >= 2
                      ? "bg-[#FF6600] text-white"
                      : "bg-gray-100 dark:bg-zinc-800 text-gray-400"
                  }`}
                >
                  2
                </div>
              </div>
            </div>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-6">
              Step {currentStep} of 2 —{" "}
              {currentStep === 1 ? "Select date & time" : "Your details"}
            </p>

            {error && (
              <div
                role="alert"
                className="mb-6 flex items-start gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-sm"
              >
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" aria-hidden="true" />
                <span>{error}</span>
              </div>
            )}

            {/* Step 1 */}
            {currentStep === 1 && (
              <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-lg border border-gray-100 dark:border-zinc-800 p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-[#FF6600]/10 text-[#FF6600]">
                    <Calendar className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Select Date & Time</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Mon–Sat · {CONTACT.hours}</p>
                  </div>
                </div>

                <div className="flex justify-center mb-6">
                  <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    inline
                    filterDate={(date) => !isDateDisabled(date)}
                    dayClassName={(date) =>
                      isDateDisabled(date)
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed rounded-lg"
                        : selectedDate && isSameDay(date, selectedDate)
                          ? "bg-[#FF6600] text-white rounded-lg"
                          : "hover:bg-[#FF6600]/10 cursor-pointer rounded-lg"
                    }
                    calendarClassName="!text-sm !rounded-2xl !shadow-md !border !border-gray-200 dark:!border-zinc-700 !p-4"
                  />
                </div>

                {selectedDate && (
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#FF6600]" aria-hidden="true" />
                      Available slots — {format(selectedDate, "MMM d, yyyy")}
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mb-6">
                      {TIME_SLOTS.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedTime(slot)}
                          disabled={isLoading}
                          className={`py-2.5 px-3 rounded-xl text-sm font-medium border transition-all ${
                            selectedTime === slot
                              ? "bg-[#FF6600] text-white border-[#FF6600]"
                              : "border-gray-200 dark:border-zinc-700 hover:border-[#FF6600]/50 hover:bg-[#FF6600]/5"
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {(selectedDate || selectedTime) && (
                  <div className="mb-6 p-4 rounded-xl bg-[#FF6600]/5 border border-[#FF6600]/20 text-sm">
                    <span className="font-semibold text-[#FF6600]">Selected: </span>
                    {selectedDate && format(selectedDate, "MMMM d, yyyy")}
                    {selectedTime && ` at ${selectedTime}`}
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleNextStep}
                  disabled={!selectedDate || !selectedTime || isLoading}
                  className="w-full bg-[#FF6600] hover:bg-[#E55A00] disabled:opacity-50 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  Continue to Details
                  <ArrowRight className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
            )}

            {/* Step 2 */}
            {currentStep === 2 && (
              <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-lg border border-gray-100 dark:border-zinc-800 p-6 md:p-8">
                <button
                  type="button"
                  onClick={() => { setCurrentStep(1); setError(""); }}
                  disabled={isLoading}
                  className="flex items-center gap-2 text-[#FF6600] hover:text-[#E55A00] font-medium mb-6 text-sm"
                >
                  <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                  Back to date & time
                </button>

                <div className="mb-6 p-4 rounded-xl bg-[#FF6600]/5 border border-[#FF6600]/20">
                  <p className="text-sm font-semibold text-[#FF6600] mb-1">Appointment</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {selectedDate && format(selectedDate, "EEEE, MMMM d, yyyy")} at {selectedTime}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium block mb-1">First Name *</label>
                      <input
                        className={inputClass}
                        value={formData.firstName}
                        onChange={(e) => handleChange("firstName", e.target.value)}
                        disabled={isLoading}
                        autoComplete="given-name"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium block mb-1">Last Name *</label>
                      <input
                        className={inputClass}
                        value={formData.lastName}
                        onChange={(e) => handleChange("lastName", e.target.value)}
                        disabled={isLoading}
                        autoComplete="family-name"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium block mb-1">Email *</label>
                      <input
                        type="email"
                        className={inputClass}
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        disabled={isLoading}
                        autoComplete="email"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium block mb-1">Phone *</label>
                      <input
                        type="tel"
                        className={inputClass}
                        value={formData.contactNumber}
                        onChange={(e) => handleChange("contactNumber", e.target.value)}
                        disabled={isLoading}
                        autoComplete="tel"
                        placeholder="+91 12345 67890"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium block mb-1">Organization *</label>
                    <input
                      className={inputClass}
                      value={formData.organization}
                      onChange={(e) => handleChange("organization", e.target.value)}
                      disabled={isLoading}
                      autoComplete="organization"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium block mb-1">Region *</label>
                      <select
                        className={selectClass}
                        value={formData.region}
                        onChange={(e) => handleChange("region", e.target.value)}
                        disabled={isLoading}
                      >
                        <option value="">Select region</option>
                        <option value="asia">Asia</option>
                        <option value="europe">Europe</option>
                        <option value="america">America</option>
                        <option value="africa">Africa</option>
                        <option value="oceania">Oceania</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium block mb-1">Industry *</label>
                      <select
                        className={selectClass}
                        value={formData.industry}
                        onChange={(e) => handleChange("industry", e.target.value)}
                        disabled={isLoading}
                      >
                        <option value="">Select industry</option>
                        <option value="technology">Technology</option>
                        <option value="healthcare">Healthcare</option>
                        <option value="finance">Finance</option>
                        <option value="education">Education</option>
                        <option value="retail">Retail</option>
                        <option value="manufacturing">Manufacturing</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  {formData.industry === "other" && (
                    <input
                      className={inputClass}
                      placeholder="Specify your industry *"
                      value={formData.otherIndustry}
                      onChange={(e) => handleChange("otherIndustry", e.target.value)}
                      disabled={isLoading}
                    />
                  )}

                  <div>
                    <label className="text-sm font-medium block mb-1">Service category *</label>
                    <select
                      className={selectClass}
                      value={formData.category}
                      onChange={(e) => handleChange("category", e.target.value)}
                      disabled={isLoading}
                    >
                      <option value="">Select service</option>
                      <option value="web design">Web Design</option>
                      <option value="web/mobile application">Web/Mobile Application</option>
                      <option value="film making">Film Making</option>
                      <option value="digital marketing">Digital Marketing</option>
                      <option value="e-commerce deployment">E-commerce Deployment</option>
                      <option value="shm">SHM</option>
                      <option value="lms">LMS</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {formData.category === "other" && (
                    <input
                      className={inputClass}
                      placeholder="Specify your service *"
                      value={formData.otherCategory}
                      onChange={(e) => handleChange("otherCategory", e.target.value)}
                      disabled={isLoading}
                    />
                  )}

                  <div>
                    <label className="text-sm font-medium block mb-1">Project details *</label>
                    <textarea
                      className={`${inputClass} resize-y min-h-[120px]`}
                      rows={4}
                      value={formData.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      maxLength={1500}
                      disabled={isLoading}
                      placeholder="Tell us about your project, goals, and timeline..."
                    />
                    <p className="text-xs text-gray-500 text-right mt-1">{formData.message.length}/1500</p>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-3">
                      <label className="text-sm font-medium block mb-1">Country *</label>
                      <input
                        className={inputClass}
                        value={formData.country}
                        onChange={(e) => handleChange("country", e.target.value)}
                        disabled={isLoading}
                        autoComplete="country-name"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium block mb-1">State *</label>
                      <input
                        className={inputClass}
                        value={formData.state}
                        onChange={(e) => handleChange("state", e.target.value)}
                        disabled={isLoading}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-sm font-medium block mb-1">City *</label>
                      <input
                        className={inputClass}
                        value={formData.city}
                        onChange={(e) => handleChange("city", e.target.value)}
                        disabled={isLoading}
                        autoComplete="address-level2"
                      />
                    </div>
                  </div>

                  <div className="space-y-3 pt-2">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.consent}
                        onChange={(e) => handleChange("consent", e.target.checked)}
                        disabled={isLoading}
                        className="mt-1 text-[#FF6600] focus:ring-[#FF6600] rounded"
                      />
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        I consent to processing of my data per the{" "}
                        <Link href="/privacy-policy" className="text-[#FF6600] underline hover:no-underline">
                          Privacy Policy
                        </Link>
                        . *
                      </span>
                    </label>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.marketing}
                        onChange={(e) => handleChange("marketing", e.target.checked)}
                        disabled={isLoading}
                        className="mt-1 text-[#FF6600] focus:ring-[#FF6600] rounded"
                      />
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        Send me updates about services, events, and offers.
                      </span>
                    </label>
                  </div>

                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!isFormValid() || isLoading}
                    className="w-full bg-[#FF6600] hover:bg-[#E55A00] disabled:opacity-50 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors mt-2"
                  >
                    {isLoading ? (
                      <>
                        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Calendar className="w-5 h-5" aria-hidden="true" />
                        Confirm Appointment
                      </>
                    )}
                  </button>

                  <p className="text-xs text-gray-500 text-center">
                    Your information is encrypted and never shared with third parties.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-28">
            <div className="rounded-2xl border border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900/50 p-6">
              <h2 className="font-bold text-gray-900 dark:text-white mb-4">What to expect</h2>
              <ul className="space-y-4">
                {WHAT_TO_EXPECT.map(({ icon: Icon, title, text }) => (
                  <li key={title} className="flex gap-3">
                    <div className="p-2 rounded-lg bg-[#FF6600]/10 text-[#FF6600] shrink-0 h-fit">
                      <Icon className="w-4 h-4" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-gray-900 dark:text-white">{title}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-gray-100 dark:border-zinc-800 p-6">
              <h2 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#FF6600]" aria-hidden="true" />
                Office hours
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">{CONTACT.hours}</p>
            </div>

            <div className="rounded-2xl border border-[#FF6600]/20 bg-[#FF6600]/5 p-6">
              <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Prefer to talk first?
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                Use our contact form or WhatsApp — we&apos;re happy to help you pick a slot.
              </p>
              <div className="flex flex-col gap-2">
              <Link
                href="/contact#contact-form"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#FF6600] hover:text-[#E55A00]"
              >
                <FileText className="w-4 h-4" aria-hidden="true" />
                Contact form
              </Link>
              <a
                href={CONTACT.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#FF6600] hover:text-[#E55A00]"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                Chat on WhatsApp
              </a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <ContactFAQ items={APPOINTMENT_FAQS} />

      {/* Bottom CTA */}
      <section className="py-16 px-4 bg-white dark:bg-zinc-950 border-t border-gray-100 dark:border-zinc-800">
        <div className="max-w-3xl mx-auto text-center space-y-5">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Explore our work while you wait
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            See exhibitions, events, and digital projects we&apos;ve delivered for clients worldwide.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/portfolio"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-[#FF6600] hover:bg-[#E55A00] text-white font-semibold rounded-xl transition-colors"
            >
              View Portfolio
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center px-8 py-3.5 border-2 border-[#FF6600] text-[#FF6600] hover:bg-[#FF6600] hover:text-white font-semibold rounded-xl transition-colors"
            >
              Our Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
