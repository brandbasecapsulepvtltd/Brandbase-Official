"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import AppointmentForm from "./AppointmentForm";
import SuccessMessage from "./SuccessMessage";

// Configure axios base URL
const API_BASE_URL = "http://localhost:5000/api";

export default function AppointmentContent() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [appointmentConfig, setAppointmentConfig] = useState(null);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

  // Fetch appointment configuration
  useEffect(() => {
    const fetchAppointmentConfig = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/appointment-config`);
        if (response.data.success) {
          setAppointmentConfig(response.data.data);
          console.log("Appointment config loaded:", response.data.data);
        }
      } catch (err) {
        console.error("Error fetching appointment config:", err);
      }
    };

    fetchAppointmentConfig();
  }, []);

  // Update available time slots when date changes
  useEffect(() => {
    if (selectedDate && appointmentConfig) {
      const dayName = selectedDate.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
      console.log("Selected day:", dayName);
      
      const daySchedule = appointmentConfig.weeklySchedule.find(day => day.day === dayName);
      console.log("Day schedule:", daySchedule);
      
      if (daySchedule && daySchedule.enabled) {
        setAvailableTimeSlots(daySchedule.customSlots || []);
        console.log("Available time slots:", daySchedule.customSlots);
      } else {
        setAvailableTimeSlots([]);
        console.log("Day is disabled or no schedule found");
      }
      setSelectedTime(""); // Reset selected time when date changes
    }
  }, [selectedDate, appointmentConfig]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  const isFormValid = () => {
    return (
      selectedDate &&
      selectedTime &&
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

    setLoading(true);
    setError("");

    try {
      // Format the data to match backend expectations
      const appointmentData = {
        appointmentDate: selectedDate.toISOString(),
        appointmentTime: selectedTime,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        organization: formData.organization,
        region: formData.region,
        industry: formData.industry,
        otherIndustry: formData.otherIndustry,
        category: formData.category,
        otherCategory: formData.otherCategory,
        message: formData.message,
        country: formData.country,
        state: formData.state,
        city: formData.city,
        consent: formData.consent,
        marketing: formData.marketing
      };

      console.log("Sending data to backend:", appointmentData);

      const response = await axios.post(`${API_BASE_URL}/appointments`, appointmentData);

      if (response.data.success) {
        setShowSuccess(true);
        // Reset form after success
        setTimeout(() => {
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
        }, 3000);
      }
    } catch (err) {
      console.error("Error booking appointment:", err);
      
      if (err.response?.data?.errors) {
        setError(`Please fix the following errors:\n${err.response.data.errors.join('\n')}`);
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.code === 'NETWORK_ERROR' || err.code === 'ECONNREFUSED') {
        setError("Cannot connect to server. Please make sure the backend is running on port 5000.");
      } else {
        setError("Failed to book appointment. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setShowSuccess(false);
    setError("");
  };

  // Check if a date is disabled
  const isDateDisabled = (date) => {
    if (!appointmentConfig) {
      console.log("No appointment config available");
      return false;
    }

    // Check if date is in the past
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) {
      console.log("Date is in the past");
      return true;
    }

    // Check if date is in disabled dates
    const isDisabledDate = appointmentConfig.disabledDates.some(disabledDate => {
      const disabled = new Date(disabledDate.date);
      const isDisabled = date.toDateString() === disabled.toDateString();
      if (isDisabled) console.log("Date is disabled:", disabledDate);
      return isDisabled;
    });
    if (isDisabledDate) return true;

    // Check if day of week is disabled
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    const daySchedule = appointmentConfig.weeklySchedule.find(day => day.day === dayName);
    const isDayDisabled = !daySchedule || !daySchedule.enabled;
    
    if (isDayDisabled) {
      console.log("Day is disabled:", dayName);
    }
    
    return isDayDisabled;
  };

  if (showSuccess) {
    return <SuccessMessage onReset={resetForm} />;
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-serif">
            Schedule Your <span className="text-[#FF6600]">Consultation</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Book a consultation with our exhibition stall design experts. Select your preferred date and time.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700 whitespace-pre-line">{error}</p>
              </div>
            </div>
          </div>
        )}

        <AppointmentForm
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          isFormValid={isFormValid}
          timeSlots={availableTimeSlots}
          loading={loading}
          isDateDisabled={isDateDisabled}
        />
      </div>
    </div>
  );
}