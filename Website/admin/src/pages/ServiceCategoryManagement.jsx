import React, { useState, useEffect } from 'react';
import adminAxios from '../utils/axios';
import {
  Plus, Search, Edit, Trash2, Eye,
  Filter, Upload, Download,
  ChevronLeft, ChevronRight, CheckCircle,
  XCircle, AlertCircle, Loader2, FileText,
  Copy, Check, X, RefreshCw,
  ListOrdered, Tag, Layers,
  ArrowUpDown, Globe, EyeOff,
  BookOpen, BarChart3, Target,
  Users, Shield, Zap, Award, ShoppingCart, Smartphone, Palette, Megaphone,
} from 'lucide-react';

const ServiceCategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'active', 'inactive'
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('create'); // 'create' or 'edit'
  const [currentCategory, setCurrentCategory] = useState(null);
  // Update your formData initial state to include all schema fields
  const [formData, setFormData] = useState({
    category: '',
    hero: {
      title: '',
      subtitle: '',
      highlightedText: [''],
      description: '',
      imgUrl: '',
      cta: {
        primary: '',
        primaryLink: '',
        secondary: '',
        secondaryLink: ''
      }
    },
    visionBanner: {
      heading: '',
      imageUrl: ''
    },
    comparisonTable: {
      category: '',
      brand: {
        logoUrl: '',
        features: ['']
      },
      others: [{
        title: '',
        points: ['']
      }]
    },
    categoryServices: {
      title: '',
      subtitle: '',
      description: '',
      services: [{
        title: '',
        description: '',
        image: '',
        link: ''
      }]
    },
    categoryAdvantages: {
      mainTitle: '',
      sections: {
        overview: {
          id: 'overview',
          title: '',
          heading: '',
          content: [{
            type: 'text',
            value: ''
          }]
        },
        conversionRate: {
          id: 'conversionRate',
          title: '',
          heading: '',
          content: [{
            type: 'text',
            value: ''
          }]
        },
        userExperience: {
          id: 'userExperience',
          title: '',
          heading: '',
          content: [{
            type: 'text',
            value: ''
          }]
        },
        competitiveEdge: {
          id: 'competitiveEdge',
          title: '',
          heading: '',
          content: [{
            type: 'text',
            value: ''
          }]
        },
        searchRankings: {
          id: 'searchRankings',
          title: '',
          heading: '',
          content: [{
            type: 'text',
            value: ''
          }]
        },
        digitalMarketing: {
          id: 'digitalMarketing',
          title: '',
          heading: '',
          content: [{
            type: 'text',
            value: ''
          }]
        }
      }
    },
    whyBuildWithBcpl: {
      title: '',
      subtitle: '',
      reasons: [{
        id: 1,
        reason: ''
      }]
    },
    weCreate: {
      header: {
        titleOrange: '',
        titleBlack: '',
        description: ''
      },
      leftFeatured: {
        image: '',
        title: '',
        subtitle: '',
        tags: [{
          label: '',
          type: 'primary'
        }]
      },
      rightColumnItems: [{
        title: '',
        subtitle: '',
        image: '',
        tags: [{
          label: '',
          type: 'primary'
        }]
      }]
    },
    pageMetadata: {
      title: '',
      description: '',
      keywords: ['']
    },
    ctaData: {
      title: '',
      subheading: '',
      primaryText: '',
      primaryLink: '',
      secondaryText: '',
      secondaryLink: ''
    },
    faqData: [{
      question: '',
      answer: ''
    }],
    isActive: true,
    order: 0
  });

  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [showJsonImport, setShowJsonImport] = useState(false);
  const [jsonText, setJsonText] = useState('');
  const [jsonError, setJsonError] = useState('');
  const [bulkOrderEdit, setBulkOrderEdit] = useState(false);
  const [orderData, setOrderData] = useState([]);
  const [expandedSections, setExpandedSections] = useState({});
  const [previewMode, setPreviewMode] = useState(false);

  const itemsPerPage = 10;

  // Fetch categories
  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await adminAxios.get('/api/service-categories');
      setCategories(response.data.data);

      // Calculate pagination
      const total = response.data.count;
      setTotalPages(Math.ceil(total / itemsPerPage));
    } catch (err) {
      setError('Failed to fetch service categories. Please check your connection.');
      console.error('Error fetching categories:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch category slugs
  const fetchCategorySlugs = async () => {
    try {
      const response = await adminAxios.get('/api/service-categories/slugs');
      return response.data.data;
    } catch (err) {
      console.error('Error fetching slugs:', err);
      return [];
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Filter categories
  const filteredCategories = categories.filter(category => {
    const matchesSearch =
      category.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.hero.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.hero.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.pageMetadata.title.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === 'all' ||
      (filterStatus === 'active' && category.isActive) ||
      (filterStatus === 'inactive' && !category.isActive);

    return matchesSearch && matchesStatus;
  });

  // Paginate categories
  const paginatedCategories = filteredCategories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle form input changes
  const handleInputChange = (e, path = '') => {
    const { name, value, type, checked } = e.target;
    const fullPath = path ? `${path}.${name}` : name;

    setFormData(prev => {
      const updateNestedObject = (obj, path, value) => {
        const keys = path.split('.');
        const lastKey = keys.pop();
        const target = keys.reduce((acc, key) => acc[key] = acc[key] || {}, obj);
        target[lastKey] = type === 'checkbox' ? checked : value;
        return { ...obj };
      };

      return updateNestedObject({ ...prev }, fullPath, value);
    });
  };

  // Handle array updates
  const handleArrayUpdate = (path, index, field, value) => {
    setFormData(prev => {
      const keys = path.split('.');
      const update = { ...prev };
      let current = update;

      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }

      const array = current[keys[keys.length - 1]];
      array[index][field] = value;

      return update;
    });
  };

  // Add item to array
  const addArrayItem = (path, template) => {
    setFormData(prev => {
      const keys = path.split('.');
      const update = { ...prev };
      let current = update;

      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }

      const array = current[keys[keys.length - 1]];
      array.push(template);

      return update;
    });
  };

  // Remove item from array
  const removeArrayItem = (path, index) => {
    setFormData(prev => {
      const keys = path.split('.');
      const update = { ...prev };
      let current = update;

      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }

      const array = current[keys[keys.length - 1]];
      array.splice(index, 1);

      return update;
    });
  };

  // Import JSON
  const handleJsonImport = () => {
    try {
      setJsonError('');
      const parsedData = JSON.parse(jsonText);

      // Validate required fields
      if (!parsedData.category) {
        throw new Error('Category slug is required');
      }

      // Set form data with defaults
      const defaultData = {
        category: parsedData.category || '',
        hero: parsedData.hero || formData.hero,
        visionBanner: parsedData.visionBanner || formData.visionBanner,
        comparisonTable: parsedData.comparisonTable || formData.comparisonTable,
        categoryServices: parsedData.categoryServices || formData.categoryServices,
        categoryAdvantages: parsedData.categoryAdvantages || formData.categoryAdvantages,
        whyBuildWithBcpl: parsedData.whyBuildWithBcpl || formData.whyBuildWithBcpl,
        weCreate: parsedData.weCreate || formData.weCreate,
        pageMetadata: parsedData.pageMetadata || formData.pageMetadata,
        ctaData: parsedData.ctaData || formData.ctaData,
        faqData: parsedData.faqData || formData.faqData,
        isActive: parsedData.isActive !== undefined ? parsedData.isActive : true,
        order: parsedData.order || 0
      };

      setFormData(defaultData);
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

  // Export all categories as JSON
  const exportAllCategories = async () => {
    try {
      const response = await adminAxios.get('/api/service-categories');
      const jsonData = JSON.stringify(response.data.data, null, 2);

      const blob = new Blob([jsonData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'service-categories-backup.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setSuccessMessage('All categories exported successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError('Failed to export categories');
    }
  };

  // Open create modal
  const openCreateModal = async () => {
    setFormData({
      category: '',
      hero: {
        title: '',
        subtitle: '',
        highlightedText: [],
        description: '',
        imgUrl: '',
        cta: {
          primary: '',
          primaryLink: '',
          secondary: '',
          secondaryLink: ''
        }
      },
      visionBanner: {
        heading: '',
        imageUrl: ''
      },
      comparisonTable: {
        category: '',
        brand: {
          logoUrl: '',
          features: ['']
        },
        others: [{
          title: '',
          points: ['']
        }]
      },
      categoryServices: {
        title: '',
        subtitle: '',
        description: '',
        services: [{
          title: '',
          description: '',
          image: '',
          link: ''
        }]
      },
      categoryAdvantages: {
        mainTitle: '',
        sections: {
          overview: {
            id: 'overview',
            title: '',
            heading: '',
            content: [{
              type: 'text',
              value: ''
            }]
          },
          conversionRate: {
            id: 'conversionRate',
            title: '',
            heading: '',
            content: [{
              type: 'text',
              value: ''
            }]
          },
          userExperience: {
            id: 'userExperience',
            title: '',
            heading: '',
            content: [{
              type: 'text',
              value: ''
            }]
          },
          competitiveEdge: {
            id: 'competitiveEdge',
            title: '',
            heading: '',
            content: [{
              type: 'text',
              value: ''
            }]
          },
          searchRankings: {
            id: 'searchRankings',
            title: '',
            heading: '',
            content: [{
              type: 'text',
              value: ''
            }]
          },
          digitalMarketing: {
            id: 'digitalMarketing',
            title: '',
            heading: '',
            content: [{
              type: 'text',
              value: ''
            }]
          }
        }
      },
      whyBuildWithBcpl: {
        title: '',
        subtitle: '',
        reasons: [{
          id: 1,
          reason: ''
        }]
      },
      weCreate: {
        header: {
          titleOrange: '',
          titleBlack: '',
          description: ''
        },
        leftFeatured: {
          image: '',
          title: '',
          subtitle: '',
          tags: [{
            label: '',
            type: 'primary'
          }]
        },
        rightColumnItems: [{
          title: '',
          subtitle: '',
          image: '',
          tags: [{
            label: '',
            type: 'primary'
          }]
        }]
      },
      pageMetadata: {
        title: '',
        description: '',
        keywords: []
      },
      ctaData: {
        title: '',
        subheading: '',
        primaryText: '',
        primaryLink: '',
        secondaryText: '',
        secondaryLink: ''
      },
      faqData: [{
        question: '',
        answer: ''
      }],
      isActive: true,
      order: 0
    });

    setModalType('create');
    setShowModal(true);
    setShowJsonImport(false);
    setJsonText('');
    setJsonError('');
    setPreviewMode(false);
  };

  // Open edit modal
  const openEditModal = async (category) => {
    try {
      setLoading(true);
      const response = await adminAxios.get(`/api/service-categories/id/${category._id}`);
      setCurrentCategory(response.data.data);
      setFormData(response.data.data);
      setModalType('edit');
      setShowModal(true);
      setShowJsonImport(false);
      setJsonText('');
      setJsonError('');
      setPreviewMode(false);
    } catch (err) {
      setError('Failed to load category data');
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      // Validate required fields
      if (!formData.category.trim()) {
        throw new Error('Category slug is required');
      }

      if (modalType === 'create') {
        await adminAxios.post('/api/service-categories', formData);
        setSuccessMessage('Service category created successfully!');
      } else {
        await adminAxios.put(`/api/service-categories/${currentCategory._id}`, formData);
        setSuccessMessage('Service category updated successfully!');
      }

      await fetchCategories();
      setShowModal(false);

      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Operation failed. Please try again.');
      console.error('Error saving category:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle delete
  const handleDelete = async () => {
    try {
      setLoading(true);
      await adminAxios.delete(`/api/service-categories/${deleteConfirm}`);
      setSuccessMessage('Service category deleted successfully!');
      setDeleteConfirm(null);
      await fetchCategories();

      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError('Failed to delete category. Please try again.');
      console.error('Error deleting category:', err);
    } finally {
      setLoading(false);
    }
  };

  // Toggle status
  const toggleStatus = async (id, currentStatus) => {
    try {
      setLoading(true);
      await adminAxios.patch(`/api/service-categories/${id}/toggle-status`);
      setSuccessMessage(`Category ${!currentStatus ? 'activated' : 'deactivated'} successfully!`);
      await fetchCategories();

      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError('Failed to toggle status');
    } finally {
      setLoading(false);
    }
  };

  // Handle bulk order update
  const handleBulkOrderUpdate = async () => {
    try {
      setLoading(true);
      await adminAxios.patch('/api/service-categories/order', orderData);
      setSuccessMessage('Category order updated successfully!');
      setBulkOrderEdit(false);
      await fetchCategories();

      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError('Failed to update order');
    } finally {
      setLoading(false);
    }
  };

  // Initialize order data
  const initBulkOrderEdit = () => {
    const orderList = categories.map(cat => ({
      id: cat._id,
      category: cat.category,
      order: cat.order
    })).sort((a, b) => a.order - b.order);

    setOrderData(orderList);
    setBulkOrderEdit(true);
  };

  // Toggle section expansion
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Get icon for category type
  const getCategoryIcon = (categoryName) => {
    const icons = {
      'web-development': <Globe className="w-4 h-4" />,
      'ecommerce': <ShoppingCart className="w-4 h-4" />,
      'mobile': <Smartphone className="w-4 h-4" />,
      'design': <Palette className="w-4 h-4" />,
      'marketing': <Megaphone className="w-4 h-4" />,
      'seo': <Search className="w-4 h-4" />,
      'content': <FileText className="w-4 h-4" />,
      'analytics': <BarChart3 className="w-4 h-4" />
    };

    return icons[categoryName] || <Layers className="w-4 h-4" />;
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Reset filters
  const resetFilters = () => {
    setSearchTerm('');
    setFilterStatus('all');
    setCurrentPage(1);
  };

  // Preview category
  const handlePreview = (category) => {
    const url = `https://yourwebsite.com/services/${category.category}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Service Categories</h1>
            <p className="text-gray-600 mt-2">Manage service pages and content</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={exportAllCategories}
              className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export All
            </button>
            <button
              onClick={initBulkOrderEdit}
              className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex items-center gap-2"
            >
              <ListOrdered className="w-4 h-4" />
              Edit Order
            </button>
            <button
              onClick={openCreateModal}
              className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              New Category
            </button>
          </div>
        </div>
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

      {/* Controls */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by category slug, title, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
              >
                <option value="all">All Status</option>
                <option value="active">Active Only</option>
                <option value="inactive">Inactive Only</option>
              </select>
            </div>

            <button
              onClick={resetFilters}
              className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-blue-700">{categories.length}</div>
            <div className="text-sm text-blue-600">Total Categories</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-green-700">
              {categories.filter(c => c.isActive).length}
            </div>
            <div className="text-sm text-green-600">Active</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-purple-700">
              {categories.filter(c => !c.isActive).length}
            </div>
            <div className="text-sm text-purple-600">Inactive</div>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-orange-700">
              {new Set(categories.map(c => c.categoryServices?.title)).size}
            </div>
            <div className="text-sm text-orange-600">Service Types</div>
          </div>
        </div>
      </div>

      {/* Categories Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading && !showModal ? (
          <div className="p-12 text-center">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto" />
            <p className="mt-4 text-gray-600">Loading categories...</p>
          </div>
        ) : paginatedCategories.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">No categories found</h3>
            <p className="mt-2 text-gray-600">
              {searchTerm || filterStatus !== 'all'
                ? 'Try adjusting your search or filters'
                : 'Get started by creating your first category'}
            </p>
            <button
              onClick={openCreateModal}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create New Category
            </button>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Hero Title
                    </th>
                    <th className="px6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Services
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedCategories.map((category) => (
                    <tr key={category._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            {getCategoryIcon(category.category)}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {category.category}
                            </div>
                            <div className="text-sm text-gray-500">
                              {category.pageMetadata?.title}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 line-clamp-2">
                          {category.hero.title}
                        </div>
                        <div className="text-sm text-gray-500 line-clamp-1">
                          {category.hero.subtitle}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          {category.categoryServices?.services?.length || 0} services
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => toggleStatus(category._id, category.isActive)}
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${category.isActive
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                            }`}
                        >
                          {category.isActive ? 'Active' : 'Inactive'}
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {category.order}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {formatDate(category.createdAt)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handlePreview(category)}
                            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Preview"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => openEditModal(category)}
                            className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(category._id)}
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
                    {Math.min(currentPage * itemsPerPage, filteredCategories.length)}
                  </span> of{' '}
                  <span className="font-medium">{filteredCategories.length}</span> results
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={`p-2 rounded-lg ${currentPage === 1
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
                        className={`w-10 h-10 rounded-lg ${currentPage === pageNum
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
                    className={`p-2 rounded-lg ${currentPage === totalPages
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
              Delete Category
            </h3>
            <p className="text-gray-600 text-center mb-6">
              Are you sure you want to delete this category? This action cannot be undone.
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

      {/* Bulk Order Edit Modal */}
      {bulkOrderEdit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-xl max-w-2xl w-full my-8">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Update Category Order</h2>
                <button
                  onClick={() => setBulkOrderEdit(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                {orderData.map((item, index) => (
                  <div key={item.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{item.category}</div>
                      <div className="text-sm text-gray-500">Current order: {item.order}</div>
                    </div>
                    <input
                      type="number"
                      value={item.order}
                      onChange={(e) => {
                        const newOrder = [...orderData];
                        newOrder[index].order = parseInt(e.target.value) || 0;
                        setOrderData(newOrder);
                      }}
                      className="w-20 px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      min="0"
                    />
                    <div className="flex gap-1">
                      <button
                        onClick={() => {
                          if (index > 0) {
                            const newOrder = [...orderData];
                            [newOrder[index], newOrder[index - 1]] = [newOrder[index - 1], newOrder[index]];
                            setOrderData(newOrder);
                          }
                        }}
                        className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (index < orderData.length - 1) {
                            const newOrder = [...orderData];
                            [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
                            setOrderData(newOrder);
                          }
                        }}
                        className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 pt-6 border-t border-gray-200 mt-6">
                <button
                  type="button"
                  onClick={() => setBulkOrderEdit(false)}
                  className="flex-1 px-4 py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBulkOrderUpdate}
                  disabled={loading}
                  className="flex-1 px-4 py-2.5 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    'Save Order'
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
          <div className="bg-white rounded-xl max-w-6xl w-full my-8 max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">
                  {modalType === 'create' ? 'Create New Service Category' : 'Edit Service Category'}
                </h2>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPreviewMode(!previewMode)}
                    className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg flex items-center gap-2"
                    title="Toggle Preview"
                  >
                    {previewMode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    {previewMode ? 'Edit Mode' : 'Preview'}
                  </button>
                  <button
                    onClick={exportAsJson}
                    className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg flex items-center gap-2"
                    title="Export as JSON"
                  >
                    <FileText className="w-4 h-4" />
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
              <div className="p-6 space-y-4 flex-1 overflow-y-auto">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Import JSON Data</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Paste your JSON data below. The JSON should match the service category structure.
                  </p>
                  <textarea
                    value={jsonText}
                    onChange={(e) => setJsonText(e.target.value)}
                    rows={12}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                    placeholder={`{
  "category": "web-development",
  "hero": {
    "title": "Web Development",
    "subtitle": "Build amazing websites",
    ...
  },
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
            ) : previewMode ? (
              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-6">
                  {/* Preview Hero Section */}
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Hero Section Preview</h3>
                    <div className="space-y-2">
                      <h1 className="text-3xl font-bold text-gray-900">{formData.hero.title}</h1>
                      <p className="text-xl text-gray-600">{formData.hero.subtitle}</p>
                      {formData.hero.highlightedText && formData.hero.highlightedText.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {formData.hero.highlightedText.map((text, idx) => (
                            <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                              {text}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Preview Services */}
                  {formData.categoryServices && (
                    <div className="border border-gray-200 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Services Preview</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {formData.categoryServices.services?.slice(0, 4).map((service, idx) => (
                          <div key={idx} className="border border-gray-200 rounded-lg p-4">
                            <h4 className="font-medium text-gray-900">{service.title}</h4>
                            <p className="text-sm text-gray-600 mt-1 line-clamp-2">{service.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
                <div className="p-6 space-y-6">
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
                        Click here to import category data from JSON format
                      </p>
                    </div>
                  )}

                  {/* Basic Information */}
                  <div className="border border-gray-200 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Category Slug *
                        </label>
                        <input
                          type="text"
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="web-development"
                        />
                        <p className="text-xs text-gray-500 mt-1">URL-friendly slug (lowercase, hyphens)</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Display Order
                        </label>
                        <input
                          type="number"
                          name="order"
                          value={formData.order}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          min="0"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            name="isActive"
                            checked={formData.isActive}
                            onChange={handleInputChange}
                            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                          />
                          <span className="ml-2 text-gray-700">Active Category</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Hero Section */}
                  <div className="border border-gray-200 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">Hero Section</h3>
                      <button
                        type="button"
                        onClick={() => toggleSection('hero')}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        {expandedSections.hero ? 'Collapse' : 'Expand'}
                      </button>
                    </div>

                    {expandedSections.hero && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Title *
                            </label>
                            <input
                              type="text"
                              name="title"
                              value={formData.hero.title}
                              onChange={(e) => handleInputChange(e, 'hero')}
                              required
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="Web Development"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Subtitle *
                            </label>
                            <input
                              type="text"
                              name="subtitle"
                              value={formData.hero.subtitle}
                              onChange={(e) => handleInputChange(e, 'hero')}
                              required
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="Build amazing digital experiences"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Description
                          </label>
                          <textarea
                            name="description"
                            value={formData.hero.description}
                            onChange={(e) => handleInputChange(e, 'hero')}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Detailed description..."
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Highlighted Text (Tags)
                          </label>
                          <div className="space-y-2">
                            {formData.hero.highlightedText.map((text, index) => (
                              <div key={index} className="flex gap-2">
                                <input
                                  type="text"
                                  value={text}
                                  onChange={(e) => {
                                    const newText = [...formData.hero.highlightedText];
                                    newText[index] = e.target.value;
                                    setFormData(prev => ({
                                      ...prev,
                                      hero: { ...prev.hero, highlightedText: newText }
                                    }));
                                  }}
                                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                  placeholder="Fast Development"
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    const newText = formData.hero.highlightedText.filter((_, i) => i !== index);
                                    setFormData(prev => ({
                                      ...prev,
                                      hero: { ...prev.hero, highlightedText: newText }
                                    }));
                                  }}
                                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                            <button
                              type="button"
                              onClick={() => {
                                setFormData(prev => ({
                                  ...prev,
                                  hero: {
                                    ...prev.hero,
                                    highlightedText: [...prev.hero.highlightedText, '']
                                  }
                                }));
                              }}
                              className="px-3 py-1.5 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg"
                            >
                              + Add Highlight
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Primary CTA Text *
                            </label>
                            <input
                              type="text"
                              name="primary"
                              value={formData.hero.cta.primary}
                              onChange={(e) => handleInputChange(e, 'hero.cta')}
                              required
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="Get Started"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Primary CTA Link
                            </label>
                            <input
                              type="text"
                              name="primaryLink"
                              value={formData.hero.cta.primaryLink}
                              onChange={(e) => handleInputChange(e, 'hero.cta')}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="/appointment"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Secondary CTA Text *
                            </label>
                            <input
                              type="text"
                              name="secondary"
                              value={formData.hero.cta.secondary}
                              onChange={(e) => handleInputChange(e, 'hero.cta')}
                              required
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="Learn More"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Secondary CTA Link
                            </label>
                            <input
                              type="text"
                              name="secondaryLink"
                              value={formData.hero.cta.secondaryLink}
                              onChange={(e) => handleInputChange(e, 'hero.cta')}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="/services"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Hero Image URL *
                          </label>
                          <input
                            type="url"
                            name="imgUrl"
                            value={formData.hero.imgUrl}
                            onChange={(e) => handleInputChange(e, 'hero')}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="https://example.com/hero-image.jpg"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* SEO Metadata */}
                  <div className="border border-gray-200 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">SEO Metadata</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Page Title *
                        </label>
                        <input
                          type="text"
                          name="title"
                          value={formData.pageMetadata.title}
                          onChange={(e) => handleInputChange(e, 'pageMetadata')}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Web Development Services | Company Name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Meta Description *
                        </label>
                        <textarea
                          name="description"
                          value={formData.pageMetadata.description}
                          onChange={(e) => handleInputChange(e, 'pageMetadata')}
                          required
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Professional web development services..."
                          maxLength="160"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Keywords
                        </label>
                        <div className="space-y-2">
                          {formData.pageMetadata.keywords.map((keyword, index) => (
                            <div key={index} className="flex gap-2">
                              <input
                                type="text"
                                value={keyword}
                                onChange={(e) => {
                                  const newKeywords = [...formData.pageMetadata.keywords];
                                  newKeywords[index] = e.target.value;
                                  setFormData(prev => ({
                                    ...prev,
                                    pageMetadata: { ...prev.pageMetadata, keywords: newKeywords }
                                  }));
                                }}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="web development"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  const newKeywords = formData.pageMetadata.keywords.filter((_, i) => i !== index);
                                  setFormData(prev => ({
                                    ...prev,
                                    pageMetadata: { ...prev.pageMetadata, keywords: newKeywords }
                                  }));
                                }}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() => {
                              setFormData(prev => ({
                                ...prev,
                                pageMetadata: {
                                  ...prev.pageMetadata,
                                  keywords: [...prev.pageMetadata.keywords, '']
                                }
                              }));
                            }}
                            className="px-3 py-1.5 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg"
                          >
                            + Add Keyword
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>



                  {/* Vision Banner Section */}
                  <div className="border border-gray-200 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Vision Banner</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Heading *
                        </label>
                        <input
                          type="text"
                          name="heading"
                          value={formData.visionBanner.heading}
                          onChange={(e) => handleInputChange(e, 'visionBanner')}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Our Vision"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Image URL *
                        </label>
                        <input
                          type="url"
                          name="imageUrl"
                          value={formData.visionBanner.imageUrl}
                          onChange={(e) => handleInputChange(e, 'visionBanner')}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="https://example.com/vision-banner.jpg"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Comparison Table Section */}
                  <div className="border border-gray-200 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">Comparison Table</h3>
                      <button
                        type="button"
                        onClick={() => toggleSection('comparison')}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        {expandedSections.comparison ? 'Collapse' : 'Expand'}
                      </button>
                    </div>

                    {expandedSections.comparison && (
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Table Category *
                          </label>
                          <input
                            type="text"
                            name="category"
                            value={formData.comparisonTable.category}
                            onChange={(e) => handleInputChange(e, 'comparisonTable')}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Technology Comparison"
                          />
                        </div>

                        <div className="border border-gray-200 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-3">Brand Column</h4>
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Brand Logo URL *
                              </label>
                              <input
                                type="url"
                                value={formData.comparisonTable.brand.logoUrl}
                                onChange={(e) => setFormData(prev => ({
                                  ...prev,
                                  comparisonTable: {
                                    ...prev.comparisonTable,
                                    brand: { ...prev.comparisonTable.brand, logoUrl: e.target.value }
                                  }
                                }))}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="https://example.com/brand-logo.png"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Brand Features
                              </label>
                              <div className="space-y-2">
                                {formData.comparisonTable.brand.features.map((feature, index) => (
                                  <div key={index} className="flex gap-2">
                                    <input
                                      type="text"
                                      value={feature}
                                      onChange={(e) => {
                                        const newFeatures = [...formData.comparisonTable.brand.features];
                                        newFeatures[index] = e.target.value;
                                        setFormData(prev => ({
                                          ...prev,
                                          comparisonTable: {
                                            ...prev.comparisonTable,
                                            brand: { ...prev.comparisonTable.brand, features: newFeatures }
                                          }
                                        }));
                                      }}
                                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                      placeholder="Feature description"
                                    />
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const newFeatures = formData.comparisonTable.brand.features.filter((_, i) => i !== index);
                                        setFormData(prev => ({
                                          ...prev,
                                          comparisonTable: {
                                            ...prev.comparisonTable,
                                            brand: { ...prev.comparisonTable.brand, features: newFeatures }
                                          }
                                        }));
                                      }}
                                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                ))}
                                <button
                                  type="button"
                                  onClick={() => {
                                    setFormData(prev => ({
                                      ...prev,
                                      comparisonTable: {
                                        ...prev.comparisonTable,
                                        brand: {
                                          ...prev.comparisonTable.brand,
                                          features: [...prev.comparisonTable.brand.features, '']
                                        }
                                      }
                                    }));
                                  }}
                                  className="px-3 py-1.5 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg"
                                >
                                  + Add Feature
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-medium text-gray-900">Competitors/Others</h4>
                            <button
                              type="button"
                              onClick={() => addArrayItem('comparisonTable.others', {
                                title: '',
                                points: ['']
                              })}
                              className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                              + Add Competitor
                            </button>
                          </div>

                          <div className="space-y-4">
                            {formData.comparisonTable.others.map((other, otherIndex) => (
                              <div key={otherIndex} className="border border-gray-300 rounded-lg p-4">
                                <div className="flex items-center justify-between mb-3">
                                  <h5 className="font-medium text-gray-900">Competitor {otherIndex + 1}</h5>
                                  {formData.comparisonTable.others.length > 1 && (
                                    <button
                                      type="button"
                                      onClick={() => removeArrayItem('comparisonTable.others', otherIndex)}
                                      className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  )}
                                </div>

                                <div className="space-y-4">
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                      Competitor Title *
                                    </label>
                                    <input
                                      type="text"
                                      value={other.title}
                                      onChange={(e) => handleArrayUpdate('comparisonTable.others', otherIndex, 'title', e.target.value)}
                                      required
                                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                      placeholder="Competitor Name"
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                      Points
                                    </label>
                                    <div className="space-y-2">
                                      {other.points.map((point, pointIndex) => (
                                        <div key={pointIndex} className="flex gap-2">
                                          <input
                                            type="text"
                                            value={point}
                                            onChange={(e) => {
                                              const newOthers = [...formData.comparisonTable.others];
                                              const newPoints = [...newOthers[otherIndex].points];
                                              newPoints[pointIndex] = e.target.value;
                                              newOthers[otherIndex].points = newPoints;
                                              setFormData(prev => ({
                                                ...prev,
                                                comparisonTable: {
                                                  ...prev.comparisonTable,
                                                  others: newOthers
                                                }
                                              }));
                                            }}
                                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Point description"
                                          />
                                          <button
                                            type="button"
                                            onClick={() => {
                                              const newOthers = [...formData.comparisonTable.others];
                                              const newPoints = newOthers[otherIndex].points.filter((_, i) => i !== pointIndex);
                                              newOthers[otherIndex].points = newPoints;
                                              setFormData(prev => ({
                                                ...prev,
                                                comparisonTable: {
                                                  ...prev.comparisonTable,
                                                  others: newOthers
                                                }
                                              }));
                                            }}
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                          >
                                            <Trash2 className="w-4 h-4" />
                                          </button>
                                        </div>
                                      ))}
                                      <button
                                        type="button"
                                        onClick={() => {
                                          const newOthers = [...formData.comparisonTable.others];
                                          newOthers[otherIndex].points.push('');
                                          setFormData(prev => ({
                                            ...prev,
                                            comparisonTable: {
                                              ...prev.comparisonTable,
                                              others: newOthers
                                            }
                                          }));
                                        }}
                                        className="px-3 py-1.5 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg"
                                      >
                                        + Add Point
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Category Advantages Section */}
                  <div className="border border-gray-200 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">Category Advantages</h3>
                      <button
                        type="button"
                        onClick={() => toggleSection('advantages')}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        {expandedSections.advantages ? 'Collapse' : 'Expand'}
                      </button>
                    </div>

                    {expandedSections.advantages && (
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Main Title *
                          </label>
                          <input
                            type="text"
                            name="mainTitle"
                            value={formData.categoryAdvantages.mainTitle}
                            onChange={(e) => handleInputChange(e, 'categoryAdvantages')}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Advantages of Our Service"
                          />
                        </div>

                        {Object.entries(formData.categoryAdvantages.sections).map(([key, section]) => (
                          <div key={key} className="border border-gray-200 rounded-lg p-4">
                            <h4 className="font-medium text-gray-900 mb-3 capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </h4>
                            <div className="space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Title
                                  </label>
                                  <input
                                    type="text"
                                    value={section.title}
                                    onChange={(e) => {
                                      const newSections = { ...formData.categoryAdvantages.sections };
                                      newSections[key].title = e.target.value;
                                      setFormData(prev => ({
                                        ...prev,
                                        categoryAdvantages: {
                                          ...prev.categoryAdvantages,
                                          sections: newSections
                                        }
                                      }));
                                    }}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder={`${key.replace(/([A-Z])/g, ' $1').trim()} Title`}
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Heading
                                  </label>
                                  <input
                                    type="text"
                                    value={section.heading}
                                    onChange={(e) => {
                                      const newSections = { ...formData.categoryAdvantages.sections };
                                      newSections[key].heading = e.target.value;
                                      setFormData(prev => ({
                                        ...prev,
                                        categoryAdvantages: {
                                          ...prev.categoryAdvantages,
                                          sections: newSections
                                        }
                                      }));
                                    }}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder={`${key.replace(/([A-Z])/g, ' $1').trim()} Heading`}
                                  />
                                </div>
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Content
                                </label>
                                <div className="space-y-2">
                                  {section.content.map((content, contentIndex) => (
                                    <div key={contentIndex} className="space-y-2">
                                      <select
                                        value={content.type}
                                        onChange={(e) => {
                                          const newSections = { ...formData.categoryAdvantages.sections };
                                          newSections[key].content[contentIndex].type = e.target.value;
                                          setFormData(prev => ({
                                            ...prev,
                                            categoryAdvantages: {
                                              ...prev.categoryAdvantages,
                                              sections: newSections
                                            }
                                          }));
                                        }}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                      >
                                        <option value="text">Text</option>
                                        <option value="list">List</option>
                                        <option value="image">Image</option>
                                      </select>

                                      {content.type === 'text' && (
                                        <textarea
                                          value={content.value}
                                          onChange={(e) => {
                                            const newSections = { ...formData.categoryAdvantages.sections };
                                            newSections[key].content[contentIndex].value = e.target.value;
                                            setFormData(prev => ({
                                              ...prev,
                                              categoryAdvantages: {
                                                ...prev.categoryAdvantages,
                                                sections: newSections
                                              }
                                            }));
                                          }}
                                          rows={3}
                                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                          placeholder="Text content..."
                                        />
                                      )}

                                      {content.type === 'list' && (
                                        <div className="space-y-2">
                                          {content.items && content.items.map((item, itemIndex) => (
                                            <div key={itemIndex} className="flex gap-2">
                                              <input
                                                type="text"
                                                value={item}
                                                onChange={(e) => {
                                                  const newSections = { ...formData.categoryAdvantages.sections };
                                                  const newItems = [...(newSections[key].content[contentIndex].items || [])];
                                                  newItems[itemIndex] = e.target.value;
                                                  newSections[key].content[contentIndex].items = newItems;
                                                  setFormData(prev => ({
                                                    ...prev,
                                                    categoryAdvantages: {
                                                      ...prev.categoryAdvantages,
                                                      sections: newSections
                                                    }
                                                  }));
                                                }}
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="List item"
                                              />
                                              <button
                                                type="button"
                                                onClick={() => {
                                                  const newSections = { ...formData.categoryAdvantages.sections };
                                                  const newItems = newSections[key].content[contentIndex].items.filter((_, i) => i !== itemIndex);
                                                  newSections[key].content[contentIndex].items = newItems;
                                                  setFormData(prev => ({
                                                    ...prev,
                                                    categoryAdvantages: {
                                                      ...prev.categoryAdvantages,
                                                      sections: newSections
                                                    }
                                                  }));
                                                }}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                              >
                                                <Trash2 className="w-4 h-4" />
                                              </button>
                                            </div>
                                          ))}
                                          <button
                                            type="button"
                                            onClick={() => {
                                              const newSections = { ...formData.categoryAdvantages.sections };
                                              if (!newSections[key].content[contentIndex].items) {
                                                newSections[key].content[contentIndex].items = [];
                                              }
                                              newSections[key].content[contentIndex].items.push('');
                                              setFormData(prev => ({
                                                ...prev,
                                                categoryAdvantages: {
                                                  ...prev.categoryAdvantages,
                                                  sections: newSections
                                                }
                                              }));
                                            }}
                                            className="px-3 py-1.5 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg"
                                          >
                                            + Add List Item
                                          </button>
                                        </div>
                                      )}

                                      {content.type === 'image' && (
                                        <div className="space-y-2">
                                          <input
                                            type="text"
                                            placeholder="Image Source URL"
                                            value={content.src || ''}
                                            onChange={(e) => {
                                              const newSections = { ...formData.categoryAdvantages.sections };
                                              newSections[key].content[contentIndex].src = e.target.value;
                                              setFormData(prev => ({
                                                ...prev,
                                                categoryAdvantages: {
                                                  ...prev.categoryAdvantages,
                                                  sections: newSections
                                                }
                                              }));
                                            }}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                          />
                                          <input
                                            type="text"
                                            placeholder="Alt Text"
                                            value={content.alt || ''}
                                            onChange={(e) => {
                                              const newSections = { ...formData.categoryAdvantages.sections };
                                              newSections[key].content[contentIndex].alt = e.target.value;
                                              setFormData(prev => ({
                                                ...prev,
                                                categoryAdvantages: {
                                                  ...prev.categoryAdvantages,
                                                  sections: newSections
                                                }
                                              }));
                                            }}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                          />
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Why Build With BCPL Section */}
                  <div className="border border-gray-200 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Why Build With BCPL</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Title *
                          </label>
                          <input
                            type="text"
                            name="title"
                            value={formData.whyBuildWithBcpl.title}
                            onChange={(e) => handleInputChange(e, 'whyBuildWithBcpl')}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Why Choose Us"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Subtitle *
                          </label>
                          <input
                            type="text"
                            name="subtitle"
                            value={formData.whyBuildWithBcpl.subtitle}
                            onChange={(e) => handleInputChange(e, 'whyBuildWithBcpl')}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="The benefits of working with us"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Reasons
                        </label>
                        <div className="space-y-2">
                          {formData.whyBuildWithBcpl.reasons.map((reason, index) => (
                            <div key={index} className="flex gap-2 items-start">
                              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-sm font-medium text-gray-700 mt-2">
                                {index + 1}
                              </div>
                              <div className="flex-1">
                                <textarea
                                  value={reason.reason}
                                  onChange={(e) => {
                                    const newReasons = [...formData.whyBuildWithBcpl.reasons];
                                    newReasons[index].reason = e.target.value;
                                    setFormData(prev => ({
                                      ...prev,
                                      whyBuildWithBcpl: {
                                        ...prev.whyBuildWithBcpl,
                                        reasons: newReasons
                                      }
                                    }));
                                  }}
                                  rows={2}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                  placeholder="Reason description..."
                                />
                              </div>
                              {formData.whyBuildWithBcpl.reasons.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => removeArrayItem('whyBuildWithBcpl.reasons', index)}
                                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg mt-2"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() => addArrayItem('whyBuildWithBcpl.reasons', {
                              id: formData.whyBuildWithBcpl.reasons.length + 1,
                              reason: ''
                            })}
                            className="px-3 py-1.5 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg"
                          >
                            + Add Reason
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* We Create Section */}
                  <div className="border border-gray-200 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">We Create</h3>
                      <button
                        type="button"
                        onClick={() => toggleSection('weCreate')}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        {expandedSections.weCreate ? 'Collapse' : 'Expand'}
                      </button>
                    </div>

                    {expandedSections.weCreate && (
                      <div className="space-y-6">
                        {/* Header */}
                        <div className="border border-gray-200 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-3">Header</h4>
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Title (Orange Part)
                                </label>
                                <input
                                  type="text"
                                  name="titleOrange"
                                  value={formData.weCreate.header.titleOrange}
                                  onChange={(e) => handleInputChange(e, 'weCreate.header')}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                  placeholder="We Create"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Title (Black Part)
                                </label>
                                <input
                                  type="text"
                                  name="titleBlack"
                                  value={formData.weCreate.header.titleBlack}
                                  onChange={(e) => handleInputChange(e, 'weCreate.header')}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                  placeholder="Amazing Solutions"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description
                              </label>
                              <textarea
                                name="description"
                                value={formData.weCreate.header.description}
                                onChange={(e) => handleInputChange(e, 'weCreate.header')}
                                rows={2}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Description of what we create..."
                              />
                            </div>
                          </div>
                        </div>

                        {/* Left Featured */}
                        <div className="border border-gray-200 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-3">Left Featured Item</h4>
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Image URL *
                              </label>
                              <input
                                type="url"
                                name="image"
                                value={formData.weCreate.leftFeatured.image}
                                onChange={(e) => handleInputChange(e, 'weCreate.leftFeatured')}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="https://example.com/featured-image.jpg"
                              />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Title *
                                </label>
                                <input
                                  type="text"
                                  name="title"
                                  value={formData.weCreate.leftFeatured.title}
                                  onChange={(e) => handleInputChange(e, 'weCreate.leftFeatured')}
                                  required
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                  placeholder="Featured Solution"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Subtitle *
                                </label>
                                <input
                                  type="text"
                                  name="subtitle"
                                  value={formData.weCreate.leftFeatured.subtitle}
                                  onChange={(e) => handleInputChange(e, 'weCreate.leftFeatured')}
                                  required
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                  placeholder="Brief description"
                                />
                              </div>
                            </div>

                            {/* Tags for Left Featured */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Tags
                              </label>
                              <div className="space-y-2">
                                {formData.weCreate.leftFeatured.tags.map((tag, index) => (
                                  <div key={index} className="flex gap-2">
                                    <input
                                      type="text"
                                      placeholder="Tag label"
                                      value={tag.label}
                                      onChange={(e) => {
                                        const newTags = [...formData.weCreate.leftFeatured.tags];
                                        newTags[index].label = e.target.value;
                                        setFormData(prev => ({
                                          ...prev,
                                          weCreate: {
                                            ...prev.weCreate,
                                            leftFeatured: {
                                              ...prev.weCreate.leftFeatured,
                                              tags: newTags
                                            }
                                          }
                                        }));
                                      }}
                                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    <select
                                      value={tag.type}
                                      onChange={(e) => {
                                        const newTags = [...formData.weCreate.leftFeatured.tags];
                                        newTags[index].type = e.target.value;
                                        setFormData(prev => ({
                                          ...prev,
                                          weCreate: {
                                            ...prev.weCreate,
                                            leftFeatured: {
                                              ...prev.weCreate.leftFeatured,
                                              tags: newTags
                                            }
                                          }
                                        }));
                                      }}
                                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    >
                                      <option value="primary">Primary</option>
                                      <option value="secondary">Secondary</option>
                                    </select>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const newTags = formData.weCreate.leftFeatured.tags.filter((_, i) => i !== index);
                                        setFormData(prev => ({
                                          ...prev,
                                          weCreate: {
                                            ...prev.weCreate,
                                            leftFeatured: {
                                              ...prev.weCreate.leftFeatured,
                                              tags: newTags
                                            }
                                          }
                                        }));
                                      }}
                                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                ))}
                                <button
                                  type="button"
                                  onClick={() => {
                                    setFormData(prev => ({
                                      ...prev,
                                      weCreate: {
                                        ...prev.weCreate,
                                        leftFeatured: {
                                          ...prev.weCreate.leftFeatured,
                                          tags: [...prev.weCreate.leftFeatured.tags, { label: '', type: 'primary' }]
                                        }
                                      }
                                    }));
                                  }}
                                  className="px-3 py-1.5 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg"
                                >
                                  + Add Tag
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Right Column Items */}
                        <div className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-medium text-gray-900">Right Column Items</h4>
                            <button
                              type="button"
                              onClick={() => addArrayItem('weCreate.rightColumnItems', {
                                title: '',
                                subtitle: '',
                                image: '',
                                tags: [{ label: '', type: 'primary' }]
                              })}
                              className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                              + Add Item
                            </button>
                          </div>

                          <div className="space-y-4">
                            {formData.weCreate.rightColumnItems.map((item, itemIndex) => (
                              <div key={itemIndex} className="border border-gray-300 rounded-lg p-4">
                                <div className="flex items-center justify-between mb-3">
                                  <h5 className="font-medium text-gray-900">Item {itemIndex + 1}</h5>
                                  {formData.weCreate.rightColumnItems.length > 1 && (
                                    <button
                                      type="button"
                                      onClick={() => removeArrayItem('weCreate.rightColumnItems', itemIndex)}
                                      className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  )}
                                </div>

                                <div className="space-y-4">
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                      Image URL *
                                    </label>
                                    <input
                                      type="url"
                                      value={item.image}
                                      onChange={(e) => handleArrayUpdate('weCreate.rightColumnItems', itemIndex, 'image', e.target.value)}
                                      required
                                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                      placeholder="https://example.com/item-image.jpg"
                                    />
                                  </div>

                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                      <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Title *
                                      </label>
                                      <input
                                        type="text"
                                        value={item.title}
                                        onChange={(e) => handleArrayUpdate('weCreate.rightColumnItems', itemIndex, 'title', e.target.value)}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Item Title"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Subtitle *
                                      </label>
                                      <input
                                        type="text"
                                        value={item.subtitle}
                                        onChange={(e) => handleArrayUpdate('weCreate.rightColumnItems', itemIndex, 'subtitle', e.target.value)}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Brief description"
                                      />
                                    </div>
                                  </div>

                                  {/* Tags for Right Column Item */}
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                      Tags
                                    </label>
                                    <div className="space-y-2">
                                      {item.tags.map((tag, tagIndex) => (
                                        <div key={tagIndex} className="flex gap-2">
                                          <input
                                            type="text"
                                            placeholder="Tag label"
                                            value={tag.label}
                                            onChange={(e) => {
                                              const newItems = [...formData.weCreate.rightColumnItems];
                                              newItems[itemIndex].tags[tagIndex].label = e.target.value;
                                              setFormData(prev => ({
                                                ...prev,
                                                weCreate: {
                                                  ...prev.weCreate,
                                                  rightColumnItems: newItems
                                                }
                                              }));
                                            }}
                                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                          />
                                          <select
                                            value={tag.type}
                                            onChange={(e) => {
                                              const newItems = [...formData.weCreate.rightColumnItems];
                                              newItems[itemIndex].tags[tagIndex].type = e.target.value;
                                              setFormData(prev => ({
                                                ...prev,
                                                weCreate: {
                                                  ...prev.weCreate,
                                                  rightColumnItems: newItems
                                                }
                                              }));
                                            }}
                                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                          >
                                            <option value="primary">Primary</option>
                                            <option value="secondary">Secondary</option>
                                          </select>
                                          <button
                                            type="button"
                                            onClick={() => {
                                              const newItems = [...formData.weCreate.rightColumnItems];
                                              newItems[itemIndex].tags = newItems[itemIndex].tags.filter((_, i) => i !== tagIndex);
                                              setFormData(prev => ({
                                                ...prev,
                                                weCreate: {
                                                  ...prev.weCreate,
                                                  rightColumnItems: newItems
                                                }
                                              }));
                                            }}
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                          >
                                            <Trash2 className="w-4 h-4" />
                                          </button>
                                        </div>
                                      ))}
                                      <button
                                        type="button"
                                        onClick={() => {
                                          const newItems = [...formData.weCreate.rightColumnItems];
                                          newItems[itemIndex].tags.push({ label: '', type: 'primary' });
                                          setFormData(prev => ({
                                            ...prev,
                                            weCreate: {
                                              ...prev.weCreate,
                                              rightColumnItems: newItems
                                            }
                                          }));
                                        }}
                                        className="px-3 py-1.5 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg"
                                      >
                                        + Add Tag
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* CTA Data Section */}
                  <div className="border border-gray-200 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Call to Action</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            CTA Title *
                          </label>
                          <input
                            type="text"
                            name="title"
                            value={formData.ctaData.title}
                            onChange={(e) => handleInputChange(e, 'ctaData')}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Ready to Get Started?"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            CTA Subheading *
                          </label>
                          <input
                            type="text"
                            name="subheading"
                            value={formData.ctaData.subheading}
                            onChange={(e) => handleInputChange(e, 'ctaData')}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Contact us today for a free consultation"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Primary Button Text
                          </label>
                          <input
                            type="text"
                            name="primaryText"
                            value={formData.ctaData.primaryText}
                            onChange={(e) => handleInputChange(e, 'ctaData')}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Contact Sales"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Primary Button Link
                          </label>
                          <input
                            type="text"
                            name="primaryLink"
                            value={formData.ctaData.primaryLink}
                            onChange={(e) => handleInputChange(e, 'ctaData')}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="/appointment"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Secondary Button Text
                          </label>
                          <input
                            type="text"
                            name="secondaryText"
                            value={formData.ctaData.secondaryText}
                            onChange={(e) => handleInputChange(e, 'ctaData')}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Get Started"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Secondary Button Link
                          </label>
                          <input
                            type="text"
                            name="secondaryLink"
                            value={formData.ctaData.secondaryLink}
                            onChange={(e) => handleInputChange(e, 'ctaData')}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="/services"
                          />
                        </div>
                      </div>
                    </div>
                  </div>


                  {/* Services Section */}
                  <div className="border border-gray-200 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Services</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Services Title
                          </label>
                          <input
                            type="text"
                            name="title"
                            value={formData.categoryServices.title}
                            onChange={(e) => handleInputChange(e, 'categoryServices')}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Our Services"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Services Subtitle
                          </label>
                          <input
                            type="text"
                            name="subtitle"
                            value={formData.categoryServices.subtitle}
                            onChange={(e) => handleInputChange(e, 'categoryServices')}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="What we offer"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Services Description
                        </label>
                        <textarea
                          name="description"
                          value={formData.categoryServices.description}
                          onChange={(e) => handleInputChange(e, 'categoryServices')}
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Description of services..."
                        />
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-medium text-gray-900">Service Items</h4>
                        {formData.categoryServices.services.map((service, index) => (
                          <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-4">
                            <div className="flex items-center justify-between">
                              <h5 className="font-medium text-gray-900">Service {index + 1}</h5>
                              {formData.categoryServices.services.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => removeArrayItem('categoryServices.services', index)}
                                  className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Title *
                                </label>
                                <input
                                  type="text"
                                  value={service.title}
                                  onChange={(e) => handleArrayUpdate('categoryServices.services', index, 'title', e.target.value)}
                                  required
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                  placeholder="Custom Development"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Image URL *
                                </label>
                                <input
                                  type="url"
                                  value={service.image}
                                  onChange={(e) => handleArrayUpdate('categoryServices.services', index, 'image', e.target.value)}
                                  required
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                  placeholder="https://example.com/service.jpg"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description *
                              </label>
                              <textarea
                                value={service.description}
                                onChange={(e) => handleArrayUpdate('categoryServices.services', index, 'description', e.target.value)}
                                required
                                rows={2}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Detailed description of the service..."
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Link (Optional)
                              </label>
                              <input
                                type="url"
                                value={service.link}
                                onChange={(e) => handleArrayUpdate('categoryServices.services', index, 'link', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="https://example.com/service-details"
                              />
                            </div>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => addArrayItem('categoryServices.services', {
                            title: '',
                            description: '',
                            image: '',
                            link: ''
                          })}
                          className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
                        >
                          <Plus className="w-4 h-4" />
                          Add Service
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* FAQ Section */}
                  <div className="border border-gray-200 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">FAQ</h3>
                    <div className="space-y-4">
                      {formData.faqData.map((faq, index) => (
                        <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-4">
                          <div className="flex items-center justify-between">
                            <h5 className="font-medium text-gray-900">FAQ Item {index + 1}</h5>
                            {formData.faqData.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeArrayItem('faqData', index)}
                                className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Question *
                            </label>
                            <input
                              type="text"
                              value={faq.question}
                              onChange={(e) => handleArrayUpdate('faqData', index, 'question', e.target.value)}
                              required
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="What is your pricing model?"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Answer *
                            </label>
                            <textarea
                              value={faq.answer}
                              onChange={(e) => handleArrayUpdate('faqData', index, 'answer', e.target.value)}
                              required
                              rows={3}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="We offer flexible pricing models..."
                            />
                          </div>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => addArrayItem('faqData', {
                          question: '',
                          answer: ''
                        })}
                        className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        Add FAQ
                      </button>
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
                        modalType === 'create' ? 'Create Category' : 'Update Category'
                      )}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceCategoryManagement;