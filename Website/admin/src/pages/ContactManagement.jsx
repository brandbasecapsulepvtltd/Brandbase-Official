import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import adminAxios from '../utils/axios';
import { 
  Mail, 
  MessageSquare, 
  CheckCircle, 
  Archive, 
  Search, 
  RefreshCw, 
  Trash2, 
  ExternalLink,
  Clock,
  Eye,
  Filter
} from 'lucide-react';

const ContactManagement = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    replied: 0,
    resolved: 0,
    spam: 0
  });

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await adminAxios.get('/api/contacts');
      // Adjusted for new API response structure
      setContacts(response.data.data || []);
      
      // Calculate stats from the data
      calculateStats(response.data.data || []);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await adminAxios.get('/api/contacts/stats');
      if (response.data.success) {
        setStats({
          total: response.data.data.total || 0,
          pending: response.data.data.byStatus?.find(s => s.status === 'pending')?.count || 0,
          replied: response.data.data.byStatus?.find(s => s.status === 'replied')?.count || 0,
          resolved: response.data.data.byStatus?.find(s => s.status === 'resolved')?.count || 0,
          spam: response.data.data.byStatus?.find(s => s.status === 'spam')?.count || 0
        });
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const calculateStats = (contactsData) => {
    const stats = {
      total: contactsData.length,
      pending: contactsData.filter(c => c.status === 'pending').length,
      replied: contactsData.filter(c => c.status === 'replied').length,
      resolved: contactsData.filter(c => c.status === 'resolved').length,
      spam: contactsData.filter(c => c.status === 'spam').length
    };
    setStats(stats);
  };

  useEffect(() => {
    fetchContacts();
    fetchStats();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this inquiry?")) return;
    try {
      await adminAxios.delete(`/api/contacts/${id}`);
      setContacts(contacts.filter(c => c._id !== id));
      fetchStats(); // Refresh stats after deletion
    } catch (error) {
      alert("Failed to delete contact");
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await adminAxios.put(`/api/contacts/${id}/status`, { status: newStatus });
      // Update local state
      setContacts(contacts.map(contact => 
        contact._id === id ? { ...contact, status: newStatus } : contact
      ));
      fetchStats(); // Refresh stats
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status");
    }
  };

  // Filtering Logic
  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = 
      contact.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.organization?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.message?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || contact.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: 'bg-amber-100 text-amber-700', icon: '⏳' },
      replied: { color: 'bg-blue-100 text-blue-700', icon: '✉️' },
      resolved: { color: 'bg-emerald-100 text-emerald-700', icon: '✅' },
      spam: { color: 'bg-red-100 text-red-700', icon: '🚫' }
    };
    const config = statusConfig[status] || statusConfig.pending;
    return (
      <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase px-2 py-1 rounded-full ${config.color}`}>
        {config.icon} {status}
      </span>
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Contact Inquiries</h1>
          <p className="text-slate-500 text-sm">Monitor and respond to client messages</p>
        </div>
        <button 
          onClick={() => {
            fetchContacts();
            fetchStats();
          }}
          className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg text-sm font-medium hover:bg-gray-50 transition-all shadow-sm"
        >
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <StatCard 
          title="Total" 
          count={stats.total} 
          subtitle="All messages" 
          icon={<MessageSquare className="text-blue-600" />} 
          color="bg-blue-100" 
        />
        <StatCard 
          title="Pending" 
          count={stats.pending} 
          subtitle="Awaiting response" 
          icon={<Clock className="text-amber-600" />} 
          color="bg-amber-100" 
        />
        <StatCard 
          title="Replied" 
          count={stats.replied} 
          subtitle="Response sent" 
          icon={<Mail className="text-blue-600" />} 
          color="bg-blue-100" 
        />
        <StatCard 
          title="Resolved" 
          count={stats.resolved} 
          subtitle="Closed inquiries" 
          icon={<CheckCircle className="text-emerald-600" />} 
          color="bg-emerald-100" 
        />
        <StatCard 
          title="Spam" 
          count={stats.spam} 
          subtitle="Filtered messages" 
          icon={<Filter className="text-red-600" />} 
          color="bg-red-100" 
        />
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-xl border shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-center">
        <div className="w-full md:w-48">
          <label className="text-xs font-semibold text-gray-500 uppercase mb-1 block">Status Filter</label>
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 outline-none"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="replied">Replied</option>
            <option value="resolved">Resolved</option>
            <option value="spam">Spam</option>
          </select>
        </div>

        <div className="flex-1 w-full">
          <label className="text-xs font-semibold text-gray-500 uppercase mb-1 block">Search</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text"
              placeholder="Search by name, email, organization, message..."
              className="w-full border rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-orange-500 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="md:pt-5 w-full md:w-auto">
          <button 
            onClick={() => {
              fetchContacts();
              fetchStats();
            }}
            className="w-full md:w-auto bg-[#FF6600] text-white px-8 py-2 rounded-lg font-semibold hover:bg-orange-600 transition-colors shadow-md"
          >
            Apply Filters
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Sender</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Organization</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Category</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Date</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {loading ? (
                <tr><td colSpan="6" className="text-center py-20 text-gray-500">Loading inquiries...</td></tr>
              ) : filteredContacts.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-20">
                    <div className="flex flex-col items-center gap-2">
                      <Archive size={48} className="text-gray-200" />
                      <p className="text-gray-500 font-medium">No inquiries found</p>
                      <p className="text-gray-400 text-sm">Try adjusting your filters</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredContacts.map((contact) => (
                  <tr key={contact._id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900">
                        {contact.firstName} {contact.lastName}
                      </div>
                      <div className="text-xs text-gray-500">{contact.email}</div>
                      <div className="text-xs text-gray-400">{contact.contactNumber}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {contact.organization || "N/A"}
                      <div className="text-xs text-gray-400">{contact.industry}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-medium px-2 py-1 bg-gray-100 rounded text-gray-600 uppercase">
                        {contact.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        {getStatusBadge(contact.status)}
                        <select 
                          value={contact.status}
                          onChange={(e) => handleStatusUpdate(contact._id, e.target.value)}
                          className="text-xs border rounded p-1 bg-white w-32"
                        >
                          <option value="pending">Pending</option>
                          <option value="replied">Replied</option>
                          <option value="resolved">Resolved</option>
                          <option value="spam">Spam</option>
                        </select>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {formatDate(contact.createdAt)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Link
                          to={`/admin/dashboard/contact-management/${contact._id}`}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye size={18} />
                        </Link>
                        <button 
                          onClick={() => handleDelete(contact._id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" 
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Reusable Stat Card Component
const StatCard = ({ title, count, subtitle, icon, color }) => (
  <div className="bg-white p-5 rounded-xl border shadow-sm flex items-start gap-4">
    <div className={`p-3 rounded-lg ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <h3 className="text-2xl font-bold text-gray-900">{count}</h3>
      <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
    </div>
  </div>
);

export default ContactManagement;