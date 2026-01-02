import React, { useState, useEffect } from 'react';
import adminAxios from '../utils/axios';
import {
  Plus, Search, Edit, Trash2, Eye,
  Filter, Upload, Calendar, MapPin, Users,
  ChevronLeft, ChevronRight, CheckCircle,
  XCircle, AlertCircle, Loader2, FileText,
  Building2, Tag, Clock, X, Check,
  Download, Copy, ExternalLink, BarChart3,
  Mail, Phone, Building, User, MessageSquare,
  Star, TrendingUp, Target, DollarSign,
  MoreVertical, FileDown, RefreshCw, Archive,
  Send, UserCheck, FileCheck, FilterX
} from 'lucide-react';

const LeadManagement = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [selectedExhibition, setSelectedExhibition] = useState('all');
  const [selectedBudgetRange, setSelectedBudgetRange] = useState('all');
  
  // Filter data
  const [statusOptions, setStatusOptions] = useState([]);
  const [priorityOptions, setPriorityOptions] = useState([]);
  const [exhibitionOptions, setExhibitionOptions] = useState([]);
  const [budgetOptions, setBudgetOptions] = useState([]);
  
  // Date range filter
  const [startDateFilter, setStartDateFilter] = useState('');
  const [endDateFilter, setEndDateFilter] = useState('');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalLeads, setTotalLeads] = useState(0);
  const itemsPerPage = 15;
  
  // Stats
  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    contacted: 0,
    won: 0,
    conversionRate: 0
  });
  
  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('edit'); // 'edit', 'view', 'create'
  const [currentLead, setCurrentLead] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [bulkActions, setBulkActions] = useState([]);
  const [selectedLeads, setSelectedLeads] = useState([]);
  
  // Form state
  const [formData, setFormData] = useState({
    exhibitionName: '',
    exhibitionLocation: '',
    exhibitionDate: '',
    fullName: '',
    companyName: '',
    email: '',
    phoneNumber: '',
    preferredStallSize: '',
    budgetRange: '',
    additionalMessage: '',
    status: 'new',
    priority: 'medium',
    assignedTo: '',
    followUpDate: '',
    notes: []
  });
  
  // New note
  const [newNote, setNewNote] = useState('');
  
  // Status labels and colors
  const statusConfig = {
    'new': { label: 'New Lead', color: 'bg-blue-100 text-blue-800', icon: '🆕' },
    'contacted': { label: 'Contacted', color: 'bg-purple-100 text-purple-800', icon: '📞' },
    'qualified': { label: 'Qualified', color: 'bg-yellow-100 text-yellow-800', icon: '⭐' },
    'proposal_sent': { label: 'Proposal Sent', color: 'bg-indigo-100 text-indigo-800', icon: '📄' },
    'won': { label: 'Won', color: 'bg-green-100 text-green-800', icon: '✅' },
    'lost': { label: 'Lost', color: 'bg-red-100 text-red-800', icon: '❌' },
    'on_hold': { label: 'On Hold', color: 'bg-gray-100 text-gray-800', icon: '⏸️' }
  };
  
  // Priority labels and colors
  const priorityConfig = {
    'low': { label: 'Low', color: 'bg-gray-100 text-gray-800' },
    'medium': { label: 'Medium', color: 'bg-blue-100 text-blue-800' },
    'high': { label: 'High', color: 'bg-yellow-100 text-yellow-800' },
    'urgent': { label: 'Urgent', color: 'bg-red-100 text-red-800' }
  };
  
  // Budget range labels
  const budgetConfig = {
    'under-1l': 'Under ₹1 Lakh',
    '1l-3l': '₹1 - 3 Lakhs',
    '3l-5l': '₹3 - 5 Lakhs',
    '5l-10l': '₹5 - 10 Lakhs',
    'above-10l': 'Above ₹10 Lakhs'
  };

  // Fetch leads with filtering
  const fetchLeads = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params = new URLSearchParams({
        page: currentPage,
        limit: itemsPerPage,
        ...(searchTerm && { search: searchTerm }),
        ...(selectedStatus !== 'all' && { status: selectedStatus }),
        ...(selectedPriority !== 'all' && { priority: selectedPriority }),
        ...(selectedExhibition !== 'all' && { exhibitionName: selectedExhibition }),
        ...(selectedBudgetRange !== 'all' && { budgetRange: selectedBudgetRange }),
        ...(startDateFilter && { startDate: startDateFilter }),
        ...(endDateFilter && { endDate: endDateFilter })
      });

      const response = await adminAxios.get(`/api/leads?${params}`);
      
      setLeads(response.data.data || []);
      setTotalLeads(response.data.pagination?.total || 0);
      setTotalPages(response.data.pagination?.pages || 1);
      
      // Update filter options
      if (response.data.filters) {
        setExhibitionOptions(response.data.filters.exhibitions || []);
        setBudgetOptions(response.data.filters.budgetRanges || []);
      }
      
      // Update stats
      if (response.data.stats) {
        setStats({
          total: response.data.stats.total || 0,
          new: response.data.stats.new || 0,
          contacted: response.data.stats.contacted || 0,
          won: response.data.stats.won || 0,
          conversionRate: response.data.stats.conversionRate || 0
        });
      }
      
    } catch (err) {
      setError('Failed to fetch leads. Please check your connection.');
      console.error('Error fetching leads:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch stats and filter options
  const fetchStatsAndFilters = async () => {
    try {
      const [statsRes, statusRes, priorityRes] = await Promise.all([
        adminAxios.get('/api/leads/stats/overview'),
        adminAxios.get('/api/leads/status/all'),
        adminAxios.get('/api/leads/priority/all')
      ]);
      
      setStats(statsRes.data.data || {});
      setStatusOptions(statsRes.data.data?.byStatus || []);
      setPriorityOptions(statsRes.data.data?.byPriority || []);
      
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  };

  useEffect(() => {
    fetchLeads();
    fetchStatsAndFilters();
  }, [currentPage]);

  useEffect(() => {
    // Reset to page 1 when filters change
    setCurrentPage(1);
    fetchLeads();
  }, [searchTerm, selectedStatus, selectedPriority, selectedExhibition, selectedBudgetRange, startDateFilter, endDateFilter]);

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Format datetime
  const formatDateTime = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get status badge
  const getStatusBadge = (status) => {
    const config = statusConfig[status] || { label: status, color: 'bg-gray-100 text-gray-800', icon: '' };
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.icon && <span className="mr-1">{config.icon}</span>}
        {config.label}
      </span>
    );
  };

  // Get priority badge
  const getPriorityBadge = (priority) => {
    const config = priorityConfig[priority] || { label: priority, color: 'bg-gray-100 text-gray-800' };
    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  // Get budget label
  const getBudgetLabel = (range) => {
    return budgetConfig[range] || range;
  };

  // Handle bulk selection
  const handleBulkSelect = (leadId) => {
    setSelectedLeads(prev => 
      prev.includes(leadId) 
        ? prev.filter(id => id !== leadId)
        : [...prev, leadId]
    );
  };

  // Handle select all
  const handleSelectAll = () => {
    if (selectedLeads.length === leads.length) {
      setSelectedLeads([]);
    } else {
      setSelectedLeads(leads.map(lead => lead._id));
    }
  };

  // Bulk update status
  const handleBulkStatusUpdate = async (status) => {
    try {
      setLoading(true);
      const response = await adminAxios.patch('/api/leads/bulk/status', {
        leadIds: selectedLeads,
        status
      });
      
      setSuccessMessage(`Updated ${response.data.data.modifiedCount} leads to ${status}`);
      setSelectedLeads([]);
      await fetchLeads();
      
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError('Failed to update leads status');
      console.error('Error updating leads:', err);
    } finally {
      setLoading(false);
    }
  };

  // Export to CSV
  const handleExportCSV = async () => {
    try {
      const response = await adminAxios.get('/api/leads/export/csv', {
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `leads_export_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      setSuccessMessage('Leads exported successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError('Failed to export leads');
      console.error('Error exporting leads:', err);
    }
  };

  // Open view modal
  const openViewModal = (lead) => {
    setCurrentLead(lead);
    setFormData({
      ...lead,
      exhibitionDate: lead.exhibitionDate ? new Date(lead.exhibitionDate).toISOString().split('T')[0] : '',
      followUpDate: lead.followUpDate ? new Date(lead.followUpDate).toISOString().split('T')[0] : ''
    });
    setModalType('view');
    setShowModal(true);
  };

  // Open edit modal
  const openEditModal = (lead) => {
    setCurrentLead(lead);
    setFormData({
      ...lead,
      exhibitionDate: lead.exhibitionDate ? new Date(lead.exhibitionDate).toISOString().split('T')[0] : '',
      followUpDate: lead.followUpDate ? new Date(lead.followUpDate).toISOString().split('T')[0] : ''
    });
    setModalType('edit');
    setShowModal(true);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Add note
  const handleAddNote = async () => {
    if (!newNote.trim()) return;
    
    try {
      setLoading(true);
      const response = await adminAxios.post(`/api/leads/${currentLead._id}/notes`, {
        content: newNote
      });
      
      setFormData(prev => ({
        ...prev,
        notes: [...prev.notes, response.data.data]
      }));
      setNewNote('');
      setSuccessMessage('Note added successfully!');
      setTimeout(() => setSuccessMessage(''), 2000);
    } catch (err) {
      setError('Failed to add note');
      console.error('Error adding note:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      const { notes, ...updateData } = formData;
      
      const response = await adminAxios.put(`/api/leads/${currentLead._id}`, updateData);
      
      setSuccessMessage('Lead updated successfully!');
      await fetchLeads();
      setShowModal(false);
      
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Operation failed. Please try again.');
      console.error('Error updating lead:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle delete
  const handleDelete = async () => {
    try {
      setLoading(true);
      await adminAxios.delete(`/api/leads/${deleteConfirm}`);
      setSuccessMessage('Lead deleted successfully!');
      setDeleteConfirm(null);
      await fetchLeads();
      
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError('Failed to delete lead. Please try again.');
      console.error('Error deleting lead:', err);
    } finally {
      setLoading(false);
    }
  };

  // Reset filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedStatus('all');
    setSelectedPriority('all');
    setSelectedExhibition('all');
    setSelectedBudgetRange('all');
    setStartDateFilter('');
    setEndDateFilter('');
    setCurrentPage(1);
    setSelectedLeads([]);
  };

  // Send email to lead
  const handleSendEmail = (email) => {
    window.open(`mailto:${email}`, '_blank');
  };

  // Call lead
  const handleCallLead = (phone) => {
    window.open(`tel:${phone}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Lead Management</h1>
        <p className="text-gray-600 mt-2">Manage and track all exhibition stall design inquiries</p>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
          <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
          <span className="text-green-700">{successMessage}</span>
          <button 
            onClick={() => setSuccessMessage('')}
            className="ml-auto text-green-500 hover:text-green-700"
          >
            <XCircle className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
          <AlertCircle className="w-5 h-5 text-red-500 mr-3" />
          <span className="text-red-700">{error}</span>
          <button 
            onClick={() => setError(null)}
            className="ml-auto text-red-500 hover:text-red-700"
          >
            <XCircle className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Leads</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 text-xs text-gray-500">
            <span className="text-green-600 font-medium">+{stats.new} new</span> this month
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">New Leads</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.new}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-green-500 rounded-full" 
                style={{ width: `${(stats.new / Math.max(stats.total, 1)) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Contacted</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.contacted}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Phone className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 text-xs text-gray-500">
            Need follow-up
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Won Leads</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.won}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 text-xs text-gray-500">
            Conversion: {stats.conversionRate}%
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg. Response</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">2.4h</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-4 text-xs text-gray-500">
            Faster than average
          </div>
        </div>
      </div>

      {/* Bulk Actions Bar */}
      {selectedLeads.length > 0 && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-blue-600 font-semibold">{selectedLeads.length}</span>
            </div>
            <span className="text-blue-700 font-medium">{selectedLeads.length} leads selected</span>
          </div>
          <div className="flex items-center gap-2">
            <select 
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm bg-white"
              onChange={(e) => handleBulkStatusUpdate(e.target.value)}
              defaultValue=""
            >
              <option value="" disabled>Update Status</option>
              <option value="contacted">Mark as Contacted</option>
              <option value="qualified">Mark as Qualified</option>
              <option value="proposal_sent">Send Proposal</option>
              <option value="won">Mark as Won</option>
              <option value="lost">Mark as Lost</option>
            </select>
            <button
              onClick={() => setSelectedLeads([])}
              className="px-3 py-1.5 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Filters Panel */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search leads by name, company, email, or exhibition..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={resetFilters}
              className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex items-center gap-2"
            >
              <FilterX className="w-4 h-4" />
              Reset Filters
            </button>
            
            <button
              onClick={handleExportCSV}
              className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          </div>
        </div>

        {/* Filter Grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Tag className="w-4 h-4 inline mr-2" />
              Status
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Status</option>
              {Object.entries(statusConfig).map(([value, config]) => (
                <option key={value} value={value}>{config.label}</option>
              ))}
            </select>
          </div>

          {/* Priority Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <AlertCircle className="w-4 h-4 inline mr-2" />
              Priority
            </label>
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Priorities</option>
              {Object.entries(priorityConfig).map(([value, config]) => (
                <option key={value} value={value}>{config.label}</option>
              ))}
            </select>
          </div>

          {/* Exhibition Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Building2 className="w-4 h-4 inline mr-2" />
              Exhibition
            </label>
            <select
              value={selectedExhibition}
              onChange={(e) => setSelectedExhibition(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Exhibitions</option>
              {exhibitionOptions.map(exhibition => (
                <option key={exhibition} value={exhibition}>{exhibition}</option>
              ))}
            </select>
          </div>

          {/* Budget Range Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <DollarSign className="w-4 h-4 inline mr-2" />
              Budget
            </label>
            <select
              value={selectedBudgetRange}
              onChange={(e) => setSelectedBudgetRange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Budgets</option>
              {Object.entries(budgetConfig).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>

          {/* Date Range */}
          <div className="md:col-span-2 space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              <Calendar className="w-4 h-4 inline mr-2" />
              Date Range
            </label>
            <div className="flex gap-2">
              <input
                type="date"
                value={startDateFilter}
                onChange={(e) => setStartDateFilter(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <span className="text-gray-400 self-center">to</span>
              <input
                type="date"
                value={endDateFilter}
                onChange={(e) => setEndDateFilter(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto" />
            <p className="mt-4 text-gray-600">Loading leads...</p>
          </div>
        ) : leads.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
              <Users className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">No leads found</h3>
            <p className="mt-2 text-gray-600">
              {searchTerm || selectedStatus !== 'all' || selectedPriority !== 'all' 
                ? 'Try adjusting your search or filters' 
                : 'No leads have been submitted yet'}
            </p>
            <button
              onClick={resetFilters}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
                      <input
                        type="checkbox"
                        checked={selectedLeads.length === leads.length && leads.length > 0}
                        onChange={handleSelectAll}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Lead Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Exhibition & Requirements
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status & Priority
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {leads.map((lead) => (
                    <tr key={lead._id} className={`hover:bg-gray-50 ${selectedLeads.includes(lead._id) ? 'bg-blue-50' : ''}`}>
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedLeads.includes(lead._id)}
                          onChange={() => handleBulkSelect(lead._id)}
                          className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-start">
                          <div className="ml-4">
                            <div className="flex items-center gap-2">
                              <div className="text-sm font-semibold text-gray-900">
                                {lead.fullName}
                              </div>
                              {lead.assignedTo && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
                                  Assigned
                                </span>
                              )}
                            </div>
                            <div className="text-sm text-gray-900 mt-1">{lead.companyName}</div>
                            <div className="flex items-center gap-3 mt-2">
                              <div className="flex items-center gap-1 text-sm text-gray-600">
                                <Mail className="w-3 h-3" />
                                <a href={`mailto:${lead.email}`} className="hover:text-blue-600">
                                  {lead.email}
                                </a>
                              </div>
                              <div className="flex items-center gap-1 text-sm text-gray-600">
                                <Phone className="w-3 h-3" />
                                <a href={`tel:${lead.phoneNumber}`} className="hover:text-blue-600">
                                  {lead.phoneNumber}
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-2">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{lead.exhibitionName}</div>
                            <div className="text-xs text-gray-600">{lead.exhibitionLocation}</div>
                            <div className="text-xs text-gray-500">
                              {formatDate(lead.exhibitionDate)}
                            </div>
                          </div>
                          <div className="text-xs">
                            <span className="font-medium">Stall:</span> {lead.preferredStallSize}
                            <span className="mx-2">•</span>
                            <span className="font-medium">Budget:</span> {getBudgetLabel(lead.budgetRange)}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-2">
                          <div>{getStatusBadge(lead.status)}</div>
                          <div>{getPriorityBadge(lead.priority)}</div>
                          {lead.followUpDate && (
                            <div className="text-xs text-gray-500 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              Follow-up: {formatDate(lead.followUpDate)}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        <div>{formatDateTime(lead.createdAt)}</div>
                        <div className="text-xs text-gray-400 mt-1">
                          {lead.notes?.length || 0} notes
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleSendEmail(lead.email)}
                            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Send Email"
                          >
                            <Mail className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleCallLead(lead.phoneNumber)}
                            className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Call"
                          >
                            <Phone className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => openViewModal(lead)}
                            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => openEditModal(lead)}
                            className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(lead._id)}
                            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
                  <span className="font-medium">
                    {Math.min(currentPage * itemsPerPage, totalLeads)}
                  </span> of{' '}
                  <span className="font-medium">{totalLeads}</span> leads
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={`p-2 rounded-lg ${
                      currentPage === 1
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-10 h-10 rounded-lg ${
                          currentPage === pageNum
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`p-2 rounded-lg ${
                      currentPage === totalPages
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
              Delete Lead
            </h3>
            <p className="text-gray-600 text-center mb-6">
              Are you sure you want to delete this lead? This action cannot be undone and will remove all associated data.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-4 py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-4 py-2.5 bg-red-600 text-white hover:bg-red-700 rounded-lg transition-colors"
              >
                Delete Lead
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-xl max-w-4xl w-full my-8 max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-6 border-b border-gray-200 z-10">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">
                  {modalType === 'view' ? 'Lead Details' : 'Edit Lead'}
                </h2>
                <div className="flex items-center gap-2">
                  {modalType === 'view' && (
                    <button
                      onClick={() => setModalType('edit')}
                      className="px-3 py-1.5 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded-lg flex items-center gap-2"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => setShowModal(false)}
                    className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                  >
                    <XCircle className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {modalType === 'view' ? (
              /* View Mode */
              <div className="p-6 space-y-6">
                {/* Lead Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{formData.fullName}</h3>
                    <p className="text-sm text-gray-600">{formData.companyName}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-sm text-gray-500 flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        {formData.email}
                      </span>
                      <span className="text-sm text-gray-500 flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        {formData.phoneNumber}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div>{getStatusBadge(formData.status)}</div>
                    <div>{getPriorityBadge(formData.priority)}</div>
                  </div>
                </div>

                {/* Exhibition Info */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Exhibition Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Exhibition Name</p>
                      <p className="font-medium">{formData.exhibitionName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Location</p>
                      <p className="font-medium">{formData.exhibitionLocation}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Date</p>
                      <p className="font-medium">{formatDate(formData.exhibitionDate)}</p>
                    </div>
                  </div>
                </div>

                {/* Requirements */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Requirements</h4>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-gray-500">Stall Size</p>
                        <p className="font-medium">{formData.preferredStallSize}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Budget Range</p>
                        <p className="font-medium">{getBudgetLabel(formData.budgetRange)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Source</p>
                        <p className="font-medium">Website Form</p>
                      </div>
                    </div>
                  </div>

                  {/* Additional Message */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Additional Requirements</h4>
                    <div className="bg-gray-50 p-4 rounded-lg min-h-[100px]">
                      {formData.additionalMessage ? (
                        <p className="text-sm text-gray-700">{formData.additionalMessage}</p>
                      ) : (
                        <p className="text-sm text-gray-400 italic">No additional requirements provided</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Notes Section */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-semibold text-gray-900">Notes & Activity</h4>
                    <span className="text-xs text-gray-500">{formData.notes?.length || 0} notes</span>
                  </div>
                  
                  {/* Add Note Form */}
                  <div className="mb-4">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        placeholder="Add a note..."
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        onKeyPress={(e) => e.key === 'Enter' && handleAddNote()}
                      />
                      <button
                        onClick={handleAddNote}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Add
                      </button>
                    </div>
                  </div>

                  {/* Notes List */}
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {formData.notes && formData.notes.length > 0 ? (
                      formData.notes.map((note, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4 text-gray-400" />
                              <span className="text-sm font-medium text-gray-900">Admin</span>
                            </div>
                            <span className="text-xs text-gray-500">
                              {formatDateTime(note.createdAt || new Date())}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700">{note.content}</p>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500">No notes yet</p>
                        <p className="text-sm text-gray-400">Add your first note above</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="pt-6 border-t border-gray-200">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Quick Actions</h4>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleSendEmail(formData.email)}
                      className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <Mail className="w-4 h-4" />
                      Send Email
                    </button>
                    <button
                      onClick={() => handleCallLead(formData.phoneNumber)}
                      className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <Phone className="w-4 h-4" />
                      Call Lead
                    </button>
                    <button
                      onClick={() => setModalType('edit')}
                      className="flex-1 px-4 py-2.5 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <Edit className="w-4 h-4" />
                      Edit Details
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Edit Mode */
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Basic Information */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Lead Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Exhibition Details */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Exhibition Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Exhibition Name *
                      </label>
                      <input
                        type="text"
                        name="exhibitionName"
                        value={formData.exhibitionName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location *
                      </label>
                      <input
                        type="text"
                        name="exhibitionLocation"
                        value={formData.exhibitionLocation}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date *
                      </label>
                      <input
                        type="date"
                        name="exhibitionDate"
                        value={formData.exhibitionDate}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Requirements */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Requirements</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Stall Size *
                      </label>
                      <input
                        type="text"
                        name="preferredStallSize"
                        value={formData.preferredStallSize}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Budget Range *
                      </label>
                      <select
                        name="budgetRange"
                        value={formData.budgetRange}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select budget</option>
                        {Object.entries(budgetConfig).map(([value, label]) => (
                          <option key={value} value={value}>{label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Status
                      </label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        {Object.entries(statusConfig).map(([value, config]) => (
                          <option key={value} value={value}>{config.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Priority
                      </label>
                      <select
                        name="priority"
                        value={formData.priority}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        {Object.entries(priorityConfig).map(([value, config]) => (
                          <option key={value} value={value}>{config.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Follow-up Date
                    </label>
                    <input
                      type="date"
                      name="followUpDate"
                      value={formData.followUpDate}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Requirements
                    </label>
                    <textarea
                      name="additionalMessage"
                      value={formData.additionalMessage}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Modal Actions */}
                <div className="flex gap-3 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 px-4 py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 px-4 py-2.5 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      'Update Lead'
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadManagement;