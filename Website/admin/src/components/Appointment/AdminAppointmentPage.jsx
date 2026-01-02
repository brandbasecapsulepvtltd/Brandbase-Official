// components/Appointment/AdminAppointmentPage.jsx
import React, { useEffect, useState } from "react";
import adminAxios from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import { 
  Calendar, 
  Filter, 
  Search, 
  Download, 
  RefreshCw,
  MoreVertical,
  Users, 
  Clock, 
  CheckCircle, 
  CalendarCheck, 
  XCircle, 
} from "lucide-react";

// Status configuration
const statusConfig = {
  pending: { label: "Pending", color: "bg-yellow-100 text-yellow-800 border-yellow-200" },
  confirmed: { label: "Confirmed", color: "bg-green-100 text-green-800 border-green-200" },
  cancelled: { label: "Cancelled", color: "bg-red-100 text-red-800 border-red-200" },
  completed: { label: "Completed", color: "bg-blue-100 text-blue-800 border-blue-200" },
  rescheduled: { label: "Rescheduled", color: "bg-purple-100 text-purple-800 border-purple-200" }
};

const AdminAppointmentPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [stats, setStats] = useState(null);
  const [filters, setFilters] = useState({
    status: "all",
    date: "",
    search: ""
  });
  const [pagination, setPagination] = useState({
    current: 1,
    total: 1,
    results: 0,
    totalRecords: 0
  });
  const navigate = useNavigate();

  // Fetch appointments with filters
  const fetchAppointments = async (page = 1) => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "10",
        ...(filters.status !== "all" && { status: filters.status }),
        ...(filters.date && { date: filters.date }),
      });

      const [appointmentsRes, statsRes] = await Promise.all([
        adminAxios.get(`/api/appointments?${params}`),
        adminAxios.get("/api/appointments/stats/summary")
      ]);

      setAppointments(appointmentsRes.data.data);
      setPagination(appointmentsRes.data.pagination);
      setStats(statsRes.data.data);
      setError("");
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to load appointments. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [filters.status, filters.date]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPagination(prev => ({ ...prev, current: 1 }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchAppointments(1);
  };

  const handleRefresh = () => {
    fetchAppointments(pagination.current);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusBadge = (status) => {
    const config = statusConfig[status] || statusConfig.pending;
    return (
      <span className={`px-3 py-1 text-xs font-medium rounded-full border ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const handleExportCSV = () => {
    // 1. Define the headers
    const headers = [
      "First Name",
      "Last Name",
      "Email",
      "Organization",
      "Region",
      "Date",
      "Time",
      "Category",
      "Industry",
      "Status"
    ];

    // 2. Map the data to rows
    // Note: We use the current 'appointments' state. 
    // To export ALL records, you'd typically fetch all from API first.
    const csvRows = appointments.map(appt => [
      `"${appt.firstName || ''}"`,
      `"${appt.lastName || ''}"`,
      `"${appt.email || ''}"`,
      `"${appt.organization || 'Individual'}"`,
      `"${appt.region || ''}"`,
      `"${formatDate(appt.date)}"`,
      `"${appt.time || ''}"`,
      `"${appt.category || ''}"`,
      `"${appt.industry || ''}"`,
      `"${appt.status || ''}"`
    ].join(","));

    // 3. Combine headers and rows
    const csvContent = [headers.join(","), ...csvRows].join("\n");

    // 4. Create a Blob and trigger download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    
    const fileName = `appointments_export_${new Date().toISOString().split('T')[0]}.csv`;
    
    link.setAttribute("href", url);
    link.setAttribute("download", fileName);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Loading spinner
  if (loading && appointments.length === 0) {
    return (
      <div className="flex justify-center items-center h-96 bg-white rounded-lg border">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6600] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading appointments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Appointment Management</h1>
              <p className="text-gray-600 mt-2">Manage and track all appointment requests</p>
            </div>
            <button
              onClick={handleRefresh}
              className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </button>
          </div>
        </div>
{/* Statistics Cards */}
{stats && (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
    <StatCard 
      title="Total" 
      value={stats.total} 
      color="bg-blue-500" 
      icon={Users}
      description="All appointments"
    />
    <StatCard 
      title="Pending" 
      value={stats.pending} 
      color="bg-yellow-500" 
      icon={Clock}
      description="Awaiting response"
    />
    <StatCard 
      title="Confirmed" 
      value={stats.confirmed} 
      color="bg-green-500" 
      icon={CheckCircle}
      description="Scheduled meetings"
    />
    <StatCard 
      title="Completed" 
      value={stats.completed} 
      color="bg-purple-500" 
      icon={CalendarCheck}
      description="Finished appointments"
    />
    <StatCard 
      title="Cancelled" 
      value={stats.cancelled} 
      color="bg-red-500" 
      icon={XCircle}
      description="Cancelled requests"
    />
  </div>
)}

        {/* Filters Section */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {/* Status Filter */}
              <div className="flex-1 sm:flex-initial">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={filters.status}
                  onChange={(e) => handleFilterChange("status", e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#FF6600] focus:border-[#FF6600]"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="rescheduled">Rescheduled</option>
                </select>
              </div>

              {/* Date Filter */}
              <div className="flex-1 sm:flex-initial">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="h-4 w-4 inline mr-1" />
                  Date
                </label>
                <input
                  type="date"
                  value={filters.date}
                  onChange={(e) => handleFilterChange("date", e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#FF6600] focus:border-[#FF6600]"
                />
              </div>

              {/* Search */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Search className="h-4 w-4 inline mr-1" />
                  Search
                </label>
                <form onSubmit={handleSearch} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Search by name, email, organization..."
                    value={filters.search}
                    onChange={(e) => handleFilterChange("search", e.target.value)}
                    className="flex-1 rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#FF6600] focus:border-[#FF6600]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#FF6600] text-white rounded-lg hover:bg-orange-600 focus:ring-2 focus:ring-orange-500"
                  >
                    Search
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-5 w-5 text-red-400">⚠️</div>
              </div>
              <div className="ml-3">
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Appointments Table */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          {appointments.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📅</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments found</h3>
              <p className="text-gray-500 mb-4">
                {filters.status !== "all" || filters.date || filters.search
                  ? "Try adjusting your filters to see more results."
                  : "There are no appointments scheduled yet."}
              </p>
              {(filters.status !== "all" || filters.date || filters.search) && (
                <button
                  onClick={() => setFilters({ status: "all", date: "", search: "" })}
                  className="text-[#FF6600] hover:text-orange-600 font-medium"
                >
                  Clear all filters
                </button>
              )}
            </div>
          ) : (
            <>
              {/* Table Header */}
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      Appointments ({pagination.totalRecords})
                    </h3>
                    <p className="text-sm text-gray-600">
                      Page {pagination.current} of {pagination.total}
                    </p>
                  </div>
<button 
  onClick={handleExportCSV}
  className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
>
  <Download className="h-4 w-4 mr-2" />
  Export CSV
</button>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Client / Organization
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date / Time
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Service
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {appointments.map((appt) => (
                      <tr key={appt._id} className="hover:bg-gray-50 transition duration-150">
                        {/* Client / Organization */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-[#FF6600] to-orange-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                              {appt.firstName?.[0]}{appt.lastName?.[0]}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {appt.firstName} {appt.lastName}
                              </div>
                              <div className="text-sm text-gray-500">
                                {appt.organization || "Individual"}
                              </div>
                            </div>
                          </div>
                        </td>
                        
                        {/* Contact */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{appt.email}</div>
                          <div className="text-sm text-gray-500">
                            {appt.region || "Not specified"}
                          </div>
                        </td>
                        
                        {/* Date / Time */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {formatDate(appt.date)}
                          </div>
                          <div className="text-sm text-gray-500">{appt.time}</div>
                        </td>

                        {/* Service */}
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                          <div>{appt.category}</div>
                          <div className="text-xs text-gray-400">{appt.industry}</div>
                        </td>
                        
                        {/* Status */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(appt.status)}
                        </td>
                        
                        {/* Actions */}
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={() => navigate(`/admin/dashboard/admin-appointment/${appt._id}`)}
                              className="text-white bg-[#FF6600] hover:bg-orange-600 px-4 py-2 rounded-lg transition duration-150 text-sm shadow-sm font-medium"
                            >
                              Manage
                            </button>
                            <button className="text-gray-400 hover:text-gray-600 p-1">
                              <MoreVertical className="h-5 w-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {pagination.total > 1 && (
                <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-700">
                      Showing <span className="font-medium">{(pagination.current - 1) * 10 + 1}</span> to{" "}
                      <span className="font-medium">
                        {Math.min(pagination.current * 10, pagination.totalRecords)}
                      </span>{" "}
                      of <span className="font-medium">{pagination.totalRecords}</span> results
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => fetchAppointments(pagination.current - 1)}
                        disabled={pagination.current === 1}
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Previous
                      </button>
                      <button
                        onClick={() => fetchAppointments(pagination.current + 1)}
                        disabled={pagination.current === pagination.total}
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// Stat Card Component
const StatCard = ({ title, value, color, icon: Icon, description }) => (
  <div className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow duration-200">
    <div className="flex items-center">
      <div className={`${color} rounded-lg p-3 mr-4 flex-shrink-0`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-600 truncate">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        {description && (
          <p className="text-xs text-gray-500 mt-1 truncate">{description}</p>
        )}
      </div>
    </div>
  </div>
);

export default AdminAppointmentPage;