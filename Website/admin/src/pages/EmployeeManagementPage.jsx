// components/Employee/EmployeeManagementPage.jsx
import React, { useEffect, useState } from "react";
import axios from "../utils/axios";
import { 
  Users, 
  Plus, 
  Filter, 
  Search, 
  Download, 
  RefreshCw,
  MoreVertical,
  Edit2,
  Trash2,
  Star,
  Eye,
  Building
} from "lucide-react";

const EmployeeManagementPage = () => {
  const [employees, setEmployees] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [stats, setStats] = useState(null);
  const [filters, setFilters] = useState({
    team: "all",
    designation: "all",
    isActive: "true",
    isRecommended: "all",
    search: ""
  });
  const [pagination, setPagination] = useState({
    current: 1,
    total: 1,
    results: 0,
    totalRecords: 0
  });
  const [showAddModal, setShowAddModal] = useState(false);
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);

  // Fetch employees and teams
  const fetchData = async (page = 1) => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "10",
        ...(filters.team !== "all" && { team: filters.team }),
        ...(filters.designation !== "all" && { designation: filters.designation }),
        ...(filters.isActive !== "all" && { isActive: filters.isActive }),
        ...(filters.isRecommended !== "all" && { isRecommended: filters.isRecommended }),
        ...(filters.search && { search: filters.search })
      });

      const [employeesRes, teamsRes, statsRes] = await Promise.all([
        axios.get(`/api/employees?${params}`),
        axios.get("/api/employees/teams"),
        axios.get("/api/employees/stats/summary")
      ]);

      setEmployees(employeesRes.data.data);
      setPagination(employeesRes.data.pagination);
      setTeams(teamsRes.data.data);
      setStats(statsRes.data.data);
      setError("");
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to load employees. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filters.team, filters.designation, filters.isActive, filters.isRecommended]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPagination(prev => ({ ...prev, current: 1 }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchData(1);
  };

  const handleRefresh = () => {
    fetchData(pagination.current);
  };

  const handleDeleteEmployee = async (employeeId) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) {
      return;
    }

    try {
      await axios.delete(`/api/employees/${employeeId}`);
      alert("✅ Employee deleted successfully!");
      fetchData(pagination.current);
    } catch (error) {
      console.error("Error deleting employee:", error);
      alert("❌ Failed to delete employee. Please try again.");
    }
  };

  const handleToggleRecommend = async (employee) => {
    try {
      await axios.put(`/api/employees/${employee._id}`, {
        isRecommended: !employee.isRecommended
      });
      alert(`✅ Employee ${employee.isRecommended ? 'removed from' : 'added to'} recommended list!`);
      fetchData(pagination.current);
    } catch (error) {
      console.error("Error updating employee:", error);
      alert("❌ Failed to update employee. Please try again.");
    }
  };

  const handleViewEmployee = (employee) => {
    setSelectedEmployee(employee);
    setShowViewModal(true);
  };

  // Loading spinner
  if (loading && employees.length === 0) {
    return (
      <div className="flex justify-center items-center h-96 bg-white rounded-lg border">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6600] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading employees...</p>
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
              <h1 className="text-3xl font-bold text-gray-900">Employee Management</h1>
              <p className="text-gray-600 mt-2">Manage your team members and their information</p>
            </div>
            <div className="mt-4 sm:mt-0 flex flex-wrap gap-3">
              <button
                onClick={() => setShowTeamModal(true)}
                className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <Building className="h-4 w-4 mr-2" />
                Manage Teams
              </button>
              <button
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center px-4 py-2 bg-[#FF6600] border border-transparent rounded-lg shadow-sm text-sm font-medium text-white hover:bg-orange-600"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Employee
              </button>
              <button
                onClick={handleRefresh}
                className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard 
              title="Total Employees" 
              value={stats.totalEmployees} 
              color="bg-blue-500" 
              icon={Users}
            />
            <StatCard 
              title="Active Teams" 
              value={stats.totalTeams} 
              color="bg-green-500" 
              icon={Building}
            />
            <StatCard 
              title="Recommended" 
              value={stats.recommendedEmployees} 
              color="bg-amber-500" 
              icon={Star}
            />
            <StatCard 
              title="Teams" 
              value={stats.teamDistribution?.length || 0} 
              color="bg-purple-500" 
              icon={Users}
            />
          </div>
        )}

        {/* Filters Section */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {/* Team Filter */}
              <div className="flex-1 sm:flex-initial">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Team
                </label>
                <select
                  value={filters.team}
                  onChange={(e) => handleFilterChange("team", e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#FF6600] focus:border-[#FF6600]"
                >
                  <option value="all">All Teams</option>
                  {teams.map(team => (
                    <option key={team._id} value={team.name}>
                      {team.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Designation Filter */}
              <div className="flex-1 sm:flex-initial">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Designation
                </label>
                <select
                  value={filters.designation}
                  onChange={(e) => handleFilterChange("designation", e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#FF6600] focus:border-[#FF6600]"
                >
                  <option value="all">All Designations</option>
                  <option value="developer">Developer</option>
                  <option value="designer">Designer</option>
                  <option value="manager">Manager</option>
                  <option value="analyst">Analyst</option>
                  <option value="consultant">Consultant</option>
                </select>
              </div>

              {/* Status Filter */}
              <div className="flex-1 sm:flex-initial">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={filters.isActive}
                  onChange={(e) => handleFilterChange("isActive", e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#FF6600] focus:border-[#FF6600]"
                >
                  <option value="all">All Status</option>
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </div>

              {/* Recommended Filter */}
              <div className="flex-1 sm:flex-initial">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Recommended
                </label>
                <select
                  value={filters.isRecommended}
                  onChange={(e) => handleFilterChange("isRecommended", e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#FF6600] focus:border-[#FF6600]"
                >
                  <option value="all">All</option>
                  <option value="true">Recommended</option>
                  <option value="false">Not Recommended</option>
                </select>
              </div>
            </div>

            {/* Search */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Search className="h-4 w-4 inline mr-1" />
                Search Employees
              </label>
              <form onSubmit={handleSearch} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Search by name, email, designation..."
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

        {/* Employees Table */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          {employees.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">👥</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No employees found</h3>
              <p className="text-gray-500 mb-4">
                {filters.team !== "all" || filters.designation !== "all" || filters.search
                  ? "Try adjusting your filters to see more results."
                  : "Get started by adding your first employee."}
              </p>
              {(filters.team !== "all" || filters.designation !== "all" || filters.search) && (
                <button
                  onClick={() => setFilters({ 
                    team: "all", 
                    designation: "all", 
                    isActive: "true", 
                    isRecommended: "all", 
                    search: "" 
                  })}
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
                      Employees ({pagination.totalRecords})
                    </h3>
                    <p className="text-sm text-gray-600">
                      Page {pagination.current} of {pagination.total}
                    </p>
                  </div>
                  <button className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Employee
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Team & Designation
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
                    {employees.map((employee) => (
                      <tr key={employee._id} className="hover:bg-gray-50 transition duration-150">
                        {/* Employee Info */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-[#FF6600] to-orange-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                              {employee.firstName?.[0]}{employee.lastName?.[0]}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {employee.firstName} {employee.lastName}
                                {employee.isRecommended && (
                                  <Star className="h-4 w-4 text-amber-500 inline ml-1" />
                                )}
                              </div>
                              <div className="text-sm text-gray-500">
                                {employee.specialization || "No specialization"}
                              </div>
                            </div>
                          </div>
                        </td>
                        
                        {/* Contact */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{employee.email}</div>
                          <div className="text-sm text-gray-500">
                            {employee.contactNumber}
                          </div>
                        </td>
                        
                        {/* Team & Designation */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {employee.team}
                          </div>
                          <div className="text-sm text-gray-500 capitalize">
                            {employee.designation}
                          </div>
                        </td>

                        {/* Status */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <StatusBadge isActive={employee.isActive} />
                          {employee.isRecommended && (
                            <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                              <Star className="h-3 w-3 mr-1" />
                              Recommended
                            </span>
                          )}
                        </td>
                        
                        {/* Actions */}
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleViewEmployee(employee)}
                              className="text-blue-600 hover:text-blue-900 p-1"
                              title="View Details"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleToggleRecommend(employee)}
                              className={`p-1 ${
                                employee.isRecommended 
                                  ? "text-amber-600 hover:text-amber-900" 
                                  : "text-gray-400 hover:text-gray-600"
                              }`}
                              title={employee.isRecommended ? "Remove from Recommended" : "Add to Recommended"}
                            >
                              <Star className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedEmployee(employee);
                                setShowAddModal(true);
                              }}
                              className="text-green-600 hover:text-green-900 p-1"
                              title="Edit Employee"
                            >
                              <Edit2 className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteEmployee(employee._id)}
                              className="text-red-600 hover:text-red-900 p-1"
                              title="Delete Employee"
                            >
                              <Trash2 className="h-4 w-4" />
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
                        onClick={() => fetchData(pagination.current - 1)}
                        disabled={pagination.current === 1}
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Previous
                      </button>
                      <button
                        onClick={() => fetchData(pagination.current + 1)}
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

      {/* Add/Edit Employee Modal */}
      {showAddModal && (
        <EmployeeModal
          employee={selectedEmployee}
          teams={teams}
          onClose={() => {
            setShowAddModal(false);
            setSelectedEmployee(null);
          }}
          onSave={() => {
            setShowAddModal(false);
            setSelectedEmployee(null);
            fetchData(pagination.current);
          }}
        />
      )}

      {/* Team Management Modal */}
      {showTeamModal && (
        <TeamManagementModal
          teams={teams}
          onClose={() => {
            setShowTeamModal(false);
            fetchData(); // Refresh to get updated teams
          }}
        />
      )}

      {/* View Employee Modal */}
      {showViewModal && selectedEmployee && (
        <ViewEmployeeModal
          employee={selectedEmployee}
          onClose={() => {
            setShowViewModal(false);
            setSelectedEmployee(null);
          }}
        />
      )}
    </div>
  );
};

// Sub-components

const StatCard = ({ title, value, color, icon: Icon }) => (
  <div className="bg-white rounded-lg shadow-sm border p-6">
    <div className="flex items-center">
      <div className={`${color} rounded-lg p-3 mr-4`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  </div>
);

const StatusBadge = ({ isActive }) => (
  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
    isActive 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800'
  }`}>
    {isActive ? 'Active' : 'Inactive'}
  </span>
);

// Employee Modal Component
const EmployeeModal = ({ employee, teams, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    team: employee?.team || "",
    firstName: employee?.firstName || "",
    lastName: employee?.lastName || "",
    email: employee?.email || "",
    contactNumber: employee?.contactNumber || "",
    designation: employee?.designation || "",
    isRecommended: employee?.isRecommended || false,
    specialization: employee?.specialization || "",
    experience: employee?.experience || "",
    bio: employee?.bio || "",
    profileImage: employee?.profileImage || "",
    isActive: employee?.isActive ?? true
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (employee) {
        // Update existing employee
        await axios.put(`/api/employees/${employee._id}`, formData);
        alert("✅ Employee updated successfully!");
      } else {
        // Create new employee
        await axios.post("/api/employees", formData);
        alert("✅ Employee created successfully!");
      }
      onSave();
    } catch (error) {
      console.error("Error saving employee:", error);
      setError(error.response?.data?.message || "Failed to save employee. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4">
      <div className="bg-white p-6 rounded-xl w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
        <h3 className="text-2xl font-bold mb-6 text-gray-900">
          {employee ? 'Edit Employee' : 'Add New Employee'}
        </h3>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Team */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Team <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={formData.team}
                onChange={(e) => handleChange("team", e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#FF6600] focus:border-[#FF6600]"
              >
                <option value="">Select Team</option>
                {teams.map(team => (
                  <option key={team._id} value={team.name}>
                    {team.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Designation */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Designation <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.designation}
                onChange={(e) => handleChange("designation", e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#FF6600] focus:border-[#FF6600]"
                placeholder="e.g., Senior Developer"
              />
            </div>

            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#FF6600] focus:border-[#FF6600]"
                placeholder="Enter first name"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#FF6600] focus:border-[#FF6600]"
                placeholder="Enter last name"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#FF6600] focus:border-[#FF6600]"
                placeholder="employee@company.com"
              />
            </div>

            {/* Contact Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                required
                value={formData.contactNumber}
                onChange={(e) => handleChange("contactNumber", e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#FF6600] focus:border-[#FF6600]"
                placeholder="+91 12345 67890"
              />
            </div>
          </div>

          {/* Specialization */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Specialization
            </label>
            <input
              type="text"
              value={formData.specialization}
              onChange={(e) => handleChange("specialization", e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#FF6600] focus:border-[#FF6600]"
              placeholder="e.g., React, Node.js, UI/UX Design"
            />
          </div>

          {/* Experience */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Experience
            </label>
            <input
              type="text"
              value={formData.experience}
              onChange={(e) => handleChange("experience", e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#FF6600] focus:border-[#FF6600]"
              placeholder="e.g., 5 years in web development"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bio
            </label>
            <textarea
              value={formData.bio}
              onChange={(e) => handleChange("bio", e.target.value)}
              rows="3"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#FF6600] focus:border-[#FF6600] resize-none"
              placeholder="Brief description about the employee..."
            />
          </div>

          {/* Checkboxes */}
          <div className="flex flex-wrap gap-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.isRecommended}
                onChange={(e) => handleChange("isRecommended", e.target.checked)}
                className="rounded border-gray-300 text-[#FF6600] focus:ring-[#FF6600]"
              />
              <span className="ml-2 text-sm text-gray-700">Mark as Recommended</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => handleChange("isActive", e.target.checked)}
                className="rounded border-gray-300 text-[#FF6600] focus:ring-[#FF6600]"
              />
              <span className="ml-2 text-sm text-gray-700">Active Employee</span>
            </label>
          </div>

          {/* Actions */}
          <div className="flex space-x-3 pt-4 border-t">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-[#FF6600] hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition font-semibold shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  {employee ? 'Updating...' : 'Creating...'}
                </div>
              ) : (
                employee ? 'Update Employee' : 'Create Employee'
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Team Management Modal Component
const TeamManagementModal = ({ teams, onClose }) => {
  const [teamName, setTeamName] = useState("");
  const [teamDescription, setTeamDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCreateTeam = async (e) => {
    e.preventDefault();
    if (!teamName.trim()) {
      setError("Team name is required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await axios.post("/api/employees/teams", {
        name: teamName,
        description: teamDescription
      });
      setTeamName("");
      setTeamDescription("");
      alert("✅ Team created successfully!");
      onClose(); // Refresh will happen in parent
    } catch (error) {
      console.error("Error creating team:", error);
      setError(error.response?.data?.message || "Failed to create team. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTeam = async (teamId, teamName) => {
    if (!window.confirm(`Are you sure you want to delete team "${teamName}"?`)) {
      return;
    }

    try {
      await axios.delete(`/api/employees/teams/${teamId}`);
      alert("✅ Team deleted successfully!");
      onClose(); // Refresh will happen in parent
    } catch (error) {
      console.error("Error deleting team:", error);
      alert(error.response?.data?.message || "Failed to delete team. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4">
      <div className="bg-white p-6 rounded-xl w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
        <h3 className="text-2xl font-bold mb-6 text-gray-900">Manage Teams</h3>

        {/* Create Team Form */}
        <div className="mb-8 p-4 border border-gray-200 rounded-lg">
          <h4 className="text-lg font-semibold mb-4 text-gray-900">Create New Team</h4>
          
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleCreateTeam} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Team Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#FF6600] focus:border-[#FF6600]"
                placeholder="e.g., SALES, DEVELOPMENT, MARKETING"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={teamDescription}
                onChange={(e) => setTeamDescription(e.target.value)}
                rows="2"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#FF6600] focus:border-[#FF6600] resize-none"
                placeholder="Optional team description..."
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-[#FF6600] hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition font-semibold shadow-sm disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Team'}
            </button>
          </form>
        </div>

        {/* Existing Teams List */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-gray-900">Existing Teams</h4>
          {teams.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No teams created yet.</p>
          ) : (
            <div className="space-y-3">
              {teams.map(team => (
                <div key={team._id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{team.name}</p>
                    {team.description && (
                      <p className="text-sm text-gray-600">{team.description}</p>
                    )}
                    <p className="text-xs text-gray-500">
                      Created: {new Date(team.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteTeam(team._id, team.name)}
                    className="text-red-600 hover:text-red-900 p-1"
                    title="Delete Team"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={onClose}
          className="w-full mt-6 bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg font-semibold transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

// View Employee Modal Component
const ViewEmployeeModal = ({ employee, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4">
      <div className="bg-white p-6 rounded-xl w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
        <h3 className="text-2xl font-bold mb-6 text-gray-900">Employee Details</h3>

        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0 h-16 w-16 bg-gradient-to-br from-[#FF6600] to-orange-500 rounded-full flex items-center justify-center text-white font-medium text-lg">
              {employee.firstName?.[0]}{employee.lastName?.[0]}
            </div>
            <div>
              <h4 className="text-xl font-bold text-gray-900">
                {employee.firstName} {employee.lastName}
                {employee.isRecommended && (
                  <Star className="h-5 w-5 text-amber-500 inline ml-2" />
                )}
              </h4>
              <p className="text-gray-600">{employee.designation}</p>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DetailItem label="Team" value={employee.team} />
            <DetailItem label="Designation" value={employee.designation} />
            <DetailItem label="Email" value={employee.email} />
            <DetailItem label="Contact" value={employee.contactNumber} />
            <DetailItem label="Specialization" value={employee.specialization || "Not specified"} />
            <DetailItem label="Experience" value={employee.experience || "Not specified"} />
            <DetailItem 
              label="Status" 
              value={
                <StatusBadge isActive={employee.isActive} />
              } 
            />
            <DetailItem 
              label="Recommended" 
              value={employee.isRecommended ? "Yes" : "No"} 
            />
          </div>

          {/* Bio */}
          {employee.bio && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
              <div className="bg-gray-50 rounded-lg p-4 border">
                <p className="text-gray-700 whitespace-pre-wrap">{employee.bio}</p>
              </div>
            </div>
          )}

          {/* Timestamps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
            <DetailItem 
              label="Created" 
              value={new Date(employee.createdAt).toLocaleString()} 
            />
            <DetailItem 
              label="Last Updated" 
              value={new Date(employee.updatedAt).toLocaleString()} 
            />
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-6 bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg font-semibold transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const DetailItem = ({ label, value }) => (
  <div>
    <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
    <p className="text-sm text-gray-900">{value}</p>
  </div>
);

export default EmployeeManagementPage;