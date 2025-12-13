"use client";

import { useState } from "react";
import axios from "@/lib/axios";
import DatePicker from "react-datepicker";
import {
  format,
  isBefore,
  isSameDay,
  addDays,
  startOfDay,
} from "date-fns";
import { Calendar, Clock, User, Building, MapPin, Mail, MessageCircle, CheckCircle2, ArrowLeft, ArrowRight } from 'lucide-react';
import "react-datepicker/dist/react-datepicker.css";

export default function AppointmentContent() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
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
    consent: false,
    marketing: false,
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const timeSlots = [
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
    "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM",
  ];

  const disabledDates = [0].map((d) => addDays(new Date(), d));

  const isDateDisabled = (date) => {
    return (
      date.getDay() === 0 || // Sunday
      isBefore(startOfDay(date), startOfDay(new Date())) || // Past dates
      disabledDates.some((d) => isSameDay(d, date)) // Specific disabled dates
    );
  };

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

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleNextStep = () => {
    if (!selectedDate || !selectedTime) {
      setError("Please select both date and time to continue.");
      return;
    }
    setCurrentStep(2);
    setError("");
  };

  const handleBackStep = () => {
    setCurrentStep(1);
    setError("");
  };

  const isFormValid = () => {
    return (
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
      formData.consent
    );
  };

  const handleSubmit = async () => {
    if (!isFormValid()) {
      setError("Please fill in all required fields correctly.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const formattedDate = selectedDate.toISOString();
      
      const payload = {
        ...formData,
        appointmentDate: formattedDate,
        appointmentTime: selectedTime,
      };

      console.log("Frontend sending payload:", payload);

      const response = await axios.post("/api/appointments", payload);
      
      if (response.data.success) {
        setShowSuccess(true);
        setSelectedDate(null);
        setSelectedTime("");
        setFormData({
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
          consent: false,
          marketing: false,
        });
        setCurrentStep(1);
      } else {
        setError(response.data.message || "Failed to book appointment");
      }
    } catch (err) {
      console.error("Error booking appointment:", err);
      const errorMessage = err.response?.data?.message || 
        err.response?.data?.error || 
        "Failed to book appointment. Please try again.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white p-6 mt-15">
        <div className="bg-white rounded-3xl shadow-2xl p-12 text-center max-w-2xl w-full mx-auto border border-orange-100">
          <div className="w-20 h-20 mx-auto bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full flex items-center justify-center mb-6 shadow-lg">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Appointment Confirmed!</h2>
          <p className="text-xl text-gray-600 mb-6 leading-relaxed">
            Your consultation has been scheduled successfully. We're excited to help you achieve your goals!
          </p>
          <div className="bg-orange-50 rounded-2xl p-6 mb-8 border border-orange-200">
            <p className="text-lg font-semibold text-orange-800 mb-2">Appointment Details</p>
            <p className="text-gray-700">
              {selectedDate && format(selectedDate, "EEEE, MMMM d, yyyy")} at {selectedTime}
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Confirmation sent to {formData.email}
            </p>
          </div>
          <button
            onClick={() => setShowSuccess(false)}
            className="bg-gradient-to-r from-orange-500 to-amber-500 text-white py-4 px-8 rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl"
          >
            Schedule Another Appointment
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="text-center mt-15">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Schedule Your <span className="text-orange-600">Consultation</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Book a personalized consultation with our experts in two simple steps.
            </p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center">
  <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 font-semibold bg-gradient-to-r from-orange-500 to-amber-500 border-orange-500 text-white shadow-lg`}>1</div>

  <div
    className={`flex-1 h-1 mx-4 transition-all duration-300 ${
      currentStep > 1
        ? 'bg-gradient-to-r from-orange-500 to-amber-500'
        : 'bg-gray-300'
    }`}
  />

  <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 font-semibold bg-gradient-to-r from-orange-500 to-amber-500 border-orange-500 text-white shadow-lg`}>2</div>
</div>


        <div className="flex justify-center mb-8">
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-700">
              {currentStep === 1 ? "Select Date & Time" : "Your Information"}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {currentStep === 1 ? "Choose your preferred consultation slot" : "Tell us about yourself and your project"}
            </p>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-8 bg-red-50 border border-red-200 rounded-2xl p-6 max-w-2xl mx-auto shadow-sm">
            <div className="flex items-center justify-center">
              <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <span className="text-red-700 font-medium">{error}</span>
            </div>
          </div>
        )}

        {/* Step 1: Date & Time Selection */}
        {currentStep === 1 && (
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-orange-100 max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-orange-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Select Date & Time</h2>
            </div>

            <div className="flex justify-center mb-8">
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                inline
                filterDate={(date) => !isDateDisabled(date)}
                dayClassName={(date) =>
                  isDateDisabled(date)
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed rounded-lg"
                    : selectedDate && isSameDay(date, selectedDate)
                    ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg shadow-lg"
                    : "hover:bg-orange-50 hover:text-orange-900 cursor-pointer rounded-lg transition-colors"
                }
                calendarClassName="!text-sm !rounded-2xl !shadow-lg !border !border-orange-200 !p-4"
              />
            </div>

            {selectedDate && (
              <div className="mt-8">
                <h3 className="font-semibold text-center text-gray-900 mb-6 text-lg flex items-center justify-center gap-2">
                  <Clock className="w-5 h-5 text-orange-600" />
                  Available Time Slots for {format(selectedDate, "EEEE, MMMM d, yyyy")}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => handleTimeSelect(slot)}
                      disabled={isLoading}
                      className={`p-3 border-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                        selectedTime === slot
                          ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white border-orange-500 shadow-lg scale-105"
                          : "bg-white text-gray-700 border-gray-300 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-700"
                      } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Selected Date & Time Display */}
            {(selectedDate || selectedTime) && (
              <div className="mt-6 p-6 bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl border border-orange-200 shadow-sm mb-8">
                <h4 className="font-bold text-orange-800 mb-3 text-lg">Selected Appointment</h4>
                <div className="flex items-center gap-3 text-orange-700">
                  <Calendar className="w-5 h-5" />
                  <span className="font-semibold">
                    {selectedDate && format(selectedDate, "MMMM d, yyyy")}
                  </span>
                  <span>•</span>
                  <Clock className="w-5 h-5" />
                  <span className="font-semibold">{selectedTime}</span>
                </div>
              </div>
            )}

            {/* Next Button */}
            <button
              onClick={handleNextStep}
              disabled={!selectedDate || !selectedTime || isLoading}
              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-4 rounded-xl hover:from-orange-600 hover:to-amber-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
            >
              Continue to Details
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Step 2: Contact Form */}
        {currentStep === 2 && (
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-orange-100 max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={handleBackStep}
                disabled={isLoading}
                className="flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium transition-colors disabled:opacity-50"
              >
                <ArrowLeft className="w-5 h-5" />
                Back
              </button>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-2">
                  <User className="w-8 h-8 text-orange-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Your Information</h2>
              </div>
              <div className="w-20"></div> {/* Spacer for alignment */}
            </div>

            {/* Appointment Summary */}
            <div className="mb-8 p-6 bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl border border-orange-200">
              <h3 className="font-bold text-orange-800 mb-3 text-lg">Appointment Summary</h3>
              <div className="flex items-center gap-3 text-orange-700">
                <Calendar className="w-5 h-5" />
                <span className="font-semibold">
                  {selectedDate && format(selectedDate, "MMMM d, yyyy")}
                </span>
                <span>•</span>
                <Clock className="w-5 h-5" />
                <span className="font-semibold">{selectedTime}</span>
              </div>
            </div>

            <div className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input 
                    placeholder="First Name *" 
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50"
                    value={formData.firstName}
                    onChange={(e) => handleChange("firstName", e.target.value)}
                    disabled={isLoading}
                  />
                </div>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input 
                    placeholder="Last Name *" 
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50"
                    value={formData.lastName}
                    onChange={(e) => handleChange("lastName", e.target.value)}
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  type="email" 
                  placeholder="Email Address *" 
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  placeholder="Organization *" 
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50"
                  value={formData.organization}
                  onChange={(e) => handleChange("organization", e.target.value)}
                  disabled={isLoading}
                />
              </div>

              {/* Dropdown Sections */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <select 
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 appearance-none"
                    value={formData.region}
                    onChange={(e) => handleChange("region", e.target.value)}
                    disabled={isLoading}
                  >
                    <option value="">Select Region *</option>
                    <option value="asia">Asia</option>
                    <option value="europe">Europe</option>
                    <option value="america">America</option>
                    <option value="africa">Africa</option>
                    <option value="oceania">Oceania</option>
                  </select>
                </div>
                <div>
                  <select 
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 appearance-none"
                    value={formData.industry}
                    onChange={(e) => handleChange("industry", e.target.value)}
                    disabled={isLoading}
                  >
                    <option value="">Select Industry *</option>
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
                <div>
                  <input
                    placeholder="Please specify your industry *"
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50"
                    value={formData.otherIndustry}
                    onChange={(e) => handleChange("otherIndustry", e.target.value)}
                    disabled={isLoading}
                  />
                </div>
              )}

              <div>
                <select 
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 appearance-none"
                  value={formData.category}
                  onChange={(e) => handleChange("category", e.target.value)}
                  disabled={isLoading}
                >
                  <option value="">Select Service Category *</option>
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
                <div>
                  <input
                    placeholder="Please specify your category *"
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50"
                    value={formData.otherCategory}
                    onChange={(e) => handleChange("otherCategory", e.target.value)}
                    disabled={isLoading}
                  />
                </div>
              )}

              <div className="relative">
                <MessageCircle className="absolute left-3 top-4 text-gray-400 w-5 h-5" />
                <textarea 
                  placeholder="How can we help you? Tell us about your project... *" 
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 resize-none"
                  rows="4"
                  value={formData.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  maxLength={1500}
                  disabled={isLoading}
                />
                <div className="text-right text-sm text-gray-500 mt-2">
                  {formData.message.length}/1500 characters
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-3 relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input 
                    placeholder="Country *" 
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50"
                    value={formData.country}
                    onChange={(e) => handleChange("country", e.target.value)}
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <input 
                    placeholder="State *" 
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50"
                    value={formData.state}
                    onChange={(e) => handleChange("state", e.target.value)}
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <input 
                    placeholder="City *" 
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50"
                    value={formData.city}
                    onChange={(e) => handleChange("city", e.target.value)}
                    disabled={isLoading}
                  />
                </div>
              </div>
            </div>

            {/* Consent Section */}
            <div className="mt-8 space-y-4">
              <label className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-orange-300 transition-colors">
                <input 
                  type="checkbox"
                  checked={formData.consent}
                  onChange={(e) => handleChange("consent", e.target.checked)}
                  disabled={isLoading}
                  className="mt-1 w-5 h-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                />
                <span className="text-sm text-gray-700">
                  I consent to the processing of my personal data according to the <a href="/privacy-policy" className="text-orange-600 hover:text-orange-700 underline font-medium">Privacy Policy</a> *
                </span>
              </label>
              <label className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-orange-300 transition-colors">
                <input 
                  type="checkbox"
                  checked={formData.marketing}
                  onChange={(e) => handleChange("marketing", e.target.checked)}
                  disabled={isLoading}
                  className="mt-1 w-5 h-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                />
                <span className="text-sm text-gray-700">
                  I would like to receive marketing communications and updates about new services and offers
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={!isFormValid() || isLoading}
              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-4 mt-8 rounded-xl hover:from-orange-600 hover:to-amber-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
            >
              {isLoading ? (
                <>
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Processing Your Booking...
                </>
              ) : (
                <>
                  <Calendar className="w-6 h-6" />
                  Confirm Appointment
                </>
              )}
            </button>

            <p className="text-xs text-gray-500 mt-6 text-center">
              Your information is secure and encrypted. We respect your privacy.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}