// AdminServicesDashboard.jsx

import React, { useState, useEffect } from 'react';
import adminAxios from '../utils/axios';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Search, 
  Filter, 
  ChevronDown, 
  ChevronUp,
  CheckCircle,
  XCircle,
  Layers,
  Globe,
  Smartphone,
  TrendingUp,
  Calendar,
  Download,
  Upload,
  RefreshCw,
  AlertCircle,
  Save,
  X,
  Image as ImageIcon,
  Link,
  Type,
  DollarSign,
  Package,
  Video,
  List,
  Grid,
  Columns,
  FileText,
  Briefcase,
  Code,
  BarChart3,
  Rocket,
  ShieldCheck,
  MonitorSmartphone,
  Server,
  Cpu,
  Palette,
  Target,
  Users
} from 'lucide-react';

// Use environment variable or default process.env.NEXT_PUBLIC_API_URL || 
const API_URL = 'https://brandbase.onrender.com/api';

const AdminServicesDashboard = () => {
  // States
  const [services, setServices] = useState([]); // Changed from object to array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedService, setExpandedService] = useState(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [formData, setFormData] = useState(getInitialFormData());
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState([]);
  const [bulkJson, setBulkJson] = useState('');
  const [activeTab, setActiveTab] = useState('basic');
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
  const [newCategoryInput, setNewCategoryInput] = useState('');

  // Tabs for the form
  const formTabs = [
    { id: 'basic', label: 'Basic Info', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'hero', label: 'Hero Section', icon: <Target className="w-4 h-4" /> },
    { id: 'animate', label: 'Animate Images', icon: <ImageIcon className="w-4 h-4" /> },
    { id: 'comparison', label: 'Comparison Table', icon: <Columns className="w-4 h-4" /> },
    { id: 'features', label: 'Features', icon: <Grid className="w-4 h-4" /> },
    { id: 'packages', label: 'Packages', icon: <Package className="w-4 h-4" /> },
    { id: 'video', label: 'Video Section', icon: <Video className="w-4 h-4" /> },
  ];

  // Get initial form data - COMPLETE STRUCTURE
  function getInitialFormData() {
    return {
      category: '',
      slug: '',
      published: true,
      order: 0,
      data: {
        hero: {
          headline: '',
          subHeadline: '',
          ctaText: 'Get Started',
          trustNote1: 'Fast delivery',
          trustNote2: 'Trusted by clients',
          features: [
            { name: 'Custom Development', icon: 'Code' },
            { name: 'SEO Optimized', icon: 'Globe' },
            { name: 'Mobile Friendly', icon: 'MonitorSmartphone' }
          ]
        },
        animateImage: {
          header: {
            title: 'Designed to Convert,',
            highlight: 'Built to Perform'
          },
          cards: [
            { id: 1, image: 'https://placehold.co/600x400/3b82f6/ffffff?text=Design+1' },
            { id: 2, image: 'https://placehold.co/600x400/8b5cf6/ffffff?text=Design+2' },
            { id: 3, image: 'https://placehold.co/600x400/10b981/ffffff?text=Design+3' }
          ]
        },
        comparison: {
          heading: 'Static vs WordPress vs Dynamic',
          subheading: 'Compare the three approaches to find what\'s right for your project',
          columns: ['Feature', 'Static', 'WordPress', 'Dynamic'],
          rows: [
            { feature: 'Speed', values: ['Ultra-fast', 'Moderate', 'Fast'] },
            { feature: 'SEO', values: ['Excellent', 'Good', 'Excellent'] },
            { feature: 'Customization', values: ['High', 'Limited', 'Very High'] }
          ]
        },
        features: [
          {
            id: 1,
            title: 'Custom Websites Built for Your Business',
            description: 'At Brandbase Capsule, every website is crafted from scratch to match your brand identity and business goals.',
            image: 'https://placehold.co/800x600/3b82f6/ffffff?text=Feature+1',
            imagePosition: 'right'
          },
          {
            id: 2,
            title: 'SEO & Performance Optimized',
            description: 'We build websites that rank higher and load faster, giving you a competitive edge in search results.',
            image: 'https://placehold.co/800x600/8b5cf6/ffffff?text=Feature+2',
            imagePosition: 'left'
          }
        ],
        packages: {
          header: {
            titleLine1: 'Smart Web Solutions for',
            highlighted: 'every business',
            subtitle: 'Static or dynamic — we build SEO & AEO-optimized websites...'
          },
          packages: {
            essential: {
              id: 'essential',
              title: 'Static Website Essentials',
              price: '₹4,999',
              icon: 'layers',
              image: 'https://placehold.co/600x400/3b82f6/ffffff?text=Essential',
              features: [
                'Fast-loading, SEO-friendly static pages',
                'Mobile-responsive design',
                'Basic contact form',
                'Social media integration',
                'Free 1-month support'
              ]
            },
            signature: {
              id: 'signature',
              title: 'Dynamic Website Pro',
              price: '₹14,999',
              icon: 'server',
              image: 'https://placehold.co/600x400/8b5cf6/ffffff?text=Signature',
              features: [
                'Admin dashboard for easy updates',
                'Blog/news section',
                'Advanced contact forms',
                'Database integration',
                '6 months support'
              ]
            },
            royal: {
              id: 'royal',
              title: 'Dynamic + Automation Suite',
              price: '₹29,999',
              icon: 'cpu',
              image: 'https://placehold.co/600x400/10b981/ffffff?text=Royal',
              features: [
                'Full dynamic system with custom CMS',
                'User authentication system',
                'E-commerce capabilities',
                'Automated email system',
                '1-year premium support'
              ]
            }
          }
        },
        videoMaker: {
          heading: 'More Than Just a Website Service',
          imageUrl: 'https://placehold.co/1200x800/3b82f6/ffffff?text=Video+Section',
          paragraphs: [
            'At Brandbase Capsule, we don\'t just "make websites" — we create fast, modern, and conversion-focused digital experiences that help your business grow online.',
            'From static brochure sites to complex dynamic platforms, we build solutions that work for your specific needs and goals.'
          ]
        }
      }
    };
  }

  // Fetch services
  const fetchServices = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await adminAxios.get('/api/services');
      
      // Backend returns { success: true, data: [...] }
      setServices(response.data.data || []);
      
      // Extract unique categories from services
      const uniqueCategories = [...new Set((response.data.data || []).map(service => service.category))];
      setCategories(uniqueCategories);
      
      setSuccess('Services loaded successfully');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Error fetching services:', err);
      setError(err.response?.data?.error || 'Failed to load services. Make sure backend is running on port 5000.');
      // Fallback to empty array
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories from backend
  const fetchCategoriesFromAPI = async () => {
    try {
      const response = await adminAxios.get('/api/services/categories');
      setCategories(response.data.data || []);
    } catch (err) {
      console.error('Error fetching categories:', err);
      // Extract from existing services if API fails
      const uniqueCategories = [...new Set(services.map(service => service.category))];
      setCategories(uniqueCategories);
    }
  };

  useEffect(() => {
    fetchServices();
    // Don't fetch categories here - will be done after services are loaded
  }, []);

  // Filter services
  const filteredServices = () => {
    return services.filter(service => {
      // Filter by category
      if (selectedCategory !== 'all' && service.category !== selectedCategory) {
        return false;
      }
      
      // Filter by search term
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return (
          service.category?.toLowerCase().includes(searchLower) ||
          service.slug?.toLowerCase().includes(searchLower) ||
          service.data?.hero?.headline?.toLowerCase().includes(searchLower) ||
          service.data?.hero?.subHeadline?.toLowerCase().includes(searchLower)
        );
      }
      
      return true;
    });
  };

  // Group services by category for display
  const groupedServices = () => {
    const filtered = filteredServices();
    const grouped = {};
    
    filtered.forEach(service => {
      if (!grouped[service.category]) {
        grouped[service.category] = [];
      }
      grouped[service.category].push(service);
    });
    
    return grouped;
  };

  // Get category icon
  const getCategoryIcon = (category) => {
    switch(category.toLowerCase()) {
      case 'website-development': return <Globe className="w-5 h-5" />;
      case 'mobile-app-development': return <Smartphone className="w-5 h-5" />;
      case 'digital-marketing': return <TrendingUp className="w-5 h-5" />;
      case 'events-exhibition': return <Calendar className="w-5 h-5" />;
      default: return <Layers className="w-5 h-5" />;
    }
  };

  // Deep clone helper
  const deepClone = (obj) => {
    return JSON.parse(JSON.stringify(obj));
  };

  // Handle form input changes
  const handleInputChange = (path, value) => {
    const keys = path.split('.');
    setFormData(prev => {
      const newData = deepClone(prev);
      let current = newData;
      
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
      return newData;
    });
  };

  // Handle array item changes
  const handleArrayChange = (arrayPath, index, fieldPath, value) => {
    const keys = arrayPath.split('.');
    setFormData(prev => {
      const newData = deepClone(prev);
      let current = newData;
      
      // Navigate to the array
      for (let i = 0; i < keys.length; i++) {
        current = current[keys[i]];
      }
      
      // Handle nested field path
      if (fieldPath) {
        const fieldKeys = fieldPath.split('.');
        let target = current[index];
        
        for (let i = 0; i < fieldKeys.length - 1; i++) {
          if (!target[fieldKeys[i]]) target[fieldKeys[i]] = {};
          target = target[fieldKeys[i]];
        }
        
        if (fieldKeys.length > 0) {
          target[fieldKeys[fieldKeys.length - 1]] = value;
        }
      } else {
        // Direct array value (for simple arrays like paragraphs)
        current[index] = value;
      }
      
      return newData;
    });
  };

  // Add item to array
  const addArrayItem = (arrayPath, newItem) => {
    const keys = arrayPath.split('.');
    setFormData(prev => {
      const newData = deepClone(prev);
      let current = newData;
      
      for (let i = 0; i < keys.length; i++) {
        current = current[keys[i]];
      }
      
      current.push(newItem);
      return newData;
    });
  };

  // Remove item from array
  const removeArrayItem = (arrayPath, index) => {
    const keys = arrayPath.split('.');
    setFormData(prev => {
      const newData = deepClone(prev);
      let current = newData;
      
      for (let i = 0; i < keys.length; i++) {
        current = current[keys[i]];
      }
      
      current.splice(index, 1);
      return newData;
    });
  };

  // Add feature to package
  const addPackageFeature = (packageKey) => {
    setFormData(prev => {
      const newData = deepClone(prev);
      const features = newData.data.packages.packages[packageKey].features;
      features.push('');
      return newData;
    });
  };

  // Remove feature from package
  const removePackageFeature = (packageKey, index) => {
    setFormData(prev => {
      const newData = deepClone(prev);
      const features = newData.data.packages.packages[packageKey].features;
      features.splice(index, 1);
      return newData;
    });
  };

  // Handle package feature change
  const handlePackageFeatureChange = (packageKey, index, value) => {
    setFormData(prev => {
      const newData = deepClone(prev);
      newData.data.packages.packages[packageKey].features[index] = value;
      return newData;
    });
  };

  // Validate form
  const validateForm = () => {
    const errors = {};
    
    if (!formData.category) errors.category = 'Category is required';
    if (!formData.slug) errors.slug = 'Slug is required';
    if (!formData.data?.hero?.headline) errors.headline = 'Headline is required';
    if (!formData.data?.hero?.subHeadline) errors.subHeadline = 'Sub-headline is required';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setError('Please fix the errors in the form');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Prepare data for backend - ensure packages is a Map-like structure
      const dataToSend = deepClone(formData);
      
      // Convert packages to Map structure expected by backend
      if (dataToSend.data?.packages?.packages) {
        const packagesObj = dataToSend.data.packages.packages;
        // Backend expects Map-like structure
        dataToSend.data.packages.packages = packagesObj;
      }
      
      if (selectedService) {
        // Update existing service
        await adminAxios.put('/api/services/${selectedService._id}', dataToSend);
        setSuccess('Service updated successfully!');
      } else {
        // Create new service
        await adminAxios.post('/api/services', dataToSend);
        setSuccess('Service created successfully!');
      }
      
      // Refresh services
      await fetchServices();
      
      // Reset form and close modal
      setFormData(getInitialFormData());
      setSelectedService(null);
      setIsFormModalOpen(false);
      setActiveTab('basic');
      setShowNewCategoryInput(false);
      setNewCategoryInput('');
      
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Error saving service:', err.response?.data || err);
      setError(err.response?.data?.error || err.response?.data?.message || 'Failed to save service');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle edit service
  const handleEdit = (service) => {
    console.log('Editing service:', service);
    
    // Start with the service data
    const serviceData = deepClone(service);
    
    // Ensure all fields exist with defaults
    const mergedFormData = {
      ...getInitialFormData(),
      ...serviceData,
      data: {
        ...getInitialFormData().data,
        ...serviceData.data,
        hero: {
          ...getInitialFormData().data.hero,
          ...serviceData.data?.hero,
          features: serviceData.data?.hero?.features || getInitialFormData().data.hero.features
        },
        animateImage: {
          ...getInitialFormData().data.animateImage,
          ...serviceData.data?.animateImage,
          cards: serviceData.data?.animateImage?.cards || getInitialFormData().data.animateImage.cards
        },
        comparison: {
          ...getInitialFormData().data.comparison,
          ...serviceData.data?.comparison,
          columns: serviceData.data?.comparison?.columns || getInitialFormData().data.comparison.columns,
          rows: serviceData.data?.comparison?.rows || getInitialFormData().data.comparison.rows
        },
        features: serviceData.data?.features || getInitialFormData().data.features,
        packages: {
          ...getInitialFormData().data.packages,
          ...serviceData.data?.packages,
          packages: {
            ...getInitialFormData().data.packages.packages,
            ...serviceData.data?.packages?.packages
          }
        },
        videoMaker: {
          ...getInitialFormData().data.videoMaker,
          ...serviceData.data?.videoMaker,
          paragraphs: serviceData.data?.videoMaker?.paragraphs || getInitialFormData().data.videoMaker.paragraphs
        }
      }
    };
    
    setSelectedService(service);
    setFormData(mergedFormData);
    setIsFormModalOpen(true);
    setActiveTab('basic');
    setShowNewCategoryInput(false);
    setNewCategoryInput('');
  };

  // Handle delete
  const handleDelete = async () => {
    if (!selectedService) return;
    
    try {
      await adminAxios.delete(`/api/services/${selectedService._id}`);
      setSuccess('Service deleted successfully!');
      
      // Refresh services
      await fetchServices();
      
      // Close modal
      setIsDeleteModalOpen(false);
      setSelectedService(null);
      
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete service');
      console.error('Error deleting service:', err);
    }
  };

  // Handle bulk import
  const handleBulkImport = async () => {
    try {
      const data = JSON.parse(bulkJson);
      await adminAxios.post('/api/services/bulk', data);
      setSuccess('Services imported successfully!');
      setIsImportModalOpen(false);
      setBulkJson('');
      await fetchServices();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid JSON format or server error');
      console.error('Error importing services:', err);
    }
  };

  // Export services as JSON
  const handleExport = () => {
    const exportData = services;
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `services-export-${new Date().toISOString().split('T')[0]}.json`;
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    document.body.appendChild(linkElement);
    linkElement.click();
    document.body.removeChild(linkElement);
  };

  // Reset form
  const resetForm = () => {
    setFormData(getInitialFormData());
    setSelectedService(null);
    setFormErrors({});
    setActiveTab('basic');
    setShowNewCategoryInput(false);
    setNewCategoryInput('');
  };

  // Handle category selection
  const handleCategoryChange = (e) => {
    const value = e.target.value;
    if (value === 'new') {
      setShowNewCategoryInput(true);
      setNewCategoryInput('');
      handleInputChange('category', '');
    } else {
      setShowNewCategoryInput(false);
      setNewCategoryInput('');
      handleInputChange('category', value);
    }
  };

  // Handle new category input
  const handleNewCategoryInputChange = (e) => {
    const value = e.target.value.toLowerCase().replace(/\s+/g, '-');
    setNewCategoryInput(e.target.value);
    handleInputChange('category', value);
  };

  // Add new category to the list
  const handleAddNewCategory = () => {
    if (newCategoryInput.trim()) {
      const formattedCategory = newCategoryInput.toLowerCase().replace(/\s+/g, '-');
      if (!categories.includes(formattedCategory)) {
        setCategories([...categories, formattedCategory]);
      }
      handleInputChange('category', formattedCategory);
      setShowNewCategoryInput(false);
    }
  };

  // Get total services count
  const getTotalServices = () => {
    return services.length;
  };

  // Get published services count
  const getPublishedCount = () => {
    return services.filter(s => s.published).length;
  };

  // Get draft services count
  const getDraftCount = () => {
    return services.filter(s => !s.published).length;
  };

  // Render loading state
  if (loading && services.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading services...</p>
          <p className="text-sm text-gray-500 mt-2">
            Make sure backend is running at {API_URL}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Services Management</h1>
            <p className="text-gray-600 mt-2">
              Manage all your services from one dashboard. Create, edit, delete, and organize services.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3 mt-4 md:mt-0">
            <button
              onClick={() => {
                resetForm();
                setIsFormModalOpen(true);
              }}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5 mr-2" />
              New Service
            </button>
            
            <button
              onClick={handleExport}
              className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download className="w-5 h-5 mr-2" />
              Export JSON
            </button>
            
            <button
              onClick={() => setIsImportModalOpen(true)}
              className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Upload className="w-5 h-5 mr-2" />
              Import JSON
            </button>
            
            <button
              onClick={fetchServices}
              className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Refresh
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Services</p>
                <p className="text-3xl font-bold mt-2">{getTotalServices()}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Layers className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Categories</p>
                <p className="text-3xl font-bold mt-2">{categories.length}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <Filter className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Published</p>
                <p className="text-3xl font-bold mt-2">{getPublishedCount()}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Draft</p>
                <p className="text-3xl font-bold mt-2">{getDraftCount()}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-lg">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 bg-white rounded-xl shadow p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search services by name, slug, or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <Filter className="w-5 h-5 text-gray-400 mr-2" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[180px]"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Alerts */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center">
          <AlertCircle className="w-5 h-5 mr-2" />
          {error}
          <button onClick={() => setError('')} className="ml-auto">
            <X className="w-5 h-5" />
          </button>
        </div>
      )}
      
      {success && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center">
          <CheckCircle className="w-5 h-5 mr-2"/>
          {success}
          <button onClick={() => setSuccess('')} className="ml-auto">
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Services List */}
      <div className="space-y-6">
        {Object.keys(groupedServices()).length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {services.length === 0 ? 'No services found' : 'No matching services'}
              </h3>
              <p className="text-gray-600 mb-6">
                {services.length === 0 
                  ? 'Start by creating your first service'
                  : searchTerm || selectedCategory !== 'all' 
                    ? 'Try adjusting your search or filter criteria'
                    : 'All services are hidden by filters'}
              </p>
              <button
                onClick={() => {
                  resetForm();
                  setIsFormModalOpen(true);
                }}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create First Service
              </button>
            </div>
          </div>
        ) : (
          Object.entries(groupedServices()).map(([category, categoryServices]) => (
            <div key={category} className="bg-white rounded-xl shadow overflow-hidden">
              {/* Category Header */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-3 p-2 bg-white rounded-lg shadow-sm">
                      {getCategoryIcon(category)}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">
                        {category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </h2>
                      <p className="text-sm text-gray-600">
                        {categoryServices.length} service{categoryServices.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm">
                    {category}
                  </span>
                </div>
              </div>

              {/* Services in Category */}
              <div className="divide-y">
                {categoryServices.map((service, index) => (
                  <div key={service._id || index} className="px-6 py-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 mt-1">
                            <div className={`w-3 h-3 rounded-full ${service.published ? 'bg-green-500' : 'bg-gray-400'}`} />
                          </div>
                          <div className="ml-4 flex-1">
                            <div className="flex items-center gap-3">
                              <h3 className="text-lg font-semibold text-gray-900">
                                {service.data?.hero?.headline || 'Untitled Service'}
                              </h3>
                              <div className="flex gap-2">
                                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                                  Order: {service.order || 0}
                                </span>
                                <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded">
                                  {service.slug}
                                </span>
                              </div>
                            </div>
                            <p className="text-gray-600 mt-1 line-clamp-2">
                              {service.data?.hero?.subHeadline || 'No description'}
                            </p>
                            <div className="flex items-center gap-4 mt-3">
                              <span className="text-sm text-gray-500">
                                Created: {service.createdAt ? new Date(service.createdAt).toLocaleDateString() : 'N/A'}
                              </span>
                              <span className="text-sm text-gray-500">
                                ID: {service._id?.substring(0, 8) || 'N/A'}...
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 ml-4">
                        <button
                          onClick={() => window.open(`/services/${service.category}/${service.slug}`, '_blank')}
                          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Live"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleEdit(service)}
                          className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedService(service);
                            setIsDeleteModalOpen(true);
                          }}
                          className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => setExpandedService(expandedService === service._id ? null : service._id)}
                          className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          {expandedService === service._id ? (
                            <ChevronUp className="w-5 h-5" />
                          ) : (
                            <ChevronDown className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Expanded View */}
                    {expandedService === service._id && (
                      <div className="mt-4 ml-9 pl-4 border-l-2 border-blue-200">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-medium text-gray-900 mb-2">Hero Features</h4>
                            <ul className="space-y-1">
                              {(service.data?.hero?.features || []).slice(0, 3).map((feature, idx) => (
                                <li key={idx} className="text-sm text-gray-600 flex items-center">
                                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2" />
                                  {feature.name || `Feature ${idx + 1}`}
                                </li>
                              ))}
                              {(service.data?.hero?.features || []).length === 0 && (
                                <li className="text-sm text-gray-500 italic">No features defined</li>
                              )}
                            </ul>
                          </div>
                          
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-medium text-gray-900 mb-2">Packages</h4>
                            <div className="space-y-2">
                              {service.data?.packages?.packages && typeof service.data.packages.packages === 'object' 
                                ? Object.values(service.data.packages.packages).map(pkg => (
                                    <div key={pkg.id} className="flex items-center justify-between">
                                      <span className="text-sm text-gray-600">{pkg.title || pkg.id}</span>
                                      <span className="text-sm font-medium text-blue-600">{pkg.price || 'N/A'}</span>
                                    </div>
                                  ))
                                : <p className="text-sm text-gray-500 italic">No packages defined</p>
                              }
                            </div>
                          </div>
                          
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-medium text-gray-900 mb-2">Quick Actions</h4>
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleEdit(service)}
                                className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => window.open(`/services/${service.category}/${service.slug}`, '_blank')}
                                className="flex-1 px-3 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                              >
                                View Live
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Create/Edit Service Modal */}
      {isFormModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">
                    {selectedService ? 'Edit Service' : 'Create New Service'}
                  </h2>
                  <p className="text-blue-100 mt-1">
                    {selectedService 
                      ? `Editing: ${selectedService.data?.hero?.headline || 'Service'}` 
                      : 'Fill in all the details to create a new service'}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsFormModalOpen(false);
                    resetForm();
                  }}
                  className="p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Form Tabs */}
              <div className="flex overflow-x-auto mt-4">
                {formTabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center px-4 py-2 mr-2 rounded-lg transition-colors ${
                      activeTab === tab.id 
                        ? 'bg-white text-blue-600' 
                        : 'text-blue-100 hover:bg-white hover:bg-opacity-20'
                    }`}
                  >
                    {tab.icon}
                    <span className="ml-2 whitespace-nowrap">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Form Content */}
            <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[70vh] p-6">
              {/* Tab 1: Basic Information */}
              {activeTab === 'basic' && (
                <div className="space-y-6">
                  <div className="flex items-center mb-4">
                    <div className="w-1 h-8 bg-blue-600 rounded-full mr-3" />
                    <h3 className="text-lg font-bold text-gray-900">Basic Information</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category *
                      </label>
                      <select
                        value={formData.category === '' && showNewCategoryInput ? 'new' : formData.category}
                        onChange={handleCategoryChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          formErrors.category ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Select a category</option>
                        {categories.map(category => (
                          <option key={category} value={category}>
                            {category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </option>
                        ))}
                        <option value="new">+ Create New Category</option>
                      </select>
                      {formErrors.category && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.category}</p>
                      )}
                      <p className="mt-1 text-sm text-gray-500">
                        Group services by category (e.g., website-development)
                      </p>
                      
                      {/* New Category Input */}
                      {showNewCategoryInput && (
                        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <div className="flex items-center justify-between mb-2">
                            <label className="block text-sm font-medium text-gray-700">
                              Enter New Category Name
                            </label>
                            <button
                              type="button"
                              onClick={() => {
                                setShowNewCategoryInput(false);
                                setNewCategoryInput('');
                                handleInputChange('category', '');
                              }}
                              className="text-sm text-gray-500 hover:text-gray-700"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={newCategoryInput}
                              onChange={handleNewCategoryInputChange}
                              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="e.g., Ecommerce Development"
                              autoFocus
                            />
                            <button
                              type="button"
                              onClick={handleAddNewCategory}
                              disabled={!newCategoryInput.trim()}
                              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              Add
                            </button>
                          </div>
                          <p className="mt-2 text-sm text-gray-600">
                            Category will be converted to lowercase with hyphens (e.g., "Ecommerce Development" → "ecommerce-development")
                          </p>
                          {newCategoryInput && (
                            <p className="mt-1 text-sm text-blue-600">
                              URL: /services/{newCategoryInput.toLowerCase().replace(/\s+/g, '-')}/[slug]
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Slug (URL) *
                      </label>
                      <input
                        type="text"
                        value={formData.slug}
                        onChange={(e) => handleInputChange('slug', e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          formErrors.slug ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="e.g., dynamic-static"
                      />
                      {formErrors.slug && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.slug}</p>
                      )}
                      <p className="mt-1 text-sm text-gray-500">
                        URL: /services/{formData.category || 'category'}/{formData.slug || 'slug'}
                      </p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Display Order
                      </label>
                      <input
                        type="number"
                        value={formData.order}
                        onChange={(e) => handleInputChange('order', parseInt(e.target.value) || 0)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <p className="mt-1 text-sm text-gray-500">
                        Lower numbers appear first within category
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="published"
                          checked={formData.published}
                          onChange={(e) => handleInputChange('published', e.target.checked)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label htmlFor="published" className="ml-2 block text-sm text-gray-900">
                          Published
                        </label>
                      </div>
                      <p className="text-sm text-gray-500">
                        Unpublished services won't be visible publicly
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Hero Section */}
              {activeTab === 'hero' && (
                <div className="space-y-6">
                  <div className="flex items-center mb-4">
                    <div className="w-1 h-8 bg-green-600 rounded-full mr-3" />
                    <h3 className="text-lg font-bold text-gray-900">Hero Section</h3>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Headline *
                      </label>
                      <input
                        type="text"
                        value={formData.data?.hero?.headline || ''}
                        onChange={(e) => handleInputChange('data.hero.headline', e.target.value)}
                        className={`w-full px-4 py-3 text-lg border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          formErrors.headline ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Build Stunning Static & Dynamic Websites"
                      />
                      {formErrors.headline && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.headline}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Sub-headline *
                      </label>
                      <textarea
                        value={formData.data?.hero?.subHeadline || ''}
                        onChange={(e) => handleInputChange('data.hero.subHeadline', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          formErrors.subHeadline ? 'border-red-500' : 'border-gray-300'
                        }`}
                        rows="3"
                        placeholder="High-performance custom websites built for speed, SEO, conversions, and business growth."
                      />
                      {formErrors.subHeadline && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.subHeadline}</p>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          CTA Button Text
                        </label>
                        <input
                          type="text"
                          value={formData.data?.hero?.ctaText || ''}
                          onChange={(e) => handleInputChange('data.hero.ctaText', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Get Your Website Now"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Trust Note 1
                          </label>
                          <input
                            type="text"
                            value={formData.data?.hero?.trustNote1 || ''}
                            onChange={(e) => handleInputChange('data.hero.trustNote1', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Fast delivery"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Trust Note 2
                          </label>
                          <input
                            type="text"
                            value={formData.data?.hero?.trustNote2 || ''}
                            onChange={(e) => handleInputChange('data.hero.trustNote2', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Trusted by clients"
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Hero Features */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                          Hero Features (7 features recommended)
                        </label>
                        <button
                          type="button"
                          onClick={() => addArrayItem('data.hero.features', { name: '', icon: 'Code' })}
                          className="text-sm text-blue-600 hover:text-blue-800"
                        >
                          + Add Feature
                        </button>
                      </div>
                      <div className="space-y-3">
                        {(formData.data?.hero?.features || []).map((feature, index) => (
                          <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                            <div className="flex-1">
                              <label className="block text-xs text-gray-500 mb-1">Feature Name</label>
                              <input
                                type="text"
                                value={feature.name || ''}
                                onChange={(e) => handleArrayChange('data.hero.features', index, 'name', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Custom Web Development"
                              />
                            </div>
                            <div className="w-40">
                              <label className="block text-xs text-gray-500 mb-1">Icon Name</label>
                              <input
                                type="text"
                                value={feature.icon || ''}
                                onChange={(e) => handleArrayChange('data.hero.features', index, 'icon', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Code, Globe, etc."
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => removeArrayItem('data.hero.features', index)}
                              className="p-2 text-gray-400 hover:text-red-600 mt-6"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        ))}
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        Icons should be from Lucide React library names (e.g., Code, Globe, MonitorSmartphone)
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: Animate Images */}
              {activeTab === 'animate' && (
                <div className="space-y-6">
                  <div className="flex items-center mb-4">
                    <div className="w-1 h-8 bg-purple-600 rounded-full mr-3" />
                    <h3 className="text-lg font-bold text-gray-900">Animate Images Section</h3>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Header Title
                        </label>
                        <input
                          type="text"
                          value={formData.data?.animateImage?.header?.title || ''}
                          onChange={(e) => handleInputChange('data.animateImage.header.title', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Designed to Convert,"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Header Highlight
                        </label>
                        <input
                          type="text"
                          value={formData.data?.animateImage?.header?.highlight || ''}
                          onChange={(e) => handleInputChange('data.animateImage.header.highlight', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Built to Perform"
                        />
                      </div>
                    </div>
                    
                    {/* Image Cards */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                          Image Cards (3 cards required)
                        </label>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {(formData.data?.animateImage?.cards || []).map((card, index) => (
                          <div key={index} className="p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-gray-700">Card {card.id || index + 1}</span>
                            </div>
                            <div className="space-y-3">
                              <div>
                                <label className="block text-xs text-gray-500 mb-1">Image URL</label>
                                <input
                                  type="text"
                                  value={card.image || ''}
                                  onChange={(e) => handleArrayChange('data.animateImage.cards', index, 'image', e.target.value)}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  placeholder="https://example.com/image.jpg"
                                />
                              </div>
                              {card.image && (
                                <div className="mt-2">
                                  <div className="text-xs text-gray-500 mb-1">Preview:</div>
                                  <div className="h-32 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                                    {card.image.startsWith('http') ? (
                                      <img 
                                        src={card.image} 
                                        alt={`Card ${card.id || index + 1}`}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
  e.target.style.display = 'none';
  const sibling = e.target.nextElementSibling;
  if (sibling) {
    sibling.style.display = 'flex';
  }
}}
                                      />
                                    ) : null}
                                    <div className={`${card.image.startsWith('http') ? 'hidden' : 'flex'} items-center justify-center w-full h-full`}>
                                      <ImageIcon className="w-8 h-8 text-gray-400" />
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 4: Comparison Table */}
              {activeTab === 'comparison' && (
                <div className="space-y-6">
                  <div className="flex items-center mb-4">
                    <div className="w-1 h-8 bg-orange-600 rounded-full mr-3" />
                    <h3 className="text-lg font-bold text-gray-900">Comparison Table</h3>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Table Heading
                      </label>
                      <input
                        type="text"
                        value={formData.data?.comparison?.heading || ''}
                        onChange={(e) => handleInputChange('data.comparison.heading', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Static vs WordPress vs Dynamic"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Table Subheading
                      </label>
                      <input
                        type="text"
                        value={formData.data?.comparison?.subheading || ''}
                        onChange={(e) => handleInputChange('data.comparison.subheading', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Compare the three approaches to find what's right for your project"
                      />
                    </div>
                    
                    {/* Columns */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Table Columns
                      </label>
                      <div className="grid grid-cols-4 gap-2">
                        {(formData.data?.comparison?.columns || []).map((column, index) => (
                          <input
                            key={index}
                            type="text"
                            value={column || ''}
                            onChange={(e) => handleArrayChange('data.comparison.columns', index, '', e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            readOnly={index === 0}
                          />
                        ))}
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        First column is "Feature", other columns can be customized
                      </p>
                    </div>
                    
                    {/* Comparison Rows */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                          Comparison Rows
                        </label>
                        <button
                          type="button"
                          onClick={() => addArrayItem('data.comparison.rows', { feature: '', values: ['', '', ''] })}
                          className="text-sm text-blue-600 hover:text-blue-800"
                        >
                          + Add Row
                        </button>
                      </div>
                      <div className="space-y-3">
                        {(formData.data?.comparison?.rows || []).map((row, rowIndex) => (
                          <div key={rowIndex} className="p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-sm font-medium text-gray-700">Row {rowIndex + 1}</span>
                              <button
                                type="button"
                                onClick={() => removeArrayItem('data.comparison.rows', rowIndex)}
                                className="p-1 text-gray-400 hover:text-red-600"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                              <div>
                                <label className="block text-xs text-gray-500 mb-1">Feature</label>
                                <input
                                  type="text"
                                  value={row.feature || ''}
                                  onChange={(e) => handleArrayChange('data.comparison.rows', rowIndex, 'feature', e.target.value)}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  placeholder="Speed"
                                />
                              </div>
                              {(row.values || []).map((value, valueIndex) => (
                                <div key={valueIndex}>
                                  <label className="block text-xs text-gray-500 mb-1">
                                    {(formData.data?.comparison?.columns || [])[valueIndex + 1] || `Column ${valueIndex + 2}`}
                                  </label>
                                  <input
                                    type="text"
                                    value={value || ''}
                                    onChange={(e) => handleArrayChange('data.comparison.rows', rowIndex, `values.${valueIndex}`, e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Ultra-fast (served from CDN)"
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 5: Features */}
              {activeTab === 'features' && (
                <div className="space-y-6">
                  <div className="flex items-center mb-4">
                    <div className="w-1 h-8 bg-pink-600 rounded-full mr-3" />
                    <h3 className="text-lg font-bold text-gray-900">Features Section</h3>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Feature Items (3 items recommended)
                      </label>
                      <button
                        type="button"
                        onClick={() => addArrayItem('data.features', { 
                          id: (formData.data?.features || []).length + 1,
                          title: '',
                          description: '',
                          image: '',
                          imagePosition: 'right'
                        })}
                        className="text-sm text-blue-600 hover:text-blue-800"
                      >
                        + Add Feature Item
                      </button>
                    </div>
                    <div className="space-y-6">
                      {(formData.data?.features || []).map((feature, index) => (
                        <div key={index} className="p-6 bg-gray-50 rounded-lg border">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center">
                              <span className="text-lg font-semibold text-gray-900">Feature {feature.id || index + 1}</span>
                              <div className="ml-4 flex items-center space-x-2">
                                <button
                                  type="button"
                                  onClick={() => handleArrayChange('data.features', index, 'imagePosition', 'left')}
                                  className={`px-3 py-1 text-xs rounded ${feature.imagePosition === 'left' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                                >
                                  Image Left
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleArrayChange('data.features', index, 'imagePosition', 'right')}
                                  className={`px-3 py-1 text-xs rounded ${feature.imagePosition === 'right' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                                >
                                  Image Right
                                </button>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeArrayItem('data.features', index)}
                              className="p-2 text-gray-400 hover:text-red-600"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Title
                                </label>
                                <input
                                  type="text"
                                  value={feature.title || ''}
                                  onChange={(e) => handleArrayChange('data.features', index, 'title', e.target.value)}
                                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  placeholder="Custom Websites Built for Your Business"
                                />
                              </div>
                              
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Description
                                </label>
                                <textarea
                                  value={feature.description || ''}
                                  onChange={(e) => handleArrayChange('data.features', index, 'description', e.target.value)}
                                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  rows="4"
                                  placeholder="At Brandbase Capsule, every website is crafted from scratch..."
                                />
                              </div>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Image URL
                              </label>
                              <input
                                type="text"
                                value={feature.image || ''}
                                onChange={(e) => handleArrayChange('data.features', index, 'image', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="https://cdn-site-assets.veed.io/.../image.png"
                              />
                              {feature.image && (
                                <div className="mt-4">
                                  <div className="text-sm text-gray-500 mb-2">Image Preview:</div>
                                  <div className="h-48 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                                    {feature.image.startsWith('http') ? (
                                      <img 
                                        src={feature.image} 
                                        alt={`Feature ${feature.id || index + 1}`}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
  e.target.style.display = 'none';
  const sibling = e.target.nextElementSibling;
  if (sibling) {
    sibling.style.display = 'flex';
  }
}}
                                      />
                                    ) : null}
                                    <div className={`${feature.image.startsWith('http') ? 'hidden' : 'flex'} items-center justify-center w-full h-full`}>
                                      <ImageIcon className="w-12 h-12 text-gray-400" />
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 6: Packages */}
              {activeTab === 'packages' && (
                <div className="space-y-6">
                  <div className="flex items-center mb-4">
                    <div className="w-1 h-8 bg-teal-600 rounded-full mr-3" />
                    <h3 className="text-lg font-bold text-gray-900">Packages Section</h3>
                  </div>
                  
                  <div className="space-y-8">
                    {/* Packages Header */}
                    <div className="bg-blue-50 p-6 rounded-lg">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Packages Header</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Title Line 1
                          </label>
                          <input
                            type="text"
                            value={formData.data?.packages?.header?.titleLine1 || ''}
                            onChange={(e) => handleInputChange('data.packages.header.titleLine1', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Smart Web Solutions for"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Highlighted Text
                          </label>
                          <input
                            type="text"
                            value={formData.data?.packages?.header?.highlighted || ''}
                            onChange={(e) => handleInputChange('data.packages.header.highlighted', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="every business"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Subtitle
                          </label>
                          <input
                            type="text"
                            value={formData.data?.packages?.header?.subtitle || ''}
                            onChange={(e) => handleInputChange('data.packages.header.subtitle', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Static or dynamic — we build SEO & AEO-optimized websites..."
                          />
                        </div>
                      </div>
                    </div>

                    {/* Essential Package */}
                    <div className="border rounded-lg p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h4 className="text-lg font-semibold text-gray-900">Essential Package</h4>
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded">
                          Basic Plan
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Title
                            </label>
                            <input
                              type="text"
                              value={formData.data?.packages?.packages?.essential?.title || ''}
                              onChange={(e) => handleInputChange('data.packages.packages.essential.title', e.target.value)}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="Static Website Essentials"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Price
                            </label>
                            <input
                              type="text"
                              value={formData.data?.packages?.packages?.essential?.price || ''}
                              onChange={(e) => handleInputChange('data.packages.packages.essential.price', e.target.value)}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="₹4,999"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Icon
                            </label>
                            <input
                              type="text"
                              value={formData.data?.packages?.packages?.essential?.icon || ''}
                              onChange={(e) => handleInputChange('data.packages.packages.essential.icon', e.target.value)}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="layers"
                            />
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Image URL
                            </label>
                            <input
                              type="text"
                              value={formData.data?.packages?.packages?.essential?.image || ''}
                              onChange={(e) => handleInputChange('data.packages.packages.essential.image', e.target.value)}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="https://example.com/image.jpg"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Features
                            </label>
                            <div className="space-y-2">
                              {(formData.data?.packages?.packages?.essential?.features || []).map((feature, index) => (
                                <div key={index} className="flex gap-2">
                                  <input
                                    type="text"
                                    value={feature || ''}
                                    onChange={(e) => handlePackageFeatureChange('essential', index, e.target.value)}
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Fast-loading, SEO-friendly static pages"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => removePackageFeature('essential', index)}
                                    className="p-2 text-gray-400 hover:text-red-600"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              ))}
                              <button
                                type="button"
                                onClick={() => addPackageFeature('essential')}
                                className="text-sm text-blue-600 hover:text-blue-800"
                              >
                                + Add Feature
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Signature Package */}
                    <div className="border rounded-lg p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h4 className="text-lg font-semibold text-gray-900">Signature Package</h4>
                        <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm font-medium rounded">
                          Popular Plan
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Title
                            </label>
                            <input
                              type="text"
                              value={formData.data?.packages?.packages?.signature?.title || ''}
                              onChange={(e) => handleInputChange('data.packages.packages.signature.title', e.target.value)}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="Dynamic Website Pro"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Price
                            </label>
                            <input
                              type="text"
                              value={formData.data?.packages?.packages?.signature?.price || ''}
                              onChange={(e) => handleInputChange('data.packages.packages.signature.price', e.target.value)}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="₹14,999"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Icon
                            </label>
                            <input
                              type="text"
                              value={formData.data?.packages?.packages?.signature?.icon || ''}
                              onChange={(e) => handleInputChange('data.packages.packages.signature.icon', e.target.value)}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="server"
                            />
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Image URL
                            </label>
                            <input
                              type="text"
                              value={formData.data?.packages?.packages?.signature?.image || ''}
                              onChange={(e) => handleInputChange('data.packages.packages.signature.image', e.target.value)}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="https://example.com/image.jpg"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Features
                            </label>
                            <div className="space-y-2">
                              {(formData.data?.packages?.packages?.signature?.features || []).map((feature, index) => (
                                <div key={index} className="flex gap-2">
                                  <input
                                    type="text"
                                    value={feature || ''}
                                    onChange={(e) => handlePackageFeatureChange('signature', index, e.target.value)}
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Admin dashboard for easy updates"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => removePackageFeature('signature', index)}
                                    className="p-2 text-gray-400 hover:text-red-600"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              ))}
                              <button
                                type="button"
                                onClick={() => addPackageFeature('signature')}
                                className="text-sm text-blue-600 hover:text-blue-800"
                              >
                                + Add Feature
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Royal Package */}
                    <div className="border rounded-lg p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h4 className="text-lg font-semibold text-gray-900">Royal Package</h4>
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-medium rounded">
                          Premium Plan
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Title
                            </label>
                            <input
                              type="text"
                              value={formData.data?.packages?.packages?.royal?.title || ''}
                              onChange={(e) => handleInputChange('data.packages.packages.royal.title', e.target.value)}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="Dynamic + Automation Suite"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Price
                            </label>
                            <input
                              type="text"
                              value={formData.data?.packages?.packages?.royal?.price || ''}
                              onChange={(e) => handleInputChange('data.packages.packages.royal.price', e.target.value)}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="₹29,999"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Icon
                            </label>
                            <input
                              type="text"
                              value={formData.data?.packages?.packages?.royal?.icon || ''}
                              onChange={(e) => handleInputChange('data.packages.packages.royal.icon', e.target.value)}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="cpu"
                            />
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Image URL
                            </label>
                            <input
                              type="text"
                              value={formData.data?.packages?.packages?.royal?.image || ''}
                              onChange={(e) => handleInputChange('data.packages.packages.royal.image', e.target.value)}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="https://example.com/image.jpg"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Features
                            </label>
                            <div className="space-y-2">
                              {(formData.data?.packages?.packages?.royal?.features || []).map((feature, index) => (
                                <div key={index} className="flex gap-2">
                                  <input
                                    type="text"
                                    value={feature || ''}
                                    onChange={(e) => handlePackageFeatureChange('royal', index, e.target.value)}
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Full dynamic system with custom CMS"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => removePackageFeature('royal', index)}
                                    className="p-2 text-gray-400 hover:text-red-600"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              ))}
                              <button
                                type="button"
                                onClick={() => addPackageFeature('royal')}
                                className="text-sm text-blue-600 hover:text-blue-800"
                              >
                                + Add Feature
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 7: Video Section */}
              {activeTab === 'video' && (
                <div className="space-y-6">
                  <div className="flex items-center mb-4">
                    <div className="w-1 h-8 bg-red-600 rounded-full mr-3" />
                    <h3 className="text-lg font-bold text-gray-900">Video Section</h3>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Heading
                      </label>
                      <input
                        type="text"
                        value={formData.data?.videoMaker?.heading || ''}
                        onChange={(e) => handleInputChange('data.videoMaker.heading', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="More Than Just a Website Service"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Image URL
                      </label>
                      <input
                        type="text"
                        value={formData.data?.videoMaker?.imageUrl || ''}
                        onChange={(e) => handleInputChange('data.videoMaker.imageUrl', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="https://ik.imagekit.io/username/websiteimage.jpg"
                      />
                      {formData.data?.videoMaker?.imageUrl && (
                        <div className="mt-4">
                          <div className="text-sm text-gray-500 mb-2">Image Preview:</div>
                          <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                            {formData.data.videoMaker.imageUrl.startsWith('http') ? (
                              <img 
                                src={formData.data.videoMaker.imageUrl} 
                                alt="Video maker"
                                className="w-full h-full object-cover"
                                onError={(e) => {
  e.target.style.display = 'none';
  const sibling = e.target.nextElementSibling;
  if (sibling) {
    sibling.style.display = 'flex';
  }
}}
                              />
                            ) : null}
                            <div className={`${formData.data.videoMaker.imageUrl.startsWith('http') ? 'hidden' : 'flex'} items-center justify-center w-full h-full`}>
                              <ImageIcon className="w-12 h-12 text-gray-400" />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                          Paragraphs (2 paragraphs recommended)
                        </label>
                        <button
                          type="button"
                          onClick={() => addArrayItem('data.videoMaker.paragraphs', '')}
                          className="text-sm text-blue-600 hover:text-blue-800"
                        >
                          + Add Paragraph
                        </button>
                      </div>
                      <div className="space-y-4">
                        {(formData.data?.videoMaker?.paragraphs || []).map((paragraph, index) => (
                          <div key={index} className="flex gap-4">
                            <textarea
                              value={paragraph || ''}
                              onChange={(e) => handleArrayChange('data.videoMaker.paragraphs', index, '', e.target.value)}
                              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              rows="3"
                              placeholder="At Brandbase Capsule, we don't just 'make websites' — we create fast, modern, and conversion-focused digital experiences..."
                            />
                            <button
                              type="button"
                              onClick={() => removeArrayItem('data.videoMaker.paragraphs', index)}
                              className="p-2 text-gray-400 hover:text-red-600 h-fit"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Form Actions */}
              <div className="mt-8 pt-6 border-t flex justify-between">
                <div className="flex space-x-4">
                  {activeTab !== 'basic' && (
                    <button
                      type="button"
                      onClick={() => {
                        const currentIndex = formTabs.findIndex(tab => tab.id === activeTab);
                        if (currentIndex > 0) {
                          setActiveTab(formTabs[currentIndex - 1].id);
                        }
                      }}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      ← Previous
                    </button>
                  )}
                  {activeTab !== 'video' && (
                    <button
                      type="button"
                      onClick={() => {
                        const currentIndex = formTabs.findIndex(tab => tab.id === activeTab);
                        if (currentIndex < formTabs.length - 1) {
                          setActiveTab(formTabs[currentIndex + 1].id);
                        }
                      }}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Next →
                    </button>
                  )}
                </div>
                
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsFormModalOpen(false);
                      resetForm();
                    }}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5 mr-2" />
                        {selectedService ? 'Update Service' : 'Create Service'}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-red-100 rounded-lg mr-3">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Delete Service</h3>
              </div>
              
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete <span className="font-semibold">"{selectedService.data?.hero?.headline || 'Untitled Service'}"</span>? This action cannot be undone.
              </p>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <div className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-red-800 font-medium">Important:</p>
                    <p className="text-sm text-red-700 mt-1">
                      This will permanently remove the service from your database.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => {
                    setIsDeleteModalOpen(false);
                    setSelectedService(null);
                  }}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
                >
                  <Trash2 className="w-5 h-5 mr-2" />
                  Delete Permanently
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Import JSON Modal */}
      {isImportModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Import Services</h3>
                  <p className="text-gray-600 mt-1">
                    Paste your JSON data to import multiple services at once
                  </p>
                </div>
                <button
                  onClick={() => setIsImportModalOpen(false)}
                  className="p-2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  JSON Data
                </label>
                <textarea
                  value={bulkJson}
                  onChange={(e) => setBulkJson(e.target.value)}
                  className="w-full h-64 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                  placeholder='[
  {
    "category": "website-development",
    "slug": "dynamic-static",
    "published": true,
    "order": 0,
    "data": {
      "hero": {
        "headline": "Build Stunning Static & Dynamic Websites",
        "subHeadline": "High-performance custom websites built for speed, SEO, conversions, and business growth.",
        "ctaText": "Get Started",
        "trustNote1": "Fast delivery",
        "trustNote2": "Trusted by clients",
        "features": [
          { "name": "Custom Development", "icon": "Code" },
          { "name": "SEO Optimized", "icon": "Globe" }
        ]
      },
      // ... other sections
    }
  }
]'
                />
                <p className="mt-2 text-sm text-gray-500">
                  Make sure the JSON is valid and follows the service schema structure.
                </p>
              </div>
              
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setIsImportModalOpen(false)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBulkImport}
                  disabled={!bulkJson.trim()}
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  <Upload className="w-5 h-5 mr-2" />
                  Import Services
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-12 pt-6 border-t text-center text-gray-500 text-sm">
        <p>BrandBase Admin Dashboard • {getTotalServices()} Services • {categories.length} Categories</p>
        <p className="mt-1">
          Backend API: {API_URL} • Use tabs to navigate through all service sections
        </p>
      </div>
    </div>
  );
};

export default AdminServicesDashboard;