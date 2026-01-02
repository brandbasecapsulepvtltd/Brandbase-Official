import React, { useState, useEffect } from 'react';
import adminAxios from '../utils/axios';
import {
  Plus, Search, Edit, Trash2, Eye,
  Filter, Upload, Calendar, MapPin, Users,
  ChevronLeft, ChevronRight, CheckCircle,
  XCircle, AlertCircle, Loader2, FileText,
  Building2, Globe, Tag, Clock, X, Check,
  Download, Copy, ExternalLink, BarChart3
} from 'lucide-react';

const EventManagement = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [venueType, setVenueType] = useState('all');
  const [cities, setCities] = useState([]);
  const [industries, setIndustries] = useState([]);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalEvents, setTotalEvents] = useState(0);
  const itemsPerPage = 10;
  
  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('create');
  const [currentEvent, setCurrentEvent] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    venue: '',
    city: '',
    organizer: '',
    organizerWebsite: '',
    industry: 'tech',
    isIndoor: true,
    expectedFootfall: 100,
    stallSizes: ['9x9'],
    description: '',
    whyParticipate: '',
    portfolioItems: [],
    similarEvents: []
  });
  
  // New portfolio item
  const [newPortfolioItem, setNewPortfolioItem] = useState({
    id: '',
    eventId: '',
    eventName: '',
    imageUrl: '',
    stallSize: '',
    industry: '',
    clientTestimonial: '',
    clientName: '',
    clientCompany: ''
  });
  
  // Bulk operations
  const [showJsonImport, setShowJsonImport] = useState(false);
  const [jsonText, setJsonText] = useState('');
  const [jsonError, setJsonError] = useState('');
  
  // Date range filter
  const [startDateFilter, setStartDateFilter] = useState('');
  const [endDateFilter, setEndDateFilter] = useState('');
  
  // Industry labels mapping
  const industryLabels = {
    tech: 'Technology',
    healthcare: 'Healthcare',
    manufacturing: 'Manufacturing',
    retail: 'Retail & Consumer',
    food: 'Food & Beverage',
    auto: 'Automotive',
    fashion: 'Fashion & Lifestyle',
    pharma: 'Pharmaceutical'
  };

  // Stall size options
  const stallSizeOptions = ['6x6', '9x9', '12x12', '15x15', '18x18', '20x20', 'Custom'];

  // Fetch events
  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params = new URLSearchParams({
        page: currentPage,
        limit: itemsPerPage,
        ...(searchTerm && { search: searchTerm }),
        ...(selectedCity !== 'all' && { city: selectedCity }),
        ...(selectedIndustry !== 'all' && { industry: selectedIndustry }),
        ...(venueType !== 'all' && { venueType: venueType }),
        ...(startDateFilter && { startDate: startDateFilter }),
        ...(endDateFilter && { endDate: endDateFilter })
      });

      const response = await adminAxios.get(`/api/events?${params}`);
      
      setEvents(response.data.data || []);
      setTotalEvents(response.data.pagination?.total || 0);
      setTotalPages(response.data.pagination?.pages || 1);
      
    } catch (err) {
      setError('Failed to fetch events. Please check your connection.');
      console.error('Error fetching events:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch filters data
  const fetchFiltersData = async () => {
    try {
      const [citiesRes, industriesRes] = await Promise.all([
        adminAxios.get('/api/events/cities/all'),
        adminAxios.get('/api/events/industries/all')
      ]);
      
      setCities(citiesRes.data.data || []);
      setIndustries(industriesRes.data.data || []);
    } catch (err) {
      console.error('Error fetching filter data:', err);
    }
  };

  useEffect(() => {
    fetchEvents();
    fetchFiltersData();
  }, [currentPage]);

  useEffect(() => {
    // Reset to page 1 when filters change
    setCurrentPage(1);
    fetchEvents();
  }, [searchTerm, selectedCity, selectedIndustry, venueType, startDateFilter, endDateFilter]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (name === 'stallSizes') {
      // Handle multi-select for stall sizes
      const options = Array.from(e.target.selectedOptions, option => option.value);
      setFormData(prev => ({ ...prev, stallSizes: options }));
    } else if (name === 'expectedFootfall') {
      setFormData(prev => ({ ...prev, [name]: parseInt(value) || 0 }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Handle portfolio item input changes
  const handlePortfolioItemChange = (e) => {
    const { name, value } = e.target;
    setNewPortfolioItem(prev => ({ ...prev, [name]: value }));
  };

  // Add portfolio item
  const addPortfolioItem = () => {
    if (newPortfolioItem.imageUrl && newPortfolioItem.clientName) {
      setFormData(prev => ({
        ...prev,
        portfolioItems: [...prev.portfolioItems, { ...newPortfolioItem, id: Date.now().toString() }]
      }));
      setNewPortfolioItem({
        id: '',
        eventId: '',
        eventName: '',
        imageUrl: '',
        stallSize: '',
        industry: '',
        clientTestimonial: '',
        clientName: '',
        clientCompany: ''
      });
    }
  };

  // Remove portfolio item
  const removePortfolioItem = (index) => {
    setFormData(prev => ({
      ...prev,
      portfolioItems: prev.portfolioItems.filter((_, i) => i !== index)
    }));
  };

  // Add similar event
  const addSimilarEvent = () => {
    const eventId = prompt('Enter Event ID to add as similar event:');
    if (eventId && !formData.similarEvents.includes(eventId)) {
      setFormData(prev => ({
        ...prev,
        similarEvents: [...prev.similarEvents, eventId]
      }));
    }
  };

  // Remove similar event
  const removeSimilarEvent = (eventId) => {
    setFormData(prev => ({
      ...prev,
      similarEvents: prev.similarEvents.filter(id => id !== eventId)
    }));
  };

  // Open create modal
  const openCreateModal = () => {
    setFormData({
      name: '',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date().toISOString().split('T')[0],
      venue: '',
      city: '',
      organizer: '',
      organizerWebsite: '',
      industry: 'tech',
      isIndoor: true,
      expectedFootfall: 100,
      stallSizes: ['9x9'],
      description: '',
      whyParticipate: '',
      portfolioItems: [],
      similarEvents: []
    });
    setModalType('create');
    setShowModal(true);
    setShowJsonImport(false);
    setJsonText('');
    setJsonError('');
  };

  // Open edit modal
  const openEditModal = (event) => {
    setCurrentEvent(event);
    setFormData({
      ...event,
      startDate: new Date(event.startDate).toISOString().split('T')[0],
      endDate: new Date(event.endDate).toISOString().split('T')[0]
    });
    setModalType('edit');
    setShowModal(true);
    setShowJsonImport(false);
    setJsonText('');
    setJsonError('');
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      if (modalType === 'create') {
        await adminAxios.post('/api/events', formData);
        setSuccessMessage('Event created successfully!');
      } else {
        await adminAxios.put(`/api/events/${currentEvent.id}`, formData);
        setSuccessMessage('Event updated successfully!');
      }
      
      await fetchEvents();
      setShowModal(false);
      
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Operation failed. Please try again.');
      console.error('Error saving event:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle delete
  const handleDelete = async () => {
    try {
      setLoading(true);
      await adminAxios.delete(`/api/events/${deleteConfirm}`);
      setSuccessMessage('Event deleted successfully!');
      setDeleteConfirm(null);
      await fetchEvents();
      
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError('Failed to delete event. Please try again.');
      console.error('Error deleting event:', err);
    } finally {
      setLoading(false);
    }
  };

  // Import JSON
  const handleJsonImport = () => {
    try {
      setJsonError('');
      const parsedData = JSON.parse(jsonText);
      
      // Validate the JSON structure
      if (!parsedData.name || !parsedData.startDate || !parsedData.venue) {
        throw new Error('Invalid JSON structure. Must include name, startDate, and venue.');
      }

      // Format dates
      if (parsedData.startDate) {
        parsedData.startDate = new Date(parsedData.startDate).toISOString().split('T')[0];
      }
      if (parsedData.endDate) {
        parsedData.endDate = new Date(parsedData.endDate).toISOString().split('T')[0];
      }

      setFormData(parsedData);
      setShowJsonImport(false);
      setJsonText('');
      setSuccessMessage('JSON imported successfully!');
      
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setJsonError(err.message || 'Invalid JSON format');
    }
  };

  // Export as JSON
  const exportAsJson = () => {
    const jsonData = JSON.stringify(formData, null, 2);
    navigator.clipboard.writeText(jsonData);
    setSuccessMessage('JSON copied to clipboard!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  // Reset filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCity('all');
    setSelectedIndustry('all');
    setVenueType('all');
    setStartDateFilter('');
    setEndDateFilter('');
    setCurrentPage(1);
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Get date range string
  const getDateRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (start.toDateString() === end.toDateString()) {
      return formatDate(startDate);
    }
    
    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
  };

  // Calculate upcoming events
  const upcomingEvents = events.filter(event => new Date(event.startDate) >= new Date());

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Event Management</h1>
        <p className="text-gray-600 mt-2">Manage and organize events, exhibitions, and trade shows</p>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
          <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
          <span className="text-green-700">{successMessage}</span>
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Events</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{totalEvents}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Upcoming Events</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{upcomingEvents.length}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Cities</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{cities.length}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <MapPin className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Industries</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{industries.length}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Tag className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search events by name, venue, organizer, or city..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={resetFilters}
              className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Reset Filters
            </button>
            
            <button
              onClick={openCreateModal}
              className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              New Event
            </button>
          </div>
        </div>

        {/* Filter Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* City Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="w-4 h-4 inline mr-2" />
              City
            </label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Cities</option>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          {/* Industry Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Tag className="w-4 h-4 inline mr-2" />
              Industry
            </label>
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Industries</option>
              {industries.map(industry => (
                <option key={industry.value} value={industry.value}>
                  {industry.label}
                </option>
              ))}
            </select>
          </div>

          {/* Venue Type Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Building2 className="w-4 h-4 inline mr-2" />
              Venue Type
            </label>
            <select
              value={venueType}
              onChange={(e) => setVenueType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Venues</option>
              <option value="indoor">Indoor</option>
              <option value="outdoor">Outdoor</option>
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

      {/* Events Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto" />
            <p className="mt-4 text-gray-600">Loading events...</p>
          </div>
        ) : events.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
              <Calendar className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">No events found</h3>
            <p className="mt-2 text-gray-600">
              {searchTerm || selectedCity !== 'all' || selectedIndustry !== 'all' 
                ? 'Try adjusting your search or filters' 
                : 'Get started by creating your first event'}
            </p>
            <button
              onClick={openCreateModal}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create New Event
            </button>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Event Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date & Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Industry & Venue
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Attendees
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {events.map((event) => (
                    <tr key={event.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-start">
                          <div className="ml-4">
                            <div className="text-sm font-semibold text-gray-900">
                              {event.name}
                            </div>
                            <div className="text-sm text-gray-500 mt-1">
                              {event.organizer}
                            </div>
                            <div className="mt-2">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                new Date(event.startDate) < new Date() 
                                  ? 'bg-gray-100 text-gray-800' 
                                  : 'bg-green-100 text-green-800'
                              }`}>
                                {new Date(event.startDate) < new Date() ? 'Past Event' : 'Upcoming'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            {getDateRange(event.startDate, event.endDate)}
                          </div>
                          <div className="flex items-center gap-1 mt-2">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            {event.city}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {event.venue}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-2">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            event.industry === 'tech' ? 'bg-blue-100 text-blue-800' :
                            event.industry === 'healthcare' ? 'bg-green-100 text-green-800' :
                            event.industry === 'manufacturing' ? 'bg-yellow-100 text-yellow-800' :
                            event.industry === 'retail' ? 'bg-purple-100 text-purple-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {industryLabels[event.industry] || event.industry}
                          </span>
                          <div className="text-xs text-gray-600">
                            <span className={`inline-flex items-center ${event.isIndoor ? 'text-blue-600' : 'text-green-600'}`}>
                              {event.isIndoor ? '🏢 Indoor' : '🌳 Outdoor'}
                            </span>
                          </div>
                          <div className="text-xs text-gray-500">
                            Stall Sizes: {event.stallSizes?.join(', ') || 'N/A'}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4 text-gray-400" />
                            {event.expectedFootfall?.toLocaleString() || 0} expected
                          </div>
                          <div className="text-xs text-gray-500 mt-2">
                            {event.portfolioItems?.length || 0} portfolio items
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => window.open(`/events/${event.id}`, '_blank')}
                            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="View"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => openEditModal(event)}
                            className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(event.id)}
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
                    {Math.min(currentPage * itemsPerPage, totalEvents)}
                  </span> of{' '}
                  <span className="font-medium">{totalEvents}</span> events
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
              Delete Event
            </h3>
            <p className="text-gray-600 text-center mb-6">
              Are you sure you want to delete this event? This action cannot be undone.
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
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-xl max-w-6xl w-full my-8 max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-6 border-b border-gray-200 z-10">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">
                  {modalType === 'create' ? 'Create New Event' : 'Edit Event'}
                </h2>
                <div className="flex items-center gap-2">
                  <button
                    onClick={exportAsJson}
                    className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg flex items-center gap-2"
                    title="Export as JSON"
                  >
                    <Copy className="w-4 h-4" />
                    Export JSON
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                  >
                    <XCircle className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {showJsonImport ? (
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Import JSON Data</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Paste your JSON data below. The JSON should match the event structure.
                  </p>
                  <textarea
                    value={jsonText}
                    onChange={(e) => setJsonText(e.target.value)}
                    rows={12}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                    placeholder={`{
  "name": "Tech Expo 2024",
  "startDate": "2024-03-15",
  "endDate": "2024-03-17",
  "venue": "Convention Center",
  ...
}`}
                  />
                  {jsonError && (
                    <div className="mt-2 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                      {jsonError}
                    </div>
                  )}
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowJsonImport(false)}
                    className="flex-1 px-4 py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    Cancel Import
                  </button>
                  <button
                    onClick={handleJsonImport}
                    className="flex-1 px-4 py-2.5 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Upload className="w-5 h-5" />
                    Import JSON
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* JSON Import Button */}
                {modalType === 'create' && (
                  <div className="mb-4">
                    <button
                      type="button"
                      onClick={() => setShowJsonImport(true)}
                      className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
                    >
                      <Upload className="w-5 h-5" />
                      <span>Import JSON Data</span>
                    </button>
                    <p className="text-xs text-gray-500 mt-2 text-center">
                      Click here to import event data from JSON format
                    </p>
                  </div>
                )}

                {/* Event Information */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Event Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Tech Expo 2024"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Start Date *
                        </label>
                        <input
                          type="date"
                          name="startDate"
                          value={formData.startDate}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          End Date *
                        </label>
                        <input
                          type="date"
                          name="endDate"
                          value={formData.endDate}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Location & Venue */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Location & Venue</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Venue *
                      </label>
                      <input
                        type="text"
                        name="venue"
                        value={formData.venue}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Convention Center"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="New York"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Organizer *
                      </label>
                      <input
                        type="text"
                        name="organizer"
                        value={formData.organizer}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Tech Events Inc."
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Organizer Website *
                      </label>
                      <input
                        type="url"
                        name="organizerWebsite"
                        value={formData.organizerWebsite}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="https://example.com"
                      />
                    </div>
                  </div>
                </div>

                {/* Event Details */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Industry *
                      </label>
                      <select
                        name="industry"
                        value={formData.industry}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        {industries.map(industry => (
                          <option key={industry.value} value={industry.value}>
                            {industry.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expected Footfall *
                      </label>
                      <input
                        type="number"
                        name="expectedFootfall"
                        value={formData.expectedFootfall}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="1000"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Stall Sizes *
                      </label>
                      <select
                        name="stallSizes"
                        value={formData.stallSizes}
                        onChange={handleInputChange}
                        multiple
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-32"
                      >
                        {stallSizeOptions.map(size => (
                          <option key={size} value={size}>{size}</option>
                        ))}
                      </select>
                      <p className="text-xs text-gray-500 mt-1">
                        Hold Ctrl/Cmd to select multiple sizes
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="isIndoor"
                          checked={formData.isIndoor}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <span className="ml-2 text-gray-700">Indoor Event</span>
                      </label>
                      
                      <div className="bg-white p-3 rounded border">
                        <div className="text-sm font-medium text-gray-700 mb-1">
                          Selected Sizes: {formData.stallSizes.join(', ')}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Descriptions */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Descriptions</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description *
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Describe the event, its purpose, and what attendees can expect..."
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Why Participate *
                      </label>
                      <textarea
                        name="whyParticipate"
                        value={formData.whyParticipate}
                        onChange={handleInputChange}
                        required
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Explain the benefits of participating in this event..."
                      />
                    </div>
                  </div>
                </div>

                {/* Portfolio Items */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Portfolio Items</h3>
                    <span className="text-sm text-gray-600">
                      {formData.portfolioItems.length} items added
                    </span>
                  </div>
                  
                  {/* Add Portfolio Item Form */}
                  <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Add New Portfolio Item</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                      <input
                        type="text"
                        name="clientName"
                        value={newPortfolioItem.clientName}
                        onChange={handlePortfolioItemChange}
                        placeholder="Client Name"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <input
                        type="text"
                        name="clientCompany"
                        value={newPortfolioItem.clientCompany}
                        onChange={handlePortfolioItemChange}
                        placeholder="Client Company"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <input
                        type="url"
                        name="imageUrl"
                        value={newPortfolioItem.imageUrl}
                        onChange={handlePortfolioItemChange}
                        placeholder="Image URL"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <input
                        type="text"
                        name="stallSize"
                        value={newPortfolioItem.stallSize}
                        onChange={handlePortfolioItemChange}
                        placeholder="Stall Size"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <textarea
                      name="clientTestimonial"
                      value={newPortfolioItem.clientTestimonial}
                      onChange={handlePortfolioItemChange}
                      placeholder="Client Testimonial"
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-3"
                    />
                    <button
                      type="button"
                      onClick={addPortfolioItem}
                      className="px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add Portfolio Item
                    </button>
                  </div>
                  
                  {/* Portfolio Items List */}
                  {formData.portfolioItems.map((item, index) => (
                    <div key={item.id || index} className="bg-white p-4 rounded-lg border border-gray-200 mb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          {item.imageUrl && (
                            <img
                              src={item.imageUrl}
                              alt={item.clientName}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                          )}
                          <div>
                            <div className="font-medium text-gray-900">{item.clientName}</div>
                            <div className="text-sm text-gray-600">{item.clientCompany}</div>
                            <div className="text-sm text-gray-500 mt-1">{item.clientTestimonial}</div>
                            <div className="text-xs text-gray-400 mt-2">Stall: {item.stallSize}</div>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removePortfolioItem(index)}
                          className="p-1 text-red-600 hover:bg-red-50 rounded"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Similar Events */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Similar Events</h3>
                    <span className="text-sm text-gray-600">
                      {formData.similarEvents.length} events linked
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    <button
                      type="button"
                      onClick={addSimilarEvent}
                      className="px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add Similar Event
                    </button>
                    
                    <div className="space-y-2">
                      {formData.similarEvents.map((eventId, index) => (
                        <div key={index} className="bg-white p-3 rounded-lg border border-gray-200 flex items-center justify-between">
                          <span className="text-sm font-mono">{eventId}</span>
                          <button
                            type="button"
                            onClick={() => removeSimilarEvent(eventId)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
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
                        {modalType === 'create' ? 'Creating...' : 'Updating...'}
                      </>
                    ) : (
                      modalType === 'create' ? 'Create Event' : 'Update Event'
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

export default EventManagement;