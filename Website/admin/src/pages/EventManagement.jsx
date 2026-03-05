
import React, { useState, useEffect } from 'react';
import adminAxios from '../utils/axios';
import {
  Plus, Search, Edit, Trash2, Eye,
  Filter, Upload, Calendar, MapPin, Users,
  ChevronLeft, ChevronRight, CheckCircle,
  XCircle, AlertCircle, Loader2, FileText,
  Building2, Globe, Tag, Clock, X, Check,
  Download, Copy, ExternalLink, BarChart3,
  Bot
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
  const [showFilters, setShowFilters] = useState(false);
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
    similarEvents: [],
    slug: '',
    seoTitle: '',
    seoDescription: '',
    seoKeywords: [],
    structuredData: '',
    status: 'published',
    faqs: [],
    sections: [],
    blogConfiguration: {
      enabled: false,
      scheduledBlogs: [
        { category: 'guide', publishDate: '', isGenerated: false },
        { category: 'fabricator', publishDate: '', isGenerated: false },
        { category: 'trends', publishDate: '', isGenerated: false },
        { category: 'checklist', publishDate: '', isGenerated: false },
        { category: 'roi', publishDate: '', isGenerated: false }
      ],
      keywords: []
    }
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
  const [showAIModal, setShowAIModal] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [jsonText, setJsonText] = useState('');
  const [jsonError, setJsonError] = useState('');

  // Date range filter
  const [startDateFilter, setStartDateFilter] = useState('');
  const [endDateFilter, setEndDateFilter] = useState('');

  // FAQ and Sections state
  const [newFaq, setNewFaq] = useState({ question: '', answer: '' });
  const [editingFaqIndex, setEditingFaqIndex] = useState(null);
  const [newSection, setNewSection] = useState({
    id: '',
    title: '',
    content: [''],
    listItems: [],
    media: []
  });
  const [editingSectionIndex, setEditingSectionIndex] = useState(null);
  const [currentMedia, setCurrentMedia] = useState({ type: 'image', url: '', caption: '' });

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

  const handleKeywordsChange = (e) => {
    const value = e.target.value;
    const keywords = value.split(',').map(k => k.trim()).filter(k => k);
    setFormData(prev => ({ ...prev, seoKeywords: keywords }));
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

  // Add FAQ
  const addFaq = () => {
    if (newFaq.question && newFaq.answer) {
      setFormData(prev => ({
        ...prev,
        faqs: [...prev.faqs, { ...newFaq }]
      }));
      setNewFaq({ question: '', answer: '' });
    }
  };

  // Remove FAQ
  const removeFaq = (index) => {
    setFormData(prev => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index)
    }));
  };

  // Edit FAQ
  const editFaq = (index) => {
    setNewFaq(formData.faqs[index]);
    setEditingFaqIndex(index);
  };

  // Update FAQ
  const updateFaq = () => {
    if (newFaq.question && newFaq.answer && editingFaqIndex !== null) {
      const updatedFaqs = [...formData.faqs];
      updatedFaqs[editingFaqIndex] = { ...newFaq };
      setFormData(prev => ({ ...prev, faqs: updatedFaqs }));
      setNewFaq({ question: '', answer: '' });
      setEditingFaqIndex(null);
    }
  };

  // Add Section
  const addSection = () => {
    if (newSection.title && (newSection.content.length > 0 || newSection.listItems.length > 0)) {
      const sectionId = `section - ${Date.now()} `;
      setFormData(prev => ({
        ...prev,
        sections: [...prev.sections, { ...newSection, id: sectionId }]
      }));
      setNewSection({
        id: '',
        title: '',
        content: [''],
        listItems: [],
        media: []
      });
    }
  };

  // Remove Section
  const removeSection = (index) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.filter((_, i) => i !== index)
    }));
  };

  // Edit Section
  const editSection = (index) => {
    const section = formData.sections[index];
    setNewSection({
      ...section,
      listItems: section.listItems || [],
      media: section.media || []
    });
    setEditingSectionIndex(index);
  };

  // Update Section
  const updateSection = () => {
    if (newSection.title && editingSectionIndex !== null) {
      const updatedSections = [...formData.sections];
      updatedSections[editingSectionIndex] = { ...newSection };
      setFormData(prev => ({ ...prev, sections: updatedSections }));
      setNewSection({ id: '', title: '', content: [''], listItems: [], media: [] });
      setEditingSectionIndex(null);
    }
  };

  // Remove media from section
  const removeMediaFromSection = (mediaIndex) => {
    setNewSection(prev => ({
      ...prev,
      media: prev.media.filter((_, i) => i !== mediaIndex)
    }));
  };

  // Add media to current section
  const addMediaToSection = () => {
    if (currentMedia.url) {
      setNewSection(prev => ({
        ...prev,
        media: [...prev.media, { ...currentMedia }]
      }));
      setCurrentMedia({ type: 'image', url: '', caption: '' });
    }
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
      similarEvents: [],
      slug: '',
      seoTitle: '',
      seoDescription: '',
      seoKeywords: [],
      structuredData: '',
      status: 'published',
      faqs: [],
      sections: [],
      blogConfiguration: {
        enabled: false,
        scheduledBlogs: [
          { category: 'guide', publishDate: '', isGenerated: false },
          { category: 'fabricator', publishDate: '', isGenerated: false },
          { category: 'trends', publishDate: '', isGenerated: false },
          { category: 'checklist', publishDate: '', isGenerated: false },
          { category: 'roi', publishDate: '', isGenerated: false }
        ],
        keywords: []
      }
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
      endDate: new Date(event.endDate).toISOString().split('T')[0],
      faqs: event.faqs || [],
      sections: (event.sections || []).map((section, index) => ({
        ...section,
        id: section.id || `section-${Date.now()}-${index}`,
        listItems: section.listItems || [],
        media: section.media || []
      })),
      blogConfiguration: {
        enabled: event.blogConfiguration?.enabled || false,
        scheduledBlogs: event.blogConfiguration?.scheduledBlogs?.length > 0
          ? event.blogConfiguration.scheduledBlogs.map(b => ({
            ...b,
            publishDate: b.publishDate ? new Date(b.publishDate).toISOString().split('T')[0] : ''
          }))
          : [
            { category: 'guide', publishDate: '', isGenerated: false },
            { category: 'fabricator', publishDate: '', isGenerated: false },
            { category: 'trends', publishDate: '', isGenerated: false },
            { category: 'checklist', publishDate: '', isGenerated: false },
            { category: 'roi', publishDate: '', isGenerated: false }
          ],
        keywords: event.blogConfiguration?.keywords || []
      },
      structuredData: typeof event.structuredData === 'object' ? JSON.stringify(event.structuredData, null, 2) : (event.structuredData || ''),
      status: event.status || 'published',
      portfolioItems: event.portfolioItems || [],
      similarEvents: event.similarEvents || [],
      seoKeywords: event.seoKeywords || []
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

  // Trigger AI Blog Generation
  const handleTriggerGeneration = async () => {
    try {
      setLoading(true);
      await adminAxios.post('/api/events/generate-blogs');
      setSuccessMessage('AI Blog Generation triggered successfully! Check Blog Management.');
      setTimeout(() => setSuccessMessage(''), 5000);
    } catch (err) {
      setError('Failed to trigger generation.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Handle AI Event Generation
  const handleGenerateWithAI = async (e) => {
    e.preventDefault();
    if (!aiPrompt.trim()) return;

    try {
      setLoading(true);
      const res = await adminAxios.post('/api/events/generate-ai-event', { prompt: aiPrompt }, {
        timeout: 60000 // Increase timeout to 60 seconds
      });

      const aiData = res.data.data;

      // Generate IDs for sections if missing
      const sectionsWithIds = (aiData.sections || []).map((section, index) => ({
        ...section,
        id: section.id || `section-${Date.now()}-${index}`,
        listItems: section.listItems || [],
        media: section.media || []
      }));

      // Merge AI data with form defaults (ensure arrays are initialized and required fields have values)
      setFormData(prev => ({
        ...prev,
        ...aiData,
        // Ensure required fields have defaults
        organizer: aiData.organizer || '',
        organizerWebsite: aiData.organizerWebsite || '',
        isIndoor: aiData.isIndoor !== undefined ? aiData.isIndoor : true,
        expectedFootfall: aiData.expectedFootfall || 100,
        stallSizes: aiData.stallSizes || ['9x9'],
        whyParticipate: aiData.whyParticipate || '',
        // Dates
        startDate: aiData.startDate || prev.startDate,
        endDate: aiData.endDate || prev.endDate,
        // Arrays with normalized data
        sections: sectionsWithIds,
        faqs: aiData.faqs || [],
        blogConfiguration: {
          enabled: aiData.blogConfiguration?.enabled || false,
          scheduledBlogs: [
            { category: 'guide', publishDate: '', isGenerated: false },
            { category: 'fabricator', publishDate: '', isGenerated: false },
            { category: 'trends', publishDate: '', isGenerated: false },
            { category: 'checklist', publishDate: '', isGenerated: false },
            { category: 'roi', publishDate: '', isGenerated: false }
          ],
          keywords: aiData.blogConfiguration?.keywords || []
        },
        structuredData: typeof aiData.structuredData === 'object' ? JSON.stringify(aiData.structuredData, null, 2) : (aiData.structuredData || ''),
        status: aiData.status || 'published',
        portfolioItems: aiData.portfolioItems || [],
        similarEvents: aiData.similarEvents || [],
        seoKeywords: aiData.seoKeywords || []
      }));

      setShowAIModal(false);
      setModalType('create');
      setShowModal(true);
      setSuccessMessage('Event details generated by AI!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      console.error('AI Generation Error:', err);
      setError('Failed to generate event. Please try again.');
    } finally {
      setLoading(false);
    }
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

    return `${formatDate(startDate)} - ${formatDate(endDate)} `;
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

      {/* Actions Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
            />
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`p - 2 rounded - lg border ${showFilters ? 'bg-purple-50 border-purple-200 text-purple-600' : 'bg-white border-gray-300 text-gray-600'} hover: bg - gray - 50 transition - colors`}
          >
            <Filter className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* Run Scheduler Button */}
          <button
            onClick={handleTriggerGeneration}
            disabled={loading}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Clock className="w-4 h-4" />}
            <span>Run Scheduler</span>
          </button>

          {/* AI Create Button */}
          <button
            onClick={() => setShowAIModal(true)}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors shadow-sm"
          >
            <Bot className="w-4 h-4" />
            <span>Create with AI</span>
          </button>

          {/* Manual Create Button */}
          <button
            onClick={openCreateModal}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>New Event</span>
          </button>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
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
      )}

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
                              <span className={`inline - flex items - center px - 2.5 py - 0.5 rounded - full text - xs font - medium ${new Date(event.startDate) < new Date()
                                ? 'bg-gray-100 text-gray-800'
                                : 'bg-green-100 text-green-800'
                                } `}>
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
                          <span className={`px - 2 py - 1 rounded text - xs font - medium ${event.industry === 'tech' ? 'bg-blue-100 text-blue-800' :
                            event.industry === 'healthcare' ? 'bg-green-100 text-green-800' :
                              event.industry === 'manufacturing' ? 'bg-yellow-100 text-yellow-800' :
                                event.industry === 'retail' ? 'bg-purple-100 text-purple-800' :
                                  'bg-gray-100 text-gray-800'
                            } `}>
                            {industryLabels[event.industry] || event.industry}
                          </span>
                          <div className="text-xs text-gray-600">
                            <span className={`inline - flex items - center ${event.isIndoor ? 'text-blue-600' : 'text-green-600'} `}>
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
                            onClick={() => window.open(`/ events / ${event.id} `, '_blank')}
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
                    className={`p - 2 rounded - lg ${currentPage === 1
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-600 hover:bg-gray-100'
                      } `}
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
                        className={`w - 10 h - 10 rounded - lg ${currentPage === pageNum
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                          } `}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`p - 2 rounded - lg ${currentPage === totalPages
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-600 hover:bg-gray-100'
                      } `}
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

      {/* AI Generation Modal */}
      {showAIModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-purple-50">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Bot className="w-5 h-5 text-purple-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Create Event with AI</h2>
              </div>
              <button onClick={() => setShowAIModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <p className="text-gray-600 mb-4">
                Enter a brief description of the event, and our AI will generate the full profile, including branding, content sections, FAQs, and SEO metadata.
              </p>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">AI Prompt</label>
                <textarea
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  placeholder="e.g. Create a detailed event profile for 'CPHI India 2026' in Greater Noida. It's a pharma event."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 min-h-[120px]"
                />
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowAIModal(false)}
                  className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleGenerateWithAI}
                  disabled={loading || !aiPrompt.trim()}
                  className="flex items-center gap-2 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <Bot className="w-4 h-4" />
                      <span>Generate Event</span>
                    </>
                  )}
                </button>
              </div>
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
} `}
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

                {/* SEO & Metadata */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">SEO & Metadata</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Slug (URL)
                      </label>
                      <input
                        type="text"
                        name="slug"
                        value={formData.slug}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                        placeholder="auto-generated-from-name"
                      />
                      <p className="text-xs text-gray-500 mt-1">Leave empty to auto-generate from name</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Status
                      </label>
                      <select
                        name="status"
                        value={formData.status || 'published'}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                        <option value="archived">Archived</option>
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        SEO Title
                      </label>
                      <input
                        type="text"
                        name="seoTitle"
                        value={formData.seoTitle || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Event Name | Brandbase"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        SEO Description
                      </label>
                      <textarea
                        name="seoDescription"
                        value={formData.seoDescription || ''}
                        onChange={handleInputChange}
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Meta description for search engines..."
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        SEO Keywords (comma separated)
                      </label>
                      <input
                        type="text"
                        value={formData.seoKeywords?.join(', ') || ''}
                        onChange={handleKeywordsChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="event, exhibition, tech, conference"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Structured Data (JSON)
                      </label>
                      <textarea
                        name="structuredData"
                        value={formData.structuredData || ''}
                        onChange={handleInputChange}
                        rows={5}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                        placeholder={`{ "@context": "https://schema.org", "@type": "Event", ... } `}
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

                {/* FAQs Management */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">FAQs</h3>
                    <span className="text-sm text-gray-600">
                      {formData.faqs.length} FAQs
                    </span>
                  </div>

                  {/* Add New FAQ Form */}
                  <div className="space-y-3 mb-4">
                    <input
                      type="text"
                      placeholder="Question"
                      value={newFaq.question}
                      onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <textarea
                      placeholder="Answer"
                      value={newFaq.answer}
                      onChange={(e) => setNewFaq({ ...newFaq, answer: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button
                      type="button"
                      onClick={editingFaqIndex !== null ? updateFaq : addFaq}
                      className="px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      {editingFaqIndex !== null ? 'Update FAQ' : 'Add FAQ'}
                    </button>
                    {editingFaqIndex !== null && (
                      <button
                        type="button"
                        onClick={() => {
                          setNewFaq({ question: '', answer: '' });
                          setEditingFaqIndex(null);
                        }}
                        className="px-4 py-2 bg-red-100 text-red-700 hover:bg-red-200 rounded-lg transition-colors"
                      >
                        Cancel
                      </button>
                    )}
                  </div>

                  {/* FAQs List */}
                  <div className="space-y-3">
                    {formData.faqs.map((faq, index) => (
                      <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="font-medium text-gray-900 mb-1">{faq.question}</div>
                            <div className="text-sm text-gray-600">{faq.answer}</div>
                          </div>
                          <div className="flex gap-1 ml-2">
                            <button
                              type="button"
                              onClick={() => editFaq(index)}
                              className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                              title="Edit"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => removeFaq(index)}
                              className="p-1 text-red-600 hover:bg-red-50 rounded"
                              title="Delete"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Content Sections Management (like Blog) */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Content Sections</h3>
                    <span className="text-sm text-gray-600">
                      {formData.sections.length} sections
                    </span>
                  </div>

                  {/* Add New Section Form */}
                  <div className="space-y-3 mb-4 bg-white p-4 rounded-lg border border-gray-200">
                    <input
                      type="text"
                      placeholder="Section Title"
                      value={newSection.title}
                      onChange={(e) => setNewSection({ ...newSection, title: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Content Paragraphs</label>
                      {newSection.content.map((para, idx) => (
                        <div key={idx} className="flex gap-2 mb-2">
                          <textarea
                            placeholder={`Paragraph ${idx + 1} `}
                            value={para}
                            onChange={(e) => {
                              const updated = [...newSection.content];
                              updated[idx] = e.target.value;
                              setNewSection({ ...newSection, content: updated });
                            }}
                            rows={2}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                          {newSection.content.length > 1 && (
                            <button
                              type="button"
                              onClick={() => {
                                const updated = newSection.content.filter((_, i) => i !== idx);
                                setNewSection({ ...newSection, content: updated });
                              }}
                              className="p-2 text-red-600 hover:bg-red-50 rounded"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => setNewSection({ ...newSection, content: [...newSection.content, ''] })}
                        className="text-sm px-3 py-1.5 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded"
                      >
                        + Add Paragraph
                      </button>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">List Items (Optional)</label>
                      <input
                        type="text"
                        placeholder="Add list item and press Enter"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            if (e.target.value.trim()) {
                              setNewSection({ ...newSection, listItems: [...newSection.listItems, e.target.value.trim()] });
                              e.target.value = '';
                            }
                          }
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      {newSection.listItems?.length > 0 && (
                        <div className="mt-2 space-y-1">
                          {newSection.listItems.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm bg-gray-50 px-2 py-1 rounded">
                              <span className="flex-1">{item}</span>
                              <button
                                type="button"
                                onClick={() => {
                                  setNewSection({ ...newSection, listItems: newSection.listItems.filter((_, i) => i !== idx) });
                                }}
                                className="text-red-600 hover:bg-red-50 rounded p-1"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Media (Images/Videos)</label>
                      <div className="space-y-2 mb-2">
                        <select
                          value={currentMedia.type}
                          onChange={(e) => setCurrentMedia({ ...currentMedia, type: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="image">Image</option>
                          <option value="video">Video</option>
                        </select>
                        <input
                          type="url"
                          placeholder="Media URL"
                          value={currentMedia.url}
                          onChange={(e) => setCurrentMedia({ ...currentMedia, url: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <input
                          type="text"
                          placeholder="Caption (optional)"
                          value={currentMedia.caption}
                          onChange={(e) => setCurrentMedia({ ...currentMedia, caption: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <button
                          type="button"
                          onClick={addMediaToSection}
                          className="text-sm px-3 py-1.5 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded"
                        >
                          + Add Media
                        </button>
                      </div>
                      {newSection.media.length > 0 && (
                        <div className="space-y-2">
                          {newSection.media.map((media, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm bg-gray-50 px-2 py-1 rounded">
                              <span className="flex-1">
                                {media.type === 'image' ? '🖼️' : '🎥'} {media.url.substring(0, 50)}...
                                {media.caption && ` - ${media.caption} `}
                              </span>
                              <button
                                type="button"
                                onClick={() => removeMediaFromSection(idx)}
                                className="text-red-600 hover:bg-red-50 rounded p-1"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={editingSectionIndex !== null ? updateSection : addSection}
                      className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      {editingSectionIndex !== null ? 'Update Section' : 'Add Section'}
                    </button>
                    {editingSectionIndex !== null && (
                      <button
                        type="button"
                        onClick={() => {
                          setNewSection({ id: '', title: '', content: [''], listItems: [], media: [] });
                          setEditingSectionIndex(null);
                        }}
                        className="px-4 py-2 bg-red-100 text-red-700 hover:bg-red-200 rounded-lg transition-colors"
                      >
                        Cancel
                      </button>
                    )}
                  </div>

                  {/* Sections List */}
                  <div className="space-y-3">
                    {formData.sections.map((section, index) => (
                      <div key={section.id || index} className="bg-white p-4 rounded-lg border border-gray-200">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="font-medium text-gray-900 mb-2">{section.title}</div>
                            {section.content && section.content.length > 0 && (
                              <div className="text-sm text-gray-600 mb-2">
                                {section.content.length} paragraph(s)
                              </div>
                            )}
                            {section.listItems && section.listItems.length > 0 && (
                              <div className="text-sm text-gray-600 mb-2">
                                {section.listItems.length} list item(s)
                              </div>
                            )}
                            {section.media && section.media.length > 0 && (
                              <div className="text-sm text-gray-600">
                                {section.media.length} media item(s)
                              </div>
                            )}
                          </div>
                          <div className="flex gap-1 ml-2">
                            <button
                              type="button"
                              onClick={() => editSection(index)}
                              className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                              title="Edit"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => removeSection(index)}
                              className="p-1 text-red-600 hover:bg-red-50 rounded"
                              title="Delete"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Blog Generator */}
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-100 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <FileText className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">AI Blog Generator</h3>
                        <p className="text-sm text-gray-600">Automate content creation for this event</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.blogConfiguration?.enabled || false}
                        onChange={(e) => setFormData({
                          ...formData,
                          blogConfiguration: {
                            ...formData.blogConfiguration,
                            enabled: e.target.checked
                          }
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                  </div>

                  {formData.blogConfiguration?.enabled && (
                    <div className="space-y-4 animate-fadeIn">
                      <div className="space-y-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">Schedule 5 Pillar Blogs</p>
                        <div className="grid grid-cols-1 gap-3">
                          {formData.blogConfiguration.scheduledBlogs.map((blog, idx) => {
                            const labels = {
                              guide: '1. Ultimate Exhibitor Guide',
                              fabricator: '2. Best Stall Design Company',
                              trends: '3. Stall Design Ideas & Trends',
                              checklist: '4. Complete Stall Checklist',
                              roi: '5. ROI & Mistake Avoidance'
                            };
                            return (
                              <div key={idx} className="flex flex-col md:flex-row md:items-center justify-between p-3 bg-white border border-gray-200 rounded-lg gap-3">
                                <div className="flex-1">
                                  <div className="text-sm font-semibold text-gray-800">{labels[blog.category]}</div>
                                  <div className="text-xs text-gray-500 capitalize">{blog.isGenerated ? 'Generated' : 'Scheduled'}</div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <input
                                    type="date"
                                    value={blog.publishDate}
                                    disabled={blog.isGenerated}
                                    onChange={(e) => {
                                      const updated = [...formData.blogConfiguration.scheduledBlogs];
                                      updated[idx].publishDate = e.target.value;
                                      setFormData({
                                        ...formData,
                                        blogConfiguration: {
                                          ...formData.blogConfiguration,
                                          scheduledBlogs: updated
                                        }
                                      });
                                    }}
                                    className={`px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 outline-none ${blog.isGenerated ? 'bg-gray-50 opacity-70' : ''}`}
                                  />
                                  {blog.isGenerated && (
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Focus Keywords & Topics
                          <span className="ml-1 text-xs text-gray-500 font-normal">(e.g., "stall design", "custom booth", "best exhibition agency")</span>
                        </label>
                        <textarea
                          rows={3}
                          placeholder="Enter keywords or specific topics to focus on..."
                          value={formData.blogConfiguration.keywords?.join(', ')}
                          onChange={(e) => setFormData({
                            ...formData,
                            blogConfiguration: {
                              ...formData.blogConfiguration,
                              keywords: e.target.value.split(',').map(k => k.trim())
                            }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        />
                      </div>
                    </div>
                  )}
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