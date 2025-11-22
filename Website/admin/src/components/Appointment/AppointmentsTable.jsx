"use client";

import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

export default function AppointmentsTable() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [updatingStatus, setUpdatingStatus] = useState(null);
  const [activeTab, setActiveTab] = useState("appointments");
  const [appointmentConfig, setAppointmentConfig] = useState(null);
  const [configLoading, setConfigLoading] = useState(false);
  const [configError, setConfigError] = useState("");

  // Form states for configuration
  const [weeklySchedule, setWeeklySchedule] = useState([]);
  const [disabledDates, setDisabledDates] = useState([]);
  const [disabledTimeSlots, setDisabledTimeSlots] = useState([]);
  const [newDisabledDate, setNewDisabledDate] = useState("");
  const [newDisabledDateDesc, setNewDisabledDateDesc] = useState("");
  const [newTimeSlot, setNewTimeSlot] = useState({ startTime: "", endTime: "", description: "" });

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
    completed: "bg-blue-100 text-blue-800"
  };

  // Fetch appointments
  const fetchAppointments = async (page = 1, status = statusFilter, search = searchTerm) => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/appointments`, {
        params: {
          page,
          limit: 20,
          status: status === "all" ? "" : status,
          search: search || ""
        }
      });

      if (response.data.success) {
        setAppointments(response.data.data);
        setTotalPages(response.data.pagination.totalPages);
        setCurrentPage(response.data.pagination.currentPage);
      }
    } catch (err) {
      console.error("Error fetching appointments:", err);
      setError("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  // Fetch appointment configuration
  const fetchAppointmentConfig = async () => {
    try {
      setConfigLoading(true);
      const response = await axios.get(`${API_BASE_URL}/appointment-config`);
      if (response.data.success) {
        const config = response.data.data;
        setAppointmentConfig(config);
        setWeeklySchedule(config.weeklySchedule || []);
        setDisabledDates(config.disabledDates || []);
        setDisabledTimeSlots(config.disabledTimeSlots || []);
      }
    } catch (err) {
      console.error("Error fetching appointment config:", err);
      setConfigError("Failed to load appointment configuration");
    } finally {
      setConfigLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
    fetchAppointmentConfig();
  }, []);

  // Handle status update
  const handleStatusUpdate = async (appointmentId, newStatus) => {
    try {
      setUpdatingStatus(appointmentId);
      const response = await axios.patch(
        `${API_BASE_URL}/appointments/${appointmentId}/status`,
        { status: newStatus }
      );

      if (response.data.success) {
        setAppointments(prev =>
          prev.map(apt =>
            apt._id === appointmentId ? { ...apt, status: newStatus } : apt
          )
        );
      }
    } catch (err) {
      console.error("Error updating status:", err);
      setError("Failed to update appointment status");
    } finally {
      setUpdatingStatus(null);
    }
  };

  // Handle delete appointment
  const handleDelete = async (appointmentId) => {
    if (!confirm("Are you sure you want to delete this appointment?")) {
      return;
    }

    try {
      const response = await axios.delete(`${API_BASE_URL}/appointments/${appointmentId}`);
      
      if (response.data.success) {
        setAppointments(prev => prev.filter(apt => apt._id !== appointmentId));
      }
    } catch (err) {
      console.error("Error deleting appointment:", err);
      setError("Failed to delete appointment");
    }
  };

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    fetchAppointments(1, statusFilter, searchTerm);
  };

  // Handle filter change
  const handleFilterChange = (newStatus) => {
    setStatusFilter(newStatus);
    fetchAppointments(1, newStatus, searchTerm);
  };

  // Configuration handlers
  const handleDayToggle = (dayIndex) => {
    const updatedSchedule = [...weeklySchedule];
    updatedSchedule[dayIndex].enabled = !updatedSchedule[dayIndex].enabled;
    setWeeklySchedule(updatedSchedule);
  };

  const handleTimeSlotsChange = (dayIndex, value) => {
    const updatedSchedule = [...weeklySchedule];
    updatedSchedule[dayIndex].customSlots = value.split(',').map(slot => slot.trim()).filter(slot => slot);
    setWeeklySchedule(updatedSchedule);
  };

  const handleAddDisabledDate = async () => {
    if (!newDisabledDate) {
      setConfigError("Please select a date");
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/appointment-config/disabled-dates`, {
        date: newDisabledDate,
        description: newDisabledDateDesc
      });

      if (response.data.success) {
        setDisabledDates(response.data.data.disabledDates);
        setNewDisabledDate("");
        setNewDisabledDateDesc("");
        setConfigError("");
        fetchAppointmentConfig(); // Refresh config
      }
    } catch (err) {
      console.error("Error adding disabled date:", err);
      setConfigError("Failed to add disabled date");
    }
  };

  const handleRemoveDisabledDate = async (dateId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/appointment-config/disabled-dates/${dateId}`);
      if (response.data.success) {
        setDisabledDates(response.data.data.disabledDates);
        fetchAppointmentConfig(); // Refresh config
      }
    } catch (err) {
      console.error("Error removing disabled date:", err);
      setConfigError("Failed to remove disabled date");
    }
  };

  const handleAddDisabledTimeSlot = async () => {
    if (!newTimeSlot.startTime || !newTimeSlot.endTime) {
      setConfigError("Please provide both start and end time");
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/appointment-config/disabled-slots`, {
        startTime: newTimeSlot.startTime,
        endTime: newTimeSlot.endTime,
        description: newTimeSlot.description,
        recurring: true
      });

      if (response.data.success) {
        setDisabledTimeSlots(response.data.data.disabledTimeSlots);
        setNewTimeSlot({ startTime: "", endTime: "", description: "" });
        setConfigError("");
        fetchAppointmentConfig(); // Refresh config
      }
    } catch (err) {
      console.error("Error adding disabled time slot:", err);
      setConfigError("Failed to add disabled time slot");
    }
  };

  const handleRemoveDisabledTimeSlot = async (slotId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/appointment-config/disabled-slots/${slotId}`);
      if (response.data.success) {
        setDisabledTimeSlots(response.data.data.disabledTimeSlots);
        fetchAppointmentConfig(); // Refresh config
      }
    } catch (err) {
      console.error("Error removing disabled time slot:", err);
      setConfigError("Failed to remove disabled time slot");
    }
  };

  const handleSaveConfiguration = async () => {
    try {
      setConfigLoading(true);
      const response = await axios.put(`${API_BASE_URL}/appointment-config`, {
        weeklySchedule,
        disabledDates,
        disabledTimeSlots,
        bufferTime: appointmentConfig?.bufferTime || 0,
        maxAppointmentsPerDay: appointmentConfig?.maxAppointmentsPerDay || 20,
        workingHours: appointmentConfig?.workingHours || { start: "9:00 AM", end: "5:00 PM" }
      });

      if (response.data.success) {
        setAppointmentConfig(response.data.data);
        setConfigError("");
        fetchAppointmentConfig(); // Refresh config
        alert("Configuration saved successfully!");
      }
    } catch (err) {
      console.error("Error saving configuration:", err);
      setConfigError("Failed to save configuration");
    } finally {
      setConfigLoading(false);
    }
  };

  const handleResetToDefault = async () => {
    if (!confirm("Are you sure you want to reset to default configuration?")) {
      return;
    }

    try {
      // Reset to default values
      const defaultSchedule = [
        { day: 'monday', enabled: true, customSlots: ["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM"] },
        { day: 'tuesday', enabled: true, customSlots: ["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM"] },
        { day: 'wednesday', enabled: true, customSlots: ["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM"] },
        { day: 'thursday', enabled: true, customSlots: ["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM"] },
        { day: 'friday', enabled: true, customSlots: ["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM"] },
        { day: 'saturday', enabled: false, customSlots: [] },
        { day: 'sunday', enabled: false, customSlots: [] }
      ];

      const response = await axios.put(`${API_BASE_URL}/appointment-config`, {
        weeklySchedule: defaultSchedule,
        disabledDates: [],
        disabledTimeSlots: [{ startTime: "12:00 PM", endTime: "1:00 PM", description: "Lunch break", recurring: true }],
        bufferTime: 0,
        maxAppointmentsPerDay: 20,
        workingHours: { start: "9:00 AM", end: "5:00 PM" }
      });

      if (response.data.success) {
        setAppointmentConfig(response.data.data);
        setWeeklySchedule(defaultSchedule);
        setDisabledDates([]);
        setDisabledTimeSlots([{ startTime: "12:00 PM", endTime: "1:00 PM", description: "Lunch break", recurring: true }]);
        setConfigError("");
        fetchAppointmentConfig(); // Refresh config
        alert("Configuration reset to default successfully!");
      }
    } catch (err) {
      console.error("Error resetting configuration:", err);
      setConfigError("Failed to reset configuration");
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading && appointments.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6600]"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-orange-600 mb-2">Appointments Management</h1>
        <p className="text-gray-900">Manage all appointment bookings</p>
      </div>

      {/* Sub Navbar */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab("appointments")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "appointments"
                ? "border-[#FF6600] text-[#FF6600]"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Appointments
          </button>
          <button
            onClick={() => setActiveTab("config")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "config"
                ? "border-[#FF6600] text-[#FF6600]"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Appointments Config
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === "appointments" ? (
        <>
          {/* Filters and Search */}
          <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between">
            <div className="flex gap-2 flex-wrap">
              {["all", "pending", "confirmed", "cancelled", "completed"].map((status) => (
                <button
                  key={status}
                  onClick={() => handleFilterChange(status)}
                  className={`px-4 py-2 rounded-lg font-medium capitalize ${
                    statusFilter === status
                      ? "bg-[#FF6600] text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

            <form onSubmit={handleSearch} className="flex gap-2">
              <input
                type="text"
                placeholder="Search by name, email, or organization..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6600] focus:border-transparent"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#FF6600] text-white rounded-lg hover:bg-orange-600"
              >
                Search
              </button>
            </form>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {/* Appointments Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Appointment
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {appointments.map((appointment) => (
                  <tr key={appointment._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="font-medium text-gray-900">
                          {appointment.firstName} {appointment.lastName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {appointment.organization}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm">
                        <div className="text-gray-900">{appointment.email}</div>
                        <div className="text-gray-500">
                          {appointment.city}, {appointment.country}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm">
                        <div className="font-medium text-gray-900">
                          {formatDate(appointment.appointmentDate)}
                        </div>
                        <div className="text-gray-500">{appointment.appointmentTime}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 capitalize">
                        {appointment.category.replace(/-/g, ' ')}
                      </div>
                      <div className="text-xs text-gray-500 capitalize">
                        {appointment.industry}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={appointment.status}
                        onChange={(e) => handleStatusUpdate(appointment._id, e.target.value)}
                        disabled={updatingStatus === appointment._id}
                        className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${
                          statusColors[appointment.status]
                        } border-0 focus:ring-2 focus:ring-[#FF6600]`}
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="completed">Completed</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleDelete(appointment._id)}
                        className="text-red-600 hover:text-red-900 ml-4"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {appointments.length === 0 && !loading && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📅</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments found</h3>
              <p className="text-gray-500">
                {searchTerm || statusFilter !== "all" 
                  ? "Try changing your filters or search terms"
                  : "No appointments have been booked yet"
                }
              </p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6 flex justify-between items-center">
              <button
                onClick={() => fetchAppointments(currentPage - 1, statusFilter, searchTerm)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300"
              >
                Previous
              </button>
              
              <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              
              <button
                onClick={() => fetchAppointments(currentPage + 1, statusFilter, searchTerm)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300"
              >
                Next
              </button>
            </div>
          )}
        </>
      ) : (
        /* Appointments Config Content */
        <div className="space-y-8">
          {/* Configuration Header */}
          <div className="text-center">
            <h3 className="text-xl font-medium text-gray-900 mb-2">Appointments Configuration</h3>
            <p className="text-gray-600">
              Configure availability, time slots, and disabled dates
            </p>
          </div>

          {/* Error Message */}
          {configError && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700">{configError}</p>
            </div>
          )}

          {/* Weekly Schedule Configuration */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h4 className="text-lg font-medium text-gray-900 mb-4">Weekly Schedule</h4>
            <p className="text-sm text-gray-600 mb-6">
              Set available time slots for each day of the week
            </p>
            
            {configLoading && weeklySchedule.length === 0 ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF6600]"></div>
              </div>
            ) : (
              <div className="space-y-4">
                {weeklySchedule.map((day, index) => (
                  <div key={day.day} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4 flex-1">
                      <span className="w-24 font-medium text-gray-900 capitalize">{day.day}</span>
                      <div className="flex-1">
                        <input
                          type="text"
                          placeholder="9:00 AM, 9:30 AM, 10:00 AM, ..."
                          value={day.customSlots?.join(', ') || ''}
                          onChange={(e) => handleTimeSlotsChange(index, e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6600] focus:border-transparent"
                          disabled={!day.enabled}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Enter time slots separated by commas
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-[#FF6600] focus:ring-[#FF6600]"
                          checked={day.enabled}
                          onChange={() => handleDayToggle(index)}
                        />
                        <span className="ml-2 text-sm text-gray-700">Available</span>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Disabled Dates Configuration */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h4 className="text-lg font-medium text-gray-900 mb-4">Disabled Dates</h4>
            <p className="text-sm text-gray-600 mb-6">
              Add specific dates when appointments are not available (holidays, maintenance, etc.)
            </p>
            
            <div className="space-y-4">
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Add Disabled Date
                  </label>
                  <input
                    type="date"
                    value={newDisabledDate}
                    onChange={(e) => setNewDisabledDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6600] focus:border-transparent"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description (optional)
                  </label>
                  <input
                    type="text"
                    placeholder="Holiday, Maintenance, etc."
                    value={newDisabledDateDesc}
                    onChange={(e) => setNewDisabledDateDesc(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6600] focus:border-transparent"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    onClick={handleAddDisabledDate}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                  >
                    Add Date
                  </button>
                </div>
              </div>
              
              <div className="mt-4">
                <h5 className="text-sm font-medium text-gray-700 mb-3">Currently Disabled Dates:</h5>
                <div className="space-y-2">
                  {disabledDates.length === 0 ? (
                    <p className="text-gray-500 text-sm">No disabled dates configured</p>
                  ) : (
                    disabledDates.map((disabledDate) => (
                      <div key={disabledDate._id} className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                        <div>
                          <span className="text-red-700">
                            {new Date(disabledDate.date).toLocaleDateString()}
                          </span>
                          {disabledDate.description && (
                            <span className="text-red-600 text-sm ml-2">({disabledDate.description})</span>
                          )}
                        </div>
                        <button
                          onClick={() => handleRemoveDisabledDate(disabledDate._id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Remove
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Disabled Time Slots Configuration */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h4 className="text-lg font-medium text-gray-900 mb-4">Disabled Time Slots</h4>
            <p className="text-sm text-gray-600 mb-6">
              Disable specific time slots across all days
            </p>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Time
                  </label>
                  <input
                    type="time"
                    value={newTimeSlot.startTime}
                    onChange={(e) => setNewTimeSlot(prev => ({ ...prev, startTime: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6600] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Time
                  </label>
                  <input
                    type="time"
                    value={newTimeSlot.endTime}
                    onChange={(e) => setNewTimeSlot(prev => ({ ...prev, endTime: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6600] focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description (optional)
                  </label>
                  <input
                    type="text"
                    placeholder="Lunch break, Maintenance, etc."
                    value={newTimeSlot.description}
                    onChange={(e) => setNewTimeSlot(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6600] focus:border-transparent"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    onClick={handleAddDisabledTimeSlot}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                  >
                    Add Time Slot
                  </button>
                </div>
              </div>
              
              <div className="mt-4">
                <h5 className="text-sm font-medium text-gray-700 mb-3">Currently Disabled Time Slots:</h5>
                <div className="space-y-2">
                  {disabledTimeSlots.length === 0 ? (
                    <p className="text-gray-500 text-sm">No disabled time slots configured</p>
                  ) : (
                    disabledTimeSlots.map((slot) => (
                      <div key={slot._id} className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div>
                          <span className="text-yellow-700">{slot.startTime} - {slot.endTime}</span>
                          {slot.description && (
                            <span className="text-yellow-600 text-sm ml-2">({slot.description})</span>
                          )}
                        </div>
                        <button
                          onClick={() => handleRemoveDisabledTimeSlot(slot._id)}
                          className="text-yellow-600 hover:text-yellow-800"
                        >
                          Remove
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              onClick={handleResetToDefault}
              disabled={configLoading}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50"
            >
              Reset to Default
            </button>
            <button
              onClick={handleSaveConfiguration}
              disabled={configLoading}
              className="px-6 py-2 bg-[#FF6600] text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 flex items-center"
            >
              {configLoading && (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              Save All Configurations
            </button>
          </div>
        </div>
      )}
    </div>
  );
}