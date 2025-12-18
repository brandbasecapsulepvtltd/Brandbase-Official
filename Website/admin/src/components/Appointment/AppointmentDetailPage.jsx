// components/Appointment/AppointmentDetailPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import adminAxios from "../../utils/axios";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Mail, 
  MapPin, 
  Building,
  CheckCircle,
  XCircle,
  Clock as ClockIcon,
  Ban,
  User,
  Phone,
  Link as LinkIcon,
  Star,
  Users,
  Filter
} from "lucide-react";

const actions = {
  accept: {
    title: "Accept Appointment",
    icon: CheckCircle,
    color: "green",
    defaultMessage: `Dear [Name],

We are pleased to inform you that your appointment request has been accepted and confirmed.

Meeting Details:
Date: [Date]
Time: [Time]

Please ensure you have a stable internet connection for the meeting. We look forward to connecting with you!

Best regards,
The Team`
  },
  reject: {
    title: "Reject Appointment",
    icon: XCircle,
    color: "red",
    defaultMessage: `Dear [Name],

Thank you for your appointment request. After careful consideration, we regret to inform you that we are unable to accommodate your appointment at this time due to [reason - optional].

We appreciate your interest and encourage you to reach out for any future inquiries.

Best regards,
The Team`
  },
  change: {
    title: "Request Time Change",
    icon: ClockIcon,
    color: "amber",
    defaultMessage: `Dear [Name],

Thank you for your appointment request. We would like to discuss alternative timing options that might work better for both parties.

Could you please let us know your availability for the following time slots? We'll do our best to accommodate your schedule.

Looking forward to your response.

Best regards,
The Team`
  },
  ban: {
    title: "Restrict Email Access",
    icon: Ban,
    color: "gray",
    defaultMessage: `Dear [Name],

Due to repeated policy violations or inappropriate requests, your access to our appointment booking system has been temporarily restricted.

If you believe this action was taken in error, please contact our support team for further assistance.

Best regards,
Security Team`
  }
};

const AppointmentDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [employeesLoading, setEmployeesLoading] = useState(false);
  const [actionType, setActionType] = useState(null);
  const [message, setMessage] = useState("");
  const [meetingLink, setMeetingLink] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [adminNotes, setAdminNotes] = useState("");
  const [showAssignPopup, setShowAssignPopup] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState("all");
  const [error, setError] = useState(null);
  const [sending, setSending] = useState(false);

  // Fetch appointment and employees data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [appointmentRes, employeesRes, teamsRes] = await Promise.all([
          adminAxios.get(`/api/appointments/${id}`),
          adminAxios.get("/api/employees?isActive=true&limit=100"),
          adminAxios.get("/api/employees/teams?isActive=true")
        ]);

        setAppointment(appointmentRes.data.data);
        setEmail(appointmentRes.data.data.email);
        setAdminNotes(appointmentRes.data.data.adminNotes || "");
        setEmployees(employeesRes.data.data);
        setTeams(teamsRes.data.data);
        setError("");
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch appointment details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Filter employees by selected team and sort recommended first
  const filteredEmployees = employees
    .filter(emp => selectedTeam === "all" || emp.team === selectedTeam)
    .sort((a, b) => {
      // Recommended employees first
      if (a.isRecommended && !b.isRecommended) return -1;
      if (!a.isRecommended && b.isRecommended) return 1;
      // Then sort by name
      return `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`);
    });

  // Group employees by team for the category filter
  const employeesByTeam = filteredEmployees.reduce((acc, employee) => {
    if (!acc[employee.team]) {
      acc[employee.team] = [];
    }
    acc[employee.team].push(employee);
    return acc;
  }, {});

  const handleActionClick = (type) => {
    setError(null);
    setActionType(type);
    setSelectedEmployee(null);

    if (appointment) {
      const name = `${appointment.firstName} ${appointment.lastName}`;
      const date = new Date(appointment.date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      
      let defaultMsg = actions[type].defaultMessage
        .replace("[Name]", name)
        .replace("[Date]", date)
        .replace("[Time]", appointment.time);

      setMessage(defaultMsg);
      setMeetingLink("");
      setContact("");
    }
  };

  const handleEmployeeSelect = (employee) => {
    setSelectedEmployee(employee);
    setShowAssignPopup(false);
  };

  const handleSend = async () => {
    if (!email || !message.trim()) {
      setError("Email and message are required fields.");
      return;
    }
    
    if (actionType === "accept") {
      if (!meetingLink.trim()) {
        setError("Meeting link is required for accepting appointments.");
        return;
      }
      if (!selectedEmployee) {
        setError("Please assign an employee for this appointment.");
        return;
      }
    }

    setSending(true);
    setError(null);

    try {
      const payload = {
        actionType,
        email,
        message: message.trim(),
        appointmentId: id,
        adminNotes: adminNotes.trim(),
        ...(actionType === "accept" && {
          meetingLink: meetingLink.trim(),
          contact: contact.trim(),
          assignedEmployee: selectedEmployee ? {
            name: `${selectedEmployee.firstName} ${selectedEmployee.lastName}`,
            email: selectedEmployee.email,
            profileImage: selectedEmployee.profileImage,
            profession: selectedEmployee.designation,
            contact: selectedEmployee.contactNumber
          } : null
        })
      };

      await adminAxios.post(`/api/appointments/${id}/respond`, payload);
      
      // Show success notification
      alert(`✅ ${actions[actionType].title} completed successfully!`);
      
      // Refresh appointment data
      const res = await adminAxios.get(`/api/appointments/${id}`);
      setAppointment(res.data.data);
      
      // Reset form
      setActionType(null);
      setMessage("");
      setMeetingLink("");
      setContact("");
      setSelectedEmployee(null);
      
    } catch (error) {
      console.error("Error sending response:", error);
      setError("Failed to send response. Please check your connection and try again.");
    } finally {
      setSending(false);
    }
  };

  const handleStatusUpdate = async (newStatus) => {
    try {
      await adminAxios.put(`/api/appointments/${id}`, { status: newStatus });
      const res = await adminAxios.get(`/api/appointments/${id}`);
      setAppointment(res.data.data);
      alert(`✅ Status updated to ${newStatus} successfully!`);
    } catch (error) {
      console.error("Error updating status:", error);
      setError("Failed to update status. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96 bg-white rounded-lg border">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6600] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading appointment details...</p>
        </div>
      </div>
    );
  }

  if (error && !appointment) {
    return (
      <div className="text-center mt-10 p-6 bg-white rounded-lg shadow-lg border">
        <div className="text-red-500 text-6xl mb-4">⚠️</div>
        <p className="text-red-600 font-semibold text-lg mb-4">{error}</p>
        <button
          onClick={() => navigate("/admin/dashboard/admin-appointment")}
          className="bg-[#FF6600] text-white px-6 py-2 rounded-lg hover:bg-orange-600"
        >
          Back to Appointments
        </button>
      </div>
    );
  }

  if (!appointment) {
    return (
      <div className="text-center mt-10 p-6 bg-white rounded-lg shadow-lg border">
        <div className="text-gray-400 text-6xl mb-4">📅</div>
        <p className="text-gray-500 text-lg mb-4">Appointment not found</p>
        <button
          onClick={() => navigate("/admin/dashboard/admin-appointment")}
          className="bg-[#FF6600] text-white px-6 py-2 rounded-lg hover:bg-orange-600"
        >
          Back to Appointments
        </button>
      </div>
    );
  }

  const ActionIcon = actions[actionType]?.icon;

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate("/admin/dashboard/admin-appointment")}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Appointments
          </button>
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                  Appointment Details
                </h1>
                <p className="text-gray-600 mt-2">
                  Review and manage appointment request from {appointment.firstName} {appointment.lastName}
                </p>
              </div>
              <div className="mt-4 lg:mt-0 flex flex-wrap gap-2">
                <StatusBadge status={appointment.status} />
                {appointment.responseSent && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    📧 Response Sent
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Appointment Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Appointment Information Card */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-[#FF6600]" />
                Appointment Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoItem icon={User} label="Client Name" value={`${appointment.firstName} ${appointment.lastName}`} />
                <InfoItem icon={Mail} label="Email" value={appointment.email} />
                <InfoItem icon={Building} label="Organization" value={appointment.organization || "Not provided"} />
                <InfoItem icon={MapPin} label="Region" value={appointment.region || "Not specified"} />
                <InfoItem icon={Calendar} label="Date" value={new Date(appointment.date).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })} />
                <InfoItem icon={Clock} label="Time" value={appointment.time} />
                <InfoItem icon={MapPin} label="Location" value={[appointment.city, appointment.state, appointment.country].filter(Boolean).join(', ') || "Not specified"} />
                <InfoItem icon={Building} label="Industry & Category" value={`${appointment.industry} / ${appointment.category}`} />
              </div>
            </div>

            {/* Client Message */}
            {appointment.message && (
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Client Message</h2>
                <div className="bg-gray-50 rounded-lg p-4 border">
                  <p className="text-gray-700 whitespace-pre-wrap">{appointment.message}</p>
                </div>
              </div>
            )}

            {/* Admin Notes */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Admin Notes</h2>
              <textarea
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                placeholder="Add internal notes about this appointment..."
                className="w-full h-32 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#FF6600] focus:border-[#FF6600] resize-none"
              />
              <button
                onClick={async () => {
                  try {
                    await adminAxios.put(`/api/appointments/${id}`, { adminNotes });
                    alert("✅ Notes saved successfully!");
                  } catch (error) {
                    setError("Failed to save notes.");
                  }
                }}
                className="mt-3 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
              >
                Save Notes
              </button>
            </div>
          </div>

          {/* Right Column - Actions & Status */}
          <div className="space-y-6">
            {/* Quick Status Update */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Status</h2>
              <div className="space-y-2">
                {['pending', 'confirmed', 'completed', 'cancelled'].map(status => (
                  <button
                    key={status}
                    onClick={() => handleStatusUpdate(status)}
                    disabled={appointment.status === status}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition ${
                      appointment.status === status
                        ? 'bg-[#FF6600] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Center */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Action Center</h2>
              <div className="space-y-3">
                {Object.entries(actions).map(([key, action]) => (
                  <ActionButton
                    key={key}
                    type={key}
                    action={action}
                    onClick={() => handleActionClick(key)}
                    isActive={actionType === key}
                  />
                ))}
              </div>
            </div>

            {/* Assigned Employee */}
            {appointment.assignedEmployee && (
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Assigned Representative</h2>
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    {appointment.assignedEmployee.profileImage ? (
                      <img
                        src={appointment.assignedEmployee.profileImage}
                        alt={appointment.assignedEmployee.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gradient-to-br from-[#FF6600] to-orange-500 rounded-full flex items-center justify-center text-white font-medium">
                        {appointment.assignedEmployee.name?.split(' ').map(n => n[0]).join('')}
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-gray-900 truncate">{appointment.assignedEmployee.name}</p>
                    <p className="text-sm text-gray-600 truncate">{appointment.assignedEmployee.profession}</p>
                    <p className="text-xs text-gray-500 truncate">{appointment.assignedEmployee.email}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Response Panel */}
        {actionType && (
          <div className="mt-8 bg-white rounded-lg shadow-lg border border-[#FF6600] p-6">
            <div className="flex items-center mb-6">
              {ActionIcon && <ActionIcon className={`h-6 w-6 mr-3 text-${actions[actionType].color}-600`} />}
              <h3 className="text-xl font-bold text-gray-900">{actions[actionType].title}</h3>
            </div>
            
            <div className="space-y-6">
              <TextField 
                label="Recipient Email" 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                disabled={actionType === "ban"}
                icon={Mail}
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Response Message
                </label>
                <textarea 
                  className="w-full border border-gray-300 rounded-lg p-4 min-h-[200px] focus:ring-2 focus:ring-[#FF6600] focus:border-[#FF6600] resize-none" 
                  value={message} 
                  onChange={(e) => setMessage(e.target.value)} 
                  placeholder="Customize your response message..."
                />
              </div>

              {actionType === "accept" && (
                <div className="space-y-4 pt-4 border-t">
                  <TextField 
                    label="Meeting Link" 
                    type="url" 
                    placeholder="https://meet.google.com/abc-def-ghi" 
                    value={meetingLink} 
                    onChange={(e) => setMeetingLink(e.target.value)} 
                    icon={LinkIcon}
                    required
                  />
                  <TextField 
                    label="Contact Number" 
                    type="tel" 
                    placeholder="+91 12345 67890" 
                    value={contact} 
                    onChange={(e) => setContact(e.target.value)} 
                    icon={Phone}
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Assign Representative
                    </label>
                    <button 
                      className={`w-full border-2 border-dashed rounded-lg p-4 text-left transition ${
                        selectedEmployee 
                          ? 'border-green-500 bg-green-50' 
                          : 'border-gray-300 hover:border-[#FF6600] hover:bg-gray-50'
                      }`}
                      onClick={() => setShowAssignPopup(true)}
                    >
                      {selectedEmployee ? (
                        <div className="flex items-center space-x-3">
                          {selectedEmployee.profileImage ? (
                            <img
                              src={selectedEmployee.profileImage}
                              alt={`${selectedEmployee.firstName} ${selectedEmployee.lastName}`}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-10 h-10 bg-gradient-to-br from-[#FF6600] to-orange-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                              {selectedEmployee.firstName?.[0]}{selectedEmployee.lastName?.[0]}
                            </div>
                          )}
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center">
                              <p className="font-medium text-gray-900 truncate">
                                {selectedEmployee.firstName} {selectedEmployee.lastName}
                              </p>
                              {selectedEmployee.isRecommended && (
                                <Star className="h-4 w-4 text-amber-500 ml-1 flex-shrink-0" />
                              )}
                            </div>
                            <p className="text-sm text-gray-600 truncate">{selectedEmployee.designation}</p>
                            <p className="text-xs text-gray-500 truncate">{selectedEmployee.team}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center text-gray-500">
                          <User className="h-8 w-8 mx-auto mb-2" />
                          <p>Click to assign a representative</p>
                        </div>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            <div className="flex space-x-3 mt-6">
              <button
                className="flex-1 bg-[#FF6600] hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition font-semibold shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleSend}
                disabled={sending}
              >
                {sending ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Sending...
                  </div>
                ) : (
                  `Send ${actions[actionType].title}`
                )}
              </button>
              <button
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                onClick={() => setActionType(null)}
                disabled={sending}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Assign Employee Modal */}
        {showAssignPopup && (
          <EmployeeAssignmentPopup 
            employees={filteredEmployees}
            teams={teams}
            selectedTeam={selectedTeam}
            onTeamChange={setSelectedTeam}
            onSelect={handleEmployeeSelect}
            onClose={() => setShowAssignPopup(false)}
            loading={employeesLoading}
          />
        )}
      </div>
    </div>
  );
};

// Sub-components
const StatusBadge = ({ status }) => {
  const statusConfig = {
    pending: { color: 'bg-yellow-100 text-yellow-800', label: 'Pending' },
    confirmed: { color: 'bg-green-100 text-green-800', label: 'Confirmed' },
    cancelled: { color: 'bg-red-100 text-red-800', label: 'Cancelled' },
    completed: { color: 'bg-blue-100 text-blue-800', label: 'Completed' },
    rescheduled: { color: 'bg-purple-100 text-purple-800', label: 'Rescheduled' }
  };

  const config = statusConfig[status] || statusConfig.pending;
  
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${config.color}`}>
      {config.label}
    </span>
  );
};

const InfoItem = ({ icon: Icon, label, value }) => (
  <div className="flex items-start space-x-3">
    <Icon className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
    <div>
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="text-sm text-gray-900 mt-1">{value || "Not provided"}</p>
    </div>
  </div>
);

const ActionButton = ({ type, action, onClick, isActive }) => {
  const { icon: Icon, title, color } = action;
  const colorClasses = {
    green: 'bg-green-600 hover:bg-green-700 border-green-600',
    red: 'bg-red-600 hover:bg-red-700 border-red-600',
    amber: 'bg-amber-500 hover:bg-amber-600 border-amber-500',
    gray: 'bg-gray-700 hover:bg-gray-800 border-gray-700'
  };

  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center px-4 py-3 rounded-lg text-white font-medium transition ${
        colorClasses[color]
      } ${isActive ? 'ring-2 ring-offset-2 ring-opacity-50' : ''}`}
    >
      <Icon className="h-5 w-5 mr-3" />
      {title}
    </button>
  );
};

const TextField = ({ label, type, value, onChange, placeholder, disabled = false, icon: Icon, required = false }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      {Icon && (
        <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
      )}
      <input 
        type={type} 
        className={`w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#FF6600] focus:border-[#FF6600] transition ${
          Icon ? 'pl-10' : ''
        } ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
        placeholder={placeholder} 
        value={value} 
        onChange={onChange}
        disabled={disabled}
        required={required}
      />
    </div>
  </div>
);

const EmployeeAssignmentPopup = ({ employees, teams, selectedTeam, onTeamChange, onSelect, onClose, loading }) => (
  <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4">
    <div className="bg-white p-6 rounded-xl w-full max-w-6xl shadow-2xl max-h-[90vh] flex flex-col">
      <h3 className="text-2xl font-bold mb-6 text-center text-[#FF6600] border-b pb-3">
        Assign a Representative
      </h3>

      {/* Team Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
          <Filter className="h-4 w-4 mr-2" />
          Filter by Team
        </label>
        <select
          value={selectedTeam}
          onChange={(e) => onTeamChange(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#FF6600] focus:border-[#FF6600]"
        >
          <option value="all">All Teams</option>
          {teams.map(team => (
            <option key={team._id} value={team.name}>
              {team.name} ({employees.filter(emp => emp.team === team.name).length})
            </option>
          ))}
        </select>
      </div>
      
      <div className="flex-grow overflow-y-auto pr-2">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF6600]"></div>
          </div>
        ) : employees.length === 0 ? (
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-900 mb-2">No employees found</h4>
            <p className="text-gray-500">
              {selectedTeam === "all" 
                ? "No active employees available." 
                : `No employees found in ${selectedTeam} team.`}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {employees.map((employee) => (
              <EmployeeCard
                key={employee._id}
                employee={employee}
                onSelect={onSelect}
              />
            ))}
          </div>
        )}
      </div>

      <button 
        onClick={onClose}
        className="mt-6 bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg font-semibold transition"
      >
        Close
      </button>
    </div>
  </div>
);

const EmployeeCard = ({ employee, onSelect }) => {
  const isRecommended = employee.isRecommended;
  
  return (
    <div
      className={`border-2 rounded-xl p-4 flex flex-col items-center text-center transition duration-200 cursor-pointer bg-white hover:shadow-lg ${
        isRecommended 
          ? 'border-orange-400 bg-orange-50 hover:border-orange-500' 
          : 'border-gray-200 hover:border-[#FF6600]'
      }`}
      onClick={() => onSelect(employee)}
    >
      {/* Employee Avatar */}
      <div className="relative mb-3">
        {employee.profileImage ? (
          <img 
            src={employee.profileImage} 
            alt={`${employee.firstName} ${employee.lastName}`} 
            className="w-16 h-16 rounded-full object-cover border-2 border-gray-100 shadow-inner" 
          />
        ) : (
          <div className="w-16 h-16 bg-gradient-to-br from-[#FF6600] to-orange-500 rounded-full flex items-center justify-center text-white font-medium text-lg border-2 border-gray-100">
            {employee.firstName?.[0]}{employee.lastName?.[0]}
          </div>
        )}
        {isRecommended && (
          <div className="absolute -top-1 -right-1 bg-amber-500 rounded-full p-1">
            <Star className="h-3 w-3 text-white" />
          </div>
        )}
      </div>

      {/* Employee Info */}
      <div className="w-full">
        <div className="flex items-center justify-center mb-1">
          <h4 className="font-bold text-gray-900 text-sm truncate">
            {employee.firstName} {employee.lastName}
          </h4>
        </div>
        
        <p className="text-xs text-gray-600 mb-2 truncate">{employee.designation}</p>
        
        <div className="bg-gray-100 rounded-lg px-2 py-1 mb-2">
          <p className="text-xs font-medium text-gray-700 truncate">{employee.team}</p>
        </div>

        {employee.specialization && (
          <p className="text-xs text-gray-500 mb-2 truncate">{employee.specialization}</p>
        )}

        <div className="text-xs space-y-1 text-gray-500">
          <p className="truncate">{employee.email}</p>
          <p className="truncate">{employee.contactNumber}</p>
        </div>
      </div>

      {/* Selection Indicator */}
      <div className="mt-3">
        <span className={`text-xs font-semibold ${
          isRecommended ? 'text-orange-600' : 'text-[#FF6600]'
        }`}>
          {isRecommended ? '⭐ Recommended' : 'Click to Assign'}
        </span>
      </div>
    </div>
  );
};

export default AppointmentDetailPage;